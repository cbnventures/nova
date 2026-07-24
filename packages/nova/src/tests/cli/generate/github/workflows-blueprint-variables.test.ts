import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as Variables } from '../../../../cli/generate/github/workflows-blueprint-variables.js';
import { LIB_REGEX_PATTERN_ANSI } from '../../../../lib/regex.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Joined,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Workflow,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Joined,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Workflow,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Joined,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Workflow,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTargetMetadata_ReturnsTheNpmTargetEntry_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTargetMetadata_ReturnsUndefinedForAnUnknownTarget_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTemplateMetadata_ReturnsThePublishTemplateEntry_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTemplateMetadata_ReturnsUndefinedForAnUnknownTemplate_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_FallsBackToTheVariableNameWhenNoDefaultOrSetting_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_FallsBackToTheVariableNameWhenNoDefaultOrSetting_VariableMeta,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_ResolvesToTheDefaultNameWithIdentitySettings_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_ResolvesToTheDefaultNameWithIdentitySettings_VariableMeta,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_ResolvesToTheDefaultNameWithIdentitySettings_WorkflowSettings,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_TargetSettings,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_VariableMeta,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_WorkflowSettings,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_WorkflowSettingOverrideWins_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_WorkflowSettingOverrideWins_VariableMeta,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_WorkflowSettingOverrideWins_WorkflowSettings,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersALiteralInline_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersASecretReference_Expected,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersASecretReference_Result,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersAVarReference_Expected,
  Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersAVarReference_Result,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint-variables.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Get Template Metadata.
 *
 * @since 0.21.0
 */
