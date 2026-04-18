# PROJECT_RULES.md

## Project Identity

### Name and Description

<!--
The canonical project name, a one-line description, and the primary programming language.

- **Project name:** Name
- **Description:** One-line description.
- **Primary language:** Language
- **Framework / runtime:** Framework or runtime (e.g. Next.js, Express, SwiftUI, Spring Boot)
-->

### Repository URL

<!--
The full GitHub URL for this repository.

- **URL:** https://github.com/owner/repo
-->

## Repository Layout

<!--
A top-level directory tree showing every folder at the first two levels. Annotate each entry with a short description. Files that live at the root level should also be listed.

```
repo-root/
├── .github/              — GitHub Actions workflows, issue templates, funding
├── docs/                 — Documentation site source (Docusaurus)
├── src/                  — Application source code
│   ├── lib/              — Shared libraries and utilities
│   ├── cli/              — CLI entry points and commands
│   ├── types/            — TypeScript type definitions (.d.ts)
│   └── tests/            — Unit and integration tests
├── scripts/              — Build, deploy, and maintenance scripts
├── .editorconfig         — Editor formatting rules
├── .gitignore            — Git ignore patterns
├── CHANGELOG.md          — Release history
├── LICENSE               — MIT license
├── README.md             — Project overview and badges
├── package.json          — Node.js manifest and scripts
└── tsconfig.json         — TypeScript compiler configuration
```
-->

## Source Structure

<!--
A detailed directory tree of the primary source folder (e.g. `src/`, `app/`, `lib/`). Go as deep as needed to show every module, grouped by domain. Annotate each file or folder with its responsibility.

```
src/
├── cli/
│   ├── commands/
│   │   ├── build.ts      — `build` command handler
│   │   └── publish.ts    — `publish` command handler
│   └── index.ts          — CLI entry point, argument parsing
├── lib/
│   ├── config.ts         — Configuration loader and validator
│   ├── schema.ts         — Zod schemas for external API responses
│   └── regex.ts          — Shared regex patterns
├── toolkit/
│   ├── logger.ts         — Structured logging utility
│   ├── markdown-table.ts — Markdown table builder
│   └── index.ts          — Barrel exports for toolkit
├── types/
│   ├── cli/
│   │   └── commands.d.ts — Types for CLI commands
│   ├── lib/
│   │   └── config.d.ts   — Types for configuration
│   └── shared.d.ts       — Shared type aliases
└── tests/
    ├── cli/
    │   └── commands.test.ts
    └── lib/
        └── config.test.ts
```
-->

## Key Files

<!--
List the most important files a contributor or AI agent should know about. Include the file path, what it does, and when you would need to touch it.

| File                | Purpose         | When to modify                                         |
|---------------------|-----------------|--------------------------------------------------------|
| `src/cli/index.ts`  | CLI entry point | Adding or changing CLI commands                        |
| `src/lib/config.ts` | Config loader   | Changing configuration shape or defaults               |
| `package.json`      | Manifest        | Adding dependencies, changing scripts, bumping version |
| `tsconfig.json`     | TS config       | Changing compiler options or path aliases              |
| `CHANGELOG.md`      | Release notes   | Every user-facing change                               |
-->

## Build and Tooling

### Prerequisites

<!--
List every tool that must be installed before building, with minimum version requirements.

| Tool    | Version | Purpose                     |
|---------|---------|-----------------------------|
| Node.js | >= 22.x | Runtime                     |
| npm     | >= 10.x | Package manager             |
| Docker  | >= 27.x | Container builds (optional) |
-->

### Commands

<!--
List every build, test, lint, and dev command available. Use the exact command the developer runs.

| Command         | What it does                             |
|-----------------|------------------------------------------|
| `npm install`   | Install all dependencies                 |
| `npm run build` | Compile TypeScript to JavaScript         |
| `npm run dev`   | Start development server with hot reload |
| `npm run lint`  | Run ESLint across the project            |
| `npm test`      | Run the test suite                       |
-->

### Environment Variables

<!--
List every environment variable the project reads, its purpose, and whether it is required or optional.

| Variable    | Required | Purpose                                   |
|-------------|----------|-------------------------------------------|
| `API_KEY`   | Yes      | Authentication token for the external API |
| `LOG_LEVEL` | No       | Logging verbosity (default: `info`)       |
-->

## Workspace Rules

