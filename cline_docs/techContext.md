# Technical Context

## Technologies Used
- Git and Git Submodules for version control and project organization
- Python for certain MCP server implementations (qdrant, git, fetch, time)
- TypeScript/JavaScript for other MCP server implementations (github, brave-search, filesystem, sequentialthinking)
- Docker containerization for deployment (most servers include Dockerfiles)
- Model Context Protocol (MCP) for standardizing AI assistant interactions with tools and services
- Database technologies (PostgreSQL, Qdrant)
- Web services integration (Gmail, YouTube)
- Web crawling and content extraction (Firecrawl)
- Search engines (SearXNG, Brave Search)

## Development Setup
- Local development requires git with submodule support
- Python environments managed through virtual environments (venv)
- Node.js environments managed through npm/yarn/pnpm
- IDE support for both Python and TypeScript codebases
- .gitignore configured for both Python and TypeScript development patterns
- Implementation must follow Model Context Protocol specifications from https://modelcontextprotocol.io
- Google API credentials for certain services (Gmail, YouTube)
- Database connections for data storage services

## Technical Constraints
- Submodules must be compatible with the parent repository's structure
- Different technology stacks (Python vs TypeScript) must coexist in the project
- Different MCP servers have varying requirements and dependencies
- All server implementations must adhere to the Model Context Protocol standards
- Server APIs must be compatible with AI assistant interaction patterns
- Some servers require external API keys or credentials
- Authentication and security considerations vary between services
- Consistent naming conventions for modularity and clarity

## Server Overview
- **qdrant**: Vector database for semantic memory storage
  - Python-based, requires connection to a Qdrant vector database
- **docker**: Docker container operations
  - TypeScript-based, provides Docker management capabilities
- **firecrawl**: Firecrawl MCP server
  - TypeScript-based, provides web crawling functionality
- **searxng**: SearXNG metasearch engine integration
  - Python-based, provides privacy-focused search capabilities
- **repomix**: Repository generator and customization
  - JavaScript-based, helps generate and manage repositories
- **postgresql**: PostgreSQL database integration
  - TypeScript/JavaScript-based, enables PostgreSQL database interactions
- **gmail**: Gmail email management
  - TypeScript-based, requires Gmail API credentials
- **installer**: MCP server installation utilities
  - TypeScript-based, helps with MCP server setup
- **prompts**: Prompt engineering and management
  - JavaScript-based, provides prompt templates and management
- **architect**: Software architecture planning
  - JavaScript-based, assists with architecture design
- **docs-service**: Documentation management
  - TypeScript-based, helps create and manage documentation
- **youtube-transcript**: YouTube transcript extraction
  - TypeScript-based, extracts transcripts from YouTube videos
- **github**: GitHub API integration
  - TypeScript-based, requires GitHub API tokens
- **git**: Git operations
  - Python-based, operates on local repositories
- **brave-search**: Brave Search integration
  - TypeScript-based, requires Brave Search API key
- **fetch**: HTTP request capabilities
  - Python-based, allows making HTTP requests to external services
- **filesystem**: Local filesystem operations
  - TypeScript-based, provides access to the file system
- **sequentialthinking**: Step-by-step reasoning
  - TypeScript-based, helps with complex problem solving
- **time**: Date and time utilities
  - Python-based, provides time-related functionality 