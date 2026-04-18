/**
 * Lib - Regex - Character Space.
 *
 * Matches a single space character. Used by the Google Fonts URL builder to replace
 * spaces in font family names with plus signs.
 *
 * @since 0.15.0
 */
export const LIB_REGEX_CHARACTER_SPACE = / /;

/**
 * Lib - Regex - Hex Color.
 *
 * Validates a six-digit hexadecimal color string with a leading hash
 * character. Used by the Color class constructor to reject malformed color
 * inputs.
 *
 * @since 0.15.0
 */
export const LIB_REGEX_HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

/**
 * Lib - Regex - Wildcard Asterisk.
 *
 * Matches a literal asterisk character. Used by the search indexer
 * to strip wildcard asterisks from ignore patterns before matching route
 * path prefixes.
 *
 * @since 0.15.0
 */
export const LIB_REGEX_WILDCARD_ASTERISK = /\*/;

/**
 * Lib - Regex - Declare Module Theme.
 *
 * Matches an ambient module declaration that follows the theme alias
 * convention and captures the full module path after the at-theme
 * prefix.
 *
 * @since 0.15.0
 */
export const LIB_REGEX_DECLARE_MODULE_THEME = /declare module '(@theme\/[^']+)'/;

/**
 * Lib - Regex - Metastring Line Range.
 *
 * Captures the contents between curly braces in a code block metastring for extracting
 * line number ranges like {1,3-5}.
 *
 * @since 0.15.0
 */
export const LIB_REGEX_METASTRING_LINE_RANGE = /\{([^}]+)\}/;

/**
 * Lib - Regex - Trailing Slash.
 *
 * Matches a trailing forward slash at the end of a string. Used by sidebar
 * components to normalize paths before comparing active page routes
 * against sidebar item hrefs.
 *
 * @since 0.15.0
 */
export const LIB_REGEX_TRAILING_SLASH = /\/$/;

/**
 * Lib - Regex - Special Characters.
 *
 * Matches characters that have special meaning in regular expressions so they
 * can be escaped before being used in a dynamically constructed RegExp
 * pattern string.
 *
 * @since 0.15.0
 */
export const LIB_REGEX_SPECIAL_CHARACTERS = /[.*+?^${}()|[\]\\]/;
