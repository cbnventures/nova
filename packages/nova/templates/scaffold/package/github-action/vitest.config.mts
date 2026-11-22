import {
  VitestCoverage,
  VitestReporters,
} from '@cbnventures/nova/toolkit';
import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * Discovers source-level and workspace-level unit tests.
 * Keeps action checks isolated from neighboring monorepo workspaces.
 *
 * @since 0.0.0
 */
export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'src/**/*.test.ts',
      'tests/**/*.test.ts',
    ],
    globals: false,
    reporters: VitestReporters.options(),
    testTimeout: 30000, // 30 seconds.
    coverage: VitestCoverage.options(),
  },
});
