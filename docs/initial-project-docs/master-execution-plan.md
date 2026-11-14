# MASTER PROMPT: CODE CLASSIC – PHASE 1 DEVELOPMENT EXECUTION PLAN

## Planning baseline and scope authority

The BRD, TDD, and Front-End UI Design Specification in `docs/initial-project-docs/` are the baseline and source of truth for Phase 1 functionality, technical decisions, and UI behavior. Treat them as the agreed project planning baseline; do not describe them as unapproved proposals or invent competing requirements.

This master execution plan sequences implementation of **BRD Phase 1 only** into ten sessions. Its four phases below are execution-series groupings, not the BRD's three product-release phases. Product Phase 2 community functionality and Product Phase 3 modernization are outside this execution plan.

Phase 1 includes email/password registration with required email verification, Google sign-in only when Firebase reports the provider email as verified, password reset, and administrator blog deletion after explicit confirmation. Q&A is a visible, non-functional Coming Soon placeholder only: no question, answer, comment, search, or submission behavior.

## 1. ROLE AND RESPONSIBILITY

Act as a Senior Software Architect, Technical Project Manager, React Developer, Firebase Developer, QA Engineer, and Technical Mentor.

Your responsibility is to prepare a complete, detailed, milestone-driven development execution plan for my project, **Code Classic – Phase 1**.

I am developing this application with AI assistance, primarily using Claude in Ask Mode.

I do not want AI to blindly generate the complete application. I want to understand every important implementation decision, configuration, file modification, dependency, and error.

You must guide me like a technical mentor who is responsible for ensuring that I understand the application and complete each development milestone successfully.

The development plan must be detailed enough that I can follow it step by step without having to guess what to do next.

---

# 2. PROJECT BACKGROUND

Code Classic is a developer knowledge-sharing platform.

The platform will allow visitors to read technical blogs and access related YouTube learning content.

Initial knowledge categories include:

- Java
- Spring Boot
- Microservices
- SQL
- Azure
- DevOps
- System Design
- Artificial Intelligence
- Software Architecture

## Phase 1 functional scope

### Public visitors
- Access the website without login.
- View published blogs.
- Read individual blog posts.
- Watch embedded YouTube videos.
- Navigate the website.

### Registered users
- Register using email and password, then verify the email before authenticated access.
- Sign in using Google only when Firebase confirms the provider email is verified.
- Sign in using email and password.
- Request a password reset email and complete the reset flow.
- Access their user profile.
- Access permitted authenticated-user functionality.

### Administrator
- Access administrator functionality.
- Create blog posts.
- Edit existing blog posts.
- Delete blog posts after explicit confirmation.
- Save blog posts as drafts.
- Publish and unpublish blog posts.
- Manage blog content.

### Blog content fields

The blog model should support:

- Blog ID
- Title
- Description or excerpt
- Markdown content
- Category
- Tags
- YouTube video ID
- Optional thumbnail
- Publication status
- Created timestamp
- Updated timestamp
- Publication timestamp

The exact schema must be validated against the approved technical requirements before implementation.

### Excluded from Phase 1

Do not introduce these features into the implementation plan:

- User-generated blogs.
- Comments and replies.
- Likes.
- Functional Q&A, including question/answer data, search, comments, and submission workflows. Only a non-functional Coming Soon navigation/page placeholder is allowed.
- Course management.
- Document management.
- Job management.
- Notifications.
- Advanced analytics.

Keep the Q&A navigation entry visible as a Coming Soon placeholder only; it is not a functional Phase 1 feature.

---

# 3. APPROVED TECHNOLOGY STACK

Use only the following technologies unless an existing approved project document specifies otherwise.

| Layer | Technology |
|---|---|
| Frontend | React |
| Programming language | JavaScript |
| Build tool | Vite |
| UI framework | Bootstrap 5 |
| Routing | React Router |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| Security | Firestore Security Rules |
| Version control | Git and GitHub |
| Hosting | Cloudflare Pages |
| Video hosting | YouTube embeds |

Important architectural restrictions:

