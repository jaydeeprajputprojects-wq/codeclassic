# EPIC-08: Admin Jobs Management

**Backlog ID:** EPIC-08  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-07

**Roadmap stage:** Stage 6 parallel - Admin Jobs  
**Outcome:** Super Admin has a complete operational interface for accurate, timely job publishing and lifecycle management.  
**Dependencies:** EPIC-07  
**Enables:** Reliable curated job operations

## Epic Goal

Provide the administrative controls needed to keep the user-facing Jobs catalog trustworthy without direct database intervention.

## Features

| ID | Feature | Result / completion evidence | Related user stories |
|---|---|---|---|
| F08.1 | Admin job list | Super Admin can filter listings by their lifecycle status. | US-08.1, US-08.2 |
| F08.2 | Job editor | Admin can create and edit persisted job details. | US-08.1 |
| F08.3 | Publish validation | Missing/invalid fields are explained by both API and UI. | US-08.1 |
| F08.4 | Lifecycle actions | Valid status changes are confirmed and enforced server-side. | US-08.2 |
| F08.5 | Operational feedback | Admin sees current status and clear mutation success/failure. | US-08.2 |

Every feature issue has parent `EPIC-08`; each story names one primary feature parent and may reference related feature IDs.

## User Stories

### US-08.1: Create and Publish a Job

**Backlog ID:** US-08.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F08.2  
**Related feature IDs:** F08.1, F08.3  
**Depends on:** EPIC-07

#### Description

As a Super Admin, I want to create and publish a validated job so that users see complete and accurate listings.

#### Action Items

- Provide an admin editor for draft and publish actions.
- Explain and enforce required fields at both UI and API boundaries.

#### Tasks

- [ ] Add protected create/edit form and controlled skill entry.
- [ ] Support draft persistence separately from publication requirements.
- [ ] Validate required fields and external URL in the server and map errors to the UI.
- [ ] Show a preview of the persisted job card before publication.
- [ ] Add API/component tests for incomplete draft, invalid publication, and successful publication.

#### Implementation Steps

1. Build admin-only route and form schema.
2. Add controlled skill entry using approved tags/values.
3. Add company logo validation/storage where enabled.
4. Validate required fields client-side and server-side.
5. Show preview/card representation before publication.

#### Acceptance Criteria
- Admin can save an incomplete job as draft when policy permits.
- Publish action explains every missing required field.
- Published card matches stored data.
- Normal user cannot load or submit the admin form successfully.

#### Test Scenarios
- Missing company/title/skills/experience prevents publication.
- Invalid external URL prevents publication.
- Valid complete job publishes and appears to authenticated users.
- Admin refresh preserves saved data.

### US-08.2: Maintain Job Status

**Backlog ID:** US-08.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F08.4  
**Related feature IDs:** F08.1, F08.5  
**Depends on:** US-08.1, EPIC-07

#### Description

As a Super Admin, I want to unpublish, close, or remove stale jobs so that users see current opportunities and admins see reliable status feedback.

#### Action Items

- Provide status-appropriate admin actions and confirmations.
- Enforce transitions on the server and refresh user/admin views after success.

#### Tasks

- [ ] Add status controls and confirmation for destructive operations.
- [ ] Implement server-side transition validation and documented delete/retention behavior.
- [ ] Refresh list/detail state after successful mutations and preserve error feedback.
- [ ] Add transition, stale-link, retry, and cache-state tests.

#### Implementation Steps

1. Add status action controls with confirmation.
2. Implement server-side transition validation.
3. Update list/detail caches after mutation.
4. Ensure prior shared links apply current status rules.

#### Acceptance Criteria
- Status action is available only when valid for current status.
- User catalog updates without stale active entries after mutation.
- Closed/unpublished records remain manageable by admin.
- Delete requires confirmation and follows retention policy.

#### Test Scenarios
- Published -> Unpublished removes catalog visibility.
- Published -> Closed removes active visibility.
- Invalid action returns 409 and leaves status unchanged.
- Cache invalidation removes stale card/detail data.

## Release Gate

- [ ] Admin CRUD and status actions are complete.
- [ ] All job business rules are duplicated in API integration tests, not only UI tests.
- [ ] Admin error states explain corrective action.
- [ ] User catalog reflects administrative changes.
