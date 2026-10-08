import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

import type {
  Presets_Eslint_FwReact_Config,
  Presets_Eslint_FwReact_ReactFlatConfigs,
  Presets_Eslint_FwReact_ReactRecommendedConfig,
  Presets_Eslint_FwReact_ReactRuntimeConfig,
} from '../../types/presets/eslint/fw-react.d.ts';

/**
 * Presets - ESLint - FW React - React Flat Configs.
 *
 * Reads React's nested flat-config registry through a stable Nova-owned type
 * boundary so consumers do not compose the upstream config directly.
 *
 * @since 0.29.0
 */
const reactFlatConfigs: Presets_Eslint_FwReact_ReactFlatConfigs = Reflect.get(reactPlugin.configs, 'flat');

/**
 * Presets - ESLint - FW React - React Recommended Config.
 *
 * Selects React's correctness rules while leaving repository policy and style
 * composition to Nova's separate presets.
 *
 * @since 0.29.0
 */
const reactRecommendedConfig: Presets_Eslint_FwReact_ReactRecommendedConfig = reactFlatConfigs['recommended'] ?? {};

/**
 * Presets - ESLint - FW React - React Runtime Config.
 *
 * Applies the modern JSX runtime behavior so generated applications do not
 * require legacy React imports in every component.
 *
 * @since 0.29.0
 */
const reactRuntimeConfig: Presets_Eslint_FwReact_ReactRuntimeConfig = reactFlatConfigs['jsx-runtime'] ?? {};

/**
 * Presets - ESLint - FW React - Config.
 *
 * Adds React, Hooks, accessibility, and browser correctness rules without
 * importing framework-specific routing or build conventions.
 *
 * @since 0.29.0
 */
const config: Presets_Eslint_FwReact_Config = [{
  name: 'nova/fw-react/application',
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
}];

export default config;
