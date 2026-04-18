import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type {
  Dispatch,
  SetStateAction,
} from 'react';

/**
 * Theme - Doc Root - Layout - Sidebar - Doc Root Layout Sidebar.
 *
 * @since 0.15.0
 */
export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarPropsSidebar = PropSidebarItem[];

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarProps = {
  sidebar: ThemeDocRootLayoutSidebarDocRootLayoutSidebarPropsSidebar;
  [key: string]: unknown;
};

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarThemeConfigCast = unknown;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarThemeConfig = Record<string, unknown>;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarDocsConfigSidebar = ThemeDocRootLayoutSidebarDocRootLayoutSidebarSidebarConfig;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarDocsConfig = {
  sidebar: ThemeDocRootLayoutSidebarDocRootLayoutSidebarDocsConfigSidebar;
  [key: string]: unknown;
};

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarSidebarConfigHideable = boolean;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarSidebarConfig = {
  hideable: ThemeDocRootLayoutSidebarDocRootLayoutSidebarSidebarConfigHideable;
  [key: string]: unknown;
};

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarHideable = boolean;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarLocationPathname = string;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarLocation = Record<string, unknown> & {
  pathname: ThemeDocRootLayoutSidebarDocRootLayoutSidebarLocationPathname;
};

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarPathname = string;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarInitialCollapsed = boolean;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarStoredValue = string | null;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsedState = [ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsed, ThemeDocRootLayoutSidebarDocRootLayoutSidebarSetCollapsed];

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsed = boolean;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarSetCollapsed = Dispatch<SetStateAction<ThemeDocRootLayoutSidebarDocRootLayoutSidebarCollapsed>>;

export type ThemeDocRootLayoutSidebarSidebarExpandAriaLabel = string;

export type ThemeDocRootLayoutSidebarSidebarCollapseAriaLabel = string;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarAsideClassName = string;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarToggleLabel = string;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarToggleIndicator = string;

export type ThemeDocRootLayoutSidebarDocRootLayoutSidebarNextCollapsedString = string;
