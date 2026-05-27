import type { Runner as LibNovaConfig } from '../../../lib/nova-config.js';

import type {
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Features,
  Shared_NovaConfig_Github_Policies,
  Shared_NovaConfig_Github_Policies_MergeMethods,
  Shared_NovaConfig_Github_Recipes,
  Shared_NovaConfig_Github_Topics,
  Shared_NovaConfig_Project,
  Shared_NovaConfig_Project_License,
  Shared_NovaConfig_Project_Name,
  Shared_NovaConfig_Urls,
  Shared_NovaConfig_Workflows,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigConfig,
  Shared_NovaConfigEntity,
  Shared_NovaConfigWorkflow,
  Shared_NovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Recipes,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Nova Config - ParseGithub (via Load).
 *
 * @since 0.22.0
 */
export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubOriginalCwd = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubTemporaryDirectory = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubSandboxPrefix = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubSandboxRoot = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubConfigPath = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubConfigContents = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubConfig = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubLoaded = Shared_NovaConfigConfig;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubLoadedGithub = Shared_NovaConfig_Github | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubLoadedGithubRecipes = Shared_NovaConfig_Github_Recipes | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubLoadedGithubTopics = Shared_NovaConfig_Github_Topics | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubLoadedGithubFeatures = Shared_NovaConfig_Github_Features | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubLoadedGithubPolicies = Shared_NovaConfig_Github_Policies | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigParseGithubLoadedGithubPoliciesMergeMethods = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

/**
 * Tests - Lib - Nova Config - parseWorkflows (via load).
 *
 * @since 0.20.0
 */
export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsOriginalCwd = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsTemporaryDirectory = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsSandboxPrefix = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsSandboxRoot = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsConfigPath = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsConfigContents = string;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsConfig = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsLoaded = Shared_NovaConfigConfig;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsLoadedWorkflows = Shared_NovaConfig_Workflows | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsFirstWorkflow = Shared_NovaConfigWorkflow | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigParseWorkflowsSecondWorkflow = Shared_NovaConfigWorkflow | undefined;

/**
 * Tests - Lib - Nova Config - Shared_NovaConfig Constructor.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharednovaconfigConstructorConfig = LibNovaConfig;

/**
 * Tests - Lib - Nova Config - Shared_NovaConfig Load.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharednovaconfigLoadOriginalCwd = string;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadTemporaryDirectory = string;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadSandboxPrefix = string;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadSandboxRoot = string;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadConfigData = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadConfigPath = string;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadConfigContents = string;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadConfig = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadLoaded = Shared_NovaConfigConfig;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadLoadedProject = Shared_NovaConfig_Project | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadLoadedProjectName = Shared_NovaConfig_Project_Name | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadLoadedWorkspaces = Shared_NovaConfig_Workspaces | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadRootWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadCoreWorkspace = Shared_NovaConfigWorkspace | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadRootRecipes = Shared_NovaConfigWorkspace_Recipes | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadRecipeKeys = string[];

export type Tests_Lib_NovaConfig_SharednovaconfigLoadLoadedEntities = Shared_NovaConfig_Entities | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadFirstEntity = Shared_NovaConfigEntity | undefined;

export type Tests_Lib_NovaConfig_SharednovaconfigLoadLicenses = Shared_NovaConfig_Project_License[];

export type Tests_Lib_NovaConfig_SharednovaconfigLoadLoadedUrls = Shared_NovaConfig_Urls | undefined;

/**
 * Tests - Lib - Nova Config - Shared_NovaConfig Set And Save.
 *
 * @since 0.13.0
 */
export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveOriginalCwd = string;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveTemporaryDirectory = string;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveSandboxPrefix = string;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveSandboxRoot = string;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveProjectDirectory = string;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveConfig = LibNovaConfig;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveFilePath = string;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveFileContents = string;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveParsed = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveParsedProject = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveParsedProjectName = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveParsedProjectDescription = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveParsedWorkspaces = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveParsedWorkspace = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveParsedEntities = Record<string, unknown>[];

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveParsedEntity = Record<string, unknown>;

export type Tests_Lib_NovaConfig_SharednovaconfigSetAndSaveParsedUrls = Record<string, unknown>;
