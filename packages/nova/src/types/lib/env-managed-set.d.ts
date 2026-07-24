import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Workflows,
  Shared_NovaConfigEnvironment,
  Shared_NovaConfigEnvironment_Apps,
  Shared_NovaConfigEnvironment_Workflows,
  Shared_NovaConfigEnvironmentApp,
  Shared_NovaConfigEnvironmentGlobal,
  Shared_NovaConfigEnvironmentWorkflow,
  Shared_WorkflowTemplateTarget,
  Shared_WorkflowTemplateTargets,
  Shared_WorkflowTemplateVariable,
} from '../shared.d.ts';
import type { Lib_WorkflowTemplates_Entry } from './workflow-templates.d.ts';

/**
 * Lib - Env Managed Set - Lib Env Managed Set.
 *
 * @since 0.21.0
 */
export type Lib_EnvManagedSet_LibEnvManagedSet_ManagedKeyKind = 'app' | 'global' | 'workflow' | 'deploy-cred';

export type Lib_EnvManagedSet_LibEnvManagedSet_ManagedKeyName = string;

export type Lib_EnvManagedSet_LibEnvManagedSet_ManagedKeySecret = boolean;

export type Lib_EnvManagedSet_LibEnvManagedSet_ManagedKeyOptional = boolean;

export type Lib_EnvManagedSet_LibEnvManagedSet_ManagedKey = {
  name: Lib_EnvManagedSet_LibEnvManagedSet_ManagedKeyName;
  secret: Lib_EnvManagedSet_LibEnvManagedSet_ManagedKeySecret;
  kind: Lib_EnvManagedSet_LibEnvManagedSet_ManagedKeyKind;
  optional?: Lib_EnvManagedSet_LibEnvManagedSet_ManagedKeyOptional;
};

export type Lib_EnvManagedSet_LibEnvManagedSet_Compute = (config: Shared_NovaConfig) => Lib_EnvManagedSet_LibEnvManagedSet_ManagedKey[];

export type Lib_EnvManagedSet_LibEnvManagedSet = {
  compute: Lib_EnvManagedSet_LibEnvManagedSet_Compute;
};

export type Lib_EnvManagedSet_Candidates = Lib_EnvManagedSet_LibEnvManagedSet_ManagedKey[];

export type Lib_EnvManagedSet_Environment = Shared_NovaConfigEnvironment;

export type Lib_EnvManagedSet_Global = Shared_NovaConfigEnvironmentGlobal | undefined;

export type Lib_EnvManagedSet_Apps = Shared_NovaConfigEnvironment_Apps;

export type Lib_EnvManagedSet_App = Shared_NovaConfigEnvironmentApp;

export type Lib_EnvManagedSet_Workflows = Shared_NovaConfig_Workflows;

export type Lib_EnvManagedSet_WorkflowEnvironments = Shared_NovaConfigEnvironment_Workflows;

export type Lib_EnvManagedSet_TemplateMeta = Lib_WorkflowTemplates_Entry | undefined;

export type Lib_EnvManagedSet_WorkflowEnvironment = Shared_NovaConfigEnvironmentWorkflow | undefined;

export type Lib_EnvManagedSet_WorkflowPrefix = string | undefined;

export type Lib_EnvManagedSet_VariableName = string;

export type Lib_EnvManagedSet_VariableMeta = Shared_WorkflowTemplateVariable;

export type Lib_EnvManagedSet_ResolvedVariable = string;

export type Lib_EnvManagedSet_TemplateTargets = Shared_WorkflowTemplateTargets | undefined;

export type Lib_EnvManagedSet_TargetMeta = Shared_WorkflowTemplateTarget | undefined;

export type Lib_EnvManagedSet_AppPath = string;

export type Lib_EnvManagedSet_CredName = string;

export type Lib_EnvManagedSet_CredMeta = Shared_WorkflowTemplateVariable;

export type Lib_EnvManagedSet_CredApp = Shared_NovaConfigEnvironmentApp | undefined;

export type Lib_EnvManagedSet_CredPrefix = string | undefined;

export type Lib_EnvManagedSet_ResolvedCred = string;

export type Lib_EnvManagedSet_ManagedCred = Lib_EnvManagedSet_LibEnvManagedSet_ManagedKey;

export type Lib_EnvManagedSet_Seen = Set<string>;

export type Lib_EnvManagedSet_Results = Lib_EnvManagedSet_LibEnvManagedSet_ManagedKey[];

export type Lib_EnvManagedSet_CandidateName = string;
