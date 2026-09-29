# ADR-019 - Production-First Learning Strategy

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Code Classic will be built as a real production-oriented application and deployed early, with documentation and learning content derived from actual engineering decisions.

## Context

The project serves users and also teaches developers how a complete application is designed, tested, deployed, secured, monitored, and evolved. The Technical BRD explicitly requires an early production deployment and a production-readiness checklist.

## Problem Statement

A local-only tutorial can teach code syntax while hiding deployment, security, failure, data migration, monitoring, and trade-offs. Code Classic needs learning value that comes from real project constraints without compromising the application.

## Decision Drivers

- Authentic engineering experience
- Early production feedback
- Learning value for 0-3 year developers
- Quality and security
- Incremental delivery
- Documentation reuse

## Options Considered

### Production-First Learning

Build the actual platform with production practices from early stages, then explain decisions through ADRs, user stories, tests, and deployment evidence.

### Tutorial-First Prototype

Could be easier to present but would defer operational concerns and risk teaching patterns that do not survive production.

### Production-Only Without Learning Documentation

Could deliver software but would lose the explicit educational objective and decision traceability.

## Decision

Treat Code Classic as the primary production application and use its real requirements and implementation journey as learning material. The repository, ADRs, Planning epics, tests, CI, logs, and deployment evidence are the source of educational examples.

## Why This Decision Was Made

The project vision combines technology learning, knowledge sharing, and real engineering practice. Learners should see why a choice was made, what it costs, how it is tested, and when it should change.

## Implementation Impact

- ADRs document architecture decisions.
- Planning files connect epics, features, stories, tests, and release gates.
- Content packs may be created from user stories without changing requirements.
- Production concerns are included in each vertical slice.
- AI may assist implementation but developers review architecture, security, tests, and output.

## Architecture Flow

```text
Business Need -> User Story -> Decision -> Implementation -> Test -> Deploy -> Observe -> Document/Learn
```

## Cost Considerations

Direct infrastructure cost is real and must be controlled through the small initial architecture. Development cost includes documentation and operational work. Learning cost is higher because the material includes failure and trade-offs. Future cost is controlled by avoiding unsupported infrastructure.

## Learning Value

- **Beginner:** sees a feature as more than code.
- **Developer:** learns workflow, testing, GitHub, CI/CD, and debugging.
- **Production:** learns how requirements, operations, and trade-offs interact.
- **AI era:** learns to use AI as an assistant while retaining engineering accountability.

## Security Impact

Learning content must never expose real credentials, tokens, private user data, or insecure shortcuts. Demonstrations use safe fixtures and explain that the frontend is not a security boundary.

## Performance and Scalability

Teaching examples use the actual measured scale and architecture. The project will not add Redis, Kafka, Elasticsearch, Kubernetes, or a gateway merely to make content appear more advanced.

## Consequences

### Positive Consequences

- Authentic and reusable learning material
- Earlier production feedback
- Better decision traceability
- Stronger engineering habits

### Negative Consequences

- Documentation takes time
- Production incidents can affect learning schedules
- Content must be kept aligned with the implementation

### Trade-offs

The project accepts additional documentation and operational work to preserve authenticity.

## Future Evolution

Create learning content from later scaling, incidents, and service-extraction evidence. Retire outdated explanations when decisions change.

## Revisit Conditions

Revisit if educational goals conflict with user safety, production quality, privacy, or delivery capacity.

## Related ADRs

- ADR-001 - Incremental Development Philosophy
- ADR-018 - CI/CD and Quality Gates
- ADR-020 - Cost-Conscious Architecture
- ADR-021 - Technology Selection for Learning and Career Relevance

## References

- BRD Sections 1-3 and 72-78
- Technical BRD Sections 4, 60-64, 83-89
