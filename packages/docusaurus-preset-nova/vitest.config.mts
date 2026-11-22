import {
  VitestCoverage,
  VitestReporters,
} from '@cbnventures/nova/toolkit';
import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * @since 0.15.0
 */
export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/tests/**/*.test.ts'],
    globals: false,
    reporters: VitestReporters.options(),
    testTimeout: 30000, // 30 seconds.
    coverage: VitestCoverage.options(),
    sequence: {
      concurrent: false,
    },
  },
});
