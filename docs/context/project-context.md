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

- Purpose: technology learning and knowledge sharing.
- Phase 1 users: public visitors, verified registered users, and administrators.
- Phase 1 capabilities: public published-blog reading, email/password registration with required verification, Google sign-in only for a provider account Firebase reports as verified, password reset, basic user profiles, and administrator blog create/edit/draft/publish/unpublish/delete workflows. Deletion requires explicit confirmation.
- Q&A can appear only as a non-functional Coming Soon placeholder in Phase 1. Questions, answers, comments, search, and submissions are excluded.
- Phase 1 technology baseline: React, JavaScript, Vite, Bootstrap 5, React Router, Firebase Authentication, Cloud Firestore and Security Rules, Git/GitHub, Cloudflare Pages, and YouTube embeds.
- The BRD defines three product-release phases. The master plan's four phases group the ten execution sessions for BRD Phase 1; they are not competing product phases.
- Later community and modernization capabilities remain outside this Phase 1 execution plan.

## Current repository and planning-document structure

The requested `feature/project-setup` branch is checked out at commit `325bf62` (`Initial commit`). That commit tracks only `README.md`; the context, agent, and planning documents listed below are present locally but are not part of that branch's tracked initial commit.

```text
code-classic/
├── .github/
│   └── agents/
│       ├── project-context-updater.agent.md  (local workspace agent)
│       └── phase-1-report-updater.agent.md  (user-invocable session report agent)
├── docs/
│   ├── context/
│   │   ├── manuallchanges.md  (empty; owner-provided notes file)
│   │   └── project-context.md  (local context guide)
│   ├── report/
│   │   └── phase-1-session-report.md
│   └── initial-project-docs/
│       ├── brd-docs.md
│       ├── tdd-docs.md
│       ├── front-end-UI-design-doc.md
│       ├── front-end-UI-sample.jpg
│       ├── master-execution-plan.md
│       ├── CodeClassic_Intro.pptx
│       └── CodeClassic_Execution_Plan.pptx
└── README.md  (tracked on feature/project-setup)
```

The initial planning bundle is already present in `docs/initial-project-docs/`:

- `brd-docs.md`: Phase 1 business baseline and source of truth, including verified email, password reset, confirmed administrator deletion, and Q&A placeholder behavior.
- `tdd-docs.md`: Phase 1 technical baseline and source of truth for React/Firebase architecture, data model, security rules, deployment, and testing.
- `front-end-UI-design-doc.md` and `front-end-UI-sample.jpg`: Phase 1 visual baseline and reference mockup; sample Q&A in the image is not functional scope.
- `master-execution-plan.md`: the 10-session Phase 1 execution-planning brief and session requirements.
- `CodeClassic_Intro.pptx`: 5-slide introduction presentation for the first video.
- `CodeClassic_Execution_Plan.pptx`: 53-slide detailed execution-plan presentation covering Sessions 1–7, including session acceptance criteria. The user confirmed that stopping at Session 7 is intentional; do not extend it to Sessions 8–10 unless asked.
- `docs/report/phase-1-session-report.md`: Mermaid-based visual roadmap and session-by-session Phase 1 milestone report, derived from the master execution plan. All milestones remain planned until verified.
- `.github/agents/phase-1-report-updater.agent.md`: workspace agent for refreshing the visual report from the execution plan, manual-change notes, and repository evidence.

Keep the initial baseline section below intact. Update this current inventory as files or implementation are added.

## Current workspace and Git snapshot

- The verified Git status for 2026-11-14 is: `README.md` modified; `.github/` and `docs/` untracked; no commit has been made. Verified with `git status --short --branch` on branch `feature/project-setup`.
- The planning materials are aligned with the README and Phase 1 baseline: BRD, TDD, and Front-End UI Design Specification are the Phase 1 baseline/source of truth; the master execution plan sequences BRD Phase 1 only into 10 sessions grouped into four execution phases. The BRD separately defines three product phases.
- The README, BRD, TDD, UI design specification, master execution plan, Phase 1 report, workspace updater agents, and both PowerPoint decks are recorded as updated/aligned in the 2026-11-14 work history. The UI sample remains a visual reference, not a functional-scope authority.
- Both presentation files are present. The execution-plan presentation intentionally remains 53 slides covering Sessions 1–7; it is not to be extended to Sessions 8–10 unless requested.
- The Phase 1 report still marks all ten sessions Not Started. No application source code, dependency manifests, tests, or build configuration have been verified in the workspace.

