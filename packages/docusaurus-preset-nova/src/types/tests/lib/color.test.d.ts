import type { Color } from '../../../lib/color.js';

import type {
  SharedColorScale,
  SharedHexColor,
  SharedShadeLevel,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Color - Color Constructor.
 *
 * @since 0.15.0
 */
export type TestsLibColorInstance = Color;

/**
 * Tests - Lib - Color - Color Edge Cases.
 *
 * @since 0.15.0
 */
export type TestsLibColorEdgeCaseInstance = Color;

export type TestsLibColorEdgeCaseScale = SharedColorScale;

export type TestsLibColorEdgeCaseShadeKeys = string[];

/**
 * Tests - Lib - Color - Color GenerateScale.
 *
 * @since 0.15.0
 */
export type TestsLibColorGenerateScaleInstance = Color;

export type TestsLibColorGenerateScaleResult = SharedColorScale;

export type TestsLibColorGenerateScaleShadeKeys = string[];

export type TestsLibColorGenerateScaleExpectedLevel = SharedShadeLevel;

export type TestsLibColorGenerateScaleShade600 = SharedHexColor;

export type TestsLibColorGenerateScaleShade600RedSlice = string;

export type TestsLibColorGenerateScaleShade600Red = number;

export type TestsLibColorGenerateScaleShade600GreenSlice = string;

export type TestsLibColorGenerateScaleShade600Green = number;

export type TestsLibColorGenerateScaleShade600BlueSlice = string;

export type TestsLibColorGenerateScaleShade600Blue = number;

export type TestsLibColorGenerateScaleInputRedString = string;

export type TestsLibColorGenerateScaleInputRed = number;

export type TestsLibColorGenerateScaleInputGreenString = string;

export type TestsLibColorGenerateScaleInputGreen = number;

export type TestsLibColorGenerateScaleInputBlueString = string;

export type TestsLibColorGenerateScaleInputBlue = number;

export type TestsLibColorGenerateScaleRedDiff = number;

export type TestsLibColorGenerateScaleGreenDiff = number;

export type TestsLibColorGenerateScaleBlueDiff = number;

export type TestsLibColorGenerateScaleAnchorHex = SharedHexColor;

export type TestsLibColorGenerateScaleAnchorLightness = number;

export type TestsLibColorGenerateScaleLighterHex = SharedHexColor;

export type TestsLibColorGenerateScaleLighterLightness = number;

export type TestsLibColorGenerateScaleDarkerHex = SharedHexColor;

export type TestsLibColorGenerateScaleDarkerLightness = number;

/**
 * Tests - Lib - Color - Hex To Lightness.
 *
 * @since 0.15.0
 */
export type TestsLibColorHexToLightnessHex = string;

export type TestsLibColorHexToLightnessReturns = number;

export type TestsLibColorHexToLightnessRedSlice = string;

export type TestsLibColorHexToLightnessRed = number;

export type TestsLibColorHexToLightnessGreenSlice = string;

export type TestsLibColorHexToLightnessGreen = number;

export type TestsLibColorHexToLightnessBlueSlice = string;

export type TestsLibColorHexToLightnessBlue = number;

export type TestsLibColorHexToLightnessNormalizedRed = number;

export type TestsLibColorHexToLightnessNormalizedGreen = number;

export type TestsLibColorHexToLightnessNormalizedBlue = number;

export type TestsLibColorHexToLightnessChannelMax = number;

export type TestsLibColorHexToLightnessChannelMin = number;
