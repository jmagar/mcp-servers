/**
 * Factory for content parsers
 * Routes content to appropriate parser based on content type
 */
import { ParsedContent } from './base-parser.js';
export declare class ContentParserFactory {
    private parsers;
    private passthroughParser;
    constructor();
    /**
     * Parse content based on its content type
     */
    parse(data: ArrayBuffer | string, contentType: string): Promise<ParsedContent>;
    /**
     * Check if content type requires binary handling (ArrayBuffer)
     */
    requiresBinaryHandling(contentType: string): boolean;
}
