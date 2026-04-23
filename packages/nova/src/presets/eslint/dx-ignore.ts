import type { PresetsEslintDxIgnoreConfigConfig } from '../../types/presets/eslint/dx-ignore.d.ts';

/**
 * Presets - ESLint - DX Ignore - Config.
 *
 * Excludes common build output directories and generated files from ESLint so linting only
 * targets hand-written source code.
 *
 * @since 0.11.0
 */
const config: PresetsEslintDxIgnoreConfigConfig = [
  {
    name: 'nova/dx-ignore/build-output',
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/.output/**',
    ],
  },
  {
    name: 'nova/dx-ignore/generated',
    ignores: [
      '**/*.map',
      '**/generated/**',
      '**/__generated__/**',
    ],
  },
  {
    name: 'nova/dx-ignore/next',
    ignores: [
      '**/.next/**',
      '**/next-env.d.ts',
    ],
  },
];

export default config;
