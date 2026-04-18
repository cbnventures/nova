/**
 * Theme - Edit Meta Row - Edit Meta Row.
 *
 * @since 0.15.0
 */
export type ThemeEditMetaRowEditMetaRowPropsClassName = string | undefined;

export type ThemeEditMetaRowEditMetaRowPropsEditUrl = string | undefined;

export type ThemeEditMetaRowEditMetaRowPropsLastUpdatedAt = number | undefined;

export type ThemeEditMetaRowEditMetaRowPropsLastUpdatedBy = string | undefined;

export type ThemeEditMetaRowEditMetaRowProps = {
  className?: ThemeEditMetaRowEditMetaRowPropsClassName;
  editUrl?: ThemeEditMetaRowEditMetaRowPropsEditUrl;
  lastUpdatedAt?: ThemeEditMetaRowEditMetaRowPropsLastUpdatedAt;
  lastUpdatedBy?: ThemeEditMetaRowEditMetaRowPropsLastUpdatedBy;
  [key: string]: unknown;
};

export type ThemeEditMetaRowEditMetaRowLastUpdatedSpread = Record<string, unknown>;
