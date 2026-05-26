---
package: "@cbnventures/docusaurus-preset-nova"
category: fixed
bump: minor
---

Reworks search to share a single provider between SearchBar (navbar dropdown) and SearchPage so dropdown and full-page results render the same hit data with identical highlighting and counts. Also fixes 4 long-standing bugs: SearchBar input losing focus on every keystroke, foundry SearchPage extraneous background, premature no-results flash plus mobile menu items disappearing while the worker was still running, and missing reverse animation on dropdown close.
