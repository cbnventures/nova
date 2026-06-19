import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  dirname,
  resolve,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import { describe, it } from 'vitest';

import { LIB_REGEX_DECLARE_MODULE_THEME } from '../lib/regex.js';

import type {
  Tests_ThemeDrift_DiscoverThemeComponents_Files,
  Tests_ThemeDrift_DiscoverThemeComponents_IsVariant,
  Tests_ThemeDrift_DiscoverThemeComponents_ModuleName,
  Tests_ThemeDrift_DiscoverThemeComponents_Modules,
  Tests_ThemeDrift_DiscoverThemeComponents_RelativePath,
  Tests_ThemeDrift_DiscoverThemeComponents_Returns,
  Tests_ThemeDrift_DiscoverThemeComponents_ThemeDirectory,
  Tests_ThemeDrift_ExtractDeclaredModules_Capture,
  Tests_ThemeDrift_ExtractDeclaredModules_Content,
  Tests_ThemeDrift_ExtractDeclaredModules_Match,
  Tests_ThemeDrift_ExtractDeclaredModules_Modules,
  Tests_ThemeDrift_ExtractDeclaredModules_Pattern,
  Tests_ThemeDrift_ExtractDeclaredModules_Returns,
  Tests_ThemeDrift_ExtractDeclaredModules_ThemeDtsPath,
  Tests_ThemeDrift_GetPackageRoot_CurrentFileDirectory,
  Tests_ThemeDrift_GetPackageRoot_CurrentFilePath,
  Tests_ThemeDrift_GetPackageRoot_Returns,
  Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_ComponentModule,
  Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_ComponentModules,
  Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_DeclaredModules,
  Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_DeclaredSet,
  Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_Message,
  Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_Missing,
  Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_ComponentModules,
  Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_ComponentSet,
  Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_DeclaredModule,
  Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_DeclaredModules,
  Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_Message,
  Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_Missing,
  Tests_ThemeDrift_VariantDirectories,
} from '../types/tests/theme-drift.test.d.ts';

/**
 * Tests - Theme Drift - Variant Directories.
 *
 * Footer and navbar variant subdirectories that exist
 * as implementation details but are not exposed as
 * standalone theme module aliases in the type file.
 *
 * @since 0.15.0
 */
const variantDirectories: Tests_ThemeDrift_VariantDirectories = [
  'Footer/Commons',
  'Footer/Embassy',
  'Footer/Launchpad',
  'Footer/Ledger',
  'Navbar/Bridge',
  'Navbar/Canopy',
  'Navbar/Compass',
  'Navbar/Monolith',
  'Navbar/More',
];

/**
 * Tests - Theme Drift - Get Package Root.
 *
 * Resolves the package root directory from the current
 * test file location by traversing two levels up from
 * the tests directory to reach the package root.
 *
 * @since 0.15.0
 */
function getPackageRoot(): Tests_ThemeDrift_GetPackageRoot_Returns {
  const currentFilePath: Tests_ThemeDrift_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_ThemeDrift_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Theme Drift - Extract Declared Modules.
 *
 * Reads the ambient theme declaration file and extracts
 * all module names that follow the theme alias pattern
 * while filtering out non-theme third-party modules.
 *
 * @since 0.15.0
 */
async function extractDeclaredModules(): Tests_ThemeDrift_ExtractDeclaredModules_Returns {
  const themeDtsPath: Tests_ThemeDrift_ExtractDeclaredModules_ThemeDtsPath = resolve(getPackageRoot(), 'nova-theme.d.ts');
  const content: Tests_ThemeDrift_ExtractDeclaredModules_Content = await readFile(themeDtsPath, 'utf-8');
  const modules: Tests_ThemeDrift_ExtractDeclaredModules_Modules = [];
  const pattern: Tests_ThemeDrift_ExtractDeclaredModules_Pattern = new RegExp(LIB_REGEX_DECLARE_MODULE_THEME.source, 'g');
  let match: Tests_ThemeDrift_ExtractDeclaredModules_Match = pattern.exec(content);

  while (match !== null) {
    const capture: Tests_ThemeDrift_ExtractDeclaredModules_Capture = match[1];

    if (capture !== undefined) {
      modules.push(capture);
    }

    match = pattern.exec(content);
  }

  return modules;
}

/**
 * Tests - Theme Drift - Discover Theme Components.
 *
 * Scans the theme source directory for all component
 * directories that contain an index entry point and
 * converts their file paths to module alias names.
 *
 * @since 0.15.0
 */
async function discoverThemeComponents(): Tests_ThemeDrift_DiscoverThemeComponents_Returns {
  const themeDirectory: Tests_ThemeDrift_DiscoverThemeComponents_ThemeDirectory = resolve(getPackageRoot(), 'src', 'theme');
  const files: Tests_ThemeDrift_DiscoverThemeComponents_Files = await glob('**/index.tsx', { cwd: themeDirectory });
  const modules: Tests_ThemeDrift_DiscoverThemeComponents_Modules = [];

  for (const file of files) {
    const relativePath: Tests_ThemeDrift_DiscoverThemeComponents_RelativePath = file.replace(`${sep}index.tsx`, '').replace('/index.tsx', '');
    const moduleName: Tests_ThemeDrift_DiscoverThemeComponents_ModuleName = `@theme/${relativePath.split(sep).join('/')}`;
    const isVariant: Tests_ThemeDrift_DiscoverThemeComponents_IsVariant = variantDirectories.some((variant) => relativePath === variant || relativePath === variant.split('/').join(sep));

    if (isVariant === false) {
      modules.push(moduleName);
    }
  }

  return modules;
}

/**
 * Tests - Theme Drift - Theme Drift.
 *
 * Verifies bidirectional consistency between the ambient
 * module declarations in the theme type file and the
 * actual component directories in the source tree.
 *
 * @since 0.15.0
 */
describe('theme drift', () => {
  it('every declared module has a component directory', async () => {
    const declaredModules: Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_DeclaredModules = await extractDeclaredModules();
    const componentModules: Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_ComponentModules = await discoverThemeComponents();
    const componentSet: Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_ComponentSet = new Set(componentModules);
    const missing: Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_Missing = [];

    for (const module of declaredModules) {
      const declaredModule: Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_DeclaredModule = module;

      if (componentSet.has(declaredModule) === false) {
        missing.push(declaredModule);
      }
    }

    const message: Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_Message = [
      'Declared modules missing component directories:',
      missing.join('\n'),
    ].join('\n');

    strictEqual(missing.length, 0, message);

    return;
  });

  it('every component directory has a declared module', async () => {
    const declaredModules: Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_DeclaredModules = await extractDeclaredModules();
    const componentModules: Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_ComponentModules = await discoverThemeComponents();
    const declaredSet: Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_DeclaredSet = new Set(declaredModules);
    const missing: Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_Missing = [];

    for (const module of componentModules) {
      const componentModule: Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_ComponentModule = module;

      if (declaredSet.has(componentModule) === false) {
        missing.push(componentModule);
      }
    }

    const message: Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_Message = [
      'Component directories missing declared modules:',
      missing.join('\n'),
    ].join('\n');

    strictEqual(missing.length, 0, message);

    return;
  });

  return;
});
