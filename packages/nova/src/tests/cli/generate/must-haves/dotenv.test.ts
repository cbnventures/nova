import { ok, strictEqual } from 'node:assert/strict';
import {
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

vi.mock('prompts', () => (
  {
    default: vi.fn().mockResolvedValue(
      {
        key: '',
      },
    ),
  }
));

import { CliGenerateMustHavesDotenv } from '../../../../cli/generate/must-haves/dotenv.js';
import * as utility from '../../../../lib/utility.js';

import type {
  TestsCliGenerateMustHavesDotenvRunEnvHeaderArg,
  TestsCliGenerateMustHavesDotenvRunEnvTargetCall,
  TestsCliGenerateMustHavesDotenvRunOriginalCwd,
  TestsCliGenerateMustHavesDotenvRunProjectDirectory,
  TestsCliGenerateMustHavesDotenvRunSampleHeaderArg,
  TestsCliGenerateMustHavesDotenvRunSampleTargetCall,
  TestsCliGenerateMustHavesDotenvRunSandboxRoot,
  TestsCliGenerateMustHavesDotenvRunSaveCalls,
  TestsCliGenerateMustHavesDotenvRunSaveSpy,
  TestsCliGenerateMustHavesDotenvRunTemporaryDirectory,
  TestsCliGenerateMustHavesDotenvRunTemporaryPrefix,
} from '../../../../types/tests/cli/generate/must-haves/dotenv.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesDotenv.run', async () => {
  const originalCwd: TestsCliGenerateMustHavesDotenvRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateMustHavesDotenvRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateMustHavesDotenvRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateMustHavesDotenvRunSandboxRoot = await mkdtemp(temporaryPrefix);

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
    const projectDirectory: TestsCliGenerateMustHavesDotenvRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesDotenv.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile for both files', async () => {
    const projectDirectory: TestsCliGenerateMustHavesDotenvRunProjectDirectory = join(sandboxRoot, 'header-metadata');

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }));

    process.chdir(projectDirectory);

    const saveSpy: TestsCliGenerateMustHavesDotenvRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesDotenv.run({ replaceFile: true });

    const calls: TestsCliGenerateMustHavesDotenvRunSaveCalls = saveSpy['mock']['calls'];

    const envTargetCall: TestsCliGenerateMustHavesDotenvRunEnvTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env'));

    ok(envTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env');

    const envHeaderArg: TestsCliGenerateMustHavesDotenvRunEnvHeaderArg = envTargetCall[3];

    ok(envHeaderArg !== undefined, 'Expected header argument to be defined for .env');

    strictEqual(envHeaderArg['command'], 'nova generate must-haves dotenv');
    strictEqual(envHeaderArg['docsSlug'], 'cli/generators/must-haves/dotenv');
    strictEqual(envHeaderArg['mode'], 'fillable');

    const sampleTargetCall: TestsCliGenerateMustHavesDotenvRunSampleTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env.sample'));

    ok(sampleTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env.sample');

    const sampleHeaderArg: TestsCliGenerateMustHavesDotenvRunSampleHeaderArg = sampleTargetCall[3];

    ok(sampleHeaderArg !== undefined, 'Expected header argument to be defined for .env.sample');

    strictEqual(sampleHeaderArg['command'], 'nova generate must-haves dotenv');
    strictEqual(sampleHeaderArg['docsSlug'], 'cli/generators/must-haves/dotenv');
    strictEqual(sampleHeaderArg['mode'], 'strict');

    return;
  });

  return;
});
