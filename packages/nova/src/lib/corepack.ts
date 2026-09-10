import { LIB_REGEX_PATTERN_NAME_AT_VERSION } from './regex.js';

import type {
  Lib_Corepack_Runner_ParsePackageManager_MatchResult,
  Lib_Corepack_Runner_ParsePackageManager_Name,
  Lib_Corepack_Runner_ParsePackageManager_Returns,
  Lib_Corepack_Runner_ParsePackageManager_Value,
  Lib_Corepack_Runner_ParsePackageManager_Version,
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
