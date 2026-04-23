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

import { CliGenerateMustHavesReadMe } from '../../../../cli/generate/must-haves/read-me.js';
import { LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  TestsCliGenerateMustHavesReadMeRunHasAnchorWrapping,
  TestsCliGenerateMustHavesReadMeRunHasBrokenLink,
  TestsCliGenerateMustHavesReadMeRunHasDocumentationSection,
  TestsCliGenerateMustHavesReadMeRunHasHeaderBlock,
  TestsCliGenerateMustHavesReadMeRunHasIntroductionSection,
  TestsCliGenerateMustHavesReadMeRunHasPictureBlock,
  TestsCliGenerateMustHavesReadMeRunHeaderArg,
  TestsCliGenerateMustHavesReadMeRunIsProjectRootSpy,
  TestsCliGenerateMustHavesReadMeRunLoadSpy,
  TestsCliGenerateMustHavesReadMeRunNovaConfig,
  TestsCliGenerateMustHavesReadMeRunNovaConfigPath,
  TestsCliGenerateMustHavesReadMeRunOriginalCwd,
  TestsCliGenerateMustHavesReadMeRunPackageJson,
  TestsCliGenerateMustHavesReadMeRunPackageJsonPath,
  TestsCliGenerateMustHavesReadMeRunProjectDirectory,
  TestsCliGenerateMustHavesReadMeRunReadmeContent,
  TestsCliGenerateMustHavesReadMeRunReadmePath,
  TestsCliGenerateMustHavesReadMeRunSandboxRoot,
  TestsCliGenerateMustHavesReadMeRunSaveCalls,
  TestsCliGenerateMustHavesReadMeRunSaveSpy,
  TestsCliGenerateMustHavesReadMeRunTargetCall,
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

    const isProjectRootSpy: TestsCliGenerateMustHavesReadMeRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesReadMe.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('does not call saveGeneratedFile during dry-run', async () => {
    const isProjectRootSpy: TestsCliGenerateMustHavesReadMeRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: TestsCliGenerateMustHavesReadMeRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ project: { name: { title: 'Test Project' } } });
    const saveSpy: TestsCliGenerateMustHavesReadMeRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesReadMe.run({ dryRun: true });

    strictEqual(saveSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const isProjectRootSpy: TestsCliGenerateMustHavesReadMeRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: TestsCliGenerateMustHavesReadMeRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ project: { name: { title: 'Test Project' } } });
    const saveSpy: TestsCliGenerateMustHavesReadMeRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesReadMe.run({ replaceFile: true });

    const calls: TestsCliGenerateMustHavesReadMeRunSaveCalls = saveSpy['mock']['calls'];

    const targetCall: TestsCliGenerateMustHavesReadMeRunTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/README.md'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for README.md');

    const headerArg: TestsCliGenerateMustHavesReadMeRunHeaderArg = targetCall[3];

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
    const projectDirectory: TestsCliGenerateMustHavesReadMeRunProjectDirectory = join(sandboxRoot, 'no-documentation-url');

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
      urls: {
        homepage: 'https://example.com',
      },
    }, null, 2);
    const novaConfigPath: TestsCliGenerateMustHavesReadMeRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: TestsCliGenerateMustHavesReadMeRunReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: TestsCliGenerateMustHavesReadMeRunReadmeContent = await readFile(readmePath, 'utf-8');
    const hasDocumentationSection: TestsCliGenerateMustHavesReadMeRunHasDocumentationSection = readmeContent.includes('## Documentation');
    const hasBrokenLink: TestsCliGenerateMustHavesReadMeRunHasBrokenLink = readmeContent.includes('[](');

    strictEqual(hasDocumentationSection, false, 'Expected README.md to omit the Documentation section when urls.documentation is missing');
    strictEqual(hasBrokenLink, false, 'Expected README.md to have no broken markdown link [](...)');

    return;
  });

  it('omits the Introduction section when project.description.long is missing', async () => {
    const projectDirectory: TestsCliGenerateMustHavesReadMeRunProjectDirectory = join(sandboxRoot, 'no-description');

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
    const readmeContent: TestsCliGenerateMustHavesReadMeRunReadmeContent = await readFile(readmePath, 'utf-8');
    const hasIntroductionSection: TestsCliGenerateMustHavesReadMeRunHasIntroductionSection = readmeContent.includes('## Introduction');

    strictEqual(hasIntroductionSection, false, 'Expected README.md to omit the Introduction section when description is missing');

    return;
  });

  it('drops the picture block when urls.logo is missing', async () => {
    const projectDirectory: TestsCliGenerateMustHavesReadMeRunProjectDirectory = join(sandboxRoot, 'no-logo');

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
      urls: {
        homepage: 'https://example.com',
      },
    }, null, 2);
    const novaConfigPath: TestsCliGenerateMustHavesReadMeRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: TestsCliGenerateMustHavesReadMeRunReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: TestsCliGenerateMustHavesReadMeRunReadmeContent = await readFile(readmePath, 'utf-8');
    const hasPictureBlock: TestsCliGenerateMustHavesReadMeRunHasPictureBlock = readmeContent.includes('<picture>');
    const hasHeaderBlock: TestsCliGenerateMustHavesReadMeRunHasHeaderBlock = readmeContent.includes('<div align="center">');

    strictEqual(hasPictureBlock, false, 'Expected README.md to omit the <picture> block when urls.logo is missing');
    strictEqual(hasHeaderBlock, true, 'Expected README.md to still include the header block with title');

    return;
  });

  it('drops the anchor wrapping when urls.homepage is missing', async () => {
    const projectDirectory: TestsCliGenerateMustHavesReadMeRunProjectDirectory = join(sandboxRoot, 'no-homepage');

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
      urls: {
        logo: 'https://example.com/logo.png',
      },
    }, null, 2);
    const novaConfigPath: TestsCliGenerateMustHavesReadMeRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: TestsCliGenerateMustHavesReadMeRunReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: TestsCliGenerateMustHavesReadMeRunReadmeContent = await readFile(readmePath, 'utf-8');
    const hasAnchorWrapping: TestsCliGenerateMustHavesReadMeRunHasAnchorWrapping = readmeContent.includes('<a href=');
    const hasPictureBlock: TestsCliGenerateMustHavesReadMeRunHasPictureBlock = readmeContent.includes('<picture>');

    strictEqual(hasAnchorWrapping, false, 'Expected README.md to omit the <a> wrapping when urls.homepage is missing');
    strictEqual(hasPictureBlock, true, 'Expected README.md to still include the <picture> block with the logo');

    return;
  });

  it('omits the entire header block when project.name.title is missing', async () => {
    const projectDirectory: TestsCliGenerateMustHavesReadMeRunProjectDirectory = join(sandboxRoot, 'no-name');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateMustHavesReadMeRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: TestsCliGenerateMustHavesReadMeRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: TestsCliGenerateMustHavesReadMeRunNovaConfig = JSON.stringify({
      project: {
        description: {
          long: 'A test project without a title.',
        },
      },
    }, null, 2);
    const novaConfigPath: TestsCliGenerateMustHavesReadMeRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: TestsCliGenerateMustHavesReadMeRunReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: TestsCliGenerateMustHavesReadMeRunReadmeContent = await readFile(readmePath, 'utf-8');
    const hasHeaderBlock: TestsCliGenerateMustHavesReadMeRunHasHeaderBlock = readmeContent.includes('<div align="center">');

    strictEqual(hasHeaderBlock, false, 'Expected README.md to omit the header block when project name is missing');

    return;
  });

  return;
});
