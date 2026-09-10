import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigSettings_VersionStrategy,
  Shared_NovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Policy,
} from '../shared.d.ts';

/**
 * Lib - Release History - Validate Strategy.
 *
 * @since 0.26.0
 */
export type Lib_ReleaseHistory_Runner_ValidateStrategy_Config = Shared_NovaConfig;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_CurrentDirectory = string;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_Returns = Promise<Shared_NovaConfigSettings_VersionStrategy | undefined>;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_ConfiguredStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_Workspaces = Shared_NovaConfig_Workspaces;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogPaths = Set<string>;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_WorkspacePath = string;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_WorkspaceConfig = Shared_NovaConfigWorkspace;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_WorkspacePolicy = Shared_NovaConfigWorkspace_Policy;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogPath = string;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogFile_Path = string;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogFile_Content = string;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogFile = {
  path: Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogFile_Path;
  content: Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogFile_Content;
};

export type Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogFiles = (Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogFile | undefined)[];

export type Lib_ReleaseHistory_Runner_ValidateStrategy_Content = string | undefined;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_SemverPaths = Set<string>;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_CalverPaths = Set<string>;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_Lines = string[];

export type Lib_ReleaseHistory_Runner_ValidateStrategy_MixedMessageLines = string[];

export type Lib_ReleaseHistory_Runner_ValidateStrategy_DetectedStrategy = Shared_NovaConfigSettings_VersionStrategy | undefined;

export type Lib_ReleaseHistory_Runner_ValidateStrategy_DetectedPaths = Set<string> | undefined;
