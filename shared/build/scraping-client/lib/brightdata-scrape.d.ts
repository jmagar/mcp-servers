export declare function scrapeWithBrightData(bearerToken: string, url: string, options?: Record<string, unknown>): Promise<{
    success: boolean;
    data?: string;
    error?: string;
}>;
