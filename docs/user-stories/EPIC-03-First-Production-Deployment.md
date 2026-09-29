# EPIC-03: First Production Deployment

**Backlog ID:** EPIC-03  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-00, EPIC-01, EPIC-02

**Roadmap stage:** Stage 3 - First Production Deployment  
**Outcome:** The minimal blog vertical slice is deployed over the real domain with HTTPS, managed PostgreSQL, logs, health checks, and a rollback path.  
**Dependencies:** EPIC-00, EPIC-01, EPIC-02  
**Enables:** EPIC-04 and production confidence for all later increments

## Epic Goal

Validate hosting, configuration, deployment, and operational assumptions early using a deliberately small but real application.

## Features

| ID | Feature | Result / completion evidence | Related user stories |
|---|---|---|---|
| F03.1 | Production frontend hosting | Frontend artifact is deployed and serves the application. | US-03.1 |
| F03.2 | Production backend hosting | Backend image runs with externalized production configuration and a health probe. | US-03.1 |
| F03.3 | Managed database | Managed PostgreSQL connection, limits, backups, migration, and restore procedure are verified. | US-03.2 |
| F03.4 | Domain and HTTPS | Approved frontend/API hostnames resolve over HTTPS through Cloudflare. | US-03.1 |
| F03.5 | Release and rollback | Immutable release artifacts and tested rollback/migration instructions exist. | US-03.1, US-03.2 |
| F03.6 | Basic monitoring | Deployment health and failures can be checked through provider logs and health endpoints. | US-03.1, US-03.2 |

Every feature issue has parent `EPIC-03`; user-story parent IDs are stated below.

## User Stories

### US-03.1: Deploy the Frontend and API

**Backlog ID:** US-03.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F03.1  
**Related feature IDs:** F03.2, F03.4, F03.5, F03.6  
**Depends on:** EPIC-00, EPIC-01, EPIC-02

#### Description

As a release owner, I want the frontend and API deployed through repeatable, secured automation so that the minimal blog application is reachable at the approved domain over HTTPS.

#### Action Items

- Provision hosting and connect immutable build artifacts to automated deployment.
- Configure domain, TLS, CORS, runtime settings, and provider-managed secrets.
- Verify deployment with an observable health/smoke check.

#### Tasks

- [ ] Configure frontend production API base URL and Cloudflare Pages deployment.
- [ ] Build and publish the backend image in CI and deploy it to the selected managed host.
- [ ] Configure runtime profile, health probe, resource bounds, CORS allowlist, and HTTPS.
- [ ] Store production credentials in the hosting provider's secret manager.
- [ ] Add post-deploy smoke checks and link evidence to the release issue.

#### Implementation Steps

1. Configure production frontend API base URL.
2. Build and publish backend Docker image from CI.
3. Configure managed hosting, runtime profile, resource limits, and health probe.
4. Configure Cloudflare Pages, DNS, TLS, and API origin.
5. Store all production secrets in the hosting provider, not Git.

#### Acceptance Criteria
- Frontend loads through the production domain over HTTPS.
- API is reachable only through the intended host/origin policy.
- Backend starts from the image with production environment variables.
- CORS allows only approved frontend origins.
- Health probes do not expose sensitive details.

#### Test Scenarios
- Production smoke test opens home, list, detail, and draft flow as configured.
- HTTP requests redirect or fail according to the documented HTTPS policy.
- Unknown origin is rejected by CORS.
- Missing required secret prevents unsafe startup.

### US-03.2: Run Migrations and Verify Recovery

**Backlog ID:** US-03.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F03.3  
**Related feature IDs:** F03.5, F03.6  
**Depends on:** US-03.1

#### Description

As an operator, I want controlled migrations and a verified database recovery path so that a failed release does not create unrecoverable data risk.

#### Action Items

- Make schema migration an explicit, observable release operation.
- Verify provider backup/restore capabilities and test recovery outside production.
- Document connection limits and rollback behavior for schema changes.

#### Tasks

- [ ] Configure release-time Flyway migration and make migration failure block rollout.
- [ ] Confirm SSL, Hikari bounds, provider connection limits, backup schedule, and retention.
- [ ] Write migration compatibility, rollback, restore, and smoke-test procedures.
- [ ] Perform a non-production restore and verify the restored application with smoke tests.

#### Implementation Steps

1. Configure Flyway migration execution as an explicit release step.
2. Verify managed PostgreSQL backups and restore capability.
3. Document migration compatibility and rollback procedure.
4. Configure Hikari pool bounds for the hosting plan.
5. Add release smoke tests after migration.

#### Acceptance Criteria
- Empty production-like database reaches the expected schema.
- Failed migration blocks the release and is visible in logs.
- Backup and restore procedure is documented and tested in a non-production environment.
- Connection limits are within the managed database plan.

#### Test Scenarios
- New migration runs once and is recorded.
- Re-deploy does not reapply an already completed migration.
- Deliberately invalid migration blocks deployment without starting an incompatible app.
- Restored database passes application health and smoke tests.

## Release Gate

- [ ] Real domain and HTTPS verified.
- [ ] Production smoke journey passes.
- [ ] CI build and deployment logs are accessible.
- [ ] Backups and recovery procedure verified.
- [ ] Rollback owner and decision procedure documented.
- [ ] No critical security or availability findings remain.
