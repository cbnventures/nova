import type {
  Shared_NovaConfig_Workspaces,
  Shared_WorkspaceGraph,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Workspace Graph - LibWorkspaceGraph.
 *
 * @since 0.41.1
 */
export type Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_SandboxRoot = string;

/**
 * Tests - Lib - Workspace Graph - LibWorkspaceGraph - ReadsInternalWorkspaceDependencies.
 *
 * @since 0.41.1
 */
export type Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Returns = Promise<void>;

export type Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Package_Path = string;

export type Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Package_Contents = Record<string, unknown>;

export type Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Package = {
  path: Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Package_Path;
  contents: Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Package_Contents;
};

export type Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Packages = Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Package[];

export type Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Workspaces = Shared_NovaConfig_Workspaces;

export type Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Graph = Shared_WorkspaceGraph;
