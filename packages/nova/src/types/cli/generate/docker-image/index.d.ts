import type {
  Shared_DockerImageProfile,
  Shared_GeneratorRunResult,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Docker Image - Build Runtime Directives.
 *
 * @since 0.29.0
 */
export type Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Profile = Shared_DockerImageProfile;
export type Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Returns = string;
export type Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Lines = string[];

/**
 * CLI - Generate - Docker Image - Generate For Target.
 *
 * @since 0.29.0
 */
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_DryRun = boolean;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_BuildDirectory = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_Profile = Shared_DockerImageProfile;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_ReplaceFile = boolean;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_WorkspaceDirectory = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options = {
  buildDirectory?: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_BuildDirectory;
  dryRun?: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_DryRun;
  profile: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_Profile;
  replaceFile?: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_ReplaceFile;
  workspaceDirectory: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options_WorkspaceDirectory;
};
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Returns = Promise<void>;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_TemplateRoot = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerignoreTemplatePath = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerfileTemplatePath = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ComposeTemplatePath = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJsonPath = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_TemplateContents = string[];
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerignoreContent = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerfileTemplate = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ComposeContent = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJsonRaw = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ParsedPackageJson = unknown;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJson = Record<string, unknown>;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_RawScripts = unknown;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Scripts = Record<string, string>;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ScriptValue = unknown;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_RuntimeDirectives = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_BuildDirectory = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerfileContent = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJsonContent = string;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_IsDryRun = boolean;
export type Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_IsReplaceFile = boolean;

/**
 * CLI - Generate - Docker Image - Is Profile.
 *
 * @since 0.29.0
 */
export type Cli_Generate_DockerImage_Index_Runner_IsProfile_Profile = string;
export type Cli_Generate_DockerImage_Index_Runner_IsProfile_TypeGuard = Shared_DockerImageProfile;

/**
 * CLI - Generate - Docker Image - Merge Scripts.
 *
 * @since 0.29.0
 */
export type Cli_Generate_DockerImage_Index_Runner_MergeScripts_Scripts = Record<string, string>;
export type Cli_Generate_DockerImage_Index_Runner_MergeScripts_Returns = Record<string, string>;
export type Cli_Generate_DockerImage_Index_Runner_MergeScripts_Entries = [string, string][];
export type Cli_Generate_DockerImage_Index_Runner_MergeScripts_DeployEntries = [string, string][];
export type Cli_Generate_DockerImage_Index_Runner_MergeScripts_Merged = Record<string, string>;
export type Cli_Generate_DockerImage_Index_Runner_MergeScripts_IsDeployInserted = boolean;

/**
 * CLI - Generate - Docker Image - Run.
 *
 * @since 0.29.0
 */
export type Cli_Generate_DockerImage_Index_Runner_Run_Options_DryRun = true;
export type Cli_Generate_DockerImage_Index_Runner_Run_Options_Profile = string;
export type Cli_Generate_DockerImage_Index_Runner_Run_Options_ReplaceFile = true;
export type Cli_Generate_DockerImage_Index_Runner_Run_Options_Workspace = string;
export type Cli_Generate_DockerImage_Index_Runner_Run_Options = {
  dryRun?: Cli_Generate_DockerImage_Index_Runner_Run_Options_DryRun;
  profile?: Cli_Generate_DockerImage_Index_Runner_Run_Options_Profile;
  replaceFile?: Cli_Generate_DockerImage_Index_Runner_Run_Options_ReplaceFile;
  workspace?: Cli_Generate_DockerImage_Index_Runner_Run_Options_Workspace;
};
export type Cli_Generate_DockerImage_Index_Runner_Run_Returns = Promise<Shared_GeneratorRunResult>;
export type Cli_Generate_DockerImage_Index_Runner_Run_CurrentDirectory = string;
export type Cli_Generate_DockerImage_Index_Runner_Run_IsAtProjectRoot = boolean;
export type Cli_Generate_DockerImage_Index_Runner_Run_Profile = string | undefined;
export type Cli_Generate_DockerImage_Index_Runner_Run_Workspace = string | undefined;
export type Cli_Generate_DockerImage_Index_Runner_Run_IsDryRun = boolean;
export type Cli_Generate_DockerImage_Index_Runner_Run_IsReplaceFile = boolean;
export type Cli_Generate_DockerImage_Index_Runner_Run_ReplaceFileNotice = string;
export type Cli_Generate_DockerImage_Index_Runner_Run_ProjectRoot = string;
export type Cli_Generate_DockerImage_Index_Runner_Run_RequestedWorkspaceDirectory = string;
export type Cli_Generate_DockerImage_Index_Runner_Run_WorkspaceDirectory = string;
export type Cli_Generate_DockerImage_Index_Runner_Run_RelativeWorkspacePath = string;
export type Cli_Generate_DockerImage_Index_Runner_Run_RunError = unknown;
