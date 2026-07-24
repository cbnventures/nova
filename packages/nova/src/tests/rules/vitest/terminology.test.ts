import { strictEqual } from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import * as vitest from 'vitest';
import { describe, it } from 'vitest';

import { registerTerminologySuite } from '../../../rules/vitest/terminology/register.js';
import { buildValidAnchors, componentPattern } from '../../../rules/vitest/terminology/rules.js';

import type {
  Tests_Rules_Vitest_Terminology_AttrMatch,
  Tests_Rules_Vitest_Terminology_BadAnchors,
  Tests_Rules_Vitest_Terminology_BadRootDir,
  Tests_Rules_Vitest_Terminology_BareMatch,
  Tests_Rules_Vitest_Terminology_DocsDir,
  Tests_Rules_Vitest_Terminology_FixtureRoot,
  Tests_Rules_Vitest_Terminology_GoodAnchors,
  Tests_Rules_Vitest_Terminology_QuickstartDir,
  Tests_Rules_Vitest_Terminology_ResolvedConfig,
  Tests_Rules_Vitest_Terminology_TerminologyPath,
} from '../../../types/tests/rules/vitest/terminology.test.d.ts';

/**
 * Tests - Rules - Vitest - Terminology - Fixture Root.
 *
 * Isolated kit test: builds a temp fixture project with a terminology source page whose two h2
 * headings define the valid anchor set, one VALID content page (correct title/to/children and a
 * resolvable anchor), and a separate root with a page whose `to` points at an unknown anchor.
 * Direct helper assertions prove the anchors build from the headings and the planted bad anchor
 * is absent, and a single-key `registerTerminologySuite` call over the good-only root proves the
 * enable gating stays green while leaving the broken-anchor rule off.
 *
 * @since 0.20.0
 */
const fixtureRoot: Tests_Rules_Vitest_Terminology_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-terminology-kit-'));

const docsDir: Tests_Rules_Vitest_Terminology_DocsDir = join(fixtureRoot, 'docs');

const quickstartDir: Tests_Rules_Vitest_Terminology_QuickstartDir = join(docsDir, 'quickstart');

mkdirSync(quickstartDir, { recursive: true });

const terminologyPath: Tests_Rules_Vitest_Terminology_TerminologyPath = join(quickstartDir, 'terminology.mdx');

writeFileSync(
  terminologyPath,
  [
    '---',
    'id: terminology',
    'title: Terminology',
    '---',
    '',
    '## Preset',
    '',
    'A preset.',
    '',
    '## Toolkit',
    '',
    'A toolkit.',
    '',
  ].join('\n'),
);

writeFileSync(
  join(docsDir, 'good.mdx'),
  [
    '---',
    'id: good',
    'title: Good',
    '---',
    '',
    'A <Terminology title="Preset" to="/docs/quickstart/terminology#preset">preset</Terminology> is here.',
    '',
  ].join('\n'),
);

const badRootDir: Tests_Rules_Vitest_Terminology_BadRootDir = mkdtempSync(join(tmpdir(), 'nova-terminology-bad-'));

mkdirSync(join(badRootDir, 'docs', 'quickstart'), { recursive: true });

writeFileSync(
  join(badRootDir, 'docs', 'quickstart', 'terminology.mdx'),
  [
    '---',
    'id: terminology',
    'title: Terminology',
    '---',
    '',
    '## Preset',
    '',
    'A preset.',
    '',
  ].join('\n'),
);

writeFileSync(
  join(badRootDir, 'docs', 'bad.mdx'),
  [
    '---',
    'id: bad',
    'title: Bad',
    '---',
    '',
    'A <Terminology title="Unknown" to="/docs/quickstart/terminology#does-not-exist">unknown</Terminology> term.',
    '',
  ].join('\n'),
);

const resolvedConfig: Tests_Rules_Vitest_Terminology_ResolvedConfig = {
  contentDirs: ['docs'],
  terminologyPath,
  expectedBase: '/docs/quickstart/terminology',
  rootDir: fixtureRoot,
  componentName: 'Terminology',
  files: [],
};

describe(`terminology kit helpers${''}`, () => {
  it(`builds valid anchors from the fixture terminology headings${''}`, async () => {
    const goodAnchors: Tests_Rules_Vitest_Terminology_GoodAnchors = await buildValidAnchors(resolvedConfig);

    strictEqual(goodAnchors.has('preset'), true);
    strictEqual(goodAnchors.has('toolkit'), true);

    return;
  });

  it(`flags a planted unknown anchor as unresolvable${''}`, async () => {
    const badAnchors: Tests_Rules_Vitest_Terminology_BadAnchors = await buildValidAnchors(resolvedConfig);

    strictEqual(badAnchors.has('does-not-exist'), false);

    return;
  });

  it(`matches an attribute-less component usage and still captures attributes${''}`, () => {
    // An attribute-less "<Terminology>API</Terminology>" must match so the attribute checks can
    // see it; the old required whitespace made this escape every check.
    const bareMatch: Tests_Rules_Vitest_Terminology_BareMatch = new RegExp(componentPattern('Terminology')).exec('<Terminology>API</Terminology>');

    strictEqual(bareMatch !== null && bareMatch[1] === '', true);
    strictEqual(bareMatch !== null && bareMatch[2] === 'API', true);

    const attrMatch: Tests_Rules_Vitest_Terminology_AttrMatch = new RegExp(componentPattern('Terminology')).exec('<Terminology title="Preset" to="/docs/quickstart/terminology">preset</Terminology>');

    strictEqual(attrMatch !== null && attrMatch[1] === 'title="Preset" to="/docs/quickstart/terminology"', true);
    strictEqual(attrMatch !== null && attrMatch[2] === 'preset', true);

    return;
  });

  return;
});

// Enable gating: only the title-attr check runs, so the broken anchor in the good-only root is
// never validated and the registered suite stays green.
registerTerminologySuite({
  vitest,
  rootDir: fixtureRoot,
  contentDirs: ['docs'],
  terminologyPath,
  enable: ['terminology-title-attr-present'],
});
