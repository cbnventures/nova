/**
 * Pattern - Code block.
 *
 * @since 1.0.0
 */
export const PATTERN_CODE_BLOCK = /```[^\n]*\n([\s\S]*?)```/;

/**
 * Pattern - Docs prefix.
 *
 * @since 1.0.0
 */
export const PATTERN_DOCS_PREFIX = /^\/docs\//;

/**
 * Pattern - Description line.
 *
 * @since 1.0.0
 */
export const PATTERN_DESCRIPTION_LINE = /^description:\s*(.+)$/;

/**
 * Pattern - Export dot slash.
 *
 * @since 1.0.0
 */
export const PATTERN_EXPORT_DOT_SLASH = /^\.\//;

/**
 * Pattern - File extension md.
 *
 * @since 1.0.0
 */
export const PATTERN_FILE_EXTENSION_MD = /\.(md|mdx)$/;

/**
 * Pattern - Heading h2 line.
 *
 * @since 1.0.0
 */
export const PATTERN_HEADING_H2_LINE = /^## (.+)$/;

/**
 * Pattern - Heading line.
 *
 * @since 1.0.0
 */
export const PATTERN_HEADING_LINE = /^#{1,6}\s+(.+)$/;

/**
 * Pattern - Html tags.
 *
 * @since 1.0.0
 */
export const PATTERN_HTML_TAGS = /<[^>]+>/;

/**
 * Pattern - Id line.
 *
 * @since 1.0.0
 */
export const PATTERN_ID_LINE = /^id:\s*(.+)$/;

/**
 * Pattern - Import specifier.
 *
 * @since 1.0.0
 */
export const PATTERN_IMPORT_SPECIFIER = /(?:from\s+['"]|require\s*\(\s*['"])(@cbnventures\/nova(?:\/[^'"]+)?)['"]/;

/**
 * Pattern - Index suffix.
 *
 * @since 1.0.0
 */
export const PATTERN_INDEX_SUFFIX = /\/index$/;

/**
 * Pattern - Markdown link.
 *
 * @since 1.0.0
 */
export const PATTERN_MARKDOWN_LINK = /\[([^\]]*)\]\(([^)]+)\)/;

/**
 * Pattern - Non word chars.
 *
 * @since 1.0.0
 */
export const PATTERN_NON_WORD_CHARS = /[^\w\s-]/;

/**
 * Pattern - Trailing slash.
 *
 * @since 1.0.0
 */
export const PATTERN_TRAILING_SLASH = /\/$/;

/**
 * Pattern - Term component.
 *
 * @since 1.0.0
 */
export const PATTERN_TERM_COMPONENT = /<Term\s+([^>]*)>([^<]*)<\/Term>/;

/**
 * Pattern - Term title attr.
 *
 * @since 1.0.0
 */
export const PATTERN_TERM_TITLE_ATTR = /title="([^"]*)"/;

/**
 * Pattern - Term to attr.
 *
 * @since 1.0.0
 */
export const PATTERN_TERM_TO_ATTR = /to="([^"]*)"/;

/**
 * Pattern - Wildcard suffix.
 *
 * @since 1.0.0
 */
export const PATTERN_WILDCARD_SUFFIX = /\*.*$/;

/**
 * Pattern - Whitespace.
 *
 * @since 1.0.0
 */
export const PATTERN_WHITESPACE = /\s+/;
