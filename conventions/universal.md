# Universal Coding Conventions

Rules that apply across all programming languages and platforms.

## Workflow

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

## General Code Style

- Semicolons at statement ends.
- Commas as separators in arrays, dictionaries, and argument lists (not semicolons).
- Trailing commas in multiline constructs.
- Ternary form: `(condition) ? valueA : valueB` — parenthesized condition, single-line.
- Curly braces required for all control structures (no braceless `if`/`else`/`for`).
- LF line endings.
- Final newline required at end of file.

### Quotes and Indentation

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

### File Naming

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

## Documentation Style

### General Rules

- Every member documented — public, private, protocol stubs (`var body`). No exceptions.
- No body descriptions: doc comments do NOT include prose sentences or fragments as body text. Structured tags (`- Parameter`, `- Returns`, `- Throws`, `@param`, `@returns`, etc.) ARE used — those are official language tags, not descriptions.
- No file-level comments above imports.

### Summary Line Convention

- Summary line uses the hierarchy chain format: `ClassName - Member name.`
- Summary line ends with a period.
- `var body: some View` is documented as `TypeName - Body.`

### Hierarchy Chain

- Top-level declarations: `ClassName.`
- Members: `ClassName - MemberName.`
- Nested types: `OuterClass.InnerClass - MemberName.`
- Enum cases: `EnumName - CaseName.`

## Platform Build Rules

### Apple (Xcode)

- **Version file:** `project.pbxproj` (`MARKETING_VERSION` + `CURRENT_PROJECT_VERSION`)
- **Build number:** Yes — equals total count of changelog bullet lines across `CHANGELOG.md`
- **Build command:** `xcodebuild build` (with project-specific scheme/destination)
- **Changelog header:** `## X.Y.Z (build) - YYYY-MM-DD`

### TypeScript / JavaScript (Node.js)

- **Version file:** `package.json` `version`
- **Build number:** No
- **Build command:** `npm run build`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

### Android (Gradle)

- **Version file:** `build.gradle` (`versionName` + `versionCode`)
- **Build number:** Yes — equals total count of changelog bullet lines across `CHANGELOG.md`
- **Build command:** `./gradlew assembleDebug`
- **Changelog header:** `## X.Y.Z (build) - YYYY-MM-DD`

### Windows (.NET)

- **Version file:** `.csproj` (`Version`)
- **Build number:** No
- **Build command:** `dotnet build`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

### PHP (Composer)

- **Version file:** `composer.json` `version`
- **Build number:** No
- **Build command:** `composer test`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

### Python (pip / Poetry)

- **Version file:** `pyproject.toml` `version`
- **Build number:** No
- **Build command:** `python -m build`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

### Shell / Docker

- **Version file:** `Dockerfile` `ARG VERSION` or none
- **Build number:** No
- **Build command:** `docker build .`
- **Changelog header:** `## X.Y.Z - YYYY-MM-DD`

## Release Notes Format

```markdown
## 1.2.0 - 2026-01-01

### UPDATED
- Enhanced the changelog release summary output.

### FIXED
- Fixed version bump calculation for major releases.

### ADDED
- Added dry-run mode to the release command.
```

- Use headings in this order: `### UPDATED`, `### FIXED`, `### ADDED`, `### REMOVED`.
- Leave out any heading that has no entries.
- Use only ASCII characters and standard US keyboard quotes.
