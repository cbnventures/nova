import { strictEqual } from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ModuleKind,
  parseJsonConfigFileContent,
  readConfigFile,
  sys,
} from 'typescript';
import { describe, it } from 'vitest';

import type {
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_ExportsMap,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_OwningProject,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_OwningProjects,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageJson,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageJsonPath,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageJsonText,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageRoot,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageType,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_Projects,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_Returns,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_SourcePath,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_Target,
  Tests_ExportsModuleFormat_CollectNonEsmPackageExports_Violations,
  Tests_ExportsModuleFormat_EmitsEsm_ModuleKind,
  Tests_ExportsModuleFormat_EmitsEsm_PackageType,
  Tests_ExportsModuleFormat_EmitsEsm_Returns,
  Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBuildFacingPackageExportAsEsm_Message,
  Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBuildFacingPackageExportAsEsm_PackageRoot,
  Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBuildFacingPackageExportAsEsm_Violations,
  Tests_ExportsModuleFormat_GetPackageRoot_CurrentFileDirectory,
  Tests_ExportsModuleFormat_GetPackageRoot_CurrentFilePath,
  Tests_ExportsModuleFormat_GetPackageRoot_Returns,
  Tests_ExportsModuleFormat_LoadProject_ConfigPath,
  Tests_ExportsModuleFormat_LoadProject_ModuleKind,
  Tests_ExportsModuleFormat_LoadProject_PackageRoot,
  Tests_ExportsModuleFormat_LoadProject_PackageType,
  Tests_ExportsModuleFormat_LoadProject_Parsed,
  Tests_ExportsModuleFormat_LoadProject_ReadResult,
  Tests_ExportsModuleFormat_LoadProject_Returns,
  Tests_ExportsModuleFormat_LoadProject_TsconfigName,
  Tests_ExportsModuleFormat_ResolveExportSource_Candidate,
  Tests_ExportsModuleFormat_ResolveExportSource_Extensions,
  Tests_ExportsModuleFormat_ResolveExportSource_PackageRoot,
  Tests_ExportsModuleFormat_ResolveExportSource_RelativeSource,
  Tests_ExportsModuleFormat_ResolveExportSource_Returns,
  Tests_ExportsModuleFormat_ResolveExportSource_Target,
  Tests_ExportsModuleFormat_ResolveExportSource_WithoutBuild,
} from '../types/tests/exports-module-format.test.d.ts';

/**
 * Tests - Exports Module Format - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the current test
 * file location.
 *
 * @returns {Tests_ExportsModuleFormat_GetPackageRoot_Returns}
 *
 * @since 0.21.0
 */
