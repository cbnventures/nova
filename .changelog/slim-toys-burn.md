---
package: "@cbnventures/docusaurus-preset-nova"
category: fixed
bump: patch
---

Fixes anchor-link scroll position: `--nova-layout-sticky-top` is now defined per-preset (aliased from `--nova-{preset}-layout-sticky-top`) so hash-link navigation lands the heading flush with the navbar bottom on every preset (previously only signal was correct; envoy / foundry / lantern / marshal / sentinel under- or over-shot because the token was only defined in signal).
