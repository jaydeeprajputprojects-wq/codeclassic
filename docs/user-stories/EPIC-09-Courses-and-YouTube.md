# EPIC-09: Courses and YouTube Learning

**Backlog ID:** EPIC-09  
**Issue type:** Epic (`type:epic`)  
**Parent:** None  
**Depends on:** EPIC-03, EPIC-04

**Roadmap stage:** Stage 7 - Courses / YouTube  
**Outcome:** Super Admin can manage Course -> Section -> Video content and users can view access-controlled courses with embedded YouTube videos.  
**Dependencies:** EPIC-04, EPIC-03  
**Enables:** Structured learning content

## Epic Goal

Add the learning library without storing video files, while preserving ordering, publication, and content access rules.

## Features

| ID | Feature | Result / completion evidence | Related user stories |
|---|---|---|---|
| F09.1 | Course model | Course metadata, access level, and publication state persist. | US-09.1 |
| F09.2 | Sections | Sections belong to one course and retain deterministic order. | US-09.1 |
| F09.3 | YouTube videos | Approved video IDs and ordering persist without uploading video files. | US-09.3 |
| F09.4 | Admin management | Super Admin can manage course structure and video content. | US-09.1, US-09.3 |
| F09.5 | User learning view | Learners can browse courses and access permitted course content. | US-09.2 |
| F09.6 | Embed safety | Only validated YouTube identifiers produce embeds; arbitrary HTML is never rendered. | US-09.2, US-09.3 |

Every feature issue has parent `EPIC-09`; each story names one primary feature parent and may reference related feature IDs.

## User Stories

### US-09.1: Create and Organize Courses

**Backlog ID:** US-09.1  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F09.1  
**Related feature IDs:** F09.2, F09.4  
**Depends on:** EPIC-04

#### Description

As a Super Admin, I want to create courses and arrange their sections so that learning material is structured and easy to follow.

#### Action Items

- Persist course metadata and ordered sections under their owning course.
- Enforce admin authorization and course/section ownership.

#### Tasks

- [ ] Add course and section migrations with foreign keys and access/status fields.
- [ ] Add admin course/section create, edit, delete, and ordering behavior.
- [ ] Validate that section changes target the owning course.
- [ ] Add publication/access validation and integration tests.

#### Implementation Steps

1. Add course, section, and video migrations with foreign keys.
2. Implement CRUD services and order/reorder operations.
3. Validate ownership of section/course/video relationships.
4. Add admin screens for course, sections, and videos.
5. Add publish validation and access level controls.

#### Acceptance Criteria
- Only Super Admin can mutate courses, sections, or videos.
- Section cannot be attached to another course accidentally.
- Video ordering is deterministic and persists after refresh.
- Published course obeys its access level.
- Video files are never uploaded to Code Classic.

#### Test Scenarios
- Create course with multiple ordered sections/videos.
- Reorder sections and verify API/UI order.
- Cross-course section/video mutation is rejected.
- Non-admin mutation is 403.
- Delete behavior handles child sections/videos according to documented policy.

### US-09.2: Browse and Watch Learning Videos

**Backlog ID:** US-09.2  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F09.5  
**Related feature IDs:** F09.6  
**Depends on:** US-09.1, EPIC-04

#### Description

As a learner, I want to browse courses and watch approved YouTube videos in context so that I can follow the course structure under the correct access policy.

#### Action Items

- Render ordered course content and safe embeds using stored validated identifiers.
- Enforce public/restricted course access before returning content.

#### Tasks

- [ ] Build course list/detail and ordered section navigation from API data.
- [ ] Render the approved YouTube embed URL from the stored video ID only.
- [ ] Add restricted-course authentication and loading/error/unavailable-video states.
- [ ] Add access, embed safety, ordering, and responsive UI tests.

#### Implementation Steps

1. Build course list/detail and section navigation.
2. Render approved YouTube embed URL from stored video ID.
3. Handle restricted course authentication.
4. Add loading/error/removed-video states.
5. Avoid injecting arbitrary embed HTML from user input.

#### Acceptance Criteria
- Public course is viewable anonymously; restricted course requires authentication.
- Video player uses the stored YouTube ID and required YouTube branding/controls remain possible.
- Missing/invalid video data fails safely.
- Course page preserves section/video order.

#### Test Scenarios
- Public course/video renders.
- Anonymous restricted course is blocked.
- Invalid video ID does not create arbitrary iframe navigation.
- Deleted/unpublished video is not shown to learners.
- Mobile layout remains usable.

### US-09.3: Manage Course Videos

**Backlog ID:** US-09.3  
**Issue type:** User Story (`type:user-story`)  
**Parent:** F09.3  
**Related feature IDs:** F09.4, F09.6  
**Depends on:** US-09.1, EPIC-04

#### Description

As a Super Admin, I want to add, edit, remove, and order YouTube lessons within a course section so that the learning sequence is accurate without storing video files.

#### Action Items

- Validate video identifiers and section/course ownership.
- Provide admin controls for video metadata and persistent ordering.

#### Tasks

- [ ] Add video metadata persistence and admin API operations for create/edit/delete/reorder.
- [ ] Validate YouTube video IDs and reject arbitrary iframe URLs or embed HTML.
- [ ] Add admin editing controls and persisted ordering feedback.
- [ ] Add role, invalid-ID, cross-course, and ordering tests.

#### Implementation Steps

1. Reuse the existing course/section ownership rules and add only required video fields.
2. Accept a video ID, not arbitrary HTML or a client-provided embed URL.
3. Implement admin mutations and deterministic ordering.
4. Verify saved data is rendered safely by the learner course view.

#### Acceptance Criteria

- Given a Super Admin supplies a valid YouTube video ID, then the video is saved under the selected section.
- Given invalid IDs, arbitrary embed markup, or a section from another course, then the request is rejected.
- Given an order change, then API and UI show the saved deterministic order after refresh.
- Given a non-admin mutation request, then the API returns 403.

#### Test Scenarios

- Create, edit, remove, and reorder video records as Super Admin.
- Reject malformed video IDs, arbitrary HTML, and cross-course section IDs.
- Verify saved video ordering persists after reload.
- Verify non-admin mutations are denied.

## Release Gate

- [ ] Course hierarchy integration tests pass.
- [ ] Admin-only mutation tests pass.
- [ ] Access level tests pass for public/restricted courses.
- [ ] Embed safety and invalid data tests pass.
- [ ] Browser journey passes: admin create -> publish -> user browse -> open section -> watch video.
