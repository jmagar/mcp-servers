# MCP Servers

A centralized repository for Model Context Protocol (MCP) server implementations.

## Overview

This repository serves as a container for various Model Context Protocol server implementations. The MCP ([modelcontextprotocol.io](https://modelcontextprotocol.io)) is a protocol for AI assistants to interact with tools, services, and data.

## Included Servers

This repository includes the following MCP servers:

- **[qdrant](https://github.com/qdrant/mcp-server-qdrant)**: Vector database for semantic memory storage
- **[docker](https://github.com/ckreiling/mcp-server-docker)**: Docker container operations
- **[firecrawl](https://github.com/vrknetha/mcp-server-firecrawl)**: Firecrawl MCP server
- **[searxng](https://github.com/maccam912/searxng-mcp-server)**: SearXNG metasearch engine integration
- **[repomix](https://github.com/yamadashy/repomix)**: Repository generator and customization
- **[postgresql](https://github.com/vignesh-codes/ai-agents-mcp-pg)**: PostgreSQL database integration
- **[gmail](https://github.com/GongRzhe/Gmail-MCP-Server)**: Gmail email management
- **[installer](https://github.com/anaisbetts/mcp-installer)**: MCP server installation utilities
- **[prompts](https://github.com/sparesparrow/mcp-prompts)**: Prompt engineering and management
- **[architect](https://github.com/squirrelogic/mcp-architect)**: Software architecture planning
- **[docs-service](https://github.com/alekspetrov/mcp-docs-service)**: Documentation management
- **[youtube-transcript](https://github.com/kimtaeyoon83/mcp-server-youtube-transcript)**: YouTube transcript extraction
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
├── .gitignore                          # Configured for Python and TypeScript
├── README.md                           # This file
├── qdrant/                             # Qdrant MCP server submodule
├── docker/                             # Docker MCP server submodule
├── firecrawl/                          # Firecrawl MCP server submodule
├── searxng/                            # SearXNG metasearch engine submodule
├── repomix/                            # Repository generator submodule
├── postgresql/                         # PostgreSQL integration submodule
├── gmail/                              # Gmail integration submodule
├── installer/                          # MCP installer submodule
├── prompts/                            # Prompt engineering submodule
├── architect/                          # Architecture planning submodule
├── docs-service/                       # Documentation service submodule
├── youtube-transcript/                 # YouTube transcript submodule
├── github/                             # GitHub MCP server
├── git/                                # Git MCP server
├── brave-search/                       # Brave Search MCP server
├── fetch/                              # Fetch MCP server
├── filesystem/                         # Filesystem MCP server
├── sequentialthinking/                 # Sequential Thinking MCP server
└── time/                               # Time MCP server
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