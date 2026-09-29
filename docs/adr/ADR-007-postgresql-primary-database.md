# ADR-007 - PostgreSQL as Primary Database

## Status

Accepted

## Date

2026-09-23

## Decision Summary

PostgreSQL is the primary relational database for Code Classic.

## Context

The BRD requires relationships among users, blogs, categories, tags, likes, comments, documents, courses, sections, videos, and jobs. The Technical BRD requires constraints, migrations, indexing, pagination, connection pooling, and managed production backups.

## Problem Statement

The platform needs durable relational storage that can enforce data integrity and support the initial modular monolith without introducing multiple data systems.

## Decision Drivers

- Relational domain model
- Referential integrity
- Transactions and constraints
- Spring/JPA support
- Managed hosting
- Search capability for the initial stage
- Cost and learning value

## Options Considered

### PostgreSQL

Provides relational constraints, transactions, indexes, JSON capabilities where useful, and mature managed hosting. It requires schema design and SQL awareness.

### Document Database

Could simplify some flexible content shapes, but would weaken the natural relational constraints for likes, comments, ownership, statuses, and course hierarchy.

### Multiple Specialized Databases

Could optimize individual workloads but adds operational, backup, consistency, and learning complexity not justified by 100-500 initial users.

## Decision

Use one managed PostgreSQL database initially, with logical ownership by module and Flyway-controlled schema changes. PostgreSQL is the source of truth for application metadata and relational business data; binary objects live in R2.

## Why This Decision Was Made

The product is relationship-heavy and benefits from database-enforced uniqueness and foreign keys. PostgreSQL fits Spring Boot and supports the initial search direction without a separate search platform.

## Implementation Impact

- Tables are owned logically by modules.
- Foreign keys and unique constraints enforce data integrity.
- Indexes support status, slug/identifier, timestamps, parent comments, and likes.
- HikariCP manages connections.
- Production schema changes use Flyway, not Hibernate auto-update.

## Architecture Flow

```text
Spring Boot Module -> JPA/Hibernate or SQL -> PostgreSQL -> Backup/Restore
```

## Cost Considerations

Direct cost is the selected managed PostgreSQL plan, whose current price must be verified with the provider. Operational cost includes backups, SSL, pool tuning, migrations, and restore testing. Development cost includes relational modeling and SQL diagnostics. Future cost grows with data size and availability requirements, but a single managed database is appropriate initially.

## Learning Value

- **Beginner:** learns tables, keys, relationships, and constraints.
- **Developer:** learns transactions, indexes, pagination, and query behavior.
- **Production:** sees why the database is part of correctness, not just storage.

## Security Impact

Credentials are secrets, production connections use SSL where supported, and APIs expose DTOs rather than unrestricted records. Authorization remains in the service layer; database access alone must not decide user permissions.

## Performance and Scalability

Pagination, indexes, efficient fetch strategies, and connection limits are required. PostgreSQL search is sufficient initially. Redis, Elasticsearch, and database decomposition are not introduced without measured need.

## Consequences

### Positive Consequences

- Strong integrity guarantees
- Natural fit for domain relationships
- Mature Spring ecosystem
- One database to operate initially

### Negative Consequences

- Schema migrations require discipline
- Poor queries can create bottlenecks
- One database can become a shared scaling boundary

### Trade-offs

The project accepts relational schema management and shared database limits for correctness and operational simplicity.

## Future Evolution

Optimize queries first, then consider replicas, caching, or database decomposition only after measurement and a separate decision.

## Revisit Conditions

Revisit when transaction volume, availability, data ownership, storage size, or query patterns exceed the managed single-database approach.

## Related ADRs

- ADR-008 - JPA/Hibernate as Persistence Technology
- ADR-009 - Flyway for Database Migrations
- ADR-020 - Cost-Conscious Architecture
- ADR-025 - Database Decomposition During Service Extraction

## References

- Technical BRD Sections 20-23, 55-59
- BRD Sections 65-71
