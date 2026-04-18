import { ok, strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Color } from '../../lib/color.js';

import type {
  TestsLibColorEdgeCaseInstance,
  TestsLibColorEdgeCaseScale,
  TestsLibColorEdgeCaseShadeKeys,
  TestsLibColorGenerateScaleAnchorHex,
  TestsLibColorGenerateScaleAnchorLightness,
  TestsLibColorGenerateScaleBlueDiff,
  TestsLibColorGenerateScaleDarkerHex,
  TestsLibColorGenerateScaleDarkerLightness,
  TestsLibColorGenerateScaleExpectedLevel,
  TestsLibColorGenerateScaleGreenDiff,
  TestsLibColorGenerateScaleInputBlue,
  TestsLibColorGenerateScaleInputBlueString,
  TestsLibColorGenerateScaleInputGreen,
  TestsLibColorGenerateScaleInputGreenString,
  TestsLibColorGenerateScaleInputRed,
  TestsLibColorGenerateScaleInputRedString,
  TestsLibColorGenerateScaleInstance,
  TestsLibColorGenerateScaleLighterHex,
  TestsLibColorGenerateScaleLighterLightness,
  TestsLibColorGenerateScaleRedDiff,
  TestsLibColorGenerateScaleResult,
  TestsLibColorGenerateScaleShade600,
  TestsLibColorGenerateScaleShade600Blue,
  TestsLibColorGenerateScaleShade600BlueSlice,
  TestsLibColorGenerateScaleShade600Green,
  TestsLibColorGenerateScaleShade600GreenSlice,
  TestsLibColorGenerateScaleShade600Red,
  TestsLibColorGenerateScaleShade600RedSlice,
  TestsLibColorGenerateScaleShadeKeys,
  TestsLibColorHexToLightnessBlue,
  TestsLibColorHexToLightnessBlueSlice,
  TestsLibColorHexToLightnessChannelMax,
  TestsLibColorHexToLightnessChannelMin,
  TestsLibColorHexToLightnessGreen,
  TestsLibColorHexToLightnessGreenSlice,
  TestsLibColorHexToLightnessHex,
  TestsLibColorHexToLightnessNormalizedBlue,
  TestsLibColorHexToLightnessNormalizedGreen,
  TestsLibColorHexToLightnessNormalizedRed,
  TestsLibColorHexToLightnessRed,
  TestsLibColorHexToLightnessRedSlice,
  TestsLibColorHexToLightnessReturns,
  TestsLibColorInstance,
} from '../../types/tests/lib/color.test.d.ts';

/**
 * Tests - Lib - Color - Color Constructor.
 *
 * @since 0.15.0
 */
