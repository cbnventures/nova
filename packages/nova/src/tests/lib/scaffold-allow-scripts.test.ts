import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';

import {
  describe,
  it,
} from 'vitest';

import {
  mergeScaffoldAllowScripts,
  resolveScaffoldAllowScripts,
} from '../../lib/scaffold-allow-scripts.js';

import type {
  Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_ComposesOnlySelectedProfiles_Resolved,
  Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_LeavesTheNeutralCatalogEmpty_Resolved,
  Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_MergesMissingDecisionsWithoutOverridingConsumerChoices_AllowScripts,
  Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_MergesMissingDecisionsWithoutOverridingConsumerChoices_Changed,
  Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_MergesMissingDecisionsWithoutOverridingConsumerChoices_PackageJson,
} from '../../types/tests/lib/scaffold-allow-scripts.test.d.ts';

/**
 * Tests - Lib - Scaffold Allow Scripts - Lib Scaffold Allow Scripts.
 *
 * Proves scaffold profiles opt into reviewed lifecycle scripts without reviving
 * the former broad allowScripts block or overriding consumer decisions.
 *
 * @since 0.34.0
 */
describe('Lib scaffold allow scripts', () => {
  it('composes only selected profiles', () => {
    const resolved: Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_ComposesOnlySelectedProfiles_Resolved = resolveScaffoldAllowScripts([
      'cloudflare',
      'docusaurus',
      'esbuild',
      'file-watching',
    ]);

    deepStrictEqual(resolved, {
      'core-js': true,
      'es5-ext': false,
      'esbuild': true,
      'fsevents': true,
      'workerd': true,
    });

    return;
  });

  it('leaves the neutral catalog empty', () => {
    const resolved: Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_LeavesTheNeutralCatalogEmpty_Resolved = resolveScaffoldAllowScripts([]);

    deepStrictEqual(resolved, {});

    return;
  });

  it('merges missing decisions without overriding consumer choices', () => {
    const packageJson: Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_MergesMissingDecisionsWithoutOverridingConsumerChoices_PackageJson = {
      allowScripts: {
        'esbuild': false,
        'node-pty@1.2.0-beta.14': true,
      },
    };
    const changed: Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_MergesMissingDecisionsWithoutOverridingConsumerChoices_Changed = mergeScaffoldAllowScripts(packageJson, {
      'esbuild': true,
      'fsevents': true,
    });
    const allowScripts: Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_MergesMissingDecisionsWithoutOverridingConsumerChoices_AllowScripts = packageJson['allowScripts'] as Tests_Lib_ScaffoldAllowScripts_LibScaffoldAllowScripts_MergesMissingDecisionsWithoutOverridingConsumerChoices_AllowScripts;

    strictEqual(changed, true);
    deepStrictEqual(allowScripts, {
      'esbuild': false,
      'node-pty@1.2.0-beta.14': true,
      'fsevents': true,
    });

    return;
  });

  return;
});
