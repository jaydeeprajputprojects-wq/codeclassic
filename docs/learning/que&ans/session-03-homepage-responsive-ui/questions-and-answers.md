# Session 03 — Questions and Answers

## 1. How many blog previews belong on the homepage?

Exactly five, according to the UI specification and Session 3 plan.

## 2. What is a breakpoint?

A breakpoint is a screen width at which the layout changes. For example, a three-column desktop grid may become one stacked column on a phone.

## 3. What is sample data?

Sample data is temporary example content used before a real backend is connected. It must not be presented as real published user content.

## 4. Why use reusable blog cards?

The same visual structure appears repeatedly. A reusable card helps keep spacing and behavior consistent and makes later changes easier.

## 5. What must the Q&A panel display?

A non-functional Coming Soon message only. The sample questions in the design image are not Phase 1 features.

## 6. What should be tested at mobile width?

Text should remain readable, navigation should be usable, columns should stack, buttons should be tappable, and the page should not scroll horizontally.

## 7. Practice: The homepage renders eight posts. What requirement was missed?

**Answer:** The homepage limit is exactly five previews. The main blog listing has a separate limit of ten per page.

## Troubleshooting: A sidebar makes the phone page wider than the screen. What should you inspect?

Check fixed widths, grid breakpoints, long unbroken text, images without responsive sizing, and overflow styles.
