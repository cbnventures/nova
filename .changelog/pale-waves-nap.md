---
package: "@cbnventures/nova"
category: fixed
bump: patch
---

ESLint rules require-type-naming and require-jsdoc-hierarchy now derive a valid TypeScript identifier prefix from path segments containing framework routing syntax or other non-identifier characters. The require-jsdoc-hierarchy rule additionally no longer truncates path segments containing dots when computing the expected hierarchy text.
