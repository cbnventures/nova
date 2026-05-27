import type {
  Shared_MermaidConfig,
  Shared_MermaidRenderOutput,
} from '../shared.d.ts';

/**
 * Lib - Mermaid - Container Class Name.
 *
 * @since 0.15.0
 */
export type Lib_Mermaid_ContainerClassName = string;

/**
 * Lib - Mermaid - Get Resolved Color.
 *
 * @since 0.15.0
 */
export type Lib_Mermaid_GetCssVariableName = string;

export type Lib_Mermaid_GetCssVariableReturns = string;

export type Lib_Mermaid_GetCssVariableComputedStyle = CSSStyleDeclaration;

export type Lib_Mermaid_GetCssVariableProbe = HTMLSpanElement;

export type Lib_Mermaid_GetCssVariableResolved = string;

export type Lib_Mermaid_GetCssVariableCanvas = HTMLCanvasElement;

export type Lib_Mermaid_GetCssVariableContext = CanvasRenderingContext2D | null;

export type Lib_Mermaid_GetCssVariableData = Uint8ClampedArray;

export type Lib_Mermaid_GetCssVariableRed = number | undefined;

export type Lib_Mermaid_GetCssVariableGreen = number | undefined;

export type Lib_Mermaid_GetCssVariableBlue = number | undefined;

export type Lib_Mermaid_GetCssVariableAlpha = number | undefined;

/**
 * Lib - Mermaid - Load Mermaid.
 *
 * @since 0.15.0
 */
export type Lib_Mermaid_LoadMermaid_Returns = Promise<Lib_Mermaid_LoadMermaid_Module>;

export type Lib_Mermaid_LoadMermaid_Module = typeof import('mermaid');

/**
 * Lib - Mermaid - Promise.
 *
 * @since 0.15.0
 */
export type Lib_Mermaid_Promise = Promise<Lib_Mermaid_PromiseModule> | undefined;

export type Lib_Mermaid_PromiseModule = typeof import('mermaid');

/**
 * Lib - Mermaid - Use Mermaid Config.
 *
 * @since 0.15.0
 */
export type Lib_Mermaid_UseMermaidConfig_Returns = Lib_Mermaid_UseMermaidConfig_Config;

export type Lib_Mermaid_UseMermaidConfig_ColorMode = string;

export type Lib_Mermaid_UseMermaidConfig_IsDark = boolean;

export type Lib_Mermaid_UseMermaidConfig_FontFamily = string;

export type Lib_Mermaid_UseMermaidConfig_Config_StartOnLoad = boolean;

export type Lib_Mermaid_UseMermaidConfig_Config_Theme = string;

export type Lib_Mermaid_UseMermaidConfig_Config_ColorMode = string;

export type Lib_Mermaid_UseMermaidConfig_Config = {
  startOnLoad: Lib_Mermaid_UseMermaidConfig_Config_StartOnLoad;
  theme: Lib_Mermaid_UseMermaidConfig_Config_Theme;
  colorMode: Lib_Mermaid_UseMermaidConfig_Config_ColorMode;
  [key: string]: unknown;
};

/**
 * Lib - Mermaid - Use Mermaid Render Result.
 *
 * @since 0.15.0
 */
export type Lib_Mermaid_UseMermaidRenderResult_Options_Text = string;

export type Lib_Mermaid_UseMermaidRenderResult_Options = {
  text: Lib_Mermaid_UseMermaidRenderResult_Options_Text;
};

export type Lib_Mermaid_UseMermaidRenderResult_Returns = Shared_MermaidRenderOutput | null;

export type Lib_Mermaid_UseMermaidRenderResult_State = [Lib_Mermaid_UseMermaidRenderResult_Returns, Lib_Mermaid_UseMermaidRenderResult_SetResult];

export type Lib_Mermaid_UseMermaidRenderResult_SetResult = React.Dispatch<React.SetStateAction<Lib_Mermaid_UseMermaidRenderResult_Returns>>;

export type Lib_Mermaid_UseMermaidRenderResult_Config = Shared_MermaidConfig;

export type Lib_Mermaid_UseMermaidRenderResult_Id = string;

export type Lib_Mermaid_UseMermaidRenderResult_Cancelled = boolean;

export type Lib_Mermaid_UseMermaidRenderResult_MermaidModuleType = typeof import('mermaid');

export type Lib_Mermaid_UseMermaidRenderResult_MermaidModule = Lib_Mermaid_UseMermaidRenderResult_MermaidModuleType;

export type Lib_Mermaid_UseMermaidRenderResult_MermaidDefault = Lib_Mermaid_UseMermaidRenderResult_MermaidModuleType['default'];

export type Lib_Mermaid_UseMermaidRenderResult_InitializeConfig = Parameters<Lib_Mermaid_UseMermaidRenderResult_MermaidDefault['initialize']>[0];

export type Lib_Mermaid_UseMermaidRenderResult_RenderOutput = Shared_MermaidRenderOutput;
