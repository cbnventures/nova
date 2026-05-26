import type { CSSProperties } from 'react';

/**
 * Theme - Content Footer - Share Button.
 *
 * @since 0.18.0
 */
export type ThemeContentFooterShareButtonPropsPlatform = string;

export type ThemeContentFooterShareButtonPropsShareUrl = string;

export type ThemeContentFooterShareButtonPropsClassName = string | undefined;

export type ThemeContentFooterShareButtonPropsStyle = CSSProperties | undefined;

export type ThemeContentFooterShareButtonProps = {
  platform: ThemeContentFooterShareButtonPropsPlatform;
  shareUrl: ThemeContentFooterShareButtonPropsShareUrl;
  className?: ThemeContentFooterShareButtonPropsClassName;
  style?: ThemeContentFooterShareButtonPropsStyle;
};

/**
 * Theme - Content Footer - Share Button - Share Button.
 *
 * @since 0.18.0
 */
export type ThemeContentFooterShareButtonCopied = boolean;

export type ThemeContentFooterShareButtonCopiedState = [ThemeContentFooterShareButtonCopied, ThemeContentFooterShareButtonSetCopied];

export type ThemeContentFooterShareButtonSetCopied = (value: ThemeContentFooterShareButtonCopied) => void;

export type ThemeContentFooterShareButtonShareLinkCopied = string;

export type ThemeContentFooterShareButtonShareCopyLink = string;

export type ThemeContentFooterShareButtonShareCopiedText = string;

export type ThemeContentFooterShareButtonShareHref = string;

export type ThemeContentFooterShareButtonPlatformLabel = string;

export type ThemeContentFooterShareButtonShareOnPlatform = string;
