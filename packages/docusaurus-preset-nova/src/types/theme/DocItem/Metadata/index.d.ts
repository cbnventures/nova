import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Item - Metadata - Doc Item Metadata.
 *
 * @since 0.15.0
 */
export type Theme_DocItem_Metadata_Index_DocItemMetadata_Props_ClassName = string | undefined;

export type Theme_DocItem_Metadata_Index_DocItemMetadata_Props_Style = CSSProperties | undefined;

export type Theme_DocItem_Metadata_Index_DocItemMetadata_Props = {
  className?: Theme_DocItem_Metadata_Index_DocItemMetadata_Props_ClassName;
  style?: Theme_DocItem_Metadata_Index_DocItemMetadata_Props_Style;
};

export type Theme_DocItem_Metadata_Index_DocItemMetadata_Doc = DocContextValue;

export type Theme_DocItem_Metadata_Index_DocItemMetadata_Spread = Record<string, unknown>;

export type Theme_DocItem_Metadata_Index_DocItemMetadata_Image = string | undefined;

export type Theme_DocItem_Metadata_Index_DocItemMetadata_MergedClassName = string;
