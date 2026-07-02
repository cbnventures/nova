/**
 * Lib - Regex - Character Backslash.
 *
 * Used by shellQuote to escape backslashes before other metacharacter escapes,
 * preventing double-escaping in double-quoted shell strings.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CHARACTER_BACKSLASH = /\\/;

/**
 * Lib - Regex - Character Backtick.
 *
 * Used by shellQuote to escape backticks in values passed to gh commands,
 * preventing command substitution inside double-quoted shell strings.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CHARACTER_BACKTICK = /`/;

/**
 * Lib - Regex - Character Dollar.
 *
 * Used by shellQuote to escape dollar signs in values passed to gh commands,
 * preventing variable expansion inside double-quoted shell strings.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CHARACTER_DOLLAR = /\$/;

/**
 * Lib - Regex - Character Double Quote.
 *
 * Used by shell quoting on Windows to escape double quotes in command arguments
 * passed to the execute utility.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_CHARACTER_DOUBLE_QUOTE = /"/;

/**
 * Lib - Regex - Character Pipe.
 *
 * Used by the markdown table toolkit to escape pipe characters inside cell content
 * so they do not break the table column structure.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_CHARACTER_PIPE = /\|/;

/**
 * Lib - Regex - Character Single Quote.
 *
 * Used by shell quoting on POSIX to escape single quotes in command arguments
 * passed to the execute utility.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_CHARACTER_SINGLE_QUOTE = /'/;

/**
 * Lib - Regex - Linebreak CRLF Or LF.
 *
 * Splits text into lines across platforms. Used by the logger, markdown table,
 * and utility parsers for OS release and registry output.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_LINEBREAK_CRLF_OR_LF = /\r?\n/;

/**
 * Lib - Regex - Pattern Angle Bracket Generic.
 *
 * Matches an angle-bracketed generic-argument block so it can be stripped from a
 * type right-hand side; distinct from the HTML-tags pattern which requires one or
 * more inner characters.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_ANGLE_BRACKET_GENERIC = /<[^>]*>/;

/**
 * Lib - Regex - Pattern ANSI.
 *
 * Matches ANSI escape sequences anywhere in a string. Used by cli-header, logger,
 * markdown table, and CLI error handling to strip colors.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_ANSI = /\x1B\[[0-?]*[ -/]*[@-~]/;

/**
 * Lib - Regex - Pattern ANSI Start.
 *
 * Anchored variant that captures a leading ANSI escape at position zero. Used by
 * cli-header truncation to preserve color codes at edges.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_ANSI_START = /^(\x1B\[[0-?]*[ -/]*[@-~])/;

/**
 * Lib - Regex - Pattern Blog Date Prefix.
 *
 * Strips the leading "YYYY-MM-DD-" date prefix from blog filenames so the link
 * conformance suite can derive a slug when no explicit slug is set in frontmatter.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_BLOG_DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;

/**
 * Lib - Regex - Pattern Bracketed Timestamp.
 *
 * Validates the full bracketed `[YYYY-MM-DD HH:mm:ss.SSS +HHmm]` log timestamp
 * emitted by currentTimestamp, used by the utility test suite to assert formatting.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_BRACKETED_TIMESTAMP = /^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} [+-]\d{2}\d{2}]$/;

/**
 * Lib - Regex - Pattern Camel Case Boundary.
 *
 * Used by require-jsdoc-param-name to split camelCase into readable words. Captures each
 * uppercase letter to insert a space before it.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_CAMEL_CASE_BOUNDARY = /([A-Z])/;

/**
 * Lib - Regex - Pattern Camel Case Words.
 *
 * Tokenizes PascalCase or camelCase identifiers into individual words. Used by
 * require-jsdoc-hierarchy and require-type-naming rules.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_CAMEL_CASE_WORDS = /[a-z0-9]+|[A-Z]{2,}(?=[A-Z][a-z]|\b|$)|[A-Z][a-z0-9]*/;

/**
 * Lib - Regex - Pattern Casing Camel Case.
 *
 * Validates that an identifier follows camelCase, optionally prefixed with an
 * underscore. Used by require-naming-convention for variables.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_CASING_CAMEL_CASE = /^_?[a-z][a-zA-Z0-9]*$/;

/**
 * Lib - Regex - Pattern Casing Pascal Case.
 *
 * Validates that an identifier follows PascalCase starting with an uppercase letter.
 * Used by require-naming-convention for classes and types.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_CASING_PASCAL_CASE = /^[A-Z][a-zA-Z0-9]*$/;

/**
 * Lib - Regex - Pattern Casing Underscore Pascal Case.
 *
 * Validates identifiers shaped as one or more PascalCase chunks joined by single
 * underscores (e.g. `Tests_TypeDeclarations_Foo_Bar`). Used by require-naming-convention
 * for type aliases that follow the `{Path}_{Class}_{Method}_{Var}` form.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE = /^[A-Z][A-Za-z0-9]*(?:_[A-Z][A-Za-z0-9]*)*$/;

/**
 * Lib - Regex - Pattern Casing Upper Snake Case.
 *
 * Validates UPPER_SNAKE_CASE identifiers. Used by require-naming-convention to
 * enforce casing on module-level constants.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_CASING_UPPER_SNAKE_CASE = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

/**
 * Lib - Regex - Pattern Code Block.
 *
 * Captures content between triple-backtick fences so the import conformance suite
 * can extract code examples and validate their import specifiers.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_CODE_BLOCK = /```[^\n]*\n([\s\S]*?)```/;

/**
 * Lib - Regex - Pattern Complex Type Rhs Chars.
 *
 * Matches any character that signals a composite type (union, intersection, object,
 * tuple, or list), used to reject complex right-hand sides during alias resolution.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_COMPLEX_TYPE_RHS_CHARS = /[|&{}();,]/;

/**
 * Lib - Regex - Pattern Deprecated Unreleased.
 *
 * Matches a JSDoc `@deprecated UNRELEASED` sentinel on a real comment star line
 * and captures the leading "\n * " prefix. Anchoring to the star line keeps
 * Runner.stampUnreleased from rewriting the token inside string literals or prose.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_DEPRECATED_UNRELEASED = /(\n\s*\*\s*)@deprecated\s+UNRELEASED\b/;

/**
 * Lib - Regex - Pattern Description Line.
 *
 * Extracts the description value from MDX frontmatter so the frontmatter conformance
 * suite can verify every page has a description.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_DESCRIPTION_LINE = /^description:\s*"?([^"]+?)"?\s*$/;

/**
 * Lib - Regex - Pattern Digits.
 *
 * Extracts consecutive digit sequences from a string. Used by sync-environment
 * to parse each version number from LTS constraints.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_DIGITS = /\d+/;

/**
 * Lib - Regex - Pattern Double Quoted String Capture.
 *
 * Strips surrounding double quotes and captures the inner value. Used by dotenv
 * parsing, OS release parsing, and version exe path cleanup.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE = /^"(.*)"$/;

/**
 * Lib - Regex - Pattern Dts Array Alias.
 *
 * Captures the alias name and element type from an `export type Name = Element[];`
 * array-alias declaration in a generated .d.ts file.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_DTS_ARRAY_ALIAS = /^export type (\w+) = (\w+)\[\];?$/;

/**
 * Lib - Regex - Pattern Dts Property Line.
 *
 * Captures the name and type of a single `name: Type;` property line in a
 * generated .d.ts interface body so the type-declaration engine can parse members.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_DTS_PROPERTY_LINE = /^(\w+):\s+(.+);$/;

/**
 * Lib - Regex - Pattern Email Simple.
 *
 * Basic email format check without full RFC validation. Used by nova-config and
 * the initialize command to validate author emails.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_EMAIL_SIMPLE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lib - Regex - Pattern Empty Array Brackets.
 *
 * Matches an empty `[]` array-suffix pair so it can be stripped from a type
 * right-hand side during alias resolution in the type-declaration engine.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EMPTY_ARRAY_BRACKETS = /\[\]/;

/**
 * Lib - Regex - Pattern Env Line.
 *
 * Parses KEY=value lines from .env files, with optional single or double quotes
 * around the value. Used by the bootstrap toolkit to load environment variables.
 *
 * @since 0.14.0
 */
