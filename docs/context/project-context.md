# Project Context and Reproduction Guide

This is the single canonical context document for explaining this project and recreating it from scratch during a live demonstration. Update this file as the project changes; do not create additional context documents in `docs/context/`.

## Initial starting point

- Baseline captured: 2026-11-14.
- Workspace root: `c:\content-creation\code-classic`.
- The initial scan found no project source files, application code, dependency manifests, tests, build configuration, or project-specific setup documentation.
- The only visible project entry at the baseline was the `docs/` directory, containing an empty `docs/initial-project-docs/` directory.
- `docs/context/manuallchanges.md` was not present at the baseline. It is the designated source for changes performed manually by the project owner; consult it during future updates if it exists.
- There was no code or runnable application at this starting point, so no build, test, or runtime behavior could be verified.

This section records the starting point, not the current state after future work. Keep it intact as an origin reference.

## Current project overview

Code Classic is a developer knowledge-sharing platform. Phase 1 is the public technical blog, verified user authentication, and administrator-managed publishing defined in the BRD, TDD, and Front-End UI Design Specification. Those planning documents are the project baseline and single source of truth for Phase 1 functionality, technical choices, and UI behavior. The master execution plan sequences BRD Phase 1 only.

- **Current milestone status:** Session 2 is **Accepted/Complete** as of 2026-11-15, per owner direction and as recorded in the current Phase 1 session report. This applies to the shared layout, routing, responsive navigation, and non-functional placeholder pages only.
- Purpose: technology learning and knowledge sharing.
- Phase 1 users: public visitors, verified registered users, and administrators.
- Phase 1 capabilities: public published-blog reading, email/password registration with required verification, Google sign-in only for a provider account Firebase reports as verified, password reset, basic user profiles, and administrator blog create/edit/draft/publish/unpublish/delete workflows. Deletion requires explicit confirmation.
- Q&A can appear only as a non-functional Coming Soon placeholder in Phase 1. Questions, answers, comments, search, and submissions are excluded.
- Phase 1 technology baseline: React, JavaScript, Vite, Bootstrap 5, React Router, Firebase Authentication, Cloud Firestore and Security Rules, Git/GitHub, Cloudflare Pages, and YouTube embeds.
- The BRD defines three product-release phases. The master plan's four phases group the ten execution sessions for BRD Phase 1; they are not competing product phases.
- Later community and modernization capabilities remain outside this Phase 1 execution plan.

## Current repository and planning-document structure

The initial starting-point scan was made on `feature/project-setup` at `325bf62`. A later recorded checkout was `feature/project-setup` at `55f4cff`, tracking `origin/feature/project-setup`; these refs are historical. The current snapshot is reported separately below and does not derive from those historical refs.

```text
code-classic/
├── .github/agents/
├── docs/
│   ├── context/
│   │   ├── manuallchanges.md  (present, empty when checked)
│   │   └── project-context.md  (this canonical guide)
│   ├── initial-project-docs/  (BRD, TDD, UI spec/reference, execution plan, decks)
│   ├── learning/              (ten-session theory and Q&A library)
│   └── report/phase-1-session-report.md
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Blogs.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   └── QAComingSoon.jsx
│   └── styles/global.css
├── package.json, package-lock.json, vite.config.js, eslint.config.js
└── README.md
```

The initial planning bundle remains in `docs/initial-project-docs/`: the BRD, TDD, Front-End UI Design Specification and sample, master execution plan, a 5-slide introduction deck, and a 53-slide execution-plan deck. The latter intentionally covers Sessions 1–7 only. The BRD/TDD/UI specification define Phase 1 baseline scope; the master plan sequences it into ten sessions and four execution groupings. The BRD separately defines three product phases. The current report at `docs/report/phase-1-session-report.md` records Sessions 1 and 2 as Accepted and Sessions 3–10 as Not Started (reviewed 2026-11-15).

Keep the initial starting-point record above intact. It describes the 2026-11-14 origin, not the present repository.

## Current workspace and Git snapshot

