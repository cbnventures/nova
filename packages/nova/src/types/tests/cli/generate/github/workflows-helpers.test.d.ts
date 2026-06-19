/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Build Artifact Name - Joins Build Prefix Target Type And Target Id With Dashes.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsBuildArtifactName_JoinsBuildPrefixTargetTypeAndTargetIdWithDashes_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Build Artifact Name - Preserves Nested Slug Target Ids Verbatim.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsBuildArtifactName_PreservesNestedSlugTargetIdsVerbatim_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Build Command - Emits Npm Run Command For Single Workspace Without Turbo.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsBuildCommand_EmitsNpmRunCommandForSingleWorkspaceWithoutTurbo_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Build Command - Emits Npm Run Command With Multiple W Flags Without Turbo.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsBuildCommand_EmitsNpmRunCommandWithMultipleWFlagsWithoutTurbo_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Build Command - Emits Turbo Run Command With Filters And Concurrency.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsBuildCommand_EmitsTurboRunCommandWithFiltersAndConcurrency_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Detect Turbo - Returns False When Turbo Json Does Not Exist.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsDetectTurbo_ReturnsFalseWhenTurboJsonDoesNotExist_TemporaryDirectory = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsDetectTurbo_ReturnsFalseWhenTurboJsonDoesNotExist_Prefix = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsDetectTurbo_ReturnsFalseWhenTurboJsonDoesNotExist_ProjectDirectory = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsDetectTurbo_ReturnsFalseWhenTurboJsonDoesNotExist_Result = boolean;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Detect Turbo - Returns True When Turbo Json Exists.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsDetectTurbo_ReturnsTrueWhenTurboJsonExists_TemporaryDirectory = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsDetectTurbo_ReturnsTrueWhenTurboJsonExists_Prefix = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsDetectTurbo_ReturnsTrueWhenTurboJsonExists_ProjectDirectory = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsDetectTurbo_ReturnsTrueWhenTurboJsonExists_TurboConfigPath = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsDetectTurbo_ReturnsTrueWhenTurboJsonExists_Result = boolean;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Render Upload Artifact Steps.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_TargetsMetadata = Record<string, Readonly<{
  artifactPaths: string[];
}>>;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Render Upload Artifact Steps - Emits One Upload Step Per Target Without Deduping Shared Working Dirs.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsOneUploadStepPerTargetWithoutDedupingSharedWorkingDirs_Targets_Element_Type = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsOneUploadStepPerTargetWithoutDedupingSharedWorkingDirs_Targets_Element_WorkingDir = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsOneUploadStepPerTargetWithoutDedupingSharedWorkingDirs_Targets_Element = {
  type: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsOneUploadStepPerTargetWithoutDedupingSharedWorkingDirs_Targets_Element_Type;
  workingDir: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsOneUploadStepPerTargetWithoutDedupingSharedWorkingDirs_Targets_Element_WorkingDir;
};

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsOneUploadStepPerTargetWithoutDedupingSharedWorkingDirs_Targets = Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsOneUploadStepPerTargetWithoutDedupingSharedWorkingDirs_Targets_Element[];

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsOneUploadStepPerTargetWithoutDedupingSharedWorkingDirs_Result = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsOneUploadStepPerTargetWithoutDedupingSharedWorkingDirs_Expected = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Render Upload Artifact Steps - Emits Two Indented Path Lines For Aws Amplify Nextjs.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsTwoIndentedPathLinesForAwsAmplifyNextjs_Targets_Element_Type = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsTwoIndentedPathLinesForAwsAmplifyNextjs_Targets_Element_WorkingDir = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsTwoIndentedPathLinesForAwsAmplifyNextjs_Targets_Element = {
  type: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsTwoIndentedPathLinesForAwsAmplifyNextjs_Targets_Element_Type;
  workingDir: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsTwoIndentedPathLinesForAwsAmplifyNextjs_Targets_Element_WorkingDir;
};

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsTwoIndentedPathLinesForAwsAmplifyNextjs_Targets = Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsTwoIndentedPathLinesForAwsAmplifyNextjs_Targets_Element[];

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsTwoIndentedPathLinesForAwsAmplifyNextjs_Result = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_EmitsTwoIndentedPathLinesForAwsAmplifyNextjs_Expected = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Render Upload Artifact Steps - Returns Empty String When All Targets Have Empty Artifact Paths.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_ReturnsEmptyStringWhenAllTargetsHaveEmptyArtifactPaths_Targets_Element_Type = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_ReturnsEmptyStringWhenAllTargetsHaveEmptyArtifactPaths_Targets_Element_WorkingDir = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_ReturnsEmptyStringWhenAllTargetsHaveEmptyArtifactPaths_Targets_Element = {
  type: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_ReturnsEmptyStringWhenAllTargetsHaveEmptyArtifactPaths_Targets_Element_Type;
  workingDir: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_ReturnsEmptyStringWhenAllTargetsHaveEmptyArtifactPaths_Targets_Element_WorkingDir;
};

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_ReturnsEmptyStringWhenAllTargetsHaveEmptyArtifactPaths_Targets = Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_ReturnsEmptyStringWhenAllTargetsHaveEmptyArtifactPaths_Targets_Element[];

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_ReturnsEmptyStringWhenAllTargetsHaveEmptyArtifactPaths_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Render Upload Artifact Steps - Skips Targets Whose Type Is Missing From Targets Metadata.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWhoseTypeIsMissingFromTargetsMetadata_Targets_Element_Type = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWhoseTypeIsMissingFromTargetsMetadata_Targets_Element_WorkingDir = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWhoseTypeIsMissingFromTargetsMetadata_Targets_Element = {
  type: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWhoseTypeIsMissingFromTargetsMetadata_Targets_Element_Type;
  workingDir: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWhoseTypeIsMissingFromTargetsMetadata_Targets_Element_WorkingDir;
};

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWhoseTypeIsMissingFromTargetsMetadata_Targets = Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWhoseTypeIsMissingFromTargetsMetadata_Targets_Element[];

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWhoseTypeIsMissingFromTargetsMetadata_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Render Upload Artifact Steps - Skips Targets With Empty Artifact Paths But Emits Steps For The Rest.
 *
 * @since 0.16.3
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWithEmptyArtifactPathsButEmitsStepsForTheRest_Targets_Element_Type = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWithEmptyArtifactPathsButEmitsStepsForTheRest_Targets_Element_WorkingDir = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWithEmptyArtifactPathsButEmitsStepsForTheRest_Targets_Element = {
  type: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWithEmptyArtifactPathsButEmitsStepsForTheRest_Targets_Element_Type;
  workingDir: Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWithEmptyArtifactPathsButEmitsStepsForTheRest_Targets_Element_WorkingDir;
};

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWithEmptyArtifactPathsButEmitsStepsForTheRest_Targets = Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWithEmptyArtifactPathsButEmitsStepsForTheRest_Targets_Element[];

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWithEmptyArtifactPathsButEmitsStepsForTheRest_Result = string;

