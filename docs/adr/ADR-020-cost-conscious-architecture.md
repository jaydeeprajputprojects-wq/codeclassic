# ADR-020 - Cost-Conscious Architecture

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Code Classic will minimize initial infrastructure and recurring operational cost while retaining production-grade security, testing, deployment, and observability practices.

## Context

The Technical BRD targets 100-500 initial users and explicitly advises against Kubernetes, Kafka, Elasticsearch/OpenSearch, Redis, service discovery, a dedicated gateway, and multiple backend services unless actual requirements emerge.

## Problem Statement

The platform needs to be production-capable without paying for infrastructure that the current workload and product scope do not require.

## Decision Drivers

- Initial user scale
- Sustainable project cost
- Operational simplicity
- Production quality
- Learning value
- Measured evolution

## Options Considered

### Small Managed Architecture

Cloudflare Pages, managed Spring Boot hosting, managed PostgreSQL, R2, one backend deployment, and GitHub Actions. It keeps ownership and operational surfaces limited.

### Infrastructure-Heavy Platform from Day One

Could support future scale but creates cost, maintenance, and learning burden before evidence exists.

### Minimal Local-Only Setup

Would reduce immediate cost but fail to validate production deployment, security, backups, and operations early.

## Decision

Start with one modular backend, one managed PostgreSQL database, Cloudflare Pages, Cloudflare/R2, Docker, GitHub Actions, and selected observability. Add infrastructure only after measuring a problem and documenting a new decision.

## Why This Decision Was Made

Cost is a technical constraint, not a reason to omit production practices. Managed services reduce undifferentiated operations while the modular monolith avoids distributed-system costs.

## Implementation Impact

- Capacity is measured before scaling.
- Pagination, indexes, connection limits, CDN delivery, and optimized files are prioritized.
- New infrastructure requires a requirement, evidence, cost estimate, and operational owner.
- Future services are candidates, not commitments.

## Architecture Flow

```text
Cloudflare Pages + Managed Spring Boot + Managed PostgreSQL + R2
                         -> Measure -> Optimize -> Scale only when justified
```

## Cost Considerations

Direct prices are provider- and plan-specific and are not invented here; they must be verified before commitment. Operational cost includes backups, logs, alerts, secrets, and upgrades. Development cost favors simpler operations. Future cost may rise with traffic, storage, retention, availability, and additional services.

## Learning Value

- **Beginner:** learns that architecture includes cost and operations.
- **Developer:** learns to optimize queries and boundaries before adding infrastructure.
- **Production:** learns capacity planning and evidence-based scaling.

## Security Impact

Cost reduction must not remove HTTPS, backend authorization, secret management, validation, backups, dependency scanning, or monitoring. Cheaper infrastructure is unacceptable if it creates uncontrolled data exposure.

## Performance and Scalability

The optimization sequence is measure -> identify bottleneck -> optimize SQL/application -> cache where useful -> scale infrastructure -> extract service if justified. Redis, Kafka, Elasticsearch, Kubernetes, and a gateway are intentionally deferred.

## Consequences

### Positive Consequences

- Lower initial recurring cost
- Less operational burden
- Clear scaling discipline
- More time for product value

### Negative Consequences

- Some future scale capabilities are deferred
- Provider limits may appear sooner
- The team must measure carefully

### Trade-offs

The project accepts future migration work in exchange for not operating speculative infrastructure now.

## Future Evolution

Use telemetry, load tests, cost reviews, and user growth to decide when to add resources or services.

## Revisit Conditions

Revisit when traffic, storage, latency, availability, team size, compliance, or provider pricing changes the economic decision.

## Related ADRs

- ADR-002 - Modular Monolith as Initial Architecture
- ADR-011 - Cloudflare for DNS, CDN, and Edge
- ADR-013 - Managed Hosting for Spring Boot
- ADR-022 - Redis Introduction
- ADR-023 - Kafka and Event-Driven Architecture

## References

- Technical BRD Sections 2, 6, 39-41, 79, 82-83
