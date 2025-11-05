import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
/**
 * Safely extract error message from unknown error
 */
export function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'Unknown error';
}
/**
 * Create a standardized error response
 */
export function createErrorResponse(error) {
    return {
        content: [
            {
                type: 'text',
                text: `Error: ${getErrorMessage(error)}`,
            },
        ],
        isError: true,
    };
}
/**
 * Create a not found MCP error
 */
export function createNotFoundError(resource) {
    return new McpError(ErrorCode.InvalidRequest, `Resource not found: ${resource}`);
}
/**
 * Create an invalid request MCP error
 */
export function createInvalidRequestError(message) {
    return new McpError(ErrorCode.InvalidRequest, message);
}
/**
 * Create an internal MCP error
 */
export function createInternalError(error) {
    return new McpError(ErrorCode.InternalError, `Internal error: ${getErrorMessage(error)}`);
}
/**
 * Create a method not found MCP error
 */
export function createMethodNotFoundError(method) {
    return new McpError(ErrorCode.MethodNotFound, `Unknown method: ${method}`);
}
