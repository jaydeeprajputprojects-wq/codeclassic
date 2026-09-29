# Code Classic — Technical Business Requirements & Architecture Document

**Project:** Code Classic — Technology Learning & Knowledge-Sharing Platform  
**Document Type:** Technical BRD / Technical Architecture & Implementation Plan  
**Version:** 1.0  
**Status:** Baseline Technical Specification  
**Business Requirements Source:** Code Classic BRD v1.1  
**Primary Stack:** Java, Spring Boot, React  
**Initial Architecture:** Modular Monolith  
**Target Architecture:** Microservice-ready / Incrementally Decomposable  
**Target Users:** 100–500 initial users  
**Object Storage:** Cloudflare R2  
**Primary Database:** PostgreSQL  

---

# 1. Document Purpose

This document translates the Code Classic business requirements into a technical implementation blueprint.

It defines:

- Technical architecture
- Application boundaries
- Backend architecture
- Frontend architecture
- Database architecture
- Object storage
- Authentication and authorization
- API standards
- Logging
- Monitoring and observability
- Security
- Testing
- CI/CD
- Deployment
- Environment strategy
- Incremental development roadmap
- Administrative application strategy
- Microservice evolution strategy
- Production-readiness requirements

The business BRD defines Code Classic as a technology learning and knowledge-sharing platform supporting blogs, learning documents, courses, YouTube videos, community interaction, and curated jobs.

---

# 2. Technical Objectives

The technical solution shall:

1. Support the Phase 1 business requirements.
2. Use Java and Spring Boot for backend services.
3. Use React for the frontend.
4. Use PostgreSQL as the primary relational database.
5. Use Cloudflare R2 for object/file storage.
6. Support Google SSO as the initial authentication mechanism.
7. Enforce authorization on the backend.
8. Support public, authenticated-user, and Super Admin access levels.
9. Provide production-quality logging and error handling.
10. Provide automated testing and CI/CD.
11. Support a low-cost initial production deployment.
12. Allow future extraction of business modules into microservices.
13. Avoid unnecessary infrastructure for the initial 100–500-user workload.
14. Allow the platform to evolve toward independent services when justified by actual requirements.

---

# 3. Source Business Scope

The technical implementation must support the business scope defined in the Phase 1 BRD:

- Authentication
- User identity management
- Blogs
- Blog categories
- Blog tags
- Blog images
- Blog creation and approval
- Blog rejection and resubmission
- Blog editing
- Blog likes
- Blog comments
- Nested comment replies
- Blog sharing
- Unique blog URLs
- Learning documents
- Course management
- Course sections
- YouTube video integration
- Jobs / Job Openings
- Job cards
- Job detail pages
- External job-opening URLs
- Job sharing
- Unique job URLs
- Content access control
- Super Admin management

---

# 4. Architecture Principles

## 4.1 Start Simple

The initial application shall not be split into independently deployed microservices unless there is a demonstrated need.

The initial architecture will be a **modular monolith**.

## 4.2 Microservice-Ready Design

Although the first deployment is a modular monolith, business modules must have clear boundaries so they can later be extracted into independent services.

## 4.3 Backend Is the Security Boundary

The React frontend shall never be treated as a security boundary.

All important authorization decisions must be performed by Spring Boot.

## 4.4 API-First Backend

Business functionality shall be exposed through versioned REST APIs.

## 4.5 Database Ownership

Each business module shall logically own its data.

Modules must not directly access another module's repositories.

## 4.6 Production From Early Stages

A minimal working version should be deployed to a real production environment early rather than waiting for all Phase 1 functionality.

## 4.7 Incremental Delivery

Each implementation stage should produce a working application increment.

---

# 5. Target Architecture

The target architecture is:

```text
                         INTERNET
                            |
                            v
                    +---------------+
                    |   Cloudflare  |
                    | DNS/CDN/SSL   |
                    +-------+-------+
                            |
                +-----------+-----------+
                |                       |
                v                       v
        +---------------+       +---------------+
        | Cloudflare    |       | API / Backend |
        | Pages         |       |               |
        | React         |       | Spring Boot   |
        +---------------+       +-------+-------+
                                        |
                    +-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
              PostgreSQL          Cloudflare R2       External APIs
                                                       |
                                                       +-- Google SSO
                                                       +-- YouTube
```

The initial backend will be a modular Spring Boot application.

---

# 6. Initial Production Architecture

The first production deployment shall use:

```text
Cloudflare
    |
    +---- React / Cloudflare Pages
    |
    +---- Spring Boot Backend
              |
              +---- PostgreSQL
              |
              +---- Cloudflare R2
```

The initial system should avoid:

- Kubernetes
- Kafka
- Elasticsearch/OpenSearch
- Redis
- Dedicated API Gateway
- Service discovery
- Multiple independently deployed backend services

unless an actual requirement emerges.

---

# 7. Technology Stack

## 7.1 Backend

