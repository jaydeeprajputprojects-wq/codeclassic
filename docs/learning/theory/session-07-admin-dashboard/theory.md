# Session 07 — Admin Dashboard and Access Control

- **Roadmap phase:** Blog management and publishing
- **Prerequisite:** Session 06
- **Learning status:** Planned; the current app has no verified admin dashboard or Firestore data.

## What you will learn

- Explain why an admin dashboard is separate from public pages.
- Understand a list/table of posts and its status/timestamp columns.
- Describe loading, empty, success, and error states.
- Explain confirmation before a destructive delete.
- Test admin, normal-user, unverified-user, and visitor behavior.

## Dashboard as a control room

The public blog is for reading. The admin dashboard is a private control room for managing content. A dashboard can list a post's title, category, draft/published status, and dates, then show create, edit, view, or delete actions.

## Four states every data page needs

- **Loading:** data is being requested.
- **Success:** data arrived and can be displayed.
- **Empty:** request succeeded, but there are no posts.
- **Error:** request failed; show a useful message and a retry path if appropriate.

These are different situations. A blank page should not leave the user guessing.

## Delete safely

Deleting a post is destructive. The admin interface must ask for confirmation, offer a cancel path, and show success only after Firestore confirms deletion. Firestore Rules must reject delete requests from public and ordinary users, even if they skip the confirmation UI.

## Guided learning activity

1. Sketch a table with title, category, status, created, updated, and published fields.
2. Add a row of actions and identify which need a confirmation step.
3. Draw the four states (loading/empty/success/error).
4. Create a test matrix for visitor, unverified user, ordinary verified user, and admin.
5. When implemented, test both clicking Cancel and confirming delete; also test a direct unauthorized request.

## Common beginner mistakes

- **Showing a blank table during loading:** show a loading state.
- **Treating no data as an error:** empty is a valid result.
- **Reporting success before a database response:** wait for Firestore confirmation.
- **Deleting immediately on one click:** provide a clear confirmation and cancel option.
- **Protecting only the route:** Firestore Rules remain necessary.

## Recap

An admin dashboard manages records and must explain its loading, empty, success, and error states. Confirm deletes. Enforce admin-only access in the database, not just the UI.

**I can explain this if I can answer:** What is the difference between empty and error? Why confirm a delete? What happens if a non-admin sends a direct delete request?

## Sources and verification

- Session source: `docs/initial-project-docs/master-execution-plan.md`, Session 7.
- Functional/security source: BRD and TDD blog-management requirements.
