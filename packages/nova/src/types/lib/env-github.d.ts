import type { Shared_ShellOutput } from '../shared.d.ts';

/**
 * Lib - Env GitHub - Lib Env GitHub.
 *
 * @since 0.21.0
 */
export type Lib_EnvGithub_LibEnvGithub_ReadResultAvailable = boolean;

export type Lib_EnvGithub_LibEnvGithub_ReadResultVariables = string[];

export type Lib_EnvGithub_LibEnvGithub_ReadResultSecrets = string[];

export type Lib_EnvGithub_LibEnvGithub_ReadResult = {
  available: Lib_EnvGithub_LibEnvGithub_ReadResultAvailable;
  variables: Lib_EnvGithub_LibEnvGithub_ReadResultVariables;
  secrets: Lib_EnvGithub_LibEnvGithub_ReadResultSecrets;
};

export type Lib_EnvGithub_LibEnvGithub_Read = () => Promise<Lib_EnvGithub_LibEnvGithub_ReadResult>;

export type Lib_EnvGithub_LibEnvGithub_CreateStub = (name: string, secret: boolean) => Promise<boolean>;

export type Lib_EnvGithub_LibEnvGithub_Delete = (name: string, secret: boolean) => Promise<boolean>;

export type Lib_EnvGithub_LibEnvGithub = {
  read: Lib_EnvGithub_LibEnvGithub_Read;
  createStub: Lib_EnvGithub_LibEnvGithub_CreateStub;
  delete: Lib_EnvGithub_LibEnvGithub_Delete;
};

export type Lib_EnvGithub_GhAvailable = boolean;

export type Lib_EnvGithub_AuthResult = Shared_ShellOutput;

export type Lib_EnvGithub_VariableResult = Shared_ShellOutput;

export type Lib_EnvGithub_SecretResult = Shared_ShellOutput;

export type Lib_EnvGithub_StubPlaceholder = string;

export type Lib_EnvGithub_StubCommand = string;

export type Lib_EnvGithub_StubResult = Shared_ShellOutput;

export type Lib_EnvGithub_DeleteCommand = string;

export type Lib_EnvGithub_DeleteResult = Shared_ShellOutput;

/**
 * Lib - Env GitHub - Parse Gh Names.
 *
 * @since 0.21.0
 */
export type Lib_EnvGithub_ParseGhNames_Output = string;

export type Lib_EnvGithub_ParseGhNames_Returns = string[];

export type Lib_EnvGithub_ParseGhNames_Names = string[];

export type Lib_EnvGithub_ParseGhNames_RecordName = unknown;

export type Lib_EnvGithub_ParseGhNames_Record = {
  name?: Lib_EnvGithub_ParseGhNames_RecordName;
};

export type Lib_EnvGithub_ParseGhNames_Parsed = Lib_EnvGithub_ParseGhNames_Record[];
