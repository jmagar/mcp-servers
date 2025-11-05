import type { IScrapingClients } from './server.js';
import type { ScrapingStrategy, IStrategyConfigClient } from './strategy-config/index.js';
export interface ScrapeOptions {
    url: string;
    timeout?: number;
}
export interface ScrapeResult {
    success: boolean;
    content: string | null;
    source: string;
    error?: string;
    metadata?: Record<string, unknown>;
    isAuthError?: boolean;
    diagnostics?: {
        strategiesAttempted: string[];
        strategyErrors: Record<string, string>;
        timing?: Record<string, number>;
    };
}
/**
 * Extract URL pattern for strategy learning by taking the path up to the last segment.
 * For example:
 * - https://yelp.com/biz/dolly-san-francisco → yelp.com/biz/
 * - https://reddit.com/r/programming/comments/123/title → reddit.com/r/programming/comments/123/
 * - https://example.com/blog/2024/article → example.com/blog/2024/
 */
export declare function extractUrlPattern(url: string): string;
/**
 * Universal scraping that tries all strategies sequentially
 * Default (COST optimization): native -> firecrawl -> brightdata
 * SPEED optimization: firecrawl -> brightdata (skips native)
 */
export declare function scrapeUniversal(clients: IScrapingClients, options: ScrapeOptions): Promise<ScrapeResult>;
/**
 * Try a specific scraping strategy
 */
export declare function scrapeWithSingleStrategy(clients: IScrapingClients, strategy: ScrapingStrategy, options: ScrapeOptions): Promise<ScrapeResult>;
/**
 * Scrape with strategy configuration
 * First tries the configured strategy for the URL, then falls back to universal approach
 */
export declare function scrapeWithStrategy(clients: IScrapingClients, configClient: IStrategyConfigClient, options: ScrapeOptions, explicitStrategy?: ScrapingStrategy): Promise<ScrapeResult>;
