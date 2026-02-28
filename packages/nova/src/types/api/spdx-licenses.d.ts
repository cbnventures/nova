import type { z } from 'zod';

import type { schemaSpdxLicensesResponse } from '@/lib/schema.ts';

/**
 * SPDX Licenses - Fetch licenses.
 *
 * @since 1.0.0
 */
export type SpdxLicensesFetchLicensesReturns = Promise<Set<string> | undefined>;

export type SpdxLicensesFetchLicensesResponse = z.infer<typeof schemaSpdxLicensesResponse>;

/**
 * SPDX Licenses - Licenses.
 *
 * @since 1.0.0
 */
export type SpdxLicensesLicenses = Set<string> | undefined;

/**
 * SPDX Licenses - Populated.
 *
 * @since 1.0.0
 */
export type SpdxLicensesPopulated = boolean | undefined;

/**
 * SPDX Licenses - Reset for testing.
 *
 * @since 1.0.0
 */
export type SpdxLicensesResetForTestingReturns = void;
