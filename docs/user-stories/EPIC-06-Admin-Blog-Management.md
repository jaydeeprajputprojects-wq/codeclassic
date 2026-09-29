# EPIC-06: Admin Blog Management

**Backlog ID:** EPIC-06  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-04, EPIC-05

**Roadmap stage:** Stage 5 parallel - Admin Blog  
**Outcome:** Super Admin has operational tools to review, approve, reject, publish, edit, and moderate blog content.  
**Dependencies:** EPIC-04, EPIC-05  
**Enables:** Managed content operations and later admin domains

## Epic Goal

Make the blog approval workflow operationally complete, not dependent on direct database changes or hidden endpoints.

## Features

| ID | Feature | Result / completion evidence | User-story children |
|---|---|---|---|
| F06.1 | Approval queue | Super Admin retrieves a filtered, bounded queue of reviewable blogs. | US-06.1 |
| F06.2 | Review detail | Admin can inspect complete content and decision-relevant metadata. | US-06.4 |
| F06.3 | Approve/reject | Review commands enforce role, current state, and rejection reason. | US-06.2 |
| F06.4 | Admin editing/publishing | Admin can correct and publish content according to lifecycle rules. | US-06.5 |
| F06.5 | Comment moderation | Admin can find and moderate comments without changing unrelated content. | US-06.3 |

Every feature issue has parent `EPIC-06`; each user story has exactly one feature parent below.

## User Stories

### US-06.1: Review the Approval Queue

**Backlog ID:** US-06.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F06.1  
**Depends on:** EPIC-04, EPIC-05

#### Description

As a Super Admin, I want a filtered approval queue so that I can find content requiring review.

#### Action Items

- Expose a paginated admin-only queue with review status filters.
- Present queue rows and useful loading, empty, failure, and unauthorized states.

#### Tasks

- [ ] Add admin-only list endpoint with status filters and bounded pagination.
- [ ] Add protected admin route and list view with review-detail navigation.
- [ ] Add API and component tests for admin access, filters, pagination, and empty state.

#### Implementation Steps

1. Add admin-only list endpoint with status filters and pagination.
2. Add admin route and table/list UI with loading and empty states.
3. Link each item to a review detail page.
4. Show author, submitted time, category, tags, and status.
5. Avoid exposing admin queue to normal users.

#### Acceptance Criteria
- Only SUPER_ADMIN can access queue APIs and UI route.
- Queue returns only reviewable content by default.
- Pagination is stable and bounded.
- A non-admin receives 403, not an empty successful response.

#### Test Scenarios
- Admin sees pending items.
- User/API without admin role is rejected.
- Draft/published filters return only matching records.
- Empty queue renders a useful empty state.

### US-06.2: Approve or Reject a Blog

**Backlog ID:** US-06.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F06.3  
**Depends on:** US-06.1, EPIC-05

#### Description

As a Super Admin, I want explicit approve/reject actions so that publishing decisions are reliable and the author receives the resulting status.

#### Action Items

- Perform transitions through the existing blog lifecycle service.
- Require rejection reasons and prevent stale decisions from overwriting newer state.

#### Tasks

- [ ] Implement approve/reject commands with updated status and timestamps.
- [ ] Validate rejection reason and authorization server-side.
- [ ] Define stale/repeated action response and add lifecycle integration tests.
- [ ] Display resulting status/reason to the author; do not add external notifications in this epic.

#### Implementation Steps

1. Implement approve and reject commands through the lifecycle service.
2. Require rejection reason and validate its length.
3. Return updated status and timestamps.
4. Make commands idempotent or return a clear conflict for stale state.
5. Notify the author in the UI through updated status/reason; keep external notifications out of Phase 1.

#### Acceptance Criteria
- Approval publishes only valid content.
- Rejection always stores a reason.
- A stale or already-processed request cannot overwrite a newer decision.
- Author can see status/reason after review.

#### Test Scenarios
- Approve pending blog succeeds.
- Reject blank reason fails.
- Reject with reason succeeds.
- Repeated action follows documented idempotency/conflict behavior.
- Non-admin cannot call either command.

### US-06.3: Moderate Comments

