# Session 02 — Bootstrap, Routing, and Shared Layout

- **Roadmap phase:** Frontend foundation
- **Prerequisite:** Session 01 — Environment, React, JavaScript, and ESLint
- **Learning status:** **Complete — owner-accepted.** The owner has marked Session 2 complete, and the Phase 1 session report now records Session 2 as **Accepted per owner direction**. The shared layout and route placeholders are present in the repository. The parent reported passing lint/build checks and the browser observations listed below on 2026-11-15; these are verification evidence for the shared-layout milestone, not proof that later product features work. Git was observed on branch `feature/session-2` at local commit `310d7d1`, with a clean worktree at the time of the check. No upstream was configured, so no remote push is confirmed; this is a local commit only. The owner will supply the actual social account URLs later; adding them is an optional deferred follow-up, not a blocker for Session 2 completion. Later product features remain planned work.

## Key words for this lesson

- **React Router** is the library in this project that connects web addresses to React pages.
- **Bootstrap** is a user-interface toolkit with ready-made styles and interactive controls.
- **CSS** is a set of rules that controls how a page looks. A **stylesheet** is a file containing CSS rules.
- A **URL** is a web address, such as `/about`.
- A **bundle** is a packaged set of code; here, Bootstrap's JavaScript bundle supplies interactive behavior.
- A **route** connects a URL to a page. A **nested route** is a route placed inside a parent route so it can share the parent's layout.
- A **component** is one piece of the interface. A **layout** is the shared frame around page content.
- An **outlet** is the space where the selected nested page appears.
- **Responsive** means the page adjusts to different screen widths, including mobile.

## What you will learn

- Trace how `src/main.jsx` loads Bootstrap, custom CSS, and the router around the app.
- Describe how nested routes in `src/App.jsx` place one of five page components inside a shared layout.
- Find the header, footer, main content slot, and navigation behavior in their current files.
- Explain the mobile menu, Blog category dropdown, and the difference between navigation and real blog content.
- Identify safe checks to make before removing unused Vite starter files.

## Why these concepts matter in Code Classic

Code Classic needs the same brand header, navigation, and footer on different pages. A shared layout keeps those parts in one place. React Router selects which page to show for a URL, and Bootstrap supplies ready-made responsive styles and interactive controls.

The current implementation is still a frontend frame with placeholder page content. The Home, Blogs, About, and Login pages are not finished product features. Q&A must remain a Coming Soon placeholder only.

## A simple analogy: a building with shared halls and rooms

Think of a building with one entrance, one hallway, and several rooms. The hallway is shared, but each room has a different purpose.

- A **route** is a rule that connects a browser address, such as `/about`, to a page.
- A **component** is a piece of the interface. `Header`, `Footer`, and `Home` are components.
- A **layout** is the shared frame around page content. Code Classic's `Layout` holds the header, main area, and footer.
- A **nested route** is a page route placed inside a parent route. It reuses the parent's layout.
- An **outlet** is a marked space where the selected child page appears. React Router's `<Outlet />` is that space (shared frame ke andar page ki jagah).
- **Responsive** means the interface adapts to different screen widths, including mobile.

## How the current files fit together

### Folder roles

| Location | Role in the current project |
|---|---|
| `src/main.jsx` | Browser entry point: imports styles and Bootstrap behavior, then renders the app inside the router. |
| `src/App.jsx` | Route map: connects URLs to page components beneath `Layout`. |
| `src/components/layout/` | Reusable shared shell components: `Header.jsx`, `Footer.jsx`, and `Layout.jsx`. |
| `src/pages/` | Components for route-specific page content: `Home.jsx`, `Blogs.jsx`, `About.jsx`, `Login.jsx`, and `QAComingSoon.jsx`. |
| `src/styles/global.css` | Shared project styles for the page background, ribbons, menu, placeholder card, and footer. |
| `src/assets/` | Images or other assets imported by source files. Check references before removing any file. |
| `public/` | Files served as public assets. A file here can be referenced by a root URL in the browser. |

These are responsibilities, not rules that every future component must fit without thought. For this session, keep the shared shell in `components/layout` and route content in `pages`.

### 1. Start-up and style order

The current `src/main.jsx` imports Bootstrap's CSS first, then Bootstrap's JavaScript bundle, and then the Code Classic stylesheet:

```jsx
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/global.css'
import App from './App.jsx'
```

What each line contributes:

1. `BrowserRouter` lets the application use React Router's browser URL and navigation history.
2. Bootstrap CSS provides Bootstrap's ready-made visual classes.
3. The Bootstrap bundle provides JavaScript behavior for controls such as the collapsed navigation and dropdown.
4. `global.css` adds the project's shared visual rules after Bootstrap's stylesheet.
5. `App` is the route tree that React will render.

Later CSS can override earlier CSS when the selectors and other cascade rules allow it. That is why the order is worth noticing; it does not mean every custom rule always wins.

The entry point renders the app inside `<BrowserRouter>`. The router wrapper must be above the routes and router links that use it. The current `package.json` lists `bootstrap` and `react-router-dom` as dependencies.

### 2. Route map and shared frame

Here is a small excerpt matching the current route structure in `src/App.jsx`:

```jsx
<Routes>
  <Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="blog" element={<Blogs />} />
    <Route path="blog/:category" element={<Blogs />} />
    <Route path="qa" element={<QAComingSoon />} />
  </Route>
</Routes>
```

Read it from the outside inward:

1. `<Routes>` holds the route rules.
2. The parent route renders `<Layout />`. It has no `path`, so it supplies a shared frame rather than a separate address.
3. `index` means the default child page at `/`, which is `Home`.
4. `path="blog"` matches `/blog`.
5. `path="blog/:category"` matches a category address such as `/blog/java`. The colon marks `category` as a URL value.
6. `path="qa"` matches `/qa`.

The complete `App.jsx` also has `/about`, `/login`, and a wildcard route for an unrecognized address. A **wildcard** is a rule that can match paths not handled by the more specific routes. The `*` route shows a not-found card. All these routes are nested under `Layout`.

In `src/components/layout/Layout.jsx`, the key structure is:

```jsx
<div className="site-shell">
  <Header />
  <main className="container flex-grow-1 py-5">
    <Outlet />
  </main>
  <Footer />
</div>
```

- `<Header />` draws the common top area and navigation.
- `<main>` is the central page area.
- `<Outlet />` is where React Router inserts the child selected by the current URL.
- `<Footer />` draws the common bottom area.

For `/about`, `App.jsx` selects `About`, and `Layout` displays it at the outlet. The header and footer remain around it.

### 3. Header ribbons and navigation

`src/components/layout/Header.jsx` contains two horizontal ribbons:

1. **Upper, light brand ribbon:** the linked Code Classic mark and name; desktop-only social-name placeholders and Login link; and the mobile menu button.
2. **Lower, dark navigation ribbon:** Home, Blog and its category dropdown, Q&A, About Us, and a Login item on smaller screens.

This placement matters: the mobile toggle button is in the **upper brand ribbon**, but its Bootstrap target is `#primaryNavigation`, the collapsible area in the **lower dark ribbon**. On a narrow viewport the button opens or closes that lower navigation panel.

The Blog dropdown currently includes All Blogs, Java, Spring Boot, Microservices, Azure, DevOps, SQL, System Design, and Others. A category choice creates a route such as `/blog/spring-boot`; it does not create or prove that category's blog content exists.

`Link` and `NavLink` are React Router navigation components. They change the app route without using an ordinary full-page web link. `NavLink` can also provide an active style. The Blog dropdown is a Bootstrap dropdown, and the header uses `useLocation()` to read the current route so Blog can receive an active style while the path starts with `/blog`.

The header also uses React **refs** (references to particular page elements) to refer to the mobile navigation and its toggle button. After a navigation choice on a narrow screen, `closeMobileNavigation` checks whether the panel is open and clicks the toggle to close it. Bootstrap's JavaScript bundle is imported in `main.jsx` for collapse and dropdown behavior.

**Social account note:** YouTube, LinkedIn, and Instagram currently appear as plain text spans with “not configured” titles. They are inert name placeholders, not clickable links, and must not be described as live social accounts. The owner will supply their actual URLs later. Adding those links is an optional deferred follow-up, not a requirement blocking the owner's Session 2 completion decision.

### 4. What the page components currently show

The routes and files are present, but their contents are temporary:

| Route | Current component | What it currently means |
|---|---|---|
| `/` | `Home.jsx` | A welcome placeholder; the homepage is planned for Session 3. |
| `/blog` | `Blogs.jsx` | A blog-listing placeholder; listing and category pages are planned for Session 4. |
| `/blog/:category` | `Blogs.jsx` | Uses the URL category to make a heading, but does not show real posts. |
| `/about` | `About.jsx` | An About placeholder. |
| `/login` | `Login.jsx` | A login placeholder; authentication is planned for Session 5. |
| `/qa` | `QAComingSoon.jsx` | A Coming Soon message only. |
| Other paths | Inline not-found card in `App.jsx` | Says the requested page does not exist. |

