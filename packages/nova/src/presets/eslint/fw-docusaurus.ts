import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import type {
  Presets_Eslint_FwDocusaurus_Config,
  Presets_Eslint_FwDocusaurus_ReactFlatConfigs,
  Presets_Eslint_FwDocusaurus_ReactRecommendedConfig,
  Presets_Eslint_FwDocusaurus_ReactRuntimeConfig,
} from '../../types/presets/eslint/fw-docusaurus.d.ts';

/**
 * Presets - ESLint - FW Docusaurus - React Flat Configs.
 *
 * Reads React's nested flat-config registry through its legacy-compatible type boundary.
 * This keeps the adapter independent from the plugin's legacy config typings.
 *
 * @since 0.29.0
 */
const reactFlatConfigs: Presets_Eslint_FwDocusaurus_ReactFlatConfigs = Reflect.get(reactPlugin.configs, 'flat');

/**
 * Presets - ESLint - FW Docusaurus - React Recommended Config.
 *
 * Selects the React correctness rules used by the Nova-compatible framework preset.
 * Consumers can still override any selected rule after spreading the preset.
 *
 * @since 0.29.0
 */
const reactRecommendedConfig: Presets_Eslint_FwDocusaurus_ReactRecommendedConfig = reactFlatConfigs['recommended'] ?? {};

/**
 * Presets - ESLint - FW Docusaurus - React Runtime Config.
 *
 * Selects the modern JSX runtime overrides so React imports are not required.
 * The runtime layer is applied after React's recommended correctness rules.
 *
 * @since 0.29.0
 */
const reactRuntimeConfig: Presets_Eslint_FwDocusaurus_ReactRuntimeConfig = reactFlatConfigs['jsx-runtime'] ?? {};

/**
 * Presets - ESLint - FW Docusaurus - Config.
 *
 * Adds Docusaurus build ignores, browser and configuration globals, and a
 * Nova-compatible React, Hooks, and accessibility baseline.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_FwDocusaurus_Config = [
  {
    name: 'nova/fw-docusaurus/ignored-files',
    ignores: ['**/.docusaurus/**'],
  },
  {
    name: 'nova/fw-docusaurus/configuration',
    files: [
      '**/docusaurus.config.js',
      '**/docusaurus.config.ts',
      '**/docusaurus.config.mjs',
      '**/docusaurus.config.mts',
      '**/sidebars.js',
      '**/sidebars.ts',
      '**/sidebars.mjs',
      '**/sidebars.mts',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    name: 'nova/fw-docusaurus/react',
    files: [
      '**/*.jsx',
      '**/*.tsx',
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...jsxA11yPlugin.flatConfigs.recommended.rules,
      ...(reactRecommendedConfig['rules'] ?? {}),
      ...(reactRuntimeConfig['rules'] ?? {}),
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
