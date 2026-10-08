import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * Discovers source-level and workspace-level unit tests.
 * Keeps worker checks isolated from neighboring monorepo workspaces.
 *
 * @since 0.0.0
 */
export default defineConfig({
  test: {
    include: [
      'src/**/*.test.ts',
      'tests/**/*.test.ts',
    ],
  },
});
