import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll, afterEach, beforeEach, describe, it, vi,
} from 'vitest';

import { Runner as ApiSpdxLicenses } from '../../../../api/spdx-licenses.js';
import { Runner as CliRecipePackageJsonSyncIdentity } from '../../../../cli/recipe/package-json/sync-identity.js';

import type {
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_LogOutput,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SandboxPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_MtimeAfterSecondRun,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_MtimeBeforeSecondRun,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_SecondRunLogOutput,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_LicensePath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_NovaConfigContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_NovaConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_Output,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_PackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_PackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_Parsed,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_WorkspacePackageJsonContents,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_WorkspacePackageJsonPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_TemporaryDirectory,
} from '../../../../types/tests/cli/recipe/package-json/sync-identity.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Sync Identity - Run.
 *
 * @since 0.14.0
 */
describe('CliRecipePackageJsonSyncIdentity.run', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SandboxRoot = await mkdtemp(sandboxPath);

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      licenses: [
        { licenseId: 'MIT' },
        { licenseId: 'Apache-2.0' },
        { licenseId: 'ISC' },
      ],
    }))));

    return;
  });

  afterEach(() => {
    ApiSpdxLicenses.resetForTesting();

    vi.restoreAllMocks();

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('skips when no workspaces have the recipe enabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_ProjectDirectory = join(sandboxRoot, 'no-recipe');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_PackageJsonContents = JSON.stringify({
      name: 'test-no-recipe',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_WorkspacePackageJsonContents = JSON.stringify({
      name: 'wrong-name',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    // The name should not have been synced because the recipe is not enabled.
    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SkipsWhenNoWorkspacesHaveTheRecipeEnabled_Parsed = JSON.parse(output);

    strictEqual(parsed['name'], 'wrong-name');

    return;
  });

  it('syncs name from workspace manifest', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_ProjectDirectory = join(sandboxRoot, 'sync-name');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_PackageJsonContents = JSON.stringify({
      name: 'test-sync-name',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/core': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_WorkspacePackageJsonContents = JSON.stringify({
      name: 'wrong-name',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsNameFromWorkspaceManifest_Parsed = JSON.parse(output);

    strictEqual(parsed['name'], '@test/core');

    return;
  });

  it('syncs license to proprietary reference from nova config', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_ProjectDirectory = join(sandboxRoot, 'sync-license-proprietary');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_PackageJsonContents = JSON.stringify({
      name: 'test-license-proprietary',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_NovaConfigContents = JSON.stringify({
      project: {
        license: 'Proprietary',
      },
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/core': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      license: 'MIT',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    const licensePath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_LicensePath = join(workspaceDirectory, 'LICENSE');

    await writeFile(licensePath, 'Proprietary license.\n', 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToProprietaryReferenceFromNovaConfig_Parsed = JSON.parse(output);

    strictEqual(parsed['license'], 'SEE LICENSE IN ./LICENSE');

    return;
  });

  it('syncs license to spdx identifier from nova config', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_ProjectDirectory = join(sandboxRoot, 'sync-license-spdx');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_PackageJsonContents = JSON.stringify({
      name: 'test-license-spdx',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_NovaConfigContents = JSON.stringify({
      project: {
        license: 'MIT',
      },
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/core': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
      license: 'Apache-2.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsLicenseToSpdxIdentifierFromNovaConfig_Parsed = JSON.parse(output);

    strictEqual(parsed['license'], 'MIT');

    return;
  });

  it('sets freezable workspace version to 0.0.0', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_ProjectDirectory = join(sandboxRoot, 'freezable-version');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_WorkspaceDirectory = join(projectDirectory, 'packages', 'config');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_PackageJsonContents = JSON.stringify({
      name: 'test-freezable',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/config': {
          name: 'config-test',
          role: 'config',
          policy: 'freezable',
        },
      },
      recipes: {
        'package-json': {
          './packages/config': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_WorkspacePackageJsonContents = JSON.stringify({
      name: 'config-test',
      version: '1.2.3',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SetsFreezableWorkspaceVersionTo000_Parsed = JSON.parse(output);

    strictEqual(parsed['version'], '0.0.0');

    return;
  });

  it('does not modify files during dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_PackageJsonContents = JSON.stringify({
      name: 'test-dry-run',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/core': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_WorkspacePackageJsonContents = JSON.stringify({
      name: 'wrong-name',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    // The file should not have been modified.
    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_DoesNotModifyFilesDuringDryRun_Parsed = JSON.parse(output);

    strictEqual(parsed['name'], 'wrong-name');

    return;
  });

  it('syncs displayName from project title', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_ProjectDirectory = join(sandboxRoot, 'sync-display-name');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_PackageJsonContents = JSON.stringify({
      name: 'test-display-name',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          title: 'Example Plugin',
          slug: 'example-plugin',
        },
      },
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/core': {
            'sync-identity': {
              enabled: true,
              settings: {
                displayName: true,
              },
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_Parsed = JSON.parse(output);

    strictEqual(parsed['displayName'], 'Example Plugin');

    // Re-run the recipe to confirm it is idempotent once "displayName" already matches.
    const mtimeBeforeSecondRun: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_MtimeBeforeSecondRun = (await stat(workspacePackageJsonPath)).mtimeMs;

    vi.mocked(process.stdout.write).mockClear();

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    const mtimeAfterSecondRun: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_MtimeAfterSecondRun = (await stat(workspacePackageJsonPath)).mtimeMs;

    strictEqual(mtimeAfterSecondRun, mtimeBeforeSecondRun);

    const secondRunLogOutput: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_SyncsDisplayNameFromProjectTitle_SecondRunLogOutput = vi.mocked(process.stdout.write).mock.calls.map((call) => String(call[0])).join('');

    strictEqual(secondRunLogOutput.includes('Syncing "displayName"'), false);

    return;
  });

  it('removes displayName when workspace policy disallows it', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_ProjectDirectory = join(sandboxRoot, 'remove-display-name-policy');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_PackageJsonContents = JSON.stringify({
      name: 'test-remove-display-name-policy',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          title: 'Example Plugin',
          slug: 'example-plugin',
        },
      },
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'template',
          policy: 'freezable',
        },
      },
      recipes: {
        'package-json': {
          './packages/core': {
            'sync-identity': {
              enabled: true,
              settings: {
                displayName: true,
              },
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '0.0.0',
      displayName: 'Stale Name',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenWorkspacePolicyDisallowsIt_Parsed = JSON.parse(output);

    strictEqual('displayName' in parsed, false);

    return;
  });

  it('removes displayName when not managed for the workspace', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_ProjectDirectory = join(sandboxRoot, 'remove-display-name-not-managed');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_PackageJsonContents = JSON.stringify({
      name: 'test-remove-display-name-not-managed',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          title: 'Example Plugin',
          slug: 'example-plugin',
        },
      },
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/core': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '0.0.1',
      displayName: 'Stale Name',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNotManagedForTheWorkspace_Parsed = JSON.parse(output);

    strictEqual('displayName' in parsed, false);

    return;
  });

  it('removes displayName when no project title is defined', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_ProjectDirectory = join(sandboxRoot, 'remove-display-name-no-title');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_PackageJsonContents = JSON.stringify({
      name: 'test-remove-display-name-no-title',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_NovaConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/core': {
            'sync-identity': {
              enabled: true,
              settings: {
                displayName: true,
              },
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '0.0.1',
      displayName: 'Stale Name',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_RemovesDisplayNameWhenNoProjectTitleIsDefined_Parsed = JSON.parse(output);

    strictEqual('displayName' in parsed, false);

    return;
  });

  it('leaves an unmanaged manifest without displayName untouched', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_ProjectDirectory = join(sandboxRoot, 'leave-unmanaged-display-name');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_PackageJsonContents = JSON.stringify({
      name: 'test-leave-unmanaged-display-name',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const novaConfigPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const novaConfigContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          title: 'Example Plugin',
          slug: 'example-plugin',
        },
      },
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/core': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
    }, null, 2);

    await writeFile(novaConfigPath, novaConfigContents, 'utf-8');

    const workspacePackageJsonPath: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');
    const workspacePackageJsonContents: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_WorkspacePackageJsonContents = JSON.stringify({
      name: '@test/core',
      version: '0.0.1',
    }, null, 2);

    await writeFile(workspacePackageJsonPath, workspacePackageJsonContents, 'utf-8');

    process.chdir(projectDirectory);

    vi.mocked(process.stdout.write).mockClear();

    await CliRecipePackageJsonSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_Output = await readFile(workspacePackageJsonPath, 'utf-8');
    const parsed: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_Parsed = JSON.parse(output);

    strictEqual('displayName' in parsed, false);

    const logOutput: Tests_Cli_Recipe_PackageJson_SyncIdentity_CliRecipePackageJsonSyncIdentityRun_LeavesAnUnmanagedManifestWithoutDisplayNameUntouched_LogOutput = vi.mocked(process.stdout.write).mock.calls.map((call) => String(call[0])).join('');

    strictEqual(logOutput.includes('Removing "displayName"'), false);

    return;
  });

  return;
});
