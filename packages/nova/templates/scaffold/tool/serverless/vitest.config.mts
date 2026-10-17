import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * Discovers the CLI and provider tests owned by this serverless tool while
 * keeping checks isolated from neighboring monorepo workspaces.
 *
 * @since 0.0.0
 */
export default defineConfig({
  test: {
    include: [
      'api/**/*.test.ts',
      'src/**/*.test.ts',
      'tests/**/*.test.ts',
    ],
  },
});