export const LIB_REGEX_PATTERN_ENV_LINE = /^([A-Z_][A-Z0-9_]*)=["']?([^"'\n]*)["']?$/;

/**
 * Lib - Regex - Pattern Env Var Key.
 *
 * Captures the variable name from a KEY=value line. Used by the dotenv generator
 * to parse, update, and delete entries in .env files.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_ENV_VAR_KEY = /^([A-Za-z_][A-Za-z0-9_]*)=/;

/**
 * Lib - Regex - Pattern Env Var Key Screaming Snake.
 *
 * Validates that an environment variable name is SCREAMING_SNAKE_CASE. Used by the dotenv
 * generator to enforce naming during user input.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_ENV_VAR_KEY_SCREAMING_SNAKE = /^[A-Z][A-Z0-9_]*$/;

/**
 * Lib - Regex - Pattern Env Var Key Screaming Snake Inline.
 *
 * Matches SCREAMING_SNAKE tokens within a larger string. Used by the workflows
 * generator to highlight environment variable names in output.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_ENV_VAR_KEY_SCREAMING_SNAKE_INLINE = /\b[A-Z][A-Z0-9_]+\b/;

/**
 * Lib - Regex - Pattern Error Prefix.
 *
 * Strips the "error:" prefix from error messages before displaying them. Used by
 * the CLI error handler to normalize text for user output.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_ERROR_PREFIX = /^error:\s*/;

/**
 * Lib - Regex - Pattern Exact Semver.
 *
 * Matches an exact three-part version pin (`1.2.3`) with no range operator or
 * suffix. Used by Runner.syncPackageReferences to rewrite only exact-pinned
 * dependencies at release time.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXACT_SEMVER = /^\d+\.\d+\.\d+$/;

/**
 * Lib - Regex - Pattern Example Value Inline.
 *
 * Captures a quoted example value from template setup comments. Used by the workflows
 * generator to highlight example values in preview output.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_EXAMPLE_VALUE_INLINE = /example: ("[^"]*")/;

/**
 * Lib - Regex - Pattern Export Dot Slash.
 *
 * Strips the leading "./" from package.json export keys so the import conformance
 * suite can normalize paths before comparing specifiers.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXPORT_DOT_SLASH = /^\.\//;

/**
 * Lib - Regex - Pattern Export Type Name.
 *
 * Captures the type name from an `export type Name` declaration line so the
 * type-declaration engine and its rules can locate exported type aliases.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXPORT_TYPE_NAME = /^export type (\w+)/;

/**
 * Lib - Regex - Pattern Extension.
 *
 * Matches the last file extension segment. Used by require-jsdoc-hierarchy to
 * strip compound extensions like ".test.ts" from file paths.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_EXTENSION = /\.[^.]+$/;

/**
 * Lib - Regex - Pattern Extension Test Suffix.
 *
 * Detects a ".test" suffix on a file stem after the file extension has been stripped.
 * Reserved for rules that need to skip test files.
 *
 * @since 0.15.0
 */
export const LIB_REGEX_PATTERN_EXTENSION_TEST_SUFFIX = /\.test$/;

