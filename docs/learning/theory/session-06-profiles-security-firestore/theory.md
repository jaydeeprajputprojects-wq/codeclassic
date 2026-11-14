# Session 06 — Profiles, Firestore, and Security Rules

- **Roadmap phase:** Firebase and authentication
- **Prerequisite:** Session 05
- **Learning status:** Planned; Firestore and security rules are not yet present in the current starter app.

## What you will learn

- Explain the purpose of Firestore collections and documents.
- Describe the planned `users` and `posts` data.
- Tell the difference between a route guard and database security.
- Explain trusted administrator custom claims.
- Understand why public queries must ask for published posts.
- Name positive and negative security tests.

## Collections and documents

Firestore is a document database. A **collection** groups documents; a **document** stores fields. The TDD proposes:

```text
users/{userId}
posts/{postId}
```

Think of a collection as a filing cabinet drawer and each document as one labeled folder. A post document may store title, slug, content, status, timestamps, and creator ID. Only store profile fields needed by the app.

## Route guards are not database locks

A **route guard** hides or redirects the admin page in the React interface. It improves user experience, but a person can still try to call Firestore directly.

**Firestore Security Rules** are the real permission check at the database. They decide whether a read/write is allowed, even if a visitor bypasses the interface.

The planned policy allows public reads of published posts, keeps drafts private, and limits management writes/deletes to verified admins.

## Admin claims

A **custom claim** is a trusted role flag in a Firebase ID token, such as `admin: true`. It must be assigned by a trusted server/admin process—not by a registration form, browser storage, or a user-editable profile field. A verified email does not make someone an admin.

## Query rules

Security rules do not automatically remove unauthorized rows from a query. Public pages should query only `PUBLISHED` posts, while rules independently deny draft access. Test a direct draft read as well as the normal page.

## Guided learning activity

1. Draw `users` and `posts` as two collections; add one sample document to each.
2. Create a role table: public, verified normal user, unverified user, verified admin.
3. For each role, decide whether it can read a published post, a draft, or delete a post.
4. Mark which checks happen in React (navigation/UI) and which must happen in Firestore Rules (data access).
5. When rules exist, use the Firebase Emulator where feasible to test allowed and denied operations.

## Common beginner mistakes

- **Storing `admin: true` in an editable profile:** users could self-promote.
- **Trusting a hidden admin button:** direct database requests can bypass UI.
- **Expecting rules to filter queries:** queries must explicitly select allowed data.
- **Testing only allowed behavior:** denied operations are essential security tests.
- **Putting extra personal details in profiles:** store only data required by the product.

## Recap

Firestore stores documents in collections. React route guards control the screen; Firestore Rules protect data. Admin claims come from a trusted process. Public pages query published posts and rules deny drafts.

**I can explain this if I can answer:** What is a document? Why does a route guard not secure Firestore? Who assigns an admin claim? How do you test draft privacy?

## Sources and verification

- Technical source: `docs/initial-project-docs/tdd-docs.md`, database and security sections.
- Session source: `docs/initial-project-docs/master-execution-plan.md`, Session 6.
