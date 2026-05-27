import { ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateMustHavesReadMe } from '../../../../cli/generate/must-haves/read-me.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_Exists,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasAnchorWrapping,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasBrokenLink,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasDocumentationSection,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasHeaderBlock,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasIntroductionSection,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasPictureBlock,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasStaleContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HeaderArg,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_LoadSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfig,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OriginalCwd,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJson,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmeContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmePath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SandboxRoot,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SaveCalls,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SaveSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_StaleContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TargetCall,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TemporaryDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TemporaryPrefix,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Name,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_NovaConfig,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_PackageJson,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Returns,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_SandboxRoot,
} from '../../../../types/tests/cli/generate/must-haves/read-me.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Read Me - Create Role Matrix Sandbox.
 *
 * Creates the 7-workspace directory tree, writes package.json and nova.config.json
 * with the full role-matrix fixture so each fan-out test can start in 3 lines.
 *
 * @param {Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_SandboxRoot} sandboxRoot - Sandbox root.
 * @param {Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Name}        name        - Name.
 *
 * @returns {Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Returns}
 *
 * @since 0.18.0
 */
async function createRoleMatrixSandbox(sandboxRoot: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_SandboxRoot, name: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Name): Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Returns {
  const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_ProjectDirectory = join(sandboxRoot, name);

  await mkdir(projectDirectory, { recursive: true });
  await mkdir(join(projectDirectory, 'apps', 'web'), { recursive: true });
  await mkdir(join(projectDirectory, 'apps', 'docs-site'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'lib-a'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'cli-a'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'preset-a'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'template-a'), { recursive: true });

  const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
  const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_PackageJsonPath = join(projectDirectory, 'package.json');

  await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

  const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_NovaConfig = JSON.stringify({
    project: {
      name: {
        slug: 'test', title: 'Test Project',
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

  const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_NovaConfigPath = join(projectDirectory, 'nova.config.json');

  await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

  return projectDirectory;
}

/**
 * Tests - CLI - Generate - Must Haves - Read Me - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesReadMe.run', async () => {
  const originalCwd: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesReadMe.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('does not call saveGeneratedFile during dry-run', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ project: { name: { title: 'Test Project' } } });
    const saveSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesReadMe.run({ dryRun: true });

    strictEqual(saveSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ project: { name: { title: 'Test Project' } } });
    const saveSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesReadMe.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SaveCalls = saveSpy['mock']['calls'];

    const targetCall: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/README.md'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for README.md');

    const headerArg: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate must-haves read-me');
    strictEqual(headerArg['docsSlug'], 'cli/generators/must-haves/read-me');
    strictEqual(headerArg['mode'], 'strict');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('omits the Documentation section when urls.documentation is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ProjectDirectory = join(sandboxRoot, 'no-documentation-url');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
      urls: {
        homepage: 'https://example.com',
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasDocumentationSection: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasDocumentationSection = readmeContent.includes('## Documentation');
    const hasBrokenLink: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasBrokenLink = readmeContent.includes('[](');

    strictEqual(hasDocumentationSection, false, 'Expected README.md to omit the Documentation section when urls.documentation is missing');
    strictEqual(hasBrokenLink, false, 'Expected README.md to have no broken markdown link [](...)');

    return;
  });

  it('omits the Introduction section when project.description.long is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ProjectDirectory = join(sandboxRoot, 'no-description');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasIntroductionSection: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasIntroductionSection = readmeContent.includes('## Introduction');

    strictEqual(hasIntroductionSection, false, 'Expected README.md to omit the Introduction section when description is missing');

    return;
  });

  it('drops the picture block when urls.logo is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ProjectDirectory = join(sandboxRoot, 'no-logo');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
      urls: {
        homepage: 'https://example.com',
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasPictureBlock: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasPictureBlock = readmeContent.includes('<picture>');
    const hasHeaderBlock: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasHeaderBlock = readmeContent.includes('<div align="center">');

    strictEqual(hasPictureBlock, false, 'Expected README.md to omit the <picture> block when urls.logo is missing');
    strictEqual(hasHeaderBlock, true, 'Expected README.md to still include the header block with title');

    return;
  });

  it('drops the anchor wrapping when urls.homepage is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ProjectDirectory = join(sandboxRoot, 'no-homepage');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
      urls: {
        logo: 'https://example.com/logo.png',
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasAnchorWrapping: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasAnchorWrapping = readmeContent.includes('<a href=');
    const hasPictureBlock: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasPictureBlock = readmeContent.includes('<picture>');

    strictEqual(hasAnchorWrapping, false, 'Expected README.md to omit the <a> wrapping when urls.homepage is missing');
    strictEqual(hasPictureBlock, true, 'Expected README.md to still include the <picture> block with the logo');

    return;
  });

  it('omits the entire header block when project.name.title is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ProjectDirectory = join(sandboxRoot, 'no-name');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfig = JSON.stringify({
      project: {
        description: {
          long: 'A test project without a title.',
        },
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasHeaderBlock: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasHeaderBlock = readmeContent.includes('<div align="center">');

    strictEqual(hasHeaderBlock, false, 'Expected README.md to omit the header block when project name is missing');

    return;
  });

  it('fans out to consumer-facing roles', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ProjectDirectory = await createRoleMatrixSandbox(sandboxRoot, 'role-matrix');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    // Included roles (app, package, tool, config) — README present with content.
    const rootContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent = await readFile(join(projectDirectory, 'README.md'), 'utf-8');

    strictEqual(rootContent.includes('Test Project') === true, true);

    const webContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent = await readFile(join(projectDirectory, 'apps', 'web', 'README.md'), 'utf-8');

    strictEqual(webContent.includes('Test Project') === true, true);

    const libContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'lib-a', 'README.md'), 'utf-8');

    strictEqual(libContent.includes('Test Project') === true, true);

    const cliContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'cli-a', 'README.md'), 'utf-8');

    strictEqual(cliContent.includes('Test Project') === true, true);

    const presetContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'preset-a', 'README.md'), 'utf-8');

    strictEqual(presetContent.includes('Test Project') === true, true);

    // Excluded roles (docs, template) — README absent.
    let docsExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_Exists = true;

    try {
      await readFile(join(projectDirectory, 'apps', 'docs-site', 'README.md'), 'utf-8');
    } catch {
      docsExists = false;
    }

    strictEqual(docsExists, false);

    let templateExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_Exists = true;

    try {
      await readFile(join(projectDirectory, 'packages', 'template-a', 'README.md'), 'utf-8');
    } catch {
      templateExists = false;
    }

    strictEqual(templateExists, false);

    return;
  });

  it('dry-run skips workspace fan-out writes', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ProjectDirectory = await createRoleMatrixSandbox(sandboxRoot, 'dry-run-fan-out');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({ dryRun: true });

    // Root file must be absent.
    let rootExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_Exists = true;

    try {
      await readFile(join(projectDirectory, 'README.md'), 'utf-8');
    } catch {
      rootExists = false;
    }

    strictEqual(rootExists, false);

    // Consumer workspace files must be absent.
    let webExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_Exists = true;

    try {
      await readFile(join(projectDirectory, 'apps', 'web', 'README.md'), 'utf-8');
    } catch {
      webExists = false;
    }

    strictEqual(webExists, false);

    let libExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_Exists = true;

    try {
      await readFile(join(projectDirectory, 'packages', 'lib-a', 'README.md'), 'utf-8');
    } catch {
      libExists = false;
    }

    strictEqual(libExists, false);

    let cliExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_Exists = true;

    try {
      await readFile(join(projectDirectory, 'packages', 'cli-a', 'README.md'), 'utf-8');
    } catch {
      cliExists = false;
    }

    strictEqual(cliExists, false);

    let presetExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_Exists = true;

    try {
      await readFile(join(projectDirectory, 'packages', 'preset-a', 'README.md'), 'utf-8');
    } catch {
      presetExists = false;
    }

    strictEqual(presetExists, false);

    return;
  });

  it('replaceFile mode overwrites existing fan-out files', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ProjectDirectory = await createRoleMatrixSandbox(sandboxRoot, 'replace-fan-out');

    const staleContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_StaleContent = 'STALE-CONTENT';

    await writeFile(join(projectDirectory, 'apps', 'web', 'README.md'), staleContent, 'utf-8');
    await writeFile(join(projectDirectory, 'packages', 'lib-a', 'README.md'), staleContent, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({ replaceFile: true });

    // Pre-existing files must have been replaced.
    const webContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent = await readFile(join(projectDirectory, 'apps', 'web', 'README.md'), 'utf-8');
    const webHasStaleContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasStaleContent = webContent.includes('STALE-CONTENT');

    strictEqual(webHasStaleContent, false);
    strictEqual(webContent.includes('Test Project') === true, true);

    const libContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'lib-a', 'README.md'), 'utf-8');
    const libHasStaleContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_HasStaleContent = libContent.includes('STALE-CONTENT');

    strictEqual(libHasStaleContent, false);
    strictEqual(libContent.includes('Test Project') === true, true);

    // Other consumer workspaces must also have files written.
    const cliContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'cli-a', 'README.md'), 'utf-8');

    strictEqual(cliContent.includes('Test Project') === true, true);

    const presetContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReadContent = await readFile(join(projectDirectory, 'packages', 'preset-a', 'README.md'), 'utf-8');

    strictEqual(presetContent.includes('Test Project') === true, true);

    return;
  });

  return;
});
