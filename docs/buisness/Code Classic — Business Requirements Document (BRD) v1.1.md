# Code Classic
## Business Requirements Document (BRD)

**Project:** Code Classic — Technology Learning & Knowledge-Sharing Platform  
**Document Type:** Business Requirements Document  
**Version:** 1.1  
**Phase:** Phase 1  
**Status:** Baseline Requirements  

---

# 1. Document Purpose

This Business Requirements Document defines the business, functional, access-control, and high-level non-functional requirements for **Code Classic**, a technology learning and knowledge-sharing platform.

The platform will provide a centralized place where users can:

- Read technical blogs.
- Create and contribute technical blogs.
- Access learning documents.
- Learn through structured courses.
- Watch technology videos embedded from YouTube.
- Like and comment on blog content.
- Share blog posts using dedicated shareable URLs.
- Discover curated job opportunities.
- Share job opportunities using dedicated Code Classic job URLs.

The platform will be managed by a **Super Admin**, who will control content publishing, document management, courses, videos, comments, and job openings.

---

# 2. Product Objective

The objective of Code Classic is to provide a technology-focused platform combining:

- Technical knowledge sharing.
- Technology learning resources.
- Community interaction.
- Curated learning content.
- Curated job opportunities.

The platform will initially focus on technology areas including:

- Java
- Spring Framework
- Spring Boot
- Microservices
- Spring AI
- Artificial Intelligence
- Cloud
- DevOps
- Database
- System Design
- Software Architecture
- Programming
- Software Development
- Interview Preparation

---

# 3. Product Vision

Code Classic aims to provide a centralized technology platform where developers and technology professionals can:

**Learn → Read → Share Knowledge → Interact → Discover Opportunities**

The Phase 1 architecture should provide a foundation that can later support search, dashboards, notifications, AI moderation, analytics, job recommendations, and other advanced capabilities.

---

# 4. Phase 1 Scope

Phase 1 will include:

1. Authentication
2. User identity management
3. Blogs
4. Blog categories
5. Blog tags
6. Blog images
7. Blog creation and approval
8. Blog rejection and resubmission
9. Blog editing
10. Blog likes
11. Blog comments
12. Nested comment replies
13. Blog sharing
14. Unique blog shareable URLs
15. Learning documents
16. Course management
17. Course sections
18. YouTube video integration
19. Jobs / Job Openings
20. Job cards
21. Job detail pages
22. External job-opening URLs
23. Job sharing
24. Unique job shareable URLs
25. Content access control
26. Super Admin management

---

# 5. User Types

The platform will support three primary user types:

1. **Public User**
2. **Authenticated User**
3. **Super Admin**

Phase 1 will support only one Super Admin.

---

# 6. Public User

A Public User is a visitor who has not authenticated.

## 6.1 Public User Can

- Access the website.
- View public blogs.
- Read public blogs.
- View public documents.
- View public courses.
- Watch publicly available embedded YouTube videos.
- View blog like counts.
- View blog comment counts.
- Read comments.
- Share public blog posts.
- Copy public blog links.
- Use supported native sharing functionality for public blogs.

## 6.2 Public User Cannot

- Like blogs.
- Unlike blogs.
- Comment.
- Reply to comments.
- Create blogs.
- Edit blogs.
- Upload documents.
- Manage courses.
- Manage videos.
- Access restricted content.
- Access admin-only content.
- Access the Jobs module.

The Jobs module must not be available to public users.

---

# 7. Authenticated User

Authentication will initially be provided through Google SSO.

## 7.1 Authenticated User Can

- Access public content.
- Access restricted content.
- Read blogs.
- Like/unlike blogs.
- Comment on blogs.
- Reply to comments.
- Create blogs.
- Save blog drafts.
- Submit blogs for approval.
- Edit their own blogs.
- Resubmit rejected blogs.
- Share blogs.
- Access the Jobs module.
- View published jobs.
- View job details.
- Share jobs.
- Copy job links.
- Use native sharing where supported.
- Navigate to the external job-opening URL.

## 7.2 Authenticated User Cannot

- Publish their own blog without approval.
- Approve their own blog.
- Upload documents.
- Manage courses.
- Manage videos.
- Create jobs.
- Edit jobs.
- Delete jobs.
- Publish jobs.
- Manage another user's content.
- Access admin-only content.

