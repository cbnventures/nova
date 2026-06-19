import { ok, strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateGithubFunding } from '../../../../cli/generate/github/funding.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_DoesNotCallSaveGeneratedFileDuringDryRun_IsProjectRootSpy,
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_DoesNotCallSaveGeneratedFileDuringDryRun_LoadSpy,
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_DoesNotCallSaveGeneratedFileDuringDryRun_SaveSpy,
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_Calls,
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_HeaderArg,
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_IsProjectRootSpy,
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_LoadSpy,
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_SaveSpy,
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_TargetCall,
  Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy,
} from '../../../../types/tests/cli/generate/github/funding.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Funding - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateGithubFunding.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateGithubFunding.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('does not call saveGeneratedFile during dry-run', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_DoesNotCallSaveGeneratedFileDuringDryRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_DoesNotCallSaveGeneratedFileDuringDryRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ urls: { fundSources: ['https://github.com/sponsors/test'] } });
    const saveSpy: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_DoesNotCallSaveGeneratedFileDuringDryRun_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubFunding.run({ dryRun: true });

    strictEqual(saveSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ urls: { fundSources: ['https://github.com/sponsors/test'] } });
    const saveSpy: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubFunding.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_Calls = saveSpy['mock']['calls'];

    const targetCall: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_TargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.github/FUNDING.yml'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for FUNDING.yml');

    const headerArg: Tests_Cli_Generate_Github_Funding_CliGenerateGithubFundingRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_HeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate github funding');
    strictEqual(headerArg['docsSlug'], 'cli/generators/github/funding');
    strictEqual(headerArg['mode'], 'strict');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