/**
 * Lib - Regex - Pattern Ext Cjs Suffix.
 *
 * Matches a trailing `.cjs` file extension so the type-declaration rules can
 * strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_CJS_SUFFIX = /\.cjs$/;

/**
 * Lib - Regex - Pattern Ext Cts Suffix.
 *
 * Matches a trailing `.cts` file extension so the type-declaration rules can
 * strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_CTS_SUFFIX = /\.cts$/;

/**
 * Lib - Regex - Pattern Ext D Cts Suffix.
 *
 * Matches a trailing `.d.cts` declaration-file extension so the type-declaration
 * rules can strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_D_CTS_SUFFIX = /\.d\.cts$/;

/**
 * Lib - Regex - Pattern Ext D Mts Suffix.
 *
 * Matches a trailing `.d.mts` declaration-file extension so the type-declaration
 * rules can strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_D_MTS_SUFFIX = /\.d\.mts$/;

/**
 * Lib - Regex - Pattern Ext D Ts Suffix.
 *
 * Matches a trailing `.d.ts` declaration-file extension so the type-declaration
 * rules can strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_D_TS_SUFFIX = /\.d\.ts$/;

/**
 * Lib - Regex - Pattern Ext JSX Suffix.
 *
 * Matches a trailing `.jsx` file extension so the type-declaration rules can
 * strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_JSX_SUFFIX = /\.jsx$/;

/**
 * Lib - Regex - Pattern Ext Js Suffix.
 *
 * Matches a trailing `.js` file extension so the type-declaration rules can
 * strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_JS_SUFFIX = /\.js$/;

/**
 * Lib - Regex - Pattern Ext Mjs Suffix.
 *
 * Matches a trailing `.mjs` file extension so the type-declaration rules can
 * strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_MJS_SUFFIX = /\.mjs$/;

/**
 * Lib - Regex - Pattern Ext Mts Suffix.
 *
 * Matches a trailing `.mts` file extension so the type-declaration rules can
 * strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_MTS_SUFFIX = /\.mts$/;

/**
 * Lib - Regex - Pattern Ext TSX Suffix.
 *
 * Matches a trailing `.tsx` file extension so the type-declaration rules can
 * strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_TSX_SUFFIX = /\.tsx$/;

/**
 * Lib - Regex - Pattern Ext Ts Suffix.
 *
 * Matches a trailing `.ts` file extension so the type-declaration rules can
 * strip it from a file stem before deriving a kebab-case name.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_EXT_TS_SUFFIX = /\.ts$/;

/**
 * Lib - Regex - Pattern File Extension Md.
 *
 * Matches .md and .mdx file extensions so the link conformance suite can filter
 * directory listings down to only markdown documentation files.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_FILE_EXTENSION_MD = /\.(md|mdx)$/;

/**
 * Lib - Regex - Pattern Hash Border Line.
 *
 * Matches lines containing only three or more hash characters. Used by the gitignore
 * generator to skip section border decorations.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_HASH_BORDER_LINE = /^#{3,}$/;

/**
 * Lib - Regex - Pattern Heading H2 Line.
 *
 * Captures H2 heading text from the terminology page so the terminology conformance
 * suite can build a lookup of valid anchor targets for validation.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_HEADING_H2_LINE = /^## (.+)$/;

/**
 * Lib - Regex - Pattern Heading Line.
 *
 * Captures any markdown heading (H1 through H6) so the link conformance suite can
 * build a map of heading anchors and verify fragment links.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_HEADING_LINE = /^#{1,6}\s+(.+)$/;

/**
 * Lib - Regex - Pattern HTML Tags.
 *
 * Strips HTML and JSX tags from heading text so the link and terminology conformance
 * suites can generate clean slug anchors matching IDs.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_HTML_TAGS = /<[^>]+>/;

/**
 * Lib - Regex - Pattern ID Line.
 *
 * Extracts the id value from MDX frontmatter so the frontmatter and link conformance
 * suites can map each page to its custom slug.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_ID_LINE = /^id:\s*"?([^"]+?)"?\s*$/;

/**
 * Lib - Regex - Pattern Import Specifier.
 *
 * Captures Nova package import paths from code examples so the import conformance
 * suite can verify every specifier maps to an export.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_IMPORT_SPECIFIER = /(?:from\s+['"]|require\s*\(\s*['"])(@cbnventures\/nova(?:\/[^'"]+)?)['"]/;

/**
 * Lib - Regex - Pattern Import Type Block.
 *
 * Captures the specifier list from an `import type { ... } from` line so the
 * type-declaration engine and its rules can parse inline type imports.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_IMPORT_TYPE_BLOCK = /^import type \{ (.+) \} from/;

/**
 * Lib - Regex - Pattern Index Suffix.
 *
 * Strips trailing "/index" from resolved doc paths so the link conformance suite
 * can normalize category index pages for link validation.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_INDEX_SUFFIX = /\/index$/;

/**
 * Lib - Regex - Pattern Java Version Line.
 *
 * Parses "java -version" output to extract the version, distribution, and build
 * metadata. Used by the version utility for Java detection.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_JAVA_VERSION_LINE = /^(?:openjdk|java)\s+(?<javaVersion>\d+(?:\.\d+){0,2})(?:\s+\d{4}-\d{2}-\d{2})?(?:\s+LTS)?[\s\S]*?(?:(?:Runtime Environment|SE Runtime Environment)\s+)?(?:(?<distro>Oracle GraalVM|GraalVM CE|GraalVM|Corretto|Temurin|Zulu|SapMachine|Microsoft|JBR|IBM Semeru Runtime Open Edition|Eclipse OpenJ9(?: VM)?|TencentKonaJDK|KonaJDK)(?:[-\s]?(?<distroVersion>[0-9][A-Za-z0-9.+-]*))?)?\s*\(build\s+(?<build>[^)]+)\)/;

/**
 * Lib - Regex - Pattern JSDoc Deprecated Tag Capture.
 *
 * Matches a JSDoc `@deprecated` tag line and captures the value that follows it.
 * Used by require-jsdoc-since to extract and validate @deprecated version values.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_JSDOC_DEPRECATED_TAG_CAPTURE = /^@deprecated\s+(.+)$/;

/**
 * Lib - Regex - Pattern JSDoc Deprecated Tag Line.
 *
 * Detects a real JSDoc `@deprecated` tag at the start of a comment line (after the
 * leading star), not a prose mention elsewhere in the block. Used by
 * require-jsdoc-since to gate @deprecated validation so prose is not seen as a tag.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_JSDOC_DEPRECATED_TAG_LINE = /(?:^|\n)\s*\*?\s*@deprecated\b/;

/**
 * Lib - Regex - Pattern JSDoc Line Prefix.
 *
 * Strips the leading " * " prefix from a JSDoc comment line. Used by require-jsdoc-hierarchy
 * and require-jsdoc-body to extract raw text.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX = /^\s*\*\s?/;

/**
 * Lib - Regex - Pattern JSDoc Param Alignment Fix.
 *
 * Captures the prefix, type, name, and description parts of a JSDoc @param line so
 * require-jsdoc-param-alignment can rewrite it with aligned spacing.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_JSDOC_PARAM_ALIGNMENT_FIX = /^(\s*\*\s*@param\s+)\{([^}]+)\}\s+(\[?\w+\]?)\s+(- .+)$/;

/**
 * Lib - Regex - Pattern JSDoc Param Alignment Param.
 *
 * Captures the type, name, and leading dash of a JSDoc @param line so
 * require-jsdoc-param-alignment can detect alignment violations.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_JSDOC_PARAM_ALIGNMENT_PARAM = /@param\s+(\{[^}]*\})\s+(\w+)\s+(-)/;

/**
 * Lib - Regex - Pattern JSDoc Param Tag Line.
 *
 * Captures the name and description of a JSDoc @param line with an optional type
 * block, used by require-jsdoc-param-name to validate parameter names.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_JSDOC_PARAM_TAG_LINE = /@param\s+(?:\{[^}]*\}\s+)?(\w+)\s+-\s+(.+)/;

/**
 * Lib - Regex - Pattern JSDoc Since Tag Capture.
 *
 * Matches a JSDoc `@since` tag line and captures the value that follows it.
 * Used by require-jsdoc-since to extract and validate @since version values.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_JSDOC_SINCE_TAG_CAPTURE = /^@since\s+(.+)$/;

/**
 * Lib - Regex - Pattern JSDoc Tag Scan.
 *
 * Matches a JSDoc `@since` or `@deprecated` tag and captures the first
 * non-whitespace token on the same line (the [ \t]+ gap stops the capture from
 * crossing a newline). Used by the since-version meta-test; apply `g` at the call site.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_JSDOC_TAG_SCAN = /(?:\/\*+\s*|\n\s*\*\s*)@(?:since|deprecated)[ \t]+(\S+)/;

/**
 * Lib - Regex - Pattern Kebab Case Filename.
 *
 * Validates that a filename stem uses kebab-case with lowercase letters and hyphens
 * only. Used by the require-kebab-case-filename ESLint rule.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_KEBAB_CASE_FILENAME = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

/**
 * Lib - Regex - Pattern Kebab Case Segment.
 *
 * Validates a kebab-case path segment of lowercase letters, digits, and hyphens
 * starting with a letter; deliberately distinct from the stricter kebab-case
 * filename pattern.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_KEBAB_CASE_SEGMENT = /^[a-z][a-z0-9-]*$/;

/**
 * Lib - Regex - Pattern Leading Digit.
 *
 * Matches a leading digit at the start of a string, used to detect path segments
 * or identifiers that begin with a number.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_LEADING_DIGIT = /^[0-9]/;

/**
 * Lib - Regex - Pattern Leading Dot.
 *
 * Strips a leading dot from a string. Used by the rename-file-with-date utility
 * to separate the extension from dotfiles and regular files.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_LEADING_DOT = /^\./;

/**
 * Lib - Regex - Pattern Leading Dot Slash.
 *
 * Matches a leading `./` path prefix. Used by the workflow generator's
 * slugifyWorkingDir helper to strip the prefix before slug conversion.
 *
 * @since 0.16.0
 */