---

# 8. Super Admin

Phase 1 will have one Super Admin.

The Super Admin has complete management access.

## 8.1 Super Admin Can

### Blogs

- Create blogs.
- Edit blogs.
- Delete blogs.
- Approve blogs.
- Reject blogs.
- Provide rejection reasons.
- Publish blogs.
- Manage blog categories/tags where applicable.

### Comments

- View comments.
- Moderate comments.
- Delete comments.

### Documents

- Upload documents.
- Edit documents.
- Delete documents.
- Configure document access.

### Courses

- Create courses.
- Edit courses.
- Delete courses.
- Create sections.
- Edit sections.
- Delete sections.
- Add videos.
- Edit videos.
- Delete videos.

### Jobs

- Create jobs.
- Edit jobs.
- Publish jobs.
- Unpublish jobs.
- Close jobs.
- Delete jobs.
- Update company information.
- Update skills.
- Update experience.
- Update external job URLs.
- Manage job shareable URLs.

The Super Admin can also access and share blogs and jobs.

---

# 9. Authentication

## 9.1 Authentication Method

Google Single Sign-On will be the initial authentication mechanism.

Additional authentication providers may be introduced in future phases.

---

# 10. User Identity

For authenticated users:

- Email ID will be the User ID.
- Email ID will be the Blog Author ID.
- Profile Name will be the Blog Author Name.

Users will not manually enter their author identity when creating a blog.

The backend must obtain the authenticated user's identity from the authentication context.

---

# 11. Application Navigation

The main application navigation will contain:

- Home
- Blogs
- Documents
- Courses
- Jobs

## 11.1 Navigation Access

| Module | Public User | Authenticated User | Super Admin |
|---|---:|---:|---:|
| Home | Active | Active | Active |
| Blogs | Active | Active | Active |
| Documents | Active | Active | Active |
| Courses | Active | Active | Active |
| Jobs | Not Available | Active | Active |

## 11.2 Jobs Navigation Rule

The Jobs tab will be:

- Not available to public users.
- Visible and active for authenticated users.
- Visible and active for the Super Admin.

The backend must enforce the same restriction.

---

# 12. Content Types

Code Classic will contain four major content areas:

## 12.1 Blogs

Technical articles and knowledge-sharing posts.

## 12.2 Learning Documents

Reference and learning material in supported document formats.

## 12.3 Courses / Digital Library

Structured educational content:

**Course → Section → Video**

## 12.4 Jobs

Curated job opportunities containing:

**Job Information → Code Classic Job Page → External Job Opening**

---

# 13. Content Access Levels

The platform will support:

1. PUBLIC
2. RESTRICTED
3. ADMIN_ONLY

## PUBLIC

Available to everyone.

## RESTRICTED

Available to:

- Authenticated users.
- Super Admin.

## ADMIN_ONLY

Available only to the Super Admin.

Backend/API authorization must enforce these rules.

---

# 14. Overall Access Control Matrix

| Feature | Public | Authenticated | Super Admin |
|---|---:|---:|---:|
| View Public Blogs | Yes | Yes | Yes |
| View Restricted Blogs | No | Yes | Yes |
| View Admin-Only Blogs | No | No | Yes |
| Like Blog | No | Yes | Yes |
| Comment | No | Yes | Yes |
| Reply | No | Yes | Yes |
| Share Blog | Yes | Yes | Yes |
| Create Blog | No | Yes | Yes |
| Approve Blog | No | No | Yes |
| Upload Documents | No | No | Yes |
| View Public Documents | Yes | Yes | Yes |
| View Restricted Documents | No | Yes | Yes |
| Manage Courses | No | No | Yes |
| View Public Courses | Yes | Yes | Yes |
| View Restricted Courses | No | Yes | Yes |
| Jobs Tab | No | Yes | Yes |
| View Jobs | No | Yes | Yes |
| Share Jobs | No | Yes | Yes |
| Create Jobs | No | No | Yes |
| Edit Jobs | No | No | Yes |
| Publish Jobs | No | No | Yes |
| Delete Jobs | No | No | Yes |

---

# 15. Blog Management

Blogs are the primary knowledge-sharing content type.

Each blog should contain:

- Blog ID
- Title
- Slug
- Shareable URL identifier
- Content
- Images
- Author ID
- Author Name
- Category
- Tags
- Like Count
- Comment Count
- Access Level
- Status
- Rejection Reason
- Created Date
- Updated Date

