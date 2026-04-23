/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Build Artifact Name.
 *
 * @since 0.16.3
 */
export type TestsCliGenerateGithubWorkflowsHelpersBuildArtifactNameResult = string;

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
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Render Upload Artifact Steps.
 *
 * @since 0.16.3
 */
export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetMetadataEntryArtifactPath = string;

export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetMetadataEntryArtifactPaths = TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetMetadataEntryArtifactPath[];

export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetMetadataEntry = {
  artifactPaths: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetMetadataEntryArtifactPaths;
};

export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetMetadata = Record<string, TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetMetadataEntry>;

export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetType = string;

export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetWorkingDir = string;

export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTarget = {
  type: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetType;
  workingDir: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetWorkingDir;
};

export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargets = TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTarget[];

export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsResult = string;

export type TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsExpected = string;

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
