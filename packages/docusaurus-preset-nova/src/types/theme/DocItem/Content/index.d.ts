import type { ReactNode } from 'react';

/**
 * Theme - Doc Item - Content - Doc Item Content.
 *
 * @since 0.15.0
 */
export type ThemeDocItemContentDocItemContentPropsChildren = ReactNode;

export type ThemeDocItemContentDocItemContentProps = {
  children: ThemeDocItemContentDocItemContentPropsChildren;
  [key: string]: unknown;
};

/**
 * Theme - Doc Item - Content - Use Synthetic Title.
 *
 * @since 0.15.0
 */
export type ThemeDocItemContentUseSyntheticTitleSyntheticTitle = string | null;

export type ThemeDocItemContentUseSyntheticTitleMetadataTitle = string;

export type ThemeDocItemContentUseSyntheticTitleContentTitle = string | undefined;

export type ThemeDocItemContentUseSyntheticTitleDocMetadata = {
  title: ThemeDocItemContentUseSyntheticTitleMetadataTitle;
  [key: string]: unknown;
};

export type ThemeDocItemContentUseSyntheticTitleDocFrontMatter = {
  hide_title?: boolean;
  [key: string]: unknown;
};

export type ThemeDocItemContentUseSyntheticTitleDoc = {
  metadata: ThemeDocItemContentUseSyntheticTitleDocMetadata;
  frontMatter: ThemeDocItemContentUseSyntheticTitleDocFrontMatter;
  contentTitle: ThemeDocItemContentUseSyntheticTitleContentTitle;
  [key: string]: unknown;
};
