import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Item - Metadata - Doc Item Metadata.
 *
 * @since 0.15.0
 */
export type ThemeDocItemMetadataDocItemMetadataPropsClassName = string | undefined;

export type ThemeDocItemMetadataDocItemMetadataPropsStyle = CSSProperties | undefined;

export type ThemeDocItemMetadataDocItemMetadataProps = {
  className?: ThemeDocItemMetadataDocItemMetadataPropsClassName;
  style?: ThemeDocItemMetadataDocItemMetadataPropsStyle;
};

export type ThemeDocItemMetadataDocItemMetadataDoc = DocContextValue;

export type ThemeDocItemMetadataDocItemMetadataSpread = Record<string, unknown>;

export type ThemeDocItemMetadataDocItemMetadataImage = string | undefined;

export type ThemeDocItemMetadataDocItemMetadataMergedClassName = string;
