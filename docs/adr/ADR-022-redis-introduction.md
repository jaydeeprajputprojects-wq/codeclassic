# ADR-022 - Redis Introduction

## Status

Future / Trigger-Based Decision

## Date

2026-09-23

## Decision Summary

Redis is not part of the initial Code Classic architecture. It may be introduced only after measured caching, rate-limiting, session, or coordination requirements justify its operational cost.

## Context

The Technical BRD explicitly excludes Redis initially and lists possible future candidates such as popular blogs, categories, tags, published jobs, and course metadata. The initial workload is approximately 100-500 users.

## Problem Statement

Code Classic may eventually need lower read latency, shared rate limiting, or cross-instance ephemeral state, but adding Redis before measuring the bottleneck would create another system to operate.

## Decision Drivers

- Measured performance need
- Cache correctness
- Operational cost
- Data consistency
- Horizontal scaling
- Simplicity

## Options Considered

### Keep PostgreSQL/HTTP/CDN Initially

Uses existing systems and avoids cache invalidation and operational complexity.

### Introduce Redis Now

Could improve selected access patterns but adds deployment, memory, eviction, monitoring, failure, and invalidation concerns before evidence exists.

## Decision

Do not introduce Redis in the initial release. First use pagination, indexes, efficient queries, browser/CDN caching, and measured application optimization. A future Redis ADR/implementation must define the data, TTL, invalidation, failure behavior, and cost.

## Why This Decision Was Made

The Technical BRD says caching should follow measurement and identifies Redis only as a future candidate. PostgreSQL and Cloudflare address the initial workload without a new stateful dependency.

## Implementation Impact

- APIs must remain correct without Redis.
- Cacheable responses must have explicit semantics before caching.
- Rate limiting can initially use Cloudflare or a bounded application approach where appropriate.
- No code may silently assume Redis exists.

## Cost Considerations

Future direct pricing depends on the selected managed/self-hosted option and must be verified. Operational cost includes memory sizing, eviction, backups where relevant, monitoring, and failure handling. Development cost includes cache keys/invalidation and consistency. Learning cost includes distributed state concepts.

## Learning Value

Learners can see that caching is a response to a measured bottleneck, and that a cache introduces correctness and failure behavior rather than being a free speed switch.

## Security Impact

If introduced, Redis credentials, network access, key contents, and tenant/user isolation must be protected. It must not become an authorization source without a clear consistency model.

## Performance and Scalability

Revisit only after load tests and production metrics identify database/read latency, rate-limiting, or shared ephemeral-state problems that simpler measures cannot solve.

## Consequences

### Positive Consequences

- Simpler initial deployment
- No cache invalidation bugs now
- Lower cost and operational surface

### Negative Consequences

- Some future read optimization is deferred
- PostgreSQL may handle more reads initially

### Trade-offs

The project accepts potential future database pressure to avoid speculative infrastructure.

## Future Evolution

Define a narrow use case, ownership, TTL/invalidation, fallback, metrics, and rollback before adoption.

## Revisit Conditions

Measured latency, database load, multi-instance rate limiting, session coordination, or a clear cost/benefit case.

## Related ADRs

- ADR-007 - PostgreSQL as Primary Database
- ADR-011 - Cloudflare for DNS, CDN, and Edge
- ADR-020 - Cost-Conscious Architecture

## References

- Technical BRD Sections 39-40 and 82-83
