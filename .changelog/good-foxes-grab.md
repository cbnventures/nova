---
package: "@cbnventures/docusaurus-preset-nova"
category: updated
bump: minor
---

Switches Iconify imports across Footer, blocks (Features / InstallStrip / AppMarketDownload), and SearchBar from `@iconify/react` (CDN-fetched) to `@iconify/react/offline` (statically bundled). Icons now render correctly in strict-CSP or proxied environments. Consumers using `mdi:*` icons may want to migrate to `ri:*` since the bundled collections favor `ri` / `lucide`.
