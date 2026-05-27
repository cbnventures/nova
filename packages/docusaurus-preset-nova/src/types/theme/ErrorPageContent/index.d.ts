import type { CSSProperties } from 'react';

/**
 * Theme - Error Page Content - Error Page Content.
 *
 * @since 0.15.0
 */
export type Theme_ErrorPageContent_Index_ErrorPageContent_Props_Error = Error;

export type Theme_ErrorPageContent_Index_ErrorPageContent_Props_TryAgain = () => void;

export type Theme_ErrorPageContent_Index_ErrorPageContent_Props_ClassName = string | undefined;

export type Theme_ErrorPageContent_Index_ErrorPageContent_Props_Style = CSSProperties | undefined;

export type Theme_ErrorPageContent_Index_ErrorPageContent_Props = {
  error: Theme_ErrorPageContent_Index_ErrorPageContent_Props_Error;
  tryAgain: Theme_ErrorPageContent_Index_ErrorPageContent_Props_TryAgain;
  className?: Theme_ErrorPageContent_Index_ErrorPageContent_Props_ClassName;
  style?: Theme_ErrorPageContent_Index_ErrorPageContent_Props_Style;
  [key: string]: unknown;
};

export type Theme_ErrorPageContent_Index_ErrorPageContent_DocusaurusContext = ReturnType<typeof import('@docusaurus/useDocusaurusContext').default>;

export type Theme_ErrorPageContent_Index_ErrorPageContent_ThemeConfig = Record<string, unknown>;

export type Theme_ErrorPageContent_Index_ErrorPageContent_ErrorPages = Record<string, unknown> | undefined;

export type Theme_ErrorPageContent_Index_ErrorPageContent_Overrides = Record<string, unknown> | undefined;

export type Theme_ErrorPageContent_Index_ErrorPageContent_TitleOverride = string | undefined;

export type Theme_ErrorPageContent_Index_ErrorPageContent_RetryLabelOverride = string | undefined;

export type Theme_ErrorPageContent_Index_ErrorPageContent_Message = string;

export type Theme_ErrorPageContent_Index_ErrorPageContent_TitlePool = string[];

export type Theme_ErrorPageContent_Index_ErrorPageContent_GlobalData = {
  errorPageContentTitleIndex?: number;
  [key: string]: unknown;
};

export type Theme_ErrorPageContent_Index_ErrorPageContent_TitleIndex = number;

export type Theme_ErrorPageContent_Index_ErrorPageContent_Title = string;

export type Theme_ErrorPageContent_Index_ErrorPageContent_TryAgain = string;
