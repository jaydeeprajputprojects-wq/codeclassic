# Session 04 — Questions and Answers

## 1. What is the difference between a preview and a detail page?

A preview shows short information to help choose a blog. The detail page contains the full article and its metadata.

## 2. What is pagination?

Pagination splits a long list into pages. The design specifies ten blog previews per listing page.

## 3. What is a slug?

A slug is a readable URL part such as `java-basics`. It can help locate a post, but it must be handled consistently and uniquely.

## 4. Why can Markdown still be unsafe?

Markdown may allow raw HTML or dangerous links depending on the renderer. Use safe rendering and sanitization; never blindly inject untrusted HTML.

## 5. What data should be saved for a YouTube embed?

The planned model stores the YouTube video ID. The UI constructs an embed URL from that validated ID instead of accepting arbitrary iframe HTML.

## 6. Does hiding a draft from the listing make it private?

No. Firestore Security Rules must deny direct draft reads. Hiding a link is only a UI change.

## 7. Practice: What should happen when a visitor opens a missing blog slug?

**Answer:** Show a clear not-found or unavailable message; do not show a blank page or accidentally show a different post.

## Troubleshooting: The Markdown heading appears with a `#` in the browser. What might be missing?

The page may be showing raw Markdown instead of passing the text to a Markdown renderer.
