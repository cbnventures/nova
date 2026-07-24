import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import chalk from 'chalk';

import { libEnvNamespace } from '../../../lib/env-namespace.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_CHARACTER_BACKSLASH,
  LIB_REGEX_CHARACTER_BACKTICK,
  LIB_REGEX_CHARACTER_DOLLAR,
  LIB_REGEX_CHARACTER_DOUBLE_QUOTE,
  LIB_REGEX_CHARACTER_FORWARD_SLASH,
  LIB_REGEX_PATTERN_LEADING_DOT_SLASH,
} from '../../../lib/regex.js';
import {
  isProjectRoot,
  pathExists,
  renameFileWithDate,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { Runner as Validator } from './workflows-blueprint-validate.js';
import { Runner as Variables } from './workflows-blueprint-variables.js';

import type {
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_App,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_AppPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Apps,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_BuildValue,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Prefix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Results,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_App,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_AppPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Apps,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Prefix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Results,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Entry,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Env,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Job,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_On,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Prefix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Step,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Suffix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_WorkflowEnvironment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_WorkflowEnvironments,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_WorkflowId,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_AppPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_AppPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_RuntimeValues,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Steps,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_SyncStep,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_AppPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_ImageTags,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_ImageTags,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ActionEntryPoint,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ActionOutputPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ActionYmlPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_CommitAndPushReleaseRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ConfigureGitIdentityRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_EscapedNewline,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ForceRetagRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_InitializeReleaseWorkspaceRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ReleaseBranchName,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_StageReleaseTreeRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_VerifyReleaseContextRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_PagesStatusRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildIssueCommentTrigger_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildIssuesTrigger_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_DispatchInput,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Entry,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Env,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Job,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_On,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Prefix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Step,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Suffix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_WorkflowEnvironment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_WorkflowEnvironments,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_WorkflowId,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_AppPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_ArtifactName,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_BuildCommand,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_BuildJob,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_BuildValues,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_CheckCommand,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_DependsOn,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_DependsOnNames,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_DependsOnTrigger,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_DeployTarget,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Entry,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Env,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_HasWorkflowRunNode,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Jobs,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_JobsCondition,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedBranches,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedOn,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedPaths,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedPush,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedTags,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Names,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_On,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_OnNode,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_PublishCondition,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_PublishConditionParts,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Reference,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Referenced,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_ResolvedRootDir,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RootDir,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RootWorkingDirMeta,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RunName,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RunNameLabel,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RunNameParts,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Scopes,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Siblings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Steps,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Suffix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_TagPushTags,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Targets,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Trigger,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_TriggerName,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Triggers,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadArtifactPaths,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadMetadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadStep,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadTarget,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadWorkingDir,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UseTurbo,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_WorkflowId,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Workspace,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Workspaces,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_WriteEnvStep,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPushTrigger_Branches,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPushTrigger_Paths,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPushTrigger_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildReleaseTrigger_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScheduleDailyTrigger_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScheduleMonthlyTrigger_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScheduleWeeklyTrigger_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_NpmFlags,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_ScriptName,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_TurboFlags,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_UseTurbo,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_WorkspaceNames,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildTagPushTrigger_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildTagPushTrigger_Tags,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_AppPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Context,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_DeployStep,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Dollar,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Metadata,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_RuntimeValues,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Steps,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_SyncStep,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildWorkflowRunTrigger_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildWorkflowRunTrigger_Workflows,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Entry,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Siblings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Template,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_UseTurbo,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Workflow,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Workspaces,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Dollar_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Declared,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Env,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_ExtraEnv,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_JqObject,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Lines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Options,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Run,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_RuntimeValues,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_SecretDeclared,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_SecretValues,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VarDeclared,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VarFlags,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VariableValues,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Vendor,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VercelSecretDeclared,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VercelVarDeclared,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_WorkingDir,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_BackslashPattern,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_BacktickPattern,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_DollarPattern,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_DoubleQuotePattern,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_Value,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Expr_DollarBrace,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Expr_Inner,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Expr_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Config,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ConfigPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_CurrentDirectory,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Diagnostic,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Entry,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_EntrySetupLines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ExistingDirent,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ExistingEntries,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_GeneratedSet,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsAtProjectRoot,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsBackup,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsDryRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsOrphan,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsReplaceFile,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Options,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_OrphanPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_OutputFileName,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_RawConfig,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_RawContent,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_RawWorkflows,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ReplaceFileNotice,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Serialized,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_SetupLines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_SetupMessage,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Suffix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_TargetPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Template,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_UseTurbo,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ValidatedWorkflows,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Validation,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_WorkflowsDirectory,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Workspaces,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubAuthRun_Dollar,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubAuthRun_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubPublishRun_Dollar,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubPublishRun_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_InstallPackagesRun_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmAuthRun_Dollar,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmAuthRun_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmPublishRun_Dollar,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmPublishRun_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Quote_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Quote_Value,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_RemoveDeprecatedNpmrcRun_Dollar,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_RemoveDeprecatedNpmrcRun_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployJobId_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployJobId_Type,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployJobId_WorkingDir,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Dependencies,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Dependency,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Needs,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Target,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_App,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_AppPath,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_AppPrefix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Apps,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Environment,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Global,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_GlobalPrefix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Prefix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Scope,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_VariableMeta,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_VariableName,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_IsPrefixable,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_Prefix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_ResolvedName,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_TargetSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_VariableMeta,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_VariableName,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_Variables,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_WorkflowSettings,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_Suffix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_Template,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_WorkflowId,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowId_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowId_Suffix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ScopePackageNameRun_Dollar,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_ScopePackageNameRun_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Serialize_Lines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Serialize_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_Serialize_Workflow,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeEnv_Env,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeEnv_Lines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeEnv_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeHeader_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_IsEnvAfterRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_JobIf,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_JobNeeds,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_JobPermissions,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_Jobs,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_JobSteps,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_Lines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepEnv,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepId,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepIf,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepRun,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepUses,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepWith,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepWorkingDirectory,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeNeeds_Needs,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeNeeds_Quoted,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeNeeds_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeOn_Lines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeOn_On,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeOn_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Indent,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Lines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Permissions,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Value,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Block,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Indent,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Lines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Plain,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Run,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeScalar_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeScalar_Value,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_BlockValue,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Indent,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Lines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Value,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_WithMap,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SlugifyWorkingDir_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SlugifyWorkingDir_WithoutPrefix,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_SlugifyWorkingDir_WorkingDir,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Dollar,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_EscapedDefault,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Lines,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Returns,
  Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Variables,
} from '../../../types/cli/generate/github/workflows-blueprint.d.ts';

/**
 * CLI - Generate - GitHub - Workflows Blueprint.
 *
 * Rebuilds the workflow generator on a typed
 * blueprint so that builders construct the blueprint from
 * config and the serializer emits Nova's house style.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Generate.
   *
   * Mirrors the legacy generator's file-handling pipeline: guards the project
   * root, loads config, routes each entry through the dispatcher, writes with
   * skip-then-backup behavior, then cleans up orphaned nova workflow files.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Options} options - Options.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Returns}
   *
   * @since 0.21.0
   */
  public static async generate(options: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Options): Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Returns {
    const currentDirectory: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.generate',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.generate',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    // Load config for the parsed workspaces map. The raw config is read
    // separately so the validator sees on-disk fields before narrowing.
    const config: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Config = await new LibNovaConfig().load();
    const workspaces: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Workspaces = config['workspaces'] ?? {};
    const environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Environment = config['environment'] ?? {};

    // Read the raw nova.config.json so the validator inspects untyped
    // fields (missing or typo'd) that the parsed config would have dropped.
    const configPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ConfigPath = join(currentDirectory, 'nova.config.json');

    let rawConfig: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_RawConfig = {};

    try {
      const rawContent: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_RawContent = await fs.readFile(configPath, 'utf-8');

      rawConfig = JSON.parse(rawContent) as Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_RawConfig;
    } catch {
      Logger.customize({
        name: 'Runner.generate',
        purpose: 'config',
      }).error('Failed to read or parse "nova.config.json".');

      process.exitCode = 1;

      return 'cancelled';
    }

    const rawWorkflows: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_RawWorkflows = rawConfig['workflows'];

    if (Array.isArray(rawWorkflows) === false || rawWorkflows.length === 0) {
      Logger.customize({
        name: 'Runner.generate',
        purpose: 'skip',
      }).info('No workflows configured.');

      return 'completed';
    }

    // Validate the raw workflows. Diagnostics report each rejected workflow;
    // any diagnostic sets a non-zero exit while valid workflows still build.
    const validation: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Validation = Validator.validate(rawWorkflows, workspaces);
    const validatedWorkflows: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ValidatedWorkflows = validation['workflows'];

    for (const diagnosticEntry of validation['diagnostics']) {
      const diagnostic: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Diagnostic = diagnosticEntry;

      Logger.customize({
        name: 'Runner.generate',
        purpose: 'validate',
      }).error(diagnostic['message']);
    }

    if (validation['diagnostics'].length > 0) {
      process.exitCode = 1;
    }

    const workflowsDirectory: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_WorkflowsDirectory = join(currentDirectory, '.github', 'workflows');
    const generatedSet: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_GeneratedSet = new Set();
    const setupLines: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_SetupLines = [];

    // A project with a turbo.json gets turbo check/build commands; one
    // without gets npm workspace commands, mirroring the legacy detection.
    const useTurbo: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_UseTurbo = await pathExists(join(currentDirectory, 'turbo.json'));

    for (const workflowEntry of validatedWorkflows) {
      const entry: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Entry = workflowEntry;
      const template: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Template = entry['template'];
      const suffix: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Suffix = entry['name'];

      // Build output filename: nova-<template>[-<name>].yml.
      const outputFileName: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_OutputFileName = (suffix !== undefined) ? `nova-${template}-${suffix}.yml` : `nova-${template}.yml`;
      const serialized: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_Serialized = Runner.dispatch(entry, workspaces, environment, validatedWorkflows, useTurbo);
      const entrySetupLines: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_EntrySetupLines = Variables.collectSetupLines(entry, outputFileName, environment);

      generatedSet.add(outputFileName);

      setupLines.push(...entrySetupLines);

      if (isDryRun === true) {
        Logger.customize({
          name: 'Runner.generate',
          purpose: 'dry-run',
        }).info(`Would generate ${chalk.cyan(`".github/workflows/${outputFileName}"`)}.`);

        continue;
      }

      const targetPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_TargetPath = join(workflowsDirectory, outputFileName);

      await saveGeneratedFile(targetPath, serialized, isReplaceFile);
    }

    // Clean up orphans, but only when the config validated cleanly. A rejected
    // workflow is absent from the generated set, so cleaning up on a diagnostic
    // would wrongly delete a still-configured workflow's existing file.
    if (
      isDryRun !== true
      && validation['diagnostics'].length === 0
      && await pathExists(workflowsDirectory) === true
    ) {
      let existingEntries: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ExistingEntries = [];

      try {
        existingEntries = await fs.readdir(workflowsDirectory, { withFileTypes: true });
      } catch {
        /* empty */
      }

      for (const existingEntry of existingEntries) {
        const existingDirent: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_ExistingDirent = existingEntry;

        if (existingDirent.isFile() !== true) {
          continue;
        }

        const isOrphan: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsOrphan = existingDirent.name.startsWith('nova-') === true
          && existingDirent.name.endsWith('.yml') === true
          && generatedSet.has(existingDirent.name) === false;
        const isBackup: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_IsBackup = existingDirent.name.includes('.nova-backup.') === true;

        if (isOrphan !== true || isBackup === true) {
          continue;
        }

        const orphanPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_OrphanPath = join(workflowsDirectory, existingDirent.name);

        if (isReplaceFile === true) {
          await fs.unlink(orphanPath);

          Logger.customize({
            name: 'Runner.generate',
            purpose: 'cleanup',
          }).info(`Deleted orphan ${chalk.cyan(`"${existingDirent.name}"`)}.`);
        } else {
          await renameFileWithDate(orphanPath);

          Logger.customize({
            name: 'Runner.generate',
            purpose: 'cleanup',
          }).info(`Backed up orphan ${chalk.cyan(`"${existingDirent.name}"`)}.`);
        }
      }
    }

    // Print setup instructions for the secrets and variables the generated
    // workflows require, mirroring the legacy generator's Setup report.
    if (setupLines.length > 0) {
      const setupMessage: Cli_Generate_Github_WorkflowsBlueprint_Runner_Generate_SetupMessage = [
        'Setup:',
        setupLines.join('\n'),
      ].join('\n');

      Logger.customize({
        name: 'Runner.generate',
        purpose: 'setup',
        padTop: 1,
      }).info(setupMessage);
    }

    return 'completed';
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Dispatch.
   *
   * Routes a workflow config entry to the matching template builder and
   * returns the serialized YAML. The publish builder receives the workspaces
   * map and the sibling workflows for scope and chaining resolution.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Entry}       entry         - Entry.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Workspaces}  workspaces    - Workspaces.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Environment} [environment] - Environment.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Siblings}    [siblings]    - Siblings.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_UseTurbo}    [useTurbo]    - Use turbo.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Returns}
   *
   * @since 0.21.0
   */
  public static dispatch(entry: Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Entry, workspaces: Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Workspaces, environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Environment = {}, siblings: Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Siblings = [], useTurbo: Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_UseTurbo = true): Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Returns {
    const template: Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Template = entry['template'];

    let workflow: Cli_Generate_Github_WorkflowsBlueprint_Runner_Dispatch_Workflow = undefined;

    if (template === 'check-sponsor-gated-issues') {
      workflow = Runner.buildCheckSponsorGatedIssues(entry, environment);
    } else if (template === 'lock-inactive-issues') {
      workflow = Runner.buildLockInactiveIssues(entry, environment);
    } else {
      workflow = Runner.buildPublish(entry, workspaces, environment, siblings, useTurbo);
    }

    return Runner.serialize(workflow);
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize.
   *
   * Walks the blueprint and emits YAML directly, owning the exact key order
   * and non-uniform quoting so an unchanged workflow round-trips clean.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_Serialize_Workflow} workflow - Workflow.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_Serialize_Returns}
   *
   * @since 0.21.0
   */
  public static serialize(workflow: Cli_Generate_Github_WorkflowsBlueprint_Runner_Serialize_Workflow): Cli_Generate_Github_WorkflowsBlueprint_Runner_Serialize_Returns {
    const lines: Cli_Generate_Github_WorkflowsBlueprint_Runner_Serialize_Lines = [];

    // Header block plus one blank line.
    lines.push(...Runner.serializeHeader());

    lines.push('');

    // Top-level key order: name, run-name, on, permissions, concurrency, env, jobs.
    lines.push(`name: ${Runner.quote(workflow['name'])}`);

    lines.push('');

    lines.push(`run-name: ${Runner.quote(workflow['runName'])}`);

    lines.push('');

    lines.push(...Runner.serializeOn(workflow['on']));

    lines.push('');

    lines.push('permissions:');

    lines.push(...Runner.serializePermissions(workflow['permissions'], '  '));

    lines.push('');

    lines.push('concurrency:');

    lines.push(`  group: ${Runner.quote(workflow['concurrency']['group'])}`);

    lines.push(`  cancel-in-progress: ${Runner.serializeScalar(workflow['concurrency']['cancelInProgress'])}`);

    lines.push('');

    lines.push(...Runner.serializeEnv(workflow['env']));

    lines.push('');

    lines.push(...Runner.serializeJobs(workflow['jobs']));

    return `${lines.join('\n')}\n`;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Check Sponsor Gated Issues.
   *
   * Constructs the issue-gating workflow blueprint from a config entry,
   * merging the declared issue triggers and the fixed sponsor job.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Entry}       entry         - Entry.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Environment} [environment] - Environment.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Returns}
   *
   * @since 0.21.0
   */
  public static buildCheckSponsorGatedIssues(entry: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Entry, environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Environment = {}): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Returns {
    const suffix: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Suffix = entry['name'];
    const workflowId: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_WorkflowId = Runner.resolveWorkflowId(suffix);

    // Resolve the workflow's namespace prefix by its unique name. Each declared
    // config key derives its GitHub name as prefix + key; the automatic
    // GITHUB_TOKEN is never prefixed.
    const workflowEnvironments: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_WorkflowEnvironments = environment['workflows'];
    const workflowEnvironment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_WorkflowEnvironment = (workflowEnvironments === undefined) ? undefined : workflowEnvironments[suffix];
    const prefix: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Prefix = (workflowEnvironment === undefined) ? undefined : workflowEnvironment['prefix'];

    // Merge trigger builders in config order. Both triggers carry the same
    // run-name expression, so the merged run-name is that shared expression.
    const on: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_On = [];

    for (const trigger of entry['triggers']) {
      if (trigger === 'issue-comment') {
        on.push(Runner.buildIssueCommentTrigger());
      }

      if (trigger === 'issues') {
        on.push(Runner.buildIssuesTrigger());
      }
    }

    // Resolve declared template variables via the shared metadata so
    // per-workflow settings can remap the secret and var names.
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_WorkflowSettings = entry['with'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Metadata = Variables.getTemplateMetadata('check-sponsor-gated-issues');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Variables = (metadata === undefined) ? {} : metadata['variables'];

    const env: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Env = [
      {
        key: 'ISSUE_LABELS',
        value: Runner.resolveVariableExpr(variables, 'ISSUE_LABELS', undefined, workflowSettings, prefix),
      },
      {
        key: 'ISSUE_LIMIT_COMMENTER',
        value: Runner.resolveVariableExpr(variables, 'ISSUE_LIMIT_COMMENTER', undefined, workflowSettings, prefix),
      },
      {
        key: 'ISSUE_LOCK_ON_CLOSE',
        value: Runner.resolveVariableExpr(variables, 'ISSUE_LOCK_ON_CLOSE', undefined, workflowSettings, prefix),
      },
      {
        key: 'ISSUE_MESSAGE_NOT_SPONSOR',
        value: Runner.resolveVariableExpr(variables, 'ISSUE_MESSAGE_NOT_SPONSOR', undefined, workflowSettings, prefix),
      },
      {
        key: 'ISSUE_MESSAGE_WELCOME',
        value: Runner.resolveVariableExpr(variables, 'ISSUE_MESSAGE_WELCOME', undefined, workflowSettings, prefix),
      },
      {
        key: 'IS_ORGANIZATION',
        value: Runner.resolveVariableExpr(variables, 'IS_ORGANIZATION', undefined, workflowSettings, prefix),
      },
      {
        key: 'SPONSOR_ACTIVE_ONLY',
        value: Runner.resolveVariableExpr(variables, 'SPONSOR_ACTIVE_ONLY', undefined, workflowSettings, prefix),
      },
      {
        key: 'SPONSOR_EXEMPT_FILE_LOCATION',
        value: Runner.resolveVariableExpr(variables, 'SPONSOR_EXEMPT_FILE_LOCATION', undefined, workflowSettings, prefix),
      },
      {
        key: 'SPONSOR_MINIMUM',
        value: Runner.resolveVariableExpr(variables, 'SPONSOR_MINIMUM', undefined, workflowSettings, prefix),
      },
    ];

    const step: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Step = {
      name: 'Check support issues',
      uses: 'mrjackyliang/sponsor-gated-support@v1.0.1',
      env: [
        {
          key: 'GITHUB_TOKEN',
          value: Runner.resolveVariableExpr(variables, 'GITHUB_TOKEN', undefined, workflowSettings, prefix),
        },
        {
          key: 'PERSONAL_ACCESS_TOKEN',
          value: Runner.resolveVariableExpr(variables, 'PERSONAL_ACCESS_TOKEN', undefined, workflowSettings, prefix),
        },
      ],
      with: [
        {
          key: 'GITHUB_PERSONAL_ACCESS_TOKEN',
          value: Runner.expr('env.PERSONAL_ACCESS_TOKEN'),
        },
        {
          key: 'GITHUB_WORKFLOW_TOKEN',
          value: Runner.expr('env.GITHUB_TOKEN'),
        },
        {
          key: 'ISSUE_LABELS',
          value: Runner.expr('env.ISSUE_LABELS'),
        },
        {
          key: 'ISSUE_LIMIT_COMMENTER',
          value: Runner.expr('env.ISSUE_LIMIT_COMMENTER'),
        },
        {
          key: 'ISSUE_LOCK_ON_CLOSE',
          value: Runner.expr('env.ISSUE_LOCK_ON_CLOSE'),
        },
        {
          key: 'ISSUE_MESSAGE_NOT_SPONSOR',
          value: Runner.expr('env.ISSUE_MESSAGE_NOT_SPONSOR'),
        },
        {
          key: 'ISSUE_MESSAGE_WELCOME',
          value: Runner.expr('env.ISSUE_MESSAGE_WELCOME'),
        },
        {
          key: 'IS_ORGANIZATION',
          value: Runner.expr('env.IS_ORGANIZATION'),
        },
        {
          key: 'SPONSOR_ACTIVE_ONLY',
          value: Runner.expr('env.SPONSOR_ACTIVE_ONLY'),
        },
        {
          key: 'SPONSOR_EXEMPT_FILE_LOCATION',
          value: Runner.expr('env.SPONSOR_EXEMPT_FILE_LOCATION'),
        },
        {
          key: 'SPONSOR_MINIMUM',
          value: Runner.expr('env.SPONSOR_MINIMUM'),
        },
      ],
    };

    const job: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCheckSponsorGatedIssues_Job = {
      id: 'check-issues',
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 5,
      permissions: {
        contents: 'read',
        issues: 'write',
      },
      steps: [
        {
          name: 'Checkout repository',
          uses: 'actions/checkout@v7',
        },
        step,
      ],
    };

    return {
      name: `Check Sponsor Gated Issues${workflowId}`,
      runName: Runner.expr('github.event_name == \'issues\' && format(\'Analyzing issue #{0}\', github.event.issue.number) || format(\'Analyzing comment on issue #{0}\', github.event.issue.number)'),
      on,
      permissions: {
        contents: 'read',
      },
      concurrency: {
        group: `${Runner.expr('github.workflow')}-${Runner.expr('github.event.issue.number')}`,
        cancelInProgress: false,
      },
      env,
      jobs: [job],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Lock Inactive Issues.
   *
   * Constructs the lock-inactive-issues workflow blueprint from a config
   * entry, appending the fixed workflow_dispatch dry-run input.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Entry}       entry         - Entry.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Environment} [environment] - Environment.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Returns}
   *
   * @since 0.21.0
   */
  public static buildLockInactiveIssues(entry: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Entry, environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Environment = {}): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Returns {
    const suffix: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Suffix = entry['name'];
    const workflowId: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_WorkflowId = Runner.resolveWorkflowId(suffix);

    // Resolve the workflow's namespace prefix by its unique name so a remapped
    // token would derive as prefix + key. The only variable here is the
    // automatic GITHUB_TOKEN, which is never prefixed.
    const workflowEnvironments: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_WorkflowEnvironments = environment['workflows'];
    const workflowEnvironment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_WorkflowEnvironment = (workflowEnvironments === undefined) ? undefined : workflowEnvironments[suffix];
    const prefix: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Prefix = (workflowEnvironment === undefined) ? undefined : workflowEnvironment['prefix'];

    // Assemble the on-block. The schedule comes from the trigger builder; the
    // workflow_dispatch input is fixed by the template.
    const on: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_On = [];

    for (const trigger of entry['triggers']) {
      if (trigger === 'schedule-weekly') {
        on.push(Runner.buildScheduleWeeklyTrigger());
      }

      if (trigger === 'schedule-daily') {
        on.push(Runner.buildScheduleDailyTrigger());
      }

      if (trigger === 'schedule-monthly') {
        on.push(Runner.buildScheduleMonthlyTrigger());
      }
    }

    const dispatchInput: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_DispatchInput = {
      event: 'workflow_dispatch',
      inputs: [{
        name: 'dry-run',
        description: 'Run without making changes',
        required: false,
        type: 'boolean',
        default: true,
      }],
    };

    on.push(dispatchInput);

    const env: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Env = [{
      key: 'DRY_RUN',
      value: Runner.expr('github.event_name == \'workflow_dispatch\' && inputs.dry-run || \'false\''),
    }];

    // Resolve the auto GITHUB_TOKEN secret via the shared metadata so a
    // per-workflow setting could remap it, though the default is unchanged.
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_WorkflowSettings = entry['with'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Metadata = Variables.getTemplateMetadata('lock-inactive-issues');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Variables = (metadata === undefined) ? {} : metadata['variables'];

    const step: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Step = {
      name: 'Lock inactive threads',
      uses: 'mrjackyliang/lock-inactive-threads@v1',
      env: [{
        key: 'GITHUB_TOKEN',
        value: Runner.resolveVariableExpr(variables, 'GITHUB_TOKEN', undefined, workflowSettings, prefix),
      }],
      with: [
        {
          key: 'GITHUB_TOKEN',
          value: Runner.expr('env.GITHUB_TOKEN'),
        },
        {
          key: 'ISSUE_COMMENT',
          value: 'Due to inactivity, this issue will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new issue.',
        },
        {
          key: 'ISSUE_INACTIVE_DAYS',
          value: '30',
        },
        {
          key: 'ISSUE_LOCK_REASON',
          value: 'resolved',
        },
        {
          key: 'PR_COMMENT',
          value: 'Due to inactivity, this pull request will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new pull request.',
        },
        {
          key: 'PR_INACTIVE_DAYS',
          value: '30',
        },
        {
          key: 'PR_LOCK_REASON',
          value: 'resolved',
        },
        {
          key: 'LOG_OUTPUT',
          value: 'true',
        },
        {
          key: 'DRY_RUN',
          value: Runner.expr('env.DRY_RUN'),
        },
      ],
    };

    const job: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildLockInactiveIssues_Job = {
      id: 'lock-inactive-issues',
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 5,
      steps: [step],
    };

    return {
      name: `Lock Inactive Issues${workflowId}`,
      runName: `Locking inactive issues${workflowId}\${{ github.event_name == 'workflow_dispatch' && inputs.dry-run && ' (dry run)' || '' }}`,
      on,
      permissions: {
        issues: 'write',
      },
      concurrency: {
        group: Runner.expr('github.workflow'),
        cancelInProgress: false,
      },
      env,
      jobs: [job],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Publish.
   *
   * Constructs the publish workflow blueprint from a config entry,
   * emitting one shared build job then one deploy job per target; sibling
   * workflows resolve chained depends-on references to names.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Entry}       entry         - Entry.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Workspaces}  workspaces    - Workspaces.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Environment} [environment] - Environment.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Siblings}    [siblings]    - Siblings.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UseTurbo}    [useTurbo]    - Use turbo.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Returns}
   *
   * @since 0.21.0
   */
  public static buildPublish(entry: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Entry, workspaces: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Workspaces, environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Environment = {}, siblings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Siblings = [], useTurbo: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UseTurbo = true): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Returns {
    const suffix: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Suffix = entry['name'];
    const workflowId: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_WorkflowId = Runner.resolveWorkflowId(suffix);

    // Assemble the on-block and per-trigger condition parts in config order.
    // The workflow_dispatch dry-run input is fixed by the template.
    const on: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_On = [];
    const publishConditionParts: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_PublishConditionParts = [];
    const runNameParts: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RunNameParts = [];
    const triggers: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Triggers = entry['triggers'];

    // Resolve each workflow-run reference (a sibling's template-name key, now
    // carried on the trigger object as "workflows") to that workflow's display
    // name so the workflow_run node lists the exact upstream names generated.
    const dependsOn: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_DependsOn = [];

    for (const dependsOnTriggerValue of triggers) {
      const dependsOnTrigger: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_DependsOnTrigger = dependsOnTriggerValue;

      if (typeof dependsOnTrigger === 'string') {
        continue;
      }

      if (
        dependsOnTrigger['name'] === 'workflow-run-success'
        || dependsOnTrigger['name'] === 'workflow-run-any'
        || dependsOnTrigger['name'] === 'workflow-run-failure'
      ) {
        for (const workflowReference of dependsOnTrigger['workflows'] ?? []) {
          dependsOn.push(workflowReference);
        }

        break;
      }
    }

    const dependsOnNames: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_DependsOnNames = [];

    for (const dependsOnReference of dependsOn) {
      const reference: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Reference = dependsOnReference;
      const referenced: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Referenced = siblings.find((sibling) => `${sibling['template']}-${sibling['name']}` === reference);

      if (referenced === undefined) {
        continue;
      }

      dependsOnNames.push(Runner.resolveWorkflowDisplayName(referenced['template'], referenced['name']));
    }

    let hasWorkflowRunNode: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_HasWorkflowRunNode = false;
    let jobsCondition: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_JobsCondition = undefined;

    for (const triggerEntry of triggers) {
      const trigger: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Trigger = triggerEntry;
      const triggerName: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_TriggerName = (typeof trigger === 'string') ? trigger : trigger['name'];

      if (triggerName === 'release') {
        on.push(Runner.buildReleaseTrigger());

        publishConditionParts.push('github.event_name == \'release\'');

        runNameParts.push('github.event.release.tag_name');
      }

      if (triggerName === 'tag-push') {
        const tagPushTags: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_TagPushTags = (typeof trigger === 'string') ? undefined : trigger['tags'];

        on.push(Runner.buildTagPushTrigger(tagPushTags));

        publishConditionParts.push('github.event_name == \'push\' && startsWith(github.ref, \'refs/tags/\')');

        runNameParts.push('github.event_name == \'push\' && startsWith(github.ref, \'refs/tags/\') && github.ref_name');
      }

      if (triggerName === 'push' && typeof trigger !== 'string') {
        on.push(Runner.buildPushTrigger(trigger['branches'] ?? [], trigger['paths']));

        publishConditionParts.push('github.event_name == \'push\' && startsWith(github.ref, \'refs/heads/\')');

        runNameParts.push('github.event_name == \'push\' && startsWith(github.ref, \'refs/heads/\') && github.ref_name');
      }

      if (
        triggerName === 'workflow-run-success'
        || triggerName === 'workflow-run-any'
        || triggerName === 'workflow-run-failure'
      ) {
        // The three variants share one on-node and condition parts, so only
        // the first workflow-run trigger contributes them, mirroring the old
        // generator's key-merged trigger blocks and deduped condition parts.
        if (hasWorkflowRunNode === false) {
          on.push(Runner.buildWorkflowRunTrigger(dependsOnNames));

          publishConditionParts.push('github.event_name == \'workflow_run\'');

          runNameParts.push('github.event.workflow_run.head_branch');

          hasWorkflowRunNode = true;
        }

        // The first trigger declaring a jobs condition wins, gating every job
        // on the upstream conclusion; the any variant declares none.
        if (jobsCondition === undefined && triggerName === 'workflow-run-success') {
          jobsCondition = Runner.expr('github.event_name != \'workflow_run\' || github.event.workflow_run.conclusion == \'success\'');
        }

        if (jobsCondition === undefined && triggerName === 'workflow-run-failure') {
          jobsCondition = Runner.expr('github.event_name != \'workflow_run\' || github.event.workflow_run.conclusion == \'failure\'');
        }
      }
    }

    // GitHub keeps one push mapping key per on-block; a push block listing
    // both branches and tags fires when either matches, so merging every push
    // node into one preserves both behaviors without duplicate YAML keys.
    const mergedOn: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedOn = [];

    let mergedPush: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedPush = undefined;

    for (const onEntry of on) {
      const onNode: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_OnNode = onEntry;

      if (onNode['event'] !== 'push') {
        mergedOn.push(onNode);

        continue;
      }

      if (mergedPush === undefined) {
        mergedPush = onNode;

        mergedOn.push(mergedPush);

        continue;
      }

      const mergedBranches: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedBranches = [
        ...(mergedPush['branches'] ?? []),
        ...(onNode['branches'] ?? []),
      ];
      const mergedTags: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedTags = [
        ...(mergedPush['tags'] ?? []),
        ...(onNode['tags'] ?? []),
      ];
      const mergedPaths: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_MergedPaths = [
        ...(mergedPush['paths'] ?? []),
        ...(onNode['paths'] ?? []),
      ];

      if (mergedBranches.length > 0) {
        Reflect.set(mergedPush, 'branches', mergedBranches);
      }

      if (mergedTags.length > 0) {
        Reflect.set(mergedPush, 'tags', mergedTags);
      }

      if (mergedPaths.length > 0) {
        Reflect.set(mergedPush, 'paths', mergedPaths);
      }
    }

    mergedOn.push({
      event: 'workflow_dispatch',
      inputs: [{
        name: 'dry-run',
        description: 'Run without making changes',
        required: false,
        type: 'boolean',
        default: true,
      }],
    });

    // Merge the PUBLISH gate and the run-name label from the per-trigger
    // parts, parenthesizing only a part that contains "&&" so the merged
    // release-only strings reproduce today's output byte-for-byte.
    const publishCondition: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_PublishCondition = [
      ...publishConditionParts.map((part) => ((part.includes('&&') === true) ? `(${part})` : part)),
      '(github.event_name == \'workflow_dispatch\' && !inputs.dry-run)',
    ].join(' || ');
    const runNameLabel: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RunNameLabel = [
      ...runNameParts.map((part) => ((part.includes('&&') === true) ? `(${part})` : part)),
      '\'manually\'',
    ].join(' || ');
    const runName: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RunName = `Publishing ${Runner.expr(runNameLabel)}${workflowId}\${{ github.event_name == 'workflow_dispatch' && inputs.dry-run && ' (dry run)' || '' }}`;

    // Resolve the ROOT_WORKING_DIR literal through the shared metadata. The
    // defensive fallback stays since the validator guarantees the setting.
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_WorkflowSettings = entry['with'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Metadata = Variables.getTemplateMetadata('publish');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Variables = (metadata === undefined) ? {} : metadata['variables'];
    const rootWorkingDirMeta: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RootWorkingDirMeta = variables['ROOT_WORKING_DIR'] ?? { format: 'literal' };
    const resolvedRootDir: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_ResolvedRootDir = Variables.resolve('ROOT_WORKING_DIR', undefined, workflowSettings, rootWorkingDirMeta);
    const rootDir: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_RootDir = (resolvedRootDir === 'ROOT_WORKING_DIR') ? './' : resolvedRootDir;

    const env: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Env = [
      {
        key: 'PUBLISH',
        value: Runner.expr(publishCondition),
      },
      {
        key: 'ROOT_DIR',
        value: rootDir,
      },
    ];

    // Resolve each scope directory to its workspace name for the turbo
    // filter list that drives the check and build commands.
    const scopes: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Scopes = entry['build'] ?? [];
    const names: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Names = scopes.map((scope) => {
      const workspace: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Workspace = workspaces[scope] as Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Workspace;

      return workspace['name'];
    });
    const checkCommand: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_CheckCommand = Runner.buildScopeCommand('check', names, useTurbo);
    const buildCommand: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_BuildCommand = Runner.buildScopeCommand('build', names, useTurbo);

    const steps: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Steps = [
      {
        name: 'Checkout repository',
        uses: 'actions/checkout@v7',
        with: [{
          key: 'fetch-depth',
          value: 0,
        }],
      },
      {
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v6',
        with: [
          {
            key: 'node-version-file',
            value: `${Runner.expr('env.ROOT_DIR')}/package.json`,
          },
          {
            key: 'package-manager-cache',
            value: false,
          },
        ],
      },
      {
        name: 'Install packages',
        run: Runner.installPackagesRun(),
        workingDirectory: Runner.expr('env.ROOT_DIR'),
      },
    ];

    // Bake each scope's build-only environment values into that scope's .env
    // before the shared check/build. Each value derives its GitHub name from
    // the app prefix; a Variable reads from vars, a Secret from secrets. A
    // scope with no build-only values adds no step.
    for (const scope of scopes) {
      const buildValues: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_BuildValues = Runner.appBuildValues(environment, scope);

      if (buildValues.length === 0) {
        continue;
      }

      const writeEnvStep: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_WriteEnvStep = {
        name: `Write environment file (${Runner.slugifyWorkingDir(scope)})`,
        env: buildValues.map((buildValue) => ({
          key: buildValue['key'],
          value: (buildValue['secret'] === true) ? Runner.expr(`secrets.${buildValue['name']}`) : Runner.expr(`vars.${buildValue['name']}`),
        })),
        run: Runner.writeEnvRun(buildValues),
        runBlock: true,
        workingDirectory: scope,
      };

      steps.push(writeEnvStep);
    }

    steps.push({
      name: 'Check project',
      run: checkCommand,
      runBlock: true,
      workingDirectory: Runner.expr('env.ROOT_DIR'),
    });

    steps.push({
      name: 'Build project',
      run: buildCommand,
      runBlock: true,
      workingDirectory: Runner.expr('env.ROOT_DIR'),
    });

    // One upload-artifact step per target with declared artifact paths, in
    // target order. A zero-path target (docker-hub, ghcr) rebuilds from the
    // checkout inside its own deploy job, so it contributes no upload step.
    const targets: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Targets = entry['deploy'] ?? [];

    for (const target of targets) {
      const uploadTarget: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadTarget = target;
      const uploadMetadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadMetadata = Variables.getTargetMetadata('publish', uploadTarget['to']);
      const uploadArtifactPaths: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadArtifactPaths = (uploadMetadata === undefined) ? ['{workingDir}/build'] : uploadMetadata['artifactPaths'];

      if (uploadArtifactPaths.length === 0) {
        continue;
      }

      // The declared paths substitute the working directory with the leading
      // dot-slash removed, one uploaded path per block-scalar line.
      const uploadWorkingDir: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadWorkingDir = uploadTarget['path'].replace(LIB_REGEX_PATTERN_LEADING_DOT_SLASH, '');
      const uploadPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadPath = uploadArtifactPaths.map((artifactPath) => artifactPath.replace('{workingDir}', uploadWorkingDir)).join('\n');
      const artifactName: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_ArtifactName = `build-${uploadTarget['to']}-${Runner.slugifyWorkingDir(uploadTarget['path'])}`;

      const uploadStep: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_UploadStep = {
        name: `Upload build artifacts (${uploadTarget['to']}/${Runner.slugifyWorkingDir(uploadTarget['path'])})`,
        uses: 'actions/upload-artifact@v7',
        with: [
          {
            key: 'name',
            value: artifactName,
          },
          {
            key: 'retention-days',
            value: 1,
          },
          {
            key: 'path',
            value: uploadPath,
            block: true,
          },
        ],
      };

      steps.push(uploadStep);
    }

    const buildJob: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_BuildJob = {
      id: 'build',
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 15,
      permissions: {
        contents: 'read',
      },
      steps,
    };

    const jobs: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Jobs = [buildJob];

    for (const target of targets) {
      const deployTarget: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_DeployTarget = target;
      const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_TargetSettings = deployTarget['with'];
      const context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPublish_Context = {
        workingDir: deployTarget['path'],
        artifactName: `build-${deployTarget['to']}-${Runner.slugifyWorkingDir(deployTarget['path'])}`,
        needs: Runner.resolveDeployNeeds(deployTarget),
        targetSettings,
        workflowSettings,
        workspace: workspaces[deployTarget['path']],
        environment,
      };

      // Every buildable deploy destination gets an explicit branch. There is no
      // fallthrough because the validator rejects unknown deploy destinations.
      if (deployTarget['to'] === 'npm') {
        jobs.push(Runner.buildNpmTarget(context));
      } else if (deployTarget['to'] === 'github-packages') {
        jobs.push(Runner.buildGithubPackagesTarget(context));
      } else if (deployTarget['to'] === 'cloudflare-pages-docusaurus') {
        jobs.push(Runner.buildCloudflarePagesDocusaurusTarget(context));
      } else if (deployTarget['to'] === 'cloudflare-workers') {
        jobs.push(Runner.buildCloudflareWorkersTarget(context));
      } else if (deployTarget['to'] === 'docker-hub') {
        jobs.push(Runner.buildDockerHubTarget(context));
      } else if (deployTarget['to'] === 'ghcr') {
        jobs.push(Runner.buildGhcrTarget(context));
      } else if (deployTarget['to'] === 'github-pages-docusaurus') {
        jobs.push(Runner.buildGithubPagesDocusaurusTarget(context));
      } else if (deployTarget['to'] === 'github-action') {
        jobs.push(Runner.buildGithubActionTarget(context));
      } else if (deployTarget['to'] === 'vercel-nextjs') {
        jobs.push(Runner.buildVercelNextjsTarget(context));
      }
    }

    // A workflow-run jobs condition gates the build job and every deploy job
    // identically, each rendered between the job's permissions and steps.
    if (jobsCondition !== undefined) {
      for (const gatedJob of jobs) {
        Reflect.set(gatedJob, 'if', jobsCondition);
      }
    }

    return {
      name: `Publish${workflowId}`,
      runName,
      on: mergedOn,
      permissions: {
        contents: 'read',
      },
      concurrency: {
        group: `${Runner.expr('github.workflow')}-${Runner.expr('github.ref')}`,
        cancelInProgress: false,
      },
      env,
      jobs,
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Release Trigger.
   *
   * Returns the release trigger node, listing the published activity
   * type the publish workflow reacts to.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildReleaseTrigger_Returns}
   *
   * @since 0.21.0
   */
  public static buildReleaseTrigger(): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildReleaseTrigger_Returns {
    return {
      event: 'release',
      types: ['published'],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Tag Push Trigger.
   *
   * Returns the tag push trigger node, matching version tags by default
   * so a pushed release tag starts the publish workflow.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildTagPushTrigger_Tags} [tags] - Tags.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildTagPushTrigger_Returns}
   *
   * @since 0.21.0
   */
  public static buildTagPushTrigger(tags: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildTagPushTrigger_Tags = ['v*']): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildTagPushTrigger_Returns {
    return {
      event: 'push',
      tags,
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Push Trigger.
   *
   * Returns the branch push trigger node, carrying the configured
   * branches and the optional paths filter.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPushTrigger_Branches} branches - Branches.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPushTrigger_Paths}    [paths]  - Paths.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPushTrigger_Returns}
   *
   * @since 0.21.0
   */
  public static buildPushTrigger(branches: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPushTrigger_Branches, paths?: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPushTrigger_Paths): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildPushTrigger_Returns {
    if (paths === undefined) {
      return {
        event: 'push',
        branches,
      };
    }

    return {
      event: 'push',
      branches,
      paths,
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Workflow Run Trigger.
   *
   * Returns the workflow_run trigger node listing the resolved
   * upstream workflow names. All three workflow-run trigger variants share
   * this node; they differ only in the applied jobs condition.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildWorkflowRunTrigger_Workflows} workflows - Workflows.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildWorkflowRunTrigger_Returns}
   *
   * @since 0.21.0
   */
  public static buildWorkflowRunTrigger(workflows: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildWorkflowRunTrigger_Workflows): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildWorkflowRunTrigger_Returns {
    return {
      event: 'workflow_run',
      workflows,
      types: ['completed'],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build npm Target.
   *
   * Returns the npm deploy job that downloads the target artifact and
   * publishes the package with trusted publishing or an NPM token.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Context} context - Context.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Returns}
   *
   * @since 0.21.0
   */
  public static buildNpmTarget(context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Context): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Returns {
    const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_TargetSettings = context['targetSettings'];
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_WorkflowSettings = context['workflowSettings'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Metadata = Variables.getTargetMetadata('publish', 'npm');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Variables = (metadata === undefined) ? {} : metadata['variables'];
    const environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_Environment = context['environment'];
    const appPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildNpmTarget_AppPath = context['workingDir'];

    return {
      id: `publish-npm-${Runner.slugifyWorkingDir(context['workingDir'])}`,
      needs: context['needs'],
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 10,
      permissions: {
        'contents': 'read',
        'id-token': 'write',
      },
      steps: [
        {
          name: 'Checkout repository',
          uses: 'actions/checkout@v7',
        },
        {
          name: 'Setup Node.js',
          uses: 'actions/setup-node@v6',
          with: [
            {
              key: 'node-version-file',
              value: `${Runner.expr('env.ROOT_DIR')}/package.json`,
            },
            {
              key: 'package-manager-cache',
              value: false,
            },
            {
              key: 'registry-url',
              value: 'https://registry.npmjs.org',
            },
          ],
        },
        {
          name: 'Remove deprecated .npmrc entries',
          run: Runner.removeDeprecatedNpmrcRun(),
        },
        {
          name: 'Download build artifacts',
          uses: 'actions/download-artifact@v8',
          with: [
            {
              key: 'name',
              value: context['artifactName'],
            },
            {
              key: 'path',
              value: `${context['workingDir']}/build`,
            },
          ],
        },
        {
          name: 'Configure authentication',
          env: [{
            key: 'NPM_TOKEN',
            value: Runner.resolveScopedCredExpr(variables, 'NPM_TOKEN', targetSettings, workflowSettings, environment, appPath),
          }],
          run: Runner.npmAuthRun(),
        },
        {
          name: 'Publish package to npm',
          run: Runner.npmPublishRun(),
          workingDirectory: context['workingDir'],
        },
      ],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build GitHub Packages Target.
   *
   * Returns the GitHub Packages deploy job that scopes the package name
   * to the repository owner, publishes it, then restores the name.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Context} context - Context.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Returns}
   *
   * @since 0.21.0
   */
  public static buildGithubPackagesTarget(context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Context): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Returns {
    const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_TargetSettings = context['targetSettings'];
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_WorkflowSettings = context['workflowSettings'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Metadata = Variables.getTargetMetadata('publish', 'github-packages');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPackagesTarget_Variables = (metadata === undefined) ? {} : metadata['variables'];

    return {
      id: `publish-github-packages-${Runner.slugifyWorkingDir(context['workingDir'])}`,
      needs: context['needs'],
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 10,
      permissions: {
        'contents': 'read',
        'packages': 'write',
        'id-token': 'write',
      },
      steps: [
        {
          name: 'Checkout repository',
          uses: 'actions/checkout@v7',
        },
        {
          name: 'Setup Node.js',
          uses: 'actions/setup-node@v6',
          with: [
            {
              key: 'node-version-file',
              value: `${Runner.expr('env.ROOT_DIR')}/package.json`,
            },
            {
              key: 'package-manager-cache',
              value: false,
            },
          ],
        },
        {
          name: 'Configure registry for GitHub Packages',
          uses: 'actions/setup-node@v6',
          with: [
            {
              key: 'node-version-file',
              value: `${Runner.expr('env.ROOT_DIR')}/package.json`,
            },
            {
              key: 'package-manager-cache',
              value: false,
            },
            {
              key: 'registry-url',
              value: 'https://npm.pkg.github.com',
            },
            {
              key: 'scope',
              value: `@${Runner.expr('github.repository_owner')}`,
            },
          ],
        },
        {
          name: 'Remove deprecated .npmrc entries',
          run: Runner.removeDeprecatedNpmrcRun(),
        },
        {
          name: 'Download build artifacts',
          uses: 'actions/download-artifact@v8',
          with: [
            {
              key: 'name',
              value: context['artifactName'],
            },
            {
              key: 'path',
              value: `${context['workingDir']}/build`,
            },
          ],
        },
        {
          name: 'Change to scoped package name',
          run: Runner.scopePackageNameRun(),
          workingDirectory: context['workingDir'],
        },
        {
          name: 'Configure authentication',
          env: [{
            key: 'GITHUB_TOKEN',
            value: Runner.resolveVariableExpr(variables, 'GITHUB_TOKEN', targetSettings, workflowSettings),
          }],
          run: Runner.githubAuthRun(),
        },
        {
          name: 'Publish package to GitHub Packages',
          run: Runner.githubPublishRun(),
          workingDirectory: context['workingDir'],
        },
        {
          name: 'Restore package name',
          if: Runner.expr('always() && env.PACKAGE_NAME'),
          run: 'npm pkg set name="$PACKAGE_NAME"',
          runBlock: true,
          workingDirectory: context['workingDir'],
        },
      ],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Cloudflare Pages Docusaurus Target.
   *
   * Returns the Cloudflare Pages deploy job that downloads the target
   * artifact and deploys the built Docusaurus site with wrangler.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Context} context - Context.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Returns}
   *
   * @since 0.21.0
   */
  public static buildCloudflarePagesDocusaurusTarget(context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Context): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Returns {
    const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_TargetSettings = context['targetSettings'];
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_WorkflowSettings = context['workflowSettings'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Metadata = Variables.getTargetMetadata('publish', 'cloudflare-pages-docusaurus');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Variables = (metadata === undefined) ? {} : metadata['variables'];
    const environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_Environment = context['environment'];
    const appPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflarePagesDocusaurusTarget_AppPath = context['workingDir'];

    return {
      id: `publish-cloudflare-pages-docusaurus-${Runner.slugifyWorkingDir(context['workingDir'])}`,
      needs: context['needs'],
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 10,
      permissions: {
        contents: 'read',
      },
      steps: [
        {
          name: 'Checkout repository',
          uses: 'actions/checkout@v7',
        },
        {
          name: 'Download build artifacts',
          uses: 'actions/download-artifact@v8',
          with: [
            {
              key: 'name',
              value: context['artifactName'],
            },
            {
              key: 'path',
              value: `${context['workingDir']}/build`,
            },
          ],
        },
        {
          name: 'Deploy to Cloudflare Pages',
          if: Runner.expr('env.PUBLISH == \'true\''),
          uses: 'cloudflare/wrangler-action@v3',
          env: [{
            key: 'CLOUDFLARE_API_TOKEN',
            value: Runner.resolveScopedCredExpr(variables, 'CLOUDFLARE_API_TOKEN', targetSettings, workflowSettings, environment, appPath),
          }],
          with: [
            {
              key: 'apiToken',
              value: Runner.expr('env.CLOUDFLARE_API_TOKEN'),
            },
            {
              key: 'accountId',
              value: Runner.resolveScopedCredExpr(variables, 'CLOUDFLARE_ACCOUNT_ID', targetSettings, workflowSettings, environment, appPath),
            },
            {
              key: 'command',
              value: `pages deploy ${context['workingDir']}/build --project-name=${Runner.resolveScopedCredExpr(variables, 'CLOUDFLARE_PROJECT_NAME', targetSettings, workflowSettings, environment, appPath)} --branch=${Runner.expr('github.event.repository.default_branch')}`,
            },
          ],
        },
      ],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Cloudflare Workers Target.
   *
   * Returns the Cloudflare Workers deploy job that installs packages,
   * downloads the target artifact, and runs the deploy script.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Context} context - Context.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Returns}
   *
   * @since 0.21.0
   */
  public static buildCloudflareWorkersTarget(context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Context): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Returns {
    const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_TargetSettings = context['targetSettings'];
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_WorkflowSettings = context['workflowSettings'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Metadata = Variables.getTargetMetadata('publish', 'cloudflare-workers');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Variables = (metadata === undefined) ? {} : metadata['variables'];
    const environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Environment = context['environment'];
    const appPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_AppPath = context['workingDir'];
    const runtimeValues: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_RuntimeValues = Runner.appRuntimeValues(environment, appPath);

    const steps: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_Steps = [
      {
        name: 'Checkout repository',
        uses: 'actions/checkout@v7',
      },
      {
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v6',
        with: [
          {
            key: 'node-version-file',
            value: `${Runner.expr('env.ROOT_DIR')}/package.json`,
          },
          {
            key: 'package-manager-cache',
            value: false,
          },
        ],
      },
      {
        name: 'Install packages',
        run: Runner.installPackagesRun(),
        workingDirectory: Runner.expr('env.ROOT_DIR'),
      },
      {
        name: 'Download build artifacts',
        uses: 'actions/download-artifact@v8',
        with: [
          {
            key: 'name',
            value: context['artifactName'],
          },
          {
            key: 'path',
            value: `${context['workingDir']}/build`,
          },
        ],
      },
      {
        name: 'Deploy to Cloudflare Workers',
        if: Runner.expr('env.PUBLISH == \'true\''),
        env: [
          {
            key: 'CLOUDFLARE_API_TOKEN',
            value: Runner.resolveScopedCredExpr(variables, 'CLOUDFLARE_API_TOKEN', targetSettings, workflowSettings, environment, appPath),
          },
          {
            key: 'CLOUDFLARE_ACCOUNT_ID',
            value: Runner.resolveScopedCredExpr(variables, 'CLOUDFLARE_ACCOUNT_ID', targetSettings, workflowSettings, environment, appPath),
          },
        ],
        run: 'npm run deploy',
        workingDirectory: context['workingDir'],
      },
    ];

    // A worker with managed runtime values gets one sync step right after the
    // deploy, wiping any value the config no longer declares before uploading
    // the declared set; a worker with none leaves the job unchanged.
    const syncStep: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildCloudflareWorkersTarget_SyncStep = Runner.emitRuntimeSyncStep({
      vendor: 'cloudflare',
      runtimeValues,
      workingDir: context['workingDir'],
      extraEnv: [],
    });

    if (syncStep !== undefined) {
      steps.push(syncStep);
    }

    return {
      id: `publish-cloudflare-workers-${Runner.slugifyWorkingDir(context['workingDir'])}`,
      needs: context['needs'],
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 10,
      permissions: {
        contents: 'read',
      },
      steps,
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Docker Hub Target.
   *
   * Returns the Docker Hub deploy job that rebuilds the image from the
   * checkout with Buildx, pushes it to Docker Hub, and attests provenance.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Context} context - Context.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Returns}
   *
   * @since 0.21.0
   */
  public static buildDockerHubTarget(context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Context): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Returns {
    const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_TargetSettings = context['targetSettings'];
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_WorkflowSettings = context['workflowSettings'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Metadata = Variables.getTargetMetadata('publish', 'docker-hub');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Variables = (metadata === undefined) ? {} : metadata['variables'];
    const environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_Environment = context['environment'];
    const appPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_AppPath = context['workingDir'];

    // The image is tagged latest plus the release tag, falling back to
    // manual for workflow_dispatch runs without a release context.
    const imageTags: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildDockerHubTarget_ImageTags = [
      `${Runner.expr('github.repository')}:latest`,
      `${Runner.expr('github.repository')}:${Runner.expr('github.event.release.tag_name || \'manual\'')}`,
    ].join('\n');

    return {
      id: `publish-docker-hub-${Runner.slugifyWorkingDir(context['workingDir'])}`,
      needs: context['needs'],
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 15,
      permissions: {
        'contents': 'read',
        'attestations': 'write',
        'id-token': 'write',
      },
      steps: [
        {
          name: 'Checkout repository',
          uses: 'actions/checkout@v7',
        },
        {
          name: 'Set up QEMU',
          uses: 'docker/setup-qemu-action@v3',
          with: [{
            key: 'platforms',
            value: 'linux/amd64,linux/arm64',
          }],
        },
        {
          name: 'Set up Docker Buildx',
          uses: 'docker/setup-buildx-action@v3',
        },
        {
          name: 'Login to Docker Hub',
          uses: 'docker/login-action@v3',
          env: [{
            key: 'DOCKERHUB_TOKEN',
            value: Runner.resolveScopedCredExpr(variables, 'DOCKERHUB_TOKEN', targetSettings, workflowSettings, environment, appPath),
          }],
          with: [
            {
              key: 'username',
              value: Runner.resolveScopedCredExpr(variables, 'DOCKERHUB_USERNAME', targetSettings, workflowSettings, environment, appPath),
            },
            {
              key: 'password',
              value: Runner.expr('env.DOCKERHUB_TOKEN'),
            },
          ],
        },
        {
          name: 'Build and push',
          id: 'build-push',
          uses: 'docker/build-push-action@v6',
          with: [
            {
              key: 'context',
              value: context['workingDir'],
            },
            {
              key: 'platforms',
              value: 'linux/amd64,linux/arm64',
            },
            {
              key: 'push',
              value: Runner.expr('env.PUBLISH'),
            },
            {
              key: 'tags',
              value: imageTags,
              block: true,
            },
          ],
        },
        {
          name: 'Generate build provenance',
          if: Runner.expr('env.PUBLISH == \'true\''),
          uses: 'actions/attest-build-provenance@v2',
          with: [
            {
              key: 'subject-name',
              value: `docker.io/${Runner.expr('github.repository')}`,
            },
            {
              key: 'subject-digest',
              value: Runner.expr('steps.build-push.outputs.digest'),
            },
            {
              key: 'push-to-registry',
              value: true,
            },
          ],
        },
      ],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Ghcr Target.
   *
   * Returns the GitHub Container Registry deploy job that rebuilds the
   * image from the checkout with Buildx, pushes it, and attests provenance.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Context} context - Context.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Returns}
   *
   * @since 0.21.0
   */
  public static buildGhcrTarget(context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Context): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Returns {
    const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_TargetSettings = context['targetSettings'];
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_WorkflowSettings = context['workflowSettings'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Metadata = Variables.getTargetMetadata('publish', 'ghcr');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_Variables = (metadata === undefined) ? {} : metadata['variables'];

    // The image is tagged latest plus the release tag, falling back to
    // manual for workflow_dispatch runs without a release context.
    const imageTags: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGhcrTarget_ImageTags = [
      `ghcr.io/${Runner.expr('github.repository')}:latest`,
      `ghcr.io/${Runner.expr('github.repository')}:${Runner.expr('github.event.release.tag_name || \'manual\'')}`,
    ].join('\n');

    return {
      id: `publish-ghcr-${Runner.slugifyWorkingDir(context['workingDir'])}`,
      needs: context['needs'],
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 15,
      permissions: {
        'contents': 'read',
        'packages': 'write',
        'attestations': 'write',
        'id-token': 'write',
      },
      steps: [
        {
          name: 'Checkout repository',
          uses: 'actions/checkout@v7',
        },
        {
          name: 'Set up QEMU',
          uses: 'docker/setup-qemu-action@v3',
          with: [{
            key: 'platforms',
            value: 'linux/amd64,linux/arm64',
          }],
        },
        {
          name: 'Set up Docker Buildx',
          uses: 'docker/setup-buildx-action@v3',
        },
        {
          name: 'Login to GitHub Container Registry',
          uses: 'docker/login-action@v3',
          with: [
            {
              key: 'registry',
              value: 'ghcr.io',
            },
            {
              key: 'username',
              value: Runner.expr('github.repository_owner'),
            },
            {
              key: 'password',
              value: Runner.resolveVariableExpr(variables, 'GITHUB_TOKEN', targetSettings, workflowSettings),
            },
          ],
        },
        {
          name: 'Build and push',
          id: 'build-push',
          uses: 'docker/build-push-action@v6',
          with: [
            {
              key: 'context',
              value: context['workingDir'],
            },
            {
              key: 'platforms',
              value: 'linux/amd64,linux/arm64',
            },
            {
              key: 'push',
              value: Runner.expr('env.PUBLISH'),
            },
            {
              key: 'tags',
              value: imageTags,
              block: true,
            },
          ],
        },
        {
          name: 'Generate build provenance',
          if: Runner.expr('env.PUBLISH == \'true\''),
          uses: 'actions/attest-build-provenance@v2',
          with: [
            {
              key: 'subject-name',
              value: `ghcr.io/${Runner.expr('github.repository')}`,
            },
            {
              key: 'subject-digest',
              value: Runner.expr('steps.build-push.outputs.digest'),
            },
            {
              key: 'push-to-registry',
              value: true,
            },
          ],
        },
      ],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build GitHub Pages Docusaurus Target.
   *
   * Returns the GitHub Pages deploy job that downloads the target artifact,
   * checks that Pages is enabled, then deploys the built Docusaurus site.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Context} context - Context.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Returns}
   *
   * @since 0.21.0
   */
  public static buildGithubPagesDocusaurusTarget(context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Context): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Returns {
    const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_TargetSettings = context['targetSettings'];
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_WorkflowSettings = context['workflowSettings'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Metadata = Variables.getTargetMetadata('publish', 'github-pages-docusaurus');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_Variables = (metadata === undefined) ? {} : metadata['variables'];

    // Probe the repository's Pages status so every deploy step can skip
    // cleanly when GitHub Pages has not been enabled for the repository.
    const pagesStatusRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubPagesDocusaurusTarget_PagesStatusRun = [
      `if gh api "repos/${Runner.expr('github.repository')}/pages" > /dev/null 2>&1; then`,
      '  echo "[Pages] GitHub Pages is enabled."',
      '  echo "PAGES_ENABLED=true" >> "$GITHUB_ENV"',
      'else',
      '  echo "[Pages] GitHub Pages is not enabled. Skipping deployment."',
      '  echo "PAGES_ENABLED=false" >> "$GITHUB_ENV"',
      'fi',
    ].join('\n');

    return {
      id: `publish-github-pages-docusaurus-${Runner.slugifyWorkingDir(context['workingDir'])}`,
      needs: context['needs'],
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 10,
      permissions: {
        'contents': 'read',
        'pages': 'write',
        'id-token': 'write',
      },
      steps: [
        {
          name: 'Checkout repository',
          uses: 'actions/checkout@v7',
        },
        {
          name: 'Download build artifacts',
          uses: 'actions/download-artifact@v8',
          with: [
            {
              key: 'name',
              value: context['artifactName'],
            },
            {
              key: 'path',
              value: `${context['workingDir']}/build`,
            },
          ],
        },
        {
          name: 'Check GitHub Pages status',
          env: [{
            key: 'GITHUB_TOKEN',
            value: Runner.resolveVariableExpr(variables, 'GITHUB_TOKEN', targetSettings, workflowSettings),
          }],
          envAfterRun: true,
          run: pagesStatusRun,
        },
        {
          name: 'Setup GitHub Pages',
          if: Runner.expr('env.PUBLISH == \'true\' && env.PAGES_ENABLED == \'true\''),
          uses: 'actions/configure-pages@v6',
        },
        {
          name: 'Upload artifact to GitHub Pages',
          if: Runner.expr('env.PUBLISH == \'true\' && env.PAGES_ENABLED == \'true\''),
          uses: 'actions/upload-pages-artifact@v5',
          with: [{
            key: 'path',
            value: `${context['workingDir']}/build`,
          }],
        },
        {
          name: 'Deploy to GitHub Pages',
          if: Runner.expr('env.PUBLISH == \'true\' && env.PAGES_ENABLED == \'true\''),
          uses: 'actions/deploy-pages@v5',
        },
      ],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build GitHub Action Target.
   *
   * Returns the GitHub Action deploy job that downloads the
   * built action, commits it to an orphan release branch, force-retags
   * the semver and floating major tags, and attests provenance.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Context} context - Context.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Returns}
   *
   * @since 0.21.0
   */
  public static buildGithubActionTarget(context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Context): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Returns {
    const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_TargetSettings = context['targetSettings'];
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_WorkflowSettings = context['workflowSettings'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Metadata = Variables.getTargetMetadata('publish', 'github-action');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_Variables = (metadata === undefined) ? {} : metadata['variables'];

    // The emitted shell needs a literal backslash-n inside a tr call, so
    // the escape is assembled from parts to keep the source single-line.
    const escapedNewline: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_EscapedNewline = [
      '\\',
      'n',
    ].join('');

    // The four declared literals resolve to raw setting values and are
    // inlined verbatim, so the release flow bakes the configured paths in.
    const actionEntryPoint: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ActionEntryPoint = Runner.resolveVariableExpr(variables, 'ACTION_ENTRY_POINT', targetSettings, workflowSettings);
    const actionOutputPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ActionOutputPath = Runner.resolveVariableExpr(variables, 'ACTION_OUTPUT_PATH', targetSettings, workflowSettings);
    const actionYmlPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ActionYmlPath = Runner.resolveVariableExpr(variables, 'ACTION_YML_PATH', targetSettings, workflowSettings);
    const releaseBranchName: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ReleaseBranchName = Runner.resolveVariableExpr(variables, 'RELEASE_BRANCH_NAME', targetSettings, workflowSettings);

    const configureGitIdentityRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ConfigureGitIdentityRun = [
      'set -euo pipefail',
      'git config --global user.name "github-actions[bot]"',
      'git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"',
    ].join('\n');

    const verifyReleaseContextRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_VerifyReleaseContextRun = [
      'set -euo pipefail',
      'if [ -z "$TAG_NAME" ]; then',
      '  echo "::error::The github-action target requires a release.published event with a tag name. Manual workflow_dispatch with dry-run=false is not supported."',
      '  exit 1',
      'fi',
    ].join('\n');

    const initializeReleaseWorkspaceRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_InitializeReleaseWorkspaceRun = [
      'set -euo pipefail',
      'rm -rf "$RUNNER_TEMP/release"',
      'mkdir -p "$RUNNER_TEMP/release"',
      'cd "$RUNNER_TEMP/release"',
      `git init -b "${releaseBranchName}"`,
      `git remote add origin "https://github.com/${Runner.expr('github.repository')}.git"`,
      `git config --local http.https://github.com/.extraheader "Authorization: basic $(printf 'x-access-token:%s' "$GITHUB_TOKEN" | base64 | tr -d '${escapedNewline}')"`,
      '',
      '# If the release branch exists remotely, fetch and reset to it so the new commit lands on top.',
      `if git ls-remote --exit-code --heads origin "${releaseBranchName}" > /dev/null; then`,
      `  git fetch origin "${releaseBranchName}"`,
      `  git reset --hard "origin/${releaseBranchName}"`,
      '  git rm -rf . > /dev/null 2>&1 || true',
      'fi',
    ].join('\n');

    const stageReleaseTreeRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_StageReleaseTreeRun = [
      'set -euo pipefail',
      'cd "$GITHUB_WORKSPACE"',
      'STAGE="$RUNNER_TEMP/release"',
      '',
      '# Required: action.yml and the built action directory.',
      `cp "${actionYmlPath}" "$STAGE/action.yml"`,
      'mkdir -p "$STAGE/action"',
      `cp -R "${actionOutputPath}/." "$STAGE/action/"`,
      '',
      '# Repoint action.yml at the bundled entry in the flattened release tree. The',
      '# source action.yml resolves runs.main against the working layout; the published',
      '# tree carries only action.yml plus the bundle under action/, so runs.main must',
      '# resolve there instead. Only the main key inside the runs block is rewritten.',
      `sed -i -E '/^runs:/,$ s#^([[:space:]]+main:[[:space:]]*).*#\\1"action/${actionEntryPoint}"#' "$STAGE/action.yml"`,
      '',
      '# Optional: common community-repo files. Copy if present on main, skip silently if not.',
      'for optional in README.md LICENSE SECURITY.md NOTICE CHANGELOG.md; do',
      '  if [ -f "$optional" ]; then',
      '    cp "$optional" "$STAGE/$optional"',
      '  fi',
      'done',
    ].join('\n');

    const commitAndPushReleaseRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_CommitAndPushReleaseRun = [
      'set -euo pipefail',
      'cd "$RUNNER_TEMP/release"',
      'git add -A',
      'git commit -m "Release $TAG_NAME"',
      `git push origin "${releaseBranchName}" --force`,
    ].join('\n');

    const forceRetagRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildGithubActionTarget_ForceRetagRun = [
      'set -euo pipefail',
      'cd "$RUNNER_TEMP/release"',
      '',
      '# Re-point the semver tag onto the orphan commit (GitHub created it on main; we move it).',
      'git tag -f "$TAG_NAME"',
      'git push origin "refs/tags/$TAG_NAME" --force',
      '',
      '# Derive floating major (e.g., v2.1.3 -> v2; primary-v1.2.3 -> primary-v1).',
      '# Skips the major retag when the tag isn\'t <prefix->v<digits> shaped or when',
      '# the release is marked as a prerelease — the floating major should only',
      '# track stable releases.',
      'MAJOR="$(printf \'%s\' "$TAG_NAME" | sed -E \'s/^(([a-zA-Z][a-zA-Z0-9_-]*-)?v[0-9]+).*/\\1/\')"',
      'if [ "$IS_PRERELEASE" = "true" ]; then',
      '  echo "Release $TAG_NAME is marked as a prerelease; skipping floating major retag."',
      'elif [ "$MAJOR" = "$TAG_NAME" ]; then',
      '  echo "Tag $TAG_NAME is not v-prefixed semver; skipping floating major retag."',
      'else',
      '  git tag -f "$MAJOR"',
      '  git push origin "refs/tags/$MAJOR" --force',
      'fi',
    ].join('\n');

    return {
      id: `publish-github-action-${Runner.slugifyWorkingDir(context['workingDir'])}`,
      needs: context['needs'],
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 10,
      permissions: {
        'contents': 'write',
        'id-token': 'write',
        'attestations': 'write',
      },
      steps: [
        {
          name: 'Checkout repository',
          uses: 'actions/checkout@v7',
          with: [{
            key: 'persist-credentials',
            value: false,
          }],
        },
        {
          name: 'Download build artifacts',
          uses: 'actions/download-artifact@v8',
          with: [
            {
              key: 'name',
              value: context['artifactName'],
            },
            {
              key: 'path',
              value: actionOutputPath,
            },
          ],
        },
        {
          name: 'Configure git identity',
          if: Runner.expr('env.PUBLISH == \'true\''),
          run: configureGitIdentityRun,
        },
        {
          name: 'Verify release context',
          if: Runner.expr('env.PUBLISH == \'true\''),
          env: [{
            key: 'TAG_NAME',
            value: Runner.expr('github.event.release.tag_name'),
          }],
          run: verifyReleaseContextRun,
        },
        {
          name: 'Initialize release workspace',
          if: Runner.expr('env.PUBLISH == \'true\''),
          env: [{
            key: 'GITHUB_TOKEN',
            value: Runner.expr('secrets.GITHUB_TOKEN'),
          }],
          run: initializeReleaseWorkspaceRun,
        },
        {
          name: 'Stage release tree',
          if: Runner.expr('env.PUBLISH == \'true\''),
          run: stageReleaseTreeRun,
        },
        {
          name: 'Commit and push release',
          if: Runner.expr('env.PUBLISH == \'true\''),
          env: [{
            key: 'TAG_NAME',
            value: Runner.expr('github.event.release.tag_name'),
          }],
          run: commitAndPushReleaseRun,
        },
        {
          name: 'Force-retag semver and floating major',
          if: Runner.expr('env.PUBLISH == \'true\''),
          env: [
            {
              key: 'TAG_NAME',
              value: Runner.expr('github.event.release.tag_name'),
            },
            {
              key: 'IS_PRERELEASE',
              value: Runner.expr('github.event.release.prerelease'),
            },
          ],
          run: forceRetagRun,
        },
        {
          name: 'Attest build provenance',
          if: Runner.expr('env.PUBLISH == \'true\''),
          uses: 'actions/attest-build-provenance@v2',
          with: [{
            key: 'subject-path',
            value: `${actionOutputPath}/${actionEntryPoint}`,
          }],
        },
      ],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Vercel Next.js Target.
   *
   * Returns the Vercel deploy job that downloads the two-path build
   * artifact, pulls the production environment, and deploys prebuilt.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Context} context - Context.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Returns}
   *
   * @since 0.21.0
   */
  public static buildVercelNextjsTarget(context: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Context): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Returns {
    const targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_TargetSettings = context['targetSettings'];
    const workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_WorkflowSettings = context['workflowSettings'];
    const metadata: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Metadata = Variables.getTargetMetadata('publish', 'vercel-nextjs');
    const variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Variables = (metadata === undefined) ? {} : metadata['variables'];
    const environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Environment = context['environment'];
    const appPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_AppPath = context['workingDir'];
    const dollar: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Dollar = Runner.dollar();
    const runtimeValues: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_RuntimeValues = Runner.appRuntimeValues(environment, appPath);

    // The download step names the artifact without a path, so the two
    // uploaded paths unpack back to the workspace-relative layout.
    const steps: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_Steps = [
      {
        name: 'Checkout repository',
        uses: 'actions/checkout@v7',
      },
      {
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v6',
        with: [
          {
            key: 'node-version-file',
            value: `${Runner.expr('env.ROOT_DIR')}/package.json`,
          },
          {
            key: 'package-manager-cache',
            value: false,
          },
        ],
      },
      {
        name: 'Download build artifacts',
        uses: 'actions/download-artifact@v8',
        with: [{
          key: 'name',
          value: context['artifactName'],
        }],
      },
      {
        name: 'Install Vercel CLI',
        if: Runner.expr('env.PUBLISH == \'true\''),
        run: 'npm install -g vercel@latest',
        runPlain: true,
      },
      {
        name: 'Pull Vercel environment',
        if: Runner.expr('env.PUBLISH == \'true\''),
        env: [
          {
            key: 'VERCEL_TOKEN',
            value: Runner.resolveScopedCredExpr(variables, 'VERCEL_TOKEN', targetSettings, workflowSettings, environment, appPath),
          },
          {
            key: 'VERCEL_ORG_ID',
            value: Runner.resolveScopedCredExpr(variables, 'VERCEL_ORG_ID', targetSettings, workflowSettings, environment, appPath),
          },
          {
            key: 'VERCEL_PROJECT_ID',
            value: Runner.resolveScopedCredExpr(variables, 'VERCEL_PROJECT_ID', targetSettings, workflowSettings, environment, appPath),
          },
        ],
        run: `vercel pull --yes --environment=production --token="${dollar}VERCEL_TOKEN}"`,
        runBlock: true,
        workingDirectory: context['workingDir'],
      },
    ];

    const deployStep: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_DeployStep = {
      name: 'Deploy to Vercel',
      if: Runner.expr('env.PUBLISH == \'true\''),
      env: [
        {
          key: 'VERCEL_TOKEN',
          value: Runner.resolveScopedCredExpr(variables, 'VERCEL_TOKEN', targetSettings, workflowSettings, environment, appPath),
        },
        {
          key: 'VERCEL_ORG_ID',
          value: Runner.resolveScopedCredExpr(variables, 'VERCEL_ORG_ID', targetSettings, workflowSettings, environment, appPath),
        },
        {
          key: 'VERCEL_PROJECT_ID',
          value: Runner.resolveScopedCredExpr(variables, 'VERCEL_PROJECT_ID', targetSettings, workflowSettings, environment, appPath),
        },
      ],
      run: `vercel deploy --prebuilt --prod --token="${dollar}VERCEL_TOKEN}"`,
      runBlock: true,
      workingDirectory: context['workingDir'],
    };

    // Vercel injects the environment into the deployment, so a scope with
    // managed runtime values gets one sync step right before the deploy,
    // wiping any env var the config no longer declares before uploading the
    // declared set; a scope with none leaves the job unchanged.
    const syncStep: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildVercelNextjsTarget_SyncStep = Runner.emitRuntimeSyncStep({
      vendor: 'vercel',
      runtimeValues,
      workingDir: context['workingDir'],
      extraEnv: [{
        key: 'VERCEL_TOKEN',
        value: Runner.resolveScopedCredExpr(variables, 'VERCEL_TOKEN', targetSettings, workflowSettings, environment, appPath),
      }],
    });

    if (syncStep !== undefined) {
      steps.push(syncStep);
    }

    steps.push(deployStep);

    return {
      id: `publish-vercel-nextjs-${Runner.slugifyWorkingDir(context['workingDir'])}`,
      needs: context['needs'],
      runsOn: 'ubuntu-latest',
      timeoutMinutes: 15,
      permissions: {
        contents: 'read',
      },
      steps,
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Scope Command.
   *
   * Emits the shell command for a check or build step. A turbo
   * project gets a turbo invocation with filter flags while one without
   * turbo gets an npm invocation with workspace flags instead.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_ScriptName}     scriptName     - Script name.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_WorkspaceNames} workspaceNames - Workspace names.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_UseTurbo}       useTurbo       - Use turbo.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_Returns}
   *
   * @since 0.21.0
   */
  private static buildScopeCommand(scriptName: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_ScriptName, workspaceNames: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_WorkspaceNames, useTurbo: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_UseTurbo): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_Returns {
    if (useTurbo === true) {
      const turboFlags: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_TurboFlags = workspaceNames.map((name) => `--filter=${name}`);

      return `npx turbo run ${scriptName} ${turboFlags.join(' ')} --concurrency=2`;
    }

    const npmFlags: Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScopeCommand_NpmFlags = workspaceNames.map((name) => `-w ${name}`);

    return `npm run ${scriptName} ${npmFlags.join(' ')}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Install Packages Run.
   *
   * Returns the shared install command that upgrades npm globally then
   * installs the project's dependencies.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_InstallPackagesRun_Returns}
   *
   * @since 0.21.0
   */
  private static installPackagesRun(): Cli_Generate_Github_WorkflowsBlueprint_Runner_InstallPackagesRun_Returns {
    return [
      'npm install -g npm@latest',
      'npm install',
    ].join('\n');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Remove Deprecated Npmrc Run.
   *
   * Returns the shared command that strips the deprecated always-auth
   * entry from the resolved .npmrc before publishing.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_RemoveDeprecatedNpmrcRun_Returns}
   *
   * @since 0.21.0
   */
  private static removeDeprecatedNpmrcRun(): Cli_Generate_Github_WorkflowsBlueprint_Runner_RemoveDeprecatedNpmrcRun_Returns {
    const dollar: Cli_Generate_Github_WorkflowsBlueprint_Runner_RemoveDeprecatedNpmrcRun_Dollar = Runner.dollar();

    return [
      `npmrc="${dollar}NPM_CONFIG_USERCONFIG:-$HOME/.npmrc}"`,
      '',
      'if [ -f "$npmrc" ]; then',
      '  sed -i \'/^always-auth=/d\' "$npmrc"',
      'fi',
    ].join('\n');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - npm Auth Run.
   *
   * Returns the npm authentication command that prefers an NPM token
   * and otherwise falls back to trusted publishing over OIDC.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmAuthRun_Returns}
   *
   * @since 0.21.0
   */
  private static npmAuthRun(): Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmAuthRun_Returns {
    const dollar: Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmAuthRun_Dollar = Runner.dollar();

    return [
      `if [ -n "${dollar}NPM_TOKEN}" ]; then`,
      '  echo "[Auth] Using NPM_TOKEN (token-based)."',
      `  echo "NODE_AUTH_TOKEN=${dollar}NPM_TOKEN}" >> "$GITHUB_ENV"`,
      'else',
      '  echo "[Auth] Using trusted publishing (OIDC)."',
      '',
      `  npmrc="${dollar}NPM_CONFIG_USERCONFIG:-$HOME/.npmrc}"`,
      '',
      '  if [ -f "$npmrc" ]; then',
      '    sed -i \'/^\\/\\/registry\\.npmjs\\.org\\/:_authToken/d\' "$npmrc"',
      '    echo "[Auth] Removed _authToken entry from .npmrc."',
      '  fi',
      'fi',
    ].join('\n');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - npm Publish Run.
   *
   * Returns the npm publish command that publishes with provenance on a
   * real run and performs a dry run otherwise.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmPublishRun_Returns}
   *
   * @since 0.21.0
   */
  private static npmPublishRun(): Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmPublishRun_Returns {
    const dollar: Cli_Generate_Github_WorkflowsBlueprint_Runner_NpmPublishRun_Dollar = Runner.dollar();

    return [
      `if [ "${dollar}PUBLISH}" = "true" ]; then`,
      '  echo "[Publish] Production."',
      '  npm publish --provenance --access public',
      'else',
      '  echo "[Publish] Dry run."',
      '  npm publish --dry-run',
      'fi',
    ].join('\n');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Scope Package Name Run.
   *
   * Returns the command that scopes the package name to the repository
   * owner, recording the original name so it can be restored.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_ScopePackageNameRun_Returns}
   *
   * @since 0.21.0
   */
  private static scopePackageNameRun(): Cli_Generate_Github_WorkflowsBlueprint_Runner_ScopePackageNameRun_Returns {
    const dollar: Cli_Generate_Github_WorkflowsBlueprint_Runner_ScopePackageNameRun_Dollar = Runner.dollar();

    return [
      `REPOSITORY_OWNER="@$(echo '${Runner.expr('github.repository_owner')}' | tr '[:upper:]' '[:lower:]')"`,
      'PACKAGE_NAME=$(npm pkg get name --workspaces=false | jq -r \'.\')',
      '',
      `echo "[Scope] Owner is \\"${dollar}REPOSITORY_OWNER}\\" and package is \\"${dollar}PACKAGE_NAME}\\"."`,
      '',
      'echo "PACKAGE_NAME=$PACKAGE_NAME" >> "$GITHUB_ENV"',
      '',
      'if [[ "$PACKAGE_NAME" != "$REPOSITORY_OWNER/"* ]]; then',
      `  BASE=${dollar}PACKAGE_NAME##*/}`,
      '  NEW_NAME="$REPOSITORY_OWNER/$BASE"',
      '',
      `  echo "[Scope] Scoping package name to \\"${dollar}NEW_NAME}\\"."`,
      '',
      '  npm pkg set name="$NEW_NAME"',
      'else',
      '  echo "[Scope] Already scoped. No changes needed."',
      'fi',
    ].join('\n');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - GitHub Auth Run.
   *
   * Returns the command that exports the workflow GitHub token as the
   * node auth token for publishing to GitHub Packages.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubAuthRun_Returns}
   *
   * @since 0.21.0
   */
  private static githubAuthRun(): Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubAuthRun_Returns {
    const dollar: Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubAuthRun_Dollar = Runner.dollar();

    return [
      'echo "[Auth] Using GITHUB_TOKEN."',
      `echo "NODE_AUTH_TOKEN=${dollar}GITHUB_TOKEN}" >> "$GITHUB_ENV"`,
    ].join('\n');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - GitHub Publish Run.
   *
   * Returns the GitHub Packages publish command that publishes on a
   * real run and performs a dry run otherwise.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubPublishRun_Returns}
   *
   * @since 0.21.0
   */
  private static githubPublishRun(): Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubPublishRun_Returns {
    const dollar: Cli_Generate_Github_WorkflowsBlueprint_Runner_GithubPublishRun_Dollar = Runner.dollar();

    return [
      `if [ "${dollar}PUBLISH}" = "true" ]; then`,
      '  echo "[Publish] Production."',
      '  npm publish',
      'else',
      '  echo "[Publish] Dry run."',
      '  npm publish --dry-run',
      'fi',
    ].join('\n');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Slugify Working Dir.
   *
   * Renders a working directory as an artifact slug by dropping the
   * leading dot-slash and replacing path separators with dashes.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SlugifyWorkingDir_WorkingDir} workingDir - Working dir.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SlugifyWorkingDir_Returns}
   *
   * @since 0.21.0
   */
  private static slugifyWorkingDir(workingDir: Cli_Generate_Github_WorkflowsBlueprint_Runner_SlugifyWorkingDir_WorkingDir): Cli_Generate_Github_WorkflowsBlueprint_Runner_SlugifyWorkingDir_Returns {
    const withoutPrefix: Cli_Generate_Github_WorkflowsBlueprint_Runner_SlugifyWorkingDir_WithoutPrefix = workingDir.replace(LIB_REGEX_PATTERN_LEADING_DOT_SLASH, '');

    return withoutPrefix.replace(new RegExp(LIB_REGEX_CHARACTER_FORWARD_SLASH.source, 'g'), '-');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Emit Runtime Sync Step.
   *
   * Returns one runtime-sync step for a server-bearing target. A Secret rides
   * the vendor's encrypted channel and a plaintext Variable the deploy channel,
   * both from the same declared set; a target with no runtime values gets none.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Options} options - Options.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Returns}
   *
   * @since 0.21.0
   */
  public static emitRuntimeSyncStep(options: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Options): Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Returns {
    const vendor: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Vendor = options['vendor'];
    const runtimeValues: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_RuntimeValues = options['runtimeValues'];
    const workingDir: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_WorkingDir = options['workingDir'];
    const extraEnv: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_ExtraEnv = options['extraEnv'];

    // A target the config never gives a runtime value skips the sync entirely.
    if (runtimeValues.length === 0) {
      return undefined;
    }

    const secretValues: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_SecretValues = runtimeValues.filter((value) => value['secret'] === true);
    const variableValues: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VariableValues = runtimeValues.filter((value) => value['secret'] === false);

    // Each value enters the step env from its GitHub source: a Secret from the
    // encrypted secrets store, a Variable from the plaintext vars store. The
    // shell then moves each onto the vendor's matching runtime channel; the
    // source picks storage, not the delivery route.
    const env: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Env = [
      ...extraEnv,
      ...runtimeValues.map((value) => ({
        key: value['key'],
        value: (value['secret'] === true) ? Runner.expr(`secrets.${value['name']}`) : Runner.expr(`vars.${value['name']}`),
      })),
    ];

    const lines: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Lines = [];

    if (vendor === 'cloudflare') {
      // Encrypted channel: list the worker's secrets, drop any the config no
      // longer declares, then bulk upload the declared set from the step env.
      if (secretValues.length > 0) {
        const secretDeclared: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_SecretDeclared = secretValues.map((value) => value['key']).join(' ');
        const jqObject: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_JqObject = secretValues.map((value) => value['key']).join(', ');

        lines.push(`DECLARED="${secretDeclared}"`);
        lines.push('wrangler secret list | jq -r \'.[].name\' | while read -r name; do');
        lines.push('  case " $DECLARED " in');
        lines.push('    *" $name "*) ;;');
        lines.push('    *) echo "Removing undeclared secret: $name"; wrangler secret delete "$name" --force ;;');
        lines.push('  esac');
        lines.push('done');
        lines.push('echo "Syncing declared secrets: $DECLARED"');
        lines.push(`jq -n 'env | {${jqObject}}' | wrangler secret bulk /dev/stdin`);
      }

      // Variable channel: a plaintext runtime var rides the deploy, one redeploy
      // carrying the declared vars onto the worker's runtime env.
      if (variableValues.length > 0) {
        const varDeclared: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VarDeclared = variableValues.map((value) => value['key']).join(' ');
        const varFlags: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VarFlags = variableValues.map((value) => `--var ${value['key']}:"$${value['key']}"`).join(' ');

        lines.push(`echo "Syncing declared vars: ${varDeclared}"`);
        lines.push(`wrangler deploy ${varFlags}`);
      }
    } else {
      // Vercel keeps one env store per deployment, so removal runs once over the
      // declared union: drop any env the config no longer declares. Re-add then
      // splits by channel so a Secret rides the sensitive (encrypted, non-readable
      // once set) flag and a plaintext Variable the plain channel.
      const declared: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Declared = runtimeValues.map((value) => value['key']).join(' ');

      lines.push(`DECLARED="${declared}"`);
      lines.push('vercel env ls production --token="$VERCEL_TOKEN" | tail -n +2 | awk \'{print $1}\' | while read -r name; do');
      lines.push('  case " $DECLARED " in');
      lines.push('    *" $name "*) ;;');
      lines.push('    *) [ -n "$name" ] && { echo "Removing undeclared env: $name"; vercel env rm "$name" production --yes --token="$VERCEL_TOKEN"; } ;;');
      lines.push('  esac');
      lines.push('done');

      // Encrypted channel: a Secret re-adds with --sensitive so Vercel seals it
      // and never reads it back, matching its GitHub Secret storage.
      if (secretValues.length > 0) {
        const vercelSecretDeclared: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VercelSecretDeclared = secretValues.map((value) => value['key']).join(' ');

        lines.push(`SECRET_DECLARED="${vercelSecretDeclared}"`);
        lines.push('for name in $SECRET_DECLARED; do');
        lines.push('  echo "Syncing env: $name"');
        lines.push('  vercel env rm "$name" production --yes --token="$VERCEL_TOKEN" 2>/dev/null || true');
        lines.push('  printf \'%s\' "$(eval "echo \\$$name")" | vercel env add "$name" production --sensitive --token="$VERCEL_TOKEN"');
        lines.push('done');
      }

      // Plain channel: a plaintext Variable re-adds without --sensitive so it
      // stays readable, matching its GitHub Variable storage.
      if (variableValues.length > 0) {
        const vercelVarDeclared: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_VercelVarDeclared = variableValues.map((value) => value['key']).join(' ');

        lines.push(`VAR_DECLARED="${vercelVarDeclared}"`);
        lines.push('for name in $VAR_DECLARED; do');
        lines.push('  echo "Syncing env: $name"');
        lines.push('  vercel env rm "$name" production --yes --token="$VERCEL_TOKEN" 2>/dev/null || true');
        lines.push('  printf \'%s\' "$(eval "echo \\$$name")" | vercel env add "$name" production --token="$VERCEL_TOKEN"');
        lines.push('done');
      }
    }

    const run: Cli_Generate_Github_WorkflowsBlueprint_Runner_EmitRuntimeSyncStep_Run = lines.join('\n');

    return {
      name: (vendor === 'cloudflare') ? 'Sync worker runtime secrets' : 'Sync Vercel runtime environment',
      if: Runner.expr('env.PUBLISH == \'true\''),
      env,
      run,
      workingDirectory: workingDir,
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - App Build Values.
   *
   * Returns an app's build-time values (buildOnly true) from the
   * environment block, each paired with its GitHub name and secret flag,
   * so the build-env step bakes each value from its source.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Environment} environment - Environment.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_AppPath}     appPath     - App path.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Returns}
   *
   * @since 0.21.0
   */
  public static appBuildValues(environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Environment, appPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_AppPath): Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Returns {
    const results: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Results = [];

    if (environment === undefined) {
      return results;
    }

    const apps: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Apps = environment['apps'];

    if (apps === undefined) {
      return results;
    }

    const app: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_App = apps[appPath];

    if (app === undefined) {
      return results;
    }

    const prefix: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_Prefix = app['prefix'];

    for (const variable of app['variables'] ?? []) {
      if (variable['buildOnly'] !== true) {
        continue;
      }

      const buildValue: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppBuildValues_BuildValue = {
        key: variable['key'],
        name: libEnvNamespace.githubName(prefix, variable['key']),
        secret: variable['secret'],
      };

      // A non-secret build value carries its declared default so the CI write can
      // fall back to it when the GitHub Variable is unset (spec 5.4).
      if (variable['defaultValue'] !== undefined) {
        buildValue.defaultValue = variable['defaultValue'];
      }

      results.push(buildValue);
    }

    return results;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - App Runtime Values.
   *
   * Returns an app's runtime values (buildOnly false) from the
   * environment block, each paired with its GitHub name and secret flag,
   * so the runtime-sync step delivers each on its channel.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Environment} environment - Environment.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_AppPath}     appPath     - App path.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Returns}
   *
   * @since 0.21.0
   */
  public static appRuntimeValues(environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Environment, appPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_AppPath): Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Returns {
    const results: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Results = [];

    if (environment === undefined) {
      return results;
    }

    const apps: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Apps = environment['apps'];

    if (apps === undefined) {
      return results;
    }

    const app: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_App = apps[appPath];

    if (app === undefined) {
      return results;
    }

    const prefix: Cli_Generate_Github_WorkflowsBlueprint_Runner_AppRuntimeValues_Prefix = app['prefix'];

    for (const variable of app['variables'] ?? []) {
      if (variable['buildOnly'] !== false) {
        continue;
      }

      results.push({
        key: variable['key'],
        name: libEnvNamespace.githubName(prefix, variable['key']),
        secret: variable['secret'],
      });
    }

    return results;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Write Env Run.
   *
   * Returns the block command that appends each public dotenv variable to
   * the scope's .env, echoing the key and its step-env value so the shared
   * build reads the baked file.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Variables} variables - Variables.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Returns}
   *
   * @since 0.21.0
   */
  private static writeEnvRun(variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Variables): Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Returns {
    const lines: Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Lines = ['{'];
    const dollar: Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_Dollar = Runner.dollar();

    for (const variable of variables) {
      // A declared default becomes a shell fallback so an unset GitHub Variable bakes the
      // default instead of an empty value (spec 5.4); otherwise a bare "$KEY" is fine. Only
      // "${" trips the template-curly lint rule, so the opener is assembled from parts.
      if (variable['defaultValue'] !== undefined) {
        const escapedDefault: Cli_Generate_Github_WorkflowsBlueprint_Runner_WriteEnvRun_EscapedDefault = Runner.escapeShellDefault(variable['defaultValue']);

        lines.push(`  echo "${variable['key']}=${dollar}${variable['key']}:-${escapedDefault}}"`);

        continue;
      }

      lines.push(`  echo "${variable['key']}=$${variable['key']}"`);
    }

    lines.push('} > .env');

    return lines.join('\n');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Resolve Deploy Job ID.
   *
   * Renders a deploy job id from a target type and working directory,
   * used to resolve a target's needs to sibling deploy jobs.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployJobId_Type}       type       - Type.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployJobId_WorkingDir} workingDir - Working dir.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployJobId_Returns}
   *
   * @since 0.21.0
   */
  private static resolveDeployJobId(type: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployJobId_Type, workingDir: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployJobId_WorkingDir): Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployJobId_Returns {
    return `publish-${type}-${Runner.slugifyWorkingDir(workingDir)}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Resolve Deploy Needs.
   *
   * Resolves a target's deploy needs, always requiring the build job
   * then chaining each same-type dependency named in the target.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Target} target - Target.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Returns}
   *
   * @since 0.21.0
   */
  private static resolveDeployNeeds(target: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Target): Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Returns {
    const needs: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Needs = ['build'];

    // Each after entry names a sibling target's path, so every dependency
    // resolves to the same-destination deploy job for that path.
    const dependencies: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Dependencies = target['after'] ?? [];

    for (const dependencyValue of dependencies) {
      const dependency: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveDeployNeeds_Dependency = dependencyValue;

      needs.push(Runner.resolveDeployJobId(target['to'], dependency));
    }

    return needs;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Issues Trigger.
   *
   * Returns the issues trigger node, listing the opened and closed
   * activity types the sponsor gate reacts to.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildIssuesTrigger_Returns}
   *
   * @since 0.21.0
   */
  public static buildIssuesTrigger(): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildIssuesTrigger_Returns {
    return {
      event: 'issues',
      types: [
        'opened',
        'closed',
      ],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Issue Comment Trigger.
   *
   * Returns the issue_comment trigger node, listing the created and
   * edited activity types the sponsor gate reacts to.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildIssueCommentTrigger_Returns}
   *
   * @since 0.21.0
   */
  public static buildIssueCommentTrigger(): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildIssueCommentTrigger_Returns {
    return {
      event: 'issue_comment',
      types: [
        'created',
        'edited',
      ],
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Schedule Weekly Trigger.
   *
   * Returns the schedule trigger node with the weekly cron the lock
   * workflow runs on when no manual dispatch overrides it.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScheduleWeeklyTrigger_Returns}
   *
   * @since 0.21.0
   */
  public static buildScheduleWeeklyTrigger(): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScheduleWeeklyTrigger_Returns {
    return {
      event: 'schedule',
      cron: '0 0 * * 0',
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Schedule Daily Trigger.
   *
   * Returns the schedule trigger node with the daily cron the lock
   * workflow runs on when no manual dispatch overrides it.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScheduleDailyTrigger_Returns}
   *
   * @since 0.21.0
   */
  public static buildScheduleDailyTrigger(): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScheduleDailyTrigger_Returns {
    return {
      event: 'schedule',
      cron: '0 0 * * *',
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Build Schedule Monthly Trigger.
   *
   * Returns the schedule trigger node with the monthly cron the lock
   * workflow runs on when no manual dispatch overrides it.
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScheduleMonthlyTrigger_Returns}
   *
   * @since 0.21.0
   */
  public static buildScheduleMonthlyTrigger(): Cli_Generate_Github_WorkflowsBlueprint_Runner_BuildScheduleMonthlyTrigger_Returns {
    return {
      event: 'schedule',
      cron: '0 0 1 * *',
    };
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize Header.
   *
   * Returns the fixed five-line generated-file banner that opens
   * every workflow so consumers know not to edit the output by hand.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeHeader_Returns}
   *
   * @since 0.21.0
   */
  private static serializeHeader(): Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeHeader_Returns {
    return [
      '# This file is generated by @cbnventures/nova.',
      '# Do not edit manually.',
      '#',
      '# Run `nova generate github workflows` to regenerate.',
      '# See: https://nova.cbnventures.io/docs/cli/generators/github/workflows',
    ];
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize On.
   *
   * Emits the on-block, expanding each trigger node into its GitHub
   * event mapping so config order is preserved in the output.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeOn_On} on - On.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeOn_Returns}
   *
   * @since 0.21.0
   */
  private static serializeOn(on: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeOn_On): Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeOn_Returns {
    const lines: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeOn_Lines = [];

    lines.push('on:');

    for (const trigger of on) {
      if (trigger['event'] === 'release') {
        lines.push('  release:');

        lines.push('    types:');

        for (const type of trigger['types']) {
          lines.push(`      - ${Runner.quote(type)}`);
        }
      }

      if (trigger['event'] === 'push') {
        lines.push('  push:');

        // Sub-key order is fixed: branches, tags, paths.
        if (trigger['branches'] !== undefined) {
          lines.push('    branches:');

          for (const branch of trigger['branches']) {
            lines.push(`      - ${Runner.quote(branch)}`);
          }
        }

        if (trigger['tags'] !== undefined) {
          lines.push('    tags:');

          for (const tag of trigger['tags']) {
            lines.push(`      - ${Runner.quote(tag)}`);
          }
        }

        if (trigger['paths'] !== undefined) {
          lines.push('    paths:');

          for (const path of trigger['paths']) {
            lines.push(`      - ${Runner.quote(path)}`);
          }
        }
      }

      if (trigger['event'] === 'issues' || trigger['event'] === 'issue_comment') {
        lines.push(`  ${trigger['event']}:`);

        lines.push('    types:');

        for (const type of trigger['types']) {
          lines.push(`      - ${Runner.quote(type)}`);
        }
      }

      if (trigger['event'] === 'schedule') {
        lines.push('  schedule:');

        lines.push(`    - cron: ${Runner.quote(trigger['cron'])}`);
      }

      if (trigger['event'] === 'workflow_run') {
        lines.push('  workflow_run:');

        // Sub-key order is fixed: workflows, types.
        lines.push('    workflows:');

        for (const workflowName of trigger['workflows']) {
          lines.push(`      - ${Runner.quote(workflowName)}`);
        }

        lines.push('    types:');

        for (const type of trigger['types']) {
          lines.push(`      - ${Runner.quote(type)}`);
        }
      }

      if (trigger['event'] === 'workflow_dispatch') {
        lines.push('  workflow_dispatch:');

        lines.push('    inputs:');

        for (const input of trigger['inputs']) {
          lines.push(`      ${input['name']}:`);

          lines.push(`        description: ${Runner.quote(input['description'])}`);

          lines.push(`        required: ${Runner.serializeScalar(input['required'])}`);

          lines.push(`        type: ${Runner.quote(input['type'])}`);

          lines.push(`        default: ${Runner.serializeScalar(input['default'])}`);
        }
      }
    }

    return lines;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize Permissions.
   *
   * Emits each permission scope at the caller-supplied indent so the
   * same helper serves both workflow-level and job-level blocks.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Permissions} permissions - Permissions.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Indent}      indent      - Indent.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Returns}
   *
   * @since 0.21.0
   */
  private static serializePermissions(permissions: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Permissions, indent: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Indent): Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Returns {
    const lines: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Lines = [];

    for (const scope of Object.keys(permissions)) {
      const value: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Value = permissions[scope] as Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializePermissions_Value;

      lines.push(`${indent}${scope}: ${Runner.quote(value)}`);
    }

    return lines;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize Env.
   *
   * Emits the workflow env block as ordered key/value pairs, quoting
   * every value since env entries are always string expressions.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeEnv_Env} env - Env.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeEnv_Returns}
   *
   * @since 0.21.0
   */
  private static serializeEnv(env: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeEnv_Env): Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeEnv_Returns {
    const lines: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeEnv_Lines = [];

    lines.push('env:');

    for (const entry of env) {
      lines.push(`  ${entry['key']}: ${Runner.quote(entry['value'])}`);
    }

    return lines;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize Jobs.
   *
   * Emits the jobs map, each job's fields and steps, keeping with
   * values scalar-aware so booleans and integers stay bare.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_Jobs} jobs - Jobs.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_Returns}
   *
   * @since 0.21.0
   */
  private static serializeJobs(jobs: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_Jobs): Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_Returns {
    const lines: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_Lines = [];

    lines.push('jobs:');

    for (const job of jobs) {
      lines.push(`  ${job['id']}:`);

      const jobNeeds: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_JobNeeds = job['needs'];

      if (jobNeeds !== undefined) {
        lines.push(`    needs: ${Runner.serializeNeeds(jobNeeds)}`);
      }

      lines.push(`    runs-on: ${Runner.quote(job['runsOn'])}`);

      lines.push(`    timeout-minutes: ${Runner.serializeScalar(job['timeoutMinutes'])}`);

      const jobPermissions: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_JobPermissions = job['permissions'];

      if (jobPermissions !== undefined) {
        lines.push('    permissions:');

        lines.push(...Runner.serializePermissions(jobPermissions, '      '));
      }

      // A job-level if sits between permissions and steps, gating the job
      // on the upstream conclusion for workflow-run triggered publishes.
      const jobIf: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_JobIf = job['if'];

      if (jobIf !== undefined) {
        lines.push(`    if: ${Runner.quote(jobIf)}`);
      }

      lines.push('    steps:');

      const jobSteps: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_JobSteps = job['steps'];

      for (const step of jobSteps) {
        // Fixed field order: name, id, if, uses, env, with, run,
        // working-directory. A step flagged envAfterRun moves its env block
        // after run, matching the Pages status step's declared order.
        lines.push(`      - name: ${Runner.quote(step['name'])}`);

        const stepId: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepId = step['id'];

        if (stepId !== undefined) {
          lines.push(`        id: ${Runner.quote(stepId)}`);
        }

        const stepIf: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepIf = step['if'];

        if (stepIf !== undefined) {
          lines.push(`        if: ${Runner.quote(stepIf)}`);
        }

        const stepUses: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepUses = step['uses'];

        if (stepUses !== undefined) {
          lines.push(`        uses: ${Runner.quote(stepUses)}`);
        }

        const stepEnv: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepEnv = step['env'];
        const isEnvAfterRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_IsEnvAfterRun = step['envAfterRun'] === true;

        if (stepEnv !== undefined && isEnvAfterRun === false) {
          lines.push('        env:');

          for (const entry of stepEnv) {
            lines.push(`          ${entry['key']}: ${Runner.quote(entry['value'])}`);
          }
        }

        const stepWith: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepWith = step['with'];

        if (stepWith !== undefined) {
          lines.push('        with:');

          lines.push(...Runner.serializeWith(stepWith, '          '));
        }

        const stepRun: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepRun = step['run'];

        if (stepRun !== undefined) {
          lines.push(...Runner.serializeRun(stepRun, '        ', step['runBlock'] === true, step['runPlain'] === true));
        }

        if (stepEnv !== undefined && isEnvAfterRun === true) {
          lines.push('        env:');

          for (const entry of stepEnv) {
            lines.push(`          ${entry['key']}: ${Runner.quote(entry['value'])}`);
          }
        }

        const stepWorkingDirectory: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeJobs_StepWorkingDirectory = step['workingDirectory'];

        if (stepWorkingDirectory !== undefined) {
          lines.push(`        working-directory: ${Runner.quote(stepWorkingDirectory)}`);
        }

        // Blank line between steps (but not after the final step).
        if (step !== jobSteps[jobSteps.length - 1]) {
          lines.push('');
        }
      }

      // Blank line between jobs (but not after the final job).
      if (job !== jobs[jobs.length - 1]) {
        lines.push('');
      }
    }

    return lines;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize Needs.
   *
   * Emits a job's needs as a bare quoted string when a single job is
   * named and as a bracketed list when several are, matching style.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeNeeds_Needs} needs - Needs.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeNeeds_Returns}
   *
   * @since 0.21.0
   */
  private static serializeNeeds(needs: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeNeeds_Needs): Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeNeeds_Returns {
    const quoted: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeNeeds_Quoted = needs.map((need) => Runner.quote(need));

    if (quoted.length === 1) {
      return quoted.join('');
    }

    return `[${quoted.join(', ')}]`;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize Run.
   *
   * Emits a step's run command as a quoted single-line scalar or, when
   * the command spans multiple lines, as an indented block scalar.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Run}    run    - Run.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Indent} indent - Indent.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Block}  block  - Block.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Plain}  plain  - Plain.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Returns}
   *
   * @since 0.21.0
   */
  private static serializeRun(run: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Run, indent: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Indent, block: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Block, plain: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Plain): Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Returns {
    const lines: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeRun_Lines = [];

    // Single-line commands stay quoted unless a block scalar is forced;
    // a plain-flagged command emits its bare scalar (matching a legacy
    // fragment that left the run unquoted); multi-line commands always
    // use a block scalar.
    if (run.includes('\n') === false && block === false) {
      if (plain === true) {
        lines.push(`${indent}run: ${run}`);
      } else {
        lines.push(`${indent}run: ${Runner.quote(run)}`);
      }

      return lines;
    }

    lines.push(`${indent}run: |`);

    for (const bodyLine of run.split('\n')) {
      // Blank body lines emit with no trailing whitespace.
      if (bodyLine === '') {
        lines.push('');
      } else {
        lines.push(`${indent}  ${bodyLine}`);
      }
    }

    return lines;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize With.
   *
   * Emits each with entry, keeping scalars inline while rendering the
   * block-flagged path value as an indented block scalar.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_WithMap} withMap - With map.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Indent}  indent  - Indent.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Returns}
   *
   * @since 0.21.0
   */
  private static serializeWith(withMap: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_WithMap, indent: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Indent): Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Returns {
    const lines: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Lines = [];

    for (const entry of withMap) {
      const value: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_Value = entry['value'];

      if (entry['block'] === true) {
        lines.push(`${indent}${entry['key']}: |`);

        // A block value may carry several lines (artifact paths or image
        // tags), each emitted under the block scalar at the same indent.
        const blockValue: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeWith_BlockValue = `${value}`;

        for (const blockLine of blockValue.split('\n')) {
          lines.push(`${indent}  ${blockLine}`);
        }
      } else {
        lines.push(`${indent}${entry['key']}: ${Runner.serializeScalar(value)}`);
      }
    }

    return lines;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Serialize Scalar.
   *
   * Emits integers and YAML booleans bare while quoting strings, the
   * deliberately non-uniform rule that reproduces the house style.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeScalar_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeScalar_Returns}
   *
   * @since 0.21.0
   */
  private static serializeScalar(value: Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeScalar_Value): Cli_Generate_Github_WorkflowsBlueprint_Runner_SerializeScalar_Returns {
    // Integers and YAML booleans are emitted bare; strings are quoted.
    if (typeof value === 'number') {
      return `${value}`;
    }

    if (typeof value === 'boolean') {
      return (value === true) ? 'true' : 'false';
    }

    return Runner.quote(value);
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Quote.
   *
   * Wraps a string scalar in double quotes, the single quoting style
   * every string field in the emitted workflow uses.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_Quote_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_Quote_Returns}
   *
   * @since 0.21.0
   */
  private static quote(value: Cli_Generate_Github_WorkflowsBlueprint_Runner_Quote_Value): Cli_Generate_Github_WorkflowsBlueprint_Runner_Quote_Returns {
    return `"${value}"`;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Resolve Workflow ID.
   *
   * Renders the optional suffix as a parenthesized workflow id, or an
   * empty string when absent, matching the current name convention.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowId_Suffix} suffix - Suffix.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowId_Returns}
   *
   * @since 0.21.0
   */
  private static resolveWorkflowId(suffix: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowId_Suffix): Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowId_Returns {
    if (suffix === undefined) {
      return '';
    }

    return ` (${suffix})`;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Resolve Workflow Display Name.
   *
   * Renders the display name a template and suffix generate with, so a
   * chained workflow_run trigger references its upstream workflow by the
   * exact name the sibling builder emits.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_Template} template - Template.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_Suffix}   suffix   - Suffix.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_Returns}
   *
   * @since 0.21.0
   */
  private static resolveWorkflowDisplayName(template: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_Template, suffix: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_Suffix): Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_Returns {
    const workflowId: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveWorkflowDisplayName_WorkflowId = Runner.resolveWorkflowId(suffix);

    if (template === 'check-sponsor-gated-issues') {
      return `Check Sponsor Gated Issues${workflowId}`;
    }

    if (template === 'lock-inactive-issues') {
      return `Lock Inactive Issues${workflowId}`;
    }

    return `Publish${workflowId}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Expr.
   *
   * Wraps an inner expression in the GitHub Actions substitution
   * braces, assembling the dollar-brace token so no literal template
   * placeholder sits in a plain string.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_Expr_Inner} inner - Inner.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_Expr_Returns}
   *
   * @since 0.21.0
   */
  private static expr(inner: Cli_Generate_Github_WorkflowsBlueprint_Runner_Expr_Inner): Cli_Generate_Github_WorkflowsBlueprint_Runner_Expr_Returns {
    const dollarBrace: Cli_Generate_Github_WorkflowsBlueprint_Runner_Expr_DollarBrace = [
      '$',
      '{',
    ].join('');

    return `${dollarBrace}{ ${inner} }}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Resolve Scoped Cred Expr.
   *
   * Resolves a deploy-credential variable to its GitHub expression, choosing
   * the namespace prefix by credential scope: the global prefix for an account
   * cred, the deploying app prefix for an app cred, else the metadata default.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Variables}        variables        - Variables.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_VariableName}     variableName     - Variable name.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_TargetSettings}   targetSettings   - Target settings.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_WorkflowSettings} workflowSettings - Workflow settings.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Environment}      environment      - Environment.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_AppPath}          appPath          - App path.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Returns}
   *
   * @since 0.21.0
   */
  private static resolveScopedCredExpr(variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Variables, variableName: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_VariableName, targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_TargetSettings, workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_WorkflowSettings, environment: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Environment, appPath: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_AppPath): Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Returns {
    const variableMeta: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_VariableMeta = variables[variableName] ?? { format: 'literal' };
    const scope: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Scope = variableMeta['scope'];
    let prefix: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Prefix = undefined;

    if (scope === 'account' && environment !== undefined) {
      const global: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Global = environment['global'];
      const globalPrefix: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_GlobalPrefix = (global === undefined) ? undefined : global['prefix'];

      if (globalPrefix !== undefined && globalPrefix !== '') {
        prefix = globalPrefix;
      }
    } else if (scope === 'app' && environment !== undefined) {
      const apps: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_Apps = environment['apps'];
      const app: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_App = (apps === undefined) ? undefined : apps[appPath];
      const appPrefix: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveScopedCredExpr_AppPrefix = (app === undefined) ? undefined : app['prefix'];

      if (appPrefix !== undefined && appPrefix !== '') {
        prefix = appPrefix;
      }
    }

    return Runner.resolveVariableExpr(variables, variableName, targetSettings, workflowSettings, prefix);
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Resolve Variable Expr.
   *
   * Resolves a declared variable to its GitHub name and renders the per-format
   * expression. A non-auto var or secret under a prefix derives as prefix + key;
   * the auto GITHUB_TOKEN, literals, and prefix-less callers keep the default.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_Variables}        variables        - Variables.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_VariableName}     variableName     - Variable name.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_TargetSettings}   targetSettings   - Target settings.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_WorkflowSettings} workflowSettings - Workflow settings.
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_Prefix}           [prefix]         - Prefix.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_Returns}
   *
   * @since 0.21.0
   */
  private static resolveVariableExpr(variables: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_Variables, variableName: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_VariableName, targetSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_TargetSettings, workflowSettings: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_WorkflowSettings, prefix: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_Prefix = undefined): Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_Returns {
    const variableMeta: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_VariableMeta = variables[variableName] ?? { format: 'literal' };
    const isPrefixable: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_IsPrefixable = (
      prefix !== undefined
      && prefix !== ''
      && variableMeta['auto'] !== true
      && variableMeta['format'] !== 'literal'
    );
    const resolvedName: Cli_Generate_Github_WorkflowsBlueprint_Runner_ResolveVariableExpr_ResolvedName = (isPrefixable === true && prefix !== undefined) ? libEnvNamespace.githubName(prefix, variableName) : Variables.resolve(variableName, targetSettings, workflowSettings, variableMeta);

    return Variables.resolveExpr(variableMeta['format'], resolvedName);
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Dollar.
   *
   * Assembles the dollar-brace opener from parts so shell parameter
   * expansions can appear in run steps without a literal placeholder
   * tripping the template-curly lint rule.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_Dollar_Returns}
   *
   * @since 0.21.0
   */
  private static dollar(): Cli_Generate_Github_WorkflowsBlueprint_Runner_Dollar_Returns {
    return [
      '$',
      '{',
    ].join('');
  }

  /**
   * CLI - Generate - GitHub - Workflows Blueprint - Escape Shell Default.
   *
   * Escapes a build-fallback default so a backslash, backtick, dollar, or
   * double-quote stays literal inside the double-quoted echo, mirroring the
   * shellQuote escaping without adding the surrounding quotes.
   *
   * @param {Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_Returns}
   *
   * @since 0.21.0
   */
  private static escapeShellDefault(value: Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_Value): Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_Returns {
    const backslashPattern: Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_BackslashPattern = new RegExp(LIB_REGEX_CHARACTER_BACKSLASH.source, 'g');
    const backtickPattern: Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_BacktickPattern = new RegExp(LIB_REGEX_CHARACTER_BACKTICK.source, 'g');
    const dollarPattern: Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_DollarPattern = new RegExp(LIB_REGEX_CHARACTER_DOLLAR.source, 'g');
    const doubleQuotePattern: Cli_Generate_Github_WorkflowsBlueprint_Runner_EscapeShellDefault_DoubleQuotePattern = new RegExp(LIB_REGEX_CHARACTER_DOUBLE_QUOTE.source, 'g');

    return value
      .replace(backslashPattern, '\\\\')
      .replace(backtickPattern, '\\`')
      .replace(dollarPattern, '\\$')
      .replace(doubleQuotePattern, '\\"');
  }
}
