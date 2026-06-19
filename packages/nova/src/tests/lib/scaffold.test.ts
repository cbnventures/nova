import { deepStrictEqual, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { detectMonorepoContext } from '../../lib/scaffold.js';

import type {
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ProjectDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ResolvedDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageContents,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJson,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJsonPath,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ProjectDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ResolvedDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageContents,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJson,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJsonPath,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ProjectDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ResolvedDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result,
  Tests_Lib_Scaffold_DetectMonorepoContext_OriginalCwd,
  Tests_Lib_Scaffold_DetectMonorepoContext_SandboxRoot,
  Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryDirectory,
  Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryPrefix,
} from '../../types/tests/lib/scaffold.test.d.ts';

/**
 * Tests - Lib - Scaffold - Detect Monorepo Context.
 *
 * @since 0.15.0
 */
describe('detectMonorepoContext', async () => {
  const originalCwd: Tests_Lib_Scaffold_DetectMonorepoContext_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Lib_Scaffold_DetectMonorepoContext_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Lib_Scaffold_DetectMonorepoContext_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('detects monorepo mode in empty directory', async () => {
    const projectDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ProjectDirectory = join(sandboxRoot, 'empty-dir');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    const resolvedDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_ResolvedDirectory = process.cwd();

    const result: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsMonorepoModeInEmptyDirectory_Result = await detectMonorepoContext(resolvedDirectory);

    deepStrictEqual(result, { context: 'monorepo' });

    return;
  });

  it('detects workspace mode at monorepo root', async () => {
    const projectDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ProjectDirectory = join(sandboxRoot, 'monorepo-root');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJson = JSON.stringify({
      name: 'test-project',
      workspaces: [
        'apps/*',
        'packages/*',
      ],
    }, null, 2);
    const packageContents: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageContents = `${packageJson}\n`;

    const packageJsonPath: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, packageContents, 'utf-8');

    process.chdir(projectDirectory);

    const resolvedDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_ResolvedDirectory = process.cwd();

    const result: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsWorkspaceModeAtMonorepoRoot_Result = await detectMonorepoContext(resolvedDirectory);

    strictEqual(result['context'], 'workspace');

    return;
  });

  it('detects standalone project', async () => {
    const projectDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJson = JSON.stringify({
      name: 'standalone-project',
    }, null, 2);
    const packageContents: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageContents = `${packageJson}\n`;

    const packageJsonPath: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, packageContents, 'utf-8');

    process.chdir(projectDirectory);

    const resolvedDirectory: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_ResolvedDirectory = process.cwd();

    const result: Tests_Lib_Scaffold_DetectMonorepoContext_DetectsStandaloneProject_Result = await detectMonorepoContext(resolvedDirectory);

    deepStrictEqual(result, { context: 'standalone' });

    return;
  });

  return;
});
