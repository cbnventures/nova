import type { ChildProcessWithoutNullStreams } from 'node:child_process';

import type { ChalkInstance } from 'chalk';

import type { Runner as LibNovaConfig } from '../../lib/nova-config.js';

import type {
  Shared_CorepackPackageManager,
  Shared_CorepackSpawnInvocation,
  Shared_NovaConfigConfig,
  Shared_NovaConfigSettings_RunWorkspaces_Root,
  Shared_NovaConfigSettings_RunWorkspacesCache,
  Shared_NovaConfigSettings_RunWorkspacesConcurrency,
  Shared_NovaConfigWorkspace,
  Shared_RunWorkspacesCacheRecord,
  Shared_RunWorkspacesOptions_Buffer,
  Shared_RunWorkspacesOptions_Concurrency,
  Shared_RunWorkspacesOptions_ContinueOnError,
  Shared_RunWorkspacesOptions_DryRun,
  Shared_RunWorkspacesOptions_ExcludeWorkspace,
  Shared_RunWorkspacesOptions_Force,
  Shared_RunWorkspacesOptions_NodeEnv,
  Shared_RunWorkspacesOptions_ScriptArgs,
  Shared_RunWorkspacesOptions_Task,
  Shared_RunWorkspacesOptions_Workspace,
  Shared_RunWorkspacesOutputQueue,
  Shared_RunWorkspacesPlan,
  Shared_RunWorkspacesProject,
  Shared_RunWorkspacesProject_Cache,
  Shared_RunWorkspacesState,
  Shared_RunWorkspacesTask,
  Shared_RunWorkspacesTaskResult,
  Shared_RunWorkspacesWorkspace,
} from '../shared.d.ts';

/**
 * Lib - Run Workspaces - Add Root Tasks.
 *
 * @since 0.34.0
 */
export type Lib_RunWorkspaces_Runner_AddRootTasks_Tasks = Map<string, Shared_RunWorkspacesTask>;

export type Lib_RunWorkspaces_Runner_AddRootTasks_Workspaces = Map<string, Shared_RunWorkspacesWorkspace>;

export type Lib_RunWorkspaces_Runner_AddRootTasks_Root = Shared_RunWorkspacesWorkspace;

export type Lib_RunWorkspaces_Runner_AddRootTasks_Script = string;

export type Lib_RunWorkspaces_Runner_AddRootTasks_Returns = void;

export type Lib_RunWorkspaces_Runner_AddRootTasks_Prefix = string;

export type Lib_RunWorkspaces_Runner_AddRootTasks_IsParallel = boolean;

export type Lib_RunWorkspaces_Runner_AddRootTasks_RootPrerequisiteKeys = Set<string>;

export type Lib_RunWorkspaces_Runner_AddRootTasks_TypedRootDependencyName = string;

export type Lib_RunWorkspaces_Runner_AddRootTasks_RootDependencyWorkspace = Shared_RunWorkspacesWorkspace | undefined;

export type Lib_RunWorkspaces_Runner_AddRootTasks_RootDependencyBuildKey = string | undefined;

export type Lib_RunWorkspaces_Runner_AddRootTasks_PendingPrerequisiteKeys = Set<string>;

export type Lib_RunWorkspaces_Runner_AddRootTasks_PrerequisiteTask = Shared_RunWorkspacesTask | undefined;

export type Lib_RunWorkspaces_Runner_AddRootTasks_TypedPrerequisiteDependencyKey = string;

export type Lib_RunWorkspaces_Runner_AddRootTasks_WorkspaceKeys = string[];

export type Lib_RunWorkspaces_Runner_AddRootTasks_PreviousKey = string | undefined;

export type Lib_RunWorkspaces_Runner_AddRootTasks_TypedRootScriptEntry = [string, string];

export type Lib_RunWorkspaces_Runner_AddRootTasks_RootScriptName = string;

export type Lib_RunWorkspaces_Runner_AddRootTasks_RootScriptCommand = string;

export type Lib_RunWorkspaces_Runner_AddRootTasks_Key = string;

export type Lib_RunWorkspaces_Runner_AddRootTasks_Task = Shared_RunWorkspacesTask;