export const LIB_REGEX_PATTERN_LEADING_DOT_SLASH = /^\.\//;

/**
 * Lib - Regex - Pattern Leading Newlines.
 *
 * Strips one or more newlines from the start of a string. Used by the changelog
 * utility to normalize spacing after a heading marker.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_LEADING_NEWLINES = /^\n+/;

/**
 * Lib - Regex - Pattern Leading Non Digits.
 *
 * Strips all leading non-digit characters from a string. Used by the version utility
 * to extract a version number from CLI tool output.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_LEADING_NON_DIGITS = /^\D*/;

/**
 * Lib - Regex - Pattern Leading V.
 *
 * Strips a leading "v" prefix from version strings. Used by the node-releases
 * API to normalize Node.js LTS version keys like "v20".
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_LEADING_V = /^v/;

/**
 * Lib - Regex - Pattern Markdown Link.
 *
 * Captures the display text and href from markdown links so the link conformance
 * suite can validate every internal link resolves.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_MARKDOWN_LINK = /\[([^\]]*)\]\(([^)]+)\)/;

/**
 * Lib - Regex - Pattern Name At Version.
 *
 * Validates the "name@version" format used by packageManager fields. Used by the
 * sync-environment recipe to check values like "npm@10" or "pnpm@9".
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_NAME_AT_VERSION = /^[a-z]+@\d+/;

/**
 * Lib - Regex - Pattern Non Alphanumeric Run.
 *
 * Matches one or more consecutive non-alphanumeric characters, used to split an
 * identifier source string into word tokens.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_NON_ALPHANUMERIC_RUN = /[^A-Za-z0-9]+/;

/**
 * Lib - Regex - Pattern Non Route Segment Character.
 *
 * Matches any character not allowed in a normalized route segment slug, used to
 * replace invalid characters with a hyphen.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_NON_ROUTE_SEGMENT_CHARACTER = /[^A-Za-z0-9_-]/;

/**
 * Lib - Regex - Pattern Non Word Chars.
 *
 * Removes punctuation and special characters from heading text so the link and
 * terminology conformance suites can produce valid slug anchors.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_NON_WORD_CHARS = /[^\w\s-]/;

/**
 * Lib - Regex - Pattern Nova Backup Filename.
 *
 * Validates the dated `rename-test.YYYY-MM-DD_HHmm.nova-backup.txt` filename
 * produced by the rename-file-with-date backup test.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_NOVA_BACKUP_FILENAME = /^rename-test\.\d{4}-\d{2}-\d{2}_\d{4}\.nova-backup\.txt$/;

/**
 * Lib - Regex - Pattern Nova Prefix.
 *
 * Extracts the "nova..." portion from the full process argv string. Used by the
 * CLI entry point to determine the invoked command name.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_NOVA_PREFIX = /nova.*/;

