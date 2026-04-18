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

import { CliGenerateMustHavesAgentConventions } from '../../../../cli/generate/must-haves/agent-conventions.js';

import type {
  TestsCliGenerateMustHavesAgentConventionsRunAgentsMdPath,
  TestsCliGenerateMustHavesAgentConventionsRunClaudeMdPath,
  TestsCliGenerateMustHavesAgentConventionsRunCursorrulesPath,
  TestsCliGenerateMustHavesAgentConventionsRunExists,
  TestsCliGenerateMustHavesAgentConventionsRunOriginalCwd,
  TestsCliGenerateMustHavesAgentConventionsRunPackageJson,
  TestsCliGenerateMustHavesAgentConventionsRunPackageJsonPath,
  TestsCliGenerateMustHavesAgentConventionsRunProjectDirectory,
  TestsCliGenerateMustHavesAgentConventionsRunProjectRulesMdPath,
  TestsCliGenerateMustHavesAgentConventionsRunSandboxRoot,
  TestsCliGenerateMustHavesAgentConventionsRunTemporaryDirectory,
  TestsCliGenerateMustHavesAgentConventionsRunTemporaryPrefix,
  TestsCliGenerateMustHavesAgentConventionsRunUniversalMdPath,
  TestsCliGenerateMustHavesAgentConventionsRunVisionMdPath,
} from '../../../../types/tests/cli/generate/must-haves/agent-conventions.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Agent Conventions - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesAgentConventions.run', async () => {
  const originalCwd: TestsCliGenerateMustHavesAgentConventionsRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateMustHavesAgentConventionsRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateMustHavesAgentConventionsRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateMustHavesAgentConventionsRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliGenerateMustHavesAgentConventionsRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesAgentConventions.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliGenerateMustHavesAgentConventionsRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateMustHavesAgentConventionsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateMustHavesAgentConventionsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesAgentConventions.run({ dryRun: true });

    let exists: TestsCliGenerateMustHavesAgentConventionsRunExists = true;

    try {
      const claudeMdPath: TestsCliGenerateMustHavesAgentConventionsRunClaudeMdPath = join(projectDirectory, 'CLAUDE.md');

      await access(claudeMdPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('generates files from template', async () => {
    const projectDirectory: TestsCliGenerateMustHavesAgentConventionsRunProjectDirectory = join(sandboxRoot, 'generates-files');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateMustHavesAgentConventionsRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateMustHavesAgentConventionsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesAgentConventions.run({});

    const cursorrulesPath: TestsCliGenerateMustHavesAgentConventionsRunCursorrulesPath = join(projectDirectory, '.cursorrules');
    const claudeMdPath: TestsCliGenerateMustHavesAgentConventionsRunClaudeMdPath = join(projectDirectory, 'CLAUDE.md');
    const agentsMdPath: TestsCliGenerateMustHavesAgentConventionsRunAgentsMdPath = join(projectDirectory, 'AGENTS.md');
    const visionMdPath: TestsCliGenerateMustHavesAgentConventionsRunVisionMdPath = join(projectDirectory, 'VISION.md');
    const projectRulesMdPath: TestsCliGenerateMustHavesAgentConventionsRunProjectRulesMdPath = join(projectDirectory, 'PROJECT_RULES.md');
    const universalMdPath: TestsCliGenerateMustHavesAgentConventionsRunUniversalMdPath = join(projectDirectory, 'conventions', 'universal.md');

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
