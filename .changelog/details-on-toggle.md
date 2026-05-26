---
package: "@cbnventures/docusaurus-preset-nova"
category: added
bump: minor
---

Adds an optional `onToggle(isOpen)` callback to the `@theme/Details` component that fires when the user clicks the disclosure summary, allowing parent components to keep external state in sync with manual interactions. Also corrects an inverted initial-state bug that caused a brief flash of the wrong open state on first render when `open` was passed as a prop.
