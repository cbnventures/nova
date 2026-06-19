import { ok, strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as Color } from '../../lib/color.js';

import type {
  Tests_Lib_Color_ColorConstructor_AcceptsAValidSixDigitHexColor_Instance,
  Tests_Lib_Color_ColorConstructor_AcceptsLowercaseHexCharacters_Instance,
  Tests_Lib_Color_ColorConstructor_AcceptsMixedCaseHexCharacters_Instance,
  Tests_Lib_Color_ColorEdgeCases_HandlesPureBlack_Instance,
  Tests_Lib_Color_ColorEdgeCases_HandlesPureBlack_Scale,
  Tests_Lib_Color_ColorEdgeCases_HandlesPureBlack_ShadeKeys,
  Tests_Lib_Color_ColorEdgeCases_HandlesPureRed_Instance,
  Tests_Lib_Color_ColorEdgeCases_HandlesPureRed_Scale,
  Tests_Lib_Color_ColorEdgeCases_HandlesPureRed_ShadeKeys,
  Tests_Lib_Color_ColorEdgeCases_HandlesPureWhite_Instance,
  Tests_Lib_Color_ColorEdgeCases_HandlesPureWhite_Scale,
  Tests_Lib_Color_ColorEdgeCases_HandlesPureWhite_ShadeKeys,
  Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_AnchorHex,
  Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_AnchorLightness,
  Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_DarkerHex,
  Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_DarkerLightness,
  Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_Instance,
  Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_Result,
  Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_AnchorHex,
  Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_AnchorLightness,
  Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_Instance,
  Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_LighterHex,
  Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_LighterLightness,
  Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_Result,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel100,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel200,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel300,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel400,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel50,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel500,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel600,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel700,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel800,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel900,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel950,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_Instance,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_Result,
  Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ShadeKeys,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_BlueDiff,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_GreenDiff,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputBlue,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputBlueString,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputGreen,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputGreenString,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputRed,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputRedString,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Instance,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_RedDiff,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Result,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600Blue,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600BlueSlice,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600Green,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600GreenSlice,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600Red,
  Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600RedSlice,
  Tests_Lib_Color_HexToLightness_Blue,
  Tests_Lib_Color_HexToLightness_BlueSlice,
  Tests_Lib_Color_HexToLightness_ChannelMax,
  Tests_Lib_Color_HexToLightness_ChannelMin,
  Tests_Lib_Color_HexToLightness_Green,
  Tests_Lib_Color_HexToLightness_GreenSlice,
  Tests_Lib_Color_HexToLightness_Hex,
  Tests_Lib_Color_HexToLightness_NormalizedBlue,
  Tests_Lib_Color_HexToLightness_NormalizedGreen,
  Tests_Lib_Color_HexToLightness_NormalizedRed,
  Tests_Lib_Color_HexToLightness_Red,
  Tests_Lib_Color_HexToLightness_RedSlice,
  Tests_Lib_Color_HexToLightness_Returns,
} from '../../types/tests/lib/color.test.d.ts';

/**
 * Tests - Lib - Color - Color Constructor.
 *
 * @since 0.15.0
 */
describe('Color constructor', async () => {
  it('accepts a valid six-digit hex color', () => {
    const instance: Tests_Lib_Color_ColorConstructor_AcceptsAValidSixDigitHexColor_Instance = new Color('#3B82F6');

    ok(instance);

    return;
  });

  it('rejects a hex color without a leading hash', () => {
    throws(() => {
      void new Color('3B82F6');

      return;
    });

    return;
  });

  it('rejects a short hex color', () => {
    throws(() => {
      void new Color('#FFF');

      return;
    });

    return;
  });

  it('rejects a hex color with invalid characters', () => {
    throws(() => {
      void new Color('#ZZZZZZ');

      return;
    });

    return;
  });

  it('accepts lowercase hex characters', () => {
    const instance: Tests_Lib_Color_ColorConstructor_AcceptsLowercaseHexCharacters_Instance = new Color('#3b82f6');

    ok(instance);

    return;
  });

  it('accepts mixed-case hex characters', () => {
    const instance: Tests_Lib_Color_ColorConstructor_AcceptsMixedCaseHexCharacters_Instance = new Color('#3b82F6');

    ok(instance);

    return;
  });

  return;
});