1. Do not introduce Spring Boot in Phase 1.
2. Do not introduce microservices.
3. Do not introduce an API Gateway.
4. Do not create an unnecessary custom backend.
5. Do not introduce additional services without explaining and obtaining approval.
6. Do not assume Firebase Storage is part of the approved architecture.
7. Keep the architecture simple, maintainable, secure, and cost-conscious.
8. Treat Firebase client configuration as public configuration, not as a secret.
9. Never expose service account credentials or privileged administrative keys in frontend code.
10. Administrator roles must be assigned through a trusted process, such as Firebase Admin SDK/custom claims, rather than a client-editable Firestore field.

---

# 4. DEVELOPMENT SERIES STRUCTURE

The complete Phase 1 development is divided into 10 sessions.

Each session is an independent development milestone.

Target duration:
- 20–25 minutes of recorded content per session.
- Total target recorded content: approximately 4–4.2 hours.

The 10 sessions are:

## Phase 1 – Frontend Foundation

1. Setting Up the Development Environment and Creating the React Application.
2. Configuring the Frontend – Bootstrap, React Router and Common Layout.
3. Building the Code Classic Homepage.
4. Developing the Blog Listing and Blog Detail Pages.

## Phase 2 – Firebase and Authentication

5. Setting Up Firebase and Implementing User Authentication.
6. Implementing User Profiles, Admin Authorization and Firestore Security.

## Phase 3 – Blog Management and Publishing

7. Building the Admin Dashboard and Blog Management Interface.
8. Implementing Blog Creation, Editing and Draft Management.
9. Implementing Blog Publishing and Public Content Integration.

## Phase 4 – Deployment and Completion

10. Deploying Code Classic on Cloudflare Pages and Final Production Testing.

Do not increase the number of sessions unless a genuine technical dependency makes it necessary. If an activity becomes larger than expected, suggest how to handle it without unnecessarily expanding the roadmap.

---

# 5. REQUIRED FORMAT FOR EVERY SESSION

For EACH of the ten sessions, generate the following sections.

## A. Session identification

Provide:

- Session number.
- Session title.
- Phase.
- Estimated duration.
- Milestone name.
- Dependencies on previous sessions.
- Expected starting condition.

## B. Session objective

Explain:

- What exactly will be developed?
- Why is this activity necessary?
- Where does it fit into the overall architecture?
- What will the application be capable of doing after this session?

Explain this in simple technical language.

## C. Prerequisites

List everything that must be ready before starting.

Examples:

- Software installations.
- Repository availability.
- Previous session completion.
- Firebase project availability.
- Required credentials or configuration.
- Required design references.

Clearly differentiate mandatory prerequisites from optional ones.

## D. Detailed execution steps

This is the most important section.

Divide the session into numbered, sequential steps.

For every step, provide:

1. Step number and name.
2. Purpose of the step.
3. Exact action I need to perform.
4. Tool or application to use.
5. Where to perform the action.
6. Commands to execute, where applicable.
7. Files to create or modify.
8. Expected output.
9. How to verify that the action worked.
10. Common errors and troubleshooting guidance.

Do not write vague instructions such as:

- Configure Firebase.
- Create components.
- Implement authentication.
- Connect the database.

Instead, explain the exact sequence of activities required to complete them.

For example, instead of saying "Create a React application", explain:

1. Open the terminal.
2. Navigate to the intended project directory.
3. Run the appropriate Vite project creation command.
4. Select the required React JavaScript template.
5. Navigate into the generated project directory.
6. Install dependencies.
7. Start the development server.
8. Open the local application in the browser.
9. Verify the expected Vite/React page.
10. Explain what files Vite generated and what their responsibilities are.

Provide commands only after explaining what they do.

Do not assume a command succeeded without verification.

## E. AI assistance instructions

For every major implementation step, provide a ready-to-use prompt that I can give Claude.

Each prompt must:

- Explain the requirement.
- Specify the relevant technology.
- Explain the expected behaviour.
- Specify constraints.
- Ask Claude to inspect the existing project before proposing modifications.
- Ask Claude to list the files it intends to modify.
- Ask Claude to explain why each modification is required.
- Ask Claude to avoid unrelated changes.
- Ask Claude to provide the implementation in manageable steps.
- Ask Claude to explain how I can test the result.

The prompts must instruct Claude to use Ask Mode first.

Do not ask Claude to modify the entire application at once.

If a code change is required, first explain the proposed solution. Then ask for the implementation only after the approach is understood.

