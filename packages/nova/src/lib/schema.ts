import { z } from 'zod';

/**
 * Schema - Node releases schedule entry.
 *
 * @since 1.0.0
 */
export const schemaNodeReleasesScheduleEntry = z.object({
  lts: z.string().optional(),
  end: z.string(),
});

/**
 * Schema - Node releases schedule.
 *
 * @since 1.0.0
 */
export const schemaNodeReleasesSchedule = z.record(z.string(), schemaNodeReleasesScheduleEntry);

/**
 * Schema - SPDX licenses license.
 *
 * @since 1.0.0
 */
export const schemaSpdxLicensesLicense = z.object({
  licenseId: z.string(),
});

/**
 * Schema - SPDX licenses response.
 *
 * @since 1.0.0
 */
export const schemaSpdxLicensesResponse = z.object({
  licenses: z.array(schemaSpdxLicensesLicense),
});
