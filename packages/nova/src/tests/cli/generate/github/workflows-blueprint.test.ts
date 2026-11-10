import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as WorkflowsBlueprint } from '../../../../cli/generate/github/workflows-blueprint.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_BuildValues,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_CarriesANonSecretBuildDefaultAndBakesItAsAShellFallback_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_CarriesANonSecretBuildDefaultAndBakesItAsAShellFallback_Run,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_CarriesANonSecretBuildDefaultAndBakesItAsAShellFallback_Values,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_CarriesANonSecretBuildDefaultAndBakesItAsAShellFallback_WriteEnvRun,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_RuntimeValues,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_SplitsAppValuesByReachAndDerivesPrefixedNames_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildCheckSponsorGatedIssues_EmitsTheCheckIssuesJobWithReadWritePermissions_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildCheckSponsorGatedIssues_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildCheckSponsorGatedIssues_MergesBothTriggersInConfigOrder_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildIssueCommentTrigger_ReturnsTheIssueCommentTrigger_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildIssuesTrigger_ReturnsTheIssuesTrigger_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildLockInactiveIssues_AppendsTheWorkflowDispatchInput_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildLockInactiveIssues_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildLockInactiveIssues_GrantsIssueAndPullRequestWritePermissions_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildLockInactiveIssues_GrantsIssueAndPullRequestWritePermissions_Serialized,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AddsNoStepForADotenvLessScope_BuildJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AddsNoStepForADotenvLessScope_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AddsNoStepForADotenvLessScope_PlainStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AddsNoStepForADotenvLessScope_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AppliesNoJobsConditionForTheAnyVariant_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_BuildJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_DefaultEnvironment,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_DollarBrace,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_ExpectedFallback,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_RegionEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_StepEnv,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_WriteEnvStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_BuildJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_GtmEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_SiteKeyEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_StepEnv,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_WriteEnvStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_ArtifactEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_Artifacts,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_ArtifactWorkspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_DefaultsEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheFailureConclusionForTheFailureVariant_BuildJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheFailureConclusionForTheFailureVariant_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_DollarBrace,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_Expected,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_IfLines,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_BuildJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_CacheEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_DeployJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_DollarBrace,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_NodeVersionEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_SerializedDefaults,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_SetupStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_LeavesOriginalModeEnvironmentAgnostic_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndPushTriggersInConfigOrder_DollarBrace,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndPushTriggersInConfigOrder_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndPushTriggersInConfigOrder_PublishEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndWorkflowRunPartsInConfigOrder_DollarBrace,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndWorkflowRunPartsInConfigOrder_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndWorkflowRunPartsInConfigOrder_PublishEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTagPushAndBranchPushIntoASinglePushNode_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTagPushAndBranchPushIntoASinglePushNode_PushKeyLines,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTagPushAndBranchPushIntoASinglePushNode_PushNode,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTagPushAndBranchPushIntoASinglePushNode_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheReleaseOnlyPublishConditionAndRunName_DollarBrace,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheReleaseOnlyPublishConditionAndRunName_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheReleaseOnlyPublishConditionAndRunName_PublishEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheTagPushOnlyPublishConditionAndRunName_DollarBrace,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheTagPushOnlyPublishConditionAndRunName_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheTagPushOnlyPublishConditionAndRunName_PublishEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheWorkflowRunPublishConditionAndRunName_DollarBrace,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheWorkflowRunPublishConditionAndRunName_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheWorkflowRunPublishConditionAndRunName_PublishEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheWorkflowRunPublishConditionAndRunName_WorkflowRunNode,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_CheckIndex,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_OrderedJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_PreflightIndex,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_ProfiledEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_ProfiledEnvironment,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ReleasePushEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ReleasePushEntryForBuild,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ReleaseWorkflowRunEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_TagBranchPushEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_TagBranchPushEntryForBuild,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_TagPushEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_UsesPnpmForCorepackInstallsAndNovaWorkspaceCommands_Returns,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_UsesYarnForCorepackInstallsAndNovaWorkspaceCommands_Returns,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_WorkflowRunAnyEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_WorkflowRunEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_WorkflowRunFailureEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_WorkflowRunSiblings,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPushTrigger_CarriesTheOptionalPathsFilter_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPushTrigger_ReturnsTheBranchPushTrigger_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildScheduleDailyTrigger_ReturnsTheDailyScheduleTrigger_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildScheduleMonthlyTrigger_ReturnsTheMonthlyScheduleTrigger_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildScheduleWeeklyTrigger_ReturnsTheWeeklyScheduleTrigger_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildTagPushTrigger_AppliesCustomTagGlobs_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildTagPushTrigger_ReturnsTheTagPushTriggerWithTheDefaultGlob_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildWorkflowRunTrigger_ReturnsTheWorkflowRunTriggerWithTheResolvedNames_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesConfiguredExecutionSettingsToEveryGeneratedJob_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesConfiguredExecutionSettingsToEveryGeneratedJob_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesConfiguredExecutionSettingsToEveryGeneratedJob_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_BuildSection,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_DeploySection,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_UsesMatchingContainerRunnerArchitectures_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_UsesMatchingContainerRunnerArchitectures_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_UsesMatchingContainerRunnerArchitectures_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintEmitRuntimeSyncStep_Emit,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintEmitRuntimeSyncStep_ReturnsUndefinedWhenTheTargetDeclaresNoRuntimeValues_Step,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintEmitRuntimeSyncStep_RoutesACloudflareSecretThroughTheEncryptedChannelAndAVariableThroughTheDeployChannel_Step,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintEmitRuntimeSyncStep_RoutesAVercelSecretThroughTheSensitiveChannelAndAVariableThroughThePlainChannel_Step,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_Expected,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_ExpectedLines,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_PushTrigger,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsTheFiveLineHeaderFollowedByABlankLine_ExpectedPrefix,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsTheFiveLineHeaderFollowedByABlankLine_ExpectedPrefixLines,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsTheFiveLineHeaderFollowedByABlankLine_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsTheFiveLineHeaderFollowedByABlankLine_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_Expected,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_ExpectedLines,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_PushTrigger,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_LeavesBooleansAndIntegersBareWhileQuotingStrings_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_LeavesBooleansAndIntegersBareWhileQuotingStrings_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedSnippet,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedSnippetLines,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedStepTimeoutMinutes,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedTimeoutMinutesByJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedTimeoutMinutesForJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_Jobs,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_JobTimeoutMinutes,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_StepKinds,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Issues Trigger.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildIssuesTrigger', () => {
  it('returns the issues trigger', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildIssuesTrigger_ReturnsTheIssuesTrigger_Result = WorkflowsBlueprint.buildIssuesTrigger();

    strictEqual(result['event'], 'issues');

    strictEqual(result['types'].join(','), 'opened,closed');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Issue Comment Trigger.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildIssueCommentTrigger', () => {
  it('returns the issue comment trigger', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildIssueCommentTrigger_ReturnsTheIssueCommentTrigger_Result = WorkflowsBlueprint.buildIssueCommentTrigger();

    strictEqual(result['event'], 'issue_comment');

    strictEqual(result['types'].join(','), 'created,edited');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Schedule Weekly Trigger.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildScheduleWeeklyTrigger', () => {
  it('returns the weekly schedule trigger', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildScheduleWeeklyTrigger_ReturnsTheWeeklyScheduleTrigger_Result = WorkflowsBlueprint.buildScheduleWeeklyTrigger();

    strictEqual(result['event'], 'schedule');

    strictEqual(result['cron'], '0 0 * * 0');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Schedule Daily Trigger.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildScheduleDailyTrigger', () => {
  it('returns the daily schedule trigger', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildScheduleDailyTrigger_ReturnsTheDailyScheduleTrigger_Result = WorkflowsBlueprint.buildScheduleDailyTrigger();

    strictEqual(result['event'], 'schedule');

    strictEqual(result['cron'], '0 0 * * *');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Schedule Monthly Trigger.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildScheduleMonthlyTrigger', () => {
  it('returns the monthly schedule trigger', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildScheduleMonthlyTrigger_ReturnsTheMonthlyScheduleTrigger_Result = WorkflowsBlueprint.buildScheduleMonthlyTrigger();

    strictEqual(result['event'], 'schedule');

    strictEqual(result['cron'], '0 0 1 * *');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Workflow Run Trigger.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildWorkflowRunTrigger', () => {
  it('returns the workflow run trigger with the resolved names', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildWorkflowRunTrigger_ReturnsTheWorkflowRunTriggerWithTheResolvedNames_Result = WorkflowsBlueprint.buildWorkflowRunTrigger(['Publish (core)']);

    strictEqual(result['event'], 'workflow_run');

    strictEqual(result['workflows'].join(','), 'Publish (core)');

    strictEqual(result['types'].join(','), 'completed');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Tag Push Trigger.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildTagPushTrigger', () => {
  it('returns the tag push trigger with the default glob', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildTagPushTrigger_ReturnsTheTagPushTriggerWithTheDefaultGlob_Result = WorkflowsBlueprint.buildTagPushTrigger();

    strictEqual(result['event'], 'push');

    strictEqual((result['tags'] ?? []).join(','), 'v*');

    strictEqual(result['branches'], undefined);

    return;
  });

  it('applies custom tag globs', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildTagPushTrigger_AppliesCustomTagGlobs_Result = WorkflowsBlueprint.buildTagPushTrigger([
      'release-*',
      'v*',
    ]);

    strictEqual((result['tags'] ?? []).join(','), 'release-*,v*');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Push Trigger.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildPushTrigger', () => {
  it('returns the branch push trigger', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPushTrigger_ReturnsTheBranchPushTrigger_Result = WorkflowsBlueprint.buildPushTrigger(['main']);

    strictEqual(result['event'], 'push');

    strictEqual((result['branches'] ?? []).join(','), 'main');

    strictEqual(result['paths'], undefined);

    return;
  });

  it('carries the optional paths filter', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPushTrigger_CarriesTheOptionalPathsFilter_Result = WorkflowsBlueprint.buildPushTrigger(['main'], ['apps/site/**']);

    strictEqual((result['branches'] ?? []).join(','), 'main');

    strictEqual((result['paths'] ?? []).join(','), 'apps/site/**');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Check Sponsor Gated Issues.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildCheckSponsorGatedIssues', () => {
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildCheckSponsorGatedIssues_Entry = {
    template: 'check-sponsor-gated-issues',
    runsOn: 'ubuntu-24.04',
    name: 'project',
    triggers: [
      'issue-comment',
      'issues',
    ],
  };

  it('merges both triggers in config order', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildCheckSponsorGatedIssues_MergesBothTriggersInConfigOrder_Ir = WorkflowsBlueprint.buildCheckSponsorGatedIssues(entry);

    strictEqual(ir['on'].map((trigger) => trigger['event']).join(','), 'issue_comment,issues');

    strictEqual(ir['name'], 'Check Sponsor Gated Issues (project)');

    return;
  });

  it('emits the check-issues job with read/write permissions', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildCheckSponsorGatedIssues_EmitsTheCheckIssuesJobWithReadWritePermissions_Ir = WorkflowsBlueprint.buildCheckSponsorGatedIssues(entry);

    strictEqual(ir['jobs'].map((job) => job['id']).join(','), 'check-issues');

    strictEqual(ir['jobs'].map((job) => job['timeoutMinutes']).join(','), '5');

    strictEqual(ir['jobs'].map((job) => job['steps'].length).join(','), '2');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Lock Inactive Issues.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildLockInactiveIssues', () => {
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildLockInactiveIssues_Entry = {
    template: 'lock-inactive-issues',
    runsOn: 'ubuntu-24.04',
    name: 'project',
    triggers: ['schedule-weekly'],
  };

  it('appends the workflow dispatch input', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildLockInactiveIssues_AppendsTheWorkflowDispatchInput_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);

    strictEqual(ir['on'].map((trigger) => trigger['event']).join(','), 'schedule,workflow_dispatch');

    strictEqual(ir['name'], 'Lock Inactive Issues (project)');

    return;
  });

  it('grants issue and pull request write permissions', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildLockInactiveIssues_GrantsIssueAndPullRequestWritePermissions_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);

    deepStrictEqual(ir['permissions'], {
      'issues': 'write',
      'pull-requests': 'write',
    });

    strictEqual(ir['jobs'].map((job) => job['timeoutMinutes']).join(','), '5', 'the lock job keeps its five-minute default');

    const serialized: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildLockInactiveIssues_GrantsIssueAndPullRequestWritePermissions_Serialized = WorkflowsBlueprint.serialize(ir);

    ok(serialized.includes('    timeout-minutes: 5'), 'the lock job timeout is serialized');
    ok(serialized.includes([
      '- name: "Lock inactive threads"',
      '        uses:',
    ].join('\n')) && serialized.includes('        timeout-minutes: 5'), 'the lock step clamps to the five-minute job');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Serialize.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.serialize', () => {
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_Entry = {
    template: 'lock-inactive-issues',
    runsOn: 'ubuntu-24.04',
    name: 'project',
    triggers: ['schedule-weekly'],
  };

  it('emits the five-line header followed by a blank line', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsTheFiveLineHeaderFollowedByABlankLine_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsTheFiveLineHeaderFollowedByABlankLine_Result = WorkflowsBlueprint.serialize(ir);
    const expectedPrefixLines: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsTheFiveLineHeaderFollowedByABlankLine_ExpectedPrefixLines = [
      '# This file is generated by @cbnventures/nova.',
      '# Do not edit manually.',
      '#',
      '# Run `nova generate github workflows` to regenerate.',
      '# See: https://nova.cbnventures.io/docs/cli/generators/github/workflows',
      '',
      'name:',
    ];
    const expectedPrefix: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsTheFiveLineHeaderFollowedByABlankLine_ExpectedPrefix = expectedPrefixLines.join('\n');

    ok(result.startsWith(expectedPrefix), 'header block then blank line then name');

    return;
  });

  it('leaves booleans and integers bare while quoting strings', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_LeavesBooleansAndIntegersBareWhileQuotingStrings_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);

    Reflect.set(ir['jobs'][0]!, 'runsOn', 'ubuntu-24.04');

    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_LeavesBooleansAndIntegersBareWhileQuotingStrings_Result = WorkflowsBlueprint.serialize(ir);

    ok(result.includes('  cancel-in-progress: false\n'), 'boolean stays bare');

    ok(result.includes('    timeout-minutes: 5\n'), 'integer stays bare');

    ok(result.includes('        default: true\n'), 'dispatch default stays bare');

    ok(result.includes('runs-on: "ubuntu-24.04"\n'), 'string scalar is quoted');

    return;
  });

  it('uses job timeouts for long kinds and clamps quick defaults to shorter jobs', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);
    const stepKinds: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_StepKinds = [
      'checkout',
      'setup',
      'install',
      'build',
      'check',
      'artifact',
      'registry',
      'deploy',
      'attest',
    ];
    const jobTimeoutMinutes: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_JobTimeoutMinutes = [
      4,
      15,
      45,
      90,
    ];
    const jobs: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_Jobs = jobTimeoutMinutes.map((jobTimeoutMinute) => ({
      id: `job-${jobTimeoutMinute}`,
      runsOn: 'ubuntu-24.04',
      timeoutMinutes: jobTimeoutMinute,
      steps: stepKinds.map((stepKind) => ({
        name: `${stepKind}-${jobTimeoutMinute}`,
        kind: stepKind,
        run: 'true',
      })),
    }));

    Reflect.set(ir, 'jobs', jobs);

    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_Result = WorkflowsBlueprint.serialize(ir);
    const expectedTimeoutMinutesByJob: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedTimeoutMinutesByJob = {
      4: {
        checkout: 4,
        setup: 4,
        install: 4,
        build: 4,
        check: 4,
        artifact: 4,
        registry: 4,
        deploy: 4,
        attest: 4,
      },
      15: {
        checkout: 5,
        setup: 10,
        install: 15,
        build: 15,
        check: 15,
        artifact: 15,
        registry: 5,
        deploy: 15,
        attest: 10,
      },
      45: {
        checkout: 5,
        setup: 10,
        install: 20,
        build: 45,
        check: 45,
        artifact: 45,
        registry: 5,
        deploy: 45,
        attest: 10,
      },
      90: {
        checkout: 5,
        setup: 10,
        install: 20,
        build: 90,
        check: 90,
        artifact: 90,
        registry: 5,
        deploy: 90,
        attest: 10,
      },
    };

    for (const jobTimeoutMinute of jobTimeoutMinutes) {
      const expectedTimeoutMinutesForJob: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedTimeoutMinutesForJob = expectedTimeoutMinutesByJob[jobTimeoutMinute];

      ok(expectedTimeoutMinutesForJob !== undefined, `${jobTimeoutMinute} has expected step timeout defaults`);

      for (const stepKind of stepKinds) {
        const expectedStepTimeoutMinutes: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedStepTimeoutMinutes = expectedTimeoutMinutesForJob[stepKind];
        const expectedSnippetLines: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedSnippetLines = [
          `      - name: "${stepKind}-${jobTimeoutMinute}"`,
          `        timeout-minutes: ${expectedStepTimeoutMinutes}`,
        ];
        const expectedSnippet: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_UsesJobTimeoutsForLongKindsAndClampsQuickDefaultsToShorterJobs_ExpectedSnippet = expectedSnippetLines.join('\n');

        ok(result.includes(expectedSnippet), `${stepKind} uses ${expectedStepTimeoutMinutes} minutes in the ${jobTimeoutMinute}-minute job`);
      }
    }

    return;
  });

  it('emits the push tags on-block', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);
    const pushTrigger: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_PushTrigger = {
      event: 'push',
      tags: ['v*'],
    };

    Reflect.set(ir, 'on', [pushTrigger]);

    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_Result = WorkflowsBlueprint.serialize(ir);
    const expectedLines: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_ExpectedLines = [
      'on:',
      '  push:',
      '    tags:',
      '      - "v*"',
      '',
      'permissions:',
    ];
    const expected: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsThePushTagsOnBlock_Expected = expectedLines.join('\n');

    ok(result.includes(expected), 'the push tags node emits exactly the expected lines');

    return;
  });

  it('emits push branches before paths', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_Ir = WorkflowsBlueprint.buildLockInactiveIssues(entry);
    const pushTrigger: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_PushTrigger = {
      event: 'push',
      branches: ['main'],
      paths: ['apps/site/**'],
    };

    Reflect.set(ir, 'on', [pushTrigger]);

    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_Result = WorkflowsBlueprint.serialize(ir);
    const expectedLines: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_ExpectedLines = [
      'on:',
      '  push:',
      '    branches:',
      '      - "main"',
      '    paths:',
      '      - "apps/site/**"',
      '',
      'permissions:',
    ];
    const expected: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintSerialize_EmitsPushBranchesBeforePaths_Expected = expectedLines.join('\n');

    ok(result.includes(expected), 'the push node emits branches then paths');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Dispatch.
 *
 * @since 0.33.0
 */
describe('WorkflowsBlueprint.dispatch', () => {
  it('applies configured execution settings to every generated job', () => {
    const entry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesConfiguredExecutionSettingsToEveryGeneratedJob_Entry = {
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      runsOn: 'ubuntu-24.04',
      timeoutMinutes: 42,
      build: ['./packages/tool'],
      deploy: [{
        to: 'npm',
        path: './packages/tool',
      }],
    };
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesConfiguredExecutionSettingsToEveryGeneratedJob_Workspaces = {
      './packages/tool': {
        name: 'tool-package',
        role: 'package',
        policy: 'distributable',
      },
    };
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesConfiguredExecutionSettingsToEveryGeneratedJob_Result = WorkflowsBlueprint.dispatch(entry, workspaces);

    strictEqual(result.split('runs-on: "ubuntu-24.04"').length, 3, 'both generated jobs use the configured runner');

    strictEqual(result.split('\n    timeout-minutes: 42\n').length, 3, 'both generated jobs use the configured timeout');

    return;
  });

  it('applies per-job and step overrides with clamping', () => {
    const entry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_Entry = {
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      runsOn: 'ubuntu-24.04',
      timeoutMinutes: 40,
      buildTimeoutMinutes: 12,
      stepTimeoutMinutes: {
        check: 7,
        install: 20,
        deploy: 30,
      },
      build: ['./packages/tool'],
      deploy: [{
        to: 'npm',
        path: './packages/tool',
        timeoutMinutes: 8,
      }],
    };
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_Workspaces = {
      './packages/tool': {
        name: 'tool-package',
        role: 'package',
        policy: 'distributable',
      },
    };
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_Result = WorkflowsBlueprint.dispatch(entry, workspaces);
    const buildSection: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_BuildSection = result.split('  publish-npm-packages-tool:')[0] ?? '';
    const deploySection: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_AppliesPerJobAndStepOverridesWithClamping_DeploySection = result.split('  publish-npm-packages-tool:')[1] ?? '';

    ok(buildSection.includes('    timeout-minutes: 12'), 'the build override wins over the workflow timeout');
    ok(buildSection.includes([
      '- name: "Check project"',
      '        timeout-minutes: 7',
    ].join('\n')), 'the check kind uses its configured timeout');
    ok(buildSection.includes([
      '- name: "Install packages"',
      '        timeout-minutes: 12',
    ].join('\n')), 'the install override clamps to the build job');
    ok(deploySection.includes('    timeout-minutes: 8'), 'the target override wins over the workflow timeout');
    ok(deploySection.includes([
      '- name: "Publish package to npm"',
      '        timeout-minutes: 8',
    ].join('\n')), 'the deploy override clamps to the target job');

    return;
  });

  it('uses matching container runner architectures', () => {
    const entry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_UsesMatchingContainerRunnerArchitectures_Entry = {
      template: 'publish',
      name: 'containers',
      triggers: ['release'],
      runsOn: 'ubuntu-24.04',
      containerPlatforms: [
        'linux/amd64',
        'linux/arm64',
      ],
      deploy: [{
        to: 'ghcr',
        path: './',
        with: {
          IMAGE_REPOSITORY: 'nova',
        },
      }],
    };
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_UsesMatchingContainerRunnerArchitectures_Workspaces = {};
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintDispatch_UsesMatchingContainerRunnerArchitectures_Result = WorkflowsBlueprint.dispatch(entry, workspaces);

    ok(result.includes([
      '  build-container-linux-amd64:',
      '    runs-on: "ubuntu-24.04"',
    ].join('\n')), 'the x64 job uses the pinned x64 label');
    ok(result.includes([
      '  build-container-linux-arm64:',
      '    runs-on: "ubuntu-24.04-arm"',
    ].join('\n')), 'the arm64 job uses the derived arm label');
    strictEqual(result.includes('-latest'), false, 'generated output contains no moving runner aliases');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Build Publish.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.buildPublish', () => {
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_Entry = {
    template: 'publish',
    runsOn: 'ubuntu-24.04',
    name: 'project',
    triggers: ['release'],
    build: [
      './apps/public-app',
      './apps/plain-app',
    ],
    deploy: [],
  };
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_Workspaces = {
    './apps/public-app': {
      name: 'public-app-app',
      role: 'app',
      policy: 'distributable',
    },
    './apps/plain-app': {
      name: 'plain-app-app',
      role: 'app',
      policy: 'distributable',
    },
  };
  const environment: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_Environment = {
    workspaces: {
      './apps/public-app': {
        prefix: 'CBN_',
        variables: [
          {
            key: 'PUBLIC_SITE_KEY',
            secret: false,
            reach: 'build',
          },
          {
            key: 'PUBLIC_GTM_ID',
            secret: false,
            reach: 'build',
          },
          {
            key: 'SECRET_TOKEN',
            secret: true,
            reach: 'runtime',
          },
        ],
      },
    },
  };

  it('leaves original mode environment agnostic', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_LeavesOriginalModeEnvironmentAgnostic_Result = WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish(entry, workspaces, environment));

    strictEqual(result.includes('DEPLOY_ENVIRONMENT'), false);

    strictEqual(result.includes('CLOUDFLARE_ENV'), false);

    strictEqual(result.includes('Validate Cloudflare deployment environment'), false);

    strictEqual(result.includes('Select Cloudflare deployment environment'), false);

    return;
  });

  it('builds and uploads one named artifact for multiple deploy targets', () => {
    const artifactEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_ArtifactEntry = {
      template: 'publish',
      runsOn: 'ubuntu-24.04',
      name: 'project',
      triggers: ['release'],
      build: [],
      deploy: [
        {
          to: 'github-pages',
          path: './apps/docs',
          artifact: 'site-release',
        },
        {
          to: 'cloudflare-pages',
          path: './apps/docs',
          artifact: 'site-release',
        },
      ],
    };
    const artifactWorkspaces: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_ArtifactWorkspaces = {
      './apps/docs': {
        name: 'artifact-app-docs',
        role: 'app',
        policy: 'trackable',
      },
    };
    const artifacts: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_Artifacts = {
      'site-release': {
        build: ['./apps/docs'],
        sources: [{
          from: './apps/docs/build',
          to: './site',
        }],
      },
    };
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_Ir = WorkflowsBlueprint.buildPublish(artifactEntry, artifactWorkspaces, {}, [], 'npm', artifacts);
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BuildsAndUploadsOneNamedArtifactForMultipleDeployTargets_Result = WorkflowsBlueprint.serialize(ir);

    strictEqual(result.includes('npm run build -- --workspace artifact-app-docs --artifact site-release'), true);
    strictEqual(result.split('name: "Upload assembled artifact (site-release)"').length, 2);
    strictEqual(result.split('name: "artifact-site-release"').length, 4);
    strictEqual(result.includes('include-hidden-files: true'), true);
    strictEqual(result.includes('if-no-files-found: "error"'), true);
    strictEqual(result.includes([
      'path: |',
      '            build/site-release',
    ].join('\n')), true);
    strictEqual(result.split('path: "build/site-release"').length, 4);

    return;
  });

  it('profiles Cloudflare publishing by release channel', () => {
    const profiledEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_ProfiledEntry = {
      template: 'publish',
      runsOn: 'ubuntu-24.04',
      name: 'project',
      triggers: [
        'release',
        'tag-push',
      ],
      build: [
        './apps/public-app',
        './apps/plain-app',
      ],
      deploy: [
        {
          to: 'cloudflare-workers',
          path: './apps/public-app',
        },
        {
          to: 'cloudflare-workers',
          path: './apps/plain-app',
          after: ['./apps/public-app'],
        },
      ],
      environmentSelection: {
        versionTags: {
          prerelease: 'staging',
          stable: 'production',
        },
        manual: true,
      },
    };
    const profiledEnvironment: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_ProfiledEnvironment = {
      profiles: {
        enabled: true,
      },
      project: {
        prefix: 'PROJECT_',
      },
      workspaces: {
        './apps/public-app': {
          prefix: 'PUBLIC_',
          variables: [{
            key: 'PUBLIC_SITE_KEY',
            secret: false,
            reach: 'build',
          }],
        },
        './apps/plain-app': {
          prefix: 'PLAIN_',
          variables: [{
            key: 'PRIVATE_TOKEN',
            secret: true,
            reach: 'runtime',
          }],
        },
      },
    };
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_Ir = WorkflowsBlueprint.buildPublish(profiledEntry, workspaces, profiledEnvironment);
    const orderedJob: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_OrderedJob = ir['jobs'].find((job) => job['id'] === 'publish-cloudflare-workers-apps-plain-app');
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_Result = WorkflowsBlueprint.serialize(ir);
    const preflightIndex: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_PreflightIndex = result.indexOf('Validate Cloudflare deployment environment');
    const checkIndex: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ProfilesCloudflarePublishingByReleaseChannel_CheckIndex = result.indexOf('Check project');

    ok(result.includes('DEPLOY_ENVIRONMENT'));

    ok(result.includes('CLOUDFLARE_ENV'));

    strictEqual(result.split('Select Cloudflare deployment environment').length - 1, 3, 'the build job and both deploy jobs select the environment independently');

    ok(result.includes('$GITHUB_REF_NAME'), 'tag-triggered runs inspect the version suffix');

    strictEqual(result.includes('contains(github.ref_name, \'-\')'), false, 'hyphens in project and package names do not imply a prerelease');

    ok(result.includes('PROJECT_STAGING_CLOUDFLARE_API_TOKEN'));

    ok(result.includes('PROJECT_PRODUCTION_CLOUDFLARE_API_TOKEN'));

    ok(result.includes('PUBLIC_STAGING_PUBLIC_SITE_KEY'));

    ok(result.includes('PLAIN_PRODUCTION_PRIVATE_TOKEN'));

    ok(result.includes('wrangler types'));

    ok(result.includes('--env "$CLOUDFLARE_ENV"'));

    ok(
      preflightIndex >= 0
      && checkIndex >= 0
      && preflightIndex < checkIndex,
      'the all-target preflight runs before checks and builds',
    );

    ok(orderedJob !== undefined, 'the ordered Cloudflare deploy job exists');

    deepStrictEqual(orderedJob['needs'], [
      'build',
      'publish-cloudflare-workers-apps-public-app',
    ], 'the configured deploy order remains intact');

    return;
  });

  it('adds no step for a dotenv-less scope', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AddsNoStepForADotenvLessScope_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, environment);
    const buildJob: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AddsNoStepForADotenvLessScope_BuildJob = ir['jobs'].find((job) => job['id'] === 'build');

    ok(buildJob !== undefined, 'the build job exists');

    const plainStep: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AddsNoStepForADotenvLessScope_PlainStep = buildJob['steps'].find((step) => step['name'] === 'Write environment file (apps-plain-app)');

    strictEqual(plainStep, undefined, 'the dotenv-less scope adds no write-env step');

    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AddsNoStepForADotenvLessScope_Result = WorkflowsBlueprint.serialize(ir);

    strictEqual(result.split('Write environment file').length - 1, 1, 'exactly one write-env step across all scopes');

    return;
  });

  it('bakes only public variables into the scope env file', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, environment);
    const buildJob: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_BuildJob = ir['jobs'].find((job) => job['id'] === 'build');

    ok(buildJob !== undefined, 'the build job exists');

    const writeEnvStep: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_WriteEnvStep = buildJob['steps'].find((step) => step['name'] === 'Write environment file (apps-public-app)');

    ok(writeEnvStep !== undefined, 'the public-app scope adds a write-env step');

    strictEqual(writeEnvStep['workingDirectory'], './apps/public-app', 'the step writes in the scope directory');

    const stepEnv: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_StepEnv = writeEnvStep['env'] ?? [];

    strictEqual(stepEnv.map((entryPair) => entryPair['key']).join(','), 'PUBLIC_SITE_KEY,PUBLIC_GTM_ID', 'only reach-build keys appear, runtime omitted');

    const siteKeyEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_SiteKeyEntry = stepEnv.find((entryPair) => entryPair['key'] === 'PUBLIC_SITE_KEY');
    const gtmEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_GtmEntry = stepEnv.find((entryPair) => entryPair['key'] === 'PUBLIC_GTM_ID');

    ok(siteKeyEntry !== undefined && gtmEntry !== undefined, 'both reach-build entries are present');

    ok(String(siteKeyEntry['value']).includes('vars.CBN_PUBLIC_SITE_KEY'), 'a reach-build var sources from its prefixed name');

    ok(String(gtmEntry['value']).includes('vars.CBN_PUBLIC_GTM_ID'), 'a build-only var sources from its prefixed name');

    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesOnlyPublicVariablesIntoTheScopeEnvFile_Result = WorkflowsBlueprint.serialize(ir);

    ok(result.includes('echo "PUBLIC_SITE_KEY=\\"$PUBLIC_SITE_KEY\\""'), 'echoes the plain public key');

    ok(result.includes('echo "PUBLIC_GTM_ID=\\"$PUBLIC_GTM_ID\\""'), 'echoes the override public key');

    ok(result.includes('SECRET_TOKEN') === false, 'never echoes the private key');

    return;
  });

  it('bakes a build default as an escaped shell fallback', () => {
    const defaultEnvironment: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_DefaultEnvironment = {
      workspaces: {
        './apps/public-app': {
          prefix: 'CBN_',
          variables: [{
            key: 'PUBLIC_REGION',
            secret: false,
            reach: 'build',
            defaultValue: 'x"$y',
          }],
        },
      },
    };
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, defaultEnvironment);
    const buildJob: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_BuildJob = ir['jobs'].find((job) => job['id'] === 'build');

    ok(buildJob !== undefined, 'the build job exists');

    const writeEnvStep: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_WriteEnvStep = buildJob['steps'].find((step) => step['name'] === 'Write environment file (apps-public-app)');

    ok(writeEnvStep !== undefined, 'the public-app scope adds a write-env step');

    const stepEnv: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_StepEnv = writeEnvStep['env'] ?? [];
    const regionEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_RegionEntry = stepEnv.find((entryPair) => entryPair['key'] === 'PUBLIC_REGION');

    ok(regionEntry !== undefined, 'the reach-build default entry is present');

    ok(String(regionEntry['value']).includes('vars.CBN_PUBLIC_REGION'), 'the default var sources from its prefixed name');

    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_Result = WorkflowsBlueprint.serialize(ir);

    // Assemble the "${" opener with the join trick so the literal placeholder
    // does not trip the template-curly lint rule.
    const dollarBrace: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_DollarBrace = [
      '$',
      '{',
    ].join('');
    const expectedFallback: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_BakesABuildDefaultAsAnEscapedShellFallback_ExpectedFallback = `echo "PUBLIC_REGION=\\"${dollarBrace}PUBLIC_REGION:-x\\"\\$y}\\""`;

    ok(result.includes(expectedFallback), `expected an escaped shell default fallback; got: ${result}`);

    return;
  });

  const defaultsEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_DefaultsEntry = {
    template: 'publish',
    runsOn: 'ubuntu-24.04',
    name: 'project',
    triggers: ['release'],
    build: ['./apps/plain-app'],
    deploy: [{
      to: 'npm',
      path: './apps/plain-app',
    }],
  };

  it('uses pnpm for Corepack installs and Nova workspace commands', (): Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_UsesPnpmForCorepackInstallsAndNovaWorkspaceCommands_Returns => {
    ok(
      WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish(defaultsEntry, workspaces, {}, [], 'pnpm')).includes([
        'corepack enable pnpm',
        '          pnpm install',
      ].join('\n')),
      'the install step enables and runs pnpm',
    );

    ok(
      WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish(defaultsEntry, workspaces, {}, [], 'pnpm')).includes('pnpm run check'),
      'the root check uses pnpm',
    );

    ok(
      WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish(defaultsEntry, workspaces, {}, [], 'pnpm')).includes('pnpm run build -- --workspace plain-app-app'),
      'the workspace build uses Nova',
    );

    return;
  });

  it('uses Yarn for Corepack installs and Nova workspace commands', (): Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_UsesYarnForCorepackInstallsAndNovaWorkspaceCommands_Returns => {
    ok(
      WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish(defaultsEntry, workspaces, {}, [], 'yarn')).includes([
        'corepack enable yarn',
        '          yarn install',
      ].join('\n')),
      'the install step enables and runs Yarn',
    );

    ok(
      WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish(defaultsEntry, workspaces, {}, [], 'yarn')).includes('yarn run build -- --workspace plain-app-app'),
      'the workspace build uses Nova',
    );

    ok(
      WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish(defaultsEntry, workspaces, {}, [], 'yarn')).includes('yarn run check'),
      'the root check uses Yarn',
    );

    return;
  });

  it('keeps the current job-level defaults', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_Ir = WorkflowsBlueprint.buildPublish(defaultsEntry, workspaces);
    const buildJob: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_BuildJob = ir['jobs'].find((job) => job['id'] === 'build');
    const deployJob: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_DeployJob = ir['jobs'].find((job) => job['id'] === 'publish-npm-apps-plain-app');

    ok(buildJob !== undefined && deployJob !== undefined, 'both jobs exist');

    strictEqual(buildJob['runsOn'], 'ubuntu-latest', 'the build job keeps the default runner');

    strictEqual(buildJob['timeoutMinutes'], 15, 'the build job keeps the 15 minute default');

    strictEqual(deployJob['runsOn'], 'ubuntu-latest', 'the deploy job keeps the default runner');

    strictEqual(deployJob['timeoutMinutes'], 15, 'the deploy job keeps the 15 minute default');

    const serializedDefaults: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_SerializedDefaults = WorkflowsBlueprint.serialize(ir);

    strictEqual(serializedDefaults.split('        timeout-minutes:').length - 1, ir['jobs'].flatMap((job) => job['steps']).length, 'every generated step has a timeout');

    ok(serializedDefaults.includes([
      '- name: "Checkout repository"',
      '        uses:',
    ].join('\n')), 'checkout steps are serialized');
    ok(serializedDefaults.includes('        timeout-minutes: 5'), 'five-minute step defaults are serialized');
    ok(serializedDefaults.includes([
      '- name: "Install packages"',
      '        timeout-minutes: 15',
    ].join('\n')), 'install steps clamp to the fifteen-minute job');
    ok(serializedDefaults.includes([
      '- name: "Build project"',
      '        timeout-minutes: 15',
    ].join('\n')), 'build steps default to fifteen minutes');
    ok(serializedDefaults.includes([
      '- name: "Publish package to npm"',
      '        timeout-minutes: 15',
    ].join('\n')), 'deploy steps default to fifteen minutes');

    const setupStep: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_SetupStep = buildJob['steps'].find((step) => step['name'] === 'Setup Node.js');

    ok(setupStep !== undefined, 'the setup-node step exists');

    const nodeVersionEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_NodeVersionEntry = (setupStep['with'] ?? []).find((withEntry) => withEntry['key'] === 'node-version-file');
    const cacheEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_CacheEntry = (setupStep['with'] ?? []).find((withEntry) => withEntry['key'] === 'package-manager-cache');

    ok(nodeVersionEntry !== undefined && cacheEntry !== undefined, 'both setup-node entries exist');

    // Assemble the default expression with the join trick so the literal
    // "${" placeholder does not trip the template-curly lint rule.
    const dollarBrace: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_KeepsTheCurrentJobLevelDefaults_DollarBrace = [
      '$',
      '{',
    ].join('');

    strictEqual(nodeVersionEntry['value'], `${dollarBrace}{ env.ROOT_DIR }}/package.json`, 'the default node-version-file is the ROOT_DIR expression');

    strictEqual(cacheEntry['value'], false, 'the default package-manager-cache is false');

    return;
  });

  it('merges the release-only publish condition and run-name', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheReleaseOnlyPublishConditionAndRunName_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces);

    // Assemble the expected expressions with the join trick so the literal
    // "${" placeholder does not trip the template-curly lint rule.
    const dollarBrace: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheReleaseOnlyPublishConditionAndRunName_DollarBrace = [
      '$',
      '{',
    ].join('');

    const publishEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheReleaseOnlyPublishConditionAndRunName_PublishEntry = ir['env'].find((envEntry) => envEntry['key'] === 'PUBLISH');

    ok(publishEntry !== undefined, 'the PUBLISH env entry exists');

    strictEqual(publishEntry['value'], `${dollarBrace}{ github.event_name == 'release' || (github.event_name == 'workflow_dispatch' && !inputs.dry-run) }}`, 'the release-only PUBLISH merge is byte-exact');

    strictEqual(ir['runName'], `Publishing ${dollarBrace}{ github.event.release.tag_name || 'manually' }} (project)${dollarBrace}{ github.event_name == 'workflow_dispatch' && inputs.dry-run && ' (dry run)' || '' }}`, 'the release-only run-name merge is byte-exact');

    return;
  });

  const tagPushEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_TagPushEntry = {
    template: 'publish',
    runsOn: 'ubuntu-24.04',
    name: 'project',
    triggers: ['tag-push'],
    build: ['./apps/plain-app'],
    deploy: [{
      to: 'npm',
      path: './apps/plain-app',
    }],
  };

  it('merges the tag-push-only publish condition and run-name', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheTagPushOnlyPublishConditionAndRunName_Ir = WorkflowsBlueprint.buildPublish(tagPushEntry, workspaces);

    strictEqual(ir['on'].map((trigger) => trigger['event']).join(','), 'push,workflow_dispatch', 'the tag push node precedes the dispatch node');

    // Assemble the expected expressions with the join trick so the literal
    // "${" placeholder does not trip the template-curly lint rule.
    const dollarBrace: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheTagPushOnlyPublishConditionAndRunName_DollarBrace = [
      '$',
      '{',
    ].join('');

    const publishEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheTagPushOnlyPublishConditionAndRunName_PublishEntry = ir['env'].find((envEntry) => envEntry['key'] === 'PUBLISH');

    ok(publishEntry !== undefined, 'the PUBLISH env entry exists');

    strictEqual(publishEntry['value'], `${dollarBrace}{ (github.event_name == 'push' && startsWith(github.ref, 'refs/tags/')) || (github.event_name == 'workflow_dispatch' && !inputs.dry-run) }}`, 'the tag-push part is parenthesized');

    strictEqual(ir['runName'], `Publishing ${dollarBrace}{ (github.event_name == 'push' && startsWith(github.ref, 'refs/tags/') && github.ref_name) || 'manually' }} (project)${dollarBrace}{ github.event_name == 'workflow_dispatch' && inputs.dry-run && ' (dry run)' || '' }}`, 'the tag-push run-name falls back to manually');

    return;
  });

  // The config type carries triggers as strings so the old generator still
  // type-checks; the object push trigger is authored on the widened test
  // entry, mirroring how the blueprint reads { name, branches } forms.
  const releasePushEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ReleasePushEntry = {
    template: 'publish',
    runsOn: 'ubuntu-24.04',
    name: 'project',
    triggers: [
      'release',
      {
        name: 'push',
        branches: ['main'],
      },
    ],
    build: ['./apps/plain-app'],
    deploy: [{
      to: 'npm',
      path: './apps/plain-app',
    }],
  };
  const releasePushEntryForBuild: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ReleasePushEntryForBuild = releasePushEntry;

  it('merges release and push triggers in config order', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndPushTriggersInConfigOrder_Ir = WorkflowsBlueprint.buildPublish(releasePushEntryForBuild, workspaces);

    strictEqual(ir['on'].map((trigger) => trigger['event']).join(','), 'release,push,workflow_dispatch', 'the on nodes follow config order');

    // Assemble the expected expressions with the join trick so the literal
    // "${" placeholder does not trip the template-curly lint rule.
    const dollarBrace: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndPushTriggersInConfigOrder_DollarBrace = [
      '$',
      '{',
    ].join('');

    const publishEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndPushTriggersInConfigOrder_PublishEntry = ir['env'].find((envEntry) => envEntry['key'] === 'PUBLISH');

    ok(publishEntry !== undefined, 'the PUBLISH env entry exists');

    strictEqual(publishEntry['value'], `${dollarBrace}{ github.event_name == 'release' || (github.event_name == 'push' && startsWith(github.ref, 'refs/heads/')) || (github.event_name == 'workflow_dispatch' && !inputs.dry-run) }}`, 'the merged PUBLISH keeps the release part bare');

    strictEqual(ir['runName'], `Publishing ${dollarBrace}{ github.event.release.tag_name || (github.event_name == 'push' && startsWith(github.ref, 'refs/heads/') && github.ref_name) || 'manually' }} (project)${dollarBrace}{ github.event_name == 'workflow_dispatch' && inputs.dry-run && ' (dry run)' || '' }}`, 'the merged run-name chains the parts');

    return;
  });

  // The tag-push string and the object push trigger both emit push nodes;
  // the widened test entry mirrors how the blueprint reads the mixed
  // string-and-object trigger forms.
  const tagBranchPushEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_TagBranchPushEntry = {
    template: 'publish',
    runsOn: 'ubuntu-24.04',
    name: 'project',
    triggers: [
      'tag-push',
      {
        name: 'push',
        branches: ['main'],
      },
    ],
    build: ['./apps/plain-app'],
    deploy: [{
      to: 'npm',
      path: './apps/plain-app',
    }],
  };
  const tagBranchPushEntryForBuild: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_TagBranchPushEntryForBuild = tagBranchPushEntry;

  it('merges tag push and branch push into a single push node', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTagPushAndBranchPushIntoASinglePushNode_Ir = WorkflowsBlueprint.buildPublish(tagBranchPushEntryForBuild, workspaces);

    strictEqual(ir['on'].map((trigger) => trigger['event']).join(','), 'push,workflow_dispatch', 'the merged push node precedes the dispatch node');

    const pushNode: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTagPushAndBranchPushIntoASinglePushNode_PushNode = ir['on'].find((trigger) => trigger['event'] === 'push');

    ok(pushNode !== undefined, 'the push node exists');

    strictEqual((pushNode['tags'] ?? []).join(','), 'v*', 'the merged push node keeps the tag filter');

    strictEqual((pushNode['branches'] ?? []).join(','), 'main', 'the merged push node keeps the branch filter');

    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTagPushAndBranchPushIntoASinglePushNode_Result = WorkflowsBlueprint.serialize(ir);
    const pushKeyLines: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTagPushAndBranchPushIntoASinglePushNode_PushKeyLines = result.split('\n').filter((line) => line === '  push:');

    strictEqual(pushKeyLines.length, 1, 'the on-block emits exactly one push mapping key');

    return;
  });

  // The chained entries reference the sibling release publish by its
  // template-name key, carried on the workflow-run trigger as "workflows".
  const workflowRunSiblings: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_WorkflowRunSiblings = [{
    template: 'publish',
    runsOn: 'ubuntu-24.04',
    name: 'core',
    triggers: ['release'],
    build: ['./apps/plain-app'],
    deploy: [{
      to: 'npm',
      path: './apps/plain-app',
    }],
  }];
  const workflowRunEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_WorkflowRunEntry = {
    'template': 'publish',
    'name': 'addon',
    'triggers': [{
      name: 'workflow-run-success',
      workflows: ['publish-core'],
    }],
    'runsOn': 'ubuntu-24.04',
    'build': ['./apps/plain-app'],
    'deploy': [{
      to: 'npm',
      path: './apps/plain-app',
    }],
  };

  it('merges the workflow-run publish condition and run-name', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheWorkflowRunPublishConditionAndRunName_Ir = WorkflowsBlueprint.buildPublish(workflowRunEntry, workspaces, {}, workflowRunSiblings);

    strictEqual(ir['on'].map((trigger) => trigger['event']).join(','), 'workflow_run,workflow_dispatch', 'the workflow run node precedes the dispatch node');

    const workflowRunNode: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheWorkflowRunPublishConditionAndRunName_WorkflowRunNode = ir['on'].find((trigger) => trigger['event'] === 'workflow_run');

    ok(workflowRunNode !== undefined, 'the workflow run node exists');

    strictEqual(workflowRunNode['workflows'].join(','), 'Publish (core)', 'the depends-on reference resolves to the sibling display name');

    // Assemble the expected expressions with the join trick so the literal
    // "${" placeholder does not trip the template-curly lint rule.
    const dollarBrace: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheWorkflowRunPublishConditionAndRunName_DollarBrace = [
      '$',
      '{',
    ].join('');

    const publishEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesTheWorkflowRunPublishConditionAndRunName_PublishEntry = ir['env'].find((envEntry) => envEntry['key'] === 'PUBLISH');

    ok(publishEntry !== undefined, 'the PUBLISH env entry exists');

    strictEqual(publishEntry['value'], `${dollarBrace}{ github.event_name == 'workflow_run' || (github.event_name == 'workflow_dispatch' && !inputs.dry-run) }}`, 'the workflow-run PUBLISH merge is byte-exact');

    strictEqual(ir['runName'], `Publishing ${dollarBrace}{ github.event.workflow_run.head_branch || 'manually' }} (addon)${dollarBrace}{ github.event_name == 'workflow_dispatch' && inputs.dry-run && ' (dry run)' || '' }}`, 'the workflow-run run-name merge is byte-exact');

    return;
  });

  it('gates every job on the success conclusion', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_Ir = WorkflowsBlueprint.buildPublish(workflowRunEntry, workspaces, {}, workflowRunSiblings);

    // Assemble the expected expression with the join trick so the literal
    // "${" placeholder does not trip the template-curly lint rule.
    const dollarBrace: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_DollarBrace = [
      '$',
      '{',
    ].join('');
    const expected: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_Expected = `${dollarBrace}{ github.event_name != 'workflow_run' || github.event.workflow_run.conclusion == 'success' }}`;

    strictEqual(ir['jobs'].map((job) => job['if']).join('|'), `${expected}|${expected}`, 'the build job and the deploy job share the identical gate');

    const result: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_Result = WorkflowsBlueprint.serialize(ir);
    const ifLines: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheSuccessConclusion_IfLines = result.split('\n').filter((line) => line === `    if: "${expected}"`);

    strictEqual(ifLines.length, 2, 'each job renders the gate between permissions and steps');

    return;
  });

  const workflowRunFailureEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_WorkflowRunFailureEntry = {
    'template': 'publish',
    'name': 'addon',
    'triggers': [{
      name: 'workflow-run-failure',
      workflows: ['publish-core'],
    }],
    'runsOn': 'ubuntu-24.04',
    'build': ['./apps/plain-app'],
    'deploy': [{
      to: 'npm',
      path: './apps/plain-app',
    }],
  };

  it('gates every job on the failure conclusion for the failure variant', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheFailureConclusionForTheFailureVariant_Ir = WorkflowsBlueprint.buildPublish(workflowRunFailureEntry, workspaces, {}, workflowRunSiblings);
    const buildJob: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_GatesEveryJobOnTheFailureConclusionForTheFailureVariant_BuildJob = ir['jobs'].find((job) => job['id'] === 'build');

    ok(buildJob !== undefined, 'the build job exists');

    ok(String(buildJob['if']).includes('github.event.workflow_run.conclusion == \'failure\''), 'the failure variant gates on the failure conclusion');

    return;
  });

  const workflowRunAnyEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_WorkflowRunAnyEntry = {
    'template': 'publish',
    'name': 'addon',
    'triggers': [{
      name: 'workflow-run-any',
      workflows: ['publish-core'],
    }],
    'runsOn': 'ubuntu-24.04',
    'build': ['./apps/plain-app'],
    'deploy': [{
      to: 'npm',
      path: './apps/plain-app',
    }],
  };

  it('applies no jobs condition for the any variant', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_AppliesNoJobsConditionForTheAnyVariant_Ir = WorkflowsBlueprint.buildPublish(workflowRunAnyEntry, workspaces, {}, workflowRunSiblings);

    strictEqual(ir['jobs'].every((job) => job['if'] === undefined), true, 'no job carries an if gate');

    return;
  });

  const releaseWorkflowRunEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_ReleaseWorkflowRunEntry = {
    'template': 'publish',
    'name': 'addon',
    'triggers': [
      'release',
      {
        name: 'workflow-run-success',
        workflows: ['publish-core'],
      },
    ],
    'runsOn': 'ubuntu-24.04',
    'build': ['./apps/plain-app'],
    'deploy': [{
      to: 'npm',
      path: './apps/plain-app',
    }],
  };

  it('merges release and workflow-run parts in config order', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndWorkflowRunPartsInConfigOrder_Ir = WorkflowsBlueprint.buildPublish(releaseWorkflowRunEntry, workspaces, {}, workflowRunSiblings);

    strictEqual(ir['on'].map((trigger) => trigger['event']).join(','), 'release,workflow_run,workflow_dispatch', 'the on nodes follow config order');

    // Assemble the expected expressions with the join trick so the literal
    // "${" placeholder does not trip the template-curly lint rule.
    const dollarBrace: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndWorkflowRunPartsInConfigOrder_DollarBrace = [
      '$',
      '{',
    ].join('');

    const publishEntry: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintBuildPublish_MergesReleaseAndWorkflowRunPartsInConfigOrder_PublishEntry = ir['env'].find((envEntry) => envEntry['key'] === 'PUBLISH');

    ok(publishEntry !== undefined, 'the PUBLISH env entry exists');

    strictEqual(publishEntry['value'], `${dollarBrace}{ github.event_name == 'release' || github.event_name == 'workflow_run' || (github.event_name == 'workflow_dispatch' && !inputs.dry-run) }}`, 'the merged PUBLISH chains both parts');

    strictEqual(ir['runName'], `Publishing ${dollarBrace}{ github.event.release.tag_name || github.event.workflow_run.head_branch || 'manually' }} (addon)${dollarBrace}{ github.event_name == 'workflow_dispatch' && inputs.dry-run && ' (dry run)' || '' }}`, 'the merged run-name chains both parts');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - Emit Runtime Sync Step.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.emitRuntimeSyncStep', () => {
  const emit: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintEmitRuntimeSyncStep_Emit = Reflect.get(WorkflowsBlueprint, 'emitRuntimeSyncStep') as Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintEmitRuntimeSyncStep_Emit;

  it('returns undefined when the target declares no runtime values', () => {
    const step: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintEmitRuntimeSyncStep_ReturnsUndefinedWhenTheTargetDeclaresNoRuntimeValues_Step = emit({
      vendor: 'cloudflare',
      runtimeValues: [],
      workingDir: './apps/api',
      extraEnv: [],
    });

    strictEqual(step, undefined, 'a target with no runtime values gets no sync step');

    return;
  });

  it('routes a cloudflare secret through the encrypted channel and a variable through the deploy channel', () => {
    const step: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintEmitRuntimeSyncStep_RoutesACloudflareSecretThroughTheEncryptedChannelAndAVariableThroughTheDeployChannel_Step = emit({
      vendor: 'cloudflare',
      runtimeValues: [
        {
          key: 'SESSION_SECRET',
          name: 'API_SESSION_SECRET',
          secret: true,
        },
        {
          key: 'AWS_REGION',
          name: 'API_AWS_REGION',
          secret: false,
        },
      ],
      workingDir: './apps/api',
      extraEnv: [],
    });

    ok(step !== undefined, 'a target with runtime values gets a sync step');

    strictEqual(step['name'], 'Sync worker runtime secrets', 'the worker sync step keeps its name');

    // The Secret enters from the encrypted store, the Variable from the plaintext store.
    deepStrictEqual((step['env'] ?? []).map((entry) => entry['key']), [
      'SESSION_SECRET',
      'AWS_REGION',
    ], 'both runtime values are on the step env');
    ok(((step['env'] ?? [])[0] ?? { value: '' })['value'].includes('secrets.API_SESSION_SECRET'), 'the secret sources from the secrets store');
    ok(((step['env'] ?? [])[1] ?? { value: '' })['value'].includes('vars.API_AWS_REGION'), 'the variable sources from the vars store');

    // The Secret rides the encrypted bulk channel; the Variable rides a deploy --var.
    ok((step['run'] ?? '').includes('| npx wrangler secret bulk /dev/stdin'), 'the secret rides wrangler secret bulk');
    ok((step['run'] ?? '').includes('npx wrangler deploy --var AWS_REGION:"$AWS_REGION"'), 'the variable rides wrangler deploy --var');

    return;
  });

  it('routes a vercel secret through the sensitive channel and a variable through the plain channel', () => {
    const step: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintEmitRuntimeSyncStep_RoutesAVercelSecretThroughTheSensitiveChannelAndAVariableThroughThePlainChannel_Step = emit({
      vendor: 'vercel',
      runtimeValues: [
        {
          key: 'SESSION_SECRET',
          name: 'API_SESSION_SECRET',
          secret: true,
        },
        {
          key: 'AWS_REGION',
          name: 'API_AWS_REGION',
          secret: false,
        },
      ],
      workingDir: './apps/api',
      extraEnv: [{
        key: 'VERCEL_TOKEN',
        value: 'placeholder',
      }],
    });

    ok(step !== undefined, 'a target with runtime values gets a sync step');

    strictEqual(step['name'], 'Sync Vercel runtime environment', 'the vercel sync step keeps its name');

    // Token env leads, then both runtime values, secret then variable, from their stores.
    deepStrictEqual((step['env'] ?? []).map((entry) => entry['key']), [
      'VERCEL_TOKEN',
      'SESSION_SECRET',
      'AWS_REGION',
    ], 'the token leads the runtime values on the step env');
    ok(((step['env'] ?? [])[1] ?? { value: '' })['value'].includes('secrets.API_SESSION_SECRET'), 'the secret sources from the secrets store');
    ok(((step['env'] ?? [])[2] ?? { value: '' })['value'].includes('vars.API_AWS_REGION'), 'the variable sources from the vars store');

    // Removal runs once over the declared union, both names together.
    ok((step['run'] ?? '').includes('DECLARED="SESSION_SECRET AWS_REGION"'), 'both values are declared for the removal loop');

    // The Secret re-adds on the sensitive channel under its own declared list.
    ok((step['run'] ?? '').includes('SECRET_DECLARED="SESSION_SECRET"'), 'the secret has its own declared list');
    ok((step['run'] ?? '').includes('vercel env add "$name" production --sensitive --token="$VERCEL_TOKEN"'), 'the secret rides the sensitive channel');

    // The Variable re-adds on the plain channel (no --sensitive) under its own declared list.
    ok((step['run'] ?? '').includes('VAR_DECLARED="AWS_REGION"'), 'the variable has its own declared list');
    ok((step['run'] ?? '').includes('vercel env add "$name" production --token="$VERCEL_TOKEN"'), 'the variable rides the plain channel');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint - App Build Values.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprint.appBuildValues', () => {
  const buildValues: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_BuildValues = Reflect.get(WorkflowsBlueprint, 'appBuildValues') as Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_BuildValues;
  const runtimeValues: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_RuntimeValues = Reflect.get(WorkflowsBlueprint, 'appRuntimeValues') as Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_RuntimeValues;

  it('splits app values by reach and derives prefixed names', () => {
    const environment: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_SplitsAppValuesByReachAndDerivesPrefixedNames_Environment = {
      workspaces: {
        './apps/cbnventures': {
          prefix: 'CBN_',
          variables: [
            {
              key: 'PUBLIC_X',
              secret: false,
              reach: 'build',
            },
            {
              key: 'REGION',
              secret: false,
              reach: 'runtime',
            },
            {
              key: 'SECRET_Y',
              secret: true,
              reach: 'runtime',
            },
          ],
        },
      },
    };

    // appBuildValues keeps only reach:'build' values; appRuntimeValues keeps reach:'runtime'.
    // Both derive name = prefix + key and carry secret through unchanged (it only picks the source).
    deepStrictEqual(buildValues(environment, './apps/cbnventures'), [{
      key: 'PUBLIC_X',
      name: 'CBN_PUBLIC_X',
      secret: false,
    }]);

    deepStrictEqual(runtimeValues(environment, './apps/cbnventures'), [
      {
        key: 'REGION',
        name: 'CBN_REGION',
        secret: false,
      },
      {
        key: 'SECRET_Y',
        name: 'CBN_SECRET_Y',
        secret: true,
      },
    ]);

    return;
  });

  it('carries a non-secret build default and bakes it as a shell fallback', () => {
    const writeEnvRun: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_CarriesANonSecretBuildDefaultAndBakesItAsAShellFallback_WriteEnvRun = Reflect.get(WorkflowsBlueprint, 'writeEnvRun') as Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_CarriesANonSecretBuildDefaultAndBakesItAsAShellFallback_WriteEnvRun;
    const environment: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_CarriesANonSecretBuildDefaultAndBakesItAsAShellFallback_Environment = {
      workspaces: {
        './apps/cbnventures': {
          prefix: 'CBN_',
          variables: [{
            key: 'PUBLIC_REGION',
            secret: false,
            reach: 'build',
            defaultValue: 'us-east-1',
          }],
        },
      },
    };

    // A non-secret build value carries its default through so the CI write can fall back to it.
    const values: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_CarriesANonSecretBuildDefaultAndBakesItAsAShellFallback_Values = buildValues(environment, './apps/cbnventures');

    deepStrictEqual(values, [{
      key: 'PUBLIC_REGION',
      name: 'CBN_PUBLIC_REGION',
      secret: false,
      defaultValue: 'us-east-1',
    }]);

    // The echoed line uses the shell default form so an unset Variable bakes "us-east-1".
    const run: Tests_Cli_Generate_Github_WorkflowsBlueprint_WorkflowsBlueprintAppBuildValues_CarriesANonSecretBuildDefaultAndBakesItAsAShellFallback_Run = writeEnvRun(values);

    ok(run.includes('PUBLIC_REGION:-us-east-1}') === true, `expected a shell default fallback for PUBLIC_REGION; got: ${run}`);

    return;
  });

  return;
});
