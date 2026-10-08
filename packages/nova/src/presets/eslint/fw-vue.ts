import vuePlugin from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

import type {
  Presets_Eslint_FwVue_Config,
  Presets_Eslint_FwVue_RecommendedConfig,
} from '../../types/presets/eslint/fw-vue.d.ts';

/**
 * Presets - ESLint - FW Vue - Recommended Config.
 *
 * Selects Vue's official flat correctness baseline while Nova continues to own
 * language, style, and repository policy composition.
 *
 * @since 0.29.0
 */
const recommendedConfig: Presets_Eslint_FwVue_RecommendedConfig = Reflect.get(vuePlugin.configs, 'flat/recommended');

/**
 * Presets - ESLint - FW Vue - Config.
 *
 * Adds Vue single-file component parsing and TypeScript support after the
 * upstream correctness layer while preserving consumer overrides.
 *
 * @since 0.29.0
 */
const config: Presets_Eslint_FwVue_Config = [
  ...recommendedConfig,
  {
    name: 'nova/fw-vue/components',
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
];

export default config;
