import type { vi } from 'vitest';

import type { Shared_ScaffoldTemplateQuestions } from '../../shared.d.ts';

/**
 * Tests - Lib - Scaffold Presentation - Questions.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_Questions = Shared_ScaffoldTemplateQuestions;

/**
 * Tests - Lib - Scaffold Presentation - Confirm Scaffold Plan - Honors Interactive Confirmation.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_HonorsInteractiveConfirmation_Accepted = boolean;

export type Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_HonorsInteractiveConfirmation_Rejected = boolean;

/**
 * Tests - Lib - Scaffold Presentation - Confirm Scaffold Plan - Skips Prompts For Automation And Previews.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_SkipsPromptsForAutomationAndPreviews_Automated = boolean;

export type Tests_Lib_ScaffoldPresentation_ConfirmScaffoldPlan_SkipsPromptsForAutomationAndPreviews_Preview = boolean;

/**
 * Tests - Lib - Scaffold Presentation - Create Scaffold Progress - Advances Only After A Stage Completes.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Complete = () => Promise<void>;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Finish_Label = string;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Finish = (label: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Finish_Label) => void;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Start_Label = string;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Start_Detail = string;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Start = (label: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Start_Label, detail?: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Start_Detail) => void;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress = {
  complete: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Complete;
  finish: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Finish;
  start: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_Progress_Start;
};

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_ActiveOutput = string;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_AdvancesOnlyAfterAStageCompletes_CompletedOutput = string;

/**
 * Tests - Lib - Scaffold Presentation - Create Scaffold Progress - Reports Plain Durable Stages Outside A Terminal.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Complete = () => Promise<void>;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Finish_Label = string;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Finish = (label: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Finish_Label) => void;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Start_Label = string;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Start_Detail = string;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Start = (label: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Start_Label, detail?: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Start_Detail) => void;

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress = {
  complete: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Complete;
  finish: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Finish;
  start: Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Progress_Start;
};

export type Tests_Lib_ScaffoldPresentation_CreateScaffoldProgress_ReportsPlainDurableStagesOutsideATerminal_Output = string;

/**
 * Tests - Lib - Scaffold Presentation - Prompts Mock Module.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_Prompts_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Lib_ScaffoldPresentation_Prompts_MockModule = Readonly<{
  default: Tests_Lib_ScaffoldPresentation_Prompts_MockModule_Default;
}>;

/**
 * Tests - Lib - Scaffold Presentation - Report Scaffold Completion - Reports Copyable Workspace Commands.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_ReportScaffoldCompletion_ReportsCopyableWorkspaceCommands_Output = string;

/**
 * Tests - Lib - Scaffold Presentation - Report Scaffold Completion - Reports Dry Run Without Commands.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_ReportScaffoldCompletion_ReportsDryRunWithoutCommands_Output = string;

/**
 * Tests - Lib - Scaffold Presentation - Report Scaffold Plan - Reports Resolved Choices And Hides Inactive Choices.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_ReportScaffoldPlan_ReportsResolvedChoicesAndHidesInactiveChoices_Output = string;

/**
 * Tests - Lib - Scaffold Presentation - Resolve Display Path - Uses A Dot For The Current Directory.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_ResolveDisplayPath_UsesADotForTheCurrentDirectory_CurrentDirectory = string;

/**
 * Tests - Lib - Scaffold Presentation - Resolve Scaffold Install - Defaults To Install.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_ResolveScaffoldInstall_DefaultsToInstall_Result = boolean;

/**
 * Tests - Lib - Scaffold Presentation - Resolve Scaffold Install - Honors Explicit Choices.
 *
 * @since 0.31.0
 */
export type Tests_Lib_ScaffoldPresentation_ResolveScaffoldInstall_HonorsExplicitChoices_ExplicitYes = boolean;

export type Tests_Lib_ScaffoldPresentation_ResolveScaffoldInstall_HonorsExplicitChoices_ExplicitNo = boolean;
