import { CorsOptions } from 'cors';
/**
 * Get CORS configuration options for the HTTP server
 *
 * Configures CORS to:
 * - Allow specified origins from environment or default to all
 * - Expose MCP-specific headers (Mcp-Session-Id)
 * - Support credentials
 * - Allow standard MCP HTTP methods
 *
 * @returns CORS options object
 */
export declare function getCorsOptions(): CorsOptions;
//# sourceMappingURL=cors.d.ts.map