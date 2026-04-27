---
package: "@cbnventures/nova"
category: updated
bump: minor
---

TypeScript convention's chunk-derivation rule now applies to any call where arg[0] is a string literal and a later arg is a function expression — covers `app.get('/users', handler)`, `db.transaction('init', tx => ...)`, and similar patterns; previously limited to `describe`/`it`/`test`
