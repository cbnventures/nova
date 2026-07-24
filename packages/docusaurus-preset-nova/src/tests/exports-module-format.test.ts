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
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_ExportsMap,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_NodeExports,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_OwningProject,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_OwningProjects,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJson,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJsonPath,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJsonText,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageRoot,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageType,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Projects,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Returns,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_SourcePath,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Target,
  Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Violations,
  Tests_ExportsModuleFormat_EmitsEsm_ModuleKind,
  Tests_ExportsModuleFormat_EmitsEsm_PackageType,
  Tests_ExportsModuleFormat_EmitsEsm_Returns,
  Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBrowserFacingPackageExportAsEsm_Message,
  Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBrowserFacingPackageExportAsEsm_PackageRoot,
  Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBrowserFacingPackageExportAsEsm_Violations,
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
 * Tests - Exports Module Format - Collect Non Esm Browser Exports.
 *
 * Walks the package `exports` map and returns a human-readable violation
 * for every browser-facing export whose source is not compiled as ESM.
 * The `.` (Docusaurus preset) and `./theme` (theme plugin registration)
 * entries are loaded by Node at build time, so they are excluded; every
 * other build-facing subpath is a client surface and must emit ESM. The
 * `./types/*` entries point at hand-written declarations and are skipped.
 * New build-facing exports default to browser, so an unclassified node
 * entry fails loudly here until it is added to the exclusion set.
 *
 * @param {Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageRoot} packageRoot - Package root.
 *
 * @returns {Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Returns}
 *
 * @since 0.21.0
 */
async function collectNonEsmBrowserExports(packageRoot: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageRoot): Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Returns {
  const packageJsonPath: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJsonPath = resolve(packageRoot, 'package.json');
  const packageJsonText: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJsonText = await readFile(packageJsonPath, 'utf-8');
  const packageJson: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJson = JSON.parse(packageJsonText) as Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageJson;
  const packageType: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_PackageType = packageJson['type'];
  const exportsMap: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_ExportsMap = packageJson['exports'] ?? {};
  const nodeExports: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_NodeExports = new Set([
    '.',
    './theme',
  ]);
  const projects: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Projects = [
    'tsconfig.theme.json',
    'tsconfig.plugin.json',
    'tsconfig.worker.json',
    'tsconfig.cli.json',
  ].map((tsconfigName) => loadProject(packageRoot, tsconfigName, packageType));
  const violations: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Violations = [];

  for (const subpath of Object.keys(exportsMap)) {
    const target: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_Target = exportsMap[subpath];

    if (typeof target !== 'string') {
      throw new Error(`exports-module-format: conditional export "${subpath}" is unsupported; extend this guard to classify it`);
    }

    if (nodeExports.has(subpath) === true || target.startsWith('./build/') === false) {
      continue;
    }

    const sourcePath: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_SourcePath = resolveExportSource(packageRoot, target);

    if (sourcePath === undefined) {
      violations.push(`${subpath} -> ${target}: no matching source file found`);

      continue;
    }

    const owningProjects: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_OwningProjects = projects.filter((project) => project['files'].has(sourcePath));

    if (owningProjects.length !== 1) {
      violations.push(`${subpath} -> ${target}: expected exactly one compiling tsconfig, found ${owningProjects.length} (${owningProjects.map((project) => project['name']).join(', ')})`);

      continue;
    }

    const owningProject: Tests_ExportsModuleFormat_CollectNonEsmBrowserExports_OwningProject = owningProjects[0];

    if (owningProject === undefined) {
      continue;
    }

    if (owningProject['esm'] === false) {
      violations.push(`${subpath} -> ${target}: source ${sourcePath} is compiled as CommonJS by ${owningProject['name']}; move it into tsconfig.theme.json and exclude it from ${owningProject['name']}`);
    }
  }

  return violations;
}

/**
 * Tests - Exports Module Format - Exports Module Format.
 *
 * Guards the package's public `exports` surface against shipping a
 * CommonJS module where the browser expects ESM. When a browser-facing
 * export resolves to a `.js` emitted as CommonJS - for example a source
 * file that fell into the Node `tsconfig.plugin.json` project instead of
 * the browser `tsconfig.theme.json` project - the generated client bundle
 * throws `exports is not defined` at load and the site never hydrates.
 * This asserts every browser-facing export is emitted as ESM.
 *
 * @since 0.21.0
 */
describe('exportsModuleFormat', () => {
  it('emits every browser-facing package export as esm', async () => {
    const packageRoot: Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBrowserFacingPackageExportAsEsm_PackageRoot = getPackageRoot();
    const violations: Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBrowserFacingPackageExportAsEsm_Violations = await collectNonEsmBrowserExports(packageRoot);
    const message: Tests_ExportsModuleFormat_ExportsModuleFormat_EmitsEveryBrowserFacingPackageExportAsEsm_Message = [
      'Browser-facing package exports must be emitted as ESM, but these are not:',
      ...violations.map((violation) => `  ${violation}`),
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  return;
});
