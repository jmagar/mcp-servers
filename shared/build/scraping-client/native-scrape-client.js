/**
 * Native scraping client implementation
 * Provides basic HTTP fetching without external services
 */
import { ContentParserFactory } from '../content-parsers/index.js';
export class NativeScrapingClient {
    defaultHeaders = {
        'User-Agent': 'Mozilla/5.0 (compatible; PulseMCP/1.0; +https://pulsemcp.com)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
    };
    parserFactory = new ContentParserFactory();
    async scrape(url, options = {}) {
        try {
            const controller = new AbortController();
            const timeoutId = options.timeout
                ? setTimeout(() => controller.abort(), options.timeout)
                : null;
            const response = await fetch(url, {
                method: options.method || 'GET',
                headers: {
                    ...this.defaultHeaders,
                    ...options.headers,
                },
                body: options.body,
                signal: controller.signal,
            });
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            const responseHeaders = {};
            response.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });
            if (!response.ok) {
                return {
                    success: false,
                    error: `HTTP ${response.status}: ${response.statusText}`,
                    statusCode: response.status,
                    headers: responseHeaders,
                };
            }
            // Get content type for routing to appropriate parser
            const contentType = response.headers.get('content-type') || 'text/plain';
            // Determine if we need binary handling
            const isBinary = this.parserFactory.requiresBinaryHandling(contentType);
            // Fetch content as ArrayBuffer or text based on content type
            const rawData = isBinary ? await response.arrayBuffer() : await response.text();
            // Parse content through appropriate parser
            const parsed = await this.parserFactory.parse(rawData, contentType);
            return {
                success: true,
                data: parsed.content,
                statusCode: response.status,
                headers: responseHeaders,
                contentType,
                contentLength: rawData instanceof ArrayBuffer ? rawData.byteLength : rawData.length,
                metadata: parsed.metadata,
            };
        }
        catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                return {
                    success: false,
                    error: 'Request timeout',
                };
            }
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
}