- Java
- Spring Boot
- Spring MVC
- Spring Security
- Spring Data JPA
- Hibernate ORM
- Jakarta Bean Validation
- OAuth2 Client
- OAuth2 Resource Server where applicable
- JWT where applicable
- Flyway
- Spring Boot Actuator
- Micrometer
- OpenTelemetry
- OpenAPI / Swagger

## 7.2 Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- Lucide React

## 7.3 Database

- PostgreSQL
- HikariCP
- Flyway

## 7.4 Object Storage

- Cloudflare R2

## 7.5 Infrastructure

- Cloudflare DNS
- Cloudflare Pages
- Managed Spring Boot hosting
- Managed PostgreSQL
- Cloudflare R2

## 7.6 Development and DevOps

- GitHub
- GitHub Actions
- Maven
- Docker
- Sonar/SonarCloud
- Dependabot
- Secret scanning

## 7.7 Testing

- JUnit 5
- Mockito
- Spring Boot Test
- Testcontainers
- React Testing Library
- Vitest
- Playwright

---

# 8. Backend Architecture

The initial Spring Boot application shall be organized by business domain.

Recommended structure:

```text
backend/
└── src/
    └── main/
        └── java/
            └── com/codeclassic/
                ├── CodeClassicApplication.java
                │
                ├── common/
                │   ├── exception/
                │   ├── response/
                │   ├── security/
                │   ├── validation/
                │   ├── audit/
                │   └── util/
                │
                ├── identity/
                │   ├── controller/
                │   ├── service/
                │   ├── repository/
                │   ├── entity/
                │   ├── dto/
                │   └── mapper/
                │
                ├── blog/
                │   ├── controller/
                │   ├── service/
                │   ├── repository/
                │   ├── entity/
                │   ├── dto/
                │   ├── mapper/
                │   └── domain/
                │
                ├── comment/
                │
                ├── job/
                │
                ├── document/
                │
                ├── course/
                │
                └── admin/
```

---

# 9. Domain Modules

## 9.1 Identity Module

Responsibilities:

- User identity
- Google identity
- User profile information
- Roles
- Authentication-related data
- Authorization context

## 9.2 Blog Module

Responsibilities:

- Blog CRUD
- Categories
- Tags
- Blog images
- Blog status
- Blog approval
- Blog rejection
- Publishing
- Blog share URL

## 9.3 Comment Module

Responsibilities:

- Comments
- Nested replies
- Comment status
- Comment moderation

## 9.4 Job Module

Responsibilities:

- Job CRUD
- Company information
- Skills
- Experience
- External job URL
- Job status
- Job share URL

## 9.5 Document Module

Responsibilities:

- Document metadata
- File validation
- R2 integration
- Access level
- Document viewing

## 9.6 Course/Learning Module

Responsibilities:

- Courses
- Course sections
- YouTube videos
- Ordering
- Access level
- Publishing

## 9.7 Admin Module

Responsibilities:

- Administrative APIs
- Blog approval
- Blog rejection
- Job management
- Document management
- Course management
- Comment moderation

---

# 10. Module Boundary Rules

Each module must follow these rules:

1. It owns its domain entities.
2. It owns its repositories.
3. Other modules cannot directly access its repositories.
4. Cross-module communication must occur through service/domain interfaces.
5. Future service-to-service calls should replace internal interfaces without changing frontend contracts.
6. Domain-specific business logic must remain inside its module.

Example:

```text
JobService
    X BlogRepository

JobService
    -> Blog public interface
```

---

# 11. Future Microservice Architecture

The modular monolith shall be capable of evolving toward:

```text
                       API Gateway
                            |
          +-----------------+-----------------+
          |                 |                 |
          v                 v                 v
   Identity Service   Blog Service      Job Service
                            |
                     Comment Service

          +-----------------+-----------------+
          |                 |                 |
          v                 v                 v
 Document Service   Learning Service   Notification Service
```

Potential future services:

- Search Service
- Analytics Service
- Recommendation Service
- Moderation Service
- Notification Service

These shall only be introduced when operational or scaling requirements justify them.

---

# 12. Frontend Architecture

Recommended structure:

```text
frontend/
└── src/
    ├── app/
    │   ├── router/
    │   ├── providers/
    │   └── config/
    │
    ├── components/
    │   ├── common/
    │   ├── layout/
    │   └── ui/
    │
    ├── features/
    │   ├── auth/
    │   ├── blog/
    │   ├── comments/
    │   ├── jobs/
    │   ├── documents/
    │   ├── courses/
    │   └── admin/
    │
    ├── services/
    │   └── api/
    │
    ├── hooks/
    ├── types/
    └── utils/
```

The frontend should be organized by business features rather than one large collection of generic components.

---

# 13. Frontend State Management

Use:

- TanStack Query for server state
- React state/context for local UI state
- React Hook Form for forms

Do not introduce Redux unless application complexity demonstrates a requirement for it.

---

# 14. API Architecture

All APIs shall be versioned.

Base:

```text
/api/v1
```

Examples:

