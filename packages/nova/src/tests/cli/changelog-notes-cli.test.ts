import { strictEqual } from 'node:assert/strict';
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
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import type {
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ChangelogContent,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ChangelogPath,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_Config,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ConfigContent,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ConfigPath,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_EnvContent,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_EnvPath,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_OriginalArgv,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_OriginalCwd,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_OriginalLogLevel,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_PrintsOnlyTheReleaseBody_Output,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_PrintsOnlyTheReleaseBody_StderrChunks,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_PrintsOnlyTheReleaseBody_StderrOutput,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_PrintsOnlyTheReleaseBody_StdoutChunks,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ProjectDirectory,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ReleaseBody,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_SandboxPrefix,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_SerializedConfig,
  Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_WorkspaceDirectory,
} from '../../types/tests/cli/changelog-notes-cli.test.d.ts';

/**
 * Tests - CLI - Changelog Notes CLI - Changelog Notes CLI Stdout Purity.
 *
 * @since 0.50.0
 */
describe('changelog notes CLI stdout purity', async () => {
  const originalArgv: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_OriginalArgv = process.argv;
  const originalCwd: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_OriginalCwd = process.cwd();
  const originalLogLevel: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_OriginalLogLevel = process.env['LOG_LEVEL'];
  const sandboxPrefix: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_SandboxPrefix = join(tmpdir(), 'nova-changelog-notes-cli-');
  const projectDirectory: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ProjectDirectory = await mkdtemp(sandboxPrefix);
  const workspaceDirectory: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_WorkspaceDirectory = join(projectDirectory, 'packages/package');
  const envPath: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_EnvPath = join(projectDirectory, '.env');
  const configPath: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ConfigPath = join(projectDirectory, 'nova.config.json');
  const changelogPath: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');
  const config: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_Config = {
    workspaces: {
      './packages/package': {
        name: 'package',
        role: 'package',
        policy: 'distributable',
      },
    },
  };
  const serializedConfig: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_SerializedConfig = JSON.stringify(config, null, 2);
  const envContent: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_EnvContent = [
    'LOG_LEVEL=debug',
    '',
  ].join('\n');
  const configContent: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ConfigContent = [
    serializedConfig,
    '',
  ].join('\n');
  const changelogContent: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ChangelogContent = [
    '# package',
    '',
    '## 1.2.3 - 2026-11-21',
    '',
    '### FIXED',
    '- Keeps stdout pure.',
    '',
  ].join('\n');
  const releaseBody: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_ReleaseBody = [
    '## package',
    '',
    '### FIXED',
    '',
    '- Keeps stdout pure.',
    '',
  ].join('\n');

  await mkdir(workspaceDirectory, { recursive: true });

  await Promise.all([
    writeFile(envPath, envContent, 'utf-8'),
    writeFile(configPath, configContent, 'utf-8'),
    writeFile(changelogPath, changelogContent, 'utf-8'),
  ]);

  beforeEach(() => {
    vi.clearAllMocks();

    vi.resetModules();

    process.chdir(projectDirectory);

    Reflect.deleteProperty(process.env, 'LOG_LEVEL');

    return;
  });

  afterEach(() => {
    process.argv = originalArgv;
    process.chdir(originalCwd);

    if (originalLogLevel === undefined) {
      Reflect.deleteProperty(process.env, 'LOG_LEVEL');
    } else {
      Reflect.set(process.env, 'LOG_LEVEL', originalLogLevel);
    }

    return;
  });

  afterAll(async () => {
    await rm(projectDirectory, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('prints only the release body', async () => {
    const stdoutChunks: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_PrintsOnlyTheReleaseBody_StdoutChunks = [];
    const stderrChunks: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_PrintsOnlyTheReleaseBody_StderrChunks = [];

    vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      stdoutChunks.push(String(chunk));

      return true;
    });

    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      stderrChunks.push(String(chunk));

      return true;
    });

    process.argv = [
      'node',
      'nova',
      'utility',
      'changelog',
      '--notes',
      '--version',
      '1.2.3',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(stdoutChunks.join('').endsWith(releaseBody)).toBe(true);

      return;
    });

    const output: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_PrintsOnlyTheReleaseBody_Output = stdoutChunks.join('');
    const stderrOutput: Tests_Cli_ChangelogNotesCli_ChangelogNotesCLIStdoutPurity_PrintsOnlyTheReleaseBody_StderrOutput = stderrChunks.join('');

    strictEqual(output, releaseBody);
    strictEqual(output.endsWith('\n'), true);
    strictEqual(output.endsWith('\n\n'), false);
    strictEqual(stderrOutput.includes('Loaded ".env" from'), true);

    return;
  });

  return;
});
