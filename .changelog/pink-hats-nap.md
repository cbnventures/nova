---
package: "@cbnventures/nova"
category: removed
bump: minor
---

Removes `urls.github`. Repository identity now lives under structured `github.owner` and `github.repo` fields, and the README + issue-template generators read from those directly.
