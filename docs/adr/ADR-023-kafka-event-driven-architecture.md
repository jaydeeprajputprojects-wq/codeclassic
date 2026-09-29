# ADR-023 - Kafka and Event-Driven Architecture

## Status

Future / Trigger-Based Decision

## Date

2026-09-23

## Decision Summary

Kafka and an external event broker are not part of the initial Code Classic architecture. Internal domain events may be used where helpful, but external messaging requires a measured asynchronous requirement.

## Context

The Technical BRD identifies possible events such as BlogPublishedEvent, CommentCreatedEvent, JobPublishedEvent, DocumentUploadedEvent, and CoursePublishedEvent, but explicitly says Kafka is not required initially. Notifications, analytics, search, and moderation are future candidates.

## Problem Statement

The platform may eventually need asynchronous processing and multiple independent consumers. Introducing a broker before those needs exist would add delivery, ordering, retry, schema, monitoring, and operational complexity.

## Decision Drivers

- Actual asynchronous workload
- Reliability and delivery semantics
- Consumer independence
- Operational complexity
- Cost
- Debuggability

## Options Considered

### In-Process Domain Events Initially

Keeps event concepts testable without distributed infrastructure. It is not a durable cross-service delivery mechanism.

### Kafka Now

Would support durable streams and multiple consumers but adds brokers, topics, partitions, consumer groups, retries, schemas, monitoring, and deployment responsibility.

### Direct Synchronous Calls Initially

Are easier to reason about for the modular monolith and adequate for current workflows, with internal interfaces preserving future options.

## Decision

Use direct module calls and/or carefully scoped in-process events initially. Do not deploy Kafka. If asynchronous delivery becomes necessary, create a new decision covering event contracts, outbox/reliability, retries, ordering, idempotency, retention, and operations.

## Why This Decision Was Made

The current product scope and initial scale do not require a broker. The Technical BRD explicitly defers Kafka while preserving future event names as architectural candidates.

## Implementation Impact

- Domain event names may exist as internal concepts.
- Business operations remain correct without a broker.
- Consumers must not depend on uncommitted external delivery.
- Future event contracts must be versioned and observable.

## Cost Considerations

Future direct and managed Kafka pricing must be verified before adoption. Operational cost includes brokers, partitions, storage, monitoring, upgrades, and incident response. Development cost includes asynchronous consistency and idempotency. Learning cost is significant and should be tied to a real workflow.

## Learning Value

This decision teaches that event-driven architecture is valuable when decoupling and asynchronous behavior solve a real problem, not because events are fashionable.

## Security Impact

Future brokers require secret/network access controls, topic authorization, payload minimization, and protection of personal data. Events must not bypass API authorization or expose sensitive content.

## Performance and Scalability

Revisit when synchronous workflows create measured latency, independent consumers are required, notification/search/analytics workloads need decoupling, or service extraction creates reliable asynchronous boundaries.

## Consequences

### Positive Consequences

- Simple initial debugging
- No broker operations
- Strong consistency for current module calls
- Lower cost

### Negative Consequences

- Future asynchronous workloads may require refactoring
- Consumers are not independently scaled now

### Trade-offs

The project accepts synchronous coupling initially to avoid distributed delivery complexity.

## Future Evolution

Introduce an outbox and broker only with a documented event contract and operational owner. Keep events idempotent and observable.

## Revisit Conditions

Notifications, analytics, search, moderation, or independent service consumers create a measured need for asynchronous durable delivery.

## Related ADRs

- ADR-002 - Modular Monolith as Initial Architecture
- ADR-003 - Microservice-Ready Domain Boundaries
- ADR-020 - Cost-Conscious Architecture
- ADR-024 - API Gateway and Service Communication

## References

- Technical BRD Sections 41, 80-81
- BRD Sections 28, 74, 76
