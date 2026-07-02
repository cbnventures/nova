import { describe } from 'vitest';

import { deriveDtsMapping } from '../../../lib/type-declaration-engine.js';
import {
  crossSectionReferences,
  filenameValidation,
  firstComeFirstServeOrder,
  identifierVsFileName,
  objectPropertyTypes,
  sectionAlphabeticalOrder,
  sectionCoverage,
  standaloneTypeFiles,
  variableTypeSymmetry,
} from './rules.js';

import type {
  Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_Config,
  Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_Returns,
  Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_Enable,
  Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_Mapping,
  Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_PackageRoot,
  Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_Resolved,
  Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_StandaloneTypeFilesConfig,
  Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_TypeRoots,
} from '../../../types/rules/vitest/type-declarations/register.d.ts';

/**
 * Rules - Vitest - Type Declarations - Register - Type Declaration Suite.
 *
 * Resolves the suite config (defaulting `packageRoot` to `process.cwd()`, `typeRoots`
 * to `['src']`, `standaloneTypeFiles` to `[]`, and `mapping` to the `typeRoots`-derived
 * mapping) and runs the nine inspector rules inside a single describe, gated by `enable`.
 *
 * @param {Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_Config} config - Config.
 *
 * @returns {Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_Returns}
 *
 * @since 0.20.0
 */
export function registerTypeDeclarationSuite(config: Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_Config): Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_Returns {
  describe('type declarations', async () => {
    const packageRoot: Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_PackageRoot = config['packageRoot'] ?? process.cwd();
    const typeRoots: Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_TypeRoots = config['typeRoots'] ?? ['src'];
    const standaloneTypeFilesConfig: Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_StandaloneTypeFilesConfig = config['standaloneTypeFiles'] ?? [];
    const mapping: Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_Mapping = config['mapping'] ?? deriveDtsMapping(typeRoots);
    const enable: Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_Enable = config['enable'];
    const resolved: Rules_Vitest_TypeDeclarations_Register_RegisterTypeDeclarationSuite_TypeDeclarations_Resolved = {
      packageRoot,
      typeRoots,
      standaloneTypeFiles: standaloneTypeFilesConfig,
      mapping,
    };

    await crossSectionReferences(resolved, enable);
    await sectionAlphabeticalOrder(resolved, enable);
    await firstComeFirstServeOrder(resolved, enable);
    await objectPropertyTypes(resolved, enable);
    await sectionCoverage(resolved, enable);
    await variableTypeSymmetry(resolved, enable);
    await identifierVsFileName(resolved, enable);
    await filenameValidation(resolved, enable);
    await standaloneTypeFiles(resolved, enable);

    return;
  });

  return;
}