---

# 16. Blog Categories

Blogs must use predefined categories.

Initial categories:

- Java
- Spring Framework
- Spring Boot
- Microservices
- Spring AI
- Artificial Intelligence
- Cloud
- DevOps
- Database
- System Design
- Software Architecture
- Programming
- Software Development
- Interview Preparation
- Other

Users cannot create arbitrary categories while creating a blog.

---

# 17. Blog Tags

Tags will come from a predefined list.

Rules:

- Minimum 1 tag.
- Maximum 3 tags.
- Users cannot create arbitrary tags.
- Backend must validate tag count.
- Backend must validate tag values.

---

# 18. Blog Images

Blogs may contain images.

Rules:

- Images are optional.
- Maximum 3 images per blog.
- Images must be validated.
- Images must be associated with the corresponding blog.

---

# 19. Blog Status

Supported lifecycle states:

- DRAFT
- PENDING_APPROVAL
- APPROVED
- REJECTED
- PUBLISHED

The technical implementation may combine APPROVED and PUBLISHED where appropriate, but the business workflow must preserve approval.

---

# 20. Blog Creation Workflow

## 20.1 Authenticated User

The workflow is:

**Create → Draft → Submit → Pending Approval → Approved → Published**

Rejected workflow:

**Rejected → Edit → Resubmit → Pending Approval → Approved → Published**

Authenticated users cannot directly publish newly created blogs.

## 20.2 Super Admin

The Super Admin can:

**Create/Edit → Publish**

without requiring approval.

---

# 21. Blog Rejection

If a blog is rejected:

- Rejection reason is mandatory.
- Rejection reason is stored.
- Author can view the rejection reason.
- Author can edit the blog.
- Author can resubmit the blog.

The system must not permit rejection without a reason.

---

# 22. Blog Editing

## Draft

The author can freely edit a draft.

## Rejected

The author can edit and resubmit a rejected blog.

## Published

An authenticated user's published blog can be edited.

Any modification must go through approval again:

**Published → Edited → Pending Approval → Approved → Updated Published Version**

This prevents unapproved changes from being published.

## Super Admin

The Super Admin can edit and publish directly.

---

# 23. Blog Likes

Only authenticated users can like blogs.

Each user can have one active like per blog.

The database must enforce:

**Unique(User ID + Blog ID)**

---

# 24. Blog Like Toggle

Initial state:

**Like**

After clicking:

**Liked**

Clicking again:

**Like**

The following must update without full-page refresh:

- Like button state.
- Like count.

---

# 25. Blog Comments

Authenticated users can:

- Add comments.
- Reply to comments.
- Reply to replies.

Multiple levels of nesting are supported.

Public users can read comments but cannot create comments or replies.

---

# 26. Comment Data

Each comment contains:

- Comment ID
- Blog ID
- User ID
- Parent Comment ID
- Content
- Created Date
- Updated Date
- Status

Root-level comments have no parent.

Replies reference their parent comment.

---

# 27. Comment Management

The Super Admin can:

- View comments.
- Moderate comments.
- Delete comments.

Phase 1 moderation is manual.

---

# 28. Future AI Comment Moderation

AI moderation is out of scope for Phase 1.

Future capabilities may include detection of:

- Vulgar language.
- Offensive language.
- Phone numbers.
- Email addresses.
- Physical addresses.
- Other personal information.

Potential workflow:

**Submit → AI Moderation → Safe / Unsafe / Review**

---

# 29. Blog Sharing

Every published blog must have a dedicated shareable URL.

Example:

`https://yourdomain.com/blog/spring-boot-global-exception-handling`

Each URL must uniquely identify one blog.

---

# 30. Blog Share Button

Every published blog must display a **Share** button.

The Share button is available to:

- Public users.
- Authenticated users.
- Super Admin.

Authentication is not required to share a public blog.

---

# 31. Blog Share Functionality

At minimum:

### Copy Link

Allows the user to copy the blog's URL.

### Native Share

Where supported, the browser/device native share mechanism may be used.

Social-specific sharing options may be added later.

---

# 32. Blog Share Access Control

Sharing must not bypass authorization.

### Public Blog

Anyone with the URL can access it.

### Restricted Blog

