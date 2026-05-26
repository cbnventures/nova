import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Item - Paginator - Doc Item Paginator.
 *
 * @since 0.15.0
 */
export type ThemeDocItemPaginatorDocItemPaginatorPropsClassName = string | undefined;

export type ThemeDocItemPaginatorDocItemPaginatorPropsStyle = CSSProperties | undefined;

export type ThemeDocItemPaginatorDocItemPaginatorProps = {
  className?: ThemeDocItemPaginatorDocItemPaginatorPropsClassName;
  style?: ThemeDocItemPaginatorDocItemPaginatorPropsStyle;
};

export type ThemeDocItemPaginatorDocItemPaginatorDoc = DocContextValue;

export type ThemeDocItemPaginatorDocItemPaginatorGlobalData = Record<string, unknown>;

export type ThemeDocItemPaginatorDocItemPaginatorDocDescriptions = Record<string, string>;

export type ThemeDocItemPaginatorDocItemPaginatorSpread = Record<string, unknown>;

export type ThemeDocItemPaginatorDocItemPaginatorDescription = string | undefined;

export type ThemeDocItemPaginatorDocItemPaginatorMergedClassName = string;