export type Lib_RunWorkspaces_Runner_AddRootTasks_WorkspaceTask = Shared_RunWorkspacesTask | undefined;

/**
 * Lib - Run Workspaces - Add Task.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_AddTask_Tasks = Map<string, Shared_RunWorkspacesTask>;

export type Lib_RunWorkspaces_Runner_AddTask_Workspaces = Map<string, Shared_RunWorkspacesWorkspace>;

export type Lib_RunWorkspaces_Runner_AddTask_Workspace = Shared_RunWorkspacesWorkspace;

export type Lib_RunWorkspaces_Runner_AddTask_Script = string;

export type Lib_RunWorkspaces_Runner_AddTask_Returns = string | undefined;

export type Lib_RunWorkspaces_Runner_AddTask_Key = string;

export type Lib_RunWorkspaces_Runner_AddTask_ExistingTask = Shared_RunWorkspacesTask | undefined;

export type Lib_RunWorkspaces_Runner_AddTask_Task = Shared_RunWorkspacesTask;

export type Lib_RunWorkspaces_Runner_AddTask_DependencyWorkspace = Shared_RunWorkspacesWorkspace | undefined;

export type Lib_RunWorkspaces_Runner_AddTask_DependencyBuildKey = string | undefined;

export type Lib_RunWorkspaces_Runner_AddTask_PrerequisiteKey = string | undefined;

/**
 * Lib - Run Workspaces - Build Plan.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_BuildPlan_Workspaces = Map<string, Shared_RunWorkspacesWorkspace>;

export type Lib_RunWorkspaces_Runner_BuildPlan_SelectedWorkspaces = Shared_RunWorkspacesWorkspace[];

export type Lib_RunWorkspaces_Runner_BuildPlan_Script = string;

export type Lib_RunWorkspaces_Runner_BuildPlan_Returns = Shared_RunWorkspacesPlan;

export type Lib_RunWorkspaces_Runner_BuildPlan_Tasks = Map<string, Shared_RunWorkspacesTask>;

export type Lib_RunWorkspaces_Runner_BuildPlan_Skipped = string[];

export type Lib_RunWorkspaces_Runner_BuildPlan_Key = string | undefined;

/**
 * Lib - Run Workspaces - Detect Dependency Cycles.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_Workspaces = Map<string, Shared_RunWorkspacesWorkspace>;

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_Returns = void;

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_RemainingDependencies = Map<string, Set<string>>;

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_ReadyNames = string[];

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_ProcessedNames = Set<string>;

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_TypedWorkspaceEntry = [string, Shared_RunWorkspacesWorkspace];

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_TypedInitialEntry = [string, Set<string>];

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_Name = string | undefined;

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_TypedRemainingEntry = [string, Set<string>];

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_CandidateName = string;

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_Dependencies = Set<string>;

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_DependencyRemoved = boolean;

export type Lib_RunWorkspaces_Runner_DetectDependencyCycles_UnresolvedNames = string[];

/**
 * Lib - Run Workspaces - Execute Tasks.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_ExecuteTasks_Tasks = Map<string, Shared_RunWorkspacesTask>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_PackageManager = Shared_CorepackPackageManager;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_PackageManagerDescriptor = string;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_RootDirectory = string;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Cache = Shared_RunWorkspacesProject_Cache;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Force = boolean;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Concurrency = number;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ContinueOnError = boolean;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_BufferMs = number;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_NodeEnv = 'development' | 'production' | 'test' | undefined;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_RequestedTask = string;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ScriptArgs = string[];

export type Lib_RunWorkspaces_Runner_ExecuteTasks_WriteStderr = (message: string) => void;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_WriteStdout = (message: string) => void;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Returns = Promise<0 | 1>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ColorFunctions = ChalkInstance[];

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Prefixes = Map<string, string>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_TaskValues = Shared_RunWorkspacesTask[];

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ColorIndex = number;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ColoredTask = Shared_RunWorkspacesTask;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ColorFunction = ChalkInstance;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Queue = Shared_RunWorkspacesOutputQueue;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ActiveState_Key = string;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ActiveState = {
  key: Lib_RunWorkspaces_Runner_ExecuteTasks_ActiveState_Key;
};

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Children = Set<ChildProcessWithoutNullStreams>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_State = Shared_RunWorkspacesState;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Status = 'blocked' | 'cached' | 'cancelled' | 'failed' | 'succeeded';

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Statuses = Map<string, Lib_RunWorkspaces_Runner_ExecuteTasks_Status>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_StateDigests = Map<string, string>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Failures = Map<string, number>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Blocked = Set<string>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Pending = Set<string>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Running = Map<string, Promise<Shared_RunWorkspacesTaskResult>>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ForwardSignal = (signal: NodeJS.Signals) => Lib_RunWorkspaces_Runner_ExecuteTasks_ForwardSignal_Returns;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigint = () => Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigint_Returns;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigterm = () => Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigterm_Returns;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_FlushInterval = ReturnType<typeof setInterval>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_PendingTask = Shared_RunWorkspacesTask;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_DependencyStatuses = (Lib_RunWorkspaces_Runner_ExecuteTasks_Status | undefined)[];

export type Lib_RunWorkspaces_Runner_ExecuteTasks_HasFailedDependency = boolean;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ReadyTasks = Shared_RunWorkspacesTask[];

export type Lib_RunWorkspaces_Runner_ExecuteTasks_CandidateTask = Shared_RunWorkspacesTask | undefined;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_DependenciesReady = boolean;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_DependencyStatus = Lib_RunWorkspaces_Runner_ExecuteTasks_Status | undefined;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_TaskPromise = Promise<Shared_RunWorkspacesTaskResult>;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Result = Shared_RunWorkspacesTaskResult;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_ResolvedStatus = Lib_RunWorkspaces_Runner_ExecuteTasks_Status;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_RemainingResults = PromiseSettledResult<Shared_RunWorkspacesTaskResult>[];

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Label = string;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_TypedFailureEntry = [string, number];

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Key = string;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_Code = number;

/**
 * Lib - Run Workspaces - Execute Tasks - Flush Queue.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_ExecuteTasks_FlushQueue_FlushQueue = () => Lib_RunWorkspaces_Runner_ExecuteTasks_FlushQueue_Returns;

export type Lib_RunWorkspaces_Runner_ExecuteTasks_FlushQueue_Returns = void;

/**
 * Lib - Run Workspaces - Execute Tasks - Forward Signal.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_ExecuteTasks_ForwardSignal_Returns = void;

/**
 * Lib - Run Workspaces - Execute Tasks - Handle SIGINT.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigint_Returns = void;

/**
 * Lib - Run Workspaces - Execute Tasks - Handle SIGTERM.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigterm_Returns = void;

/**
 * Lib - Run Workspaces - Flush Output Queue.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_FlushOutputQueue_Queue = Shared_RunWorkspacesOutputQueue;

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_Prefixes = Map<string, string>;

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_ActiveState_Key = string;

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_ActiveState = {
  key: Lib_RunWorkspaces_Runner_FlushOutputQueue_ActiveState_Key;
};

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_WriteStderr = (message: string) => void;

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_WriteStdout = (message: string) => void;

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_Returns = void;

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_ActiveLabel = string;

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_Label = string;

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_ResultLine = string;

export type Lib_RunWorkspaces_Runner_FlushOutputQueue_OutputLine = string;

/**
 * Lib - Run Workspaces - Get Dependency Names.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_GetDependencyNames_PackageJson = Record<string, unknown>;

export type Lib_RunWorkspaces_Runner_GetDependencyNames_Returns = string[];

export type Lib_RunWorkspaces_Runner_GetDependencyNames_Fields = readonly ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];

export type Lib_RunWorkspaces_Runner_GetDependencyNames_Names = Set<string>;

export type Lib_RunWorkspaces_Runner_GetDependencyNames_FieldValue = unknown;

/**
 * Lib - Run Workspaces - Get Script Environment.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_GetScriptEnvironment_NodeEnv = 'development' | 'production' | 'test' | undefined;

export type Lib_RunWorkspaces_Runner_GetScriptEnvironment_Returns = NodeJS.ProcessEnv;

export type Lib_RunWorkspaces_Runner_GetScriptEnvironment_Environment = NodeJS.ProcessEnv;

/**
 * Lib - Run Workspaces - Load Project.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_LoadProject_Returns = Promise<Shared_RunWorkspacesProject>;

export type Lib_RunWorkspaces_Runner_LoadProject_CurrentDirectory = string;

export type Lib_RunWorkspaces_Runner_LoadProject_PackageJsonPath = string;

export type Lib_RunWorkspaces_Runner_LoadProject_PackageJsonRaw = string;

export type Lib_RunWorkspaces_Runner_LoadProject_PackageJson = Record<string, unknown>;

export type Lib_RunWorkspaces_Runner_LoadProject_PackageManagerDescriptor_Name = Shared_CorepackPackageManager;

export type Lib_RunWorkspaces_Runner_LoadProject_PackageManagerDescriptor_Version = string;

export type Lib_RunWorkspaces_Runner_LoadProject_PackageManagerDescriptor_Value = string;

export type Lib_RunWorkspaces_Runner_LoadProject_PackageManagerDescriptor = {
  name: Lib_RunWorkspaces_Runner_LoadProject_PackageManagerDescriptor_Name;
  version: Lib_RunWorkspaces_Runner_LoadProject_PackageManagerDescriptor_Version;
  value: Lib_RunWorkspaces_Runner_LoadProject_PackageManagerDescriptor_Value;
} | undefined;

export type Lib_RunWorkspaces_Runner_LoadProject_ConfigLoader = LibNovaConfig;

export type Lib_RunWorkspaces_Runner_LoadProject_Config = Shared_NovaConfigConfig;

export type Lib_RunWorkspaces_Runner_LoadProject_Diagnostics = ReturnType<LibNovaConfig['diagnostics']>;

export type Lib_RunWorkspaces_Runner_LoadProject_ConfiguredWorkspaces = Record<string, Shared_NovaConfigWorkspace>;

export type Lib_RunWorkspaces_Runner_LoadProject_CacheSettings = Shared_NovaConfigSettings_RunWorkspacesCache | undefined;

export type Lib_RunWorkspaces_Runner_LoadProject_ConcurrencySettings = Shared_NovaConfigSettings_RunWorkspacesConcurrency | undefined;

export type Lib_RunWorkspaces_Runner_LoadProject_RootOrder = Shared_NovaConfigSettings_RunWorkspaces_Root;

export type Lib_RunWorkspaces_Runner_LoadProject_CacheDirectoryValue = string;

export type Lib_RunWorkspaces_Runner_LoadProject_CacheEnabled = boolean;

export type Lib_RunWorkspaces_Runner_LoadProject_CacheScriptsValue = string[];

export type Lib_RunWorkspaces_Runner_LoadProject_CacheDirectory = string;

export type Lib_RunWorkspaces_Runner_LoadProject_CacheScripts = Set<string>;

export type Lib_RunWorkspaces_Runner_LoadProject_Cache = Shared_RunWorkspacesProject_Cache;

export type Lib_RunWorkspaces_Runner_LoadProject_Concurrency = Shared_NovaConfigSettings_RunWorkspacesConcurrency;

export type Lib_RunWorkspaces_Runner_LoadProject_WorkspaceEntries = [string, Shared_NovaConfigWorkspace][];

export type Lib_RunWorkspaces_Runner_LoadProject_LoadedWorkspaces = Shared_RunWorkspacesWorkspace[];

export type Lib_RunWorkspaces_Runner_LoadProject_TypedWorkspaceEntry = [string, Shared_NovaConfigWorkspace];

export type Lib_RunWorkspaces_Runner_LoadProject_WorkspacePath = string;

export type Lib_RunWorkspaces_Runner_LoadProject_WorkspaceConfig = Shared_NovaConfigWorkspace;

export type Lib_RunWorkspaces_Runner_LoadProject_Directory = string;

export type Lib_RunWorkspaces_Runner_LoadProject_WorkspacePackageJsonPath = string;

export type Lib_RunWorkspaces_Runner_LoadProject_WorkspacePackageJsonRaw = string;

export type Lib_RunWorkspaces_Runner_LoadProject_WorkspacePackageJson = Record<string, unknown>;

export type Lib_RunWorkspaces_Runner_LoadProject_WorkspaceName = unknown;

export type Lib_RunWorkspaces_Runner_LoadProject_ScriptsValue = unknown;

export type Lib_RunWorkspaces_Runner_LoadProject_Scripts = Record<string, string>;

export type Lib_RunWorkspaces_Runner_LoadProject_TypedScriptEntry = [string, unknown];

export type Lib_RunWorkspaces_Runner_LoadProject_ScriptName = string;

export type Lib_RunWorkspaces_Runner_LoadProject_ScriptCommand = unknown;

export type Lib_RunWorkspaces_Runner_LoadProject_Workspaces = Map<string, Shared_RunWorkspacesWorkspace>;

export type Lib_RunWorkspaces_Runner_LoadProject_ExistingWorkspace = Shared_RunWorkspacesWorkspace | undefined;

export type Lib_RunWorkspaces_Runner_LoadProject_InternalDependencies = string[];

export type Lib_RunWorkspaces_Runner_LoadProject_RootScriptsValue = unknown;

export type Lib_RunWorkspaces_Runner_LoadProject_RootScripts = Record<string, string>;

export type Lib_RunWorkspaces_Runner_LoadProject_TypedRootScriptEntry = [string, unknown];

export type Lib_RunWorkspaces_Runner_LoadProject_RootName = string;

export type Lib_RunWorkspaces_Runner_LoadProject_RootInternalDependencies = string[];

export type Lib_RunWorkspaces_Runner_LoadProject_IsNestedRun = boolean;

export type Lib_RunWorkspaces_Runner_LoadProject_Root = Shared_RunWorkspacesWorkspace | undefined;

/**
 * Lib - Run Workspaces - Parse Positive Integer.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_ParsePositiveInteger_Value = string | undefined;

export type Lib_RunWorkspaces_Runner_ParsePositiveInteger_Returns = number | undefined;

export type Lib_RunWorkspaces_Runner_ParsePositiveInteger_Parsed = number;

/**
 * Lib - Run Workspaces - Resolve Concurrency.
 *
 * @since 0.33.0
 */
