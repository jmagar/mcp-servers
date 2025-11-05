/**
 * BrightData scraping client implementation
 * Provides anti-bot bypass capabilities using BrightData Web Unlocker
 */
export interface IBrightDataScrapingClient {
    scrape(url: string, options?: BrightDataScrapingOptions): Promise<BrightDataScrapingResult>;
}
export interface BrightDataScrapingOptions {
    zone?: string;
    format?: 'raw' | 'json';
    country?: string;
    render?: boolean;
    waitFor?: number;
}
export interface BrightDataScrapingResult {
    success: boolean;
    data?: string;
    error?: string;
}
export declare class BrightDataScrapingClient implements IBrightDataScrapingClient {
    private bearerToken;
    constructor(bearerToken: string);
    scrape(url: string, options?: BrightDataScrapingOptions): Promise<BrightDataScrapingResult>;
}
