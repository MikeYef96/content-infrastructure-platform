# Test Strategy

## Unit
Validation, permissions, state transitions, versioning, schema compatibility and dependency calculations.

## Integration
Prisma/PostgreSQL transactions, references, publication state and Redis/BullMQ where needed.

## API/E2E
Auth, tenant isolation, schema creation, entry creation, draft editing, publish, rollback, delivery API, impact analysis and webhooks.

## Concurrency
Two editors updating the same draft; two publish requests; rollback during publish; duplicate webhook processing.

## Historical integrity
A published version must remain unchanged forever.
