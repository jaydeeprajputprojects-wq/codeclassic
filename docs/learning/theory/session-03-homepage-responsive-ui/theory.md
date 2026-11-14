# Session 03 — Homepage Layout and Responsive UI

- **Roadmap phase:** Frontend foundation
- **Prerequisite:** Session 02
- **Learning status:** Planned; the current app is still the Vite starter screen.

## What you will learn

- Read a three-column homepage as separate content regions.
- Explain why a page uses reusable cards and sample data.
- Understand CSS Grid or Bootstrap columns at a high level.
- Explain responsive breakpoints and mobile stacking.
- Describe the carousel as a changing banner, not a database.
- Keep the right sidebar's Q&A area as Coming Soon only.

## Start with the design, not code

The UI specification is a map. It describes a center column for the carousel and latest blogs, plus sidebars for recent content, Q&A Coming Soon, news, and reserved ad space. On smaller screens, the content must rearrange so it remains readable.

**Analogy:** Think of the page as a newspaper. The headline gets the largest area; sidebars hold supporting items. On a phone, the newspaper becomes one vertical column so no text is squeezed into a tiny strip.

## Layout vocabulary

- **Grid:** rows and columns used to arrange page regions.
- **Column:** a vertical section of the grid.
- **Breakpoint:** a screen width where the layout changes.
- **Card:** a visual container grouping related content.
- **Carousel:** a banner that can show one slide at a time, with controls to choose another.
- **Sample data:** example objects used while a database is not connected. Sample data is not production content.

The design calls for three desktop columns, exactly five homepage blog previews, and a mobile order that puts the banner and latest blogs before secondary sidebars.

## Data-driven rendering idea

Instead of copying the same card markup five times, a developer can store sample posts in an array and render one card for each item:

```jsx
const posts = [
  { id: 'java-basics', title: 'Java basics' },
  { id: 'spring-api', title: 'Build an API' },
]
```

The `id` is a stable identifier. The `title` is displayed. The array can later be replaced with data from Firestore, but that connection is a later session.

## Q&A visual rule

The screenshot contains example question text. It is only part of the visual reference. The Phase 1 homepage must instead show a clear **Q&A Coming Soon** message. Do not show invented questions that look live and do not add answer or submission actions.

## Guided learning activity

1. Sketch the desktop layout with three columns.
2. Sketch the mobile layout as a single column; put hero and latest blogs first.
3. Count the homepage blog preview rows: the requirement is exactly five.
4. Mark the Q&A area as Coming Soon.
5. When the page exists, inspect it at 1200 px, 768 px, and 375 px. Look for clipped text and horizontal scrolling.

## Common beginner mistakes

- **Fixed pixel widths everywhere:** narrow screens may overflow.
- **More than five homepage previews:** homepage and listing page have different limits.
- **Using placeholder questions that look real:** use Coming Soon instead.
- **Putting all content in one large component:** extract repeated visual pieces when they have clear reuse.
- **Assuming responsive means automatic:** test real widths and adjust layout rules.

## Recap

Build the homepage from the approved regions, use reusable cards and data, keep the center content prominent, show five previews, and rearrange for mobile. Sample questions are not Phase 1 features.

**I can explain this if I can answer:** What is a breakpoint? Why use an array for repeated cards? How many homepage previews are required? What does the Q&A panel say?

## Sources and verification

- UI source: `docs/initial-project-docs/front-end-UI-design-doc.md`.
- Session source: `docs/initial-project-docs/master-execution-plan.md`, Session 3.
- Current app status: `src/App.jsx` is still the Vite starter screen; a Code Classic homepage has not been verified.
