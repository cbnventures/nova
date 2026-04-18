import { strictEqual } from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { CliGenerateMustHavesReadMe } from '../../../../cli/generate/must-haves/read-me.js';

import type {
  TestsCliGenerateMustHavesReadMeRunExists,
  TestsCliGenerateMustHavesReadMeRunNovaConfig,
  TestsCliGenerateMustHavesReadMeRunNovaConfigPath,
  TestsCliGenerateMustHavesReadMeRunOriginalCwd,
  TestsCliGenerateMustHavesReadMeRunPackageJson,
  TestsCliGenerateMustHavesReadMeRunPackageJsonPath,
  TestsCliGenerateMustHavesReadMeRunProjectDirectory,
  TestsCliGenerateMustHavesReadMeRunReadmePath,
  TestsCliGenerateMustHavesReadMeRunSandboxRoot,
  TestsCliGenerateMustHavesReadMeRunTemporaryDirectory,
  TestsCliGenerateMustHavesReadMeRunTemporaryPrefix,
} from '../../../../types/tests/cli/generate/must-haves/read-me.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Read Me - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesReadMe.run', async () => {
  const originalCwd: TestsCliGenerateMustHavesReadMeRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateMustHavesReadMeRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateMustHavesReadMeRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateMustHavesReadMeRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliGenerateMustHavesReadMeRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliGenerateMustHavesReadMeRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateMustHavesReadMeRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateMustHavesReadMeRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: TestsCliGenerateMustHavesReadMeRunNovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
    }, null, 2);

    const novaConfigPath: TestsCliGenerateMustHavesReadMeRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({ dryRun: true });

    let exists: TestsCliGenerateMustHavesReadMeRunExists = true;

    try {
      const readmePath: TestsCliGenerateMustHavesReadMeRunReadmePath = join(projectDirectory, 'README.md');

      await access(readmePath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('generates file from template', async () => {
    const projectDirectory: TestsCliGenerateMustHavesReadMeRunProjectDirectory = join(sandboxRoot, 'generates-file');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateMustHavesReadMeRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateMustHavesReadMeRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: TestsCliGenerateMustHavesReadMeRunNovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
    }, null, 2);

    const novaConfigPath: TestsCliGenerateMustHavesReadMeRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: TestsCliGenerateMustHavesReadMeRunReadmePath = join(projectDirectory, 'README.md');

    await access(readmePath);

    return;
  });

  return;
});
