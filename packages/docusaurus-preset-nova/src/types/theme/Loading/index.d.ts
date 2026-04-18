/**
 * Theme - Loading.
 *
 * @since 0.15.0
 */
export type ThemeLoadingPropsIsLoading = boolean;

export type ThemeLoadingPropsPastDelay = boolean;

export type ThemeLoadingPropsTimedOut = boolean;

export type ThemeLoadingPropsError = Error | null | undefined;

export type ThemeLoadingPropsRetry = (() => void) | undefined;

export type ThemeLoadingProps = {
  isLoading: ThemeLoadingPropsIsLoading;
  pastDelay: ThemeLoadingPropsPastDelay;
  timedOut: ThemeLoadingPropsTimedOut;
  error: ThemeLoadingPropsError;
  retry: ThemeLoadingPropsRetry;
  [key: string]: unknown;
};

export type ThemeLoadingLoadingErrorPrefix = string;

export type ThemeLoadingLoadingRetry = string;

export type ThemeLoadingLoadingTimeout = string;

export type ThemeLoadingLoadingLoading = string;

export type ThemeLoadingErrorMessage = string;
