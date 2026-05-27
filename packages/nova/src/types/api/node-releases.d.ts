import type { z } from 'zod';

import type { libSchemaNodeReleasesSchedule } from '../../lib/schema.js';

/**
 * API - Node Releases - Constraint.
 *
 * @since 0.13.0
 */
export type Api_NodeReleases_Runner_Constraint = string | undefined;

/**
 * API - Node Releases - Fetch LTS Versions.
 *
 * @since 0.13.0
 */
export type Api_NodeReleases_Runner_FetchLtsVersions_Returns = Promise<string | undefined>;

export type Api_NodeReleases_Runner_FetchLtsVersions_Response = Response;

export type Api_NodeReleases_Runner_FetchLtsVersions_ResponseData = unknown;

export type Api_NodeReleases_Runner_FetchLtsVersions_Schedule = z.infer<typeof libSchemaNodeReleasesSchedule>;

export type Api_NodeReleases_Runner_FetchLtsVersions_Today = string;

export type Api_NodeReleases_Runner_FetchLtsVersions_ActiveLtsMajors = number[];

export type Api_NodeReleases_Runner_FetchLtsVersions_Key = string;

export type Api_NodeReleases_Runner_FetchLtsVersions_Entry = Api_NodeReleases_Runner_FetchLtsVersions_Schedule[string];

export type Api_NodeReleases_Runner_FetchLtsVersions_StrippedKey = string;

export type Api_NodeReleases_Runner_FetchLtsVersions_Major = number;

export type Api_NodeReleases_Runner_FetchLtsVersions_ErrorMessage = string;

/**
 * API - Node Releases - Populated.
 *
 * @since 0.13.0
 */
export type Api_NodeReleases_Runner_Populated = boolean | undefined;

/**
 * API - Node Releases - Reset For Testing.
 *
 * @since 0.13.0
 */
export type Api_NodeReleases_Runner_ResetForTesting_Returns = void;
