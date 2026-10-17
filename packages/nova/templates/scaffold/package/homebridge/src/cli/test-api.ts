import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

import { Logger } from '@cbnventures/nova/toolkit';

import { renderHeader, writeHelp } from './presentation.js';

import type {
  Cli_TestApi_Arguments,
  Cli_TestApi_ConfigFlagIndex,
  Cli_TestApi_ConfigPath,
  Cli_TestApi_ConfigRaw,
  Cli_TestApi_ConfigValue,
  Cli_TestApi_HasHelpFlag,
  Cli_TestApi_IsMatchingPlatformConfig_TypeGuard,
  Cli_TestApi_IsMatchingPlatformConfig_Value,
  Cli_TestApi_IsPlatformConfig_TypeGuard,
  Cli_TestApi_IsPlatformConfig_Value,
  Cli_TestApi_PlatformConfig,
  Cli_TestApi_Platforms,
} from '../types/cli/test-api.d.ts';

/**
 * Test API - Is Platform Config.
 *
 * Narrows one Homebridge platform entry before reading its platform identifier.
 * Arrays and null are rejected even though JavaScript reports them as objects.
 *
 * @param {Cli_TestApi_IsPlatformConfig_Value} value - Value.
 *
 * @returns {Cli_TestApi_IsPlatformConfig_TypeGuard}
 *
 * @since 0.0.0
 */
function isPlatformConfig(value: Cli_TestApi_IsPlatformConfig_Value): value is Cli_TestApi_IsPlatformConfig_TypeGuard {
  return (
    typeof value === 'object'
    && value !== null
    && Array.isArray(value) === false
  );
}

/**
 * Test API - Is Matching Platform Config.
 *
 * Narrows a Homebridge platform entry to the generated platform identifier.
 * This keeps the subsequent config lookup both explicit and type-safe.
 *
 * @param {Cli_TestApi_IsMatchingPlatformConfig_Value} value - Value.
 *
 * @returns {Cli_TestApi_IsMatchingPlatformConfig_TypeGuard}
 *
 * @since 0.0.0
 */
function isMatchingPlatformConfig(value: Cli_TestApi_IsMatchingPlatformConfig_Value): value is Cli_TestApi_IsMatchingPlatformConfig_TypeGuard {
  return (
    isPlatformConfig(value) === true
    && value['platform'] === '[__WORKSPACE_IDENTIFIER__]'
  );
}

/**
 * Test API - Command Arguments.
 *
 * Captures user arguments without the Node.js executable and launcher paths.
 * The resulting list controls help and explicit config-file selection.
 *
 * @since 0.0.0
 */
const commandArguments: Cli_TestApi_Arguments = process.argv.slice(2);

/**
 * Test API - Has Help Flag.
 *
 * Determines whether the command should print help instead of reading config.
 * Both conventional short and long flags are supported.
 *
 * @since 0.0.0
 */
const hasHelpFlag: Cli_TestApi_HasHelpFlag = commandArguments.includes('-h') || commandArguments.includes('--help');

if (hasHelpFlag === true) {
  writeHelp('[__WORKSPACE_PACKAGE_NAME__]-test-api', 'Homebridge API smoke-test starter', [
    '--config <path>  Read a specific Homebridge config.json',
    '-h, --help       Display the help menu',
  ]);
} else {
  process.stdout.write(`${renderHeader('Homebridge API smoke-test starter')}\n`);

  /**
   * Test API - Config Flag Index.
   *
   * Locates an explicit Homebridge config path when one was supplied.
   * Missing flags fall back to the current user's standard Homebridge config.
   *
   * @since 0.0.0
   */
  const configFlagIndex: Cli_TestApi_ConfigFlagIndex = commandArguments.indexOf('--config');

  /**
   * Test API - Config Path.
   *
   * Holds the explicit or conventional config file resolved for this smoke test.
   * The path is reported verbatim after the generated platform is found.
   *
   * @since 0.0.0
   */
  const configPath: Cli_TestApi_ConfigPath = (configFlagIndex === -1) ? join(homedir(), '.homebridge', 'config.json') : resolve(commandArguments[configFlagIndex + 1] ?? '');

  if (configFlagIndex !== -1 && commandArguments[configFlagIndex + 1] === undefined) {
    Logger.error('The --config option requires a file path.');

    process.exitCode = 1;
  } else {
    try {
      const configRaw: Cli_TestApi_ConfigRaw = await readFile(configPath, 'utf-8');
      const configValue: Cli_TestApi_ConfigValue = JSON.parse(configRaw);
      const platforms: Cli_TestApi_Platforms = (isPlatformConfig(configValue) === true) ? configValue['platforms'] : undefined;
      const platformConfig: Cli_TestApi_PlatformConfig = (Array.isArray(platforms) === true) ? platforms.find(isMatchingPlatformConfig) : undefined;

      if (platformConfig === undefined) {
        throw new Error('The config does not contain the "[__WORKSPACE_IDENTIFIER__]" platform.');
      }

      Logger.info(`Validated the "[__WORKSPACE_IDENTIFIER__]" platform in "${configPath}".`);
      Logger.info('Add provider-specific requests to src/cli/test-api.ts when the plugin gains an external API.');
    } catch (error) {
      Logger.error((error instanceof Error) ? error.message : String(error));

      process.exitCode = 1;
    }
  }
}
