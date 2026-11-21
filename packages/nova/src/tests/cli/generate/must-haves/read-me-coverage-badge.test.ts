import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as CliGenerateMustHavesReadMe } from '../../../../cli/generate/must-haves/read-me.js';

import type {
  Tests_Cli_Generate_MustHaves_ReadMeCoverageBadge_ReadMeCoverageBadge_LeavesTheBadgeOutWithoutAnEndpoint_Badges,
  Tests_Cli_Generate_MustHaves_ReadMeCoverageBadge_ReadMeCoverageBadge_RendersAShieldsEndpointBadgeForTheBadgesBranch_Badges,
  Tests_Cli_Generate_MustHaves_ReadMeCoverageBadge_ReadMeCoverageBadge_RendersAShieldsEndpointBadgeForTheDocsSite_Badges,
} from '../../../../types/tests/cli/generate/must-haves/read-me-coverage-badge.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Read Me Coverage Badge - Read Me Coverage Badge.
 *
 * @since 0.49.0
 */
describe('read me coverage badge', () => {
  it('renders a shields endpoint badge for the docs site', () => {
    const badges: Tests_Cli_Generate_MustHaves_ReadMeCoverageBadge_ReadMeCoverageBadge_RendersAShieldsEndpointBadgeForTheDocsSite_Badges = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'example',
        repo: 'sample',
      },
      urls: {
        documentation: 'https://docs.example.com/',
      },
      readme: {
        badges: ['coverage'],
      },
      workspaces: {
        './apps/docs': {
          name: 'sample-docs',
          role: 'docs',
          policy: 'freezable',
        },
      },
      settings: {
        coverage: {
          minimum: 80,
        },
      },
    });

    strictEqual(badges, [
      '  <a href="https://github.com/example/sample/actions">',
      '    <img alt="Test Coverage" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fdocs.example.com%2Fbadges%2Fcoverage.json&style=for-the-badge&logo=vitest&logoColor=%23ffffff">',
      '  </a>',
    ].join('\n'));

    return;
  });

  it('renders a shields endpoint badge for the badges branch', () => {
    const badges: Tests_Cli_Generate_MustHaves_ReadMeCoverageBadge_ReadMeCoverageBadge_RendersAShieldsEndpointBadgeForTheBadgesBranch_Badges = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'example',
        repo: 'sample',
      },
      readme: {
        badges: ['coverage'],
      },
      settings: {
        coverage: {
          minimum: 80,
        },
      },
    });

    strictEqual(badges.includes('https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fexample%2Fsample%2Fbadges%2Fcoverage.json'), true);

    return;
  });

  it('leaves the badge out without an endpoint', () => {
    const badges: Tests_Cli_Generate_MustHaves_ReadMeCoverageBadge_ReadMeCoverageBadge_LeavesTheBadgeOutWithoutAnEndpoint_Badges = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'example',
        repo: 'sample',
      },
      readme: {
        badges: [
          'github-license',
          'coverage',
        ],
      },
    });

    strictEqual(badges.includes('coverage'), false);
    strictEqual(badges.includes('GitHub License'), true);

    return;
  });

  return;
});