/**
 * Lib - Regex - Pattern Pascal Case Segment.
 *
 * Validates a single PascalCase path segment starting with an uppercase letter;
 * distinct from the casing PascalCase pattern which uses a different char class.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_PASCAL_CASE_SEGMENT = /^[A-Z][A-Za-z0-9]*$/;

/**
 * Lib - Regex - Pattern Pascal Case Underscore Type Name.
 *
 * Validates an underscore-joined PascalCase type-name path (e.g. Foo_Bar_Baz) using
 * a capturing group; distinct from the non-capturing underscore PascalCase pattern.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_PASCAL_CASE_UNDERSCORE_TYPE_NAME = /^[A-Z][A-Za-z0-9]*(_[A-Z][A-Za-z0-9]*)*$/;

/**
 * Lib - Regex - Pattern Range Capture Remainder.
 *
 * Strips a version range operator such as ^, ~, >=, or similar and captures the
 * remainder. Used by normalize-dependencies to extract versions.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER = /^(?:\^|~|>=|>|<=|<)\s*(.+)/;

/**
 * Lib - Regex - Pattern Range Greater Equal Major.
 *
 * Captures the major version from a ">=" range specifier. Used by sync-environment
 * to resolve minimum Node.js LTS versions from constraints.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR = /^>=\s*(\d+)/;

/**
 * Lib - Regex - Pattern Range Major.
 *
 * Captures the major version from ^, ~, or bare version ranges. Used by sync-environment
 * as a fallback when ">=" matching does not apply.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_RANGE_MAJOR = /^[\^~]?\s*(\d+)/;

/**
 * Lib - Regex - Pattern Regex Special Chars.
 *
 * Matches a single RegExp metacharacter so an identifier can be escaped before being
 * interpolated into a dynamically built pattern.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/;

/**
 * Lib - Regex - Pattern Registry Query Line.
 *
 * Parses a Windows "reg query" output line into name, type, and value groups.
 * Used by the utility to read Windows registry entries.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE = /^\s*(\S+)\s+(REG_\S+)\s+(.*)$/;

/**
 * Lib - Regex - Pattern Route Catch All Segment.
 *
 * Matches and captures the parameter name of a catch-all route segment shaped
 * like [...param].
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_ROUTE_CATCH_ALL_SEGMENT = /^\[\.\.\.(.+)\]$/;

/**
 * Lib - Regex - Pattern Route Dynamic Segment.
 *
 * Matches and captures the parameter name of a dynamic route segment shaped
 * like [param].
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_ROUTE_DYNAMIC_SEGMENT = /^\[(.+)\]$/;

/**
 * Lib - Regex - Pattern Route Group Segment.
 *
 * Matches and captures the inner name of a route-group segment shaped like
 * (group).
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_ROUTE_GROUP_SEGMENT = /^\((.+)\)$/;

/**
 * Lib - Regex - Pattern Route Optional Catch All Segment.
 *
 * Matches and captures the parameter name of an optional catch-all route segment
 * shaped like [[...param]].
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_ROUTE_OPTIONAL_CATCH_ALL_SEGMENT = /^\[\[\.\.\.(.+)\]\]$/;

/**
 * Lib - Regex - Pattern Route Parallel Segment.
 *
 * Matches and captures the slot name of a parallel-route segment written with
 * a leading at-sign.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_ROUTE_PARALLEL_SEGMENT = /^@(.+)$/;

/**
 * Lib - Regex - Pattern Route Segment Word Character.
 *
 * Matches a single word character, used to confirm a scrubbed route segment still
 * contains at least one meaningful character.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_ROUTE_SEGMENT_WORD_CHARACTER = /[A-Za-z0-9_]/;

/**
 * Lib - Regex - Pattern Rustc Version Line.
 *
 * Parses "rustc --version" output to extract the version, commit hash, and date.
 * Used by the version utility for Rust toolchain detection.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_RUSTC_VERSION_LINE = /^rustc\s+(\d+\.\d+\.\d+)\s+\((\w+)\s+([\d-]+)\)(?:\s+\(([^)]+)\))?$/;

/**
 * Lib - Regex - Pattern Semver.
 *
 * Captures a semver version from within a larger string. Used by the version utility
 * to extract it from Node.js, npm, Yarn, pnpm, and Bun output.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_SEMVER = /(?<semver>(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)/;

/**
 * Lib - Regex - Pattern Semver Leading.
 *
 * Matches a leading "MAJOR.MINOR.PATCH" version at the start of a string, with an
 * optional whitespace or end-of-string anchor after. Used by require-jsdoc-since to
 * extract the version from @since and @deprecated tag values with trailing prose.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_SEMVER_LEADING = /^(\d+\.\d+\.\d+)(?:\s|$)/;

/**
 * Lib - Regex - Pattern Semver Strict.
 *
 * Anchored variant that requires the entire string to be a valid semver. Used by
 * sync-identity to validate the package version field.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_SEMVER_STRICT = /^(?<semver>(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)$/;

/**
 * Lib - Regex - Pattern Setup Bullet Line Capture.
 *
 * Captures the prefix and text of a bulleted line in template setup instructions.
 * Used by the workflows generator to colorize bullet text.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_SETUP_BULLET_LINE_CAPTURE = /^(\s*- )(.+)$/;

/**
 * Lib - Regex - Pattern Setup Header Line.
 *
 * Matches section headers like "Variables:" in template setup blocks. Used by
 * the workflows generator to detect and style header lines.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_SETUP_HEADER_LINE = /^[A-Z][A-Za-z ]+:$/;

/**
 * Lib - Regex - Pattern Setup Instructions Block.
 *
 * Matches the entire setup instructions header up to and including the border
 * line. Used by the funding and issue-template generators to strip it.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_SETUP_INSTRUCTIONS_BLOCK = /^[\s\S]*# ={3,}\n/;

/**
 * Lib - Regex - Pattern Since Unreleased.
 *
 * Matches a JSDoc `@since UNRELEASED` sentinel on a real comment star line and
 * captures the leading "\n * " prefix. Anchoring to the star line keeps
 * Runner.stampUnreleased from rewriting the token inside string literals or prose.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_SINCE_UNRELEASED = /(\n\s*\*\s*)@since\s+UNRELEASED\b/;

/**
 * Lib - Regex - Pattern Single Pascal Type.
 *
 * Validates and captures a single PascalCase type identifier (allowing underscores)
 * as an entire string, used to confirm an alias points to one plain named type.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_SINGLE_PASCAL_TYPE = /^([A-Z][A-Za-z0-9_]*)$/;

/**
 * Lib - Regex - Pattern Slug Line.
 *
 * Extracts the slug value from blog frontmatter so the link conformance suite can
 * build a lookup of valid blog paths for validation.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_SLUG_LINE = /^slug:\s*(.+)$/;

/**
 * Lib - Regex - Pattern Slug Scoped.
 *
 * Validates npm scoped package names like the "@scope/name" format. Used by nova-config
 * and the initialize command for package name validation.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_SLUG_SCOPED = /^@[a-z0-9]+(?:[a-z0-9-_]*[a-z0-9])?\/[a-z0-9]+(?:[a-z0-9-_]*[a-z0-9])?$/;

/**
 * Lib - Regex - Pattern Slug Simple.
 *
 * Validates unscoped package or project names like "nova". Used by nova-config
 * and the initialize command alongside the scoped variant.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_SLUG_SIMPLE = /^[a-z0-9]+(?:[a-z0-9-_]*[a-z0-9])?$/;

/**
 * Lib - Regex - Pattern Terminology Component.
 *
 * Captures the attributes and children of Terminology JSX elements so the terminology
 * conformance suite can validate every usage links to an anchor.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_TERMINOLOGY_COMPONENT = /<Terminology\s+([^>]*)>([^<]*)<\/Terminology>/;

/**
 * Lib - Regex - Pattern Terminology Title Attr.
 *
 * Extracts the title attribute value from a Terminology component so the terminology
 * conformance suite can verify it matches the terminology heading.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_TERMINOLOGY_TITLE_ATTR = /title="([^"]*)"/;

/**
 * Lib - Regex - Pattern Terminology To Attr.
 *
 * Extracts the to attribute value from a Terminology component so the terminology
 * conformance suite can verify the link target resolves correctly.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_TERMINOLOGY_TO_ATTR = /to="([^"]*)"/;

/**
 * Lib - Regex - Pattern Test Literal.
 *
 * Matches the literal substring "test", used as a sample RegExp instance in the
 * isPlainObject test fixture.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_TEST_LITERAL = /test/;

/**
 * Lib - Regex - Pattern Three Consecutive Caps.
 *
 * Matches a run of three or more consecutive uppercase letters, used to detect
 * brand-style acronyms inside type names.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_THREE_CONSECUTIVE_CAPS = /[A-Z]{3,}/;

/**
 * Lib - Regex - Pattern Trailing Extension.
 *
 * Matches a trailing dot-extension of alphanumeric characters, used by
 * require-jsdoc-hierarchy to detect a file extension on a path segment; distinct
 * from the extension pattern which allows any non-dot characters.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_TRAILING_EXTENSION = /\.[a-zA-Z0-9]+$/;

/**
 * Lib - Regex - Pattern Trailing Slash.
 *
 * Matches a trailing `/` path suffix. Used by the workflow generator's
 * slugifyWorkingDir helper to strip the suffix before slug conversion.
 *
 * @since 0.16.0
 */
