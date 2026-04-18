import type { PresetsEslintFwExpressjsConfigConfig } from '../../types/presets/eslint/fw-expressjs.d.ts';

/**
 * Presets - ESLint - FW Express.js - Config.
 *
 * Provides Express.js-specific ESLint configuration such as ignored build output paths.
 * Consumers spread this into their flat config array via the preset index.
 *
 * @since 0.11.0
 */
const config: PresetsEslintFwExpressjsConfigConfig = [{
  name: 'nova/fw-expressjs/ignored-files',
  ignores: [],
}];

export default config;
