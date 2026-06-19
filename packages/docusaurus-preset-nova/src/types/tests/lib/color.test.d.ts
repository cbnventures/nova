import type { Runner as Color } from '../../../lib/color.js';

/**
 * Tests - Lib - Color - Color Constructor - Accepts A Valid Six Digit Hex Color.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorConstructor_AcceptsAValidSixDigitHexColor_Instance = Color;

/**
 * Tests - Lib - Color - Color Constructor - Accepts Lowercase Hex Characters.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorConstructor_AcceptsLowercaseHexCharacters_Instance = Color;

/**
 * Tests - Lib - Color - Color Constructor - Accepts Mixed Case Hex Characters.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorConstructor_AcceptsMixedCaseHexCharacters_Instance = Color;

/**
 * Tests - Lib - Color - Color Constructor - Rejects A Hex Color With Invalid Characters.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorConstructor_RejectsAHexColorWithInvalidCharacters_Input = string;

/**
 * Tests - Lib - Color - Color Constructor - Rejects A Hex Color Without A Leading Hash.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorConstructor_RejectsAHexColorWithoutALeadingHash_Input = string;

/**
 * Tests - Lib - Color - Color Constructor - Rejects A Short Hex Color.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorConstructor_RejectsAShortHexColor_Input = string;

/**
 * Tests - Lib - Color - Color Edge Cases - Handles Pure Black.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorEdgeCases_HandlesPureBlack_Instance = Color;

export type Tests_Lib_Color_ColorEdgeCases_HandlesPureBlack_Scale = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Tests_Lib_Color_ColorEdgeCases_HandlesPureBlack_ShadeKeys = string[];

/**
 * Tests - Lib - Color - Color Edge Cases - Handles Pure Red.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorEdgeCases_HandlesPureRed_Instance = Color;

export type Tests_Lib_Color_ColorEdgeCases_HandlesPureRed_Scale = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Tests_Lib_Color_ColorEdgeCases_HandlesPureRed_ShadeKeys = string[];

/**
 * Tests - Lib - Color - Color Edge Cases - Handles Pure White.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorEdgeCases_HandlesPureWhite_Instance = Color;

export type Tests_Lib_Color_ColorEdgeCases_HandlesPureWhite_Scale = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Tests_Lib_Color_ColorEdgeCases_HandlesPureWhite_ShadeKeys = string[];

/**
 * Tests - Lib - Color - Color GenerateScale - Darker Shades Have Lower Lightness Than Shade 600.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_Instance = Color;

export type Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_Result = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_AnchorHex = string;

export type Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_AnchorLightness = number;

export type Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_DarkerHex = string;

export type Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_DarkerLightness = number;

/**
 * Tests - Lib - Color - Color GenerateScale - Lighter Shades Have Higher Lightness Than Shade 600.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_Instance = Color;

export type Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_Result = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_AnchorHex = string;

export type Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_AnchorLightness = number;

export type Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_LighterHex = string;

export type Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_LighterLightness = number;

/**
 * Tests - Lib - Color - Color GenerateScale - Returns All Eleven Shade Levels.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_Instance = Color;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_Result = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ShadeKeys = string[];

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel50 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel100 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel200 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel300 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel400 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel500 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel600 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel700 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel800 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel900 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel950 = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/**
 * Tests - Lib - Color - Color GenerateScale - Shade 600 Approximates The Input Color.
 *
 * @since 0.15.0
 */
export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Instance = Color;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Result = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950, string>;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600 = string;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600RedSlice = string;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600Red = number;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600GreenSlice = string;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600Green = number;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600BlueSlice = string;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600Blue = number;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputRedString = string;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputRed = number;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputGreenString = string;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputGreen = number;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputBlueString = string;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputBlue = number;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_RedDiff = number;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_GreenDiff = number;

export type Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_BlueDiff = number;

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