export const LIB_REGEX_PATTERN_TRAILING_SLASH = /\/$/;

/**
 * Lib - Regex - Pattern Trailing Newlines.
 *
 * Matches one or more newline characters at the end of a string. Used by
 * the workflow generator to strip trailing newlines from indented trigger
 * YAML before placeholder substitution.
 *
 * @since 0.16.0
 */
export const LIB_REGEX_PATTERN_TRAILING_NEWLINES = /\n+$/;

/**
 * Lib - Regex - Pattern Trailing Newlines Or None.
 *
 * Matches zero or more newline characters at the end of a string. Used by
 * the workflows generator to strip trailing newlines before appending target
 * fragment blocks to base template content.
 *
 * @since 0.16.0
 */
export const LIB_REGEX_PATTERN_TRAILING_NEWLINES_OR_NONE = /\n*$/;

/**
 * Lib - Regex - Pattern Typed Body Declaration.
 *
 * Captures the kind, identifier, and annotated type from a `const`/`let name: Type =`
 * declaration line in a source body.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_TYPED_BODY_DECLARATION = /^\s*(const|let)\s+(\w+):\s+(\w+)\s*=/;

/**
 * Lib - Regex - Pattern Unreleased Leading.
 *
 * Matches the literal "UNRELEASED" sentinel at the start of a string, with an
 * optional whitespace or end-of-string anchor after. Used by require-jsdoc-since
 * to accept the UNRELEASED sentinel even when followed by trailing prose.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_UNRELEASED_LEADING = /^UNRELEASED(?:\s|$)/;

/**
 * Lib - Regex - Pattern Whitespace.
 *
 * Matches one or more whitespace characters. Used by the CLI error handler to
 * collapse multiple spaces and normalize error message formatting.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_WHITESPACE = /\s+/;

/**
 * Lib - Regex - Pattern Wildcard Suffix.
 *
 * Strips wildcard suffixes from package.json export keys so the import conformance
 * suite can match directory exports against specifiers.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_WILDCARD_SUFFIX = /\*.*$/;

/**
 * Lib - Regex - Placeholder Current Date.
 *
 * Matches the "[__CURRENT_DATE__]" token in template files. Reserved for generators
 * that stamp the current date into output files.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_CURRENT_DATE = /\[__CURRENT_DATE__\]/;

/**
 * Lib - Regex - Placeholder Current Year.
 *
 * Matches the "[__CURRENT_YEAR__]" token in template files. Reserved for generators
 * that stamp the current year into output files.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_CURRENT_YEAR = /\[__CURRENT_YEAR__\]/;

/**
 * Lib - Regex - Placeholder Custom Donation.
 *
 * Matches the "[__CUSTOM_DONATION__]" token in the FUNDING.yml template. Used by
 * the funding generator to insert custom donation URLs.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_CUSTOM_DONATION = /\[__CUSTOM_DONATION__\]/;

/**
 * Lib - Regex - Placeholder Entity Name.
 *
 * Matches the "[__ENTITY_NAME__]" token in license templates. Used by the license
 * generator to insert the copyright holder name.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_ENTITY_NAME = /\[__ENTITY_NAME__\]/;

/**
 * Lib - Regex - Placeholder First Commit Year.
 *
 * Matches the "[__FIRST_COMMIT_YEAR__]" token in template files. Reserved for
 * generators that insert the year of the first git commit.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_FIRST_COMMIT_YEAR = /\[__FIRST_COMMIT_YEAR__\]/;

/**
 * Lib - Regex - Placeholder GitHub Org.
 *
 * Matches the "[__GITHUB_ORG__]" token in template files. Reserved for generators
 * that insert the GitHub organization name.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_GITHUB_ORG = /\[__GITHUB_ORG__\]/;

/**
 * Lib - Regex - Placeholder GitHub Repo.
 *
 * Matches the "[__GITHUB_REPO__]" token in issue templates. Used by the issue-template
 * generator to insert the repository slug.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_GITHUB_REPO = /\[__GITHUB_REPO__\]/;

/**
 * Lib - Regex - Placeholder GitHub Sponsor.
 *
 * Matches the "[__GITHUB_SPONSOR__]" token in templates. Used by the funding and
 * issue-template generators for sponsor usernames.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_GITHUB_SPONSOR = /\[__GITHUB_SPONSOR__\]/;

/**
 * Lib - Regex - Placeholder GitHub URL.
 *
 * Matches the "[__GITHUB_URL__]" token in template files. Reserved for generators
 * that insert the full GitHub repository URL.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_GITHUB_URL = /\[__GITHUB_URL__\]/;

/**
 * Lib - Regex - Placeholder Legal Agreements.
 *
 * Matches the "[__LEGAL_AGREEMENTS__]" token in issue templates. Used by the issue-template
 * generator to insert legal agreement checkboxes.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_LEGAL_AGREEMENTS = /\[__LEGAL_AGREEMENTS__\]/;

/**
 * Lib - Regex - Placeholder Legal Label.
 *
 * Matches the "[__LEGAL_LABEL__]" token in issue templates. Used by the issue-template
 * generator to insert the legal checkbox label.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_LEGAL_LABEL = /\[__LEGAL_LABEL__\]/;

/**
 * Lib - Regex - Placeholder Legal Links.
 *
 * Matches the "[__LEGAL_LINKS__]" token in issue templates. Used by the issue-template
 * generator to insert legal document hyperlinks.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_LEGAL_LINKS = /\[__LEGAL_LINKS__\]/;

/**
 * Lib - Regex - Placeholder npm Package.
 *
 * Matches the "[__NPM_PACKAGE__]" token in template files. Reserved for generators
 * that insert the npm package name.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_NPM_PACKAGE = /\[__NPM_PACKAGE__\]/;

/**
 * Lib - Regex - Placeholder Our.
 *
 * Matches the "[__OUR__]" pronoun token in issue templates. Used by the issue-template
 * generator to insert the organization possessive pronoun.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_OUR = /\[__OUR__\]/;

/**
 * Lib - Regex - Placeholder Platform Badges.
 *
 * Matches the "[__PLATFORM_BADGES__]" token in the README template. Used by the
 * read-me generator to insert platform badge images.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PLATFORM_BADGES = /\[__PLATFORM_BADGES__\]/;

/**
 * Lib - Regex - Placeholder Platform Fields.
 *
 * Matches the "[__PLATFORM_FIELDS__]" token in issue templates. Used by the issue-template
 * generator to insert platform-specific fields.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PLATFORM_FIELDS = /\[__PLATFORM_FIELDS__\]/;

/**
 * Lib - Regex - Placeholder Privacy Policy.
 *
 * Matches the "[__PRIVACY_POLICY__]" token in issue templates. Used by the issue-template
 * generator to insert the privacy policy URL.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PRIVACY_POLICY = /\[__PRIVACY_POLICY__\]/;

/**
 * Lib - Regex - Placeholder Project Description.
 *
 * Matches the "[__PROJECT_DESCRIPTION__]" token in the README template. Used by
 * the read-me generator to insert the project tagline.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PROJECT_DESCRIPTION = /\[__PROJECT_DESCRIPTION__\]/;

/**
 * Lib - Regex - Placeholder Project Homepage.
 *
 * Matches the "[__PROJECT_HOMEPAGE__]" token in template files. Reserved for generators
 * that insert the project homepage URL.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PROJECT_HOMEPAGE = /\[__PROJECT_HOMEPAGE__\]/;

/**
 * Lib - Regex - Placeholder Project Link.
 *
 * Matches the "[__PROJECT_LINK__]" token in the README template. Used by the read-me
 * generator to insert the homepage hyperlink.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PROJECT_LINK = /\[__PROJECT_LINK__\]/;

/**
 * Lib - Regex - Placeholder Project Logo URL.
 *
 * Matches the "[__PROJECT_LOGO_URL__]" token in the README template. Used by the read-me
 * generator to insert the project logo image.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PROJECT_LOGO_URL = /\[__PROJECT_LOGO_URL__\]/;

/**
 * Lib - Regex - Placeholder Project Name.
 *
 * Matches the "[__PROJECT_NAME__]" token in the README template. Used by the read-me
 * generator to insert the display project name.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PROJECT_NAME = /\[__PROJECT_NAME__\]/;

/**
 * Lib - Regex - Placeholder Project Slug.
 *
 * Matches the "[__PROJECT_SLUG__]" token in scaffold templates. Used by the scaffold
 * library to insert the config project name.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PROJECT_SLUG = /\[__PROJECT_SLUG__\]/;

/**
 * Lib - Regex - Placeholder Terms Of Use.
 *
 * Matches the "[__TERMS_OF_USE__]" token in issue templates. Used by the issue-template
 * generator to insert the terms of use URL.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_TERMS_OF_USE = /\[__TERMS_OF_USE__\]/;

/**
 * Lib - Regex - Placeholder Us.
 *
 * Matches the "[__US__]" pronoun token in issue templates. Used by the issue-template
 * generator to insert the organization object pronoun.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_US = /\[__US__\]/;

/**
 * Lib - Regex - Placeholder We.
 *
 * Matches the "[__WE__]" pronoun token in issue templates. Used by the issue-template
 * generator to insert the organization subject pronoun.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_WE = /\[__WE__\]/;

/**
 * Lib - Regex - Placeholder Year Range.
 *
 * Matches the "[__YEAR_RANGE__]" token in license templates. Used by the license
 * generator to insert the copyright year or year range.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_YEAR_RANGE = /\[__YEAR_RANGE__\]/;

/**
 * Lib - Regex - URL Prefix Buy Me A Coffee.
 *
 * Tests whether a URL points to Buy Me a Coffee. Used by the read-me generator to
 * identify and render the correct donation badge.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_BUY_ME_A_COFFEE = /^https?:\/\/(?:www\.)?buymeacoffee\.com\//;

/**
 * Lib - Regex - URL Prefix Docker Hub.
 *
 * Tests and strips a Docker Hub repository URL prefix. Used by the read-me generator
 * to extract the Docker image name for badges.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_DOCKER_HUB = /^https?:\/\/hub\.docker\.com\/r\//;

/**
 * Lib - Regex - URL Prefix GitHub Sponsors.
 *
 * Tests and strips a GitHub Sponsors URL prefix. Used by funding, issue-template,
 * and read-me generators to extract sponsor usernames.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS = /^https?:\/\/github\.com\/sponsors\//;

/**
 * Lib - Regex - URL Prefix Ko-fi.
 *
 * Tests whether a URL points to Ko-fi. Used by the read-me generator to identify
 * and render the correct donation badge.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_KOFI = /^https?:\/\/(?:www\.)?ko-fi\.com\//;

/**
 * Lib - Regex - URL Prefix Liberapay.
 *
 * Tests whether a URL points to Liberapay. Used by the read-me generator to identify
 * and render the correct donation badge.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_LIBERAPAY = /^https?:\/\/(?:www\.)?liberapay\.com\//;

/**
 * Lib - Regex - URL Prefix npm Package.
 *
 * Tests and strips an npmjs.com package URL prefix. Used by the read-me generator to
 * extract the package name for badges.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_NPM_PACKAGE = /^https?:\/\/www\.npmjs\.com\/package\//;

/**
 * Lib - Regex - URL Prefix Open Collective.
 *
 * Tests whether a URL points to Open Collective. Used by the read-me generator to
 * identify and render the correct donation badge.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_OPEN_COLLECTIVE = /^https?:\/\/(?:www\.)?opencollective\.com\//;

/**
 * Lib - Regex - URL Prefix Patreon.
 *
 * Tests whether a URL points to Patreon. Used by the read-me generator to identify
 * and render the correct donation badge.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_PATREON = /^https?:\/\/(?:www\.)?patreon\.com\//;

/**
 * Lib - Regex - URL Prefix PayPal.
 *
 * Tests whether a URL points to PayPal, covering both paypal.com and paypal.me
 * domains. Used by the read-me generator to render donation badges.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_PAYPAL = /^https?:\/\/(?:www\.)?paypal\.(?:com|me)\//;

/**
 * Lib - Regex - Pattern Workflow Context Expression.
 *
 * Captures the inner expression from a GitHub Actions `${{ ... }}` context
 * reference. Used by the workflows generator to extract context expressions
 * from run-name strings.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_EXPRESSION = /\$\{\{\s*(.+?)\s*\}\}/;

/**
 * Lib - Regex - Pattern Workflow Context Separator.
 *
 * Splits a GitHub Actions expression on top-level `||` operators. Used by
 * the workflows generator to separate fallback branches in publish and
 * jobs conditions.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_SEPARATOR = /\s*\|\|\s*/;

