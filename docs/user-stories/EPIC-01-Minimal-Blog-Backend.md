# EPIC-01: Minimal Blog Backend

**Backlog ID:** EPIC-01  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-00

**Roadmap stage:** Stage 1 - Minimal Blog Backend  
**Outcome:** A tested blog API with categories, predefined tags, drafts, ownership, validation, and persistence.  
**Dependencies:** EPIC-00  
**Enables:** EPIC-02, EPIC-03, EPIC-04, EPIC-06

## Epic Goal

Deliver the first real business vertical slice in Spring Boot and PostgreSQL, while preserving the later approval and publishing workflow.

## Features

| ID | Feature | Result / completion evidence | Related user stories |
|---|---|---|---|
| F01.1 | Blog data model | Blog/category/tag records and their relationships persist through migrations. | US-01.1 |
| F01.2 | Blog CRUD API | Create/read/update/delete behavior is callable through versioned REST endpoints. | US-01.1, US-01.2, US-01.3 |
| F01.3 | Blog validation | Invalid content, category, tags, and unsafe status changes are rejected by the API. | US-01.1, US-01.3 |
| F01.4 | Ownership contract | Author identity comes from the server-side development identity, never client-supplied ownership. | US-01.1, US-01.3 |
| F01.5 | Pagination and indexes | Listing is bounded, returns stable pagination metadata, and uses query-appropriate indexes. | US-01.2 |

Every feature issue has parent `EPIC-01`; user-story parent IDs are stated below.

## User Stories

### US-01.1: Create a Draft Blog

**Backlog ID:** US-01.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F01.1  
**Related feature IDs:** F01.2, F01.3, F01.4  
**Depends on:** EPIC-00

#### Description

As a content author using the development identity, I want to save a valid blog draft so that I can continue writing without publishing it.

#### Action Items

- Persist a draft with its category, tags, and server-assigned author.
- Enforce the blog input rules at the API boundary and in the owning service.

#### Tasks

- [ ] Add Flyway tables and constraints for blogs, categories, tags, and blog-tag relationships.
- [ ] Add request/response DTOs and create service/API behavior using the existing module conventions.
- [ ] Resolve author from the development identity provider and set new content to `DRAFT`.
- [ ] Add positive, validation, and ownership tests.

#### Implementation Steps

1. Create Flyway migrations for categories, tags, blogs, and mappings.
2. Seed the approved BRD categories and tag reference data through migration/configuration.
3. Implement request DTO, service, mapper, repository, and controller.
4. Set author from the development identity abstraction, never from request input.
5. Default new user content to `DRAFT`.

#### Acceptance Criteria
- Title and content are required.
- Category must be from the predefined set.
- Tag count is between 1 and 3 and every tag is predefined.
- Author identity is assigned server-side.
- A valid request returns 201 with a DTO and identifier.

#### Test Scenarios
- Valid draft persists and can be retrieved.
- Missing title/content returns validation error.
- Zero or four tags are rejected.
- Unknown category/tag is rejected.
- Request-supplied author ID is ignored or rejected.

### US-01.2: Read Paginated Blogs

**Backlog ID:** US-01.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F01.2  
**Related feature IDs:** F01.5  
**Depends on:** US-01.1

#### Description

As a visitor, I want to list visible blogs and read one blog so that published content remains discoverable as the catalog grows.

#### Action Items

- Expose a bounded list and a detail lookup that apply visibility rules.
- Return stable pagination data and avoid per-item query growth.

#### Tasks

- [ ] Implement paginated list and identifier-based detail queries with response DTOs.
- [ ] Add default/maximum page size handling and required indexes.
- [ ] Add tests for visibility, pagination metadata, missing identifiers, and query behavior.

#### Implementation Steps

1. Implement `GET /api/v1/blogs?page=0&size=20`.
2. Implement `GET /api/v1/blogs/{id}`.
3. Return DTOs with category, tags, author display data, status, and timestamps.
4. Apply visibility filtering appropriate to the temporary development identity.
5. Add indexes for status, slug/identifier, and created date.

#### Acceptance Criteria
- Default and maximum page sizes are bounded.
- Pagination metadata includes page, size, total elements, and total pages.
- Missing IDs return 404 with a stable error code.
- Draft data is not exposed as public content.

#### Test Scenarios
- Empty and multi-page results return correct metadata.
- Oversized page requests are bounded or rejected consistently.
- Unknown ID returns 404.
- Draft cannot be retrieved through the public visibility path.
- Query count does not grow once per tag/category row for a page.

### US-01.3: Edit and Delete Owned Drafts

**Backlog ID:** US-01.3  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F01.4  
**Related feature IDs:** F01.2, F01.3  
**Depends on:** US-01.1

#### Description

As a content author, I want to update or remove my own draft so that I can control unfinished work without changing another author's content.

#### Action Items

- Enforce ownership and draft-state rules for update and delete.
- Apply related persistence changes atomically and return consistent outcomes.

#### Tasks

- [ ] Implement update and delete commands in the blog module.
- [ ] Reject non-owner access and unsafe status changes before persistence.
- [ ] Add tests proving forbidden requests leave data unchanged.

#### Implementation Steps

1. Implement `PUT /api/v1/blogs/{id}` and `DELETE /api/v1/blogs/{id}`.
2. Enforce author ownership in the service layer.
3. Prevent editing or deleting another author's blog.
4. Define delete behavior and ensure related mappings are handled transactionally.

#### Acceptance Criteria
- Owner can update a draft.
- Non-owner receives 403 and no data changes.
- Deleted blog is not returned afterward.
- Status transitions cannot be forged through arbitrary request fields.

#### Test Scenarios
- Owner update succeeds.
- Non-owner update/delete is forbidden.
- Updating with invalid tags/category rolls back.
- Repeated delete returns documented not-found/idempotency behavior.

## Release Gate

- [ ] Migration works on an empty PostgreSQL database.
- [ ] CRUD and validation tests pass.
- [ ] Ownership tests pass using the development identity.
- [ ] OpenAPI documents all five API operations.
- [ ] No JPA entity is exposed from a controller.
