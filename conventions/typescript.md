# TypeScript / JavaScript Conventions

Quotes: Single. Indentation: 2-space. File naming: kebab-case (e.g., `markdown-table.ts`, `cli-header.d.ts`).

## Documentation Style

- Comment syntax: `/** */`
- Padding tag: `@since 1.0.0` (JSDoc)
- Param format: `@param {TypeName} name - Description.`
- Return format: `@returns {TypeName}`
- Include `@private` tag for private members.

### JSDoc `@param` Alignment

- When multiple `@param` lines exist, pad so **both** param names AND `-` dashes align vertically.
- Pad after `}` so param names start at the same column (minimum 1 space).
- Pad after param name so all `-` dashes align at the same column.
- Optional params use `[name]` syntax in JSDoc.

```ts
// GOOD — param names aligned, dashes aligned
/**
 * @param {CLIChangelogWritePackageDir}  packageDir  - Package dir.
 * @param {CLIChangelogWritePackageName} packageName - Package name.
 * @param {CLIChangelogWriteVersion}     version     - Version.
 * @param {CLIChangelogWriteEntries}     entries     - Entries.
 */

// GOOD — same-length types, 1 space after } suffices
/**
 * @param {TaskRunnerConstructorHeaders} headers   - Headers.
 * @param {TaskRunnerConstructorOptions} [options] - Options.
 */

// BAD — no alignment
/**
 * @param {CLIChangelogWritePackageDir} packageDir - Package dir.
 * @param {CLIChangelogWritePackageName} packageName - Package name.
 * @param {CLIChangelogWriteVersion} version - Version.
 */
```

### Doc Comment Hierarchy

Class doc uses pretty name derived from directory path with ` - ` separators. Member docs chain from the class pretty name. Classes not nested in a directory hierarchy use just the pretty class name.

### Full Documentation Example

```ts
/**
 * CLI Utility - Runner.
 *
 * @since 1.0.0
 */
export class CLIUtilityRunner {
  /**
   * CLI Utility - Runner - Run.
   *
   * @param {CLIUtilityRunnerRunOptions} options - Options.
   *
   * @returns {CLIUtilityRunnerRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIUtilityRunnerRunOptions): CLIUtilityRunnerRunReturns {
  }

  /**
   * CLI Utility - Runner - Fetch data.
   *
   * @private
   *
   * @returns {CLIUtilityRunnerFetchDataReturns}
   *
   * @since 1.0.0
   */
  private static async fetchData(): CLIUtilityRunnerFetchDataReturns {
  }

  /**
   * CLI Utility - Runner - Format line.
   *
   * @param {CLIUtilityRunnerFormatLinePrefix}  prefix  - Prefix.
   * @param {CLIUtilityRunnerFormatLineMessage} message - Message.
   *
   * @private
   *
   * @returns {CLIUtilityRunnerFormatLineReturns}
   *
   * @since 1.0.0
   */
  private static formatLine(prefix: CLIUtilityRunnerFormatLinePrefix, message: CLIUtilityRunnerFormatLineMessage): CLIUtilityRunnerFormatLineReturns {
  }
}
```

```ts
// Classes not nested in a directory hierarchy — just the pretty class name
/**
 * Data Table.
 *
 * @since 1.0.0
 */
export default class DataTable {
```

## Type System

### No Inline Types in Code Files

Every typed variable uses a named alias from a `.d.ts` file. No exceptions. This applies to all forms: array literals, Sets, Records, Maps, union types, and generics.

```ts
// BAD — inline types
const entries: TaskEntry[] = [];
const files: string[] = [];
let selectedPackage: string | undefined;
const allowedKeys = new Set<string>([...]);
const reordered: Record<string, unknown> = {};

// GOOD — named types from .d.ts
const entries: RunnerParseEntries = [];
const files: RunnerParseFiles = [];
let selectedPackage: RunnerRunSelectedPackage;
const allowedKeys: ValidatorCheckAllowedKeys = new Set([...]);
const reordered: SyncerHandleReorderReordered = {};
```

### Types in Separate `.d.ts` Files

```
src/cli/utility/changelog.ts       → types live in:
src/types/cli/utility.d.ts         → domain types
src/types/shared.d.ts              → shared types (only imported by .d.ts files)
```

### Mirrored Directory Structure

Category folders (`types/`, `tests/`, and in Next.js `styles/`) mirror the source path. Each source file gets its own corresponding file. Exception: `.d.ts` files are only created when there are actual types to export — don't create empty stubs just to satisfy the mirror structure.

```
src/lib/utility.ts         → src/types/lib/utility.d.ts
src/lib/utility.ts         → src/tests/lib/utility.test.ts
src/toolkit/markdown-table.ts → src/types/toolkit/markdown-table.d.ts
src/cli/utility/changelog.ts  → src/types/cli/utility/changelog.d.ts
src/cli/utility/initialize.ts → src/types/cli/utility/initialize.d.ts
```

