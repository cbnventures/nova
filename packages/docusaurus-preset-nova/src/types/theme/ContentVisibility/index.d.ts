import type { CSSProperties } from 'react';

/**
 * Theme - Content Visibility - Content Visibility.
 *
 * @since 0.15.0
 */
export type Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata_FrontMatter_Draft = boolean | undefined;

export type Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata_FrontMatter_Unlisted = boolean | undefined;

export type Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata_FrontMatter = {
  draft?: Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata_FrontMatter_Draft;
  unlisted?: Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata_FrontMatter_Unlisted;
};

export type Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata_Unlisted = boolean;

export type Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata = {
  unlisted: Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata_Unlisted;
  frontMatter: Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata_FrontMatter;
};

export type Theme_ContentVisibility_Index_ContentVisibility_Props_ClassName = string | undefined;

export type Theme_ContentVisibility_Index_ContentVisibility_Props_Style = CSSProperties | undefined;

export type Theme_ContentVisibility_Index_ContentVisibility_Props = {
  metadata: Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata;
  className?: Theme_ContentVisibility_Index_ContentVisibility_Props_ClassName;
  style?: Theme_ContentVisibility_Index_ContentVisibility_Props_Style;
};

export type Theme_ContentVisibility_Index_ContentVisibility_Unlisted = boolean;

export type Theme_ContentVisibility_Index_ContentVisibility_FrontMatter = Theme_ContentVisibility_Index_ContentVisibility_Props_Metadata_FrontMatter;
