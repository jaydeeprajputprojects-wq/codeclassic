# EPIC-05: Complete Blog Experience

**Backlog ID:** EPIC-05  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-01, EPIC-02, EPIC-04

**Roadmap stage:** Stage 5 - Complete Blog  
**Outcome:** Blogs support images, lifecycle approval, rejection/resubmission, stable sharing, likes, comments, nested replies, and access control.  
**Dependencies:** EPIC-04, EPIC-01, EPIC-02  
**Enables:** EPIC-06 and the complete first knowledge-sharing workflow

## Epic Goal

Deliver the BRD's primary community feature end to end while preserving approval integrity and secure content visibility.

## Features

| ID | Feature | Result / completion evidence | Related user stories |
|---|---|---|---|
| F05.1 | Blog lifecycle | Allowed status transitions are enforced and invalid transitions do not mutate content. | US-05.1 |
| F05.2 | Rejection/resubmission | Rejection reason persists and rejected content can be corrected and resubmitted. | US-05.1 |
| F05.3 | R2 blog images | Up to three validated private images are stored with safe metadata and failure handling. | US-05.2 |
| F05.4 | Likes | A user can like/unlike once per blog and see a consistent state/count. | US-05.3 |
| F05.5 | Comments/replies | Authenticated users can add comments/replies with same-blog parent validation. | US-05.4 |
| F05.6 | Stable sharing | Published blogs have stable links that reapply status and access checks. | US-05.5 |
| F05.7 | Published edits | A user edit does not replace published content until approval. | US-05.1 |

Every feature issue has parent `EPIC-05`; user-story parent IDs are stated below.

## User Stories

### US-05.1: Submit and Publish a Blog Safely

**Backlog ID:** US-05.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F05.1  
**Related feature IDs:** F05.2, F05.7  
**Depends on:** EPIC-04, EPIC-01

#### Description

As an authenticated author, I want a controlled review and resubmission workflow so that my blog is published only after the required approval.

#### Action Items

- Enforce legal state transitions for author and Super Admin actions.
- Preserve rejection context and route changed published content through review.

#### Tasks

- [ ] Implement a transition policy in the owning blog service and expose submit/approve/reject commands.
- [ ] Require and persist a rejection reason; allow author correction and resubmission.
- [ ] Represent edits to published user content as a pending revision/state until approved.
- [ ] Add authorization, transition-conflict, and concurrent-action integration tests.

#### Implementation Steps

1. Add explicit lifecycle transition service and allowed-transition table.
2. Add submit endpoint for draft/rejected content.
3. Add approve/reject endpoints for Super Admin.
4. Require a nonblank rejection reason.
5. Reopen rejected content for editing and resubmission.
6. Route published user edits to a pending revision/state.

#### Acceptance Criteria
- User flow is Draft -> Pending Approval -> Approved/Published.
- Rejection without a reason fails validation.
- Author sees the stored rejection reason.
- Author cannot approve or publish their own blog.
- Invalid transitions return 409 and do not mutate data.
- Super Admin can create/edit/publish without approval.

#### Test Scenarios
- Valid submit changes DRAFT to PENDING_APPROVAL.
- Rejection stores reason and status.
- Rejected author edit/resubmit succeeds.
- User attempts approve/publish returns 403.
- Published edit is not visible as the current public version until approved.
- Concurrent approve/reject attempts do not produce an impossible state.

### US-05.2: Upload Blog Images to R2

**Backlog ID:** US-05.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F05.3  
**Depends on:** EPIC-03, EPIC-04

#### Description

As an author, I want optional blog images stored safely so that posts can include visual context without exposing storage credentials or private objects.

#### Action Items

- Validate image uploads and generate server-controlled private R2 object keys.
- Keep database metadata consistent with successful object storage operations.

#### Tasks

- [ ] Configure server-side R2 access through external credentials.
- [ ] Enforce image count, size, content/signature, and format rules.
- [ ] Persist metadata after upload and define cleanup for failed/removed objects.
- [ ] Add upload success/failure and authorization tests.

#### Implementation Steps

1. Configure R2 client through server-side credentials.
2. Validate file count, MIME/content type, size, and allowed image formats.
3. Generate safe object keys under `blogs/{blogId}/`.
4. Persist metadata only after successful upload.
5. Delete/replace orphaned objects transactionally through a cleanup strategy.
6. Serve restricted images through authorized short-lived access.

#### Acceptance Criteria
- Maximum three images per blog is enforced server-side.
- Invalid type, size, and count are rejected before persistence.
- Original filename cannot control the object path.
- R2 keys/secrets are never exposed to clients.
- Removing an image removes or safely retires its metadata/object.

#### Test Scenarios
- Valid image uploads and metadata persists.
- Four-image request is rejected.
- Spoofed MIME type and unsupported extension are rejected.
- R2 failure leaves no falsely persisted image metadata.
- Unauthorized user cannot retrieve a restricted object.

