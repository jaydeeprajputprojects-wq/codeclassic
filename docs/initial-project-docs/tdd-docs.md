# CODE CLASSIC
# Technical Design Document (TDD)

**Document Version:** 1.0  
**Document Status:** Phase 1 Technical Baseline / Source of Truth  
**Project:** Code Classic  
**Architecture Type:** Monolithic Frontend Application  
**Frontend:** React + JavaScript  
**Database:** Firebase Cloud Firestore  
**Authentication:** Firebase Authentication  
**Hosting:** Cloudflare Pages  
**Source Control:** GitHub

This TDD, together with the BRD and Front-End UI Design Specification, is the source of truth for Phase 1 technical and functional decisions. The master execution plan sequences implementation of BRD Phase 1 only.

---

# 1. Technical Overview

## 1.1 Purpose

This document defines the technical architecture, technology choices, database design, authentication implementation, application structure, security approach, deployment strategy and future modernization roadmap for Code Classic.

The initial implementation will deliberately use a straightforward monolithic design.

The primary objective is to create a functional application without introducing unnecessary architectural complexity.

The application will be developed, deployed, used and subsequently improved.

## 1.2 Technical Philosophy

The project will follow a progressive engineering approach:

**Version 1: Functional Implementation**

- Simple monolithic architecture.
- Straightforward React components.
- Direct Firebase SDK integration.
- Basic state management.
- Basic data retrieval.
- Minimal abstraction.
- Working functionality.

**Version 2: Modernization**

- Better component organization.
- Improved data access.
- Query optimization.
- Pagination.
- Caching.
- Better state management.
- Improved testing.
- Improved security and observability.

The objective is to demonstrate the practical difference between an initial working implementation and an improved production-oriented implementation.

## 1.3 Important Engineering Boundary

The initial application can have simple code and limited optimization.

However, the following must never be intentionally compromised:

- Authentication security.
- Database authorization.
- Admin privilege protection.
- User data confidentiality.
- Data integrity.
- Protection against unauthorized writes.

A simple architecture does not mean an insecure application.

---

# 2. Architecture Decisions

## 2.1 Selected Architecture

**Monolithic React Application with Firebase Backend-as-a-Service.**

There will be:

- One React application.
- One GitHub repository.
- One Cloudflare Pages deployment.
- One Firebase project.
- One Firestore database.
- One authentication system.

There will be no separate backend application or microservices in Phase 1.

## 2.2 High-Level Architecture

```text
                PUBLIC VISITORS
                REGISTERED USERS
                ADMINISTRATOR
                       |
                       v
                WEB BROWSER
                       |
                       v
              CLOUDFLARE PAGES
                       |
                       v
               REACT APPLICATION
                       |
              +--------+--------+
              |                 |
              v                 v
          React Router     React Components
              |                 |
              +--------+--------+
                       |
                       v
              FIREBASE JAVASCRIPT SDK
                       |
              +--------+--------+
              |                 |
              v                 v
       FIREBASE AUTH       CLOUD FIRESTORE
              |                 |
              |           SECURITY RULES
              |                 |
              +-----------------+
                       |
                 APPLICATION DATA

              YOUTUBE EMBEDDING
                       |
                 VIDEO PLAYBACK
```

## 2.3 Architecture Explanation

### Presentation

React will render all website pages.

### Application Logic

JavaScript will handle:

- Login.
- Registration.
- Logout.
- Post creation.
- Post editing.
- Post deletion.
- Publication status.
- Data retrieval.

### Data Layer

Firebase JavaScript SDK will communicate directly with Firebase Authentication and Firestore.

### Authorization

Firestore Security Rules will enforce database access permissions.

React route guards will control navigation but will not be treated as the primary security mechanism.

---

# 3. Technology Selection and Justification

## 3.1 React.js

**Purpose:** Frontend application development.

Reason for selection:

- Component-based development.
- Suitable for dynamic content.
- Large ecosystem.
- Easy Firebase integration.
- Supports future modularization.
- Suitable for single-page applications.

The initial implementation will use functional components and React Hooks.

Advanced state-management libraries will not be introduced initially.

## 3.2 JavaScript

JavaScript will be used for all application logic.

TypeScript is not required in the initial version because the project is intentionally starting with a simple development setup.

TypeScript can be evaluated during modernization.