export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsRenderUploadArtifactSteps_SkipsTargetsWithEmptyArtifactPathsButEmitsStepsForTheRest_Expected = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Resolve Workspace Name.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsResolveWorkspaceName_Workspaces = Record<string, Readonly<{
  name?: string;
}>>;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Resolve Workspace Name - Returns The Workspace Name For A Known Path.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsResolveWorkspaceName_ReturnsTheWorkspaceNameForAKnownPath_Result = string | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Resolve Workspace Name - Returns Undefined For An Unknown Path.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsResolveWorkspaceName_ReturnsUndefinedForAnUnknownPath_Result = string | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Resolve Workspace Name - Returns Undefined When Entry Exists But Name Is Missing.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsResolveWorkspaceName_ReturnsUndefinedWhenEntryExistsButNameIsMissing_Result = string | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Slugify Working Dir - Handles Apps Prefix.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsSlugifyWorkingDir_HandlesAppsPrefix_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Slugify Working Dir - Handles Deep Nested Scoped Names.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsSlugifyWorkingDir_HandlesDeepNestedScopedNames_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Slugify Working Dir - Handles Path Without Leading.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsSlugifyWorkingDir_HandlesPathWithoutLeading_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Slugify Working Dir - Returns Root For Input.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsSlugifyWorkingDir_ReturnsRootForInput_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Slugify Working Dir - Strips Leading And Replaces Slashes With Hyphens.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsSlugifyWorkingDir_StripsLeadingAndReplacesSlashesWithHyphens_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - CLI Generate GitHub Workflows Slugify Working Dir - Strips Trailing Slash.
 *
 * @since 0.16.0
 */
export type Tests_Cli_Generate_Github_WorkflowsHelpers_CliGenerateGithubWorkflowsSlugifyWorkingDir_StripsTrailingSlash_Result = string;
