import { z } from 'zod';
/**
 * Create a JSON schema from a Zod schema with standard options
 */
export declare function createInputSchema<T>(schema: z.ZodType<T>): unknown;
/**
 * Validate environment variables against a schema
 */
export declare function validateEnvironment<T>(schema: z.ZodType<T>, env?: NodeJS.ProcessEnv): T;
/**
 * Parse a resource URI with an expected prefix
 */
export declare function parseResourceUri(uri: string, expectedPrefix: string): string | null;
/**
 * Build a resource URI with consistent format
 */
export declare function buildResourceUri(protocol: string, type: string, id: string): string;
