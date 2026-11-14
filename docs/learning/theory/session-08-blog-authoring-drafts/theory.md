# Session 08 — Blog Forms, Editing, and Drafts

- **Roadmap phase:** Blog management and publishing
- **Prerequisite:** Session 07
- **Learning status:** Planned; the app currently has no blog-authoring form.

## What you will learn

- Explain a form, field, and controlled input.
- Understand validation before saving.
- Describe create versus edit behavior.
- Explain the difference between a draft and published post.
- Identify why timestamps and clear errors matter.

## Forms collect structured information

A blog form collects fields from an administrator: title, description, Markdown content, category, tags, YouTube video ID, and optional thumbnail URL.

A **controlled input** is a form field whose displayed value is held in React state. When the user types, an event updates that state. React can then validate and submit the values.

## Validation before saving

Validation checks the input before sending it to the database. For example:

- Title must not be blank.
- Description and content must meet the approved size rules.
- Optional video ID and thumbnail URL must be valid if supplied.
- Status must be one of the allowed values.

Show errors near the field and do not claim the save succeeded unless Firestore confirms it.

## Create, edit, and draft

- **Create:** make a new post document.
- **Edit:** update an existing document while preserving protected fields such as creator and creation time.
- **Draft:** saved content that is not publicly visible.
- **Published:** content allowed for public reading.

Server timestamps help record when an operation really reached Firestore. The exact final schema must follow the TDD.

## Guided learning activity

1. Draw the fields needed for a blog post and mark required vs optional.
2. Write three validation examples: empty title, invalid video ID, long content.
3. Describe what should happen when Save Draft succeeds and when the network fails.
4. Explain which fields should stay unchanged during an edit (such as createdAt).
5. When implemented, create a draft, reopen it, edit it, and verify that it remains private.

## Common beginner mistakes

- **Saving a blank title:** validate before database writes.
- **Replacing the entire post accidentally:** preserve immutable creation fields.
- **Publishing a draft unintentionally:** make status actions clear and distinct.
- **Showing “Saved” before the write completes:** wait for the real result.
- **Putting secret data in a blog field:** content input is not a place for credentials.

## Recap

Forms gather post fields. React state holds input values. Validation catches mistakes before writing. Drafts remain private; publishing is a separate status change. Timestamps should be reliable.

**I can explain this if I can answer:** What is a controlled input? Why validate before saving? What should remain unchanged when editing a post?

## Sources and verification

- Session source: `docs/initial-project-docs/master-execution-plan.md`, Session 8.
- Data source: `docs/initial-project-docs/tdd-docs.md`, post schema.
