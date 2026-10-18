import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';

import {
  describe,
  it,
} from 'vitest';

import {
  findPackageScriptContractViolations,
  orderPackageScripts,
  packageScriptForbiddenTopLevelScriptRecommendations,
  packageScriptForbiddenTopLevelScripts,
} from '../../lib/package-scripts.js';

import type {
  Tests_Lib_PackageScripts_LibPackageScripts_AcceptsACompleteOrderedRootContractAndDistinctProjectCommands_Input,
  Tests_Lib_PackageScripts_LibPackageScripts_AcceptsACompleteOrderedRootContractAndDistinctProjectCommands_Violations,
  Tests_Lib_PackageScripts_LibPackageScripts_OrdersCommandFamiliesAuthoredChildrenHooksCustomCommandsAndNpmLifecycleScripts_Input,
  Tests_Lib_PackageScripts_LibPackageScripts_OrdersCommandFamiliesAuthoredChildrenHooksCustomCommandsAndNpmLifecycleScripts_Ordered,
  Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_AmbiguousViolations,
  Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_ExpectedAmbiguousViolations,
  Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_ForbiddenScriptsInput,
  Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_HasRecommendations,
  Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_Violations,
} from '../../types/tests/lib/package-scripts.test.d.ts';

/**
 * Tests - Lib - Package Scripts - Lib Package Scripts.
 *
 * Proves one shared contract owns physical ordering and validation for recipes,
 * scaffolds, and the public consumer Vitest registration.
 *
 * @since 0.32.0
 */
describe('Lib package scripts', () => {
  it('orders command families, authored children, hooks, custom commands, and npm lifecycle scripts', () => {
    const input: Tests_Lib_PackageScripts_LibPackageScripts_OrdersCommandFamiliesAuthoredChildrenHooksCustomCommandsAndNpmLifecycleScripts_Input = {
      'postinstall': 'postinstall',
      'custom:second': 'custom:second',
      'postcustom:first': 'postcustom:first',
      'build:second': 'build:second',
      'prebuild:second': 'prebuild:second',
      'preflight': 'preflight',
      'build': 'build',
      'custom': 'custom',
      'prebuild': 'prebuild',
      'dev:watch': 'dev:watch',
      'dev': 'dev',
      'predev:watch': 'predev:watch',
      'recipes': 'recipes',
      'changelog': 'changelog',
      'i18n:sync': 'i18n:sync',
      'i18n': 'i18n',
      'custom:first': 'custom:first',
      'precustom:first': 'precustom:first',
      'postcustom': 'postcustom',
      'preinstall': 'preinstall',
      'install': 'install',
    };
    const ordered: Tests_Lib_PackageScripts_LibPackageScripts_OrdersCommandFamiliesAuthoredChildrenHooksCustomCommandsAndNpmLifecycleScripts_Ordered = orderPackageScripts(input);

    deepStrictEqual(Object.keys(ordered), [
      'dev',
      'predev:watch',
      'dev:watch',
      'prebuild',
      'build',
      'prebuild:second',
      'build:second',
      'changelog',
      'recipes',
      'i18n',
      'i18n:sync',
      'custom',
      'custom:second',
      'precustom:first',
      'custom:first',
      'postcustom:first',
      'postcustom',
      'preflight',
      'preinstall',
      'install',
      'postinstall',
    ]);

    return;
  });

  it('reports ambiguous, missing, recursive, and out-of-order script structures', () => {
    const forbiddenScriptsInput: Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_ForbiddenScriptsInput = Object.fromEntries(packageScriptForbiddenTopLevelScripts.map((scriptName) => [
      scriptName,
      scriptName,
    ]));
    const violations: Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_Violations = findPackageScriptContractViolations({
      ...forbiddenScriptsInput,
      'check:test': 'check:test',
      'preprebuild': 'preprebuild',
      'prebuild': 'prebuild',
      'build': 'build',
      'build:app': 'build:app',
    }, {
      requireRootScripts: true,
      requireI18n: true,
    });
    const ambiguousViolations: Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_AmbiguousViolations = violations.filter((violation) => violation.includes('is ambiguous'));
    const expectedAmbiguousViolations: Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_ExpectedAmbiguousViolations = packageScriptForbiddenTopLevelScripts.map((scriptName) => `Top-level script "${scriptName}" is ambiguous. ${packageScriptForbiddenTopLevelScriptRecommendations[scriptName]}`);
    const hasRecommendations: Tests_Lib_PackageScripts_LibPackageScripts_ReportsAmbiguousMissingRecursiveAndOutOfOrderScriptStructures_HasRecommendations = Object.values(packageScriptForbiddenTopLevelScriptRecommendations).every((recommendation) => recommendation.trim().length > 0);

    strictEqual(violations.some((violation) => violation.includes('canonical order')), true);
    deepStrictEqual(ambiguousViolations, expectedAmbiguousViolations);
    strictEqual(hasRecommendations, true);
    strictEqual(violations.some((violation) => violation.includes('requires parent dispatcher "check"')), true);
    strictEqual(violations.some((violation) => violation.includes('recursively wraps lifecycle hook')), true);
    strictEqual(violations.some((violation) => violation.includes('Project root requires script "dev"')), true);
    strictEqual(violations.some((violation) => violation.includes('Docusaurus workspaces require script "i18n"')), true);

    return;
  });

  it('accepts a complete ordered root contract and distinct project commands', () => {
    const input: Tests_Lib_PackageScripts_LibPackageScripts_AcceptsACompleteOrderedRootContractAndDistinctProjectCommands_Input = {
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
      'manage': 'manage',
      'tail': 'tail',
      'repl': 'repl',
      'test-api': 'test-api',
      'scaffold-versions': 'scaffold-versions',
      'postinstall': 'postinstall',
    };
    const violations: Tests_Lib_PackageScripts_LibPackageScripts_AcceptsACompleteOrderedRootContractAndDistinctProjectCommands_Violations = findPackageScriptContractViolations(input, {
      requireRootScripts: true,
    });

    deepStrictEqual(violations, []);

    return;
  });

  return;
});
