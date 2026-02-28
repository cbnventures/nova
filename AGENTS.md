# AGENTS.md

## Universal Rules

### Instructions
- Apply version/build/changelog rules only to user-requested app/product changes.
- For each user request, first confirm exactly what you understood before making changes.
- For each change request, add changelog bullets under the current version section; then bump the build number (if platform uses one) using the bullet-count formula.
- On each change, run the platform build command and verify success.
- Keep the version unchanged while working within the current release line.
- Start a new version only after current changes are committed and `git status --short` is empty.
- When starting a new version, first ask whether the bump is major, minor, or bugfix (semver).
- Start the new version before the first task for that version by creating a new changelog section, bumping the version, and carrying forward the same build number from the prior version line.
- Do not create version-line-only commits; keep version bump changes in working copy until at least one user-requested change is included.
- Do not run a build when only starting a new version line.
- Keep executing per-change bumps and builds until the user explicitly says they are "all done."
- When "all done": consolidate changelog, recalculate build number (if applicable), sync version across all version files, then commit with a commit subject. Do not add co-author credits.
- Do not add placeholder changelog bullets for version/build bumps.
- Do not add changelog bullets for incidental implementation fallout unless there is a clear user-visible behavior change.
- Keep version numbers and CHANGELOG.md synchronized before commit.
- Do not bump version/build for non-product or process-only edits.

### Code Style

#### General
- Semicolons at statement ends.
- Commas as separators in arrays, dictionaries, and argument lists (not semicolons).
- Trailing commas in multiline constructs.
- Ternary form: `(condition) ? valueA : valueB` — parenthesized condition, single-line.
- Curly braces required for all control structures (no braceless `if`/`else`/`for`).
- LF line endings.
- Final newline required at end of file.

| Language                | Quotes                           | Indentation |
|-------------------------|----------------------------------|-------------|
| TypeScript / JavaScript | Single                           | 2-space     |
| Swift                   | Double (only option)             | 4-space     |
| Java                    | Double (only option)             | 4-space     |
| Kotlin                  | Double (only option)             | 4-space     |
| C#                      | Double (only option)             | 4-space     |
| PHP                     | Single (non-interpolated)        | 4-space     |
| Python                  | Double (Black/Google convention) | 4-space     |
| Shell / Docker          | Double (for variable expansion)  | 2-space     |

**TypeScript-specific:**
- ALL types in separate `*.d.ts` files mirroring the source tree under `types/`.
- Shared types (`shared.d.ts`) only imported by other `.d.ts` files, never directly by implementation `.ts` files.
- Each function parameter and return value gets its own named type alias, named as `ClassNameMethodNameParamName` (e.g. `MarkdownTableConstructorHeaders`, `MarkdownTableAddRowReturns`).
- `@param` types reference these aliases: `@param {MarkdownTableConstructorHeaders} headers - Headers.`
- Explicit accessibility modifiers on all class members (`public`, `private`).
- Import ordering (groups separated by a blank line, alphabetical within each group):
  1. Node built-ins (e.g. `child_process`, `fs`, `os`, `path`)
  2. Third-party packages (e.g. `eslint`, `tseslint`)
  3. Local imports (e.g. `@/lib/utility`, `@/toolkit/logger`)
  4. `import type { ... }` (always at the bottom)
- Class patterns — two shapes, chosen by whether the module holds per-instance state:

  | Shape           | When to use                      | Constructor            | Fields            | Methods                            |
  |-----------------|----------------------------------|------------------------|-------------------|------------------------------------|
  | **Static-only** | Stateless utilities, API clients | None                   | `static #field`   | `public static` / `private static` |
  | **Instance**    | Per-caller isolated state        | `public constructor()` | `readonly #field` | `public` / `private` instance      |

  - Public API classes (exported via barrel indexes and package `exports`) use `export default class`. Internal classes use `export class`.
  - Private fields use `#hash` notation. All private members (fields and methods) include the `@private` doc tag.
  - Static-only classes are called as `ClassName.method()`. Instance classes are instantiated with `new ClassName()`.
  - Static-only classes that cache data use a `static #field` for the cached value and a `static #populated` boolean flag.

#### File Naming

