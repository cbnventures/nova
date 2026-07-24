import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as Validator } from '../../../../cli/generate/github/workflows-blueprint-validate.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_AcyclicDiamondDependsOnGraphPasses_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_AcyclicDiamondDependsOnGraphPasses_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_AcyclicDiamondDependsOnGraphPasses_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_BareStringPushTriggerIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_BareStringPushTriggerIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_BareStringPushTriggerIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CircularDependsOnReferencesAreFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CircularDependsOnReferencesAreFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CircularDependsOnReferencesAreFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CleanConfigProducesNoDiagnosticsAndKeepsAllWorkflows_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CleanConfigProducesNoDiagnosticsAndKeepsAllWorkflows_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CleanConfigProducesNoDiagnosticsAndKeepsAllWorkflows_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CrossWorkflowDestinationCollisionIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CrossWorkflowDestinationCollisionIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CrossWorkflowDestinationCollisionIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DependsOnReferenceThatDoesNotExistIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DependsOnReferenceThatDoesNotExistIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DependsOnReferenceThatDoesNotExistIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldNeedsMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldNeedsMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldSettingsMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldSettingsMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldTypeMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldTypeMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldWorkingDirMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldWorkingDirMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DestinationCollisionIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DestinationCollisionIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DestinationCollisionIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DuplicateWorkflowKeyIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DuplicateWorkflowKeyIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DuplicateWorkflowKeyIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionDestinationCollisionIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionDestinationCollisionIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionDestinationCollisionIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionMissingLiteralSettingsAreFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionMissingLiteralSettingsAreFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionMissingLiteralSettingsAreFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingLiteralIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingLiteralIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingLiteralIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingSuffixIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingSuffixIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingSuffixIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingTriggersIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingTriggersIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingTriggersIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ObjectFormTriggersPass_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ObjectFormTriggersPass_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ObjectFormTriggersPass_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerObjectWithoutBranchesIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerObjectWithoutBranchesIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerObjectWithoutBranchesIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithAnEmptyBranchesArrayIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithAnEmptyBranchesArrayIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithAnEmptyBranchesArrayIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithInvalidPathsIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithInvalidPathsIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithInvalidPathsIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ScheduleDailyAndMonthlyTriggersPass_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ScheduleDailyAndMonthlyTriggersPass_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ScheduleDailyAndMonthlyTriggersPass_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetCollisionIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetCollisionIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetCollisionIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetViolationIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetViolationIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetViolationIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerOnAnIssueTemplateIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerOnAnIssueTemplateIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerOnAnIssueTemplateIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerWithInvalidTagsIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerWithInvalidTagsIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerWithInvalidTagsIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TargetTypeNotBuildableIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TargetTypeNotBuildableIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TargetTypeNotBuildableIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TriggerNotValidForTemplateIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TriggerNotValidForTemplateIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TriggerNotValidForTemplateIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnknownTemplateIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnknownTemplateIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnknownTemplateIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredScopeIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredScopeIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredScopeIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredWorkingDirIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredWorkingDirIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredWorkingDirIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldDependsOnMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldDependsOnMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldScopesMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldScopesMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldSettingsMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldSettingsMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldSuffixMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldSuffixMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldTargetsMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldTargetsMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithAValidDependsOnPasses_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithAValidDependsOnPasses_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithAValidDependsOnPasses_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithoutDependsOnIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithoutDependsOnIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithoutDependsOnIsFlagged_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkspaceDotenvMigrationHintIsFlagged_RawWorkflows,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkspaceDotenvMigrationHintIsFlagged_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkspaceDotenvMigrationHintIsFlagged_Workspaces,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint-validate.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Validate - Validate.
 *
 * @since 0.21.0
 */
