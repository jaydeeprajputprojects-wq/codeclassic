# ADR-005 - Spring Boot as Backend Framework

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Spring Boot is the framework for the Code Classic Java backend.

## Context

The backend must expose versioned REST APIs, integrate Spring Security and OAuth2, persist through JPA/Hibernate, validate requests, provide Actuator health, support testing, and run as a Dockerized application.

## Problem Statement

Code Classic needs a coherent backend framework that reduces infrastructure boilerplate while keeping HTTP, business, persistence, security, and operational responsibilities explicit.

## Decision Drivers

- Selected Technical BRD stack
- REST and security support
- Production operations
- Testability
- Developer productivity
- Learning value
- Modular application support

## Options Considered

### Spring Boot

Provides conventions and integration for the selected Java ecosystem while allowing explicit configuration and modular package structure. It introduces framework concepts that learners must understand.

### A Bare Java Web Stack

Would offer more control but require more configuration and infrastructure code for HTTP, dependency wiring, validation, security, and operations.

### Immediate Separate Frameworks per Module

Would add inconsistency and deployment complexity without a current requirement for independent services.

## Decision

Use Spring Boot with Spring MVC, Spring Security, Spring Data JPA, Bean Validation, Actuator, Maven, and OpenAPI integration as the backend foundation. Spring Boot owns application startup, dependency wiring, web endpoints, security integration, and operational endpoints; it does not replace domain rules or database migration ownership.

## Why This Decision Was Made

Spring Boot matches every major backend requirement in the Technical BRD and supports a modular monolith without forcing microservices. It provides a realistic learning path from controller to service to repository to production monitoring.

## Implementation Impact

- Controllers expose DTO-based `/api/v1` endpoints.
- Services own business rules and transitions.
- Repositories stay inside modules.
- `@RestControllerAdvice` centralizes errors.
- Actuator endpoints are secured and limited.
- Maven and Docker package the application.

## Architecture Flow

```text
HTTP Request -> Spring MVC Controller -> Application Service -> Repository/Integration -> Response DTO
                         |                    |
                    Validation           Authorization/business rules
```

## Cost Considerations

Spring Boot has no project-specific license cost identified here. Operational cost is one managed application runtime and its JVM resources. Development cost is lower than assembling framework infrastructure, but learning cost includes annotations, dependency injection, proxies, and configuration. Future cost remains manageable while the monolith is small.

## Learning Value

- **Beginner:** understands controller/service/repository responsibilities.
- **Developer:** learns dependency injection, validation, security filters, and integration testing.
- **Production:** sees framework conventions alongside explicit operational controls.

## Security Impact

Spring Security provides mechanisms, not automatic correctness. Endpoint, role, ownership, and access-level authorization must be implemented and tested. Actuator and error endpoints must not disclose sensitive data.

## Performance and Scalability

Spring Boot supports the initial workload and later multiple instances. Query design, connection pooling, and payload size remain application responsibilities. No cache or broker is introduced solely because the framework can integrate with one.

## Consequences

### Positive Consequences

- Consistent selected backend stack
- Strong integrations for required capabilities
- Testable layered/module structure
- Production-oriented operational support

### Negative Consequences

- Framework conventions can obscure control flow for beginners
- Dependency and configuration management require discipline
- JVM and framework upgrades must be maintained

### Trade-offs

The project accepts framework complexity in exchange for a coherent, production-capable Java backend.

## Future Evolution

The application can keep Spring Boot during modular growth or use it for extracted services. API and module contracts should remain independent of Spring annotations where practical.

## Revisit Conditions

Revisit if Spring Boot fails a measured runtime, deployment, security, or maintainability requirement, or if an extracted service has a documented reason to use another framework.

## Related ADRs

- ADR-004 - Java as Backend Language
- ADR-008 - JPA/Hibernate as Persistence Technology
- ADR-014 - Google SSO and Spring Security
- ADR-015 - REST API and Versioning Strategy

## References

- Technical BRD Sections 7-18, 35-38, 46-49
