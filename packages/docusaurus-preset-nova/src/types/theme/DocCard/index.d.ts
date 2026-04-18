import type { PropSidebarItemCategory, PropSidebarItemLink } from '@docusaurus/plugin-content-docs';

/**
 * Theme - Doc Card - Card Category.
 *
 * @since 0.15.0
 */
export type ThemeDocCardCardCategoryPropsItem = PropSidebarItemCategory;

export type ThemeDocCardCardCategoryProps = {
  item: ThemeDocCardCardCategoryPropsItem;
};

export type ThemeDocCardCardCategoryHref = string | undefined;

export type ThemeDocCardLayoutDescription = string | undefined;

/**
 * Theme - Doc Card - Card Layout.
 *
 * @since 0.15.0
 */
export type ThemeDocCardCardLayoutPropsClassName = string | undefined;

export type ThemeDocCardCardLayoutPropsHref = string;

export type ThemeDocCardCardLayoutPropsIcon = string;

export type ThemeDocCardCardLayoutPropsTitle = string;

export type ThemeDocCardCardLayoutPropsDescription = string | undefined;

export type ThemeDocCardCardLayoutProps = {
  className: ThemeDocCardCardLayoutPropsClassName;
  href: ThemeDocCardCardLayoutPropsHref;
  icon: ThemeDocCardCardLayoutPropsIcon;
  title: ThemeDocCardCardLayoutPropsTitle;
  description: ThemeDocCardCardLayoutPropsDescription;
};

/**
 * Theme - Doc Card - Card Link.
 *
 * @since 0.15.0
 */
export type ThemeDocCardCardLinkPropsItem = PropSidebarItemLink;

export type ThemeDocCardCardLinkProps = {
  item: ThemeDocCardCardLinkPropsItem;
};

export type ThemeDocCardLayoutIcon = string;

export type ThemeDocCardDocResultObjectDescription = string;

export type ThemeDocCardDocResultObject = {
  description: ThemeDocCardDocResultObjectDescription;
};

export type ThemeDocCardDocResult = ThemeDocCardDocResultObject | undefined;

export type ThemeDocCardDocDescription = string | undefined;

/**
 * Theme - Doc Card - Doc Card.
 *
 * @since 0.15.0
 */
export type ThemeDocCardCategoryItem = PropSidebarItemCategory;

export type ThemeDocCardLinkItem = PropSidebarItemLink;

export type ThemeDocCardItem = ThemeDocCardCategoryItem | ThemeDocCardLinkItem;

export type ThemeDocCardDocCardPropsItem = ThemeDocCardCategoryItem | ThemeDocCardLinkItem;

export type ThemeDocCardDocCardProps = {
  item: ThemeDocCardDocCardPropsItem;
};

/**
 * Theme - Doc Card - Use Category Items Plural.
 *
 * @since 0.15.0
 */
export type ThemeDocCardUseCategoryItemsPluralSelectMessage = (count: number) => string;

export type ThemeDocCardUseCategoryItemsPluralPluralFormSelectMessage = (count: number, message: string) => string;

export type ThemeDocCardUseCategoryItemsPluralPluralForm = {
  selectMessage: ThemeDocCardUseCategoryItemsPluralPluralFormSelectMessage;
};

export type ThemeDocCardUseCategoryItemsPluralCount = number;

export type ThemeDocCardUseCategoryItemsPluralTranslated = string;