Do not add questions, answers, search, comments, or submission controls to Q&A. A visible Q&A route is not permission to build functional Q&A; Phase 1 allows only the Coming Soon placeholder.

### 5. Safe cleanup of Vite starter files

Vite's starter can leave logos, example styles, or template text behind. Cleanup should be based on references, not guesses.

1. Inspect imports in `src/main.jsx`, `src/App.jsx`, the components, and page files. Search the repository for the exact filename or asset path before deleting it.
2. In the current `src/assets/` folder, `react.svg` and `vite.svg` are starter-looking files. They are not imported in the current source files inspected for this lesson. Confirm there are no other references before deciding whether to remove them.
3. Keep `src/styles/global.css`: it is imported by `main.jsx` and contains the current Code Classic styling.
4. Keep configuration and dependency files such as `package.json`, the lockfile, `vite.config.js`, and ESLint configuration unless there is a specific, understood reason to change them. They are project setup, not disposable page examples.
5. `index.html` currently references `/favicon.svg`; do not remove the corresponding public favicon unless you also intentionally replace that reference. Check `public/` references before removing any other public file.
6. The root `README.md` still contains generic React + Vite template instructions. That text is not part of the rendered site, but changing it is separate from this lesson and should be done deliberately.

Do not delete files as part of this reading activity. First identify what each file does and confirm its references. This lesson update does not change application code.

## Guided learning activity

Use the current repository. These steps are inspection exercises; they do not ask you to edit or delete application files.

1. Open `src/main.jsx`. Point to the Bootstrap CSS import, Bootstrap bundle import, `global.css` import, and `<BrowserRouter>` wrapper. Explain why the custom stylesheet comes after Bootstrap CSS.
2. Open `src/App.jsx`. Follow the `/qa` child route upward to the parent route and name the layout component.
3. Open `src/components/layout/Layout.jsx`. Find `<Outlet />` and describe what appears there at `/blog/java`.
4. Open `src/components/layout/Header.jsx`. Find the toggle button's `data-bs-target`, then find the element with the matching `id`. Notice that the button is in the upper ribbon and the matching collapsible element is in the lower dark ribbon.
5. Find the `categories` list and follow how a category becomes a URL. Then open `src/pages/Blogs.jsx` and observe that it displays a heading and placeholder text, not blog data.
6. Open `src/pages/QAComingSoon.jsx`. Confirm that it contains only a Coming Soon message and no interactive Q&A features.
7. Before suggesting cleanup, search for references to `src/assets/react.svg` and `src/assets/vite.svg`. Also check that `index.html` still points to the public favicon.
8. Use the parent-verified browser observations below as a reference. If you run the app yourself, repeat the mobile and desktop checks rather than assuming your own changes behave the same way.

## Parent-verified checks (2026-11-15)

The parent ran the checks below after the Session 2 changes. They were not rerun while editing this learning guide.

- **Lint and build:** `npm run lint` and `npm run build` both passed.
- **Direct route requests:** requests to `/`, `/blog`, `/blog/java`, `/qa`, `/about`, `/login`, and `/missing-route` returned the SPA entry file. This means the server returned the React application's starting page for those paths. React Router then decides which component to display. In `App.jsx`, the wildcard route defines the in-app not-found card for an unknown path.
- **Mobile at 390px:** the hamburger button was visible at the top-right. It opened the menu, and choosing Home closed it after Bootstrap's transition settled. A transition is the short animation while the menu changes state.
- **Desktop at 1280px:** the desktop navigation was visible and the mobile toggle was hidden.
- **Blog navigation:** the Blog dropdown opened, and `/blog/java` displayed “Java Blogs”. This is a heading on a placeholder page, not a list of real blog posts.
- **Social names:** YouTube, LinkedIn, and Instagram were visible as inert placeholders. The owner will supply their actual URLs later; do not invent or add links before then. This is optional deferred follow-up, not a completion blocker.
- **Q&A:** `/qa` displayed “Q&A Coming Soon” with no buttons, inputs, or textareas. The page remains non-functional, as Phase 1 requires.
- **Git snapshot:** Git was observed on branch `feature/session-2` at local commit `310d7d1`, with a clean worktree at the time checked. No upstream was configured. This is a local commit only; a remote push is not confirmed.

