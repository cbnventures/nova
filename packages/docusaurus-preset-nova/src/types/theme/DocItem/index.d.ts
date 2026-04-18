import type { PropDocContent } from '@docusaurus/plugin-content-docs';

/**
 * Theme - Doc Item - Doc Item.
 *
 * @since 0.15.0
 */
export type ThemeDocItemDocItemContent = PropDocContent;

export type ThemeDocItemDocItemPropsContent = ThemeDocItemDocItemContent;

export type ThemeDocItemDocItemProps = {
  content: ThemeDocItemDocItemPropsContent;
  [key: string]: unknown;
};

export type ThemeDocItemDocItemHtmlClassName = string;

export type ThemeDocItemDocItemMdxComponent = ThemeDocItemDocItemContent;
