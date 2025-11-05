/**
 * Logging utilities for consistent output across MCP servers
 */
/**
 * Log server startup message
 */
export function logServerStart(serverName, transport = 'stdio') {
    console.error(`MCP server ${serverName} running on ${transport}`);
}
/**
 * Log an error with context
 */
export function logError(context, error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error(`[ERROR] ${context}: ${message}`);
    if (stack) {
        console.error(stack);
    }
}
/**
 * Log a warning
 */
export function logWarning(context, message) {
    console.error(`[WARN] ${context}: ${message}`);
}
/**
 * Log debug information (only in development)
 */
export function logDebug(context, message) {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG) {
        console.error(`[DEBUG] ${context}: ${message}`);
    }
}
