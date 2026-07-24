import {
  strictEqual,
  throws,
} from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import * as vitest from 'vitest';
import {
  beforeEach,
  describe,
  it,
} from 'vitest';

import {
  getActiveVitest,
  resetActiveVitest,
  setActiveVitest,
} from '../../../rules/vitest/active-vitest.js';
import { registerDotenvSuite } from '../../../rules/vitest/dotenv/register.js';

import type {
  Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Calls,
  Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_CapturedFactories,
  Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Factory,
  Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_FixtureRoot,
  Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Sentinel,
  Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ReturnsTheSameNamespaceThatWasSet_IsSame,
  Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenADifferentVitestNamespaceIsSet_Other,
  Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenNoVitestNamespaceHasBeenSet_Getter,
} from '../../../types/tests/rules/vitest/active-vitest.test.d.ts';

/**
 * Tests - Rules - Vitest - Active Vitest - Active Vitest.
 *
 * @since 0.21.0
 */
describe('activeVitest', () => {
  beforeEach(resetActiveVitest);

  it('throws when no vitest namespace has been set', () => {
    const getter: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenNoVitestNamespaceHasBeenSet_Getter = getActiveVitest;

    throws(() => getter());

    return;
  });

  it('returns the same namespace that was set', () => {
    setActiveVitest(vitest);

    const isSame: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ReturnsTheSameNamespaceThatWasSet_IsSame = getActiveVitest()['describe'] === vitest.describe;

    strictEqual(isSame, true);

    return;
  });

  it('throws when a different vitest namespace is set', () => {
    setActiveVitest(vitest);

    const other: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_ThrowsWhenADifferentVitestNamespaceIsSet_Other = {
      describe: () => {
        return;
      },
      it: () => {
        return;
      },
    };

    throws(() => setActiveVitest(other));

    return;
  });

  it('drives describe and it through the injected namespace', async () => {
    const calls: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Calls = [];
    const capturedFactories: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_CapturedFactories = [];
    const sentinel: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Sentinel = {
      describe: (_name, factory) => {
        calls.push('describe');

        capturedFactories.push(factory);

        return;
      },
      it: () => {
        calls.push('it');

        return;
      },
    };
    const fixtureRoot: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-active-vitest-'));

    writeFileSync(join(fixtureRoot, '.env'), 'FOO="bar"\n');

    setActiveVitest(sentinel);

    registerDotenvSuite({
      vitest: sentinel,
      enable: 'all',
      rootDir: fixtureRoot,
      envPaths: ['.env'],
    });

    const factory: Tests_Rules_Vitest_ActiveVitest_ActiveVitest_DrivesDescribeAndItThroughTheInjectedNamespace_Factory = capturedFactories[0];

    if (factory !== undefined) {
      await factory();
    }

    strictEqual(calls.includes('describe'), true);
    strictEqual(calls.includes('it'), true);

    return;
  });

  return;
});
