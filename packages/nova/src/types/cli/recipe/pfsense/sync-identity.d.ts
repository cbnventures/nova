import type {
  Shared_DescriptionDestination,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_Pfsense,
  Shared_NovaConfigConfig,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - Pfsense - Sync Identity - Apply Makefile Variable.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Content = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_VariableName = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Value = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_MissingValueHint = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_DisplayPath = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_IsSilent = boolean;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_Returns = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ApplyMakefileVariable_UpdatedContent = string | undefined;

/**
 * CLI - Recipe - Pfsense - Sync Identity - Find Info File.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_ShareDirectory = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Returns = Promise<string | undefined>;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Entries = string[];

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_Candidates = string[];

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_FindInfoFile_ExistingCandidates = string[];

/**
 * CLI - Recipe - Pfsense - Sync Identity - Read Optional File.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ReadOptionalFile_FilePath = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_ReadOptionalFile_Returns = Promise<string | undefined>;

/**
 * CLI - Recipe - Pfsense - Sync Identity - Report.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_IsSilent = boolean;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Level = 'info' | 'warn';

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Message = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Report_Returns = void;

/**
 * CLI - Recipe - Pfsense - Sync Identity - Run.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_PfsenseRecipes = Shared_NovaConfig_Recipes_Pfsense | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_SyncIdentity = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_WorkspacePaths = string[];

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_TargetCount = number;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_WorkspaceDirectory = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_MakefilePath = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_Run_HasMakefile = boolean;

/**
 * CLI - Recipe - Pfsense - Sync Identity - Sync Workspace.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkspaceDirectory = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkspacePath = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsDryRun = boolean;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsReplaceFile = boolean;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_IsSilent = boolean;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Returns = Promise<boolean>;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_DisplayPath = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_CommentDestination = Shared_DescriptionDestination;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Comment = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_CommentLimitMessage = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PortDirectory = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_MakefilePath = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_MakefileContent = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_ShortDescription = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_LongDescription = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Homepage = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_Maintainer = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdate_FilePath = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdate_Content = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdate_UpdatedContent = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdate = {
  filePath: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdate_FilePath;
  content: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdate_Content;
  updatedContent: Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdate_UpdatedContent;
};

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdates = Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdate[];

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_UpdatedMakefileContent = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PackageDescription = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PackageDescriptionPath = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_PackageDescriptionContent = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_InfoDescription = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_InfoPath = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_InfoContent = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_UpdatedInfoContent = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_AboutPath = string;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_AboutContent = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_UpdatedAboutContent = string | undefined;

export type Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_ChangedFileUpdates = Cli_Recipe_Pfsense_SyncIdentity_Runner_SyncWorkspace_FileUpdate[];
