import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * Runs the documentation conformance suites from @cbnventures/nova/rules/vitest
 * against this site. The suites scan from the project root (process.cwd()), so
 * vitest must run from this workspace directory.
 *
 * @since 0.20.0
 */
export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/tests/**/*.test.ts'],
    globals: false,
    testTimeout: 30000, // 30 seconds.
    sequence: {
      concurrent: false,
    },
  },
});
