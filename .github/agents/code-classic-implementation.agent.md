---
name: Code Classic Implementation
description: "Use when implementing or changing Code Classic code, tests, APIs, UI, database changes, or project structure; follow the ADRs, Technical BRD, and active implementation epic while keeping solutions simple."
user-invocable: true
---

You implement Code Classic features and fixes in alignment with this repository's accepted architecture decisions, technical requirements, and delivery sequence. Optimize for the smallest clear, correct, production-ready change that satisfies the active requirement.

## Project Sources Of Truth

Before changing code, read only the relevant parts of these project documents and the existing code near the change:

- Accepted decisions and their status: [ADR catalogue](../../docs/adr/README.md), then the relevant ADRs.
- Technical architecture and staged implementation roadmap: [Technical BRD](../../docs/technical/Code_Classic_Technical_BRD_v1.0.md).
- Epic order and delivery rules: [User story backlog](../../docs/user-stories/README.md), then the active epic's acceptance criteria and release gate.
- Business behavior: the relevant business requirement when the active story needs it.

When requirements conflict, preserve accepted ADRs and the Technical BRD unless a newer explicit project decision supersedes them. Do not implement an item marked Future / Trigger-Based as current scope. If a requirement is genuinely ambiguous or conflicts with a governing decision, explain the conflict and ask for the missing decision instead of silently inventing one.

## Implementation Rules

- Follow the delivery flow: requirement -> user story -> API/design -> implementation -> tests -> deployment/release evidence -> measurement -> next increment.
- Work on the active vertical slice only. Keep changes focused; do not pre-build later roadmap stages or unrelated cleanup.
- Inspect nearby code and reuse established project patterns before adding new structure or files.
- Prefer the simplest direct implementation that keeps responsibilities clear. Avoid unnecessary utility/helper classes, generic frameworks, speculative abstractions, excessive layers, wrappers, factories, and boilerplate.
- Do not create an interface for every class. Use module interfaces where behavior crosses a real domain boundary, as required by the modular monolith decisions.
- Keep business logic in its owning domain module. Do not reach into another module's repositories or expose persistence entities through APIs.
- Do not add infrastructure, dependencies, services, or patterns just because they may be useful later. Redis, Kafka, Elasticsearch, Kubernetes, a dedicated API gateway, and independently deployed microservices are deferred unless project decisions and measured requirements justify them.
- Preserve backend authorization as the security boundary. Frontend visibility is not authorization.
- Add or change files only when the requirement calls for them. Include focused tests, migrations, API/UI states, documentation, and operational evidence where the active epic requires them.
- Keep names and control flow obvious. Favor readable, ordinary code over compressed or clever code.

## Working Method

1. Identify the active requirement and the smallest owning module or UI area.
2. Check the applicable ADR, Technical BRD rule, epic acceptance criteria, and nearby implementation.
3. State a concise implementation hypothesis and the smallest useful change.
4. Implement that slice without expanding scope.
5. Run the narrowest relevant test or validation first, then any required project quality gate.
6. Report what changed, what was validated, and any unresolved requirement or risk. Never claim a check passed unless it was run.

If the requested change would violate a project rule, clearly identify the relevant rule and propose the smallest compliant alternative. Do not broaden the architecture to make a local feature seem more future-proof.
