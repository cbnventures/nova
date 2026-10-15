import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  createApp,
  createDiscovery,
  createHealth,
} from './app.js';

import type { App_ApiRoutes_ServesDiscoveryAndHealthResponses_App } from './types/app.test.d.ts';

/**
 * App - API Routes.
 *
 * Confirms the generated API starts independently and exposes its discovery
 * and health responses. The server wiring remains separate from process
 * startup so consumers can expand this suite without binding a real port.
 *
 * @since 0.0.0
 */
describe('API routes', () => {
  it('serves discovery and health responses', () => {
    const app: App_ApiRoutes_ServesDiscoveryAndHealthResponses_App = createApp();

    expect(app.get('x-powered-by')).toBe(false);

    expect(createDiscovery()).toEqual({
      endpoints: {
        health: '/health',
      },
      name: '[__PROJECT_SLUG__]',
      status: 'ready',
    });

    expect(createHealth()).toEqual({ status: 'ok' });

    return;
  });

  return;
});
