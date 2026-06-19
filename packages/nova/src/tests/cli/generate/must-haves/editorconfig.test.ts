import { ok, strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateMustHavesEditorconfig } from '../../../../cli/generate/must-haves/editorconfig.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_DoesNotCallSaveGeneratedFileDuringDryRun_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_DoesNotCallSaveGeneratedFileDuringDryRun_SaveSpy,
  Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_Calls,
  Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_HeaderArg,
  Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_SaveSpy,
  Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_TargetCall,
  Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy,
} from '../../../../types/tests/cli/generate/must-haves/editorconfig.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Editorconfig - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesEditorconfig.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesEditorconfig.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('does not call saveGeneratedFile during dry-run', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_DoesNotCallSaveGeneratedFileDuringDryRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const saveSpy: Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_DoesNotCallSaveGeneratedFileDuringDryRun_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesEditorconfig.run({ dryRun: true });

    strictEqual(saveSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const saveSpy: Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesEditorconfig.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_Calls = saveSpy['mock']['calls'];

    const targetCall: Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_TargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.editorconfig'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for .editorconfig');

    const headerArg: Tests_Cli_Generate_MustHaves_Editorconfig_CliGenerateMustHavesEditorconfigRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_HeaderArg = targetCall[3];

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