### Type Layering

`shared.d.ts` → domain `.d.ts` files → `.ts` code files. Shared types only imported by `.d.ts` files, never by `.ts` code.

```ts
// shared.d.ts
export type EntryCategory = 'added' | 'updated' | 'fixed' | 'removed';

// types/cli/runner.d.ts — imports from shared.d.ts
import type { EntryCategory } from '@/types/shared.d.ts';
export type RunnerRecordSelectedCategory = EntryCategory;

// cli/runner.ts — imports from runner.d.ts, NEVER from shared.d.ts
import type { RunnerRecordSelectedCategory } from '@/types/cli/runner.d.ts';
```

### Type Ordering in `.d.ts` Files

**Sections** are in alphabetical order by method name. **Within each section**, types are ordered by first-use, first-listed (like first come, first serve): parameters first (used first in the signature), then return/typeguard (used next in the signature), then body variable types in the sequential order they appear in the method body. This is strictly code-order, NOT alphabetical.

The **only** valid forward reference: `Returns` referencing a body variable type — `Returns` still comes first because it's used first (in the signature). All other types must be defined before use.

```ts
/** Runner - Execute. */
export type RunnerExecuteOptions = { ... };       // param (used first)
export type RunnerExecuteReturns = Promise<void>; // return (used next)
export type RunnerExecuteConfig = Record<...>;    // body variable (used later, sequential order)

/** Runner - Group items. */
export type RunnerGroupItemsItems = ...;                     // param (used first)
export type RunnerGroupItemsReturns = RunnerGroupItemsGrouped; // return (used next, forward ref OK)
export type RunnerGroupItemsGrouped = Map<...>;              // body variable (used later, owns the definition)
export type RunnerGroupItemsProcessed = Set<...>;            // body variable (used later, sequential order)
```

### Named Type Naming

Pattern: `{ClassName}{MethodName}{VariableName}`. The variable name must match the actual parameter/variable name in the code. The method name must match the method where the type is used — don't reuse a type from another method even if the underlying type is the same.

```ts
// BAD — type name references filter, but used in categorize
private static categorize(items: RunnerFilterItems): ...

// GOOD — type name matches the method it's used in
private static categorize(items: RunnerCategorizeItems): ...
```

### Named Type Alias per Param and Return

Each function parameter and return value gets its own named type alias.

```ts
// types/toolkit/markdown-table.d.ts
export type MarkdownTableConstructorHeaders = string[];
export type MarkdownTableAddRowRow = string[];
export type MarkdownTableAddRowReturns = void;

// toolkit/markdown-table.ts
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
```

### `satisfies` vs `:` Type Annotation

- `satisfies` — shape validation while keeping specific literal types. Use for object literals and config objects where you want autocomplete on exact keys and typo detection.
- `:` annotation — when the variable should be treated as the broader type. Use for function params, class fields, and variables that get reassigned.

```ts
// satisfies — keeps literal types, catches bad key access
const config = {
  name: 'nova',
  version: '1.0.0',
} satisfies Record<string, string>;
config.name;     // type is 'nova' (literal)
config.anything; // ERROR

// : annotation — widens to the annotated type
const config: Record<string, string> = {
  name: 'nova',
  version: '1.0.0',
};
config.name;     // type is string
config.anything; // no error
```

### Type Guards Use `TypeGuard` Suffix, Not `Returns`

Type guard methods/functions use `TypeGuard` instead of `Returns` for the narrowed type. No `Returns` type exists for type guards.

```ts
// .d.ts
export type RunnerIsErrorResponseValue = unknown;
export type RunnerIsErrorResponseTypeGuard = ErrorResponse;

// .ts
private static isErrorResponse(value: RunnerIsErrorResponseValue): value is RunnerIsErrorResponseTypeGuard {
  return (
    typeof value === 'object'
    && value !== null
    && 'code' in value
    && 'message' in value
  );
}

// Also works inline in .filter()
.filter((value): value is SyncPropertiesTypeGuard => allowedProperties.has(value))
```

### No Redundant Intermediate Type Aliases

Don't create a type alias that only exists to be referenced by one other type. But if param and return have the same underlying type, keep them separate — they're semantically different (input vs output). Don't reference the param type from the return type.

```ts
// BAD — Filtered only exists to be referenced by Returns
export type RunnerFilterItems = Item[];
export type RunnerFilterFiltered = Item[];
export type RunnerFilterReturns = RunnerFilterFiltered;

// BAD — Returns references Items (input ≠ output semantically)
export type RunnerFilterItems = Item[];
export type RunnerFilterReturns = RunnerFilterItems;

// GOOD — same underlying type, but defined independently
export type RunnerFilterItems = Item[];
export type RunnerFilterReturns = Item[];

// BAD — Response only exists to be referenced by Returns
export type FetcherGetDataResponse = z.infer<typeof FetcherResponseSchema>;
export type FetcherGetDataReturns = Promise<FetcherGetDataResponse | undefined>;

// GOOD — z.infer inlined directly into Returns
export type FetcherGetDataReturns = Promise<z.infer<typeof FetcherResponseSchema> | undefined>;
```

