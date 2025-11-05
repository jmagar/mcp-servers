import { Application } from 'express';
/**
 * Creates and configures an Express server for HTTP streaming MCP transport
 *
 * The server provides:
 * - /mcp endpoint: Main MCP endpoint (handles GET, POST, DELETE)
 * - /health endpoint: Health check endpoint
 *
 * @returns Configured Express application
 */
export declare function createExpressServer(): Promise<Application>;
//# sourceMappingURL=server.d.ts.map