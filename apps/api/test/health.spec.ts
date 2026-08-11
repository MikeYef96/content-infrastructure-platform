import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('HealthController (e2e)', () => {
  let app: INestApplication<App>;

  const prismaMock = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/health returns ok status', async () => {
    const response = await request(app.getHttpServer()).get('/api/health').expect(200);

    expect(response.body).toMatchObject({
      status: 'ok',
      checks: {
        database: { status: 'ok' },
      },
    });
    expect(typeof response.body.timestamp).toBe('string');
  });

  it('GET /api/health returns 503 when database is unavailable', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('connection refused'));

    const response = await request(app.getHttpServer()).get('/api/health').expect(503);

    expect(response.body).toMatchObject({
      status: 'error',
      checks: {
        database: {
          status: 'error',
          message: 'connection refused',
        },
      },
    });
  });
});
