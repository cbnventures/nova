import nPlugin from 'eslint-plugin-n';

import type { PresetsEslintRuntimeNodeConfigConfig } from '../../types/presets/eslint/runtime-node.d.ts';

/**
 * Presets - ESLint - Runtime Node - Config.
 *
 * Enables eslint-plugin-n for Node.js projects, adds rules against bad
 * habits like raw console and process.exit, and turns off hashbang enforcement.
 *
 * @since 0.11.0
 */
const config: PresetsEslintRuntimeNodeConfigConfig = [
  {
    name: 'nova/runtime-node',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      n: nPlugin,
    },
    rules: {
      ...nPlugin.configs.recommended.rules,
    },
  },
  {
    name: 'nova/runtime-node/bad-habits',
    files: [
      '**/*.js',
      '**/*.ts',
      '**/*.jsx',
      '**/*.tsx',
      '**/*.cjs',
      '**/*.cts',
      '**/*.mjs',
      '**/*.mts',
    ],
    plugins: {
      n: nPlugin,
    },
    rules: {
      // Prevent raw console output so all logging flows through the "Logger" toolkit battery.
      'no-console': ['error'],

      // Disallow process.exit() so error handling follows structured patterns instead of abrupt termination.
      'no-process-exit': ['error'],

      // Warn on synchronous APIs (e.g., fs.readFileSync) so the event loop is not blocked.
      'no-sync': ['warn'],
    },
  },
  {
    name: 'nova/runtime-node/cli-hashbang',
    files: [
      '**/src/bin/index.js',
      '**/src/bin/index.ts',
      '**/src/bin/index.cjs',
      '**/src/bin/index.cts',
      '**/src/bin/index.mjs',
      '**/src/bin/index.mts',
      '**/src/cli/index.js',
      '**/src/cli/index.ts',
      '**/src/cli/index.cjs',
      '**/src/cli/index.cts',
      '**/src/cli/index.mjs',
      '**/src/cli/index.mts',
    ],
    plugins: {
      n: nPlugin,
    },
    rules: {
      // Turn off shebang enforcement for source-level CLI entry points because the "bin" field points to the build output, not the source file.
      'n/hashbang': ['off'],
    },
  },
];

export default config;
