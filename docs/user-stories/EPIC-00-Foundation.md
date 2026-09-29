# EPIC-00: Engineering Foundation

**Backlog ID:** EPIC-00  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** None  
**Roadmap stage:** Stage 0 - Foundation  
**Epic outcome:** A new contributor can clone the repository, start PostgreSQL, run the Spring Boot API and React app, execute checks locally and in CI, and verify the baseline Cloudflare zone setup without relying on undocumented machine state.

## Description

As the engineering team, we need a reproducible development and delivery foundation so that every later epic can add one tested vertical slice to a working, production-shaped modular monolith.

## Scope

**Included:** repository conventions; Java/Spring Boot backend; React/TypeScript frontend; Docker Compose for PostgreSQL; Flyway; versioned API and sanitized errors; tests and CI; Docker image; baseline logs and Actuator health; Cloudflare account/zone ownership and setup documentation.

**Excluded:** product features, production application deployment and traffic cutover (EPIC-03), Google SSO (EPIC-04), and Redis, Kafka, Elasticsearch, Kubernetes, a dedicated gateway, or separately deployed services.

## Feature Issues

| Backlog ID | Feature issue | User-story children | Independently verifiable result |
|---|---|---|---|
| F00.1 | Repository and local development setup | US-00.1 | A clean checkout starts from documented commands. |
| F00.2 | Spring Boot modular monolith foundation | US-00.2 | Backend builds and module ownership rules are testable. |
| F00.3 | React frontend foundation | US-00.5 | Frontend builds, routes, and calls the backend health endpoint. |
| F00.4 | PostgreSQL and Flyway foundation | US-00.6 | Database starts locally and migrations apply reproducibly. |
| F00.5 | Versioned API and error contract | US-00.3, US-00.9 | Versioned health contract and standardized error responses are separately tested. |
| F00.6 | Quality and runtime operations baseline | US-00.4, US-00.8 | CI quality gates and runtime/container operations are separately verified. |
| F00.7 | Cloudflare account and zone foundation | US-00.7 | Zone ownership and configuration responsibilities are documented and verified. |

## Epic Acceptance Criteria

- Given a clean checkout with documented prerequisites, when a contributor follows the setup guide, then PostgreSQL, backend, and frontend start locally without undocumented steps.
- Given a running local stack, when the frontend calls the backend, then a real React -> Spring Boot -> PostgreSQL path succeeds.
- Given a pull request, when required checks run, then backend/frontend builds and tests report status and block merging on failure.
- Given an empty database, when the application starts, then Flyway creates the schema and can be rerun safely.
- Given an error or health response, then credentials, tokens, stack traces, and sensitive database details are not exposed.
- Given Cloudflare is configured, then account/zone ownership, access, DNS responsibilities, and future production cutover steps are documented; no provider secret is committed.
- No deferred infrastructure or unrelated product capability is introduced.

## Definition Of Done

- Every feature issue below is complete and linked as a child of this epic; every story is linked to its feature.
- Local setup is verified from a clean checkout or clean environment.
- Required CI checks pass, and release-gate evidence is recorded.
- Security-sensitive configuration is externalized and the repository contains no real secrets.
- Architecture and local setup documentation match the implemented structure.

## Feature F00.1: Repository and Local Development Setup

**Backlog ID:** F00.1  
**Issue type:** Feature (`type:feature`)  
**Parent:** EPIC-00  
**Depends on:** None  
**User-story children:** US-00.1

### Description

Establish the repository's working layout, prerequisites, environment template, and one documented local startup path. A contributor should be able to reproduce the same baseline without guessing which folders or commands are required.

### Feature Acceptance Criteria

- Required project directories and workflow location exist and have an evident purpose.
- README identifies supported prerequisites and exact start, test, stop, and troubleshooting commands.
- Environment example documents required variable names and safe example values only.
- Docker Compose starts PostgreSQL only; the initial stack does not add Redis or Kafka.
- Setup steps work from a clean checkout.

### User Story US-00.1: Run the Platform Locally

**Backlog ID:** US-00.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F00.1  
**Depends on:** None

#### Description

As a developer, I want a documented local setup so that I can run the platform consistently and verify the application end to end.

