import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

/**
 * Theme - Doc Sidebar - Doc Sidebar.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarDocSidebarPropsPath = string;

export type ThemeDocSidebarDocSidebarPropsSidebar = PropSidebarItem[];

export type ThemeDocSidebarDocSidebarPropsOnCollapse = (() => void) | undefined;

export type ThemeDocSidebarDocSidebarPropsIsHidden = boolean | undefined;

export type ThemeDocSidebarDocSidebarProps = {
  path: ThemeDocSidebarDocSidebarPropsPath;
  sidebar: ThemeDocSidebarDocSidebarPropsSidebar;
  onCollapse?: ThemeDocSidebarDocSidebarPropsOnCollapse;
  isHidden?: ThemeDocSidebarDocSidebarPropsIsHidden;
  [key: string]: unknown;
};

export type ThemeDocSidebarDocSidebarNavAriaLabel = string;
