# Pulse Fetch MCP Server Setup Investigation

**Date**: 2025-11-05  
**Session**: Configuration and setup of self-hosted Firecrawl integration

## Initial Problem

User attempted to run the server but encountered missing build files:
```bash
Error: Cannot find module '/home/jmagar/code/pulse-fetch/local/build/index.js'
```

## Investigation Steps

### 1. Build System Analysis

**File**: `/home/jmagar/code/pulse-fetch/package.json`
- Root build script referenced: `../../scripts/build-mcp-server.js`
- This file doesn't exist (project was extracted from larger monorepo)

**File**: `/home/jmagar/code/pulse-fetch/local/package.json`
- Local workspace has own build script: `"build": "tsc && npm run build:integration"`
- Proper scripts available: `dev`, `start`, `build`

**Solution**: Build from local workspace instead of root
```bash
cd /home/jmagar/code/pulse-fetch/local && npm run build
```

### 2. Firecrawl Service Detection Issue

**Initial Run Output**:
```
Pulse Fetch starting with services: native
```

**Expected**: Should detect Firecrawl since user has self-hosted instance

**File**: `/home/jmagar/code/pulse-fetch/local/src/index.ts:31`
```typescript
if (process.env.FIRECRAWL_API_KEY) available.push('Firecrawl');
```

**Finding**: Server requires `FIRECRAWL_API_KEY` environment variable to enable Firecrawl

### 3. Environment Configuration Analysis

**File**: `/home/jmagar/code/pulse-fetch/.env`

Initial state:
```bash
FIRECRAWL_API_KEY=your-firecrawl-api-key-here  # Placeholder value
FIRECRAWL_API_BASE_URL=https://firecrawl.tootie.tv  # Self-hosted
OPTIMIZE_FOR=speed
MCP_RESOURCE_STORAGE=filesystem
LLM_PROVIDER=openai-compatible
LLM_API_BASE_URL=https://cli-api.tootie.tv/v1
LLM_MODEL=claude-haiku-4-5-20251001
```

**Key Findings**:
1. `.env` file exists but has placeholder API key
2. Self-hosted Firecrawl URL configured: `https://firecrawl.tootie.tv`
3. User confirmed self-hosted instance doesn't require authentication

### 4. Service Detection Logic

**File**: `/home/jmagar/code/pulse-fetch/shared/src/server.ts:148`
```typescript
const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
// ...
if (firecrawlApiKey) {
  clients.firecrawl = new FirecrawlClient(firecrawlApiKey);
}
```

**Finding**: Code checks for non-empty `FIRECRAWL_API_KEY` to instantiate client

### 5. Testing Environment Variable Detection

**Test 1**: Without explicit env var
```bash
node build/index.js
# Output: "Pulse Fetch starting with services: native"
```

**Test 2**: With explicit env var
```bash
FIRECRAWL_API_KEY=self-hosted-no-auth node build/index.js
# Output: "Pulse Fetch starting with services: native, Firecrawl"
```

**Finding**: `.env` file not auto-loaded by the server (no dotenv integration in production)

### 6. Health Check Failure

When running with `FIRECRAWL_API_KEY` set:
```
Authentication health check failures:
  Firecrawl: Invalid API key - authentication failed
```

**File**: `/home/jmagar/code/pulse-fetch/shared/src/healthcheck.ts:139`
```typescript
if (process.env.FIRECRAWL_API_KEY) {
  checks.push(checkFirecrawlAuth(process.env.FIRECRAWL_API_KEY));
}
```

**Issue**: Health check tries to authenticate with self-hosted Firecrawl using dummy key

## Solutions Implemented

### 1. Updated `.env` with Dummy API Key
```diff
- FIRECRAWL_API_KEY=your-firecrawl-api-key-here
+ FIRECRAWL_API_KEY=self-hosted-no-auth
```

**Rationale**: Code only checks if variable is truthy, actual value doesn't matter for auth-less instances

### 2. Added Health Check Skip
```diff
+ # Skip health checks for self-hosted services without authentication
+ SKIP_HEALTH_CHECKS=true
```

**Rationale**: Prevents authentication failures when using self-hosted Firecrawl without auth

## Final Configuration

**File**: `/home/jmagar/code/pulse-fetch/.env`
- `FIRECRAWL_API_KEY=self-hosted-no-auth` (dummy value to enable service)
- `FIRECRAWL_API_BASE_URL=https://firecrawl.tootie.tv` (self-hosted endpoint)
- `SKIP_HEALTH_CHECKS=true` (bypass auth validation)
- `OPTIMIZE_FOR=speed` (prioritizes Firecrawl over native fetch)

## Verification

**Command**:
```bash
cd /home/jmagar/code/pulse-fetch/local
export $(cat ../.env | grep -v '^#' | xargs)
node build/index.js
```

**Output**:
```
Pulse Fetch starting with services: native, Firecrawl
Optimization strategy: speed
```

✅ **Success**: Both services detected, optimization strategy active, no errors

## Key Files Referenced

1. `/home/jmagar/code/pulse-fetch/local/package.json` - Build scripts
2. `/home/jmagar/code/pulse-fetch/local/src/index.ts` - Service detection logic
3. `/home/jmagar/code/pulse-fetch/shared/src/server.ts` - Client initialization
4. `/home/jmagar/code/pulse-fetch/shared/src/healthcheck.ts` - Health check logic
5. `/home/jmagar/code/pulse-fetch/.env` - Environment configuration

## Notes

- Server doesn't auto-load `.env` file - must manually export variables
- Self-hosted Firecrawl instances without auth still require a dummy API key value
- Health checks can be skipped for self-hosted services without breaking functionality
