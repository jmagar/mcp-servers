import type { CrawlRequestConfig } from '../../crawl/config.js';
export declare function scrapeWithFirecrawl(apiKey: string, url: string, options?: Record<string, unknown>): Promise<{
    success: boolean;
    data?: {
        content: string;
        markdown: string;
        html: string;
        metadata: Record<string, unknown>;
    };
    error?: string;
}>;
export declare function startFirecrawlCrawl(apiKey: string, config: CrawlRequestConfig): Promise<{
    success: boolean;
    crawlId?: string;
    error?: string;
}>;
