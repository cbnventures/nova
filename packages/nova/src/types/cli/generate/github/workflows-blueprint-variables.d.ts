import type { Lib_WorkflowTemplates_Entry } from '../../../lib/workflow-templates.d.ts';
import type {
  Shared_BlueprintConfigWorkflow,
  Shared_BlueprintConfigWorkflow_Deploy,
  Shared_BlueprintConfigWorkflow_Name,
  Shared_NovaConfigEnvironment,
  Shared_NovaConfigEnvironment_Apps,
  Shared_NovaConfigEnvironment_Workflows,
  Shared_NovaConfigEnvironmentApp,
  Shared_NovaConfigEnvironmentApp_Prefix,
  Shared_NovaConfigEnvironmentWorkflow,
  Shared_NovaConfigEnvironmentWorkflow_Prefix,
  Shared_NovaConfigWorkflow_Scopes,
  Shared_NovaConfigWorkflow_Settings,
  Shared_WorkflowTemplateTarget,
  Shared_WorkflowTemplateTargetType,
  Shared_WorkflowTemplateVariable,
  Shared_WorkflowTemplateVariable_Format,
  Shared_WorkflowTemplateVariableName,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - GitHub - Workflows Blueprint Variables - Collect Setup Lines.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ValidatedWorkflow = Shared_BlueprintConfigWorkflow;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_OutputFileName = string;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Environment = Shared_NovaConfigEnvironment;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Returns = string[];

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Lines = string[];

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Template = string;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TemplateMetadata = Lib_WorkflowTemplates_Entry | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowSettings = Shared_NovaConfigWorkflow_Settings | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowName = Shared_BlueprintConfigWorkflow_Name;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowEnvironments = Shared_NovaConfigEnvironment_Workflows | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowEnvironment = Shared_NovaConfigEnvironmentWorkflow | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_WorkflowPrefix = Shared_NovaConfigEnvironmentWorkflow_Prefix | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_VariableName = Shared_WorkflowTemplateVariableName;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_VariableMeta = Shared_WorkflowTemplateVariable;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ResolvedName = string;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Scopes = Shared_NovaConfigWorkflow_Scopes;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Apps = Shared_NovaConfigEnvironment_Apps | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ScopeApp = Shared_NovaConfigEnvironmentApp | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ScopeAppPrefix = Shared_NovaConfigEnvironmentApp_Prefix;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_ScopeBuildName = string;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_Targets = Shared_BlueprintConfigWorkflow_Deploy | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetType = Shared_WorkflowTemplateTargetType;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetSettings = Shared_NovaConfigWorkflow_Settings | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetMetadata = Shared_WorkflowTemplateTarget | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetVariableName = Shared_WorkflowTemplateVariableName;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetVariableMeta = Shared_WorkflowTemplateVariable;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_CollectSetupLines_TargetResolvedName = string;

/**
 * CLI - Generate - GitHub - Workflows Blueprint Variables - Get Target Metadata.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Template = string;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_TargetType = Shared_WorkflowTemplateTargetType;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Returns = Shared_WorkflowTemplateTarget | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_TemplateMetadata = Lib_WorkflowTemplates_Entry | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTargetMetadata_Targets = Lib_WorkflowTemplates_Entry['targets'];

/**
 * CLI - Generate - GitHub - Workflows Blueprint Variables - Get Template Metadata.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTemplateMetadata_Template = string;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_GetTemplateMetadata_Returns = Lib_WorkflowTemplates_Entry | undefined;

/**
 * CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_VariableName = Shared_WorkflowTemplateVariableName;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_TargetSettings = Shared_NovaConfigWorkflow_Settings | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_WorkflowSettings = Shared_NovaConfigWorkflow_Settings | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_VariableMeta = Shared_WorkflowTemplateVariable;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_Resolve_Returns = string;

/**
 * CLI - Generate - GitHub - Workflows Blueprint Variables - Resolve Expr.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_Format = Shared_WorkflowTemplateVariable_Format;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_ResolvedName = string;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_Returns = string;

export type Cli_Generate_Github_WorkflowsBlueprintVariables_Runner_ResolveExpr_DollarBrace = string;