```text
/api/v1/auth
/api/v1/users

/api/v1/blogs
/api/v1/blogs/{id}
/api/v1/blogs/{id}/likes
/api/v1/blogs/{id}/comments

/api/v1/jobs
/api/v1/jobs/{id}

/api/v1/documents

/api/v1/courses
/api/v1/courses/{id}/sections

/api/v1/admin/blogs
/api/v1/admin/jobs
/api/v1/admin/documents
/api/v1/admin/courses
```

---

# 15. API Response Standard

Success:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "timestamp": "2026-01-01T10:00:00Z"
}
```

Error:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "BLOG_NOT_FOUND",
    "message": "Blog was not found"
  },
  "timestamp": "2026-01-01T10:00:00Z"
}
```

Paginated response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 0,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5
  },
  "error": null
}
```

---

# 16. Error Handling

Centralized error handling shall use:

```java
@RestControllerAdvice
```

The system shall handle:

- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 422 Validation Error
- 500 Internal Server Error

Stack traces and internal implementation details must not be returned to clients.

---

# 17. Validation

Use Jakarta Bean Validation.

Examples:

```text
@NotBlank
@NotNull
@Size
@Pattern
```

Business-specific validators shall be implemented where required.

Examples:

- Blog must have a title.
- Blog must have content.
- Minimum one tag.
- Maximum three tags.
- Maximum three images.
- Published job must have an external URL.

---

# 18. Authentication

The initial authentication mechanism shall be Google SSO.

High-level flow:

```text
React
   |
   v
Google Login
   |
   v
Spring Security
   |
   v
Identity Module
   |
   v
PostgreSQL
```

The backend shall establish the authenticated user's identity from the authentication/security context.

The client shall not be allowed to supply another user's identity as the author.

---

# 19. Authorization

Initial roles:

```text
PUBLIC
AUTHENTICATED_USER
SUPER_ADMIN
```

Spring Security authorities may use:

```text
ROLE_USER
ROLE_ADMIN
```

Authorization must be enforced at:

1. UI level
2. API endpoint level
3. Business/resource level

Example:

```text
POST /api/v1/blogs
ROLE_USER

POST /api/v1/admin/blogs/{id}/approve
ROLE_ADMIN

POST /api/v1/admin/jobs
ROLE_ADMIN
```

---

# 20. Database Architecture

Primary database:

```text
PostgreSQL
```

The initial application may use one database while maintaining logical ownership by module.

Example:

```text
identity_user
identity_role

blog
blog_category
blog_tag
blog_image
blog_like

comment

job
job_skill

document

course
course_section
course_video
```

---

# 21. Database Migration

Flyway shall manage database schema changes.

Example:

```text
db/migration/

V1__create_users.sql
V2__create_roles.sql
V3__create_blogs.sql
V4__create_blog_categories.sql
V5__create_blog_tags.sql
V6__create_blog_images.sql
V7__create_blog_likes.sql
V8__create_comments.sql
```

Production schema changes must be performed through migrations.

Hibernate must not be used as the production schema migration mechanism.

---

# 22. Database Connection Management

Use HikariCP.

Requirements:

- Connection pool limits configured per environment.
- Idle connections monitored.
- Connection leaks investigated.
- Database credentials stored as secrets.
- SSL enabled in production where supported.
- Application should not create excessive database connections.

---

# 23. Blog Data Model

Initial conceptual model:

```text
Blog
----
id
title
slug
content
author_id
category_id
status
access_level
rejection_reason
created_at
updated_at
published_at
```

Category:

```text
BlogCategory
------------
id
name
status
```

Tag:

```text
BlogTag
-------
id
name
status
```

Blog-tag relation:

```text
BlogTagMapping
--------------
blog_id
tag_id
```

Image:

```text
BlogImage
---------
id
blog_id
object_key
file_name
content_type
file_size
display_order
created_at
```

---

# 24. Blog Status

Supported lifecycle:

```text
DRAFT
   |
   v
PENDING_APPROVAL
   |
   +----> REJECTED
   |          |
   |          v
   |         EDIT
   |          |
   |          v
   |    PENDING_APPROVAL
   |
   v
APPROVED
   |
   v
PUBLISHED
```

Super Admin may create/edit and publish directly.

---

# 25. Blog Likes

The database shall enforce:

```text
UNIQUE(user_id, blog_id)
```

This prevents duplicate active likes.

Like/unlike shall update the frontend without requiring a full-page refresh.

---

# 26. Blog Comments

Comment model:

```text
Comment
-------
id
blog_id
user_id
parent_comment_id
content
status
created_at
updated_at
```

Root comments have:

```text
parent_comment_id = NULL
```

Replies reference the parent comment.

The backend must ensure a reply belongs to the same blog as its parent.

---

# 27. Blog Images and Cloudflare R2

Actual image files shall be stored in R2.

PostgreSQL shall store metadata.

Recommended structure:

```text
blogs/
  {blogId}/
    image-1.webp
    image-2.webp
    image-3.webp
