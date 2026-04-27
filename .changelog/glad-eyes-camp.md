---
package: "@cbnventures/nova"
category: updated
bump: minor
---

TypeScript convention's type-naming format migrated from camelCase-glued (`CliUtilityRunnerRunOptions`) to underscore-separated PascalCase chunks (`Cli_Utility_Runner_Run_Options`) — the underscore makes chunk boundaries visible and each chunk maps to exactly one source level (path segment, class, method, etc.)
