import type { Lib_WorkflowTemplates_Entry } from '../../../../lib/workflow-templates.d.ts';
import type {
  Shared_BlueprintConfigWorkflow,
  Shared_NovaConfigEnvironment,
  Shared_NovaConfigWorkflow_Settings,
  Shared_WorkflowTemplateTarget,
  Shared_WorkflowTemplateVariable,
} from '../../../../shared.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Collect Setup Lines.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Workflow = Shared_BlueprintConfigWorkflow;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Environment = Shared_NovaConfigEnvironment;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Result = string[];

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ExcludesAutoSecretsAndListsNonAutoSecretsAndVars_Joined = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Collect Setup Lines.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Workflow = Shared_BlueprintConfigWorkflow;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Environment = Shared_NovaConfigEnvironment;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Result = string[];

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ListsPublicDotenvVariablesForPublishScopes_Joined = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Collect Setup Lines.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Workflow = Shared_BlueprintConfigWorkflow;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Environment = Shared_NovaConfigEnvironment;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Result = string[];

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesCollectSetupLines_ResolvesTargetVariableNamesFromTargetSettings_Joined = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Get Target Metadata.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTargetMetadata_ReturnsTheNpmTargetEntry_Result = Shared_WorkflowTemplateTarget | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Get Target Metadata.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTargetMetadata_ReturnsUndefinedForAnUnknownTarget_Result = Shared_WorkflowTemplateTarget | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Get Template Metadata.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTemplateMetadata_ReturnsThePublishTemplateEntry_Result = Lib_WorkflowTemplates_Entry | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Get Template Metadata.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesGetTemplateMetadata_ReturnsUndefinedForAnUnknownTemplate_Result = Lib_WorkflowTemplates_Entry | undefined;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_FallsBackToTheVariableNameWhenNoDefaultOrSetting_VariableMeta = Shared_WorkflowTemplateVariable;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_FallsBackToTheVariableNameWhenNoDefaultOrSetting_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_ResolvesToTheDefaultNameWithIdentitySettings_VariableMeta = Shared_WorkflowTemplateVariable;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_ResolvesToTheDefaultNameWithIdentitySettings_WorkflowSettings = Shared_NovaConfigWorkflow_Settings;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_ResolvesToTheDefaultNameWithIdentitySettings_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_VariableMeta = Shared_WorkflowTemplateVariable;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_TargetSettings = Shared_NovaConfigWorkflow_Settings;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_WorkflowSettings = Shared_NovaConfigWorkflow_Settings;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_TargetSettingBeatsWorkflowSetting_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_WorkflowSettingOverrideWins_VariableMeta = Shared_WorkflowTemplateVariable;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_WorkflowSettingOverrideWins_WorkflowSettings = Shared_NovaConfigWorkflow_Settings;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolve_WorkflowSettingOverrideWins_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve Expr.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersALiteralInline_Result = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve Expr.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersASecretReference_Result = string;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersASecretReference_Expected = string;

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve Expr.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersAVarReference_Result = string;

export type Tests_Cli_Generate_Github_WorkflowsBlueprintVariables_VariablesResolveExpr_RendersAVarReference_Expected = string;
