import { McpError } from '@modelcontextprotocol/sdk/types.js';
import type { ToolResponse } from './types.js';
/**
 * Safely extract error message from unknown error
 */
export declare function getErrorMessage(error: unknown): string;
/**
 * Create a standardized error response
 */
export declare function createErrorResponse(error: unknown): ToolResponse;
/**
 * Create a not found MCP error
 */
export declare function createNotFoundError(resource: string): McpError;
/**
 * Create an invalid request MCP error
 */
export declare function createInvalidRequestError(message: string): McpError;
/**
 * Create an internal MCP error
 */
export declare function createInternalError(error: unknown): McpError;
/**
 * Create a method not found MCP error
 */
export declare function createMethodNotFoundError(method: string): McpError;
