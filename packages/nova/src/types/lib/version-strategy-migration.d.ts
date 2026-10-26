import type { Dirent } from 'node:fs';

import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigSettings_VersionStrategy,
  Shared_NovaConfigWorkspace,
} from '../shared.d.ts';

/**
 * Lib - Version Strategy Migration - Apply.
 *
 * @since 0.34.0
 */
export type Lib_VersionStrategyMigration_Runner_Apply_Plan_CurrentStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_VersionStrategyMigration_Runner_Apply_Plan_NextStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_VersionStrategyMigration_Runner_Apply_Plan_Write_Path = string;

export type Lib_VersionStrategyMigration_Runner_Apply_Plan_Write_Content = string;

export type Lib_VersionStrategyMigration_Runner_Apply_Plan_Write = {
  path: Lib_VersionStrategyMigration_Runner_Apply_Plan_Write_Path;
  content: Lib_VersionStrategyMigration_Runner_Apply_Plan_Write_Content;
};

export type Lib_VersionStrategyMigration_Runner_Apply_Plan_Writes = Lib_VersionStrategyMigration_Runner_Apply_Plan_Write[];

export type Lib_VersionStrategyMigration_Runner_Apply_Plan = {
  currentStrategy: Lib_VersionStrategyMigration_Runner_Apply_Plan_CurrentStrategy;
  nextStrategy: Lib_VersionStrategyMigration_Runner_Apply_Plan_NextStrategy;
  writes: Lib_VersionStrategyMigration_Runner_Apply_Plan_Writes;
};

export type Lib_VersionStrategyMigration_Runner_Apply_Returns = Promise<void>;

export type Lib_VersionStrategyMigration_Runner_Apply_Write_Path = string;

export type Lib_VersionStrategyMigration_Runner_Apply_Write_Content = string;

export type Lib_VersionStrategyMigration_Runner_Apply_Write = {
  path: Lib_VersionStrategyMigration_Runner_Apply_Write_Path;
  content: Lib_VersionStrategyMigration_Runner_Apply_Write_Content;
};

/**
 * Lib - Version Strategy Migration - Prepare.
 *
 * @since 0.34.0
 */
export type Lib_VersionStrategyMigration_Runner_Prepare_ProjectRoot = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_Config = Shared_NovaConfig;

export type Lib_VersionStrategyMigration_Runner_Prepare_CurrentStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_VersionStrategyMigration_Runner_Prepare_NextStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_VersionStrategyMigration_Runner_Prepare_Date = Date;

export type Lib_VersionStrategyMigration_Runner_Prepare_Result_CurrentStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_VersionStrategyMigration_Runner_Prepare_Result_NextStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_VersionStrategyMigration_Runner_Prepare_Result_Write_Path = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_Result_Write_Content = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_Result_Write = {
  path: Lib_VersionStrategyMigration_Runner_Prepare_Result_Write_Path;
  content: Lib_VersionStrategyMigration_Runner_Prepare_Result_Write_Content;
};

export type Lib_VersionStrategyMigration_Runner_Prepare_Result_Writes = Lib_VersionStrategyMigration_Runner_Prepare_Result_Write[];

export type Lib_VersionStrategyMigration_Runner_Prepare_Result = {
  currentStrategy: Lib_VersionStrategyMigration_Runner_Prepare_Result_CurrentStrategy;
  nextStrategy: Lib_VersionStrategyMigration_Runner_Prepare_Result_NextStrategy;
  writes: Lib_VersionStrategyMigration_Runner_Prepare_Result_Writes;
};

export type Lib_VersionStrategyMigration_Runner_Prepare_Returns = Promise<Lib_VersionStrategyMigration_Runner_Prepare_Result>;

export type Lib_VersionStrategyMigration_Runner_Prepare_ReleaseHistoryStrategy = Shared_NovaConfigSettings_VersionStrategy | undefined;

export type Lib_VersionStrategyMigration_Runner_Prepare_PendingDirectory = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_PendingFiles = Dirent[];

export type Lib_VersionStrategyMigration_Runner_Prepare_PendingEntries = string[];

