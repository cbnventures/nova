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

import { CliGenerateMustHavesGitignore } from '../../../../cli/generate/must-haves/gitignore.js';
import * as utility from '../../../../lib/utility.js';

vi.mock('prompts', () => (
  {
    default: vi.fn().mockResolvedValue(
      {
        entry: '',
      },
    ),
  }
));

import type {
  TestsCliGenerateMustHavesGitignoreRunHeaderArg,
  TestsCliGenerateMustHavesGitignoreRunOriginalCwd,
  TestsCliGenerateMustHavesGitignoreRunProjectDirectory,
  TestsCliGenerateMustHavesGitignoreRunSandboxRoot,
  TestsCliGenerateMustHavesGitignoreRunSaveCalls,
  TestsCliGenerateMustHavesGitignoreRunSaveSpy,
  TestsCliGenerateMustHavesGitignoreRunTargetCall,
  TestsCliGenerateMustHavesGitignoreRunTemporaryDirectory,
  TestsCliGenerateMustHavesGitignoreRunTemporaryPrefix,
} from '../../../../types/tests/cli/generate/must-haves/gitignore.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Gitignore - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesGitignore.run', async () => {
  const originalCwd: TestsCliGenerateMustHavesGitignoreRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateMustHavesGitignoreRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateMustHavesGitignoreRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateMustHavesGitignoreRunSandboxRoot = await mkdtemp(temporaryPrefix);

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
    const projectDirectory: TestsCliGenerateMustHavesGitignoreRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesGitignore.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const projectDirectory: TestsCliGenerateMustHavesGitignoreRunProjectDirectory = join(sandboxRoot, 'header-metadata');

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }));

    process.chdir(projectDirectory);

    const saveSpy: TestsCliGenerateMustHavesGitignoreRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesGitignore.run({ replaceFile: true });

    const calls: TestsCliGenerateMustHavesGitignoreRunSaveCalls = saveSpy['mock']['calls'];

    const targetCall: TestsCliGenerateMustHavesGitignoreRunTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.gitignore'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for .gitignore');

    const headerArg: TestsCliGenerateMustHavesGitignoreRunHeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate must-haves gitignore');
    strictEqual(headerArg['docsSlug'], 'cli/generators/must-haves/gitignore');
    strictEqual(headerArg['mode'], 'strict');

    return;
  });

  return;
});