### Never Flatten Types in `.d.ts` Files

Always reference named types, never resolve to their primitive. Maintains the type path so changes propagate.

```ts
// shared.d.ts
export type EntryPackage = string;
export type EntryMessage = string;

// BAD — flattened to primitive, loses the type path
export type RunnerParseEntryPackage = string | undefined;
export type RunnerWriteByCategory = Map<EntryCategory, string[]>;

// GOOD — references the shared type
export type RunnerParseEntryPackage = EntryPackage | undefined;
export type RunnerWriteByCategory = Map<EntryCategory, EntryMessage[]>;
```

When creating a `= string` type, check if it represents a domain concept that has a shared type. If so, reference it. Genuinely `string` types include: generated file names, directory paths, version strings, CLI formatting strings, generic utility returns, external API data, prompt output keys, test setup paths.

### Shared Type Consolidation Rule

Two triggers for moving a type into `shared.d.ts`:

1. **Cross-section reference**: A type in one section of a `.d.ts` file references a type from another section in the same file. Even a single cross-section reference means the dependency belongs in `shared.d.ts`.
2. **Multiple dependents**: More than 1 type in a `.d.ts` file depends on the same type (from the same file or another domain `.d.ts` file).

Both prevent fragile cross-references where removing one type silently breaks others.

```ts
// GOOD — shared type in shared.d.ts, imported once by domain .d.ts
import type { EntryBump } from '@/types/shared.d.ts';
export type RunnerRecordSelectedBump = EntryBump;
export type RunnerReleaseHighestBump = EntryBump;
export type RunnerParseEntryBump = EntryBump | undefined;
```

### Tight Types over Loose Types

Define the exact shape. No `Record<string, string>` when fields are known.

```ts
// BAD — frontmatter has known fields
export type RunnerParseFrontMatter = Record<string, string>;

// GOOD — define exact shape with named field types
export type RunnerParseFrontMatterPackage = string;
export type RunnerParseFrontMatterCategory = EntryCategory;
export type RunnerParseFrontMatterBump = EntryBump;
export type RunnerParseFrontMatter = {
  package: RunnerParseFrontMatterPackage;
  category: RunnerParseFrontMatterCategory;
  bump: RunnerParseFrontMatterBump;
};
```

### `as` Casts — Avoid Unless Compiler-Forced

Avoid `as` casts — they bypass type safety and can crash at runtime. Prefer `.find()` or type guards.

However, some `as` casts are unavoidable because TypeScript's type system loses information. The forced patterns:

| Pattern                                  | Why forced                                                  |
|------------------------------------------|-------------------------------------------------------------|
| `Object.fromEntries()`                   | Returns `{ [k: string]: any }` — can't narrow keys          |
| `Object.keys()`                          | Returns `string[]` — TypeScript won't narrow to actual keys |
| `new Command()`                          | Commander's generic type doesn't match custom CLI type      |
| String indexing a union-keyed object     | `string` can't index a union-key type                       |
| Literal array to tuple/union type        | Widens to `string` without cast                             |
| Regex captures                           | Always `string`, can't narrow to union                      |
| `Record<string, unknown>` bracket access | Returns `unknown`, can't narrow                             |

Type guard internals do NOT need `as` — use `in` narrowing instead after `null`/`typeof` guard.

```ts
// BAD — as cast when .find() can replace it
selectedCategory = options.category as RunnerRecordSelectedCategory;

// GOOD — .find() validates AND narrows
const validCategory = validCategories.find(
  (validCategory) => validCategory === options.category,
);
selectedCategory = validCategory;
```

### External API Responses — Validate with Zod

`response.json()` returns `unknown`. Don't blindly cast with `as` — the data comes from an external source and its shape is not guaranteed. Define a Zod schema in `src/lib/schema.ts` and use `.parse()` for runtime validation. Derive the `.d.ts` type with `z.infer<typeof Schema>`.

```ts
// GOOD — Zod runtime validation
const responseData = await response.json();
const data: FetcherGetDataResponse = FetcherResponseSchema.parse(responseData);

// BAD — blind cast, no runtime validation
const data: FetcherGetDataResponse = await response.json() as FetcherGetDataResponse;
```

This applies to all external API boundaries (`fetch`, webhook payloads, etc.). Internal typed data (e.g., `Object.fromEntries`, `Object.keys`) still uses `as` casts where compiler-forced.

### Local Files with Unpredictable Shapes

Files like `package.json` have too many optional/third-party fields to define a Zod schema. Use the absorb-into-typed-container pattern with `Record<string, unknown>` and `as` casts for bracket access.