#### Action Items

- Establish repository layout and prerequisite documentation.
- Provide safe environment configuration and a reproducible PostgreSQL service.
- Document the commands to start and stop backend/frontend and run checks.

#### Tasks

- [ ] Confirm Java, Maven, Node.js/package manager, and Docker prerequisites against the selected project toolchain; document supported versions from actual project configuration.
- [ ] Keep `backend/`, `frontend/`, `infrastructure/`, `docs/`, and `.github/workflows/` responsibilities clear.
- [ ] Add or verify a PostgreSQL-only Compose service with persistent local data and a health check.
- [ ] Add `.env.example` or equivalent containing names and placeholders only; ensure local secret files are ignored by Git.
- [ ] Update the root README with copyable setup, run, test, stop, migration, and troubleshooting commands.
- [ ] Verify no credentials, tokens, private keys, or production configuration are present in tracked files.

#### Implementation Steps

1. Inspect existing repository files and preserve any valid user configuration.
2. Add only the missing folders/configuration required by the backend, frontend, and local PostgreSQL flow.
3. Configure local environment variables through the existing project convention; do not embed secrets in source or Compose defaults.
4. Start PostgreSQL, backend, and frontend using the documented commands.
5. Stop and restart the stack, then repeat the startup from a clean checkout or equivalent clean environment.

#### Acceptance Criteria

- Given a clean checkout and listed prerequisites, when the setup steps are followed, then PostgreSQL, backend, and frontend start successfully.
- Given the local frontend is running, when it requests the backend health/version endpoint, then a successful response is rendered or otherwise visibly confirmed.
- Given invalid database credentials, when the backend starts, then it fails clearly without printing the credential value.
- Given the stack is stopped and restarted, then persisted local data remains valid and migrations are not destructively rerun.
- Given repository contents are scanned, then no real secret is tracked.

#### Test Scenarios

- Complete setup using only the README on a clean environment.
- Use invalid database credentials and inspect startup output for secret leakage.
- Stop the backend and confirm the frontend shows a controlled connection error.
- Restart the stack and confirm PostgreSQL data and application startup remain healthy.

## Feature F00.2: Spring Boot Modular Monolith Foundation

**Backlog ID:** F00.2  
**Issue type:** Feature (`type:feature`)  
**Parent:** EPIC-00  
**Depends on:** F00.1  
**User-story children:** US-00.2

### Description

Create the runnable Java/Spring Boot backend using the selected Maven project conventions and domain-owned packages. It must provide a maintainable base without speculative services or unnecessary shared abstractions.

### Feature Acceptance Criteria

- Backend builds and starts with configuration supplied externally.
- Domain package ownership is documented and enforced by at least one architecture/package test.
- Controllers do not contain business rules or access another module's repositories.
- HTTP responses use API DTOs, not JPA entities.

### User Story US-00.2: Enforce Backend Module Ownership

**Backlog ID:** US-00.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F00.2  
**Depends on:** US-00.1

#### Description

As a maintainer, I want backend code organized around business-domain ownership so that a feature can evolve without a global, tightly coupled repository/service structure.

#### Action Items

- Establish the Spring Boot application and domain package conventions.
- Keep each module's persistence details inside its owning module.
- Protect only the module boundaries required by accepted ADRs.

#### Tasks

- [ ] Create or document the initial package structure for `identity`, `blog`, `comment`, `job`, `document`, `course`, `admin`, and `common` as needed by the Technical BRD.
- [ ] Keep each domain's entities and repositories private to that domain's package.
- [ ] Add a focused architecture test for forbidden cross-module repository dependencies.
- [ ] Add a minimal application test proving the Spring context starts with test configuration.
- [ ] Document how cross-module behavior is called; add an interface only when a real domain boundary requires it.

#### Implementation Steps

1. Confirm the actual root package and existing build conventions before creating files.
2. Establish the minimum Spring Boot app/configuration needed to start and expose health.
3. Add package ownership and the smallest architecture test that enforces the rule.
4. Run backend build and architecture tests; resolve any violations introduced by the foundation.

#### Acceptance Criteria