describe('Validator.validate', () => {
  it('clean config produces no diagnostics and keeps all workflows', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CleanConfigProducesNoDiagnosticsAndKeepsAllWorkflows_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CleanConfigProducesNoDiagnosticsAndKeepsAllWorkflows_RawWorkflows = [
      {
        template: 'check-sponsor-gated-issues',
        name: 'project',
        triggers: ['issues'],
      },
      {
        template: 'lock-inactive-issues',
        name: 'project',
        triggers: ['schedule-weekly'],
      },
      {
        template: 'publish',
        name: 'project',
        triggers: ['release'],
        build: ['./packages/pkg-a'],
        deploy: [{
          to: 'npm',
          path: './packages/pkg-a',
        }],
        with: {},
      },
    ];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CleanConfigProducesNoDiagnosticsAndKeepsAllWorkflows_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['diagnostics'].length, 0);

    strictEqual(result['workflows'].length, 3);

    return;
  });

  it('unknown template is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnknownTemplateIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnknownTemplateIsFlagged_RawWorkflows = [{
      template: 'not-a-template',
      name: 'project',
      triggers: ['issues'],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnknownTemplateIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Unknown template "not-a-template"'), true);

    return;
  });

  it('missing suffix is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingSuffixIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingSuffixIsFlagged_RawWorkflows = [{
      template: 'check-sponsor-gated-issues',
      triggers: ['issues'],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingSuffixIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('is missing a non-empty "name"'), true);

    return;
  });

  it('missing triggers is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingTriggersIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingTriggersIsFlagged_RawWorkflows = [{
      template: 'check-sponsor-gated-issues',
      name: 'project',
      triggers: [],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingTriggersIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('is missing a non-empty "triggers" array'), true);

    return;
  });

  it('trigger not valid for template is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TriggerNotValidForTemplateIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TriggerNotValidForTemplateIsFlagged_RawWorkflows = [{
      template: 'check-sponsor-gated-issues',
      name: 'project',
      triggers: ['release'],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TriggerNotValidForTemplateIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('is not valid for template "check-sponsor-gated-issues"'), true);

    return;
  });

  it('bare string push trigger is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_BareStringPushTriggerIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_BareStringPushTriggerIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['push'],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_BareStringPushTriggerIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Trigger "push" must use the object form with a non-empty "branches" array'), true);

    return;
  });

  it('push trigger object without branches is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerObjectWithoutBranchesIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerObjectWithoutBranchesIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: [{ name: 'push' }],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerObjectWithoutBranchesIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Trigger "push" in workflow "publish-project" requires a non-empty "branches" array of strings'), true);

    return;
  });

  it('push trigger with an empty branches array is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithAnEmptyBranchesArrayIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithAnEmptyBranchesArrayIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: [{
        name: 'push',
        branches: [],
      }],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithAnEmptyBranchesArrayIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('has an invalid "branches". It must be a non-empty array of strings.'), true);

    return;
  });

  it('push trigger with invalid paths is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithInvalidPathsIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithInvalidPathsIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: [{
        name: 'push',
        branches: ['main'],
        paths: [],
      }],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_PushTriggerWithInvalidPathsIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('has an invalid "paths". It must be a non-empty array of strings.'), true);

    return;
  });

  it('tag-push trigger on an issue template is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerOnAnIssueTemplateIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerOnAnIssueTemplateIsFlagged_RawWorkflows = [{
      template: 'check-sponsor-gated-issues',
      name: 'project',
      triggers: ['tag-push'],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerOnAnIssueTemplateIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Trigger "tag-push" is not valid for template "check-sponsor-gated-issues"'), true);

    return;
  });

  it('tag push trigger with invalid tags is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerWithInvalidTagsIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerWithInvalidTagsIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: [{
        name: 'tag-push',
        tags: [],
      }],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TagPushTriggerWithInvalidTagsIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('has an invalid "tags". It must be a non-empty array of strings.'), true);

    return;
  });

  it('object form triggers pass', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ObjectFormTriggersPass_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ObjectFormTriggersPass_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: [
        {
          name: 'tag-push',
          tags: ['v*'],
        },
        {
          name: 'push',
          branches: ['main'],
          paths: ['packages/**'],
        },
      ],
      build: ['./packages/pkg-a'],
      deploy: [{
        to: 'npm',
        path: './packages/pkg-a',
      }],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ObjectFormTriggersPass_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['diagnostics'].length, 0);

    strictEqual(result['workflows'].length, 1);

    return;
  });

  it('duplicate workflow key is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DuplicateWorkflowKeyIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DuplicateWorkflowKeyIsFlagged_RawWorkflows = [
      {
        template: 'lock-inactive-issues',
        name: 'project',
        triggers: ['schedule-weekly'],
      },
      {
        template: 'lock-inactive-issues',
        name: 'project',
        triggers: ['schedule-weekly'],
      },
    ];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DuplicateWorkflowKeyIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 1);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Duplicate workflow "lock-inactive-issues-project"'), true);

    return;
  });

  it('unregistered scope is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredScopeIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredScopeIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      build: ['./packages/missing'],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredScopeIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Scope "./packages/missing" is not a registered workspace'), true);

    return;
  });

  it('unregistered working dir is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredWorkingDirIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredWorkingDirIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [{
        to: 'npm',
        path: './packages/missing',
      }],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_UnregisteredWorkingDirIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Target working directory "./packages/missing" is not a registered workspace'), true);

    return;
  });

  it('target type not buildable is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TargetTypeNotBuildableIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TargetTypeNotBuildableIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [{
        to: 'some-unknown-target',
        path: './packages/pkg-a',
      }],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_TargetTypeNotBuildableIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Target type "some-unknown-target" is not supported by template "publish"'), true);

    return;
  });

  it('missing literal is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingLiteralIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingLiteralIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [{
        to: 'github-action',
        path: './packages/pkg-a',
      }],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_MissingLiteralIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('is missing required literal settings: ACTION_ENTRY_POINT, ACTION_OUTPUT_PATH, ACTION_YML_PATH, RELEASE_BRANCH_NAME'), true);

    return;
  });

  it('cross-workflow destination collision is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CrossWorkflowDestinationCollisionIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
      './packages/pkg-b': {
        name: 'pkg-b',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CrossWorkflowDestinationCollisionIsFlagged_RawWorkflows = [
      {
        template: 'publish',
        name: 'one',
        triggers: ['release'],
        deploy: [{
          to: 'cloudflare-pages-docusaurus',
          path: './packages/pkg-a',
        }],
        with: {},
      },
      {
        template: 'publish',
        name: 'two',
        triggers: ['release'],
        deploy: [{
          to: 'cloudflare-pages-docusaurus',
          path: './packages/pkg-b',
        }],
        with: {},
      },
    ];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CrossWorkflowDestinationCollisionIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 1);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Cross-workflow destination collision'), true);

    return;
  });

  it('singleton target violation is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetViolationIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
      './packages/pkg-b': {
        name: 'pkg-b',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetViolationIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [
        {
          to: 'github-pages-docusaurus',
          path: './packages/pkg-a',
        },
        {
          to: 'github-pages-docusaurus',
          path: './packages/pkg-b',
        },
      ],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetViolationIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Singleton target violation: workflow "publish-project" declares multiple "github-pages-docusaurus" targets, but only one is allowed.'), true);

    return;
  });

  it('singleton target collision is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetCollisionIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
      './packages/pkg-b': {
        name: 'pkg-b',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetCollisionIsFlagged_RawWorkflows = [
      {
        template: 'publish',
        name: 'one',
        triggers: ['release'],
        deploy: [{
          to: 'github-pages-docusaurus',
          path: './packages/pkg-a',
        }],
        with: {},
      },
      {
        template: 'publish',
        name: 'two',
        triggers: ['release'],
        deploy: [{
          to: 'github-pages-docusaurus',
          path: './packages/pkg-b',
        }],
        with: {},
      },
    ];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_SingletonTargetCollisionIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 1);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Singleton target collision: only one "github-pages-docusaurus" target may be declared across all workflows. Found in workflow "publish-one" and again in workflow "publish-two".'), true);

    return;
  });

  it('destination collision is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DestinationCollisionIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
      './packages/pkg-b': {
        name: 'pkg-b',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DestinationCollisionIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [
        {
          to: 'cloudflare-pages-docusaurus',
          path: './packages/pkg-a',
        },
        {
          to: 'cloudflare-pages-docusaurus',
          path: './packages/pkg-b',
        },
      ],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DestinationCollisionIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Destination collision in workflow "publish-project": multiple "cloudflare-pages-docusaurus" targets declare the same destination'), true);

    return;
  });

  it('github-action missing literal settings are flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionMissingLiteralSettingsAreFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionMissingLiteralSettingsAreFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [{
        to: 'github-action',
        path: './packages/pkg-a',
      }],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionMissingLiteralSettingsAreFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Workflow "publish-project" is missing required literal settings: ACTION_ENTRY_POINT, ACTION_OUTPUT_PATH, ACTION_YML_PATH, RELEASE_BRANCH_NAME. Skipping.'), true);

    return;
  });

  it('github-action destination collision is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionDestinationCollisionIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
      './packages/pkg-b': {
        name: 'pkg-b',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionDestinationCollisionIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [
        {
          to: 'github-action',
          path: './packages/pkg-a',
          with: {
            ACTION_ENTRY_POINT: 'index.js',
            ACTION_OUTPUT_PATH: './packages/pkg-a/build',
            ACTION_YML_PATH: './action.yml',
            RELEASE_BRANCH_NAME: 'releases',
          },
        },
        {
          to: 'github-action',
          path: './packages/pkg-b',
          with: {
            ACTION_ENTRY_POINT: 'index.js',
            ACTION_OUTPUT_PATH: './packages/pkg-b/build',
            ACTION_YML_PATH: './other-action.yml',
            RELEASE_BRANCH_NAME: 'releases',
          },
        },
      ],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_GithubActionDestinationCollisionIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Destination collision in workflow "publish-project": multiple "github-action" targets declare the same destination (RELEASE_BRANCH_NAME=releases)'), true);

    return;
  });

  it('schedule daily and monthly triggers pass', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ScheduleDailyAndMonthlyTriggersPass_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ScheduleDailyAndMonthlyTriggersPass_RawWorkflows = [
      {
        template: 'lock-inactive-issues',
        name: 'daily',
        triggers: ['schedule-daily'],
      },
      {
        template: 'lock-inactive-issues',
        name: 'monthly',
        triggers: ['schedule-monthly'],
      },
    ];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_ScheduleDailyAndMonthlyTriggersPass_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['diagnostics'].length, 0);

    strictEqual(result['workflows'].length, 2);

    return;
  });

  it('workflow-run trigger without depends-on is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithoutDependsOnIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithoutDependsOnIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'addon',
      triggers: ['workflow-run-success'],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithoutDependsOnIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Workflow "publish-addon" uses a trigger that requires "workflows" references, but none are configured. Skipping.'), true);

    return;
  });

  it('depends-on reference that does not exist is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DependsOnReferenceThatDoesNotExistIsFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DependsOnReferenceThatDoesNotExistIsFlagged_RawWorkflows = [{
      'template': 'publish',
      'name': 'addon',
      'triggers': [{
        name: 'workflow-run-success',
        workflows: ['publish-missing'],
      }],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DependsOnReferenceThatDoesNotExistIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Workflow "publish-addon" depends on "publish-missing" which does not exist. Skipping.'), true);

    return;
  });

  it('circular depends-on references are flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CircularDependsOnReferencesAreFlagged_Workspaces = {};
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CircularDependsOnReferencesAreFlagged_RawWorkflows = [
      {
        'template': 'publish',
        'name': 'first',
        'triggers': [{
          name: 'workflow-run-success',
          workflows: ['publish-second'],
        }],
      },
      {
        'template': 'publish',
        'name': 'second',
        'triggers': [{
          name: 'workflow-run-success',
          workflows: ['publish-first'],
        }],
      },
    ];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_CircularDependsOnReferencesAreFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].length, 1);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Circular depends-on references detected. Aborting.'), true);

    return;
  });

  it('workflow-run trigger with a valid depends-on passes', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithAValidDependsOnPasses_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithAValidDependsOnPasses_RawWorkflows = [
      {
        template: 'publish',
        name: 'core',
        triggers: ['release'],
        build: ['./packages/pkg-a'],
        deploy: [{
          to: 'npm',
          path: './packages/pkg-a',
        }],
        with: {},
      },
      {
        'template': 'publish',
        'name': 'addon',
        'triggers': [{
          name: 'workflow-run-success',
          workflows: ['publish-core'],
        }],
        'build': ['./packages/pkg-a'],
        'deploy': [{
          to: 'npm',
          path: './packages/pkg-a',
        }],
        'with': {},
      },
    ];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowRunTriggerWithAValidDependsOnPasses_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['diagnostics'].length, 0);

    strictEqual(result['workflows'].length, 2);

    return;
  });

  it('acyclic diamond depends-on graph passes', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_AcyclicDiamondDependsOnGraphPasses_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_AcyclicDiamondDependsOnGraphPasses_RawWorkflows = [
      {
        template: 'publish',
        name: 'base',
        triggers: ['release'],
        build: ['./packages/pkg-a'],
        deploy: [{
          to: 'npm',
          path: './packages/pkg-a',
        }],
        with: {},
      },
      {
        'template': 'publish',
        'name': 'left',
        'triggers': [{
          name: 'workflow-run-success',
          workflows: ['publish-base'],
        }],
        'build': ['./packages/pkg-a'],
        'deploy': [{
          to: 'npm',
          path: './packages/pkg-a',
        }],
        'with': {},
      },
      {
        'template': 'publish',
        'name': 'right',
        'triggers': [{
          name: 'workflow-run-success',
          workflows: ['publish-base'],
        }],
        'build': ['./packages/pkg-a'],
        'deploy': [{
          to: 'npm',
          path: './packages/pkg-a',
        }],
        'with': {},
      },
      {
        'template': 'publish',
        'name': 'top',
        'triggers': [{
          name: 'workflow-run-success',
          workflows: [
            'publish-left',
            'publish-right',
          ],
        }],
        'build': ['./packages/pkg-a'],
        'deploy': [{
          to: 'npm',
          path: './packages/pkg-a',
        }],
        'with': {},
      },
    ];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_AcyclicDiamondDependsOnGraphPasses_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['diagnostics'].length, 0);

    strictEqual(result['workflows'].length, 4);

    return;
  });

  it('workflow field suffix migration hint is flagged', () => {
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldSuffixMigrationHintIsFlagged_RawWorkflows = [{
      template: 'publish',
      suffix: 'project',
      triggers: ['release'],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldSuffixMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, {});

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Workflow field "suffix" was renamed to "name". Skipping.'), true);

    return;
  });

  it('workflow field scopes migration hint is flagged', () => {
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldScopesMigrationHintIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      scopes: ['./packages/pkg-a'],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldScopesMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, {});

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Workflow field "scopes" was renamed to "build". Skipping.'), true);

    return;
  });

  it('workflow field targets migration hint is flagged', () => {
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldTargetsMigrationHintIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      targets: [],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldTargetsMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, {});

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Workflow field "targets" was renamed to "deploy". Skipping.'), true);

    return;
  });

  it('workflow field settings migration hint is flagged', () => {
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldSettingsMigrationHintIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      settings: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldSettingsMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, {});

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Workflow field "settings" was renamed to "with". Skipping.'), true);

    return;
  });

  it('workflow field depends-on migration hint is flagged', () => {
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldDependsOnMigrationHintIsFlagged_RawWorkflows = [{
      'template': 'publish',
      'name': 'addon',
      'triggers': ['release'],
      'depends-on': ['publish-core'],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkflowFieldDependsOnMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, {});

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Workflow field "depends-on" moved onto the workflow-run trigger as "workflows". Skipping.'), true);

    return;
  });

  it('deploy field type migration hint is flagged', () => {
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldTypeMigrationHintIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [{
        type: 'npm',
        path: './packages/pkg-a',
      }],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldTypeMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, {});

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Deploy field "type" was renamed to "to". Skipping.'), true);

    return;
  });

  it('deploy field workingDir migration hint is flagged', () => {
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldWorkingDirMigrationHintIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [{
        to: 'npm',
        workingDir: './packages/pkg-a',
      }],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldWorkingDirMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, {});

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Deploy field "workingDir" was renamed to "path". Skipping.'), true);

    return;
  });

  it('deploy field needs migration hint is flagged', () => {
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldNeedsMigrationHintIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [{
        to: 'npm',
        path: './packages/pkg-a',
        needs: ['./packages/pkg-b'],
      }],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldNeedsMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, {});

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Deploy field "needs" was renamed to "after". Skipping.'), true);

    return;
  });

  it('deploy field settings migration hint is flagged', () => {
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldSettingsMigrationHintIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [{
        to: 'npm',
        path: './packages/pkg-a',
        settings: {},
      }],
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_DeployFieldSettingsMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, {});

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Deploy field "settings" was renamed to "with". Skipping.'), true);

    return;
  });

  it('workspace dotenv migration hint is flagged', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkspaceDotenvMigrationHintIsFlagged_Workspaces = {
      './packages/pkg-a': {
        name: 'pkg-a',
        role: 'package',
        policy: 'distributable',
        dotenv: {
          variables: [{
            key: 'PUBLIC_SITE_KEY',
            defaultValue: '',
          }],
        },
      },
    };
    const rawWorkflows: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkspaceDotenvMigrationHintIsFlagged_RawWorkflows = [{
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      build: ['./packages/pkg-a'],
      deploy: [{
        to: 'npm',
        path: './packages/pkg-a',
      }],
      with: {},
    }];
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintValidate_ValidatorValidate_WorkspaceDotenvMigrationHintIsFlagged_Result = Validator.validate(rawWorkflows, workspaces);

    strictEqual(result['workflows'].length, 0);

    strictEqual(result['diagnostics'].map((diagnostic) => diagnostic['message']).join(' ').includes('Workspace field "dotenv" moved to the top-level "environment" block'), true);

    return;
  });

  return;
});
