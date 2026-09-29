# EPIC-11: Production Hardening and Phase 1 Readiness

**Backlog ID:** EPIC-11  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-03 through EPIC-10

**Roadmap stage:** Production hardening after Stage 8  
**Outcome:** Code Classic is measurable, secure, recoverable, performant, and ready for a controlled Phase 1 release.  
**Dependencies:** EPIC-03 through EPIC-10  
**Enables:** Sustainable operation, measured scaling, and future service extraction

## Epic Goal

Close cross-cutting production risks without introducing premature Kubernetes, Kafka, Redis, Elasticsearch, or microservices.

## Features

| ID | Feature | Result / completion evidence | User-story children |
|---|---|---|---|
| F11.1 | Observability | Production requests, failures, and dependencies can be correlated and monitored. | US-11.1 |
| F11.2 | Performance | Representative workload meets agreed budgets without speculative infrastructure. | US-11.2 |
| F11.3 | Security controls | Authorization, validation, upload/embed/redirect, and abuse protections are tested. | US-11.3 |
| F11.4 | Reliability and recovery | Backup, restore, incident, and rollback procedures are exercised. | US-11.4 |
| F11.5 | Test completion | Required test layers pass and critical user journeys have evidence. | US-11.5 |
| F11.6 | Release governance | Production readiness has traceable acceptance and explicit residual-risk ownership. | US-11.7 |
| F11.7 | Security configuration and scanning | Secret, dependency, SAST, and container checks run with documented findings. | US-11.6 |

Every feature issue has parent `EPIC-11`; each story has one primary feature parent.

## User Stories

### US-11.1: Observe the Running Platform

**Backlog ID:** US-11.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F11.1  
**Depends on:** EPIC-03 through EPIC-10

#### Description

As an operator, I want actionable telemetry so that I can detect and diagnose production failures.

#### Action Items

- Correlate requests across responses, logs, and supported tracing.
- Expose actionable health, metrics, dashboards, and alerts without sensitive data.

#### Tasks

- [ ] Propagate request/trace identifiers and include them in safe response/log context.
- [ ] Configure structured logs and Micrometer/Actuator health and metrics.
- [ ] Add OpenTelemetry-compatible tracing only within the existing deployment architecture.
- [ ] Define dashboard and alert thresholds, owners, and response actions.
- [ ] Add tests for correlation, redaction, and dependency health behavior.

#### Implementation Steps

1. Add request ID/trace ID propagation and include it in responses/logs.
2. Emit structured JSON logs with module, endpoint, status, duration, and safe user context.
3. Configure Actuator health/readiness/liveness and Micrometer metrics.
4. Add OpenTelemetry-compatible tracing hooks without requiring distributed infrastructure.
5. Define dashboards/alerts for uptime, 5xx, latency, JVM, DB pool, auth failures, and R2 failures.

#### Acceptance Criteria
- Every production request can be correlated from API response to log entry.
- Logs exclude secrets, tokens, passwords, and sensitive document data.
- Health endpoints distinguish application readiness from dependency failure without disclosure.
- Alerts have an owner, threshold, and response action.

#### Test Scenarios
- Request ID is generated when absent and preserved when trusted safely.
- Error log contains correlation data but not request secrets.
- Database outage changes readiness/alert state appropriately.
- High 5xx/latency test signal is detected by configured monitoring.

### US-11.2: Meet Performance and Capacity Expectations

**Backlog ID:** US-11.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F11.2  
**Depends on:** EPIC-03 through EPIC-10

#### Description

As a product owner, I want representative 100-500 user workloads handled efficiently so that infrastructure remains simple and affordable.

#### Action Items

- Measure representative journeys before optimizing.
- Resolve evidenced query, pool, payload, and response-time problems within agreed budgets.

#### Tasks

- [ ] Establish representative test data and workload for critical user journeys.
- [ ] Measure query plans, latency, error rates, and connection use.
- [ ] Fix measured N+1/unbounded query or file/image efficiency issues and document indexes.
- [ ] Define and record baseline capacity and endpoint budgets.

#### Implementation Steps

1. Measure representative list/detail/create/comment/job/document/course journeys.
2. Review SQL plans and add/adjust indexes based on actual queries.
3. Eliminate N+1 queries and unnecessary entity serialization.
4. Validate pagination bounds, Hikari limits, file/image sizes, and CDN behavior.
5. Define response-time and error-rate budgets for critical endpoints.

