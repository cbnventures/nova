import type { CSSProperties } from 'react';

/**
 * Theme - Edit Meta Row - Edit Meta Row.
 *
 * @since 0.15.0
 */
export type ThemeEditMetaRowEditMetaRowPropsEditUrl = string | undefined;

export type ThemeEditMetaRowEditMetaRowPropsLastUpdatedAt = number | undefined;

export type ThemeEditMetaRowEditMetaRowPropsLastUpdatedBy = string | undefined;

export type ThemeEditMetaRowEditMetaRowPropsClassName = string | undefined;

export type ThemeEditMetaRowEditMetaRowPropsStyle = CSSProperties | undefined;

export type ThemeEditMetaRowEditMetaRowProps = {
  editUrl?: ThemeEditMetaRowEditMetaRowPropsEditUrl;
  lastUpdatedAt?: ThemeEditMetaRowEditMetaRowPropsLastUpdatedAt;
  lastUpdatedBy?: ThemeEditMetaRowEditMetaRowPropsLastUpdatedBy;
  className?: ThemeEditMetaRowEditMetaRowPropsClassName;
  style?: ThemeEditMetaRowEditMetaRowPropsStyle;
  [key: string]: unknown;
};

export type ThemeEditMetaRowEditMetaRowLastUpdatedSpread = Record<string, unknown>;
