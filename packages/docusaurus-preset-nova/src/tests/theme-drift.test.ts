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
  TestsThemeDriftComponentsHaveDeclaredModulesComponentModules,
  TestsThemeDriftComponentsHaveDeclaredModulesDeclaredModules,
  TestsThemeDriftComponentsHaveDeclaredModulesDeclaredSet,
  TestsThemeDriftComponentsHaveDeclaredModulesMessage,
  TestsThemeDriftComponentsHaveDeclaredModulesMissing,
  TestsThemeDriftComponentsHaveDeclaredModulesModule,
  TestsThemeDriftDeclaredModulesHaveComponentsComponentModules,
  TestsThemeDriftDeclaredModulesHaveComponentsComponentSet,
  TestsThemeDriftDeclaredModulesHaveComponentsDeclaredModules,
  TestsThemeDriftDeclaredModulesHaveComponentsMessage,
  TestsThemeDriftDeclaredModulesHaveComponentsMissing,
  TestsThemeDriftDeclaredModulesHaveComponentsModule,
  TestsThemeDriftDiscoverThemeComponentsFiles,
  TestsThemeDriftDiscoverThemeComponentsIsVariant,
  TestsThemeDriftDiscoverThemeComponentsModuleName,
  TestsThemeDriftDiscoverThemeComponentsModules,
  TestsThemeDriftDiscoverThemeComponentsRelativePath,
  TestsThemeDriftDiscoverThemeComponentsReturns,
  TestsThemeDriftDiscoverThemeComponentsThemeDirectory,
  TestsThemeDriftExtractDeclaredModulesCapture,
  TestsThemeDriftExtractDeclaredModulesContent,
  TestsThemeDriftExtractDeclaredModulesMatch,
  TestsThemeDriftExtractDeclaredModulesModules,
  TestsThemeDriftExtractDeclaredModulesPattern,
  TestsThemeDriftExtractDeclaredModulesReturns,
  TestsThemeDriftExtractDeclaredModulesThemeDtsPath,
  TestsThemeDriftGetPackageRootCurrentFileDirectory,
  TestsThemeDriftGetPackageRootCurrentFilePath,
  TestsThemeDriftGetPackageRootReturns,
  TestsThemeDriftVariantDirectories,
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
const variantDirectories: TestsThemeDriftVariantDirectories = [
  'Footer/Commons',
  'Footer/Embassy',
  'Footer/Launchpad',
  'Footer/Ledger',
  'Navbar/Bridge',
  'Navbar/Canopy',
  'Navbar/Compass',
  'Navbar/Monolith',
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
function getPackageRoot(): TestsThemeDriftGetPackageRootReturns {
  const currentFilePath: TestsThemeDriftGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsThemeDriftGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

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
async function extractDeclaredModules(): TestsThemeDriftExtractDeclaredModulesReturns {
  const themeDtsPath: TestsThemeDriftExtractDeclaredModulesThemeDtsPath = resolve(getPackageRoot(), 'nova-theme.d.ts');
  const content: TestsThemeDriftExtractDeclaredModulesContent = await readFile(themeDtsPath, 'utf-8');
  const modules: TestsThemeDriftExtractDeclaredModulesModules = [];
  const pattern: TestsThemeDriftExtractDeclaredModulesPattern = new RegExp(LIB_REGEX_DECLARE_MODULE_THEME.source, 'g');
  let match: TestsThemeDriftExtractDeclaredModulesMatch = pattern.exec(content);

  while (match !== null) {
    const capture: TestsThemeDriftExtractDeclaredModulesCapture = match[1];

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
async function discoverThemeComponents(): TestsThemeDriftDiscoverThemeComponentsReturns {
  const themeDirectory: TestsThemeDriftDiscoverThemeComponentsThemeDirectory = resolve(getPackageRoot(), 'src', 'theme');
  const files: TestsThemeDriftDiscoverThemeComponentsFiles = await glob('**/index.tsx', { cwd: themeDirectory });
  const modules: TestsThemeDriftDiscoverThemeComponentsModules = [];

  for (const file of files) {
    const relativePath: TestsThemeDriftDiscoverThemeComponentsRelativePath = file.replace(`${sep}index.tsx`, '').replace('/index.tsx', '');
    const moduleName: TestsThemeDriftDiscoverThemeComponentsModuleName = `@theme/${relativePath.split(sep).join('/')}`;
    const isVariant: TestsThemeDriftDiscoverThemeComponentsIsVariant = variantDirectories.some((variant) => relativePath === variant || relativePath === variant.split('/').join(sep));

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
    const declaredModules: TestsThemeDriftDeclaredModulesHaveComponentsDeclaredModules = await extractDeclaredModules();
    const componentModules: TestsThemeDriftDeclaredModulesHaveComponentsComponentModules = await discoverThemeComponents();
    const componentSet: TestsThemeDriftDeclaredModulesHaveComponentsComponentSet = new Set(componentModules);
    const missing: TestsThemeDriftDeclaredModulesHaveComponentsMissing = [];

    for (const module of declaredModules) {
      const declaredModule: TestsThemeDriftDeclaredModulesHaveComponentsModule = module;

      if (componentSet.has(declaredModule) === false) {
        missing.push(declaredModule);
      }
    }

    const message: TestsThemeDriftDeclaredModulesHaveComponentsMessage = [
      'Declared modules missing component directories:',
      missing.join('\n'),
    ].join('\n');

    strictEqual(missing.length, 0, message);

    return;
  });

  it('every component directory has a declared module', async () => {
    const declaredModules: TestsThemeDriftComponentsHaveDeclaredModulesDeclaredModules = await extractDeclaredModules();
    const componentModules: TestsThemeDriftComponentsHaveDeclaredModulesComponentModules = await discoverThemeComponents();
    const declaredSet: TestsThemeDriftComponentsHaveDeclaredModulesDeclaredSet = new Set(declaredModules);
    const missing: TestsThemeDriftComponentsHaveDeclaredModulesMissing = [];

    for (const module of componentModules) {
      const componentModule: TestsThemeDriftComponentsHaveDeclaredModulesModule = module;

      if (declaredSet.has(componentModule) === false) {
        missing.push(componentModule);
      }
    }

    const message: TestsThemeDriftComponentsHaveDeclaredModulesMessage = [
      'Component directories missing declared modules:',
      missing.join('\n'),
    ].join('\n');

    strictEqual(missing.length, 0, message);

    return;
  });

  return;
});
