import { ResourceStorage } from './types.js';
export type StorageType = 'memory' | 'filesystem';
export declare class ResourceStorageFactory {
    private static instance;
    static create(): Promise<ResourceStorage>;
    static reset(): void;
}
