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

import { afterAll, describe, it } from 'vitest';

import { Runner as CliGenerateMustHavesAgentConventions } from '../../../../cli/generate/must-haves/agent-conventions.js';

import type {
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_AgentsMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_ClaudeMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_CursorrulesPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_PackageJson,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_ProjectRulesMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_UniversalMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_VisionMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_OriginalCwd,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_ClaudeMdPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_Exists,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_PackageJson,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_RespectsDryRun_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_SandboxRoot,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_TemporaryDirectory,
  Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_TemporaryPrefix,
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

  it('generates files from template', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_ProjectDirectory = join(sandboxRoot, 'generates-files');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_PackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesAgentConventions.run({});

    const cursorrulesPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_CursorrulesPath = join(projectDirectory, '.cursorrules');
    const claudeMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_ClaudeMdPath = join(projectDirectory, 'CLAUDE.md');
    const agentsMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_AgentsMdPath = join(projectDirectory, 'AGENTS.md');
    const visionMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_VisionMdPath = join(projectDirectory, 'VISION.md');
    const projectRulesMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_ProjectRulesMdPath = join(projectDirectory, 'PROJECT_RULES.md');
    const universalMdPath: Tests_Cli_Generate_MustHaves_AgentConventions_CliGenerateMustHavesAgentConventionsRun_GeneratesFilesFromTemplate_UniversalMdPath = join(projectDirectory, 'conventions', 'universal.md');

    await access(cursorrulesPath);

    await access(claudeMdPath);

    await access(agentsMdPath);

    await access(visionMdPath);

    await access(projectRulesMdPath);

    await access(universalMdPath);

    return;
  });

  return;
});