```ts
const config: RunnerRunConfig = JSON.parse(configRaw);
const configItems = config['items'] as RunnerFilterItems;
```

### `JSON.parse` — Type the Result Immediately

`JSON.parse` returns implicit `any`. Never let it float around — annotate with a named type (e.g., `Record<string, unknown>`) immediately. Then access fields via bracket notation. Don't wrap in an extra object unless the surrounding code already needs one (like pushing into an array with multiple fields).

```ts
// GOOD — typed directly
const config: RunnerRunConfig = JSON.parse(configRaw);
const configItems = config['items'] as RunnerFilterItems;

// GOOD — absorbed into existing structure
const parsedFile = JSON.parse(rawFile);
dataFiles.push({
  manifest: itemManifest,
  filePath: absolutePath,
  fileContents: parsedFile, // absorbed into Record<string, unknown>
});
// later: fileContents['name'], fileContents['version'], etc.

// BAD — implicit any floating around
const config = JSON.parse(configRaw);
const items = config.items ?? []; // any propagates

// BAD — unnecessary wrapping object
const config: RunnerRunConfig = {
  fileContents: JSON.parse(configRaw),
};
```

### Variables from `Record<string, unknown>` Need Explicit Types

When accessing a field from a `Record<string, unknown>` container (e.g., from `JSON.parse`), the result is `unknown`. Annotate with a named type.

```ts
// BAD — result is unknown, no annotation
const configItems = config.fileContents['items'];

// GOOD — explicit type annotation
const configItems: RunnerFilterItems = config.fileContents['items'];
```

### `as const` Is Acceptable

Used for narrowing literals. Consistent patterns:
- Prompt choices — `{ type: 'select' as const }` (required by prompts library)
- `Object.fromEntries()` tuples — `['key', value] as const` (preserves tuple position types)
- Fixed arrays for property access — `['author', 'contributor'] as const`

### Use `.find()` to Validate AND Narrow Types

Replaces `.includes()` + `as` casts in one step.

```ts
// BAD — .includes() doesn't narrow, needs unsafe cast
if (!validCategories.includes(options.category as typeof selectedCategory)) { ... }
selectedCategory = options.category as typeof selectedCategory;

// GOOD — .find() narrows the return type
const matchedCategory = validCategories.find(
  (validCategory) => validCategory === options.category,
);
if (matchedCategory === undefined) { ... return; }
selectedCategory = matchedCategory;
```

## Import Rules

### Import Ordering (4 Groups)

Groups separated by a blank line, alphabetical within each group:
1. Node built-ins (e.g., `child_process`, `fs`, `os`, `path`)
2. Third-party packages (e.g., `eslint`, `tseslint`)
3. Local imports (e.g., `@/lib/utility`, `@/toolkit/logger`)
4. `import type { ... }` (always at the bottom)

Blank line before `import type` is NOT lint-controlled.

```ts
import { promises as fs } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import prompts from 'prompts';

import { validCategories } from '@/lib/item.js';
import { Logger } from '@/toolkit/index.js';

import type {
  RunnerRecordOptions,
  RunnerRecordReturns,
} from '@/types/cli/runner.d.ts';
```

### Barrel Exports

Some directories have an `index.ts` barrel file that re-exports sibling modules. Not every directory gets one.

- All files (`.ts` and `.d.ts`) import through the barrel when one exists.
- Siblings within the barrel directory still go through the barrel (not `./sibling.js`).
- Directories without a barrel — import directly from the source module.

```ts
// Barrel file — src/toolkit/index.ts
export { default as CLIHeader } from './cli-header.js';
export { default as Logger } from './logger.js';
export { default as MarkdownTable } from './markdown-table.js';

// .ts code files — through the barrel
import { CLIHeader, Logger } from '@/toolkit/index.js';

// .d.ts type files — also through the barrel
import type { MarkdownTable } from '@/toolkit/index.ts';

// Siblings within the barrel directory — still through the barrel
// src/toolkit/cli-header.ts
import { Logger } from '@/toolkit/index.js';

// No barrel exists — import directly
import { CLIRecipeSyncPackages } from '@/cli/recipe/sync-packages.js';
import { PATTERN_LEADING_V } from '@/lib/regex.js';
```

### Prefer Named Imports over Namespace/Default

When a module supports named exports, use `import { specific } from 'module'` instead of `import * as module` or `import module from 'module'`. Only use default/namespace imports when the module doesn't support named exports (e.g., `chalk` only has a default export).

**Compiler-forced `import * as`:** CJS packages with `module.exports` and no default export (e.g., `eslint-mdx`, `eslint-plugin-mdx`) require `import * as`. Default import causes TS1192. This is not a convention violation.

