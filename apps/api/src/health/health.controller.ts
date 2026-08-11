import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import type { HealthResponse } from '@content-platform/shared';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async getHealth(): Promise<HealthResponse> {
    const health = await this.healthService.getHealth();

    if (health.status === 'error') {
      throw new ServiceUnavailableException(health);
    }

    return health;
  }
}