## F. Technical understanding checklist

List the technical concepts I should understand before considering the session complete.

Examples:

- What is Vite?
- What is the purpose of package.json?
- What is a React component?
- How does React Router work?
- What is Firebase Authentication?
- How do Firestore Security Rules work?
- What is the difference between frontend route protection and database authorization?

The concepts must be relevant to that particular session.

Include short, understandable explanations and practical examples where useful.

## G. Testing and verification

Create a detailed testing checklist.

Include:

- What to test.
- How to test it.
- Expected result.
- Failure conditions.
- Whether the test is manual or automated.
- Any relevant browser or terminal checks.

For important security-related work, include negative tests as well as positive tests.

For example:
- A public visitor can read a published blog.
- A public visitor cannot read a draft.
- An ordinary authenticated user cannot create or modify administrator-only blog content.
- An administrator can perform permitted blog-management operations.

Do not mark functionality as working merely because the page renders.

## H. Acceptance criteria

Define explicit, measurable acceptance criteria.

Use this format:

| ID | Acceptance criterion | Verification method | Expected result |
|---|---|---|---|
| AC-01 | Specific requirement | Test procedure | Pass condition |
| AC-02 | Specific requirement | Test procedure | Pass condition |

Acceptance criteria must describe observable behaviour.

Avoid vague conditions such as "the page should look good" or "Firebase should work".

If a visual requirement exists, define the expected visible elements and responsive behaviour.

If a security requirement exists, define which user can perform which operation and how this is verified.

## I. Evidence and documentation

Specify exactly what evidence I must capture before marking the session complete.

Examples:

- Screenshot of the running application.
- Screenshot of Firebase configuration.
- Terminal output showing successful build.
- GitHub repository or commit reference.
- Browser screenshot showing the completed UI.
- Authentication test results.
- Firestore rule test results.
- Cloudflare deployment URL.
- Short screen recording of an important workflow.

For every evidence item, specify:

1. Evidence ID.
2. What needs to be captured.
3. How to capture it.
4. What it proves.
5. Suggested filename.

Example:

`S01-E01-react-app-running.png`

Also specify which evidence is mandatory and which is optional.

Do not ask me to expose passwords, API secrets, private keys, service account JSON files, access tokens, or other sensitive information in screenshots or recordings.

## J. Git and version control checkpoint

At the end of each session, explain:

- Which files should be committed.
- Whether any temporary or generated files should be excluded.
- Suggested commit message.
- How to verify the commit.
- What should be pushed to GitHub.
- What should not be committed, especially secrets and environment files.

Do not assume that every generated file should be committed.

## K. Milestone completion decision

At the end of every session, define a formal milestone gate.

Use these three statuses:

**PASS**
- All mandatory acceptance criteria pass.
- Mandatory evidence is captured.
- The application is in a stable state.
- Required Git checkpoint is complete.

**BLOCKED**
- A required functionality does not work.
- A security or data-integrity issue remains.
- A required dependency is unavailable.
- An important failure has not been understood.

**CONDITIONALLY ACCEPTED**
- All critical functionality works.
- Only explicitly documented, non-critical issues remain.
- A follow-up action, owner, and target session are recorded.
- No security, privacy, or data-integrity issue is deferred.

Do not allow a session to be marked complete just because the planned coding activity has finished.

At the end, provide a milestone sign-off template:

Session:
Milestone:
Acceptance criteria passed:
Acceptance criteria failed:
Mandatory evidence captured:
Outstanding issues:
Git commit reference:
Final status:
Reason for decision:

## L. Session handover

Explain what must be available at the end of this session so the next session can begin.

Include:

- Completed functionality.
- Important files and configuration.
- Known limitations.
- Outstanding tasks.
- Next session dependency.

---

# 6. SESSION-SPECIFIC DEVELOPMENT REQUIREMENTS

In addition to the common session structure, apply the following requirements to each session.

## SESSION 1 – Development Environment and React Application

Cover:

- Verify Node.js and npm installation.
- Verify Git installation and configuration.
- Verify Visual Studio Code availability.
- Create GitHub repository.
- Clone or initialize the local repository.
- Create React application using Vite and JavaScript.
- Understand the generated project structure.
- Install dependencies.
- Start the development server.
- Verify the application in the browser.
- Create the first Git commit.

