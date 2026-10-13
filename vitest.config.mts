import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * Wires the root-owned conformance and cross-workspace integration tests.
 * Workspace packages retain their independently configured suites.
 *
 * @since 1.0.0
 */
export default defineConfig({
  test: {
    setupFiles: ['./tests/setup.ts'],
    include: [
      'scripts/tests/**/*.mjs',
      'tests/**/*.test.ts',
    ],
    globals: false,
    testTimeout: 30000, // 30 seconds.
    sequence: {
      concurrent: false,
    },
  },
});
