import type { ToolResponse } from './types.js';
/**
 * Create a standard text response
 */
export declare function createTextResponse(text: string): ToolResponse;
/**
 * Create a success response with a message
 */
export declare function createSuccessResponse(message: string): ToolResponse;
/**
 * Create a response with multiple content items
 */
export declare function createMultiContentResponse(contents: Array<{
    type: string;
    text: string;
}>): ToolResponse;
/**
 * Create an empty response
 */
export declare function createEmptyResponse(): ToolResponse;
