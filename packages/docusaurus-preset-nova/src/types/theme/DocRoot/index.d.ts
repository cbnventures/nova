import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { Props as DocRootModuleProps } from '@theme/DocRoot';
import type { ReactNode } from 'react';

/**
 * Theme - Doc Root - Doc Root.
 *
 * @since 0.15.0
 */
export type ThemeDocRootDocRootProps = DocRootModuleProps;

export type ThemeDocRootDocRootRouteMetadataDocElement = ReactNode;

export type ThemeDocRootDocRootRouteMetadataSidebarName = string | undefined;

export type ThemeDocRootDocRootRouteMetadataSidebarItems = PropSidebarItem[] | undefined;

export type ThemeDocRootDocRootRouteMetadata = {
  docElement: ThemeDocRootDocRootRouteMetadataDocElement;
  sidebarName: ThemeDocRootDocRootRouteMetadataSidebarName;
  sidebarItems: ThemeDocRootDocRootRouteMetadataSidebarItems;
  [key: string]: unknown;
} | null;
