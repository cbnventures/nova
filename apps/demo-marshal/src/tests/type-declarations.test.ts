import { registerTypeDeclarationSuite } from '@cbnventures/nova/rules/vitest';

/**
 * Tests - Type Declarations.
 *
 * This app self-checks its type declarations THROUGH the published kit. The
 * inspector rules live in @cbnventures/nova/rules/vitest; this wrapper
 * supplies the configuration that reproduces this app's conventions.
 *
 * @since 0.20.0
 */
registerTypeDeclarationSuite({
  enable: 'all',
  typeRoots: [
    'src',
    'utils',
  ],
  standaloneTypeFiles: ['/shared.d.ts'],
});
