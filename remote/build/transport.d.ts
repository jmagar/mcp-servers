import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
/**
 * Options for creating an HTTP streaming transport
 */
export interface TransportOptions {
    /**
     * Enable resumability support using event store
     * When enabled, clients can reconnect and resume from their last received event
     */
    enableResumability?: boolean;
    /**
     * Callback invoked when a new session is initialized
     */
    onSessionInitialized?: (sessionId: string) => void | Promise<void>;
    /**
     * Callback invoked when a session is closed
     */
    onSessionClosed?: (sessionId: string) => void | Promise<void>;
}
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
export declare function createTransport(options?: TransportOptions): StreamableHTTPServerTransport;
//# sourceMappingURL=transport.d.ts.map