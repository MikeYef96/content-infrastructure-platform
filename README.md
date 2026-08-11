# Content Infrastructure Platform CMS

A developer-focused headless content platform for teams running multiple frontend applications.

## Core promise

Define content/components once → reuse everywhere → understand impact before publishing → version → promote → rollback.

This is NOT a generic Strapi clone.

## Differentiators
- Shared content/components across applications
- Consumer-owned frontend component registry
- Immutable content versions
- Development → staging → production promotion
- Dependency graph and impact analysis
- Schema evolution/migration assistance
- API-first delivery
- Webhooks with retries/idempotency
- Audit trail
- Preview and rollback

## Stack
- React + TypeScript
- NestJS + TypeScript
- PostgreSQL + Prisma
- Redis + BullMQ
- WebSockets
- REST first; GraphQL later if justified
- Docker Compose
- Jest + Supertest + Playwright
- GitHub Actions

## MVP
Authentication, organizations, applications, environments, content schemas, entries, references, versions, publishing, rollback, REST delivery API, API keys and audit events.

## Strong portfolio version
Add component registry, dependency graph, impact analysis, environment promotion, optimistic locking, schema evolution, webhooks, retries, idempotency, preview tokens and realtime publishing events.

## Local development

```bash
pnpm install
docker compose up -d
cp .env.example .env
pnpm dev
```

- API health: http://localhost:3000/api/health
- Admin UI: http://localhost:5173

## Build order
Foundation → Identity → Tenancy → Schema engine → Content → Versioning → Publishing → Delivery API → References → Impact analysis → Webhooks/queues → Schema migration → Preview/rollback → Portfolio polish.