describe('Variables.getTemplateMetadata', () => {
  it('returns the publish template entry', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTemplateMetadata_ReturnsThePublishTemplateEntry_Result = Variables.getTemplateMetadata('publish');

    ok(result !== undefined);

    strictEqual(result['name'], 'publish');

    return;
  });

  it('returns undefined for an unknown template', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTemplateMetadata_ReturnsUndefinedForAnUnknownTemplate_Result = Variables.getTemplateMetadata('not-a-template');

    strictEqual(result, undefined);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Get Target Metadata.
 *
 * @since 0.21.0
 */
describe('Variables.getTargetMetadata', () => {
  it('returns the npm target entry', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTargetMetadata_ReturnsTheNpmTargetEntry_Result = Variables.getTargetMetadata('publish', 'npm');

    ok(result !== undefined);

    ok(result['variables']['NPM_TOKEN'] !== undefined);

    return;
  });

  it('returns undefined for an unknown target', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTargetMetadata_ReturnsUndefinedForAnUnknownTarget_Result = Variables.getTargetMetadata('publish', 'not-a-target');

    strictEqual(result, undefined);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve.
 *
 * @since 0.21.0
 */
describe('Variables.resolve', () => {
  it('resolves to the default name with identity settings', () => {
    const variableMeta: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_ResolvesToTheDefaultNameWithIdentitySettings_VariableMeta = {
      format: 'secret',
      default: 'NPM_TOKEN',
    };
    const workflowSettings: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_ResolvesToTheDefaultNameWithIdentitySettings_WorkflowSettings = {
      NPM_TOKEN: 'NPM_TOKEN',
    };
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_ResolvesToTheDefaultNameWithIdentitySettings_Result = Variables.resolve('NPM_TOKEN', undefined, workflowSettings, variableMeta);

    strictEqual(result, 'NPM_TOKEN');

    return;
  });

  it('workflow setting override wins', () => {
    const variableMeta: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_WorkflowSettingOverrideWins_VariableMeta = {
      format: 'secret',
      default: 'NPM_TOKEN',
    };
    const workflowSettings: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_WorkflowSettingOverrideWins_WorkflowSettings = {
      NPM_TOKEN: 'CUSTOM_NPM_TOKEN',
    };
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_WorkflowSettingOverrideWins_Result = Variables.resolve('NPM_TOKEN', undefined, workflowSettings, variableMeta);

    strictEqual(result, 'CUSTOM_NPM_TOKEN');

    return;
  });

  it('target setting beats workflow setting', () => {
    const variableMeta: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_VariableMeta = {
      format: 'secret',
      default: 'NPM_TOKEN',
    };
    const targetSettings: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_TargetSettings = {
      NPM_TOKEN: 'TARGET_NPM_TOKEN',
    };
    const workflowSettings: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_WorkflowSettings = {
      NPM_TOKEN: 'WORKFLOW_NPM_TOKEN',
    };
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_Result = Variables.resolve('NPM_TOKEN', targetSettings, workflowSettings, variableMeta);

    strictEqual(result, 'TARGET_NPM_TOKEN');

    return;
  });

  it('falls back to the variable name when no default or setting', () => {
    const variableMeta: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_FallsBackToTheVariableNameWhenNoDefaultOrSetting_VariableMeta = {
      format: 'literal',
    };
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_FallsBackToTheVariableNameWhenNoDefaultOrSetting_Result = Variables.resolve('ROOT_WORKING_DIR', undefined, undefined, variableMeta);

    strictEqual(result, 'ROOT_WORKING_DIR');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve Expr.
 *
 * @since 0.21.0
 */
describe('Variables.resolveExpr', () => {
  it('renders a secret reference', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersASecretReference_Result = Variables.resolveExpr('secret', 'NPM_TOKEN');
    const expected: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersASecretReference_Expected = `${[
      '$',
      '{',
    ].join('')}{ secrets.NPM_TOKEN }}`;

    strictEqual(result, expected);

    return;
  });

  it('renders a var reference', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersAVarReference_Result = Variables.resolveExpr('var', 'CLOUDFLARE_ACCOUNT_ID');
    const expected: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersAVarReference_Expected = `${[
      '$',
      '{',
    ].join('')}{ vars.CLOUDFLARE_ACCOUNT_ID }}`;

    strictEqual(result, expected);

    return;
  });

  it('renders a literal inline', () => {
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersALiteralInline_Result = Variables.resolveExpr('literal', './');

    strictEqual(result, './');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Collect Setup Lines.
 *
 * @since 0.21.0
 */
describe('Variables.collectSetupLines', () => {
  it('excludes auto secrets and lists non-auto secrets and vars', () => {
    const workflow: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Workflow = {
      template: 'check-sponsor-gated-issues',
      name: 'project',
      triggers: ['issues'],
    };
    const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Environment = {
      workflows: {
        project: {
          prefix: 'SGI_',
        },
      },
    };
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Result = Variables.collectSetupLines(workflow, 'nova-check-sponsor-gated-issues-project.yml', environment);
    const joined: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Joined = result.join('\n').replace(new RegExp(LIB_REGEX_PATTERN_ANSI, 'g'), '');

    // GITHUB_TOKEN is an auto secret; it is never prefixed nor listed.
    strictEqual(joined.includes('GITHUB_TOKEN'), false);

    // PERSONAL_ACCESS_TOKEN is a non-auto secret listed under its prefixed name.
    strictEqual(joined.includes('Secret SGI_PERSONAL_ACCESS_TOKEN'), true);

    // The unprefixed secret name must not appear, so the report matches the YAML.
    strictEqual(joined.includes('Secret PERSONAL_ACCESS_TOKEN'), false);

    // A representative non-auto var appears under its prefixed name.
    strictEqual(joined.includes('Variable SGI_ISSUE_LABELS'), true);

    return;
  });

  it('resolves target variable names from target settings', () => {
    const workflow: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Workflow = {
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      deploy: [{
        to: 'npm',
        path: './packages/pkg-a',
        with: {
          NPM_TOKEN: 'CUSTOM_NPM_TOKEN',
        },
      }],
    };
    const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Environment = {};
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Result = Variables.collectSetupLines(workflow, 'nova-publish-project.yml', environment);
    const joined: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Joined = result.join('\n').replace(new RegExp(LIB_REGEX_PATTERN_ANSI, 'g'), '');

    strictEqual(joined.includes('Secret CUSTOM_NPM_TOKEN'), true);

    return;
  });

  it('lists public dotenv variables for publish scopes', () => {
    const workflow: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Workflow = {
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      build: ['./packages/pkg-a'],
      deploy: [{
        to: 'npm',
        path: './packages/pkg-a',
      }],
    };
    const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Environment = {
      apps: {
        './packages/pkg-a': {
          prefix: 'PKG_A_',
          variables: [
            {
              key: 'PUBLIC_SITE_KEY',
              secret: false,
              buildOnly: true,
            },
            {
              key: 'PUBLIC_GTM_ID',
              secret: false,
              buildOnly: true,
            },
            {
              key: 'RUNTIME_TOKEN',
              secret: true,
              buildOnly: false,
            },
          ],
        },
      },
    };
    const result: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Result = Variables.collectSetupLines(workflow, 'nova-publish-project.yml', environment);
    const joined: Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Joined = result.join('\n').replace(new RegExp(LIB_REGEX_PATTERN_ANSI, 'g'), '');

    // A build-only var lists under its prefixed GitHub name.
    strictEqual(joined.includes('Variable PKG_A_PUBLIC_SITE_KEY'), true);

    // A second build-only var lists under its prefixed GitHub name.
    strictEqual(joined.includes('Variable PKG_A_PUBLIC_GTM_ID'), true);

    // The unprefixed key must not appear, so the report matches the baked YAML.
    strictEqual(joined.includes('Variable PUBLIC_GTM_ID'), false);

    // A runtime value is never baked, so it must not appear in the build report.
    strictEqual(joined.includes('RUNTIME_TOKEN'), false);

    return;
  });

  return;
});
