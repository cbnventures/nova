---
package: "@cbnventures/docusaurus-preset-nova"
category: changed
bump: minor
---

Mermaid diagrams now carry per-preset identity through five tokens declared in each preset's `preset.css`: `node-radius`, `edge-stroke`, `cluster-fill`, `cluster-stroke`, `cluster-radius` (with dark-mode overrides on the color-bearing three). Marshal renders sharp 2px corners on nodes and clusters; Signal renders sharp 0; Envoy / Foundry / Lantern / Sentinel render their site-wide rounded shape. The mermaid tooltip's corner radius now tracks `--nova-mermaid-node-radius` so it matches each preset's diagram corners (Marshal and Signal sharp, others rounded). Diagram typography is hard-coded to a system-ui sans stack at 14px — decoupled from `--nova-font-body` so site-wide body-font choices cannot push diagram measurement out of sync with render. Cluster titles carry 16px breathing room above and below via `flowchart.subGraphTitleMargin`, and mermaid renders are gated on `document.fonts.ready` to pin measurement to the loaded font.
