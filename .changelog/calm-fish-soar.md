---
package: "@cbnventures/docusaurus-preset-nova"
category: added
bump: minor
---

Adds a Mermaid tooltip handler and click-jump guard to the bundled runtime: hovering over `click X "<href>" "<tooltip>"` nodes now surfaces a styled `div.mermaidTooltip` instead of the native browser tooltip, and clicking nodes with placeholder anchors (`xlink:href="#"`) no longer scrolls the page to the top. Real URLs in the `click` directive still navigate normally. Auto-registered via the preset; no consumer wiring needed. Renames the SVG wrapper class from `.docusaurus-mermaid-container` to `.nova-mermaid-container` for cross-component class naming consistency — sites that targeted the old class in custom CSS should update their selector.
