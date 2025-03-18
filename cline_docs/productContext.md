# Product Context

## Project Purpose
This project serves as a repository for Model Context Protocol (MCP) servers. The MCP (https://modelcontextprotocol.io) is a protocol for AI assistants to interact with tools, services and data. The servers are organized as git submodules, allowing for centralized management while maintaining individual versioning.

## Problems Solved
- Centralizes management of multiple MCP servers
- Simplifies deployment and development workflows
- Provides uniform configuration and setup across different MCP server implementations
- Enables consistent version control strategies across submodules
- Facilitates AI assistants' access to tools, services, and data through the Model Context Protocol

## How It Should Work
- The main repository contains git submodules for each MCP server
- Common configuration and shared resources are maintained at the root level
- Each submodule maintains its own codebase (Python or TypeScript based)
- Developers can work on individual submodules or the entire system
- Configuration between servers is standardized where possible
- Servers implement the Model Context Protocol to enable AI assistants to interact with various tools and services 