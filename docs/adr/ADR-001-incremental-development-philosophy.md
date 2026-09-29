# ADR-001 - Incremental Development Philosophy

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Code Classic will be delivered through incremental vertical slices, with the minimal blog flow deployed before the complete Phase 1 product.

## Context

The BRD contains blogs, learning documents, courses, YouTube videos, jobs, sharing, comments, and administration. The Technical BRD also targets an initial workload of approximately 100-500 users and explicitly recommends early production deployment. Building every capability before deployment would delay feedback and hide hosting, security, migration, and operational risks.

## Problem Statement

Code Classic needs to validate real product and production assumptions early while preserving a path to the complete Phase 1 scope. The team must avoid a long implementation period with no deployable increment.

## Decision Drivers

- Early production feedback
- Lower delivery risk
- Small, testable increments
- Learning value from the whole lifecycle
- Low initial operational cost
- Alignment with the Technical BRD roadmap

## Options Considered

### Complete Phase 1 Before Deployment

This gives a large initial feature set, but delays infrastructure validation, increases integration risk, and makes failures harder to isolate.

### Build and Deploy Vertical Slices

This validates a real browser-to-database path early and allows each increment to include implementation, testing, deployment, and observability. It requires disciplined scope management and temporary limitations in the first release.

### Start with Separate Services

This could isolate domains early, but adds deployment, networking, monitoring, and data coordination before the requirements justify them.

## Decision

Use the sequence Foundation -> Minimal Blog Backend -> Minimal Blog Frontend -> First Production Deployment -> Google SSO -> Complete Blog/Admin -> Jobs/Admin -> Courses -> Documents -> Production Hardening. Admin work progresses alongside each relevant domain.

## Why This Decision Was Made

The blog is the first meaningful vertical slice and the Technical BRD explicitly identifies it as the first production target. This sequence turns requirements into working software while making security, database, deployment, and operational decisions visible early.

## Implementation Impact

- Each epic must include API, UI, persistence, testing, documentation, and release evidence where relevant.
- The first release is intentionally smaller than Phase 1.
- CI and deployment are established before all features exist.
- Later features reuse the same module, API, migration, and test conventions.

## Architecture Flow

```text
Requirement -> User Story -> API/Design -> Implementation -> Tests -> Deployment -> Measurement -> Next Increment
```

## Cost Considerations

Direct cost is controlled by deploying a small application early rather than provisioning a large platform. Operational and development cost is lower because each increment has a limited failure surface. Learning cost is higher than a purely local tutorial because learners see real release constraints. Future cost is managed by measuring before adding infrastructure.

Exact provider pricing is not finalized here and must be verified against current provider pricing before release decisions.

## Learning Value

- **Beginner:** sees how a requirement becomes a working increment.
- **Developer:** learns to slice work vertically and define release gates.
- **Production:** learns why deployment, monitoring, and rollback belong in delivery, not only at the end.
- **Career relevance:** gains exposure to iterative delivery and risk reduction.

## Security Impact

Security is introduced incrementally, but backend authorization remains mandatory before protected capabilities are released. A small first slice must not become an excuse to trust frontend controls.

## Performance and Scalability

The initial slice uses PostgreSQL, one backend deployment, Cloudflare delivery, and pagination where applicable. Redis, Kafka, Elasticsearch, Kubernetes, and a dedicated gateway are not initially justified by the stated scale.

## Consequences

### Positive Consequences

- Earlier production learning
- Smaller changes and easier diagnosis
- Better traceability from requirement to release
- Feedback can influence later slices

### Negative Consequences

- Early releases have intentionally limited scope
- Temporary development identity/configuration may exist before Google SSO
- Some cross-feature polish is deferred

### Trade-offs

The project accepts a smaller first release in exchange for lower delivery and operational risk.

## Future Evolution

As evidence accumulates, the roadmap can add hardening, caching, independent scaling, or service extraction. The next increment must be justified by observed needs.

## Revisit Conditions

Revisit if product priorities change, the deployment cadence becomes a bottleneck, a feature cannot be safely sliced, or operational evidence shows a different delivery sequence is needed.

## Related ADRs

- ADR-002 - Modular Monolith as Initial Architecture
- ADR-019 - Production-First Learning Strategy
- ADR-020 - Cost-Conscious Architecture

## References

- BRD Phase 1 scope and success criteria
- Technical BRD Sections 60-64 and 89
- Planning EPIC-00 through EPIC-03