## 3.3 Vite

Vite will be used as the React build tool.

Reasons:

- Simple setup.
- Fast local development.
- Straightforward production build.
- Easy Cloudflare Pages integration.

## 3.4 Bootstrap 5

Bootstrap 5 will be used for styling.

Reasons:

- Responsive layout support.
- Ready-to-use UI components.
- Minimal additional setup.
- Suitable for mobile and desktop.
- Easy to understand and modify.

The initial design will prioritize usability rather than a complex custom design system.

## 3.5 React Router

React Router will manage navigation.

Proposed routes:

```text
/
 /blogs
 /blogs/:slug
 /login
 /register
 /verify-email
 /reset-password
 /profile

 /admin
 /admin/posts
 /admin/posts/create
 /admin/posts/edit/:id
```

## 3.6 Firebase Authentication

Firebase Authentication will manage user identities.

Supported methods:

- Google Sign-In.
- Email and Password.

Responsibilities:

- Registration.
- Login.
- Logout.
- Password reset.
- Email verification.
- Authentication session management.

Email/password registration must send a Firebase verification email. An email/password user remains in an unverified state until the verification link is completed; only public content and verification/resend actions are available before verification. Google sign-in is treated as verified only when Firebase's provider account reports `emailVerified`/the ID token's `email_verified` claim as true. Password reset is a required user flow using Firebase Authentication's password-reset email.

## 3.7 Cloud Firestore

Firestore will store:

- User profile information.
- Blog posts.
- Categories and tags as post metadata.

The initial database will contain only the collections required for Phase 1.

## 3.8 Cloudflare Pages

Cloudflare Pages will host the React production build.

Reasons:

- Static website hosting.
- GitHub integration.
- Automatic deployments.
- Free platform subdomain.
- No separate server administration.

## 3.9 GitHub

GitHub will manage:

- Source code.
- Version history.
- Branches.
- Pull requests.
- Development changes.

---

# 4. Phase 1 Technical Scope

Phase 1 will implement the public blog, verified user authentication (including email verification and password reset), administrator blog management (including confirmed deletion), and a non-functional Q&A Coming Soon placeholder. No question/answer data or user participation is implemented in Phase 1.

## 4.1 Modules

| Module | Functionality |
|---|---|
| Home | Public landing page |
| Blog Listing | Display published posts |
| Blog Details | Display individual article |
| Q&A Placeholder | Coming Soon page/panel only |
| Authentication | Login and registration |
| User Profile | Basic account information |
| Admin Dashboard | Administrative interface |
| Post Management | Create, edit, draft, publish, unpublish and confirmed-delete posts |

## 4.2 Public Pages

### Home Page

Responsibilities:

- Introduce Code Classic.
- Display recent published blogs.
- Provide navigation to tutorials.
- Provide login access.

### Blog Listing

Responsibilities:

- Retrieve published posts.
- Display post title.
- Display description.
- Display thumbnail where available.
- Display category.
- Provide article navigation.

### Blog Details

Responsibilities:

- Display full article content.
- Display embedded YouTube video.
- Display code snippets.
- Display article metadata.

### Login Page

Responsibilities:

- Google login.
- Email/password login.
- Password reset navigation.

### Registration Page

Responsibilities:

- Register new user.
- Validate email/password.
- Create authentication account.
- Send a verification email and show a pending-verification state.
- Initialize the user profile only after email verification.

### Login and password reset

The login page provides email/password and Google sign-in, and a password-reset request path. Email/password accounts cannot access authenticated pages or profile data until Firebase confirms email verification. Google sign-in can continue only when Firebase confirms the provider email is verified. Reset confirmation must not disclose whether the submitted address has an account.

## 4.3 Admin Pages

### Admin Dashboard

Responsibilities:

- Display basic post information.
- Navigate to post creation.
- Navigate to post management.

### Post Management

Responsibilities:

- List existing posts.
- Create new posts.
- Edit posts.
- Delete posts after explicit confirmation.
- Publish posts.
- Unpublish posts.

The delete action is available only to admins, asks for confirmation before the destructive operation, and reports success only after Firestore confirms deletion. Security Rules deny delete requests from public and ordinary users.

---

# 5. Authentication Design

## 5.1 Authentication Providers

Two authentication methods will be configured.

**Google Provider**

Users can authenticate using their Google account.

