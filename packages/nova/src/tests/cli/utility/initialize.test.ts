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

import { CliUtilityInitialize } from '../../../cli/utility/initialize.js';

import type {
  TestsCliUtilityInitializeIsNonEmptyLiteralInputResult,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureAnswer,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureCapturedQuestions,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureDisplayNameInitial,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureDisplayNameQuestion,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureExistingWorkspace,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormOptions,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormResult,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureHasAnswer,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockQuestionsArg,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockResponse,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureName,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestionIndex,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureRawName,
  TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswers,
  TestsCliUtilityInitializeRunOriginalCwd,
  TestsCliUtilityInitializeRunProjectDirectory,
  TestsCliUtilityInitializeRunSandboxRoot,
  TestsCliUtilityInitializeRunTemporaryDirectory,
  TestsCliUtilityInitializeRunTemporaryPrefix,
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
  const originalCwd: TestsCliUtilityInitializeRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliUtilityInitializeRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliUtilityInitializeRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliUtilityInitializeRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliUtilityInitializeRunProjectDirectory = join(sandboxRoot, 'not-project-root');

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
    const capturedQuestions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureCapturedQuestions = [];
    const scriptedAnswers: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: 'Test Display',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockQuestionsArg) => {
      const question: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion = (Array.isArray(questions) === true) ? questions[0] as TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion : questions;

      capturedQuestions.push(question);

      const rawName: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureRawName = question['name'];
      const name: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureName = (typeof rawName === 'string') ? rawName : '';
      const hasAnswer: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureHasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureAnswer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockResponse = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm;

    const formOptions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace: undefined,
      projectSlug: undefined,
    };

    const formResult: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormResult = await form(formOptions);

    const displayNameQuestion: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureDisplayNameQuestion = capturedQuestions.find((entry) => entry['name'] === 'workspaceDisplayName');
    const nameIndex: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestionIndex = capturedQuestions.findIndex((entry) => entry['name'] === 'workspaceName');
    const displayNameIndex: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestionIndex = capturedQuestions.findIndex((entry) => entry['name'] === 'workspaceDisplayName');

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
    const scriptedAnswers: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: '   ',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockQuestionsArg) => {
      const question: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion = (Array.isArray(questions) === true) ? questions[0] as TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion : questions;

      const rawName: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureRawName = question['name'];
      const name: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureName = (typeof rawName === 'string') ? rawName : '';
      const hasAnswer: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureHasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureAnswer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockResponse = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm;

    const formOptions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace: undefined,
      projectSlug: undefined,
    };

    const formResult: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormResult = await form(formOptions);

    strictEqual(formResult['action'], 'apply');

    if (formResult['action'] === 'apply') {
      ok(Reflect.has(formResult['workspace'], 'displayName') === false, 'Expected workspace to omit displayName when input is whitespace');
    }

    return;
  });

  it('seeds displayName prompt initial from existingWorkspace.displayName', async () => {
    const capturedQuestions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureCapturedQuestions = [];
    const scriptedAnswers: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceDisplayName: 'Foo',
      workspaceName: 'app-demo',
      workspaceRecipes: [],
    };

    vi.mocked(prompts).mockImplementation((questions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockQuestionsArg) => {
      const question: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion = (Array.isArray(questions) === true) ? questions[0] as TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion : questions;

      capturedQuestions.push(question);

      const rawName: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureRawName = question['name'];
      const name: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureName = (typeof rawName === 'string') ? rawName : '';
      const hasAnswer: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureHasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureAnswer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockResponse = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm;

    const existingWorkspace: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureExistingWorkspace = {
      name: 'app-demo',
      displayName: 'Foo',
      role: 'app',
      policy: 'freezable',
    };

    const formOptions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace,
      projectSlug: undefined,
    };

    await form(formOptions);

    const displayNameQuestion: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureDisplayNameQuestion = capturedQuestions.find((entry) => entry['name'] === 'workspaceDisplayName');

    ok(displayNameQuestion !== undefined, 'Expected a workspaceDisplayName question to be presented');

    const initial: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureDisplayNameInitial = displayNameQuestion['initial'];

    strictEqual(initial, 'Foo');

    return;
  });

  it('returns back action when user cancels at displayName prompt', async () => {
    const scriptedAnswers: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureScriptedAnswers = {
      workspaceRole: 'app',
      workspacePolicy: 'freezable',
      workspaceName: 'app-demo',
    };

    vi.mocked(prompts).mockImplementation((questions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockQuestionsArg) => {
      const question: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion = (Array.isArray(questions) === true) ? questions[0] as TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureQuestion : questions;

      const rawName: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureRawName = question['name'];
      const name: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureName = (typeof rawName === 'string') ? rawName : '';

      // Simulates Ctrl+C / ESC at the workspaceDisplayName step — promptWithCancel reads an empty result as cancelled.
      if (name === 'workspaceDisplayName') {
        return Promise.resolve({});
      }

      const hasAnswer: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureHasAnswer = Reflect.has(scriptedAnswers, name);
      const answer: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureAnswer = (hasAnswer === true) ? Reflect.get(scriptedAnswers, name) : undefined;
      const response: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureMockResponse = {};

      if (hasAnswer === true) {
        Reflect.set(response, name, answer);
      }

      return Promise.resolve(response);
    });

    const form: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureForm;

    const formOptions: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormOptions = {
      workspacePath: './packages/demo-app',
      existingWorkspace: undefined,
      projectSlug: undefined,
    };

    const formResult: TestsCliUtilityInitializePromptWorkspacesFormDisplayNameCaptureFormResult = await form(formOptions);

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
    const result: TestsCliUtilityInitializeIsNonEmptyLiteralInputResult = CliUtilityInitialize.isNonEmptyLiteralInput('');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns the error message for whitespace-only input', () => {
    const result: TestsCliUtilityInitializeIsNonEmptyLiteralInputResult = CliUtilityInitialize.isNonEmptyLiteralInput('   ');

    strictEqual(result, 'This field is required.');

    return;
  });

  it('returns true for a non-empty string', () => {
    const result: TestsCliUtilityInitializeIsNonEmptyLiteralInputResult = CliUtilityInitialize.isNonEmptyLiteralInput('./action.yml');

    strictEqual(result, true);

    return;
  });

  it('returns the error message for non-string input', () => {
    const result: TestsCliUtilityInitializeIsNonEmptyLiteralInputResult = CliUtilityInitialize.isNonEmptyLiteralInput(undefined);

    strictEqual(result, 'This field is required.');

    return;
  });

  return;
});
