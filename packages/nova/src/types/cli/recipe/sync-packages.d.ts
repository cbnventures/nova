import type { NovaConfig, WorkspaceManifest } from '@/types/shared.d.ts';

/**
 * CLI Recipe - Sync Packages - Handle artifacts.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleArtifactsWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleArtifactsReturns = Promise<void>;

/**
 * CLI Recipe - Sync Packages - Handle bundler.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleBundlerWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleBundlerReturns = void;

/**
 * CLI Recipe - Sync Packages - Handle corepack.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleCorepackWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleCorepackReturns = void;

/**
 * CLI Recipe - Sync Packages - Handle dependencies.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleDependenciesWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleDependenciesReturns = Promise<void>;

/**
 * CLI Recipe - Sync Packages - Handle environment.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleEnvironmentWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleEnvironmentReturns = Promise<void>;

/**
 * CLI Recipe - Sync Packages - Handle identity.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleIdentityWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleIdentityWorkingFile = NovaConfig;

export type CLIRecipeSyncPackagesHandleIdentityReturns = Promise<void>;

export type CLIRecipeSyncPackagesHandleIdentityNormalizedLicenseReference = string | undefined;

/**
 * CLI Recipe - Sync Packages - Handle ownership.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleOwnershipWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleOwnershipWorkingFile = NovaConfig;

export type CLIRecipeSyncPackagesHandleOwnershipReturns = void;

/**
 * CLI Recipe - Sync Packages - Handle publish.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandlePublishWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandlePublishReturns = Promise<void>;

/**
 * CLI Recipe - Sync Packages - Handle reorder.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleReorderWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleReorderReturns = void;

export type CLIRecipeSyncPackagesHandleReorderSortedKeys = Set<string>;

export type CLIRecipeSyncPackagesHandleReorderReordered = Record<string, unknown>;

/**
 * CLI Recipe - Sync Packages - Handle runtime.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleRuntimeWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleRuntimeReturns = void;

/**
 * CLI Recipe - Sync Packages - Handle tooling.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleToolingWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleToolingReturns = Promise<void>;

/**
 * CLI Recipe - Sync Packages - Handle unknown.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesHandleUnknownWorkspace = WorkspaceManifest;

export type CLIRecipeSyncPackagesHandleUnknownReturns = void;

export type CLIRecipeSyncPackagesHandleUnknownAllowedKeys = Set<string>;

/**
 * CLI Recipe - Sync Packages - Is empty.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesIsEmptyValue = unknown;

export type CLIRecipeSyncPackagesIsEmptyReturns = boolean;

/**
 * CLI Recipe - Sync Packages - Run.
 *
 * @since 1.0.0
 */
export type CLIRecipeSyncPackagesRunOptionsDryRun = true;

export type CLIRecipeSyncPackagesRunOptionsIgnoreUnknown = true;

export type CLIRecipeSyncPackagesRunOptionsReplaceFile = true;

export type CLIRecipeSyncPackagesRunOptions = {
  dryRun?: CLIRecipeSyncPackagesRunOptionsDryRun;
  ignoreUnknown?: CLIRecipeSyncPackagesRunOptionsIgnoreUnknown;
  replaceFile?: CLIRecipeSyncPackagesRunOptionsReplaceFile;
};

export type CLIRecipeSyncPackagesRunReturns = Promise<void>;
