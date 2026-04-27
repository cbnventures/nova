---
package: "@cbnventures/nova"
category: updated
bump: minor
---

TypeScript convention's cross-module body-variable rule closed the alias loophole — body-variable types must be defined locally as a concrete shape, not as an alias to a foreign type. Three escape hatches: promote the shape to `shared.d.ts`, redefine the shape concretely, or skip the typed body var
