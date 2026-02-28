import { schemaSpdxLicensesResponse } from '@/lib/schema.js';
import { Logger } from '@/toolkit/index.js';

import type {
  SpdxLicensesFetchLicensesResponse,
  SpdxLicensesFetchLicensesReturns,
  SpdxLicensesLicenses,
  SpdxLicensesPopulated,
  SpdxLicensesResetForTestingReturns,
} from '@/types/api/spdx-licenses.d.ts';

/**
 * SPDX Licenses.
 *
 * @since 1.0.0
 */
export class SpdxLicenses {
  /**
   * SPDX Licenses - Licenses.
   *
   * @private
   *
   * @since 1.0.0
   */
  static #licenses: SpdxLicensesLicenses;

  /**
   * SPDX Licenses - Populated.
   *
   * @private
   *
   * @since 1.0.0
   */
  static #populated: SpdxLicensesPopulated;

  /**
   * SPDX Licenses - Fetch licenses.
   *
   * @returns {SpdxLicensesFetchLicensesReturns}
   *
   * @since 1.0.0
   */
  public static async fetchLicenses(): SpdxLicensesFetchLicensesReturns {
    if (SpdxLicenses.#populated === true) {
      return SpdxLicenses.#licenses;
    }

    try {
      const response = await fetch('https://spdx.org/licenses/licenses.json');

      if (response.ok === false) {
        Logger.customize({
          name: 'SpdxLicenses',
          purpose: 'fetch',
        }).warn(`Failed to fetch SPDX licenses. HTTP status: ${response.status}`);

        SpdxLicenses.#populated = true;

        return undefined;
      }

      const responseData = await response.json();

      const data: SpdxLicensesFetchLicensesResponse = schemaSpdxLicensesResponse.parse(responseData);

      SpdxLicenses.#licenses = new Set(data.licenses.map((license) => license.licenseId));
      SpdxLicenses.#populated = true;

      return SpdxLicenses.#licenses;
    } catch (error) {
      Logger.customize({
        name: 'SpdxLicenses',
        purpose: 'fetch',
      }).warn([
        'Failed to fetch SPDX licenses.',
        error,
      ].join('\n'));

      SpdxLicenses.#populated = true;

      return undefined;
    }
  }

  /**
   * SPDX Licenses - Reset for testing.
   *
   * @returns {SpdxLicensesResetForTestingReturns}
   *
   * @since 1.0.0
   */
  public static resetForTesting(): SpdxLicensesResetForTestingReturns {
    SpdxLicenses.#licenses = undefined;
    SpdxLicenses.#populated = undefined;
  }
}
