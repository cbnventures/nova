import { ok, strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

vi.mock('prompts', () => (
  {
    default: vi.fn().mockResolvedValue(
      {
        entry: '',
      },
    ),
  }
));

import { CliGenerateMustHavesGitignore } from '../../../../cli/generate/must-haves/gitignore.js';
import * as utility from '../../../../lib/utility.js';

import type {
  TestsCliGenerateMustHavesGitignoreRunHeaderArg,
  TestsCliGenerateMustHavesGitignoreRunIsProjectRootSpy,
  TestsCliGenerateMustHavesGitignoreRunSaveCalls,
  TestsCliGenerateMustHavesGitignoreRunSaveSpy,
  TestsCliGenerateMustHavesGitignoreRunTargetCall,
} from '../../../../types/tests/cli/generate/must-haves/gitignore.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Gitignore - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesGitignore.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: TestsCliGenerateMustHavesGitignoreRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesGitignore.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const isProjectRootSpy: TestsCliGenerateMustHavesGitignoreRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
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

    isProjectRootSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
