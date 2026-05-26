import type { PropDocContent } from '@docusaurus/plugin-content-docs';

import type { CSSProperties } from 'react';

/**
 * Theme - Doc Item - Doc Item.
 *
 * @since 0.15.0
 */
export type ThemeDocItemDocItemContent = PropDocContent;

export type ThemeDocItemDocItemPropsContent = ThemeDocItemDocItemContent;

export type ThemeDocItemDocItemPropsClassName = string | undefined;

export type ThemeDocItemDocItemPropsStyle = CSSProperties | undefined;

export type ThemeDocItemDocItemProps = {
  content: ThemeDocItemDocItemPropsContent;
  className?: ThemeDocItemDocItemPropsClassName;
  style?: ThemeDocItemDocItemPropsStyle;
  [key: string]: unknown;
};

export type ThemeDocItemDocItemHtmlClassName = string;

export type ThemeDocItemDocItemMdxComponent = ThemeDocItemDocItemContent;
