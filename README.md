# Code Classic

Code Classic is a developer knowledge-sharing platform for technical articles, tutorials, and related YouTube learning content.

## Phase 1

Phase 1 delivers a responsive public blog and administrator-managed publishing:

- Visitors can browse categories and read published blog posts without signing in.
- Blog articles support formatted Markdown content and YouTube video embeds.
- Registered users can create an account with email and password, verify their email, sign in with email/password or a Google account that Firebase reports as verified, reset a password, and view a basic profile.
- Administrators can create and edit blog posts, save drafts, publish and unpublish posts, and delete posts after explicit confirmation.
- The Q&A navigation entry is shown as a **Coming Soon** placeholder only. Phase 1 does not include questions, answers, comments, or submissions.

Phase 1 explicitly excludes user-generated blogs, functional Q&A, likes, comments, courses, document management, job management, notifications, and advanced analytics.

## Planned technology baseline

The project planning documents specify this Phase 1 stack:

- React with JavaScript and Vite
- Bootstrap 5 and React Router
- Firebase Authentication
- Cloud Firestore with Firestore Security Rules
- Git and GitHub
- Cloudflare Pages
- YouTube embeds

The intended architecture is a simple React application using Firebase as a backend-as-a-service. A custom backend, Spring Boot, microservices, an API Gateway, and Firebase Storage are not part of the Phase 1 baseline. Administrator privileges must be assigned through a trusted process; client-editable profile data must never grant admin access.

## Development roadmap

The Business Requirements Document (BRD), Technical Design Document (TDD), and Front-End UI Design Specification are the baseline source of truth for Phase 1 functionality and technical/design decisions. The master execution plan sequences implementation of **BRD Phase 1 only** into ten learning sessions grouped into four execution phases:

1. Frontend foundation — Sessions 1–4
2. Firebase and authentication — Sessions 5–6
3. Blog management and publishing — Sessions 7–9
4. Deployment and completion — Session 10

These are execution groupings within product Phase 1, not additional BRD product-release phases.

See [`docs/initial-project-docs/`](docs/initial-project-docs/) for the requirements, technical and UI baselines, session plan, visual reference, and presentations. See [`docs/report/phase-1-session-report.md`](docs/report/phase-1-session-report.md) for the visual milestone roadmap and current session status.

## Current repository status

This branch currently contains the project README and planning documents; application code, dependency manifests, tests, and build configuration have not yet been added.
`