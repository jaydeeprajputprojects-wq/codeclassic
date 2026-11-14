# Session 09 — Publishing and Public Content Integration

- **Roadmap phase:** Blog management and publishing
- **Prerequisite:** Sessions 04, 06, and 08
- **Learning status:** Planned; the starter app has no Firestore-backed public blog pages yet.

## What you will learn

- Explain publish and unpublish as status transitions.
- Understand how public pages read Firestore data.
- Describe loading, empty, and missing-post states.
- Explain why queries and rules must both restrict drafts.
- Plan a regression test across public, user, and admin roles.

## Status is a controlled transition

A post moves between `DRAFT` and `PUBLISHED`. Publishing sets the status and publication timestamp according to the agreed schema. Unpublishing removes public access without deleting the content. Deleting is a separate destructive admin action with confirmation.

## Connect data to UI

The homepage needs recent published posts. The listing page needs filtered/paginated published posts. The detail page needs one published post for its slug or ID. While loading, show a loading state; if none exists, show an empty state; if a selected post is unavailable, show a not-found message.

**Important:** A public query should explicitly ask for published records, and Firestore Rules must independently deny draft reads. Both layers matter.

## Regression testing

A regression test checks that new changes did not break earlier working features. After connecting Firestore, recheck:

- Visitor can read published content.
- Visitor cannot read drafts.
- Ordinary user cannot change blog records.
- Admin can edit and publish/unpublish.
- Admin confirmed delete behaves as expected.
- Markdown and YouTube content still display safely.

## Guided learning activity

1. Draw the state changes Draft → Published → Draft.
2. Explain what happens to the public detail URL after unpublishing.
3. Make a role/operation table for read, write, publish, and delete.
4. List the loading, empty, error, and not-found messages each public page needs.
5. When integrated, test each workflow with distinct visitor, verified user, and admin accounts.

## Common beginner mistakes

- **Hiding a draft link but allowing database reads:** rules must deny it.
- **Using a draft in a public feed:** filter the query and verify rules.
- **Unpublishing by deleting:** keep status change separate from deletion.
- **Ignoring deep links:** directly open a blog URL and verify correct behavior.
- **Testing only the admin view:** public and normal-user behavior are essential.

## Recap

Publishing changes a post's visibility status. Public views read published data. Queries and rules both protect drafts. Regression tests exercise all roles and earlier features.

**I can explain this if I can answer:** How is unpublishing different from deleting? Why use both query filtering and Security Rules? What is regression testing?

## Sources and verification

- Session source: `docs/initial-project-docs/master-execution-plan.md`, Session 9.
- Security and data sources: BRD and TDD.
