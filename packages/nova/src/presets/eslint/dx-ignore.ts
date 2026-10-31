import type { Presets_Eslint_DxIgnore_Config } from '../../types/presets/eslint/dx-ignore.d.ts';

/**
 * Presets - ESLint - DX Ignore - Config.
 *
 * Excludes project-owned supporting files, common build output directories,
 * and generated files from ESLint so linting only targets hand-written source code
 * and assets documentation.
 *
 * @since 0.11.0
 */
const config: Presets_Eslint_DxIgnore_Config = [
  {
    name: 'nova/dx-ignore/assets',
    ignores: [
      'assets/**/*',
      '!assets/README.md',
    ],
  },
  {
    name: 'nova/dx-ignore/build-output',
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/.output/**',
      '**/coverage/**',
      '**/target/**',
    ],
  },
  {
    name: 'nova/dx-ignore/framework-state',
    ignores: [
      '**/.astro/**',
      '**/.docusaurus/**',
      '**/.svelte-kit/**',
    ],
  },
  {
    name: 'nova/dx-ignore/generated',
    ignores: [
      '**/*.map',
      '**/generated/**',
      '**/__generated__/**',
      '**/worker-configuration.d.ts',
    ],
  },
  {
    name: 'nova/dx-ignore/next',
    ignores: [
      '**/.next/**',
      '**/next-env.d.ts',
    ],
  },
  {
    name: 'nova/dx-ignore/platform-state',
    ignores: [
      '**/.cxx/**',
      '**/.externalNativeBuild/**',
      '**/.gradle/**',
      '**/.kotlin/**',
      '**/.swiftpm/**',
      '**/DerivedData/**',
      '**/Pods/**',
      '**/xcuserdata/**',
    ],
  },
  {
    name: 'nova/dx-ignore/tooling-state',
    ignores: [
      '**/.vercel/**',
      '**/.vite/**',
    ],
  },
  {
    name: 'nova/dx-ignore/wrangler',
    ignores: ['**/.wrangler/**'],
  },
];

export default config;
