import type {
  Shared_NovaConfig,
  Shared_NovaConfigSettings_VersionStrategy,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Version Strategy Migration.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionStrategyMigration_TemporaryPrefix = string;

export type Tests_Lib_VersionStrategyMigration_SandboxRoot = string;

export type Tests_Lib_VersionStrategyMigration_ProjectDirectory = string;

export type Tests_Lib_VersionStrategyMigration_PackageAPath = string;

export type Tests_Lib_VersionStrategyMigration_PackageBPath = string;

export type Tests_Lib_VersionStrategyMigration_ApplePath = string;

export type Tests_Lib_VersionStrategyMigration_AndroidPath = string;

export type Tests_Lib_VersionStrategyMigration_PackageA = Record<string, unknown>;

export type Tests_Lib_VersionStrategyMigration_PackageB = Record<string, unknown>;

export type Tests_Lib_VersionStrategyMigration_AppleContent = string;

export type Tests_Lib_VersionStrategyMigration_AndroidContent = string;

export type Tests_Lib_VersionStrategyMigration_Config = Shared_NovaConfig;

export type Tests_Lib_VersionStrategyMigration_Plan_CurrentStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Tests_Lib_VersionStrategyMigration_Plan_NextStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Tests_Lib_VersionStrategyMigration_Plan_Write_Path = string;

export type Tests_Lib_VersionStrategyMigration_Plan_Write_Content = string;

export type Tests_Lib_VersionStrategyMigration_Plan_Write = {
  path: Tests_Lib_VersionStrategyMigration_Plan_Write_Path;
  content: Tests_Lib_VersionStrategyMigration_Plan_Write_Content;
};

export type Tests_Lib_VersionStrategyMigration_Plan_Writes = Tests_Lib_VersionStrategyMigration_Plan_Write[];

export type Tests_Lib_VersionStrategyMigration_Plan = {
  currentStrategy: Tests_Lib_VersionStrategyMigration_Plan_CurrentStrategy;
  nextStrategy: Tests_Lib_VersionStrategyMigration_Plan_NextStrategy;
  writes: Tests_Lib_VersionStrategyMigration_Plan_Writes;
};

export type Tests_Lib_VersionStrategyMigration_UpdatedPackageA = Record<string, unknown>;

export type Tests_Lib_VersionStrategyMigration_UpdatedPackageB = Record<string, unknown>;

export type Tests_Lib_VersionStrategyMigration_UpdatedApple = string;

export type Tests_Lib_VersionStrategyMigration_UpdatedAndroid = string;

export type Tests_Lib_VersionStrategyMigration_UpdatedPackageADependencies = Record<string, unknown>;

/**
 * Tests - Lib - Version Strategy Migration - Prepare And Apply.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionStrategyMigration_PrepareAndApply_Returns = void;

/**
 * Tests - Lib - Version Strategy Migration - Prepare And Apply - Migrates Manifests Exact Pins And Authoritative Native Mirrors Together.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionStrategyMigration_PrepareAndApply_MigratesManifestsExactPinsAndAuthoritativeNativeMirrorsTogether_Returns = void;

/**
 * Tests - Lib - Version Strategy Migration - Prepare And Apply - Rejects Pending Entries Before Preparing Any Writes.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionStrategyMigration_PrepareAndApply_RejectsPendingEntriesBeforePreparingAnyWrites_Returns = void;