When a named import conflicts with a local variable, keep the import name unchanged and rename only the conflicting local variable (e.g., `current` prefix). Use `as` aliasing on the import only when renaming the local variable is impractical. Only rename what's forced — don't cascade renames to variables that don't conflict.

```ts
// BAD — namespace import when named exports are available
import * as path from 'path';
path.resolve(process.cwd(), 'config.json');

// GOOD — named import (tree-shakeable)
import { resolve } from 'path';
resolve(process.cwd(), 'config.json');

// GOOD — import keeps its name, local variable gets `current` prefix
import { platform, version } from 'os';
const currentPlatform = platform();
let currentVersion = version();

// OK — chalk only has a default export
import chalk from 'chalk';
```

### One Specifier per Line

ESLint `@stylistic/object-curly-newline` triggers at 4+ properties for `ImportDeclaration`.

```ts
// BAD — squished on one line
import type { TypeA, TypeB, TypeC, TypeD } from '@/types/cli/runner.d.ts';

// GOOD — one per line
import type {
  TypeA,
  TypeB,
  TypeC,
  TypeD,
} from '@/types/cli/runner.d.ts';
```

## Class Structure

### Explicit Accessibility Modifiers

All class members require explicit `public` or `private`.

```ts
public static async run(options: ...): ... { }
private static getConfigPath(project: ...): ... { }
public constructor(headers: ...) { }
```

### Class Shapes

Two shapes, chosen by whether the module holds per-instance state:

| Shape           | When to use                      | Constructor            | Fields            | Methods                            |
|-----------------|----------------------------------|------------------------|-------------------|------------------------------------|
| **Static-only** | Stateless utilities, API clients | None                   | `static #field`   | `public static` / `private static` |
| **Instance**    | Per-caller isolated state        | `public constructor()` | `readonly #field` | `public` / `private` instance      |

Static-only (stateless utilities):
```ts
export class CLIUtilityChangelog {
  public static async run(options: ...): ... { }
  private static async record(options: ...): ... { }
  private static generateFileName(): ... { }
}
// Called as: CLIUtilityChangelog.run(options)
```

Instance (per-caller state):
```ts
export default class MarkdownTable {
  readonly #headers: MarkdownTableHeaders;

  public constructor(headers: ..., options?: ...) {
    this.#headers = headers;
  }

  public addRow(row: ...): ... { }
}
// Called as: new MarkdownTable(headers).addRow(row)
```

### `#` Private Fields over `private` Keyword

Use `#` (runtime-enforced) for all private class members. Originally an IntelliJ recommendation — kept for consistency.

### `readonly` on Private Fields

- `readonly` — field set once in the constructor, never reassigned after. Prevents `=` reassignment, not mutation (`.push()`, `.set()` still allowed).
- No `readonly` — field that gets reassigned during the class lifecycle.

### Private Fields and Caching

```ts
// Private fields use #hash notation
readonly #headers: MarkdownTableHeaders;

// Static caching pattern
static #cache: SomeType;
static #populated: boolean = false;
```

### Export Rules

- `export default class` — public API classes (barrel indexes, package `exports`).
- `export class` — internal classes.
- Default to `export class` (named export) — this is the preference.
- `export default class` only for public API classes — so consumers can choose named or default import style. It's an accommodation, not a preference.

### Method Ordering

1. Public methods first.
2. Private async methods (grouped).
3. Private non-async helpers (grouped).

Each method separated by a blank line. No blank line after opening brace or before closing brace of the class.

### Alphabetical Ordering (Broad Rule)

Most named declarations are ordered alphabetically:
- Constant arrays in `src/lib/item.ts`
- Regex patterns in `src/lib/regex.ts`
- Type sections in `.d.ts` files (by method name)
- Import specifiers within each group

**Exception**: class methods — grouped by visibility/async, not alphabetical.

## Code Style

### Comment Placement in Method Bodies

Comments describe the process/intent — written so the code makes sense 6 months later. Placement rules:
- Comment sits above the code block it describes.
- Blank line before the comment (except at the start of a scope).
- No comment needed on the first block if it's self-explanatory.
- No trailing comments (same-line comments after code).

```ts
const configPath = resolve(process.cwd(), 'config.json');
const configRaw = await fs.readFile(configPath, 'utf-8');

// Parse the configuration file.
const config: RunnerRunConfig = JSON.parse(configRaw);
const configItems = config['items'] as RunnerRunConfigItems;

// Filter and group items by category.
const filtered = Runner.filterItems(configItems);
const grouped = Runner.groupItems(filtered);
```

### Switch Statements — Always Block-Scoped

Every `case` and `default` uses block scoping with `{ }`. Always include a `default` case, even if there's nothing to handle. Separate non-empty cases with a blank line. Empty fallthrough cases may be grouped without blank lines.

```ts
switch (category) {
  case 'added': {
    Logger.info('New feature.');
    break;
  }

  case 'fixed': {
    Logger.info('Bug fix.');
    break;
  }

  default: {
    Logger.warn('Unknown category.');
    break;
  }
}
```

