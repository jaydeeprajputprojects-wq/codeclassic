# Code Classic Architecture Decision Records

These ADRs document the architecture and technology decisions for Code Classic, a production-oriented technology learning and knowledge-sharing platform.

## Decision Catalogue

| ADR | Decision | Status |
|---|---|---|
| [ADR-001](ADR-001-incremental-development-philosophy.md) | Incremental Development Philosophy | Accepted |
| [ADR-002](ADR-002-modular-monolith.md) | Modular Monolith as Initial Architecture | Accepted |
| [ADR-003](ADR-003-microservice-ready-domain-boundaries.md) | Microservice-Ready Domain Boundaries | Accepted |
| [ADR-004](ADR-004-java-backend-language.md) | Java as Backend Language | Accepted |
| [ADR-005](ADR-005-spring-boot-backend-framework.md) | Spring Boot as Backend Framework | Accepted |
| [ADR-006](ADR-006-react-typescript-frontend.md) | React and TypeScript | Accepted |
| [ADR-007](ADR-007-postgresql-primary-database.md) | PostgreSQL as Primary Database | Accepted |
| [ADR-008](ADR-008-jpa-hibernate-persistence.md) | JPA/Hibernate as Persistence Technology | Accepted |
| [ADR-009](ADR-009-flyway-database-migrations.md) | Flyway for Database Migrations | Accepted |
| [ADR-010](ADR-010-cloudflare-r2-object-storage.md) | Cloudflare R2 for Object Storage | Accepted |
| [ADR-011](ADR-011-cloudflare-dns-cdn-edge.md) | Cloudflare for DNS, CDN, and Edge | Accepted |
| [ADR-012](ADR-012-cloudflare-pages-frontend-hosting.md) | Cloudflare Pages for Frontend Hosting | Accepted |
| [ADR-013](ADR-013-managed-spring-boot-hosting.md) | Managed Hosting for Spring Boot | Accepted |
| [ADR-014](ADR-014-google-sso-spring-security.md) | Google SSO and Spring Security | Accepted |
| [ADR-015](ADR-015-rest-api-versioning.md) | REST API and Versioning Strategy | Accepted |
| [ADR-016](ADR-016-observability-strategy.md) | Logging, Monitoring, and Observability | Accepted |
| [ADR-017](ADR-017-testing-strategy.md) | Testing Strategy | Accepted |
| [ADR-018](ADR-018-cicd-quality-gates.md) | CI/CD and Quality Gates | Accepted |
| [ADR-019](ADR-019-production-first-learning.md) | Production-First Learning Strategy | Accepted |
| [ADR-020](ADR-020-cost-conscious-architecture.md) | Cost-Conscious Architecture | Accepted |
| [ADR-021](ADR-021-technology-selection-learning-relevance.md) | Technology Selection for Learning and Career Relevance | Accepted |
| [ADR-022](ADR-022-redis-introduction.md) | Redis Introduction | Future / Trigger-Based |
| [ADR-023](ADR-023-kafka-event-driven-architecture.md) | Kafka and Event-Driven Architecture | Future / Trigger-Based |
| [ADR-024](ADR-024-api-gateway-service-communication.md) | API Gateway and Service Communication | Future / Trigger-Based |
| [ADR-025](ADR-025-database-decomposition.md) | Database Decomposition During Service Extraction | Future / Trigger-Based |

## Status Policy

- **Accepted:** selected for the current Code Classic direction.
- **Future / Trigger-Based:** intentionally not implemented now; requires evidence and a separate approval before adoption.

The ADRs follow the project principle:

```text
BUILD SMALL -> MAKE IT WORK -> DEPLOY IT -> MEASURE IT -> IMPROVE IT -> SCALE IT -> EXTRACT SERVICES WHEN JUSTIFIED
```

## Source Documents

- Business requirements: `docs/inital-docs/Code Classic - Business Requirements Document (BRD) v1.1.md`
- Technical requirements: `docs/inital-docs/Code_Classic_Technical_BRD_v1.0.md`
- Delivery backlog: `docs/Planning/README.md`
- ADR generation rules: `docs/content/Code Classic - ADR Documentation Generator Master Prompt.md`
