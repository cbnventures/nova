import type { CSSProperties } from 'react';

/**
 * Theme - Error.
 *
 * @since 0.15.0
 */
export type Theme_Error_Index_Error_Props_Error = Error;

export type Theme_Error_Index_Error_Props_TryAgain = () => void;

export type Theme_Error_Index_Error_Props_ClassName = string | undefined;

export type Theme_Error_Index_Error_Props_Style = CSSProperties | undefined;

export type Theme_Error_Index_Error_Props = {
  error: Theme_Error_Index_Error_Props_Error;
  tryAgain: Theme_Error_Index_Error_Props_TryAgain;
  className?: Theme_Error_Index_Error_Props_ClassName;
  style?: Theme_Error_Index_Error_Props_Style;
  [key: string]: unknown;
};

export type Theme_Error_Index_Error_DocusaurusContext = ReturnType<typeof import('@docusaurus/useDocusaurusContext').default>;

export type Theme_Error_Index_Error_ThemeConfig = Record<string, unknown>;

export type Theme_Error_Index_Error_Pages = Record<string, unknown> | undefined;

export type Theme_Error_Index_Error_Overrides = Record<string, unknown> | undefined;

export type Theme_Error_Index_Error_RetryLabelOverride = string | undefined;

export type Theme_Error_Index_Error_Message = string;

export type Theme_Error_Index_Error_TryAgain = string;
