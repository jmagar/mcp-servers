import { MemoryResourceStorage } from './memory.js';
import { FileSystemResourceStorage } from './filesystem.js';
export class ResourceStorageFactory {
    static instance = null;
    static async create() {
        if (this.instance) {
            return this.instance;
        }
        const storageType = (process.env.MCP_RESOURCE_STORAGE || 'memory').toLowerCase();
        switch (storageType) {
            case 'memory': {
                this.instance = new MemoryResourceStorage();
                break;
            }
            case 'filesystem': {
                const rootDir = process.env.MCP_RESOURCE_FILESYSTEM_ROOT;
                const fsStorage = new FileSystemResourceStorage(rootDir);
                await fsStorage.init();
                this.instance = fsStorage;
                break;
            }
            default:
                throw new Error(`Unsupported storage type: ${storageType}. Supported types: memory, filesystem`);
        }
        return this.instance;
    }
    static reset() {
        this.instance = null;
    }
}