export type Lib_RunWorkspaces_Runner_ResolveConcurrency_Concurrency = number | undefined;

export type Lib_RunWorkspaces_Runner_ResolveConcurrency_ConfiguredConcurrency = Shared_NovaConfigSettings_RunWorkspacesConcurrency;

export type Lib_RunWorkspaces_Runner_ResolveConcurrency_Task = string;

export type Lib_RunWorkspaces_Runner_ResolveConcurrency_Returns = number;

/**
 * Lib - Run Workspaces - Resolve Root Selection.
 *
 * @since 0.34.0
 */
export type Lib_RunWorkspaces_Runner_ResolveRootSelection_Root = Shared_RunWorkspacesWorkspace | undefined;

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_Requested = string[] | undefined;

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_Excluded = string[] | undefined;

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_Returns_IncludeRoot = boolean;

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_Returns_RootOnly = boolean;

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_Returns_Requested = string[] | undefined;

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_Returns_Excluded = string[] | undefined;

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_Returns = {
  includeRoot: Lib_RunWorkspaces_Runner_ResolveRootSelection_Returns_IncludeRoot;
  rootOnly: Lib_RunWorkspaces_Runner_ResolveRootSelection_Returns_RootOnly;
  requested: Lib_RunWorkspaces_Runner_ResolveRootSelection_Returns_Requested;
  excluded: Lib_RunWorkspaces_Runner_ResolveRootSelection_Returns_Excluded;
};

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_RootIdentifiers = string[];

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_RequestedNames = string[];

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_ExcludedNames = string[];

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_IsRootExcluded = boolean;

