import { strictEqual } from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import {
  join,
  relative,
  resolve,
} from 'node:path';

import { ESLint } from 'eslint';
import { glob } from 'glob';
import {
  parseJsonConfigFileContent,
  readConfigFile,
  sys,
} from 'typescript';

import { getActiveVitest } from '../internal/active-vitest.js';
import { isEnabled } from '../internal/is-enabled.js';

import type {
  Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_Matched,
  Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_Returns,
  Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_RootDir,
  Rules_Vitest_ToolingCoverage_Rules_NormalizePath_FilePath,
  Rules_Vitest_ToolingCoverage_Rules_NormalizePath_Returns,
  Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Config,
  Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Enable,
  Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_Entries,
  Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_Failures,
  Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_FilePath,
  Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_Parsed,
  Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Returns,
  Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Config,
  Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_FilePath,
  Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Read,
  Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Returns,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Config,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Enable,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Returns,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_Eslint,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_Failures,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_IsIgnored,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_ScriptFiles,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Config,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Enable,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Returns,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_Failures,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_IncludedFiles,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_Parsed,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_ScriptFiles,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_TsconfigExists,
  Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_TsconfigPath,
} from '../../../types/rules/vitest/tooling-coverage/rules.d.ts';

/**
 * Rules - Vitest - Tooling Coverage - Rules - Discover Scripts.
 *
 * Lists every `.mjs` file under the workspace's `scripts/` directory as absolute,
 * sorted paths so the lint and type-check rules report files in a stable order.
 *
 * @param {Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_RootDir} rootDir - Root dir.
 *
 * @returns {Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_Returns}
 *
 * @since 0.49.0
 */
async function discoverScripts(rootDir: Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_RootDir): Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_Returns {
  const matched: Rules_Vitest_ToolingCoverage_Rules_DiscoverScripts_Matched = await glob('scripts/**/*.mjs', {
    cwd: rootDir,
    absolute: true,
    ignore: ['**/node_modules/**'],
  });

  return matched.map((filePath) => normalizePath(filePath)).sort();
}

/**
 * Rules - Vitest - Tooling Coverage - Rules - Normalize Path.
 *
 * Uses forward slashes so paths from the glob and from TypeScript compare equal
 * on every operating system.
 *
 * @param {Rules_Vitest_ToolingCoverage_Rules_NormalizePath_FilePath} filePath - File path.
 *
 * @returns {Rules_Vitest_ToolingCoverage_Rules_NormalizePath_Returns}
 *
 * @since 0.49.0
 */
function normalizePath(filePath: Rules_Vitest_ToolingCoverage_Rules_NormalizePath_FilePath): Rules_Vitest_ToolingCoverage_Rules_NormalizePath_Returns {
  return resolve(filePath).replaceAll('\\', '/');
}

/**
 * Rules - Vitest - Tooling Coverage - Rules - Parse Tsconfig.
 *
 * Reads one TSConfig with its whole "extends" chain resolved, or returns undefined
 * when the file cannot be read as JSON.
 *
 * @param {Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_FilePath} filePath - File path.
 *
 * @returns {Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Returns}
 *
 * @since 0.49.0
 */
function parseTsconfig(filePath: Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_FilePath): Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Returns {
  const read: Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Read = readConfigFile(filePath, sys.readFile);

  if (read['error'] !== undefined) {
    return undefined;
  }

  const config: Rules_Vitest_ToolingCoverage_Rules_ParseTsconfig_Config = read['config'];

  return parseJsonConfigFileContent(config, sys, resolve(filePath, '..'), undefined, filePath);
}

/**
 * Rules - Vitest - Tooling Coverage - Rules - No Skip Lib Check.
 *
 * Rule `no-skip-lib-check`: no `tsconfig*.json` in the workspace may turn on
 * `skipLibCheck`, directly or through a config it extends.
 *
 * @param {Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Config} config - Config.
 * @param {Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Returns}
 *
 * @since 0.49.0
 */
