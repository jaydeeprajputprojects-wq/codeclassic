# ADR-004 - Java as Backend Language

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Java is the backend language for Code Classic.

## Context

Code Classic needs a production-oriented backend for authentication, authorization, content workflows, persistence, file integration, REST APIs, and future modular extraction. Java is explicitly selected in both the Technical BRD and the target learning direction.

## Problem Statement

The project needs a strongly typed backend language with mature support for web applications, security, persistence, testing, deployment, and enterprise development practices.

## Decision Drivers

- Fit with Spring Boot
- Strong typing and maintainability
- Enterprise relevance
- Testing ecosystem
- Team and learning value
- Long-term maintainability

## Options Considered

### Java

Provides the selected Spring ecosystem, mature tooling, strong typing, and broad production learning value. It has more ceremony than some alternatives and requires JVM knowledge.

### A Different Backend Language

Could reduce or change implementation ceremony, but would conflict with the selected stack and remove the intended Java/Spring learning path. No alternate language is approved for this project.

## Decision

Use Java for all initial Spring Boot backend services/modules. Java owns domain logic, API implementation, security integration, persistence orchestration, and test code on the backend.

## Why This Decision Was Made

The Technical BRD explicitly selects Java and Spring Boot. The platform is intended to expose learners to typed domain modeling, dependency injection, validation, transactions, security, testing, and production deployment in a cohesive stack.

## Implementation Impact

- Backend source is organized under the Code Classic Java package.
- Maven manages build and dependencies.
- JUnit 5 and Mockito support unit testing.
- Spring Boot and Java runtime configuration are part of deployment.
- Public APIs remain language-independent REST contracts.

## Cost Considerations

Direct language licensing cost is not identified as a project cost. Development cost includes JVM/build knowledge and Java verbosity. Operational cost includes runtime sizing and patching the selected Java distribution. Future cost is supported by a mature ecosystem but depends on runtime/provider choices, which are not finalized here.

## Learning Value

- **Beginner:** learns typed classes, interfaces, exceptions, and package organization.
- **Developer:** applies dependency injection, validation, persistence, and testing.
- **Production:** sees how language choices affect maintainability, builds, runtime, and security updates.

## Security Impact

Java itself does not provide authorization. Spring Security, input validation, dependency scanning, and secure configuration remain required. Runtime and dependency updates must be maintained.

## Performance and Scalability

The JVM supports the initial workload and can scale the monolith through resource adjustment or additional instances later. Performance must be measured rather than assumed from language choice.

## Consequences

### Positive Consequences

- Consistent selected backend stack
- Strong type checking
- Mature production ecosystem
- Large learning surface aligned with enterprise systems

### Negative Consequences

- More concepts and ceremony for beginners
- JVM memory/runtime configuration is required
- Build times may exceed a small script-based service

### Trade-offs

The project accepts additional learning and runtime complexity in exchange for maintainability and Java/Spring production relevance.

## Future Evolution

If a future extracted service uses another language, it must be justified independently and communicate through documented contracts. The initial backend decision remains Java.

## Revisit Conditions

Revisit only if the selected Spring/Java ecosystem no longer meets a measured requirement, runtime cost becomes material, or a separately extracted service has a documented need for another language.

## Related ADRs

- ADR-005 - Spring Boot as Backend Framework
- ADR-017 - Testing Strategy
- ADR-018 - CI/CD and Quality Gates

## References

- Technical BRD Sections 1, 7, 91
