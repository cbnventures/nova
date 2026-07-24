import type {
  Shared_NovaConfigEnvironment,
  Shared_NovaConfigEnvironment_Apps,
  Shared_NovaConfigEnvironment_Workflows,
  Shared_NovaConfigEnvironmentApp,
  Shared_NovaConfigEnvironmentGlobal,
} from '../shared.d.ts';
import type { Lib_EnvManagedSet_LibEnvManagedSet_ManagedKey } from './env-managed-set.d.ts';

/**
 * Lib - Env Status - Lib Env Status.
 *
 * @since 0.21.0
 */
export type Lib_EnvStatus_LibEnvStatus_StatusEntryState = 'declared' | 'missing' | 'stale' | 'type-mismatch' | 'unmanaged' | 'empty-bake' | 'local-orphan' | 'optional-absent';

export type Lib_EnvStatus_LibEnvStatus_StatusEntryName = string;

export type Lib_EnvStatus_LibEnvStatus_StatusEntry = {
  name: Lib_EnvStatus_LibEnvStatus_StatusEntryName;
  state: Lib_EnvStatus_LibEnvStatus_StatusEntryState;
};

export type Lib_EnvStatus_LibEnvStatus_GithubStateAvailable = boolean;

export type Lib_EnvStatus_LibEnvStatus_GithubStateVariables = string[];

export type Lib_EnvStatus_LibEnvStatus_GithubStateSecrets = string[];

export type Lib_EnvStatus_LibEnvStatus_GithubStateVariableValues = {
  [key: string]: string;
};

export type Lib_EnvStatus_LibEnvStatus_GithubState = {
  available: Lib_EnvStatus_LibEnvStatus_GithubStateAvailable;
  variables?: Lib_EnvStatus_LibEnvStatus_GithubStateVariables;
  secrets?: Lib_EnvStatus_LibEnvStatus_GithubStateSecrets;
  variableValues?: Lib_EnvStatus_LibEnvStatus_GithubStateVariableValues;
};

export type Lib_EnvStatus_LibEnvStatus_Classify = (managedSet: Lib_EnvManagedSet_LibEnvManagedSet_ManagedKey[], githubState: Lib_EnvStatus_LibEnvStatus_GithubState, environment: Shared_NovaConfigEnvironment) => Lib_EnvStatus_LibEnvStatus_StatusEntry[];

export type Lib_EnvStatus_LibEnvStatus_LocalEnv = {
  [key: string]: string[];
};

export type Lib_EnvStatus_LibEnvStatus_LocalOrphans = (environment: Shared_NovaConfigEnvironment, localEnv: Lib_EnvStatus_LibEnvStatus_LocalEnv) => Lib_EnvStatus_LibEnvStatus_StatusEntry[];

export type Lib_EnvStatus_LibEnvStatus = {
  classify: Lib_EnvStatus_LibEnvStatus_Classify;
  localOrphans: Lib_EnvStatus_LibEnvStatus_LocalOrphans;
};

export type Lib_EnvStatus_Results = Lib_EnvStatus_LibEnvStatus_StatusEntry[];

export type Lib_EnvStatus_Variables = string[];

export type Lib_EnvStatus_Secrets = string[];

export type Lib_EnvStatus_VariableValues = Lib_EnvStatus_LibEnvStatus_GithubStateVariableValues | undefined;

export type Lib_EnvStatus_ManagedNames = Set<string>;

export type Lib_EnvStatus_Global = Shared_NovaConfigEnvironmentGlobal | undefined;

export type Lib_EnvStatus_Apps = Shared_NovaConfigEnvironment_Apps;

export type Lib_EnvStatus_WorkflowEnvironments = Shared_NovaConfigEnvironment_Workflows;

export type Lib_EnvStatus_Prefixes = string[];

export type Lib_EnvStatus_DeclaredDefaults = Set<string>;

export type Lib_EnvStatus_App = Shared_NovaConfigEnvironmentApp;

export type Lib_EnvStatus_Name = string;

export type Lib_EnvStatus_InVariables = boolean;

export type Lib_EnvStatus_InSecrets = boolean;

export type Lib_EnvStatus_State = 'declared' | 'empty-bake';

export type Lib_EnvStatus_Value = string | undefined;

export type Lib_EnvStatus_ValueEmpty = boolean;

export type Lib_EnvStatus_UnderPrefix = boolean;

export type Lib_EnvStatus_OrphanResults = Lib_EnvStatus_LibEnvStatus_StatusEntry[];

export type Lib_EnvStatus_OrphanApps = Shared_NovaConfigEnvironment_Apps;

export type Lib_EnvStatus_OrphanSeen = Set<string>;

export type Lib_EnvStatus_OrphanAppPath = string;

export type Lib_EnvStatus_OrphanApp = Shared_NovaConfigEnvironmentApp;

export type Lib_EnvStatus_OrphanDeclared = Set<string>;

export type Lib_EnvStatus_OrphanFilledKeys = string[];
