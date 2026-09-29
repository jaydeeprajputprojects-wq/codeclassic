# ADR-003 - Microservice-Ready Domain Boundaries

## Status

Accepted

## Date

2026-09-23

## Decision Summary

The modular monolith will enforce business-domain ownership so that later service extraction is possible without making microservices part of the initial deployment.

## Context

The BRD contains related but separable capabilities. The Technical BRD names Identity, Blog, Comment, Job, Document, Course/Learning, and Admin modules and requires that modules own their repositories.

## Problem Statement

Code Classic needs to prevent a convenient shared-code structure from becoming a tightly coupled system that cannot evolve. It must also avoid pretending that package separation alone creates services.

## Decision Drivers

- Data ownership
- Maintainability
- Testability
- Future extraction
- Local simplicity
- Clear security responsibilities

## Options Considered

### Domain-Owned Modules in One Application

Each module owns its persistence and exposes interfaces. This supports local calls now and replaceable communication later.

### Shared Repository Layer

A global repository layer is quick to start, but creates coupling and makes ownership unclear.

### Immediate Service Boundaries

Separate deployments provide strong isolation but add distributed-system cost before justified.

## Decision

Use domain modules with private entities/repositories, public application/domain interfaces, module-specific DTOs, and explicit cross-module dependencies. Admin coordinates operations through module services rather than owning all domain persistence.

## Why This Decision Was Made

The rule directly implements the Technical BRD's database ownership principle. It makes the architecture teachable: a future service can replace an internal interface with an HTTP or event boundary, but the frontend contract need not change.

## Implementation Impact

- `identity`, `blog`, `comment`, `job`, `document`, `course`, and `admin` are separate package areas.
- Architecture tests prevent forbidden repository imports.
- Cross-module operations use interfaces or application services.
- Database tables remain in one PostgreSQL database initially.
- API DTOs are not shared JPA entities.

## Architecture Flow

```text
Admin API -> Admin Application Service -> Blog/Job/Course Module Interface -> Module Repository
```

## Cost Considerations

There is little direct infrastructure cost because all modules remain in one process. Development cost increases through interfaces, DTOs, and architecture checks, but this is cheaper than untangling accidental coupling later. Future extraction cost remains uncertain and depends on actual dependencies.

## Learning Value

- **Beginner:** learns that a module is an ownership boundary, not just a folder.
- **Developer:** practices interfaces, dependency direction, and repository ownership.
- **Production:** understands why data ownership and deployment boundaries are separate decisions.

## Security Impact

Authorization is implemented in the owning module and enforced again at API boundaries. An admin module cannot bypass a domain module's ownership or status rules by accessing its repository directly.

## Performance and Scalability

In-process interfaces avoid network overhead initially. Later extraction may introduce latency, retries, timeouts, and tracing, which must be justified by measured need.

## Consequences

### Positive Consequences

- Clear ownership
- Easier module testing
- Safer future extraction
- Reduced accidental coupling

### Negative Consequences

- More interfaces and mapping code
- Some duplication across DTOs
- Boundaries require ongoing review

### Trade-offs

The project accepts modest structural overhead now to reduce future coupling while keeping one deployment.

## Future Evolution

A candidate module can become a service after its data boundary, API contract, operational needs, and communication model are documented and tested.

## Revisit Conditions

Revisit if the module map changes, a cross-module dependency becomes dominant, or service extraction becomes justified by scaling, reliability, or deployment evidence.

## Related ADRs

- ADR-002 - Modular Monolith as Initial Architecture
- ADR-024 - API Gateway and Service Communication
- ADR-025 - Database Decomposition During Service Extraction

## References

- Technical BRD Sections 4, 8-11, 79-80
