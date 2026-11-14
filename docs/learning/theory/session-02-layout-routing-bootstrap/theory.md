# Session 02 — Bootstrap, Routing, and Shared Layout

- **Roadmap phase:** Frontend foundation
- **Prerequisite:** Session 01
- **Learning status:** Planned roadmap topics; Bootstrap and React Router are not yet listed in the current package manifest.

## What you will learn

- Explain why a website uses shared layout components.
- Tell the difference between a URL/route and a React component.
- Describe what React Router is planned to do.
- Describe Bootstrap as a responsive styling toolkit.
- Explain how a navigation link differs from a full-page browser reload.
- Identify why Q&A must lead only to a Coming Soon placeholder.

## Why this matters in Code Classic

The header, navigation, and footer should feel consistent on every page. Routing lets a visitor move from Home to Blogs while the React app stays loaded. Bootstrap can help with responsive layout, but visual decisions still follow the UI specification.

## Analogy: rooms and signposts

Think of the website as a building. A **route** is the name on a room door, such as `/blogs`. A **page component** is what is inside that room. **Navigation** is the signpost helping visitors move between rooms. A shared layout is like the same building entrance and exit appearing for each room.

## Key ideas

- **Component:** reusable UI such as `Header` or `Footer`.
- **Route:** a URL pattern connected to a page, such as `/` to Home.
- **Client-side routing:** changing the visible page within the already-loaded web app instead of asking the server for a whole new HTML page each time.
- **Bootstrap:** CSS classes and UI patterns that help build common layouts and responsive elements. It does not automatically make every design accessible or correct.
- **Responsive design:** layout adjusts to screen size, for example desktop columns stacking on a phone.

The roadmap plans to install Bootstrap 5 and React Router in Session 2. Since they are not in the current `package.json`, treat examples with them as future work until dependencies are added deliberately.

## Illustrative route idea

```text
/        → HomePage
/blogs   → BlogListPage
/about   → AboutPage
/qa      → ComingSoonPage (static only)
```

The Q&A route can explain that the feature is planned. It must not pretend that real questions or answers exist.

## Shared layout idea

```jsx
function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

This illustrative example says: draw the shared header, place the current page inside `<main>`, then draw the shared footer. `children` means “the UI placed inside this component.”

## Guided learning activity

1. Draw three boxes: shared header, page content, shared footer.
2. Write the URLs `/`, `/blogs`, `/about`, and `/qa` beside the page each should show.
3. For `/qa`, write only “Coming Soon”; list the interactions that must not exist (questions, answers, comments, submissions).
4. Compare the desktop and mobile layouts in the UI design spec. Note what moves or collapses on a narrow screen.
5. When Session 2 is implemented, inspect each route in the browser and confirm the common header/footer remain present.

## Common beginner mistakes

- **A route is not a folder:** it is a URL rule that displays a component.
- **A link that refreshes the browser may lose app state:** use the project router's navigation link where appropriate.
- **Bootstrap is not the whole design:** custom colors, dimensions, and responsive behavior must follow the UI baseline.
- **Mobile means more than shrinking:** navigation may collapse and columns may stack.
- **Turning Q&A into a real feature by accident:** placeholder routes must not contain live-looking sample question links.

## Recap

Routing maps URLs to page components. A shared layout reuses common UI. Bootstrap can support responsive styling, while the UI spec defines what Code Classic should look like. Q&A is static Coming Soon only.

**I can explain this if I can answer:** What is a route? Why share a header component? What should `/qa` display in Phase 1?

## Sources and verification

- UI source: `docs/initial-project-docs/front-end-UI-design-doc.md`.
- Session source: `docs/initial-project-docs/master-execution-plan.md`, Session 2.
- Current package check: Bootstrap and React Router are not currently listed as dependencies.
