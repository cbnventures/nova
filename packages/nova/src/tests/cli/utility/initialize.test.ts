import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import prompts from 'prompts';
import {
  afterAll,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliUtilityInitialize } from '../../../cli/utility/initialize.js';
import { libEnvGithub } from '../../../lib/env-github.js';
import { libEnvReconcile } from '../../../lib/env-reconcile.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import * as toolkit from '../../../toolkit/index.js';

import type {
  Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTheErrorMessageForAnEmptyString_Result,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTheErrorMessageForNonStringInput_Result,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTheErrorMessageForWhitespaceOnlyInput_Result,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTrueForANonEmptyString_Result,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_OriginalCwd,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_SandboxRoot,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryDirectory,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryPrefix,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_Config,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_GlobalVariables,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_Next,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_PromptEnvironment,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_Responses,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_CapturedQuestions,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Config,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_GlobalBlock,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Next,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Question,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_RemoveQuestion,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Responses,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Answer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Form,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_FormOptions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_FormResult,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_HasAnswer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Name,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Question,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_RawName,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Response,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_ScriptedAnswers,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Answer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_CapturedQuestions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_DisplayNameIndex,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_DisplayNameQuestion,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Form,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_FormOptions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_FormResult,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_HasAnswer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Name,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_NameIndex,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Question,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_RawName,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Response,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_ScriptedAnswers,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Answer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Form,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_FormOptions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_FormResult,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_HasAnswer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Name,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Question,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_RawName,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Response,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_ScriptedAnswers,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Answer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_CapturedQuestions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_DisplayNameQuestion,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Form,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_FormOptions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_HasAnswer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Initial,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Name,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Question,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_RawName,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Response,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_ScriptedAnswers,
  Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_AppDirectory,
  Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Config,
  Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_CwdSpy,
  Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_EnvContents,
  Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Filled,
  Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_ReadLocalFilledKeys,
  Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_SandboxRoot,
  Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ApplySpy,
  Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_Config,
  Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock,
  Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeReturn,
  Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeSpy,
  Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_PromptEnvironmentReconcile,
  Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ReadSpy,
  Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_WarnCalls,
  Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathSpy,
  Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget,
  Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Config,
  Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_LoadSpy,
  Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_ReadSpy,
  Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Runner,
  Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_SaveSpy,
} from '../../../types/tests/cli/utility/initialize.test.d.ts';

vi.mock('prompts', () => {
  return {
    default: vi.fn(),
  };
});

/**
 * Tests - CLI - Utility - Initialize - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityInitialize.run', async () => {
  const originalCwd: Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_SetsExitCodeWhenNotAtProjectRoot_ProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliUtilityInitialize.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Initialize - Prompt Workspaces Form Display Name Capture.
 *
 * @since 0.18.0
 */
