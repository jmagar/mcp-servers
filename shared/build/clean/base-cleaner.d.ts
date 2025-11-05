import { ContentCleaner } from './index.js';
/**
 * Base implementation for content cleaners
 */
export declare abstract class BaseCleaner implements ContentCleaner {
    protected readonly options?: {
        maxLength?: number;
    } | undefined;
    constructor(options?: {
        maxLength?: number;
    } | undefined);
    abstract clean(content: string, url: string): Promise<string>;
    abstract canHandle(contentType: string): boolean;
    /**
     * Truncate content if maxLength is specified
     */
    protected truncateIfNeeded(content: string): string;
}
