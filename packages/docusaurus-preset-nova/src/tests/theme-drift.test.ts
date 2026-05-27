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
  Tests_ThemeDrift_ComponentsHaveDeclaredModulesComponentModules,
  Tests_ThemeDrift_ComponentsHaveDeclaredModulesDeclaredModules,
  Tests_ThemeDrift_ComponentsHaveDeclaredModulesDeclaredSet,
  Tests_ThemeDrift_ComponentsHaveDeclaredModulesMessage,
  Tests_ThemeDrift_ComponentsHaveDeclaredModulesMissing,
  Tests_ThemeDrift_ComponentsHaveDeclaredModulesModule,
  Tests_ThemeDrift_DeclaredModulesHaveComponentsComponentModules,
  Tests_ThemeDrift_DeclaredModulesHaveComponentsComponentSet,
  Tests_ThemeDrift_DeclaredModulesHaveComponentsDeclaredModules,
  Tests_ThemeDrift_DeclaredModulesHaveComponentsMessage,
  Tests_ThemeDrift_DeclaredModulesHaveComponentsMissing,
  Tests_ThemeDrift_DeclaredModulesHaveComponentsModule,
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
    const declaredModules: Tests_ThemeDrift_DeclaredModulesHaveComponentsDeclaredModules = await extractDeclaredModules();
    const componentModules: Tests_ThemeDrift_DeclaredModulesHaveComponentsComponentModules = await discoverThemeComponents();
    const componentSet: Tests_ThemeDrift_DeclaredModulesHaveComponentsComponentSet = new Set(componentModules);
    const missing: Tests_ThemeDrift_DeclaredModulesHaveComponentsMissing = [];

    for (const module of declaredModules) {
      const declaredModule: Tests_ThemeDrift_DeclaredModulesHaveComponentsModule = module;

      if (componentSet.has(declaredModule) === false) {
        missing.push(declaredModule);
      }
    }

    const message: Tests_ThemeDrift_DeclaredModulesHaveComponentsMessage = [
      'Declared modules missing component directories:',
      missing.join('\n'),
    ].join('\n');

    strictEqual(missing.length, 0, message);

    return;
  });

  it('every component directory has a declared module', async () => {
    const declaredModules: Tests_ThemeDrift_ComponentsHaveDeclaredModulesDeclaredModules = await extractDeclaredModules();
    const componentModules: Tests_ThemeDrift_ComponentsHaveDeclaredModulesComponentModules = await discoverThemeComponents();
    const declaredSet: Tests_ThemeDrift_ComponentsHaveDeclaredModulesDeclaredSet = new Set(declaredModules);
    const missing: Tests_ThemeDrift_ComponentsHaveDeclaredModulesMissing = [];

    for (const module of componentModules) {
      const componentModule: Tests_ThemeDrift_ComponentsHaveDeclaredModulesModule = module;

      if (declaredSet.has(componentModule) === false) {
        missing.push(componentModule);
      }
    }

    const message: Tests_ThemeDrift_ComponentsHaveDeclaredModulesMessage = [
      'Component directories missing declared modules:',
      missing.join('\n'),
    ].join('\n');

    strictEqual(missing.length, 0, message);

    return;
  });

  return;
});
