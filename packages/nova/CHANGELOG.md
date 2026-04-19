# @cbnventures/nova

## 0.15.3 - 2026-04-19

### UPDATED
- Workflow templates now run check before build in all publish workflows
- Cloudflare Pages workflow template deploys to default branch instead of detached HEAD
- Workflow templates scope secrets to step-level env instead of top-level for least-privilege access

## 0.15.2 - 2026-04-19

### FIXED
- GitHub Packages workflow template setting registry before npm install, causing cross-repo scoped dependencies to fail with 401

## 0.15.1 - 2026-04-19

### UPDATED
- Consolidate publishing workflows (Cloudflare Pages, GitHub Packages, npm) out of the generator-managed workflow configuration — these workflows are too complex for the generator to handle and are maintained manually for the nova project only

### FIXED
- Fix generators writing files before user confirms — gitignore and dotenv manage menus now buffer changes in memory and only persist to disk on Save & Exit; all generators return completed/cancelled status; scaffold post-scaffold loop stops when a generator is cancelled
- Fix CLI bin entry point changed from build artifact to source wrapper for reliable PATH resolution in CI environments

## 0.15.0 - 2026-04-18

### UPDATED
- ESLint presets and config migrated from .mjs/.mts to TypeScript
- Documentation URLs migrated to nova.cbnventures.io
- Build process split into source transpilation, type copying, template bundling, and tsconfig preset copying
- TSConfig fan-out with dedicated source, tests, and config tsconfigs
- 4 ESLint rules reorganized into better-fitting categories
- Toolkit classes renamed to PascalCase convention (ToolkitCliHeader, ToolkitLogger, ToolkitMarkdownTable)
- ESLint runtime presets renamed from env-* to runtime-*
- Test runner migrated from Node.js native tests to Vitest
- Parallel script runner now streams output in real-time with color-coded prefixes and configurable buffer interval

### FIXED
- runtime-cloudflare-workers TSConfig preset lib array corrected from WebWorker to ESNext

