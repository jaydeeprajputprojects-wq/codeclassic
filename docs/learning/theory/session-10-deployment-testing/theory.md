# Session 10 — Build, Deployment, and Production Checks

- **Roadmap phase:** Deployment and completion
- **Prerequisite:** Sessions 01–09
- **Learning status:** Planned; deployment is not configured in the current starter.

## What you will learn

- Explain the difference between a development server and a production build.
- Understand what Cloudflare Pages deployment does.
- Describe environment variables and why privileged secrets must stay private.
- Explain SPA fallback for React Router routes.
- Plan production smoke tests and evidence capture.

## Development vs production

`npm run dev` starts a local development server for coding. `npm run build` creates optimized static files, normally in `dist/`. Cloudflare Pages can host those built files. Building locally is not the same as deploying.

**Analogy:** Development is a practice kitchen; the production build is the packed meal; deployment is delivering it to the customer.

## Environment and secrets

The browser app needs Firebase client configuration. Vite exposes variables with the `VITE_` prefix to browser code, so these values are public. Never put service-account keys, Admin SDK credentials, or private secrets in `VITE_` values or frontend source.

Production environment values are configured in the hosting dashboard, and their usage must match the build/deploy process. Do not paste secrets into screenshots, learning notes, or Git.

## Single-page application fallback

React Router handles paths in the browser. If a visitor directly opens `/blogs/my-post`, the web host must return the app entry page so React can read the URL and display the right component. The TDD describes an SPA fallback for Cloudflare Pages.

## Guided learning activity

1. Explain what `npm run dev` does and what `npm run build` does.
2. Find where the build output is created.
3. Draw a request for `/blogs/example` from browser to host to React Router.
4. Make a production checklist: public blog, verified sign-in, admin behavior, rules, mobile layout, browser console, and direct route loading.
5. Before deployment, search tracked files for environment files or credential JSON; do not display secret values.

## Common beginner mistakes

- **Assuming local success means production success:** production domains and environment settings differ.
- **Deploying the source instead of build output:** configure the correct build command/output.
- **Forgetting SPA fallback:** direct URLs may return a host 404.
- **Leaking secrets in browser variables:** any Vite-exposed value is visible to users.
- **Calling a deployment “tested” after it loads once:** test authentication, public access, admin authorization, routes, and database rules.

## Recap

The dev server helps you code; the production build prepares files; deployment hosts them. Configure SPA fallback for deep routes. Browser configuration is public; privileged keys never belong in the frontend.

**I can explain this if I can answer:** What does `dist/` contain? Why is Vite's `VITE_` prefix not secret? What does SPA fallback solve?

## Sources and verification

- Session source: `docs/initial-project-docs/master-execution-plan.md`, Session 10.
- Deployment source: `docs/initial-project-docs/tdd-docs.md`.
- Current state: Cloudflare Pages deployment and Firebase configuration have not been verified.
