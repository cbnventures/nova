/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Build Command.
 *
 * @since 0.16.0
 */
export type TestsCliGenerateGithubWorkflowsHelpersBuildCommandResult = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Detect Turbo.
 *
 * @since 0.16.0
 */
export type TestsCliGenerateGithubWorkflowsHelpersDetectTurboTemporaryDirectory = string;

export type TestsCliGenerateGithubWorkflowsHelpersDetectTurboPrefix = string;

export type TestsCliGenerateGithubWorkflowsHelpersDetectTurboProjectDirectory = string;

export type TestsCliGenerateGithubWorkflowsHelpersDetectTurboTurboConfigPath = string;

export type TestsCliGenerateGithubWorkflowsHelpersDetectTurboResult = boolean;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Render Artifact Paths.
 *
 * @since 0.16.0
 */
export type TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsTargetMetadata = Record<string, {
  artifactPaths: string[];
}>;

export type TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsTargets = Array<{
  type: string; workingDir: string;
}>;

export type TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsResult = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Resolve Workspace Name.
 *
 * @since 0.16.0
 */
export type TestsCliGenerateGithubWorkflowsHelpersResolveWorkspaceNameWorkspaces = Record<string, {
  name?: string;
}>;

export type TestsCliGenerateGithubWorkflowsHelpersResolveWorkspaceNameResult = string | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Slugify Working Dir.
 *
 * @since 0.16.0
 */
export type TestsCliGenerateGithubWorkflowsHelpersSlugifyWorkingDirResult = string;
