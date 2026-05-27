import type { PromptObject } from 'prompts';

import type {
  Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options,
  Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Returns,
} from '../../../cli/utility/initialize.d.ts';

/**
 * Tests - CLI - Utility - Initialize - Is Non Empty Literal Input.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_Result = true | string;

/**
 * Tests - CLI - Utility - Initialize - Prompt Workspaces Form Display Name Capture.
 *
 * @since 0.18.0
 */
export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_CapturedQuestion = PromptObject;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_CapturedQuestions = Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_CapturedQuestion[];

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswer = unknown;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswers = Record<string, Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswer>;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockQuestionsArg = PromptObject | PromptObject[];

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question = Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_CapturedQuestion;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_RawName = unknown;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Name = string;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_HasAnswer = boolean;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Answer = Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswer;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockResponse = Record<string, Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswer>;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form = (options: Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options) => Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Returns;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormOptions = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormResult = Awaited<Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Returns>;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_DisplayNameQuestion = PromptObject | undefined;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_QuestionIndex = number;

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ExistingWorkspace = Cli_Utility_Initialize_Runner_PromptWorkspacesForm_Options['existingWorkspace'];

export type Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_DisplayNameInitial = unknown;

/**
 * Tests - CLI - Utility - Initialize - Run.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_OriginalCwd = string;

export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryDirectory = string;

export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryPrefix = string;

export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_SandboxRoot = string;

export type Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_ProjectDirectory = string;
