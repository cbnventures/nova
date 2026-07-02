import { ok, strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateMustHavesGitignore } from '../../../../cli/generate/must-haves/gitignore.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_Calls,
  Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_HeaderArg,
  Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_LoadSpy,
  Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_SaveSpy,
  Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_TargetCall,
} from '../../../../types/tests/cli/generate/must-haves/gitignore.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Gitignore - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesGitignore.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesGitignore.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('writes config projectExcludes and header metadata', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ gitignore: { projectExcludes: ['wrangler.toml'] } });
    const saveSpy: Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesGitignore.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_Calls = saveSpy['mock']['calls'];

    const targetCall: Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_TargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.gitignore'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for .gitignore');

    ok(targetCall[1].includes('wrangler.toml'), 'Expected generated content to include the config projectExcludes entry');

    const headerArg: Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_HeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate must-haves gitignore');
    strictEqual(headerArg['docsSlug'], 'cli/generators/must-haves/gitignore');
    strictEqual(headerArg['mode'], 'strict');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
