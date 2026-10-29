import { platform } from 'node:os';
import {
  dirname,
  join,
  win32,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import { LIB_REGEX_PATTERN_NAME_AT_VERSION } from './regex.js';

import type {
  Lib_Corepack_CorepackPackageJsonPath,
  Lib_Corepack_CorepackPackageJsonUrl,
  Lib_Corepack_DefaultCorepackScriptPath,
  Lib_Corepack_Runner_ParsePackageManager_MatchResult,
  Lib_Corepack_Runner_ParsePackageManager_Name,
  Lib_Corepack_Runner_ParsePackageManager_Returns,
  Lib_Corepack_Runner_ParsePackageManager_Value,
  Lib_Corepack_Runner_ParsePackageManager_Version,
  Lib_Corepack_Runner_ResolveSpawnInvocation_Command,
  Lib_Corepack_Runner_ResolveSpawnInvocation_CommandArguments,
  Lib_Corepack_Runner_ResolveSpawnInvocation_CommandScriptPath,
  Lib_Corepack_Runner_ResolveSpawnInvocation_CorepackScriptPath,
  Lib_Corepack_Runner_ResolveSpawnInvocation_CurrentPlatform,
  Lib_Corepack_Runner_ResolveSpawnInvocation_NodeExecutable,
  Lib_Corepack_Runner_ResolveSpawnInvocation_Returns,
} from '../types/lib/corepack.d.ts';

/**
 * Lib - Corepack - package.json URL.
 *
 * Locates the installed Corepack package through Node.js module resolution.
 * Nova uses this URL without relying on a global executable.
 *
 * @since 0.36.0
 */
const corepackPackageJsonUrl: Lib_Corepack_CorepackPackageJsonUrl = import.meta.resolve('corepack/package.json');

/**
 * Lib - Corepack - package.json Path.
 *
 * Converts the installed package URL into a filesystem path for child processes.
 * The resolved location works across hoisted and nested dependency layouts.
 *
 * @since 0.36.0
 */
const corepackPackageJsonPath: Lib_Corepack_CorepackPackageJsonPath = fileURLToPath(corepackPackageJsonUrl);

/**
 * Lib - Corepack - Default Corepack Script Path.
 *
 * Points package-manager invocations at Nova's installed Corepack entry point.
 * This keeps Node.js 26 consumers independent of global Corepack setup.
 *
 * @since 0.36.0
 */
const defaultCorepackScriptPath: Lib_Corepack_DefaultCorepackScriptPath = join(dirname(corepackPackageJsonPath), 'dist', 'corepack.js');

/**
 * Lib - Corepack.
 *
 * Parses package-manager descriptors against the exact clients Nova supports.
 * Consumers share this boundary so workflow and recipe behavior cannot drift.
 *
 * @since 0.26.0
 */
export class Runner {
  /**
   * Lib - Corepack - Resolve Spawn Invocation.
   *
   * Runs Nova's bundled Corepack entry point with Node.js on every platform.
   * npm remains direct on POSIX while Windows uses its JavaScript entry point so
   * spaces and shell metacharacters stay intact without opening a command shell.
   *
   * @param {Lib_Corepack_Runner_ResolveSpawnInvocation_Command}            command            - Command.
   * @param {Lib_Corepack_Runner_ResolveSpawnInvocation_CommandArguments}   commandArguments   - Command arguments.
   * @param {Lib_Corepack_Runner_ResolveSpawnInvocation_CurrentPlatform}    currentPlatform    - Current platform.
   * @param {Lib_Corepack_Runner_ResolveSpawnInvocation_NodeExecutable}     nodeExecutable     - Node executable.
   * @param {Lib_Corepack_Runner_ResolveSpawnInvocation_CorepackScriptPath} corepackScriptPath - Corepack script path.
   *
   * @returns {Lib_Corepack_Runner_ResolveSpawnInvocation_Returns}
   *
   * @since 0.32.0
   */
  public static resolveSpawnInvocation(command: Lib_Corepack_Runner_ResolveSpawnInvocation_Command, commandArguments: Lib_Corepack_Runner_ResolveSpawnInvocation_CommandArguments, currentPlatform: Lib_Corepack_Runner_ResolveSpawnInvocation_CurrentPlatform = platform(), nodeExecutable: Lib_Corepack_Runner_ResolveSpawnInvocation_NodeExecutable = process.execPath, corepackScriptPath: Lib_Corepack_Runner_ResolveSpawnInvocation_CorepackScriptPath = defaultCorepackScriptPath): Lib_Corepack_Runner_ResolveSpawnInvocation_Returns {
    if (command === 'corepack') {
      return {
        command: nodeExecutable,
        commandArguments: [
          corepackScriptPath,
          ...commandArguments,
        ],
      };
    }

    if (currentPlatform !== 'win32') {
      return {
        command,
        commandArguments,
      };
    }

    const commandScriptPath: Lib_Corepack_Runner_ResolveSpawnInvocation_CommandScriptPath = win32.join(win32.dirname(nodeExecutable), 'node_modules', 'npm', 'bin', 'npm-cli.js');

    return {
      command: nodeExecutable,
      commandArguments: [
        commandScriptPath,
        ...commandArguments,
      ],
    };
  }

  /**
   * Lib - Corepack - Parse Package Manager.
   *
   * Accepts an exact npm, pnpm, or Yarn Corepack descriptor and returns its
   * normalized parts. Every other manager or version shape is unsupported.
   *
   * @param {Lib_Corepack_Runner_ParsePackageManager_Value} value - Value.
   *
   * @returns {Lib_Corepack_Runner_ParsePackageManager_Returns}
   *
   * @since 0.26.0
   */
  public static parsePackageManager(value: Lib_Corepack_Runner_ParsePackageManager_Value): Lib_Corepack_Runner_ParsePackageManager_Returns {
    if (typeof value !== 'string') {
      return undefined;
    }

    const matchResult: Lib_Corepack_Runner_ParsePackageManager_MatchResult = value.match(LIB_REGEX_PATTERN_NAME_AT_VERSION);

    if (matchResult === null) {
      return undefined;
    }

    const name: Lib_Corepack_Runner_ParsePackageManager_Name = matchResult[1];
    const version: Lib_Corepack_Runner_ParsePackageManager_Version = matchResult[2];

    if (
      (
        name !== 'npm'
        && name !== 'pnpm'
        && name !== 'yarn'
      )
      || version === undefined
    ) {
      return undefined;
    }

    return {
      name,
      version,
      value,
    };
  }
}
