import type { CSSProperties } from 'react';

/**
 * Theme - Content Visibility - Content Visibility.
 *
 * @since 0.15.0
 */
export type ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatterDraft = boolean | undefined;

export type ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatterUnlisted = boolean | undefined;

export type ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatter = {
  draft?: ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatterDraft;
  unlisted?: ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatterUnlisted;
};

export type ThemeContentVisibilityContentVisibilityPropsMetadataUnlisted = boolean;

export type ThemeContentVisibilityContentVisibilityPropsMetadata = {
  unlisted: ThemeContentVisibilityContentVisibilityPropsMetadataUnlisted;
  frontMatter: ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatter;
};

export type ThemeContentVisibilityContentVisibilityPropsClassName = string | undefined;

export type ThemeContentVisibilityContentVisibilityPropsStyle = CSSProperties | undefined;

export type ThemeContentVisibilityContentVisibilityProps = {
  metadata: ThemeContentVisibilityContentVisibilityPropsMetadata;
  className?: ThemeContentVisibilityContentVisibilityPropsClassName;
  style?: ThemeContentVisibilityContentVisibilityPropsStyle;
};

export type ThemeContentVisibilityContentVisibilityUnlisted = boolean;

export type ThemeContentVisibilityContentVisibilityFrontMatter = ThemeContentVisibilityContentVisibilityPropsMetadataFrontMatter;
