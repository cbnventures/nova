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

export type ThemeDocSidebarItemLinkDocSidebarItemLinkProps = {
  item: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsItem;
  activePath: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsActivePath;
  level: ThemeDocSidebarItemLinkDocSidebarItemLinkPropsLevel;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemLinkDocSidebarItemLinkIsActive = boolean;

export type ThemeDocSidebarItemLinkDocSidebarItemLinkAriaCurrent = 'page' | undefined;
