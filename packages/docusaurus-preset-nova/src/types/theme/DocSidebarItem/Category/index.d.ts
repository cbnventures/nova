import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { SyntheticEvent } from 'react';

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemLabel = string;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemHref = string | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemItems = PropSidebarItem[];

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemCollapsible = boolean | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemCollapsed = boolean | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItem = {
  label: ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemLabel;
  href?: ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemHref;
  items: ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemItems;
  collapsible?: ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemCollapsible;
  collapsed?: ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItemCollapsed;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsActivePath = string;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsLevel = number;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryProps = {
  item: ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsItem;
  activePath: ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsActivePath;
  level: ThemeDocSidebarItemCategoryDocSidebarItemCategoryPropsLevel;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryThemeConfigCast = unknown;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryThemeConfig = Record<string, unknown>;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryDocsConfigSidebar = ThemeDocSidebarItemCategoryDocSidebarItemCategorySidebarConfig;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryDocsConfig = {
  sidebar: ThemeDocSidebarItemCategoryDocSidebarItemCategoryDocsConfigSidebar;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemCategoryDocSidebarItemCategorySidebarConfigAutoCollapseCategories = boolean;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategorySidebarConfig = {
  autoCollapseCategories: ThemeDocSidebarItemCategoryDocSidebarItemCategorySidebarConfigAutoCollapseCategories;
  [key: string]: unknown;
};

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryAutoCollapseCategories = boolean;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryHref = string | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryLabel = string;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryNextLevel = number;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryAriaCurrent = 'page' | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryCategoryKey = string;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryIsActive = boolean;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryStoredState = boolean | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryIsOpenValue = boolean;

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Contains Active Path.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItems = PropSidebarItem[];

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathActivePath = string;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathResult = boolean;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItem = Record<string, unknown>;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItemHref = string | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryContainsActivePathItemItems = PropSidebarItem[] | undefined;

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Find Active Descendant.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItems = PropSidebarItem[];

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantActivePath = string;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantResult = ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantMatch | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantMatch = {
  label: string;
  href: string;
};

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItem = Record<string, unknown>;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemHref = string | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemLabel = string;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantItemItems = PropSidebarItem[] | undefined;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryActiveDescendant = ThemeDocSidebarItemCategoryDocSidebarItemCategoryFindActiveDescendantResult;

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Handle Toggle.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryToggleEvent = SyntheticEvent<HTMLDetailsElement>;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryDetailsElement = HTMLDetailsElement;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryIsOpen = boolean;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryParentElement = HTMLElement | null;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryGrandparentElement = HTMLElement | null;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategorySiblingDetails = NodeListOf<HTMLDetailsElement>;

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Summary Click.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemCategoryDocSidebarItemCategorySummaryClickEvent = React.MouseEvent<HTMLElement>;

export type ThemeDocSidebarItemCategoryDocSidebarItemCategorySummaryClickTarget = Element;

/**
 * Theme - Doc Sidebar Item - Category - State Map.
 *
 * @since 0.15.0
 */
export type ThemeDocSidebarItemCategoryDocSidebarItemCategoryStateMap = Map<string, boolean>;
