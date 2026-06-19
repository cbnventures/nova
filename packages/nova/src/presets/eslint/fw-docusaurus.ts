import type { Presets_Eslint_FwDocusaurus_Config } from '../../types/presets/eslint/fw-docusaurus.d.ts';

/**
 * Presets - ESLint - FW Docusaurus - Config.
 *
 * Provides Docusaurus-specific ESLint configuration that ignores the .docusaurus build cache
 * directory. Consumers spread this into their flat config array.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_FwDocusaurus_Config = [{
  name: 'nova/fw-docusaurus/ignored-files',
  ignores: ['./.docusaurus/**'],
}];

export default config;
