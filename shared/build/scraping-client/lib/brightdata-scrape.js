export async function scrapeWithBrightData(bearerToken, url, options) {
    try {
        const response = await fetch('https://api.brightdata.com/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify({
                zone: 'mcp_server_unlocker',
                url,
                format: 'raw',
                ...options,
            }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            return {
                success: false,
                error: `BrightData API error: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
            };
        }
        const data = await response.text();
        return {
            success: true,
            data,
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown BrightData error',
        };
    }
}