| Language                | Convention                       | Example                                     |
|-------------------------|----------------------------------|---------------------------------------------|
| TypeScript / JavaScript | kebab-case                       | `markdown-table.ts`, `cli-header.d.ts`      |
| Swift                   | PascalCase + role suffix         | `TunnelFormView.swift`, `TunnelModel.swift` |
| Java                    | PascalCase matching class name   | `EntityRepository.java`                     |
| Kotlin                  | PascalCase matching class name   | `EntityRepository.kt`                       |
| C#                      | PascalCase matching class name   | `EntityRepository.cs`                       |
| PHP                     | PascalCase (PSR-4) or snake_case | `EntityRepository.php`                      |
| Python                  | snake_case (PEP 8)               | `entity_repository.py`                      |
| Shell                   | kebab-case                       | `backup-config.sh`                          |

### Documentation Style

#### General Rules
- Every member documented — public, private, protocol stubs (`var body`). No exceptions.
- No body descriptions: doc comments do NOT include prose sentences or fragments as body text. Structured tags (`- Parameter`, `- Returns`, `- Throws`, `@param`, `@returns`, etc.) ARE used — those are official language tags, not descriptions.
- No file-level comments above imports.

#### Summary Line Convention
- Summary line uses the hierarchy chain format: `ClassName - Member name.`
- Summary line ends with a period.
- `var body: some View` is documented as `TypeName - Body.`

#### Hierarchy Chain
- Top-level declarations: `ClassName.`
- Members: `ClassName - MemberName.`
- Nested types: `OuterClass.InnerClass - MemberName.`
- Enum cases: `EnumName - CaseName.`

#### Comment Block Structure

**`///` language (Swift):** Blank `///` at top and bottom of every comment block.

```
///
/// Summary line.
///
/// - Parameter name: Description.
///
/// - Since: 1.0.0
///
```

