# Firecrawl Usage Investigation

**Date**: 2025-11-05  
**Task**: Verify if Firecrawl is actually being used for scraping operations

## Summary

✅ **YES, Firecrawl IS being used** - and it's prioritized first due to `OPTIMIZE_FOR=speed` configuration.

## Configuration Analysis

### Current Environment Settings

**File**: `/home/jmagar/code/pulse-fetch/.env`

```bash
FIRECRAWL_API_KEY=self-hosted-no-auth          # Enabled
FIRECRAWL_API_BASE_URL=https://firecrawl.tootie.tv  # Self-hosted instance
OPTIMIZE_FOR=speed                              # CRITICAL: Changes strategy order
SKIP_HEALTH_CHECKS=true                        # Bypasses auth validation
```

### Strategy Order Based on OPTIMIZE_FOR

**File**: `/home/jmagar/code/pulse-fetch/shared/src/scraping-strategies.ts:227-261`

#### SPEED Mode (Current Setting):
```typescript
if (optimizeFor === 'speed') {
  // speed mode: firecrawl -> brightdata (skip native)
  const firecrawlResult = await tryFirecrawl();
  if (firecrawlResult) {
    if (firecrawlResult.success) {
      return firecrawlResult;
    }
  }
  
  const brightDataResult = await tryBrightData();
  // ...
}
```

**Order**: `firecrawl → brightdata` (skips native entirely)

#### COST Mode (Default):
```typescript
else {
  // cost mode (default): native -> firecrawl -> brightdata
  const nativeResult = await tryNative();
  if (nativeResult) return nativeResult;
  
  const firecrawlResult = await tryFirecrawl();
  // ...
}
```

**Order**: `native → firecrawl → brightdata`

## Scraping Strategy System

### How It Works

**File**: `/home/jmagar/code/pulse-fetch/shared/src/scraping-strategies.ts:386-465`

The system uses a multi-tiered approach:

1. **Check for URL-specific strategy** (from config file)
   ```typescript
   configuredStrategy = await configClient.getStrategyForUrl(options.url);
   ```

2. **Try configured strategy first** (if found)
   ```typescript
   if (configuredStrategy) {
     const configuredResult = await scrapeWithSingleStrategy(clients, configuredStrategy, options);
     if (configuredResult.success) return configuredResult;
   }
   ```

3. **Fall back to universal approach** (based on OPTIMIZE_FOR)
   ```typescript
   const universalResult = await scrapeUniversal(clients, options);
   ```

4. **Auto-learn successful strategies**
   ```typescript
   if (universalResult.success && !configuredStrategy) {
     await configClient.upsertEntry({
       prefix: extractUrlPattern(options.url),
       default_strategy: universalResult.source as ScrapingStrategy,
       notes: 'Auto-discovered',
     });
   }
   ```

### Current Strategy Configuration

**File**: `/home/jmagar/code/pulse-fetch/scraping-strategies.md`

```markdown
| prefix        | default_strategy | notes                                      |
| ------------- | ---------------- | ------------------------------------------ |
| yelp.com/biz/ | brightdata       | Yelp business pages need anti-bot measures |
```

**Current state**: Only one URL pattern configured (yelp.com/biz/)

## Firecrawl Implementation Details

### Client Detection

**File**: `/home/jmagar/code/pulse-fetch/local/src/index.ts:31`
```typescript
if (process.env.FIRECRAWL_API_KEY) available.push('Firecrawl');
```

**Status**: ✅ Detected (outputs "native, Firecrawl")

### Client Initialization

**File**: `/home/jmagar/code/pulse-fetch/shared/src/server.ts:148-156`
```typescript
const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
// ...
if (firecrawlApiKey) {
  clients.firecrawl = new FirecrawlClient(firecrawlApiKey);
}
```

**Status**: ✅ Initialized with dummy API key

### Firecrawl Scraping Function

**File**: `/home/jmagar/code/pulse-fetch/shared/src/scraping-client/lib/firecrawl-scrape.ts:18-82`

```typescript
export async function scrapeWithFirecrawl(
  apiKey: string,
  url: string,
  options: Record<string, unknown> = {}
): Promise<FirecrawlScrapingResult> {
  try {
    const response = await fetch(`${FIRECRAWL_BASE_URL}/v1/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        ...options,
      }),
    });
    // ...
  }
}
```

**Base URL**: Set from `FIRECRAWL_API_BASE_URL` env var (defaults to `https://api.firecrawl.dev`)
**Current**: `https://firecrawl.tootie.tv`

