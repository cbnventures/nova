import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import * as vitest from 'vitest';

import { registerPackageScriptsSuite } from '../../../rules/vitest/package-scripts/register.js';

import type { Tests_Rules_Vitest_PackageScripts_FixtureRoot } from '../../../types/tests/rules/vitest/package-scripts.test.d.ts';

/**
 * Tests - Rules - Vitest - Package Scripts - Fixture Root.
 *
 * @since UNRELEASED
 */
const fixtureRoot: Tests_Rules_Vitest_PackageScripts_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-package-scripts-kit-'));

writeFileSync(join(fixtureRoot, 'package.json'), `${JSON.stringify({
  scripts: {
    'dev': 'dev',
    'dev:workspaces': 'dev:workspaces',
    'prod': 'prod',
    'prod:workspaces': 'prod:workspaces',
    'check': 'check',
    'check:workspaces': 'check:workspaces',
    'build': 'build',
    'build:workspaces': 'build:workspaces',
    'deploy': 'deploy',
    'deploy:workspaces': 'deploy:workspaces',
    'clean': 'clean',
    'clean:workspaces': 'clean:workspaces',
    'changelog': 'changelog',
    'recipes': 'recipes',
    'postinstall': 'postinstall',
  },
}, null, 2)}\n`);

registerPackageScriptsSuite({
  vitest,
  rootDir: fixtureRoot,
  requireRootScripts: true,
  enable: 'all',
});
