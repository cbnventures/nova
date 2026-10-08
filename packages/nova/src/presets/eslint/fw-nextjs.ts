import nextPlugin from '@next/eslint-plugin-next';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import type {
  Presets_Eslint_FwNextjs_Config,
  Presets_Eslint_FwNextjs_NextCoreWebVitalsConfig,
  Presets_Eslint_FwNextjs_NextRecommendedConfig,
  Presets_Eslint_FwNextjs_ReactFlatConfigs,
  Presets_Eslint_FwNextjs_ReactRecommendedConfig,
  Presets_Eslint_FwNextjs_ReactRuntimeConfig,
} from '../../types/presets/eslint/fw-nextjs.d.ts';

/**
 * Presets - ESLint - FW Next.js - React Flat Configs.
 *
 * Reads React's nested flat-config registry through its legacy-compatible type boundary.
 * This keeps the adapter independent from the plugin's legacy config typings.
 *
 * @since 0.29.0
 */
const reactFlatConfigs: Presets_Eslint_FwNextjs_ReactFlatConfigs = Reflect.get(reactPlugin.configs, 'flat');

/**
 * Presets - ESLint - FW Next.js - React Recommended Config.
 *
 * Selects the React correctness rules used by the Nova-compatible framework preset.
 * Consumers can still override any selected rule after spreading the preset.
 *
 * @since 0.29.0
 */
const reactRecommendedConfig: Presets_Eslint_FwNextjs_ReactRecommendedConfig = reactFlatConfigs['recommended'] ?? {};

/**
 * Presets - ESLint - FW Next.js - React Runtime Config.
 *
 * Selects the modern JSX runtime overrides so React imports are not required.
 * The runtime layer is applied after React's recommended correctness rules.
 *
 * @since 0.29.0
 */
const reactRuntimeConfig: Presets_Eslint_FwNextjs_ReactRuntimeConfig = reactFlatConfigs['jsx-runtime'] ?? {};

/**
 * Presets - ESLint - FW Next.js - Next Recommended Config.
 *
 * Selects Next.js correctness rules without importing its complete flat preset.
 * Nova owns the surrounding language and style composition.
 *
 * @since 0.29.0
 */
const nextRecommendedConfig: Presets_Eslint_FwNextjs_NextRecommendedConfig = Reflect.get(nextPlugin.configs, 'recommended');

/**
 * Presets - ESLint - FW Next.js - Next Core Web Vitals Config.
 *
 * Selects the stricter Core Web Vitals rules for production-facing applications.
 * Consumers can override individual severities in a later flat-config block.
 *
 * @since 0.29.0
 */
const nextCoreWebVitalsConfig: Presets_Eslint_FwNextjs_NextCoreWebVitalsConfig = Reflect.get(nextPlugin.configs, 'core-web-vitals');

/**
 * Presets - ESLint - FW Next.js - Config.
 *
 * Adds Next.js build ignores, framework rules, browser and configuration
 * globals, and a Nova-compatible React, Hooks, and accessibility baseline.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_FwNextjs_Config = [
  {
    name: 'nova/fw-nextjs/ignored-files',
    ignores: [
      '**/.next/**',
      '**/next-env.d.ts',
    ],
  },
  {
    name: 'nova/fw-nextjs/configuration',
    files: [
      '**/next.config.js',
      '**/next.config.ts',
      '**/next.config.mjs',
      '**/next.config.mts',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    name: 'nova/fw-nextjs/application',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.mjs',
      '**/*.mts',
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@next/next': nextPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      ...(reactRecommendedConfig['rules'] ?? {}),
      ...(reactRuntimeConfig['rules'] ?? {}),
      ...(nextRecommendedConfig['rules'] ?? {}),
      ...(nextCoreWebVitalsConfig['rules'] ?? {}),
      'react/prop-types': ['off'],
      'react-hooks/rules-of-hooks': ['error'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

export default config;
