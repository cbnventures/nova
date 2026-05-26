import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { GlobalVersion } from '@docusaurus/plugin-content-docs/client';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Sidebar - Doc Sidebar.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarDocSidebarPropsPath = string;

export type ThemeDocSidebarDocSidebarPropsSidebar = PropSidebarItem[];

export type ThemeDocSidebarDocSidebarPropsOnCollapse = (() => void) | undefined;

export type ThemeDocSidebarDocSidebarPropsIsHidden = boolean | undefined;

export type ThemeDocSidebarDocSidebarPropsClassName = string | undefined;

export type ThemeDocSidebarDocSidebarPropsStyle = CSSProperties | undefined;

export type ThemeDocSidebarDocSidebarProps = {
  path: ThemeDocSidebarDocSidebarPropsPath;
  sidebar: ThemeDocSidebarDocSidebarPropsSidebar;
  onCollapse?: ThemeDocSidebarDocSidebarPropsOnCollapse;
  isHidden?: ThemeDocSidebarDocSidebarPropsIsHidden;
  className?: ThemeDocSidebarDocSidebarPropsClassName;
  style?: ThemeDocSidebarDocSidebarPropsStyle;
  [key: string]: unknown;
};

export type ThemeDocSidebarDocSidebarNavAriaLabel = string;

export type ThemeDocSidebarDocSidebarVersions = GlobalVersion[];