### US-05.3: Like and Unlike a Blog

**Backlog ID:** US-05.3  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F05.4  
**Depends on:** EPIC-04, EPIC-01

#### Description

As an authenticated user, I want to like or unlike a blog and see the updated count so that I can interact without refreshing the page.

#### Action Items

- Enforce one active like per user/blog at the database and service boundary.
- Return the current user's state and a consistent count to the UI.

#### Tasks

- [ ] Add a unique database constraint for user/blog likes.
- [ ] Implement idempotent like/unlike behavior and API response state.
- [ ] Add frontend mutation handling and focused unit/integration/component tests.

#### Implementation Steps

1. Add unique `(user_id, blog_id)` database constraint.
2. Implement idempotent like/unlike service operations.
3. Return current liked state and count.
4. Update UI mutation state and invalidate or update the detail query.
5. Handle concurrent requests and duplicate clicks.

#### Acceptance Criteria
- Anonymous users cannot like.
- One active like per user/blog is possible.
- Repeated like/unlike requests produce a correct final state.
- UI state and count update without full-page refresh.

#### Test Scenarios
- First like increments count once.
- Duplicate concurrent likes do not create duplicate rows.
- Unlike removes only the current user's like.
- Anonymous request returns 401.
- Deleted/unpublished blog cannot receive a new public like.

### US-05.4: Comment and Reply

**Backlog ID:** US-05.4  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F05.5  
**Depends on:** EPIC-04, EPIC-01

#### Description

As an authenticated user, I want to add comments and nested replies so that I can discuss technical posts under the correct blog.

#### Action Items

- Store comments with validated same-blog parent relationships.
- Render visible discussion and support moderation-compatible status handling.

#### Tasks

- [ ] Add comment persistence, constraints, and indexes for the agreed reply structure.
- [ ] Validate content length and parent ownership by target blog.
- [ ] Add paginated/bounded API and recursive UI rendering with clear deletion behavior.
- [ ] Add cross-blog, anonymous, invalid-content, and moderation tests.

#### Implementation Steps

1. Add comment table, status, parent reference, and indexes.
2. Validate nonblank content and length limits.
3. Verify a reply's parent belongs to the same blog.
4. Support recursive rendering with bounded API payloads/pagination.
5. Add admin delete/moderation hooks.

#### Acceptance Criteria
- Public users can read comments on visible blogs but cannot create them.
- Authenticated users can comment and reply to replies.
- Parent comment must belong to the target blog.
- Deleted/moderated comments are not shown as active content.
- Comment and count updates do not require a full-page refresh.

#### Test Scenarios
- Root comment and multi-level reply succeed.
- Cross-blog parent ID is rejected.
- Anonymous create returns 401.
- Blank/oversized content is rejected.
- Deleted comment is excluded while permitted child handling follows documented policy.

### US-05.5: Share a Published Blog

**Backlog ID:** US-05.5  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F05.6  
**Depends on:** EPIC-04, EPIC-02

#### Description

As a visitor, I want a stable URL and copy/native sharing for a published blog so that I can distribute useful content without bypassing access rules.

#### Action Items

- Create canonical identifier-based routes and resolve them through blog visibility policy.
- Provide copy-link and supported native-sharing behavior.

#### Tasks

- [ ] Add canonical identifier URL generation and optional human-readable slug support.
- [ ] Add public detail route and copy/native share controls with fallback.
- [ ] Ensure preview metadata excludes protected content and routes recheck authorization.
- [ ] Add stable-link, restricted-access, and share-fallback tests.

#### Implementation Steps

1. Use immutable blog identifier with optional human-readable slug.
2. Add public route and canonical URL generation.
3. Add Copy Link and Web Share API fallback behavior.
4. Resolve every shared URL through access/status checks.
5. Add metadata for link previews without exposing protected content.

#### Acceptance Criteria
- Every published blog has one stable URL.
- Title/category/content changes do not change the authoritative identifier.
- Draft, pending, and rejected blogs are not publicly readable.
- Restricted blog URL requires authentication.
- Copy link works; native sharing is used only when supported.

#### Test Scenarios
- Slug/title update leaves identifier URL usable.
- Anonymous public blog access succeeds.
- Anonymous restricted/draft access is blocked.
- Native share unavailable falls back to copy-link.
- Direct URL access and API access enforce the same policy.

## Release Gate

- [ ] Lifecycle transition matrix and integration tests pass.
- [ ] R2 upload/retrieval failure cases are covered.
- [ ] Like uniqueness is enforced by the database.
- [ ] Cross-blog reply security test passes.
- [ ] Share URLs cannot bypass status/access checks.
- [ ] Critical browser journey passes: login -> draft -> submit -> approval -> publish -> like -> comment -> share.
