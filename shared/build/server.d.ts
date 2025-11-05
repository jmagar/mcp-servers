import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { IStrategyConfigClient } from './strategy-config/index.js';
export interface IFirecrawlClient {
    scrape(url: string, options?: Record<string, unknown>): Promise<{
        success: boolean;
        data?: {
            content: string;
            markdown: string;
            html: string;
            metadata: Record<string, unknown>;
        };
        error?: string;
    }>;
}
export interface IBrightDataClient {
    scrape(url: string, options?: Record<string, unknown>): Promise<{
        success: boolean;
        data?: string;
        error?: string;
    }>;
}
export interface INativeFetcher {
    scrape(url: string, options?: {
        timeout?: number;
    } & RequestInit): Promise<{
        success: boolean;
        status?: number;
        data?: string;
        error?: string;
    }>;
}
export declare class NativeFetcher implements INativeFetcher {
    private client;
    scrape(url: string, options?: {
        timeout?: number;
    } & RequestInit): Promise<{
        success: boolean;
        status?: number;
        data?: string;
        error?: string;
    }>;
}
export declare class FirecrawlClient implements IFirecrawlClient {
    private apiKey;
    constructor(apiKey: string);
    scrape(url: string, options?: Record<string, unknown>): Promise<{
        success: boolean;
        data?: {
            content: string;
            markdown: string;
            html: string;
            metadata: Record<string, unknown>;
        };
        error?: string;
    }>;
}
export declare class BrightDataClient implements IBrightDataClient {
    private bearerToken;
    constructor(bearerToken: string);
    scrape(url: string, options?: Record<string, unknown>): Promise<{
        success: boolean;
        data?: string;
        error?: string;
    }>;
}
export interface IScrapingClients {
    native: INativeFetcher;
    firecrawl?: IFirecrawlClient;
    brightData?: IBrightDataClient;
}
export type ClientFactory = () => IScrapingClients;
export type StrategyConfigFactory = () => IStrategyConfigClient;
export declare function createMCPServer(): {
    server: Server<{
        method: string;
        params?: {
            [x: string]: unknown;
            _meta?: {
                [x: string]: unknown;
                progressToken?: string | number | undefined;
            } | undefined;
        } | undefined;
    }, {
        method: string;
        params?: {
            [x: string]: unknown;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
        } | undefined;
    }, {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    }>;
    registerHandlers: (server: Server, clientFactory?: ClientFactory, strategyConfigFactory?: StrategyConfigFactory) => Promise<void>;
};