Authentication is required.

### Admin-Only Blog

Only Super Admin can access it.

### Draft / Pending / Rejected

These must not be publicly accessible through their shareable URL.

Backend authorization must be performed whenever a shared URL is accessed.

---

# 33. Blog Share URL Stability

The shareable URL should remain stable when:

- Blog title changes.
- Blog content changes.
- Category changes.
- Tags change.
- Images change.

The Blog ID should remain the authoritative identifier.

A human-readable slug may be used.

---

# 34. Blog Share Analytics

Out of scope for Phase 1:

- Share count.
- Share clicks.
- Referral tracking.
- Conversion tracking.
- Social-media analytics.

---

# 35. Document Management

Only the Super Admin can upload documents.

Authenticated users cannot upload documents.

Supported formats:

- PDF
- DOC
- DOCX
- PPT
- PPTX
- XLS
- XLSX

---

# 36. Document Fields

Each document should contain:

- Document ID
- Title
- Description
- File
- File Type
- File Size
- Category
- Access Level
- Uploaded By
- Created Date
- Updated Date

---

# 37. Document Viewing

Documents will be available for viewing through the application.

The application will not provide a dedicated Download button.

Absolute prevention of browser-level saving or screenshots cannot be guaranteed.

The requirement is that Code Classic itself does not expose an application-level download option.

---

# 38. Course / Digital Library

Courses will follow:

**Course → Section → Video**

Only the Super Admin can manage courses in Phase 1.

---

# 39. Course Fields

Each course contains:

- Course ID
- Title
- Description
- Thumbnail/Image
- Category
- Access Level
- Status
- Created Date
- Updated Date

---

# 40. Course Sections

Each course can contain multiple sections.

Each section contains:

- Section ID
- Course ID
- Title
- Description
- Display Order

---

# 41. Course Videos

Each section can contain multiple videos.

Each video contains:

- Video ID
- Section ID
- Title
- Description
- YouTube Video ID
- Embed Information
- Thumbnail
- Display Order
- Status
- Access Level

---

# 42. YouTube Integration

Videos remain hosted on YouTube.

Code Classic stores the YouTube Video ID/embed information rather than the actual video file.

Videos will be displayed through an embedded YouTube player.

The primary viewing experience should remain within Code Classic.

YouTube-required controls and branding may be visible.

---

# 43. Jobs / Job Openings

The Jobs module is included in Phase 1.

It provides authenticated users with curated job opportunities.

Jobs may link to:

- Official company career pages.
- Third-party job portals.

Code Classic does not host the actual job application.

---

# 44. Jobs Navigation

The Jobs tab is:

### Public User

- Not available.
- Not active.
- Not accessible.

### Authenticated User

- Visible.
- Active.
- Accessible.

### Super Admin

- Visible.
- Active.
- Accessible.

Backend authorization must enforce the same rule.

---

# 45. Job Posting Permissions

Only the Super Admin can manage jobs.

The Super Admin can:

- Create.
- Edit.
- Publish.
- Unpublish.
- Close.
- Delete.
- Update job information.
- Update external job URL.

Authenticated users cannot create or modify jobs.

---

# 46. Job Information

Each job should contain:

- Job ID
- Job Title
- Company Name
- Company Icon/Logo
- Required Skills
- Required Experience
- External Job Opening URL
- Code Classic Job Slug
- Code Classic Shareable URL
- Status
- Created Date
- Updated Date

---

# 47. Company Information

Each job card must display:

- Company name.
- Small company icon/logo.

The company icon should be visually compact and consistent across job cards.

---

# 48. Job Skills

Required/preferred skills should be displayed as tags/chips.

Examples:

- Java
- Spring Boot
- Microservices
- Azure
- SQL
- React
- Python
- AWS
- Kubernetes

The exact maximum number of skills can be finalized during technical design.

---

# 49. Job Experience

Every published job should display its required experience.

Examples:

- 2+ Years
- 3–5 Years
- 5+ Years
- 7+ Years

---

# 50. Job Opening URL

Every published job must have an external job-opening URL.

The URL can point to:

### Official Company Website

The company's own careers/job page.

### Third-Party Job Portal

An external job portal or recruitment website.

The platform stores the URL and directs users to it.

---

# 51. Job Card

Jobs will be displayed using a card-based layout.

Example:

