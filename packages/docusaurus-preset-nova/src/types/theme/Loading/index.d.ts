import type { CSSProperties } from 'react';

/**
 * Theme - Loading.
 *
 * @since 0.15.0
 */
export type Theme_Loading_Index_Loading_Props_IsLoading = boolean;

export type Theme_Loading_Index_Loading_Props_PastDelay = boolean;

export type Theme_Loading_Index_Loading_Props_TimedOut = boolean;

export type Theme_Loading_Index_Loading_Props_Error = Error | null | undefined;

export type Theme_Loading_Index_Loading_Props_Retry = (() => void) | undefined;

export type Theme_Loading_Index_Loading_Props_ClassName = string | undefined;

export type Theme_Loading_Index_Loading_Props_Style = CSSProperties | undefined;

export type Theme_Loading_Index_Loading_Props = {
  isLoading: Theme_Loading_Index_Loading_Props_IsLoading;
  pastDelay: Theme_Loading_Index_Loading_Props_PastDelay;
  timedOut: Theme_Loading_Index_Loading_Props_TimedOut;
  error: Theme_Loading_Index_Loading_Props_Error;
  retry: Theme_Loading_Index_Loading_Props_Retry;
  className?: Theme_Loading_Index_Loading_Props_ClassName;
  style?: Theme_Loading_Index_Loading_Props_Style;
  [key: string]: unknown;
};

export type Theme_Loading_Index_Loading_ErrorPrefix = string;

export type Theme_Loading_Index_Loading_Retry = string;

export type Theme_Loading_Index_Loading_Timeout = string;

export type Theme_Loading_Index_Loading_Loading = string;

export type Theme_Loading_Index_Loading_ErrorMessage = string;
