import type { DocusaurusContext } from '@docusaurus/types';
import type { CSSProperties } from 'react';

/**
 * Theme - Not Found - Content - Not Found Content.
 *
 * @since 0.15.0
 */
export type ThemeNotFoundContentPropsClassName = string | undefined;

export type ThemeNotFoundContentPropsStyle = CSSProperties | undefined;

export type ThemeNotFoundContentProps = {
  className?: ThemeNotFoundContentPropsClassName;
  style?: ThemeNotFoundContentPropsStyle;
  [key: string]: unknown;
};

export type ThemeNotFoundContentNotFoundContentDocusaurusContext = DocusaurusContext;

export type ThemeNotFoundContentNotFoundContentBaseUrl = string;

export type ThemeNotFoundContentNotFoundContentThemeConfig = Record<string, unknown>;

export type ThemeNotFoundContentNotFoundContentErrorPages = Record<string, unknown> | undefined;

export type ThemeNotFoundContentNotFoundContentNotFoundOverrides = Record<string, unknown> | undefined;

export type ThemeNotFoundContentNotFoundContentTitleOverride = string | undefined;

export type ThemeNotFoundContentNotFoundContentDescriptionOverride = string | undefined;

export type ThemeNotFoundContentNotFoundContentBackHomeLabelOverride = string | undefined;

export type ThemeNotFoundContentNotFoundContentBackHomeHrefOverride = string | undefined;

export type ThemeNotFoundContentNotFoundContentBundle = {
  title: string;
  description: string;
  backHomeLabel: string;
};

export type ThemeNotFoundContentNotFoundContentBundles = ThemeNotFoundContentNotFoundContentBundle[];

export type ThemeNotFoundContentNotFoundContentGlobalData = {
  notFoundBundleIndex?: number;
  [key: string]: unknown;
};

export type ThemeNotFoundContentNotFoundContentBundleIndex = number;

export type ThemeNotFoundContentNotFoundContentActiveBundle = ThemeNotFoundContentNotFoundContentBundle;

export type ThemeNotFoundContentNotFoundContentTitle = string;

export type ThemeNotFoundContentNotFoundContentDescription = string;

export type ThemeNotFoundContentNotFoundContentBackHomeLabel = string;

export type ThemeNotFoundContentNotFoundContentBackHomeHref = string;
