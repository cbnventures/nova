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
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_CapturedQuestions,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Config,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Next,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_PromptEnvironment,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Question,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Responses,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootBlock,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootQuestion,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_CapturedQuestions,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Config,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_GlobalBlock,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Next,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Question,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_RemoveQuestion,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Responses,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Config,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_ErrorCalls,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeReturn,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeSpy,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Next,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_PromptEnvironment,
  Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Responses,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_FormResult,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Next,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PackageJsonRecipes,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PromptWorkspacesForm,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Responses,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Workspace,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_CapturedQuestions,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_ExistingPackageJsonRecipes,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_FormResult,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_IdentityQuestion,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Next,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PackageJsonRecipes,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PromptWorkspacesForm,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Question,
  Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Responses,
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
          scope: 'project',
        },
      },
      { action: { kind: 'prefix' } },
      { prefix: 'ACME_' },
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

    const globalVariables: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_AddsAGlobalSecretValue_GlobalVariables = (config['environment'] !== undefined && config['environment']['project'] !== undefined) ? config['environment']['project']['variables'] : undefined;

    deepStrictEqual(globalVariables, [{
      key: 'MY_SECRET',
      reach: 'managed',
      secret: true,
    }]);

    return;
  });

  it('prompts before removing a value', async () => {
    const responses: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_Responses = [
      {
        action: {
          kind: 'scope',
          scope: 'project',
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
        project: {
          prefix: 'G_',
          variables: [{
            key: 'OLD',
            reach: 'managed',
            secret: true,
          }],
        },
      },
    };
    const promptEnvironment: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment = Reflect.get(CliUtilityInitialize, 'promptEnvironment') as Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_PromptEnvironment;

    await promptEnvironment(config);

    const removeQuestion: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_RemoveQuestion = capturedQuestions.find((entry) => entry['type'] === 'confirm' && String(entry['message']).includes('Remove'));
    const globalBlock: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_PromptsBeforeRemovingAValue_GlobalBlock = (config['environment'] !== undefined) ? config['environment']['project'] : undefined;

    ok(removeQuestion !== undefined, 'Expected a removal confirmation prompt before deleting the value');
    ok(globalBlock !== undefined && globalBlock['variables'] === undefined, 'Expected the removed value to be gone from the project block');

    return;
  });

  it('offers the repo root workspace and adds its namespace', async () => {
    const responses: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Responses = [
      {
        action: {
          kind: 'scope',
          scope: 'workspace',
          appPath: './',
        },
      },
      { action: { kind: 'prefix' } },
      { prefix: 'ROOT_' },
    ];
    const capturedQuestions: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_CapturedQuestions = [];

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Question : questions;

      capturedQuestions.push(question);

      const next: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const config: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_Config = {
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/lib': {
          name: 'lib',
          role: 'package',
          policy: 'distributable',
        },
      },
    };
    const promptEnvironment: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_PromptEnvironment = Reflect.get(CliUtilityInitialize, 'promptEnvironment') as Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_PromptEnvironment;

    await promptEnvironment(config);

    const rootQuestion: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootQuestion = capturedQuestions.find((entry) => entry['type'] === 'select' && JSON.stringify(entry['choices']).includes('"appPath":"./"') === true);
    const rootBlock: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_OffersTheRepoRootWorkspaceAndAddsItsNamespace_RootBlock = (config['environment'] !== undefined && config['environment']['workspaces'] !== undefined) ? config['environment']['workspaces']['./'] : undefined;

    ok(rootQuestion !== undefined, 'Expected the environment menu to offer the repo root "./" workspace');
    ok(rootBlock !== undefined && rootBlock['prefix'] === 'ROOT_', 'Expected the repo root namespace to be saved with its prefix');

    return;
  });

  it('rejects adding a value when the namespace has no prefix', async () => {
    const responses: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Responses = [
      {
        action: {
          kind: 'scope',
          scope: 'project',
        },
      },
      { action: { kind: 'add' } },
      { action: { kind: 'back' } },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const customizedLoggerMock: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    const loggerCustomizeSpy: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_LoggerCustomizeReturn);
    const config: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_Config = {};
    const promptEnvironment: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_PromptEnvironment = Reflect.get(CliUtilityInitialize, 'promptEnvironment') as Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_PromptEnvironment;

    await promptEnvironment(config);

    const errorCalls: Tests_Cli_Utility_Initialize_PromptEnvironmentSection_RejectsAddingAValueWhenTheNamespaceHasNoPrefix_ErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    loggerCustomizeSpy.mockRestore();

    ok(
      errorCalls.some((call) => typeof call[0] === 'string' && call[0].includes('prefix') === true),
      'Expected a rejection telling the user to set a prefix before adding values',
    );
    ok(config['environment'] === undefined, 'Expected no namespace to persist without a prefix');

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
        project: {
          prefix: 'ACME_',
          variables: [{
            key: 'TOKEN',
            reach: 'managed',
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
        project: {
          prefix: 'ACME_',
          variables: [{
            key: 'TOKEN',
            reach: 'managed',
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
        workspaces: {
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

/**
 * Tests - CLI - Utility - Initialize - Prompt Workspaces Form.
 *
 * @since 0.22.0
 */
describe('prompt workspaces form', () => {
  it('builds the workspace from role, policy, name, and recipe selection', async () => {
    const responses: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Responses = [
      { workspaceRole: 'package' },
      { workspacePolicy: 'trackable' },
      { workspaceName: 'my-lib' },
      { workspaceRecipes: ['normalize-bundler'] },
    ];

    vi.mocked(prompts).mockImplementation(() => {
      const next: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const promptWorkspacesForm: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PromptWorkspacesForm = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PromptWorkspacesForm;
    const formResult: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_FormResult = await promptWorkspacesForm({
      workspacePath: './packages/my-lib',
      existingWorkspace: undefined,
      existingPackageJsonRecipes: undefined,
      projectSlug: undefined,
    });
    const workspace: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_Workspace = (formResult['action'] === 'apply') ? formResult['workspace'] : undefined;
    const packageJsonRecipes: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_BuildsTheWorkspaceFromRolePolicyNameAndRecipeSelection_PackageJsonRecipes = (formResult['action'] === 'apply') ? formResult['packageJsonRecipes'] : undefined;

    deepStrictEqual(workspace, {
      name: 'my-lib',
      role: 'package',
      policy: 'trackable',
    }, 'Expected the role, policy, and normalized name to be captured from the prompts');

    deepStrictEqual(packageJsonRecipes, {
      'normalize-bundler': {
        enabled: true,
      },
    }, 'Expected the selected recipe to be recorded as enabled');

    return;
  });

  it('offers and preserves displayName for an enabled sync-identity workspace', async () => {
    const responses: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Responses = [
      { workspaceRole: 'package' },
      { workspacePolicy: 'distributable' },
      { workspaceName: 'my-lib' },
      { workspaceRecipes: ['sync-identity'] },
      { workspaceRecipeSettings: ['displayName'] },
    ];
    const capturedQuestions: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_CapturedQuestions = [];

    vi.mocked(prompts).mockImplementation((questions) => {
      const question: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Question = (Array.isArray(questions) === true) ? questions[0] as Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Question : questions;

      capturedQuestions.push(question);

      const next: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_Next = responses.shift();

      return Promise.resolve((next !== undefined) ? next : {});
    });

    const existingPackageJsonRecipes: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_ExistingPackageJsonRecipes = {
      'sync-identity': {
        enabled: true,
        settings: {
          displayName: true,
        },
      },
    };

    const promptWorkspacesForm: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PromptWorkspacesForm = Reflect.get(CliUtilityInitialize, 'promptWorkspacesForm') as Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PromptWorkspacesForm;
    const formResult: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_FormResult = await promptWorkspacesForm({
      workspacePath: './packages/my-lib',
      existingWorkspace: undefined,
      existingPackageJsonRecipes,
      projectSlug: undefined,
    });
    const packageJsonRecipes: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_PackageJsonRecipes = (formResult['action'] === 'apply') ? formResult['packageJsonRecipes'] : undefined;

    const identityQuestion: Tests_Cli_Utility_Initialize_PromptWorkspacesForm_OffersAndPreservesDisplayNameForAnEnabledSyncIdentityWorkspace_IdentityQuestion = capturedQuestions.find((entry) => entry['name'] === 'workspaceRecipeSettings' && JSON.stringify(entry['choices']).includes('"value":"displayName"') === true);

    ok(identityQuestion !== undefined, 'Expected the sync-identity settings prompt to offer a "displayName" choice');
    ok(JSON.stringify(identityQuestion['choices']).includes('"title":"displayName","value":"displayName","selected":true') === true, 'Expected the "displayName" choice to start pre-selected when already enabled');

    deepStrictEqual(packageJsonRecipes, {
      'sync-identity': {
        enabled: true,
        settings: {
          displayName: true,
        },
      },
    }, 'Expected the selected "displayName" setting to be recorded as enabled');

    return;
  });

  return;
});