These lint, build, and browser checks are evidence for the shared-layout and placeholder milestone, but they do not prove that blog, authentication, functional community Q&A, or deployment features are complete. They were not rerun while editing this guide. No feature-level automated test result is claimed here.

## Common beginner mistakes

- **Mistake: treating `Outlet` as the route list.**
  The route rules are in `App.jsx`. `Outlet` is only the display slot inside `Layout`.
- **Mistake: putting a page outside the layout route.**
  It may miss the shared header and footer. Check the indentation and nesting in `App.jsx`.
- **Mistake: assuming a route means a feature is finished.**
  Open the matching page component. Current pages are placeholders; the Blog category heading is not a list of blog posts.
- **Mistake: looking for the mobile menu button in the dark ribbon.**
  The button is in the upper light ribbon. Its target is the collapsible panel in the lower dark ribbon.
- **Mistake: calling the social names working links or treating their URLs as a completion blocker.**
  They are `<span>` placeholders without destinations. The owner will supply the real URLs later; adding them is optional deferred follow-up.
- **Mistake: deleting a file because it looks like Vite demo content.**
  Search for imports and URL references first. Removing `favicon.svg`, for example, while `index.html` still refers to it can break the browser icon.
- **Mistake: adding working Q&A because the route exists.**
  Keep `/qa` as Coming Soon only. Functional Q&A is outside Phase 1.
- **Mistake: treating a successful direct request as proof that a page feature works.**
  A server can return the SPA entry for a path, while the React page at that path is still only a placeholder. Check the content that React renders as well as the response.

## Recap

`main.jsx` loads the router and Bootstrap, then the custom global stylesheet. `App.jsx` maps URLs to page components nested under `Layout`. `Layout` places its matched child at `<Outlet />` between the shared `Header` and `Footer`. The mobile toggle lives in the upper brand ribbon and controls the lower dark navigation ribbon. Blog categories are navigation destinations, while page content remains placeholder material. Social names are inert placeholders, and Q&A stays Coming Soon only.

**I can explain this if I can answer:** Which component selects a page for `/about`? Where does that page appear inside the shared shell? What does clicking a Blog category prove—and what does it not prove?

## Sources and verification

- `src/main.jsx` — current BrowserRouter wrapper, Bootstrap CSS and bundle imports, and `global.css` import order.
- `src/App.jsx` — current nested route definitions for Home, Blogs, Q&A, About, Login, and not-found.
- `src/components/layout/Header.jsx`, `Footer.jsx`, and `Layout.jsx` — current two-ribbon header, menu/dropdown markup, shared footer, and outlet placement.
- `src/pages/Home.jsx`, `Blogs.jsx`, `About.jsx`, `Login.jsx`, and `QAComingSoon.jsx` — current placeholder page content.
- `src/styles/global.css` — shared Code Classic shell, ribbon, menu, and placeholder styles.
- `src/assets/`, `public/`, and `index.html` — starter-asset cleanup examples and the current favicon reference.
- `package.json` — current Bootstrap and React Router dependencies.
- `docs/initial-project-docs/master-execution-plan.md`, Session 2 — frontend foundation milestone; Sessions 3 and 4 follow with the homepage and blog pages.
- `docs/initial-project-docs/front-end-UI-design-doc.md`, Section 6 — two-ribbon header, navigation, categories, and responsive behavior.
- `docs/initial-project-docs/brd-docs.md` and `tdd-docs.md` — Phase 1 and technology baseline, including placeholder-only Q&A.
- `docs/context/project-context.md` — current project structure and earlier project observations. For this update, the owner supplied the current Session 2 completion status and Git check: local commit `310d7d1` on `feature/session-2`, clean worktree at the time checked, no upstream configured, and no confirmed push.
- `docs/context/manuallchanges.md` — present and empty when inspected; it supplied no additional implementation details.
- `docs/report/phase-1-session-report.md` — now records Session 2 as **Accepted per owner direction**. This report status matches the owner-accepted completion described in this guide.
- **Verification boundary:** File paths, imports, route structure, placeholder content, and social-name spans were verified by inspecting current source. The parent reported that lint/build passed and verified the direct-route behavior, responsive menu, Blog dropdown/category heading, and Q&A Coming Soon page without controls on 2026-11-15; these checks were not rerun while editing these learning files and do not establish that the placeholder pages have full product functionality. Git was observed at local commit `310d7d1` on `feature/session-2`, with a clean worktree at the time checked and no upstream; it is a local commit only, with no confirmed push. The owner will supply social URLs later; they remain optional deferred follow-up. No application code was changed.
