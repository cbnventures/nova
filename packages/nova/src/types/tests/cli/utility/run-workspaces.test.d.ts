/**
 * Tests - CLI - Utility - Run Workspaces.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_OriginalCwd = string;

export type Tests_Cli_Utility_RunWorkspaces_TemporaryDirectory = string;

export type Tests_Cli_Utility_RunWorkspaces_TemporaryPrefix = string;

export type Tests_Cli_Utility_RunWorkspaces_SandboxRoot = string;

export type Tests_Cli_Utility_RunWorkspaces_SavedRunnerMarker = string | undefined;

export type Tests_Cli_Utility_RunWorkspaces_SavedLifecycleEvent = string | undefined;

export type Tests_Cli_Utility_RunWorkspaces_ProjectRoot = string;

export type Tests_Cli_Utility_RunWorkspaces_CoreDirectory = string;

export type Tests_Cli_Utility_RunWorkspaces_AppDirectory = string;

export type Tests_Cli_Utility_RunWorkspaces_Errors = string[];

export type Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = string;

export type Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = string;

export type Tests_Cli_Utility_RunWorkspaces_CorePackageJsonContents = string;

export type Tests_Cli_Utility_RunWorkspaces_AppPackageJsonContents = string;

export type Tests_Cli_Utility_RunWorkspaces_ExitCode = 0 | 1;

export type Tests_Cli_Utility_RunWorkspaces_OutputPath = string;

export type Tests_Cli_Utility_RunWorkspaces_Output = string;

export type Tests_Cli_Utility_RunWorkspaces_CaptureDirectory = string;

export type Tests_Cli_Utility_RunWorkspaces_CapturePackageJsonContents = string;

export type Tests_Cli_Utility_RunWorkspaces_CaptureScriptContents = string;

export type Tests_Cli_Utility_RunWorkspaces_Captured_Arguments = string[];

export type Tests_Cli_Utility_RunWorkspaces_Captured_Marker = string | undefined;

export type Tests_Cli_Utility_RunWorkspaces_Captured_NodeEnv = string | undefined;

export type Tests_Cli_Utility_RunWorkspaces_Captured = {
  arguments: Tests_Cli_Utility_RunWorkspaces_Captured_Arguments;
  marker?: Tests_Cli_Utility_RunWorkspaces_Captured_Marker;
  nodeEnv?: Tests_Cli_Utility_RunWorkspaces_Captured_NodeEnv;
};

export type Tests_Cli_Utility_RunWorkspaces_Infos = string[];

export type Tests_Cli_Utility_RunWorkspaces_OutputBefore = string;

export type Tests_Cli_Utility_RunWorkspaces_OutputAfter = string;

export type Tests_Cli_Utility_RunWorkspaces_AlphaDirectory = string;

export type Tests_Cli_Utility_RunWorkspaces_BetaDirectory = string;

export type Tests_Cli_Utility_RunWorkspaces_AlphaPackageJsonContents = string;

export type Tests_Cli_Utility_RunWorkspaces_BetaPackageJsonContents = string;

export type Tests_Cli_Utility_RunWorkspaces_WorkspaceDirectory = string;

export type Tests_Cli_Utility_RunWorkspaces_SourcePath = string;

export type Tests_Cli_Utility_RunWorkspaces_CounterPath = string;

export type Tests_Cli_Utility_RunWorkspaces_CacheDirectory = string;

export type Tests_Cli_Utility_RunWorkspaces_CachedOutput = string[];

export type Tests_Cli_Utility_RunWorkspaces_CounterContents = string;

export type Tests_Cli_Utility_RunWorkspaces_CacheFiles = string[];

export type Tests_Cli_Utility_RunWorkspaces_CacheFile = string | undefined;

export type Tests_Cli_Utility_RunWorkspaces_CacheRecordPath = string;

export type Tests_Cli_Utility_RunWorkspaces_IndependentOutputPath = string;

export type Tests_Cli_Utility_RunWorkspaces_Stderr = string[];

export type Tests_Cli_Utility_RunWorkspaces_Warnings = string[];

export type Tests_Cli_Utility_RunWorkspaces_IndependentOutput = string;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Builds Internal Dependencies Before A Selected Workspace Check.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_BuildsInternalDependenciesBeforeASelectedWorkspaceCheck_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Continues Independent Tasks And Blocks Dependents After Failure.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_ContinuesIndependentTasksAndBlocksDependentsAfterFailure_Returns = Promise<void>;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_ContinuesIndependentTasksAndBlocksDependentsAfterFailure_WorkspacePackageJsonContents = string;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Does Not Cache Failed Tasks.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_Returns = Promise<void>;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_WorkspacePackageJsonContents = string;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Does Not Cache Failed Tasks - Run Failure.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_RunFailure = () => Promise<0 | 1>;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_RunFailure_Returns = Promise<0 | 1>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Forwards Arguments And Marks Workspace Children.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_ForwardsArgumentsAndMarksWorkspaceChildren_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Keeps The Root When Filtering Workspaces.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_KeepsTheRootWhenFilteringWorkspaces_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Leaves The Root Out When It Is Excluded.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_LeavesTheRootOutWhenItIsExcluded_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Never Caches Root Steps.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_NeverCachesRootSteps_Returns = Promise<void>;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_NeverCachesRootSteps_SecondExitCode = 0 | 1;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Previews A Workspace Task Graph Without Executing Scripts.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_PreviewsAWorkspaceTaskGraphWithoutExecutingScripts_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Rejects An Unknown Workspace Before Executing Tasks.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_RejectsAnUnknownWorkspaceBeforeExecutingTasks_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Rejects Internal Dependency Cycles Before Executing Tasks.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_RejectsInternalDependencyCyclesBeforeExecutingTasks_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Runs Root Steps Before Workspace Tasks.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_RunsRootStepsBeforeWorkspaceTasks_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Skips The Root Inside A Nested Run.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_SkipsTheRootInsideANestedRun_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Skips The Root When Configured To.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_SkipsTheRootWhenConfiguredTo_Returns = Promise<void>;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Stops Scheduling Pending Tasks After Interruption.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_Returns = Promise<void>;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_MarkerPath = string;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_ForbiddenOutputPath = string;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_PriorSigintListeners = Set<(signal: NodeJS.Signals) => void>;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_RunPromise = Promise<0 | 1>;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_SigintListener = ((signal: NodeJS.Signals) => void) | undefined;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_ExitCode = 0 | 1;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_ForbiddenOutputExists = boolean;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Verifies Cached Workspace State Before Skipping Execution.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_Returns = Promise<void>;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_WorkspacePackageJsonContents = string;

/**
 * Tests - CLI - Utility - Run Workspaces - Run - Verifies Cached Workspace State Before Skipping Execution - Run Build.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_RunBuild = (force: boolean) => Promise<0 | 1>;

export type Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_RunBuild_Returns = Promise<0 | 1>;
