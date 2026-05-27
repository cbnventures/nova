import type { Runner as Color } from '../../../lib/color.js';

import type {
  Shared_ColorScale,
  Shared_HexColor,
  Shared_ShadeLevel,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Color - Color Constructor.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_Instance = Color;

/**
 * Tests - Lib - Color - Color Edge Cases.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_EdgeCaseInstance = Color;

export type Tests_Lib_Color_EdgeCaseScale = Shared_ColorScale;

export type Tests_Lib_Color_EdgeCaseShadeKeys = string[];

/**
 * Tests - Lib - Color - Color GenerateScale.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_GenerateScaleInstance = Color;

export type Tests_Lib_Color_GenerateScaleResult = Shared_ColorScale;

export type Tests_Lib_Color_GenerateScaleShadeKeys = string[];

export type Tests_Lib_Color_GenerateScaleExpectedLevel = Shared_ShadeLevel;

export type Tests_Lib_Color_GenerateScaleShade600 = Shared_HexColor;

export type Tests_Lib_Color_GenerateScaleShade600RedSlice = string;

export type Tests_Lib_Color_GenerateScaleShade600Red = number;

export type Tests_Lib_Color_GenerateScaleShade600GreenSlice = string;

export type Tests_Lib_Color_GenerateScaleShade600Green = number;

export type Tests_Lib_Color_GenerateScaleShade600BlueSlice = string;

export type Tests_Lib_Color_GenerateScaleShade600Blue = number;

export type Tests_Lib_Color_GenerateScaleInputRedString = string;

export type Tests_Lib_Color_GenerateScaleInputRed = number;

export type Tests_Lib_Color_GenerateScaleInputGreenString = string;

export type Tests_Lib_Color_GenerateScaleInputGreen = number;

export type Tests_Lib_Color_GenerateScaleInputBlueString = string;

export type Tests_Lib_Color_GenerateScaleInputBlue = number;

export type Tests_Lib_Color_GenerateScaleRedDiff = number;

export type Tests_Lib_Color_GenerateScaleGreenDiff = number;

export type Tests_Lib_Color_GenerateScaleBlueDiff = number;

export type Tests_Lib_Color_GenerateScaleAnchorHex = Shared_HexColor;

export type Tests_Lib_Color_GenerateScaleAnchorLightness = number;

export type Tests_Lib_Color_GenerateScaleLighterHex = Shared_HexColor;

export type Tests_Lib_Color_GenerateScaleLighterLightness = number;

export type Tests_Lib_Color_GenerateScaleDarkerHex = Shared_HexColor;

export type Tests_Lib_Color_GenerateScaleDarkerLightness = number;

/**
 * Tests - Lib - Color - Hex To Lightness.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_HexToLightness_Hex = string;

export type Tests_Lib_Color_HexToLightness_Returns = number;

export type Tests_Lib_Color_HexToLightness_RedSlice = string;

export type Tests_Lib_Color_HexToLightness_Red = number;

export type Tests_Lib_Color_HexToLightness_GreenSlice = string;

export type Tests_Lib_Color_HexToLightness_Green = number;

export type Tests_Lib_Color_HexToLightness_BlueSlice = string;

export type Tests_Lib_Color_HexToLightness_Blue = number;

export type Tests_Lib_Color_HexToLightness_NormalizedRed = number;

export type Tests_Lib_Color_HexToLightness_NormalizedGreen = number;

export type Tests_Lib_Color_HexToLightness_NormalizedBlue = number;

export type Tests_Lib_Color_HexToLightness_ChannelMax = number;

export type Tests_Lib_Color_HexToLightness_ChannelMin = number;