#### Acceptance Criteria
- Large collections are paginated and cannot request unbounded results.
- Critical endpoints meet documented baseline targets under representative load.
- No known N+1 query remains in tested list/detail paths.
- Database connections remain within managed limits under expected concurrency.

#### Test Scenarios
- Load test blogs/jobs/comments with representative data volume.
- Query plan confirms indexes are used where expected.
- Concurrent likes/comments do not exhaust the pool.
- Large/slow R2 object does not block unrelated API requests indefinitely.

### US-11.3: Harden Authorization and Abuse Controls

**Backlog ID:** US-11.3  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F11.3  
**Depends on:** EPIC-04 through EPIC-10

#### Description

As a user and operator, I want sensitive operations protected against unauthorized access and common abuse so that content and platform integrity are preserved.

#### Action Items

- Review high-risk authorization, content, upload, embed, and redirect paths.
- Add rate limiting where measured or policy-required and verify safe failure behavior.

#### Tasks

- [ ] Review endpoint authorization and ownership using a role/ID test matrix.
- [ ] Verify upload, embed, content-rendering, external redirect, CORS, and header controls.
- [ ] Add targeted rate limits for authentication, comments, uploads, and admin actions as required.
- [ ] Add security regression tests and record accepted exceptions with an owner.

#### Implementation Steps

1. Complete OWASP-oriented API, authorization, input, file, and redirect review.
2. Add edge/application rate limiting for authentication, comments, uploads, and admin operations where required.
3. Review CORS, headers, TLS, cookie/token, error, and log behavior against the accepted security decisions.
4. Test unauthorized, malformed, oversized, spoofed, and unsafe inputs.

#### Acceptance Criteria
- Every protected endpoint has automated role/ownership tests.
- Uploads, embeds, external redirects, and HTML/content rendering are constrained.
- Rate limits fail safely and produce observable responses.
- Critical/high findings are fixed or explicitly accepted with owner and expiry.

#### Test Scenarios
- Authorization matrix fuzzes IDs and role claims.
- Malicious filenames, MIME spoofing, oversized payloads, and unsafe embeds are rejected.
- Repeated auth/comment/upload requests trigger documented throttling.
- Dependency scan detects a controlled vulnerable fixture and CI responds correctly.

### US-11.4: Recover from Failure

**Backlog ID:** US-11.4  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F11.4  
**Depends on:** EPIC-03 through EPIC-10

#### Description

As an operator, I want tested recovery procedures so that outages and failed releases have a known response.

#### Action Items

- Verify database/object-storage recovery assumptions and backup procedures.
- Exercise application and release rollback runbooks outside production.

#### Tasks

- [ ] Document database backup schedule, retention, restore, and access.
- [ ] Document R2 durability/object cleanup assumptions and deployment rollback rules.
- [ ] Create runbooks for application, database, authentication, storage, and release failures.
- [ ] Execute and record a non-production recovery/rollback drill.

#### Implementation Steps

1. Verify PostgreSQL backup schedule, retention, restore, and access.
2. Document R2 durability, object cleanup, and recovery assumptions.
3. Document rollback for frontend, backend image, and compatible migrations.
4. Create incident/runbook pages for app, DB, auth, R2, and deployment failures.
5. Run a non-production recovery drill and record results.

#### Acceptance Criteria
- A recent backup can be restored in a non-production environment.
- Operators can identify the last known good backend/frontend release.
- Rollback and forward-fix decision rules are documented for migrations.
- Recovery owners and escalation paths are named.

#### Test Scenarios
- Restore database and run smoke tests.
- Simulate backend crash and verify health alert/restart behavior.
- Simulate R2 outage and verify user-safe errors/no false metadata.
- Roll back a release artifact and verify the critical journey.

### US-11.5: Complete Required Test Coverage

**Backlog ID:** US-11.5  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F11.5  
**Depends on:** EPIC-03 through EPIC-10

#### Description

As a quality owner, I want the agreed test layers and critical user journeys to pass so that release readiness is supported by repeatable evidence.

#### Action Items

- Run the required unit, integration, frontend, contract, and critical end-to-end suites.
- Map critical journeys and security-negative paths to automated results.

#### Tasks

