import type { PromptObject } from 'prompts';

import type {
  CliUtilityInitializePromptWorkspacesFormOptions,
  CliUtilityInitializePromptWorkspacesFormReturns,
} from '../../../cli/utility/initialize.d.ts';

/**
 * Tests - CLI - Utility - Initialize - Is Non Empty Literal Input.
 *
 * @since 0.18.0
 */
export type TestsCliUtilityInitializeIsNonEmptyLiteralInputResult = true | string;

/**
 * Tests - CLI - Utility - Initialize - Prompt Workspaces Form Display Name Capture.
 *
 * @since 0.18.0
 */
export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureCapturedQuestion = PromptObject;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureCapturedQuestions = TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureCapturedQuestion[];

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswer = unknown;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswers = Record<string, TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswer>;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockQuestionsArg = PromptObject | PromptObject[];

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion = TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureCapturedQuestion;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureRawName = unknown;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureName = string;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureHasAnswer = boolean;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureAnswer = TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswer;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockResponse = Record<string, TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswer>;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm = (options: CliUtilityInitializePromptWorkspacesFormOptions) => CliUtilityInitializePromptWorkspacesFormReturns;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormOptions = CliUtilityInitializePromptWorkspacesFormOptions;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormResult = Awaited<CliUtilityInitializePromptWorkspacesFormReturns>;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureDisplayNameQuestion = PromptObject | undefined;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestionIndex = number;

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureExistingWorkspace = CliUtilityInitializePromptWorkspacesFormOptions['existingWorkspace'];

export type TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureDisplayNameInitial = unknown;

/**
 * Tests - CLI - Utility - Initialize - Run.
 *
 * @since 0.14.0
 */
export type TestsCliUtilityInitializeRunOriginalCwd = string;

export type TestsCliUtilityInitializeRunTemporaryDirectory = string;

export type TestsCliUtilityInitializeRunTemporaryPrefix = string;

export type TestsCliUtilityInitializeRunSandboxRoot = string;

export type TestsCliUtilityInitializeRunProjectDirectory = string;
