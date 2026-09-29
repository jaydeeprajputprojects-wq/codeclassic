# ADR-024 - API Gateway and Service Communication

## Status

Future / Trigger-Based Decision

## Date

2026-09-23

## Decision Summary

Code Classic will not deploy a dedicated API gateway or service-to-service network initially. The modular monolith will expose the versioned API directly through the managed backend origin and Cloudflare edge.

## Context

The initial architecture has one Spring Boot application and no independently deployed backend services. The Technical BRD explicitly excludes a dedicated gateway initially and shows an API Gateway only in the future microservice architecture.

## Problem Statement

A gateway may eventually centralize routing, authentication, rate limiting, and service composition, but before service extraction it would add another hop and operational boundary without solving a current problem.

## Decision Drivers

- Number of deployable services
- Routing complexity
- Security boundary clarity
- Latency and failure modes
- Operational cost
- Future extraction

## Options Considered

### Direct Cloudflare-to-Modular-Monolith API

Simplest current path with one origin and Spring Security authorization.

### Dedicated API Gateway Now

Could centralize edge routing but would duplicate or obscure responsibilities while only one backend exists.

### Gateway After Service Extraction

Introduces the component when routing, authentication propagation, rate limiting, and service discovery become real concerns.

## Decision

Do not introduce a dedicated gateway initially. Use Cloudflare for DNS/edge concerns and Spring Boot for `/api/v1` application APIs. Future service-to-service calls require explicit contracts, timeouts, retries, authentication propagation, tracing, and ownership.

## Why This Decision Was Made

There is one backend deployment, so a gateway would not provide meaningful routing or isolation. Keeping authorization in Spring Security makes the security boundary visible and testable.

## Implementation Impact

- Frontend calls the versioned backend API domain.
- CORS, authentication, authorization, and rate controls are configured intentionally.
- Internal module interfaces are the initial communication mechanism.
- API contracts should remain stable enough for later routing.

## Cost Considerations

Current gateway pricing is avoided, but future provider pricing must be verified if adopted. Operational cost includes availability, configuration, logging, certificates, and failure diagnosis. Development cost includes routing and policy duplication. Future cost may be justified by multiple services.

## Learning Value

Learners see that a gateway is a distributed-system component with responsibilities and failure modes, not a required badge of maturity.

## Security Impact

A future gateway must not become the only authorization layer. Services remain responsible for resource authorization and trust boundaries. Token propagation, admin routes, CORS, and rate limiting require explicit design.

## Performance and Scalability

Avoiding a gateway removes one network hop initially. Revisit when routing or edge policy cannot be managed safely with the current origin and Cloudflare configuration.

## Consequences

### Positive Consequences

- Fewer network hops
- Simpler debugging
- Clear Spring Security boundary
- Lower initial operational cost

### Negative Consequences

- No centralized multi-service routing yet
- Future extraction will require communication design

### Trade-offs

The project accepts future gateway design work in exchange for current simplicity.

## Future Evolution

When services exist, evaluate gateway routing, service authentication, rate limiting, tracing, and failure policy as one architecture decision.

## Revisit Conditions

Multiple backend services, independent deployment, cross-origin routing, centralized policy requirements, or measured operational need.

## Related ADRs

- ADR-002 - Modular Monolith as Initial Architecture
- ADR-003 - Microservice-Ready Domain Boundaries
- ADR-015 - REST API and Versioning Strategy
- ADR-023 - Kafka and Event-Driven Architecture

## References

- Technical BRD Sections 6, 11, 14, 41, 80
