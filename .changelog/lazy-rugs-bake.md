---
package: "@cbnventures/nova"
category: fixed
bump: patch
---

Rejects empty input for required literal-format prompts in `nova utility initialize` so missing required settings are surfaced immediately instead of silently dropped and failing later at workflow generation.