### Function Overloads vs Union Parameters

- Prefer overloads when the return type or behavior differs per input type — stricter for callers.
- Union parameter is fine when the handling is identical regardless of input type.

```ts
// GOOD — overloads (different behavior per type)
private static format(value: string): FormatReturns;
private static format(value: number): FormatReturns;
private static format(value: string | number): FormatReturns {
  if (typeof value === 'string') {
    return value.trim();
  }

  return value.toFixed(2);
}

// GOOD — union (same handling regardless)
private static validate(value: string | number): ValidateReturns {
  return value !== undefined;
}
```

### `Reflect.set()` / `Reflect.get()` for Dynamic Property Access

Prefer `Reflect.set()` and `Reflect.get()` over direct bracket assignment (`target[key] = value`). Also required by `no-param-reassign` with `props: true` when the target is a function parameter.

```ts
// GOOD
Reflect.set(target, key, value);

// BAD
target[key] = value;
```

### Spread over `Array.from()` for Converting Iterables

```ts
// BAD
const keys = Array.from(grouped.keys());

// GOOD
const keys = [...grouped.keys()];
```

### Optional Chaining and Nullish Coalescing

- Avoid optional chaining (`?.`) — prefer explicit checks.
- Nullish coalescing (`??`) is fine for providing defaults.
- Don't combine them (`config?.name ?? 'default'`) — break into explicit steps.

```ts
// BAD — optional chaining
const name = config?.name;

// GOOD — explicit check
if (config === undefined) {
  return;
}

const name = config.name;

// GOOD — nullish coalescing for defaults
const timeout = options.timeout ?? 5000;
const label = config.name ?? 'default';
```

### Ternary Expressions

- Simple ternary is OK — single condition, short values.
- No nested ternaries.
- No ternaries inside template literals — extract to a variable first.

```ts
// GOOD — simple ternary
const label = (isActive === true) ? 'enabled' : 'disabled';

// BAD — nested ternary
const label = (isActive === true) ? 'enabled' : (isPending === true) ? 'waiting' : 'disabled';

// BAD — ternary inside template literal
Logger.info(`Status: ${(isActive === true) ? 'enabled' : 'disabled'}`);

// GOOD — extracted to variable
const label = (isActive === true) ? 'enabled' : 'disabled';
Logger.info(`Status: ${label}`);
```

### No Stacked Comments and No Step Numbering

```ts
// BAD — stacked comments
// Parse front matter.

// Step 1: Split lines.
const lines = content.split('\n');

// BAD — step numbering
// Step 2: Find end index.
let endIndex = -1;

// GOOD — one descriptive comment per code block
// Parse front matter.
const lines = content.split('\n');
```

### Quote File Names in Comments and Log Messages

```ts
// GOOD
// Load "config.json" for workspace list.
Logger.error('Unable to read "package.json".');
Logger.info('Updated "CHANGELOG.md" successfully.');
```

### Mixed `&&`/`||` Conditions

Parenthesized groups with `(` and `)` on their own lines, each condition on its own line.

```ts
if (
  (
    options.package === undefined
    || options.category === undefined
    || options.bump === undefined
    || options.message === undefined
  )
  && (
    options.package !== undefined
    || options.category !== undefined
    || options.bump !== undefined
    || options.message !== undefined
  )
) {
```

### No `const hasAllFlags` Multi-Line Assignments

Inline conditions directly in `if` blocks.

```ts
// BAD
const hasAllFlags = options.package !== undefined
  && options.category !== undefined
  && options.bump !== undefined;
if (hasAllFlags) { ... }

// GOOD
if (
  options.package !== undefined
  && options.category !== undefined
  && options.bump !== undefined
) { ... }
```

### One Entry per Line in Arrays

```ts
// Both .d.ts tuple types and .ts constant arrays
const categoryOrder: RunnerReleaseCategoryOrder = [
  'updated',
  'fixed',
  'added',
  'removed',
];
```

### Descriptive Callback Parameter Names

Derive from the array/collection name in singular form.

```ts
// BAD
validCategories.find((c) => c === value)
validBumps.find((b) => b === value)

// GOOD
validCategories.find((validCategory) => validCategory === value)
validBumps.find((validBump) => validBump === value)

// More examples:
categoryKeys.map((categoryKey) => ...)
validRoles.map((validRole) => ...)
rawPaths.map((rawPath) => ...)
allowedPolicies.map((allowedPolicy) => ...)
```

### No Destructuring in Callback Parameters

Use the singular of the collection as the param, then access via index inside a block body with intermediate constants.

