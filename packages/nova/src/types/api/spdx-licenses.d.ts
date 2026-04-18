import type { z } from 'zod';

import type { libSchemaSpdxLicensesResponse } from '../../lib/schema.js';

/**
 * API - SPDX Licenses - Fetch Licenses.
 *
 * @since 0.13.0
 */
export type ApiSpdxLicensesFetchLicensesReturns = Promise<Set<string> | undefined>;

export type ApiSpdxLicensesFetchLicensesHttpResponse = Response;

export type ApiSpdxLicensesFetchLicensesResponseData = unknown;

export type ApiSpdxLicensesFetchLicensesResponse = z.infer<typeof libSchemaSpdxLicensesResponse>;

export type ApiSpdxLicensesFetchLicensesLicenseIds = string[];

export type ApiSpdxLicensesFetchLicensesErrorMessage = string;

/**
 * API - SPDX Licenses - Licenses.
 *
 * @since 0.13.0
 */
export type ApiSpdxLicensesLicenses = Set<string> | undefined;

/**
 * API - SPDX Licenses - Populated.
 *
 * @since 0.13.0
 */
export type ApiSpdxLicensesPopulated = boolean | undefined;

/**
 * API - SPDX Licenses - Reset For Testing.
 *
 * @since 0.13.0
 */
export type ApiSpdxLicensesResetForTestingReturns = void;
