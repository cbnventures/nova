# @cbnventures/nova

## 0.22.1 - 2026-08-08

### FIXED
- The Cloudflare Pages deploy step in the publish workflow now uses `npx -y wrangler@3` instead of `cloudflare/wrangler-action@v3`. The action's fallback `npm install wrangler` crashes npm's arborist in workspace monorepos with `Cannot read properties of null (reading 'edgesOut')`, a known npm CLI bug. The direct `npx` invocation installs to a temporary directory and bypasses the workspace dependency graph entirely.

## 0.22.0 - 2026-08-08

### UPDATED
- The `@since UNRELEASED` release stamper and the since-version meta-tests now walk .css files in addition to .ts and .tsx, so CSS source files in published packages are stamped with the release version and validated by CI.
- Each `environment` value now declares a required `reach` (`local`, `managed`, `build`, or `runtime`) in place of the `buildOnly` flag. `reach` states where the value travels: `build` and `runtime` replace `buildOnly: true` and `buildOnly: false` (baked into the build vs synced to the running server); `managed` is tracked on GitHub and appears in the app's local `.env`/`.env.sample`, but Nova delivers it to no build or server (formerly expressed by declaring it under `global`); and the new `local` value is written to the app's `.env`/`.env.sample` for local development but is never provisioned on GitHub, baked into a build, or synced to a server. A `local` value carries no `secret` and needs no prefix, while `secret` stays required for `managed`, `build`, and `runtime`. This lets a GitHub Action repository generate a `.env.sample` for local testing — its `INPUT_*` inputs and `ACTIONS_*` runner flags — without those keys leaking into GitHub Variables or Secrets. Existing configs migrate by replacing `buildOnly: true` with `reach: "build"` and `buildOnly: false` with `reach: "runtime"`.
- The top-level `environment` block renames its two group keys to mirror the config's own top-level sections: `environment.global` becomes `environment.project` and `environment.apps` becomes `environment.workspaces` (`environment.workflows` is unchanged), so the block now reads `project` / `workspaces` / `workflows`. The repo root is a first-class workspace — declare `environment.workspaces["./"]` (for example `{ "prefix": "ROOT_" }` with no variables) to have `nova generate must-haves dotenv` write the root `.env` and `.env.sample`; an undeclared root, like any undeclared workspace, is skipped. Every declared `project`, `workspaces.<path>`, and `workflows.<name>` entry now requires a `prefix`, with `NODE_ENV`, `LOG_LEVEL`, and `LOG_TIME` remaining the only unprefixed, template-managed keys. Existing configs migrate by renaming `global` → `project` and `apps` → `workspaces`, adding a `"./"` workspace with a prefix wherever a root `.env` is wanted, and giving every group a prefix.
- The six demo applications (`demo-envoy`, `demo-foundry`, `demo-lantern`, `demo-marshal`, `demo-sentinel`, `demo-signal`) have been extracted to the standalone `cbnventures/nova-demos` repository. The `demos` root script and all `apps/demo-*` directories are removed from this repo.

