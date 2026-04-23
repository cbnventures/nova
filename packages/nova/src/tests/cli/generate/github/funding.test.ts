import { ok, strictEqual } from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
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

import { CliGenerateGithubFunding } from '../../../../cli/generate/github/funding.js';
import * as utility from '../../../../lib/utility.js';

import type {
  TestsCliGenerateGithubFundingRunExists,
  TestsCliGenerateGithubFundingRunFundingYmlPath,
  TestsCliGenerateGithubFundingRunHeaderArg,
  TestsCliGenerateGithubFundingRunNovaConfig,
  TestsCliGenerateGithubFundingRunNovaConfigPath,
  TestsCliGenerateGithubFundingRunOriginalCwd,
  TestsCliGenerateGithubFundingRunPackageJson,
  TestsCliGenerateGithubFundingRunPackageJsonPath,
  TestsCliGenerateGithubFundingRunProjectDirectory,
  TestsCliGenerateGithubFundingRunSandboxRoot,
  TestsCliGenerateGithubFundingRunSaveCalls,
  TestsCliGenerateGithubFundingRunSaveSpy,
  TestsCliGenerateGithubFundingRunTargetCall,
  TestsCliGenerateGithubFundingRunTemporaryDirectory,
  TestsCliGenerateGithubFundingRunTemporaryPrefix,
} from '../../../../types/tests/cli/generate/github/funding.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Funding - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateGithubFunding.run', async () => {
  const originalCwd: TestsCliGenerateGithubFundingRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateGithubFundingRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateGithubFundingRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateGithubFundingRunSandboxRoot = await mkdtemp(temporaryPrefix);

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
    const projectDirectory: TestsCliGenerateGithubFundingRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateGithubFunding.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliGenerateGithubFundingRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubFundingRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateGithubFundingRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: TestsCliGenerateGithubFundingRunNovaConfig = JSON.stringify({
      urls: {
        fundSources: ['https://github.com/sponsors/test'],
      },
    }, null, 2);

    const novaConfigPath: TestsCliGenerateGithubFundingRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateGithubFunding.run({ dryRun: true });

    let exists: TestsCliGenerateGithubFundingRunExists = true;

    try {
      const fundingYmlPath: TestsCliGenerateGithubFundingRunFundingYmlPath = join(projectDirectory, '.github', 'FUNDING.yml');

      await access(fundingYmlPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('generates file from config', async () => {
    const projectDirectory: TestsCliGenerateGithubFundingRunProjectDirectory = join(sandboxRoot, 'generates-file');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateGithubFundingRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateGithubFundingRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: TestsCliGenerateGithubFundingRunNovaConfig = JSON.stringify({
      urls: {
        fundSources: ['https://github.com/sponsors/test'],
      },
    }, null, 2);

    const novaConfigPath: TestsCliGenerateGithubFundingRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateGithubFunding.run({});

    const fundingYmlPath: TestsCliGenerateGithubFundingRunFundingYmlPath = join(projectDirectory, '.github', 'FUNDING.yml');

    await access(fundingYmlPath);

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const projectDirectory: TestsCliGenerateGithubFundingRunProjectDirectory = join(sandboxRoot, 'header-metadata');

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }));

    const novaConfig: TestsCliGenerateGithubFundingRunNovaConfig = JSON.stringify({
      urls: {
        fundSources: ['https://github.com/sponsors/test'],
      },
    }, null, 2);

    const novaConfigPath: TestsCliGenerateGithubFundingRunNovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    const saveSpy: TestsCliGenerateGithubFundingRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubFunding.run({ replaceFile: true });

    const calls: TestsCliGenerateGithubFundingRunSaveCalls = saveSpy['mock']['calls'];

    const targetCall: TestsCliGenerateGithubFundingRunTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.github/FUNDING.yml'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for FUNDING.yml');

    const headerArg: TestsCliGenerateGithubFundingRunHeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate github funding');
    strictEqual(headerArg['docsSlug'], 'cli/generators/github/funding');
    strictEqual(headerArg['mode'], 'strict');

    return;
  });

  return;
});