```

The business requirement allows a maximum of three images per blog.

File validation shall include:

- File type
- MIME type
- File size
- File count
- Safe object naming

---

# 28. Cloudflare R2 Architecture

R2 shall be used for:

- Blog images
- Learning documents
- Future user profile images
- Course thumbnails
- Future attachments

Suggested object structure:

```text
codeclassic/
├── blogs/
│   └── {blogId}/
├── documents/
│   └── {documentId}/
├── users/
│   └── {userId}/
└── courses/
    └── {courseId}/
```

Restricted objects must not be permanently exposed through unrestricted public URLs.

---

# 29. Document Access

For restricted documents:

```text
React
  |
  v
Spring Boot
  |
  +-- Authenticate
  |
  +-- Authorize
  |
  v
Short-lived object access
  |
  v
Cloudflare R2
```

The application should not expose an application-level download button.

Browser-level saving or screenshots cannot be completely prevented.

---

# 30. Jobs Module

Job entity should contain:

```text
id
job_title
company_name
company_logo/object_key
experience
external_job_url
slug
status
created_at
updated_at
published_at
```

Skills should be represented as a controlled relationship/tag structure.

Only Super Admin may create, edit, publish, unpublish, close, and delete jobs.

---

# 31. Job Access

Public users:

```text
No Jobs access
```

Authenticated users:

```text
Jobs access
```

Super Admin:

```text
Jobs access + management
```

Shared job URLs must still enforce authentication.

---

# 32. Job Lifecycle

```text
DRAFT
  |
  v
PUBLISHED
  |
  +----> UNPUBLISHED
  |
  +----> CLOSED
```

A published job must have a valid external HTTPS job URL according to the technical validation rules.

Code Classic does not process the external job application.

---

# 33. Courses and YouTube

Model:

```text
Course
   |
   +-- Section
          |
          +-- Video
```

Video data:

```text
video_id
section_id
title
description
youtube_video_id
thumbnail
display_order
status
access_level
```

Actual video files shall remain hosted on YouTube.

Code Classic stores the YouTube video identifier/embed information.

---

# 34. Admin Architecture

Admin pages shall be implemented in parallel with each corresponding user feature.

Structure:

```text
admin/
├── blogs/
├── jobs/
├── documents/
├── courses/
└── comments/
```

Example blog workflow:

```text
User Blog UI
     |
     v
Create Draft
     |
     v
Admin Blog Queue
     |
     +---- Reject
     |
     +---- Approve
```

Admin functionality should be operationally complete without prematurely implementing a large analytics dashboard.

---

# 35. Logging Architecture

Use:

```text
SLF4J
Logback
```

Logs should capture:

- Timestamp
- Level
- Service/module
- Trace ID
- Request ID
- User ID where appropriate
- HTTP method
- Endpoint
- Status code
- Duration

Sensitive data must never be logged.

Do not log:

- Passwords
- OAuth secrets
- Access tokens
- Refresh tokens
- Database passwords
- R2 secret keys

---

# 36. Structured Logging

Production logs should preferably use JSON or another machine-readable format.

Example conceptual event:

```json
{
  "timestamp": "2026-09-23T20:10:12Z",
  "level": "INFO",
  "module": "blog",
  "traceId": "abc123",
  "userId": "user-id",
  "method": "POST",
  "path": "/api/v1/blogs",
  "status": 201,
  "durationMs": 145
}
```

---

# 37. Observability

Use:

```text
Spring Boot Actuator
Micrometer
OpenTelemetry
```

Monitor:

- Application health
- HTTP request count
- HTTP error rate
- Response time
- JVM memory
- CPU
- Database connections
- Database response time
- Object-storage failures

Health endpoints should not expose sensitive information publicly.

---

# 38. Distributed Tracing

The initial modular monolith does not require a full distributed tracing infrastructure.

However, trace IDs should be supported from the beginning.

Future:

```text
Frontend
   |
API Gateway
   |
Blog Service
   |
Comment Service
   |
Database
```

should be traceable through one request flow.

---

# 39. Caching

Initial caching strategy:

- Browser caching
- Cloudflare CDN caching
- Database indexes
- Efficient queries
- HTTP caching where appropriate

Redis should not be introduced initially.

Future Redis candidates:

- Popular blogs
- Categories
- Tags
- Published jobs
- Course metadata

---

# 40. Search

Initial implementation should use PostgreSQL search capabilities.

Do not introduce Elasticsearch/OpenSearch for the first version.

A dedicated search service may be considered when:

- Content volume grows substantially.
- Search becomes a major product feature.
- Complex relevance ranking is required.

---

# 41. Messaging

Kafka is not required for the first production version.

Domain events may initially be represented internally:

```text
BlogPublishedEvent
BlogRejectedEvent
CommentCreatedEvent
JobPublishedEvent
DocumentUploadedEvent
```

Future:

```text
Domain Event
    |
    v
Kafka
    |
    +-- Notification
    +-- Analytics
    +-- Moderation
