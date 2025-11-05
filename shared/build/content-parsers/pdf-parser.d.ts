/**
 * PDF content parser using pdf-parse
 */
import { BaseContentParser, ParsedContent } from './base-parser.js';
export declare class PDFParser extends BaseContentParser {
    constructor();
    parse(data: ArrayBuffer | string, contentType: string): Promise<ParsedContent>;
    private convertToMarkdown;
    private processText;
}
