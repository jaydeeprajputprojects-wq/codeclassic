# ADR-009 - Flyway for Database Migrations

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Flyway will manage all Code Classic database schema changes across local, test, and production environments.

## Context

The platform evolves through incremental epics and requires repeatable deployments. The Technical BRD explicitly states that production schema changes must be migrations and that Hibernate must not be the production schema migration mechanism.

## Problem Statement

Code Classic needs an auditable, ordered, repeatable way to move PostgreSQL schemas between environments without relying on local ORM state or manual production changes.

## Decision Drivers

- Reproducibility
- Deployment safety
- Version history
- Team collaboration
- Testability
- Learning value

## Options Considered

### Flyway

Versioned SQL migrations are simple to review, execute in order, and record. Teams must write compatible migrations and handle rollback/forward-fix planning.

### Hibernate Schema Auto-Update

Convenient locally but unsafe and ambiguous for production data changes, destructive alterations, and review.

### Manual SQL Changes

Flexible but not reproducible, auditable, or reliable across environments.

## Decision

Use Flyway versioned migrations as the only production schema-change mechanism. Hibernate validates mappings but does not create or update the production schema.

## Why This Decision Was Made

Incremental delivery means every epic may add tables, constraints, indexes, or columns. Flyway makes these changes part of source control and CI/CD, aligning schema state with the release artifact.

## Implementation Impact

- Migration files live in the backend resources migration path.
- Naming and review conventions are documented.
- Empty database startup is tested.
- CI runs migrations against Testcontainers PostgreSQL.
- Production migration execution and compatibility are release steps.

## Architecture Flow

```text
Migration in Git -> CI/Testcontainers -> Release Migration -> Managed PostgreSQL -> Application
```

## Cost Considerations

Flyway adds minimal direct cost under the selected project usage. Development cost is writing and reviewing migrations. Operational cost is planning compatibility, backup, and rollback. Future cost grows with schema history, but the auditability benefit grows as the product grows.

## Learning Value

- **Beginner:** learns that schema is versioned code.
- **Developer:** learns constraints, indexes, data migrations, and compatibility.
- **Production:** learns why rollback is not always a simple reverse SQL operation.

## Security Impact

Database credentials used by migration jobs are secrets and must be protected. Migrations must not embed production secrets or unsafe data access. Failed migrations must stop a release rather than leave an unknown application/schema combination.

## Performance and Scalability

Indexes and data migrations must be evaluated for lock time and table size. The initial workload supports controlled release migrations. More advanced online migration practices may be needed later based on data volume.

## Consequences

### Positive Consequences

- Reproducible environments
- Reviewable schema history
- Safer CI and deployment
- Clear ownership of database evolution

### Negative Consequences

- Migration mistakes can block releases
- Destructive changes require careful planning
- Developers must understand SQL and compatibility

### Trade-offs

The project accepts migration discipline instead of the convenience of automatic schema mutation.

## Future Evolution

Add compatibility patterns, expand migration testing, and use phased data migrations when scale requires them. Database decomposition is a separate future decision.

## Revisit Conditions

Revisit only if PostgreSQL or the deployment model changes, or migration execution creates a measured release bottleneck that requires a documented process change.

## Related ADRs

- ADR-007 - PostgreSQL as Primary Database
- ADR-008 - JPA/Hibernate as Persistence Technology
- ADR-018 - CI/CD and Quality Gates

## References

- Technical BRD Sections 20-22 and 49-50
- Planning EPIC-00, EPIC-01, and EPIC-03
