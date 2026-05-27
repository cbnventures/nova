import type { CSSProperties } from 'react';

import type { Shared_MermaidRenderOutput } from '../../shared.d.ts';

/**
 * Theme - Mermaid - Content.
 *
 * @since 0.15.0
 */
export type Theme_Mermaid_Index_Mermaid_ContentProps_Value = string;

export type Theme_Mermaid_Index_Mermaid_ContentProps_ClassName = string | undefined;

export type Theme_Mermaid_Index_Mermaid_ContentProps_Style = CSSProperties | undefined;

export type Theme_Mermaid_Index_Mermaid_ContentProps = {
  value: Theme_Mermaid_Index_Mermaid_ContentProps_Value;
  className?: Theme_Mermaid_Index_Mermaid_ContentProps_ClassName;
  style?: Theme_Mermaid_Index_Mermaid_ContentProps_Style;
  [key: string]: unknown;
};

export type Theme_Mermaid_Index_Mermaid_ContentReturns = React.JSX.Element | null;

export type Theme_Mermaid_Index_Mermaid_ContentRenderResult = Shared_MermaidRenderOutput | null;

export type Theme_Mermaid_Index_Mermaid_ContentContainerRef = React.RefObject<HTMLDivElement | null>;

export type Theme_Mermaid_Index_Mermaid_ContentClassName = string;

/**
 * Theme - Mermaid - Mermaid.
 *
 * @since 0.15.0
 */
export type Theme_Mermaid_Index_Mermaid_Props_Value = string;

export type Theme_Mermaid_Index_Mermaid_Props_ClassName = string | undefined;

export type Theme_Mermaid_Index_Mermaid_Props_Style = CSSProperties | undefined;

export type Theme_Mermaid_Index_Mermaid_Props = {
  value: Theme_Mermaid_Index_Mermaid_Props_Value;
  className?: Theme_Mermaid_Index_Mermaid_Props_ClassName;
  style?: Theme_Mermaid_Index_Mermaid_Props_Style;
  [key: string]: unknown;
};

export type Theme_Mermaid_Index_Mermaid_Returns = React.JSX.Element;

export type Theme_Mermaid_Index_Mermaid_ColorModeState = [Theme_Mermaid_Index_Mermaid_ColorMode, Theme_Mermaid_Index_Mermaid_SetColorMode];

export type Theme_Mermaid_Index_Mermaid_ColorMode = string;

export type Theme_Mermaid_Index_Mermaid_SetColorMode = React.Dispatch<React.SetStateAction<Theme_Mermaid_Index_Mermaid_ColorMode>>;

export type Theme_Mermaid_Index_Mermaid_CurrentTheme = string | null;

export type Theme_Mermaid_Index_Mermaid_Observer = MutationObserver;

export type Theme_Mermaid_Index_Mermaid_Theme = string | null;