**Email/Password Provider**

Users can register and log in using an email address and password.

## 5.2 User Registration Flow

```text
User Opens Registration
          |
          v
Enters Email and Password
          |
          v
Firebase Authentication
          |
          v
Account Created
          |
          v
Send Verification Email
          |
          v
Pending Verification Screen
          |
          v
User Opens Verification Link
          |
          v
Reload / Confirm Verified State
          |
          v
User Profile Created
          |
          v
Normal User Access
```

Do not grant authenticated application access before email verification. After email verification, refresh/reload the Firebase user state and ID token before checking access. Google profile initialization and authenticated access are permitted only if Firebase reports a verified provider email.

### Password reset flow

The login screen must provide a password-reset path. The user submits the account email address; the client calls Firebase Authentication's password-reset email operation, presents a generic confirmation that does not disclose whether the account exists, and reports actionable errors without exposing sensitive data. Test the email link and resulting ability to sign in with the new password.

## 5.3 Admin Authorization

Administrator privileges will be implemented using Firebase Authentication custom claims.

Example claim:

```json
{
  "admin": true
}
```

A trusted Firebase Admin SDK environment will assign this claim.

The React application will retrieve the authenticated user's ID token and inspect its claims. Admin routes and Firestore administrator operations require both the trusted admin claim and a verified email. Email verification does not itself grant administrator privileges.

Admin access will not be granted through:

- Registration form selection.
- Editable profile fields.
- Local storage.
- Client-side role assignment.

## 5.4 Authentication States

The application will support:

- Loading.
- Authenticated.
- Unauthenticated.
- Authenticated but email-unverified.
- Administrator.
- Normal user.

React Context can be used for the initial authentication state. The unverified state must route to a verification/resend screen instead of exposing profile or admin functionality.

No Redux implementation is required in Phase 1.

---

# 6. Database Design

## 6.1 Database Overview

Database: Cloud Firestore

Initial collections:

```text
codeclassic/
│
├── users/
│   └── {userId}
│
└── posts/
    └── {postId}
```

Only two collections are required for the initial release.

## 6.2 Users Collection

Document path:

`users/{userId}`

Example:

```json
{
  "displayName": "John Doe",
  "photoURL": "PROFILE_IMAGE_URL",
  "createdAt": "SERVER_TIMESTAMP",
  "updatedAt": "SERVER_TIMESTAMP"
}
```

The document ID will be the Firebase Authentication UID.

The email address and provider details will remain available through Firebase Authentication.

Administrative role information will remain in custom claims.

## 6.3 Posts Collection

Document path:

`posts/{postId}`

Example:

```json
{
  "title": "Understanding Java 8 Streams",
  "slug": "understanding-java-8-streams",
  "description": "Learn Java 8 Stream API internals.",
  "content": "# Java 8 Streams\n\nTutorial content...",
  "category": "Java",
  "tags": [
    "Java",
    "Java 8",
    "Streams"
  ],
  "youtubeVideoId": "YOUTUBE_VIDEO_ID",
  "thumbnailUrl": null,
  "status": "PUBLISHED",
  "createdBy": "ADMIN_UID",
  "createdAt": "SERVER_TIMESTAMP",
  "updatedAt": "SERVER_TIMESTAMP"
}
```

## 6.4 Post Status

Two statuses will be supported:

| Status | Description |
|---|---|
| DRAFT | Private content |
| PUBLISHED | Public content |

Only published posts will be accessible to unauthenticated visitors.

## 6.5 Database Relationship

```text
Firebase Authentication
          |
          |
        User
          |
          | creates
          |
        Posts
```

A single administrator can create multiple blog posts.

Normal users will not have content creation permissions.

## 6.6 Data Retrieval Strategy

For the initial implementation:

- Retrieve published posts from Firestore.
- Retrieve individual posts using document IDs or slugs.
- Retrieve all posts for the admin dashboard.
- Filter draft posts for administrative access.

The initial implementation may retrieve more records than necessary for demonstration purposes.

However, all queries must still respect access permissions.

During modernization, implement pagination, query limits, indexes and caching based on observed requirements.

---

# 7. Security Design

## 7.1 Security Principles

Security must be implemented from the beginning.

The application will use:

- Firebase Authentication.
- Firebase custom claims.
- Firestore Security Rules.
- Input validation.
- Restricted document access.
- Secure admin provisioning.

