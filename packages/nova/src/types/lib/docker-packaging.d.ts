import type {
  Shared_DockerImageProfile,
  Shared_NovaConfig_IgnoreFile,
} from '../shared.d.ts';

/**
 * Lib - Docker Packaging - Build Runtime Directives.
 *
 * @since UNRELEASED
 */
export type Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Profile = Shared_DockerImageProfile;
export type Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Returns = string;
export type Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Lines = string[];

/**
 * Lib - Docker Packaging - Generate For Target.
 *
 * @since UNRELEASED
 */
export type Lib_DockerPackaging_Runner_GenerateForTarget_Options_BuildDirectory = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Options_DryRun = boolean;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Options_IgnoreFileEntry = Shared_NovaConfig_IgnoreFile;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Options_Profile = Shared_DockerImageProfile;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Options_ReportFiles = boolean;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Options_ReplaceFile = boolean;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Options_WorkspaceDirectory = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Options = {
  buildDirectory?: Lib_DockerPackaging_Runner_GenerateForTarget_Options_BuildDirectory;
  dryRun?: Lib_DockerPackaging_Runner_GenerateForTarget_Options_DryRun;
  ignoreFileEntry?: Lib_DockerPackaging_Runner_GenerateForTarget_Options_IgnoreFileEntry;
  profile: Lib_DockerPackaging_Runner_GenerateForTarget_Options_Profile;
  reportFiles?: Lib_DockerPackaging_Runner_GenerateForTarget_Options_ReportFiles;
  replaceFile?: Lib_DockerPackaging_Runner_GenerateForTarget_Options_ReplaceFile;
  workspaceDirectory: Lib_DockerPackaging_Runner_GenerateForTarget_Options_WorkspaceDirectory;
};
export type Lib_DockerPackaging_Runner_GenerateForTarget_Returns = Promise<void>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_TemplateRoot = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileTemplatePath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ComposeTemplatePath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_PackageJsonPath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_TemplateContents = string[];
export type Lib_DockerPackaging_Runner_GenerateForTarget_DockerignoreContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileTemplate = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ComposeContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_PackageJsonRaw = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ParsedPackageJson = unknown;
export type Lib_DockerPackaging_Runner_GenerateForTarget_PackageJson = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_RawScripts = unknown;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Scripts = Record<string, string>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ScriptValue = unknown;
export type Lib_DockerPackaging_Runner_GenerateForTarget_RuntimeDirectives = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_BuildDirectory = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_PackageJsonContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_IsDryRun = boolean;
export type Lib_DockerPackaging_Runner_GenerateForTarget_IsReplaceFile = boolean;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ReportFiles = boolean;

/**
 * Lib - Docker Packaging - Merge Scripts.
 *
 * @since UNRELEASED
 */
export type Lib_DockerPackaging_Runner_MergeScripts_Scripts = Record<string, string>;
export type Lib_DockerPackaging_Runner_MergeScripts_Returns = Record<string, string>;
export type Lib_DockerPackaging_Runner_MergeScripts_Entries = [string, string][];
export type Lib_DockerPackaging_Runner_MergeScripts_DeployEntries = [string, string][];
export type Lib_DockerPackaging_Runner_MergeScripts_Merged = Record<string, string>;
export type Lib_DockerPackaging_Runner_MergeScripts_IsDeployInserted = boolean;
