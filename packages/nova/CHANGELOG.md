# @cbnventures/nova

## 0.18.0 - 2026-05-27

### UPDATED
- TypeScript convention's cross-module body-variable rule closed the alias loophole — body-variable types must be defined locally as a concrete shape, not as an alias to a foreign type. Three escape hatches: promote the shape to `shared.d.ts`, redefine the shape concretely, or skip the typed body var
- Rewrites the type-naming section of `conventions/typescript.md` to match the new underscore-separated format and reflect the per-slot mechanics. The four pattern slots (`{PathPrefix}`, `{ClassName}`, `{MethodName}`, `{VariableName}`) are now explicitly documented as conditional — each slot is only filled when applicable to the source file, so top-level types in path-only files like `src/lib/constants.ts` produce names like `Lib_Constants_DocsBaseUrl` instead of forcing a synthetic class or method chunk. The "Class Name Is `Runner`" section documents the new generic class identifier and the path-conveys-meaning rationale. The Standalone Type Files rules (S1–S4) are restated: the previous S2 (which stripped the prefix for standalone files like `shared.d.ts`) is removed — standalone files now keep the path prefix verbatim like every other file, and S3 (`Parent_Property` form) explicitly composes with the prefix rather than replacing it. Consumers using the scaffolded agent-conventions template will receive the updated file the next time they run `nova generate`; existing convention files copied earlier should be re-pulled to stay in lockstep with the rules and the meta-test.
- TypeScript convention's chunk-derivation rule now applies to any call where arg[0] is a string literal and a later arg is a function expression — covers `app.get('/users', handler)`, `db.transaction('init', tx => ...)`, and similar patterns; previously limited to `describe`/`it`/`test`
- All 81 path-glued classes in `@cbnventures/nova` (and 4 in `@cbnventures/docusaurus-preset-nova`) are renamed to the literal identifier `Runner`. Classes such as `CliUtilityChangelog`, `LibSchema`, `ToolkitLogger`, and `ApiNodeReleases` are now exported as `Runner` from their respective modules — the file path already carries the semantic meaning, so duplicating it in the class identifier inflated every type name with redundant chunks (e.g. `Api_NodeReleases_ApiNodeReleases_*`) and made refactoring more expensive than it needed to be. Consumers update imports from `import { CliUtilityChangelog } from '...'` to `import { Runner } from '...'`, or keep their local identifier via an alias: `import { Runner as CliUtilityChangelog } from '...'`. Barrel re-exports work the same way: `export { Runner as NodeReleases } from './node-releases.js';`. The rename only affects internal class identifiers — public CLI command names, package exports map, and runtime behavior are unchanged.
- TypeScript convention's type-naming pattern now includes the class name as a chunk in type prefixes — the chunk hierarchy is `{PathPrefix}_{ClassName}_{MethodName}_{VariableName}` instead of `{PathPrefix}_{MethodName}_{VariableName}`; previously the class chunk was elided
- TypeScript convention's type-naming format migrated from camelCase-glued (`CliUtilityRunnerRunOptions`) to underscore-separated PascalCase chunks (`Cli_Utility_Runner_Run_Options`) — the underscore makes chunk boundaries visible and each chunk maps to exactly one source level (path segment, class, method, etc.)
- README fan-out now targets consumer-facing roles (app, package, tool, config) instead of distributable workspaces, matching the LICENSE generator.
- TypeScript convention's forward-reference exemption now applies to all return-position aliases (`Returns`, `TypeGuard`, and the singular `Return`) — affects array-element-before-array and the section's first-come-first-serve ordering rule; previously only `Returns` was exempt
- All type aliases now use underscore-separated PascalCase chunks instead of glued PascalCase. A type that was previously `CliUtilityChangelogReleaseReleasePackageName` is now `Cli_Utility_Changelog_Runner_Release_Release_PackageName`. The pattern is `{PathPrefix}_{ClassName}_{MethodName}_{VariableName}` — each chunk is PascalCase, joined with single underscores. Each chunk maps to one level of the source structure (file path segment, class declaration, method/function/`describe`-string, and the variable/parameter/property leaf), keeping the namespace unambiguous and the boundary visible. Slots are conditional: `{ClassName}` only appears when the source file declares a class (always the literal `Runner`), `{MethodName}` only when the source has methods or function-typed consts, and `{VariableName}` only when the type names a specific identifier. About 14,000 type identifiers were renamed across `@cbnventures/nova`, `@cbnventures/docusaurus-preset-nova`, and the five consumer repositories that share the test substrate. Migration for downstream consumers: regenerate `.d.ts` filenames are unchanged; run ESLint with the updated rules to surface every name that needs reshaping, then re-emit types from source identifiers (class + method + variable name) joined by underscores. The new format is machine-enforced by `require-type-naming` and the meta-test in `src/tests/type-declarations.test.ts`, so drift cannot accumulate again.

