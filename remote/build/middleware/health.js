/**
 * Health check endpoint handler
 * Returns basic server health information
 *
 * @param _req - Express request object (unused)
 * @param res - Express response object
 */
export function healthCheck(_req, res) {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || 'unknown',
        transport: 'http-streaming',
    });
}
//# sourceMappingURL=health.js.map