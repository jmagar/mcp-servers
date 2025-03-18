# MCP Servers

A centralized repository for Model Context Protocol (MCP) server implementations.

## Overview

This repository serves as a container for various Model Context Protocol server implementations. The MCP ([modelcontextprotocol.io](https://modelcontextprotocol.io)) is a protocol for AI assistants to interact with tools, services, and data.

Each server is maintained as a git submodule, allowing for independent versioning while providing centralized management.

## Structure

```
mcp/
├── .git/
├── .gitignore           # Configured for Python and TypeScript
├── README.md            # This file
└── [server1]/           # MCP server submodule
└── [server2]/           # MCP server submodule
└── [server3]/           # MCP server submodule
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

Each MCP server maintains its own development setup. Please refer to the README of individual server submodules for specific development instructions.

## Contributing

1. Follow the development setup for the specific server you want to contribute to
2. Make your changes
3. Submit a pull request to the appropriate submodule repository

## License

Each server submodule maintains its own license. Please check individual submodule repositories for license information. 