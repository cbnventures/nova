import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';

import type { CSSProperties } from 'react';

/**
 * Theme - Doc Item - Footer - Doc Item Footer.
 *
 * @since 0.15.0
 */
export type ThemeDocItemFooterDocItemFooterPropsClassName = string | undefined;

export type ThemeDocItemFooterDocItemFooterPropsStyle = CSSProperties | undefined;

export type ThemeDocItemFooterDocItemFooterProps = {
  className?: ThemeDocItemFooterDocItemFooterPropsClassName;
  style?: ThemeDocItemFooterDocItemFooterPropsStyle;
  [key: string]: unknown;
};

export type ThemeDocItemFooterDocItemFooterEditUrl = string | undefined;

export type ThemeDocItemFooterDocItemFooterLastUpdatedAt = number | undefined;

export type ThemeDocItemFooterDocItemFooterLastUpdatedBy = string | undefined;

export type ThemeDocItemFooterDocItemFooterDoc = DocContextValue;

export type ThemeDocItemFooterDocItemFooterCanDisplayTagsRow = boolean;

export type ThemeDocItemFooterDocItemFooterCanDisplayEditMetaRow = boolean;

export type ThemeDocItemFooterDocItemFooterThemeConfig = {
  blog?: ThemeDocItemFooterDocItemFooterBlogShareConfig;
  [key: string]: unknown;
};

export type ThemeDocItemFooterDocItemFooterThemeConfigCast = unknown;

export type ThemeDocItemFooterDocItemFooterBlogShareConfig = {
  share?: ThemeDocItemFooterDocItemFooterShareConfig;
  [key: string]: unknown;
};

export type ThemeDocItemFooterDocItemFooterShareConfig = {
  platforms?: ThemeDocItemFooterDocItemFooterSharePlatforms;
  [key: string]: unknown;
};

export type ThemeDocItemFooterDocItemFooterSharePlatforms = string[];

export type ThemeDocItemFooterDocItemFooterShareUrl = string;

export type ThemeDocItemFooterDocItemFooterCanDisplayFooter = boolean;

export type ThemeDocItemFooterDocItemFooterContentFooterSpread = Record<string, unknown>;
