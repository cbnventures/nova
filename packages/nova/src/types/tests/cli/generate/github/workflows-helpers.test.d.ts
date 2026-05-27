/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Build Artifact Name.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_BuildArtifactNameResult = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Build Command.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_BuildCommandResult = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Detect Turbo.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_DetectTurboTemporaryDirectory = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_DetectTurboPrefix = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_DetectTurboProjectDirectory = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_DetectTurboTurboConfigPath = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_DetectTurboResult = boolean;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Render Upload Artifact Steps.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTargetMetadataEntryArtifactPath = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTargetMetadataEntry_ArtifactPaths = Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTargetMetadataEntryArtifactPath[];

export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTargetMetadataEntry = {
  artifactPaths: Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTargetMetadataEntry_ArtifactPaths;
};

export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTargetMetadata = Record<string, Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTargetMetadataEntry>;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTarget_Type = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTarget_WorkingDir = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTarget = {
  type: Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTarget_Type;
  workingDir: Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTarget_WorkingDir;
};

export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTargets = Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsTarget[];

export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsResult = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_RenderUploadArtifactStepsExpected = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Resolve Workspace Name.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_ResolveWorkspaceNameWorkspaces = Record<string, {
  name?: string;
}>;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_ResolveWorkspaceNameResult = string | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Slugify Working Dir.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_SlugifyWorkingDirResult = string;
