import {
  LIB_REGEX_PATTERN_CALVER_STRICT,
  LIB_REGEX_PATTERN_EXACT_SEMVER,
} from './regex.js';

import type {
  Lib_VersionContract_Runner_GetInitialVersion_Date,
  Lib_VersionContract_Runner_GetInitialVersion_Month,
  Lib_VersionContract_Runner_GetInitialVersion_Policy,
  Lib_VersionContract_Runner_GetInitialVersion_Returns,
  Lib_VersionContract_Runner_GetInitialVersion_Strategy,
  Lib_VersionContract_Runner_GetInitialVersion_Year,
  Lib_VersionContract_Runner_GetNextVersion_Bump,
  Lib_VersionContract_Runner_GetNextVersion_CurrentVersion,
  Lib_VersionContract_Runner_GetNextVersion_Date,
  Lib_VersionContract_Runner_GetNextVersion_HasReleaseHistory,
  Lib_VersionContract_Runner_GetNextVersion_Month,
  Lib_VersionContract_Runner_GetNextVersion_NextMajor,
  Lib_VersionContract_Runner_GetNextVersion_NextMicro,
  Lib_VersionContract_Runner_GetNextVersion_NextMinor,
  Lib_VersionContract_Runner_GetNextVersion_NextPatch,
  Lib_VersionContract_Runner_GetNextVersion_Parts,
  Lib_VersionContract_Runner_GetNextVersion_Returns,
  Lib_VersionContract_Runner_GetNextVersion_Strategy,
  Lib_VersionContract_Runner_GetNextVersion_Year,
  Lib_VersionContract_Runner_Validate_CalverParts,
  Lib_VersionContract_Runner_Validate_Date,
  Lib_VersionContract_Runner_Validate_IsZero,
  Lib_VersionContract_Runner_Validate_Month,
  Lib_VersionContract_Runner_Validate_Policy,
  Lib_VersionContract_Runner_Validate_Returns,
  Lib_VersionContract_Runner_Validate_SemverParts,
  Lib_VersionContract_Runner_Validate_Source,
  Lib_VersionContract_Runner_Validate_Strategy,
  Lib_VersionContract_Runner_Validate_Version,
  Lib_VersionContract_Runner_Validate_VersionMonth,
  Lib_VersionContract_Runner_Validate_VersionYear,
  Lib_VersionContract_Runner_Validate_Year,
} from '../types/lib/version-contract.d.ts';

/**
 * Lib - Version Contract.
 *
 * Centralizes project version behavior.
 * Scaffolding, recipes, and releases share one strategy-aware contract.
 * The reserved 0.0.0 sentinel belongs only to freezable workspaces.
 *
 * @since 0.34.0
 */
export class Runner {
  /**
   * Lib - Version Contract - Get Initial Version.
   *
   * Resolves the starting version for a workspace policy and the configured
   * project version strategy.
   *
   * @param {Lib_VersionContract_Runner_GetInitialVersion_Policy}   policy   - Policy.
   * @param {Lib_VersionContract_Runner_GetInitialVersion_Strategy} strategy - Strategy.
   * @param {Lib_VersionContract_Runner_GetInitialVersion_Date}     date     - Date.
   *
   * @returns {Lib_VersionContract_Runner_GetInitialVersion_Returns}
   *
   * @since 0.34.0
   */
  public static getInitialVersion(policy: Lib_VersionContract_Runner_GetInitialVersion_Policy, strategy: Lib_VersionContract_Runner_GetInitialVersion_Strategy, date: Lib_VersionContract_Runner_GetInitialVersion_Date = new Date()): Lib_VersionContract_Runner_GetInitialVersion_Returns {
    if (policy === 'freezable') {
      return '0.0.0';
    }

    if (strategy === 'semver') {
      return '0.0.1';
    }

    const year: Lib_VersionContract_Runner_GetInitialVersion_Year = date.getUTCFullYear();
    const month: Lib_VersionContract_Runner_GetInitialVersion_Month = date.getUTCMonth() + 1;

    return `${year}.${month}.0`;
  }