```text
┌──────────────────────────────────────────┐
│ [Company Icon] Company Name              │
│                                          │
│ Senior Java Developer                   │
│                                          │
│ Java | Spring Boot | Microservices      │
│                                          │
│ Experience: 5+ Years                    │
│                                          │
│ [View Job]                 [Share]       │
└──────────────────────────────────────────┘
```

The final UI will be determined during UI/UX design.

---

# 52. Job Detail Page

Each published job must have a dedicated Code Classic job page.

Example:

`https://yourdomain.com/jobs/12345`

The job detail page will display:

- Company information.
- Job title.
- Skills.
- Experience.
- Other configured job details.
- Share option.
- External job-opening action.

---

# 53. Job Shareable URL

Every published job must have a unique Code Classic URL.

Example:

`https://yourdomain.com/jobs/12345`

The URL must uniquely identify the job.

The Job ID should be the authoritative identifier.

A human-readable slug may be used.

---

# 54. Job Sharing

Job sharing is included in **Phase 1**.

Every published job should provide a **Share Job** option.

The Share option should support at minimum:

### Copy Link

Copies the Code Classic job URL.

### Native Share

Where supported, allows sharing through the browser/device native sharing mechanism.

---

# 55. Job Sharing Permissions

| User | View Job | Share Job |
|---|---:|---:|
| Public User | No | No |
| Authenticated User | Yes | Yes |
| Super Admin | Yes | Yes |

Only authenticated users and the Super Admin can access and share jobs.

---

# 56. Job Share URL Access

Because Jobs are an authenticated-only module:

### Public User

If a public user receives a Code Classic job URL:

**Open Job URL → Authentication Required → Google SSO → Job Access**

### Authenticated User

**Open Job URL → Job Details**

### Super Admin

**Open Job URL → Job Details**

The job URL must not expose job details to unauthenticated users.

---

# 57. Job Share URL Stability

The Code Classic job URL should remain stable when:

- Job title changes.
- Skills change.
- Experience changes.
- Company information changes.
- External application URL changes.

The Job ID remains the authoritative identifier.

---

# 58. Job Application Behavior

The Code Classic job page will provide an action such as:

**View Job** / **Apply Now**

The user will be redirected to the stored external job-opening URL.

Code Classic will not process:

- Job applications.
- Resumes.
- Candidate information.
- Application status.
- Recruiter communication.

---

# 59. Job Status

Supported job statuses:

- DRAFT
- PUBLISHED
- UNPUBLISHED
- CLOSED

Only published jobs are visible to authenticated users.

---

# 60. Job Lifecycle

The Super Admin manages jobs through:

**Create → Draft → Publish → Unpublish / Close → Delete**

The Super Admin can update an existing job when details change.

---

# 61. Job URL Validation

The backend must validate:

- External URL is provided before publication.
- URL follows a valid URL format.
- HTTPS is preferred/required according to technical implementation.
- URL is stored correctly.

Code Classic is not responsible for validating the content or availability of the external website.

---

# 62. Job Sharing Analytics

Job sharing itself is in Phase 1.

The following analytics are out of scope for Phase 1:

- Number of shares.
- Number of share clicks.
- Referral tracking.
- Conversion tracking.
- Social-media analytics.

---

# 63. Content Publishing Rules

## Blogs

Authenticated user:

**Draft → Pending Approval → Approved → Published**

Rejected:

**Rejected → Edit → Resubmit → Pending Approval → Approved → Published**

Super Admin:

**Create/Edit → Publish**

## Documents

Super Admin only.

## Courses

Super Admin only.

## Jobs

Super Admin only.

---

# 64. API-Level Authorization

All authorization must be enforced at the backend/API level.

The frontend must not be considered a security boundary.

Examples:

- Public user cannot access restricted blog APIs.
- Public user cannot access Jobs APIs.
- Authenticated user cannot create jobs.
- Authenticated user cannot upload documents.
- Authenticated user cannot approve blogs.
- Authenticated user cannot manage courses.
- User cannot modify another user's blog.
- User cannot manipulate another user's likes.
- Shared URLs cannot bypass authorization.

---

# 65. Data Integrity

The system must maintain relationships between:

- Users
- Blogs
- Categories
- Tags
- Likes
- Comments
- Documents
- Courses
- Sections
- Videos
- Jobs

