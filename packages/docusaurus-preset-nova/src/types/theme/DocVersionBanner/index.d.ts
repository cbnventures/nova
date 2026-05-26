import type { CSSProperties } from 'react';

/**
 * Theme - Doc Version Banner - Doc Version Banner.
 *
 * @since 0.15.0
 */
export type ThemeDocVersionBannerDocVersionBannerPropsClassName = string | undefined;

export type ThemeDocVersionBannerDocVersionBannerPropsStyle = CSSProperties | undefined;

export type ThemeDocVersionBannerDocVersionBannerProps = {
  className?: ThemeDocVersionBannerDocVersionBannerPropsClassName;
  style?: ThemeDocVersionBannerDocVersionBannerPropsStyle;
  [key: string]: unknown;
};

export type ThemeDocVersionBannerDocVersionBannerVersion = {
  isLast: ThemeDocVersionBannerDocVersionBannerVersionIsLast;
  label: ThemeDocVersionBannerDocVersionBannerVersionLabel;
  [key: string]: unknown;
};

export type ThemeDocVersionBannerDocVersionBannerVersionIsLast = boolean;

export type ThemeDocVersionBannerDocVersionBannerVersionLabel = string;

export type ThemeDocVersionBannerDocVersionBannerMessage = string;

export type ThemeDocVersionBannerDocVersionBannerBannerMessage = string;
