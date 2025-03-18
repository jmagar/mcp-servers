# MCP Servers Connection Commands

This document provides the commands needed to connect to each Model Context Protocol (MCP) server in this repository. Each command has been tested and its status is indicated.

## 1. qdrant (Vector Database) ✅
```bash
QDRANT_URL="http://localhost:6333" COLLECTION_NAME="my-collection" uvx mcp-server-qdrant
```

## 2. docker (Container Operations) ⚠️
```bash
uv --directory /path/to/docker run mcp-server-docker
```
*Note: Requires local setup with proper path*

## 3. firecrawl (Web Crawling) ✅
```bash
env FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp
```
*Note: Requires valid API key*

## 4. searxng (Metasearch Engine) ⚠️
```bash
uv run https://raw.githubusercontent.com/maccam912/searxng-mcp-server/refs/heads/main/server.py --url https://s.tootie.tv
```
*Note: Requires SearXNG instance URL*

## 5. repomix (Repository Generator) ⚠️
```bash
npx repomix --mcp
```
*Note: The `--mcp` flag is needed to run as an MCP server*

## 6. postgresql (Database Integration) ⚠️
```bash
npx -y @modelcontextprotocol/server-postgres
```
*Note: Requires database connection details*

## 7. gmail (Email Management) ⚠️
```bash
npx @gongrzhe/server-gmail-autoauth-mcp
```
*Note: Requires OAuth credentials setup*

## 8. installer (MCP Installation) ⚠️
```bash
npx -y @anaisbetts/mcp-installer
```
*Note: Helper server to install other MCP servers*

## 9. prompts (Prompt Engineering) ⚠️
```bash
npx -y @sparesparrow/mcp-prompts
```
*Note: Used for prompt engineering tasks*

## 10. architect (Architecture Planning) ⚠️
```bash
npx -y @squirrelogic/mcp-architect
```
*Note: Provides architectural expertise*

## 11. docs-service (Documentation Management) ⚠️
```bash
npx -y @alekspetrov/mcp-docs-service
```
*Note: Documentation management tools*

## 12. youtube-transcript (YouTube Transcripts) ✅
```bash
npx -y @kimtaeyoon83/mcp-server-youtube-transcript
```

## 13. github (GitHub Integration) ✅
```bash
npx -y @modelcontextprotocol/server-github
```
*Note: Requires GitHub token for full functionality*

## 14. git (Git Operations) ✅
```bash
uvx mcp-server-git --repository /path/to/git/repo
```
*Note: Requires path to Git repository*

## 15. brave-search (Brave Search Integration) ✅
```bash
npx -y @modelcontextprotocol/server-brave-search
```
*Note: Requires BRAVE_API_KEY environment variable*

## 16. fetch (HTTP Requests) ✅
```bash
uvx mcp-server-fetch
```

## 17. filesystem (File Operations) ✅
```bash
npx -y @modelcontextprotocol/server-filesystem
```
*Note: Requires directory path for full functionality*

## 18. sequentialthinking (Reasoning) ✅
```bash
npx -y @modelcontextprotocol/server-sequential-thinking
```
*Note: Implements structured problem solving and reasoning*

## 19. time (Date and Time Utilities) ✅
```bash
uvx mcp-server-time
```

## Legend
- ✅ Tested and available
- ⚠️ Not tested or requires specific configuration
- ❌ Not available or has issues

## Configuration with Claude Desktop

To use these servers with Claude Desktop, add the configurations to your `claude_desktop_config.json` file. Here's an example configuration:

```json
{
  "mcpServers": {
    "qdrant": {
      "command": "uvx",
      "args": ["mcp-server-qdrant"],
      "env": {
        "QDRANT_URL": "http://localhost:6333",
        "COLLECTION_NAME": "my-collection"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-token"
      }
    }
    // Add other servers as needed
  }
}
```
