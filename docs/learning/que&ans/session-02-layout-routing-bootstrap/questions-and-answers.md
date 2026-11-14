# Session 02 — Questions and Answers

## 1. What is a route?

A route connects a URL pattern to a page in the app. For example, `/blogs` can display the blog listing page.

## 2. Why should the header be a shared component?

The header appears on several pages. A shared component avoids copying the same code and helps keep its appearance consistent. Change it once and all pages using it can update.

## 3. What does client-side routing mean?

The browser app changes which React page is visible without downloading a completely new page for every click. The URL still changes so the visitor can bookmark or share it.

## 4. What is Bootstrap?

Bootstrap is a UI toolkit with CSS classes and common layout patterns. It can help create responsive layouts, but it does not decide Code Classic's exact design for us.

## 5. What should the Q&A route show in Phase 1?

Only a clear Coming Soon placeholder. It must not show functional questions, answer forms, comments, search, or submissions.

## 6. Why do we test a route by entering its URL directly?

Visitors may open a bookmark or shared link. Direct navigation checks both routing and the host's fallback behavior.

## 7. Practice: A new page has no header. What concept might be missing?

**Answer:** The page may not be rendered inside the shared layout component. Trace the route tree and check where the header/footer are placed.

## Troubleshooting: Clicking a navigation link reloads the whole page. What should you inspect?

Check whether the link uses the router's navigation component rather than a normal full-page link where client-side navigation is intended.
