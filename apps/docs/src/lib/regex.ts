/**
 * Lib - Regex - Pattern Code Block.
 *
 * Captures content between triple-backtick fences so the import-docs test can
 * extract code examples and validate their import specifiers.
 *
 * @since 0.14.0
 */
export const PATTERN_CODE_BLOCK = /```[^\n]*\n([\s\S]*?)```/;

/**
 * Lib - Regex - Pattern Export Dot Slash.
 *
 * Strips the leading "./" from package.json export keys so the import-docs test
 * can normalize paths before comparing specifiers.
 *
 * @since 0.14.0
 */
export const PATTERN_EXPORT_DOT_SLASH = /^\.\//;

/**
 * Lib - Regex - Pattern Import Specifier.
 *
 * Captures Nova package import paths from code examples so the import-docs test
 * can verify every specifier maps to an export.
 *
 * @since 0.14.0
 */
export const PATTERN_IMPORT_SPECIFIER = /(?:from\s+['"]|require\s*\(\s*['"])(@cbnventures\/nova(?:\/[^'"]+)?)['"]/;

/**
 * Lib - Regex - Pattern Wildcard Suffix.
 *
 * Strips wildcard suffixes from package.json export keys so the import-docs test
 * can match directory exports against specifiers.
 *
 * @since 0.14.0
 */
export const PATTERN_WILDCARD_SUFFIX = /\*.*$/;

/**
 * Lib - Regex - Pattern Nova Config Type Block.
 *
 * Captures the public Shared_NovaConfig object body so the documentation
 * contract test can compare every top-level field with the config reference.
 *
 * @since UNRELEASED
 */
export const PATTERN_NOVA_CONFIG_TYPE_BLOCK = /export type Shared_NovaConfig = \{\n([\s\S]*?)\n\};/;

/**
 * Lib - Regex - Pattern Type Property.
 *
 * Captures a declaration property's name from a type block while allowing an
 * optional marker, so public object fields can be checked against docs.
 *
 * @since UNRELEASED
 */
export const PATTERN_TYPE_PROPERTY = /^\s{2}([a-z][A-Za-z0-9-]*)\??:/;

/**
 * Lib - Regex - Pattern Recipe Registry Category.
 *
 * Captures the top-level category keys in Nova's recipe registry so the
 * run-recipes reference stays synchronized with every executable category.
 *
 * @since UNRELEASED
 */
export const PATTERN_RECIPE_REGISTRY_CATEGORY = /^\s{2}'([^']+)': \[/;

/**
 * Lib - Regex - Pattern MDX Preamble.
 *
 * Removes frontmatter and top-level import statements so the documentation
 * contract test can inspect the first authored content on a page.
 *
 * @since UNRELEASED
 */
export const PATTERN_MDX_PREAMBLE = /^(?:---\n[\s\S]*?\n---\n\s*)?(?:import[\s\S]*?;\n\s*)*/;

/**
 * Lib - Regex - Pattern Titled Nova Config JSON Block.
 *
 * Captures the initializer page's full nova.config.json example so the
 * documentation contract test can parse and compare its public fields.
 *
 * @since UNRELEASED
 */
export const PATTERN_TITLED_NOVA_CONFIG_JSON_BLOCK = /```json title="nova\.config\.json"\n([\s\S]*?)\n```/;

/**
 * Lib - Regex - Pattern Iconify Icon Type Block.
 *
 * Captures the preset's public inline Iconify object so every supported
 * geometry and transformation field remains documented.
 *
 * @since UNRELEASED
 */
export const PATTERN_ICONIFY_ICON_TYPE_BLOCK = /export type NovaIconifyIcon = \{\n([\s\S]*?)\n\};/;
