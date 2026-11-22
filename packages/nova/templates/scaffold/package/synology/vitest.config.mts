import { VitestReporters } from '@cbnventures/nova/toolkit';
import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * Exercises the portable SPK build and validation scripts without requiring a
 * Synology NAS.
 *
 * @since UNRELEASED
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