### FIXED
- `NovaIdentity`'s composed copyright line now reflects `project.license`: a real SPDX identifier (such as `MIT`) reads `Licensed under the <id> License.` while `Proprietary` or an absent license keeps `All Rights Reserved.`. Previously the notice was hardcoded to `All Rights Reserved.`, contradicting the `LICENSE` file the must-haves `license` generator produces for an OSS project — the Nova docs footer itself rendered `All Rights Reserved.` despite `project.license` being `MIT`. `composeCopyright` gains an optional third `license` argument.
- The publish workflow generator now includes the root workspace in the CI check step. Turbo projects get `--filter=//` prepended to the check command so root-level ESLint, type-check, and vitest run alongside app-workspace checks. Non-turbo projects get a separate "Check root" step. Previously only the scoped app workspaces were checked, leaving root-level checks uncovered in CI.
- Sequential mode in nova utility run-scripts and the root nova-run-scripts.mjs now catches spawn-level errors with try/catch, matching the parallel-mode error handling pattern. Previously a spawn failure caused an unhandled promise rejection instead of a clean exit.
- The `normalize-dependencies` recipe no longer flags wildcard (`*`) and `latest` dependency versions as errors. These version specifiers, commonly used for workspace cross-references, are now silently skipped by the version pinner instead of logging an error and setting a failing exit code.
- The nova.config.json parser now reads and writes the current workflow field names. It previously read `name` but wrote `suffix`, and looked for `scopes`, `targets`, and `settings` where the file holds `build`, `deploy`, and `with`. Because saving re-parses its own output, `nova utility initialize` deleted the entire `workflows` key on Save & Exit, and every `build`, `deploy`, and `with` value was discarded. Deploy targets now round-trip their `to`, `path`, `after`, and `with` fields, and the environment reconciler reads deploy targets that it had been skipping entirely.
- `NovaIdentity().forDocs()` now derives the Docusaurus `url` from `urls.documentation` instead of `urls.homepage` and adds a `baseUrl` field, so a docs site served under a subpath (such as a GitHub Pages project site at `https://<user>.github.io/<repo>/`) resolves the correct origin and path prefix. Previously `url` carried the project homepage, which for a subpath deployment produced the wrong host and a doubled path in canonical tags, `sitemap.xml`, `og:url`, and RSS URLs. The origin and path are split by the new `docsUrl` and `docsBaseUrl` static transforms, and both `url` and `baseUrl` are `undefined` when `urls.documentation` is absent.
- The `utility type-check` and `utility transpile` commands now exit with code 1 when the tsconfig cannot be resolved. Previously they printed an error and exited 0, so a mistyped `--project` path silently passed CI without checking anything.
- The Cloudflare Workers deploy job no longer deploys the worker twice when runtime variables are declared. Non-secret runtime vars now ride the initial deploy command via `--var` flags instead of triggering a separate `wrangler deploy` in the sync step. The sync step also gains `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in its env so `wrangler secret` commands authenticate independently from the deploy step.

### ADDED
- The env-status classifier now detects GitHub variables that still hold the NOVA_PLACEHOLDER stub value set during reconciliation, reporting them as stub-unreplaced so the initialize flow can surface variables that were created but never filled in with real values.
- A new bin-git-tracked meta-test verifies that every package.json bin entry is tracked by git, preventing publish failures caused by gitignored CLI wrappers that exist on disk but are absent from CI checkouts.
- The package-json sync-identity recipe now manages the `displayName` field. Opt in per workspace with `settings.displayName: true`; the value comes from `project.name.title` and applies to distributable workspaces only. Where the setting is absent, an existing `displayName` is removed. The unused `workspaces[].displayName` config field has been removed.
- The `changelog --release` command gains lock-step versioning. When `settings.lockStepVersioning` is `true` in `nova.config.json`, every distributable workspace is bumped to the same version on release, even if some had no recorded changes. Packages without changes receive a "No changes." entry in their `CHANGELOG.md`. The version is the highest computed from the packages that do have entries.
- Every workspace now type-checks its config tsconfig (`tsconfig.config.json`) as a standalone `check:types-config` step, catching type errors in `eslint.config.mts`, `vitest.config.ts`, and `vitest.setup.ts` that were previously only covered by broader source or test projects.

## 0.21.0 - 2026-07-24

### UPDATED
- The type-declaration meta-test's variable-type-symmetry rule now resolves a body var's twin alias against the declaration file's import block instead of pattern-matching the aliased type's name. Aliases to foreign `.d.ts` types are flagged no matter how they are spelled, aliases to types imported from a `standaloneTypeFiles` entry (such as `shared.d.ts`) are recognized as the sanctioned conduit and allowed, and aliases to runtime-module and external-package types remain untouched.
- The `sync-environment` recipe now adds a `packageManager` field to project-role workspace manifests when the field is missing, pinned to the npm version detected on the machine (for example `npm@11.13.0`). Turborepo 2.x refuses to resolve a workspace without a `packageManager` or `devEngines.packageManager` field, so monorepo roots managed by the recipe now work with `turbo run` out of the box. Detection failures are logged as warnings and the manifest is left untouched.
- The scaffolded agent-conventions now document that Claude-in-Chrome MCP screenshots are returned inline and cannot be written to disk, so `agent-browser` should be used to capture any screenshot that must be saved to a file (for a commit, artifact, or report) even when the MCP is available. Re-run `nova generate must-haves agent-conventions` to receive the updated `conventions/universal.md`.
- The `sync-identity` recipe now treats `nova.config.json` `project.license` as the authoritative source for each workspace's `package.json` `license` field, instead of only checking that the existing value is a valid SPDX identifier. A real SPDX identifier (for example `MIT`) is written directly; `Proprietary` maps to a `SEE LICENSE IN` reference to the nearest `LICENSE` file, or `UNLICENSED` when none exists. Previously a valid-but-wrong value such as `MIT` on a `Proprietary` project was silently kept because it passed SPDX validation. When `project.license` is unset, the prior behavior (correct only non-SPDX values) is preserved.
- Rebuilt the GitHub Actions workflow generator and reshaped the `workflows` config for readability. Renamed `suffix` to `name`, `scopes` to `build`, `targets` to `deploy`, and `settings` to `with`; within each deploy entry, renamed `type` to `to`, `workingDir` to `path`, and `needs` to `after`; and moved the workflow-run upstream reference from a top-level `depends-on` onto the trigger itself as `workflows`. A config that uses the old field names now fails with a migration hint naming the rename. `ROOT_WORKING_DIR` defaults to `./` and no longer needs to be set.
- The vitest conformance kit's `register*Suite` functions (`registerFrontmatterSuite`, `registerLinkSuite`, `registerMarkdownTableSuite`, `registerTerminologySuite`, `registerTypeDeclarationSuite`, `registerDotenvSuite`) now require a `vitest` field holding the caller's imported `vitest` namespace, and invoke `describe`/`it` through it instead of importing them directly. This makes the suites run on the same test-runner instance the worker drives, fixing the `Cannot read properties of undefined (reading 'config')` crash that broke `check:test` in every consumer where Nova and the consuming app resolved different `@vitest/runner` copies. Existing test files must add `import * as vitest from 'vitest'` and pass `vitest` into each `register*Suite` call; `nova scaffold docs` emits the updated form. Every `register*Suite` call within a single test file must share the same `vitest` namespace; passing a conflicting one now throws.
- The `dxCodeStyle` ESLint preset now enforces `@stylistic/object-property-newline`, so a multi-property object literal that spans multiple lines places each property on its own line, mirroring the existing `array-element-newline` treatment for arrays. Previously the preset only broke the braces onto their own lines and left the properties packed onto a single line. The rule is autofixable; run ESLint with `--fix` to reformat existing object literals.
- ESLint rules that cannot apply to extracted `<script>` virtual files now skip them for files that hold `<script>` tags (`astro`, `md`, `markdown`, `html`, `htm`, `vue`, `svelte`). The `require-jsdoc-hierarchy` rule skips because the extracted virtual filenames are non-deterministic and can never satisfy the expected hierarchy; each skip emits a `Logger.warn` notice, silenceable via the new `warnSkippedScripts` option (default `true`). The `require-kebab-case-filename` and `no-inline-type-annotation` rules skip silently, because the virtual basename is machine-generated (no user-authored file name to validate) and plain `<script>` blocks extract as JavaScript where type annotations cannot parse.
- The generated README now wraps each section — header, badges, introduction, documentation, and credits — in `<!-- nova-region: X -->` anchor comments (invisible in the rendered README). These anchors let the README refresh recipes update a single section in place instead of regenerating the whole file.
- Environment variables and secrets now live in one top-level `environment` block classified by a required `secret` flag, with per-namespace prefixes, GitHub provision/reconcile/status, and delivery by kind. Replaces per-workspace `dotenv`.
- The scaffolded Docusaurus docs site now ships `i18n`, `i18n:check`, and `i18n:coverage` scripts wired to the `theme-nova` bin, so a freshly scaffolded site gets the translation-reconciliation workflow (`theme-nova i18n sync` / `check`) and the per-locale coverage report (`theme-nova i18n coverage`) out of the box instead of leaning on `docusaurus write-translations`.
- The scaffolded Docusaurus config now reads its identity through the `NovaIdentity` toolkit class instead of carrying hardcoded placeholder values. A freshly scaffolded site resolves its title, tagline, URL, organization, and project name from the nearest `nova.config.json`, each falling back to a sensible literal, so identity stays config-driven from the first build.
- The `require-jsdoc-body` ESLint rule gains a `diamond` option (default `false`) that, when enabled, requires a 3-line JSDoc body to have its second line be the longest — the "diamond" shape.

### FIXED
- The `github-action` publish target now repoints the released `action.yml` at the bundled entry script. While staging the orphan release tree, the workflow rewrites `runs.main` to `action/<ACTION_ENTRY_POINT>` — the flattened path the built bundle is copied to — so a consumer referencing `owner/repo@vN` resolves the entry file. Previously the staged `action.yml` kept its source-layout `runs.main`, a path that does not exist in the release tree, so the published action could not start.
- The GitHub workflow generator no longer rejects a valid acyclic configuration as circular. Its circular depends-on detection previously used a single shared visited set as both the seen-marker and the cycle signal, so any fan-in or diamond graph of `workflow-run` dependencies, where two workflows point at a common third, was flagged as a cycle, which aborted validation and emitted zero workflow files. The check now signals a cycle only when the walk returns to its own start node and treats a node merely re-seen along a second path as benign, so valid acyclic dependency graphs generate their workflow files as configured.
- The `no-bracket-method-call` ESLint rule no longer rewrites a bracketed method call whose static string key is not a valid identifier, such as `obj['foo-bar']()`, into invalid dot notation like `obj.foo-bar()` under `--fix`. The autofix now confirms the key matches an identifier pattern before offering the dot-notation replacement; keys that are not valid identifiers are still reported as violations but are left untouched, so running `--fix` can no longer produce syntactically invalid or semantically different code.
- `nova utility changelog` releases no longer write a corrupt version such as `1.0.NaN` to a package's `package.json`. When the current version was not a clean numeric `x.y.z`, for example a prerelease like `1.0.0-rc.1`, a patch bump split it into a `NaN` part that the fallback could not recover and wrote the broken value back. The release now validates that the current version is exactly three finite integer parts and fails with a clear error naming the offending version instead of writing an invalid one.
- The `no-raw-text-in-code` ESLint rule no longer flags whitespace-only text inside a `<code>` element, so a `{}`-wrapped expression split across multiple lines lints cleanly. The rule previously reported every JSXText child of a `<code>` element, including the line breaks and indentation that surround a correctly wrapped expression, producing false errors on already-compliant markup. It now ignores JSXText nodes whose trimmed value is empty and reports only genuine unwrapped text.
- The `require-padding-lines` ESLint rule's before-line-comment autofix now inserts the required blank line at the very start of the comment's line, so an indented `//` comment keeps its indentation and the inserted line is genuinely blank. The fix previously inserted the newline after the comment's leading whitespace, which de-indented the comment to column 0 and left the new blank line filled with the moved indentation; running `--fix` now preserves the comment's column and produces a truly empty separating line.
- Generated publish workflows now check out the full git history. The build job's `actions/checkout` step in the publish workflow template sets `fetch-depth: 0` instead of the default shallow depth of 1, so Docusaurus features that derive metadata from git, such as `showLastUpdateTime` and `showLastUpdateAuthor`, resolve each page's real last-modified commit. Previously, every page on a published docs site reported the release commit's date and author because the shallow clone contained only that single commit.
- The Vitest frontmatter conformance rule no longer reports false missing-field failures when a frontmatter value itself contains a `---` sequence. The `splitFrontmatter` helper that feeds every frontmatter check now locates the closing fence as a `---` at the start of a line rather than the first `---` substring anywhere in the block, so a value that embeds `---` no longer truncates the frontmatter early and makes every field defined after it appear absent. Content files whose frontmatter legitimately carries `---` inside a value now pass the required-field, id, description, keywords, and tags checks instead of failing the meta-test.
- Nova commands now work inside git worktrees. The backward filesystem walk that powers project-root detection stops at the repository boundary (a `.git` directory in regular checkouts, a `.git` file in worktrees), so a worktree checked out under the main repository, such as `.worktrees/my-feature`, no longer fails with `Multiple "package.json" files were found` because the parent checkout sits above it. The same boundary also keeps stray `package.json` files above a repository from affecting root detection, workspace path checks, and monorepo context detection.
- `nova scaffold docs` now emits a `type-declarations.test.ts` suite wrapper and wires the placeholder-page frontmatter convention (`placeholderSentinel` and `placeholderBodyPrefix`) into the generated `frontmatter.test.ts`, so a freshly scaffolded docs site self-checks its type declarations and treats coming-soon stub pages as warnings instead of failures, matching Nova's own docs site and demos.
- The `no-implicit-boolean` ESLint rule now reports an implicit-boolean negation that appears in a conditional's body rather than only in its condition test. The rule previously exempted any negation nested under a condition-bearing statement whenever that statement had a test, so a negation such as `!value` written inside an `if` body escaped detection entirely. It now suppresses only negations that are actually part of the condition test, so body-level negations are caught while test-level negations remain handled once by the condition visitors.
- The `no-await-in-loop` ESLint rule no longer crashes on a top-level `await` that is not inside a loop. Its enclosing-loop search now stops when the parent walk reaches the `Program` node (whose parent is `null`) instead of dereferencing `null` and throwing `Cannot read properties of null (reading 'type')`. Files that use top-level `await` outside a loop, common in `.mjs` bootstrap scripts, now lint cleanly instead of failing with a fatal rule crash.
- The `require-jsdoc-param-name` ESLint rule now rewrites each mismatched `@param` description at its own line position, so a JSDoc block whose `@param` descriptions are swapped or cyclically shifted is corrected accurately under `--fix`. The autofix previously built the corrected comment through sequential first-occurrence string replacement on a single accumulating value, which could revert to a no-op fix or assign a description to the wrong parameter when two params shared or exchanged text; each `@param` is now fixed independently of the others.
- The `normalize-dependencies` recipe no longer writes a still-ranged value when pinning a multi-comparator version. Stripping the leading operator from a range such as `>=5.0.0 <6.0.0` previously left `5.0.0 <6.0.0`, which was written back and logged as pinned even though it was not an exact version. Such multi-comparator ranges are now treated as unpinnable and left untouched, and the recipe reports them and sets a failing exit code rather than producing a non-exact pin.
- Saving `nova.config.json` when the file does not exist yet (for example the first run of `nova utility initialize` on a fresh project) no longer attempts to compare against or back up the missing file, which previously emitted `Unable to read existing file` and `Failed to rename` errors before the write. The config is now written directly, and backups are only created when an existing file is actually being replaced.
- The Vitest terminology conformance rule now inspects attribute-less component usages such as `<Terminology>API</Terminology>`. Its component-matching pattern previously required whitespace after the tag name, so a usage written without attributes matched nothing and slipped past every check, leaving its missing `title` and `to` attributes and empty children unreported. The pattern now recognizes the opening tag through a boundary that accepts either whitespace or the closing `>`, so attribute-less usages are captured and correctly flagged by the title, to, and non-empty-children checks.
- The `require-ternary-parens` ESLint rule now determines whether a ternary condition is already parenthesized from the surrounding tokens rather than a single preceding character. This clears two mistakes: an already-parenthesized condition written with inner spacing, such as `( a === b ) ? 1 : 0`, is no longer flagged nor auto-fixed with redundant parentheses, and a ternary passed as the first argument of a call, such as `foo(a ? 1 : 0)`, is now correctly flagged as needing parentheses instead of being silently skipped.
- An `environment` app in `nova.config.json` whose path matches no configured workspace is now excluded from the parsed config instead of being kept. The `nova-config` environment parser previously logged such an app as skipped but still added it to the parsed `environment` block, so the contradictory entry flowed on into downstream credential and workflow validation. The unmatched app is now dropped as its message states, keeping the parsed environment consistent with what was reported.
- The `require-bracket-property-access` ESLint rule now parenthesizes any low-precedence object when its autofix converts dot access to bracket access, so expressions like `(value as Foo).bar`, `(cond ? a : b).prop`, and `(a || b).prop` become `(value as Foo)['bar']` rather than losing their parentheses and silently changing runtime or type semantics under `--fix`. The fix previously added parentheses only for `await` expressions, leaving `as`, `satisfies`, ternary, logical, binary, sequence, and arrow-function objects to bind the brackets to just their tail; all of these object shapes now keep their wrapping parentheses.

