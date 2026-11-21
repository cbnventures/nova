import type {
  Shared_NovaConfig,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes_Tsconfig,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - Tsconfig - Sync References - Run.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_WorkingFile = Shared_NovaConfig;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_TsconfigRecipes = Shared_NovaConfig_Recipes_Tsconfig | undefined;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_SyncReferences = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_WorkspacePaths = string[];

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_UpdatedCount = number;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_UpToDateCount = number;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_SkippedCount = number;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_Run_Result = 'skipped' | 'updated' | 'up-to-date';

/**
 * CLI - Recipe - Tsconfig - Sync References - Sync Directory.
 *
 * @since 0.49.0
 */
export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Directory = string;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_DisplayPath = string;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsDryRun = boolean;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsReplaceFile = boolean;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Returns = Promise<'skipped' | 'updated' | 'up-to-date'>;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_TsconfigPath = string;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_RelativePath = string;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_TsconfigExists = boolean;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Raw = string;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Parsed = unknown;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_IsReferenceOnly = boolean;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Entries = string[];

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Siblings = string[];

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_References_Item_Path = string;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_References_Item = {
  path: Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_References_Item_Path;
};

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_References = Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_References_Item[];

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Next = Record<string, unknown>;

export type Cli_Recipe_Tsconfig_SyncReferences_Runner_SyncDirectory_Content = string;
