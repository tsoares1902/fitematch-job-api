import { Controller, Get, Inject } from '@nestjs/common';
import type {
  HealthCheckResponse,
  HealthCheckUseCaseInterface,
} from '@src/health-check/applications/contracts/health-check-response.interface';
import { HEALTH_CHECK_USE_CASE_INTERFACE } from '@src/health-check/applications/contracts/health-check-response.interface';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    @Inject(HEALTH_CHECK_USE_CASE_INTERFACE)
    private readonly healthCheckUseCase: HealthCheckUseCaseInterface,
  ) {}

  @Get()
  get(): HealthCheckResponse {
    return this.healthCheckUseCase.execute();
  }
}
