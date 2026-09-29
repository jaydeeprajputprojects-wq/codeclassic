# ADR-008 - JPA/Hibernate as Persistence Technology

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Spring Data JPA with Hibernate ORM will provide the primary object-relational persistence layer for the modular monolith.

## Context

Code Classic has domain entities and relationships that must be persisted in PostgreSQL. The Technical BRD selects Spring Data JPA and Hibernate while requiring DTO-based APIs, controlled fetch behavior, and Flyway for production schema changes.

## Problem Statement

The backend needs a consistent way to map Java domain persistence models to relational data without leaking persistence entities into API contracts or hiding query behavior from developers.

## Decision Drivers

- Fit with Java/Spring
- Productivity for relational CRUD
- Transaction support
- Learning value
- Testability
- Control over query performance

## Options Considered

### Spring Data JPA and Hibernate

Reduces repository boilerplate and maps relationships to PostgreSQL. It can cause lazy-loading surprises, N+1 queries, and unclear SQL if used without discipline.

### Direct SQL for All Persistence

Provides maximum SQL control but adds repetitive mapping and repository code for common operations.

### JPA for Some Modules and Uncontrolled Mixed Persistence

Could optimize individual queries but would increase conventions and maintenance without a current measured need.

## Decision

Use Spring Data JPA/Hibernate for module persistence, with explicit transactions, DTO mapping, bounded fetch strategies, projections or queries where useful, and SQL/query-plan review for important paths. Hibernate schema auto-update is not a production migration mechanism.

## Why This Decision Was Made

The relational model and selected Spring stack make JPA a practical default. The project will teach both productivity and the responsibility to understand generated SQL, fetch behavior, constraints, and transactions.

## Implementation Impact

- Entities/repositories stay inside owning modules.
- Services define transaction boundaries.
- Controllers return DTOs.
- Lazy/eager behavior is selected per use case.
- Integration tests use PostgreSQL through Testcontainers.
- Flyway owns schema evolution.

## Architecture Flow

```text
DTO -> Service Transaction -> Repository -> Hibernate SQL -> PostgreSQL
```

## Cost Considerations

There is no separate project license cost identified. Development cost is lower for standard persistence but rises when debugging mappings and query performance. Operational cost is database/runtime performance rather than a new service. Learning cost is meaningful and intentional because learners must understand ORM behavior, not treat it as magic.

## Learning Value

- **Beginner:** learns entity, repository, relationship, and transaction concepts.
- **Developer:** learns mapping, fetch plans, DTOs, and integration testing.
- **Production:** learns to inspect SQL and prevent N+1 and data-integrity defects.

## Security Impact

Repositories do not decide authorization. Services must filter by owner/status/access level before returning data. DTO mapping prevents accidental exposure of internal fields and relationships.

## Performance and Scalability

Use pagination, projections, indexes, bounded fetches, and query metrics. N+1 queries are a release risk. If a measured query cannot be served efficiently, a focused SQL query or projection may be added without abandoning JPA broadly.

## Consequences

### Positive Consequences

- Consistent persistence conventions
- Less CRUD boilerplate
- Good Spring integration
- Strong learning value

### Negative Consequences

- ORM behavior can be surprising
- Mapping changes require migration discipline
- Incorrect fetch plans can harm performance

### Trade-offs

The project accepts ORM complexity while requiring SQL awareness and integration tests.

## Future Evolution

Introduce focused native/query-based persistence only where measurements justify it. Keep module ownership and API contracts stable if persistence implementation changes.

## Revisit Conditions

Revisit if ORM behavior creates a measured performance, correctness, or operational problem that focused query changes cannot solve.

## Related ADRs

- ADR-007 - PostgreSQL as Primary Database
- ADR-009 - Flyway for Database Migrations
- ADR-017 - Testing Strategy

## References

- Technical BRD Sections 7, 20-22, 59, 85
