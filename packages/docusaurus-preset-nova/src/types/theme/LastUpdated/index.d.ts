import type { DocusaurusContext } from '@docusaurus/types';

/**
 * Theme - Last Updated - Last Updated.
 *
 * @since 0.15.0
 */
export type ThemeLastUpdatedLastUpdatedPropsLastUpdatedAt = number | undefined;

export type ThemeLastUpdatedLastUpdatedPropsLastUpdatedBy = string | undefined;

export type ThemeLastUpdatedLastUpdatedProps = {
  lastUpdatedAt?: ThemeLastUpdatedLastUpdatedPropsLastUpdatedAt;
  lastUpdatedBy?: ThemeLastUpdatedLastUpdatedPropsLastUpdatedBy;
  [key: string]: unknown;
};

export type ThemeLastUpdatedLastUpdatedContext = DocusaurusContext;

export type ThemeLastUpdatedLastUpdatedCurrentLocale = string;

/**
 * Theme - Last Updated - Last Updated Date.
 *
 * @since 0.15.0
 */
export type ThemeLastUpdatedLastUpdatedDatePropsLastUpdatedAt = number;

export type ThemeLastUpdatedLastUpdatedDateLocale = string;

export type ThemeLastUpdatedLastUpdatedDateDate = Date;

export type ThemeLastUpdatedLastUpdatedDateFormattedDate = string;

export type ThemeLastUpdatedLastUpdatedAtDate = string;

export type ThemeLastUpdatedLastUpdatedLabel = string;

export type ThemeLastUpdatedLastUpdatedByUser = string;
