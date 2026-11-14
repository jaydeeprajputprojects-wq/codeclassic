# Session 07 — Questions and Answers

## 1. What is the admin dashboard for?

It is a private interface where authorized administrators view and manage blog records.

## 2. Why display a loading state?

Database requests take time. A loading message tells the user that work is happening instead of making the screen look broken.

## 3. How is an empty state different from an error state?

Empty means the request succeeded but returned no records. Error means the request failed and the app could not get the data.

## 4. Why confirm before deleting a post?

Deletion is destructive. Confirmation gives the admin a chance to cancel an accidental action.

## 5. What must happen after the admin confirms deletion?

Wait for Firestore to confirm success, then update the list and show success. If Firestore rejects it, show an error instead.

## 6. Can a visitor delete a post by calling Firestore directly?

No. Security Rules must deny the request even if the visitor bypasses the dashboard.

## 7. Practice: What should Cancel do in the delete dialog?

**Answer:** Close the dialog and leave the post unchanged.

## Troubleshooting: The dashboard is blank with no message. Which states should you add?

Show distinct loading, empty, and error states, plus the normal list when records load successfully.
