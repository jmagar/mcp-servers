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
