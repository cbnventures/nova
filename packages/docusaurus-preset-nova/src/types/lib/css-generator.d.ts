import type {
  Shared_ColorScale,
  Shared_Preset,
  Shared_Preset_Depth,
  Shared_Preset_Fonts,
  Shared_Preset_Motion,
  Shared_Preset_Shape,
} from '../shared.d.ts';

/**
 * Lib - CSS Generator - Generate.
 *
 * @since 0.15.0
 */
export type Lib_CssGenerator_Runner_Generate_Options_Preset = Shared_Preset;

export type Lib_CssGenerator_Runner_Generate_Options = {
  preset: Lib_CssGenerator_Runner_Generate_Options_Preset;
};

export type Lib_CssGenerator_Runner_Generate_Returns = string;

export type Lib_CssGenerator_Runner_Generate_PrimaryLightColor = InstanceType<typeof import('../../lib/color.js').Runner>;

export type Lib_CssGenerator_Runner_Generate_PrimaryDarkColor = InstanceType<typeof import('../../lib/color.js').Runner>;

export type Lib_CssGenerator_Runner_Generate_AccentLightColor = InstanceType<typeof import('../../lib/color.js').Runner>;

export type Lib_CssGenerator_Runner_Generate_AccentDarkColor = InstanceType<typeof import('../../lib/color.js').Runner>;

export type Lib_CssGenerator_Runner_Generate_PrimaryLightScale = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Lib_CssGenerator_Runner_Generate_PrimaryDarkScale = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Lib_CssGenerator_Runner_Generate_AccentLightScale = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Lib_CssGenerator_Runner_Generate_AccentDarkScale = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Lib_CssGenerator_Runner_Generate_PrimaryLightLines = string[];

export type Lib_CssGenerator_Runner_Generate_PrimaryDarkLines = string[];

export type Lib_CssGenerator_Runner_Generate_AccentLightLines = string[];

export type Lib_CssGenerator_Runner_Generate_AccentDarkLines = string[];

export type Lib_CssGenerator_Runner_Generate_TextLight = string;

export type Lib_CssGenerator_Runner_Generate_TextDark = string;

export type Lib_CssGenerator_Runner_Generate_BorderLight = string;

export type Lib_CssGenerator_Runner_Generate_BorderDark = string;

export type Lib_CssGenerator_Runner_Generate_WarningLight = string;

export type Lib_CssGenerator_Runner_Generate_WarningDark = string;

export type Lib_CssGenerator_Runner_Generate_DangerLight = string;

export type Lib_CssGenerator_Runner_Generate_DangerDark = string;

export type Lib_CssGenerator_Runner_Generate_FontLines = string[];

export type Lib_CssGenerator_Runner_Generate_ShapeLines = string[];

export type Lib_CssGenerator_Runner_Generate_DepthLines = string[];

export type Lib_CssGenerator_Runner_Generate_MotionLines = string[];

export type Lib_CssGenerator_Runner_Generate_GridLines_BaseLines = string[];

export type Lib_CssGenerator_Runner_Generate_GridLines_MediaBlocks = string[];

export type Lib_CssGenerator_Runner_Generate_GridLines = {
  baseLines: Lib_CssGenerator_Runner_Generate_GridLines_BaseLines;
  mediaBlocks: Lib_CssGenerator_Runner_Generate_GridLines_MediaBlocks;
};

export type Lib_CssGenerator_Runner_Generate_Lines = string[];

export type Lib_CssGenerator_Runner_Generate_GridMediaBlocks = string;

/**
 * Lib - CSS Generator - Generate Color Variables.
 *
 * @since 0.15.0
 */
export type Lib_CssGenerator_Runner_GenerateColorVariables_ScaleName = string;

export type Lib_CssGenerator_Runner_GenerateColorVariables_Scale = Shared_ColorScale;

export type Lib_CssGenerator_Runner_GenerateColorVariables_Returns = string[];