- Given the backend project, when the standard build is run, then it compiles and its application context starts.
- Given a module implementation, then its repositories and entities remain owned by that module.
- Given a controller or another module, then it cannot directly access a foreign module repository; the architecture test fails if this rule is violated.
- Given a new cross-module behavior, then code uses an existing public application boundary or a narrowly justified interface, not direct persistence access.
- No service, deployment, package layer, or generic utility is introduced solely for hypothetical future extraction.

#### Test Scenarios

- Run the backend build and Spring context test from a clean checkout.
- Add a deliberately forbidden repository dependency in a temporary test change and verify the architecture test catches it.
- Verify controller serialization uses response DTOs rather than JPA entities.

## Feature F00.3: React Frontend Foundation

**Backlog ID:** F00.3  
**Issue type:** Feature (`type:feature`)  
**Parent:** EPIC-00  
**Depends on:** F00.1  
**User-story children:** US-00.5

### Description

Create a runnable React and TypeScript application using the repository's selected frontend toolchain, with a minimal route, environment-based API base URL, and visible backend health state.

### Feature Acceptance Criteria

- Frontend development server and production build succeed using documented commands.
- API base URL is configured outside source code and has a safe local default where appropriate.
- A route calls the real backend health/version endpoint and renders success and failure states.
- Frontend does not contain secrets or placeholder business functionality.

### User Story US-00.5: Start and Verify the Frontend

**Backlog ID:** US-00.5  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F00.3  
**Depends on:** US-00.1, US-00.2, US-00.3

#### Description

As a developer, I want a small React application that can reach the local API so that future UI features can be built and tested against the real backend.

#### Action Items

- Initialize React/TypeScript with the existing project-selected build tooling.
- Add the minimum route and backend connection status needed to prove local integration.
- Keep application setup small; add routing/state libraries only when the implemented slice needs them.

#### Tasks

- [ ] Configure the frontend package scripts for development, build, and test.
- [ ] Add a typed health/version API call using environment-based API configuration.
- [ ] Add one minimal application route with loading, connected, and unavailable states.
- [ ] Add a focused component/API test for success and failed connection states.
- [ ] Document frontend commands and required environment variables.

#### Implementation Steps

1. Inspect the existing frontend directory and use its chosen package manager/configuration if present.
2. Add or complete the smallest React entry point and route required for a runnable application.
3. Connect to the backend endpoint without duplicating server-owned data or hardcoding production hosts.
4. Run the frontend test and production build; verify the connection state with the local backend.

#### Acceptance Criteria

- Given the backend is healthy, when the frontend route loads, then it displays a connected state based on a real API response.
- Given the backend is unavailable, when the route loads, then a controlled error state appears without an unhandled exception.
- Given a production build is requested, then it completes without embedding secrets.
- No future blog pages, mock APIs, or unnecessary application architecture are added in this foundation story.

#### Test Scenarios

- API success renders the connected state.
- API failure renders the unavailable state.
- Frontend test and production build pass from documented commands.

## Feature F00.4: PostgreSQL and Flyway Foundation

**Backlog ID:** F00.4  
**Issue type:** Feature (`type:feature`)  
**Parent:** EPIC-00  
**Depends on:** F00.1, F00.2  
**User-story children:** US-00.6

### Description

Provide a reproducible local PostgreSQL database and configure Flyway as the sole schema-change mechanism from an empty database onward.

### Feature Acceptance Criteria

- Local PostgreSQL starts through the documented Compose flow and reports healthy.
- Spring Boot connects through environment configuration, not hardcoded credentials.
- Flyway applies a baseline migration on an empty database and records migration history.
- Restarting the application does not apply completed migrations again or delete data.

### User Story US-00.6: Initialize Database Schema with Flyway

**Backlog ID:** US-00.6  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F00.4  
**Depends on:** US-00.1, US-00.2

#### Description

As a developer, I want database changes tracked as ordered Flyway migrations so that local, test, and production schemas can be created reproducibly.

#### Action Items

- Configure Spring Boot PostgreSQL connection through environment variables.
- Configure Flyway and establish the initial baseline migration.
- Verify empty-database startup and repeat startup behavior.

#### Tasks