**`///` language (C#):** Blank `///` at top and bottom of every comment block.

```
///
/// Summary line.
///
/// <param name="x">Description</param>
///
/// <remarks>Since v1.0.0</remarks>
///
```

**`/** */` languages (TypeScript, PHP, Java, Kotlin):** Standard block with blank lines separating sections.

```
/**
 * Summary line.
 *
 * @param name - Description.
 *
 * @since 1.0.0
 */
```

**`"""` language (Python):** Google-style with newline after opening `"""`.

```
"""
Summary line.

Args:
    name: Description.

Version:
    1.0.0
"""
```

#### Language: Swift

- Comment syntax: `///`
- Padding tag: `- Since: 1.0.0` (DocC callout)
- Param format: `- Parameter name: Description.`
- Return format: `- Returns: Description.`
- Throws format: `- Throws: Description.`
- Blank `///` at top and bottom of every comment block.
- No `@private` tag needed (access control is in the declaration).

```swift
///
/// Tunnel Store.
///
/// - Since: 1.0.0
///
@MainActor
final class TunnelStore: ObservableObject {
    ///
    /// Tunnel Store - Managed tunnels.
    ///
    /// - Since: 1.0.0
    ///
    @Published private(set) var managedTunnels: [Tunnel] = []

    ///
    /// Tunnel Store - Constructor.
    ///
    /// - Since: 1.0.0
    ///
    init() { ... }

    ///
    /// Tunnel Store - Bootstrap if needed.
    ///
    /// - Parameter force: Force.
    ///
    /// - Since: 1.0.0
    ///
    func bootstrapIfNeeded(force: Bool = false) async { ... }

    ///
    /// Tunnel Store - Body.
    ///
    /// - Since: 1.0.0
    ///
    var body: some View { ... }
}

///
/// Tunnel Status.
///
/// - Since: 1.0.0
///
enum TunnelStatus {
    ///
    /// Tunnel Status - Active.
    ///
    /// - Since: 1.0.0
    ///
    case active
}
```

#### Language: TypeScript / JavaScript

- Comment syntax: `/** */`
- Padding tag: `@since 1.0.0` (JSDoc)
- Param format: `@param {TypeName} name - Description.`
- Return format: `@returns {TypeName}`
- Include `@private` tag for private members.

```typescript
/**
 * Markdown Table.
 *
 * @since 1.0.0
 */
export default class MarkdownTable {
  /**
   * Markdown Table - Headers.
   *
   * @private
   *
   * @since 1.0.0
   */
  readonly #headers: MarkdownTableHeaders;

  /**
   * Markdown Table - Constructor.
   *
   * @param {MarkdownTableConstructorHeaders} headers   - Headers.
   * @param {MarkdownTableConstructorOptions} [options] - Options.
   *
   * @since 1.0.0
   */
  public constructor(headers: MarkdownTableConstructorHeaders, options?: MarkdownTableConstructorOptions) { ... }

  /**
   * Markdown Table - Add row.
   *
   * @param {MarkdownTableAddRowRow} row - Row.
   *
   * @returns {MarkdownTableAddRowReturns}
   *
   * @since 1.0.0
   */
  public addRow(row: MarkdownTableAddRowRow): MarkdownTableAddRowReturns { ... }
}
```

#### Language: PHP

- Comment syntax: `/** */`
- Padding tag: `@since 1.0.0` (PHPDoc)
- Param format: `@param type $name - Description.`
- Return format: `@return type`
- Include `@private` tag for private members.

```php
/**
 * Backup config file.
 *
 * @param string $backup_name - Backup name.
 * @param string $conf_path   - Conf path.
 * @param string $backup_path - Backup path.
 *
 * @return void
 *
 * @since 1.0.0
 */
function backup_config_file(
    string $backup_name,
    string $conf_path,
    string $backup_path
): void { ... }
```

#### Language: Java

- Comment syntax: `/** */`
- Padding tag: `@since 1.0.0` (Javadoc)
- Param format: `@param name - Description.`
- Return format: `@return Type`

```java
/**
 * Entity Repository.
 *
 * @since 1.0.0
 */
public class EntityRepository {
    /**
     * Entity Repository - Database.
     *
     * @since 1.0.0
     */
    private final Database database;

    /**
     * Entity Repository - Constructor.
     *
     * @param database - Database.
     *
     * @since 1.0.0
     */
    public EntityRepository(Database database) { ... }

    /**
     * Entity Repository - Find by ID.
     *
     * @param id - ID.
     *
     * @return Entity
     *
     * @since 1.0.0
     */
    public Entity findById(UUID id) { ... }
}
```

#### Language: Kotlin

- Comment syntax: `/** */`
- Padding tag: `@since 1.0.0` (KDoc)
- Param format: `@param name - Description.`
- Return format: `@return Type?`
- Include `@private` tag for private members.

```kotlin
/**
 * Entity Repository.
 *
 * @since 1.0.0
 */
class EntityRepository(
    /**
     * Entity Repository - Database.
     *
     * @since 1.0.0
     */
    private val database: Database,
) {
    /**
     * Entity Repository - Find by ID.
     *
     * @param id - ID.
     *
     * @return Entity?
     *
     * @since 1.0.0
     */
    suspend fun findById(id: UUID): Entity? { ... }
}
```

#### Language: C\#

- Comment syntax: `///`
- Padding tag: `<remarks>Since v1.0.0</remarks>` (XML doc tag)
- Param format: `<param name="x">Description</param>` (no trailing period inside XML tags)
- Return format: `<returns>Type</returns>`
- Blank `///` at top and bottom of every comment block.
- No `@private` tag needed (access control is in the declaration).

```csharp
///
/// Entity Repository.
///
/// <remarks>Since v1.0.0</remarks>
///
public class EntityRepository {
    ///
    /// Entity Repository - Database.
    ///
    /// <remarks>Since v1.0.0</remarks>
    ///
    private readonly Database _database;

    ///
    /// Entity Repository - Constructor.
    ///
    /// <param name="database">Database</param>
    ///
    /// <remarks>Since v1.0.0</remarks>
    ///
    public EntityRepository(Database database) { ... }

    ///
    /// Entity Repository - Find by ID.
    ///
    /// <param name="id">ID</param>
    ///
    /// <returns>Entity?</returns>
    ///
    /// <remarks>Since v1.0.0</remarks>
    ///
    public async Task<Entity?> FindById(Guid id) { ... }
}
```

#### Language: Python

- Comment syntax: `"""` (Google-style)
- Padding tag: `Version:\n    1.0.0` (Google-style custom section)
- Param format: `Args:\n    name: Description.`
- Return format: `Returns:\n    Type.`
- Docstring starts with `"""` then a newline before the summary line.
- Include `@private` convention is not standard; use `_` prefix naming instead.

```python
class EntityRepository:
    """
    Entity Repository.

    Version:
        1.0.0
    """

    def __init__(self, database):
        """
        Entity Repository - Constructor.

        Args:
            database: Database.

        Version:
            1.0.0
        """
        self._database = database

    def find_by_id(self, entity_id):
        """
        Entity Repository - Find by ID.

        Args:
            entity_id: ID.

        Returns:
            Entity.

        Version:
            1.0.0
        """
        return self._database.get(entity_id)
```

#### Language: Shell / Docker

Section banners and inline comments only. No doc comment blocks.

Shell uses `#` with `=` borders:

```bash
# ============================
# Section Title
# ============================
```

Dockerfile uses box-style `####` banners with padded titles:

```dockerfile
############################
#### Step 1: Base Image ####
############################
```

### Platform Build Rules

#### Apple (Xcode)
- **Version file:** `project.pbxproj` (`MARKETING_VERSION` + `CURRENT_PROJECT_VERSION`)
- **Build number:** Yes — equals total count of changelog bullet lines across `CHANGELOG.md`
- **Build command:** `xcodebuild build` (with project-specific scheme/destination)
- **Changelog header:** `## X.Y.Z (build)`

#### TypeScript / JavaScript (Node.js)
- **Version file:** `package.json` `version`
- **Build number:** No
- **Build command:** `npm run build`
- **Changelog header:** `## X.Y.Z`

#### Android (Gradle)
- **Version file:** `build.gradle` (`versionName` + `versionCode`)
- **Build number:** Yes — equals total count of changelog bullet lines across `CHANGELOG.md`
- **Build command:** `./gradlew assembleDebug`
- **Changelog header:** `## X.Y.Z (build)`

#### Windows (.NET)
- **Version file:** `.csproj` (`Version`)
- **Build number:** No
- **Build command:** `dotnet build`
- **Changelog header:** `## X.Y.Z`

#### PHP (Composer)
- **Version file:** `composer.json` `version`
- **Build number:** No
- **Build command:** `composer test`
- **Changelog header:** `## X.Y.Z`

#### Python (pip / Poetry)
- **Version file:** `pyproject.toml` `version`
- **Build number:** No
- **Build command:** `python -m build`
- **Changelog header:** `## X.Y.Z`

#### Shell / Docker
- **Version file:** `Dockerfile` `ARG VERSION` or none
- **Build number:** No
- **Build command:** `docker build .`
- **Changelog header:** `## X.Y.Z`

### Release Notes Format
- Use headings in this order: `### UPDATED`, `### FIXED`, `### ADDED`, `### REMOVED`.
- Leave out any heading that has no entries.
- Use only ASCII characters and standard US keyboard quotes.

## Project Rules

### Monorepo Layout

```
./                          → role: project, policy: freezable
├── apps/
│   └── docs/               → role: docs, policy: freezable (Docusaurus)
├── packages/
│   └── nova/               → role: package, policy: distributable (@cbnventures/nova)
├── nova.config.json        → source of truth for project metadata
├── package.json            → monorepo root (owns lockfile + workspaces)
└── VISION.md / AGENTS.md   → project vision and agent instructions
```

- Every monorepo created with Nova should include a Docusaurus documentation workspace.
- Programs should begin with port `3000`; docs should use port `3100`.

### Source Structure (packages/nova)

```
src/
├── api/                    → external API clients (e.g., node-releases.ts, spdx-licenses.ts)
├── cli/
│   ├── recipe/             → recipe commands (e.g., sync-packages.ts)
│   ├── utility/            → utility commands (e.g., initialize.ts, version.ts)
│   └── index.ts            → CLI entry point (Commander setup)
├── lib/                    → shared libraries (item.ts, nova-config.ts, utility.ts, regex.ts)
├── presets/
│   ├── eslint/             → ESLint flat config presets (.mjs exports)
│   └── tsconfig/           → TSConfig JSON presets
├── rules/
│   └── eslint/             → custom ESLint rules (e.g., no-logger-dev.ts, switch-case-blocks.ts)
├── toolkit/                → importable batteries (Logger, CLIHeader, MarkdownTable)
└── types/                  → all type definitions, mirroring the source tree
    ├── api/
    ├── cli/
    ├── lib/
    ├── presets/
    ├── rules/
    ├── toolkit/
    └── shared.d.ts         → shared types (only imported by other .d.ts files)
```

### Build and Tooling

- **Build tool:** TypeScript compiler (`tsc`). No bundler.
- **Monorepo orchestrator:** Turborepo (`turbo run`).
- **Versioning:** Nova Changelog (`nova utility changelog`). Freezable workspaces are excluded automatically.
- **Linting:** ESLint with Nova's own presets and custom rules applied to itself.
- **Build command:** `npm run build` (runs `tsc` via Turborepo).

### package.json Key Ordering

When the `sync-packages` recipe writes or reorders a `package.json`, keys follow this canonical order:

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

Keys not in the npm official spec or bundler list should be flagged or removed by the `sync-packages` recipe (unless `--ignore-unknown` is passed).

- `engines` is **Required** for all roles. The `node` constraint is fetched from the Node.js release schedule (all current LTS majors where the LTS date has started and the end-of-life date has not passed).
- `bundleDependencies` is the preferred key. `bundledDependencies` is always merged into `bundleDependencies` and then deleted.
- `typings` is always merged into `types` and then deleted (same treatment as `bundledDependencies`).

### Workspace Naming Conventions

| Role     | Naming rule                                                 |
|----------|-------------------------------------------------------------|
| project  | `{slug}-project`                                            |
| docs     | `{slug}-docs`                                               |
| config   | `{slug}-config-{descriptor}` (requires project slug prefix) |
| app      | `{slug}-app-{descriptor}` (requires project slug prefix)    |
| tool     | `{slug}-tool-{descriptor}` (requires project slug prefix)   |
| package  | simple slug or `@scope/name` (scoped allowed)               |
| template | simple slug or `@scope/name` (scoped allowed)               |

### Workspace Guardrails

- A **distributable** workspace must not depend on **freezable** or **trackable** workspaces.
- The monorepo root (`project` role) must have `packageManager` and `workspaces` keys; no other workspace should.
- Only **distributable** workspaces may have `files` in their `package.json`.
- **Trackable** and **distributable** workspaces must use Semantic Versioning.
- **Freezable** workspaces stay at `0.0.0` and are never deployed or published.

### Documentation

- Docs site content lives in `apps/docs/docs/` as `.mdx` files.
- Documentation `description` and `keywords` in frontmatter should be SEO-optimized.
- Frontmatter `tags` should be optimized for Docusaurus local search.
- Toolkit docs call their utilities "batteries" (e.g., "the Logger battery").
- ESLint rule docs follow this structure: opening line, Summary, Why Use This Rule? (numbered list), Examples (tabs with Correct/Incorrect), Configuration, Troubleshooting.
- Documentation voice recommends, never commands. Use "it is recommended" over imperative "Always do X".
- Admonitions (`:::danger`, `:::tip`, etc.) address a single concern. Danger boxes state only the risk — do not append general advice. Tips may include gentle recommendations.
- Do not repeat the same advice across multiple admonitions on the same page.

### TSConfig Conventions

- Always pair `module` with `moduleResolution`.
- Do not use `incremental` (non-deterministic).
- Do not use `composite` (requires `incremental`).
- Do not use `assumeChangesOnlyAffectDirectDependencies` (non-deterministic).
- Do not use `typeRoots`.
- Relative paths do not belong in exported TSConfig presets (TypeScript resolves from where the config is, not where the command runs).
- If a project uses its own build tool instead of `tsc`, set `isolatedModules: true` and `noEmit: true`.

### npm Publishing

- First-time publish to npm requires `npm publish --access public` for scoped packages.
- Do not set `publishConfig.registry` in `package.json` — it overrides the CI runner's `registry-url` and breaks dual-publish workflows.
