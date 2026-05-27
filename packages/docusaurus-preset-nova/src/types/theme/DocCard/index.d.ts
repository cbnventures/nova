import type { PropSidebarItemCategory, PropSidebarItemLink } from '@docusaurus/plugin-content-docs';

import type { CSSProperties } from 'react';

/**
 * Theme - Doc Card - Card Category.
 *
 * @since 0.15.0
 */
export type Theme_DocCard_Index_CardCategory_Props_Item = PropSidebarItemCategory;

export type Theme_DocCard_Index_CardCategory_Props = {
  item: Theme_DocCard_Index_CardCategory_Props_Item;
};

export type Theme_DocCard_Index_CardCategory_Href = string | undefined;

export type Theme_DocCard_Index_DocCard_LayoutDescription = string | undefined;

/**
 * Theme - Doc Card - Card Layout.
 *
 * @since 0.15.0
 */
export type Theme_DocCard_Index_CardLayout_Props_ClassName = string | undefined;

export type Theme_DocCard_Index_CardLayout_Props_Href = string;

export type Theme_DocCard_Index_CardLayout_Props_Icon = string;

export type Theme_DocCard_Index_CardLayout_Props_Title = string;

export type Theme_DocCard_Index_CardLayout_Props_Description = string | undefined;

export type Theme_DocCard_Index_CardLayout_Props_Style = CSSProperties | undefined;

export type Theme_DocCard_Index_CardLayout_Props = {
  className?: Theme_DocCard_Index_CardLayout_Props_ClassName;
  style?: Theme_DocCard_Index_CardLayout_Props_Style;
  href: Theme_DocCard_Index_CardLayout_Props_Href;
  icon: Theme_DocCard_Index_CardLayout_Props_Icon;
  title: Theme_DocCard_Index_CardLayout_Props_Title;
  description: Theme_DocCard_Index_CardLayout_Props_Description;
};

/**
 * Theme - Doc Card - Card Link.
 *
 * @since 0.15.0
 */
export type Theme_DocCard_Index_CardLink_Props_Item = PropSidebarItemLink;

export type Theme_DocCard_Index_CardLink_Props = {
  item: Theme_DocCard_Index_CardLink_Props_Item;
};

export type Theme_DocCard_Index_DocCard_LayoutIcon = string;

export type Theme_DocCard_Index_DocCard_DocResultObject_Description = string;

export type Theme_DocCard_Index_DocCard_DocResultObject = {
  description: Theme_DocCard_Index_DocCard_DocResultObject_Description;
};

export type Theme_DocCard_Index_DocCard_DocResult = Theme_DocCard_Index_DocCard_DocResultObject | undefined;

export type Theme_DocCard_Index_DocCard_DocDescription = string | undefined;

/**
 * Theme - Doc Card - Doc Card.
 *
 * @since 0.15.0
 */
export type Theme_DocCard_Index_DocCard_CategoryItem = PropSidebarItemCategory;

export type Theme_DocCard_Index_DocCard_LinkItem = PropSidebarItemLink;

export type Theme_DocCard_Index_DocCard_Item = Theme_DocCard_Index_DocCard_CategoryItem | Theme_DocCard_Index_DocCard_LinkItem;

export type Theme_DocCard_Index_DocCard_Props_Item = Theme_DocCard_Index_DocCard_CategoryItem | Theme_DocCard_Index_DocCard_LinkItem;

export type Theme_DocCard_Index_DocCard_Props_ClassName = string | undefined;

export type Theme_DocCard_Index_DocCard_Props_Style = CSSProperties | undefined;

export type Theme_DocCard_Index_DocCard_Props = {
  item: Theme_DocCard_Index_DocCard_Props_Item;
  className?: Theme_DocCard_Index_DocCard_Props_ClassName;
  style?: Theme_DocCard_Index_DocCard_Props_Style;
};

/**
 * Theme - Doc Card - Use Category Items Plural.
 *
 * @since 0.15.0
 */
export type Theme_DocCard_Index_UseCategoryItemsPlural_SelectMessage = (count: number) => string;

export type Theme_DocCard_Index_UseCategoryItemsPlural_PluralForm_SelectMessage = (count: number, message: string) => string;

export type Theme_DocCard_Index_UseCategoryItemsPlural_PluralForm = {
  selectMessage: Theme_DocCard_Index_UseCategoryItemsPlural_PluralForm_SelectMessage;
};

export type Theme_DocCard_Index_UseCategoryItemsPlural_Count = number;

export type Theme_DocCard_Index_UseCategoryItemsPlural_Translated = string;
