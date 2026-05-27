import { LIB_REGEX_PATTERN_LEADING_V } from '../lib/regex.js';
import { libSchemaNodeReleasesSchedule } from '../lib/schema.js';
import { Logger } from '../toolkit/index.js';

import type {
  Api_NodeReleases_Runner_Constraint,
  Api_NodeReleases_Runner_FetchLtsVersions_ActiveLtsMajors,
  Api_NodeReleases_Runner_FetchLtsVersions_Entry,
  Api_NodeReleases_Runner_FetchLtsVersions_ErrorMessage,
  Api_NodeReleases_Runner_FetchLtsVersions_Key,
  Api_NodeReleases_Runner_FetchLtsVersions_Major,
  Api_NodeReleases_Runner_FetchLtsVersions_Response,
  Api_NodeReleases_Runner_FetchLtsVersions_ResponseData,
  Api_NodeReleases_Runner_FetchLtsVersions_Returns,
  Api_NodeReleases_Runner_FetchLtsVersions_Schedule,
  Api_NodeReleases_Runner_FetchLtsVersions_StrippedKey,
  Api_NodeReleases_Runner_FetchLtsVersions_Today,
  Api_NodeReleases_Runner_Populated,
  Api_NodeReleases_Runner_ResetForTesting_Returns,
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
export class Runner {
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
  static #constraint: Api_NodeReleases_Runner_Constraint;

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
  static #populated: Api_NodeReleases_Runner_Populated;

  /**
   * API - Node Releases - Fetch LTS Versions.
   *
   * Downloads the release schedule from GitHub, filters for active LTS versions, and builds a
   * semver constraint string. Returns the cached value on repeat calls.
   *
   * @returns {Api_NodeReleases_Runner_FetchLtsVersions_Returns}
   *
   * @since 0.13.0
   */
  public static async fetchLtsVersions(): Api_NodeReleases_Runner_FetchLtsVersions_Returns {
    if (Runner.#populated === true) {
      return Runner.#constraint;
    }

    try {
      const response: Api_NodeReleases_Runner_FetchLtsVersions_Response = await fetch('https://raw.githubusercontent.com/nodejs/Release/main/schedule.json');

      if (response.ok === false) {
        Logger.customize({
          name: 'Runner',
          purpose: 'fetch',
        }).warn(`Failed to fetch Node.js release schedule. HTTP status: ${response.status}`);

        Runner.#populated = true;

        return undefined;
      }

      const responseData: Api_NodeReleases_Runner_FetchLtsVersions_ResponseData = await response.json<Api_NodeReleases_Runner_FetchLtsVersions_ResponseData>();

      const schedule: Api_NodeReleases_Runner_FetchLtsVersions_Schedule = libSchemaNodeReleasesSchedule.parse(responseData);
      const today: Api_NodeReleases_Runner_FetchLtsVersions_Today = new Date().toISOString().slice(0, 10);

      // Collect major versions where LTS has started and end-of-life has not passed.
      const activeLtsMajors: Api_NodeReleases_Runner_FetchLtsVersions_ActiveLtsMajors = [];

      for (const scheduleEntry of Object.entries(schedule)) {
        const key: Api_NodeReleases_Runner_FetchLtsVersions_Key = scheduleEntry[0];
        const entry: Api_NodeReleases_Runner_FetchLtsVersions_Entry = scheduleEntry[1];

        if (
          typeof entry['lts'] === 'string'
          && entry['lts'] <= today
          && entry['end'] >= today
        ) {
          const strippedKey: Api_NodeReleases_Runner_FetchLtsVersions_StrippedKey = key.replace(LIB_REGEX_PATTERN_LEADING_V, '');
          const major: Api_NodeReleases_Runner_FetchLtsVersions_Major = parseInt(strippedKey, 10);

          if (Number.isNaN(major) === false) {
            activeLtsMajors.push(major);
          }
        }
      }

      if (activeLtsMajors.length === 0) {
        Logger.customize({
          name: 'Runner',
          purpose: 'parse',
        }).warn('No active LTS versions found in Node.js release schedule.');

        Runner.#populated = true;

        return undefined;
      }

      // Build constraint targeting all active LTS versions (e.g., "^18 || ^20 || ^22").
      Runner.#constraint = activeLtsMajors
        .sort((a, b) => a - b)
        .map((major) => `^${major}`)
        .join(' || ');
      Runner.#populated = true;

      return Runner.#constraint;
    } catch (error) {
      const errorMessage: Api_NodeReleases_Runner_FetchLtsVersions_ErrorMessage = [
        'Failed to fetch Node.js release schedule.',
        error,
      ].join('\n');

      Logger.customize({
        name: 'Runner',
        purpose: 'fetch',
      }).warn(errorMessage);

      Runner.#populated = true;

      return undefined;
    }
  }

  /**
   * API - Node Releases - Reset For Testing.
   *
   * Clears the cached constraint and populated flag
   * so tests can exercise the fetch path from a clean state.
   *
   * @returns {Api_NodeReleases_Runner_ResetForTesting_Returns}
   *
   * @since 0.13.0
   */
  public static resetForTesting(): Api_NodeReleases_Runner_ResetForTesting_Returns {
    Runner.#constraint = undefined;
    Runner.#populated = undefined;

    return;
  }
}
