import type { Express } from 'express';

/**
 * App - Create App.
 *
 * @since 0.0.0
 */
export type App_CreateApp_App = Express;

export type App_CreateApp_Returns = Express;

/**
 * App - Create Discovery.
 *
 * @since 0.0.0
 */
export type App_CreateDiscovery_Returns = {
  endpoints: {
    health: string;
  };
  name: string;
  status: string;
};

/**
 * App - Create Health.
 *
 * @since 0.0.0
 */
export type App_CreateHealth_Returns = {
  status: string;
};
