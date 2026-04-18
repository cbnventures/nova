import type { LibNovaConfig } from '../../../lib/nova-config.js';

import type {
  SharedNovaConfigConfig,
  SharedNovaConfigEntities,
  SharedNovaConfigEntity,
  SharedNovaConfigProject,
  SharedNovaConfigProjectLicense,
  SharedNovaConfigProjectName,
  SharedNovaConfigUrls,
  SharedNovaConfigWorkflow,
  SharedNovaConfigWorkflows,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaces,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Nova Config - parseWorkflows (via load).
 *
 * @since 0.20.0
 */
export type TestsLibNovaConfigSharednovaconfigParseWorkflowsOriginalCwd = string;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsTemporaryDirectory = string;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsSandboxPrefix = string;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsSandboxRoot = string;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory = string;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath = string;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents = string;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig = LibNovaConfig;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded = SharedNovaConfigConfig;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsLoadedWorkflows = SharedNovaConfigWorkflows | undefined;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsFirstWorkflow = SharedNovaConfigWorkflow | undefined;

export type TestsLibNovaConfigSharednovaconfigParseWorkflowsSecondWorkflow = SharedNovaConfigWorkflow | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfig Constructor.
 *
 * @since 0.13.0
 */
export type TestsLibNovaConfigSharednovaconfigConstructorConfig = LibNovaConfig;

/**
 * Tests - Lib - Nova Config - SharedNovaConfig Load.
 *
 * @since 0.13.0
 */
export type TestsLibNovaConfigSharednovaconfigLoadOriginalCwd = string;

export type TestsLibNovaConfigSharednovaconfigLoadTemporaryDirectory = string;

export type TestsLibNovaConfigSharednovaconfigLoadSandboxPrefix = string;

export type TestsLibNovaConfigSharednovaconfigLoadSandboxRoot = string;

export type TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = string;

export type TestsLibNovaConfigSharednovaconfigLoadConfigData = Record<string, unknown>;

export type TestsLibNovaConfigSharednovaconfigLoadConfigPath = string;

export type TestsLibNovaConfigSharednovaconfigLoadConfigContents = string;

export type TestsLibNovaConfigSharednovaconfigLoadConfig = LibNovaConfig;

export type TestsLibNovaConfigSharednovaconfigLoadLoaded = SharedNovaConfigConfig;

export type TestsLibNovaConfigSharednovaconfigLoadLoadedProject = SharedNovaConfigProject | undefined;

export type TestsLibNovaConfigSharednovaconfigLoadLoadedProjectName = SharedNovaConfigProjectName | undefined;

export type TestsLibNovaConfigSharednovaconfigLoadLoadedWorkspaces = SharedNovaConfigWorkspaces | undefined;

export type TestsLibNovaConfigSharednovaconfigLoadRootWorkspace = SharedNovaConfigWorkspace | undefined;

export type TestsLibNovaConfigSharednovaconfigLoadCoreWorkspace = SharedNovaConfigWorkspace | undefined;

export type TestsLibNovaConfigSharednovaconfigLoadRootRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type TestsLibNovaConfigSharednovaconfigLoadRecipeKeys = string[];

export type TestsLibNovaConfigSharednovaconfigLoadLoadedEntities = SharedNovaConfigEntities | undefined;

export type TestsLibNovaConfigSharednovaconfigLoadFirstEntity = SharedNovaConfigEntity | undefined;

export type TestsLibNovaConfigSharednovaconfigLoadLicenses = SharedNovaConfigProjectLicense[];

export type TestsLibNovaConfigSharednovaconfigLoadLoadedUrls = SharedNovaConfigUrls | undefined;

/**
 * Tests - Lib - Nova Config - SharedNovaConfig Set And Save.
 *
 * @since 0.13.0
 */
export type TestsLibNovaConfigSharednovaconfigSetAndSaveOriginalCwd = string;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveTemporaryDirectory = string;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveSandboxPrefix = string;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveSandboxRoot = string;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveProjectDirectory = string;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveConfig = LibNovaConfig;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveFilePath = string;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveFileContents = string;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveParsed = Record<string, unknown>;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProject = Record<string, unknown>;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProjectName = Record<string, unknown>;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProjectDescription = Record<string, unknown>;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspaces = Record<string, unknown>;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspace = Record<string, unknown>;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveParsedEntities = Record<string, unknown>[];

export type TestsLibNovaConfigSharednovaconfigSetAndSaveParsedEntity = Record<string, unknown>;

export type TestsLibNovaConfigSharednovaconfigSetAndSaveParsedUrls = Record<string, unknown>;
