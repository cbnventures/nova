import { strictEqual } from 'node:assert/strict';

import { ESLint } from 'eslint';
import { describe, it } from 'vitest';

import { dxIgnore } from '../../../presets/eslint/index.js';

import type {
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
