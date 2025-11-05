#!/usr/bin/env node

/**
 * Quick test script to verify Firecrawl integration
 * Tests both the API endpoint and the scraping functionality
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root
config({ path: join(__dirname, '../../.env') });

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const FIRECRAWL_API_BASE_URL = process.env.FIRECRAWL_API_BASE_URL || 'https://api.firecrawl.dev';

console.log('🔥 Firecrawl Integration Test\n');
console.log('Configuration:');
console.log(`  Base URL: ${FIRECRAWL_API_BASE_URL}`);
console.log(`  API Key: ${FIRECRAWL_API_KEY ? FIRECRAWL_API_KEY.substring(0, 20) + '...' : 'NOT SET'}`);
console.log(`  Optimize For: ${process.env.OPTIMIZE_FOR || 'cost (default)'}\n`);

if (!FIRECRAWL_API_KEY) {
  console.error('❌ FIRECRAWL_API_KEY not set');
  process.exit(1);
}

async function testFirecrawlDirect() {
  console.log('📡 Testing direct Firecrawl API call...');
  
  const testUrl = 'https://example.com';
  
  try {
    const response = await fetch(`${FIRECRAWL_API_BASE_URL}/v1/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url: testUrl,
        formats: ['html'],
      }),
    });

    console.log(`  Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  ❌ API Error: ${errorText}`);
      return false;
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      const htmlLength = result.data.html?.length || 0;
      const hasContent = htmlLength > 0;
      
      console.log(`  ✅ Success!`);
      console.log(`  Content length: ${htmlLength} characters`);
      console.log(`  Has HTML: ${hasContent}`);
      
      if (hasContent) {
        const preview = result.data.html.substring(0, 150).replace(/\n/g, ' ');
        console.log(`  Preview: ${preview}...`);
      }
      
      return true;
    } else {
      console.error(`  ❌ Scraping failed: ${result.error || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

async function testScrapingStrategy() {
  console.log('\n📋 Testing scraping strategy system...');
  
  try {
    // Import the scraping module
    const { scrapeUniversal } = await import('../../shared/build/scraping-strategies.js');
    const { NativeFetcher, FirecrawlClient } = await import('../../shared/build/server.js');
    
    const clients = {
      native: new NativeFetcher(),
      firecrawl: new FirecrawlClient(FIRECRAWL_API_KEY),
    };
    
    const testUrl = 'https://example.com';
    console.log(`  Testing URL: ${testUrl}`);
    
    const result = await scrapeUniversal(clients, {
      url: testUrl,
      timeout: 30000,
    });
    
    if (result.success) {
      console.log(`  ✅ Scraping successful!`);
      console.log(`  Strategy used: ${result.source}`);
      console.log(`  Content length: ${result.content?.length || 0} characters`);
      
      if (result.diagnostics) {
        console.log(`  Strategies attempted: ${result.diagnostics.strategiesAttempted.join(', ')}`);
        if (result.diagnostics.timing) {
          console.log(`  Timing:`, result.diagnostics.timing);
        }
      }
      
      if (result.content) {
        const preview = result.content.substring(0, 150).replace(/\n/g, ' ');
        console.log(`  Preview: ${preview}...`);
      }
      
      return result.source === 'firecrawl';
    } else {
      console.error(`  ❌ Scraping failed: ${result.error}`);
      if (result.diagnostics) {
        console.log(`  Strategies attempted: ${result.diagnostics.strategiesAttempted.join(', ')}`);
        console.log(`  Errors:`, result.diagnostics.strategyErrors);
      }
      return false;
    }
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    console.error(error.stack);
    return false;
  }
}

async function main() {
  console.log('=' .repeat(60));
  console.log('TEST 1: Direct Firecrawl API Call');
  console.log('=' .repeat(60));
  
  const directTest = await testFirecrawlDirect();
  
  console.log('\n' + '='.repeat(60));
  console.log('TEST 2: Scraping Strategy System');
  console.log('=' .repeat(60));
  
  const strategyTest = await testScrapingStrategy();
  
  console.log('\n' + '='.repeat(60));
  console.log('RESULTS');
  console.log('=' .repeat(60));
  console.log(`Direct API Test: ${directTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Strategy Test: ${strategyTest ? '✅ PASS (using Firecrawl)' : '⚠️  WARN (not using Firecrawl)'}`);
  
  if (directTest && strategyTest) {
    console.log('\n🎉 All tests passed! Firecrawl is working correctly.');
    process.exit(0);
  } else if (directTest && !strategyTest) {
    console.log('\n⚠️  Firecrawl API works, but strategy system may be using native fetch first (OPTIMIZE_FOR=cost?)');
    process.exit(0);
  } else {
    console.log('\n❌ Tests failed. Check configuration and Firecrawl instance.');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
