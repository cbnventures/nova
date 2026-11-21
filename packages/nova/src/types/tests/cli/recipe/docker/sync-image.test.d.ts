import type { Dirent } from 'node:fs';

import type { vi } from 'vitest';

import type {
  Shared_DockerPackagingFileChange,
  Shared_DockerPackagingManifest,
  Shared_DockerPackagingStringMap,
  Shared_DockerPackagingSyncResult,
  Shared_NovaConfig,
} from '../../../../shared.d.ts';

/**
 * Tests - CLI - Recipe - Docker - Sync Image - Run.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_OriginalCwd = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_SandboxRoot = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_FixturesDirectory = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_EnabledConfig = Shared_NovaConfig;

/**
 * Tests - CLI - Recipe - Docker - Sync Image - CLI Recipe Docker Sync Image Run - Copy Fixture.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_FixtureName = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Label = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Returns = Promise<string>;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_ProjectDirectory = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_FixtureDirectory = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Entries = Dirent[];

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_TargetPath = string;

/**
 * Tests - CLI - Recipe - Docker - Sync Image - CLI Recipe Docker Sync Image Run - Dry Run Writes Nothing.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_DryRunWritesNothing_ProjectDirectory = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_DryRunWritesNothing_DockerfileExists = boolean;

/**
 * Tests - CLI - Recipe - Docker - Sync Image - CLI Recipe Docker Sync Image Run - Keeps Project Files And Scripts And Deletes Only Stale Nova Files.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_ProjectDirectory = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_RootfsDirectory = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_ProjectFilePath = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_ManifestPath = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Manifest = Shared_DockerPackagingManifest;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Result = Shared_DockerPackagingSyncResult;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_AssemblyPackage = Record<string, unknown>;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Scripts = Shared_DockerPackagingStringMap;

/**
 * Tests - CLI - Recipe - Docker - Sync Image - CLI Recipe Docker Sync Image Run - Lists Every File It Would Create In A Dry Run.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ListsEveryFileItWouldCreateInADryRun_ProjectDirectory = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ListsEveryFileItWouldCreateInADryRun_Result = Shared_DockerPackagingSyncResult;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ListsEveryFileItWouldCreateInADryRun_DockerfileChange = Shared_DockerPackagingFileChange | undefined;

/**
 * Tests - CLI - Recipe - Docker - Sync Image - CLI Recipe Docker Sync Image Run - Path Exists.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_PathExists_TargetPath = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_PathExists_Returns = Promise<boolean>;

/**
 * Tests - CLI - Recipe - Docker - Sync Image - CLI Recipe Docker Sync Image Run - Reads A Schema Version 1 Manifest Without Rewriting It.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_ProjectDirectory = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_ManifestPath = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_ManifestContent = string;

export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_Dockerfile = string;

/**
 * Tests - CLI - Recipe - Docker - Sync Image - CLI Recipe Docker Sync Image Run - Skips When The Recipe Is Not Enabled.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_SkipsWhenTheRecipeIsNotEnabled_SyncImageSpy = ReturnType<typeof vi['spyOn']>;
