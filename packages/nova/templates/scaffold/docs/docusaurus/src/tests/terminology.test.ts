import { registerTerminologySuite } from '@cbnventures/nova/rules/vitest';

/**
 * Tests - Terminology.
 *
 * This site self-checks its Terminology components THROUGH the published kit.
 * The suite logic lives in @cbnventures/nova/rules/vitest; this wrapper
 * supplies the configuration that reproduces this site's conventions.
 *
 * @since 0.20.0
 */
registerTerminologySuite({
  enable: 'all',
});
