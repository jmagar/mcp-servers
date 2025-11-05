import { BaseCleaner } from './base-cleaner.js';
/**
 * A cleaner that passes content through unchanged
 * Used for JSON, XML, and other structured formats
 */
export class PassThroughCleaner extends BaseCleaner {
    supportedTypes;
    constructor(supportedTypes, options) {
        super(options);
        this.supportedTypes = new Set(supportedTypes);
    }
    async clean(content, _url) {
        // Simply pass through the content, applying truncation if needed
        return this.truncateIfNeeded(content);
    }
    canHandle(contentType) {
        return this.supportedTypes.has(contentType);
    }
}
