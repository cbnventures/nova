---
package: "@cbnventures/docusaurus-preset-nova"
category: fixed
bump: patch
---

Closes the navbar More dropdown, locale dropdown, and docs-version dropdown when the user presses the Escape key while the panel is open. Previously only mouse click-outside dismissed the panels, leaving keyboard-only users (screen-reader, RSI, power-user keyboard navigation) without the standard `Esc`-to-dismiss gesture expected of disclosure-triggered menus.
