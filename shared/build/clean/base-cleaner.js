/**
 * Base implementation for content cleaners
 */
export class BaseCleaner {
    options;
    constructor(options) {
        this.options = options;
    }
    /**
     * Truncate content if maxLength is specified
     */
    truncateIfNeeded(content) {
        if (this.options?.maxLength && content.length > this.options.maxLength) {
            return content.substring(0, this.options.maxLength) + '\n\n[Content truncated]';
        }
        return content;
    }
}
