import type { CSSProperties } from 'react';

/**
 * Theme - Doc Sidebar Item - HTML - Doc Sidebar Item HTML.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsItemValue = string;

export type ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsItem = {
  value: ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsItemValue;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsActivePath = string;

export type ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsLevel = number;

export type ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsClassName = string | undefined;

export type ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsStyle = CSSProperties | undefined;

export type ThemeDocSidebarItemHtmlDocSidebarItemHtmlProps = {
  item: ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsItem;
  activePath: ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsActivePath;
  level: ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsLevel;
  className?: ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsClassName;
  style?: ThemeDocSidebarItemHtmlDocSidebarItemHtmlPropsStyle;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemHtmlDocSidebarItemHtmlValue = string;
