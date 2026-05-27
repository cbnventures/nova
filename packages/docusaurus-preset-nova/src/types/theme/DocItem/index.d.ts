import type { PropDocContent } from '@docusaurus/plugin-content-docs';

import type { CSSProperties } from 'react';

/**
 * Theme - Doc Item - Doc Item.
 *
 * @since 0.15.0
 */
export type Theme_DocItem_Index_DocItem_Content = PropDocContent;

export type Theme_DocItem_Index_DocItem_Props_Content = Theme_DocItem_Index_DocItem_Content;

export type Theme_DocItem_Index_DocItem_Props_ClassName = string | undefined;

export type Theme_DocItem_Index_DocItem_Props_Style = CSSProperties | undefined;

export type Theme_DocItem_Index_DocItem_Props = {
  content: Theme_DocItem_Index_DocItem_Props_Content;
  className?: Theme_DocItem_Index_DocItem_Props_ClassName;
  style?: Theme_DocItem_Index_DocItem_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocItem_Index_DocItem_HtmlClassName = string;

export type Theme_DocItem_Index_DocItem_MdxComponent = Theme_DocItem_Index_DocItem_Content;
