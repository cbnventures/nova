import type { TOCItem } from '@docusaurus/mdx-loader';
import type { Assets, MDXPageMetadata, PageFrontMatter } from '@docusaurus/plugin-content-pages';
import type { ReactNode } from 'react';

/**
 * Theme - MDX Page - MDX Page.
 *
 * @since 0.15.0
 */
export type ThemeMdxPageMdxPageContentFrontMatter = PageFrontMatter & {
  [key: string]: unknown;
};

export type ThemeMdxPageMdxPageContentMetadata = MDXPageMetadata;

export type ThemeMdxPageMdxPageContentAssets = Assets;

export type ThemeMdxPageMdxPageContentToc = readonly TOCItem[];

export type ThemeMdxPageMdxPageContent = {
  readonly frontMatter: ThemeMdxPageMdxPageContentFrontMatter;
  readonly metadata: ThemeMdxPageMdxPageContentMetadata;
  readonly assets: ThemeMdxPageMdxPageContentAssets;
  readonly toc: ThemeMdxPageMdxPageContentToc;
  (): ReactNode;
};

export type ThemeMdxPageMdxPagePropsContent = ThemeMdxPageMdxPageContent;

export type ThemeMdxPageMdxPageProps = {
  content: ThemeMdxPageMdxPagePropsContent;
  [key: string]: unknown;
};

export type ThemeMdxPageMdxPageTitle = string | undefined;

export type ThemeMdxPageMdxPageEditUrl = string | undefined;

export type ThemeMdxPageMdxPageDescription = string | undefined;

export type ThemeMdxPageMdxPageFrontMatter = ThemeMdxPageMdxPageContentFrontMatter;

export type ThemeMdxPageMdxPageLastUpdatedBy = string | undefined | null;

export type ThemeMdxPageMdxPageLastUpdatedAt = number | undefined | null;

export type ThemeMdxPageMdxPageKeywords = string[] | undefined;

export type ThemeMdxPageMdxPageImage = string | undefined;

export type ThemeMdxPageMdxPageHideTableOfContents = string | undefined;

export type ThemeMdxPageMdxPageTocMinHeadingLevel = number | undefined;

export type ThemeMdxPageMdxPageTocMaxHeadingLevel = number | undefined;

export type ThemeMdxPageMdxPageCanDisplayEditMetaRow = boolean;

export type ThemeMdxPageMdxPageMdxComponent = ThemeMdxPageMdxPageContent;

export type ThemeMdxPageMdxPageMetadataSpread = Record<string, unknown>;

export type ThemeMdxPageMdxPageTocSpread = Record<string, unknown>;

export type ThemeMdxPageMdxPageToc = ReactNode;

export type ThemeMdxPageMdxPageEditMetaRowSpread = Record<string, unknown>;
