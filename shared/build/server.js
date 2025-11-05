import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { registerResources } from './resources.js';
import { createRegisterTools } from './tools.js';
import { FilesystemStrategyConfigClient } from './strategy-config/index.js';
import { NativeScrapingClient } from './scraping-client/native-scrape-client.js';
// Native fetcher implementation that uses the enhanced NativeScrapingClient
export class NativeFetcher {
    client = new NativeScrapingClient();
    async scrape(url, options) {
        const result = await this.client.scrape(url, {
            timeout: options?.timeout,
            headers: options?.headers,
            method: options?.method,
            body: options?.body,
        });
        return {
            success: result.success,
            status: result.statusCode,
            data: result.data,
            error: result.error,
        };
    }
}
// Firecrawl client implementation
export class FirecrawlClient {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async scrape(url, options) {
        const { scrapeWithFirecrawl } = await import('./scraping-client/lib/firecrawl-scrape.js');
        return scrapeWithFirecrawl(this.apiKey, url, options);
    }
    async startCrawl(config) {
        const { startFirecrawlCrawl } = await import('./scraping-client/lib/firecrawl-scrape.js');
        return startFirecrawlCrawl(this.apiKey, config);
    }
}
// BrightData client implementation
export class BrightDataClient {
    bearerToken;
    constructor(bearerToken) {
        this.bearerToken = bearerToken;
    }
    async scrape(url, options) {
        const { scrapeWithBrightData } = await import('./scraping-client/lib/brightdata-scrape.js');
        return scrapeWithBrightData(this.bearerToken, url, options);
    }
}
export function createMCPServer() {
    const server = new Server({
        name: '@pulsemcp/pulse-fetch',
        version: '0.0.1',
    }, {
        capabilities: {
            resources: {},
            tools: {},
        },
    });
    const registerHandlers = async (server, clientFactory, strategyConfigFactory) => {
        // Use provided factory or create default clients
        const factory = clientFactory ||
            (() => {
                const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
                const brightDataToken = process.env.BRIGHTDATA_API_KEY;
                const clients = {
                    native: new NativeFetcher(),
                };
                if (firecrawlApiKey) {
                    clients.firecrawl = new FirecrawlClient(firecrawlApiKey);
                }
                if (brightDataToken) {
                    clients.brightData = new BrightDataClient(brightDataToken);
                }
                return clients;
            });
        // Use provided strategy config factory or create default
        const configFactory = strategyConfigFactory || (() => new FilesystemStrategyConfigClient());
        registerResources(server);
        const registerTools = createRegisterTools(factory, configFactory);
        registerTools(server);
    };
    return { server, registerHandlers };
}
