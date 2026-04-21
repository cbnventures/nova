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
export const LIB_REGEX_PATTERN_CAMEL_CASE_WORDS = /[a-z]+|[A-Z]{2,}(?=[A-Z][a-z]|\b|$)|[A-Z][a-z]*/;

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
 * Lib - Regex - Pattern Casing Upper Snake Case.
 *
 * Validates UPPER_SNAKE_CASE identifiers. Used by require-naming-convention to
 * enforce casing on module-level constants.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_CASING_UPPER_SNAKE_CASE = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

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
 * Lib - Regex - Pattern Email Simple.
 *
 * Basic email format check without full RFC validation. Used by nova-config and
 * the initialize command to validate author emails.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_EMAIL_SIMPLE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
 * Lib - Regex - Pattern Example Value Inline.
 *
 * Captures a quoted example value from template setup comments. Used by the workflows
 * generator to highlight example values in preview output.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_EXAMPLE_VALUE_INLINE = /example: ("[^"]*")/;

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
 * Lib - Regex - Pattern Hash Border Line.
 *
 * Matches lines containing only three or more hash characters. Used by the gitignore
 * generator to skip section border decorations.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_HASH_BORDER_LINE = /^#{3,}$/;

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
 * Lib - Regex - Pattern JSDoc Line Prefix.
 *
 * Strips the leading " * " prefix from a JSDoc comment line. Used by require-jsdoc-hierarchy
 * and require-jsdoc-body to extract raw text.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX = /^\s*\*\s?/;

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
 * Lib - Regex - Pattern Name At Version.
 *
 * Validates the "name@version" format used by packageManager fields. Used by the
 * sync-environment recipe to check values like "npm@10" or "pnpm@9".
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_NAME_AT_VERSION = /^[a-z]+@\d+/;

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
 * Lib - Regex - Pattern Registry Query Line.
 *
 * Parses a Windows "reg query" output line into name, type, and value groups.
 * Used by the utility to read Windows registry entries.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE = /^\s*(\S+)\s+(REG_\S+)\s+(.*)$/;

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
 * Lib - Regex - Pattern Whitespace.
 *
 * Matches one or more whitespace characters. Used by the CLI error handler to
 * collapse multiple spaces and normalize error message formatting.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PATTERN_WHITESPACE = /\s+/;

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
 * Lib - Regex - Placeholder Project Documentation URL.
 *
 * Matches "[__PROJECT_DOCUMENTATION_URL__]" in the README template. Used by the
 * read-me generator to insert the docs site link.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_PLACEHOLDER_PROJECT_DOCUMENTATION_URL = /\[__PROJECT_DOCUMENTATION_URL__\]/;

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
 * Lib - Regex - URL Prefix GitHub.
 *
 * Tests and strips a GitHub URL prefix. Used by the read-me and issue-template generators
 * to extract the "org/repo" slug from the full URL.
 *
 * @since 0.11.0
 */
export const LIB_REGEX_URL_PREFIX_GITHUB = /^https?:\/\/github\.com\//;

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
 * @since 0.21.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_EXPRESSION = /\$\{\{\s*(.+?)\s*\}\}/;

/**
 * Lib - Regex - Pattern Workflow Context Separator.
 *
 * Splits a GitHub Actions expression on top-level `||` operators. Used by
 * the workflows generator to separate fallback branches in publish and
 * jobs conditions.
 *
 * @since 0.21.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_SEPARATOR = /\s*\|\|\s*/;

/**
 * Lib - Regex - Pattern Workflow Context Wrapper End.
 *
 * Strips the trailing `}}` wrapper (with optional whitespace) from a GitHub
 * Actions expression. Used by the workflows generator for publish and jobs
 * condition parsing.
 *
 * @since 0.21.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_END = /\s*\}\}$/;

/**
 * Lib - Regex - Pattern Workflow Context Wrapper Start.
 *
 * Strips the leading `${{` wrapper (with optional whitespace) from a GitHub
 * Actions expression. Used by the workflows generator for publish and jobs
 * condition parsing.
 *
 * @since 0.21.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_START = /^\$\{\{\s*/;

/**
 * Lib - Regex - Pattern Workflow Name.
 *
 * Captures the workflow display name from a `name: "..."` line in a YAML
 * base file. Used by the workflows generator to resolve depends-on names.
 *
 * @since 0.21.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_NAME = /^name:\s*"(.+)"/;

/**
 * Lib - Regex - Pattern Workflow Run Name Capture.
 *
 * Captures the prefix and suffix surrounding a `${{ ... }}` expression in
 * a run-name string. Used by the workflows generator to reconstruct the
 * merged run-name.
 *
 * @since 0.21.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_RUN_NAME_CAPTURE = /^(.*?)\$\{\{.*?\}\}(.*)$/;

/**
 * Lib - Regex - Pattern Yml Extension.
 *
 * Matches a trailing `.yml` file extension. Used by the initialize command
 * to strip the extension from trigger file names.
 *
 * @since 0.21.0
 */
export const LIB_REGEX_PATTERN_YML_EXTENSION = /\.yml$/;

/**
 * Lib - Regex - Pattern Workflow Secret Reference.
 *
 * Captures the secret name from a GitHub Actions `${{ secrets.NAME }}` expression.
 * Used by the workflow-templates test to verify reverse coverage of metadata.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_SECRET_REFERENCE = /\$\{\{\s*secrets\.(\w+)\s*\}\}/;

/**
 * Lib - Regex - Pattern Workflow Var Reference.
 *
 * Captures the variable name from a GitHub Actions `${{ vars.NAME }}` expression.
 * Used by the workflow-templates test to verify reverse coverage of metadata.
 *
 * @since 0.20.0
 */
export const LIB_REGEX_PATTERN_WORKFLOW_VAR_REFERENCE = /\$\{\{\s*vars\.(\w+)\s*\}\}/;
