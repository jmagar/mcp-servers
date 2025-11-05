import type { IExtractClient, LLMConfig } from './types.js';
/**
 * Factory for creating extract clients based on configuration
 */
export declare class ExtractClientFactory {
    /**
     * Create an extract client from environment variables
     * Returns null if no configuration is found
     */
    static createFromEnv(): IExtractClient | null;
    /**
     * Create an extract client from configuration
     */
    static create(config: LLMConfig): IExtractClient;
    /**
     * Check if extract functionality is available
     * (either through environment configuration or MCP sampling)
     */
    static isAvailable(): boolean;
}
