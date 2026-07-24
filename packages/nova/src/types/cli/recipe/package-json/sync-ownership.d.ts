import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_RecipeEntry_Settings,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_PackageJson,
  Shared_NovaConfig_Recipes_PackageJsonWorkspace,
  Shared_NovaConfigConfig,
  Shared_NovaConfigEntity,
  Shared_NovaConfigWorkspace,
  Shared_WorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Sync Ownership - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Workspace = Shared_WorkspaceManifest;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Returns = void;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Manifest = Shared_NovaConfigWorkspace;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageHomepage = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageBugs = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageAuthor = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageContributors = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageFundingSources = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageRepository = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_RecipesBlock = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Recipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_RecipeEntry = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_RecipeSettings = Shared_NovaConfig_RecipeEntry_Settings | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidHomepage = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidBugs_Email = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidBugs_Url = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidBugs = {
  email: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidBugs_Email;
  url: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidBugs_Url;
};

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidAuthor_Name = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidAuthor_Email = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidAuthor_Url = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidAuthor = {
  name: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidAuthor_Name;
  email: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidAuthor_Email;
  url: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidAuthor_Url;
};

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_AuthorEntity = Shared_NovaConfigEntity | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Name = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Email = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Url = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor = {
  name: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Name;
  email: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Email;
  url: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Url;
};

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributors = Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor[];

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Entities = Shared_NovaConfig_Entities;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidFundingSources = string[] | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidRepository_Type = string;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidRepository_Url = string;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidRepository_Directory = string;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidRepository = {
  type: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidRepository_Type;
  url: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidRepository_Url;
  directory?: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidRepository_Directory;
} | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_RepositoryUrl = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ProjectRoot = string;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageDirectory = string;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_RelativeDirectory = string;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_RepositoryDirectory = string;

/**
 * CLI - Recipe - package.json - Sync Ownership - Run.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_Options = {
  dryRun?: Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_WorkingFileWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_RecipesBlock = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_PackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_EligibleWorkspaces = [string, Shared_NovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_WorkspacePathFilter = string;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_WorkspaceRecipesFilter = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_RecipeEntryFilter = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_Workspaces = Shared_WorkspaceManifest[];
