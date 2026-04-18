import { z } from 'zod';

/**
 * Lib - Schema - Node Releases Schedule.
 *
 * Validates the JSON response from the Node.js release schedule API.
 * Used by ApiNodeReleases to parse the LTS and end-of-life dates for each major version.
 *
 * @since 0.13.0
 */
export const libSchemaNodeReleasesSchedule = z.record(z.string(), z.object({
  lts: z.string().optional(),
  end: z.string(),
}));

/**
 * Lib - Schema - SPDX Licenses Response.
 *
 * Validates the JSON response from the SPDX licenses API. Used by
 * ApiSpdxLicenses to extract the list of valid license identifiers.
 *
 * @since 0.13.0
 */
export const libSchemaSpdxLicensesResponse = z.object({
  licenses: z.array(z.object({
    licenseId: z.string(),
  })),
});
