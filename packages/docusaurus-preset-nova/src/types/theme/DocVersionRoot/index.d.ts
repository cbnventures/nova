import type { PropVersionMetadata } from '@docusaurus/plugin-content-docs';
import type { ReactNode } from 'react';
import type { RouteConfig } from 'react-router-config';

/**
 * Theme - Doc Version Root - Doc Version Root.
 *
 * @since 0.15.0
 */
export type ThemeDocVersionRootDocVersionRootPropsRouteRoutes = RouteConfig[];

export type ThemeDocVersionRootDocVersionRootPropsRoute = {
  routes: ThemeDocVersionRootDocVersionRootPropsRouteRoutes;
  [key: string]: unknown;
};

export type ThemeDocVersionRootDocVersionRootPropsVersion = PropVersionMetadata;

export type ThemeDocVersionRootDocVersionRootProps = {
  route: ThemeDocVersionRootDocVersionRootPropsRoute;
  version: ThemeDocVersionRootDocVersionRootPropsVersion;
  [key: string]: unknown;
};

export type ThemeDocVersionRootDocVersionRootRendered = ReactNode;

export type ThemeDocVersionRootDocVersionRootSearchTag = string;