Appropriate unique and relationship constraints should be implemented.

---

# 66. Like Data Integrity

The system must enforce:

**Unique(User ID + Blog ID)**

This prevents duplicate active likes.

The like count must accurately represent active like records.

---

# 67. Comment Data Integrity

Each comment must:

- Belong to a valid blog.
- Belong to a valid authenticated user.
- Reference a valid parent comment when applicable.

A reply must belong to the same blog as its parent comment.

---

# 68. Job Data Integrity

Each job must:

- Have a unique Job ID.
- Have a job title.
- Have a company name.
- Have required skills.
- Have an experience requirement.
- Have an external URL before publication.
- Have a valid status.
- Have a unique Code Classic job identifier/URL.

Only the Super Admin can modify job records.

---

# 69. Error Handling

The platform should handle:

- Unauthorized access.
- Forbidden access.
- Invalid blog ID.
- Invalid job ID.
- Invalid share URL.
- Blog not found.
- Job not found.
- Blog not published.
- Job not published.
- Invalid category.
- Invalid tags.
- More than three tags.
- Missing tags.
- More than three images.
- Duplicate likes.
- Invalid comments.
- Invalid parent comments.
- Unauthorized document upload.
- Unauthorized course management.
- Unauthorized job management.
- Invalid external job URL.

---

# 70. Security Requirements

The system should:

- Secure authentication.
- Validate authenticated identity.
- Enforce authorization server-side.
- Validate API inputs.
- Protect user-owned resources.
- Protect admin operations.
- Validate uploaded files.
- Prevent direct unauthorized content access.
- Prevent unauthorized API access.
- Prevent shared URLs from bypassing authentication/access control.

---

# 71. Performance Requirements

The application should provide:

- Efficient blog loading.
- Efficient document listing.
- Efficient course navigation.
- Responsive like/unlike operations.
- Responsive comment operations.
- Fast blog share URL resolution.
- Fast job listing.
- Fast job detail loading.
- Fast job share URL resolution.

Pagination should be considered for:

- Blogs.
- Comments.
- Documents.
- Jobs.
- Courses.

---

# 72. Scalability Requirements

The architecture should allow future expansion to:

- Multiple administrators.
- Additional authentication providers.
- Global search.
- Notifications.
- AI moderation.
- Analytics.
- Dashboards.
- Content recommendations.
- Job recommendations.
- Job alerts.
- Audit history.
- Advanced sharing.

---

# 73. Phase 1 Out of Scope

## Platform

- User dashboard.
- Admin dashboard.
- Global search.
- Advanced filtering.
- Email notifications.
- Push notifications.
- Audit/history tracking.
- Advanced analytics.
- Personalization.

## Blogs

- Share analytics.
- Social-media analytics.
- AI comment moderation.

## Documents

- User uploads.
- Application-level download functionality.

## Courses

- User-created courses.
- Course progress tracking.
- Certification.

## Jobs

- User-created jobs.
- User-submitted jobs.
- Resume upload.
- Candidate tracking.
- Job application processing.
- Job alerts.
- Job recommendations.
- Job matching.
- Automated job scraping.
- Automated external job verification.
- Job analytics.
- Job share analytics.

---

# 74. Phase 2 Candidates

## 74.1 User Dashboard

Potential features:

- My Blogs.
- Drafts.
- Pending Blogs.
- Published Blogs.
- Rejected Blogs.
- Activity.
- Bookmarks.
- Saved Content.

---

## 74.2 Admin Dashboard

Potential features:

- User management.
- Blog management.
- Approval queue.
- Document management.
- Course management.
- Job management.
- Comment moderation.
- Platform statistics.

---

## 74.3 Search

Global search across:

- Blogs.
- Documents.
- Courses.
- Videos.
- Jobs.

---

## 74.4 Advanced Filtering

Potential filters:

- Category.
- Tags.
- Content type.
- Author.
- Skills.
- Experience.
- Company.
- Access level.

---

## 74.5 AI Comment Moderation

Potential AI capabilities:

- Offensive-language detection.
- Vulgar-language detection.
- PII detection.
- Content safety analysis.

---

## 74.6 Notifications

Potential notifications:

- Blog approved.
- Blog rejected.
- Blog requires changes.
- Comment reply.
- New content.
- New job opportunities.

---

## 74.7 Audit and Versioning

