import sveltePlugin from 'eslint-plugin-svelte';
import tseslint from 'typescript-eslint';

import type {
  Presets_Eslint_FwSvelte_Config,
  Presets_Eslint_FwSvelte_RecommendedConfig,
} from '../../types/presets/eslint/fw-svelte.d.ts';

/**
 * Presets - ESLint - FW Svelte - Recommended Config.
 *
 * Selects Svelte's official correctness baseline behind a Nova-compatible
 * preset boundary instead of exposing upstream composition to consumers.
 *
 * @since 0.29.0
 */
const recommendedConfig: Presets_Eslint_FwSvelte_RecommendedConfig = sveltePlugin.configs.recommended;

/**
 * Presets - ESLint - FW Svelte - Config.
 *
 * Adds Svelte component parsing, TypeScript support, and generated-directory
 * ignores while allowing later consumer overrides.
 *
 * @since 0.29.0
 */
const config: Presets_Eslint_FwSvelte_Config = [
  {
    name: 'nova/fw-svelte/ignored-files',
    ignores: ['**/.svelte-kit/**'],
  },
  ...recommendedConfig,
  {
    name: 'nova/fw-svelte/components',
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
];

export default config;
