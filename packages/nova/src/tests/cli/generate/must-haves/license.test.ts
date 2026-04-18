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

import { CliGenerateMustHavesLicense } from '../../../../cli/generate/must-haves/license.js';

import type {
  TestsCliGenerateMustHavesLicenseRunExists,
  TestsCliGenerateMustHavesLicenseRunLicensePath,
  TestsCliGenerateMustHavesLicenseRunNovaConfig,
  TestsCliGenerateMustHavesLicenseRunNovaConfigPath,
  TestsCliGenerateMustHavesLicenseRunOriginalCwd,
  TestsCliGenerateMustHavesLicenseRunPackageJson,
  TestsCliGenerateMustHavesLicenseRunPackageJsonPath,
  TestsCliGenerateMustHavesLicenseRunProjectDirectory,
  TestsCliGenerateMustHavesLicenseRunSandboxRoot,
  TestsCliGenerateMustHavesLicenseRunTemporaryDirectory,
  TestsCliGenerateMustHavesLicenseRunTemporaryPrefix,
} from '../../../../types/tests/cli/generate/must-haves/license.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - License - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesLicense.run', async () => {
  const originalCwd: TestsCliGenerateMustHavesLicenseRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateMustHavesLicenseRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateMustHavesLicenseRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateMustHavesLicenseRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliGenerateMustHavesLicenseRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesLicense.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliGenerateMustHavesLicenseRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateMustHavesLicenseRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateMustHavesLicenseRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: TestsCliGenerateMustHavesLicenseRunNovaConfig = JSON.stringify({
      project: {
        license: 'MIT',
        legalName: 'Test Corp',
        startingYear: 2024,
      },
    }, null, 2);

    const novaConfigPath: TestsCliGenerateMustHavesLicenseRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesLicense.run({ dryRun: true });

    let exists: TestsCliGenerateMustHavesLicenseRunExists = true;

    try {
      const licensePath: TestsCliGenerateMustHavesLicenseRunLicensePath = join(projectDirectory, 'LICENSE');

      await access(licensePath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('generates file from template', async () => {
    const projectDirectory: TestsCliGenerateMustHavesLicenseRunProjectDirectory = join(sandboxRoot, 'generates-file');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateMustHavesLicenseRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateMustHavesLicenseRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: TestsCliGenerateMustHavesLicenseRunNovaConfig = JSON.stringify({
      project: {
        license: 'MIT',
        legalName: 'Test Corp',
        startingYear: 2024,
      },
    }, null, 2);

    const novaConfigPath: TestsCliGenerateMustHavesLicenseRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesLicense.run({});

    const licensePath: TestsCliGenerateMustHavesLicenseRunLicensePath = join(projectDirectory, 'LICENSE');

    await access(licensePath);

    return;
  });

  return;
});
