import { defineConfig } from 'vitest/config';

/**
 * Vitest Configuration.
 *
 * Discovers tests for the Node.js helpers surrounding the Android project.
 * Native Android tests remain owned by Gradle and the selected Android framework.
 *
 * @since 0.0.0
 */
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
