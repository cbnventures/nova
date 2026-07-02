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
