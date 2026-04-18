/**
 * Theme - Content Footer - Content Footer.
 *
 * @since 0.15.0
 */
export type ThemeContentFooterContentFooterPropsTagPermalink = string;

export type ThemeContentFooterContentFooterPropsTagLabel = string;

export type ThemeContentFooterContentFooterPropsTagDescription = string | undefined;

export type ThemeContentFooterContentFooterPropsTag = {
  permalink: ThemeContentFooterContentFooterPropsTagPermalink;
  label: ThemeContentFooterContentFooterPropsTagLabel;
  description: ThemeContentFooterContentFooterPropsTagDescription;
  [key: string]: unknown;
};

export type ThemeContentFooterContentFooterPropsTags = ThemeContentFooterContentFooterPropsTag[] | undefined;

export type ThemeContentFooterContentFooterPropsSharePlatforms = string[] | undefined;

export type ThemeContentFooterContentFooterPropsShareUrl = string | undefined;

export type ThemeContentFooterContentFooterPropsEditUrl = string | undefined;

export type ThemeContentFooterContentFooterPropsLastUpdatedAt = number | undefined;

export type ThemeContentFooterContentFooterPropsLastUpdatedBy = string | undefined;

export type ThemeContentFooterContentFooterProps = {
  tags?: ThemeContentFooterContentFooterPropsTags;
  sharePlatforms?: ThemeContentFooterContentFooterPropsSharePlatforms;
  shareUrl?: ThemeContentFooterContentFooterPropsShareUrl;
  editUrl?: ThemeContentFooterContentFooterPropsEditUrl;
  lastUpdatedAt?: ThemeContentFooterContentFooterPropsLastUpdatedAt;
  lastUpdatedBy?: ThemeContentFooterContentFooterPropsLastUpdatedBy;
  [key: string]: unknown;
};

export type ThemeContentFooterContentFooterCanDisplayTags = boolean;

export type ThemeContentFooterContentFooterCanDisplayShare = boolean;

export type ThemeContentFooterContentFooterCanDisplayEdit = boolean;

export type ThemeContentFooterContentFooterCanDisplayFooter = boolean;

export type ThemeContentFooterContentFooterShareUrl = string;

export type ThemeContentFooterContentFooterCopiedState = [ThemeContentFooterContentFooterCopied, ThemeContentFooterContentFooterSetCopied];

export type ThemeContentFooterContentFooterCopied = boolean;

export type ThemeContentFooterContentFooterSetCopied = (value: ThemeContentFooterContentFooterCopied) => void;

export type ThemeContentFooterContentFooterTagsLabel = string;

export type ThemeContentFooterContentFooterShareLabel = string;

export type ThemeContentFooterContentFooterEditLabel = string;

export type ThemeContentFooterContentFooterShareLinkCopied = string;

export type ThemeContentFooterContentFooterShareCopyLink = string;

export type ThemeContentFooterContentFooterShareCopiedText = string;

export type ThemeContentFooterContentFooterLastUpdatedSpread = Record<string, unknown>;

export type ThemeContentFooterContentFooterTag = ThemeContentFooterContentFooterPropsTag;

export type ThemeContentFooterContentFooterSharePlatform = string;

export type ThemeContentFooterContentFooterShareHref = string;

export type ThemeContentFooterContentFooterPlatformLabel = string;

export type ThemeContentFooterContentFooterShareOnPlatform = string;
