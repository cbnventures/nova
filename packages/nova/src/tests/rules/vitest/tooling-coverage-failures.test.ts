import {
  ok,
  rejects,
  strictEqual,
} from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach,
  describe,
  it,
} from 'vitest';

import { resetActiveVitest, setActiveVitest } from '../../../rules/vitest/internal/active-vitest.js';
import { registerToolingCoverageSuite } from '../../../rules/vitest/tooling-coverage/register.js';

import type {
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_Describes,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_FixtureRoot,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_Its,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_LintedFactory,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_Sentinel,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_SkipLibCheckFactory,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_TypeCheckedFactory,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_Describes,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_FixtureRoot,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_Its,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_Sentinel,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_TypeCheckedFactory,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_PassesAWorkspaceWithoutScripts_Describes,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_PassesAWorkspaceWithoutScripts_FixtureRoot,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_PassesAWorkspaceWithoutScripts_Its,
  Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_PassesAWorkspaceWithoutScripts_Sentinel,
} from '../../../types/tests/rules/vitest/tooling-coverage-failures.test.d.ts';

/**
 * Tests - Rules - Vitest - Tooling Coverage Failures - Tooling Coverage Failures.
 *
 * Drives the suite through a stand-in namespace so each rule's assertion can be run
 * directly and its failure observed.
 *
 * @since 0.49.0
 */
describe('tooling coverage failures', () => {
  afterEach(() => {
    resetActiveVitest();

    return;
  });

  it('fails every rule on incomplete tooling', async () => {
    const describes: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_Describes = [];
    const its: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_Its = [];
    const sentinel: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_Sentinel = {
      describe: (_name, factory) => {
        describes.push(factory);

        return;
      },
      it: (_name, factory) => {
        its.push(factory);

        return;
      },
    };
    const fixtureRoot: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-tooling-coverage-bad-'));

    mkdirSync(join(fixtureRoot, 'scripts'), { recursive: true });

    writeFileSync(join(fixtureRoot, 'scripts', 'checked.mjs'), 'export const checked = true;\n');
    writeFileSync(join(fixtureRoot, 'scripts', 'ignored.mjs'), 'export const ignored = true;\n');
    writeFileSync(join(fixtureRoot, 'eslint.config.mjs'), 'export default [{ ignores: [\'scripts/ignored.mjs\'] }];\n');
    writeFileSync(join(fixtureRoot, 'tsconfig.scripts.json'), `${JSON.stringify({
      compilerOptions: {
        allowJs: true,
        noEmit: true,
      },
      include: ['./scripts/checked.mjs'],
    }, null, 2)}\n`);
    writeFileSync(join(fixtureRoot, 'tsconfig.tests.json'), `${JSON.stringify({
      compilerOptions: {
        skipLibCheck: true,
      },
      files: [],
    }, null, 2)}\n`);

    setActiveVitest(sentinel);

    registerToolingCoverageSuite({
      vitest: sentinel,
      rootDir: fixtureRoot,
      enable: 'all',
    });

    for (const factory of describes) {
      await factory();
    }

    const lintedFactory: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_LintedFactory = its[0];
    const typeCheckedFactory: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_TypeCheckedFactory = its[1];
    const skipLibCheckFactory: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsEveryRuleOnIncompleteTooling_SkipLibCheckFactory = its[2];

    strictEqual(its.length, 3);
    ok(lintedFactory !== undefined);
    ok(typeCheckedFactory !== undefined);
    ok(skipLibCheckFactory !== undefined);

    await rejects(async () => {
      await lintedFactory();

      return;
    }, (error) => error instanceof Error && error.message.includes('ignored.mjs: the file is ignored by ESLint.'));

    await rejects(async () => {
      await typeCheckedFactory();

      return;
    }, (error) => error instanceof Error && error.message.includes('ignored.mjs: the file is not in the tsconfig.scripts.json file list.'));

    await rejects(async () => {
      await skipLibCheckFactory();

      return;
    }, (error) => error instanceof Error && error.message.includes('tsconfig.tests.json: "skipLibCheck" is turned on'));

    return;
  });

  it('fails when the scripts TSConfig is missing', async () => {
    const describes: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_Describes = [];
    const its: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_Its = [];
    const sentinel: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_Sentinel = {
      describe: (_name, factory) => {
        describes.push(factory);

        return;
      },
      it: (_name, factory) => {
        its.push(factory);

        return;
      },
    };
    const fixtureRoot: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-tooling-coverage-missing-'));

    mkdirSync(join(fixtureRoot, 'scripts'), { recursive: true });

    writeFileSync(join(fixtureRoot, 'scripts', 'build.mjs'), 'export const build = true;\n');

    setActiveVitest(sentinel);

    registerToolingCoverageSuite({
      vitest: sentinel,
      rootDir: fixtureRoot,
      enable: ['scripts-type-checked'],
    });

    for (const factory of describes) {
      await factory();
    }

    const typeCheckedFactory: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_FailsWhenTheScriptsTSConfigIsMissing_TypeCheckedFactory = its[0];

    strictEqual(its.length, 1);
    ok(typeCheckedFactory !== undefined);

    await rejects(async () => {
      await typeCheckedFactory();

      return;
    }, (error) => error instanceof Error && error.message.includes('tsconfig.scripts.json is missing, so 1 script file(s) are never type-checked.'));

    return;
  });

  it('passes a workspace without scripts', async () => {
    const describes: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_PassesAWorkspaceWithoutScripts_Describes = [];
    const its: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_PassesAWorkspaceWithoutScripts_Its = [];
    const sentinel: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_PassesAWorkspaceWithoutScripts_Sentinel = {
      describe: (_name, factory) => {
        describes.push(factory);

        return;
      },
      it: (_name, factory) => {
        its.push(factory);

        return;
      },
    };
    const fixtureRoot: Tests_Rules_Vitest_ToolingCoverageFailures_ToolingCoverageFailures_PassesAWorkspaceWithoutScripts_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-tooling-coverage-empty-'));

    setActiveVitest(sentinel);

    registerToolingCoverageSuite({
      vitest: sentinel,
      rootDir: fixtureRoot,
      enable: 'all',
    });

    for (const factory of describes) {
      await factory();
    }

    strictEqual(its.length, 3);

    for (const factory of its) {
      await factory();
    }

    return;
  });

  return;
});