## Testing Current Behavior

### Example Scrape Flow with OPTIMIZE_FOR=speed

1. **URL requested**: `https://example.com/article`

2. **Check strategy config**: No match in `scraping-strategies.md`

3. **Fall back to universal (SPEED mode)**:
   - ❌ Skip native (speed optimization)
   - ✅ **Try Firecrawl FIRST**
     - URL: `https://firecrawl.tootie.tv/v1/scrape`
     - Auth: `Bearer self-hosted-no-auth`
     - Body: `{"url": "https://example.com/article", "formats": ["html"]}`
   - If Firecrawl succeeds → return immediately
   - If Firecrawl fails → try BrightData (if configured)

4. **Auto-save successful strategy**:
   ```markdown
   | example.com/article/ | firecrawl | Auto-discovered |
   ```

### Example Scrape Flow with OPTIMIZE_FOR=cost (Default)

1. **URL requested**: `https://example.com/article`

2. **Check strategy config**: No match in `scraping-strategies.md`

3. **Fall back to universal (COST mode)**:
   - ✅ Try native FIRST (free)
   - If fails → ✅ **Try Firecrawl SECOND**
   - If fails → Try BrightData (if configured)

## Verification Commands

### Check if Firecrawl is detected:
```bash
cd /home/jmagar/code/pulse-fetch/local
export $(cat ../.env | grep -v '^#' | xargs)
node build/index.js 2>&1 | head -5
```

**Expected output**:
```
Pulse Fetch starting with services: native, Firecrawl
Optimization strategy: speed
```

### Check actual scraping behavior:
The server will log which strategy was used in the response:
```
Scraped using: firecrawl
```

Or in error diagnostics:
```
Strategies attempted: firecrawl, brightdata
```

## Conclusion

### Current State Summary

| Setting | Value | Impact |
|---------|-------|--------|
| **FIRECRAWL_API_KEY** | `self-hosted-no-auth` | ✅ Enables Firecrawl client |
| **FIRECRAWL_API_BASE_URL** | `https://firecrawl.tootie.tv` | ✅ Routes to self-hosted instance |
| **OPTIMIZE_FOR** | `speed` | ⚡ **Firecrawl is tried FIRST, native is SKIPPED** |
| **SKIP_HEALTH_CHECKS** | `true` | ✅ Bypasses auth validation |

### Answer: Is Firecrawl Being Used?

**YES**, Firecrawl is:
1. ✅ **Enabled** (client initialized)
2. ✅ **Configured** (pointing to self-hosted instance)
3. ✅ **Prioritized** (tried first with `OPTIMIZE_FOR=speed`)
4. ✅ **Active** (will be used for every scrape request unless URL has specific strategy override)

### What Gets Scraped with Firecrawl?

**With current `OPTIMIZE_FOR=speed` setting:**
- 🎯 **ALL URLs** (except `yelp.com/biz/*` which uses BrightData)
- Firecrawl is the **first and primary** scraping method
- Native fetch is **completely skipped** in speed mode
- BrightData only used if Firecrawl fails

**If switched to `OPTIMIZE_FOR=cost`:**
- Native fetch tried first (free)
- Firecrawl as fallback when native fails
- BrightData as final fallback

## Recommendations

### Current Setup is Optimal If:
- ✅ Self-hosted Firecrawl has good performance
- ✅ You want consistent, reliable scraping (JavaScript rendering, anti-bot handling)
- ✅ You don't mind bypassing simple/fast native fetch

### Consider Switching to `OPTIMIZE_FOR=cost` If:
- ⚠️ Many URLs work fine with simple native fetch
- ⚠️ You want to reduce load on Firecrawl instance
- ⚠️ Cost/resource optimization is priority

### Monitor Strategy Learning:
Check `/home/jmagar/code/pulse-fetch/scraping-strategies.md` periodically to see which strategies are being auto-learned for different URL patterns.

## Key Files Referenced

1. `/home/jmagar/code/pulse-fetch/.env` - Configuration
2. `/home/jmagar/code/pulse-fetch/shared/src/scraping-strategies.ts` - Strategy logic
3. `/home/jmagar/code/pulse-fetch/shared/src/scraping-client/lib/firecrawl-scrape.ts` - Firecrawl implementation
4. `/home/jmagar/code/pulse-fetch/scraping-strategies.md` - Learned URL patterns
5. `/home/jmagar/code/pulse-fetch/local/src/index.ts` - Service detection
