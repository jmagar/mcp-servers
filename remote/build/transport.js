import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'node:crypto';
import { InMemoryEventStore } from './eventStore.js';
/**
 * Creates a StreamableHTTPServerTransport instance with appropriate configuration
 *
 * @param options - Configuration options for the transport
 * @returns Configured StreamableHTTPServerTransport instance
 *
 * @example
 * ```typescript
 * const transport = createTransport({
 *   enableResumability: true,
 *   onSessionInitialized: (sessionId) => {
 *     console.log(`Session ${sessionId} initialized`);
 *   }
 * });
 * ```
 */
export function createTransport(options) {
    const { enableResumability = process.env.ENABLE_RESUMABILITY === 'true', onSessionInitialized, onSessionClosed, } = options || {};
    return new StreamableHTTPServerTransport({
        // Generate cryptographically secure session IDs
        sessionIdGenerator: () => randomUUID(),
        // Enable resumability if configured
        eventStore: enableResumability ? new InMemoryEventStore() : undefined,
        // Session lifecycle callbacks
        onsessioninitialized: onSessionInitialized,
        onsessionclosed: onSessionClosed,
        // DNS rebinding protection (enabled in production)
        enableDnsRebindingProtection: process.env.NODE_ENV === 'production',
        allowedHosts: process.env.ALLOWED_HOSTS?.split(',').filter(Boolean),
        allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',').filter(Boolean),
    });
}
//# sourceMappingURL=transport.js.map