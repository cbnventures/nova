import type { CSSProperties } from 'react';

/**
 * Theme - Error Page Content - Error Page Content.
 *
 * @since 0.15.0
 */
export type ThemeErrorPageContentErrorPageContentPropsError = Error;

export type ThemeErrorPageContentErrorPageContentPropsTryAgain = () => void;

export type ThemeErrorPageContentErrorPageContentPropsClassName = string | undefined;

export type ThemeErrorPageContentErrorPageContentPropsStyle = CSSProperties | undefined;

export type ThemeErrorPageContentErrorPageContentProps = {
  error: ThemeErrorPageContentErrorPageContentPropsError;
  tryAgain: ThemeErrorPageContentErrorPageContentPropsTryAgain;
  className?: ThemeErrorPageContentErrorPageContentPropsClassName;
  style?: ThemeErrorPageContentErrorPageContentPropsStyle;
  [key: string]: unknown;
};

export type ThemeErrorPageContentErrorPageContentDocusaurusContext = ReturnType<typeof import('@docusaurus/useDocusaurusContext').default>;

export type ThemeErrorPageContentErrorPageContentThemeConfig = Record<string, unknown>;

export type ThemeErrorPageContentErrorPageContentErrorPages = Record<string, unknown> | undefined;

export type ThemeErrorPageContentErrorPageContentOverrides = Record<string, unknown> | undefined;

export type ThemeErrorPageContentErrorPageContentTitleOverride = string | undefined;

export type ThemeErrorPageContentErrorPageContentRetryLabelOverride = string | undefined;

export type ThemeErrorPageContentErrorPageContentMessage = string;

export type ThemeErrorPageContentErrorPageContentTitlePool = string[];

export type ThemeErrorPageContentErrorPageContentGlobalData = {
  errorPageContentTitleIndex?: number;
  [key: string]: unknown;
};

export type ThemeErrorPageContentErrorPageContentTitleIndex = number;

export type ThemeErrorPageContentErrorPageContentTitle = string;

export type ThemeErrorPageContentErrorPageContentTryAgain = string;
