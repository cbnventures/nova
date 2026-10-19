import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * Discovers tests for the Node.js helpers surrounding the Apple project.
 * Native Apple tests remain owned by Xcode and the selected Apple framework.
 *
 * @since 0.0.0
 */
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    passWithNoTests: true,
  },
});
