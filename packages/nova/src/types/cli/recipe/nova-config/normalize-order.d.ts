import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_NovaConfig,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes_NovaConfig,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - Nova Config - Normalize Order - Run.
 *
 * @since 0.33.0
 */
export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Options = {
  dryRun?: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_LoadedConfig = Shared_NovaConfig;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Diagnostics_Item_Severity = 'error' | 'warning';

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Diagnostics_Item_Message = string;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Diagnostics_Item = {
  severity: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Diagnostics_Item_Severity;
  message: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Diagnostics_Item_Message;
};

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Diagnostics = Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Diagnostics_Item[];

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NovaConfigRecipes = Shared_NovaConfig_Recipes_NovaConfig | undefined;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NovaConfigRecipe = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ConfigPath = string;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_RawConfig = string;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ParsedConfig = unknown;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Config = Record<string, unknown>;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NormalizedConfig = Record<string, unknown>;

export type Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NormalizedContents = string;