```ts
// BAD — destructuring in callback param
workspaces.filter(([, config]) => config.policy !== 'freezable')
workspaces.find(([_path, config]) => config.name === options.package)

// GOOD — no destructuring, block body, intermediate constants
workspaces.filter((workspace) => {
  const workspaceConfig = workspace[1];
  const workspaceConfigPolicy = workspaceConfig.policy;

  return workspaceConfigPolicy !== 'freezable';
});

// GOOD — simple direct comparison stays as expression body
validCategories.find(
  (validCategory) => validCategory === options.category,
)
```

Note: `for...of` destructuring is used with `Object.entries()` (which returns tuples), but NOT with Maps. For Maps, use `entry[0]`/`entry[1]` pattern:
```ts
// GOOD — Object.entries() destructuring (returns tuples)
for (const [key, entry] of Object.entries(schedule)) { ... }

// BAD — Map destructuring
for (const [categoryName, categoryItems] of grouped) { ... }

// GOOD — Map iteration without destructuring
for (const entry of grouped) {
  const entryCategory = entry[0];
  const entryItems = entry[1];
}
```

### Variable Names Chain from Parent

When extracting properties from an intermediate constant, the name chains from the parent variable name.

```ts
// Tuple elements get semantic names
const key = supportedItem[0];
const appName = supportedItem[1];

// Domain objects chain from parent name
const workspaceConfig = workspace[1];
const workspaceConfigPolicy = workspaceConfig.policy;

const eligibleConfig = eligible[1];
const eligibleConfigName = eligibleConfig.name;
const eligibleConfigRole = eligibleConfig.role;
const eligibleConfigPolicy = eligibleConfig.policy;
```

### Block Body vs Expression Body in Callbacks

- **Block body** (`=> { ... return; }`): When accessing properties/elements of the callback param, or when multiple statements needed.
- **Expression body** (`=> value`): When the callback is a direct comparison or single method call on a primitive.

```ts
// Block body — accessing tuple elements, multiple properties
items.map((item) => {
  const itemConfig = item[1];
  const itemConfigName = itemConfig.name;
  const itemConfigRole = itemConfig.role;

  return {
    title: itemConfigName,
    description: itemConfigRole,
    value: itemConfigName,
  };
});

// Expression body — direct comparison on primitive
validCategories.find(
  (validCategory) => validCategory === value,
)

// Expression body — single property check
.filter((result) => result.status === 'fulfilled')
.map((result) => result.value)
.filter((value) => value !== null)
```

### Blank Lines between Distinct Operations

Separate method calls, `await` statements, and different logical blocks with blank lines. Variable declarations and loops also need blank line separation.

```ts
// BAD — everything stuck together
Runner.print(grouped);
await Runner.writeOutput({ ... });
await Runner.runParallel();

// GOOD — each operation gets breathing room
Runner.print(grouped);

await Runner.writeOutput({
  filePath: 'output.json',
  content: JSON.stringify(grouped),
});

await Runner.runParallel();

// BAD — declarations and loop stuck together
const grouped: RunnerGroupItemsGrouped = new Map();
const processed: RunnerGroupItemsProcessed = new Set();
for (const category of validPolicies) {

// GOOD — blank line before loop
const grouped: RunnerGroupItemsGrouped = new Map();
const processed: RunnerGroupItemsProcessed = new Set();

for (const category of validPolicies) {
```

### Bare `await` Gets Its Own Visual Group

When an `await` call has no assignment (return value unused), separate it from surrounding `const` assignments with a blank line.

```ts
// BAD — bare await mixed with const assignments
await Runner.fetchData();
const filtered = Runner.filterItems(configItems);

// GOOD — bare await has its own group
await Runner.fetchData();

const filtered = Runner.filterItems(configItems);
```

### Return Directly When Immediately Returned

Don't assign to an intermediate variable just to return it on the next line.

```ts
// BAD — redundant intermediate variable
const filtered = items.filter((item) => {
  ...
});

return filtered;

// GOOD — return directly
return items.filter((item) => {
  ...
});
```

### Extract Nested Function Calls into Variables

Don't nest `resolve()` inside `fs.readFile()` or `fs.writeFile()`. Extract into its own variable for readability.

```ts
// BAD — hard to read
const configRaw = await fs.readFile(resolve(process.cwd(), 'config.json'), 'utf-8');
await fs.writeFile(resolve(process.cwd(), options.filePath), options.content, encoding);

// GOOD — path on its own line
const configPath = resolve(process.cwd(), 'config.json');
const configRaw = await fs.readFile(configPath, 'utf-8');

const outputPath = resolve(process.cwd(), options.filePath);
await fs.writeFile(outputPath, options.content, encoding);
```

### `for...of` vs Array Methods vs Traditional `for`

- `.filter()`, `.map()`, `.find()` — transforming or searching, returns a new value.
- `for...of` — side effects (logging, mutating external collections, async operations).
- `.reduce()` — acceptable, but `for...of` with a mutable accumulator is also fine. Either approach works.
- Traditional `for` — only when index access is needed. Otherwise always `for...of`.

