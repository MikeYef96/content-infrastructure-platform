# Architecture Decisions

## ADR-001 Modular monolith
Use a NestJS modular monolith until a real boundary requires separation.

## ADR-002 PostgreSQL
Use PostgreSQL for durable relational data, version history, references and audit records.

## ADR-003 Immutable published versions
Published versions are immutable. Rollback changes publication pointers.

## ADR-004 Consumer-owned rendering
The CMS stores schemas/content; applications own component rendering. This prevents tight coupling to React/Angular implementation.

## ADR-005 REST first
Implement REST first. Add GraphQL only if it provides clear value after the domain is stable.

## ADR-006 Redis + BullMQ
Use Redis/BullMQ for webhook delivery, background jobs and retryable asynchronous work.

## ADR-007 Explicit dependency references
Persist references as first-class relationships. Do not make a separately maintained graph the source of truth.
