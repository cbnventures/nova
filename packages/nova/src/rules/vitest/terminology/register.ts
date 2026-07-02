import { join } from 'node:path';

import { describe } from 'vitest';

import { discoverContentFiles } from '../../../lib/file-discovery.js';
import {
  anchorResolves,
  childrenNonempty,
  componentValidation,
  titleAttrPresent,
  toAttrPresent,
  toPointsToBase,
} from './rules.js';

import type {
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Config,
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Returns,
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_ComponentName,
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_ContentDirs,
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_Enable,
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_ExpectedBase,
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_Files,
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_Resolved,
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_RootDir,
  Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_TerminologyPath,
} from '../../../types/rules/vitest/terminology/register.d.ts';

/**
 * Rules - Vitest - Terminology - Register - Terminology Suite.
 *
 * Resolves the suite config (defaulting the content dirs, terminology source page, expected
 * base route, root, and component name to Nova's layout) and runs the terminology checks
 * inside a single describe, each gated by `enable`.
 *
 * @param {Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Config} config - Config.
 *
 * @returns {Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Returns}
 *
 * @since 0.20.0
 */
export function registerTerminologySuite(config: Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Config): Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Returns {
  describe('terminology', async () => {
    const rootDir: Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_RootDir = config['rootDir'] ?? process.cwd();
    const contentDirs: Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_ContentDirs = config['contentDirs'] ?? [
      'docs',
      'blog',
    ];
    const terminologyPath: Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_TerminologyPath = config['terminologyPath'] ?? join(rootDir, 'docs', 'quickstart', 'terminology.mdx');
    const expectedBase: Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_ExpectedBase = config['expectedBase'] ?? '/docs/quickstart/terminology';
    const componentName: Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_ComponentName = config['componentName'] ?? 'Terminology';
    const enable: Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_Enable = config['enable'];
    const files: Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_Files = await discoverContentFiles({
      rootDir,
      contentDirs,
    });
    const resolved: Rules_Vitest_Terminology_Register_RegisterTerminologySuite_Terminology_Resolved = {
      contentDirs,
      terminologyPath,
      expectedBase,
      rootDir,
      componentName,
      files,
    };

    await titleAttrPresent(resolved, enable);
    await toAttrPresent(resolved, enable);
    await childrenNonempty(resolved, enable);
    await toPointsToBase(resolved, enable);
    await anchorResolves(resolved, enable);
    componentValidation(resolved, enable);

    return;
  });

  return;
}