### Static Caching Pattern

- Private static fields with no inline initialization — start as `undefined` naturally.
- Guard field typed as `true` (not `boolean`), checked with `=== true` explicitly — don't rely on truthiness of `undefined`.
- Cache field type includes `| undefined` to account for uninitialized state.
- On failure, set guard to `true` to prevent retrying — return `undefined`.

```ts
static #cache: CacheType;
static #populated: PopulatedType;

public static async fetch(): FetchReturns {
  if (ClassName.#populated === true) {
    return ClassName.#cache;
  }

  // ... fetch, parse, handle errors ...

  ClassName.#cache = result;
  ClassName.#populated = true;

  return ClassName.#cache;
}
```

### `undefined` vs `null`

- **Value** — a box with stuff in it.
- **`null`** — an empty box (explicitly set to nothing, intentionally cleared).
- **`undefined`** — no box at all (never assigned, doesn't exist).

Use `undefined` for optional/missing values (params not passed, uninitialized). Use `null` when something was intentionally set to empty (user clears a field, external API returns null).

### Error Handling

- **Creator** (function designer): may design a function to `throw` on failure — that's the API contract.
- **Consumer** (function caller): always wraps calls to throwing functions in `try/catch`.
- Public `run` methods on CLI classes (CLI entry points) never `throw` — set `process.exitCode = 1` and `return`.

### Explicit Equality Checks — No Truthy/Falsy

Always use explicit checks. No truthy/falsy shortcuts.

- `=== undefined` — no box.
- `=== null` — empty box.
- `== null` — check for both undefined and null at the same time (only valid use of `==` instead of `===`).
- `=== true` — explicit boolean.
- `> 0` / `=== 0` — explicit length.

**Compiler-forced exceptions:**
- `if (cancelled)` — when TypeScript narrows `let x = false` through CFA and callback mutations are invisible. `=== true` causes TS2367.
- `!isPlainObject(value)`, `!Array.isArray(value)` — type guard negations where TypeScript narrowing depends on `!` syntax.
- Ternary conditions `(isDryRun) ? a : b` — AGENTS.md shows this parenthesized form.

### `catch (error)` — No `: unknown` Annotation

TypeScript defaults catch clause variables to `unknown`. Don't annotate redundantly.

```ts
// BAD — redundant
} catch (error: unknown) {

// GOOD
} catch (error) {
```

### `process.exitCode = 1` then Blank Line then `return`

Separate the exit code assignment from the return statement with a blank line.

```ts
// BAD — too close
process.exitCode = 1;
return;

// GOOD
process.exitCode = 1;

return;
```

### Unused Return Values — Don't Assign

If a function's return value is never read, don't assign it to a variable.

```ts
// BAD — data is never used
const data = await Runner.fetchData();

// GOOD — just await
await Runner.fetchData();
```

### Promise Parallelism — Use `Promise.all`

Use `Promise.all` for parallel execution. Cleaner than separate task variables, and rejects immediately if one fails instead of leaving dangling promises.

```ts
// GOOD — Promise.all
const packageJsonPath = resolve(process.cwd(), 'package.json');

const [data, packageJsonRaw] = await Promise.all([
  Runner.fetchData(),
  fs.readFile(packageJsonPath, 'utf-8'),
]);

// BAD — .then() chains (hard to read)
// BAD — separate task variables (dangling promises on rejection)
```

### Return Types — Use Named Alias, Not Inline Promise

Method return types should use the named type alias from `.d.ts`, not an inline `Promise<Type>`.

```ts
// BAD — inline Promise type
private static async fetchData(): Promise<FetcherResponse> {

// GOOD — named return type
private static async fetchData(): FetcherFetchDataReturns {
```

### Readability — All Generated Code Must Be Human-Readable

Don't inline complex expressions into template literals or other expressions. Break them into named variables so each step is clear.

```ts
// BAD — JSON.stringify jammed into a template literal
await fs.writeFile(filePath, `${JSON.stringify({ name: 'test' }, null, 2)}\n`, 'utf-8');

// GOOD — separated into readable variables
const packageJson = JSON.stringify({ name: 'test' }, null, 2);
const packageContents = `${packageJson}\n`;

await fs.writeFile(filePath, packageContents, 'utf-8');
```

## TSConfig Conventions

```jsonc
{
  "compilerOptions": {
    "module": "nodenext",              // Always pair module with moduleResolution
    "moduleResolution": "nodenext",
    // "incremental": false,           // NEVER — non-deterministic
    // "composite": false,             // NEVER — requires incremental
    // "typeRoots": [],                // NEVER
  }
}
```

- No `assumeChangesOnlyAffectDirectDependencies` (non-deterministic).
- No relative paths in exported TSConfig presets (TS resolves from config location).
- If project uses own build tool: `isolatedModules: true` + `noEmit: true`.