- **Git snapshot (owner-reported, 2026-11-15):** branch `feature/session-2`, HEAD `310d7d1` (`feat: integrate Bootstrap for styling and layout, add routing with React Router`); the worktree was clean when checked. No upstream is configured, and no push or remote publication is confirmed. This replaces the earlier snapshot at `ad4a201`, when Session 2 changes were uncommitted and the worktree was dirty. The current Git details were supplied by the owner and were not independently queried during this context update.
- `package.json` declares React `^19.3.1`, React DOM `^19.3.1`, Bootstrap `^5.3.9`, and `react-router-dom` `^7.18.5`; scripts are `dev`, `build`, `lint`, and `preview`. Firebase is not declared.
- `src/main.jsx` imports Bootstrap CSS, then the Bootstrap bundle JavaScript, then `src/styles/global.css`; it renders `<App />` inside `StrictMode` and `BrowserRouter`.
- `src/App.jsx` nests routes under `<Layout />`, whose `<Outlet />` renders the child page. Routes are `/` (Home), `/blog` and `/blog/:category` (Blogs), `/qa` (QAComingSoon), `/about` (About), `/login` (Login), plus a wildcard not-found view.
- The shared shell is split into `src/components/layout/Header.jsx`, `Footer.jsx`, and `Layout.jsx`. Layout composes the header, main content/outlet, and footer.
- Header has a top brand ribbon and a separate horizontal navigation ribbon. On compact screens the hamburger button is at the top-right; Bootstrap collapse controls the menu. The Blog dropdown links to all blogs and category routes. Route links close the mobile menu after selection.
- Header displays the names YouTube, LinkedIn, and Instagram as plain inert placeholder text, not anchors or configured profiles. The owner says the URLs will be supplied later. Record them as an optional follow-up, not a Session 2 blocker; keep the names inert and do not invent URLs.
- The distinct page components are intentionally placeholders. Home points to Session 3; Blogs to Session 4; Login to Session 5; About is informational placeholder content; Q&A is a Coming Soon page only. No blog, authentication, or community Q&A feature is thereby complete.
- `src/styles/global.css` contains global colors, responsive shell/header/navigation, placeholder card, and footer styles. The current `src` listing does not contain the Vite demo `App.css`/`index.css` or the former generic `SiteLayout.jsx`/`PlaceholderPage.jsx`; these were removed as part of the user-directed reorganization. The current tree shows the replacement files above.
- Session 2 is Accepted per owner direction and the current Phase 1 session report. This acceptance is limited to the shared layout, routing, and placeholder milestone, not later homepage, blog, authentication, admin, publishing, or deployment work.
- **Latest Session 2 validation (previously parent-reported, 2026-11-15):** `npm run lint` and `npm run build` both passed after the reorganization. Browser checks verified direct navigation to `/`, `/blog`, `/blog/java`, `/qa`, `/about`, `/login`, and `/missing-route` returns the Vite SPA entry; at 390px the top-right mobile toggle is visible, opens the menu, and the menu closes after selecting Home once the Bootstrap transition settles; at 1280px the desktop navigation is visible and the mobile toggle is hidden; social labels display; the Blog dropdown opens and the Java route heading reads “Java Blogs”; and Q&A shows Coming Soon with no form controls. These checks were not rerun for this update. No feature-level automated test suite was verified.
- The inspected Session 2 theory guide reflects the current `Header.jsx`, `Footer.jsx`, `Layout.jsx`, separate page components, and `global.css` structure. The README currently contains generic React/Vite template guidance and is not the authoritative product overview.

## Setup and live recreation guide

These steps recreate the current Session 2 layout state from the matching Session 1 scaffold. The owner reports this state is committed locally at `310d7d1`; a remote push is not confirmed.

1. **Prerequisites:** Node.js and npm. Session 1 report evidence recorded Node.js `v22.21.0` and npm `11.6.2` at that time; current installed versions and supported minimums were not checked.
2. **Install:** Run `npm ci` from the repository root to install the lockfile dependency tree. React, Bootstrap, and React Router are declared; Firebase is not configured or installed.
3. **Entry point:** In `src/main.jsx`, import Bootstrap CSS and its bundle, then `./styles/global.css`; render the application under `StrictMode` and `BrowserRouter`.
4. **Routing and shell:** In `src/App.jsx`, put the Home, Blogs/category, QAComingSoon, About, Login, and not-found routes under the parent `Layout`. Build the shared header, footer, and `<Outlet />` frame in the three separate `src/components/layout/` files.
5. **Pages and styling:** Add the five separate page components in `src/pages/` and global presentation rules in `src/styles/global.css`. Keep these pages as placeholders, and keep Q&A non-functional.
6. **Navigation behavior:** Use a top-right compact-screen hamburger, horizontal navigation, and Blog category dropdown. Display the three social names only as inert placeholders until the owner provides URLs. Those URLs are optional follow-up and do not block Session 2 completion.
7. **Run and validate:** Run `npm run dev`, then `npm run lint` and `npm run build`. The owner previously reported lint and build passing. Previously reported browser coverage includes the seven listed direct routes, mobile menu open/close at 390px, desktop navigation at 1280px, social labels, Blog dropdown/category heading, and Q&A placeholder without form controls. These checks were not rerun in this document update. Production deployment behavior still requires separate verification.
8. **Keep later work separate:** Firebase Authentication/Firestore and Cloudflare Pages are planned Phase 1 services, not current configuration. Do not add credentials or privileged keys to source control or browser-exposed Vite variables.

For a live demonstration, explain the command/action, relevant file, purpose, and observable result. Mark any step that has not been rerun as unverified.

## Manual changes

`docs/context/manuallchanges.md` was checked before this update and is present but empty. It contains no notes identifying particular work as manually performed. The Session 2 reorganization is user-directed. The owner reports its current implementation is committed locally; this does not establish who authored the code. No upstream is configured, and push status is unconfirmed.

## Baseline scope notes

- The BRD, TDD, and UI specification are the Phase 1 baseline; the master plan sequences BRD Phase 1 into ten sessions. The three BRD product phases are distinct from the four execution groupings.
- Verified email, password reset, and Google sign-in only for an account whose provider email is verified are required. Administrator deletion requires confirmation and non-admin delete attempts must be denied by Firestore Security Rules.
- Q&A is a Coming Soon placeholder only in Phase 1; do not implement questions, answers, search, comments, or submissions.
- The implementation remains a local frontend shell, not the planned authentication, content management, publishing, or deployment product.

