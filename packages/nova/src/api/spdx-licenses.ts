import { libSchemaSpdxLicensesResponse } from '../lib/schema.js';
import { Logger } from '../toolkit/index.js';

import type {
  Api_SpdxLicenses_Runner_FetchLicenses_ErrorMessage,
  Api_SpdxLicenses_Runner_FetchLicenses_HttpResponse,
  Api_SpdxLicenses_Runner_FetchLicenses_LicenseIds,
  Api_SpdxLicenses_Runner_FetchLicenses_Response,
  Api_SpdxLicenses_Runner_FetchLicenses_ResponseData,
  Api_SpdxLicenses_Runner_FetchLicenses_Returns,
  Api_SpdxLicenses_Runner_Licenses,
  Api_SpdxLicenses_Runner_Populated,
  Api_SpdxLicenses_Runner_ResetForTesting_Returns,
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
export class Runner {
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
  static #licenses: Api_SpdxLicenses_Runner_Licenses;

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
  static #populated: Api_SpdxLicenses_Runner_Populated;

  /**
   * API - SPDX Licenses - Fetch Licenses.
   *
   * Downloads the SPDX license list from spdx.org and parses the response with Zod. Returns
   * the cached set on repeat calls without another network request.
   *
   * @returns {Api_SpdxLicenses_Runner_FetchLicenses_Returns}
   *
   * @since 0.13.0
   */
  public static async fetchLicenses(): Api_SpdxLicenses_Runner_FetchLicenses_Returns {
    if (Runner.#populated === true) {
      return Runner.#licenses;
    }

    try {
      const response: Api_SpdxLicenses_Runner_FetchLicenses_HttpResponse = await fetch('https://spdx.org/licenses/licenses.json');

      if (response.ok === false) {
        Logger.customize({
          name: 'Runner',
          purpose: 'fetch',
        }).warn(`Failed to fetch SPDX licenses. HTTP status: ${response.status}`);

        Runner.#populated = true;

        return undefined;
      }

      const responseData: Api_SpdxLicenses_Runner_FetchLicenses_ResponseData = await response.json<Api_SpdxLicenses_Runner_FetchLicenses_ResponseData>();

      const data: Api_SpdxLicenses_Runner_FetchLicenses_Response = libSchemaSpdxLicensesResponse.parse(responseData);

      const licenseIds: Api_SpdxLicenses_Runner_FetchLicenses_LicenseIds = data['licenses'].map((license) => license['licenseId']);

      Runner.#licenses = new Set(licenseIds);
      Runner.#populated = true;

      return Runner.#licenses;
    } catch (error) {
      const message: Api_SpdxLicenses_Runner_FetchLicenses_ErrorMessage = [
        'Failed to fetch SPDX licenses.',
        error,
      ].join('\n');

      Logger.customize({
        name: 'Runner',
        purpose: 'fetch',
      }).warn(message);

      Runner.#populated = true;

      return undefined;
    }
  }

  /**
   * API - SPDX Licenses - Reset For Testing.
   *
   * Clears the cached license set and populated flag so
   * tests can exercise the fetch path from a clean state.
   *
   * @returns {Api_SpdxLicenses_Runner_ResetForTesting_Returns}
   *
   * @since 0.13.0
   */
  public static resetForTesting(): Api_SpdxLicenses_Runner_ResetForTesting_Returns {
    Runner.#licenses = undefined;
    Runner.#populated = undefined;

    return;
  }
}
