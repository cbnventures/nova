import { PATTERN_LEADING_V } from '@/lib/regex.js';
import { schemaNodeReleasesSchedule } from '@/lib/schema.js';
import { Logger } from '@/toolkit/index.js';

import type {
  NodeReleasesConstraint,
  NodeReleasesFetchLtsVersionsActiveLtsMajors,
  NodeReleasesFetchLtsVersionsReturns,
  NodeReleasesFetchLtsVersionsSchedule,
  NodeReleasesPopulated,
  NodeReleasesResetForTestingReturns,
} from '@/types/api/node-releases.d.ts';

/**
 * Node Releases.
 *
 * @since 1.0.0
 */
export class NodeReleases {
  /**
   * Node Releases - Constraint.
   *
   * @private
   *
   * @since 1.0.0
   */
  static #constraint: NodeReleasesConstraint;

  /**
   * Node Releases - Populated.
   *
   * @private
   *
   * @since 1.0.0
   */
  static #populated: NodeReleasesPopulated;

  /**
   * Node Releases - Fetch LTS versions.
   *
   * @returns {NodeReleasesFetchLtsVersionsReturns}
   *
   * @since 1.0.0
   */
  public static async fetchLtsVersions(): NodeReleasesFetchLtsVersionsReturns {
    if (NodeReleases.#populated === true) {
      return NodeReleases.#constraint;
    }

    try {
      const response = await fetch('https://raw.githubusercontent.com/nodejs/Release/main/schedule.json');

      if (response.ok === false) {
        Logger.customize({
          name: 'NodeReleases',
          purpose: 'fetch',
        }).warn(`Failed to fetch Node.js release schedule. HTTP status: ${response.status}`);

        NodeReleases.#populated = true;

        return undefined;
      }

      const responseData = await response.json();

      const schedule: NodeReleasesFetchLtsVersionsSchedule = schemaNodeReleasesSchedule.parse(responseData);
      const today = new Date().toISOString().slice(0, 10);

      // Collect major versions where LTS has started and end-of-life has not passed.
      const activeLtsMajors: NodeReleasesFetchLtsVersionsActiveLtsMajors = [];

      for (const [key, entry] of Object.entries(schedule)) {
        if (
          typeof entry.lts === 'string'
          && entry.lts <= today
          && entry.end >= today
        ) {
          const major = parseInt(key.replace(PATTERN_LEADING_V, ''), 10);

          if (Number.isNaN(major) === false) {
            activeLtsMajors.push(major);
          }
        }
      }

      if (activeLtsMajors.length === 0) {
        Logger.customize({
          name: 'NodeReleases',
          purpose: 'parse',
        }).warn('No active LTS versions found in Node.js release schedule.');

        NodeReleases.#populated = true;

        return undefined;
      }

      // Build constraint targeting all active LTS versions (e.g., "^18 || ^20 || ^22").
      NodeReleases.#constraint = activeLtsMajors
        .sort((a, b) => a - b)
        .map((major) => `^${major}`)
        .join(' || ');
      NodeReleases.#populated = true;

      return NodeReleases.#constraint;
    } catch (error) {
      Logger.customize({
        name: 'NodeReleases',
        purpose: 'fetch',
      }).warn([
        'Failed to fetch Node.js release schedule.',
        error,
      ].join('\n'));

      NodeReleases.#populated = true;

      return undefined;
    }
  }

  /**
   * Node Releases - Reset for testing.
   *
   * @returns {NodeReleasesResetForTestingReturns}
   *
   * @since 1.0.0
   */
  public static resetForTesting(): NodeReleasesResetForTestingReturns {
    NodeReleases.#constraint = undefined;
    NodeReleases.#populated = undefined;
  }
}