## Verification status

- Historical starting-point verification: no source files, application code, manifests, tests, build configuration, or project-specific setup documentation were present in the initial 2026-11-14 scan.
- Current source verification for this update: inspected `package.json`, `src/App.jsx`, `src/main.jsx`, all three layout components, all five page components, and `src/styles/global.css`. The current `src` directory listing confirms the organized folders and absence of the former demo CSS and generic layout/page files.
- Documentation checked: manual-change notes (empty), Session 2 theory guide, ten-session library index, master execution plan, and current Phase 1 session report. The report marks Session 2 Accepted per owner direction, consistent with the owner's completion status. The theory guide describes the current organized file structure.
- Latest build/lint and browser checks: previously reported as passing; not rerun in this context update.
- Git: owner reports branch `feature/session-2`, HEAD `310d7d1` (`feat: integrate Bootstrap for styling and layout, add routing with React Router`), clean worktree when checked, and no upstream. The commit is local according to the supplied snapshot; whether it has been pushed or otherwise published is unconfirmed.
- Firebase configuration, Cloudflare Pages deployment, production behavior, and any feature-level automated tests remain unverified or not implemented.

## Open questions and decisions

- The currently inspected `README.md` is generic Vite template guidance, despite older history describing a product summary. Which README content is intended remains unresolved.
- YouTube, LinkedIn, and Instagram URLs have not yet been supplied. They are optional follow-up, not a blocker to the owner's Session 2 completion approval; keep the displayed names inert until real profile details arrive.
- No upstream or confirmed push is recorded. Remote synchronization/publishing remains unverified, but the owner reports the Session 2 implementation committed locally.
- The Phase 1 report and this context agree that Session 2 is Accepted. The local commit is not confirmed pushed.

## Update history

- 2026-11-14: Created this initial baseline after scanning the visible workspace. No application source or project configuration was present.
- 2026-11-14: Cloned and integrated `feature/project-setup` at `325bf62`. The branch contains only the README product description; the original local agent/context files were preserved.
- 2026-11-14: Indexed the existing initial planning documents, UI reference, and two presentations. Recorded their proposed status and the user's confirmation that the execution-plan deck intentionally covers Sessions 1–7 only.
- 2026-11-14: Added the Phase 1 Mermaid session report and its user-invocable updater agent. The report marks all ten sessions Not Started because implementation had not been verified.
- 2026-11-14: Aligned the Phase 1 planning baseline, visual report, and report agent around verified-email access, password reset, confirmed admin deletion, placeholder-only Q&A, and Phase 1-only session sequencing.
- 2026-11-14: Updated the README, BRD, TDD, UI design specification, master execution plan, Phase 1 report, and presentations to align with the Phase 1 source baseline. Kept the execution-plan presentation at Sessions 1–7.
- 2026-11-14: Reconciled the canonical context with the written planning documents, UI reference, report, workspace agents, and decks. Recorded hierarchy of the baseline documents and the distinction between product and execution phases.
- 2026-11-15: Added the Project Learning Content agent and beginner-friendly theory/Q&A guides for all ten sessions.
- 2026-11-15: Recorded the Session 1 scaffold and Session 2 shared layout/routing as locally present; Session 1 remains Accepted and Session 2 In Progress. Earlier reported checks apply to the prior file organization only.
- 2026-11-15: Updated this canonical guide for the user-directed Session 2 reorganization. Verified the new separate layout and page files, nested routing, Bootstrap/global CSS import order, horizontal navigation and category dropdown, and inert unconfigured social-name placeholders. Recorded the removal of demo CSS and former generic files. Git status, lint/build, and browser results were not verified in that update.
- 2026-11-15: Refreshed Session 2 verification from the parent's reported inspection: branch `feature/session-2`, HEAD `ad4a201`, no upstream marker, and local modifications/untracked files; lint and build passed; direct-route, responsive menu, Blog dropdown/category, social-label, and Q&A placeholder browser checks passed. Session 2 remains uncommitted/unpushed and In Progress, and the social profile URLs remain outstanding. Confirmed the Session 2 theory guide now matches the reorganized source structure.
- 2026-11-15: Updated the current Session 2 snapshot from the owner's report: branch `feature/session-2`, local HEAD `310d7d1` (`feat: integrate Bootstrap for styling and layout, add routing with React Router`), clean worktree when checked, and no upstream or confirmed push. Recorded the owner's explicit approval of Session 2 as complete, with social URLs as optional follow-up rather than a blocker. Preserved the separate report's still-In-Progress status as a documented discrepancy; prior lint/build/browser checks were not rerun.
- 2026-11-15: Re-read the current Phase 1 report, which now records Session 2 as Accepted per owner direction. Updated this canonical guide to remove the stale report-status discrepancy while preserving the bounded acceptance scope, optional deferred social URLs, and local-commit/no-confirmed-push caveat.
