import type { CSSProperties } from 'react';

/**
 * Theme - Content Footer - Share Button.
 *
 * @since 0.18.0
 */
export type Theme_ContentFooter_ShareButton_Index_ShareButton_Props_Platform = string;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_Props_ShareUrl = string;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_Props_ClassName = string | undefined;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_Props_Style = CSSProperties | undefined;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_Props = {
  platform: Theme_ContentFooter_ShareButton_Index_ShareButton_Props_Platform;
  shareUrl: Theme_ContentFooter_ShareButton_Index_ShareButton_Props_ShareUrl;
  className?: Theme_ContentFooter_ShareButton_Index_ShareButton_Props_ClassName;
  style?: Theme_ContentFooter_ShareButton_Index_ShareButton_Props_Style;
};

/**
 * Theme - Content Footer - Share Button - Share Button.
 *
 * @since 0.18.0
 */
export type Theme_ContentFooter_ShareButton_Index_ShareButton_Copied = boolean;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_CopiedState = [Theme_ContentFooter_ShareButton_Index_ShareButton_Copied, Theme_ContentFooter_ShareButton_Index_ShareButton_SetCopied];

export type Theme_ContentFooter_ShareButton_Index_ShareButton_SetCopied = (value: Theme_ContentFooter_ShareButton_Index_ShareButton_Copied) => void;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_ShareLinkCopied = string;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_ShareCopyLink = string;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_ShareCopiedText = string;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_ShareHref = string;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_PlatformLabel = string;

export type Theme_ContentFooter_ShareButton_Index_ShareButton_ShareOnPlatform = string;
