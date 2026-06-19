import { ok, strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

vi.mock('prompts', () => {
  return {
    default: vi.fn().mockResolvedValue(
      {
        key: '',
      },
    ),
  };
});

import { Runner as CliGenerateMustHavesDotenv } from '../../../../cli/generate/must-haves/dotenv.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_Calls,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_EnvHeaderArg,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_EnvTargetCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_SampleHeaderArg,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_SampleTargetCall,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_SaveSpy,
  Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy,
} from '../../../../types/tests/cli/generate/must-haves/dotenv.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesDotenv.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesDotenv.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile for both files', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const saveSpy: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesDotenv.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_Calls = saveSpy['mock']['calls'];

    const envTargetCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_EnvTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env'));

    ok(envTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env');

    const envHeaderArg: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_EnvHeaderArg = envTargetCall[3];

    ok(envHeaderArg !== undefined, 'Expected header argument to be defined for .env');

    strictEqual(envHeaderArg['command'], 'nova generate must-haves dotenv');
    strictEqual(envHeaderArg['docsSlug'], 'cli/generators/must-haves/dotenv');
    strictEqual(envHeaderArg['mode'], 'fillable');

    const sampleTargetCall: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_SampleTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.env.sample'));

    ok(sampleTargetCall !== undefined, 'Expected saveGeneratedFile to be called for .env.sample');

    const sampleHeaderArg: Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFileForBothFiles_SampleHeaderArg = sampleTargetCall[3];

    ok(sampleHeaderArg !== undefined, 'Expected header argument to be defined for .env.sample');

    strictEqual(sampleHeaderArg['command'], 'nova generate must-haves dotenv');
    strictEqual(sampleHeaderArg['docsSlug'], 'cli/generators/must-haves/dotenv');
    strictEqual(sampleHeaderArg['mode'], 'strict');

    isProjectRootSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
