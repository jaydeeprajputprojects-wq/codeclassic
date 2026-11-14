# Code Classic Learning Library

Beginner-friendly lessons and practice questions follow the ten sessions in the Phase 1 master execution plan. The material assumes no prior coding experience and uses plain English with short Hindi-friendly glosses and everyday analogies where useful.

## How to use this library

1. Open the theory guide for the session you are working on.
2. Read one concept at a time; follow along in VS Code when the guide points to a file.
3. Try the practice activity yourself before looking at the answer.
4. Use the matching Q&A file to check your understanding.
5. Treat examples labeled **Illustrative** as teaching examples, not necessarily code already present in the application.

The local Vite development server was reported as running by the project owner on 2026-11-15, but a check of `http://localhost:5173` could not connect at that time. The guides do not assume that a server is currently running.

## Session map

| Session | Topic | Theory | Questions and answers | Planned phase |
|---|---|---|---|---|
| 01 | Environment, React, JavaScript, and ESLint | [Theory](theory/session-01-environment-react-eslint/theory.md) | [Q&A](que%26ans/session-01-environment-react-eslint/questions-and-answers.md) | Frontend foundation |
| 02 | Bootstrap, routing, and shared layout | [Theory](theory/session-02-layout-routing-bootstrap/theory.md) | [Q&A](que%26ans/session-02-layout-routing-bootstrap/questions-and-answers.md) | Frontend foundation |
| 03 | Homepage layout and responsive UI | [Theory](theory/session-03-homepage-responsive-ui/theory.md) | [Q&A](que%26ans/session-03-homepage-responsive-ui/questions-and-answers.md) | Frontend foundation |
| 04 | Blog listing, detail, Markdown, and video | [Theory](theory/session-04-blog-list-detail/theory.md) | [Q&A](que%26ans/session-04-blog-list-detail/questions-and-answers.md) | Frontend foundation |
| 05 | Firebase authentication | [Theory](theory/session-05-firebase-authentication/theory.md) | [Q&A](que%26ans/session-05-firebase-authentication/questions-and-answers.md) | Firebase and authentication |
| 06 | Profiles, Firestore, and security | [Theory](theory/session-06-profiles-security-firestore/theory.md) | [Q&A](que%26ans/session-06-profiles-security-firestore/questions-and-answers.md) | Firebase and authentication |
| 07 | Admin dashboard and access control | [Theory](theory/session-07-admin-dashboard/theory.md) | [Q&A](que%26ans/session-07-admin-dashboard/questions-and-answers.md) | Blog management |
| 08 | Blog forms, editing, and drafts | [Theory](theory/session-08-blog-authoring-drafts/theory.md) | [Q&A](que%26ans/session-08-blog-authoring-drafts/questions-and-answers.md) | Blog management |
| 09 | Publishing and public integration | [Theory](theory/session-09-publishing-integration/theory.md) | [Q&A](que%26ans/session-09-publishing-integration/questions-and-answers.md) | Blog management |
| 10 | Build, deployment, and production checks | [Theory](theory/session-10-deployment-testing/theory.md) | [Q&A](que%26ans/session-10-deployment-testing/questions-and-answers.md) | Deployment |

## Technology scope

The project's baseline uses React with JavaScript and Vite, Bootstrap 5, React Router, Firebase Authentication, Cloud Firestore and Security Rules, Git/GitHub, Cloudflare Pages, and YouTube embeds. ESLint is present in the current Vite starter configuration and is explained as a code-quality tool.

**Vue note:** Vue is an alternative frontend framework, not part of the current Code Classic baseline or package dependencies. Session 1 includes a short comparison to help a beginner distinguish React and Vue; learn Vue as project technology only if the baseline is explicitly changed.

## Status and source policy

The learning material teaches planned concepts but does not mean the corresponding application milestone is complete. Each lesson distinguishes the current starter files from future roadmap work. The BRD, TDD, and UI design specification define Phase 1 baseline requirements; the master execution plan organizes that work into ten sessions.

Invoke the **Project Learning Content** agent when asking to create or update these lessons and Q&A. It should inspect current project files and the manual-change notes before making changes.