**Backlog ID:** US-06.3  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F06.5  
**Depends on:** EPIC-04, EPIC-05

#### Description

As a Super Admin, I want to find and moderate inappropriate comments so that discussions remain usable without changing unrelated content.

#### Action Items

- Provide a protected moderation list and safe moderation command.
- Preserve comment counts and apply the documented child-comment behavior.

#### Tasks

- [ ] Add admin comment list filters and moderation/delete API.
- [ ] Add confirmation, pending, and failure states in the UI.
- [ ] Add role, repeated-action, count-consistency, and public-visibility tests.

#### Implementation Steps

1. Add admin comment list with blog/status filters.
2. Add moderation/delete command.
3. Preserve count correctness and documented child-comment behavior.
4. Add confirmation and pending state in UI.

#### Acceptance Criteria
- Admin can list and moderate comments.
- Normal users cannot access moderation APIs.
- Moderated content is not returned as active content.
- Operation is safe to retry and does not corrupt comment counts.

#### Test Scenarios
- Admin deletes a root and nested comment according to policy.
- Non-admin receives 403.
- Repeated delete returns documented result.
- Public view no longer shows moderated content.

### US-06.4: Inspect Blog Review Details

**Backlog ID:** US-06.4  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F06.2  
**Depends on:** US-06.1

#### Description

As a Super Admin, I want to inspect a submitted blog and its review context so that I can make an informed approval decision.

#### Action Items

- Return all decision-relevant blog content and metadata through the protected review-detail path.
- Keep review details inaccessible to non-admin users.

#### Tasks

- [ ] Add a review-detail query/API for content, author, category, tags, images, status, and rejection context.
- [ ] Render review detail from persisted API data in the admin UI.
- [ ] Add role and field-visibility tests.

#### Implementation Steps

1. Identify existing blog detail contracts and reuse them where safe.
2. Add only the admin-specific fields and authorization needed for review.
3. Add loading, error, and not-found handling in the review page.
4. Test admin access and non-admin rejection.

#### Acceptance Criteria

- Given a Super Admin opens a review, then persisted content and decision-relevant metadata are displayed.
- Given a non-admin requests the review detail, then the API returns 403 and no review data.
- Missing or deleted review content produces the documented not-found state.

#### Test Scenarios

- Admin sees content, author, category, tags, images, and rejection context.
- Non-admin API request returns 403.
- Missing blog displays a controlled not-found state.

### US-06.5: Correct and Publish a Blog as Admin

**Backlog ID:** US-06.5  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F06.4  
**Depends on:** US-06.2, EPIC-05

#### Description

As a Super Admin, I want to correct and publish a blog directly so that approved content can be made accurate without bypassing domain rules.

#### Action Items

- Expose admin editing through the owning blog module.
- Validate and persist administrative edits and publish state consistently.

#### Tasks

- [ ] Add admin edit/publish API behavior through the blog lifecycle service.
- [ ] Add a protected editor with persisted values and validation feedback.
- [ ] Add tests for admin edit, publish, invalid content, and non-admin denial.

#### Implementation Steps

1. Reuse the blog lifecycle and validation rules; do not add direct repository access in the admin module.
2. Add only admin-specific permissions/actions required for direct correction and publication.
3. Implement the editor and success/error feedback.
4. Verify the public view reflects the approved version after publication.

#### Acceptance Criteria

- Given a Super Admin edits valid content, then changes are saved through the owning blog service.
- Given the admin publishes valid content, then public visibility follows the blog access policy.
- Given invalid content or a non-admin request, then the operation is rejected and content is unchanged.

#### Test Scenarios

- Admin correction and publication succeeds.
- Invalid content is rejected with field-level feedback.
- Non-admin edit/publish API returns 403.
- Public detail returns the persisted approved version.

## Release Gate

- [ ] Admin APIs are documented and role-protected.
- [ ] Approval/rejection browser journey passes.
- [ ] Mandatory rejection reason is tested at API and UI layers.
- [ ] Moderation does not expose or mutate unrelated blogs/comments.
- [ ] Admin pages have loading, empty, error, and unauthorized states.
