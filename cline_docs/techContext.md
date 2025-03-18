# Technical Context

## Technologies Used
- Git and Git Submodules for version control and project organization
- Python for certain MCP server implementations
- TypeScript/JavaScript for other MCP server implementations
- Container technology potentially used for deployment (Docker references in .gitignore)
- Model Context Protocol (MCP) for standardizing AI assistant interactions with tools and services

## Development Setup
- Local development requires git with submodule support
- Python environments managed through virtual environments (venv)
- Node.js environments managed through npm/yarn/pnpm
- IDE support for both Python and TypeScript codebases
- .gitignore configured for both Python and TypeScript development patterns
- Implementation must follow Model Context Protocol specifications from https://modelcontextprotocol.io

## Technical Constraints
- Submodules must be compatible with the parent repository's structure
- Version management across multiple submodules requires careful coordination
- Different technology stacks (Python vs TypeScript) must coexist in the project
- Shared resources must be accessible to all submodules when needed
- All server implementations must adhere to the Model Context Protocol standards
- Server APIs must be compatible with AI assistant interaction patterns 