- [ ] Declare PostgreSQL and Flyway through the existing backend dependency/build convention.
- [ ] Configure local connection properties from environment with no committed password.
- [ ] Add a minimal, project-appropriate initial migration and verify naming/location conventions.
- [ ] Add an integration test against PostgreSQL, using Testcontainers when available and required by the project.
- [ ] Document how to start PostgreSQL, apply migrations, and inspect migration status.

#### Implementation Steps

1. Confirm the supported PostgreSQL version and backend configuration conventions in project documents/configuration.
2. Configure the local database service and application datasource without introducing another database technology.
3. Add the initial migration and enable Flyway migration at application startup or the documented migration command.
4. Apply migrations to an empty database, restart the app, and verify migration history and existing data.

#### Acceptance Criteria

- Given a healthy empty local database, when the backend starts, then Flyway applies the initial migration successfully.
- Given a completed migration, when the backend restarts, then Flyway does not reapply it and existing data remains.
- Given invalid connection settings, then startup fails safely without exposing the password.
- Given a schema change, then it is represented by a new migration rather than an undocumented manual database edit.

#### Test Scenarios

- Start with an empty PostgreSQL volume and verify migration success.
- Restart backend and database and verify migration history is unchanged.
- Introduce a failing migration in an isolated test and verify startup/release reports the failure.
- Confirm datasource credentials are read from environment and not tracked source.

## Feature F00.5: Versioned API and Error Contract

**Backlog ID:** F00.5  
**Issue type:** Feature (`type:feature`)  
**Parent:** EPIC-00  
**Depends on:** F00.2  
**User-story children:** US-00.3

### Description

Establish the minimum `/api/v1` contract, health/version endpoint, validation behavior, and sanitized error response required by the frontend to call the backend predictably.

### Feature Acceptance Criteria

- API routes use `/api/v1` for versioned application endpoints.
- Health/version endpoint can be called locally and does not disclose secrets.
- Validation and representative not-found, conflict, unauthorized/forbidden, and unexpected errors have stable, tested responses.
- OpenAPI describes the baseline endpoint and response contract.

### User Story US-00.3: Expose a Versioned Health Contract

**Backlog ID:** US-00.3  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F00.5  
**Depends on:** US-00.2, US-00.6

#### Description

As an API consumer, I want a versioned health endpoint with a stable response so that local and hosted environments can verify the backend without depending on implementation details.

#### Action Items

- Establish `/api/v1` routing and a minimal health/version response.
- Define the route and response shape for the baseline health/version endpoint.
- Document the endpoint contract with OpenAPI.

#### Tasks

- [ ] Add the versioned API route convention and health/version endpoint.
- [ ] Define the versioned route convention and the minimal health/version response fields.
- [ ] Document the baseline endpoint and representative errors in OpenAPI.

#### Implementation Steps

1. Reuse existing response/error conventions if present; do not create duplicate response wrappers.
2. Implement the health/version route under the versioned API convention.
3. Add endpoint tests for response status, shape, and secret redaction.
4. Generate or validate OpenAPI against the actual response.

#### Acceptance Criteria

- Given a valid health request, when `/api/v1` health/version is called, then a stable successful response is returned.
- Given a health request, when `/api/v1` health/version is called, then the documented stable response is returned without credentials or internal connection details.
- Given an API response, then no JPA entity is serialized directly.

#### Test Scenarios

- A healthy application returns the documented health response.
- A database outage is represented according to the documented safe health policy.
- OpenAPI includes the versioned health endpoint and response.

### User Story US-00.9: Return Standardized Sanitized API Errors

**Backlog ID:** US-00.9  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F00.5  
**Depends on:** US-00.2, US-00.6, US-00.3

#### Description

As a frontend/API consumer, I want predictable validation and failure responses so that clients can handle errors without receiving server internals.

#### Action Items

- Define the shared error fields/codes needed by current APIs.
- Map expected and unexpected failures to stable, sanitized HTTP responses.

#### Tasks

- [ ] Define response fields and stable codes for validation, not found, conflict, unauthorized, forbidden, and unexpected errors.
- [ ] Add centralized exception handling consistent with the existing Spring Boot conventions.
- [ ] Document error response shapes in OpenAPI.
- [ ] Add API tests proving status, field errors, stable codes, and redaction.

