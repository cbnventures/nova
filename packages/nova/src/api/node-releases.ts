import { LIB_REGEX_PATTERN_LEADING_V } from '../lib/regex.js';
import { libSchemaNodeReleasesSchedule } from '../lib/schema.js';
import { Logger } from '../toolkit/index.js';

import type {
  ApiNodeReleasesConstraint,
  ApiNodeReleasesFetchLtsVersionsActiveLtsMajors,
  ApiNodeReleasesFetchLtsVersionsEntry,
  ApiNodeReleasesFetchLtsVersionsErrorMessage,
  ApiNodeReleasesFetchLtsVersionsKey,
  ApiNodeReleasesFetchLtsVersionsMajor,
  ApiNodeReleasesFetchLtsVersionsResponse,
  ApiNodeReleasesFetchLtsVersionsResponseData,
  ApiNodeReleasesFetchLtsVersionsReturns,
  ApiNodeReleasesFetchLtsVersionsSchedule,
  ApiNodeReleasesFetchLtsVersionsStrippedKey,
  ApiNodeReleasesFetchLtsVersionsToday,
  ApiNodeReleasesPopulated,
  ApiNodeReleasesResetForTestingReturns,
} from '../types/api/node-releases.d.ts';

/**
 * API - Node Releases.
 *
 * Fetches and caches the active Node.js LTS version
 * constraint. Used by the sync-environment recipe to set
 * the engines.node field in package.json.
 *
 * @since 0.13.0
 */
export class ApiNodeReleases {
  /**
   * API - Node Releases - Constraint.
   *
   * Holds the semver constraint string built from active LTS versions after the first fetch,
   * for example "^18 || ^20 || ^22".
   *
   * @private
   *
   * @since 0.13.0
   */
  static #constraint: ApiNodeReleasesConstraint;

  /**
   * API - Node Releases - Populated.
   *
   * Guards against repeated network requests. Set to true after the first fetch attempt
   * regardless of whether the request succeeded or failed.
   *
   * @private
   *
   * @since 0.13.0
   */
  static #populated: ApiNodeReleasesPopulated;

  /**
   * API - Node Releases - Fetch LTS Versions.
   *
   * Downloads the release schedule from GitHub, filters for active LTS versions, and builds a
   * semver constraint string. Returns the cached value on repeat calls.
   *
   * @returns {ApiNodeReleasesFetchLtsVersionsReturns}
   *
   * @since 0.13.0
   */
  public static async fetchLtsVersions(): ApiNodeReleasesFetchLtsVersionsReturns {
    if (ApiNodeReleases.#populated === true) {
      return ApiNodeReleases.#constraint;
    }

    try {
      const response: ApiNodeReleasesFetchLtsVersionsResponse = await fetch('https://raw.githubusercontent.com/nodejs/Release/main/schedule.json');

      if (response.ok === false) {
        Logger.customize({
          name: 'ApiNodeReleases',
          purpose: 'fetch',
        }).warn(`Failed to fetch Node.js release schedule. HTTP status: ${response.status}`);

        ApiNodeReleases.#populated = true;

        return undefined;
      }

      const responseData: ApiNodeReleasesFetchLtsVersionsResponseData = await response.json<ApiNodeReleasesFetchLtsVersionsResponseData>();

      const schedule: ApiNodeReleasesFetchLtsVersionsSchedule = libSchemaNodeReleasesSchedule.parse(responseData);
      const today: ApiNodeReleasesFetchLtsVersionsToday = new Date().toISOString().slice(0, 10);

      // Collect major versions where LTS has started and end-of-life has not passed.
      const activeLtsMajors: ApiNodeReleasesFetchLtsVersionsActiveLtsMajors = [];

      for (const scheduleEntry of Object.entries(schedule)) {
        const key: ApiNodeReleasesFetchLtsVersionsKey = scheduleEntry[0];
        const entry: ApiNodeReleasesFetchLtsVersionsEntry = scheduleEntry[1];

        if (
          typeof entry['lts'] === 'string'
          && entry['lts'] <= today
          && entry['end'] >= today
        ) {
          const strippedKey: ApiNodeReleasesFetchLtsVersionsStrippedKey = key.replace(LIB_REGEX_PATTERN_LEADING_V, '');
          const major: ApiNodeReleasesFetchLtsVersionsMajor = parseInt(strippedKey, 10);

          if (Number.isNaN(major) === false) {
            activeLtsMajors.push(major);
          }
        }
      }

      if (activeLtsMajors.length === 0) {
        Logger.customize({
          name: 'ApiNodeReleases',
          purpose: 'parse',
        }).warn('No active LTS versions found in Node.js release schedule.');

        ApiNodeReleases.#populated = true;

        return undefined;
      }

      // Build constraint targeting all active LTS versions (e.g., "^18 || ^20 || ^22").
      ApiNodeReleases.#constraint = activeLtsMajors
        .sort((a, b) => a - b)
        .map((major) => `^${major}`)
        .join(' || ');
      ApiNodeReleases.#populated = true;

      return ApiNodeReleases.#constraint;
    } catch (error) {
      const errorMessage: ApiNodeReleasesFetchLtsVersionsErrorMessage = [
        'Failed to fetch Node.js release schedule.',
        error,
      ].join('\n');

      Logger.customize({
        name: 'ApiNodeReleases',
        purpose: 'fetch',
      }).warn(errorMessage);

      ApiNodeReleases.#populated = true;

      return undefined;
    }
  }

  /**
   * API - Node Releases - Reset For Testing.
   *
   * Clears the cached constraint and populated flag
   * so tests can exercise the fetch path from a clean state.
   *
   * @returns {ApiNodeReleasesResetForTestingReturns}
   *
   * @since 0.13.0
   */
  public static resetForTesting(): ApiNodeReleasesResetForTestingReturns {
    ApiNodeReleases.#constraint = undefined;
    ApiNodeReleases.#populated = undefined;

    return;
  }
}
