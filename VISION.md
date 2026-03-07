# VISION.md

## Purpose

### Problem Statement

Nova is a JavaScript and TypeScript monorepo suite. It provides strict presets, guided CLI tooling, and importable utilities so teams can build with confidence and predictability.

Nova exists to eliminate setup overhead and configuration drift across projects. Instead of hand-wiring ESLint rules, TSConfig options, project scaffolds, and release metadata, developers pick from pre-curated layers and generators that enforce consistent, explicit defaults.

### Target Audience

- Developers who want clear rules with override control when needed.
- Teams that prefer strict code with Airbnb-style familiarity.
- Projects that need predictable builds and low setup overhead.

### Value Proposition

Nova eliminates the gap between starting a project and having it production-ready. Instead of spending days wiring ESLint, TypeScript, CI, and release tooling, developers get a single opinionated package that handles the full lifecycle: setup, maintenance, and diagnostics.

The trade-off is intentional: Nova is strict by default. Teams who want maximum flexibility should look elsewhere. Teams who want guardrails that prevent mistakes while still allowing overrides will find Nova eliminates an entire class of configuration debt.

## Marketing Copy

### Tagline

Scripts, templates, and project configuration for the common JavaScript and TypeScript developer.

### Elevator Pitch

Nova gives you strict presets and guided tooling so you skip the busywork of wiring up ESLint, TypeScript, and project scaffolds by hand. Strong defaults lower setup overhead, strict linting and typing catch defects early, and guided generators scaffold and maintain project files. Freedom with guardrails lets you override when needed while sensible restrictions prevent risky patterns.

### Key Features

1. **Automatic** — All project essentials are provisioned with minimal DevOps effort. The defaults handle it; you should not need to wire up basics by hand.
2. **Explicit** — Every configuration detail is visible and precise. If a nuance matters (e.g., `"."` vs `"./"`, or pairing `module` with `moduleResolution`), it must be written out, not implied.
3. **Independence** — Configurations stand on their own. There are no hidden base presets or cross-dependencies filling in values behind the scenes.
4. **Predictable** — Given the same inputs, the outputs are always the same. Features that introduce non-determinism (e.g., `incremental`, artifact caches, package-lock drift) are disallowed.
5. **Modern but stable** — Use forward-looking features that are officially supported and reliable. Avoid unstable or experimental options.

#### Scope

- **Node.js LTS first** — Nova tracks the latest long-term support baselines.
- **Modern modules** — ESM-based builds only; no legacy "script" pipelines.
- **No experimental features** — Only officially supported and stable options are allowed.

### Differentiators

| Nova                                                                           | Alternatives                                                                                  |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| Single package covers presets, CLI tooling, batteries, and project maintenance | Separate tools for linting, config, scaffolding, maintenance (mix-and-match, drift over time) |
| Recipes enforce consistency across workspaces automatically                    | Manual updates across workspaces or reliance on Renovate/Dependabot                           |
| Strict-by-default with explicit override control                               | Lenient defaults that teams must tighten manually                                             |
| No magic — every config detail is visible and independent                      | Shared configs hide base presets and cross-dependencies                                       |

### Voice

- Documentation recommends, never commands. Tips and warnings guide; they do not dictate.
- Each admonition addresses a single concern.

## Glossary

### Nova concepts

| Term            | Definition                                                                                                                                         |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Battery**     | A modular, importable toolkit utility (e.g., Logger, CLIHeader, MarkdownTable). Import only what you need.                                         |
| **Preset**      | A composable ESLint or TSConfig configuration layer. Presets are spread (ESLint) or chained (TSConfig) into a single export.                       |
| **Layer**       | A single preset within a composition. Layers are stacked in a defined order: ignores, code style, language, environment/framework, platform, tool. |
| **Generator**   | (Planned) A CLI command (`nova generate`) that creates semi-tailored files populated with values from `nova.config.json`.                          |
| **Recipe**      | A CLI command (`nova recipe`) that applies scripted edits to automate routine maintenance across workspaces.                                       |
| **Scaffold**    | (Planned) A CLI command (`nova scaffold`) that bootstraps a full project starter as a monorepo with Docusaurus built in.                           |
| **Utility**     | A CLI command (`nova utility`) for diagnostics, quick checks, and development helpers.                                                             |
| **Rule**        | A custom ESLint rule shipped with Nova (e.g., `no-logger-dev`, `switch-case-blocks`).                                                              |
| **Nova Config** | The `nova.config.json` file at the monorepo root. Source of truth for project metadata, entities, emails, URLs, and workspace definitions.         |

### Workspace model

Nova classifies every workspace along two axes: **role** (what it is) and **policy** (how it ships).

#### Roles

| Role         | Definition                                                        |
|--------------|-------------------------------------------------------------------|
| **project**  | Monorepo root workspace. Single owner of lockfile and workspaces. |
| **docs**     | Documentation site workspace.                                     |
| **config**   | Shareable static configuration packages.                          |
| **app**      | Deployable runtime (web, mobile, workers, API, bots).             |
| **package**  | Reusable code intended to be installed as a dependency.           |
| **tool**     | Internal CLI, codegen, or build utilities.                        |
| **template** | Ready-to-copy scaffold bundles.                                   |

#### Policies

| Policy            | Version    | Private | Behavior                                                   |
|-------------------|------------|---------|------------------------------------------------------------|
| **freezable**     | `0.0.0`    | `true`  | Not deployed, not published. Internal coordination only.   |
| **trackable**     | `> 0.0.0`  | `true`  | Versioned and deployable internally. Never published.      |
| **distributable** | `> 0.0.0`  | `false` | Published to a package registry and installable by others. |

#### Role-to-policy matrix

| Role     | Allowed policies         |
|----------|--------------------------|
| project  | freezable                |
| docs     | freezable, trackable     |
| config   | freezable, trackable     |
| app      | trackable                |
| package  | trackable, distributable |
| tool     | freezable, trackable     |
| template | freezable                |

