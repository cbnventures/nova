import type {
  Shared_NovaConfigGithubRecipeName,
  Shared_NovaConfigLicenseRecipeName,
  Shared_NovaConfigReadMeRecipeName,
  Shared_NovaConfigWorkspaceRecipeName,
} from '../../shared.d.ts';

/**
 * CLI - Recipe - Registry.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_Registry = {
  'github': Cli_Recipe_RegistryEntry[];
  'license': Cli_Recipe_RegistryEntry[];
  'read-me': Cli_Recipe_RegistryEntry[];
  'package-json': Cli_Recipe_RegistryEntry[];
};

export type Cli_Recipe_RegistryCategory = keyof Cli_Recipe_Registry;

/**
 * CLI - Recipe - Registry Entry.
 *
 * @since 0.14.0
 */
export type Cli_Recipe_RegistryEntry_Name = Shared_NovaConfigGithubRecipeName | Shared_NovaConfigLicenseRecipeName | Shared_NovaConfigReadMeRecipeName | Shared_NovaConfigWorkspaceRecipeName;

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
