import type { SharedMermaidRenderOutput } from '../../shared.d.ts';

/**
 * Theme - Mermaid - Content.
 *
 * @since 0.15.0
 */
export type ThemeMermaidContentPropsValue = string;

export type ThemeMermaidContentProps = {
  value: ThemeMermaidContentPropsValue;
  [key: string]: unknown;
};

export type ThemeMermaidContentReturns = React.JSX.Element | null;

export type ThemeMermaidContentRenderResult = SharedMermaidRenderOutput | null;

export type ThemeMermaidContentContainerRef = React.RefObject<HTMLDivElement | null>;

/**
 * Theme - Mermaid - Mermaid.
 *
 * @since 0.15.0
 */
export type ThemeMermaidMermaidPropsValue = string;

export type ThemeMermaidMermaidProps = {
  value: ThemeMermaidMermaidPropsValue;
  [key: string]: unknown;
};

export type ThemeMermaidMermaidReturns = React.JSX.Element;

export type ThemeMermaidMermaidColorModeState = [ThemeMermaidMermaidColorMode, ThemeMermaidMermaidSetColorMode];

export type ThemeMermaidMermaidColorMode = string;

export type ThemeMermaidMermaidSetColorMode = React.Dispatch<React.SetStateAction<ThemeMermaidMermaidColorMode>>;

export type ThemeMermaidMermaidCurrentTheme = string | null;

export type ThemeMermaidMermaidObserver = MutationObserver;

export type ThemeMermaidMermaidTheme = string | null;
