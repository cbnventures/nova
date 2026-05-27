import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Heading.
 *
 * @since 0.15.0
 */
export type Theme_Heading_Index_Heading_As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Theme_Heading_Index_Heading_Props_As = Theme_Heading_Index_Heading_As;

export type Theme_Heading_Index_Heading_Props_Id = string | undefined;

export type Theme_Heading_Index_Heading_Props_Children = ReactNode;

export type Theme_Heading_Index_Heading_Props_ClassName = string | undefined;

export type Theme_Heading_Index_Heading_Props_Style = CSSProperties | undefined;

export type Theme_Heading_Index_Heading_Props = {
  as: Theme_Heading_Index_Heading_Props_As;
  id?: Theme_Heading_Index_Heading_Props_Id;
  children?: Theme_Heading_Index_Heading_Props_Children;
  className?: Theme_Heading_Index_Heading_Props_ClassName;
  style?: Theme_Heading_Index_Heading_Props_Style;
  [key: string]: unknown;
};

export type Theme_Heading_Index_Heading_Id = string | undefined;

export type Theme_Heading_Index_Heading_BrokenLinksCollectAnchor = (anchor: string) => void;

export type Theme_Heading_Index_Heading_BrokenLinks_CollectAnchor = Theme_Heading_Index_Heading_BrokenLinksCollectAnchor;

export type Theme_Heading_Index_Heading_BrokenLinks = {
  collectAnchor: Theme_Heading_Index_Heading_BrokenLinks_CollectAnchor;
  [key: string]: unknown;
};

export type Theme_Heading_Index_Heading_HashLinkLabel = string;

export type Theme_Heading_Index_Heading_HashLink = ReactNode;
