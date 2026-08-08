/**
 * Lib - Regex - Pattern Shiki Cjs Require.
 *
 * Matches the CommonJS `Promise.resolve().then(() => __importStar(require("shiki")))`
 * shim that TypeScript emits so fix-shiki-import can rewrite it to a native import.
 *
 * @since 0.0.0
 */
export const PATTERN_SHIKI_CJS_REQUIRE = /Promise\.resolve\(\)\.then\(\(\) => __importStar\(require\(.shiki.\)\)\)/;
