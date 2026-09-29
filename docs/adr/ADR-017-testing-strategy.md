# ADR-017 - Testing Strategy

## Status

Accepted

## Date

2026-09-23

## Decision Summary

Code Classic will use a layered test strategy: JUnit 5 and Mockito for unit tests, Spring Boot Test and Testcontainers for integration tests, Vitest and React Testing Library for frontend tests, and Playwright for critical end-to-end journeys.

## Context

The BRD includes security-sensitive workflows: blog approval, rejection, ownership, likes, comments, protected Jobs, document access, and admin management. The Technical BRD requires unit, integration, frontend, and E2E testing.

## Problem Statement

No single test type proves business rules, database behavior, UI behavior, authorization, and deployment readiness. The project needs confidence without making every change a slow browser test.

## Decision Drivers

- Business-rule coverage
- Database integrity
- Security coverage
- Fast feedback
- Production confidence
- Learning value

## Options Considered

### Test Pyramid with Selected Tools

Fast unit tests cover logic, integration tests cover real PostgreSQL and framework behavior, frontend tests cover components, and a small E2E suite covers critical journeys.

### E2E-Only Testing

Shows user outcomes but is slower, more brittle, and weak at isolating defects.

### Unit-Only Testing

Fast but misses database constraints, framework integration, authorization wiring, and real browser behavior.

## Decision

Use the test pyramid and add tests at the ownership boundary of each behavior. Unit tests cover transitions, validation, authorization decisions, and services. Testcontainers covers PostgreSQL/migrations/constraints. Frontend tests cover components/forms/states. Playwright covers critical user journeys and unauthorized variants.

## Why This Decision Was Made

The selected tools match the stack and the roadmap. Security and data-integrity requirements make real PostgreSQL integration tests essential, while a focused E2E suite keeps release confidence practical.

## Implementation Impact

- Every feature adds unit tests and required integration tests.
- Critical constraints such as unique likes and same-blog replies use real database tests.
- E2E journeys cover login, blog approval, protected Jobs, documents, and courses.
- Tests run in CI against clean, reproducible environments.

## Architecture Flow

```text
Unit -> Integration/PostgreSQL -> Frontend Component -> Contract/API -> Critical E2E -> Production Smoke
```

## Cost Considerations

Tooling cost is not separately finalized; current selected tools are part of the project stack. Development cost includes writing and maintaining tests. CI cost grows with containers and browser runs. Learning cost is intentional: learners see different defects caught at different layers.

## Learning Value

- **Beginner:** learns what to test and why one test type is not enough.
- **Developer:** learns mocks, real databases, component tests, and browser automation.
- **Production:** learns confidence, regression prevention, and release evidence.

## Security Impact

Negative authorization tests are mandatory. Tests must verify that frontend-hidden controls are also rejected by APIs, that shared URLs do not bypass access, and that secrets are absent from fixtures/logs.

## Performance and Scalability

Keep most tests fast and isolated. Reuse container setup safely, bound E2E coverage to critical journeys, and run load/performance tests when measured capacity risk appears.

## Consequences

### Positive Consequences

- Defects are caught near their source
- Database behavior is realistic
- Critical workflows are demonstrable
- CI protects incremental delivery

### Negative Consequences

- Tests require maintenance
- Containers/browser tests increase CI time
- E2E environments need stable data and configuration

### Trade-offs

The project accepts test investment in exchange for safer production increments.

## Future Evolution

Add contract, performance, accessibility, or security automation when features and measured risk justify it.

## Revisit Conditions

Revisit if test duration, flakiness, coverage gaps, or release risk becomes unacceptable.

## Related ADRs

- ADR-001 - Incremental Development Philosophy
- ADR-009 - Flyway for Database Migrations
- ADR-014 - Google SSO and Spring Security
- ADR-018 - CI/CD and Quality Gates

## References

- Technical BRD Sections 45-47 and 84-86
- Planning EPIC-00 and all feature release gates