### ADDED
- A new `recipe read-me update-badges` command refreshes the badges region of a project's root `README.md` and every consumer-workspace `README.md` copy (app, package, tool, and config roles) in place from `nova.config.json`, mirroring the fan-out the `generate must-haves read-me` command writes. It regenerates the badges with the same builder that generator uses and splices them between the `<!-- nova-region: badges -->` markers, leaving everything outside the region byte-identical. The recipe runs only when `recipes.read-me.update-badges.enabled` is `true`, skips a `README.md` that lacks the region markers, and makes no write when the badges are already up to date.
- A new `recipe read-me update-credits` command refreshes the credits region of a project's root `README.md` in place from `nova.config.json`. It regenerates the credits with the same builder the `generate must-haves read-me` command uses and splices them between the `<!-- nova-region: credits -->` markers, leaving everything outside the region byte-identical. The recipe runs only when `recipes.read-me.update-credits.enabled` is `true`, skips a `README.md` that lacks the region markers, and makes no write when the credits are already up to date.
- A new `recipe read-me update-documentation` command refreshes the documentation region of a project's root `README.md` in place from `nova.config.json`. It regenerates the documentation with the same builder the `generate must-haves read-me` command uses and splices it between the `<!-- nova-region: documentation -->` markers, leaving everything outside the region byte-identical. The recipe runs only when `recipes.read-me.update-documentation.enabled` is `true`, skips a `README.md` that lacks the region markers, and makes no write when the documentation is already up to date.
- The `generate must-haves dotenv` command gains a `--prune` flag that removes orphaned keys from a project's local `.env` files. By default, keys present in a `.env` but no longer declared in the environment config are preserved; with `--prune`, each orphan is stripped after an interactive confirmation. When a variable is removed from the config, `nova utility initialize` points to `generate must-haves dotenv --prune` to clean up the stale keys.
- Added `fwAstro` presets on the framework axis, in both flavors. The ESLint preset (from `@cbnventures/nova/presets/eslint`) wires the TypeScript parser into `.astro` frontmatter so typed Astro component scripts lint without `Unexpected token` parse errors; spread it after `eslint-plugin-astro`'s flat config. The TypeScript preset (`@cbnventures/nova/presets/tsconfig/fw-astro.json`) provides the Astro framework compiler layer — bundler resolution, DOM libraries, and preserved JSX — to combine with Astro's own base.
- Added two publish triggers to the GitHub workflows generator: `tag-push`, which publishes on a version tag so npm provenance signing stays valid, and `push`, for branch-based continuous deployment.
- A new `recipe read-me update-header` command refreshes the header region of a project's root `README.md` in place from `nova.config.json`. It regenerates the header with the same builder the `generate must-haves read-me` command uses and splices it between the `<!-- nova-region: header -->` markers, leaving everything outside the region byte-identical. The recipe runs only when `recipes.read-me.update-header.enabled` is `true`, skips a `README.md` that lacks the region markers, and makes no write when the header is already up to date.
- A new `recipe read-me update-introduction` command refreshes the introduction region of a project's root `README.md` in place from `nova.config.json`. It regenerates the introduction with the same builder the `generate must-haves read-me` command uses and splices it between the `<!-- nova-region: introduction -->` markers, leaving everything outside the region byte-identical. The recipe runs only when `recipes.read-me.update-introduction.enabled` is `true`, skips a `README.md` that lacks the region markers, and makes no write when the introduction is already up to date.
- Added the `recipe license update-copyright` recipe, which refreshes the copyright holder and year range in a `LICENSE` from `project.legalName` and `project.startingYear`. A fingerprint gate compares the on-disk file against the bundled template for the configured license, so a hand-edited, custom, or non-nova `LICENSE` is never rewritten. It runs alongside the other recipes via `recipe license` and `run-recipes`, and self-skips unless `recipes.license.update-copyright.enabled` is set in `nova.config.json`.
- Adds the `require-jsdoc-presence` ESLint rule, which requires a leading JSDoc block on every documentable symbol: classes, functions (top-level and nested), class methods and properties, module-level constants, local function-valued constants such as `const helper = () => {}`, and type aliases, interfaces, and enums. Local value constants, inline callbacks, ambient `declare` declarations, overload signatures, re-export lists, and `.d.ts` declaration files are exempt. Configurable via `ignoreFiles` and `skipDirectories`.
- The type-declaration meta-test gained an `inspector-no-inline-import-types` inspector that forbids inline `import('...')` type references inside declaration files. Every cross-file type must be pulled in through a top-of-file named type import instead, which keeps imports visible to the naming and alias inspectors rather than hidden inside type expressions. The inspector runs automatically wherever `registerTypeDeclarationSuite` is used with `enable: 'all'`.
- A new `require-node-protocol` ESLint rule is available from `@cbnventures/nova/rules/eslint` as `RequireNodeProtocol`. It requires the `node:` protocol on every static import, `export ... from`, and dynamic `import()` of a Node.js built-in module — so `import fs from 'fs'` must be written as `import fs from 'node:fs'`, and subpaths like `fs/promises` are matched by their base module. Built-ins become explicit and can never be confused with a userland package of the same name. The rule is auto-fixable, preserves the original quote style, and accepts the standard `ignoreFiles` escape hatch.
- The toolkit gained a `NovaIdentity` class (`@cbnventures/nova/toolkit`) that resolves project identity from the nearest `nova.config.json` and exposes it as typed projections. Constructing it walks up from the working directory to find the config, then reads the identity subset it declares; every field is optional, so absent values come back as `undefined` (or an empty array) for a consumer to coalesce, while a missing file, unreadable/invalid JSON, or a present-but-wrong-typed field throws a clear error. Its `forDocs()` method projects the identity into the shape a Docusaurus config consumes, and the pure transforms it uses (`composeCopyright`, `copyrightYearRange`, `normalizeRepoUrl`, `githubUserUrl`, `stripTrailingSlash`) are exposed as static methods so recipes and generators can share one definition of project identity.
- Adds the `require-jsdoc-returns` ESLint rule, which requires every `@returns` tag to contain only a type in braces (`@returns {SomeType}`) with no trailing description, keeping the semantic meaning in the named type alias.
- The GitHub workflows generator gains a cloudflare-workers publish target that deploys a Worker with static assets to Cloudflare Workers by running the workspace's own deploy script. Consumers set a CLOUDFLARE_API_TOKEN secret and a CLOUDFLARE_ACCOUNT_ID variable, and the deploy consumes the workspace's build directory as its artifact.
- Adds the `require-jsdoc-tag-order` ESLint rule, which enforces the canonical JSDoc tag order (`@param`, `@private`, `@returns`, `@since`, `@deprecated`) and requires exactly one blank line between tag groups, with no blank line between consecutive `@param` lines. Provides an autofix that reorders the tags and normalizes the spacing while preserving the block's indentation.
- The type-declaration meta-test gained an `inspector-dts-import-verbatim` inspector that requires types imported from a `.d.ts` file to be used verbatim, with no `as` alias. Declared types are already canonically named, so relabeling one on import adds no information and is now flagged. Imports from runtime modules (for example a `Runner` re-exported under a domain name) are unaffected. The inspector runs automatically wherever `registerTypeDeclarationSuite` is used with `enable: 'all'`.

