/**
 * Passthrough parser for content that doesn't need special parsing
 */
import { BaseContentParser, ParsedContent } from './base-parser.js';
export declare class PassthroughParser extends BaseContentParser {
    constructor();
    canParse(_contentType: string): boolean;
    parse(data: ArrayBuffer | string, _contentType: string): Promise<ParsedContent>;
}
