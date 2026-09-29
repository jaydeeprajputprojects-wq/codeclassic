# ADR-021 - Technology Selection for Learning and Career Relevance

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Code Classic will use a cohesive Java, Spring Boot, React, PostgreSQL, Cloudflare, Docker, GitHub Actions, and testing/observability stack that exposes learners to real production concerns without selecting tools only for novelty.

## Context

The platform is both a real application and a learning resource for freshers and developers with approximately 0-3 years of experience. The selected stack must support the BRD, remain production-oriented, and show the journey from requirements through deployment and operations.

## Problem Statement

A learning project can become either an unrealistic toy or a broad technology catalogue. Code Classic needs a focused stack where each technology has a real responsibility in the product.

## Decision Drivers

- Requirement fit
- Production relevance
- Coherent toolchain
- Learning progression
- Cost and operational simplicity
- Future extensibility

## Options Considered

### Focused Selected Stack

Each tool solves a project problem: Spring Boot for backend, React/TypeScript for frontend, PostgreSQL/Flyway for data, R2 for objects, Cloudflare for edge, GitHub Actions/Docker for delivery, and selected testing/observability tools.

### Broad Technology Survey

Using many competing tools would expose more names but reduce depth, increase setup cost, and weaken project consistency.

### Minimal Code-Only Stack

Would be easier to start but would omit important production concepts such as migrations, CI/CD, security, tests, and observability.

## Decision

Prefer one primary selected tool per engineering problem and explain it through actual user stories and production work. Do not introduce alternatives unless a documented project requirement requires a new decision.

## Why This Decision Was Made

The learning goal is to understand engineering reasoning, not memorize products. A focused stack lets learners connect business need, architecture, implementation, testing, deployment, and operational feedback.

## Implementation Impact

- ADRs explain why tools exist, not just how they work.
- User-story content packs keep the feature central.
- Examples show real API, database, test, CI, and deployment behavior.
- AI assistance is reviewed against requirements and project conventions.
- Unselected tools are discussed only when a future trigger requires them.

## Architecture Flow

```text
Business Requirement -> User Story -> Selected Tool Responsibility -> Implementation -> Test -> Production Lesson
```

## Cost Considerations

The selected stack reduces tool sprawl and associated training/operational cost. Current provider pricing is not asserted and must be verified before procurement. Learning and documentation cost is intentional. Future cost is managed through trigger-based adoption.

## Learning Value

- **Beginner:** learns what each part of a system is responsible for.
- **Developer:** learns to choose tools from requirements and constraints.
- **Production:** learns that career-relevant skill is judgment, integration, testing, and operation, not tool-name collection.

## Security Impact

A smaller consistent toolchain makes security ownership clearer, but no tool guarantees security. Backend authorization, secret management, scanning, validation, and review remain required.

## Performance and Scalability

The stack is adequate for the stated initial scale when pagination, indexes, connection pooling, CDN delivery, and bounded payloads are used. Scaling tools are introduced only after evidence.

## Consequences

### Positive Consequences

- Coherent learning path
- Fewer competing conventions
- Realistic production exposure
- Easier documentation maintenance

### Negative Consequences

- Learners may not see every alternative
- Selected tools create ecosystem dependency
- Keeping content aligned requires effort

### Trade-offs

The project prioritizes depth, consistency, and real delivery over breadth of technology coverage.

## Future Evolution

Add a new technology only when it solves a documented product or operational problem and its implementation becomes part of the real project.

## Revisit Conditions

Revisit if a selected tool fails requirements, creates material cost or risk, or a future capability requires a different technology with an approved decision.

## Related ADRs

- ADR-001 - Incremental Development Philosophy
- ADR-019 - Production-First Learning Strategy
- ADR-020 - Cost-Conscious Architecture

## References

- BRD Sections 1-3 and 72-78
- Technical BRD Sections 7, 45-50, 91
- User Story -> Content Pack Generator principles
