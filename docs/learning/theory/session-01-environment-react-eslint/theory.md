# Session 01 — Environment, React, JavaScript, and ESLint

- **Roadmap phase:** Frontend foundation
- **Prerequisite:** None
- **Learning status:** Starter files are present locally; completing the learning activity is not evidence that the full session milestone passed.

## What you will learn

- Explain what Node.js, npm, Vite, React, and ESLint each do.
- Find the browser entry point in `src/main.jsx` and the visible page component in `src/App.jsx`.
- Explain how a React component returns JSX (HTML-like UI written inside JavaScript).
- Describe how `useState` and a click event update the starter counter.
- Run the existing lint and production-build scripts and understand what each checks.
- Explain why Vue is an alternative framework, not a dependency in this project.

## Why this matters in Code Classic

The first roadmap session creates a working application foundation. Before building Code Classic pages, understand which tool starts the development server, which file displays the page, and how the browser receives changes. That makes later errors less mysterious.

## The tools: a simple picture

Imagine making a small shop:

- **Node.js** is the workshop engine that can run JavaScript tools on your computer. It is not the website visitors' browser.
- **npm** is the supply desk. It installs project packages and runs named commands from `package.json`.
- **Vite** is the quick local workbench. It serves the app while you edit and prepares optimized files for deployment.
- **React** is the method used to build the page from reusable UI pieces.
- **ESLint** is a careful reviewer that points out suspicious or inconsistent JavaScript before it becomes a bug.

In this project, `package.json` currently has `dev`, `build`, `lint`, and `preview` scripts. It also lists React, Vite, and ESLint dependencies. Bootstrap, React Router, Firebase, and Vue are not currently in that manifest.

## JavaScript and React components

JavaScript is the programming language. React is a library written for building user interfaces with JavaScript.

A **component** is a reusable piece of a screen (Hindi gloss: UI ka dobara istemal hone wala hissa). For example, a future `Header` component can draw the same header on the Home and Blog pages.

In `src/App.jsx`, the `App` function is a component. It returns JSX:

```jsx
function Greeting() {
  const name = 'Code Classic'
  return <h1>Welcome to {name}</h1>
}
```

- `function Greeting()` defines a component.
- `const name` stores a value that does not get reassigned.
- `{name}` places a JavaScript expression inside JSX.
- `<h1>` describes the visible heading.

JSX looks like HTML, but it is written inside JavaScript and follows some React rules. For example, React components normally begin with a capital letter.

## State and events in the current starter

The current `src/App.jsx` uses:

```jsx
const [count, setCount] = useState(0)
```

Think of **state** as a small notebook React watches. `count` is the current value; `setCount` asks React to change it. When it changes, React draws the affected UI again.

The button uses:

```jsx
onClick={() => setCount((count) => count + 1)}
```

When clicked, this event handler asks React to use the previous count and add one. This is how the displayed counter changes without reloading the whole page.

## Where the app starts

`src/main.jsx` finds the HTML element whose id is `root`, then asks React to render `<App />` inside it. `index.html` supplies that root element. A simplified flow is:

```text
index.html has #root → src/main.jsx mounts React → App.jsx returns the visible page
```

When you edit `App.jsx`, Vite's development server can update the browser quickly through Hot Module Replacement (HMR). HMR means the page can reflect many code edits without a full manual restart.

## ESLint: helpful warnings, not a guarantee

The current `eslint.config.js` enables recommended JavaScript checks plus React Hooks and React Refresh checks. The command `npm run lint` asks ESLint to inspect project files.

Linting can catch examples such as an undefined variable or a React Hook being used in the wrong place. It cannot prove the app meets the BRD, looks correct, or is secure. A successful lint run is one check—not all testing.

## React and Vue: a beginner comparison

Both React and Vue can build browser interfaces. They are alternative choices, like two different tool sets for making a similar kind of furniture.

- Code Classic's baseline selects **React**.
- **Vue is not installed or planned in the current stack.** Do not add Vue just because it is mentioned in a learning comparison.
- React commonly expresses UI with JSX in JavaScript files. Vue commonly uses single-file components with template, script, and style sections.
- Concepts such as reusable components, data, events, and UI updates exist in both, but their APIs and file patterns differ.

Learn the selected project stack first. A Vue comparison is extra framework knowledge, not a Phase 1 project step.

## Guided learning activity

1. Open `package.json` and find the four scripts.
2. Open `src/main.jsx`. Trace the `createRoot` call to the `<App />` component.
3. Open `src/App.jsx`. Find `useState`, the click event, and the text that displays the counter.
4. In a terminal at the project root, run `npm run lint`. Read the output; do not assume a blank-looking output means the production build ran.
5. Run `npm run build`. This creates deployable files under `dist/`; it does not deploy them to the Internet.
6. If the Vite server is running, click the counter in the browser and observe the value change. The project owner reported a local server running, but a check of `http://localhost:5173` could not connect during this guide's preparation. Start the server only when needed with `npm run dev`; use the exact URL Vite prints.

## Common beginner mistakes

- **Confusing npm with Node.js:** Node runs the tools; npm installs packages and runs scripts.
- **Editing the wrong file:** `main.jsx` mounts the app; `App.jsx` currently provides the starter page.
- **Calling JSX plain HTML:** JSX has HTML-like tags but lives in JavaScript and has React rules.
- **Changing state directly:** use `setCount(...)`, not `count = count + 1`.
- **Treating ESLint as a test suite:** lint checks code patterns; build checks whether Vite can produce output; interaction and security need separate tests.
- **Thinking a successful build means deployment:** `npm run build` only creates local output.
- **Installing Vue to compare it:** comparison does not make Vue part of the project.

## Recap

Node/npm run and manage tools, Vite serves and builds the app, React renders components, JavaScript expresses behavior, and ESLint highlights some code-quality problems. `main.jsx` mounts `App.jsx`, and React state updates the counter after a click.

**I can explain this if I can answer:** Which file mounts React? Which file draws the starter screen? What does `setCount` do? How is `npm run build` different from `npm run dev`? Is Vue part of this project's baseline?

## Sources and verification

- Current files inspected: `package.json`, `eslint.config.js`, `vite.config.js`, `src/main.jsx`, and `src/App.jsx`.
- Current validation: `npm run lint` passed; `npm run build` passed.
- Server check: `http://localhost:5173` did not respond at guide preparation time; Vite may use another port or may not have been running.
- Roadmap source: `docs/initial-project-docs/master-execution-plan.md`, Session 1.
