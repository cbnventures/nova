import type { CSSProperties } from 'react';

/**
 * Theme - Doc Sidebar Item - Link - Doc Sidebar Item Link.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemLinkDocSidebarItemLinkPropsItemHref = string;

export type ThemeDocSidebarItemLinkDocSidebarItemLinkPropsItemLabel = string;

export type ThemeDocSidebarItemLinkDocSidebarItemLinkPropsItem = {
  href: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsItemHref;
  label: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsItemLabel;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemLinkDocSidebarItemLinkPropsActivePath = string;

export type ThemeDocSidebarItemLinkDocSidebarItemLinkPropsLevel = number;

export type ThemeDocSidebarItemLinkDocSidebarItemLinkPropsClassName = string | undefined;

export type ThemeDocSidebarItemLinkDocSidebarItemLinkPropsStyle = CSSProperties | undefined;

export type ThemeDocSidebarItemLinkDocSidebarItemLinkProps = {
  item: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsItem;
  activePath: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsActivePath;
  level: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsLevel;
  className?: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsClassName;
  style?: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsStyle;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemLinkDocSidebarItemLinkIsActive = boolean;

export type ThemeDocSidebarItemLinkDocSidebarItemLinkAriaCurrent = 'page' | undefined;
