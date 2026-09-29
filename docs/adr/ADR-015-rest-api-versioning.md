# ADR-015 - REST API and Versioning Strategy

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Code Classic will expose versioned REST APIs under `/api/v1`, with DTO-based responses, centralized errors, and explicit pagination.

## Context

React and Spring Boot are independently deployed and must communicate for blogs, comments, jobs, documents, courses, identity, and admin workflows. The Technical BRD defines REST endpoints, response envelopes, pagination, OpenAPI, and error handling.

## Problem Statement

The frontend needs predictable contracts while backend modules evolve incrementally and may eventually be extracted into services.

## Decision Drivers

- Frontend/backend separation
- Stable contracts
- Browser compatibility
- Future evolution
- Testability
- Documentation

## Options Considered

### Versioned REST under `/api/v1`

Simple, observable, and compatible with the selected stack. It requires deliberate evolution and response compatibility.

### Unversioned REST

Starts simply but makes breaking changes difficult to coordinate across independently deployed clients.

### GraphQL or a Different API Style

Could solve other query-shaping needs but is not selected in the Technical BRD and would add a new learning/operational model.

## Decision

Use REST endpoints under `/api/v1`, resource-oriented paths, DTOs, standard success/error envelopes, HTTP status codes, and page/size pagination. OpenAPI documents the public contract. API versioning does not remove the need for backward-compatible changes.

## Why This Decision Was Made

REST is sufficient for the initial domain and works naturally with React, Spring MVC, Cloudflare, testing tools, and future service extraction. Versioning protects incremental frontend/backend deployment.

## Implementation Impact

- Controllers expose `/api/v1` paths.
- DTOs isolate API shape from entities.
- `@RestControllerAdvice` maps validation and domain errors.
- Pagination is required for blogs, comments, jobs, documents, and courses.
- Authorization is applied before resource data is returned.
- OpenAPI updates accompany endpoint changes.

## Architecture Flow

```text
React Query -> /api/v1 Resource API -> Controller -> Service -> Repository/Integration -> DTO Response
```

## Cost Considerations

Direct tooling cost is not identified. Development cost includes DTOs, documentation, compatibility, and error contracts. Operational cost is contract monitoring and release coordination. Future cost is managing versions if breaking changes become necessary.

## Learning Value

- **Beginner:** learns HTTP methods, status codes, resources, and JSON.
- **Developer:** learns DTOs, pagination, validation, error handling, and contract testing.
- **Production:** learns why APIs outlive individual controllers and deployments.

## Security Impact

API versioning does not authorize requests. Every endpoint must enforce role, ownership, access level, and status rules. Errors must not reveal protected resource existence where policy forbids it.

## Performance and Scalability

Bounded pagination, small DTOs, indexes, and efficient fetches are required. No gateway, GraphQL layer, or cache is introduced without a measured need.

## Consequences

### Positive Consequences

- Clear browser/backend contract
- Easier API documentation and testing
- Future compatibility path
- Works with modular monolith and services

### Negative Consequences

- DTO and version maintenance
- API evolution needs discipline
- Multiple versions may eventually increase support cost

### Trade-offs

The project accepts explicit contract work for safer incremental deployment.

## Future Evolution

Add a new API version only for intentional breaking changes. Service extraction should preserve the frontend contract where possible.

## Revisit Conditions

Revisit if API shape, query needs, client types, traffic, or service extraction creates a measured limitation in REST/versioning.

## Related ADRs

- ADR-002 - Modular Monolith as Initial Architecture
- ADR-006 - React and TypeScript Frontend
- ADR-014 - Google SSO and Spring Security
- ADR-024 - API Gateway and Service Communication

## References

- Technical BRD Sections 14-17 and 57-59
- BRD Sections 64 and 69
