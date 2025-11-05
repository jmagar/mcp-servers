import { BaseCleaner } from './base-cleaner.js';
/**
 * Cleaner for HTML content that extracts main content and converts to clean Markdown
 */
export declare class HtmlCleaner extends BaseCleaner {
    clean(content: string, _url: string): Promise<string>;
    canHandle(contentType: string): boolean;
}
