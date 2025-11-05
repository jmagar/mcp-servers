import type { IStrategyConfigClient, StrategyConfigEntry, StrategyConfigOptions, ScrapingStrategy } from './types.js';
/**
 * Filesystem-based implementation of strategy config client
 * Stores configuration as a markdown table in a local file
 */
export declare class FilesystemStrategyConfigClient implements IStrategyConfigClient {
    private configPath;
    private configPathPromise;
    private options;
    constructor(options?: StrategyConfigOptions);
    private getConfigPath;
    loadConfig(): Promise<StrategyConfigEntry[]>;
    saveConfig(config: StrategyConfigEntry[]): Promise<void>;
    upsertEntry(entry: StrategyConfigEntry): Promise<void>;
    getStrategyForUrl(url: string): Promise<ScrapingStrategy | null>;
    private matchesPrefix;
    private parseMarkdownTable;
    private parseTableRow;
    private generateMarkdownTable;
}
