---
package: "@cbnventures/nova"
category: updated
bump: minor
---

TypeScript convention's type-naming pattern now includes the class name as a chunk in type prefixes — the chunk hierarchy is `{PathPrefix}_{ClassName}_{MethodName}_{VariableName}` instead of `{PathPrefix}_{MethodName}_{VariableName}`; previously the class chunk was elided
