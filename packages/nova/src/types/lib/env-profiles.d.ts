import type {
  Shared_NovaConfigEnvironment,
  Shared_NovaConfigEnvironmentValue,
  Shared_NovaConfigEnvironmentWorkspace,
} from '../shared.d.ts';

/**
 * Lib - Env Profiles.
 *
 * @since 0.36.0
 */
export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Options_RootDirectory = string;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Options_CurrentEnabled = boolean;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Options_NextEnabled = boolean;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Options_Environment = Shared_NovaConfigEnvironment;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Options = {
  rootDirectory: Lib_EnvProfiles_MigrateEnvironmentProfiles_Options_RootDirectory;
  currentEnabled: Lib_EnvProfiles_MigrateEnvironmentProfiles_Options_CurrentEnabled;
  nextEnabled: Lib_EnvProfiles_MigrateEnvironmentProfiles_Options_NextEnabled;
  environment: Lib_EnvProfiles_MigrateEnvironmentProfiles_Options_Environment;
};

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Returns = Promise<void>;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_RootDirectory = string;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_CurrentEnabled = boolean;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_NextEnabled = boolean;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Environment = Shared_NovaConfigEnvironment;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Workspaces = Record<string, Shared_NovaConfigEnvironmentWorkspace>;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_WorkspaceEntry = [string, Shared_NovaConfigEnvironmentWorkspace];

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_WorkspacePath = string;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Workspace = Shared_NovaConfigEnvironmentWorkspace;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_Variables = Shared_NovaConfigEnvironmentValue[];

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_TargetDirectory = string;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainEnvPath = string;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainSamplePath = string;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentEnvPath = string;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentSamplePath = string;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainEnvExists = boolean;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainSampleExists = boolean;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainEnvContents = string | undefined;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_PlainSampleContents = string | undefined;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentEnvContents = string;

export type Lib_EnvProfiles_MigrateEnvironmentProfiles_DevelopmentSampleContents = string;
