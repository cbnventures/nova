import { ok, strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { CliGenerateGithubFunding } from '../../../../cli/generate/github/funding.js';
import { LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  TestsCliGenerateGithubFundingRunHeaderArg,
  TestsCliGenerateGithubFundingRunIsProjectRootSpy,
  TestsCliGenerateGithubFundingRunLoadSpy,
  TestsCliGenerateGithubFundingRunSaveCalls,
  TestsCliGenerateGithubFundingRunSaveSpy,
  TestsCliGenerateGithubFundingRunTargetCall,
} from '../../../../types/tests/cli/generate/github/funding.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Funding - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateGithubFunding.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: TestsCliGenerateGithubFundingRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateGithubFunding.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('does not call saveGeneratedFile during dry-run', async () => {
    const isProjectRootSpy: TestsCliGenerateGithubFundingRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: TestsCliGenerateGithubFundingRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ urls: { fundSources: ['https://github.com/sponsors/test'] } });
    const saveSpy: TestsCliGenerateGithubFundingRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateGithubFunding.run({ dryRun: true });

    strictEqual(saveSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const isProjectRootSpy: TestsCliGenerateGithubFundingRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: TestsCliGenerateGithubFundingRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ urls: { fundSources: ['https://github.com/sponsors/test'] } });
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

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
