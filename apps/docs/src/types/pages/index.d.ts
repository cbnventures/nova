import type { DocusaurusConfig, DocusaurusContext as DocusaurusContextBase } from '@docusaurus/types';
import type { ReactNode } from 'react';

/**
 * Pages.
 *
 * @since 0.11.0
 */
export type PagesContext = DocusaurusContextBase;

export type PagesSiteConfig = DocusaurusConfig;

/**
 * Pages - Index - Home.
 *
 * @since 0.15.0
 */
export type Pages_Index_Home_Context = PagesContext;

export type Pages_Index_Home_SiteConfig = PagesSiteConfig;

export type Pages_Index_Home_FeatureItems = PagesFeatureItems;

export type Pages_Index_Home_CustomFields = PagesSiteConfig['customFields'];

export type Pages_Index_Home_CliHeader = unknown;

export type Pages_Index_Home_CliHeaderLines = string[];

/**
 * Pages - Home - Config Snippets.
 *
 * @since 0.15.0
 */
export type PagesConfigSnippetContent = string;

export type PagesConfigSnippetStyleTop = string;

export type PagesConfigSnippetStyleLeft = string;

export type PagesConfigSnippetStyleTransform = string;

export type PagesConfigSnippetStyle = {
  top: PagesConfigSnippetStyleTop;
  left: PagesConfigSnippetStyleLeft;
  transform: PagesConfigSnippetStyleTransform;
};

export type PagesConfigSnippet = {
  content: PagesConfigSnippetContent;
  style: PagesConfigSnippetStyle;
};

export type PagesConfigSnippets = PagesConfigSnippet[];

/**
 * Pages - Home - Blog Posts.
 *
 * @since 0.15.0
 */
export type PagesBlogPostTitle = string;

export type PagesBlogPostDescription = string;

export type PagesBlogPostPermalink = string;

export type PagesBlogPostDate = string;

export type PagesBlogPost = {
  title: PagesBlogPostTitle;
  description: PagesBlogPostDescription;
  permalink: PagesBlogPostPermalink;
  date: PagesBlogPostDate;
};

export type PagesBlogPosts = PagesBlogPost[];

/**
 * Pages - Home - Feature Items.
 *
 * @since 0.15.0
 */
export type PagesFeatureItemIcon = string;

export type PagesFeatureItemTitle = string;

export type PagesFeatureItemDescription = string;

export type PagesFeatureItem = {
  icon: PagesFeatureItemIcon;
  title: PagesFeatureItemTitle;
  description: PagesFeatureItemDescription;
};

export type PagesFeatureItems = PagesFeatureItem[];

/**
 * Pages - Home - Shots.
 *
 * @since 0.11.0
 */
export type PagesShotKey = string;

export type PagesShotLabel = string;

export type PagesShotHeading = string;

export type PagesShotDescription = ReactNode;

export type PagesShotLinkTo = string;

export type PagesShotLinkLabel = string;

export type PagesShotAlt = string;

export type PagesShotTerminalTitle = string;

export type PagesShotOutput = string;

export type PagesShot = {
  key: PagesShotKey;
  label: PagesShotLabel;
  heading: PagesShotHeading;
  description: PagesShotDescription;
  linkTo: PagesShotLinkTo;
  linkLabel: PagesShotLinkLabel;
  alt: PagesShotAlt;
  terminalTitle: PagesShotTerminalTitle;
  output: PagesShotOutput;
};

export type PagesShots = PagesShot[];

/**
 * Pages - Terminal Line Tone.
 *
 * @since 0.11.0
 */
export type Pages_Index_TerminalLineTone_Line = string;

export type Pages_Index_TerminalLineTone_Returns = string;

export type Pages_Index_TerminalLineTone_FirstCharacter = string;

/**
 * Pages - Markers.
 *
 * @since 0.11.0
 */
export type Pages_Index_PromptMarkers = string[];

export type Pages_Index_FrameMarkers = string[];
