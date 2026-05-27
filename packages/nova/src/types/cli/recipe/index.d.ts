import type {
  Shared_NovaConfigGithubRecipeName as SharedNovaConfigGithubRecipeName,
  Shared_NovaConfigWorkspaceRecipeName as SharedNovaConfigWorkspaceRecipeName,
} from '../../shared.d.ts';

/**
 * CLI - Recipe - Registry.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_Registry = {
  'github': Cli_Recipe_RegistryEntry[];
  'package-json': Cli_Recipe_RegistryEntry[];
};

export type Cli_Recipe_RegistryCategory = keyof Cli_Recipe_Registry;

/**
 * CLI - Recipe - Registry Entry.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_RegistryEntry_Name = SharedNovaConfigGithubRecipeName | SharedNovaConfigWorkspaceRecipeName;

export type Cli_Recipe_RegistryEntryRunOptions_DryRun = true;

export type Cli_Recipe_RegistryEntryRunOptions_ReplaceFile = true;

export type Cli_Recipe_RegistryEntryRunOptions = {
  dryRun?: Cli_Recipe_RegistryEntryRunOptions_DryRun;
  replaceFile?: Cli_Recipe_RegistryEntryRunOptions_ReplaceFile;
};

export type Cli_Recipe_RegistryEntryRunReturns = Promise<void>;

export type Cli_Recipe_RegistryEntry_Run = (options: Cli_Recipe_RegistryEntryRunOptions) => Cli_Recipe_RegistryEntryRunReturns;

export type Cli_Recipe_RegistryEntry = {
  name: Cli_Recipe_RegistryEntry_Name;
  run: Cli_Recipe_RegistryEntry_Run;
};
