# ADR-013 - Managed Hosting for Spring Boot

## Status

Accepted

## Date

2026-09-23

## Decision Summary

The initial Spring Boot backend will run on managed application/container hosting rather than self-managed Kubernetes or a custom platform.

## Context

The Technical BRD targets 100-500 initial users and recommends managed hosting, managed PostgreSQL, Cloudflare Pages, R2, Docker, and no Kubernetes initially. The backend needs a real production runtime, health checks, secrets, logs, and deployment support.

## Problem Statement

Code Classic needs production backend hosting that teaches deployment and operations without requiring the team to operate a cluster before traffic and service boundaries justify it.

## Decision Drivers

- Initial scale
- Operational simplicity
- Docker support
- Health and log integration
- Deployment speed
- Cost and learning value

## Options Considered

### Managed Application/Container Hosting

Runs the Dockerized Spring Boot application with provider-managed runtime concerns. Provider capabilities, limits, and current pricing must be verified.

### Self-Managed Virtual Machine

Provides control but transfers patching, process management, TLS/origin, monitoring, and recovery work to the project.

### Kubernetes

Supports complex scaling and service operations but is explicitly premature for the initial workload and modular monolith.

## Decision

Deploy one Dockerized Spring Boot application to managed application/container hosting, with managed PostgreSQL and R2. PostgreSQL is not packaged in the backend container.

## Why This Decision Was Made

This preserves a real production deployment while minimizing infrastructure management. It aligns directly with the Technical BRD's hosting architecture and allows the team to learn Docker, configuration, health checks, logs, and release behavior before distributed operations.

## Implementation Impact

- Build a reproducible Docker image.
- Configure production profile through secrets/environment variables.
- Configure liveness/readiness and resource limits.
- Run Flyway migrations through controlled release steps.
- Capture logs and metrics through the provider/selected tools.
- Document rollback and backup recovery.

## Architecture Flow

```text
GitHub Actions -> Docker Image -> Managed Backend Hosting -> PostgreSQL/R2/Google APIs
```

## Cost Considerations

Current hosting and resource pricing must be verified with the chosen provider. Operational cost is lower than self-managed infrastructure but includes provider limits and configuration. Development cost is Docker and production configuration work. Future cost grows with instances, traffic, and availability requirements.

## Learning Value

- **Beginner:** learns the difference between a container image and a database service.
- **Developer:** learns environment configuration, health endpoints, and release artifacts.
- **Production:** learns that hosting includes capacity, logs, failure recovery, and rollback.

## Security Impact

Secrets belong in the hosting secret store. The container runs without database credentials in the image. Network access, CORS, HTTPS, Actuator exposure, and least privilege must be configured explicitly.

## Performance and Scalability

Start with one instance and measure. Increase resources or add instances before introducing caching or service extraction. Database pool limits must match the managed database capacity.

## Consequences

### Positive Consequences

- Low operations burden
- Real deployment experience
- Docker artifact consistency
- Easy initial architecture

### Negative Consequences

- Provider-specific limitations
- Less control than self-managed infrastructure
- Single backend deployment initially

### Trade-offs

The project accepts provider dependence and limited initial control for speed, lower cost, and reduced operational complexity.

## Future Evolution

Scale the backend, add load balancing, or extract a module only after measurement. Kubernetes remains a future possibility, not an initial requirement.

## Revisit Conditions

Revisit when instance scaling, availability, deployment isolation, compliance, provider limitations, or service extraction creates a clear requirement.

## Related ADRs

- ADR-002 - Modular Monolith as Initial Architecture
- ADR-011 - Cloudflare for DNS, CDN, and Edge
- ADR-018 - CI/CD and Quality Gates
- ADR-020 - Cost-Conscious Architecture

## References

- Technical BRD Sections 6, 49, 54-55, 73-75
