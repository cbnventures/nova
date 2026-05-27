import { ok, strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as Color } from '../../lib/color.js';

import type {
  Tests_Lib_Color_EdgeCaseInstance,
  Tests_Lib_Color_EdgeCaseScale,
  Tests_Lib_Color_EdgeCaseShadeKeys,
  Tests_Lib_Color_GenerateScaleAnchorHex,
  Tests_Lib_Color_GenerateScaleAnchorLightness,
  Tests_Lib_Color_GenerateScaleBlueDiff,
  Tests_Lib_Color_GenerateScaleDarkerHex,
  Tests_Lib_Color_GenerateScaleDarkerLightness,
  Tests_Lib_Color_GenerateScaleExpectedLevel,
  Tests_Lib_Color_GenerateScaleGreenDiff,
  Tests_Lib_Color_GenerateScaleInputBlue,
  Tests_Lib_Color_GenerateScaleInputBlueString,
  Tests_Lib_Color_GenerateScaleInputGreen,
  Tests_Lib_Color_GenerateScaleInputGreenString,
  Tests_Lib_Color_GenerateScaleInputRed,
  Tests_Lib_Color_GenerateScaleInputRedString,
  Tests_Lib_Color_GenerateScaleInstance,
  Tests_Lib_Color_GenerateScaleLighterHex,
  Tests_Lib_Color_GenerateScaleLighterLightness,
  Tests_Lib_Color_GenerateScaleRedDiff,
  Tests_Lib_Color_GenerateScaleResult,
  Tests_Lib_Color_GenerateScaleShade600,
  Tests_Lib_Color_GenerateScaleShade600Blue,
  Tests_Lib_Color_GenerateScaleShade600BlueSlice,
  Tests_Lib_Color_GenerateScaleShade600Green,
  Tests_Lib_Color_GenerateScaleShade600GreenSlice,
  Tests_Lib_Color_GenerateScaleShade600Red,
  Tests_Lib_Color_GenerateScaleShade600RedSlice,
  Tests_Lib_Color_GenerateScaleShadeKeys,
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
  Tests_Lib_Color_Instance,
} from '../../types/tests/lib/color.test.d.ts';

/**
 * Tests - Lib - Color - Color Constructor.
 *
 * @since 0.15.0
 */
