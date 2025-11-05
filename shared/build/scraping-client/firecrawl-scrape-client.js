/**
 * Firecrawl scraping client implementation
 * Provides enhanced content extraction using Firecrawl API
 */
export class FirecrawlScrapingClient {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async scrape(url, options = {}) {
        const { scrapeWithFirecrawl } = await import('./lib/firecrawl-scrape.js');
        return scrapeWithFirecrawl(this.apiKey, url, options);
    }
}
