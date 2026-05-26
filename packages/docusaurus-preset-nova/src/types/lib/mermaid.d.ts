import type {
  SharedMermaidConfig,
  SharedMermaidRenderOutput,
} from '../shared.d.ts';

/**
 * Lib - Mermaid - Container Class Name.
 *
 * @since 0.15.0
 */
export type LibMermaidContainerClassName = string;

/**
 * Lib - Mermaid - Get Resolved Color.
 *
 * @since 0.15.0
 */
export type LibMermaidGetCssVariableName = string;

export type LibMermaidGetCssVariableReturns = string;

export type LibMermaidGetCssVariableComputedStyle = CSSStyleDeclaration;

export type LibMermaidGetCssVariableProbe = HTMLSpanElement;

export type LibMermaidGetCssVariableResolved = string;

export type LibMermaidGetCssVariableCanvas = HTMLCanvasElement;

export type LibMermaidGetCssVariableContext = CanvasRenderingContext2D | null;

export type LibMermaidGetCssVariableData = Uint8ClampedArray;

export type LibMermaidGetCssVariableRed = number | undefined;

export type LibMermaidGetCssVariableGreen = number | undefined;

export type LibMermaidGetCssVariableBlue = number | undefined;

export type LibMermaidGetCssVariableAlpha = number | undefined;

/**
 * Lib - Mermaid - Load Mermaid.
 *
 * @since 0.15.0
 */
export type LibMermaidLoadMermaidReturns = Promise<LibMermaidLoadMermaidModule>;

export type LibMermaidLoadMermaidModule = typeof import('mermaid');

/**
 * Lib - Mermaid - Promise.
 *
 * @since 0.15.0
 */
export type LibMermaidPromise = Promise<LibMermaidPromiseModule> | undefined;

export type LibMermaidPromiseModule = typeof import('mermaid');

/**
 * Lib - Mermaid - Use Mermaid Config.
 *
 * @since 0.15.0
 */
export type LibMermaidUseMermaidConfigReturns = LibMermaidUseMermaidConfigConfig;

export type LibMermaidUseMermaidConfigColorMode = string;

export type LibMermaidUseMermaidConfigIsDark = boolean;

export type LibMermaidUseMermaidConfigFontFamily = string;

export type LibMermaidUseMermaidConfigConfigStartOnLoad = boolean;

export type LibMermaidUseMermaidConfigConfigTheme = string;

export type LibMermaidUseMermaidConfigConfigColorMode = string;

export type LibMermaidUseMermaidConfigConfig = {
  startOnLoad: LibMermaidUseMermaidConfigConfigStartOnLoad;
  theme: LibMermaidUseMermaidConfigConfigTheme;
  colorMode: LibMermaidUseMermaidConfigConfigColorMode;
  [key: string]: unknown;
};

/**
 * Lib - Mermaid - Use Mermaid Render Result.
 *
 * @since 0.15.0
 */
export type LibMermaidUseMermaidRenderResultOptionsText = string;

export type LibMermaidUseMermaidRenderResultOptions = {
  text: LibMermaidUseMermaidRenderResultOptionsText;
};

export type LibMermaidUseMermaidRenderResultReturns = SharedMermaidRenderOutput | null;

export type LibMermaidUseMermaidRenderResultState = [LibMermaidUseMermaidRenderResultReturns, LibMermaidUseMermaidRenderResultSetResult];

export type LibMermaidUseMermaidRenderResultSetResult = React.Dispatch<React.SetStateAction<LibMermaidUseMermaidRenderResultReturns>>;

export type LibMermaidUseMermaidRenderResultConfig = SharedMermaidConfig;

export type LibMermaidUseMermaidRenderResultId = string;

export type LibMermaidUseMermaidRenderResultCancelled = boolean;

export type LibMermaidUseMermaidRenderResultMermaidModuleType = typeof import('mermaid');

export type LibMermaidUseMermaidRenderResultMermaidModule = LibMermaidUseMermaidRenderResultMermaidModuleType;

export type LibMermaidUseMermaidRenderResultMermaidDefault = LibMermaidUseMermaidRenderResultMermaidModuleType['default'];

export type LibMermaidUseMermaidRenderResultInitializeConfig = Parameters<LibMermaidUseMermaidRenderResultMermaidDefault['initialize']>[0];

export type LibMermaidUseMermaidRenderResultRenderOutput = SharedMermaidRenderOutput;
