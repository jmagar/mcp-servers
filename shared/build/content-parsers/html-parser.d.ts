/**
 * HTML content parser
 * Converts HTML to clean text/markdown
 */
import { BaseContentParser, ParsedContent } from './base-parser.js';
export declare class HTMLParser extends BaseContentParser {
    constructor();
    parse(data: ArrayBuffer | string, contentType: string): Promise<ParsedContent>;
}
