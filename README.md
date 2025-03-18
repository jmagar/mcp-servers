# MCP Servers

A centralized repository for Model Context Protocol (MCP) server implementations.

## Overview

This repository serves as a container for various Model Context Protocol server implementations. The MCP ([modelcontextprotocol.io](https://modelcontextprotocol.io)) is a protocol for AI assistants to interact with tools, services, and data.

## Included Servers

This repository includes the following MCP servers:

- **[mcp-server-qdrant](https://github.com/qdrant/mcp-server-qdrant)**: Vector database for semantic memory storage
- **[mcp-server-docker](https://github.com/ckreiling/mcp-server-docker)**: Docker container operations
- **[mcp-server-firecrawl](https://github.com/vrknetha/mcp-server-firecrawl)**: Firecrawl MCP server
- **[searxng-mcp-server](https://github.com/maccam912/searxng-mcp-server)**: SearXNG metasearch engine integration
- **github**: GitHub API integration for repository management
- **git**: Git operations for local repositories
- **brave-search**: Integration with Brave Search engine
- **fetch**: HTTP request capabilities
- **filesystem**: Local filesystem operations
- **sequentialthinking**: Step-by-step reasoning capabilities
- **time**: Date and time utilities

## Structure

```
mcp/
├── .git/
├── .gitignore           # Configured for Python and TypeScript
├── README.md            # This file
├── mcp-server-qdrant/   # Qdrant MCP server submodule
├── mcp-server-docker/   # Docker MCP server submodule
├── mcp-server-firecrawl/# Firecrawl MCP server submodule
├── searxng-mcp-server/  # SearXNG MCP server submodule
├── github/              # GitHub MCP server
├── git/                 # Git MCP server
├── brave-search/        # Brave Search MCP server
├── fetch/               # Fetch MCP server
├── filesystem/          # Filesystem MCP server
├── sequentialthinking/  # Sequential Thinking MCP server
└── time/                # Time MCP server
```

## Getting Started

### Prerequisites

- Git with submodule support
- Python 3.8+ (for Python-based servers)
- Node.js 16+ (for TypeScript-based servers)

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp.git

# Initialize and update submodules
git submodule update --init --recursive
```

## Development

Each MCP server maintains its own development setup. Please refer to the README of individual server directories for specific development instructions.

## Contributing

1. Follow the development setup for the specific server you want to contribute to
2. Make your changes
3. Submit a pull request

## License

Each MCP server maintains its own license. Please check individual server directories for license information. 