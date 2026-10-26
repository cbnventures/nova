/**
 * Lib - Regex - Pattern Apple Scaffold Smoke Changelog Release Heading.
 *
 * Matches an Apple scaffold release heading with its semantic version, native
 * build number, and ISO date.
 *
 * @since 0.0.0
 */
export const PATTERN_APPLE_SCAFFOLD_SMOKE_CHANGELOG_RELEASE_HEADING = /^## 0\.0\.2 \(2\) - \d{4}-\d{2}-\d{2}$/;

/**
 * Lib - Regex - Pattern Shiki Cjs Require.
 *
 * Matches the CommonJS `Promise.resolve().then(() => __importStar(require("shiki")))`
 * shim that TypeScript emits so fix-shiki-import can rewrite it to a native import.
 *
 * @since 0.0.0
 */
export const PATTERN_SHIKI_CJS_REQUIRE = /Promise\.resolve\(\)\.then\(\(\) => __importStar\(require\(.shiki.\)\)\)/;
