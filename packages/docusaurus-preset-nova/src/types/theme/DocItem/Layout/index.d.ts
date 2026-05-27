import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Doc Item - Layout - Doc Item Layout.
 *
 * @since 0.15.0
 */
export type Theme_DocItem_Layout_Index_DocItemLayout_Props_Children = ReactNode;

export type Theme_DocItem_Layout_Index_DocItemLayout_Props_ClassName = string | undefined;

export type Theme_DocItem_Layout_Index_DocItemLayout_Props_Style = CSSProperties | undefined;

export type Theme_DocItem_Layout_Index_DocItemLayout_Props = {
  children: Theme_DocItem_Layout_Index_DocItemLayout_Props_Children;
  className?: Theme_DocItem_Layout_Index_DocItemLayout_Props_ClassName;
  style?: Theme_DocItem_Layout_Index_DocItemLayout_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocItem_Layout_Index_DocItemLayout_Doc = DocContextValue;

export type Theme_DocItem_Layout_Index_DocItemLayout_CanRenderToc = boolean;