### Naming Conventions

<!--
Summarize the naming rules that apply specifically to this project (beyond the universal conventions). Include examples.

| Entity          | Convention        | Example                            |
|-----------------|-------------------|------------------------------------|
| CLI commands    | kebab-case verb   | `sync-packages`, `write-changelog` |
| Config keys     | camelCase         | `workingDir`, `packageName`        |
| Database tables | snake_case plural | `user_sessions`, `api_tokens`      |
-->

### Do / Don't

<!--
Project-specific rules that are not covered by the language convention files. These are guardrails for contributors and AI agents.

**Do:**
- Rule with rationale.
- Rule with rationale.

**Don't:**
- Anti-pattern with explanation of why.
- Anti-pattern with explanation of why.
-->

## Project-Specific Patterns

### Architecture

<!--
Describe the high-level architecture pattern this project follows (e.g. layered, hexagonal, MVC, CLI pipeline). Include a diagram if helpful.

```
User Input
  │
  ▼
CLI Layer (argument parsing, validation)
  │
  ▼
Service Layer (business logic, orchestration)
  │
  ▼
Data Layer (file I/O, API calls, database)
```
-->

### Data Flow

<!--
Describe how data moves through the system from input to output. Name the key stages and the module responsible for each.

1. **Input** — Where data enters (CLI args, HTTP request, file read). Module: `src/cli/index.ts`.
2. **Validation** — How input is validated. Module: `src/lib/config.ts`.
3. **Processing** — Core transformation or business logic. Module: `src/lib/processor.ts`.
4. **Output** — Where results go (stdout, file write, API call). Module: `src/cli/index.ts`.
-->

### Error Strategy

<!--
How does this project handle errors at each layer? List the approach per layer.

| Layer              | Strategy                                             |
|--------------------|------------------------------------------------------|
| CLI entry point    | Catch all, log, set `process.exitCode = 1`, return   |
| Service functions  | Throw on failure (caller catches)                    |
| External API calls | Zod `.parse()` for validation, try/catch for network |
| File I/O           | try/catch, descriptive error message with file path  |
-->

## Documentation Site

### Framework

<!--
Which documentation framework is used, and where its source lives.

- **Framework:** Docusaurus / None
- **Source directory:** `docs/`
- **Build output:** `docs/build/`
-->

### Site Structure

<!--
A directory tree of the documentation source showing every page and sidebar category.

```
docs/
├── docusaurus.config.ts  — Site configuration
├── sidebars.ts           — Sidebar navigation structure
├── docs/
│   ├── intro.md          — Getting started guide
│   ├── installation.md   — Installation instructions
│   ├── configuration.md  — Configuration reference
│   └── api/
│       ├── overview.md   — API overview
│       └── endpoints.md  — Endpoint reference
└── static/
    └── img/              — Static images
```
-->

### Commands

<!--
Commands for building and previewing the documentation site locally.

| Command              | What it does                           |
|----------------------|----------------------------------------|
| `npm run docs:dev`   | Start local dev server with hot reload |
| `npm run docs:build` | Build the static site for production   |
-->

## Publishing and Deployment

### Release Process

<!--
Step-by-step description of how a new version goes from code to release.

1. All changes committed, `git status --short` is clean.
2. Changelog consolidated, version bumped, build number recalculated (if applicable).
3. Commit with version subject line.
4. Tag the commit (e.g. `v1.2.0`).
5. Push commit and tag.
6. GitHub Release triggers CI workflows.
-->

### CI/CD Workflows

<!--
Map each GitHub Actions workflow to what it does and when it runs.

| Workflow file               | Trigger           | What it does                     |
|-----------------------------|-------------------|----------------------------------|
| `publish-to-npm.yml`        | Release published | Build and publish to npm         |
| `publish-to-docker-hub.yml` | Release published | Multi-arch Docker build and push |
| `lock-inactive-issues.yml`  | Weekly cron       | Lock issues inactive > 30 days   |
-->

### Environments

<!--
List every deployment target and its URL or identifier.

| Environment  | URL / Identifier                      | Purpose                 |
|--------------|---------------------------------------|-------------------------|
| npm          | `https://www.npmjs.com/package/name`  | Public package registry |
| Docker Hub   | `https://hub.docker.com/r/owner/name` | Container registry      |
| GitHub Pages | `https://owner.github.io/repo`        | Documentation site      |
-->
