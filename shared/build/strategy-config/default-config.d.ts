/**
 * Get the path to the strategy configuration file.
 *
 * Priority:
 * 1. STRATEGY_CONFIG_PATH environment variable
 * 2. Default temp directory location
 *
 * If using default location and file doesn't exist, copies the
 * built-in config to the temp directory.
 */
export declare function getStrategyConfigPath(): Promise<string>;
