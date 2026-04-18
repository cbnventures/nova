import type { PresetsEslintRuntimeBrowserConfigConfig } from '../../types/presets/eslint/runtime-browser.d.ts';

/**
 * Presets - ESLint - Runtime Browser - Config.
 *
 * Reserved preset for browser environment rules. Currently empty because no browser-specific
 * lint rules are needed beyond the shared dx-code-style preset.
 *
 * @since 0.11.0
 */
const config: PresetsEslintRuntimeBrowserConfigConfig = [{}];

export default config;
