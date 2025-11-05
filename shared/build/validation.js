import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
/**
 * Create a JSON schema from a Zod schema with standard options
 */
export function createInputSchema(schema) {
    return zodToJsonSchema(schema, {
        target: 'openApi3',
    });
}
/**
 * Validate environment variables against a schema
 */
export function validateEnvironment(schema, env = process.env) {
    try {
        return schema.parse(env);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const issues = error.issues
                .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
                .join('\n');
            throw new Error(`Environment validation failed:\n${issues}`);
        }
        throw error;
    }
}
/**
 * Parse a resource URI with an expected prefix
 */
export function parseResourceUri(uri, expectedPrefix) {
    if (!uri.startsWith(expectedPrefix)) {
        return null;
    }
    return uri.slice(expectedPrefix.length);
}
/**
 * Build a resource URI with consistent format
 */
export function buildResourceUri(protocol, type, id) {
    return `${protocol}://${type}/${id}`;
}