### REMOVED
- Removed the `aws-amplify-nextjs` publish target. A workflow that declares it now fails with an unsupported-target error.
- Removed the old scattered recipe configuration in favor of the unified top-level `recipes` block. The `github.recipes` object and the per-workspace `recipes` tuple map (`workspaces.<path>.recipes`) are no longer read or written. Recipe enablement and settings now live under a single `recipes` block split into `github`, `license`, `read-me`, and `package-json` categories, where each entry is a `{ enabled, settings? }` object instead of a `[enabled, settings?]` tuple. Configs that still declare recipes on the old shape lose those settings and must migrate to the `recipes` block.

## 0.20.0 - 2026-07-01

### UPDATED
- `nova generate must-haves agent-conventions` now emits only the AI-tool files a repository selects: `claude-code` writes `CLAUDE.md`, `codex` writes `AGENTS.md`, and the shared `VISION.md`, `PROJECT_RULES.md`, and `conventions/*.md` files are written whenever at least one tool is selected. When no tool is selected, the generator writes nothing and warns.
- Tightens `nova.config.json` parsing so silent drops become visible. A `dotenv` variable that reuses a template-managed key (`NODE_ENV`, `LOG_LEVEL`, `LOG_TIME`) is now rejected with a warning naming the key. Each workspace dropped during parsing now logs a warning naming its path and the reason, instead of disappearing without notice.
- The `require-jsdoc-since` ESLint rule now validates `@since` and `@deprecated` version values and enforces `@since` on exported declarations (previously only non-exported declarations were checked).
- Makes `nova generate must-haves dotenv` uniform across every workspace. The `dotenv` block moves off the top-level config onto each `workspaces[path]` entry (the root workspace uses the `./` path), and a workspace receives `.env` and `.env.sample` files only when it declares a `dotenv` block, listing its variables under `dotenv.variables`. The top-level `dotenv` config and the `nova utility initialize` Environment category are removed, so an existing config must move its `dotenv` block under the appropriate workspace.
- The `generate` commands for `.gitignore`, `.env`, and GitHub issue templates are now non-interactive and read their customization from `nova.config.json`. Manage ignores and issue-template fields through `nova utility initialize`, which imports existing `.gitignore` entries on first open. Regenerating `.env` preserves values you have already filled in (only new keys start blank); `.env.sample` is rebuilt from the configured defaults.
- The generated `.gitignore` template now includes a Tooling - Claude Code section that ignores `.worktrees/` and `docs/superpowers/`, keeping git worktrees and Superpowers planning docs out of version control by default.
- Pins every dependency in the scaffold templates (`nova scaffold`) to an exact version, so generated projects no longer install caret ranges. A new test keeps the scaffolded Docusaurus project's `@cbnventures/nova` and `@cbnventures/docusaurus-preset-nova` dependencies matched to the current Nova version, catching the kind of drift that previously left the preset pinned to an outdated `^0.1.0`.
- `nova generate must-haves dotenv` now seeds sensible defaults for the reserved `NODE_ENV`, `LOG_LEVEL`, and `LOG_TIME` keys (previously `LOG_LEVEL` and `LOG_TIME` shipped blank) and documents each key's valid values as an inline comment in `.env` and `.env.sample`. Regenerating never overwrites a value you have already set.
- Bumps the GitHub Actions in the generated publish and CI workflows to `actions/checkout@v7`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5`, and `actions/deploy-pages@v5`.
- `nova utility changelog --release` now bumps every exact-pinned dependency on a co-released package to the new version across workspace and template `package.json` files, so a release no longer leaves stale internal pins behind for the drift tests to catch afterward.

### FIXED
- The `no-regex-literals` ESLint rule now also flags regular expressions built with the `RegExp` constructor from a string or static template literal (e.g. `new RegExp('foo')`), closing a gap where the constructor form bypassed the rule. Patterns built from a `.source` reference, an identifier, or an interpolated or concatenated string remain allowed.
- Fixes the `nova recipe github` sync recipes, which previously failed to apply. `sync-identity` now shell-quotes the `gh api` topics field and clears all topics when the configured list is empty. `sync-policies` now passes `--accept-visibility-change-consequences` alongside `--visibility`, and skips `--default-branch` when that branch does not yet exist on the remote.

### ADDED
- Adds a `registerDotenvSuite` Vitest conformance suite, exported from `@cbnventures/nova/rules/vitest`, that fails the run when any value in a `.env` or `.env.sample` file is not wrapped in double quotes.
- Adds the `@cbnventures/nova/rules/vitest` conformance kit: importable `registerTypeDeclarationSuite`, `registerFrontmatterSuite`, `registerLinkSuite`, `registerMarkdownTableSuite`, and `registerTerminologySuite` functions that replace the previously copy-pasted vitest meta-tests. Each consumer test becomes a thin wrapper that calls the matching `register*Suite(config)`, so docs and type-declaration conventions upgrade by version bump instead of re-copying. `nova scaffold docs` emits these wrapper tests for new sites.
- Adds the `@since UNRELEASED` sentinel convention for tagging new or changed API: authors write `UNRELEASED`, and `nova utility changelog --release` stamps the real version at release. The convention is scaffolded into the generated agent-conventions templates for TypeScript, Java, Kotlin, and PHP.
- Adds an `auto` value for `LOG_LEVEL` (the new default) that derives the level from `NODE_ENV`, recognized by the Nova logger.
- Adds a top-level `agents` field to `nova.config.json` for selecting AI-tool conventions (`claude-code`, `codex`), chosen through a new **AI Tools** category in `nova utility initialize` that requires at least one tool.

### REMOVED
- Removes Cursor support from the agent-conventions generator, including the `.cursorrules` output file and its template.

## 0.19.0 - 2026-06-21

### UPDATED
- Clarifies the `--dry-run` option help text across all commands

## 0.18.0 - 2026-06-19

### UPDATED
- Migrates the TypeScript type-naming convention from glued PascalCase (`CliUtilityChangelogReleasePackageName`) to underscore-separated PascalCase chunks following `{PathPrefix}_{ClassName}_{MethodName}_{VariableName}` (e.g. `Cli_Utility_Changelog_Runner_Release_PackageName`). Every path segment becomes a chunk verbatim (no segments stripped, `index` no longer elided), the class name is now its own chunk, and slots are conditional — `{ClassName}` only when a class is declared, `{MethodName}` only for methods or functions, `{VariableName}` only when the type names a specific identifier. About 14,000 identifiers were renamed across nova, the preset, and the in-repo demo and docs apps; CLI command names, the package exports map, and runtime behavior are unchanged. The format is machine-enforced by the `require-type-naming` rule and the type-declarations meta-test, so run ESLint and rename your named types plus their `@param` / `@returns` JSDoc tags to the new form.
- Renames the internal class in every `@cbnventures/nova` module to the literal identifier `Runner` (the file path already carries the meaning — e.g. `markdown-table.ts` and `logger.ts` now declare `class Runner`). Consumer class imports are unaffected: the classes on nova's public surface are re-exported from `@cbnventures/nova/toolkit` as `Bootstrap`, `CLIHeader`, `Logger`, and `MarkdownTable` (each file's default export), so `import { MarkdownTable } from '@cbnventures/nova/toolkit'` is unchanged, as is a deep default import like `import MarkdownTable from '@cbnventures/nova/toolkit/markdown-table'`. The renamed identifiers do surface in the exported `./types/*` declarations.
- Rewrites the type-naming section of the scaffolded `conventions/typescript.md`: documents the literal `Runner` class slot, makes the four pattern slots explicitly conditional, broadens the forward-reference exemption to all return-position aliases (`Returns`, `TypeGuard`, and the singular `Return`), extends chunk derivation to any call whose first argument is a string literal and a later argument is a function expression (e.g. `app.get('/users', handler)`, not just `describe` / `it` / `test`), closes the alias loophole so a typed body variable must be a concrete local shape rather than a direct alias to a foreign type, and restates the standalone-type-file rules so files like `shared.d.ts` keep their path prefix and object property types compose as `Parent_Property`. Consumers running `nova generate` receive the updated file.
- Refreshes the rest of the scaffolded agent-conventions templates: adds File Writes, Web Research, and Honest Acknowledgment sections (plus Claude-in-Chrome-first browser-debugging guidance) to `conventions/universal.md`, links the existing `conventions/documentation.md` from the `AGENTS.md` / `CLAUDE.md` / `.cursorrules` index, and changes the `PROJECT_RULES.md` release step to a thematic commit subject (3-5 themes in imperative form) since the version pointer lives in the tag. Re-run `nova generate` to receive the updates.
- Changes README.md fan-out to target consumer-facing workspace roles (app, package, tool, config) instead of workspaces flagged with the `distributable` policy, matching the LICENSE generator.
- Bumps the GitHub Actions in generated publish workflows to `actions/upload-artifact@v7` and `actions/download-artifact@v8` across all publish targets.

### FIXED
- Normalizes framework routing syntax in path segments when deriving type prefixes and JSDoc hierarchy text, so the `require-type-naming` and `require-jsdoc-hierarchy` rules unwrap Next.js-style `[id]`, `[...name]`, `[[...name]]`, `(group)`, and `@slot` segments (and replace other non-identifier characters with hyphens) instead of producing mangled identifiers like `App[..Layout`.
- Stops truncating path segments that contain dots when `require-jsdoc-hierarchy` computes the expected hierarchy text, so directory names with dots are no longer cut short; only a trailing file extension is stripped from the final segment.
- Resolves the bundled templates for the `agent-conventions`, `dotenv`, `editorconfig`, and `gitignore` generators by their dotless internal filenames (`cursorrules`, `env`, `env.sample`, `editorconfig`, `gitignore`), stripping the leading dot at lookup time while still writing the correct dotfile target, so the generators reliably find their templates in the published package.
- Fixes `nova generate dotenv` manage flow crashing with ENOENT when seeding reserved keys: the dotenv generator now reads a real bundled `env` template (with `NODE_ENV`, `LOG_LEVEL`, `LOG_TIME` keys) instead of a non-existent `.env` template.
- Rejects empty and whitespace-only input for required literal-format settings in `nova utility initialize`, so a missing required setting surfaces at prompt time instead of being silently dropped and failing later during workflow generation.
- Validates target-level literal settings (not just template-level) at workflow generation time, so a workflow missing a required per-target literal (e.g. `github-action`'s `ACTION_YML_PATH`) is skipped with a clear error instead of generating an incomplete workflow.
- Preserves `$` sequences verbatim when substituting literal-format variable values into generated workflow YAML, so values containing `$&`, `$1`, or `$$` are no longer mis-interpreted as regex replacement patterns.

### ADDED
- Adds a `UnderscorePascalCase` casing value to the `require-naming-convention` ESLint rule for identifiers shaped as one or more PascalCase chunks joined by single underscores (e.g. `Foo`, `Tests_TypeDeclarations_Foo_Bar`). The `typeAlias` default flips from `PascalCase` to `UnderscorePascalCase`, so existing glued type names now fail the rule and must be renamed.
- Adds convention rules enforced by `require-type-naming` and the type-declarations meta-test: top-level class, function, and function-typed-`const` names must differ from the file name (use a barrel re-export to preserve the file-name import); path segments must match `[a-z][a-z0-9-]*` after stripping `.d.ts` / `.tsx` / `.ts` / `.test`; and standalone type files use PascalCase identifiers without brand casing, keep their path prefix, name object property types in `Parent_Property` form, and define array element types before the arrays. The meta-test substrate is fanned to the consumer docs sites, so downstream repos inherit the checks on their next sync.
- Reports a dedicated `invalidIdentifierPrefix` error from the `require-type-naming` and `require-jsdoc-hierarchy` rules when the first path segment starts with a digit (e.g. a `2fa/` directory), since such a segment can never yield a valid TypeScript identifier prefix; the message names the offending segment and asks to rename the directory to start with a letter.
- Adds a `github` recipe category exposed as `nova recipe github` (alias `gh`) with `sync-identity`, `sync-features`, and `sync-policies` subcommands that push repository description, homepage, topics, collaboration features (issues / wiki / projects / discussions), and policies (visibility, default branch, merge methods, auto-delete head branch) from `nova.config.json` to GitHub via the `gh` CLI, each supporting `--dry-run`.
- Adds a structured `github` block to `nova.config.json` (`github.owner`, `github.repo`, `github.recipes`, `github.topics`, `github.features`, `github.policies`), parsed, validated, and prompted for during `nova init`.
- Adds the `github-action` publish target for distributing JavaScript GitHub Actions via an orphan release branch, with semver and floating-major tag force-retagging (prefix-aware, e.g. `primary-v1.2.3` retags `primary-v1`), prerelease-aware major skipping, and SLSA build-provenance attestation on the bundled entry script.
- Validates publish-target destination uniqueness across the entire `workflows[]` array: targets declaring a uniqueness key (github-action's release branch, cloudflare-pages-docusaurus's project, aws-amplify-nextjs's app+branch, vercel-nextjs's org+project, and the singleton github-pages-docusaurus) are checked in a pre-pass, and two targets resolving to the same destination anywhere in the config fail the generator with a clear error that rejects both colliding workflows.
- Adds `displayName` to the package.json cleanup recipe's allow-list and canonical sort order (between `name` and `version`) so the cleanup recipe preserves and sorts it for Homebridge plugins and VS Code extensions instead of flagging it as unknown.
- Adds an optional `workspaces[path].displayName` field in `nova.config.json`, with a matching prompt in `nova utility initialize`, for configuring each workspace's display label centrally.
- Fans LICENSE out to consumer-facing roles (app, package, tool, config) so every consumer-facing workspace ships its own LICENSE file.

### REMOVED
- Removes `urls.github`. Repository identity now lives under structured `github.owner` and `github.repo` fields, which the README and issue-template generators read directly.

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
