import { deepStrictEqual } from 'node:assert/strict';

import {
  describe,
  it,
} from 'vitest';

import VitestReporters from '../../toolkit/vitest-reporters.js';

/**
 * Tests - Toolkit - Vitest Reporters - Toolkit VitestReporters.
 *
 * @since 0.50.0
 */
describe('Toolkit VitestReporters', () => {
  it('keeps terminal output and annotations without writing a job summary', () => {
    deepStrictEqual(VitestReporters.options(), [
      'default',
      [
        'github-actions',
        {
          jobSummary: {
            enabled: false,
          },
        },
      ],
    ]);

    return;
  });

  return;
});
