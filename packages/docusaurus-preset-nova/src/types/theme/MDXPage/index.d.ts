import type { TOCItem } from '@docusaurus/mdx-loader';
import type { Assets, MDXPageMetadata, PageFrontMatter } from '@docusaurus/plugin-content-pages';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';

/**
 * Theme - MDX Page - MDX Page.
 *
 * @since 0.15.0
 */
export type Theme_MdxPage_Index_MdxPageContentFrontMatter = PageFrontMatter & {
  [key: string]: unknown;
};

export type Theme_MdxPage_Index_MdxPageContentMetadata = MDXPageMetadata;

export type Theme_MdxPage_Index_MdxPageContentAssets = Assets;

export type Theme_MdxPage_Index_MdxPageContentToc = readonly TOCItem[];

export type Theme_MdxPage_Index_MdxPageContent = {
  readonly frontMatter: Theme_MdxPage_Index_MdxPageContentFrontMatter;
  readonly metadata: Theme_MdxPage_Index_MdxPageContentMetadata;
  readonly assets: Theme_MdxPage_Index_MdxPageContentAssets;
  readonly toc: Theme_MdxPage_Index_MdxPageContentToc;
  (): ReactNode;
};

export type Theme_MdxPage_Index_MdxPageProps_Content = Theme_MdxPage_Index_MdxPageContent;

export type Theme_MdxPage_Index_MdxPageProps_ClassName = string | undefined;

export type Theme_MdxPage_Index_MdxPageProps_Style = CSSProperties | undefined;

export type Theme_MdxPage_Index_MdxPageProps = {
  content: Theme_MdxPage_Index_MdxPageProps_Content;
  className?: Theme_MdxPage_Index_MdxPageProps_ClassName;
  style?: Theme_MdxPage_Index_MdxPageProps_Style;
  [key: string]: unknown;
};

export type Theme_MdxPage_Index_MdxPageTitle = string | undefined;

export type Theme_MdxPage_Index_MdxPageEditUrl = string | undefined;

export type Theme_MdxPage_Index_MdxPageDescription = string | undefined;

export type Theme_MdxPage_Index_MdxPageFrontMatter = Theme_MdxPage_Index_MdxPageContentFrontMatter;

export type Theme_MdxPage_Index_MdxPageLastUpdatedBy = string | undefined | null;

export type Theme_MdxPage_Index_MdxPageLastUpdatedAt = number | undefined | null;

export type Theme_MdxPage_Index_MdxPageKeywords = string[] | undefined;

export type Theme_MdxPage_Index_MdxPageImage = string | undefined;

export type Theme_MdxPage_Index_MdxPageHideTableOfContents = string | undefined;

export type Theme_MdxPage_Index_MdxPageTocMinHeadingLevel = number | undefined;

export type Theme_MdxPage_Index_MdxPageTocMaxHeadingLevel = number | undefined;

export type Theme_MdxPage_Index_MdxPageCanDisplayEditMetaRow = boolean;

export type Theme_MdxPage_Index_MdxPageCanRenderToc = boolean;

export type Theme_MdxPage_Index_MdxPageMdxComponent = Theme_MdxPage_Index_MdxPageContent;

export type Theme_MdxPage_Index_MdxPageMetadataSpread = Record<string, unknown>;

export type Theme_MdxPage_Index_MdxPageTocSpread = Record<string, unknown>;

export type Theme_MdxPage_Index_MdxPageEditMetaRowSpread = Record<string, unknown>;

export type Theme_MdxPage_Index_MdxPageFirstH1State_Rendered = boolean;

export type Theme_MdxPage_Index_MdxPageFirstH1State = {
  rendered: Theme_MdxPage_Index_MdxPageFirstH1State_Rendered;
};

export type Theme_MdxPage_Index_MdxPageMdxComponents = MDXComponents;

export type Theme_MdxPage_Index_MdxPageH1OverrideProps = ComponentProps<'h1'>;

export type Theme_MdxPage_Index_MdxPageIsFirst = boolean;

/**
 * Theme - MDX Page - MDX Page (component section).
 *
 * @since 0.15.0
 */
export type Theme_MdxPage_Index_MDXPage_Returns = ReactNode;
