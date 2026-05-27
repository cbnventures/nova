import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Admonition.
 *
 * @since 0.15.0
 */
export type Theme_Admonition_Index_Admonition_Props_Type = string;

export type Theme_Admonition_Index_Admonition_Props_Title = ReactNode;

export type Theme_Admonition_Index_Admonition_Props_Children = ReactNode;

export type Theme_Admonition_Index_Admonition_Props_ClassName = string | undefined;

export type Theme_Admonition_Index_Admonition_Props_Style = CSSProperties | undefined;

export type Theme_Admonition_Index_Admonition_Props = {
  type: Theme_Admonition_Index_Admonition_Props_Type;
  title?: Theme_Admonition_Index_Admonition_Props_Title;
  children?: Theme_Admonition_Index_Admonition_Props_Children;
  className?: Theme_Admonition_Index_Admonition_Props_ClassName;
  style?: Theme_Admonition_Index_Admonition_Props_Style;
  [key: string]: unknown;
};

export type Theme_Admonition_Index_Admonition_Title = ReactNode;

export type Theme_Admonition_Index_Admonition_IconName = string;

/**
 * Theme - Admonition - Icons.
 *
 * @since 0.15.0
 */
export type Theme_Admonition_Index_Admonition_Icons = Record<string, string>;

/**
 * Theme - Admonition - Type Labels.
 *
 * @since 0.18.0
 */
export type Theme_Admonition_Index_Admonition_TypeLabels = Record<string, string>;
