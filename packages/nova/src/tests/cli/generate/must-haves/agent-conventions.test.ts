import { strictEqual } from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateMustHavesAgentConventions } from '../../../../cli/generate/must-haves/agent-conventions.js';
import * as toolkit from '../../../../toolkit/index.js';

import type {
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_AgentsMdExists,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_AgentsMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_ClaudeMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_ConfigPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_PackageJson,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_ProjectRulesMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_UniversalMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_VisionMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_AgentsMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ClaudeMdExists,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ClaudeMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ConfigPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_PackageJson,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ProjectRulesMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_VisionMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_OriginalCwd,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_ClaudeMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_ConfigPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_Exists,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_PackageJson,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_SandboxRoot,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_TemporaryDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_TemporaryPrefix,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_ClaudeMdExists,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_ClaudeMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_CustomizedLoggerMock,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_HasNoAgentsWarning,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_LoggerCustomizeReturn,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_LoggerCustomizeSpy,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_PackageJson,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_WarnCalls,
} from '../../../../types/tests/cli/generate/must-haves/agent-conventions.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Agent Conventions - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesAgentConventions.run', async () => {
  const originalCwd: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesAgentConventions.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_PackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const configPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_ConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(configPath, `${JSON.stringify({ agents: ['claude-code'] }, null, 2)}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesAgentConventions.run({ dryRun: true });

    let exists: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_Exists = true;

    try {
      const claudeMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_ClaudeMdPath = join(projectDirectory, 'CLAUDE.md');

      await access(claudeMdPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('generates claude code only', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_ProjectDirectory = join(sandboxRoot, 'claude-code-only');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_PackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const configPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_ConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(configPath, `${JSON.stringify({ agents: ['claude-code'] }, null, 2)}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesAgentConventions.run({});

    const claudeMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_ClaudeMdPath = join(projectDirectory, 'CLAUDE.md');
    const agentsMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_AgentsMdPath = join(projectDirectory, 'AGENTS.md');
    const visionMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_VisionMdPath = join(projectDirectory, 'VISION.md');
    const projectRulesMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_ProjectRulesMdPath = join(projectDirectory, 'PROJECT_RULES.md');
    const universalMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_UniversalMdPath = join(projectDirectory, 'conventions', 'universal.md');

    await access(claudeMdPath);

    await access(visionMdPath);

    await access(projectRulesMdPath);

    await access(universalMdPath);

    let agentsMdExists: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesClaudeCodeOnly_AgentsMdExists = true;

    try {
      await access(agentsMdPath);
    } catch {
      agentsMdExists = false;
    }

    strictEqual(agentsMdExists, false);

    return;
  });

  it('generates codex only', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ProjectDirectory = join(sandboxRoot, 'codex-only');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_PackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const configPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(configPath, `${JSON.stringify({ agents: ['codex'] }, null, 2)}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesAgentConventions.run({});

    const agentsMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_AgentsMdPath = join(projectDirectory, 'AGENTS.md');
    const claudeMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ClaudeMdPath = join(projectDirectory, 'CLAUDE.md');
    const visionMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_VisionMdPath = join(projectDirectory, 'VISION.md');
    const projectRulesMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ProjectRulesMdPath = join(projectDirectory, 'PROJECT_RULES.md');

    await access(agentsMdPath);

    await access(visionMdPath);

    await access(projectRulesMdPath);

    let claudeMdExists: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesCodexOnly_ClaudeMdExists = true;

    try {
      await access(claudeMdPath);
    } catch {
      claudeMdExists = false;
    }

    strictEqual(claudeMdExists, false);

    return;
  });

  it('warns when no agents selected', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_ProjectDirectory = join(sandboxRoot, 'no-agents');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_PackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    const customizedLoggerMock: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_LoggerCustomizeReturn);

    await CliGenerateMustHavesAgentConventions.run({});

    const warnCalls: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_WarnCalls = customizedLoggerMock['warn']['mock']['calls'];

    const hasNoAgentsWarning: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_HasNoAgentsWarning = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('No AI agents selected. Nothing to generate.') === true
    ));

    loggerCustomizeSpy.mockRestore();

    strictEqual(hasNoAgentsWarning, true);

    let claudeMdExists: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_ClaudeMdExists = true;

    try {
      const claudeMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_WarnsWhenNoAgentsSelected_ClaudeMdPath = join(projectDirectory, 'CLAUDE.md');

      await access(claudeMdPath);
    } catch {
      claudeMdExists = false;
    }

    strictEqual(claudeMdExists, false);

    return;
  });

  return;
});