Milestone:
A React application created using Vite, running locally, and connected to GitHub.

## SESSION 2 – Frontend Configuration and Common Layout

Cover:

- Review existing package dependencies.
- Install and configure Bootstrap 5.
- Configure React Router.
- Establish the application entry point.
- Create a clean folder structure based on actual requirements.
- Configure global styles.
- Define reusable layout components.
- Implement header.
- Implement primary navigation.
- Keep Q&A as a Coming Soon placeholder only; do not add question or answer functionality.
- Implement footer.
- Add responsive behaviour.
- Test navigation between placeholder pages.
- Verify the Q&A route displays only a Coming Soon message and has no question or answer interactions.

Milestone:
The application has a consistent shared layout, working routing, and responsive common components.

## SESSION 3 – Code Classic Homepage

Cover:

- Review the approved UI design.
- Establish the homepage structure.
- Implement the two-ribbon header if not already completed.
- Implement the three-column desktop layout.
- Implement the hero/banner carousel.
- Implement exactly five homepage blog previews using temporary data if the backend is not ready.
- Implement the left sidebar.
- Implement the right sidebar.
- Use a Q&A Coming Soon panel, not sample/live-looking question links or answer controls.
- Add responsive behaviour for tablets and mobile.
- Validate spacing, typography, and colours against the approved design.

Milestone:
The homepage visually matches the approved design and works across supported screen sizes.

## SESSION 4 – Blog Listing and Detail Pages

Cover:

- Create the blog listing page.
- Create reusable blog card components.
- Display title, description, category, date, and thumbnail.
- Implement ten blog previews per listing page.
- Implement pagination.
- Create the individual blog detail page.
- Render Markdown content safely.
- Implement YouTube video embedding using video IDs.
- Handle invalid or unavailable blog content.
- Test navigation from homepage to listing and detail pages.

Milestone:
Visitors can navigate from the homepage to a blog listing and open an individual blog detail page.

## SESSION 5 – Firebase and Authentication

Cover:

- Create or inspect the Firebase project.
- Register the web application.
- Configure Firebase SDK.
- Understand Firebase client configuration.
- Set up environment variables.
- Enable email/password authentication.
- Enable Google authentication.
- Implement registration.
- Implement login.
- Implement logout.
- Send a verification email for email/password registration; show verification-pending and resend states; prevent authenticated app access until Firebase confirms verification.
- Permit Google authenticated access only when Firebase confirms the provider email is verified.
- Implement the password-reset email request and complete the reset-link flow.
- Handle authentication errors.
- Test new and existing accounts, verified and unverified states, Google verification status, and password reset.
- Verify authentication state persistence.
- Capture evidence of the verification-pending state, successful verification, and password-reset completion without exposing account secrets.

Milestone:
Users can register, verify email, sign in, reset a password, sign out, and maintain the expected authentication state; unverified email/password users cannot access authenticated features.

Required acceptance checks:

- Email/password registration sends a verification email; a still-unverified account cannot access profile or admin functionality.
- Completing the verification link and refreshing the Firebase user/token permits the intended authenticated access.
- Google sign-in is accepted only when Firebase confirms a verified provider email.
- Password-reset email can be requested and used to sign in with the updated password; responses do not disclose account existence.

## SESSION 6 – User Profiles, Admin Authorization and Firestore Security

Cover:

- Configure Cloud Firestore.
- Define the user profile data model.
- Define the blog data model based on approved requirements.
- Implement user profile creation or synchronization.
- Design trusted administrator role assignment.
- Require verified email for authenticated profile and administrator access; verification does not grant admin privileges.
- Understand Firebase custom claims and the trusted assignment process.
- Protect administrator routes in the frontend.
- Configure Firestore Security Rules.
- Allow public reading of published blogs only.
- Prevent public access to drafts.
- Restrict blog creation and modification to administrators.
- Restrict users from changing their own privileged roles.
- Deny profile/private and administrative operations to unverified users; retain public access to published posts.
- Test security rules using Firebase Emulator Suite where feasible.

Milestone:
User profiles, trusted administrator authorization, and Firestore access control are implemented and tested.

Important:
Frontend route guards are not a replacement for Firestore Security Rules. Treat database rules as the actual data-access enforcement layer.