export type Lib_RunWorkspaces_Runner_ResolveRootSelection_IsRootRequestedAlone = boolean;

/**
 * Lib - Run Workspaces - Run.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_Run_Options_Task = Shared_RunWorkspacesOptions_Task | undefined;

export type Lib_RunWorkspaces_Runner_Run_Options_Buffer = Shared_RunWorkspacesOptions_Buffer;

export type Lib_RunWorkspaces_Runner_Run_Options_Concurrency = Shared_RunWorkspacesOptions_Concurrency;

export type Lib_RunWorkspaces_Runner_Run_Options_ContinueOnError = Shared_RunWorkspacesOptions_ContinueOnError;

export type Lib_RunWorkspaces_Runner_Run_Options_DryRun = Shared_RunWorkspacesOptions_DryRun;

export type Lib_RunWorkspaces_Runner_Run_Options_ExcludeWorkspace = Shared_RunWorkspacesOptions_ExcludeWorkspace;

export type Lib_RunWorkspaces_Runner_Run_Options_Force = Shared_RunWorkspacesOptions_Force;

export type Lib_RunWorkspaces_Runner_Run_Options_NodeEnv = Shared_RunWorkspacesOptions_NodeEnv;

export type Lib_RunWorkspaces_Runner_Run_Options_ScriptArgs = Shared_RunWorkspacesOptions_ScriptArgs;

export type Lib_RunWorkspaces_Runner_Run_Options_Workspace = Shared_RunWorkspacesOptions_Workspace;

export type Lib_RunWorkspaces_Runner_Run_Options_PrintError = (message: string) => void;

export type Lib_RunWorkspaces_Runner_Run_Options_PrintInfo = (message: string) => void;

export type Lib_RunWorkspaces_Runner_Run_Options_PrintWarn = (message: string) => void;

export type Lib_RunWorkspaces_Runner_Run_Options_WriteStderr = (message: string) => void;

export type Lib_RunWorkspaces_Runner_Run_Options_WriteStdout = (message: string) => void;

export type Lib_RunWorkspaces_Runner_Run_Options = {
  task: Lib_RunWorkspaces_Runner_Run_Options_Task;
  buffer: Lib_RunWorkspaces_Runner_Run_Options_Buffer;
  concurrency: Lib_RunWorkspaces_Runner_Run_Options_Concurrency;
  continueOnError: Lib_RunWorkspaces_Runner_Run_Options_ContinueOnError;
  dryRun: Lib_RunWorkspaces_Runner_Run_Options_DryRun;
  excludeWorkspace: Lib_RunWorkspaces_Runner_Run_Options_ExcludeWorkspace;
  force?: Lib_RunWorkspaces_Runner_Run_Options_Force;
  nodeEnv: Lib_RunWorkspaces_Runner_Run_Options_NodeEnv;
  scriptArgs: Lib_RunWorkspaces_Runner_Run_Options_ScriptArgs;
  workspace: Lib_RunWorkspaces_Runner_Run_Options_Workspace;
  printError: Lib_RunWorkspaces_Runner_Run_Options_PrintError;
  printInfo: Lib_RunWorkspaces_Runner_Run_Options_PrintInfo;
  printWarn: Lib_RunWorkspaces_Runner_Run_Options_PrintWarn;
  writeStderr: Lib_RunWorkspaces_Runner_Run_Options_WriteStderr;
  writeStdout: Lib_RunWorkspaces_Runner_Run_Options_WriteStdout;
};

export type Lib_RunWorkspaces_Runner_Run_Returns = Promise<0 | 1>;

export type Lib_RunWorkspaces_Runner_Run_TaskValue = string | undefined;

export type Lib_RunWorkspaces_Runner_Run_Task = string;

export type Lib_RunWorkspaces_Runner_Run_BufferMs = number | undefined;

export type Lib_RunWorkspaces_Runner_Run_Concurrency = number | undefined;

export type Lib_RunWorkspaces_Runner_Run_NodeEnvOption = string | undefined;

export type Lib_RunWorkspaces_Runner_Run_ScriptArgs = string[];

export type Lib_RunWorkspaces_Runner_Run_NodeEnv = 'development' | 'production' | 'test' | undefined;

export type Lib_RunWorkspaces_Runner_Run_Project = Shared_RunWorkspacesProject;

export type Lib_RunWorkspaces_Runner_Run_RootSelection_IncludeRoot = boolean;

export type Lib_RunWorkspaces_Runner_Run_RootSelection_RootOnly = boolean;

export type Lib_RunWorkspaces_Runner_Run_RootSelection_Requested = string[] | undefined;

export type Lib_RunWorkspaces_Runner_Run_RootSelection_Excluded = string[] | undefined;

export type Lib_RunWorkspaces_Runner_Run_RootSelection = {
  includeRoot: Lib_RunWorkspaces_Runner_Run_RootSelection_IncludeRoot;
  rootOnly: Lib_RunWorkspaces_Runner_Run_RootSelection_RootOnly;
  requested: Lib_RunWorkspaces_Runner_Run_RootSelection_Requested;
  excluded: Lib_RunWorkspaces_Runner_Run_RootSelection_Excluded;
};

export type Lib_RunWorkspaces_Runner_Run_SelectedWorkspaces = Shared_RunWorkspacesWorkspace[];

export type Lib_RunWorkspaces_Runner_Run_Plan = Shared_RunWorkspacesPlan;

export type Lib_RunWorkspaces_Runner_Run_OrderedTasks = Shared_RunWorkspacesTask[];

export type Lib_RunWorkspaces_Runner_Run_EffectiveConcurrency = number;

export type Lib_RunWorkspaces_Runner_Run_ErrorMessage = string;

/**
 * Lib - Run Workspaces - Run Task.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_RunTask_Task = Shared_RunWorkspacesTask;

export type Lib_RunWorkspaces_Runner_RunTask_PackageManager = Shared_CorepackPackageManager;

export type Lib_RunWorkspaces_Runner_RunTask_PackageManagerDescriptor = string;

export type Lib_RunWorkspaces_Runner_RunTask_RootDirectory = string;

export type Lib_RunWorkspaces_Runner_RunTask_Cache = Shared_RunWorkspacesProject_Cache;

export type Lib_RunWorkspaces_Runner_RunTask_Force = boolean;

export type Lib_RunWorkspaces_Runner_RunTask_NodeEnv = 'development' | 'production' | 'test' | undefined;

export type Lib_RunWorkspaces_Runner_RunTask_ScriptArgs = string[];

export type Lib_RunWorkspaces_Runner_RunTask_StateDigests = Map<string, string>;

export type Lib_RunWorkspaces_Runner_RunTask_Queue = Shared_RunWorkspacesOutputQueue;

export type Lib_RunWorkspaces_Runner_RunTask_Children = Set<ChildProcessWithoutNullStreams>;

export type Lib_RunWorkspaces_Runner_RunTask_State = Shared_RunWorkspacesState;

export type Lib_RunWorkspaces_Runner_RunTask_Returns = Promise<Shared_RunWorkspacesTaskResult>;

export type Lib_RunWorkspaces_Runner_RunTask_DependencyStateDigests = Map<string, string>;

export type Lib_RunWorkspaces_Runner_RunTask_DependencyStateDigest = string | undefined;

export type Lib_RunWorkspaces_Runner_RunTask_HasAllDependencyDigests = boolean;

export type Lib_RunWorkspaces_Runner_RunTask_CacheCandidate = boolean;

export type Lib_RunWorkspaces_Runner_RunTask_StateDigest = string | undefined;

export type Lib_RunWorkspaces_Runner_RunTask_ContextDigest = string | undefined;

export type Lib_RunWorkspaces_Runner_RunTask_CacheRecord = Shared_RunWorkspacesCacheRecord | undefined;

export type Lib_RunWorkspaces_Runner_RunTask_Environment = NodeJS.ProcessEnv;

export type Lib_RunWorkspaces_Runner_RunTask_CommandArguments = string[];

export type Lib_RunWorkspaces_Runner_RunTask_SpawnInvocation = Shared_CorepackSpawnInvocation;

export type Lib_RunWorkspaces_Runner_RunTask_Child = ChildProcessWithoutNullStreams;

export type Lib_RunWorkspaces_Runner_RunTask_PartialLines = Map<'stdout' | 'stderr', string>;

export type Lib_RunWorkspaces_Runner_RunTask_Result = Shared_RunWorkspacesTaskResult;

export type Lib_RunWorkspaces_Runner_RunTask_Settled = boolean;

export type Lib_RunWorkspaces_Runner_RunTask_ResultWithState = Shared_RunWorkspacesTaskResult;

export type Lib_RunWorkspaces_Runner_RunTask_HandleData = (data: Buffer, stream: 'stdout' | 'stderr') => Lib_RunWorkspaces_Runner_RunTask_HandleData_Returns;

/**
 * Lib - Run Workspaces - Run Task - Close.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_RunTask_Close_StdoutPartial = string;

export type Lib_RunWorkspaces_Runner_RunTask_Close_StderrPartial = string;

export type Lib_RunWorkspaces_Runner_RunTask_Close_ExitCode = number;

export type Lib_RunWorkspaces_Runner_RunTask_Close_IsStoppingFailure = boolean;

export type Lib_RunWorkspaces_Runner_RunTask_Close_Status = 'cancelled' | 'failed' | 'interrupted' | 'succeeded';

export type Lib_RunWorkspaces_Runner_RunTask_Close_Stream = 'stdout' | 'stderr';

export type Lib_RunWorkspaces_Runner_RunTask_Close_Line = string;

/**
 * Lib - Run Workspaces - Run Task - Data.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_RunTask_Data_Returns = void;

/**
 * Lib - Run Workspaces - Run Task - Error.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_RunTask_Error_Returns = void;

/**
 * Lib - Run Workspaces - Run Task - Handle Data.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_RunTask_HandleData_Returns = void;

export type Lib_RunWorkspaces_Runner_RunTask_HandleData_Text = string;

export type Lib_RunWorkspaces_Runner_RunTask_HandleData_Lines = string[];

export type Lib_RunWorkspaces_Runner_RunTask_HandleData_Partial = string;

/**
 * Lib - Run Workspaces - Select Workspaces.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_SelectWorkspaces_Workspaces = Map<string, Shared_RunWorkspacesWorkspace>;

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_Requested = string[] | undefined;

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_Excluded = string[] | undefined;

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_Returns = Shared_RunWorkspacesWorkspace[];

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_RequestedNames = Set<string>;

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_ExcludedNames = Set<string>;

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_KnownNames = Set<string>;

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_UnknownNames = string[];

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_MatchesRequestedName = boolean;

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_IsRequested = boolean;

export type Lib_RunWorkspaces_Runner_SelectWorkspaces_IsExcluded = boolean;

/**
 * Lib - Run Workspaces - Sort Tasks.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_SortTasks_Tasks = Map<string, Shared_RunWorkspacesTask>;

export type Lib_RunWorkspaces_Runner_SortTasks_Returns = Shared_RunWorkspacesTask[];

export type Lib_RunWorkspaces_Runner_SortTasks_RemainingDependencies = Map<string, Set<string>>;

export type Lib_RunWorkspaces_Runner_SortTasks_ReadyKeys = string[];

export type Lib_RunWorkspaces_Runner_SortTasks_OrderedTasks = Shared_RunWorkspacesTask[];

export type Lib_RunWorkspaces_Runner_SortTasks_TypedTaskEntry = [string, Shared_RunWorkspacesTask];

export type Lib_RunWorkspaces_Runner_SortTasks_TypedInitialEntry = [string, Set<string>];

export type Lib_RunWorkspaces_Runner_SortTasks_Key = string | undefined;

export type Lib_RunWorkspaces_Runner_SortTasks_Task = Shared_RunWorkspacesTask | undefined;

export type Lib_RunWorkspaces_Runner_SortTasks_TypedRemainingEntry = [string, Set<string>];

export type Lib_RunWorkspaces_Runner_SortTasks_CandidateKey = string;

export type Lib_RunWorkspaces_Runner_SortTasks_Dependencies = Set<string>;

export type Lib_RunWorkspaces_Runner_SortTasks_DependencyRemoved = boolean;

export type Lib_RunWorkspaces_Runner_SortTasks_AlreadyOrdered = boolean;

export type Lib_RunWorkspaces_Runner_SortTasks_AlreadyReady = boolean;

/**
 * Lib - Run Workspaces - Task Key.
 *
 * @since 0.32.0
 */
export type Lib_RunWorkspaces_Runner_TaskKey_WorkspaceName = string;

export type Lib_RunWorkspaces_Runner_TaskKey_Script = string;

export type Lib_RunWorkspaces_Runner_TaskKey_Returns = string;