#### Implementation Steps

1. Reuse existing project error conventions if present; do not add a second response wrapper.
2. Implement mappings for the current API error cases and exclude stack traces/internal details from responses.
3. Test invalid input, missing resource, conflict, authorization failure, and unexpected failure.
4. Verify OpenAPI reflects actual response bodies.

#### Acceptance Criteria

- Given invalid JSON or fields, then the documented client error status and useful field information are returned without a stack trace.
- Given a missing resource or domain conflict, then 404 or 409 and a stable error code are returned.
- Given an unexpected exception, then the client receives a sanitized 500 and internal details remain server-side.
- OpenAPI documents the common error contract.

#### Test Scenarios

- Invalid JSON returns the documented 400 response.
- Invalid fields return the documented validation status and field errors.
- Missing resource returns 404; a domain conflict returns 409.
- An intentionally thrown unexpected exception returns sanitized 500.

## Feature F00.6: Quality and Runtime Operations Baseline

**Backlog ID:** F00.6  
**Issue type:** Feature (`type:feature`)  
**Parent:** EPIC-00  
**Depends on:** F00.2, F00.3, F00.4, F00.5  
**User-story children:** US-00.4

### Description

Make backend/frontend builds and tests repeatable in CI and provide safe baseline container, health, and logging behavior for local and future hosted execution.

### Feature Acceptance Criteria

- CI runs on pull requests and fails on a failed build or required test.
- Backend unit/integration test and frontend test/build commands are documented and run in CI.
- Backend container image builds without bundling PostgreSQL.
- Application health/readiness behavior is available without exposing sensitive dependency details.
- Logs are structured/useful and exclude secrets and sensitive user data.

### User Story US-00.4: Run Required Quality Checks

**Backlog ID:** US-00.4  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F00.6  
**Depends on:** US-00.2, US-00.3, US-00.5, US-00.6

#### Description

As a delivery team, I want the required project checks to run locally and on every pull request so that broken changes are caught before integration.

#### Action Items

- Define a small, fast required check set for both applications.
- Configure a pull-request workflow that reports failures and blocks merge through repository settings.
- Add the baseline container, health, and safe logging configuration required by the Technical BRD.

#### Tasks

- [ ] Configure backend unit and integration test commands using the selected Java test stack.
- [ ] Configure frontend test and production build commands using the selected React test stack.
- [ ] Add GitHub Actions jobs for backend build/tests and frontend tests/build; add static/dependency scanning only where selected and runnable.
- [ ] Document local check commands and expected CI results.
- [ ] Document required branch protection settings without claiming repository settings were changed unless verified.

#### Implementation Steps

1. Identify and document the exact test/build commands already supported by each application.
2. Run those commands locally and correct only foundation-level failures.
3. Add CI workflows using the same commands and make failure status visible on pull requests.
4. Confirm the pull request workflow reports each required check and fails when a required command fails.

#### Acceptance Criteria

- Given a clean pull request, when required CI runs, then backend and frontend build/test checks complete and publish a status.
- Given a failing test, when CI runs, then the workflow fails visibly.
- Given a check fails locally, then the README provides the command needed to reproduce it.

#### Test Scenarios

- Run all CI commands on a clean checkout.
- Verify a deliberately failing test causes the corresponding workflow to fail.
- Verify pull request check statuses are visible and required checks block successful completion when failing.

### User Story US-00.8: Package and Operate the Backend Safely

**Backlog ID:** US-00.8  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F00.6  
**Depends on:** US-00.2, US-00.4, US-00.6

#### Description

As an operator, I want a backend container with safe health and logging behavior so that the application can be run and diagnosed without bundling a database or exposing secrets.

#### Action Items

- Package the Spring Boot application as a deployable image with external runtime configuration.
- Provide safe health/readiness and structured logs for operational diagnosis.

#### Tasks

- [ ] Add a backend Dockerfile that packages the application only; keep PostgreSQL separate.
- [ ] Configure Actuator health/readiness endpoints with sensitive dependency details hidden.
- [ ] Configure structured logs and verify secrets and sensitive data are excluded.
- [ ] Document image build/run commands and runtime environment variables.

