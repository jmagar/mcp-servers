import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { IScrapingClients, StrategyConfigFactory } from '../server.js';
export declare function scrapeTool(_server: Server, clientsFactory: () => IScrapingClients, strategyConfigFactory: StrategyConfigFactory): {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            extract: {
                type: string;
                description: "Natural language query for intelligent content extraction. Describe what information you want extracted from the scraped page.\n\nExamples:\n\nSimple data extraction:\n- \"the author name and publication date\"\n- \"all email addresses mentioned on the page\"\n- \"the main product price and availability status\"\n- \"company address and phone number\"\n\nFormatted extraction (specify desired format):\n- \"summarize the main article in 3 bullet points\"\n- \"extract the recipe ingredients as a markdown list\"\n- \"get the pricing tiers as a comparison table in markdown\"\n- \"extract all testimonials with customer names and quotes formatted as markdown blockquotes\"\n\nStructured data extraction (request specific output format):\n- \"extract product details as JSON with fields: name, price, description, specifications\"\n- \"get all job listings as JSON array with title, location, salary, and requirements\"\n- \"extract the FAQ section as JSON with question and answer pairs\"\n- \"parse the contact information into JSON format with fields for address, phone, email, and hours\"\n\nComplex queries:\n- \"analyze the sentiment of customer reviews and categorize them as positive, negative, or neutral\"\n- \"extract and summarize the key features of the product, highlighting unique selling points\"\n- \"identify all dates mentioned and what events they relate to\"\n- \"extract technical specifications and explain them in simple terms\"\n\nThe LLM will intelligently parse the page content and return only the requested information in a clear, readable format.";
            };
            url: {
                type: string;
                format: string;
                description: "The webpage URL to scrape (e.g., \"https://example.com/article\", \"https://api.example.com/docs\")";
            };
            timeout: {
                type: string;
                default: number;
                description: "Maximum time to wait for page load in milliseconds. Increase for slow-loading sites (e.g., 120000 for 2 minutes). Default: 60000 (1 minute)";
            };
            maxChars: {
                type: string;
                default: number;
                description: "Maximum number of characters to return from the scraped content. Useful for limiting response size. Default: 100000";
            };
            startIndex: {
                type: string;
                default: number;
                description: "Character position to start reading from. Use with maxChars for pagination through large documents (e.g., startIndex: 100000 to skip first 100k chars). Default: 0";
            };
            resultHandling: {
                type: string;
                enum: string[];
                default: string;
                description: "How to handle scraped content and MCP Resources. Options: \"saveOnly\" (saves as linked resource, no content returned), \"saveAndReturn\" (saves as embedded resource and returns content - default), \"returnOnly\" (returns content without saving). Default: \"saveAndReturn\"";
            };
            forceRescrape: {
                type: string;
                default: boolean;
                description: "Force a fresh scrape even if cached content exists for this URL. Useful when you know the content has changed. Default: false";
            };
            cleanScrape: {
                type: string;
                default: boolean;
                description: "Whether to clean the scraped content by converting HTML to semantic Markdown of what's on the page, removing ads, navigation, and boilerplate. This typically reduces content size by 50-90% while preserving main content. Only disable this for debugging or when you need the exact raw HTML structure. Default: true";
            };
        };
        required: string[];
    } | {
        type: "object";
        properties: {
            url: {
                type: string;
                format: string;
                description: "The webpage URL to scrape (e.g., \"https://example.com/article\", \"https://api.example.com/docs\")";
            };
            timeout: {
                type: string;
                default: number;
                description: "Maximum time to wait for page load in milliseconds. Increase for slow-loading sites (e.g., 120000 for 2 minutes). Default: 60000 (1 minute)";
            };
            maxChars: {
                type: string;
                default: number;
                description: "Maximum number of characters to return from the scraped content. Useful for limiting response size. Default: 100000";
            };
            startIndex: {
                type: string;
                default: number;
                description: "Character position to start reading from. Use with maxChars for pagination through large documents (e.g., startIndex: 100000 to skip first 100k chars). Default: 0";
            };
            resultHandling: {
                type: string;
                enum: string[];
                default: string;
                description: "How to handle scraped content and MCP Resources. Options: \"saveOnly\" (saves as linked resource, no content returned), \"saveAndReturn\" (saves as embedded resource and returns content - default), \"returnOnly\" (returns content without saving). Default: \"saveAndReturn\"";
            };
            forceRescrape: {
                type: string;
                default: boolean;
                description: "Force a fresh scrape even if cached content exists for this URL. Useful when you know the content has changed. Default: false";
            };
            cleanScrape: {
                type: string;
                default: boolean;
                description: "Whether to clean the scraped content by converting HTML to semantic Markdown of what's on the page, removing ads, navigation, and boilerplate. This typically reduces content size by 50-90% while preserving main content. Only disable this for debugging or when you need the exact raw HTML structure. Default: true";
            };
        };
        required: string[];
    };
    handler: (args: unknown) => Promise<{
        content: Array<{
            type: string;
            text?: string;
            uri?: string;
            name?: string;
            mimeType?: string;
            description?: string;
            resource?: {
                uri: string;
                name?: string;
                mimeType?: string;
                description?: string;
                text?: string;
            };
        }>;
    } | {
        content: {
            type: string;
            text: string;
        }[];
        isError: boolean;
    }>;
};
