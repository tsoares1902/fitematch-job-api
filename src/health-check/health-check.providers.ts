import { HEALTH_CHECK_USE_CASE_INTERFACE } from '@src/health-check/applications/contracts/health-check-response.interface';
import type { HealthCheckUseCaseInterface } from '@src/health-check/applications/contracts/health-check-response.interface';
import { HealthCheckUseCase } from '@src/health-check/applications/use-cases/health-check.use-case';
import { provideUseCase } from '@src/shared/infrastructure/di/provider.utils';

export const healthCheckProviders = [
  provideUseCase(
    HEALTH_CHECK_USE_CASE_INTERFACE,
    [],
    (): HealthCheckUseCaseInterface => new HealthCheckUseCase(),
  ),
];
