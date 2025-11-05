import type { IExtractClient, ExtractOptions, ExtractResult, LLMConfig } from './types.js';
export declare class OpenAICompatibleExtractClient implements IExtractClient {
    private client;
    private model;
    constructor(config: LLMConfig);
    extract(content: string, query: string, _options?: ExtractOptions): Promise<ExtractResult>;
}
