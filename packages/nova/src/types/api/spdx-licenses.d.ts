import type { z } from 'zod';

import type { libSchemaSpdxLicensesResponse } from '../../lib/schema.js';

/**
 * API - SPDX Licenses - Licenses.
 *
 * @since 0.13.0
 */
export type Api_SpdxLicenses_Runner_Licenses = Set<string> | undefined;

/**
 * API - SPDX Licenses - Populated.
 *
 * @since 0.13.0
 */
export type Api_SpdxLicenses_Runner_Populated = boolean | undefined;

/**
 * API - SPDX Licenses - Fetch Licenses.
 *
 * @since 0.13.0
 */
export type Api_SpdxLicenses_Runner_FetchLicenses_Returns = Promise<Set<string> | undefined>;

export type Api_SpdxLicenses_Runner_FetchLicenses_Response = Response;

export type Api_SpdxLicenses_Runner_FetchLicenses_ResponseData = unknown;

export type Api_SpdxLicenses_Runner_FetchLicenses_Data = z.infer<typeof libSchemaSpdxLicensesResponse>;

export type Api_SpdxLicenses_Runner_FetchLicenses_LicenseIds = string[];

export type Api_SpdxLicenses_Runner_FetchLicenses_Message = string;

/**
 * API - SPDX Licenses - Reset For Testing.
 *
 * @since 0.13.0
 */
export type Api_SpdxLicenses_Runner_ResetForTesting_Returns = void;
