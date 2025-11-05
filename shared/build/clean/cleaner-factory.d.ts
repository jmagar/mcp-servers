import { ContentCleaner, CleanerOptions } from './index.js';
/**
 * Creates an appropriate cleaner based on content type
 * @param content The content to clean
 * @param url The source URL
 * @param options Cleaner options
 * @returns The appropriate content cleaner
 */
export declare function createCleaner(content: string, url: string, options?: CleanerOptions): ContentCleaner;
