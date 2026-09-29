# Code Classic Planning Backlog

This backlog translates the BRD and Technical BRD into incremental, production-oriented delivery issues. Each epic is independently described in its own file. Issue hierarchy is **Epic -> Feature -> User Story**.

## GitHub Issue Publication Contract

Use the IDs in this backlog as stable external keys. Do not renumber an existing item after publication. An issue-publishing agent must create or update issues by stable ID, never create a duplicate when that ID already exists, and create parents before children.

| Backlog item | GitHub issue title | Issue type / label | Parent |
|---|---|---|---|
| Epic | `EPIC-00: Engineering Foundation` | `Epic` / `type:epic` | None |
| Feature | `F00.1: Repository and local development setup` | `Feature` / `type:feature` | The owning epic |
| User story | `US-00.1: Run the platform locally` | `User Story` / `type:user-story` | The owning feature |

Create the native GitHub parent/sub-issue relationship in addition to recording the parent ID in the issue body. Record dependencies separately; a dependency is not a parent. Apply project fields such as status, priority, and iteration only when the project defines their allowed values. Do not invent labels or project fields. If the repository or project does not support issue types, use the `type:*` labels above.

Every issue body must begin with `Backlog ID`, `Issue type`, `Parent`, and `Depends on`. User-story issues must also include `Related feature IDs` when one story contributes to features other than its parent. Related feature IDs are traceability only; create exactly one native GitHub parent relationship.

For an Epic issue, publish the epic outcome/description, goal, scope, feature IDs/titles/results, dependencies, and epic acceptance/release gate from the epic document. For a Feature issue, use its feature ID/title, parent epic, description/result, and feature-level completion evidence. Determine native user-story children only from each story's `Parent` field; tables marked `Related user stories` are traceability only. A feature's independently verifiable result is its acceptance target; do not invent additional scope. A feature may have multiple user-story children when separate requirements need separate implementation/test increments. For a small feature that is independently implementable as one issue, do not create an artificial user-story layer.

User-story issue bodies must include the following sections using these exact headings:

```markdown
**Backlog ID:** US-00.1
**Issue type:** User Story
**Parent:** F00.1
**Related feature IDs:** None
**Depends on:** None

## Description
<One user-visible or developer-visible outcome and why it matters.>

## Action Items
- <Capability-level work required.>

## Tasks
- [ ] <Concrete code, configuration, documentation, or test deliverable.>

## Implementation Steps
1. <Ordered action with a clear result.>

## Acceptance Criteria
- Given <starting state>, when <action>, then <observable result>.

## Test Scenarios
- <Specific positive, negative, or boundary check.>
```

Epic issues describe one complete, demonstrable end-to-end outcome, identify included and excluded scope, list feature children, and define an epic-level completion gate. A feature is a user-observable, independently testable capability. A feature may and often should be divided into multiple stories when its requirements contain distinct user outcomes, API/UI behaviors, permissions, or failure paths. Do not turn a feature into one oversized story merely to keep a one-to-one mapping. Each user story has exactly one native parent feature; use `Related feature IDs` for traceability across feature scope, but do not create multiple GitHub parents. A small feature may be implemented directly; otherwise split it into appropriately sized child stories. A user story represents one coherent, independently implementable and testable outcome and has enough tasks and ordered steps to be implemented without guessing. Split items that cannot be completed and verified as one increment. Avoid duplicating child issue bodies in parents; list child IDs and links instead.

The publisher must preserve the issue body content, IDs, and dependency order from these documents. It must not interpret implementation steps as permission to implement the backlog while publishing it.

## Delivery Order

| Order | Epic | Primary outcome | Depends on |
|---:|---|---|---|
| 00 | [Engineering Foundation](EPIC-00-Foundation.md) | Runnable modular monolith, database, CI, and operational baseline | - |
| 01 | [Minimal Blog Backend](EPIC-01-Minimal-Blog-Backend.md) | First tested business API | 00 |
| 02 | [Minimal Blog Frontend](EPIC-02-Minimal-Blog-Frontend.md) | Browser-to-database vertical slice | 01 |
| 03 | [First Production Deployment](EPIC-03-First-Production-Deployment.md) | Real domain, HTTPS, hosting, database, and rollback | 00-02 |
| 04 | [Authentication and Authorization](EPIC-04-Authentication-and-Authorization.md) | Google SSO and backend security boundary | 03 |
| 05 | [Complete Blog](EPIC-05-Complete-Blog.md) | Approval, images, likes, comments, and sharing | 01, 02, 04 |
| 06 | [Admin Blog Management](EPIC-06-Admin-Blog-Management.md) | Operational blog review and moderation | 04, 05 |
| 07 | [Curated Jobs](EPIC-07-Jobs.md) | Authenticated job discovery and protected sharing | 04, 06 |
| 08 | [Admin Jobs Management](EPIC-08-Admin-Jobs.md) | Complete job administration | 07 |
| 09 | [Courses and YouTube](EPIC-09-Courses-and-YouTube.md) | Structured learning library | 04, 03 |
| 10 | [Learning Documents](EPIC-10-Learning-Documents.md) | Secure R2-backed document viewing | 04, 03 |
| 11 | [Production Hardening](EPIC-11-Production-Hardening.md) | Measured, recoverable Phase 1 release | 03-10 |

## Working Rules

1. Deliver epics as vertical increments; do not start infrastructure that the current slice does not need.
2. Treat the backend as the security boundary even when the frontend hides controls.
3. Add the migration, API, UI, tests, documentation, and operational evidence for a feature in the same increment.
4. Keep PostgreSQL, R2, and module ownership explicit so future service extraction does not require a rewrite.
5. Do not add Redis, Kafka, Elasticsearch, Kubernetes, or a dedicated gateway until measured requirements justify them.
6. A release gate must pass before dependent epics are considered production-ready.
7. Use the hierarchy Epic -> Feature -> User Story for GitHub parent-child relationships; keep dependencies as separate links.
8. A feature must result in a visible behavior, working developer capability, or verified operational control that can be tested on its own.

## Common Definition Of Done

- Business rule implemented in the owning module.
- Database migration and constraints added where needed.
- API validation, authorization, and sanitized errors implemented.
- UI loading, empty, error, and unauthorized states implemented where applicable.
- Unit and integration tests added; critical journeys have E2E coverage.
- Logging/metrics added without sensitive data.
- OpenAPI and relevant architecture/deployment documentation updated.
- CI passes and residual risks are recorded.
