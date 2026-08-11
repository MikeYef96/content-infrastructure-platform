# Domain Model

```text
Organization
 ├── Application
 │     ├── Environment
 │     └── API Keys
 ├── Schemas
 ├── Content Entries
 └── Members/Roles

ContentEntry
 ├── Schema
 └── Draft

ContentVersion
 ├── Entry
 ├── Immutable payload
 └── Version number

Publication
 ├── Environment
 ├── Entry
 └── Published Version
```

References are first-class relationships so the platform can answer: `Where is this content used?`

Invariants:
1. Published versions cannot be modified.
2. A publication references a specific version.
3. Rollback does not delete versions.
4. Cross-tenant references are forbidden.
5. Breaking schema changes cannot silently invalidate production content.
6. Concurrent edits cannot silently overwrite each other.
