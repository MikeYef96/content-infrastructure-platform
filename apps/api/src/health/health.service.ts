import { Injectable } from '@nestjs/common';
import type { HealthResponse } from '@content-platform/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth(): Promise<HealthResponse> {
    const timestamp = new Date().toISOString();

    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        timestamp,
        checks: {
          database: { status: 'ok' },
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown database error';

      return {
        status: 'error',
        timestamp,
        checks: {
          database: { status: 'error', message },
        },
      };
    }
  }
}