```

---

# 42. Security Requirements

The application shall implement:

- HTTPS
- Google OAuth
- Spring Security
- Backend authorization
- Input validation
- File validation
- Role-based access control
- CORS restrictions
- Secure secrets
- Dependency scanning
- Secret scanning
- Rate limiting where required
- Secure object access

The frontend must not be treated as a security boundary.

---

# 43. CORS

Production CORS should allow only known frontend origins.

Example:

```text
https://codeclassic.com
```

Wildcard origins should not be used with authenticated credential flows.

---

# 44. Rate Limiting

Cloudflare can provide edge protection.

Application-level rate limiting may later use:

```text
Bucket4j
```

or Redis-backed mechanisms.

Potential targets:

- Authentication endpoints
- Comment creation
- Blog creation
- File upload
- Administrative APIs

---

# 45. Dependency and Security Scanning

CI/CD should include:

- Dependabot
- Secret scanning
- Sonar/SonarCloud
- Dependency vulnerability scanning
- Optional OWASP Dependency Check

Veracode may be introduced later if enterprise SAST/SCA requirements justify it.

---

# 46. Testing Strategy

## Unit Testing

Tools:

```text
JUnit 5
Mockito
```

Test:

- Business rules
- Services
- Validators
- Authorization logic
- Status transitions

## Integration Testing

Tools:

```text
Spring Boot Test
Testcontainers
PostgreSQL
```

Test real database behavior.

## Frontend Testing

Tools:

```text
Vitest
React Testing Library
```

## End-to-End

Tool:

```text
Playwright
```

Example:

```text
Login
  |
Create Blog
  |
Submit
  |
Admin Review
  |
Approve
  |
Published
```

---

# 47. Test Pyramid

Preferred distribution:

```text
        E2E
       /   \
   Integration
     /       \
    Unit Tests
```

Most business logic should be covered by unit tests.

Critical database behavior should have integration tests.

Only major user journeys need full E2E tests.

---

# 48. CI/CD Architecture

Backend:

```text
Git Push
   |
   v
GitHub Actions
   |
   +-- Compile
   +-- Unit Test
   +-- Integration Test
   +-- Static Analysis
   +-- Dependency Scan
   +-- Package
   +-- Docker Build
   |
   v
Deploy
```

Frontend:

```text
Git Push
   |
   v
GitHub Actions / Cloudflare
   |
   +-- Install
   +-- Test
   +-- Build
   |
   v
Cloudflare Pages
```

---

# 49. Docker

The backend shall be packaged as a Docker image.

```text
Spring Boot
   |
   v
JAR
   |
   v
Docker Image
```

PostgreSQL must not be packaged into the backend container.

Local dependencies can be managed using Docker Compose.

---

# 50. Environment Strategy

Initial environments:

```text
LOCAL
TEST
PRODUCTION
```

Future:

```text
LOCAL
DEV
QA
STAGING
PRODUCTION
```

Additional environments should only be added when development and release processes justify them.

---

# 51. Configuration Management

Configuration shall use environment-specific properties.

Example:

```text
application.yml
application-local.yml
application-test.yml
application-prod.yml
```

Production secrets must be supplied through the hosting platform's secret/environment-variable mechanism.

---

# 52. Required Production Secrets

Examples:

```text
DB_URL
DB_USERNAME
DB_PASSWORD

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

R2_ACCESS_KEY
R2_SECRET_KEY
R2_BUCKET
R2_ENDPOINT
```

Secrets must never be committed to Git.

---

# 53. Domain and Routing

Recommended domain structure:

```text
https://codeclassic.com
```

Frontend.

```text
https://api.codeclassic.com
```

Backend.

Cloudflare shall manage DNS and HTTPS.

---

# 54. Initial Hosting Architecture

Recommended:

```text
Frontend
    -> Cloudflare Pages

Backend
    -> Managed application/container hosting

Database
    -> Managed PostgreSQL

Object Storage
    -> Cloudflare R2

DNS/CDN/SSL
    -> Cloudflare
```

This minimizes infrastructure management for the initial 100–500-user workload.

---

# 55. Production Database Requirements

Managed PostgreSQL should provide, where supported:

- Automated backups
- Recovery capability
- SSL
- Monitoring
- Persistent storage
- Connection management

The application must use connection pooling.

---

# 56. Performance Requirements

The initial system shall prioritize:

- Efficient queries
- Pagination
- Database indexing
- CDN delivery
- Optimized images
- Connection pooling
- Lazy loading where appropriate
- DTO-based API responses
- Avoiding N+1 database queries

---

# 57. Pagination

Pagination shall be used for potentially large collections:

- Blogs
- Comments
- Jobs
- Documents
- Courses

Example:

```text
GET /api/v1/blogs?page=0&size=20
```

---

# 58. Database Indexing

Important candidate indexes:

```text
blog.status
blog.slug
blog.created_at

comment.blog_id
comment.parent_comment_id

job.status
job.slug

