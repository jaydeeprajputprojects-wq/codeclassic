# Session 02 — Questions and Answers

## 1. Why are there separate `components/layout` and `pages` folders?

They separate the reusable site frame from route-specific content.

`src/components/layout/` contains `Header.jsx`, `Footer.jsx`, and `Layout.jsx`. `src/pages/` contains `Home.jsx`, `Blogs.jsx`, `About.jsx`, `Login.jsx`, and `QAComingSoon.jsx`. This lets several routes reuse the same header and footer without copying them into every page.

## 2. Why does the mobile toggle sit in one ribbon but open another?

The button is in the upper brand ribbon, while the collapsible navigation is in the lower dark ribbon.

In `Header.jsx`, the button targets `#primaryNavigation`. The lower ribbon has the element with `id="primaryNavigation"`. Bootstrap uses that matching target to open or close the navigation panel on smaller screens. If the ID and target do not match, the button may appear but control nothing.

Parent-verified browser check on 2026-11-15: at 390px the top-right button opened the menu, and choosing Home closed it after Bootstrap's transition settled. At 1280px, the desktop navigation was visible and the mobile toggle was hidden.

## 3. What is the difference between selecting a category and seeing category posts?

Selecting a category changes the route; it does not mean the posts exist.

For example, the Blog menu can navigate to `/blog/spring-boot`. `App.jsx` sends that address to `Blogs.jsx`, which uses the category value to make a heading. The page currently says the blog listing and category pages will be built in Session 4; it does not load posts.

## 4. The menu button does not open the dark ribbon. What should I check?

First compare the button's target with the navigation panel's ID.

In `Header.jsx`, check `data-bs-target="#primaryNavigation"` against `id="primaryNavigation"`. Then confirm `src/main.jsx` imports `bootstrap/dist/js/bootstrap.bundle.min.js`. A typo in the target or a missing Bootstrap bundle can prevent the interactive collapse behavior. If both are present, inspect the browser console for an error. The parent verified the expected behavior at 390px on 2026-11-15; that does not guarantee a later code change or a different browser environment will behave the same way.

## 5. Why does a page show the header and footer around it?

The route is nested under the route that renders `Layout`.

The child page is inserted into the `<Outlet />` in `Layout.jsx`. If a route were moved outside that parent, it would not automatically use this shared frame. Check the nesting in `App.jsx` if a route unexpectedly loses the header or footer.

## 6. Do the YouTube, LinkedIn, and Instagram labels open accounts?

No. They are currently text placeholders, not links.

`Header.jsx` renders each name in a `<span>` with a title explaining that the profile is not configured. There is no account URL in those spans. The parent verified that the names are displayed as inert placeholders; the social URLs remain unconfigured, so do not claim these are live social links or invent destinations.

## 7. Is the Home page complete because `/` displays a heading?

No. The route and a placeholder component are present, but the planned homepage is later work.

`Home.jsx` currently shows “Welcome to Code Classic” and says the homepage will be built in Session 3. Session 2 establishes the shared frame and routes; it does not finish the homepage design.

## 8. What may appear on the Q&A page right now?

Only the Coming Soon placeholder.

`QAComingSoon.jsx` explains that community Q&A is planned for a future release. Do not add question lists, answers, search, comments, or submission controls. A menu item and route do not change the Phase 1 boundary.

The parent verified that `/qa` displayed “Q&A Coming Soon” without buttons, inputs, or textareas. This confirms the placeholder state, not a working Q&A feature.

## 9. I found `vite.svg` or `react.svg`. Is it safe to delete it?

Not until you have checked that the whole project no longer refers to it.

The current source files inspected for this lesson do not import those two files from `src/assets/`, but another file could still refer to them. Search for the filename first. Also note that `index.html` currently references `/favicon.svg`; deleting that public asset without replacing the reference would leave a broken favicon path.

## 10. Practice: Trace what happens when someone chooses “Java” from Blog.

Start with the category item in `src/components/layout/Header.jsx`. It builds a path under `/blog/`. Then find `path="blog/:category"` in `src/App.jsx`. That route selects `Blogs.jsx`, and the selected component appears in `Layout.jsx` at `<Outlet />`.

Check your understanding: does this show a real list of Java posts? No. The current component displays a category-based heading and placeholder message only.

## 11. What does it mean when a direct request to a route returns the SPA entry file?

It means the server returned the React application's starting HTML page for that URL. React Router then selects the page component in the browser.

The parent verified direct requests to `/`, `/blog`, `/blog/java`, `/qa`, `/about`, `/login`, and `/missing-route` returned the SPA entry. The route table in `App.jsx` still decides what the app renders; the wildcard route defines the in-app not-found card. A successful response by itself does not prove that the page's product feature is complete.

## 12. Why is `global.css` imported after Bootstrap CSS?

The Code Classic stylesheet contains custom rules for the shared shell and can override Bootstrap defaults when the CSS cascade allows it.

The import order is visible in `src/main.jsx`: Bootstrap CSS is imported before `./styles/global.css`. Import order alone does not guarantee that every custom selector wins; selector specificity and other CSS rules also matter. If a style does not appear, inspect the matching selectors and the browser's computed styles.

## 13. What does “In Progress” mean for Session 2?

The shared layout and placeholder routes exist, but the milestone is not represented as fully accepted.

The Phase 1 session report records Session 2 as In Progress. The parent verified branch `feature/session-2`, HEAD `ad4a201`, no upstream marker, and local modified/untracked files. Session work is not committed or pushed. Successful lint, build, and browser checks do not change the report status or mean the later homepage, blog, authentication, and publishing features are done.

The parent also ran `npm run lint` and `npm run build` successfully on 2026-11-15. These results were not rerun during this learning-guide update, and no feature-level automated test result is claimed here.