Potential functionality:

- Blog revision history.
- Approval history.
- Admin action history.
- Content versioning.

---

## 74.8 Advanced Job Features

Potential future functionality:

- Job alerts.
- Job bookmarks.
- Job recommendations.
- Skill-based matching.
- Company pages.
- Job expiry automation.
- Job analytics.
- External URL monitoring.

---

# 75. High-Level User Journeys

## 75.1 Public User — Read Blog

**Open Website → Blogs → Select Blog → Read**

---

## 75.2 Public User — Share Blog

**Open Blog → Share → Copy Link / Native Share**

No authentication is required for sharing a public blog.

---

## 75.3 Authenticated User — Create Blog

**Google Login → Create Blog → Save Draft → Submit → Pending Approval → Admin Review → Approved → Published**

---

## 75.4 Authenticated User — Rejected Blog

**Login → Blog → View Rejection Reason → Edit → Resubmit → Admin Review**

---

## 75.5 Authenticated User — Like Blog

**Login → Open Blog → Like → Count Updates**

---

## 75.6 Authenticated User — Comment

**Login → Open Blog → Add Comment → Submit**

Reply:

**Comment → Reply → Submit → Nested Reply**

---

## 75.7 Authenticated User — Access Jobs

**Google Login → Jobs Tab → Browse Jobs → Select Job → View Job**

---

## 75.8 Authenticated User — Share Job

**Google Login → Jobs → Open Job → Share Job → Copy Link / Native Share**

---

## 75.9 Public User — Access Shared Job

**Open Shared Job URL → Authentication Required → Google SSO → Job Details**

---

## 75.10 Authenticated User — Apply for Job

**Jobs → Job Details → View Job / Apply Now → External Job Website**

---

## 75.11 Super Admin — Manage Blog

**Admin Login → Create/Edit Blog → Configure Category/Tags/Access → Publish**

---

## 75.12 Super Admin — Manage Documents

**Admin Login → Upload Document → Configure Access → Publish**

---

## 75.13 Super Admin — Manage Course

**Admin Login → Create Course → Add Sections → Add YouTube Videos → Configure Access → Publish**

---

## 75.14 Super Admin — Manage Job

**Admin Login → Jobs → Create Job → Enter Company/Title/Skills/Experience → Add External Job URL → Publish**

---

## 75.15 Super Admin — Share Job

**Admin Login → Jobs → Open Job → Share Job → Copy Link / Native Share**

---

# 76. Phase 1 Business Rules

1. Google SSO is the initial authentication mechanism.
2. User email is the User ID.
3. User email is the Blog Author ID.
4. Profile Name is the displayed Author Name.
5. One Super Admin is supported in Phase 1.
6. Blogs use predefined categories.
7. Blogs use predefined tags.
8. Minimum one tag is required.
9. Maximum three tags are allowed.
10. Maximum three images are allowed per blog.
11. User-created blogs require Super Admin approval.
12. Rejection requires a mandatory reason.
13. Rejected blogs can be edited and resubmitted.
14. Published user-blog modifications require reapproval.
15. Only authenticated users can like blogs.
16. One active like per user per blog is allowed.
17. Like state and count update without a full page refresh.
18. Authenticated users can comment.
19. Authenticated users can reply to comments.
20. Multiple nested comment levels are supported.
21. Public users can read comments.
22. Super Admin can moderate comments.
23. Only Super Admin can upload documents.
24. Documents do not provide an application-level download option.
25. Only Super Admin manages courses.
26. Courses follow Course → Section → Video.
27. Videos are hosted externally on YouTube.
28. Every published blog has a unique shareable URL.
29. Every published blog has a Share button.
30. Public users can share public blogs.
31. Authenticated users can share blogs.
32. Super Admin can share blogs.
33. Blog sharing cannot bypass authorization.
34. Draft, pending, and rejected blogs are not publicly accessible through share URLs.
35. Blog share URLs should remain stable.
36. Jobs are included in Phase 1.
37. Jobs tab is unavailable to public users.
38. Jobs tab is active for authenticated users.
39. Jobs tab is active for Super Admin.
40. Only authenticated users and Super Admin can view Jobs.
41. Only Super Admin can create jobs.
42. Only Super Admin can edit jobs.
43. Only Super Admin can publish jobs.
44. Only Super Admin can unpublish or close jobs.
45. Only Super Admin can delete jobs.
46. Job cards display company name.
47. Job cards display a small company icon/logo.
48. Job cards display job title.
49. Job cards display required skills.
50. Job cards display required experience.
51. Every published job requires an external job-opening URL.
52. External job URLs may point to official company websites.
53. External job URLs may point to third-party job portals.
54. Code Classic does not process job applications.
55. Every published job has a unique Code Classic shareable URL.
56. Every published job has a Share Job option.
57. Authenticated users can share jobs.
58. Super Admin can share jobs.
59. Public users cannot view or share jobs.
60. Shared job URLs require authentication.
61. Job share URLs should remain stable when job information changes.
62. Job sharing is included in Phase 1.
63. Job share analytics are out of scope for Phase 1.

