import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { resolveCoverageBadge, resolveCoverageBadgeEndpointUrl } from '../../lib/coverage-badge.js';

import type {
  Tests_Lib_CoverageBadge_LibCoverageBadge_ReturnsNothingWithoutACoverageMinimum_Config,
  Tests_Lib_CoverageBadge_LibCoverageBadge_ServesTheBadgeFromTheBadgesBranchWithoutADocsSite_Config,
  Tests_Lib_CoverageBadge_LibCoverageBadge_ServesTheBadgeFromTheDocsSite_Config,
  Tests_Lib_CoverageBadge_LibCoverageBadge_SkipsTheEndpointWithoutADocsSiteOrRepository_Config,
} from '../../types/tests/lib/coverage-badge.test.d.ts';

/**
 * Tests - Lib - Coverage Badge - Lib CoverageBadge.
 *
 * @since 0.49.0
 */
describe('Lib coverageBadge', () => {
  it('returns nothing without a coverage minimum', () => {
    const config: Tests_Lib_CoverageBadge_LibCoverageBadge_ReturnsNothingWithoutACoverageMinimum_Config = {
      github: {
        owner: 'example',
        repo: 'sample',
      },
      urls: {
        documentation: 'https://docs.example.com/',
      },
    };

    strictEqual(resolveCoverageBadge(config), undefined);
    strictEqual(resolveCoverageBadgeEndpointUrl(config), undefined);

    return;
  });

  it('serves the badge from the docs site', () => {
    const config: Tests_Lib_CoverageBadge_LibCoverageBadge_ServesTheBadgeFromTheDocsSite_Config = {
      urls: {
        documentation: 'https://docs.example.com/',
      },
      workspaces: {
        './': {
          name: 'sample-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/docs': {
          name: 'sample-docs',
          role: 'docs',
          policy: 'freezable',
        },
      },
      settings: {
        coverage: {
          minimum: 75,
        },
      },
    };

    deepStrictEqual(resolveCoverageBadge(config), {
      minimum: 75,
      docsPath: './apps/docs',
    });
    strictEqual(resolveCoverageBadgeEndpointUrl(config), 'https://docs.example.com/badges/coverage.json');

    return;
  });

  it('serves the badge from the badges branch without a docs site', () => {
    const config: Tests_Lib_CoverageBadge_LibCoverageBadge_ServesTheBadgeFromTheBadgesBranchWithoutADocsSite_Config = {
      github: {
        owner: 'example',
        repo: 'sample',
      },
      workspaces: {
        './': {
          name: 'sample-project',
          role: 'project',
          policy: 'freezable',
        },
      },
      settings: {
        coverage: {
          minimum: 60,
        },
      },
    };

    deepStrictEqual(resolveCoverageBadge(config), {
      minimum: 60,
    });
    strictEqual(resolveCoverageBadgeEndpointUrl(config), 'https://raw.githubusercontent.com/example/sample/badges/coverage.json');

    return;
  });

  it('skips the endpoint without a docs site or repository', () => {
    const config: Tests_Lib_CoverageBadge_LibCoverageBadge_SkipsTheEndpointWithoutADocsSiteOrRepository_Config = {
      settings: {
        coverage: {
          minimum: 60,
        },
      },
    };

    strictEqual(resolveCoverageBadgeEndpointUrl(config), undefined);

    return;
  });

  return;
});
