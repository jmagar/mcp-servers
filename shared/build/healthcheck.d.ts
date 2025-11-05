interface HealthCheckResult {
    service: string;
    success: boolean;
    error?: string;
}
/**
 * Run health checks for all configured services
 */
export declare function runHealthChecks(): Promise<HealthCheckResult[]>;
export {};
