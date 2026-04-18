# PROJECT_RULES.md

## Project Identity

### Name and Description

- **Project name:** Nova
- **Description:** Scripts, templates, and project configuration for the common JavaScript and TypeScript developer.
- **Primary language:** TypeScript
- **Framework / runtime:** Node.js

### Repository URL

- **URL:** https://github.com/cbnventures/nova

## Repository Layout

```
./                              → role: project, policy: freezable
├── apps/
│   ├── demo-envoy/             → role: docs, policy: freezable (preset showcase)
│   ├── demo-foundry/           → role: docs, policy: freezable (preset showcase)
│   ├── demo-sentinel/          → role: docs, policy: freezable (preset showcase)
│   ├── demo-signal/            → role: docs, policy: freezable (preset showcase)
│   └── docs/                   → role: docs, policy: freezable (Docusaurus)
├── packages/
│   ├── docusaurus-preset-nova/ → role: package, policy: distributable (@cbnventures/docusaurus-preset-nova)
│   └── nova/                   → role: package, policy: distributable (@cbnventures/nova)
├── nova.config.json            → source of truth for project metadata
├── package.json                → monorepo root (owns lockfile + workspaces)
└── VISION.md / AGENTS.md       → project vision and agent instructions
```

- Every monorepo created with Nova should include a Docusaurus documentation workspace.
- Local development uses [portless](https://portless.sh) for automatic port assignment and stable `.localhost` URLs:

| Portless Name        | Workspace            | URL                                    |
|----------------------|----------------------|----------------------------------------|
| `nova-docs`          | `apps/docs`          | `https://nova-docs.localhost`          |
| `nova-demo-envoy`    | `apps/demo-envoy`    | `https://nova-demo-envoy.localhost`    |
| `nova-demo-foundry`  | `apps/demo-foundry`  | `https://nova-demo-foundry.localhost`  |
| `nova-demo-sentinel` | `apps/demo-sentinel` | `https://nova-demo-sentinel.localhost` |
| `nova-demo-signal`   | `apps/demo-signal`   | `https://nova-demo-signal.localhost`   |

## Source Structure

### @cbnventures/nova

```
src/
├── api/                    → external API clients (e.g., node-releases.ts, spdx-licenses.ts)
├── cli/
│   ├── recipe/
│   │   ├── index.ts        → recipe entry point
│   │   └── package-json/   → package.json recipes (sync-identity.ts, normalize-modules.ts, etc.)
│   ├── utility/            → utility commands (changelog, initialize, run-recipes, run-scripts, transpile, type-check, version)
│   └── index.ts            → CLI entry point (Commander setup)
├── lib/                    → shared libraries (item.ts, nova-config.ts, regex.ts, schema.ts, utility.ts)
├── presets/
│   ├── eslint/             → ESLint flat config presets (.mjs, plain JavaScript)
│   └── tsconfig/           → TSConfig JSON presets
├── rules/
│   └── eslint/
│       ├── index.ts        → rule registry (exports all custom rules)
│       ├── formatting/     → formatting rules (no-raw-text-in-code, require-padding-lines)
│       ├── nova/           → Nova-specific rules (no-logger-dev)
│       ├── patterns/       → code pattern rules (switch-case-blocks, no-destructuring, etc.)
│       ├── regex/          → regex rules (no-regex-literals, no-regex-literal-flags)
│       └── typescript/     → TypeScript rules (no-inline-type-annotation, etc.)
├── toolkit/                → importable batteries (Logger, CLIHeader, MarkdownTable)
└── types/                  → all type definitions, mirroring the source tree
    ├── api/
    ├── cli/
    ├── lib/
    ├── presets/
    ├── rules/
    ├── tests/
    ├── toolkit/
    └── shared.d.ts         → shared types (only imported by other .d.ts files)
```

### @cbnventures/docusaurus-preset-nova

```
src/
├── components/             → landing page components (Hero, Features, Stats, etc.)
├── lib/                    → color pipeline, CSS generator, search, Shiki rehype
│   └── search/             → client-side search (indexer, worker, hooks)
├── presets/                → visual identity presets (envoy, foundry, sentinel, signal)
├── scripts/                → client-side init scripts (color mode, announcement bar)
├── styles/                 → three-layer CSS (base, component, preset)
│   ├── components/         → structural component styles
│   └── presets/            → per-preset visual identity styles
├── theme/                  → Docusaurus theme component overrides (150+)
├── tests/                  → preset and theme tests
└── types/                  → all type definitions
```

## Key Files

| File                                                        | Purpose                                  | When to modify                                              |
|-------------------------------------------------------------|------------------------------------------|-------------------------------------------------------------|
| `packages/nova/src/cli/index.ts`                            | CLI entry point (Commander setup)        | Adding or changing CLI commands                             |
| `packages/nova/src/cli/recipe/index.ts`                     | Recipe entry point                       | Adding new recipe commands                                  |
| `packages/nova/src/lib/item.ts`                             | Shared constants (roles, policies, etc.) | Adding new roles, policies, or category constants           |
| `packages/nova/src/lib/nova-config.ts`                      | NovaConfig loader and validator          | Changing how `nova.config.json` is read or validated        |
| `packages/nova/src/lib/regex.ts`                            | Shared regex patterns                    | Adding or modifying regex patterns used across modules      |
| `packages/nova/src/rules/eslint/index.ts`                   | ESLint rule registry                     | Registering new custom ESLint rules                         |
| `packages/nova/src/types/shared.d.ts`                       | Shared type aliases                      | Adding types used across multiple `.d.ts` files             |
| `packages/docusaurus-preset-nova/src/index.ts`              | Theme plugin entry point                 | Changing plugin lifecycle, client modules, or CSS injection |
| `packages/docusaurus-preset-nova/src/preset.ts`             | Preset entry point                       | Changing how presets compose Docusaurus plugins             |
| `packages/docusaurus-preset-nova/src/options.ts`            | Option schemas and defaults              | Adding or changing preset/plugin configuration options      |
| `packages/docusaurus-preset-nova/src/get-swizzle-config.ts` | Swizzle safety config                    | Marking theme components as safe/unsafe for ejection        |
| `nova.config.json`                                          | Project metadata source of truth         | Changing project identity, entities, or workspaces          |
| `package.json`                                              | Monorepo root manifest                   | Adding dependencies, changing scripts, bumping version      |
| `turbo.json`                                                | Turborepo build orchestration            | Changing build pipeline, adding tasks, adjusting caches     |
| `apps/docs/sidebars.ts`                                     | Docusaurus sidebar navigation            | Adding or reorganizing documentation pages                  |
| `apps/docs/docusaurus.config.ts`                            | Docusaurus site configuration            | Changing site metadata, plugins, or theme settings          |
| `{workspace}/CHANGELOG.md`                                  | Release notes (non-freezable only)       | Every user-facing change                                    |

## Build and Tooling

### Prerequisites

| Tool    | Version                         | Purpose         |
|---------|---------------------------------|-----------------|
| Node.js | All current LTS (see `engines`) | Runtime         |
| npm     | See `packageManager`            | Package manager |

### Commands

All commands must be run from the **monorepo root**. The `changelog` and `recipes` scripts call the `nova` CLI binary directly — if Nova isn't built, those commands fail. The `check` task in `turbo.json` depends on `build` because ESLint uses Nova's own compiled custom rules from `./build/`. Tests run via Vitest directly on TypeScript source files and do not require a build step.

| Command             | What it does                                               |
|---------------------|------------------------------------------------------------|
| `npm install`       | Install all dependencies                                   |
| `npm run dev`       | Start development servers (via Turborepo)                  |
| `npm run prod`      | Start production servers (via Turborepo, depends on build) |
| `npm run build`     | Compile TypeScript to JavaScript (`tsc` via Turborepo)     |
| `npm run check`     | Run lint, type-check, and tests (via Turborepo)            |
| `npm run deploy`    | Run deployment scripts (via Turborepo)                     |
| `npm run clean`     | Remove build artifacts                                     |
| `npm run changelog` | Generate changelog from `.changelog/` entries              |
| `npm run recipes`   | Run Nova recipes across all workspaces                     |

### Environment Variables

None. This project does not read any environment variables at runtime.

## Workspace Rules

### Naming Conventions

| Role     | Naming rule                                                 |
|----------|-------------------------------------------------------------|
| project  | `{slug}-project`                                            |
| docs     | `{slug}-docs`                                               |
| config   | `{slug}-config-{descriptor}` (requires project slug prefix) |
| app      | `{slug}-app-{descriptor}` (requires project slug prefix)    |
| tool     | `{slug}-tool-{descriptor}` (requires project slug prefix)   |
| package  | simple slug or `@scope/name` (scoped allowed)               |
| template | simple slug or `@scope/name` (scoped allowed)               |

### package.json Key Ordering

When recipes write or reorder a `package.json`, keys follow this canonical order:

1. **Identity & Discovery:** `name`, `version`, `description`, `keywords`, `license`
2. **Ownership & Support:** `homepage`, `bugs`, `author`, `contributors`, `funding`, `repository`
3. **Runtime Entry Points:** `exports`, `main`, `type`, `browser`, `imports`
4. **Executables & Artifacts:** `files`, `bin`, `man`, `directories`
5. **Publishing Controls:** `private`, `publishConfig`
6. **Workspace & Tooling:** `scripts`, `gypfile`, `config`, `workspaces`
7. **Corepack:** `packageManager`
8. **Environment Constraints:** `engines`, `os`, `cpu`, `libc`, `devEngines`
9. **Dependency Specs:** `dependencies`, `devDependencies`, `peerDependencies`, `peerDependenciesMeta`, `bundleDependencies`, `optionalDependencies`, `overrides`
10. **Bundler (unofficial, by vendor):** `types` (TypeScript/Microsoft), `module` (Rollup), `sideEffects` (webpack), `esnext` (community)

Keys not in the npm official spec or bundler list should be flagged or removed by recipes (unless `--ignore-unknown` is passed).

- `engines` is **Required** for all roles. The `node` constraint is fetched from the Node.js release schedule (all current LTS majors where the LTS date has started and the end-of-life date has not passed).
- `bundleDependencies` is the preferred key. `bundledDependencies` is always merged into `bundleDependencies` and then deleted.
- `typings` is always merged into `types` and then deleted (same treatment as `bundledDependencies`).

### package.json Key Classification

Every `package.json` key is classified into one of three buckets based on each workspace's role and policy:

| Bucket          | Behavior                                                            |
|-----------------|---------------------------------------------------------------------|
| **Required**    | Always present. Recipes add it if missing.                          |
| **Conditional** | Kept if meaningful, stripped if empty.                              |
| **Forbidden**   | Removed with warning. Not allowed for this role/policy combination. |

### Do / Don't

#### Code and Workspaces

**Do:**
- A **distributable** workspace must not depend on **freezable** or **trackable** workspaces.
- The monorepo root (`project` role) must have `packageManager` and `workspaces` keys; no other workspace should.
- Only **distributable** workspaces may have `files` in their `package.json`.
- **Trackable** and **distributable** workspaces must use Semantic Versioning.
- **Freezable** workspaces stay at `0.0.0` and are never deployed or published.
- Always pair `module` with `moduleResolution` in TSConfig.
- Relative paths do not belong in exported TSConfig presets (TypeScript resolves from where the config is, not where the command runs).
- If a project uses its own build tool instead of `tsc`, set `isolatedModules: true` and `noEmit: true`.
- First-time publish to npm requires `npm publish --access public` for scoped packages.

**Don't:**
- Do not use `incremental` in TSConfig (non-deterministic).
- Do not use `composite` in TSConfig (requires `incremental`).
- Do not use `assumeChangesOnlyAffectDirectDependencies` (non-deterministic).
- Do not use `typeRoots`.
- Do not set `publishConfig.registry` in `package.json` — it overrides the CI runner's `registry-url` and breaks dual-publish workflows.

#### Documentation

**Do:**
- Docs site content lives in `apps/docs/docs/` as `.mdx` files.
- Documentation `description` and `keywords` in frontmatter should be SEO-optimized.
- Frontmatter `tags` should be optimized for Docusaurus local search.
- Toolkit docs call their utilities "batteries" (e.g., "the Logger battery").
- ESLint rule docs follow this structure: opening line, Summary, Why Use This Rule? (numbered list), Examples (tabs with Correct/Incorrect), Configuration, Troubleshooting.
- Documentation voice recommends, never commands. Use "it is recommended" over imperative "Always do X".
- Admonitions (`:::danger`, `:::tip`, etc.) address a single concern. Danger boxes state only the risk — do not append general advice. Tips may include gentle recommendations.

**Don't:**
- Do not repeat the same advice across multiple admonitions on the same page.

## Project-Specific Patterns

### Architecture

Nova exposes three architectural surfaces:

1. **CLI Pipeline** — `nova recipe` and `nova utility` commands. Layered: CLI (Commander parses args, routes) → Command classes (static `run()` method orchestrates) → Lib helpers (config loading, file I/O, constants) → Toolkit (Logger, CLIHeader for output).

2. **Preset Composition** — ESLint and TSConfig presets consumed by spreading layers in a defined stacking order (ignores → code style → language → environment/framework → platform → tool). Custom ESLint rules are bundled into the presets.

3. **Toolkit (Batteries)** — Standalone importable utilities (Logger, CLIHeader, MarkdownTable) that consumers install and import directly from the package. Independent of the CLI.

```
CLI Pipeline:

nova <group> <command>
  │
  ▼
CLI Layer (src/cli/index.ts)
  Commander parses args, routes to command class
  │
  ▼
Command Layer (src/cli/recipe/*.ts, src/cli/utility/*.ts)
  Static class with public run() method, orchestrates the full operation
  │
  ▼
Lib Layer (src/lib/)
  Config loading (nova-config.ts), constants (item.ts),
  file I/O helpers (utility.ts), regex patterns (regex.ts)
  │
  ▼
API Layer (src/api/)
  External HTTP calls with Zod validation (node-releases.ts, spdx-licenses.ts)
```

```
Preset Composition:

Consumer's eslint.config.ts or tsconfig.json
  │
  ▼
Import + spread Nova preset arrays into flat config
  │
  ▼
Layers stack in defined order:
  ignores → code style → language → env/framework → platform → tool
  │
  ▼
Custom ESLint rules (src/rules/eslint/) bundled into presets
```

### Data Flow

#### Recipes

Recipes follow strict instructions to transform workspace files. They apply to many different file types, not just `package.json`.

```
nova.config.json (workspace definitions + metadata)
  │
  ▼
Load workspace definitions, resolve paths,
read target files (package.json, tsconfig.json, etc.)
  │
  ▼
Apply recipe transforms per workspace
  (sync fields, normalize keys, pin versions, reorder)
  │
  ▼
Write modified files back to disk
```

#### Utilities

Utilities are in-house development helpers that assist with fragile or broken parts of the npm ecosystem. They are not importable — they run as CLI commands only.

```
User input (CLI flags or interactive prompts)
  │
  ▼
Command-specific logic
  (changelog: prompt → write .md file)
  (type-check: shell out to tsc)
  (version: read package.json → print)
  (initialize: scaffold nova.config.json)
  │
  ▼
Output (files, stdout, or exit code)
```

#### Presets (consumed at build time)

```
Consumer's config file (eslint.config.ts or tsconfig.json)
  │
  ▼
Import + spread Nova preset arrays
  │
  ▼
Merged config consumed by ESLint or tsc
```

### Error Strategy

This describes current behavior, not necessarily the ideal end state.

| Layer           | Strategy                                                                                                             |
|-----------------|----------------------------------------------------------------------------------------------------------------------|
| CLI entry point | Catch all. Log error via Logger. Set `process.exitCode = 1`. Return.                                                 |
| Command classes | Throw on unrecoverable failure. Caller (CLI layer) catches.                                                          |
| Lib helpers     | Return `undefined` on failure. Caller checks before proceeding.                                                      |
| API clients     | Zod `.parse()` for validation. try/catch for network errors. Return `undefined` on failure (static caching pattern). |
| Toolkit         | Batteries don't throw — they log.                                                                                    |

## Documentation Site

### Framework

- **Framework:** Docusaurus
- **Source directory:** `apps/docs/`
- **Build output:** `apps/docs/build/`

### Site Structure

```
apps/docs/
├── docusaurus.config.ts  → Site configuration
├── sidebars.ts           → Sidebar navigation structure
├── docs/
│   ├── cli/              → CLI command documentation
│   ├── facades/           → Facade package documentation
│   ├── presets/           → Preset documentation (ESLint, TSConfig)
│   ├── quickstart/        → Getting started guides
│   ├── rules/             → ESLint rule documentation
│   └── toolkit/           → Battery (utility) documentation
├── src/
│   ├── components/        → React components for docs
│   ├── lib/               → Shared library code
│   └── tests/             → Documentation tests
└── static/
    └── images/            → Static images and logos
```

### Commands

| Command              | What it does                           |
|----------------------|----------------------------------------|
| `npm run docs:dev`   | Start local dev server with hot reload |
| `npm run docs:build` | Build the static site for production   |

## Publishing and Deployment

### Release Process

1. All changes committed, `git status --short` is clean.
2. Changelog consolidated, version bumped.
3. Commit with version subject line.
4. Tag the commit (e.g., `v1.2.0`).
5. Push commit and tag.
6. GitHub Release triggers CI workflows.

### CI/CD Workflows

| Workflow file                                | Trigger           | What it does                              |
|----------------------------------------------|-------------------|-------------------------------------------|
| `check-sponsor-gated-issues.yml`             | Issue opened      | Gate issues behind sponsorship check      |
| `lock-inactive-issues.yml`                   | Weekly cron       | Lock issues inactive > 30 days            |
| `publish-to-github-packages.yml`             | Release published | Build and publish to GitHub Packages      |
| `publish-to-cloudflare-pages-docusaurus.yml` | Release published | Build and deploy docs to Cloudflare Pages |
| `publish-to-npm.yml`                         | Release published | Build and publish to npm                  |

### Environments

| Environment      | URL / Identifier                                  | Purpose                 |
|------------------|---------------------------------------------------|-------------------------|
| npm              | `https://www.npmjs.com/package/@cbnventures/nova` | Public package registry |
| Cloudflare Pages | `https://nova.cbnventures.io/`                    | Documentation site      |
