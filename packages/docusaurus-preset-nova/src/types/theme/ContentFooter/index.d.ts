import type { CSSProperties } from 'react';

/**
 * Theme - Content Footer - Content Footer.
 *
 * @since 0.15.0
 */
export type Theme_ContentFooter_Index_ContentFooter_PropsTag_Permalink = string;

export type Theme_ContentFooter_Index_ContentFooter_PropsTag_Label = string;

export type Theme_ContentFooter_Index_ContentFooter_PropsTag_Description = string | undefined;

export type Theme_ContentFooter_Index_ContentFooter_PropsTag = {
  permalink: Theme_ContentFooter_Index_ContentFooter_PropsTag_Permalink;
  label: Theme_ContentFooter_Index_ContentFooter_PropsTag_Label;
  description: Theme_ContentFooter_Index_ContentFooter_PropsTag_Description;
  [key: string]: unknown;
};

export type Theme_ContentFooter_Index_ContentFooter_Props_Tags = Theme_ContentFooter_Index_ContentFooter_PropsTag[] | undefined;

export type Theme_ContentFooter_Index_ContentFooter_Props_SharePlatforms = string[] | undefined;

export type Theme_ContentFooter_Index_ContentFooter_Props_ShareUrl = string | undefined;

export type Theme_ContentFooter_Index_ContentFooter_Props_EditUrl = string | undefined;

export type Theme_ContentFooter_Index_ContentFooter_Props_LastUpdatedAt = number | undefined;

export type Theme_ContentFooter_Index_ContentFooter_Props_LastUpdatedBy = string | undefined;

export type Theme_ContentFooter_Index_ContentFooter_Props_ClassName = string | undefined;

export type Theme_ContentFooter_Index_ContentFooter_Props_Style = CSSProperties | undefined;

export type Theme_ContentFooter_Index_ContentFooter_Props = {
  tags?: Theme_ContentFooter_Index_ContentFooter_Props_Tags;
  sharePlatforms?: Theme_ContentFooter_Index_ContentFooter_Props_SharePlatforms;
  shareUrl?: Theme_ContentFooter_Index_ContentFooter_Props_ShareUrl;
  editUrl?: Theme_ContentFooter_Index_ContentFooter_Props_EditUrl;
  lastUpdatedAt?: Theme_ContentFooter_Index_ContentFooter_Props_LastUpdatedAt;
  lastUpdatedBy?: Theme_ContentFooter_Index_ContentFooter_Props_LastUpdatedBy;
  className?: Theme_ContentFooter_Index_ContentFooter_Props_ClassName;
  style?: Theme_ContentFooter_Index_ContentFooter_Props_Style;
  [key: string]: unknown;
};

export type Theme_ContentFooter_Index_ContentFooter_CanDisplayTags = boolean;

export type Theme_ContentFooter_Index_ContentFooter_CanDisplayShare = boolean;

export type Theme_ContentFooter_Index_ContentFooter_CanDisplayEdit = boolean;

export type Theme_ContentFooter_Index_ContentFooter_CanDisplayFooter = boolean;
