import type {
  HealthCheckResponse,
  HealthCheckUseCaseInterface,
} from '../contracts/health-check-response.interface';

export class HealthCheckUseCase implements HealthCheckUseCaseInterface {
  execute(): HealthCheckResponse {
    return {
      healthy: true,
      name: 'API',
      version: process.env.npm_package_version ?? '0.0.1',
    };
  }
}
