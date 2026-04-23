import { ok, strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { CliGenerateMustHavesEditorconfig } from '../../../../cli/generate/must-haves/editorconfig.js';
import * as utility from '../../../../lib/utility.js';

import type {
  TestsCliGenerateMustHavesEditorconfigRunHeaderArg,
  TestsCliGenerateMustHavesEditorconfigRunIsProjectRootSpy,
  TestsCliGenerateMustHavesEditorconfigRunSaveCalls,
  TestsCliGenerateMustHavesEditorconfigRunSaveSpy,
  TestsCliGenerateMustHavesEditorconfigRunTargetCall,
} from '../../../../types/tests/cli/generate/must-haves/editorconfig.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Editorconfig - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesEditorconfig.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: TestsCliGenerateMustHavesEditorconfigRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesEditorconfig.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('does not call saveGeneratedFile during dry-run', async () => {
    const isProjectRootSpy: TestsCliGenerateMustHavesEditorconfigRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const saveSpy: TestsCliGenerateMustHavesEditorconfigRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesEditorconfig.run({ dryRun: true });

    strictEqual(saveSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const isProjectRootSpy: TestsCliGenerateMustHavesEditorconfigRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const saveSpy: TestsCliGenerateMustHavesEditorconfigRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesEditorconfig.run({ replaceFile: true });

    const calls: TestsCliGenerateMustHavesEditorconfigRunSaveCalls = saveSpy['mock']['calls'];

    const targetCall: TestsCliGenerateMustHavesEditorconfigRunTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.editorconfig'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for .editorconfig');

    const headerArg: TestsCliGenerateMustHavesEditorconfigRunHeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate must-haves editorconfig');
    strictEqual(headerArg['docsSlug'], 'cli/generators/must-haves/editorconfig');
    strictEqual(headerArg['mode'], 'strict');

    isProjectRootSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
