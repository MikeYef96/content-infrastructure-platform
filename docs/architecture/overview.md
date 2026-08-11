# Architecture Overview

## Product

Content Infrastructure Platform is a developer-focused headless content system for teams running multiple frontend applications.

Consuming applications own component rendering. The platform stores schemas, structured content, versions, references and publication state.

## Implemented structure (bootstrap)

```text
content-infrastructure-platform/
├── apps/
│   ├── api/                    # NestJS modular monolith
│   │   ├── prisma/             # schema + migrations (no domain models yet)
│   │   └── src/
│   │       ├── config/         # Zod env validation
│   │       ├── prisma/         # PrismaModule
│   │       └── health/         # GET /api/health
│   └── web/                    # React admin shell (Vite + TanStack Query)
├── packages/
│   ├── config/                 # shared tsconfig, ESLint, Prettier
│   ├── shared/                 # cross-app types (HealthResponse)
│   └── api-client/             # typed HTTP client
├── docker-compose.yml          # PostgreSQL + Redis
└── .github/workflows/ci.yml
```

## High-level architecture (target)

```text
                   Content Platform
                         |
          +--------------+--------------+
          |              |              |
       Admin API      Delivery API    Webhooks
          |              |              |
          +--------------+--------------+
                         |
                       NestJS
                         |
              +----------+----------+
              |                     |
          PostgreSQL              Redis
                                    |
                                  BullMQ
                                    |
                              Webhook Worker
```

## Bootstrap API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | API liveness + PostgreSQL connectivity |

Returns `503` when the database check fails; `200` when healthy.

## Future module boundaries

Under `apps/api/src/modules/` (not yet created):

`auth`, `organizations`, `applications`, `environments`, `schemas`, `content`, `versions`, `publishing`, `dependencies`, `webhooks`, `audit`, `delivery`

## Boundary rules

### API
Authentication, authorization, validation, commands/queries, versioning, publishing and delivery.

### Persistence
PostgreSQL is the durable source of truth for domain data.

### Redis
Cache, rate limiting, queues and coordination — not durable business state.

### Frontend (`apps/web`)
Visualization and controls. Never the source of truth for content or publication state.

## Environment model (target)

Development → Staging → Production

Publishing: Draft → Validated → Immutable Published Version → Environment Publication

Rollback changes the publication pointer; it never mutates historical versions.

## Local development

```bash
pnpm install
docker compose up -d
cp .env.example .env
pnpm dev
```

- API: http://localhost:3000/api/health
- Web: http://localhost:5173 (proxies `/api` to the API in dev)
