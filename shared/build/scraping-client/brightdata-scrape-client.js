/**
 * BrightData scraping client implementation
 * Provides anti-bot bypass capabilities using BrightData Web Unlocker
 */
export class BrightDataScrapingClient {
    bearerToken;
    constructor(bearerToken) {
        this.bearerToken = bearerToken;
    }
    async scrape(url, options = {}) {
        const { scrapeWithBrightData } = await import('./lib/brightdata-scrape.js');
        return scrapeWithBrightData(this.bearerToken, url, options);
    }
}
