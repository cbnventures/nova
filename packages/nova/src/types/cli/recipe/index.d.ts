import type {
  SharedNovaConfigGithubRecipeName,
  SharedNovaConfigWorkspaceRecipeName,
} from '../../shared.d.ts';

/**
 * CLI - Recipe - Registry.
 *
 * @since 0.14.0
 */
export type CliRecipeRegistry = {
  'github': CliRecipeRegistryEntry[];
  'package-json': CliRecipeRegistryEntry[];
};

export type CliRecipeRegistryCategory = keyof CliRecipeRegistry;

/**
 * CLI - Recipe - Registry Entry.
 *
 * @since 0.14.0
 */
export type CliRecipeRegistryEntryName = SharedNovaConfigGithubRecipeName | SharedNovaConfigWorkspaceRecipeName;

export type CliRecipeRegistryEntryRunOptionsDryRun = true;

export type CliRecipeRegistryEntryRunOptionsReplaceFile = true;

export type CliRecipeRegistryEntryRunOptions = {
  dryRun?: CliRecipeRegistryEntryRunOptionsDryRun;
  replaceFile?: CliRecipeRegistryEntryRunOptionsReplaceFile;
};

export type CliRecipeRegistryEntryRunReturns = Promise<void>;

export type CliRecipeRegistryEntryRun = (options: CliRecipeRegistryEntryRunOptions) => CliRecipeRegistryEntryRunReturns;

export type CliRecipeRegistryEntry = {
  name: CliRecipeRegistryEntryName;
  run: CliRecipeRegistryEntryRun;
};