describe('prompt workspaces form display name capture', () => {
  it('prompts for workspaceDisplayName and persists the captured value', async () => {
    const capturedQuestions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_CapturedQuestions = [];
    const scriptedAnswers: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_ScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: 'Test Display',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Question : questions;

      capturedQuestions.push(question);

      const rawName: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_RawName = question['name'];
      const name: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Name = (typeof rawName === 'string') ? rawName : '';
      const hasAnswer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_HasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Answer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Response = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Form = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_Form;

    const formOptions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_FormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace: undefined,
      existingPackageJsonRecipes: undefined,
      projectSlug: undefined,
    };

    const formResult: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_FormResult = await form(formOptions);

    const displayNameQuestion: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_DisplayNameQuestion = capturedQuestions.find((entry) => entry['name'] === 'workspaceDisplayName');
    const nameIndex: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_NameIndex = capturedQuestions.findIndex((entry) => entry['name'] === 'workspaceName');
    const displayNameIndex: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PromptsForWorkspaceDisplayNameAndPersistsTheCapturedValue_DisplayNameIndex = capturedQuestions.findIndex((entry) => entry['name'] === 'workspaceDisplayName');

    ok(displayNameQuestion !== undefined, 'Expected a workspaceDisplayName question to be presented');
    ok(
      nameIndex !== -1
      && displayNameIndex !== -1
      && nameIndex < displayNameIndex,
      'Expected workspaceName to be presented before workspaceDisplayName',
    );

    strictEqual(displayNameQuestion['type'], 'text');
    strictEqual(formResult['action'], 'apply');

    if (formResult['action'] === 'apply') {
      strictEqual(formResult['workspace']['displayName'], 'Test Display');
    }

    return;
  });

  it('omits displayName when input is whitespace only', async () => {
    const scriptedAnswers: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_ScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: '   ',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Question : questions;

      const rawName: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_RawName = question['name'];
      const name: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Name = (typeof rawName === 'string') ? rawName : '';
      const hasAnswer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_HasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Answer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Response = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Form = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_Form;

    const formOptions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_FormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace: undefined,
      existingPackageJsonRecipes: undefined,
      projectSlug: undefined,
    };

    const formResult: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_OmitsDisplayNameWhenInputIsWhitespaceOnly_FormResult = await form(formOptions);

    strictEqual(formResult['action'], 'apply');

    if (formResult['action'] === 'apply') {
      ok(Reflect.has(formResult['workspace'], 'displayName') === false, 'Expected workspace to omit displayName when input is whitespace');
    }

    return;
  });

  it('seeds displayName prompt initial from existingWorkspace.displayName', async () => {
    const capturedQuestions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_CapturedQuestions = [];
    const scriptedAnswers: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_ScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: 'Foo',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Question : questions;

      capturedQuestions.push(question);

      const rawName: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_RawName = question['name'];
      const name: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Name = (typeof rawName === 'string') ? rawName : '';
      const hasAnswer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_HasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Answer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Response = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Form = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Form;

    const formOptions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_FormOptions = {
      workspacePath: './packages/demo-app',

      // Inlined literal avoids a typed body var aliasing the foreign existingWorkspace option type (rule 7.2).
      existingWorkspace: {
        name: 'app-demo',
        displayName: 'Foo',
        role: 'app',
        policy: 'freezable',
      },
      existingPackageJsonRecipes: undefined,
      projectSlug: undefined,
    };

    await form(formOptions);

    const displayNameQuestion: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_DisplayNameQuestion = capturedQuestions.find((entry) => entry['name'] === 'workspaceDisplayName');

    ok(displayNameQuestion !== undefined, 'Expected a workspaceDisplayName question to be presented');

    const initial: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Initial = displayNameQuestion['initial'];

    strictEqual(initial, 'Foo');

    return;
  });

  it('returns back action when user cancels at displayName prompt', async () => {
    const scriptedAnswers: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_ScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceName: 'app-demo',
    };

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Question : questions;

      const rawName: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_RawName = question['name'];
      const name: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Name = (typeof rawName === 'string') ? rawName : '';

      // Simulates Ctrl+C / ESC at the workspaceDisplayName step — promptWithCancel reads an empty result as cancelled.
      if (name === 'workspaceDisplayName') {
        return Promise.resolve({});
      }

      const hasAnswer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_HasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Answer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Response = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Form = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_Form;

    const formOptions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_FormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace: undefined,
      existingPackageJsonRecipes: undefined,
      projectSlug: undefined,
    };

    const formResult: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ReturnsBackActionWhenUserCancelsAtDisplayNamePrompt_FormResult = await form(formOptions);

    strictEqual(formResult['action'], 'back');

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Initialize - Is Non Empty Literal Input.
 *
 * @since 0.18.0
 */
