# Session 01 — Questions and Answers

## 1. What is the difference between Node.js and React?

**Short answer:** Node.js runs JavaScript tools on your computer; React helps build what users see in the browser.

Node runs commands such as Vite and ESLint. React components describe the user interface. They work together but have different jobs.

## 2. What is `npm run dev`?

It runs the `dev` script from `package.json`. In this project that script starts Vite's local development server. Open the exact URL printed in the terminal.

## 3. What is the difference between `npm run dev` and `npm run build`?

`dev` starts a local server for editing and quick feedback. `build` creates optimized files for deployment, usually inside `dist/`. Build does not publish the site.

## 4. Where does React start in this project?

`src/main.jsx` calls `createRoot(...)` and renders `<App />` into the HTML element with id `root`. `src/App.jsx` currently returns the visible Vite starter interface.

## 5. What does `useState` do in the starter counter?

It gives the component a value (`count`) and a function (`setCount`) to request a new value. When the button is clicked, the state changes and React updates the displayed count.

## 6. What does ESLint do? Does a passing lint mean the app is correct?

ESLint checks source code for some suspicious patterns and rule violations. A passing lint is useful, but it does not prove that the UI, business behavior, security, or deployment is correct.

## 7. Vue was mentioned. Is it part of this project?

No. The project baseline and current package file use React. Vue is another framework and is included only as a comparison unless the project baseline is changed.

## 8. Practice: How would you trace a change to the page?

**Answer:** Edit the component in `src/App.jsx`; React renders it through `src/main.jsx`; Vite can refresh the browser. Try explaining that flow without looking at the answer.

## Troubleshooting: The browser page does not open at `localhost:5173`. What should I check?

Look at the terminal running Vite and use the exact URL it prints. Another app may occupy port 5173, so Vite may choose a nearby port. If no server is running, start `npm run dev` from the project root.
