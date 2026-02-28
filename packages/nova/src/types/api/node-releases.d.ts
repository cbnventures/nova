import type { z } from 'zod';

import type { schemaNodeReleasesSchedule } from '@/lib/schema.ts';

/**
 * Node Releases - Constraint.
 *
 * @since 1.0.0
 */
export type NodeReleasesConstraint = string | undefined;

/**
 * Node Releases - Fetch LTS versions.
 *
 * @since 1.0.0
 */
export type NodeReleasesFetchLtsVersionsReturns = Promise<string | undefined>;

export type NodeReleasesFetchLtsVersionsSchedule = z.infer<typeof schemaNodeReleasesSchedule>;

export type NodeReleasesFetchLtsVersionsActiveLtsMajors = number[];

/**
 * Node Releases - Populated.
 *
 * @since 1.0.0
 */
export type NodeReleasesPopulated = boolean | undefined;

/**
 * Node Releases - Reset for testing.
 *
 * @since 1.0.0
 */
export type NodeReleasesResetForTestingReturns = void;
