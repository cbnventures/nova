import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_NovaConfig_Entities as SharedNovaConfigEntities,
  Shared_NovaConfigConfig as SharedNovaConfigConfig,
  Shared_NovaConfigEntity as SharedNovaConfigEntity,
  Shared_NovaConfigWorkspace as SharedNovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Recipes as SharedNovaConfigWorkspaceRecipes,
  Shared_NovaConfigWorkspaceRecipeSettings as SharedNovaConfigWorkspaceRecipeSettings,
  Shared_NovaConfigWorkspaceRecipeTuple as SharedNovaConfigWorkspaceRecipeTuple,
  Shared_WorkspaceManifest as SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Sync Ownership - Handle.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Workspace = SharedWorkspaceManifest;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_WorkingFile = SharedNovaConfigConfig;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Returns = void;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_FileContents = Record<string, unknown>;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Manifest = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageHomepage = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageBugs = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageAuthor = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageContributors = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageFundingSources = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_PackageRepository = unknown;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Recipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_RecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_RecipeSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;

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

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_AuthorEntity = SharedNovaConfigEntity | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Name = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Email = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Url = string | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor = {
  name: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Name;
  email: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Email;
  url: Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor_Url;
};

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributors = Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_ValidContributor[];

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Handle_Entities = SharedNovaConfigEntities;

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

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_WorkingFile = SharedNovaConfigConfig;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_WorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_EligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_WorkspaceConfig = SharedNovaConfigWorkspace;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_WorkspaceRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_RecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type Cli_Recipe_PackageJson_SyncOwnership_Runner_Run_Workspaces = SharedWorkspaceManifest[];
