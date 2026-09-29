# EPIC-02: Minimal Blog Frontend

**Backlog ID:** EPIC-02  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-01

**Roadmap stage:** Stage 2 - Minimal Blog Frontend  
**Outcome:** A responsive React experience for browsing, viewing, creating, and editing blogs through real APIs.  
**Dependencies:** EPIC-01  
**Enables:** EPIC-03, EPIC-05

## Epic Goal

Prove the complete browser-to-database vertical slice with usable loading, validation, and failure states.

## Features

| ID | Feature | Result / completion evidence | Related user stories |
|---|---|---|---|
| F02.1 | Application shell | Navigation and routes load without blocking blog workflows. | US-02.1 |
| F02.2 | Blog list/detail | Real paginated API results and blog detail render at stable routes. | US-02.1 |
| F02.3 | Blog editor | Draft create/edit flows submit validated data to the backend. | US-02.2 |
| F02.4 | Query and form state | Server updates and form validation behave consistently with chosen project libraries. | US-02.1, US-02.2 |
| F02.5 | UX resilience | Loading, empty, validation, unauthorized, not-found, and server-error states are test-covered. | US-02.1, US-02.2 |

Every feature issue has parent `EPIC-02`; user-story parent IDs are stated below.

## User Stories

### US-02.1: Browse Blogs

**Backlog ID:** US-02.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F02.2  
**Related feature IDs:** F02.1, F02.4, F02.5  
**Depends on:** EPIC-01

#### Description

As a visitor, I want to browse paginated blogs and open a detail page so that I can read technical content using the real backend.

#### Action Items

- Connect list/detail routes to typed API queries.
- Present pagination and explicit loading, empty, error, and not-found states.

#### Tasks

- [ ] Add home, blog list, and identifier-based detail routes within the existing frontend structure.
- [ ] Add typed list/detail API functions and query state using the project's selected libraries.
- [ ] Render the required blog fields and bounded pagination controls.
- [ ] Add component tests for success, empty, not-found, and failed requests.

#### Implementation Steps

1. Add routes for home, blogs, and blog detail.
2. Create typed API client and query hooks.
3. Render paginated blog cards/list rows and detail content.
4. Add empty, loading, error, and not-found states.
5. Keep route identifiers stable and ready for share URLs.

#### Acceptance Criteria
- Blog list uses the backend API, not mock data.
- Pagination controls preserve the selected page.
- Detail route shows title, author, category, tags, content, and timestamps.
- Draft/unauthorized responses do not render protected content.
- Layout works at mobile and desktop widths.

#### Test Scenarios
- Successful list and detail render.
- Empty result renders an intentional empty state.
- 404 renders a not-found state.
- API timeout/server error renders a retryable error state.
- Pagination does not duplicate or lose items.

### US-02.2: Create and Edit a Draft

**Backlog ID:** US-02.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F02.3  
**Related feature IDs:** F02.4, F02.5  
**Depends on:** US-02.1

#### Description

As a user, I want to create and edit a validated blog draft so that saved content follows the same rules as the backend.

#### Action Items

- Provide create/edit forms that load and submit persisted blog data.
- Keep client validation aligned with server validation and preserve input on recoverable errors.

#### Tasks

- [ ] Implement create/edit routes and form validation for title, content, category, and tags.
- [ ] Load existing draft values and submit changes through the API.
- [ ] Show field-level server errors, pending state, and a recoverable network error.
- [ ] Add component tests for invalid input, successful save, server rejection, and retry.

#### Implementation Steps

1. Build create/edit routes and form schema.
2. Load category/tag options from the API or controlled configuration.
3. Submit through mutations and invalidate relevant queries.
4. Show field errors and preserve entered values after recoverable failures.
5. Navigate to detail or editor state after success.

#### Acceptance Criteria
- Title/content, category, and 1-3 tags are validated before submission.
- Server validation errors are mapped to the appropriate fields.
- Successful create returns the persisted identifier.
- Edit loads existing values and updates only through the API.
- Submit controls show pending state and prevent duplicate submissions.

#### Test Scenarios
- Client rejects missing title/content and invalid tag counts.
- Server rejects a forged category/tag and UI displays the error.
- Double-click does not create duplicate requests.
- Edit loads and saves an existing draft.
- Network failure preserves input and offers retry.

## Release Gate

- [ ] Real API powers list, detail, create, edit, and delete flows.
- [ ] Responsive behavior verified at supported viewport sizes.
- [ ] Component tests cover happy and failure states.
- [ ] Production frontend build succeeds.
- [ ] No authorization decision relies only on hidden UI controls.