#### Implementation Steps

1. Follow the existing Java build and container conventions; avoid adding a second container platform.
2. Build and run the backend image with a separately running PostgreSQL service.
3. Exercise health/readiness with healthy and failed dependencies.
4. Inspect representative logs and document safe runtime configuration.

#### Acceptance Criteria

- Given the backend image, then it contains the application but not PostgreSQL and accepts runtime configuration externally.
- Given Actuator health output, then credentials and detailed internal connection information are hidden.
- Given production-like log output, then passwords, OAuth secrets, tokens, R2 keys, and sensitive document data are absent.
- Given database unavailability, then health/readiness behavior and logs are useful without disclosing secrets.

#### Test Scenarios

- Build and run the image while PostgreSQL runs as a separate service.
- Simulate a database outage and inspect health status and logs for safe output.
- Scan tracked files and test logs for known secret values/patterns.

## Feature F00.7: Cloudflare Account and Zone Foundation

**Backlog ID:** F00.7  
**Issue type:** Feature (`type:feature`)  
**Parent:** EPIC-00  
**Depends on:** None  
**User-story children:** US-00.7

### Description

Establish Cloudflare ownership and document the DNS/CDN foundation required by the selected architecture. Production frontend/API routing and cutover remain in EPIC-03.

### Feature Acceptance Criteria

- Project account/zone ownership and authorized maintainers are known.
- Domain verification/zone status and DNS ownership are recorded in deployment documentation.
- Access is granted using least privilege; credentials are stored outside source control.
- No production record is changed without an approved deployment plan.

### User Story US-00.7: Establish Cloudflare Ownership and Setup Records

**Backlog ID:** US-00.7  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F00.7  
**Depends on:** None

#### Description

As a project maintainer, I want Cloudflare account and domain ownership documented so that later production deployment can use the approved DNS/CDN provider without credential or ownership confusion.

#### Action Items

- Verify the project has an authorized Cloudflare account and domain/zone owner.
- Record DNS, TLS, and access responsibilities without recording secrets.
- Defer production traffic changes to the deployment epic.

#### Tasks

- [ ] Confirm domain ownership and Cloudflare zone state with an authorized maintainer.
- [ ] Record zone/account owner, required access role, and DNS change approval process in deployment documentation.
- [ ] Document planned frontend and API hostnames and mark them as planned until deployed.
- [ ] Store any API token or credential in the approved secret manager only; never add it to repository files or issue comments.
- [ ] Link or record verification evidence without exposing account identifiers or secrets unnecessarily.

#### Implementation Steps

1. Confirm who owns the domain and Cloudflare zone; do not create accounts using personal credentials on behalf of the project.
2. Verify the zone status and required access with an authorized maintainer.
3. Document responsibility and planned DNS names in the deployment docs.
4. Leave live production routing unchanged; plan and verify traffic cutover under EPIC-03.

#### Acceptance Criteria

- Given the project domain, then an authorized maintainer can identify the Cloudflare zone owner and current verification status.
- Given a future DNS change, then the responsible approver and verification method are documented.
- Given credentials are required, then they are kept in approved secret storage and absent from repository files/issues.
- Given EPIC-00 is complete, then production frontend/API routing has not been changed without the EPIC-03 deployment plan.

#### Test Scenarios

- Authorized maintainer verifies zone ownership/status and the documentation reflects the observed state.
- Repository secret scan finds no Cloudflare token or account secret.
- Confirm planned hostnames are documented as planned and no unverified live records were changed.

## Epic Release Gate

- [ ] A clean local setup demonstrates React -> Spring Boot -> PostgreSQL.
- [ ] Flyway creates schema from an empty database and is safe on restart.
- [ ] Backend module ownership has an automated test.
- [ ] Backend and frontend tests/builds execute in CI and failures are visible.
- [ ] Backend image builds without PostgreSQL bundled into it.
- [ ] API health/errors, logs, and Actuator output do not leak sensitive details.
- [ ] Cloudflare ownership/setup is documented; production cutover remains in EPIC-03.
- [ ] No unresolved critical build or security finding remains.
