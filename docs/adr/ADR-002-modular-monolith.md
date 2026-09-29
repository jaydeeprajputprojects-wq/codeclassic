# ADR-002 - Modular Monolith as Initial Architecture

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Code Classic will start as a modular Spring Boot monolith, not as independently deployed microservices.

## Context

The platform has distinct domains: Identity, Blog, Comments, Jobs, Documents, Learning/Courses, and Admin. The Technical BRD targets 100-500 initial users and explicitly advises avoiding Kubernetes, Kafka, Redis, a dedicated gateway, service discovery, and multiple backend services until a demonstrated need exists.

## Problem Statement

The system needs clear domain ownership and future extraction capability without paying the operational cost of distributed services before traffic, team size, or deployment independence requires it.

## Decision Drivers

- Initial scale
- Low operational complexity
- Development speed
- Clear domain boundaries
- Production readiness
- Future decomposability
- Learning value

## Options Considered

### Modular Monolith

One deployable application with explicit internal modules. It keeps calls local and transactions simple while allowing domain boundaries to be enforced in code. The risk is that boundaries can erode without architecture tests and review.

### Immediate Microservices

Independent services could scale and deploy separately, but introduce service communication, distributed tracing, deployment coordination, and data ownership complexity before those benefits are needed.

### Unstructured Monolith

This is simplest initially but creates direct repository coupling, unclear ownership, and expensive future extraction. It does not meet the technical architecture goals.

## Decision

Use one Spring Boot deployment organized by business module. Each module owns its entities, repositories, services, and APIs. Other modules communicate through public service/domain interfaces rather than directly accessing repositories.

## Why This Decision Was Made

This is the smallest architecture that supports the current requirements and still teaches real modular design. It keeps PostgreSQL transactions and local debugging straightforward while preserving a path to service extraction when a module has an independent scaling or deployment reason.

## Implementation Impact

- Package by domain rather than by one global controller/service/repository layer.
- Use DTOs and module interfaces at boundaries.
- Add architecture tests for forbidden dependencies.
- Keep API contracts independent of internal deployment topology.
- Document possible future service boundaries without implementing them now.

## Architecture Flow

```text
React -> Spring Boot Modular Monolith -> Module Service -> Module Repository -> PostgreSQL
                                      -> R2 / External APIs where required
```

## Cost Considerations

Direct hosting cost is lower because there is one backend deployment. Operational cost is lower because there is no service discovery, gateway, broker, or distributed deployment process. Development cost is reduced, although enforcing boundaries needs design discipline. Future cost is the effort required to extract a module later; explicit interfaces and ownership reduce that cost.

Exact hosting pricing is not finalized and should be verified with the selected provider.

## Learning Value

- **Beginner:** understands the difference between a monolith and a modular monolith.
- **Developer:** practices package boundaries, dependency inversion, and module ownership.
- **Production:** sees why microservices are an operational decision, not merely a package layout.
- **Career relevance:** gains experience with a common evolution path from monolith to services.

## Security Impact

The single backend remains the authorization boundary. Module separation does not replace endpoint and resource authorization. Admin, ownership, and access-level checks remain enforced in services.

## Performance and Scalability

Local calls avoid network latency and distributed failure modes. The initial system can scale the backend vertically and later horizontally if the hosting model supports it. The database and object storage remain shared initially.

Redis, Kafka, Elasticsearch, Kubernetes, and an API gateway are intentionally not introduced by this decision.

## Consequences

### Positive Consequences

- Fast local development and debugging
- One deployment and one operational surface
- Simple database transactions
- Clear future extraction candidates

### Negative Consequences

- One deployment can affect multiple modules
- A shared database requires discipline
- Independent scaling is not available per module initially

### Trade-offs

The project accepts shared deployment and database characteristics in exchange for lower complexity at the initial scale.

## Future Evolution

Measure module load, deployment coupling, reliability, and data boundaries. Extract only a module with a clear boundary and meaningful operational benefit.

## Revisit Conditions

Revisit when a module needs independent scaling, release cadence, reliability isolation, or ownership; when the single deployment becomes a bottleneck; or when operational complexity is lower with extraction than without it.

## Related ADRs

- ADR-001 - Incremental Development Philosophy
- ADR-003 - Microservice-Ready Domain Boundaries
- ADR-024 - API Gateway and Service Communication
- ADR-025 - Database Decomposition During Service Extraction

## References

- Technical BRD Sections 4-6, 8-11, 79-82
- Planning EPIC-00 and EPIC-11
