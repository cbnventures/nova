import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { findPackageScriptContractViolations } from '../../../lib/package-scripts.js';
import { getActiveVitest } from '../internal/active-vitest.js';
import { isEnabled } from '../internal/is-enabled.js';

import type {
  Rules_Vitest_PackageScripts_Rules_CanonicalContract_Config,
  Rules_Vitest_PackageScripts_Rules_CanonicalContract_Enable,
  Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_FilePath,
  Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_PackageJson,
  Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_Raw,
  Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_Scripts,
  Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_ScriptsValue,
  Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_Violations,
  Rules_Vitest_PackageScripts_Rules_CanonicalContract_Returns,
} from '../../../types/rules/vitest/package-scripts/rules.d.ts';

/**
 * Rules - Vitest - Package Scripts - Rules - Canonical Contract.
 *
 * Reads one package.json and verifies its scripts use Nova's canonical command
 * families, hook placement, custom-command grouping, and npm lifecycle tail.
 *
 * @param {Rules_Vitest_PackageScripts_Rules_CanonicalContract_Config} config - Config.
 * @param {Rules_Vitest_PackageScripts_Rules_CanonicalContract_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_PackageScripts_Rules_CanonicalContract_Returns}
 *
 * @since 0.32.0
 */
export function canonicalContract(config: Rules_Vitest_PackageScripts_Rules_CanonicalContract_Config, enable: Rules_Vitest_PackageScripts_Rules_CanonicalContract_Enable): Rules_Vitest_PackageScripts_Rules_CanonicalContract_Returns {
  if (isEnabled('scripts-follow-canonical-contract', enable) === false) {
    return;
  }

  getActiveVitest().it('package scripts follow the canonical Nova contract', async () => {
    const filePath: Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_FilePath = join(config['rootDir'], config['packageJsonPath']);
    const raw: Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_Raw = await readFile(filePath, 'utf-8');
    const packageJson: Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_PackageJson = JSON.parse(raw) as Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_PackageJson;
    const scriptsValue: Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_ScriptsValue = packageJson['scripts'];
    const scripts: Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_Scripts = (
      typeof scriptsValue === 'object'
      && scriptsValue !== null
      && Array.isArray(scriptsValue) === false
    ) ? scriptsValue as Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_Scripts : {};
    const violations: Rules_Vitest_PackageScripts_Rules_CanonicalContract_PackageScriptsFollowTheCanonicalNovaContract_Violations = findPackageScriptContractViolations(scripts, {
      requireRootScripts: config['requireRootScripts'],
      requireI18n: config['requireI18n'],
    });

    strictEqual(violations.length, 0, violations.join('\n'));

    return;
  });

  return;
}
