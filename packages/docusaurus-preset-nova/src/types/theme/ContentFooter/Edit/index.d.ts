import type { CSSProperties } from 'react';

/**
 * Theme - Content Footer - Edit.
 *
 * @since 0.18.0
 */
export type ThemeContentFooterEditPropsEditUrl = string | undefined;

export type ThemeContentFooterEditPropsLastUpdatedAt = number | undefined;

export type ThemeContentFooterEditPropsLastUpdatedBy = string | undefined;

export type ThemeContentFooterEditPropsClassName = string | undefined;

export type ThemeContentFooterEditPropsStyle = CSSProperties | undefined;

export type ThemeContentFooterEditProps = {
  editUrl?: ThemeContentFooterEditPropsEditUrl;
  lastUpdatedAt?: ThemeContentFooterEditPropsLastUpdatedAt;
  lastUpdatedBy?: ThemeContentFooterEditPropsLastUpdatedBy;
  className?: ThemeContentFooterEditPropsClassName;
  style?: ThemeContentFooterEditPropsStyle;
};

export type ThemeContentFooterEditLabel = string;

export type ThemeContentFooterEditLastUpdatedSpread = Record<string, unknown>;