export function noSkipLibCheck(config: Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Config, enable: Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Enable): Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_Returns {
  if (isEnabled('no-skip-lib-check', enable) === false) {
    return;
  }

  getActiveVitest().it('no TSConfig turns on skipLibCheck', async () => {
    const entries: Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_Entries = await readdir(config['rootDir']);
    const failures: Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_Failures = [];

    for (const entry of entries.sort()) {
      if (entry.startsWith('tsconfig') === false || entry.endsWith('.json') === false) {
        continue;
      }

      const filePath: Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_FilePath = join(config['rootDir'], entry);
      const parsed: Rules_Vitest_ToolingCoverage_Rules_NoSkipLibCheck_NoTSConfigTurnsOnSkipLibCheck_Parsed = parseTsconfig(filePath);

      if (parsed === undefined) {
        failures.push(`${entry}: the file could not be read as a TSConfig.`);

        continue;
      }

      if (parsed.options.skipLibCheck === true) {
        failures.push(`${entry}: "skipLibCheck" is turned on, directly or through a config it extends.`);
      }
    }

    strictEqual(failures.length, 0, failures.join('\n'));

    return;
  });

  return;
}

/**
 * Rules - Vitest - Tooling Coverage - Rules - Scripts Linted.
 *
 * Rule `scripts-linted`: every `scripts/**\/*.mjs` file must be linted, so none of
 * them may be ignored by the workspace's ESLint configuration.
 *
 * @param {Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Config} config - Config.
 * @param {Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Returns}
 *
 * @since 0.49.0
 */
export function scriptsLinted(config: Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Config, enable: Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Enable): Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_Returns {
  if (isEnabled('scripts-linted', enable) === false) {
    return;
  }

  getActiveVitest().it('scripts are not ignored by ESLint', async () => {
    const scriptFiles: Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_ScriptFiles = await discoverScripts(config['rootDir']);

    // A workspace without scripts has nothing to lint, so ESLint is never loaded.
    if (scriptFiles.length === 0) {
      return;
    }

    const eslint: Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_Eslint = new ESLint({
      cwd: config['rootDir'],
    });
    const failures: Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_Failures = [];

    for (const scriptFile of scriptFiles) {
      const isIgnored: Rules_Vitest_ToolingCoverage_Rules_ScriptsLinted_ScriptsAreNotIgnoredByESLint_IsIgnored = await eslint.isPathIgnored(scriptFile);

      if (isIgnored === true) {
        failures.push(`${relative(config['rootDir'], scriptFile)}: the file is ignored by ESLint.`);
      }
    }

    strictEqual(failures.length, 0, failures.join('\n'));

    return;
  });

  return;
}

/**
 * Rules - Vitest - Tooling Coverage - Rules - Scripts Type Checked.
 *
 * Rule `scripts-type-checked`: every `scripts/**\/*.mjs` file must be in the file
 * list of the scripts TSConfig, so `check:types-scripts` type-checks all of them.
 *
 * @param {Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Config} config - Config.
 * @param {Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Returns}
 *
 * @since 0.49.0
 */
export function scriptsTypeChecked(config: Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Config, enable: Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Enable): Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_Returns {
  if (isEnabled('scripts-type-checked', enable) === false) {
    return;
  }

  getActiveVitest().it('scripts are included in the scripts TSConfig', async () => {
    const scriptFiles: Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_ScriptFiles = await discoverScripts(config['rootDir']);

    if (scriptFiles.length === 0) {
      return;
    }

    const tsconfigPath: Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_TsconfigPath = join(config['rootDir'], config['scriptsTsconfigPath']);

    const tsconfigExists: Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_TsconfigExists = existsSync(tsconfigPath);

    strictEqual(tsconfigExists, true, `${config['scriptsTsconfigPath']} is missing, so ${scriptFiles.length} script file(s) are never type-checked.`);

    const parsed: Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_Parsed = parseTsconfig(tsconfigPath);
    const includedFiles: Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_IncludedFiles = new Set((parsed === undefined) ? [] : parsed.fileNames.map((fileName) => normalizePath(fileName)));
    const failures: Rules_Vitest_ToolingCoverage_Rules_ScriptsTypeChecked_ScriptsAreIncludedInTheScriptsTSConfig_Failures = [];

    for (const scriptFile of scriptFiles) {
      if (includedFiles.has(scriptFile) === false) {
        failures.push(`${relative(config['rootDir'], scriptFile)}: the file is not in the ${config['scriptsTsconfigPath']} file list.`);
      }
    }

    strictEqual(failures.length, 0, failures.join('\n'));

    return;
  });

  return;
}
