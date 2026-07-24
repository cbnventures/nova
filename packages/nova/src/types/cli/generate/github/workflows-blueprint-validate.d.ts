import type { Lib_WorkflowTemplates_Entry } from '../../../lib/workflow-templates.d.ts';
import type {
  Shared_BlueprintConfigWorkflow,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigWorkflow_DependsOn,
  Shared_NovaConfigWorkflow_Settings,
  Shared_NovaConfigWorkspace,
  Shared_WorkflowTemplateTarget,
  Shared_WorkflowTemplateVariable,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Template Name.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_TemplateName = 'check-sponsor-gated-issues' | 'lock-inactive-issues' | 'publish';

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Target Type.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_TargetType = 'npm' | 'github-action' | 'github-packages' | 'cloudflare-pages-docusaurus' | 'cloudflare-workers' | 'docker-hub' | 'ghcr' | 'github-pages-docusaurus' | 'vercel-nextjs';

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Trigger Name.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_TriggerName = 'issues' | 'issue-comment' | 'schedule-weekly' | 'schedule-daily' | 'schedule-monthly' | 'release' | 'tag-push' | 'push' | 'workflow-run-success' | 'workflow-run-any' | 'workflow-run-failure';

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Diagnostic Severity.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_DiagnosticSeverity = 'error';

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Diagnostic.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Diagnostic_Severity = Cli_Generate_Github_WorkflowsBlueprintValidate_DiagnosticSeverity;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Diagnostic_Message = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Diagnostic = {
  severity: Cli_Generate_Github_WorkflowsBlueprintValidate_Diagnostic_Severity;
  message: Cli_Generate_Github_WorkflowsBlueprintValidate_Diagnostic_Message;
};

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Result.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Result_Workflows = Shared_BlueprintConfigWorkflow[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Result_Diagnostics = Cli_Generate_Github_WorkflowsBlueprintValidate_Diagnostic[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Result = {
  workflows: Cli_Generate_Github_WorkflowsBlueprintValidate_Result_Workflows;
  diagnostics: Cli_Generate_Github_WorkflowsBlueprintValidate_Result_Diagnostics;
};

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Allowed Templates.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_AllowedTemplates = Cli_Generate_Github_WorkflowsBlueprintValidate_TemplateName[];

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Buildable Target Types.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_BuildableTargetTypes = Cli_Generate_Github_WorkflowsBlueprintValidate_TargetType[];

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Valid Triggers By Template.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_ValidTriggersByTemplate = Record<Cli_Generate_Github_WorkflowsBlueprintValidate_TemplateName, Cli_Generate_Github_WorkflowsBlueprintValidate_TriggerName[]>;

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Runner - Collect Workflow Run References.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_TriggerList = unknown[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_Returns = string[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_References = string[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_Trigger = Record<string, unknown>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_TriggerName = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_CollectWorkflowRunReferences_WorkflowReferences = string[];

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Runner - Deploy Migration Hint.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_Deploy = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_Returns = string | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DeployMigrationHint_DeployEntry = Record<string, unknown>;

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Runner - Detect Circular Depends On.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_RawEntries = unknown[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Returns = boolean;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_DependsOnMap = Map<string, string[]>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapEntry = Record<string, unknown>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapKey = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapTriggers = unknown[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_MapDependsOn = string[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_StartKey = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_StartDependsOn = string[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Visited = Set<string>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_Queue = string[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_CurrentId = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_DetectCircularDependsOn_CurrentDependsOn = string[];

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Runner - Env Migration Hint.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_Workspaces = Shared_NovaConfig_Workspaces;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_Returns = string | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_WorkspaceList = Shared_NovaConfigWorkspace[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_EnvMigrationHint_WorkspaceEntry = Record<string, unknown>;

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Runner - Is Non Empty String Array.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsNonEmptyStringArray_Value = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsNonEmptyStringArray_Returns = boolean;

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Runner - Is Plain Object.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsPlainObject_Value = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_IsPlainObject_Returns = boolean;

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Runner - Validate.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawWorkflows = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Workspaces = Shared_NovaConfig_Workspaces;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsWorkflows = Shared_BlueprintConfigWorkflow[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsDiagnosticSeverity = 'error';

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsDiagnosticMessage = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsDiagnostic = {
  severity: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsDiagnosticSeverity;
  message: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsDiagnosticMessage;
};

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsDiagnostics = Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsDiagnostic[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Returns = {
  workflows: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsWorkflows;
  diagnostics: Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsDiagnostics;
};

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Diagnostics = Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ReturnsDiagnostic[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Workflows = Shared_BlueprintConfigWorkflow[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_SeenKeys = Set<string>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniquenessMap = Map<string, string>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawEntries = unknown[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_EnvMigration = string | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_EntryKeys = Set<string>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_RawKeyEntry = Record<string, unknown>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Entry = Record<string, unknown>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowMigration = string | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_DeployMigration = string | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Template = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Suffix = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Triggers = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_HasError = boolean;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_HasWorkflowRunTrigger = boolean;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TemplateName = 'check-sponsor-gated-issues' | 'lock-inactive-issues' | 'publish';

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Metadata = Lib_WorkflowTemplates_Entry | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_SuffixValue = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowKey = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerName = 'issues' | 'issue-comment' | 'schedule-weekly' | 'schedule-daily' | 'schedule-monthly' | 'release' | 'tag-push' | 'push' | 'workflow-run-success' | 'workflow-run-any' | 'workflow-run-failure';

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ValidTriggers = Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerName[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerList = unknown[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Trigger = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObject = Record<string, unknown>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectName = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectNameValue = Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerName;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectBranches = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectPaths = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TriggerObjectTags = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_DependsOnEntries = Shared_NovaConfigWorkflow_DependsOn;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Reference = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkflowSettings = Shared_NovaConfigWorkflow_Settings | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Targets = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Scopes = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Scope = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_IsRegisteredScope = boolean;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Target = Record<string, unknown>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TargetType = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_TargetTypeName = 'npm' | 'github-action' | 'github-packages' | 'cloudflare-pages-docusaurus' | 'cloudflare-workers' | 'docker-hub' | 'ghcr' | 'github-pages-docusaurus' | 'vercel-nextjs';

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_WorkingDir = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_IsRegisteredWorkingDir = boolean;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_MissingLiterals = string[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_VariableName = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_VariableMeta = Shared_WorkflowTemplateVariable;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Resolved = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTarget = Record<string, unknown>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetType = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetTypeName = 'npm' | 'github-action' | 'github-packages' | 'cloudflare-pages-docusaurus' | 'cloudflare-workers' | 'docker-hub' | 'ghcr' | 'github-pages-docusaurus' | 'vercel-nextjs';

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetSettings = Shared_NovaConfigWorkflow_Settings | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralTargetMetadata = Shared_WorkflowTemplateTarget | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralVariableName = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralVariableMeta = Shared_WorkflowTemplateVariable;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_LiteralResolved = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTarget = Record<string, unknown>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetType = unknown;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetTypeName = 'npm' | 'github-action' | 'github-packages' | 'cloudflare-pages-docusaurus' | 'cloudflare-workers' | 'docker-hub' | 'ghcr' | 'github-pages-docusaurus' | 'vercel-nextjs';

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetSettings = Shared_NovaConfigWorkflow_Settings | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueTargetMetadata = Shared_WorkflowTemplateTarget | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniquenessKey = string[] | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ResolvedValues = string[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_DetailEntries = string[];

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueVariableName = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueVariableMeta = Shared_WorkflowTemplateVariable | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_UniqueVariableMetaResolved = Shared_WorkflowTemplateVariable;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ResolvedValue = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Composite = string;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_Existing = string | undefined;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_Validate_ValidatedEntry = Shared_BlueprintConfigWorkflow;

/**
 * CLI - Generate - GitHub - Workflows Blueprint Validate - Runner - Workflow Migration Hint.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_WorkflowMigrationHint_Entry = Record<string, unknown>;

export type Cli_Generate_Github_WorkflowsBlueprintValidate_Runner_WorkflowMigrationHint_Returns = string | undefined;