## 7.2 Access Control Matrix

| Operation | Public | User | Admin |
|---|---|---|---|
| Read published posts | Yes | Yes | Yes |
| Read draft posts | No | No | Yes |
| Create posts | No | No | Yes |
| Edit posts | No | No | Yes |
| Delete posts | No | No | Yes |
| Publish posts | No | No | Yes |
| Read own profile | No | Yes | Yes |
| Modify own allowed profile fields | No | Yes | Yes |

The User column above means a verified authenticated user. Unverified email/password accounts cannot read or write private profiles or perform administrator operations. Google accounts must also present Firebase's verified-email claim. Public users may still read published posts without signing in.

## 7.3 Firestore Security Rules

Proposed Phase 1 baseline:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function signedIn() {
      return request.auth != null;
    }

    function verifiedUser() {
      return signedIn()
        && request.auth.token.email_verified == true;
    }

    function isAdmin() {
      return verifiedUser()
        && request.auth.token.admin == true;
    }

    function validText(value, maxLength) {
      return value is string
        && value.size() > 0
        && value.size() <= maxLength;
    }

    // User profile

    match /users/{userId} {

      allow read: if verifiedUser()
        && (
          request.auth.uid == userId
          || isAdmin()
        );

      allow create: if verifiedUser()
        && request.auth.uid == userId
        && request.resource.data.keys().hasOnly([
          'displayName',
          'photoURL',
          'createdAt',
          'updatedAt'
        ])
        && validText(
          request.resource.data.displayName, 80
        )
        && request.resource.data.createdAt == request.time
        && request.resource.data.updatedAt == request.time;

      allow update: if verifiedUser()
        && request.auth.uid == userId
        && request.resource.data.diff(resource.data)
          .affectedKeys()
          .hasOnly([
            'displayName',
            'photoURL',
            'updatedAt'
          ])
        && validText(
          request.resource.data.displayName, 80
        )
        && request.resource.data.updatedAt == request.time;

      allow delete: if false;
    }

    // Blog posts

    match /posts/{postId} {

      allow read: if isAdmin()
        || resource.data.status == 'PUBLISHED';

      allow create: if isAdmin()
        && request.resource.data.keys().hasOnly([
          'title',
          'slug',
          'description',
          'content',
          'category',
          'tags',
          'youtubeVideoId',
          'thumbnailUrl',
          'status',
          'createdBy',
          'createdAt',
          'updatedAt'
        ])
        && validText(request.resource.data.title, 200)
        && validText(request.resource.data.slug, 200)
        && validText(request.resource.data.description, 1000)
        && validText(request.resource.data.content, 100000)
        && request.resource.data.createdBy == request.auth.uid
        && request.resource.data.status in [
          'DRAFT',
          'PUBLISHED'
        ]
        && request.resource.data.createdAt == request.time
        && request.resource.data.updatedAt == request.time;

      allow update: if isAdmin()
        && request.resource.data.keys().hasOnly([
          'title',
          'slug',
          'description',
          'content',
          'category',
          'tags',
          'youtubeVideoId',
          'thumbnailUrl',
          'status',
          'createdBy',
          'createdAt',
          'updatedAt'
        ])
        && request.resource.data.createdBy == resource.data.createdBy
        && request.resource.data.createdAt == resource.data.createdAt
        && request.resource.data.status in [
          'DRAFT',
          'PUBLISHED'
        ]
        && validText(request.resource.data.title, 200)
        && validText(request.resource.data.slug, 200)
        && validText(request.resource.data.description, 1000)
        && validText(request.resource.data.content, 100000)
        && request.resource.data.updatedAt == request.time;

      allow delete: if isAdmin();
    }
  }
}
```

These rules are an implementation baseline and require emulator testing before production.

Additional validation should be added for categories, tags, optional fields, YouTube IDs, URLs and allowed content formats.

Public Firestore queries must explicitly request published posts. Firestore Security Rules do not automatically filter unpublished documents out of a query.

Unverified email/password accounts must not read or write user profile documents or perform administrative operations. Public reads of published posts remain available without authentication. Google accounts must have `email_verified == true` in the Firebase Authentication token before accessing authenticated data. Test these cases in the Firebase Emulator Suite where feasible.

Post deletion is a required administrator operation. The UI must require explicit confirmation; Firestore Security Rules must deny deletion by public and ordinary users. The Phase 1 baseline uses hard deletion from the `posts` collection after confirmation; if retention or recovery becomes a requirement, revise the data model and BRD before implementation.

## 7.4 Firebase Configuration Security

The Firebase client configuration will be stored in environment variables.

Example:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Firebase browser configuration is not equivalent to a private service-account credential.

The following must never be exposed in frontend code:

- Firebase service-account private keys.
- Admin SDK credentials.
- Private API credentials.
- Server-side secrets.

## 7.5 App Check

Firebase App Check should be evaluated and configured for the production application to reduce unauthorized automated access.

It is an additional security layer, not a replacement for Firestore Security Rules.

---

# 8. Content Management Design

## 8.1 Content Format

Blog content will be stored using Markdown.

Advantages:

- Easy to maintain.
- Supports headings.
- Supports lists.
- Supports code blocks.
- Suitable for technical articles.
- Can be rendered through a Markdown library.

## 8.2 Blog Editor

The initial editor will support:

- Title.
- Description.
- Category.
- Tags.
- Markdown content.
- YouTube video ID.
- Thumbnail URL.
- Draft and publish actions.
- Administrator-confirmed post deletion from the management interface.

A simple Markdown editor will be used instead of building a complex rich-text editing system.

## 8.3 Code Highlighting

The blog detail page will support syntax highlighting for programming examples.

Initial supported languages may include:

- Java.
- JavaScript.
- SQL.
- JSON.
- Bash.
- XML.

## 8.4 YouTube Integration

Videos will remain hosted on YouTube.

The database will store the YouTube video ID.

The React application will construct the embed URL using the stored ID and render the embedded player.

The application will not upload video files to Firebase.

## 8.5 Content Security

- Do not execute raw HTML stored in blog content.
- Use a safe Markdown renderer.
- Sanitize any rendered HTML.
- Validate external URLs.
- Restrict embedded video providers to trusted sources.

---

# 9. Initial React Application Structure

The initial structure will remain deliberately simple.

```text
code-classic/
│
├── public/
│   ├── favicon.ico
│   └── _redirects
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── PostCard.jsx
│   │
│   ├── App.jsx
│   ├── firebase.js
│   ├── Home.jsx
│   ├── Posts.jsx
│   ├── PostDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── Admin.jsx
│   └── style.css
│
├── .env.example
├── package.json
├── index.html
└── README.md
```

This is an intentionally small monolithic structure.

Components can contain UI and straightforward Firebase operations initially.

As the project grows, responsibilities can be extracted into separate modules.

---

# 10. Phase 1 Application Flow

## 10.1 Public Visitor Flow

```text
Open Website
     |
     v
