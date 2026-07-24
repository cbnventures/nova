import tseslint from 'typescript-eslint';

import type { Presets_Eslint_FwAstro_Config } from '../../types/presets/eslint/fw-astro.d.ts';

/**
 * Presets - ESLint - FW Astro - Config.
 *
 * Wires the TypeScript parser into astro frontmatter so typed .astro
 * component scripts lint without parse errors. Spread after the astro flat config.
 *
 * @since 0.21.0
 */
const config: Presets_Eslint_FwAstro_Config = [{
  name: 'nova/fw-astro/frontmatter-parser',
  files: ['**/*.astro'],
  languageOptions: {
    parserOptions: {
      parser: tseslint.parser,
      extraFileExtensions: ['.astro'],
    },
  },
}];

export default config;
