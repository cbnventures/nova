import { strictEqual } from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as CliGenerateMustHavesLicense } from '../../../../cli/generate/must-haves/license.js';

import type {
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_HasStaleContent,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_LicensePath,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_NovaConfig,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_OriginalCwd,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_PackageJson,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Result,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_SandboxRoot,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_StaleContent,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_TemporaryDirectory,
  Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_TemporaryPrefix,
  Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_Name,
  Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_NovaConfig,
  Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_PackageJson,
  Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_Returns,
  Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_SandboxRoot,
} from '../../../../types/tests/cli/generate/must-haves/license.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - License - Create Role Matrix Sandbox.
 *
 * Creates the 7-workspace directory tree, writes package.json and nova.config.json
 * with the full role-matrix fixture so each fan-out test can start in 3 lines.
 *
 * @param {Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_SandboxRoot} sandboxRoot - Sandbox root.
 * @param {Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_Name}        name        - Name.
 *
 * @returns {Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_Returns}
 *
 * @since 0.18.0
 */
async function createRoleMatrixSandbox(sandboxRoot: Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_SandboxRoot, name: Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_Name): Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_Returns {
  const projectDirectory: Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_ProjectDirectory = join(sandboxRoot, name);

  await mkdir(projectDirectory, { recursive: true });
  await mkdir(join(projectDirectory, 'apps', 'web'), { recursive: true });
  await mkdir(join(projectDirectory, 'apps', 'docs-site'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'lib-a'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'cli-a'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'preset-a'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'template-a'), { recursive: true });

  const packageJson: Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
  const packageJsonPath: Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_PackageJsonPath = join(projectDirectory, 'package.json');

  await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

  const novaConfig: Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_NovaConfig = JSON.stringify({
    project: {
      license: 'MIT',
      legalName: 'Test Corp',
      startingYear: 2024,
      name: {
        slug: 'test', title: 'Test',
      },
    },
    workspaces: {
      './': {
        name: 'test-project', role: 'project', policy: 'freezable',
      },
      './apps/web': {
        name: 'test-app-web', role: 'app', policy: 'trackable',
      },
      './apps/docs-site': {
        name: 'test-docs', role: 'docs', policy: 'freezable',
      },
      './packages/lib-a': {
        name: 'lib-a', role: 'package', policy: 'distributable',
      },
      './packages/cli-a': {
        name: 'test-tool-cli-a', role: 'tool', policy: 'trackable',
      },
      './packages/preset-a': {
        name: 'test-config-preset-a', role: 'config', policy: 'trackable',
      },
      './packages/template-a': {
        name: 'template-a', role: 'template', policy: 'freezable',
      },
    },
  }, null, 2);

  const novaConfigPath: Tests_Cli_Generate_MustHaves_License_CreateRoleMatrixSandbox_NovaConfigPath = join(projectDirectory, 'nova.config.json');

  await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

  return projectDirectory;
}

