import { ok, strictEqual } from 'node:assert/strict';
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
  Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_Result,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_OriginalCwd,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_ProjectDirectory,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_SandboxRoot,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryDirectory,
  Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_TemporaryPrefix,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Answer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_CapturedQuestions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_DisplayNameInitial,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_DisplayNameQuestion,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ExistingWorkspace,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormOptions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormResult,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_HasAnswer,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockQuestionsArg,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockResponse,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Name,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_QuestionIndex,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_RawName,
  Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswers,
} from '../../../types/tests/cli/utility/initialize.test.d.ts';

vi.mock('prompts', () => (
  {
    default: vi.fn(),
  }
));

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
    const projectDirectory: Tests_Cli_Utility_Initialize_CliUtilityInitializeRun_ProjectDirectory = join(sandboxRoot, 'not-project-root');

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
    const capturedQuestions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_CapturedQuestions = [];
    const scriptedAnswers: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: 'Test Display',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockQuestionsArg) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question : questions;

      capturedQuestions.push(question);

      const rawName: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_RawName = question['name'];
      const name: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Name = (typeof rawName === 'string') ? rawName : '';
      const hasAnswer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_HasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Answer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockResponse = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form;

    const formOptions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace: undefined,
      projectSlug: undefined,
    };

    const formResult: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormResult = await form(formOptions);

    const displayNameQuestion: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_DisplayNameQuestion = capturedQuestions.find((entry) => entry['name'] === 'workspaceDisplayName');
    const nameIndex: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_QuestionIndex = capturedQuestions.findIndex((entry) => entry['name'] === 'workspaceName');
    const displayNameIndex: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_QuestionIndex = capturedQuestions.findIndex((entry) => entry['name'] === 'workspaceDisplayName');

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
    const scriptedAnswers: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: '   ',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockQuestionsArg) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question : questions;

      const rawName: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_RawName = question['name'];
      const name: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Name = (typeof rawName === 'string') ? rawName : '';
      const hasAnswer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_HasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Answer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockResponse = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form;

    const formOptions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace: undefined,
      projectSlug: undefined,
    };

    const formResult: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormResult = await form(formOptions);

    strictEqual(formResult['action'], 'apply');

    if (formResult['action'] === 'apply') {
      ok(Reflect.has(formResult['workspace'], 'displayName') === false, 'Expected workspace to omit displayName when input is whitespace');
    }

    return;
  });

  it('seeds displayName prompt initial from existingWorkspace.displayName', async () => {
    const capturedQuestions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_CapturedQuestions = [];
    const scriptedAnswers: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: 'Foo',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockQuestionsArg) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question : questions;

      capturedQuestions.push(question);

      const rawName: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_RawName = question['name'];
      const name: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Name = (typeof rawName === 'string') ? rawName : '';
      const hasAnswer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_HasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Answer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockResponse = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form;

    const existingWorkspace: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ExistingWorkspace = {
      name: 'app-demo',
      displayName: 'Foo',
      role: 'app',
      policy: 'freezable',
    };

    const formOptions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace,
      projectSlug: undefined,
    };

    await form(formOptions);

    const displayNameQuestion: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_DisplayNameQuestion = capturedQuestions.find((entry) => entry['name'] === 'workspaceDisplayName');

    ok(displayNameQuestion !== undefined, 'Expected a workspaceDisplayName question to be presented');

    const initial: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_DisplayNameInitial = displayNameQuestion['initial'];

    strictEqual(initial, 'Foo');

    return;
  });

  it('returns back action when user cancels at displayName prompt', async () => {
    const scriptedAnswers: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_ScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceName: 'app-demo',
    };

    vi.mocked(prompts).mockImplementation((questions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockQuestionsArg) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Question : questions;

      const rawName: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_RawName = question['name'];
      const name: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Name = (typeof rawName === 'string') ? rawName : '';

      // Simulates Ctrl+C / ESC at the workspaceDisplayName step — promptWithCancel reads an empty result as cancelled.
      if (name === 'workspaceDisplayName') {
        return Promise.resolve({});
      }

      const hasAnswer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_HasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Answer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_MockResponse = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_Form;

    const formOptions: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace: undefined,
      projectSlug: undefined,
    };

    const formResult: Tests_Cli_Utility_Initialize_PromptWorkspacesFormDisplayNameCapture_FormResult = await form(formOptions);

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
    const result: Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_Result = CliUtilityInitialize.isNonEmptyLiteralInput('');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns the error message for whitespace-only input', () => {
    const result: Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_Result = CliUtilityInitialize.isNonEmptyLiteralInput('   ');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns true for a non-empty string', () => {
    const result: Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_Result = CliUtilityInitialize.isNonEmptyLiteralInput('./action.yml');

    strictEqual(result, true);

    return;
  });

  it('returns the error message for non-string input', () => {
    const result: Tests_Cli_Utility_Initialize_CliUtilityInitializeIsNonEmptyLiteralInput_Result = CliUtilityInitialize.isNonEmptyLiteralInput(undefined);

    strictEqual(result, 'This field is required.');

    return;
  });

  return;
});
