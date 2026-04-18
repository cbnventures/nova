import type { ReactNode } from 'react';
import type { RouteConfig } from 'react-router-config';

/**
 * Theme - Docs Root - Docs Root.
 *
 * @since 0.15.0
 */
export type ThemeDocsRootDocsRootPropsRouteRoutes = RouteConfig[];

export type ThemeDocsRootDocsRootPropsRoute = {
  routes: ThemeDocsRootDocsRootPropsRouteRoutes;
  [key: string]: unknown;
};

export type ThemeDocsRootDocsRootProps = {
  route: ThemeDocsRootDocsRootPropsRoute;
  [key: string]: unknown;
};

export type ThemeDocsRootDocsRootRendered = ReactNode;
