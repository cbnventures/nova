import express from 'express';

import type {
  App_CreateApp_App,
  App_CreateApp_Returns,
  App_CreateDiscovery_Returns,
  App_CreateHealth_Returns,
} from './types/app.d.ts';

/**
 * App - Create Discovery.
 *
 * Creates the root response that introduces the generated service and its
 * first operational endpoint.
 *
 * @returns {App_CreateDiscovery_Returns}
 *
 * @since 0.0.0
 */
export function createDiscovery(): App_CreateDiscovery_Returns {
  return {
    endpoints: {
      health: '/health',
    },
    name: '[__PROJECT_SLUG__]',
    status: 'ready',
  };
}

/**
 * App - Create Health.
 *
 * Creates the stable response used by local checks and container health
 * probes.
 *
 * @returns {App_CreateHealth_Returns}
 *
 * @since 0.0.0
 */
export function createHealth(): App_CreateHealth_Returns {
  return { status: 'ok' };
}

/**
 * App - Create App.
 *
 * Creates the generated API with a discoverable root response and a small
 * health endpoint suitable for local checks and container probes.
 *
 * @returns {Express}
 *
 * @since 0.0.0
 */
export function createApp(): App_CreateApp_Returns {
  const app: App_CreateApp_App = express();

  app.disable('x-powered-by');

  app.get('/', (_request, response) => {
    response.json(createDiscovery());

    return;
  });

  app.get('/health', (_request, response) => {
    response.json(createHealth());

    return;
  });

  return app;
}
