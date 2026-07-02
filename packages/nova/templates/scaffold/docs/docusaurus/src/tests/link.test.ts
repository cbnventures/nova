import { registerLinkSuite } from '@cbnventures/nova/rules/vitest';

/**
 * Tests - Link.
 *
 * This site self-checks its internal links THROUGH the published kit. The
 * suite logic lives in @cbnventures/nova/rules/vitest; this wrapper supplies
 * the configuration that reproduces this site's conventions.
 *
 * @since 0.20.0
 */
registerLinkSuite({
  enable: 'all',
});
