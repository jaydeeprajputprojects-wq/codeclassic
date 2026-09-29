# EPIC-07: Curated Jobs

**Backlog ID:** EPIC-07  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-04, EPIC-06

**Roadmap stage:** Stage 6 - Jobs  
**Outcome:** Authenticated users can browse published jobs and open/share protected job details; Super Admin can manage the complete job lifecycle.  
**Dependencies:** EPIC-04, EPIC-06  
**Enables:** EPIC-08

## Epic Goal

Deliver the authenticated-only Jobs module with stable links, useful cards, and validated external application URLs.

## Features

| ID | Feature | Result / completion evidence | Related user stories |
|---|---|---|---|
| F07.1 | Job model | Job records and company/skill/status fields persist with stable identifiers. | US-07.1, US-07.2 |
| F07.2 | Authenticated browsing | Only authenticated users can retrieve published job lists and details. | US-07.1 |
| F07.3 | Admin lifecycle | Super Admin can manage jobs through valid server-side status transitions. | US-07.2 |
| F07.4 | Job validation | Required fields and safe HTTPS application URL are validated before publish. | US-07.2 |
| F07.5 | Stable sharing | Shared job URLs remain stable and recheck authentication/publication state. | US-07.3 |
| F07.6 | External application | Apply action opens the validated stored URL; Code Classic stores no application data. | US-07.3 |

Every feature issue has parent `EPIC-07`; each story names one primary feature parent and may reference related feature IDs where it crosses scope.

## User Stories

### US-07.1: Browse and View Published Jobs

**Backlog ID:** US-07.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F07.2  
**Related feature IDs:** F07.1  
**Depends on:** EPIC-04

#### Description

As an authenticated user, I want to browse curated published jobs and open their details so that I can discover opportunities without exposing the catalog publicly.

#### Action Items

- Provide bounded list/detail APIs and responsive browse/detail views.
- Enforce authentication and published status on every request.

#### Tasks

- [ ] Add job persistence and paginated authenticated list/detail API.
- [ ] Add Jobs navigation, cards, detail view, and unauthorized/empty/loading states.
- [ ] Add API and UI tests for anonymous, authenticated, unpublished, and empty cases.

#### Implementation Steps

1. Add job, skill, and company/logo metadata migrations.
2. Implement authenticated list/detail APIs with pagination.
3. Build Jobs navigation, cards, detail page, and access states.
4. Show company, title, skill tags, experience, status-appropriate actions.
5. Ensure public routes/API never return job details.

#### Acceptance Criteria
- Jobs navigation is absent/inactive for anonymous users.
- Anonymous list/detail/shared URL receives authentication required behavior.
- Authenticated users see published jobs only.
- Cards show company name/icon, title, skills, and experience.
- Draft, unpublished, and closed jobs are not listed as active jobs.

#### Test Scenarios
- Anonymous request to list/detail returns 401.
- Authenticated user sees published job.
- Authenticated user cannot infer protected job details from an error response.
- Non-published job is not returned.
- Pagination and empty state work.

### US-07.2: Manage the Job Lifecycle

**Backlog ID:** US-07.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F07.3  
**Related feature IDs:** F07.1, F07.4  
**Depends on:** EPIC-04

#### Description

As a Super Admin, I want to create and maintain job listings so that the authenticated catalog remains accurate and only complete valid jobs can be published.

#### Action Items

- Provide admin-only job mutations with validated status transitions.
- Enforce complete publication data and safe deletion/retention behavior.

#### Tasks

- [ ] Add admin CRUD endpoints and forms for job data.
- [ ] Implement and test draft, publish, unpublish, close, and delete rules.
- [ ] Validate required publication fields and HTTPS external URL in the backend.
- [ ] Add admin authorization and invalid-transition integration tests.

#### Implementation Steps

1. Add admin CRUD endpoints and forms.
2. Implement DRAFT -> PUBLISHED -> UNPUBLISHED/CLOSED transitions.
3. Require external URL before publication.
4. Restrict all mutation commands to SUPER_ADMIN.
5. Add safe delete behavior and related object cleanup.

#### Acceptance Criteria
- Only Super Admin can create/edit/delete or transition jobs.
- Published job requires title, company, skills, experience, and valid HTTPS URL.
- Invalid lifecycle transitions return 409.
- Unpublished/closed job cannot be opened through an active shared URL.

#### Test Scenarios
- Admin creates draft without URL.
- Publish without URL fails.
- HTTP/invalid URL fails according to policy.
- Normal user mutation returns 403.
- Close removes job from active list while preserving documented detail behavior.

### US-07.3: Share and Open an External Job

**Backlog ID:** US-07.3  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F07.5  
**Related feature IDs:** F07.6  
**Depends on:** US-07.1, EPIC-04

#### Description

As an authenticated user, I want to share a stable job link and open its external application page so that I can pursue an opportunity without Code Classic collecting application data.

#### Action Items

- Provide stable share links resolved through current access and publication checks.
- Open only the validated external URL stored with the published job.

#### Tasks

- [ ] Add canonical identifier-based job URLs and copy/native share behavior.
- [ ] Apply authentication and publication checks before returning job details.
- [ ] Validate redirect destination server-side and do not accept an arbitrary client target.
- [ ] Add tests for stable URLs, unauthorized access, status changes, and external navigation.

#### Implementation Steps

1. Generate canonical `/jobs/{id-or-slug}` URL.
2. Add copy link and native share fallback.
3. Resolve shared URL only after authentication and publication checks.
4. Validate/sanitize redirect target and use explicit external navigation.
5. Do not collect applications, resumes, or candidate data.

#### Acceptance Criteria
- Job identifier remains stable when title or external URL changes.
- Anonymous shared access leads to authentication, not job disclosure.
- Authenticated access shows details only for published jobs.
- External action opens the stored validated URL.
- No application data is stored by Code Classic.

#### Test Scenarios
- Title update does not break prior URL.
- Anonymous shared link does not leak title/company.
- Authenticated published link succeeds.
- Closed/unpublished link is blocked.
- Redirect cannot be changed through an untrusted request parameter.

## Release Gate

- [ ] Jobs API and UI are protected at endpoint and service levels.
- [ ] Admin lifecycle transition tests pass.
- [ ] URL validation and redirect security tests pass.
- [ ] Public anonymous access tests pass for list, detail, and shared URL.
- [ ] Job browser journey passes: login -> Jobs -> card -> detail -> share/external link.