/**
 * Lib - Regex - Pattern Workflow Context Wrapper End.
 *
 * Strips the trailing `}}` wrapper (with optional whitespace) from a GitHub
 * Actions expression. Used by the workflows generator for publish and jobs
 * condition parsing.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_END = /\s*\}\}$/;

/**
 * Lib - Regex - Pattern Workflow Context Wrapper Start.
 *
 * Strips the leading `${{` wrapper (with optional whitespace) from a GitHub
 * Actions expression. Used by the workflows generator for publish and jobs
 * condition parsing.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_START = /^\$\{\{\s*/;

/**
 * Lib - Regex - Pattern Workflow Name.
 *
 * Captures the workflow display name from a `name: "..."` line in a YAML
 * base file. Used by the workflows generator to resolve depends-on names.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_NAME = /^name:\s*"(.+)"/;

/**
 * Lib - Regex - Pattern Workflow On Block.
 *
 * Matches a top-level `on:` line at the start of any line in a GitHub Actions
 * YAML document. Used by the workflows test to assert that coexisting target
 * jobs share a single trigger block.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_ON_BLOCK = /^on:/;

/**
 * Lib - Regex - Pattern Workflow Placeholder.
 *
 * Matches any `[__NAME__]` placeholder token in generated workflow YAML. Used
 * by the workflows test to assert that no unsubstituted template placeholders
 * leak into the emitted output.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_PLACEHOLDER = /\[__\w+__\]/;

/**
 * Lib - Regex - Pattern Workflow Run Name Capture.
 *
 * Captures the prefix and suffix surrounding a `${{ ... }}` expression in
 * a run-name string. Used by the workflows generator to reconstruct the
 * merged run-name.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_RUN_NAME_CAPTURE = /^(.*?)\$\{\{.*?\}\}(.*)$/;

/**
 * Lib - Regex - Pattern Yml Extension.
 *
 * Matches a trailing `.yml` file extension. Used by the initialize command
 * to strip the extension from trigger file names.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_YML_EXTENSION = /\.yml$/;

/**
 * Lib - Regex - Pattern Workflow Secret Reference.
 *
 * Captures the secret name from a GitHub Actions `${{ secrets.NAME }}` expression.
 * Used by the workflow-templates test to verify reverse coverage of metadata.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_SECRET_REFERENCE = /\$\{\{\s*secrets\.(\w+)\s*\}\}/;

/**
 * Lib - Regex - Pattern Workflow Var Reference.
 *
 * Captures the variable name from a GitHub Actions `${{ vars.NAME }}` expression.
 * Used by the workflow-templates test to verify reverse coverage of metadata.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_VAR_REFERENCE = /\$\{\{\s*vars\.(\w+)\s*\}\}/;

/**
 * Lib - Regex - Pattern Gh Version.
 *
 * Captures the version string from `gh --version` output. Used by sync-identity
 * to verify the installed gh CLI meets the minimum required version.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_GH_VERSION = /^gh version (\d+\.\d+\.\d+)/;

/**
 * Lib - Regex - Pattern GitHub Owner.
 *
 * Validates a GitHub owner (user or organization) name. Used by parseGithub
 * to reject values containing shell metacharacters before interpolating into
 * gh command strings.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_GITHUB_OWNER = /^[A-Za-z0-9-]+$/;

/**
 * Lib - Regex - Pattern GitHub Repo.
 *
 * Validates a GitHub repository name. Used by parseGithub to reject values
 * containing shell metacharacters before interpolating into gh command strings.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_GITHUB_REPO = /^[A-Za-z0-9._-]+$/;

/**
 * Lib - Regex - Pattern Leading Or Trailing Hyphen.
 *
 * Strips leading or trailing hyphens from a string. Used by sync-identity's
 * topic normalizer to clean up topic slugs after character removal.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_LEADING_OR_TRAILING_HYPHEN = /^-+|-+$/;

/**
 * Lib - Regex - Pattern Non Topic Char.
 *
 * Matches any character that is not a lowercase letter, digit, or hyphen. Used
 * by sync-identity's topic normalizer to strip invalid GitHub topic characters.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_NON_TOPIC_CHAR = /[^a-z0-9-]/;

/**
 * Lib - Regex - Pattern Rate Limit Reset.
 *
 * Captures the Unix epoch timestamp from an `X-RateLimit-Reset` header in GitHub
 * API error output. Used by sync-identity to report when the rate limit resets.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_RATE_LIMIT_RESET = /X-RateLimit-Reset:\s*(\d+)/;

/**
 * Lib - Regex - Pattern Whitespace Or Underscore.
 *
 * Matches one or more whitespace characters or underscores. Used by sync-identity's
 * topic normalizer to replace word separators with hyphens.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_WHITESPACE_OR_UNDERSCORE = /[\s_]+/;

/**
 * Lib - Regex - Pattern Topic Flag.
 *
 * Matches a `-f "names[]=` flag segment in a gh api topics command, where the
 * entire `names[]=<topic>` token is shell-quoted. Used by sync-identity tests to
 * count the number of topic flags in the command string.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_TOPIC_FLAG = /-f "names\[\]=/;

/**
 * Lib - Regex - Pattern Topic TypeScript.
 *
 * Matches the literal word "typescript" anywhere in a string. Used by
 * sync-identity tests to verify topic normalization of keyword input.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PATTERN_TOPIC_TYPESCRIPT = /typescript/;
