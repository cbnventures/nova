import type { CSSProperties } from 'react';

/**
 * Theme - Edit Meta Row - Edit Meta Row.
 *
 * @since 0.15.0
 */
export type Theme_EditMetaRow_Index_EditMetaRow_Props_EditUrl = string | undefined;

export type Theme_EditMetaRow_Index_EditMetaRow_Props_LastUpdatedAt = number | undefined;

export type Theme_EditMetaRow_Index_EditMetaRow_Props_LastUpdatedBy = string | undefined;

export type Theme_EditMetaRow_Index_EditMetaRow_Props_ClassName = string | undefined;

export type Theme_EditMetaRow_Index_EditMetaRow_Props_Style = CSSProperties | undefined;

export type Theme_EditMetaRow_Index_EditMetaRow_Props = {
  editUrl?: Theme_EditMetaRow_Index_EditMetaRow_Props_EditUrl;
  lastUpdatedAt?: Theme_EditMetaRow_Index_EditMetaRow_Props_LastUpdatedAt;
  lastUpdatedBy?: Theme_EditMetaRow_Index_EditMetaRow_Props_LastUpdatedBy;
  className?: Theme_EditMetaRow_Index_EditMetaRow_Props_ClassName;
  style?: Theme_EditMetaRow_Index_EditMetaRow_Props_Style;
  [key: string]: unknown;
};

export type Theme_EditMetaRow_Index_EditMetaRow_LastUpdatedSpread = Record<string, unknown>;