## SESSION 7 – Admin Dashboard and Blog Management Interface

Cover:

- Create administrator dashboard route.
- Restrict access to authorized administrators.
- Design the dashboard layout.
- Display blog records.
- Show blog title, category, status, and relevant timestamps.
- Provide create, edit, and view actions.
- Provide administrator-only delete functionality for blog posts, as required by the BRD. Require explicit confirmation before deletion and verify public and ordinary users are denied.
- Display loading, empty, and error states.
- Test access as administrator and ordinary user.

Milestone:
An authorized administrator can access the dashboard, manage the blog list, and delete a post only after confirmation; public visitors and ordinary users cannot perform administrative actions.

Required delete checks:

- An administrator can confirm deletion and the selected post is removed from the admin list and public views.
- Canceling the confirmation leaves the post unchanged.
- Public visitors and ordinary users cannot delete a post through the UI or direct Firestore request.
- Show a clear success or error state; do not report deletion as successful if Firestore rejects it.

## SESSION 8 – Blog Creation, Editing and Draft Management

Cover:

- Implement blog creation form.
- Add title and description fields.
- Add Markdown content editor or input.
- Add category selection.
- Add tags.
- Add YouTube video ID.
- Support optional thumbnail.
- Validate required fields.
- Implement draft saving.
- Implement editing of existing drafts.
- Implement editing of existing blog posts.
- Store timestamps correctly.
- Handle form errors and database failures.
- Test incomplete and valid submissions.

Milestone:
An administrator can create, save, reopen, and edit blog drafts and existing posts.

## SESSION 9 – Blog Publishing and Public Content Integration

Cover:

- Implement publish functionality.
- Implement unpublish functionality.
- Enforce administrator-only operations.
- Ensure public queries retrieve published blogs only.
- Connect the homepage to Firestore blog data.
- Connect the listing page to Firestore.
- Connect the detail page to the selected blog record.
- Verify Markdown rendering.
- Verify YouTube embedding.
- Verify empty states and loading states.
- Verify unavailable or deleted blog handling.
- Test as a visitor, ordinary user, and administrator.
- Perform functional regression testing.

Milestone:
The administrator can publish and unpublish blogs, and public visitors can read only published content.

## SESSION 10 – Cloudflare Deployment and Production Testing

Cover:

- Review production readiness.
- Verify environment configuration.
- Ensure no credentials or secrets are exposed.
- Run production build.
- Resolve build errors and warnings that affect functionality.
- Push final changes to GitHub.
- Configure Cloudflare Pages deployment.
- Connect GitHub repository.
- Configure build command and output directory.
- Configure production environment variables.
- Configure SPA routing fallback if required.
- Deploy the application.
- Verify the production URL.
- Test authentication on the deployed site.
- Test public blog access.
- Test administrator operations.
- Test Firestore security independently.
- Check browser console and network failures.
- Capture final deployment evidence.
- Document known limitations and future enhancements.

Milestone:
Code Classic is deployed on Cloudflare Pages and passes the agreed production acceptance tests.

---

# 7. CROSS-SESSION QUALITY REQUIREMENTS

Apply these rules throughout all ten sessions.

## A. Do not blindly implement

Before implementation:

1. Understand the requirement.
2. Explain the proposed approach.
3. Inspect existing code.
4. Identify files that need changes.
5. Explain dependencies and side effects.
6. Obtain my understanding and approval before proceeding.

## B. Avoid unnecessary changes

- Do not rewrite working code without a reason.
- Do not introduce unnecessary packages.
- Do not create duplicate components.
- Do not change the architecture without explaining the reason.
- Do not overwrite configuration files without checking their existing contents.

## C. Maintain security

- Validate access at the database layer.
- Never trust client-side role values.
- Never expose privileged credentials.
- Use environment variables appropriately.
- Test unauthorized access.
- Validate user input.
- Avoid unsafe Markdown or HTML rendering.
- Require verified email for authenticated user/admin functionality; verification does not grant administrator privileges.
- Require explicit confirmation for admin post deletion and enforce authorization in Firestore rules.

## D. Maintain the Phase 1 boundary

