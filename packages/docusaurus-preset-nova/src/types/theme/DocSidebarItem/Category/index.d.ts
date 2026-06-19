import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type {
  CSSProperties,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react';

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_StateMap = Map<string, boolean>;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Label = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Href = string | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Items = PropSidebarItem[];

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Collapsible = boolean | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Collapsed = boolean | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item = {
  label: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Label;
  href?: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Href;
  items: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Items;
  collapsible?: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Collapsible;
  collapsed?: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item_Collapsed;
  [key: string]: unknown;
};

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_ActivePath = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Level = number;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_ClassName = string | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Style = CSSProperties | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props = {
  item: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Item;
  activePath: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_ActivePath;
  level: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Level;
  className?: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_ClassName;
  style?: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ThemeConfigCast = unknown;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ThemeConfig = Record<string, unknown>;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_DocsConfig_Sidebar = Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SidebarConfig;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_DocsConfig = {
  sidebar: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_DocsConfig_Sidebar;
  [key: string]: unknown;
};

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SidebarConfig_AutoCollapseCategories = boolean;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SidebarConfig = {
  autoCollapseCategories: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SidebarConfig_AutoCollapseCategories;
  [key: string]: unknown;
};

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_AutoCollapseCategories = boolean;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Href = string | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_Label = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_NextLevel = number;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_AriaCurrent = 'page' | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_CategoryKey = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_IsActive = boolean;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ActiveDescendant = Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Result;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_StoredState = boolean | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_InitialOpenValue = boolean;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_OpenState = [
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_IsOpenValue,
  Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SetIsOpenValue,
];

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_IsOpenValue = boolean;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SetIsOpenValue = Dispatch<SetStateAction<Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_IsOpenValue>>;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_CollapseCategoryAriaLabel = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ExpandCategoryAriaLabel = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryAriaLabel = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryClickEvent = React.MouseEvent<HTMLElement>;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_SummaryClickTarget = Element;

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Contains Active Path.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Items = PropSidebarItem[];

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ActivePath = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Result = boolean;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_Item = Record<string, unknown>;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ItemHref = string | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_ContainsActivePath_ItemItems = PropSidebarItem[] | undefined;

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Find Active Descendant.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Items = PropSidebarItem[];

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ActivePath = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Result = Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Match | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Match_Label = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Match_Href = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Match = {
  label: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Match_Label;
  href: Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Match_Href;
};

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_Item = Record<string, unknown>;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemHref = string | undefined;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemLabel = string;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_FindActiveDescendant_ItemItems = PropSidebarItem[] | undefined;

/**
 * Theme - Doc Sidebar Item - Category - Doc Sidebar Item Category - Handle Toggle.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_ToggleEvent = SyntheticEvent<HTMLDetailsElement>;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_DetailsElement = HTMLDetailsElement;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_IsOpen = boolean;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_ParentElement = HTMLElement | null;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_GrandparentElement = HTMLElement | null;

export type Theme_DocSidebarItem_Category_Index_DocSidebarItemCategory_HandleToggle_SiblingDetails = NodeListOf<HTMLDetailsElement>;
