import type { ReactNode } from 'react';

/**
 * Theme - MDX Components - MDX Code.
 *
 * @since 0.15.0
 */
export type Theme_MdxComponents_Index_MdxCode_Props = Record<string, unknown>;

export type Theme_MdxComponents_Index_MdxCode_Children = ReactNode;

export type Theme_MdxComponents_Index_MdxCode_IsInline = boolean;

export type Theme_MdxComponents_Index_MdxCode_Language = string | undefined;

export type Theme_MdxComponents_Index_MdxCode_Title = string | undefined;

export type Theme_MdxComponents_Index_MdxCode_Metastring = string | undefined;

export type Theme_MdxComponents_Index_MdxCode_ShowLineNumbers = boolean;

export type Theme_MdxComponents_Index_MdxCode_Live = boolean;

export type Theme_MdxComponents_Index_MdxCode_BlockSpread = {
  showLineNumbers: boolean;
  live: boolean;
  language?: string;
  title?: string;
  metastring?: string;
};

/**
 * Theme - MDX Components - MDX Components.
 *
 * @since 0.15.0
 */
export type Theme_MdxComponents_Index_MdxComponentsProps = Record<string, unknown>;

/**
 * Theme - MDX Components - MDX Details.
 *
 * @since 0.15.0
 */
export type Theme_MdxComponents_Index_MdxDetails_Props = Record<string, unknown>;

export type Theme_MdxComponents_Index_MdxDetails_Item = Exclude<ReactNode, boolean | null | undefined>;

export type Theme_MdxComponents_Index_MdxDetails_Items = Theme_MdxComponents_Index_MdxDetails_Item[];

export type Theme_MdxComponents_Index_MdxDetails_Summary = Theme_MdxComponents_Index_MdxDetails_Item | undefined;

export type Theme_MdxComponents_Index_MdxDetails_Children = ReactNode;

/**
 * Theme - MDX Components - MDX Heading.
 *
 * @since 0.15.0
 */
export type Theme_MdxComponents_Index_MdxHeading_Props = Record<string, unknown>;

export type Theme_MdxComponents_Index_MdxHeading_As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Theme_MdxComponents_Index_MdxHeading_Id = string | undefined;

/**
 * Theme - MDX Components - MDX Pre.
 *
 * @since 0.15.0
 */
export type Theme_MdxComponents_Index_MdxPre_Props = Record<string, unknown>;

/**
 * Theme - MDX Components - MDX Table.
 *
 * @since 0.15.0
 */
export type Theme_MdxComponents_Index_MdxTable_Props = Record<string, unknown>;
