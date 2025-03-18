# System Patterns

## Architecture Overview
- Main repository serves as a container for multiple Model Context Protocol (MCP) server submodules
- Git submodules are used to manage individual MCP server repositories
- Each server maintains its own codebase while sharing common configuration patterns
- All servers implement the Model Context Protocol for AI assistant interactions

## Key Technical Decisions
- Git submodules chosen for independent versioning while maintaining central management
- Supporting both Python and TypeScript codebases
- Standardized .gitignore setup across all submodules
- Modular architecture to allow servers to be developed and deployed independently
- Following Model Context Protocol specifications from https://modelcontextprotocol.io

## Patterns
- Each submodule represents a distinct MCP server with its own technology stack
- Common configuration approaches should be shared when possible
- Development setup should allow for working on multiple servers simultaneously
- Version control should maintain compatibility across interrelated servers
- All servers should implement consistent Model Context Protocol interfaces
- Standardized API patterns for AI assistant tool interactions 