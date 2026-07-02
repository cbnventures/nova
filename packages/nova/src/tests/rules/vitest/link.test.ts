import { strictEqual } from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, it } from 'vitest';

import { discoverContentFiles } from '../../../lib/file-discovery.js';
import { registerLinkSuite } from '../../../rules/vitest/link/register.js';
import {
  buildLinkIndex,
  collectProseLinks,
  linkContentDirs,
} from '../../../rules/vitest/link/rules.js';

import type {
  Tests_Rules_Vitest_Link_BadFiles,
  Tests_Rules_Vitest_Link_BadIndex,
  Tests_Rules_Vitest_Link_BadLinks,
  Tests_Rules_Vitest_Link_DocsDir,
  Tests_Rules_Vitest_Link_FixtureRoot,
  Tests_Rules_Vitest_Link_GoodFiles,
  Tests_Rules_Vitest_Link_GoodIndex,
  Tests_Rules_Vitest_Link_OverviewHeadings,
  Tests_Rules_Vitest_Link_ResolvedConfig,
} from '../../../types/tests/rules/vitest/link.test.d.ts';

/**
 * Tests - Rules - Vitest - Link - Fixture Root.
 *
 * Isolated kit test: builds a temp fixture project under a docs dir with one VALID page (its
 * `/docs/...` link resolves and its `#anchor` matches a heading) and one page whose `/docs/...`
 * link points at a missing target. Direct helper assertions prove the index resolves good links
 * and exposes the planted broken target, and a single-key `registerLinkSuite` call proves the
 * enable gating: with only `link-self-anchor-exists` enabled the broken doc target does not run.
 *
 * @since 0.20.0
 */
const fixtureRoot: Tests_Rules_Vitest_Link_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-link-kit-'));

const docsDir: Tests_Rules_Vitest_Link_DocsDir = join(fixtureRoot, 'docs');

mkdirSync(docsDir, { recursive: true });

writeFileSync(
  join(docsDir, 'overview.md'),
  [
    '---',
    'id: overview',
    'title: Overview',
    '---',
    '',
    '## Getting Started',
    '',
    'See the [guide](/docs/guide).',
    '',
    'Jump to [getting started](#getting-started).',
    '',
  ].join('\n'),
);

writeFileSync(
  join(docsDir, 'guide.md'),
  [
    '---',
    'id: guide',
    'title: Guide',
    '---',
    '',
    'Back to [overview](/docs/overview).',
    '',
  ].join('\n'),
);

writeFileSync(
  join(docsDir, 'broken.md'),
  [
    '---',
    'id: broken',
    'title: Broken',
    '---',
    '',
    'This points at [nothing](/docs/does-not-exist).',
    '',
  ].join('\n'),
);

const resolvedConfig: Tests_Rules_Vitest_Link_ResolvedConfig = {
  projectRoot: fixtureRoot,
  contentDirs: { docs: 'docs' },
  docsRouteBasePath: 'docs',
  blogRouteBasePath: 'blog',
  categoryRouteSkipPrefix: 'category/',
  fileExtensions: [
    '.md',
    '.mdx',
  ],
};

describe(`link kit helpers${''}`, () => {
  it(`resolves good doc targets and anchors from the fixture index${''}`, async () => {
    const goodFiles: Tests_Rules_Vitest_Link_GoodFiles = await discoverContentFiles({
      rootDir: resolvedConfig['projectRoot'],
      contentDirs: linkContentDirs(resolvedConfig),
      fileExtensions: resolvedConfig['fileExtensions'],
    });
    const goodIndex: Tests_Rules_Vitest_Link_GoodIndex = await buildLinkIndex(resolvedConfig, goodFiles);

    const overviewHeadings: Tests_Rules_Vitest_Link_OverviewHeadings = goodIndex['fileHeadings'].get('overview');

    strictEqual(goodIndex['existingPaths'].has('guide'), true);
    strictEqual(goodIndex['idPaths'].has('overview'), true);
    strictEqual(overviewHeadings !== undefined && overviewHeadings.has('getting-started'), true);

    return;
  });

  it(`flags a planted broken doc target as unresolvable${''}`, async () => {
    const badFiles: Tests_Rules_Vitest_Link_BadFiles = await discoverContentFiles({
      rootDir: resolvedConfig['projectRoot'],
      contentDirs: linkContentDirs(resolvedConfig),
      fileExtensions: resolvedConfig['fileExtensions'],
    });
    const badIndex: Tests_Rules_Vitest_Link_BadIndex = await buildLinkIndex(resolvedConfig, badFiles);
    const badLinks: Tests_Rules_Vitest_Link_BadLinks = collectProseLinks('[nothing](/docs/does-not-exist)');

    strictEqual(badLinks.includes('/docs/does-not-exist'), true);
    strictEqual(badIndex['existingPaths'].has('does-not-exist'), false);
    strictEqual(badIndex['idPaths'].has('does-not-exist'), false);

    return;
  });

  return;
});

// Enable gating: only the self-anchor check runs, so the broken /docs/ target in broken.md is
// never validated and the registered suite stays green.
registerLinkSuite({
  projectRoot: fixtureRoot,
  contentDirs: { docs: 'docs' },
  enable: ['link-self-anchor-exists'],
});
