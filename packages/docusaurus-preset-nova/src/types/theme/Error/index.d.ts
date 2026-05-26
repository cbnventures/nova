import type { CSSProperties } from 'react';

/**
 * Theme - Error.
 *
 * @since 0.15.0
 */
export type ThemeErrorPropsError = Error;

export type ThemeErrorPropsTryAgain = () => void;

export type ThemeErrorPropsClassName = string | undefined;

export type ThemeErrorPropsStyle = CSSProperties | undefined;

export type ThemeErrorProps = {
  error: ThemeErrorPropsError;
  tryAgain: ThemeErrorPropsTryAgain;
  className?: ThemeErrorPropsClassName;
  style?: ThemeErrorPropsStyle;
  [key: string]: unknown;
};

export type ThemeErrorDocusaurusContext = ReturnType<typeof import('@docusaurus/useDocusaurusContext').default>;

export type ThemeErrorThemeConfig = Record<string, unknown>;

export type ThemeErrorErrorPages = Record<string, unknown> | undefined;

export type ThemeErrorOverrides = Record<string, unknown> | undefined;

export type ThemeErrorRetryLabelOverride = string | undefined;

export type ThemeErrorMessage = string;

export type ThemeErrorErrorTryAgain = string;