function getPackageRoot(): Tests_ExportsModuleFormat_GetPackageRoot_Returns {
  const currentFilePath: Tests_ExportsModuleFormat_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_ExportsModuleFormat_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Exports Module Format - Emits Esm.
 *
 * Decides whether a project's resolved `module` setting emits ECMAScript
 * modules. `CommonJS` never does; the `Node16` and `NodeNext` resolvers
 * emit ESM only when the package declares `"type": "module"`; every `ES*`
 * target emits ESM unconditionally.
 *
 * @param {Tests_ExportsModuleFormat_EmitsEsm_ModuleKind}  moduleKind  - Module kind.
 * @param {Tests_ExportsModuleFormat_EmitsEsm_PackageType} packageType - Package type.
 *
 * @returns {Tests_ExportsModuleFormat_EmitsEsm_Returns}
 *
 * @since 0.21.0
 */
function emitsEsm(moduleKind: Tests_ExportsModuleFormat_EmitsEsm_ModuleKind, packageType: Tests_ExportsModuleFormat_EmitsEsm_PackageType): Tests_ExportsModuleFormat_EmitsEsm_Returns {
  if (moduleKind === ModuleKind.Node16 || moduleKind === ModuleKind.NodeNext) {
    return packageType === 'module';
  }

  return moduleKind >= ModuleKind.ES2015 && moduleKind <= ModuleKind.ESNext;
}

/**
 * Tests - Exports Module Format - Load Project.
 *
 * Resolves one `tsconfig.*.json` build project to the absolute source
 * files it compiles and whether it emits ESM, so an export target can be
 * traced back to the project that decides its module format.
 *
 * @param {Tests_ExportsModuleFormat_LoadProject_PackageRoot}  packageRoot  - Package root.
 * @param {Tests_ExportsModuleFormat_LoadProject_TsconfigName} tsconfigName - Tsconfig name.
 * @param {Tests_ExportsModuleFormat_LoadProject_PackageType}  packageType  - Package type.
 *
 * @returns {Tests_ExportsModuleFormat_LoadProject_Returns}
 *
 * @since 0.21.0
 */
function loadProject(packageRoot: Tests_ExportsModuleFormat_LoadProject_PackageRoot, tsconfigName: Tests_ExportsModuleFormat_LoadProject_TsconfigName, packageType: Tests_ExportsModuleFormat_LoadProject_PackageType): Tests_ExportsModuleFormat_LoadProject_Returns {
  const configPath: Tests_ExportsModuleFormat_LoadProject_ConfigPath = resolve(packageRoot, tsconfigName);
  const readResult: Tests_ExportsModuleFormat_LoadProject_ReadResult = readConfigFile(configPath, (fileName) => sys.readFile(fileName));

  if (readResult['error'] !== undefined || readResult['config'] === undefined) {
    throw new Error(`exports-module-format: unable to read ${tsconfigName}`);
  }

  const parsed: Tests_ExportsModuleFormat_LoadProject_Parsed = parseJsonConfigFileContent(readResult['config'], sys, dirname(configPath));
  const moduleKind: Tests_ExportsModuleFormat_LoadProject_ModuleKind = parsed['options']['module'] ?? ModuleKind.None;

  return {
    name: tsconfigName,
    esm: emitsEsm(moduleKind, packageType),
    files: new Set(parsed['fileNames']),
  };
}

/**
 * Tests - Exports Module Format - Resolve Export Source.
 *
 * Maps a build-facing export target (for example `./build/src/icons.js`)
 * back to the source file that produced it, trying the `.ts` then `.tsx`
 * extensions. Returns `undefined` when no source file exists.
 *
 * @param {Tests_ExportsModuleFormat_ResolveExportSource_PackageRoot} packageRoot - Package root.
 * @param {Tests_ExportsModuleFormat_ResolveExportSource_Target}      target      - Target.
 *
 * @returns {Tests_ExportsModuleFormat_ResolveExportSource_Returns}
 *
 * @since 0.21.0
 */
function resolveExportSource(packageRoot: Tests_ExportsModuleFormat_ResolveExportSource_PackageRoot, target: Tests_ExportsModuleFormat_ResolveExportSource_Target): Tests_ExportsModuleFormat_ResolveExportSource_Returns {
  const withoutBuild: Tests_ExportsModuleFormat_ResolveExportSource_WithoutBuild = target.replace('./build/', '');
  const relativeSource: Tests_ExportsModuleFormat_ResolveExportSource_RelativeSource = (withoutBuild.endsWith('.js') === true) ? withoutBuild.slice(0, withoutBuild.length - '.js'.length) : withoutBuild;
  const extensions: Tests_ExportsModuleFormat_ResolveExportSource_Extensions = [
    '.ts',
    '.tsx',
  ];

  for (const extension of extensions) {
    const candidate: Tests_ExportsModuleFormat_ResolveExportSource_Candidate = resolve(packageRoot, `${relativeSource}${extension}`);

    if (existsSync(candidate) === true) {
      return candidate;
    }
  }

  return undefined;
}

/**
 * Tests - Exports Module Format - Collect Non Esm Package Exports.
 *
 * Walks the package `exports` map and returns a human-readable violation
 * for every build project or built JavaScript export that is not compiled
 * as ESM. The project check includes the CLI, while the export check covers
 * the preset and theme entry points loaded by Docusaurus in Node as well as
 * browser-facing subpaths. The `./types/*` entries point at hand-written
 * declarations and are skipped.
 *
 * @param {Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageRoot} packageRoot - Package root.
 *
 * @returns {Tests_ExportsModuleFormat_CollectNonEsmPackageExports_Returns}
 *
 * @since 0.21.0
 */
async function collectNonEsmPackageExports(packageRoot: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageRoot): Tests_ExportsModuleFormat_CollectNonEsmPackageExports_Returns {
  const packageJsonPath: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageJsonPath = resolve(packageRoot, 'package.json');
  const packageJsonText: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageJsonText = await readFile(packageJsonPath, 'utf-8');
  const packageJson: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageJson = JSON.parse(packageJsonText) as Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageJson;
  const packageType: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_PackageType = packageJson['type'];
  const exportsMap: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_ExportsMap = packageJson['exports'] ?? {};
  const violations: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_Violations = [];

  if (packageType !== 'module') {
    violations.push(`package.json: expected "type" to be "module", found ${JSON.stringify(packageType)}`);
  }

  const projects: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_Projects = [
    'tsconfig.theme.json',
    'tsconfig.plugin.json',
    'tsconfig.worker.json',
    'tsconfig.cli.json',
  ].map((tsconfigName) => loadProject(packageRoot, tsconfigName, packageType));

  for (const project of projects) {
    if (project['esm'] === false) {
      violations.push(`${project['name']}: build project compiles as CommonJS`);
    }
  }

  for (const subpath of Object.keys(exportsMap)) {
    const target: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_Target = exportsMap[subpath];

    if (typeof target !== 'string') {
      throw new Error(`exports-module-format: conditional export "${subpath}" is unsupported; extend this guard to classify it`);
    }

    if (target.startsWith('./build/') === false) {
      continue;
    }

    const sourcePath: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_SourcePath = resolveExportSource(packageRoot, target);

    if (sourcePath === undefined) {
      violations.push(`${subpath} -> ${target}: no matching source file found`);

      continue;
    }

    const owningProjects: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_OwningProjects = projects.filter((project) => project['files'].has(sourcePath));

    if (owningProjects.length !== 1) {
      violations.push(`${subpath} -> ${target}: expected exactly one compiling tsconfig, found ${owningProjects.length} (${owningProjects.map((project) => project['name']).join(', ')})`);

      continue;
    }

    const owningProject: Tests_ExportsModuleFormat_CollectNonEsmPackageExports_OwningProject = owningProjects[0];

    if (owningProject === undefined) {
      continue;
    }

    if (owningProject['esm'] === false) {
      violations.push(`${subpath} -> ${target}: source ${sourcePath} is compiled as CommonJS by ${owningProject['name']}`);
    }
  }

  return violations;
}

/**
 * Tests - Exports Module Format - Exports Module Format.
 *
 * Guards the package's public `exports` surface against shipping a
 * CommonJS module at any Node or browser entry point. The package declares
 * one explicit ESM boundary, so the preset, theme plugin, CLI, and browser
 * surfaces must all remain native ESM.
 *
 * @since 0.21.0
 */
describe('exportsModuleFormat', () => {
  it('emits every build-facing package export as esm', async () => {
    const packageRoot: Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBuildFacingPackageExportAsEsm_PackageRoot = getPackageRoot();
    const violations: Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBuildFacingPackageExportAsEsm_Violations = await collectNonEsmPackageExports(packageRoot);
    const message: Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBuildFacingPackageExportAsEsm_Message = [
      'Build-facing package exports must share one explicit ESM boundary, but these do not:',
      ...violations.map((violation) => `  ${violation}`),
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  return;
});
