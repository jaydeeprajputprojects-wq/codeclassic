# Session 06 — Questions and Answers

## 1. What is a Firestore collection?

A collection is a group of documents, similar to a folder containing related records.

## 2. What is a Firestore document?

A document stores one record's fields, such as one user's profile or one blog post.

## 3. Why is a React route guard not enough to secure data?

It only controls what the normal interface shows. A user can attempt direct database requests, so Firestore Security Rules must enforce permissions.

## 4. How should admin privileges be assigned?

Through a trusted admin process using a Firebase custom claim. A user must not be able to set their own role in a profile field or browser storage.

## 5. Does email verification make a user an admin?

No. Verification proves email status; a separate trusted admin claim grants administrator privileges.

## 6. Why should a public query filter for published posts?

It asks Firestore for the data the public page should show. Security Rules must still deny access to drafts because query filtering alone is not a security boundary.

## 7. Practice: Name a positive and a negative security test.

**Answer:** Positive: public visitor reads a published post. Negative: public visitor tries to read a draft and is denied.

## Troubleshooting: An ordinary user sees a permission error on the admin dashboard. Is that always a bug?

Not necessarily. If the user is correctly blocked from admin data, the permission denial may be expected. Verify the account role and the intended rule.
