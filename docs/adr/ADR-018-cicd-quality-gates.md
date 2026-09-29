# ADR-018 - CI/CD and Quality Gates

## Status

Accepted

## Date

2026-09-23

## Decision Summary

GitHub Actions will automate build, tests, migrations/integration checks, static analysis, dependency/security scanning, packaging, Docker image creation, and deployment gates.

## Context

The Technical BRD requires GitHub, GitHub Actions, Maven, Docker, Sonar/SonarCloud, Dependabot, secret scanning, and automated tests. Incremental production delivery needs repeatable evidence for each change.

## Problem Statement

Manual builds and deployments make it easy for broken code, unsafe dependencies, secret leaks, or incompatible migrations to reach production.

## Decision Drivers

- Repeatability
- Fast feedback
- Security
- Traceable releases
- Production readiness
- Developer learning

## Options Considered

### GitHub Actions Quality Pipeline

Runs checks close to the repository and supports backend/frontend workflows. It requires workflow maintenance and secret configuration.

### Manual Release Process

Simple initially but inconsistent and difficult to audit.

### Larger External CI Platform

May provide features but adds another selected tool and is not required by the project documents.

## Decision

Use GitHub Actions for pull-request and release workflows. Backend checks include compile, unit/integration tests, analysis, dependency checks, package, and Docker build. Frontend checks include install, test, build, and deployment readiness. Required checks block releases when they fail.

## Why This Decision Was Made

The tool is explicitly selected and supports the project philosophy of deploying small increments with evidence. Docker makes the backend artifact reproducible; Cloudflare Pages handles the frontend deployment path.

## Implementation Impact

- Workflows are versioned with the repository.
- Secrets are stored in GitHub/hosting secret mechanisms, not YAML.
- CI uses clean environments and test databases.
- Artifacts and image tags identify release commits.
- Migration and smoke-test steps are explicit.

## Architecture Flow

```text
Git Push -> GitHub Actions -> Build -> Test -> Quality/Security -> Package -> Docker/Pages -> Deploy Gate
```

## Cost Considerations

Current GitHub Actions, Sonar/SonarCloud, registry, and hosting limits/pricing must be verified before budgeting. Operational cost is workflow maintenance and failure triage. Development cost is pipeline setup. Future cost grows with build minutes, browser tests, artifact retention, and deployment frequency.

## Learning Value

- **Beginner:** learns that a commit can be built and tested automatically.
- **Developer:** learns pipeline stages, artifacts, secrets, and quality gates.
- **Production:** learns release traceability, failed deployments, and rollback evidence.

## Security Impact

Use least-privilege workflow permissions, secret scanning, dependency scanning, protected environments, and no secret printing. A green pipeline is evidence, not proof that all security risk is gone.

## Performance and Scalability

Parallelize independent frontend/backend checks where useful, cache dependencies carefully, and keep E2E suites focused. Do not add a larger CI platform without measured limits.

## Consequences

### Positive Consequences

- Repeatable quality checks
- Faster feedback
- Auditable releases
- Strong learning workflow

### Negative Consequences

- Pipeline failures can block delivery
- CI configuration becomes code to maintain
- Build minutes and hosted runner limits exist

### Trade-offs

The project accepts pipeline maintenance and occasional false failures for safer releases.

## Future Evolution

Add staged environments, approvals, security gates, deployment previews, or progressive delivery when team and release requirements justify them.

## Revisit Conditions

Revisit if build duration, runner limits, compliance, deployment frequency, or provider capabilities create a measured constraint.

## Related ADRs

- ADR-001 - Incremental Development Philosophy
- ADR-009 - Flyway for Database Migrations
- ADR-013 - Managed Hosting for Spring Boot
- ADR-017 - Testing Strategy

## References

- Technical BRD Sections 45, 48-52, 73
- Planning EPIC-00 and EPIC-03
