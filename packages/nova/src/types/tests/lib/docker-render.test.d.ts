import type { Dirent } from 'node:fs';

import type {
  Shared_DockerPackagingManifest,
  Shared_DockerPackagingWorkspacePackages,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Docker Render.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_FixturesDirectory = string;

export type Tests_Lib_DockerRender_DockerfileHeader = string[];

export type Tests_Lib_DockerRender_StagedDockerfileHeader = string[];

export type Tests_Lib_DockerRender_ComposeHeader = string[];

/**
 * Tests - Lib - Docker Render - Apply Differences.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_ApplyDifferences_Content = string;

export type Tests_Lib_DockerRender_ApplyDifferences_Difference_After = string[];

export type Tests_Lib_DockerRender_ApplyDifferences_Difference_Before = string[];

export type Tests_Lib_DockerRender_ApplyDifferences_Difference_Reason = string;

export type Tests_Lib_DockerRender_ApplyDifferences_Difference = {
  after: Tests_Lib_DockerRender_ApplyDifferences_Difference_After;
  before: Tests_Lib_DockerRender_ApplyDifferences_Difference_Before;
  reason: Tests_Lib_DockerRender_ApplyDifferences_Difference_Reason;
};

export type Tests_Lib_DockerRender_ApplyDifferences_Differences = Tests_Lib_DockerRender_ApplyDifferences_Difference[];

export type Tests_Lib_DockerRender_ApplyDifferences_Returns = string;

export type Tests_Lib_DockerRender_ApplyDifferences_Updated = string;

export type Tests_Lib_DockerRender_ApplyDifferences_Before = string;

/**
 * Tests - Lib - Docker Render - Build Manifest.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_BuildManifest_Overrides = Partial<Shared_DockerPackagingManifest>;

export type Tests_Lib_DockerRender_BuildManifest_Returns = Shared_DockerPackagingManifest;

/**
 * Tests - Lib - Docker Render - Copy Directory.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_CopyDirectory_Source = string;

export type Tests_Lib_DockerRender_CopyDirectory_Target = string;

export type Tests_Lib_DockerRender_CopyDirectory_Returns = Promise<void>;

export type Tests_Lib_DockerRender_CopyDirectory_Entries = Dirent[];

export type Tests_Lib_DockerRender_CopyDirectory_TargetPath = string;

/**
 * Tests - Lib - Docker Render - Lib Docker Render.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_SandboxRoot = string;

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Appends Project Labels And Copy Flags.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_AppendsProjectLabelsAndCopyFlags_Dockerfile = string;

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Exposes Every Service Port And Maps Them In Bridge Mode.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_ExposesEveryServicePortAndMapsThemInBridgeMode_ManifestInput = Shared_DockerPackagingManifest;

export type Tests_Lib_DockerRender_LibDockerRender_ExposesEveryServicePortAndMapsThemInBridgeMode_Dockerfile = string;

export type Tests_Lib_DockerRender_LibDockerRender_ExposesEveryServicePortAndMapsThemInBridgeMode_Compose = string;

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Refuses To Replace Nova Runtime Environment And Compose Identity Keys.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_RefusesToReplaceNovaRuntimeEnvironmentAndComposeIdentityKeys_Returns = void;

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Rejects Stage Fragments Without Their Own Stage And Stages Used Before They Exist.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_RejectsStageFragmentsWithoutTheirOwnStageAndStagesUsedBeforeTheyExist_Returns = void;

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Renders Global And Runtime Build Arguments In Their Declared Format.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_RendersGlobalAndRuntimeBuildArgumentsInTheirDeclaredFormat_Dockerfile = string;

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Reproduces The Discord Stonker Bot Files.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_ReproducesTheDiscordStonkerBotFiles_Rendered = string[];

export type Tests_Lib_DockerRender_LibDockerRender_ReproducesTheDiscordStonkerBotFiles_ShellVariableMarker = string;

export type Tests_Lib_DockerRender_LibDockerRender_ReproducesTheDiscordStonkerBotFiles_AptPackageLines = string[];

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Reproduces The Outpost Files.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_ReproducesTheOutpostFiles_Rendered = string[];

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Reproduces The Pfsense Actions Files.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_ReproducesThePfsenseActionsFiles_Rendered = string[];

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Reproduces The Transmission Vpn Files.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_ReproducesTheTransmissionVpnFiles_Rendered = string[];

/**
 * Tests - Lib - Docker Render - Lib Docker Render - Selects The Workspace Build Script And Offline Build For Each Package Manager.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_LibDockerRender_SelectsTheWorkspaceBuildScriptAndOfflineBuildForEachPackageManager_Manifest = Shared_DockerPackagingManifest;

export type Tests_Lib_DockerRender_LibDockerRender_SelectsTheWorkspaceBuildScriptAndOfflineBuildForEachPackageManager_BuildOrder = Shared_DockerPackagingWorkspacePackages;

export type Tests_Lib_DockerRender_LibDockerRender_SelectsTheWorkspaceBuildScriptAndOfflineBuildForEachPackageManager_PnpmDockerfile = string;

export type Tests_Lib_DockerRender_LibDockerRender_SelectsTheWorkspaceBuildScriptAndOfflineBuildForEachPackageManager_YarnDockerfile = string;

/**
 * Tests - Lib - Docker Render - Render Fixture.
 *
 * @since 0.49.0
 */
export type Tests_Lib_DockerRender_RenderFixture_FixtureName = string;

export type Tests_Lib_DockerRender_RenderFixture_SandboxRoot = string;

export type Tests_Lib_DockerRender_RenderFixture_Returns = Promise<string[]>;

export type Tests_Lib_DockerRender_RenderFixture_ProjectDirectory = string;

export type Tests_Lib_DockerRender_RenderFixture_Files = string[];

export type Tests_Lib_DockerRender_RenderFixture_CurrentDockerfileLines = string[];
