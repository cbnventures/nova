import { VitestReporters } from '@cbnventures/nova/toolkit';
import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * Discovers tests for the Node.js helpers surrounding the pfSense package sources.
 * FreeBSD package validation remains available through the package-specific check.
 *
 * @since 0.0.0
 */
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    passWithNoTests: true,
    globals: false,
    reporters: VitestReporters.options(),
    testTimeout: 30000, // 30 seconds.
  },
});
