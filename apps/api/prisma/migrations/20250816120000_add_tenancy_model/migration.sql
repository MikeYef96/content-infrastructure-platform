-- This migration is intentionally a no-op. The initial migration already
-- created the domain schema, so we keep the migration history consistent
-- without re-running the same DDL in CI/deploy environments.
SELECT 1;