export type Lib_VersionStrategyMigration_Runner_Prepare_Workspaces = Shared_NovaConfig_Workspaces;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_WorkspaceDirectory = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_WorkspaceName = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_Workspace = Shared_NovaConfigWorkspace;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_Path = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_Content = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_Manifest = Record<string, unknown>;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_CurrentVersion = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_NewVersion = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry = {
  workspaceDirectory: Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_WorkspaceDirectory;
  workspaceName: Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_WorkspaceName;
  workspace: Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_Workspace;
  path: Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_Path;
  content: Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_Content;
  manifest: Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_Manifest;
  currentVersion: Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_CurrentVersion;
  newVersion: Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry_NewVersion;
};

export type Lib_VersionStrategyMigration_Runner_Prepare_Manifests = Lib_VersionStrategyMigration_Runner_Prepare_ManifestEntry[];

export type Lib_VersionStrategyMigration_Runner_Prepare_WorkspaceEntry = [string, Shared_NovaConfigWorkspace];

export type Lib_VersionStrategyMigration_Runner_Prepare_WorkspacePath = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_Workspace = Shared_NovaConfigWorkspace;

export type Lib_VersionStrategyMigration_Runner_Prepare_WorkspaceDirectory = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestPath = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_ManifestContent = string | undefined;

export type Lib_VersionStrategyMigration_Runner_Prepare_Manifest = Record<string, unknown> | undefined;

export type Lib_VersionStrategyMigration_Runner_Prepare_ParsedManifest = unknown;

export type Lib_VersionStrategyMigration_Runner_Prepare_WorkspaceName = string | undefined;

export type Lib_VersionStrategyMigration_Runner_Prepare_CurrentVersion = string | undefined;

export type Lib_VersionStrategyMigration_Runner_Prepare_NewVersion = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_Write_Path = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_Write_Content = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_Write = {
  path: Lib_VersionStrategyMigration_Runner_Prepare_Write_Path;
  content: Lib_VersionStrategyMigration_Runner_Prepare_Write_Content;
};

export type Lib_VersionStrategyMigration_Runner_Prepare_Writes = Lib_VersionStrategyMigration_Runner_Prepare_Write[];

export type Lib_VersionStrategyMigration_Runner_Prepare_TypedDependencyField = 'dependencies' | 'devDependencies' | 'optionalDependencies' | 'peerDependencies';

export type Lib_VersionStrategyMigration_Runner_Prepare_DependencyFields = Lib_VersionStrategyMigration_Runner_Prepare_TypedDependencyField[];

export type Lib_VersionStrategyMigration_Runner_Prepare_UpdatedManifest = Record<string, unknown>;

export type Lib_VersionStrategyMigration_Runner_Prepare_DependencyValue = unknown;

export type Lib_VersionStrategyMigration_Runner_Prepare_UpdatedDependencies = Record<string, unknown>;

export type Lib_VersionStrategyMigration_Runner_Prepare_DependencyName = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_UpdatedContent = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_AndroidFilePaths = string[];

export type Lib_VersionStrategyMigration_Runner_Prepare_AndroidContent = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_VersionNamePattern = RegExp;

export type Lib_VersionStrategyMigration_Runner_Prepare_VersionCodePattern = RegExp;

export type Lib_VersionStrategyMigration_Runner_Prepare_VersionNames = string[];

export type Lib_VersionStrategyMigration_Runner_Prepare_VersionCodes = string[];

export type Lib_VersionStrategyMigration_Runner_Prepare_AndroidUpdatedContent = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_AppleDirectoryEntries = Dirent[];

export type Lib_VersionStrategyMigration_Runner_Prepare_AppleVersionFilePaths = string[];

export type Lib_VersionStrategyMigration_Runner_Prepare_XcodeGenPath = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_AppleVersionFileContent = string;

export type Lib_VersionStrategyMigration_Runner_Prepare_AppleIsXcodeGen = boolean;

export type Lib_VersionStrategyMigration_Runner_Prepare_AppleMarketingPattern = RegExp;

export type Lib_VersionStrategyMigration_Runner_Prepare_AppleBuildPattern = RegExp;

export type Lib_VersionStrategyMigration_Runner_Prepare_MarketingValues = string[];

export type Lib_VersionStrategyMigration_Runner_Prepare_MarketingValue = string | undefined;

export type Lib_VersionStrategyMigration_Runner_Prepare_AppleHasMarketing = boolean;

export type Lib_VersionStrategyMigration_Runner_Prepare_AppleHasBuild = boolean;

export type Lib_VersionStrategyMigration_Runner_Prepare_AppleUpdatedContent = string;
