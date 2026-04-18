import type { DocusaurusConfig, DocusaurusContext as DocusaurusContextBase } from '@docusaurus/types';
import type { ReactNode } from 'react';

/**
 * Pages.
 *
 * @since 0.11.0
 */
export type PagesContext = DocusaurusContextBase;

export type PagesSiteConfig = DocusaurusConfig;

export type PagesCustomFields = {
  statItems: PagesStatItems;
};

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
 * Pages - Home - Included Items.
 *
 * @since 0.15.0
 */
export type PagesIncludedItemIcon = string;

export type PagesIncludedItemTitle = string;

export type PagesIncludedItemDescription = string | ReactNode;

export type PagesIncludedItem = {
  icon: PagesIncludedItemIcon;
  title: PagesIncludedItemTitle;
  description: PagesIncludedItemDescription;
};

export type PagesIncludedItems = PagesIncludedItem[];

/**
 * Pages - Home - Stat Items.
 *
 * @since 0.15.0
 */
export type PagesStatItemValue = string;

export type PagesStatItemLabel = string;

export type PagesStatItemColor = 'primary' | 'accent';

export type PagesStatItem = {
  value: PagesStatItemValue;
  label: PagesStatItemLabel;
  color: PagesStatItemColor;
};

export type PagesStatItems = PagesStatItem[];