  /**
   * Lib - Version Contract - Get Next Version.
   *
   * Calculates the next non-freezable release version.
   * First CalVer release keeps current-period .0; later releases increment MICRO.
   * A new UTC month resets MICRO to 0.
   *
   * @param {Lib_VersionContract_Runner_GetNextVersion_CurrentVersion}    currentVersion    - Current version.
   * @param {Lib_VersionContract_Runner_GetNextVersion_Strategy}          strategy          - Strategy.
   * @param {Lib_VersionContract_Runner_GetNextVersion_Bump}              bump              - Bump.
   * @param {Lib_VersionContract_Runner_GetNextVersion_HasReleaseHistory} hasReleaseHistory - Has release history.
   * @param {Lib_VersionContract_Runner_GetNextVersion_Date}              date              - Date.
   *
   * @returns {Lib_VersionContract_Runner_GetNextVersion_Returns}
   *
   * @since 0.34.0
   */
  public static getNextVersion(currentVersion: Lib_VersionContract_Runner_GetNextVersion_CurrentVersion, strategy: Lib_VersionContract_Runner_GetNextVersion_Strategy, bump: Lib_VersionContract_Runner_GetNextVersion_Bump, hasReleaseHistory: Lib_VersionContract_Runner_GetNextVersion_HasReleaseHistory, date: Lib_VersionContract_Runner_GetNextVersion_Date = new Date()): Lib_VersionContract_Runner_GetNextVersion_Returns {
    Runner.validate(currentVersion, 'trackable', strategy, 'current version', date);

    const parts: Lib_VersionContract_Runner_GetNextVersion_Parts = currentVersion.split('.').map(Number);

    if (strategy === 'calver') {
      const year: Lib_VersionContract_Runner_GetNextVersion_Year = date.getUTCFullYear();
      const month: Lib_VersionContract_Runner_GetNextVersion_Month = date.getUTCMonth() + 1;

      if (hasReleaseHistory === false) {
        return `${year}.${month}.0`;
      }

      if (parts[0] !== year || parts[1] !== month) {
        return `${year}.${month}.0`;
      }

      const nextMicro: Lib_VersionContract_Runner_GetNextVersion_NextMicro = (parts[2] ?? 0) + 1;

      if (Number.isSafeInteger(nextMicro) === false) {
        throw new Error(`Unable to increment CalVer version "${currentVersion}": MICRO would exceed JavaScript's safe integer range.`);
      }

      return `${year}.${month}.${nextMicro}`;
    }

    const nextMajor: Lib_VersionContract_Runner_GetNextVersion_NextMajor = (parts[0] ?? 0) + ((bump === 'major') ? 1 : 0);
    const nextMinor: Lib_VersionContract_Runner_GetNextVersion_NextMinor = (bump === 'major') ? 0 : (parts[1] ?? 0) + ((bump === 'minor') ? 1 : 0);
    const nextPatch: Lib_VersionContract_Runner_GetNextVersion_NextPatch = (bump === 'major' || bump === 'minor') ? 0 : (parts[2] ?? 0) + 1;

    if (
      Number.isSafeInteger(nextMajor) === false
      || Number.isSafeInteger(nextMinor) === false
      || Number.isSafeInteger(nextPatch) === false
    ) {
      throw new Error(`Unable to increment SemVer version "${currentVersion}": the selected component would exceed JavaScript's safe integer range.`);
    }

    return `${nextMajor}.${nextMinor}.${nextPatch}`;
  }

  /**
   * Lib - Version Contract - Validate.
   *
   * Validates a workspace version against its policy and the configured
   * project strategy.
   *
   * @param {Lib_VersionContract_Runner_Validate_Version}  version  - Version.
   * @param {Lib_VersionContract_Runner_Validate_Policy}   policy   - Policy.
   * @param {Lib_VersionContract_Runner_Validate_Strategy} strategy - Strategy.
   * @param {Lib_VersionContract_Runner_Validate_Source}   source   - Source.
   * @param {Lib_VersionContract_Runner_Validate_Date}     date     - Date.
   *
   * @returns {Lib_VersionContract_Runner_Validate_Returns}
   *
   * @since 0.34.0
   */
  public static validate(version: Lib_VersionContract_Runner_Validate_Version, policy: Lib_VersionContract_Runner_Validate_Policy, strategy: Lib_VersionContract_Runner_Validate_Strategy, source: Lib_VersionContract_Runner_Validate_Source, date: Lib_VersionContract_Runner_Validate_Date = new Date()): Lib_VersionContract_Runner_Validate_Returns {
    const isZero: Lib_VersionContract_Runner_Validate_IsZero = version === '0.0.0';

    if (policy === 'freezable') {
      if (isZero === false) {
        throw new Error(`Invalid version "${version}" in "${source}": freezable workspaces must use the reserved "0.0.0" version.`);
      }

      return;
    }

    if (isZero === true) {
      throw new Error(`Invalid version "${version}" in "${source}": "0.0.0" is reserved for freezable workspaces.`);
    }

    if (strategy === 'semver') {
      const semverParts: Lib_VersionContract_Runner_Validate_SemverParts = version.split('.').map(Number);

      if (
        LIB_REGEX_PATTERN_EXACT_SEMVER.test(version) === false
        || semverParts.length !== 3
        || semverParts.some((part) => Number.isSafeInteger(part) === false) === true
      ) {
        throw new Error(`Invalid version "${version}" in "${source}": expected a clean numeric SemVer "MAJOR.MINOR.PATCH".`);
      }

      return;
    }

    const calverParts: Lib_VersionContract_Runner_Validate_CalverParts = version.split('.').map(Number);

    if (
      LIB_REGEX_PATTERN_CALVER_STRICT.test(version) === false
      || calverParts.length !== 3
      || calverParts.some((part) => Number.isSafeInteger(part) === false) === true
    ) {
      throw new Error(`Invalid version "${version}" in "${source}": expected CalVer "YYYY.M.MICRO".`);
    }

    const year: Lib_VersionContract_Runner_Validate_Year = date.getUTCFullYear();
    const month: Lib_VersionContract_Runner_Validate_Month = date.getUTCMonth() + 1;
    const versionYear: Lib_VersionContract_Runner_Validate_VersionYear = calverParts[0] ?? 0;
    const versionMonth: Lib_VersionContract_Runner_Validate_VersionMonth = calverParts[1] ?? 0;

    if (
      versionYear > year
      || (
        versionYear === year
        && versionMonth > month
      )
    ) {
      throw new Error(`Invalid version "${version}" in "${source}": CalVer cannot be later than the current UTC month.`);
    }

    return;
  }
}
