/**
 * Factory for content parsers
 * Routes content to appropriate parser based on content type
 */
import { PDFParser } from './pdf-parser.js';
import { HTMLParser } from './html-parser.js';
import { PassthroughParser } from './passthrough-parser.js';
export class ContentParserFactory {
    parsers;
    passthroughParser;
    constructor() {
        // Order matters - first matching parser wins
        this.parsers = [new PDFParser(), new HTMLParser()];
        // Fallback parser
        this.passthroughParser = new PassthroughParser();
    }
    /**
     * Parse content based on its content type
     */
    async parse(data, contentType) {
        // Clean up content type (remove charset, etc.)
        const cleanContentType = contentType.split(';')[0].trim();
        // Find appropriate parser
        const parser = this.parsers.find((p) => p.canParse(cleanContentType)) || this.passthroughParser;
        return parser.parse(data, cleanContentType);
    }
    /**
     * Check if content type requires binary handling (ArrayBuffer)
     */
    requiresBinaryHandling(contentType) {
        const cleanContentType = contentType.split(';')[0].trim().toLowerCase();
        // List of content types that need binary handling
        const binaryTypes = [
            'application/pdf',
            'image/',
            'video/',
            'audio/',
            'application/octet-stream',
            'application/zip',
            'application/gzip',
        ];
        return binaryTypes.some((type) => cleanContentType.includes(type));
    }
}
