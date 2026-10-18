import { platform } from 'node:os';
import { win32 } from 'node:path';

import { LIB_REGEX_PATTERN_NAME_AT_VERSION } from './regex.js';

import type {
  Lib_Corepack_Runner_ParsePackageManager_MatchResult,
  Lib_Corepack_Runner_ParsePackageManager_Name,
  Lib_Corepack_Runner_ParsePackageManager_Returns,
  Lib_Corepack_Runner_ParsePackageManager_Value,
  Lib_Corepack_Runner_ParsePackageManager_Version,
  Lib_Corepack_Runner_ResolveSpawnInvocation_Command,
  Lib_Corepack_Runner_ResolveSpawnInvocation_CommandArguments,
  Lib_Corepack_Runner_ResolveSpawnInvocation_CommandScriptPath,
  Lib_Corepack_Runner_ResolveSpawnInvocation_CurrentPlatform,
  Lib_Corepack_Runner_ResolveSpawnInvocation_NodeExecutable,
  Lib_Corepack_Runner_ResolveSpawnInvocation_Returns,
} from '../types/lib/corepack.d.ts';

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
   * Keeps POSIX package-manager commands direct.
   * On Windows, Nova launches shim JavaScript entry points with Node.js so spaces
   * and shell metacharacters remain intact without opening a command shell.
   *
   * @param {Lib_Corepack_Runner_ResolveSpawnInvocation_Command}          command          - Command.
   * @param {Lib_Corepack_Runner_ResolveSpawnInvocation_CommandArguments} commandArguments - Command arguments.
   * @param {Lib_Corepack_Runner_ResolveSpawnInvocation_CurrentPlatform}  currentPlatform  - Current platform.
   * @param {Lib_Corepack_Runner_ResolveSpawnInvocation_NodeExecutable}   nodeExecutable   - Node executable.
   *
   * @returns {Lib_Corepack_Runner_ResolveSpawnInvocation_Returns}
   *
   * @since 0.32.0
   */
  public static resolveSpawnInvocation(command: Lib_Corepack_Runner_ResolveSpawnInvocation_Command, commandArguments: Lib_Corepack_Runner_ResolveSpawnInvocation_CommandArguments, currentPlatform: Lib_Corepack_Runner_ResolveSpawnInvocation_CurrentPlatform = platform(), nodeExecutable: Lib_Corepack_Runner_ResolveSpawnInvocation_NodeExecutable = process.execPath): Lib_Corepack_Runner_ResolveSpawnInvocation_Returns {
    if (currentPlatform !== 'win32') {
      return {
        command,
        commandArguments,
      };
    }

    let commandScriptPath: Lib_Corepack_Runner_ResolveSpawnInvocation_CommandScriptPath = win32.join(win32.dirname(nodeExecutable), 'node_modules', 'corepack', 'dist', 'corepack.js');

    if (command === 'npm') {
      commandScriptPath = win32.join(win32.dirname(nodeExecutable), 'node_modules', 'npm', 'bin', 'npm-cli.js');
    }

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