blog_like.blog_id
blog_like.user_id
```

Indexes shall be validated against actual query patterns.

---

# 59. API Performance

Avoid returning unnecessary fields.

Use:

- DTOs
- Pagination
- Projections where useful
- Proper fetch strategies
- Query optimization

Avoid exposing JPA entities directly from REST controllers.

---

# 60. Production Deployment Strategy

The first production deployment should happen after the minimal Blog vertical slice works.

Target:

```text
React
   |
Cloudflare Pages
   |
codeclassic.com

Spring Boot
   |
api.codeclassic.com

PostgreSQL
   |
Managed database

R2
   |
Object storage
```

The deployment should use the real domain and HTTPS.

---

# 61. Incremental Development Roadmap

The implementation shall follow vertical slices.

## Stage 0 — Foundation

Build:

- GitHub repository
- Backend project
- Frontend project
- PostgreSQL
- Docker
- Flyway
- Basic CI/CD
- Logging
- Actuator
- Cloudflare setup

Success:

```text
React -> Spring Boot -> PostgreSQL
```

works locally.

---

# 62. Stage 1 — Minimal Blog Backend

Implement:

- Blog entity
- Category
- Tag
- Create
- Read
- Update
- Delete

APIs:

```text
POST /api/v1/blogs
GET /api/v1/blogs
GET /api/v1/blogs/{id}
PUT /api/v1/blogs/{id}
DELETE /api/v1/blogs/{id}
```

Authentication may initially use a development identity mechanism.

---

# 63. Stage 2 — Minimal Blog Frontend

Implement:

- Home
- Blog list
- Blog detail
- Create Blog
- Edit Blog

The frontend must consume the real Spring Boot APIs.

Success:

```text
Browser
  |
React
  |
Spring Boot
  |
PostgreSQL
```

---

# 64. Stage 3 — First Production Deployment

Deploy the minimal working application.

Validate:

- Domain
- HTTPS
- Frontend
- Backend
- Database
- Logs
- Health checks
- CI/CD
- Production configuration

The objective is to validate the real production infrastructure before implementing the full product.

---

# 65. Stage 4 — Authentication

Implement:

- Google SSO
- User persistence
- Roles
- Spring Security
- Protected APIs
- Authenticated frontend state

Roles:

```text
USER
ADMIN
```

---

# 66. Stage 5 — Complete Blog

Implement:

- Drafts
- Approval
- Rejection
- Resubmission
- Publishing
- Editing
- Images
- Cloudflare R2
- Likes
- Comments
- Nested replies
- Share button
- Stable share URLs
- Access levels

---

# 67. Stage 5 Parallel — Admin Blog

Implement in parallel:

- Admin blog list
- Pending approval queue
- Blog review
- Approve
- Reject
- Rejection reason
- Edit
- Publish
- Comment moderation

---

# 68. Stage 6 — Jobs

Implement:

- Job entity
- Company
- Skills
- Experience
- External URL
- Job status
- Job detail page
- Share Job
- Authentication restriction

Admin:

- Create
- Edit
- Publish
- Unpublish
- Close
- Delete

---

# 69. Stage 6 Parallel — Admin Jobs

Build:

```text
Admin Jobs
    |
    +-- List
    +-- Create
    +-- Edit
    +-- Publish
    +-- Unpublish
    +-- Close
    +-- Delete
```

---

# 70. Stage 7 — Courses / YouTube

Implement:

```text
Course
   |
   +-- Section
          |
          +-- YouTube Video
```

Admin:

- Create course
- Edit course
- Create section
- Reorder sections
- Add YouTube videos
- Reorder videos
- Publish

User:

- Browse courses
- Open sections
- Watch YouTube videos

---

# 71. Stage 8 — Documents

Implement:

- Document metadata
- R2 integration
- Upload
- File validation
- Access level
- Document listing
- Document viewing
- Admin document management

---

# 72. Parallel Admin Development

Admin development shall follow each user-facing domain:

```text
Authentication
    |
    +-- Admin authentication

Blog
    |
    +-- Admin blog management

Jobs
    |
    +-- Admin job management

Courses
    |
    +-- Admin course management

Documents
    |
    +-- Admin document management

Comments
    |
    +-- Admin moderation
```

---

# 73. Git Repository

Initial repository:

```text
code-classic/
├── backend/
├── frontend/
├── infrastructure/
├── docs/
├── .github/
│   └── workflows/
├── docker-compose.yml
├── README.md
└── .gitignore
```

Future service extraction:

```text
code-classic/
├── services/
│   ├── identity-service/
│   ├── blog-service/
│   ├── job-service/
│   ├── document-service/
│   └── learning-service/
├── frontend/
├── infrastructure/
└── docs/
```

---

# 74. Local Development

Local architecture:

```text
React
  |
  v
Spring Boot
  |
  v
