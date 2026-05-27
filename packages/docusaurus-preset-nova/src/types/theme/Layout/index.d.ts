import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Layout.
 *
 * @since 0.15.0
 */
export type Theme_Layout_Index_Layout_Props_Children = ReactNode;

export type Theme_Layout_Index_Layout_Props_NoFooter = boolean | undefined;

export type Theme_Layout_Index_Layout_Props_Title = string | undefined;

export type Theme_Layout_Index_Layout_Props_Description = string | undefined;

export type Theme_Layout_Index_Layout_Props_WrapperClassName = string | undefined;

export type Theme_Layout_Index_Layout_Props_ClassName = string | undefined;

export type Theme_Layout_Index_Layout_Props_Style = CSSProperties | undefined;

export type Theme_Layout_Index_Layout_Props = {
  children: Theme_Layout_Index_Layout_Props_Children;
  noFooter?: Theme_Layout_Index_Layout_Props_NoFooter;
  title?: Theme_Layout_Index_Layout_Props_Title;
  description?: Theme_Layout_Index_Layout_Props_Description;
  wrapperClassName?: Theme_Layout_Index_Layout_Props_WrapperClassName;
  className?: Theme_Layout_Index_Layout_Props_ClassName;
  style?: Theme_Layout_Index_Layout_Props_Style;
  [key: string]: unknown;
};

export type Theme_Layout_Index_Layout_MetadataSpread = Record<string, unknown>;
