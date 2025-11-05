import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { ClientFactory, StrategyConfigFactory } from './server.js';
export declare function createRegisterTools(clientFactory: ClientFactory, strategyConfigFactory: StrategyConfigFactory): (server: Server) => void;
