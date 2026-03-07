import type { NovaConfigWorkspaceRecipeName } from '@/types/shared.d.ts';

/**
 * CLI Recipe - Registry entry.
 *
 * @since 1.0.0
 */
export type CLIRecipeRegistryEntryName = NovaConfigWorkspaceRecipeName;

export type CLIRecipeRegistryEntryRunOptionsDryRun = true;

export type CLIRecipeRegistryEntryRunOptionsReplaceFile = true;

export type CLIRecipeRegistryEntryRunOptions = {
  dryRun?: CLIRecipeRegistryEntryRunOptionsDryRun;
  replaceFile?: CLIRecipeRegistryEntryRunOptionsReplaceFile;
};

export type CLIRecipeRegistryEntryRunReturns = Promise<void>;

export type CLIRecipeRegistryEntryRun = (options: CLIRecipeRegistryEntryRunOptions) => CLIRecipeRegistryEntryRunReturns;

export type CLIRecipeRegistryEntryLabel = string;

export type CLIRecipeRegistryEntry = {
  name: CLIRecipeRegistryEntryName;
  label: CLIRecipeRegistryEntryLabel;
  run: CLIRecipeRegistryEntryRun;
};

/**
 * CLI Recipe - Registry.
 *
 * @since 1.0.0
 */
export type CLIRecipeRegistry = CLIRecipeRegistryEntry[];
