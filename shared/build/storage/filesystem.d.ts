import { ResourceStorage, ResourceData, ResourceContent, ResourceMetadata, MultiResourceWrite, MultiResourceUris } from './types.js';
export declare class FileSystemResourceStorage implements ResourceStorage {
    private rootDir;
    constructor(rootDir?: string);
    init(): Promise<void>;
    list(): Promise<ResourceData[]>;
    read(uri: string): Promise<ResourceContent>;
    write(url: string, content: string, metadata?: Partial<ResourceMetadata>): Promise<string>;
    writeMulti(data: MultiResourceWrite): Promise<MultiResourceUris>;
    exists(uri: string): Promise<boolean>;
    delete(uri: string): Promise<void>;
    findByUrl(url: string): Promise<ResourceData[]>;
    findByUrlAndExtract(url: string, extractPrompt?: string): Promise<ResourceData[]>;
    private fileExists;
    private uriToFilePath;
    private generateFileName;
    private createMarkdownFile;
    private parseMarkdownFile;
}