describe('Color constructor', async () => {
  it('accepts a valid six-digit hex color', () => {
    const instance: Tests_Lib_Color_Instance = new Color('#3B82F6');

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
    const instance: Tests_Lib_Color_Instance = new Color('#3b82f6');

    ok(instance);

    return;
  });

  it('accepts mixed-case hex characters', () => {
    const instance: Tests_Lib_Color_Instance = new Color('#3b82F6');

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
    const instance: Tests_Lib_Color_GenerateScaleInstance = new Color('#3B82F6');
    const result: Tests_Lib_Color_GenerateScaleResult = instance.generateScale();
    const shadeKeys: Tests_Lib_Color_GenerateScaleShadeKeys = Object.keys(result);
    const expectedLevel50: Tests_Lib_Color_GenerateScaleExpectedLevel = 50;
    const expectedLevel100: Tests_Lib_Color_GenerateScaleExpectedLevel = 100;
    const expectedLevel200: Tests_Lib_Color_GenerateScaleExpectedLevel = 200;
    const expectedLevel300: Tests_Lib_Color_GenerateScaleExpectedLevel = 300;
    const expectedLevel400: Tests_Lib_Color_GenerateScaleExpectedLevel = 400;
    const expectedLevel500: Tests_Lib_Color_GenerateScaleExpectedLevel = 500;
    const expectedLevel600: Tests_Lib_Color_GenerateScaleExpectedLevel = 600;
    const expectedLevel700: Tests_Lib_Color_GenerateScaleExpectedLevel = 700;
    const expectedLevel800: Tests_Lib_Color_GenerateScaleExpectedLevel = 800;
    const expectedLevel900: Tests_Lib_Color_GenerateScaleExpectedLevel = 900;
    const expectedLevel950: Tests_Lib_Color_GenerateScaleExpectedLevel = 950;

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
    const instance: Tests_Lib_Color_GenerateScaleInstance = new Color('#3B82F6');
    const result: Tests_Lib_Color_GenerateScaleResult = instance.generateScale();
    const shade600: Tests_Lib_Color_GenerateScaleShade600 = result[600];
    const shade600RedSlice: Tests_Lib_Color_GenerateScaleShade600RedSlice = shade600.slice(1, 3);
    const shade600Red: Tests_Lib_Color_GenerateScaleShade600Red = parseInt(shade600RedSlice, 16);
    const shade600GreenSlice: Tests_Lib_Color_GenerateScaleShade600GreenSlice = shade600.slice(3, 5);
    const shade600Green: Tests_Lib_Color_GenerateScaleShade600Green = parseInt(shade600GreenSlice, 16);
    const shade600BlueSlice: Tests_Lib_Color_GenerateScaleShade600BlueSlice = shade600.slice(5, 7);
    const shade600Blue: Tests_Lib_Color_GenerateScaleShade600Blue = parseInt(shade600BlueSlice, 16);
    const inputRedString: Tests_Lib_Color_GenerateScaleInputRedString = '3B';
    const inputRed: Tests_Lib_Color_GenerateScaleInputRed = parseInt(inputRedString, 16);
    const inputGreenString: Tests_Lib_Color_GenerateScaleInputGreenString = '82';
    const inputGreen: Tests_Lib_Color_GenerateScaleInputGreen = parseInt(inputGreenString, 16);
    const inputBlueString: Tests_Lib_Color_GenerateScaleInputBlueString = 'F6';
    const inputBlue: Tests_Lib_Color_GenerateScaleInputBlue = parseInt(inputBlueString, 16);
    const redDiff: Tests_Lib_Color_GenerateScaleRedDiff = Math.abs(shade600Red - inputRed);
    const greenDiff: Tests_Lib_Color_GenerateScaleGreenDiff = Math.abs(shade600Green - inputGreen);
    const blueDiff: Tests_Lib_Color_GenerateScaleBlueDiff = Math.abs(shade600Blue - inputBlue);

    ok(redDiff < 30);
    ok(greenDiff < 30);
    ok(blueDiff < 30);

    return;
  });

  it('lighter shades have higher lightness than shade 600', () => {
    const instance: Tests_Lib_Color_GenerateScaleInstance = new Color('#3B82F6');
    const result: Tests_Lib_Color_GenerateScaleResult = instance.generateScale();
    const anchorHex: Tests_Lib_Color_GenerateScaleAnchorHex = result[600];
    const anchorLightness: Tests_Lib_Color_GenerateScaleAnchorLightness = hexToLightness(anchorHex);
    const lighterHex: Tests_Lib_Color_GenerateScaleLighterHex = result[50];
    const lighterLightness: Tests_Lib_Color_GenerateScaleLighterLightness = hexToLightness(lighterHex);

    ok(lighterLightness > anchorLightness);

    return;
  });

  it('darker shades have lower lightness than shade 600', () => {
    const instance: Tests_Lib_Color_GenerateScaleInstance = new Color('#3B82F6');
    const result: Tests_Lib_Color_GenerateScaleResult = instance.generateScale();
    const anchorHex: Tests_Lib_Color_GenerateScaleAnchorHex = result[600];
    const anchorLightness: Tests_Lib_Color_GenerateScaleAnchorLightness = hexToLightness(anchorHex);
    const darkerHex: Tests_Lib_Color_GenerateScaleDarkerHex = result[950];
    const darkerLightness: Tests_Lib_Color_GenerateScaleDarkerLightness = hexToLightness(darkerHex);

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
    const instance: Tests_Lib_Color_EdgeCaseInstance = new Color('#FF0000');
    const scale: Tests_Lib_Color_EdgeCaseScale = instance.generateScale();
    const shadeKeys: Tests_Lib_Color_EdgeCaseShadeKeys = Object.keys(scale);

    strictEqual(shadeKeys.length, 11);

    return;
  });

  it('handles pure white', () => {
    const instance: Tests_Lib_Color_EdgeCaseInstance = new Color('#FFFFFF');
    const scale: Tests_Lib_Color_EdgeCaseScale = instance.generateScale();
    const shadeKeys: Tests_Lib_Color_EdgeCaseShadeKeys = Object.keys(scale);

    strictEqual(shadeKeys.length, 11);

    return;
  });

  it('handles pure black', () => {
    const instance: Tests_Lib_Color_EdgeCaseInstance = new Color('#000000');
    const scale: Tests_Lib_Color_EdgeCaseScale = instance.generateScale();
    const shadeKeys: Tests_Lib_Color_EdgeCaseShadeKeys = Object.keys(scale);

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
