export const HEALTH_CHECK_USE_CASE_INTERFACE =
  'HEALTH_CHECK_USE_CASE_INTERFACE';

export interface HealthCheckResponse {
  healthy: boolean;
  name: string;
  version: string;
}

export interface HealthCheckUseCaseInterface {
  execute(): HealthCheckResponse;
}
