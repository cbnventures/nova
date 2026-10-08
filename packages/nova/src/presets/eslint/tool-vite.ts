import globals from 'globals';

import type { Presets_Eslint_ToolVite_Config } from '../../types/presets/eslint/tool-vite.d.ts';

/**
 * Presets - ESLint - Tool Vite - Config.
 *
 * Declares Node.js globals for Vite and Vitest configuration files while
 * leaving application runtime globals to the selected runtime preset.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_ToolVite_Config = [{
  name: 'nova/tool-vite/configuration',
  files: [
    '**/vite.config.js',
    '**/vite.config.ts',
    '**/vite.config.mjs',
    '**/vite.config.mts',
    '**/vitest.config.js',
    '**/vitest.config.ts',
    '**/vitest.config.mjs',
    '**/vitest.config.mts',
  ],
  languageOptions: {
    globals: globals.node,
  },
}];

export default config;
