# ADR-025 - Database Decomposition During Service Extraction

## Status

Future / Trigger-Based Decision

## Date

2026-09-23

## Decision Summary

Code Classic will begin with one PostgreSQL database and logical module ownership. Database decomposition into service-owned schemas or databases will be considered only alongside justified service extraction.

## Context

The Technical BRD requires logical data ownership within one initial database and identifies future services such as Identity, Blog, Comment, Job, Document, and Learning. Decomposing databases before service boundaries are proven would add migration, consistency, reporting, and operational complexity.

## Problem Statement

Future services should own their data without creating permanent cross-service repository coupling. The project needs a measured path from shared infrastructure to independent ownership.

## Decision Drivers

- Data ownership
- Transaction boundaries
- Service independence
- Migration complexity
- Consistency requirements
- Operational cost
- Recovery

## Options Considered

### One Database with Logical Ownership Initially

Supports simple transactions and operations while module boundaries are established in code.

### Separate Schema per Module

May improve ownership visibility while retaining one database platform, but does not eliminate shared database operational coupling.

### Database per Extracted Service

Provides stronger autonomy but requires data migration, API/event coordination, separate backups, consistency design, and observability.

## Decision

Use one PostgreSQL database initially. Modules own their tables and repositories logically. If a module becomes a service, define its data boundary, migration plan, consistency model, read/reporting strategy, backup/recovery, and deprecation of cross-module access before moving data.

## Why This Decision Was Made

The current workload and modular monolith benefit from relational transactions and one operational database. The Technical BRD explicitly requires logical ownership now and reserves physical decomposition for justified future evolution.

## Implementation Impact

- No module directly uses another module's repository.
- Foreign keys and transactions are accepted within the initial shared database.
- API contracts are preferred over cross-module table access.
- Future extraction requires data inventory, ownership decision, migration tooling, dual-read/write or cutover strategy, and reconciliation.

## Cost Considerations

Current single-database cost and operations are lower. Future physical decomposition increases database instances, backups, migrations, monitoring, and support cost. Exact provider pricing must be verified when a real extraction is proposed.

## Learning Value

Learners see that service extraction is also a data-ownership problem. The difficult part is not moving classes or deploying containers; it is preserving correctness, consistency, and recovery while data boundaries change.

## Security Impact

Separate databases can improve isolation but do not replace application authorization. Credentials, network access, migration privileges, and data replication must be least-privilege. Personal/user data movement requires explicit review.

## Performance and Scalability

Revisit when a module needs independent scaling, availability, storage, or query isolation. Database decomposition can add network latency and distributed consistency, so query/index optimization comes first.

## Consequences

### Positive Consequences

- Simple initial transactions
- Lower operational cost
- Easier early development
- Explicit future ownership target

### Negative Consequences

- Shared database remains a coupling boundary
- Extraction later requires data migration
- Cross-module reporting may become harder

### Trade-offs

The project accepts a shared initial database to avoid premature distributed data complexity.

## Future Evolution

Extract data with a documented strangler/cutover plan, contract tests, reconciliation, backup verification, and a clear removal date for old access paths.

## Revisit Conditions

Independent module scaling, deployment/reliability isolation, database bottlenecks, compliance boundaries, team ownership, or a service-extraction decision.

## Related ADRs

- ADR-002 - Modular Monolith as Initial Architecture
- ADR-003 - Microservice-Ready Domain Boundaries
- ADR-007 - PostgreSQL as Primary Database
- ADR-009 - Flyway for Database Migrations
- ADR-024 - API Gateway and Service Communication

## References

- Technical BRD Sections 4, 20-22, 79-80
- Planning EPIC-11