---

# 77. Phase 1 Success Criteria

Phase 1 will be considered successful when:

1. Users can authenticate using Google SSO.
2. Public users can browse public content.
3. Authenticated users can access restricted content.
4. Users can create blogs.
5. Users can save drafts.
6. Users can submit blogs for approval.
7. Super Admin can approve blogs.
8. Super Admin can reject blogs.
9. Rejection requires a reason.
10. Users can edit rejected blogs.
11. Users can resubmit rejected blogs.
12. Published user-blog edits require approval.
13. Authenticated users can like/unlike blogs.
14. Like counts update without a page refresh.
15. Authenticated users can create comments.
16. Authenticated users can create nested replies.
17. Public users can read comments.
18. Super Admin can manage comments.
19. Super Admin can upload documents.
20. Users can view documents according to access level.
21. Super Admin can create courses.
22. Courses can contain sections and videos.
23. YouTube videos can be embedded and played.
24. Content access levels are enforced server-side.
25. Every published blog has a unique shareable URL.
26. Every published blog has a Share button.
27. Public users can share public blogs.
28. Authenticated users can share blogs.
29. Super Admin can share blogs.
30. Blog sharing cannot bypass access restrictions.
31. Jobs are available in Phase 1.
32. Public users cannot access the Jobs module.
33. Authenticated users can access the Jobs module.
34. Super Admin can access the Jobs module.
35. Super Admin can create job openings.
36. Super Admin can edit job openings.
37. Super Admin can publish/unpublish/close job openings.
38. Authenticated users can browse published jobs.
39. Job cards display company name.
40. Job cards display company icon/logo.
41. Job cards display skills.
42. Job cards display experience.
43. Users can open the external job-opening URL.
44. External URLs can point to official or third-party job postings.
45. Every published job has a unique Code Classic URL.
46. Every published job provides a Share Job option.
47. Authenticated users can share jobs.
48. Super Admin can share jobs.
49. Public users cannot access shared job details without authentication.
50. Job sharing cannot bypass authentication.
51. Code Classic does not process job applications.
52. Job share analytics are not required in Phase 1.

---

# 78. Final Phase 1 Scope Statement

Code Classic Phase 1 will provide a technology learning and knowledge-sharing platform containing:

**Blogs + Blog Approval + Categories + Tags + Images + Likes + Nested Comments + Blog Sharing + Unique Blog URLs + Learning Documents + Courses + Sections + YouTube Videos + Curated Jobs + Job Detail Pages + External Job Links + Job Sharing + Unique Job URLs + Google SSO + Backend Access Control + Super Admin Management**

The platform will support:

### Public Users

**Read public content + Read comments + Share public blogs**

### Authenticated Users

**Read content + Interact with blogs + Create blogs + Access Jobs + Share Jobs + Access External Job Openings**

### Super Admin

**Manage all platform content + Approve blogs + Manage documents + Manage courses + Manage jobs + Moderate comments**

The Phase 1 Jobs workflow will be:

**Google Login → Jobs Tab → Job Cards → Job Detail → Share Job / View External Job**

The Phase 1 Blog sharing workflow will be:

**Blog → Share → Copy Link / Native Share**

The Phase 1 Job sharing workflow will be:

**Job → Share Job → Copy Code Classic Job URL / Native Share**

The architecture should remain extensible for future capabilities including:

**Search + Dashboards + AI Moderation + Notifications + Analytics + Audit History + Multiple Admins + Enhanced Social Sharing + Job Alerts + Job Recommendations + Job Matching**