Home Page
     |
     v
Blog Listing
     |
     v
Select Blog
     |
     v
Read Article
     |
     v
Watch Embedded Video
```

No authentication is required for reading published content.

## 10.2 Normal User Flow

```text
Open Website
     |
     v
Register / Login
     |
     v
Firebase Authentication
     |
     v
Normal User Session
     |
     v
View Profile and Public Blogs
```

Normal users cannot access content management operations.

## 10.3 Administrator Flow

```text
Open Login
     |
     v
Admin Authentication
     |
     v
Verify Custom Claim
     |
     v
Admin Dashboard
     |
     v
Create / Edit Post
     |
     v
Save Draft or Publish
     |
     v
Firestore
     |
     v
Public Website Displays Published Post
```

---

# 11. Development and Deployment

## 11.1 Local Development

Development environment:

- Visual Studio Code.
- Node.js and npm.
- React.
- Vite.
- Firebase JavaScript SDK.
- Git.

Basic setup:

```bash
npm create vite@latest code-classic -- --template react

cd code-classic

npm install

npm install firebase react-router-dom bootstrap

npm run dev
```

Additional packages can be introduced only when required by the actual implementation.

## 11.2 Git Strategy

The initial development strategy will use a small number of branches.

| Branch | Purpose |
|---|---|
| main | Stable production version |
| develop | Active development |
| feature/* | Individual feature development |

Avoid unnecessary branching complexity.

## 11.3 Cloudflare Deployment

Connect the GitHub repository to Cloudflare Pages.

Configuration:

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | npm run build |
| Build output | dist |
| Production branch | main |
| Deployment | Git integration |

For React Router, configure the SPA fallback:

```text
/* /index.html 200
```

Configure Firebase environment variables in the Cloudflare project settings.

## 11.4 Domain

The initial website will use the Cloudflare Pages subdomain.

Example:

`code-classic.pages.dev`

A custom domain can be introduced later without changing the core application architecture.

---

# 12. Phase 1 Testing Strategy

## 12.1 Functional Testing

Test the following:

- User registration.
- Email verification and verified/unverified access states.
- Google login.
- Email/password login.
- Password reset.
- Logout.
- Admin login.
- Admin post creation.
- Admin post editing.
- Admin post deletion.
- Draft publication.
- Post visibility.
- YouTube embedding.

## 12.2 Security Testing

| Scenario | Expected Result |
|---|---|
| Unauthenticated visitor creates post | Denied |
| Normal user creates post | Denied |
| Normal user edits post | Denied |
| Normal user deletes post | Denied |
| Unverified email/password user reads a private profile | Denied |
| Unverified email/password user writes or deletes a post | Denied |
| Google user with verified provider email accesses allowed profile | Allowed |
| Google user without verified provider email accesses authenticated features | Denied |
| Admin creates post | Allowed |
| Admin publishes post | Allowed |
| Admin deletes post | Allowed |
| Public user reads published post | Allowed |
| Public user reads draft post | Denied |
| User changes own role | Denied |
| User accesses another user's private profile | Denied |

## 12.3 Responsive Testing

Test the application on:

- Desktop.
- Tablet.
- Mobile.
- Different browsers.

---

# 13. Phase 2 Technical Evolution

Phase 2 will extend the existing application rather than replacing it.

## 13.1 New Collections

```text
Firestore
│
├── users/
├── posts/
├── questions/
│   └── {questionId}
│
└── answers/
    └── {answerId}
```

## 13.2 Questions Schema

```json
{
  "postId": "POST_ID",
  "title": "Why is HashMap not thread-safe?",
  "description": "Explain the internal behavior.",
  "category": "Java",
  "difficulty": "INTERMEDIATE",
  "published": true,
  "createdBy": "ADMIN_UID",
  "createdAt": "SERVER_TIMESTAMP"
}
```

## 13.3 Answers Schema

```json
{
  "questionId": "QUESTION_ID",
  "userId": "USER_UID",
  "answerText": "HashMap is not thread-safe because...",
  "status": "PENDING",
  "createdAt": "SERVER_TIMESTAMP",
  "updatedAt": "SERVER_TIMESTAMP",
  "reviewedBy": null,
  "reviewedAt": null
}
```

## 13.4 Moderation

Answer statuses:

- PENDING.
- APPROVED.
- REJECTED.

Only the administrator can approve or reject an answer.

Users can manage their own pending submissions.

Security rules will be extended to enforce ownership and moderation restrictions.

---

# 14. Phase 3 Technical Modernization

The modernization process will be driven by measurable technical limitations.

## 14.1 Architecture Modernization

Initial:

```text
React Components
      |
      v
Firebase SDK
      |
      v
Firestore
```

Improved:

```text
React Pages
     |
     v
Reusable Components
     |
     v
Application Logic
     |
     v
Data Access Functions
     |
     v
Firebase SDK
     |
     v
Firestore
```

This is still a monolithic frontend application. It simply has better separation of responsibilities.

## 14.2 Performance Improvements

Potential improvements:

- Firestore pagination.
- Query limits.
- Composite indexes.
- Caching.
- Lazy loading.
- Optimized React rendering.
- Reduced unnecessary state updates.
- Image optimization.
- Reduced network requests.

## 14.3 Code Quality Improvements

- Reusable components.
- Shared validation functions.
- Centralized constants.
- Common error handling.
- Consistent naming conventions.
- Improved testing.
- Better project documentation.

## 14.4 Security Improvements

- Comprehensive Firestore Rules testing.
- Firebase App Check.
- Input validation.
- Secure content rendering.
- Better session handling.
- Abuse protection.
- Security monitoring.

## 14.5 Architecture Evolution

A separate backend may be introduced only if justified.

Potential future options:

- Spring Boot REST API.
- Server-side content processing.
- Dedicated search service.
- Background processing.

Microservices will not be introduced simply for architectural complexity.

---

# 15. Technical Limitations and Known Trade-offs

The initial application intentionally accepts certain limitations.

| Area | Initial Trade-off | Future Improvement |
|---|---|---|
| Architecture | Simple monolith | Better internal modularization |
| Data fetching | Direct Firestore calls | Centralized data access |
| Database reads | Basic fetching | Pagination |
| State management | Local state | Shared state where necessary |
| Components | Limited reuse | Component library |
| Performance | Minimal optimization | Measured optimization |
| Caching | No advanced caching | Appropriate caching |
| SEO | Basic metadata | Improved rendering and indexing |
| Testing | Basic functional tests | Broader automated tests |

These trade-offs will be documented as part of the educational modernization journey.

They do not authorize bypassing security or introducing deliberate data corruption.

---

# 16. Infrastructure and Cost Strategy

## 16.1 Initial Infrastructure

| Service | Technology |
|---|---|
| Frontend hosting | Cloudflare Pages |
| Source control | GitHub |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Video hosting | YouTube |
| Development | Visual Studio Code |

## 16.2 Cost Strategy

The initial project will use free-tier services wherever possible.

The target infrastructure cost is zero at low usage, subject to current provider quotas and service eligibility.

Potential future expenses:

- Custom domain.
- Paid Firebase usage.
- Advanced backend services.
- Third-party APIs.
- External analytics or monitoring.

No paid dependency should be introduced without evaluating its actual necessity.

---

# 17. Technical Risks and Mitigation

| Risk | Technical Mitigation |
|---|---|
| Firestore read consumption | Monitor reads and introduce pagination |
| Unauthorized content modification | Firestore Security Rules |
| Admin privilege compromise | Custom claims and trusted provisioning |
| Excessive document size | Validate content size |
| Poor rendering performance | Markdown rendering and lazy loading |
| SEO limitations | Evaluate static generation or prerendering |
| Firebase dependency | Keep business logic understandable |
| Spam or automated abuse | App Check and validation |
| Deployment routing issues | SPA fallback configuration |

---

# 18. Technical Acceptance Criteria

Phase 1 technical completion requires:

1. React application builds successfully.
2. Firebase Authentication is integrated.
3. Google authentication works.
4. Email/password authentication works.
5. Email/password registration sends a verification email and unverified users cannot use authenticated features.
6. Google sign-in is allowed into authenticated features only when Firebase reports a verified provider email.
7. Password reset email flow works.
8. Admin custom claims are implemented and require a verified account.
9. Firestore database is configured.
10. Security Rules are deployed and deny unverified/private and non-admin operations.
11. Admin can create, edit, publish, unpublish and confirmed-delete posts.
12. Normal users cannot modify or delete posts.
13. Public users can access published posts; draft posts remain private.
14. Q&A, if visible in navigation, displays only a Coming Soon placeholder with no functional interactions.
15. YouTube embedding works.
16. Cloudflare Pages deployment works.
17. GitHub integration works.
18. Security test scenarios pass.
19. The application is usable on mobile and desktop.

---

# 19. Final Technical Architecture Decision

The selected architecture for Phase 1 is:

**React + JavaScript + Vite + Bootstrap + Firebase Authentication + Cloud Firestore + Cloudflare Pages + GitHub.**

The application will use a monolithic architecture without a dedicated backend server.

Firebase will provide managed authentication and database capabilities.

The initial implementation will favor simple, understandable and functional code over premature optimization.

Security will be enforced from the first release.

Future modernization will be performed incrementally based on actual performance, maintainability and business requirements.

**Technical Decision: Phase 1 Technical Baseline / Source of Truth.**

The BRD's three product-release phases remain in effect. The master execution plan divides the ten BRD Phase 1 sessions into four delivery groupings; it does not extend the product scope beyond BRD Phase 1.

---

# 20. Project Development Principle

Code Classic is not intended to demonstrate only the final optimized implementation.

It is intended to demonstrate how a real application evolves.

The initial version will establish working functionality.

Subsequent versions will identify limitations, introduce improvements and document the engineering decisions behind those improvements.

This approach will allow Code Classic to serve both as a working developer blog and as a practical case study in software engineering.

**Build First. Understand the Bottlenecks. Improve with Evidence. Explain the Difference.**

---

**End of Technical Design Document**