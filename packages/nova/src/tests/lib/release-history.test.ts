import { rejects, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as LibReleaseHistory } from '../../lib/release-history.js';

import type {
  Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_ChangelogContent,
  Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_ChangelogPath,
  Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_Config,
  Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_ProjectDirectory,
  Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_Strategy,
  Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_WorkspaceDirectory,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_ChangelogContent,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_ChangelogPath,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_Config,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_ProjectDirectory,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_Strategy,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_ChangelogContent,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_ChangelogPath,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_Config,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_ProjectDirectory,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_Strategy,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_ChangelogContent,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_ChangelogPath,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_Config,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_ProjectDirectory,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_WorkspaceDirectory,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_CalverContent,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_CalverPath,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_Config,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_ProjectDirectory,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_SemverContent,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_SemverPath,
  Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_WorkspaceDirectory,
  Tests_Lib_ReleaseHistory_ValidateStrategy_SandboxRoot,
  Tests_Lib_ReleaseHistory_ValidateStrategy_TemporaryPrefix,
} from '../../types/tests/lib/release-history.test.d.ts';

/**
 * Tests - Lib - Release History - Validate Strategy.
 *
 * @since 0.26.0
 */
describe('validate strategy', async () => {
  const temporaryPrefix: Tests_Lib_ReleaseHistory_ValidateStrategy_TemporaryPrefix = join(tmpdir(), `nova-${'release-history'}-`);
  const sandboxRoot: Tests_Lib_ReleaseHistory_ValidateStrategy_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('detects CalVer from a non-freezable workspace', async () => {
    const projectDirectory: Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_ProjectDirectory = join(sandboxRoot, 'calver-workspace');
    const workspaceDirectory: Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_WorkspaceDirectory = join(projectDirectory, 'apps', 'demo');

    await mkdir(workspaceDirectory, { recursive: true });

    const changelogPath: Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');
    const changelogContent: Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_ChangelogContent = [
      '# Demo Changelog',
      '',
      '## 2026.8.5',
      '',
    ].join('\n');

    await writeFile(changelogPath, changelogContent, 'utf-8');

    const config: Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_Config = {
      workspaces: {
        './apps/demo': {
          name: 'demo',
          role: 'app',
          policy: 'trackable',
        },
        './templates/demo': {
          name: 'demo-template',
          role: 'template',
          policy: 'freezable',
        },
      },
      settings: {
        versionStrategy: 'calver',
      },
    };
    const strategy: Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_Strategy = await LibReleaseHistory.validateStrategy(config, projectDirectory);

    strictEqual(strategy, 'calver');

    return;
  });

  it('recognizes legacy SemVer headings', async () => {
    const projectDirectory: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_ProjectDirectory = join(sandboxRoot, 'legacy-semver');

    await mkdir(projectDirectory, { recursive: true });

    const changelogPath: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_ChangelogPath = join(projectDirectory, 'CHANGELOG.md');
    const changelogContent: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_ChangelogContent = [
      '# Project Changelog',
      '',
      '## 0.13.0 (2026-02-27)',
      '',
    ].join('\n');

    await writeFile(changelogPath, changelogContent, 'utf-8');

    const config: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_Config = {};
    const strategy: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_Strategy = await LibReleaseHistory.validateStrategy(config, projectDirectory);

    strictEqual(strategy, 'semver');

    return;
  });

  it('recognizes prerelease SemVer headings', async () => {
    const projectDirectory: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_ProjectDirectory = join(sandboxRoot, 'prerelease-semver');

    await mkdir(projectDirectory, { recursive: true });

    const changelogPath: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_ChangelogPath = join(projectDirectory, 'CHANGELOG.md');
    const changelogContent: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_ChangelogContent = [
      '# Project Changelog',
      '',
      '## 3.0.0-beta.24 - 2024-01-13',
      '',
    ].join('\n');

    await writeFile(changelogPath, changelogContent, 'utf-8');

    const config: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_Config = {};
    const strategy: Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_Strategy = await LibReleaseHistory.validateStrategy(config, projectDirectory);

    strictEqual(strategy, 'semver');

    return;
  });

  it('rejects a configured strategy that contradicts history', async () => {
    const projectDirectory: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_ProjectDirectory = join(sandboxRoot, 'strategy-conflict');
    const workspaceDirectory: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const changelogPath: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');
    const changelogContent: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_ChangelogContent = [
      '# Core Changelog',
      '',
      '## 2026.8.5',
      '',
    ].join('\n');

    await writeFile(changelogPath, changelogContent, 'utf-8');

    const config: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_Config = {
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
      settings: {
        versionStrategy: 'semver',
      },
    };

    await rejects(
      LibReleaseHistory.validateStrategy(config, projectDirectory),
      (error) => error instanceof Error && error.message.includes('conflicts with existing calver release history'),
    );

    return;
  });

  it('rejects mixed release history', async () => {
    const projectDirectory: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_ProjectDirectory = join(sandboxRoot, 'mixed-history');
    const workspaceDirectory: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const semverPath: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_SemverPath = join(projectDirectory, 'CHANGELOG.md');
    const semverContent: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_SemverContent = [
      '# Project Changelog',
      '',
      '## 1.2.3 - 2026-08-01',
      '',
    ].join('\n');
    const calverPath: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_CalverPath = join(workspaceDirectory, 'CHANGELOG.md');
    const calverContent: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_CalverContent = [
      '# Core Changelog',
      '',
      '## 2026.8.5',
      '',
    ].join('\n');

    await Promise.all([
      writeFile(semverPath, semverContent, 'utf-8'),
      writeFile(calverPath, calverContent, 'utf-8'),
    ]);

    const config: Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_Config = {
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    };

    await rejects(
      LibReleaseHistory.validateStrategy(config, projectDirectory),
      (error) => error instanceof Error && error.message.includes('mixes SemVer and CalVer headings'),
    );

    return;
  });

  return;
});
