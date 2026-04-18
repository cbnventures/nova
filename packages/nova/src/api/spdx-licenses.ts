import { libSchemaSpdxLicensesResponse } from '../lib/schema.js';
import { Logger } from '../toolkit/index.js';

import type {
  ApiSpdxLicensesFetchLicensesErrorMessage,
  ApiSpdxLicensesFetchLicensesHttpResponse,
  ApiSpdxLicensesFetchLicensesLicenseIds,
  ApiSpdxLicensesFetchLicensesResponse,
  ApiSpdxLicensesFetchLicensesResponseData,
  ApiSpdxLicensesFetchLicensesReturns,
  ApiSpdxLicensesLicenses,
  ApiSpdxLicensesPopulated,
  ApiSpdxLicensesResetForTestingReturns,
} from '../types/api/spdx-licenses.d.ts';

/**
 * API - SPDX Licenses.
 *
 * Fetches and caches valid license identifiers
 * from the SPDX registry. Used by the license generator
 * to validate user input against the official list.
 *
 * @since 0.13.0
 */
export class ApiSpdxLicenses {
  /**
   * API - SPDX Licenses - Licenses.
   *
   * Stores the set of license identifiers after the first successful fetch so subsequent
   * calls avoid a network round-trip.
   *
   * @private
   *
   * @since 0.13.0
   */
  static #licenses: ApiSpdxLicensesLicenses;

  /**
   * API - SPDX Licenses - Populated.
   *
   * Guards against repeated network requests. Set to true after the first fetch attempt
   * regardless of whether the request succeeded or failed.
   *
   * @private
   *
   * @since 0.13.0
   */
  static #populated: ApiSpdxLicensesPopulated;

  /**
   * API - SPDX Licenses - Fetch Licenses.
   *
   * Downloads the SPDX license list from spdx.org and parses the response with Zod. Returns
   * the cached set on repeat calls without another network request.
   *
   * @returns {ApiSpdxLicensesFetchLicensesReturns}
   *
   * @since 0.13.0
   */
  public static async fetchLicenses(): ApiSpdxLicensesFetchLicensesReturns {
    if (ApiSpdxLicenses.#populated === true) {
      return ApiSpdxLicenses.#licenses;
    }

    try {
      const response: ApiSpdxLicensesFetchLicensesHttpResponse = await fetch('https://spdx.org/licenses/licenses.json');

      if (response.ok === false) {
        Logger.customize({
          name: 'ApiSpdxLicenses',
          purpose: 'fetch',
        }).warn(`Failed to fetch SPDX licenses. HTTP status: ${response.status}`);

        ApiSpdxLicenses.#populated = true;

        return undefined;
      }

      const responseData: ApiSpdxLicensesFetchLicensesResponseData = await response.json<ApiSpdxLicensesFetchLicensesResponseData>();

      const data: ApiSpdxLicensesFetchLicensesResponse = libSchemaSpdxLicensesResponse.parse(responseData);

      const licenseIds: ApiSpdxLicensesFetchLicensesLicenseIds = data['licenses'].map((license) => license['licenseId']);

      ApiSpdxLicenses.#licenses = new Set(licenseIds);
      ApiSpdxLicenses.#populated = true;

      return ApiSpdxLicenses.#licenses;
    } catch (error) {
      const message: ApiSpdxLicensesFetchLicensesErrorMessage = [
        'Failed to fetch SPDX licenses.',
        error,
      ].join('\n');

      Logger.customize({
        name: 'ApiSpdxLicenses',
        purpose: 'fetch',
      }).warn(message);

      ApiSpdxLicenses.#populated = true;

      return undefined;
    }
  }

  /**
   * API - SPDX Licenses - Reset For Testing.
   *
   * Clears the cached license set and populated flag so
   * tests can exercise the fetch path from a clean state.
   *
   * @returns {ApiSpdxLicensesResetForTestingReturns}
   *
   * @since 0.13.0
   */
  public static resetForTesting(): ApiSpdxLicensesResetForTestingReturns {
    ApiSpdxLicenses.#licenses = undefined;
    ApiSpdxLicenses.#populated = undefined;

    return;
  }
}
