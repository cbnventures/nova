import {
  existsSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';

import { isPlainObject } from '../lib/utility.js';

import type {
  Toolkit_VitestCoverage_Runner_FindConfigPath_CandidatePath,
  Toolkit_VitestCoverage_Runner_FindConfigPath_CurrentDirectory,
  Toolkit_VitestCoverage_Runner_FindConfigPath_ParentDirectory,
  Toolkit_VitestCoverage_Runner_FindConfigPath_Returns,
  Toolkit_VitestCoverage_Runner_FindConfigPath_StartDirectory,
  Toolkit_VitestCoverage_Runner_Minimum_ConfigPath,
  Toolkit_VitestCoverage_Runner_Minimum_Coverage,
  Toolkit_VitestCoverage_Runner_Minimum_Parsed,
  Toolkit_VitestCoverage_Runner_Minimum_RawFile,
  Toolkit_VitestCoverage_Runner_Minimum_Returns,
  Toolkit_VitestCoverage_Runner_Minimum_Settings,
  Toolkit_VitestCoverage_Runner_Minimum_StartDirectory,
  Toolkit_VitestCoverage_Runner_Minimum_Value,
  Toolkit_VitestCoverage_Runner_Options_Minimum,
  Toolkit_VitestCoverage_Runner_Options_Options,
  Toolkit_VitestCoverage_Runner_Options_Returns,
} from '../types/toolkit/vitest-coverage.d.ts';

/**
 * Toolkit - Vitest Coverage.
 *
 * Builds the Vitest coverage options a scaffolded workspace uses.
 * The minimum comes from "settings.coverage.minimum" in the nearest nova.config.json,
 * so one setting drives every workspace's thresholds.
 *
 * @since 0.49.0
 */
class Runner {
  /**
   * Toolkit - Vitest Coverage - Options.
   *
   * Returns the v8 provider with the "text-summary" and "json-summary" reporters, so a
   * coverage run writes "coverage/coverage-summary.json". With a minimum set, the lines,
   * functions, branches and statements thresholds all use it and the run fails below it.
   *
   * @param {Toolkit_VitestCoverage_Runner_Options_Options} options - Options.
   *
   * @returns {Toolkit_VitestCoverage_Runner_Options_Returns}
   *
   * @since 0.49.0
   */
  public static options(options: Toolkit_VitestCoverage_Runner_Options_Options = {}): Toolkit_VitestCoverage_Runner_Options_Returns {
    const minimum: Toolkit_VitestCoverage_Runner_Options_Minimum = Runner.minimum(options['startDirectory'] ?? process.cwd());

    return {
      provider: 'v8',
      reporter: [
        'text-summary',
        'json-summary',
      ],
      reportsDirectory: './coverage',
      ...((minimum === undefined) ? {} : {
        thresholds: {
          branches: minimum,
          functions: minimum,
          lines: minimum,
          statements: minimum,
        },
      }),
    };
  }

  /**
   * Toolkit - Vitest Coverage - Minimum.
   *
   * Reads "settings.coverage.minimum" from the nearest nova.config.json.
   * Returns undefined when no config or no minimum exists, and throws when the minimum
   * is not a number from 0 to 100.
   *
   * @param {Toolkit_VitestCoverage_Runner_Minimum_StartDirectory} startDirectory - Start directory.
   *
   * @returns {Toolkit_VitestCoverage_Runner_Minimum_Returns}
   *
   * @since 0.49.0
   */
  public static minimum(startDirectory: Toolkit_VitestCoverage_Runner_Minimum_StartDirectory): Toolkit_VitestCoverage_Runner_Minimum_Returns {
    const configPath: Toolkit_VitestCoverage_Runner_Minimum_ConfigPath = Runner.findConfigPath(startDirectory);

    if (configPath === undefined) {
      return undefined;
    }

    let parsed: Toolkit_VitestCoverage_Runner_Minimum_Parsed = undefined;

    try {
      const rawFile: Toolkit_VitestCoverage_Runner_Minimum_RawFile = readFileSync(configPath, 'utf-8');

      parsed = JSON.parse(rawFile);
    } catch (error) {
      throw new Error(`VitestCoverage: could not read or parse "${configPath}": ${String(error)}`);
    }

    const settings: Toolkit_VitestCoverage_Runner_Minimum_Settings = (isPlainObject(parsed) === true) ? parsed['settings'] : undefined;
    const coverage: Toolkit_VitestCoverage_Runner_Minimum_Coverage = (isPlainObject(settings) === true) ? settings['coverage'] : undefined;
    const value: Toolkit_VitestCoverage_Runner_Minimum_Value = (isPlainObject(coverage) === true) ? coverage['minimum'] : undefined;

    if (value === undefined) {
      return undefined;
    }

    if (
      typeof value !== 'number'
      || Number.isFinite(value) === false
      || value < 0
      || value > 100
    ) {
      throw new Error(`VitestCoverage: "settings.coverage.minimum" in "${configPath}" must be a number from 0 to 100.`);
    }

    return value;
  }

  /**
   * Toolkit - Vitest Coverage - Find Config Path.
   *
   * Ascends from the start directory until a directory holds a nova.config.json file,
   * returning undefined when the filesystem root is reached first.
   *
   * @param {Toolkit_VitestCoverage_Runner_FindConfigPath_StartDirectory} startDirectory - Start directory.
   *
   * @private
   *
   * @returns {Toolkit_VitestCoverage_Runner_FindConfigPath_Returns}
   *
   * @since 0.49.0
   */
  private static findConfigPath(startDirectory: Toolkit_VitestCoverage_Runner_FindConfigPath_StartDirectory): Toolkit_VitestCoverage_Runner_FindConfigPath_Returns {
    let currentDirectory: Toolkit_VitestCoverage_Runner_FindConfigPath_CurrentDirectory = startDirectory;

    while (true) {
      const candidatePath: Toolkit_VitestCoverage_Runner_FindConfigPath_CandidatePath = join(currentDirectory, 'nova.config.json');

      if (existsSync(candidatePath) === true) {
        return candidatePath;
      }

      const parentDirectory: Toolkit_VitestCoverage_Runner_FindConfigPath_ParentDirectory = dirname(currentDirectory);

      if (parentDirectory === currentDirectory) {
        return undefined;
      }

      currentDirectory = parentDirectory;
    }
  }
}

export default Runner;
