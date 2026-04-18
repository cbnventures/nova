import type { SharedNovaConfigWorkspaceRecipeName } from '../../shared.d.ts';

/**
 * CLI - Recipe - Registry.
 *
 * @since 0.14.0
 */
export type CliRecipeRegistry = CliRecipeRegistryEntry[];

/**
 * CLI - Recipe - Registry Entry.
 *
 * @since 0.14.0
 */
export type CliRecipeRegistryEntryName = SharedNovaConfigWorkspaceRecipeName;

export type CliRecipeRegistryEntryRunOptionsDryRun = true;

export type CliRecipeRegistryEntryRunOptionsReplaceFile = true;

export type CliRecipeRegistryEntryRunOptions = {
  dryRun?: CliRecipeRegistryEntryRunOptionsDryRun;
  replaceFile?: CliRecipeRegistryEntryRunOptionsReplaceFile;
};

export type CliRecipeRegistryEntryRunReturns = Promise<void>;

export type CliRecipeRegistryEntryRun = (options: CliRecipeRegistryEntryRunOptions) => CliRecipeRegistryEntryRunReturns;

export type CliRecipeRegistryEntryLabel = string;

export type CliRecipeRegistryEntry = {
  name: CliRecipeRegistryEntryName;
  label: CliRecipeRegistryEntryLabel;
  run: CliRecipeRegistryEntryRun;
};