export type Lib_CssGenerator_Runner_GenerateColorVariables_Lines = string[];

export type Lib_CssGenerator_Runner_GenerateColorVariables_ShadeLevels = (50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950)[];

/**
 * Lib - CSS Generator - Generate Depth Variables.
 *
 * @since 0.15.0
 */
export type Lib_CssGenerator_Runner_GenerateDepthVariables_Depth = Shared_Preset_Depth;

export type Lib_CssGenerator_Runner_GenerateDepthVariables_Returns = string[];

export type Lib_CssGenerator_Runner_GenerateDepthVariables_Lines = string[];

/**
 * Lib - CSS Generator - Generate Font Variables.
 *
 * @since 0.15.0
 */
export type Lib_CssGenerator_Runner_GenerateFontVariables_Fonts = Shared_Preset_Fonts;

export type Lib_CssGenerator_Runner_GenerateFontVariables_Lines = string[];

export type Lib_CssGenerator_Runner_GenerateFontVariables_Returns = string[];

/**
 * Lib - CSS Generator - Generate Grid Variables.
 *
 * @since 0.15.0
 */
export type Lib_CssGenerator_Runner_GenerateGridVariables_Shape = Shared_Preset_Shape;

export type Lib_CssGenerator_Runner_GenerateGridVariables_Returns_BaseLines = string[];

export type Lib_CssGenerator_Runner_GenerateGridVariables_Returns_MediaBlocks = string[];

export type Lib_CssGenerator_Runner_GenerateGridVariables_Returns = {
  baseLines: Lib_CssGenerator_Runner_GenerateGridVariables_Returns_BaseLines;
  mediaBlocks: Lib_CssGenerator_Runner_GenerateGridVariables_Returns_MediaBlocks;
};

export type Lib_CssGenerator_Runner_GenerateGridVariables_DensityGutter = string;

export type Lib_CssGenerator_Runner_GenerateGridVariables_DensityPadding = string;

export type Lib_CssGenerator_Runner_GenerateGridVariables_BaseLines = string[];

export type Lib_CssGenerator_Runner_GenerateGridVariables_MediumGutter = string;

export type Lib_CssGenerator_Runner_GenerateGridVariables_MediumPadding = string;

export type Lib_CssGenerator_Runner_GenerateGridVariables_LargeGutter = string;

export type Lib_CssGenerator_Runner_GenerateGridVariables_LargePadding = string;

export type Lib_CssGenerator_Runner_GenerateGridVariables_MediaBlocks = string[];

/**
 * Lib - CSS Generator - Generate Motion Variables.
 *
 * @since 0.15.0
 */
export type Lib_CssGenerator_Runner_GenerateMotionVariables_Motion = Shared_Preset_Motion;

export type Lib_CssGenerator_Runner_GenerateMotionVariables_Returns = string[];

export type Lib_CssGenerator_Runner_GenerateMotionVariables_Duration = string;

export type Lib_CssGenerator_Runner_GenerateMotionVariables_Staggered = number;

export type Lib_CssGenerator_Runner_GenerateMotionVariables_Hover = number;

export type Lib_CssGenerator_Runner_GenerateMotionVariables_Lines = string[];

/**
 * Lib - CSS Generator - Generate Shape Variables.
 *
 * @since 0.15.0
 */
export type Lib_CssGenerator_Runner_GenerateShapeVariables_Shape = Shared_Preset_Shape;

export type Lib_CssGenerator_Runner_GenerateShapeVariables_Returns = string[];

export type Lib_CssGenerator_Runner_GenerateShapeVariables_RadiusValue = string;

export type Lib_CssGenerator_Runner_GenerateShapeVariables_DensityPaddingScale = string;

export type Lib_CssGenerator_Runner_GenerateShapeVariables_DensityGapScale = string;

export type Lib_CssGenerator_Runner_GenerateShapeVariables_Lines = string[];