/**
 * Tests - CLI - Generate - Must Haves - License - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesLicense.run', async () => {
  const originalCwd: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesLicense.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_PackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_NovaConfig = JSON.stringify({
      project: {
        license: 'MIT',
        legalName: 'Test Corp',
        startingYear: 2024,
      },
    }, null, 2);

    const novaConfigPath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesLicense.run({ dryRun: true });

    let exists: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists = true;

    try {
      const licensePath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_LicensePath = join(projectDirectory, 'LICENSE');

      await access(licensePath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('generates file from template', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ProjectDirectory = join(sandboxRoot, 'generates-file');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_PackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_NovaConfig = JSON.stringify({
      project: {
        license: 'MIT',
        legalName: 'Test Corp',
        startingYear: 2024,
      },
    }, null, 2);

    const novaConfigPath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesLicense.run({});

    const licensePath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_LicensePath = join(projectDirectory, 'LICENSE');

    await access(licensePath);

    return;
  });

  it('errors when project.license is missing from nova.config.json', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ProjectDirectory = join(sandboxRoot, 'missing-license');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_PackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_NovaConfig = JSON.stringify({
      project: {
        legalName: 'Test Corp',
        startingYear: 2024,
      },
    }, null, 2);

    const novaConfigPath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    process.exitCode = 0;

    const result: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Result = await CliGenerateMustHavesLicense.run({});

    strictEqual(result, 'cancelled');
    strictEqual(process.exitCode, 1);

    let exists: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists = true;

    try {
      const licensePath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_LicensePath = join(projectDirectory, 'LICENSE');

      await access(licensePath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('fans out to consumer-facing roles', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ProjectDirectory = await createRoleMatrixSandbox(sandboxRoot, 'role-matrix');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesLicense.run({});

    // Included roles (app, package, tool, config) — LICENSE present with content.
    const rootContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent = await readFile(join(projectDirectory, 'LICENSE'), 'utf-8');

    strictEqual(rootContent.includes('MIT License') === true, true);

    const webContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent = await readFile(join(projectDirectory, 'apps', 'web', 'LICENSE'), 'utf-8');

    strictEqual(webContent.includes('MIT License') === true, true);

    const libContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'lib-a', 'LICENSE'), 'utf-8');

    strictEqual(libContent.includes('MIT License') === true, true);

    const cliContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'cli-a', 'LICENSE'), 'utf-8');

    strictEqual(cliContent.includes('MIT License') === true, true);

    const presetContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'preset-a', 'LICENSE'), 'utf-8');

    strictEqual(presetContent.includes('MIT License') === true, true);

    // Excluded roles (docs, template) — LICENSE absent.
    let docsExists: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists = true;

    try {
      await access(join(projectDirectory, 'apps', 'docs-site', 'LICENSE'));
    } catch {
      docsExists = false;
    }

    strictEqual(docsExists, false);

    let templateExists: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists = true;

    try {
      await access(join(projectDirectory, 'packages', 'template-a', 'LICENSE'));
    } catch {
      templateExists = false;
    }

    strictEqual(templateExists, false);

    return;
  });

  it('dry-run skips workspace fan-out writes', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ProjectDirectory = await createRoleMatrixSandbox(sandboxRoot, 'dry-run-fan-out');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesLicense.run({ dryRun: true });

    // Root file must be absent.
    let rootExists: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists = true;

    try {
      const licensePath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_LicensePath = join(projectDirectory, 'LICENSE');

      await access(licensePath);
    } catch {
      rootExists = false;
    }

    strictEqual(rootExists, false);

    // Consumer workspace files must be absent.
    let webExists: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists = true;

    try {
      const licensePath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_LicensePath = join(projectDirectory, 'apps', 'web', 'LICENSE');

      await access(licensePath);
    } catch {
      webExists = false;
    }

    strictEqual(webExists, false);

    let libExists: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists = true;

    try {
      const licensePath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_LicensePath = join(projectDirectory, 'packages', 'lib-a', 'LICENSE');

      await access(licensePath);
    } catch {
      libExists = false;
    }

    strictEqual(libExists, false);

    let cliExists: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists = true;

    try {
      const licensePath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_LicensePath = join(projectDirectory, 'packages', 'cli-a', 'LICENSE');

      await access(licensePath);
    } catch {
      cliExists = false;
    }

    strictEqual(cliExists, false);

    let presetExists: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_Exists = true;

    try {
      const licensePath: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_LicensePath = join(projectDirectory, 'packages', 'preset-a', 'LICENSE');

      await access(licensePath);
    } catch {
      presetExists = false;
    }

    strictEqual(presetExists, false);

    return;
  });

  it('replaceFile mode overwrites existing fan-out files', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ProjectDirectory = await createRoleMatrixSandbox(sandboxRoot, 'replace-fan-out');

    const staleContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_StaleContent = 'STALE-CONTENT';

    await writeFile(join(projectDirectory, 'apps', 'web', 'LICENSE'), staleContent, 'utf-8');
    await writeFile(join(projectDirectory, 'packages', 'lib-a', 'LICENSE'), staleContent, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesLicense.run({ replaceFile: true });

    // Pre-existing files must have been replaced.
    const webContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent = await readFile(join(projectDirectory, 'apps', 'web', 'LICENSE'), 'utf-8');
    const webHasStaleContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_HasStaleContent = webContent.includes('STALE-CONTENT');

    strictEqual(webHasStaleContent, false);
    strictEqual(webContent.includes('MIT License') === true, true);

    const libContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'lib-a', 'LICENSE'), 'utf-8');
    const libHasStaleContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_HasStaleContent = libContent.includes('STALE-CONTENT');

    strictEqual(libHasStaleContent, false);
    strictEqual(libContent.includes('MIT License') === true, true);

    // Other consumer workspaces must also have files written.
    const cliContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'cli-a', 'LICENSE'), 'utf-8');

    strictEqual(cliContent.includes('MIT License') === true, true);

    const presetContent: Tests_Cli_Generate_MustHaves_License_CliGenerateMustHavesLicenseRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'preset-a', 'LICENSE'), 'utf-8');

    strictEqual(presetContent.includes('MIT License') === true, true);

    return;
  });

  return;
});
