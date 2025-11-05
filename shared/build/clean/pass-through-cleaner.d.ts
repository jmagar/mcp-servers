import { BaseCleaner } from './base-cleaner.js';
/**
 * A cleaner that passes content through unchanged
 * Used for JSON, XML, and other structured formats
 */
export declare class PassThroughCleaner extends BaseCleaner {
    private readonly supportedTypes;
    constructor(supportedTypes: string[], options?: {
        maxLength?: number;
    });
    clean(content: string, _url: string): Promise<string>;
    canHandle(contentType: string): boolean;
}