### ADDED
- 30 new ESLint rules across conventions, formatting, jsdoc, patterns, safety, syntax, and typescript categories
- Workflow dependency chains via depends-on for ordered publishing across packages
- Modular trigger system for workflow generator with per-template trigger files
- GitHub generators for FUNDING.yml, issue templates, and workflow files
- Agent convention generator producing CLAUDE.md, AGENTS.md, PROJECT_RULES.md, VISION.md, and language-specific coding guides
- Scaffold starter template for bootstrapping new monorepos
- Interactive workflow setup in init TUI with template, suffix, trigger, depends-on, and variable description prompts
- .env auto-loading from project root or config directory at CLI startup
- Scaffold commands for Next.js, Vite, Express.js, Cloudflare Workers, and Docusaurus workspaces
- Nova config URL fields with init TUI prompts for Docker Hub, privacy policy, and terms of use
- Public type exports via ./types/* paths
- .novaignore marker file to exclude directories from workspace discovery
- Must-have generators for .env.sample, .editorconfig, .gitignore, LICENSE, and README
- Nova config project identity fields with init TUI prompts for legal name, pronouns, platforms, starting year, and license

### REMOVED
- platform-cloudflare-workers ESLint preset (merged into runtime-cloudflare-workers)

## 0.14.0 - 2026-03-07

### UPDATED
- Renamed CLI aliases from 2-letter initials to readable word fragments (e.g., `pv` to `pkg`, `cl` to `log`, `tc` to `type-chk`).
- Renamed ESLint config files from `eslint.config.ts` to `eslint.config.mjs`.
- Updated `nova.config.json` workspace schema, replacing `pinVersions`, `syncLtsEngines`, and `syncProperties` with a unified `recipes` object.
- Reorganized ESLint rules into subcategories: `formatting/`, `nova/`, `patterns/`, `regex/`, and `typescript/`.
- Updated `initialize` utility to configure recipes instead of legacy `pinVersions`, `syncLtsEngines`, and `syncProperties` flags.

### FIXED
- Renamed mismatched TSConfig preset doc filenames from `dx-code-style.mdx` to `dx-essentials.mdx` and `dx-ignore.mdx` to `dx-strict.mdx`.
- Fixed incorrect import paths in setup and presets docs from `@cbnventures/nova/eslint` and `@cbnventures/nova/tsconfig/` to `@cbnventures/nova/presets/eslint` and `@cbnventures/nova/presets/tsconfig/`.
- Fixed local install command in setup docs from `npm i -D` to `npm i` since Nova's toolkit exports are used at runtime.

### ADDED
- Added `no-destructuring` ESLint rule to ban destructuring in callbacks, loops, functions, declarations, and assignments.
- Added `no-implicit-boolean` ESLint rule to require explicit comparisons instead of truthy/falsy coercion.
- Added `no-shared-type-import` ESLint rule to prevent code files from importing shared type files directly.
- Added 9 granular `package-json` recipes: `cleanup`, `normalize-artifacts`, `normalize-bundler`, `normalize-dependencies`, `normalize-modules`, `normalize-tooling`, `sync-environment`, `sync-identity`, and `sync-ownership`.
- Added `require-padding-lines` ESLint rule to enforce blank lines between specific statement patterns.
- Added `no-assign-then-return` ESLint rule to flag assign-then-return patterns.
- Added `run-scripts` utility command to run package.json scripts by pattern in sequential or parallel mode.
- Added `no-bracket-assignment` ESLint rule to enforce `Reflect.set()` over bracket notation assignment.
- Added `no-inline-type-annotation` ESLint rule to enforce named type aliases over inline type annotations.
- Added `transpile` CLI utility to compile TypeScript projects using the TypeScript compiler API.
- Added `no-catch-unknown-annotation` ESLint rule to flag redundant `: unknown` annotations on catch clause variables.
- Added `no-ternary-in-template-literal` ESLint rule to disallow ternary expressions inside template literals.
- Added `run-recipes` CLI utility to orchestrate all enabled package-json recipes in sequence.
- Added `betweenSwitchCases` option to the `require-padding-lines` ESLint rule, enforcing blank lines between non-empty switch cases while allowing grouped empty fallthrough cases.

### REMOVED
- Removed `jiti` devDependency from root `package.json`.
- Removed `tsc-alias` devDependency, replaced by built-in `fix-aliases.mjs` script.
- Removed `npm-run-all` dependency, replaced by built-in `run-scripts` utility.
- Removed `pin-versions`, `sync-lts-engines`, and `sync-packages` recipes. Their functionality has been split into 8 granular `package-json` recipes.

## 0.13.1 (2026-02-28)

### FIXED
- Removed the unnecessary `./` prefix from the `bin` path in `package.json`.
- Fixed incorrect toolkit export paths pointing to ./build/src/presets/toolkit/ instead of ./build/src/toolkit/

## 0.13.0 (2026-02-27)

### UPDATED
- Broadened `engines.node` from `^22` to `^20 || ^22 || ^24` to support all active Node.js LTS versions.
- `skipLibCheck` will now be set to `false` for `dx-strict.json` TSConfig presets. To suppress type checks outside of project files, use the `nova utility type-check` command instead.
- Enabled `allowSyntheticDefaultImports` in the `dx-strict.json` TSConfig preset.
- Renamed item pretty name exports for consistency (e.g. `itemBrandPrettyNames` to `itemPrettyNamesBrand`).
- Renamed `HttpUrlField` to `UrlProtocol` to better distinguish repository and generic URLs.
- Replaced validation in favor for normalization in the "nova utility initialize" command.
- Changed the CLI command `sync-metadata` to `sync-packages` to represent a broader view of `package.json` syncing.
- Updated project scaffolding files, GitHub issue templates, and CI/CD workflows.
- Removed padding from logs that aren't directly related to UI (e.g., limit padding for prompts only).
- Replaced inline `no-restricted-syntax` configs in `dx-code-style` and `lang-mdx` presets with dedicated ESLint rules.
- Stricter `ImportDeclaration` formatting in `dx-code-style` preset.

### FIXED
- Fixed an issue where the `nova utility initialize` command would crash because the existing workspace does not exist in the `nova.config.json` file.
- Made types clearer for `ItemAllowedPoliciesByRole` because it was using `Exclude` instead of `Extract`.
- Fixed documentation typos, grammar, and voice consistency across CLI, toolkit, and quickstart pages.

### ADDED
- Added version range regex patterns (`PATTERN_DIGITS`, `PATTERN_RANGE_GREATER_EQUAL_MAJOR`, `PATTERN_RANGE_MAJOR`) for engine constraint parsing.
- Added `nova utility changelog` command with `record` and `release` subcommands for managing release notes.
- Added `nova utility type-check` command. Widened `CLIExecuteCommandOptions` to `Partial<Options>`.
- Added `nova recipe sync-lts-engines` command for syncing `engines.node` to the current Node.js LTS constraint.
- Added `no-regex-literals`, `no-regex-literal-flags`, and `no-raw-text-in-code` ESLint rules.
- Added an `interactive` option to the CLIHeader battery for plain-text output in non-TTY environments.
- Added `nova recipe pin-versions` command for stripping range prefixes from dependency versions.
- Added a "switch-case-blocks" ESLint rule for enforcing blocks inside switch cases.
- Added an "emails" section into Nova configuration (support for additional canonical contact methods).
- Added runtime API modules for SPDX license validation and Node.js LTS version detection.
- Added a `--replace-file` option for the CLI `nova utility initialize` command.
- Added `pinVersions` and `syncLtsEngines` workspace options to the Nova configuration.
- Added a `template` role with `freezable` policy for those who would like to create templates/examples in their monorepo.
- Added a "syncProperties" option for each workspace in the Nova configuration.
- Added shared utilities `isPlainObject`, `isProjectRoot`, `loadWorkspaceManifests`, and `saveWorkspaceManifest` for recipe commands.
- Added a shared utility `isFileIdentical` for checking identical files before editing them.
- Added a shared utility `renameFileWithDate` for commands that make file modifications.

### REMOVED
- Removed the `sync-versions` CLI command. Its `packageManager` validation is now part of `sync-packages`.

## 0.12.0 (2025-11-02)

### UPDATED
- `Logger.customize` now has the ability for developer to declare the type and purpose of logging (in addition to the function name).
- Running ESLint during builds will now treat warnings as errors (for `@cbnventures/nova` package).

### ADDED
- Added a `Logger.dev` feature where a developer can use that in replacement of `console.log`.
- Added custom ESLint rules to be exported for usage (starting with the `no-logger-dev` rule).
- Added tests (to test for the `discoverPathsWithFile`).

## 0.11.0 (2025-10-30)

### UPDATED
- Renamed "Foundation Nova" to "Nova".
- Removed `freeze-deps` and `sync-pkg-mgr` recipe subcommands in favor of `sync-metadata` and `sync-versions` recipe subcommands.
- Made a minor change to prefer shorthand properties (where key value pairs are the same visually).
- Made a minor change to prefer template literals (instead of "string + concatenation").
- Grouped type declaration files to its "types" respective folders.
- Refactored code that used CRLF to now use LF for modern reasons.
- Changed "DiscoverPackageJsons" to a more versatile "DiscoverPathsWithFile" internal utility function.
- Refactored the "initialize" command to remove garbage code generated by AI.
- Changed "HttpUrlField" type to accept "generic" instead of "fundSources" (because too vague).

### FIXED
- Fixed `engines.node` to be consistent with `^22` (The latest LTS version for Node.js).
- Fixed logo SVG to include a newline at end of the file.

### ADDED
- Added `workspaces` support for Nova config to better manage apps/packages inside the monorepo.

## 0.10.0 (2025-10-26)

### UPDATED
- Updated the CLI "CURRENTLY RUNNING:" text to also include the base command used (`nova`) for better debugging purposes.
- Renamed `CLIInitialize` and `CLIVersion` to their sub-folder `CLIUtility*` variants.
- Separated toolkit types into their own directory to prevent prefix collision.
- Renamed `sync-pkg-manager` to `sync-pkg-mgr` to shorten already long commands, in addition to adding a "one-letter per word" alias.

### REMOVED
- Removed the `inspect` CLI command now that we decided not to wrap ESLint/TypeScript print-config.

## 0.9.0 (2025-10-24)

### UPDATED
- Prevent usage of `console` completely. Either use the `Logger` toolkit battery or write to the process directly. This is to prevent over-reliance of `console.log`.
- Align multi-line log payloads with prefix-aware indentation.
- Default production-browser logs to warn/error while keeping backend defaults.
- Refreshed docs and tooling stacks by bumping Docusaurus, React, TypeScript, ESLint, and related plugins/libs to their latest releases.

### ADDED
- Added a single-character ellipsis when CLI header text is truncated to fit the specified width.
- Added `CLIHeader` to the toolkit barrel export so consumers can import it via `@cbnventures/nova/toolkit`.
