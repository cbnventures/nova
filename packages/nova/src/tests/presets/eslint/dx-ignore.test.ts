import { strictEqual } from 'node:assert/strict';

import { ESLint } from 'eslint';
import { describe, it } from 'vitest';

import { dxIgnore } from '../../../presets/eslint/index.js';

import type {
  Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresGeneratedFrameworkAndToolingState_Eslint,
  Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresGeneratedFrameworkAndToolingState_GeneratedPaths,
  Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresRootAssetsWhilePreservingTheREADMEAndNestedSourceAssets_Eslint,
  Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresRootAssetsWhilePreservingTheREADMEAndNestedSourceAssets_NestedSourceAssetIgnored,
  Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresRootAssetsWhilePreservingTheREADMEAndNestedSourceAssets_RootAssetIgnored,
  Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresRootAssetsWhilePreservingTheREADMEAndNestedSourceAssets_RootReadmeIgnored,
} from '../../../types/tests/presets/eslint/dx-ignore.test.d.ts';

/**
 * Tests - Presets - ESLint - DX Ignore - DX Ignore.
 *
 * Verifies that the root project-assets workspace stays outside lint coverage without hiding
 * its guide or similarly named source directories.
 *
 * @since 0.34.0
 */
describe('dxIgnore', () => {
  it('ignores generated framework and tooling state', async () => {
    const eslint: Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresGeneratedFrameworkAndToolingState_Eslint = new ESLint({
      overrideConfig: [
        ...dxIgnore,
        {
          files: [
            '**/*.js',
            '**/*.ts',
          ],
          rules: {},
        },
      ],
      overrideConfigFile: true,
    });
    const generatedPaths: Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresGeneratedFrameworkAndToolingState_GeneratedPaths = [
      '.cxx/generated.js',
      '.externalNativeBuild/generated.js',
      '.gradle/generated.js',
      '.kotlin/generated.js',
      '.swiftpm/generated.js',
      '.astro/generated.js',
      '.docusaurus/generated.js',
      '.next/generated.js',
      '.svelte-kit/generated.js',
      '.vercel/generated.js',
      '.vite/generated.js',
      '.wrangler/generated.js',
      'DerivedData/generated.js',
      'Pods/generated.js',
      'coverage/generated.js',
      'target/generated.js',
      'worker-configuration.d.ts',
      'xcuserdata/generated.js',
    ];

    for (const generatedPath of generatedPaths) {
      strictEqual(await eslint.isPathIgnored(generatedPath), true, `Expected generated path "${generatedPath}" to be ignored.`);
    }

    return;
  });

  it('ignores root assets while preserving the README and nested source assets', async () => {
    const eslint: Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresRootAssetsWhilePreservingTheREADMEAndNestedSourceAssets_Eslint = new ESLint({
      overrideConfig: [
        ...dxIgnore,
        {
          files: [
            '**/*.js',
            '**/*.md',
          ],
          rules: {},
        },
      ],
      overrideConfigFile: true,
    });
    const rootReadmeIgnored: Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresRootAssetsWhilePreservingTheREADMEAndNestedSourceAssets_RootReadmeIgnored = await eslint.isPathIgnored('assets/README.md');
    const rootAssetIgnored: Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresRootAssetsWhilePreservingTheREADMEAndNestedSourceAssets_RootAssetIgnored = await eslint.isPathIgnored('assets/private.js');
    const nestedSourceAssetIgnored: Tests_Presets_Eslint_DxIgnore_DxIgnore_IgnoresRootAssetsWhilePreservingTheREADMEAndNestedSourceAssets_NestedSourceAssetIgnored = await eslint.isPathIgnored('src/assets/private.js');

    strictEqual(rootReadmeIgnored, false);
    strictEqual(rootAssetIgnored, true);
    strictEqual(nestedSourceAssetIgnored, false);

    return;
  });

  return;
});
