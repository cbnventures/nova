import {
  dxCodeStyle,
  dxIgnore,
  langJavascript,
  langTypescript,
  novaRules,
  runtimeCloudflareWorkers,
  runtimeNode,
} from '@cbnventures/nova/presets/eslint';

/**
 * ESLint Configuration.
 *
 * Keeps the tool CLI on Node.js globals while applying the Cloudflare Workers
 * runtime only to Worker implementation and test files.
 *
 * @since 0.0.0
 */
export default [
  ...dxIgnore,
  ...dxCodeStyle,
  ...langJavascript,
  ...langTypescript,
  ...runtimeCloudflareWorkers.map((config) => ({
    ...config,
    files: [
      'src/worker/**/*.ts',
      'src/types/worker/**/*.d.ts',
    ],
  })),
  ...runtimeNode.map((config) => ({
    ...config,
    ignores: [
      ...(config['ignores'] ?? []),
      'src/worker/**',
      'src/types/worker/**',
    ],
  })),
  {
    name: 'custom-tsconfig',
    files: [
      '**/*.cts',
      '**/*.mts',
      '**/*.ts',
      '**/*.tsx',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          './tsconfig.cli.json',
          './tsconfig.config.json',
          './tsconfig.tests.json',
          './tsconfig.worker.json',
        ],
      },
    },
  },
  ...novaRules,
  {
    name: 'source-entrypoint-overrides',
    files: ['src/index.ts'],
    rules: {
      'n/hashbang': 'off',
    },
  },
];