describe('Color constructor', async () => {
  it('accepts a valid six-digit hex color', () => {
    const instance: TestsLibColorInstance = new Color('#3B82F6');

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
    const instance: TestsLibColorInstance = new Color('#3b82f6');

    ok(instance);

    return;
  });

  it('accepts mixed-case hex characters', () => {
    const instance: TestsLibColorInstance = new Color('#3b82F6');

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
    const instance: TestsLibColorGenerateScaleInstance = new Color('#3B82F6');
    const result: TestsLibColorGenerateScaleResult = instance.generateScale();
    const shadeKeys: TestsLibColorGenerateScaleShadeKeys = Object.keys(result);
    const expectedLevel50: TestsLibColorGenerateScaleExpectedLevel = 50;
    const expectedLevel100: TestsLibColorGenerateScaleExpectedLevel = 100;
    const expectedLevel200: TestsLibColorGenerateScaleExpectedLevel = 200;
    const expectedLevel300: TestsLibColorGenerateScaleExpectedLevel = 300;
    const expectedLevel400: TestsLibColorGenerateScaleExpectedLevel = 400;
    const expectedLevel500: TestsLibColorGenerateScaleExpectedLevel = 500;
    const expectedLevel600: TestsLibColorGenerateScaleExpectedLevel = 600;
    const expectedLevel700: TestsLibColorGenerateScaleExpectedLevel = 700;
    const expectedLevel800: TestsLibColorGenerateScaleExpectedLevel = 800;
    const expectedLevel900: TestsLibColorGenerateScaleExpectedLevel = 900;
    const expectedLevel950: TestsLibColorGenerateScaleExpectedLevel = 950;

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
    const instance: TestsLibColorGenerateScaleInstance = new Color('#3B82F6');
    const result: TestsLibColorGenerateScaleResult = instance.generateScale();
    const shade600: TestsLibColorGenerateScaleShade600 = result[600];
    const shade600RedSlice: TestsLibColorGenerateScaleShade600RedSlice = shade600.slice(1, 3);
    const shade600Red: TestsLibColorGenerateScaleShade600Red = parseInt(shade600RedSlice, 16);
    const shade600GreenSlice: TestsLibColorGenerateScaleShade600GreenSlice = shade600.slice(3, 5);
    const shade600Green: TestsLibColorGenerateScaleShade600Green = parseInt(shade600GreenSlice, 16);
    const shade600BlueSlice: TestsLibColorGenerateScaleShade600BlueSlice = shade600.slice(5, 7);
    const shade600Blue: TestsLibColorGenerateScaleShade600Blue = parseInt(shade600BlueSlice, 16);
    const inputRedString: TestsLibColorGenerateScaleInputRedString = '3B';
    const inputRed: TestsLibColorGenerateScaleInputRed = parseInt(inputRedString, 16);
    const inputGreenString: TestsLibColorGenerateScaleInputGreenString = '82';
    const inputGreen: TestsLibColorGenerateScaleInputGreen = parseInt(inputGreenString, 16);
    const inputBlueString: TestsLibColorGenerateScaleInputBlueString = 'F6';
    const inputBlue: TestsLibColorGenerateScaleInputBlue = parseInt(inputBlueString, 16);
    const redDiff: TestsLibColorGenerateScaleRedDiff = Math.abs(shade600Red - inputRed);
    const greenDiff: TestsLibColorGenerateScaleGreenDiff = Math.abs(shade600Green - inputGreen);
    const blueDiff: TestsLibColorGenerateScaleBlueDiff = Math.abs(shade600Blue - inputBlue);

    ok(redDiff < 30);
    ok(greenDiff < 30);
    ok(blueDiff < 30);

    return;
  });

  it('lighter shades have higher lightness than shade 600', () => {
    const instance: TestsLibColorGenerateScaleInstance = new Color('#3B82F6');
    const result: TestsLibColorGenerateScaleResult = instance.generateScale();
    const anchorHex: TestsLibColorGenerateScaleAnchorHex = result[600];
    const anchorLightness: TestsLibColorGenerateScaleAnchorLightness = hexToLightness(anchorHex);
    const lighterHex: TestsLibColorGenerateScaleLighterHex = result[50];
    const lighterLightness: TestsLibColorGenerateScaleLighterLightness = hexToLightness(lighterHex);

    ok(lighterLightness > anchorLightness);

    return;
  });

  it('darker shades have lower lightness than shade 600', () => {
    const instance: TestsLibColorGenerateScaleInstance = new Color('#3B82F6');
    const result: TestsLibColorGenerateScaleResult = instance.generateScale();
    const anchorHex: TestsLibColorGenerateScaleAnchorHex = result[600];
    const anchorLightness: TestsLibColorGenerateScaleAnchorLightness = hexToLightness(anchorHex);
    const darkerHex: TestsLibColorGenerateScaleDarkerHex = result[950];
    const darkerLightness: TestsLibColorGenerateScaleDarkerLightness = hexToLightness(darkerHex);

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
    const instance: TestsLibColorEdgeCaseInstance = new Color('#FF0000');
    const scale: TestsLibColorEdgeCaseScale = instance.generateScale();
    const shadeKeys: TestsLibColorEdgeCaseShadeKeys = Object.keys(scale);

    strictEqual(shadeKeys.length, 11);

    return;
  });

  it('handles pure white', () => {
    const instance: TestsLibColorEdgeCaseInstance = new Color('#FFFFFF');
    const scale: TestsLibColorEdgeCaseScale = instance.generateScale();
    const shadeKeys: TestsLibColorEdgeCaseShadeKeys = Object.keys(scale);

    strictEqual(shadeKeys.length, 11);

    return;
  });

  it('handles pure black', () => {
    const instance: TestsLibColorEdgeCaseInstance = new Color('#000000');
    const scale: TestsLibColorEdgeCaseScale = instance.generateScale();
    const shadeKeys: TestsLibColorEdgeCaseShadeKeys = Object.keys(scale);

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
function hexToLightness(hex: TestsLibColorHexToLightnessHex): TestsLibColorHexToLightnessReturns {
  const redSlice: TestsLibColorHexToLightnessRedSlice = hex.slice(1, 3);
  const red: TestsLibColorHexToLightnessRed = parseInt(redSlice, 16);
  const greenSlice: TestsLibColorHexToLightnessGreenSlice = hex.slice(3, 5);
  const green: TestsLibColorHexToLightnessGreen = parseInt(greenSlice, 16);
  const blueSlice: TestsLibColorHexToLightnessBlueSlice = hex.slice(5, 7);
  const blue: TestsLibColorHexToLightnessBlue = parseInt(blueSlice, 16);
  const normalizedRed: TestsLibColorHexToLightnessNormalizedRed = red / 255;
  const normalizedGreen: TestsLibColorHexToLightnessNormalizedGreen = green / 255;
  const normalizedBlue: TestsLibColorHexToLightnessNormalizedBlue = blue / 255;
  const channelMax: TestsLibColorHexToLightnessChannelMax = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const channelMin: TestsLibColorHexToLightnessChannelMin = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

  return (channelMax + channelMin) / 2 * 100;
}
