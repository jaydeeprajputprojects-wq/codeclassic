# Session 08 — Questions and Answers

## 1. What is a controlled input?

A form input whose current value is held in React state. React updates the value when the user types.

## 2. Why validate a form before saving?

Validation catches missing or invalid values early and helps protect the database from bad data.

## 3. What is the difference between a draft and a published post?

A draft is saved but private to authorized admins. A published post is available to public readers if the rules allow it.

## 4. What should happen if Firestore rejects a save?

Show an error, keep the user's form values if possible, and do not display a success message.

## 5. Which fields should not casually change during an edit?

Fields such as the document ID, original creator, and creation timestamp are usually preserved according to the TDD. Update timestamps should reflect the edit.

## 6. Is a thumbnail URL the same as uploading an image?

No. A URL points to an image hosted elsewhere. The Phase 1 baseline does not assume Firebase Storage.

## 7. Practice: An empty title is submitted. What should the app do?

**Answer:** Prevent the write and show a clear validation message near the title field.

## Troubleshooting: The page says “Saved” but the post did not appear. What should you check?

Confirm that the app waited for the Firestore write result, the user has permission, the correct collection/document is used, and errors are not being hidden.
