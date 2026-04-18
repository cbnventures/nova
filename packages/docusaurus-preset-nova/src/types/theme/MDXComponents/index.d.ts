import type { ReactNode } from 'react';

/**
 * Theme - MDX Components - MDX Code.
 *
 * @since 0.15.0
 */
export type ThemeMdxComponentsMdxCodeProps = Record<string, unknown>;

export type ThemeMdxComponentsMdxCodeChildren = ReactNode;

export type ThemeMdxComponentsMdxCodeIsInline = boolean;

/**
 * Theme - MDX Components - MDX Components.
 *
 * @since 0.15.0
 */
export type ThemeMdxComponentsMdxComponentsProps = Record<string, unknown>;

/**
 * Theme - MDX Components - MDX Details.
 *
 * @since 0.15.0
 */
export type ThemeMdxComponentsMdxDetailsProps = Record<string, unknown>;

export type ThemeMdxComponentsMdxDetailsItem = Exclude<ReactNode, boolean | null | undefined>;

export type ThemeMdxComponentsMdxDetailsItems = ThemeMdxComponentsMdxDetailsItem[];

export type ThemeMdxComponentsMdxDetailsSummary = ThemeMdxComponentsMdxDetailsItem | undefined;

export type ThemeMdxComponentsMdxDetailsChildren = ReactNode;

/**
 * Theme - MDX Components - MDX Heading.
 *
 * @since 0.15.0
 */
export type ThemeMdxComponentsMdxHeadingProps = Record<string, unknown>;

export type ThemeMdxComponentsMdxHeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type ThemeMdxComponentsMdxHeadingId = string | undefined;

/**
 * Theme - MDX Components - MDX Pre.
 *
 * @since 0.15.0
 */
export type ThemeMdxComponentsMdxPreProps = Record<string, unknown>;

/**
 * Theme - MDX Components - MDX Table.
 *
 * @since 0.15.0
 */
export type ThemeMdxComponentsMdxTableProps = Record<string, unknown>;
