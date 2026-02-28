/**
 * Character - Double quote.
 *
 * @since 1.0.0
 */
export const CHARACTER_DOUBLE_QUOTE = /"/;

/**
 * Character - Pipe.
 *
 * @since 1.0.0
 */
export const CHARACTER_PIPE = /\|/;

/**
 * Character - Single quote.
 *
 * @since 1.0.0
 */
export const CHARACTER_SINGLE_QUOTE = /'/;

/**
 * Line break - CRLF or LF.
 *
 * @since 1.0.0
 */
export const LINEBREAK_CRLF_OR_LF = /\r?\n/;

/**
 * Pattern - ANSI.
 *
 * @since 1.0.0
 */
export const PATTERN_ANSI = /\x1B\[[0-?]*[ -/]*[@-~]/;

/**
 * Pattern - ANSI start.
 *
 * @since 1.0.0
 */
export const PATTERN_ANSI_START = /^(\x1B\[[0-?]*[ -/]*[@-~])/;

/**
 * Pattern - Digits.
 *
 * @since 1.0.0
 */
export const PATTERN_DIGITS = /\d+/;

/**
 * Pattern - Double quoted string capture.
 *
 * @since 1.0.0
 */
export const PATTERN_DOUBLE_QUOTED_STRING_CAPTURE = /^"(.*)"$/;

/**
 * Pattern - Email simple.
 *
 * @since 1.0.0
 */
export const PATTERN_EMAIL_SIMPLE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Pattern - Error prefix.
 *
 * @since 1.0.0
 */
export const PATTERN_ERROR_PREFIX = /^error:\s*/;

/**
 * Pattern - Java version line.
 *
 * @since 1.0.0
 */
export const PATTERN_JAVA_VERSION_LINE = /^(?:openjdk|java)\s+(?<javaVersion>\d+(?:\.\d+){0,2})(?:\s+\d{4}-\d{2}-\d{2})?(?:\s+LTS)?[\s\S]*?(?:(?:Runtime Environment|SE Runtime Environment)\s+)?(?:(?<distro>Oracle GraalVM|GraalVM CE|GraalVM|Corretto|Temurin|Zulu|SapMachine|Microsoft|JBR|IBM Semeru Runtime Open Edition|Eclipse OpenJ9(?: VM)?|TencentKonaJDK|KonaJDK)(?:[-\s]?(?<distroVersion>[0-9][A-Za-z0-9.+-]*))?)?\s*\(build\s+(?<build>[^)]+)\)/;

/**
 * Pattern - Leading newlines.
 *
 * @since 1.0.0
 */
export const PATTERN_LEADING_NEWLINES = /^\n+/;

/**
 * Pattern - Leading non-digits.
 *
 * @since 1.0.0
 */
export const PATTERN_LEADING_NON_DIGITS = /^\D*/;

/**
 * Pattern - Leading v.
 *
 * @since 1.0.0
 */
export const PATTERN_LEADING_V = /^v/;

/**
 * Pattern - Name at version.
 *
 * @since 1.0.0
 */
export const PATTERN_NAME_AT_VERSION = /^[a-z]+@\d+/;

/**
 * Pattern - Nova prefix.
 *
 * @since 1.0.0
 */
export const PATTERN_NOVA_PREFIX = /nova.*/;

/**
 * Pattern - Range capture remainder.
 *
 * @since 1.0.0
 */
export const PATTERN_RANGE_CAPTURE_REMAINDER = /^(?:\^|~|>=|>|<=|<)\s*(.+)/;

/**
 * Pattern - Range greater equal major.
 *
 * @since 1.0.0
 */
export const PATTERN_RANGE_GREATER_EQUAL_MAJOR = /^>=\s*(\d+)/;

/**
 * Pattern - Range major.
 *
 * @since 1.0.0
 */
export const PATTERN_RANGE_MAJOR = /^[\^~]?\s*(\d+)/;

/**
 * Pattern - Registry query line.
 *
 * @since 1.0.0
 */
export const PATTERN_REGISTRY_QUERY_LINE = /^\s*(\S+)\s+(REG_\S+)\s+(.*)$/;

/**
 * Pattern - Rustc version line.
 *
 * @since 1.0.0
 */
export const PATTERN_RUSTC_VERSION_LINE = /^rustc\s+(\d+\.\d+\.\d+)\s+\((\w+)\s+([\d-]+)\)(?:\s+\(([^)]+)\))?$/;

/**
 * Pattern - Semver.
 *
 * @since 1.0.0
 */
export const PATTERN_SEMVER = /(?<semver>(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)/;

/**
 * Pattern - Semver strict.
 *
 * @since 1.0.0
 */
export const PATTERN_SEMVER_STRICT = /^(?<semver>(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)$/;

/**
 * Pattern - Slug scoped.
 *
 * @since 1.0.0
 */
export const PATTERN_SLUG_SCOPED = /^@[a-z0-9]+(?:[a-z0-9-_]*[a-z0-9])?\/[a-z0-9]+(?:[a-z0-9-_]*[a-z0-9])?$/;

/**
 * Pattern - Slug simple.
 *
 * @since 1.0.0
 */
export const PATTERN_SLUG_SIMPLE = /^[a-z0-9]+(?:[a-z0-9-_]*[a-z0-9])?$/;

/**
 * Pattern - Whitespace.
 *
 * @since 1.0.0
 */
export const PATTERN_WHITESPACE = /\s+/;
