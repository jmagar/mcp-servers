/**
 * Create a standard text response
 */
export function createTextResponse(text) {
    return {
        content: [
            {
                type: 'text',
                text,
            },
        ],
    };
}
/**
 * Create a success response with a message
 */
export function createSuccessResponse(message) {
    return createTextResponse(message);
}
/**
 * Create a response with multiple content items
 */
export function createMultiContentResponse(contents) {
    return {
        content: contents,
    };
}
/**
 * Create an empty response
 */
export function createEmptyResponse() {
    return {
        content: [],
    };
}
