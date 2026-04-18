import type { PresetsEslintToolViteConfigConfig } from '../../types/presets/eslint/tool-vite.d.ts';

/**
 * Presets - ESLint - Tool Vite - Config.
 *
 * Provides Vite-specific ESLint configuration such as ignored build
 * output paths. Consumers spread this into their flat config array via the preset index.
 *
 * @since 0.11.0
 */
const config: PresetsEslintToolViteConfigConfig = [{
  name: 'nova/tool-vite/ignored-files',
  ignores: [],
}];

export default config;
