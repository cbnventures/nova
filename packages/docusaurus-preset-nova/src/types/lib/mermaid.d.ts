import type { Shared_MermaidRenderOutput } from '../shared.d.ts';

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
export type Lib_Mermaid_GetResolvedColor_Name = string;

export type Lib_Mermaid_GetResolvedColor_Returns = string;

export type Lib_Mermaid_GetResolvedColor_ComputedStyle = CSSStyleDeclaration;

export type Lib_Mermaid_GetResolvedColor_Probe = HTMLSpanElement;

export type Lib_Mermaid_GetResolvedColor_Resolved = string;

export type Lib_Mermaid_GetResolvedColor_Canvas = HTMLCanvasElement;

export type Lib_Mermaid_GetResolvedColor_Ctx = CanvasRenderingContext2D | null;

export type Lib_Mermaid_GetResolvedColor_Data = Uint8ClampedArray;

export type Lib_Mermaid_GetResolvedColor_R = number | undefined;

export type Lib_Mermaid_GetResolvedColor_G = number | undefined;

export type Lib_Mermaid_GetResolvedColor_B = number | undefined;

export type Lib_Mermaid_GetResolvedColor_A = number | undefined;

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
export type Lib_Mermaid_MermaidPromise = Promise<Lib_Mermaid_MermaidPromiseModule> | undefined;

export type Lib_Mermaid_MermaidPromiseModule = typeof import('mermaid');

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

export type Lib_Mermaid_UseMermaidRenderResult_Result = Shared_MermaidRenderOutput | null;

export type Lib_Mermaid_UseMermaidRenderResult_SetResult = React.Dispatch<React.SetStateAction<Lib_Mermaid_UseMermaidRenderResult_Returns>>;

export type Lib_Mermaid_UseMermaidRenderResult_Config_StartOnLoad = boolean;

export type Lib_Mermaid_UseMermaidRenderResult_Config_Theme = string;

export type Lib_Mermaid_UseMermaidRenderResult_Config_ColorMode = string;

export type Lib_Mermaid_UseMermaidRenderResult_Config = {
  startOnLoad: Lib_Mermaid_UseMermaidRenderResult_Config_StartOnLoad;
  theme: Lib_Mermaid_UseMermaidRenderResult_Config_Theme;
  colorMode: Lib_Mermaid_UseMermaidRenderResult_Config_ColorMode;
  [key: string]: unknown;
};

export type Lib_Mermaid_UseMermaidRenderResult_Id = string;

export type Lib_Mermaid_UseMermaidRenderResult_Cancelled = boolean;

export type Lib_Mermaid_UseMermaidRenderResult_MermaidModuleType = typeof import('mermaid');

export type Lib_Mermaid_UseMermaidRenderResult_MermaidModule = Lib_Mermaid_UseMermaidRenderResult_MermaidModuleType;

export type Lib_Mermaid_UseMermaidRenderResult_MermaidDefault = Lib_Mermaid_UseMermaidRenderResult_MermaidModuleType['default'];

export type Lib_Mermaid_UseMermaidRenderResult_InitializeConfig = Parameters<Lib_Mermaid_UseMermaidRenderResult_MermaidDefault['initialize']>[0];

export type Lib_Mermaid_UseMermaidRenderResult_RenderOutput_Svg = string;

export type Lib_Mermaid_UseMermaidRenderResult_RenderOutput_BindFunctions = ((element: Element) => void) | undefined;

export type Lib_Mermaid_UseMermaidRenderResult_RenderOutput = {
  svg: Lib_Mermaid_UseMermaidRenderResult_RenderOutput_Svg;
  bindFunctions?: Lib_Mermaid_UseMermaidRenderResult_RenderOutput_BindFunctions;
};
