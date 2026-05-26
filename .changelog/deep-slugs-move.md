---
package: "@cbnventures/docusaurus-preset-nova"
category: fixed
bump: patch
---

Registers `@theme/BlogSidebarMobile` in the swizzle config so consumers can `eject` or `wrap` the mobile blog sidebar variant. The implementation, types, and per-preset styles already shipped, but the swizzle registry only listed the parent `@theme/BlogSidebar`, leaving the mobile variant inaccessible through `npm run swizzle`.
