import {
  ok,
  strictEqual,
} from 'node:assert/strict';
import { join } from 'node:path';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateMustHavesIgnoreFiles } from '../../../../cli/generate/must-haves/ignore-files.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_DiagnosticsSpy,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_LoadSpy,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_Result,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_SaveSpy,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_AssetsignoreCall,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_Calls,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_DockerignoreCall,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_GitignoreCall,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_LoadSpy,
  Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_SaveSpy,
} from '../../../../types/tests/cli/generate/must-haves/ignore-files.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Ignore Files - Run.
 *
 * Verifies the project guard and the single command that synchronizes every
 * configured physical ignore file.
 *
 * @since 0.32.0
 */
describe('CliGenerateMustHavesIgnoreFiles.run', () => {
  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesIgnoreFiles.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('stops before writing invalid config', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      ignoreFiles: {
        './.gitignore': {
          bundles: ['nova'],
          patterns: [],
        },
      },
    });
    const diagnosticsSpy: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_DiagnosticsSpy = vi.spyOn(LibNovaConfig.prototype, 'diagnostics').mockReturnValue([{
      message: 'Ignore file config is invalid.',
      severity: 'error',
    }]);
    const saveSpy: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);
    const result: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_Result = await CliGenerateMustHavesIgnoreFiles.run({ replaceFile: true });

    strictEqual(result, 'cancelled');
    strictEqual(process.exitCode, 1);
    strictEqual(saveSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    diagnosticsSpy.mockRestore();

    saveSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('writes every configured ignore file', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      ignoreFiles: {
        './.gitignore': {
          bundles: ['nova'],
          patterns: ['graphify-out/'],
        },
        './.dockerignore': {
          bundles: ['nova'],
          patterns: ['local-output/'],
        },
        './apps/site/public/.assetsignore': {
          bundles: ['cloudflare-astro'],
          patterns: ['private-assets/'],
        },
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesIgnoreFiles.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_Calls = saveSpy['mock']['calls'];
    const gitignoreCall: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_GitignoreCall = calls.find((call) => call[0] === join(process.cwd(), '.gitignore'));
    const dockerignoreCall: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_DockerignoreCall = calls.find((call) => call[0] === join(process.cwd(), '.dockerignore'));
    const assetsignoreCall: Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_AssetsignoreCall = calls.find((call) => call[0] === join(process.cwd(), 'apps', 'site', 'public', '.assetsignore'));

    strictEqual(calls.length, 3);
    ok(gitignoreCall !== undefined);
    ok(dockerignoreCall !== undefined);
    ok(assetsignoreCall !== undefined);
    ok(gitignoreCall[1].includes('graphify-out/'));
    ok(dockerignoreCall[1].includes('local-output/'));
    ok(dockerignoreCall[1].includes('#### Shared ####'));
    ok(dockerignoreCall[1].includes('#### Version Control - Git / GitHub ####'));
    ok(dockerignoreCall[1].includes('#### Language - Node.js ####'));
    ok(dockerignoreCall[1].includes('#### Tooling - Nova ####'));
    ok(dockerignoreCall[1].includes('**/.env'));
    ok(dockerignoreCall[1].includes('**/.env.*'));
    ok(dockerignoreCall[1].includes('!**/.env.sample'));
    ok(dockerignoreCall[1].includes('!**/.env.*.sample'));
    ok(dockerignoreCall[1].includes('!**/.env.example'));
    ok(dockerignoreCall[1].includes('**/.secrets'));
    ok(dockerignoreCall[1].includes('**/build'));
    ok(dockerignoreCall[1].includes('**/dist'));
    ok(dockerignoreCall[1].includes('**/node_modules'));
    ok(dockerignoreCall[1].includes('**/*.log'));
    ok(dockerignoreCall[1].includes('**/npm-debug.log*'));
    ok(assetsignoreCall[1].includes('_worker.js'));
    ok(assetsignoreCall[1].includes('private-assets/'));
    ok(gitignoreCall[3] !== undefined);
    ok(dockerignoreCall[3] !== undefined);
    ok(assetsignoreCall[3] !== undefined);
    strictEqual(gitignoreCall[3]['command'], 'nova generate must-haves ignore-files');
    strictEqual(dockerignoreCall[3]['command'], 'nova generate must-haves ignore-files');
    strictEqual(assetsignoreCall[3]['command'], 'nova generate must-haves ignore-files');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  return;
});
