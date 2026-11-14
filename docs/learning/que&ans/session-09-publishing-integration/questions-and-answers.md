# Session 09 — Questions and Answers

## 1. What does publishing change?

It changes the post's status to the public state (planned as `PUBLISHED`) and records publication information according to the agreed data model.

## 2. How is unpublishing different from deleting?

Unpublishing changes visibility while keeping the post. Deleting removes the record after admin confirmation.

## 3. Why must the public query filter for published posts?

It keeps normal public views focused on released content. Firestore Rules must also deny draft reads independently.

## 4. What is a regression test?

A test repeated after a change to make sure previously working behavior still works.

## 5. Which roles should be tested after integration?

At least a public visitor, a verified ordinary user, and an administrator. Also test unverified access where authentication rules apply.

## 6. What should an unavailable blog URL show?

A clear not-found or unavailable state, without leaking a private draft.

## 7. Practice: A post was unpublished, but the public detail URL still opens it. What should be checked?

**Answer:** Check the public detail query and Firestore rule. Both must prevent access to a draft/unpublished record.

## Troubleshooting: The admin can publish, but the homepage does not update. What should you inspect?

Check that the write succeeded, the public query filters correctly, the page refreshes/reloads its data, and the published field name/status matches the schema.
