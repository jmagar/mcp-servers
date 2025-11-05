/**
 * Base interface for content parsers
 */
export interface ParsedContent {
    content: string;
    metadata?: {
        originalType: string;
        [key: string]: unknown;
    };
}
export interface ContentParser {
    canParse(contentType: string): boolean;
    parse(data: ArrayBuffer | string, contentType: string): Promise<ParsedContent>;
}
export declare abstract class BaseContentParser implements ContentParser {
    protected supportedTypes: string[];
    constructor(supportedTypes: string[]);
    canParse(contentType: string): boolean;
    abstract parse(data: ArrayBuffer | string, contentType: string): Promise<ParsedContent>;
}
