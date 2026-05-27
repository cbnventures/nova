import type { PropVersionMetadata } from '@docusaurus/plugin-content-docs';
import type { ReactNode } from 'react';
import type { RouteConfig } from 'react-router-config';

/**
 * Theme - Doc Version Root - Doc Version Root.
 *
 * @since 0.15.0
 */
export type Theme_DocVersionRoot_Index_DocVersionRoot_Props_Route_Routes = RouteConfig[];

export type Theme_DocVersionRoot_Index_DocVersionRoot_Props_Route = {
  routes: Theme_DocVersionRoot_Index_DocVersionRoot_Props_Route_Routes;
  [key: string]: unknown;
};

export type Theme_DocVersionRoot_Index_DocVersionRoot_Props_Version = PropVersionMetadata;

export type Theme_DocVersionRoot_Index_DocVersionRoot_Props = {
  route: Theme_DocVersionRoot_Index_DocVersionRoot_Props_Route;
  version: Theme_DocVersionRoot_Index_DocVersionRoot_Props_Version;
  [key: string]: unknown;
};

export type Theme_DocVersionRoot_Index_DocVersionRoot_Rendered = ReactNode;

export type Theme_DocVersionRoot_Index_DocVersionRoot_SearchTag = string;
