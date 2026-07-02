import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
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
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Form,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_FormOptions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_FormResult,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Name,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Question,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_RawName,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Response,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_ScriptedAnswers,
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
      projectSlug: undefined,
    };

    await form(formOptions);

    const displayNameQuestion: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_DisplayNameQuestion = capturedQuestions.find((entry) => entry['name'] === 'workspaceDisplayName');

    ok(displayNameQuestion !== undefined, 'Expected a workspaceDisplayName question to be presented');

    const initial: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_SeedsDisplayNamePromptInitialFromExistingWorkspaceDisplayName_Initial = displayNameQuestion['initial'];

    strictEqual(initial, 'Foo');

    return;
  });

  it('preserves existingWorkspace.dotenv through the form', async () => {
    const scriptedAnswers: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_ScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: 'Foo',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Question : questions;
      const rawName: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_RawName = question['name'];
      const name: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Name = (typeof rawName === 'string') ? rawName : '';
      const response: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Response = {};

      if (Reflect.has(scriptedAnswers, name) === true) {
        Reflect.set(response, name, Reflect.get(scriptedAnswers, name));
      }

      return Promise.resolve(response);
    });

    const form: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Form = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_Form;

    const formOptions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_FormOptions = {
      workspacePath: './packages/demo-app',

      // Inlined literal avoids a typed body var aliasing the foreign existingWorkspace option type (rule 7.2).
      existingWorkspace: {
        name: 'app-demo',
        displayName: 'Foo',
        role: 'app',
        policy: 'freezable',
        dotenv: {
          variables: [{
            key: 'API_KEY',
            defaultValue: '',
          }],
        },
      },
      projectSlug: undefined,
    };

    const formResult: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_PreservesExistingWorkspaceDotenvThroughTheForm_FormResult = await form(formOptions);

    strictEqual(formResult['action'], 'apply');

    if (formResult['action'] === 'apply') {
      deepStrictEqual(formResult['workspace']['dotenv'], {
        variables: [{
          key: 'API_KEY',
          defaultValue: '',
        }],
      });
    }

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
