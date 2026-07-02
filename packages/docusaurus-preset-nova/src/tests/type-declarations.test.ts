import { registerTypeDeclarationSuite } from '@cbnventures/nova/rules/vitest';

/**
 * Tests - Type Declarations.
 *
 * This package self-checks its type declarations THROUGH the published kit. The
 * ten inspector rules live in @cbnventures/nova/rules/vitest; this wrapper
 * supplies the configuration that reproduces this package's conventions.
 *
 * @since 0.20.0
 */
registerTypeDeclarationSuite({
  enable: 'all',
  typeRoots: [
    'src',
    'utils',
  ],
  standaloneTypeFiles: [
    '/shared.d.ts',
    '/worker-globals.d.ts',
  ],
});