/**
 * Tests - Lib - Color - Color GenerateScale.
 *
 * @since 0.15.0
 */
describe('Color generateScale', async () => {
  it('returns all eleven shade levels', () => {
    const instance: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_Instance = new Color('#3B82F6');
    const result: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_Result = instance.generateScale();
    const shadeKeys: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ShadeKeys = Object.keys(result);
    const expectedLevel50: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel50 = 50;
    const expectedLevel100: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel100 = 100;
    const expectedLevel200: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel200 = 200;
    const expectedLevel300: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel300 = 300;
    const expectedLevel400: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel400 = 400;
    const expectedLevel500: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel500 = 500;
    const expectedLevel600: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel600 = 600;
    const expectedLevel700: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel700 = 700;
    const expectedLevel800: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel800 = 800;
    const expectedLevel900: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel900 = 900;
    const expectedLevel950: Tests_Lib_Color_ColorGenerateScale_ReturnsAllElevenShadeLevels_ExpectedLevel950 = 950;

    strictEqual(shadeKeys.length, 11);
    ok(result[expectedLevel50] !== undefined);
    ok(result[expectedLevel100] !== undefined);
    ok(result[expectedLevel200] !== undefined);
    ok(result[expectedLevel300] !== undefined);
    ok(result[expectedLevel400] !== undefined);
    ok(result[expectedLevel500] !== undefined);
    ok(result[expectedLevel600] !== undefined);
    ok(result[expectedLevel700] !== undefined);
    ok(result[expectedLevel800] !== undefined);
    ok(result[expectedLevel900] !== undefined);
    ok(result[expectedLevel950] !== undefined);

    return;
  });

  it('shade 600 approximates the input color', () => {
    const instance: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Instance = new Color('#3B82F6');
    const result: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Result = instance.generateScale();
    const shade600: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600 = result[600];
    const shade600RedSlice: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600RedSlice = shade600.slice(1, 3);
    const shade600Red: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600Red = parseInt(shade600RedSlice, 16);
    const shade600GreenSlice: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600GreenSlice = shade600.slice(3, 5);
    const shade600Green: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600Green = parseInt(shade600GreenSlice, 16);
    const shade600BlueSlice: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600BlueSlice = shade600.slice(5, 7);
    const shade600Blue: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_Shade600Blue = parseInt(shade600BlueSlice, 16);
    const inputRedString: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputRedString = '3B';
    const inputRed: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputRed = parseInt(inputRedString, 16);
    const inputGreenString: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputGreenString = '82';
    const inputGreen: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputGreen = parseInt(inputGreenString, 16);
    const inputBlueString: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputBlueString = 'F6';
    const inputBlue: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_InputBlue = parseInt(inputBlueString, 16);
    const redDiff: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_RedDiff = Math.abs(shade600Red - inputRed);
    const greenDiff: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_GreenDiff = Math.abs(shade600Green - inputGreen);
    const blueDiff: Tests_Lib_Color_ColorGenerateScale_Shade600ApproximatesTheInputColor_BlueDiff = Math.abs(shade600Blue - inputBlue);

    ok(redDiff < 30);
    ok(greenDiff < 30);
    ok(blueDiff < 30);

    return;
  });

  it('lighter shades have higher lightness than shade 600', () => {
    const instance: Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_Instance = new Color('#3B82F6');
    const result: Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_Result = instance.generateScale();
    const anchorHex: Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_AnchorHex = result[600];
    const anchorLightness: Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_AnchorLightness = hexToLightness(anchorHex);
    const lighterHex: Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_LighterHex = result[50];
    const lighterLightness: Tests_Lib_Color_ColorGenerateScale_LighterShadesHaveHigherLightnessThanShade600_LighterLightness = hexToLightness(lighterHex);

    ok(lighterLightness > anchorLightness);

    return;
  });

  it('darker shades have lower lightness than shade 600', () => {
    const instance: Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_Instance = new Color('#3B82F6');
    const result: Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_Result = instance.generateScale();
    const anchorHex: Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_AnchorHex = result[600];
    const anchorLightness: Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_AnchorLightness = hexToLightness(anchorHex);
    const darkerHex: Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_DarkerHex = result[950];
    const darkerLightness: Tests_Lib_Color_ColorGenerateScale_DarkerShadesHaveLowerLightnessThanShade600_DarkerLightness = hexToLightness(darkerHex);

    ok(darkerLightness < anchorLightness);

    return;
  });

  return;
});

