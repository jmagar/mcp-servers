/**
 * Logging utilities for consistent output across MCP servers
 */
/**
 * Log server startup message
 */
export declare function logServerStart(serverName: string, transport?: string): void;
/**
 * Log an error with context
 */
export declare function logError(context: string, error: unknown): void;
/**
 * Log a warning
 */
export declare function logWarning(context: string, message: string): void;
/**
 * Log debug information (only in development)
 */
export declare function logDebug(context: string, message: string): void;
