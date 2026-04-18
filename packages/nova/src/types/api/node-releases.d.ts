import type { z } from 'zod';

import type { libSchemaNodeReleasesSchedule } from '../../lib/schema.js';

/**
 * API - Node Releases - Constraint.
 *
 * @since 0.13.0
 */
export type ApiNodeReleasesConstraint = string | undefined;

/**
 * API - Node Releases - Fetch LTS Versions.
 *
 * @since 0.13.0
 */
export type ApiNodeReleasesFetchLtsVersionsReturns = Promise<string | undefined>;

export type ApiNodeReleasesFetchLtsVersionsResponse = Response;

export type ApiNodeReleasesFetchLtsVersionsResponseData = unknown;

export type ApiNodeReleasesFetchLtsVersionsSchedule = z.infer<typeof libSchemaNodeReleasesSchedule>;

export type ApiNodeReleasesFetchLtsVersionsToday = string;

export type ApiNodeReleasesFetchLtsVersionsActiveLtsMajors = number[];

export type ApiNodeReleasesFetchLtsVersionsKey = string;

export type ApiNodeReleasesFetchLtsVersionsEntry = ApiNodeReleasesFetchLtsVersionsSchedule[string];

export type ApiNodeReleasesFetchLtsVersionsStrippedKey = string;

export type ApiNodeReleasesFetchLtsVersionsMajor = number;

export type ApiNodeReleasesFetchLtsVersionsErrorMessage = string;

/**
 * API - Node Releases - Populated.
 *
 * @since 0.13.0
 */
export type ApiNodeReleasesPopulated = boolean | undefined;

/**
 * API - Node Releases - Reset For Testing.
 *
 * @since 0.13.0
 */
export type ApiNodeReleasesResetForTestingReturns = void;