### FIXED
- Rejects empty input for required literal-format prompts in `nova utility initialize` so missing required settings are surfaced immediately instead of silently dropped and failing later at workflow generation.
- ESLint rules require-type-naming and require-jsdoc-hierarchy now derive a valid TypeScript identifier prefix from path segments containing framework routing syntax or other non-identifier characters. The require-jsdoc-hierarchy rule additionally no longer truncates path segments containing dots when computing the expected hierarchy text.

### ADDED
- TypeScript convention adds rules for standalone type files (`shared.d.ts`, `fetch-response.d.ts`): PascalCase identifiers without brand casing (3+ consecutive uppercase letters), no path-prefix-style names, properties use `Parent_Property` form, array element types defined before arrays
- Extends the type-declarations meta-test (`src/tests/type-declarations.test.ts`) with eight new structural rules under the variable-type-symmetry banner. Section detection switches from JSDoc-based parsing to source-identifier-based AST parsing — types belong to the section formed by their enclosing class, method/function, or `(string, fn)` call expression (e.g. `describe('Db', ...)`), so comments can no longer drift out of sync with type names. Rule #5 now also enforces element-before-parent ordering for array element types (`Items = Item[]`). Rule #6 catches orphan sections in `.d.ts` files that have no source counterpart. The new Rule #7 covers eight sub-checks: leaf must equal the title-cased var name (7.1), cross-module body-variable types are forbidden without one of three escape hatches (7.2), the return-position suffixes `Returns` / `TypeGuard` / `Return` are banned at body/param positions (7.3), inline typed callbacks must be extracted to named consts (7.4), regular function returns must end in `Returns` plural (7.5), singular `Return` at return positions is banned (7.6), `TypeGuard` only appears at `value is T` return positions (7.7), and two declarations in the same file cannot produce the same expected type name (7.8). The test substrate fanned out to the five consumer docs sites carries the same rule set, so downstream repos pick up structural enforcement automatically on their next sync.
- Adds `displayName` to the package.json allow-list and canonical sort order so the cleanup recipe preserves it for Homebridge plugins and VS Code extensions.
- Adds the github-action publish target for distributing JavaScript GitHub Actions via orphan-branch tags with SLSA build-provenance attestation.
- TypeScript convention adds a rule that top-level class, function, and function-typed-const names must differ from the file name (PascalCased, hyphens flattened). Use a barrel re-export when consumers should still see the file name as the public identifier
- Validates uniqueness of publish-target destinations across all workflows. Targets that ship to a named destination (e.g., github-action's release branch, aws-amplify-nextjs's app+branch, cloudflare-pages-docusaurus's project) now declare a uniquenessKey in metadata; nova rejects both colliding workflows when two targets anywhere in the config resolve to the same destination.
- TypeScript convention adds filename validation: path segments must match `[a-z][a-z0-9-]*` after stripping `.d.ts`, `.tsx`, `.ts`, and `.test`. Dotted suffixes (`.spec.ts`), leading digits, underscores, and special characters all fail
- LICENSE now fans out to consumer-facing roles (app, package, tool, config) so every consumer-facing workspace ships with its own LICENSE file.
- Adds a `github` recipe category with `sync-identity`, `sync-features`, and `sync-policies` recipes that push description, homepage, topics, collaboration features, and repo policies from `nova.config.json` to GitHub via the `gh` CLI.
- Adds a new `UnderscorePascalCase` casing value to the `require-naming-convention` ESLint rule, validating identifiers shaped as one or more PascalCase chunks joined by single underscores (e.g. `Foo`, `Tests_TypeDeclarations_Foo_Bar`). The `typeAlias` default flips from `PascalCase` to `UnderscorePascalCase`, and the companion `require-type-naming` rule now derives prefixes by joining path segments with underscores (e.g. `Cli_Utility_Changelog` instead of `CliUtilityChangelog`). This aligns the rules with the canonical underscore-PascalCase convention documented in `conventions/typescript.md`. Existing PascalCase-glued type names will fail both rules and must be renamed — see the type-naming entry for migration steps.
- Adds an optional `workspaces[path].displayName` field in `nova.config.json` with a corresponding prompt in `nova utility initialize`, letting consumers configure each workspace's display label centrally.

### REMOVED
- Removes `urls.github`. Repository identity now lives under structured `github.owner` and `github.repo` fields, and the README + issue-template generators read from those directly.

## 0.17.0 - 2026-04-23

### UPDATED
- ESLint dx-ignore preset now ignores Next.js .next/ build output
- License generator errors out instead of falling back to an interactive picker when project.license is missing from nova.config.json — set the license declaratively in the config.

### FIXED
- Generated publish workflow uses per-target named artifacts (build-${targetType}-${targetId}) instead of one shared build-output; multi-target projects (like an npm package plus a docs site) previously bundled every target's output into one artifact, so Cloudflare Pages and GitHub Pages publish jobs deployed everything — npm package files AND docs — instead of just the docs. npm and github-packages download steps also gained the missing path: [__WORKING_DIR__]/build line needed for single-target consumers.
- Next.js publish workflows upload from build/ instead of .next/, matching the nova build/-folder convention that Docusaurus follows by default; the Next.js scaffold's next.config.mjs now sets distDir: 'build' so new apps match the convention without manual edits.
- dx-ignore ESLint preset now ignores next-env.d.ts — Next.js regenerates this type shim on every build, so linting it is pointless.

### ADDED
- Generators now prepend a 'do not edit manually' header to .editorconfig, .gitignore, .env, .env.sample, README.md, and all .github/*.yml outputs — .env gets a fillable variant since nova owns the keys (managed via nova.config.json) but consumers fill in the values.

## 0.16.2 - 2026-04-21

### FIXED
- Setup instructions from nova generate github workflows now list every required GitHub secret and variable across publish targets (NPM_TOKEN, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_PROJECT_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AMPLIFY_APP_ID, VERCEL_TOKEN, DOCKERHUB_TOKEN, etc.) — previously only template-level variables were listed and per-target publish credentials were silently omitted
- Cloudflare Pages and GitHub Pages docusaurus deployments failed because the generated workflows downloaded the build artifact to the workspace root instead of the working directory; download-artifact now specifies the correct path in both publish target templates so wrangler and the Pages upload action find the build output.
- Generated README.md no longer emits broken HTML or empty sections when fields are missing from nova.config.json. Each section now renders only when its source value exists: the centered header block omits the `<picture>` when `urls.logo` is missing, drops the `<a href>` wrapping when `urls.homepage` is missing, and skips entirely when `project.name.title` is missing; the `## Introduction` section is omitted when `project.description.long` is missing; the `## Documentation` section is omitted when `urls.documentation` is missing (previously left a broken `[]()` markdown link).

## 0.16.1 - 2026-04-21

### FIXED
- Generator's publish workflow no longer fails with npm EUSAGE when publishing scoped packages — npm targets now pass --access public alongside --provenance (required when both are used), and GitHub Packages targets omit --provenance (unsupported by the registry)

## 0.16.0 - 2026-04-20

### UPDATED
- Publish workflows only check and build the specific packages being released, not the entire monorepo — the generator auto-detects turbo.json and uses --filter, or falls back to npm workspace -w flags
- Init TUI no longer asks about workspaces already covered by your publish targets in the scopes prompt — only optional extra workspaces appear
- Init TUI skips re-prompting for the same secret or variable when multiple publish targets share it (for example GITHUB_TOKEN used by both GitHub Packages and ghcr)
- Sponsor gate workflow now lets you pick which issue events to listen to (issues opened/closed, comments created/edited) from the init TUI, matching the pattern used by every other workflow template
- One unified publish workflow builds your project once and publishes to multiple destinations (npm, GitHub Packages, Cloudflare Pages, etc.) in parallel, instead of each destination running its own full build pipeline from scratch
- Generated workflows declare the minimum required GitHub token permissions explicitly at both workflow and job level, with contents: read as the restrictive baseline instead of inheriting repo defaults
- Inactive issue lock workflow schedule now offers daily, weekly, and monthly presets in the init TUI instead of a single hardcoded cron expression
- Shell scripts in generated workflows render as clean multi-line run: | blocks instead of collapsed double-quoted strings with escape sequences

### FIXED
- Scheduled workflow runs no longer show "manually" appended to the run name in the GitHub Actions UI when no manual dispatch occurred
- Init TUI target Edit action now actually edits the target in place — prompts are prefilled with the current type, workingDir, and needs, and the entry is replaced at the same index; previously the action silently removed the target and required the user to re-add it from scratch
- SharedNovaConfig type key order now matches serialized nova.config.json output (project, entities, emails, workflows, urls, workspaces) — previously workflows sat at the end of the type definition even though the JSON layout placed it between emails and urls

### ADDED
- nova.config.json workflow entries gained a targets array (each with type and workingDir) and a scopes array (workspace paths to check and build)
- Publish targets gained an optional needs array (list of same-type target workingDirs) so dependent packages wait for their prerequisites — the generator emits needs: ["build", "publish-<type>-<id>", ...] on the dependent job, serializing publishes that would otherwise race (for example, a preset that depends on a core package publishing first to the registry)
- Init TUI prompts for target needs via a multiselect of other same-type targets when adding or editing a publish target, pre-selecting existing needs on edit
- Published npm packages and Docker images now ship with signed build provenance attestations by default (via --provenance on npm publish and actions/attest-build-provenance@v2 for Docker images)
- 8 publish target types: npm, GitHub Packages, Docker Hub, GitHub Container Registry, Cloudflare Pages (Docusaurus), GitHub Pages (Docusaurus), AWS Amplify (Next.js), and Vercel (Next.js) — combine any of them in a single workflow
- Init TUI rejects selecting multiple schedule variants (like daily plus weekly) on the same workflow to prevent overlapping cron runs
- Init TUI target menu with Add, Edit, Remove, and Done options for composing multi-destination publish workflows

### REMOVED
- Legacy per-target publish templates replaced by the unified publish template: publish-to-npm, publish-to-github-packages, publish-to-docker-hub, publish-to-cloudflare-pages-docusaurus, publish-to-github-pages-docusaurus, publish-to-aws-amplify-nextjs — existing workflow config entries using these must be rebuilt via nova util init

## 0.15.4 - 2026-04-19

No changes

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
