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
 * Lib - Regex - Less Than Sign.
 *
 * Matches a less-than sign so the JSON-LD serializer can escape `<` before
 * inlining a stringified payload into a `<script type="application/ld+json">`
 * tag, preventing an embedded `</script>` from closing the script early.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_LESS_THAN_SIGN = /</;

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
 * Lib - Regex - Metastring Title.
 *
 * Captures the title attribute value from a code block metastring, supporting
 * both double and single quoted forms.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_METASTRING_TITLE = /title=(?:"([^"]*)"|'([^']*)')/;

/**
 * Lib - Regex - Metastring Show Line Numbers.
 *
 * Detects the standalone `showLineNumbers` flag in a code block metastring
 * so rehype-shiki can forward it as a `data-show-line-numbers` attribute.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_METASTRING_SHOW_LINE_NUMBERS = /\bshowLineNumbers\b/;

/**
 * Lib - Regex - Metastring Live.
 *
 * Detects the standalone `live` flag in a code block metastring used by
 * CodeBlock to mount the Sandpack live editor.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_METASTRING_LIVE = /\blive\b/;

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

/**
 * Lib - Regex - CSS Block Comment.
 *
 * Matches a CSS block comment with non-greedy body capture so the
 * layered-scope drift test can strip comments before parsing rule triples.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CSS_BLOCK_COMMENT = /\/\*[\s\S]*?\*\//;

/**
 * Lib - Regex - Layered Scope Allow Duplicate Comment.
 *
 * Matches the opt-out marker comment that exempts the immediately following
 * CSS rule from the layered-scope DRY check.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_LAYERED_SCOPE_ALLOW_DUPLICATE_COMMENT = /\/\*\s*layered-scope:allow-duplicate\s*\*\//;

/**
 * Lib - Regex - Whitespace Run.
 *
 * Matches one or more consecutive whitespace characters so the layered-scope
 * drift test can collapse selector and value spacing before comparing triples.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_WHITESPACE_RUN = /\s+/;

/**
 * Lib - Regex - JSX Class Name.
 *
 * Captures the inner string of a double-quoted `className=` attribute so the
 * layered-scope membership test can verify the umbrella class co-renders.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_JSX_CLASS_NAME = /className="([^"]+)"/;

/**
 * Lib - Regex - JSX Class Name Merge Fallback.
 *
 * Captures the fallback single-quoted class string from the canonical
 * className passthrough merge pattern, so the layered-scope membership test
 * can read the umbrella + member classes from dynamic className expressions.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_JSX_CLASS_NAME_MERGE_FALLBACK = /className=\{\(props\['className'\] !== undefined\) \? `[^`]+` : '([^']+)'\}/;

/**
 * Lib - Regex - Preset Path Segment.
 *
 * Captures the preset name segment from a path of the form
 * `presets/<preset>/...` so per-preset files can be bucketed by preset.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PRESET_PATH_SEGMENT = /presets\/([^/]+)\//;

/**
 * Lib - Regex - Nova Theme Config Object Type.
 *
 * Captures the type-name and body of every `export type NovaThemeConfig... = { ... }`
 * object-shape declaration. Used by the demo-coverage registry-coverage check.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_NOVA_THEME_CONFIG_OBJECT_TYPE = /export type (NovaThemeConfig\w*)\s*=\s*\{([\s\S]*?)\}/;

/**
 * Lib - Regex - Type Declaration Field.
 *
 * Captures the field-name and right-hand-side type expression of a property
 * inside a type literal body. Excludes index signatures and JSDoc comments
 * via the `^\s+\w` leading-word-character prefix.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_TYPE_DECLARATION_FIELD = /^\s+(\w+)\??:\s*([^;]+);/;

/**
 * Lib - Regex - Nova Preset Overrides Object Type.
 *
 * Captures the type-name and body of every `export type NovaPresetOverrides... = { ... }`
 * object-shape declaration. Used by the config-drift overrides-parity check to
 * derive the public consumer leaf paths.
 *
 * @since 0.18.1
 */
