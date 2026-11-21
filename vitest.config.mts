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
      'scripts/**/*.test.mjs',
      'tests/**/*.test.ts',
    ],
    exclude: [
      'apps/**',
      'packages/**',
      '**/node_modules/**',
    ],
    globals: false,
    testTimeout: 30000, // 30 seconds.
  },
});
