import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';

import type { CSSProperties } from 'react';

/**
 * Theme - Doc Item - Footer - Doc Item Footer.
 *
 * @since 0.15.0
 */
export type Theme_DocItem_Footer_Index_DocItemFooter_Props_ClassName = string | undefined;

export type Theme_DocItem_Footer_Index_DocItemFooter_Props_Style = CSSProperties | undefined;

export type Theme_DocItem_Footer_Index_DocItemFooter_Props = {
  className?: Theme_DocItem_Footer_Index_DocItemFooter_Props_ClassName;
  style?: Theme_DocItem_Footer_Index_DocItemFooter_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocItem_Footer_Index_DocItemFooter_EditUrl = string | undefined;

export type Theme_DocItem_Footer_Index_DocItemFooter_LastUpdatedAt = number | undefined;

export type Theme_DocItem_Footer_Index_DocItemFooter_LastUpdatedBy = string | undefined;

export type Theme_DocItem_Footer_Index_DocItemFooter_Doc = DocContextValue;

export type Theme_DocItem_Footer_Index_DocItemFooter_CanDisplayTagsRow = boolean;

export type Theme_DocItem_Footer_Index_DocItemFooter_CanDisplayEditMetaRow = boolean;

export type Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig = {
  blog?: Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog;
  [key: string]: unknown;
};

export type Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfigCast = unknown;

export type Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog = {
  share?: Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog_Share;
  [key: string]: unknown;
};

export type Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog_Share = {
  platforms?: Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog_Share_Platforms;
  [key: string]: unknown;
};

export type Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog_Share_Platforms = string[];

export type Theme_DocItem_Footer_Index_DocItemFooter_ShareUrl = string;

export type Theme_DocItem_Footer_Index_DocItemFooter_CanDisplayFooter = boolean;

export type Theme_DocItem_Footer_Index_DocItemFooter_ContentFooterSpread = Record<string, unknown>;