PostgreSQL Docker Container
```

Docker Compose should initially provide PostgreSQL.

Redis, Kafka, and other infrastructure should only be added when required.

---

# 75. Production Monitoring

Minimum monitoring:

- Application uptime
- HTTP 5xx rate
- Response latency
- CPU
- Memory
- Database availability
- Database connections
- R2 failures
- Authentication failures

Potential alerts:

```text
Application unavailable
Database unavailable
High 5xx rate
High response latency
Storage failures
```

---

# 76. Disaster Recovery

Minimum requirements:

- Managed PostgreSQL backup
- R2 durable storage
- Git source control
- Infrastructure configuration in source control
- Secure backup of production configuration
- Recovery procedure documentation

---

# 77. Documentation Structure

Repository documentation:

```text
docs/
├── architecture/
│   ├── system-architecture.md
│   ├── backend-architecture.md
│   ├── frontend-architecture.md
│   └── security.md
│
├── api/
│
├── database/
│   └── database-design.md
│
├── deployment/
│   └── production-deployment.md
│
├── decisions/
│   ├── ADR-001-modular-monolith.md
│   ├── ADR-002-postgresql.md
│   ├── ADR-003-cloudflare-r2.md
│   └── ADR-004-google-sso.md
│
└── BRD/
    └── Code-Classic-BRD.md
```

---

# 78. Architecture Decision Records

Important decisions should be documented.

## ADR-001 — Modular Monolith

Decision:

Use a modular monolith initially.

Reason:

- 100–500 users
- Lower infrastructure cost
- Faster development
- Lower operational complexity
- Clear future extraction path

## ADR-002 — PostgreSQL

Decision:

Use PostgreSQL.

Reason:

- Relational domain model
- Strong constraints
- Excellent Spring/JPA support
- Mature production ecosystem

## ADR-003 — Cloudflare R2

Decision:

Use Cloudflare R2 for object storage.

Reason:

- Suitable for application files
- Low operational overhead
- Appropriate for blog images and documents
- Avoids storing binary files in PostgreSQL

## ADR-004 — Google SSO

Decision:

Use Google SSO initially.

Reason:

Matches the business requirement for the initial authentication mechanism.

---

# 79. Microservice Extraction Criteria

A module should only become an independent microservice when one or more of these conditions exist:

1. It needs independent scaling.
2. It has a clear data boundary.
3. It has an independent deployment lifecycle.
4. It has different reliability requirements.
5. It creates meaningful operational isolation.
6. The benefits outweigh distributed-system complexity.

---

# 80. Potential Future Service Boundaries

Possible future services:

```text
Identity Service
Blog Service
Comment Service
Job Service
Document Service
Learning Service
Notification Service
Search Service
Analytics Service
Moderation Service
```

These are architectural candidates, not immediate implementation requirements.

---

# 81. Event-Driven Future

Future domain events may include:

```text
BlogPublishedEvent
BlogRejectedEvent
CommentCreatedEvent
JobPublishedEvent
DocumentUploadedEvent
CoursePublishedEvent
```

Potential consumers:

```text
Notification
Analytics
Search
Moderation
Recommendations
```

Kafka or another broker may be introduced later.

---

# 82. Scalability Strategy

Initial:

```text
One backend instance
One managed PostgreSQL
Cloudflare CDN
Cloudflare R2
```

If traffic grows:

```text
Increase backend resources
       |
       v
Database optimization
       |
       v
Redis where needed
       |
       v
Multiple backend instances
       |
       v
Load balancing
       |
       v
Service extraction
```

Scale only according to measured requirements.

---

# 83. Performance Optimization Sequence

Optimization should follow:

```text
Measure
  |
  v
Identify bottleneck
  |
  v
Optimize SQL / indexes
  |
  v
Optimize application
  |
  v
Cache where useful
  |
  v
Scale infrastructure
  |
  v
Extract service if justified
```

Do not introduce infrastructure before measuring the problem.

---

# 84. Production Readiness Checklist

Before the first production release:

### Backend

- [ ] Production profile
- [ ] Database migration
- [ ] Error handling
- [ ] Validation
- [ ] Security
- [ ] Health endpoint
- [ ] Logging
- [ ] API documentation
- [ ] Unit tests
- [ ] Integration tests
- [ ] Docker image

### Frontend

- [ ] Production build
- [ ] API configuration
- [ ] Error handling
- [ ] Loading states
- [ ] Responsive UI
- [ ] Authentication handling

### Infrastructure

- [ ] Domain
- [ ] DNS
- [ ] HTTPS
- [ ] PostgreSQL
- [ ] R2
- [ ] Environment variables
- [ ] Backups
- [ ] CI/CD
- [ ] Monitoring

---

# 85. Definition of Done — Backend Feature

A backend feature is complete when:

- [ ] Entity/model implemented
- [ ] Database migration created
- [ ] Repository implemented
- [ ] Business service implemented
- [ ] Validation implemented
- [ ] Authorization implemented
- [ ] Controller/API implemented
- [ ] Error handling implemented
- [ ] Unit tests implemented
- [ ] Integration tests implemented where required
- [ ] API documentation updated
- [ ] Logging added where appropriate
- [ ] Code review completed
- [ ] CI passes

---

# 86. Definition of Done — Frontend Feature

A frontend feature is complete when:

- [ ] Route implemented
- [ ] API integration implemented
- [ ] Loading state implemented
- [ ] Error state implemented
- [ ] Validation implemented
- [ ] Authorization/UI visibility implemented
- [ ] Responsive layout implemented
- [ ] Component tests implemented where appropriate
- [ ] E2E test added for critical flow
- [ ] Production build succeeds

---

# 87. Definition of Done — Production Deployment

A release is complete when:

- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Database migration successful
- [ ] Environment variables configured
- [ ] HTTPS verified
- [ ] Health checks successful
- [ ] Logs visible
- [ ] Basic user journey verified
- [ ] Rollback procedure known
- [ ] Backup verified

---

# 88. Recommended Initial Application Scope

The first working production release should be intentionally small:

```text
Home
  |
