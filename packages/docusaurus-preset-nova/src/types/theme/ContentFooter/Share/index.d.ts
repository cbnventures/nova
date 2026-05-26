import type { CSSProperties } from 'react';

/**
 * Theme - Content Footer - Share.
 *
 * @since 0.18.0
 */
export type ThemeContentFooterSharePropsSharePlatform = string;

export type ThemeContentFooterSharePropsSharePlatforms = ThemeContentFooterSharePropsSharePlatform[] | undefined;

export type ThemeContentFooterSharePropsShareUrl = string | undefined;

export type ThemeContentFooterSharePropsClassName = string | undefined;

export type ThemeContentFooterSharePropsStyle = CSSProperties | undefined;

export type ThemeContentFooterShareProps = {
  sharePlatforms?: ThemeContentFooterSharePropsSharePlatforms;
  shareUrl?: ThemeContentFooterSharePropsShareUrl;
  className?: ThemeContentFooterSharePropsClassName;
  style?: ThemeContentFooterSharePropsStyle;
};

export type ThemeContentFooterShareUrl = string;

export type ThemeContentFooterShareLabel = string;

export type ThemeContentFooterSharePlatform = ThemeContentFooterSharePropsSharePlatform;