- [ ] Verify required backend and frontend tests for all delivered epics run in CI.
- [ ] Run critical E2E journeys in a production-like environment.
- [ ] Add or fix only test gaps tied to Phase 1 requirements and record residual gaps.

#### Implementation Steps

1. Verify backend/frontend definitions of done for each epic.
2. Run unit, integration, component, contract, and critical E2E suites.
3. Review failures, fix the owning behavior, and rerun the focused suite.
4. Record CI links and any remaining coverage gaps.

#### Acceptance Criteria
- Required CI is green for the candidate release commit.
- Critical E2E journeys cover authentication, public content, blog approval, likes/comments, documents, courses, and jobs.
- Known test gaps are documented with owner and next milestone.

#### Test Scenarios
- Full critical-path Playwright suite passes in a production-like environment.
- Fresh deployment from the release artifact passes smoke checks.
- Unauthorized variants of each critical path fail correctly.
- Migration, backup, restore, and rollback evidence is reviewed.

### US-11.6: Run Security Scans and Protect Configuration

**Backlog ID:** US-11.6  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F11.7  
**Depends on:** EPIC-04, EPIC-03

#### Description

As an operator, I want automated security scanning and safe credential management so that vulnerable dependencies and exposed secrets are found before release.

#### Action Items

- Run selected security scans in CI and make findings actionable.
- Ensure production configuration and credential rotation follow approved secret handling.

#### Tasks

- [ ] Configure dependency, secret, SAST, and container scans selected by project policy.
- [ ] Define which findings block release and how exceptions are recorded.
- [ ] Rotate credentials as required and document the safe rotation process.
- [ ] Verify local and production profiles do not commit or expose secrets.

#### Implementation Steps

1. Confirm the security tools and thresholds already selected by ADR/CI requirements.
2. Add or update scans to run on pull requests and release candidates.
3. Demonstrate a controlled finding is surfaced and causes the documented CI outcome.
4. Record accepted findings with owner, rationale, and expiry.

#### Acceptance Criteria

- Required scans run in CI and their outcome is visible.
- Critical/high findings are fixed or explicitly accepted with owner and expiry.
- Production secrets are absent from source, artifacts, browser bundles, logs, and issue bodies.
- Credential rotation instructions are documented and do not expose credentials.

#### Test Scenarios

- Use a controlled fixture to verify secret/dependency scan behavior.
- Verify CI outcome for a blocking and an accepted finding.
- Inspect built frontend artifact and representative logs for secrets.

### US-11.7: Approve Phase 1 Production Readiness

**Backlog ID:** US-11.7  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F11.6  
**Depends on:** US-11.1 through US-11.6

#### Description

As a release owner, I want every Phase 1 requirement mapped to evidence and residual risks explicitly accepted so that the release decision is auditable rather than intuitive.

#### Action Items

- Assemble requirements, production, security, operations, and test evidence.
- Record a go/no-go decision with named owners for all accepted risks.

#### Tasks

- [ ] Map Phase 1 BRD success criteria to test or operational evidence.
- [ ] Verify API/OpenAPI, architecture, deployment, backup, rollback, and runbook documentation.
- [ ] Confirm production configuration, domain, HTTPS, monitoring, and backup readiness.
- [ ] Record release decision, approver, residual risk, owner, and next milestone.

#### Implementation Steps

1. Review release gates for EPIC-03 through EPIC-10.
2. Collect links to CI, smoke, security, performance, recovery, and production evidence.
3. Resolve blockers or assign explicit risk acceptance to the authorized release owner.
4. Record the final go/no-go decision and open follow-up issues for accepted gaps.

#### Acceptance Criteria

- Every Phase 1 success criterion has a test or evidence link.
- Production smoke checks and required quality/security gates pass.
- Residual risks have an owner, rationale, and follow-up date/milestone.
- Release approval/rejection is recorded by an authorized owner.

#### Test Scenarios

- Review the checklist against a production-like candidate deployment.
- Confirm an unresolved blocking gate prevents approval.
- Confirm a documented accepted risk has an owner and tracked follow-up issue.

## Release Gate

- [ ] Observability dashboards and alerts are active.
- [ ] Performance baseline is measured and accepted.
- [ ] Security scans and authorization matrix pass.
- [ ] Backup restore and rollback drills are complete.
- [ ] Phase 1 BRD success criteria are mapped to evidence.
- [ ] Residual risks are explicitly accepted by the release owner.
