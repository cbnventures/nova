import stylisticPlugin from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

import type { PresetsEslintLangTypescriptConfigConfig } from '../../types/presets/eslint/lang-typescript.d.ts';

/**
 * Presets - ESLint - Lang TypeScript - Config.
 *
 * Enables typescript-eslint parser and plugin for all .ts and
 * .tsx files including class rules, ESLint overrides, and type declaration formatting.
 *
 * @since 0.11.0
 */
const config: PresetsEslintLangTypescriptConfigConfig = [
  {
    name: 'nova/lang-typescript',
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.eslintRecommended.rules,

      // Flag as-casts that do not change the expression's type so redundant assertions are removed and only compiler-forced casts remain.
      '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
    },
  },
  {
    name: 'nova/lang-typescript/classes',
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Require explicit accessibility modifiers on all class members so readers know whether a member is public, protected, or private without relying on TypeScript's implicit default.
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
        },
      ],

      // Require readonly on private fields that are assigned in the constructor and never reassigned, enforcing immutability by default.
      '@typescript-eslint/prefer-readonly': ['error'],
    },
  },
  {
    name: 'nova/lang-typescript/eslint-overrides',
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Disable base rule and use TS-aware version so default parameters in overloaded signatures are not falsely flagged.
      'default-param-last': ['off'],
      '@typescript-eslint/default-param-last': ['error'],

      // Disable base rule and use TS-aware version so generic array types (e.g., Array<string>) are not falsely flagged.
      'no-array-constructor': ['off'],
      '@typescript-eslint/no-array-constructor': ['error'],

      // Disable base rule and use TS-aware version so type-safe calls like window.setTimeout(fn, 0) are not falsely flagged.
      'no-implied-eval': ['off'],
      '@typescript-eslint/no-implied-eval': ['error'],

      // Disable base rule and use TS-aware version so closures over block-scoped (let/const) loop variables are not falsely flagged.
      'no-loop-func': ['off'],
      '@typescript-eslint/no-loop-func': ['error'],

      // Disable base rule and use TS-aware version so type imports, enums, and namespaces are not falsely flagged as shadowed.
      'no-shadow': ['off'],
      '@typescript-eslint/no-shadow': ['error'],

      // Disable base rule and use TS-aware version so thrown values are checked against the Error type hierarchy because the base rule only does literal checks.
      'no-throw-literal': ['off'],
      '@typescript-eslint/only-throw-error': ['error'],

      // Disable base rule and use TS-aware version so TypeScript-specific expressions (e.g., non-null assertions, type casts) are not falsely flagged.
      'no-unused-expressions': ['off'],
      '@typescript-eslint/no-unused-expressions': ['error'],

      // Disable base rule and use TS-aware version so variables used only in type positions (e.g., generics, type guards) are not falsely flagged.
      'no-unused-vars': ['off'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // Disable base rule and use TS-aware version so constructors with parameter properties or visibility modifiers are not falsely flagged.
      'no-useless-constructor': ['off'],
      '@typescript-eslint/no-useless-constructor': ['error'],

      // Disable base rule and use TS-aware version so rejection values are checked against the Error type hierarchy because the base rule only does literal checks.
      'prefer-promise-reject-errors': ['off'],
      '@typescript-eslint/prefer-promise-reject-errors': ['error'],
    },
  },
  {
    name: 'nova/lang-typescript/type-declarations',
    files: ['**/*.d.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: true,
      },
    },
    plugins: {
      '@stylistic': stylisticPlugin,
    },
    rules: {
      // Require semicolons on multiline TypeScript members because without them it is hard to tell where one member ends and the next begins; single-line types omit them since there is no ambiguity.
      '@stylistic/member-delimiter-style': [
        'error',
        {
          'multiline': {
            'delimiter': 'semi',
            'requireLast': true,
          },
          'singleline': {
            'delimiter': 'semi',
            'requireLast': false,
          },
        },
      ],

      // Place line breaks before operators in type declarations so each union or intersection starts visibly on its own line, except '=' which stays after the type name.
      '@stylistic/operator-linebreak': [
        'error',
        'before',
        {
          overrides: {
            '=': 'after',
          },
        },
      ],
    },
  },
];

export default config;