export const LIB_REGEX_NOVA_PRESET_OVERRIDES_OBJECT_TYPE = /export type (NovaPresetOverrides\w*)\s*=\s*\{([\s\S]*?)\}/;

/**
 * Lib - Regex - Nova Preset Overrides Partial Alias.
 *
 * Captures the wrapper and wrapped target type-names of every
 * `export type NovaPresetOverrides... = Partial<NovaPresetOverrides...>` alias
 * so the config-drift overrides-parity walk can resolve Partial wrappers.
 *
 * @since 0.18.1
 */
export const LIB_REGEX_NOVA_PRESET_OVERRIDES_PARTIAL_ALIAS = /export type (NovaPresetOverrides\w*)\s*=\s*Partial<(NovaPresetOverrides\w*)>/;

/**
 * Lib - Regex - Nova Preset Overrides Type Reference.
 *
 * Captures the leading `NovaPresetOverrides...` identifier from a type
 * expression so the config-drift overrides-parity walk can distinguish
 * object-type and Partial-wrapper references from union/primitive aliases.
 *
 * @since 0.18.1
 */
export const LIB_REGEX_NOVA_PRESET_OVERRIDES_TYPE_REFERENCE = /^(NovaPresetOverrides\w*)/;

/**
 * Lib - Regex - Nova Theme Config Type Reference.
 *
 * Captures the leading `NovaThemeConfig...` identifier from a type expression
 * so the parser can distinguish object-type references from alias references
 * to primitives, arrays, and records.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_NOVA_THEME_CONFIG_TYPE_REFERENCE = /^(NovaThemeConfig\w*)/;

/**
 * Lib - Regex - Shared Preset Name Type.
 *
 * Captures the right-hand side of the `Shared_PresetName` type declaration so
 * the preset-list drift test can enumerate the union literals.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_SHARED_PRESET_NAME_TYPE = /export type Shared_PresetName\s*=\s*([^;]+);/;

/**
 * Lib - Regex - Single Quoted String.
 *
 * Captures the contents of a single-quoted string literal. Used by the
 * preset-list test to extract individual union members from the captured
 * `Shared_PresetName` right-hand side.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_SINGLE_QUOTED_STRING = /'([^']+)'/;

/**
 * Lib - Regex - Props Class Name Interpolation.
 *
 * Matches the template-literal interpolation of `props['className']` used by
 * the className passthrough merge pattern. The class-name-style-passthrough
 * meta-test uses this to verify the consumer's className gets appended.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PROPS_CLASS_NAME_INTERPOLATION = /\$\{props\['className'\]\}/;

/**
 * Lib - Regex - Dark Selector Prefix.
 *
 * Matches the leading `[data-theme="dark"]` descendant-combinator prefix on a
 * CSS selector so the cascade-defensive meta-test can pair dark-mode rules
 * with their bare-class counterparts in the same file.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_DARK_SELECTOR_PREFIX = /^\[data-theme="dark"\]\s+/;

/**
 * Lib - Regex - Cascade Defensive Comment.
 *
 * Matches the opt-out marker that exempts the immediately following CSS rule
 * from the cascade-defensive redundancy check. Annotate a dark-mode rule with
 * this comment to defeat an intermediate clobber the meta-test cannot model.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CASCADE_DEFENSIVE_COMMENT = /\/\*\s*cascade-defensive\s*\*\//;

/**
 * Lib - Regex - CSS Selector Bare Class.
 *
 * Matches a CSS selector consisting of a single class identifier with no
 * pseudo-class, attribute, or combinator. Captures the bare class name so the
 * cascade-defensive meta-test can detect declarations on the bare form.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CSS_SELECTOR_BARE_CLASS = /^\.([a-zA-Z][\w-]*)$/;

/**
 * Lib - Regex - CSS Selector Class Hover.
 *
 * Matches a CSS selector consisting of a single class identifier followed by
 * the `:hover` pseudo. Captures the class name so the cascade-defensive
 * meta-test can detect hover guards.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CSS_SELECTOR_CLASS_HOVER = /^\.([a-zA-Z][\w-]*):hover$/;

/**
 * Lib - Regex - CSS Selector Class Focus Visible.
 *
 * Matches a CSS selector consisting of a single class identifier followed by
 * the `:focus-visible` pseudo. Captures the class name so the
 * cascade-defensive meta-test can detect focus-visible guards.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CSS_SELECTOR_CLASS_FOCUS_VISIBLE = /^\.([a-zA-Z][\w-]*):focus-visible$/;

/**
 * Lib - Regex - CSS Selector Class Plus Optional Pseudo.
 *
 * Matches a CSS selector consisting of a single class identifier with an
 * optional `:hover` or `:focus-visible` pseudo. Captures the class name from a
 * stripped dark-mode selector for the cascade-defensive check.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CSS_SELECTOR_CLASS_PLUS_OPTIONAL_PSEUDO = /^\.([a-zA-Z][\w-]*)(?::(?:hover|focus-visible))?$/;

/**
 * Lib - Regex - CSS Selector Ends Class Hover.
 *
 * Matches any CSS selector that ENDS with `.<class>:hover`. Captures the class
 * name so the cascade-defensive color-guard check accepts descendant-scoped
 * forms (`.parent .button:hover`) as valid guards.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CSS_SELECTOR_ENDS_CLASS_HOVER = /(?:^|[\s>+~])\.([a-zA-Z][\w-]*):hover$/;

/**
 * Lib - Regex - CSS Selector Ends Class Focus Visible.
 *
 * Matches any CSS selector that ENDS with `.<class>:focus-visible`. Captures
 * the class name so the cascade-defensive color-guard check accepts
 * descendant-scoped forms (`.parent .button:focus-visible`) as valid guards.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_CSS_SELECTOR_ENDS_CLASS_FOCUS_VISIBLE = /(?:^|[\s>+~])\.([a-zA-Z][\w-]*):focus-visible$/;

/**
 * Lib - Regex - JSX Tag Open Name.
 *
 * Matches the start of any JSX opening tag at the current cursor position and
 * captures the tag name so the cascade-defensive meta-test can filter for
 * anchor-rendering tags while scanning content character-by-character.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_JSX_TAG_OPEN_NAME = /<([a-zA-Z][a-zA-Z0-9_]*)\b/;

/**
 * Lib - Regex - Pascal Case.
 *
 * Matches a full PascalCase identifier so the folder-axis meta-test can
 * enforce the theme/ directory naming contract.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_PASCAL_CASE = /^[A-Z][a-zA-Z0-9]*$/;

/**
 * Lib - Regex - Kebab Case.
 *
 * Matches a full kebab-case identifier so the folder-axis meta-test can
 * enforce the blocks/ directory naming contract.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_KEBAB_CASE = /^[a-z][a-z0-9-]*$/;

/**
 * Lib - Regex - Blocks Index Export.
 *
 * Captures the exported PascalCase name and the kebab-case folder reference
 * from a single-line re-export in `src/blocks/index.ts` so the folder-axis
 * meta-test can verify the barrel-to-directory bidirectional integrity.
 *
 * @since 0.18.0
 */
export const LIB_REGEX_BLOCKS_INDEX_EXPORT = /^export \{ default as (\w+) \} from '\.\/([a-z][a-z0-9-]*)\/index\.js';$/;

/**
 * Lib - Regex - Icon Candidate.
 *
 * Captures the collection prefix and icon name from an Iconify `prefix:name`
 * identifier so the icon scan plugin can discover every icon a site
 * references in its content and theme configuration.
 *
 * @since 0.18.1
 */
export const LIB_REGEX_ICON_CANDIDATE = /([a-z][a-z0-9-]*):([a-z0-9][a-z0-9-]*)/;
