/**
 * Native scraping client implementation
 * Provides basic HTTP fetching without external services
 */
export interface INativeScrapingClient {
    scrape(url: string, options?: NativeScrapingOptions): Promise<NativeScrapingResult>;
}
export interface NativeScrapingOptions {
    timeout?: number;
    headers?: Record<string, string>;
    method?: 'GET' | 'POST';
    body?: string;
}
export interface NativeScrapingResult {
    success: boolean;
    data?: string;
    error?: string;
    statusCode?: number;
    headers?: Record<string, string>;
    contentType?: string;
    contentLength?: number;
    metadata?: Record<string, unknown>;
}
export declare class NativeScrapingClient implements INativeScrapingClient {
    private defaultHeaders;
    private parserFactory;
    scrape(url: string, options?: NativeScrapingOptions): Promise<NativeScrapingResult>;
}
