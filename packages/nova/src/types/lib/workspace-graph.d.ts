import type {
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigWorkspace,
  Shared_WorkspaceGraph,
  Shared_WorkspaceGraphNode_Dependencies,
} from '../shared.d.ts';

/**
 * Lib - Workspace Graph.
 *
 * @since 0.41.1
 */
export type Lib_WorkspaceGraph_DependencyFields = string[];

export type Lib_WorkspaceGraph_LocalSpecPrefixes = string[];

/**
 * Lib - Workspace Graph - Runner - Read.
 *
 * @since 0.41.1
 */
export type Lib_WorkspaceGraph_Runner_Read_ProjectDirectory = string;

export type Lib_WorkspaceGraph_Runner_Read_Workspaces = Shared_NovaConfig_Workspaces;

export type Lib_WorkspaceGraph_Runner_Read_Returns = Promise<Shared_WorkspaceGraph>;

export type Lib_WorkspaceGraph_Runner_Read_Paths = string[];

export type Lib_WorkspaceGraph_Runner_Read_Directories = string[];

export type Lib_WorkspaceGraph_Runner_Read_PackageJsons = Record<string, unknown>[];

export type Lib_WorkspaceGraph_Runner_Read_Names = string[];

export type Lib_WorkspaceGraph_Runner_Read_PackageName = unknown;

export type Lib_WorkspaceGraph_Runner_Read_Workspace = Shared_NovaConfigWorkspace | undefined;

export type Lib_WorkspaceGraph_Runner_Read_Graph = Shared_WorkspaceGraph;

/**
 * Lib - Workspace Graph - Runner - Read Package Json.
 *
 * @since 0.41.1
 */
export type Lib_WorkspaceGraph_Runner_ReadPackageJson_Directory = string;

export type Lib_WorkspaceGraph_Runner_ReadPackageJson_Returns = Promise<Record<string, unknown>>;

export type Lib_WorkspaceGraph_Runner_ReadPackageJson_RawContent = string;

export type Lib_WorkspaceGraph_Runner_ReadPackageJson_ParsedContent = unknown;

/**
 * Lib - Workspace Graph - Runner - Resolve Dependencies.
 *
 * @since 0.41.1
 */
export type Lib_WorkspaceGraph_Runner_ResolveDependencies_PackageJson = Record<string, unknown>;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_SelfPath = string;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_Directory = string;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_Paths = string[];

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_Directories = string[];

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_Names = string[];

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_Returns = Shared_WorkspaceGraphNode_Dependencies;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_DependencyPaths = Set<string>;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_FieldValue = unknown;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_DependencyName = string;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_Spec = unknown;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_NamedPath = string | undefined;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_LocalPrefix = string | undefined;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_LocalPath = string;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_TargetDirectory = string;

export type Lib_WorkspaceGraph_Runner_ResolveDependencies_LocalWorkspacePath = string | undefined;
