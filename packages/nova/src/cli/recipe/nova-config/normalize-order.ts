import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { normalizeNovaConfigTopLevelOrder } from '../../../lib/nova-config-order.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  isPlainObject,
  isProjectRoot,
  renameFileWithDate,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Config,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ConfigPath,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_CurrentDirectory,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Diagnostics,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_IsDryRun,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_IsReplaceFile,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_LoadedConfig,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NormalizedConfig,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NormalizedContents,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NovaConfig,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NovaConfigRecipe,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NovaConfigRecipes,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Options,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ParsedConfig,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_RawConfig,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Returns,
} from '../../../types/cli/recipe/nova-config/normalize-order.d.ts';

/**
 * CLI - Recipe - Nova Config - Normalize Order.
 *
 * Reorders only the top-level keys in nova.config.json while preserving every
 * nested value and any unrecognized top-level fields.
 *
 * @since 0.33.0
 */
export class Runner {
  /**
   * CLI - Recipe - Nova Config - Normalize Order - Run.
   *
   * Reads nova.config.json without schema coercion, applies Nova's canonical
   * top-level order, and writes the result with normal backup semantics.
   *
   * @param {Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Returns}
   *
   * @since 0.33.0
   */
  public static async run(options: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Options): Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const novaConfig: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NovaConfig = new LibNovaConfig();
    const loadedConfig: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_LoadedConfig = await novaConfig.load();
    const diagnostics: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Diagnostics = novaConfig.diagnostics();

    if (diagnostics.some((diagnostic) => diagnostic['severity'] === 'error') === true) {
      Logger.error('Unable to normalize "nova.config.json" because it is invalid.');

      process.exitCode = 1;

      return;
    }

    const novaConfigRecipes: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NovaConfigRecipes = (loadedConfig['recipes'] !== undefined) ? loadedConfig['recipes']['nova-config'] : undefined;
    const novaConfigRecipe: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NovaConfigRecipe = (novaConfigRecipes !== undefined) ? novaConfigRecipes['normalize-order'] : undefined;

    if (novaConfigRecipe === undefined || novaConfigRecipe['enabled'] !== true) {
      Logger.warn('Skipping normalize-order. The recipe is not enabled in the "nova.config.json" file.');

      return;
    }

    const isDryRun: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const configPath: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ConfigPath = join(currentDirectory, 'nova.config.json');

    let rawConfig: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_RawConfig = '';

    try {
      rawConfig = await fs.readFile(configPath, 'utf-8');
    } catch (error) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'read',
      }).error('Unable to read "nova.config.json" from the project root.');

      Logger.customize({
        name: 'Runner.run',
        purpose: 'readDebug',
      }).debug(error);

      process.exitCode = 1;

      return;
    }

    let parsedConfig: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ParsedConfig = undefined;

    try {
      parsedConfig = JSON.parse(rawConfig) as Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_ParsedConfig;
    } catch (error) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'parse',
      }).error('The project root "nova.config.json" file must contain valid JSON.');

      Logger.customize({
        name: 'Runner.run',
        purpose: 'parseDebug',
      }).debug(error);

      process.exitCode = 1;

      return;
    }

    if (isPlainObject(parsedConfig) === false) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'shape',
      }).error('The project root "nova.config.json" file must contain a JSON object.');

      process.exitCode = 1;

      return;
    }

    const config: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_Config = parsedConfig;
    const normalizedConfig: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NormalizedConfig = normalizeNovaConfigTopLevelOrder(config);
    const normalizedContents: Cli_Recipe_NovaConfig_NormalizeOrder_Runner_Run_NormalizedContents = `${JSON.stringify(normalizedConfig, null, 2)}\n`;

    if (rawConfig === normalizedContents) {
      Logger.info('The top-level "nova.config.json" key order is already normalized.');

      return;
    }

    if (isDryRun === true) {
      Logger.info('Would normalize the top-level "nova.config.json" key order.');

      return;
    }

    if (isReplaceFile === false) {
      await renameFileWithDate(configPath);
    }

    await fs.writeFile(configPath, normalizedContents, 'utf-8');

    Logger.info('Normalized the top-level "nova.config.json" key order.');

    return;
  }
}