Blogs
  |
Blog Detail
  |
Create Blog
  |
Edit Blog
```

Backend:

```text
Blog
Category
Tag
```

Infrastructure:

```text
React
Spring Boot
PostgreSQL
Cloudflare
GitHub Actions
```

This gives the project a complete vertical slice before adding authentication and the remaining modules.

---

# 89. Complete Implementation Journey

```text
                         FOUNDATION
                             |
                             v
                   Minimal Blog Backend
                             |
                             v
                   Minimal Blog Frontend
                             |
                             v
                    LIVE PRODUCTION
                             |
                             v
                        GOOGLE SSO
                             |
                             v
                  +----------+----------+
                  |                     |
                  v                     v
            Complete Blog          Admin Blog
                  |                     |
                  +----------+----------+
                             |
                             v
                            JOBS
                             |
                  +----------+----------+
                  |                     |
                  v                     v
              User Jobs            Admin Jobs
                             |
                             v
                       COURSES/YOUTUBE
                             |
                  +----------+----------+
                  |                     |
                  v                     v
             User Learning        Admin Learning
                             |
                             v
                         DOCUMENTS
                             |
                  +----------+----------+
                  |                     |
                  v                     v
             User Documents       Admin Documents
                             |
                             v
                    PRODUCTION HARDENING
                             |
                             v
                     SCALE AS NEEDED
                             |
                             v
                  EXTRACT MICROSERVICES
                  WHEN JUSTIFIED
```

---

# 90. Final Technical Architecture

The recommended final direction is:

```text
                         Cloudflare
                  DNS / CDN / HTTPS / Security
                              |
              +---------------+---------------+
              |                               |
              v                               v
       Cloudflare Pages                Spring Boot
            React                    Modular Backend
                                            |
                +---------------------------+-------------------------+
                |             |             |            |             |
                v             v             v            v             v
             Identity       Blog         Comments       Jobs       Learning
                |             |             |            |             |
                +-------------+-------------+------------+-------------+
                                            |
                                      PostgreSQL
                                            |
                                      Cloudflare R2
                                            |
                                  Images / Documents
```

Future:

```text
                     API Gateway
                          |
       +------------------+------------------+
       |                  |                  |
       v                  v                  v
 Identity Service    Blog Service       Job Service
       |                  |
       |             Comment Service
       |
       +------------------+------------------+
                          |
                 +--------+--------+
                 |                 |
                 v                 v
          Document Service   Learning Service
                                    |
                                    v
                            Notification Service
```

---

# 91. Final Technology Decision

| Area | Decision |
|---|---|
| Backend | Java + Spring Boot |
| Frontend | React + TypeScript |
| Initial architecture | Modular Monolith |
| Future architecture | Microservices |
| Database | PostgreSQL |
| ORM | Hibernate / Spring Data JPA |
| Migration | Flyway |
| Authentication | Google SSO |
| Security | Spring Security |
| API | REST + OpenAPI |
| Object storage | Cloudflare R2 |
| Frontend hosting | Cloudflare Pages |
| Backend hosting | Managed application/container hosting |
| DNS/CDN | Cloudflare |
| CI/CD | GitHub Actions |
| Containerization | Docker |
| Logging | SLF4J + Logback |
| Metrics | Micrometer |
| Tracing | OpenTelemetry |
| Testing | JUnit + Mockito + Testcontainers + Vitest + Playwright |
| Code quality | Sonar/SonarCloud |
| Search initially | PostgreSQL |
| Cache initially | No Redis |
| Messaging initially | No Kafka |
| API Gateway initially | No dedicated gateway |
| Kubernetes initially | No |
| File storage | Cloudflare R2 |

---

# 92. Architectural Guiding Principle

The project should follow:

```text
BUILD SMALL
    ↓
MAKE IT WORK
    ↓
DEPLOY IT
    ↓
MEASURE IT
    ↓
IMPROVE IT
    ↓
SCALE IT
    ↓
EXTRACT SERVICES WHEN JUSTIFIED
```

The goal is not to build the largest architecture on day one.

The goal is to build a **production-quality application that can grow into a microservice platform without requiring a rewrite**.