describe('CliUtilityInitialize.isNonEmptyLiteralInput', () => {
  it('returns the error message for an empty string', () => {
    const result: Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTheErrorMessageForAnEmptyString_Result = CliUtilityInitialize.isNonEmptyLiteralInput('');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns the error message for whitespace-only input', () => {
    const result: Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTheErrorMessageForWhitespaceOnlyInput_Result = CliUtilityInitialize.isNonEmptyLiteralInput('   ');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns true for a non-empty string', () => {
    const result: Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTrueForANonEmptyString_Result = CliUtilityInitialize.isNonEmptyLiteralInput('./action.yml');

    strictEqual(result, true);

    return;
  });

  it('returns the error message for non-string input', () => {
    const result: Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_ReturnsTheErrorMessageForNonStringInput_Result = CliUtilityInitialize.isNonEmptyLiteralInput(undefined);

    strictEqual(result, 'This field is required.');

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Initialize - Prompt Environment Section.
 *
 * @since 0.21.0
 */
describe('prompt environment section', () => {
  it('adds a global secret value', async () => {
    const responses: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_Responses = [
      {
        action: {
          kind: 'scope',
          scope: 'global',
        },
      },
      { action: { kind: 'add' } },
      { key: 'MY_SECRET' },
      { secret: true },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_Config = {};
    const promptEnvironment: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_PromptEnvironment = Reflect.get(CliUtilityInitialize, 'promptEnvironment') as Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_PromptEnvironment;

    await promptEnvironment(config);

    const globalVariables: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_GlobalVariables = (config['environment'] !== undefined && config['environment']['global'] !== undefined) ? config['environment']['global']['variables'] : undefined;

    deepStrictEqual(globalVariables, [{
      key: 'MY_SECRET',
      secret: true,
    }]);

    return;
  });

  it('prompts before removing a value', async () => {
    const responses: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Responses = [
      {
        action: {
          kind: 'scope',
          scope: 'global',
        },
      },
      {
        action: {
          kind: 'remove',
          index: 0,
        },
      },
      { confirm: true },
      { dropLocal: false },
    ];
    const capturedQuestions: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_CapturedQuestions = [];

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Question : questions;

      capturedQuestions.push(question);

      const next: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Config = {
      environment: {
        global: {
          prefix: 'G_',
          variables: [{
            key: 'OLD',
            secret: true,
          }],
        },
      },
    };
    const promptEnvironment: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment = Reflect.get(CliUtilityInitialize, 'promptEnvironment') as Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment;

    await promptEnvironment(config);

    const removeQuestion: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_RemoveQuestion = capturedQuestions.find((entry) => entry['type'] === 'confirm' && String(entry['message']).includes('Remove'));
    const globalBlock: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_GlobalBlock = (config['environment'] !== undefined) ? config['environment']['global'] : undefined;

    ok(removeQuestion !== undefined, 'Expected a removal confirmation prompt before deleting the value');
    ok(globalBlock !== undefined && globalBlock['variables'] === undefined, 'Expected the removed value to be gone from the global block');

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Initialize - Standalone Environment Status.
 *
 * @since 0.21.0
 */
describe('standalone environment status', () => {
  it('runs the status computation without entering the interactive flow', async () => {
    const config: Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Config = {
      environment: {
        global: {
          prefix: 'ACME_',
          variables: [{
            key: 'TOKEN',
            secret: true,
          }],
        },
      },
    };
    const runner: Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_Runner = CliUtilityInitialize;
    const checkPathSpy: Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathSpy = vi.spyOn(runner as Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_CheckPathTarget, 'checkPath').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(config);
    const saveSpy: Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_SaveSpy = vi.spyOn(LibNovaConfig.prototype, 'save').mockResolvedValue(undefined);
    const readSpy: Tests_Cli_Utility_Initialize_StandaloneEnvironmentStatus_RunsTheStatusComputationWithoutEnteringTheInteractiveFlow_ReadSpy = vi.spyOn(libEnvGithub, 'read').mockResolvedValue({
      available: true,
      variables: [],
      secrets: [],
    });

    vi.mocked(prompts).mockClear();

    await CliUtilityInitialize.run({ status: true });

    ok(readSpy.mock.calls.length > 0, 'Expected the standalone status to compute the GitHub status');
    ok(vi.mocked(prompts).mock.calls.length === 0, 'Expected the read-only status to skip the interactive menu');
    ok(saveSpy.mock.calls.length === 0, 'Expected the read-only status to write nothing');

    checkPathSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    readSpy.mockRestore();

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Initialize - Reconcile Stub Notice.
 *
 * @since 0.21.0
 */
describe('reconcile stub notice', () => {
  it('lists the created placeholder stubs and tells the user to set real values', async () => {
    const config: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_Config = {
      environment: {
        global: {
          prefix: 'ACME_',
          variables: [{
            key: 'TOKEN',
            secret: true,
          }],
        },
      },
    };
    const readSpy: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ReadSpy = vi.spyOn(libEnvGithub, 'read').mockResolvedValue({
      available: true,
      variables: [],
      secrets: [],
    });

    // Bypass the confirm-gated gh channel and hand back a created result so the assertion targets
    // the notice surfacing alone; the real plan still classifies "ACME_TOKEN" as a created stub.
    const applySpy: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_ApplySpy = vi.spyOn(libEnvReconcile, 'apply').mockResolvedValue({
      available: true,
      done: ['ACME_TOKEN'],
      remaining: [],
    });
    const customizedLoggerMock: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    const loggerCustomizeSpy: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_LoggerCustomizeReturn);
    const promptEnvironmentReconcile: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_PromptEnvironmentReconcile = Reflect.get(CliUtilityInitialize, 'promptEnvironmentReconcile') as Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_PromptEnvironmentReconcile;

    await promptEnvironmentReconcile(config, true);

    const warnCalls: Tests_Cli_Utility_Initialize_ReconcileStubNotice_ListsTheCreatedPlaceholderStubsAndTellsTheUserToSetRealValues_WarnCalls = customizedLoggerMock['warn']['mock']['calls'];

    ok(
      warnCalls.some((call) => (
        typeof call[0] === 'string'
        && call[0].includes('ACME_TOKEN') === true
        && call[0].includes('before deploying') === true
      )),
      'Expected a notice listing the created placeholder stub and instructing the user to set real values before deploying',
    );

    readSpy.mockRestore();

    applySpy.mockRestore();

    loggerCustomizeSpy.mockRestore();

    return;
  });

  return;
});

/**
 * Tests - CLI - Utility - Initialize - Read Local Filled Keys.
 *
 * @since 0.21.0
 */
describe('read local filled keys', () => {
  it('returns only genuinely filled keys', async () => {
    const sandboxRoot: Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_SandboxRoot = await mkdtemp(join(tmpdir(), `nova-${'test'}-`));
    const appDirectory: Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_AppDirectory = join(sandboxRoot, 'apps', 'site');

    await mkdir(appDirectory, { recursive: true });

    // A filled line is kept; empty-quoted, empty-bare, and whitespace-only are dropped. LOG_LEVEL
    // is a reserved scaffold default written empty, so it drops here too (the reserved-key exemption
    // for filled values lives downstream in libEnvStatus.localOrphans, not in this reader).
    const envContents: Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_EnvContents = [
      'API_KEY="filled-value"',
      'EMPTY_QUOTED=""',
      'EMPTY_BARE=',
      'WHITESPACE_ONLY=    ',
      'LOG_LEVEL=""',
    ].join('\n');

    await writeFile(join(appDirectory, '.env'), envContents, 'utf-8');

    const config: Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Config = {
      environment: {
        apps: {
          './apps/site': {
            prefix: 'CBN_',
            variables: [],
          },
        },
      },
    };
    const cwdSpy: Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_CwdSpy = vi.spyOn(process, 'cwd').mockReturnValue(sandboxRoot);
    const readLocalFilledKeys: Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_ReadLocalFilledKeys = Reflect.get(CliUtilityInitialize, 'readLocalFilledKeys') as Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_ReadLocalFilledKeys;
    const filled: Tests_Cli_Utility_Initialize_ReadLocalFilledKeys_ReturnsOnlyGenuinelyFilledKeys_Filled = await readLocalFilledKeys(config);

    cwdSpy.mockRestore();

    deepStrictEqual(filled['./apps/site'], ['API_KEY'], 'only the filled non-reserved key is returned');

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  return;
});