- The master plan covers BRD Product Phase 1 only. Its four execution phases organize the ten sessions and do not replace the BRD's three product-release phases.
- Keep Q&A in navigation and the designed page/sidebar only as a Coming Soon placeholder. Do not implement questions, answers, comments, search, or submissions.
- Email verification and password reset are required authentication flows and must be designed, tested, and included in acceptance evidence.
- Administrator post deletion is required in Phase 1 and must require confirmation. Firestore Security Rules must deny delete operations by public and ordinary users.

## E. Maintain project documentation

At the end of every session, update a development log containing:

- Session number.
- Date.
- Objective.
- Work completed.
- Files created or changed.
- Tests performed.
- Acceptance criteria results.
- Evidence references.
- Git commit.
- Outstanding issues.
- Next milestone.

Maintain a central milestone tracker for all ten sessions.

## F. Handle unexpected issues

If an error occurs:

1. Stop and capture the error.
2. Identify the affected component or configuration.
3. Explain the likely root cause.
4. Investigate before suggesting changes.
5. Propose the smallest appropriate fix.
6. Explain the change.
7. Apply the fix.
8. Re-run the failed test.
9. Record the root cause and resolution.

Never mark a failed test as passed without rerunning it.

---

# 8. MASTER MILESTONE TRACKER

Create a consolidated tracker for all ten sessions.

Use the following columns:

| Session | Milestone | Planned output | Acceptance status | Evidence status | Git reference | Completion status |
|---|---|---|---|---|---|---|

Use these statuses:

- Not Started
- In Progress
- Blocked
- Conditionally Accepted
- Accepted

A milestone can be marked Accepted only after mandatory acceptance criteria and evidence have been verified.

Do not assume completion based on a planned date or estimated duration.

---

# 9. FINAL DELIVERABLES

Prepare the following documentation:

1. Complete 10-session execution plan.
2. Detailed numbered implementation steps for every session.
3. Session-specific Claude prompts.
4. Technical understanding checklist.
5. Testing and verification checklist.
6. Measurable acceptance criteria.
7. Mandatory and optional evidence checklist.
8. Git checkpoint instructions.
9. Session milestone sign-off template.
10. Consolidated milestone tracker.
11. Cross-session dependency map.
12. Final Phase 1 production acceptance checklist.
13. Required authentication evidence for email verification and password reset.
14. Confirmed administrator deletion flow and negative authorization tests.
15. Q&A Coming Soon placeholder with no functional community behavior.

The BRD, TDD, and UI Design Specification are the Phase 1 baseline and source of truth. If a mismatch is discovered while executing a session, stop and reconcile the planning baseline before implementation rather than silently choosing one document.

Use Markdown format so the documents can be stored in the Code Classic GitHub repository.

Suggested documentation structure:

`docs/development-plan/`

- `README.md` – Overview and development methodology.
- `SESSION-01.md`
- `SESSION-02.md`
- `SESSION-03.md`
- `SESSION-04.md`
- `SESSION-05.md`
- `SESSION-06.md`
- `SESSION-07.md`
- `SESSION-08.md`
- `SESSION-09.md`
- `SESSION-10.md`
- `MILESTONE-TRACKER.md`
- `FINAL-ACCEPTANCE-CHECKLIST.md`

---

# 10. HOW TO GENERATE THE PLAN

Do not produce a shallow summary.

I want a genuinely executable development plan.

For each session, provide sufficient detail that I can sit in front of Visual Studio Code and follow the instructions in order.

Important instructions:

- Preserve the approved project scope and technology stack.
- Do not invent implementation details that conflict with existing requirements.
- Where a design or technical decision is not yet defined, identify it as an open decision rather than silently assuming an answer.
- Distinguish between mandatory implementation, optional improvement, and future scope.
- Provide practical verification steps and observable results.
- Keep each session focused on one milestone.
- Account for the work completed in previous sessions.
- Do not repeat setup instructions unnecessarily.
- Keep the recorded session target to 20–25 minutes, but do not sacrifice testing or understanding to meet the time target.

Start by generating the complete overview, dependency map, and milestone tracker.

Then generate the detailed plan for Session 1.

After that, generate the remaining sessions in order, maintaining consistency across all documents.

The final objective is not simply to finish the code. It is to build a working, secure, deployable Code Classic application while understanding and documenting every important development milestone.