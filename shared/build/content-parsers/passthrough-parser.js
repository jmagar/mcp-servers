/**
 * Passthrough parser for content that doesn't need special parsing
 */
import { BaseContentParser } from './base-parser.js';
export class PassthroughParser extends BaseContentParser {
    constructor() {
        // This parser handles everything else
        super(['*']);
    }
    canParse(_contentType) {
        // Always returns true as this is the fallback parser
        return true;
    }
    async parse(data, _contentType) {
        let content;
        if (data instanceof ArrayBuffer) {
            // Convert ArrayBuffer to string
            const decoder = new TextDecoder('utf-8');
            content = decoder.decode(data);
        }
        else {
            content = data;
        }
        return {
            content,
            metadata: {
                originalType: _contentType,
            },
        };
    }
}
