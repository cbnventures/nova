import type {
  SharedColorScale,
  SharedPreset,
  SharedPresetDepth,
  SharedPresetFonts,
  SharedPresetMotion,
  SharedPresetShape,
  SharedShadeLevel,
} from '../shared.d.ts';

/**
 * Lib - CSS Generator - Generate.
 *
 * @since 0.15.0
 */
export type LibCssGeneratorGenerateOptionsPreset = SharedPreset;

export type LibCssGeneratorGenerateOptions = {
  preset: LibCssGeneratorGenerateOptionsPreset;
};

export type LibCssGeneratorGenerateReturns = string;

export type LibCssGeneratorGeneratePrimaryLightColor = InstanceType<typeof import('../../lib/color.js').Color>;

export type LibCssGeneratorGeneratePrimaryDarkColor = InstanceType<typeof import('../../lib/color.js').Color>;

export type LibCssGeneratorGenerateAccentLightColor = InstanceType<typeof import('../../lib/color.js').Color>;

export type LibCssGeneratorGenerateAccentDarkColor = InstanceType<typeof import('../../lib/color.js').Color>;

export type LibCssGeneratorGeneratePrimaryLightScale = SharedColorScale;

export type LibCssGeneratorGeneratePrimaryDarkScale = SharedColorScale;

export type LibCssGeneratorGenerateAccentLightScale = SharedColorScale;

export type LibCssGeneratorGenerateAccentDarkScale = SharedColorScale;

export type LibCssGeneratorGeneratePrimaryLightLines = string[];

export type LibCssGeneratorGeneratePrimaryDarkLines = string[];

export type LibCssGeneratorGenerateAccentLightLines = string[];

export type LibCssGeneratorGenerateAccentDarkLines = string[];

export type LibCssGeneratorGenerateTextLight = string;

export type LibCssGeneratorGenerateTextDark = string;

export type LibCssGeneratorGenerateBorderLight = string;

export type LibCssGeneratorGenerateBorderDark = string;

export type LibCssGeneratorGenerateWarningLight = string;

export type LibCssGeneratorGenerateWarningDark = string;

export type LibCssGeneratorGenerateDangerLight = string;

export type LibCssGeneratorGenerateDangerDark = string;

export type LibCssGeneratorGenerateFontLines = string[];

export type LibCssGeneratorGenerateShapeLines = string[];

export type LibCssGeneratorGenerateDepthLines = string[];

export type LibCssGeneratorGenerateMotionLines = string[];

export type LibCssGeneratorGenerateGridLinesBaseLines = string[];

export type LibCssGeneratorGenerateGridLinesMediaBlocks = string[];

export type LibCssGeneratorGenerateGridLines = {
  baseLines: LibCssGeneratorGenerateGridLinesBaseLines;
  mediaBlocks: LibCssGeneratorGenerateGridLinesMediaBlocks;
};

export type LibCssGeneratorGenerateLines = string[];

export type LibCssGeneratorGenerateGridMediaBlocks = string;

/**
 * Lib - CSS Generator - Generate Color Variables.
 *
 * @since 0.15.0
 */
export type LibCssGeneratorGenerateColorVariablesScaleName = string;

export type LibCssGeneratorGenerateColorVariablesScale = SharedColorScale;

export type LibCssGeneratorGenerateColorVariablesReturns = string[];

export type LibCssGeneratorGenerateColorVariablesLines = string[];

export type LibCssGeneratorGenerateColorVariablesShadeLevels = SharedShadeLevel[];

/**
 * Lib - CSS Generator - Generate Depth Variables.
 *
 * @since 0.15.0
 */
export type LibCssGeneratorGenerateDepthVariablesDepth = SharedPresetDepth;

export type LibCssGeneratorGenerateDepthVariablesReturns = string[];

export type LibCssGeneratorGenerateDepthVariablesLines = string[];

/**
 * Lib - CSS Generator - Generate Font Variables.
 *
 * @since 0.15.0
 */
export type LibCssGeneratorGenerateFontVariablesFonts = SharedPresetFonts;

export type LibCssGeneratorGenerateFontVariablesLines = string[];

export type LibCssGeneratorGenerateFontVariablesReturns = string[];

/**
 * Lib - CSS Generator - Generate Grid Variables.
 *
 * @since 0.15.0
 */
export type LibCssGeneratorGenerateGridVariablesShape = SharedPresetShape;

export type LibCssGeneratorGenerateGridVariablesReturnsBaseLines = string[];

export type LibCssGeneratorGenerateGridVariablesReturnsMediaBlocks = string[];

export type LibCssGeneratorGenerateGridVariablesReturns = {
  baseLines: LibCssGeneratorGenerateGridVariablesReturnsBaseLines;
  mediaBlocks: LibCssGeneratorGenerateGridVariablesReturnsMediaBlocks;
};

export type LibCssGeneratorGenerateGridVariablesDensityGutter = string;

export type LibCssGeneratorGenerateGridVariablesDensityPadding = string;

export type LibCssGeneratorGenerateGridVariablesBaseLines = string[];

export type LibCssGeneratorGenerateGridVariablesMediaBlocks = string[];

/**
 * Lib - CSS Generator - Generate Motion Variables.
 *
 * @since 0.15.0
 */
export type LibCssGeneratorGenerateMotionVariablesMotion = SharedPresetMotion;

export type LibCssGeneratorGenerateMotionVariablesReturns = string[];

export type LibCssGeneratorGenerateMotionVariablesDuration = string;

export type LibCssGeneratorGenerateMotionVariablesStaggered = number;

export type LibCssGeneratorGenerateMotionVariablesHover = number;

export type LibCssGeneratorGenerateMotionVariablesLines = string[];

/**
 * Lib - CSS Generator - Generate Shape Variables.
 *
 * @since 0.15.0
 */
export type LibCssGeneratorGenerateShapeVariablesShape = SharedPresetShape;

export type LibCssGeneratorGenerateShapeVariablesReturns = string[];

export type LibCssGeneratorGenerateShapeVariablesRadiusValue = string;

export type LibCssGeneratorGenerateShapeVariablesDensityPaddingScale = string;

export type LibCssGeneratorGenerateShapeVariablesDensityGapScale = string;

export type LibCssGeneratorGenerateShapeVariablesLines = string[];