/**
 * Tests - Lib - Color - Color Edge Cases.
 *
 * @since 0.15.0
 */
describe('Color edge cases', async () => {
  it('handles pure red', () => {
    const instance: Tests_Lib_Color_ColorEdgeCases_HandlesPureRed_Instance = new Color('#FF0000');
    const scale: Tests_Lib_Color_ColorEdgeCases_HandlesPureRed_Scale = instance.generateScale();
    const shadeKeys: Tests_Lib_Color_ColorEdgeCases_HandlesPureRed_ShadeKeys = Object.keys(scale);

    strictEqual(shadeKeys.length, 11);

    return;
  });

  it('handles pure white', () => {
    const instance: Tests_Lib_Color_ColorEdgeCases_HandlesPureWhite_Instance = new Color('#FFFFFF');
    const scale: Tests_Lib_Color_ColorEdgeCases_HandlesPureWhite_Scale = instance.generateScale();
    const shadeKeys: Tests_Lib_Color_ColorEdgeCases_HandlesPureWhite_ShadeKeys = Object.keys(scale);

    strictEqual(shadeKeys.length, 11);

    return;
  });

  it('handles pure black', () => {
    const instance: Tests_Lib_Color_ColorEdgeCases_HandlesPureBlack_Instance = new Color('#000000');
    const scale: Tests_Lib_Color_ColorEdgeCases_HandlesPureBlack_Scale = instance.generateScale();
    const shadeKeys: Tests_Lib_Color_ColorEdgeCases_HandlesPureBlack_ShadeKeys = Object.keys(scale);

    strictEqual(shadeKeys.length, 11);

    return;
  });

  return;
});

/**
 * Tests - Lib - Color - Hex To Lightness.
 *
 * @param hex - Hex.
 * @returns   Hex to lightness.
 * @since 0.15.0
 */
function hexToLightness(hex: Tests_Lib_Color_HexToLightness_Hex): Tests_Lib_Color_HexToLightness_Returns {
  const redSlice: Tests_Lib_Color_HexToLightness_RedSlice = hex.slice(1, 3);
  const red: Tests_Lib_Color_HexToLightness_Red = parseInt(redSlice, 16);
  const greenSlice: Tests_Lib_Color_HexToLightness_GreenSlice = hex.slice(3, 5);
  const green: Tests_Lib_Color_HexToLightness_Green = parseInt(greenSlice, 16);
  const blueSlice: Tests_Lib_Color_HexToLightness_BlueSlice = hex.slice(5, 7);
  const blue: Tests_Lib_Color_HexToLightness_Blue = parseInt(blueSlice, 16);
  const normalizedRed: Tests_Lib_Color_HexToLightness_NormalizedRed = red / 255;
  const normalizedGreen: Tests_Lib_Color_HexToLightness_NormalizedGreen = green / 255;
  const normalizedBlue: Tests_Lib_Color_HexToLightness_NormalizedBlue = blue / 255;
  const channelMax: Tests_Lib_Color_HexToLightness_ChannelMax = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const channelMin: Tests_Lib_Color_HexToLightness_ChannelMin = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

  return (channelMax + channelMin) / 2 * 100;
}