## Setup and live recreation guide

The initial commit tracks only the product-description README. The current workspace also contains the local `.github/` and `docs/` materials described above, but no application code, dependency manifest, tests, or build configuration have been verified. The planning documents describe a 10-session build sequence, but no setup or implementation steps have been executed or verified in this workspace. As the application is built, document the actual sequence here so another person can reproduce it from a clean starting point:

1. Prerequisites and supported tool/runtime versions:
2. Create the project and install dependencies:
3. Configure required environment variables or local services (never include secret values):
4. Implement the major features in a logical, demonstrable order:
5. Run the application:
6. Verify expected behavior and run relevant tests:

For each step, record the command or action, the relevant files, why the step is needed, and the expected observable result. Identify assumptions and unverified steps rather than presenting them as confirmed.

## Manual changes

Before each update, check `docs/context/manuallchanges.md` for owner-performed work and record relevant details here with their manual status. It was absent during the initial baseline scan; it currently exists and is empty, so it contains no manual-change notes.

## Baseline scope notes

- The README summarizes BRD Phase 1 and must not broaden its scope.
- The BRD, TDD, and UI specification define baseline decisions; the master plan must sequence them and not contradict them.
- Product Phases 1–3 in the BRD are distinct from the four execution groupings in the Phase 1 master plan.
- Password reset and email verification are required. Unverified email/password users cannot access authenticated features; Google access requires a verified provider email.
- Administrator post deletion is required and must be confirmed. Non-admin delete attempts must be denied by Firestore Security Rules.
- Q&A is only a Coming Soon placeholder in Phase 1; do not implement functional questions or answers.
- Implementation details not specified by the baseline (for example exact confirmation wording or admin-dashboard layout) may remain open, but must not reopen these scope decisions.

## Verification status

- Initial source/build/test status: not applicable; no project implementation or tooling configuration existed in the scanned workspace.
- Clone verification: `feature/project-setup` is checked out at `325bf62` and tracks `origin/feature/project-setup`; the branch contains only `README.md`.
- Planning bundle check: BRD, TDD, UI design spec, UI sample image, master execution-planning brief, and both requested PowerPoint files are present under `docs/initial-project-docs/`.
- Presentation check: the introduction deck has 5 slides; the execution-plan deck has 53 slides and covers Sessions 1–7, intentionally ending there per the user's instruction. The decks were aligned to include verified-email access, password reset, confirmed administrator deletion, and the Q&A placeholder-only scope without adding sessions.
- Build/test status on the cloned branch: not applicable; no application implementation, build configuration, or tests are present.
- Record future verification with the exact command or action, outcome, and any limitations.

## Open questions and decisions

Record only questions or design decisions that affect understanding or reproducing the project. Mark resolved items and update the sections above when answers are verified.

## Update history

- 2026-11-14: Created this initial baseline after scanning the visible workspace. No application source or project configuration was present.
- 2026-11-14: Cloned and integrated `feature/project-setup` at `325bf62`. The branch contains only the README product description; the original local agent/context files were preserved.
- 2026-11-14: Indexed the existing initial planning documents, UI reference, and two presentations. Recorded their proposed status and the user's confirmation that the execution-plan deck intentionally covers Sessions 1–7 only.
- 2026-11-14: Added the Phase 1 Mermaid session report and its user-invocable updater agent. The report marks all ten sessions Not Started because implementation has not been verified.
- 2026-11-14: Aligned the README, Phase 1 planning baseline, visual report, and report agent around verified-email access, password reset, confirmed admin deletion, placeholder-only Q&A, and Phase 1-only session sequencing.
- 2026-11-14: Updated the README, BRD, TDD, UI design specification, master execution plan, Phase 1 report, and existing presentations so they consistently reflect the Phase 1 source baseline. Kept the execution-plan presentation at Sessions 1–7.
- 2026-11-14: Reconciled the canonical context with the aligned README, four written planning documents, UI reference, report, both workspace agents, and both decks. Reaffirmed the hierarchy (BRD/TDD/UI as Phase 1 baseline; master plan sequences BRD Phase 1 only in 10 sessions/four execution groupings; BRD has three product phases), required auth and confirmed-admin-delete scope, and Q&A placeholder-only scope. Recorded the user-reported Git status (README modified; `.github/` and `docs/` untracked; no commit); no implementation, manifests, tests, or build configuration were verified.
