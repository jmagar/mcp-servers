export interface CrawlRequestConfig {
    url: string;
    excludePaths: string[];
    maxDepth: number;
    changeDetection: boolean;
}
export declare function buildCrawlRequestConfig(targetUrl: string): CrawlRequestConfig | null;
export declare function shouldStartCrawl(targetUrl: string): boolean;
