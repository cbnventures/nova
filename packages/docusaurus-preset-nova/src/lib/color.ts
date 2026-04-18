import { LIB_REGEX_HEX_COLOR } from './regex.js';

import type {
  LibColorComputeShadeAdjustedSaturation,
  LibColorComputeShadeHue,
  LibColorComputeShadeLightness,
  LibColorComputeShadePosition,
  LibColorComputeShadeReturns,
  LibColorComputeShadeSaturation,
  LibColorComputeShadeSaturationFactor,
  LibColorComputeShadeTargetLightness,
  LibColorConstructorBlue,
  LibColorConstructorGreen,
  LibColorConstructorHex,
  LibColorConstructorHsl,
  LibColorConstructorIsValid,
  LibColorConstructorRed,
  LibColorGenerateScaleResult,
  LibColorGenerateScaleReturns,
  LibColorGenerateScaleShadeConfigEntry,
  LibColorGenerateScaleShadeConfigLevel,
  LibColorGenerateScaleShadeConfigPosition,
  LibColorGenerateScaleShadeConfigSaturationFactor,
  LibColorHslToHexBlueByte,
  LibColorHslToHexBlueHex,
  LibColorHslToHexChannelBlue,
  LibColorHslToHexChannelGreen,
  LibColorHslToHexChannelRed,
  LibColorHslToHexChroma,
  LibColorHslToHexGreenByte,
  LibColorHslToHexGreenHex,
  LibColorHslToHexHue,
  LibColorHslToHexHueSection,
  LibColorHslToHexLightness,
  LibColorHslToHexLightnessMatch,
  LibColorHslToHexNormalizedLightness,
  LibColorHslToHexNormalizedSaturation,
  LibColorHslToHexRedByte,
  LibColorHslToHexRedHex,
  LibColorHslToHexReturns,
  LibColorHslToHexSaturation,
  LibColorHslToHexSecondaryChroma,
  LibColorHue,
  LibColorLightness,
  LibColorRgbToHslBlue,
  LibColorRgbToHslChannelMax,
  LibColorRgbToHslChannelMin,
  LibColorRgbToHslDelta,
  LibColorRgbToHslGreen,
  LibColorRgbToHslHue,
  LibColorRgbToHslLightness,
  LibColorRgbToHslLightnessNormalized,
  LibColorRgbToHslNormalizedBlue,
  LibColorRgbToHslNormalizedGreen,
  LibColorRgbToHslNormalizedRed,
  LibColorRgbToHslRed,
  LibColorRgbToHslReturns,
  LibColorRgbToHslSaturation,
  LibColorRgbToHslSaturationDenominator,
  LibColorSaturation,
  LibColorShadeConfig,
} from '../types/lib/color.d.ts';

/**
 * Lib - Color.
 *
 * Parses a hex color string into HSL components and generates an eleven-shade color
 * scale suitable for design token consumption.
 *
 * @since 0.15.0
 */
export class Color {
  /**
   * Lib - Color - Hue.
   *
   * Stores the hue component extracted from the input hex color after converting
   * through the RGB-to-HSL pipeline.
   *
   * @private
   *
   * @since 0.15.0
   */
  readonly #hue: LibColorHue;

  /**
   * Lib - Color - Lightness.
   *
   * Stores the lightness component extracted from the input hex color after converting
   * through the RGB-to-HSL pipeline.
   *
   * @private
   *
   * @since 0.15.0
   */
  readonly #lightness: LibColorLightness;

  /**
   * Lib - Color - Saturation.
   *
   * Stores the saturation component extracted from the input hex color after converting
   * through the RGB-to-HSL pipeline.
   *
   * @private
   *
   * @since 0.15.0
   */
  readonly #saturation: LibColorSaturation;

  /**
   * Lib - Color - Shade Config.
   *
   * Maps each shade level to a position offset and saturation adjustment factor used
   * by computeShade to derive the full color scale.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #shadeConfig: LibColorShadeConfig = [
    [
      50,
      0.93,
      0.40,
    ],
    [
      100,
      0.86,
      0.55,
    ],
    [
      200,
      0.73,
      0.70,
    ],
    [
      300,
      0.58,
      0.82,
    ],
    [
      400,
      0.39,
      0.92,
    ],
    [
      500,
      0.20,
      0.98,
    ],
    [
      600,
      0,
      1.00,
    ],
    [
      700,
      -0.28,
      0.95,
    ],
    [
      800,
      -0.50,
      0.90,
    ],
    [
      900,
      -0.66,
      0.85,
    ],
    [
      950,
      -0.80,
      0.80,
    ],
  ];

  /**
   * Lib - Color - Constructor.
   *
   * Validates the hex string against the six-digit hex color pattern then parses
   * the red, green, and blue channels into an HSL representation.
   *
   * @param hex - Hex.
   * @since 0.15.0
   */
  public constructor(hex: LibColorConstructorHex) {
    const isValid: LibColorConstructorIsValid = LIB_REGEX_HEX_COLOR.test(hex);

    if (isValid === false) {
      throw new Error(`Invalid hex color: ${hex}`);
    }

    const red: LibColorConstructorRed = parseInt(hex.slice(1, 3), 16);
    const green: LibColorConstructorGreen = parseInt(hex.slice(3, 5), 16);
    const blue: LibColorConstructorBlue = parseInt(hex.slice(5, 7), 16);
    const hsl: LibColorConstructorHsl = Color.rgbToHsl(red, green, blue);

    this.#hue = hsl['hue'];
    this.#saturation = hsl['saturation'];
    this.#lightness = hsl['lightness'];

    return;
  }

  /**
   * Lib - Color - Compute Shade.
   *
   * Calculates the target lightness and adjusted saturation for a single shade level then
   * delegates to hslToHex for the final hex string.
   *
   * @param hue              - Hue.
   * @param saturation       - Saturation.
   * @param lightness        - Lightness.
   * @param position         - Position.
   * @param saturationFactor - Saturation factor.
   * @returns                Compute shade.
   *
   * @private
   *
   * @since 0.15.0
   */
  private static computeShade(hue: LibColorComputeShadeHue, saturation: LibColorComputeShadeSaturation, lightness: LibColorComputeShadeLightness, position: LibColorComputeShadePosition, saturationFactor: LibColorComputeShadeSaturationFactor): LibColorComputeShadeReturns {
    let targetLightness: LibColorComputeShadeTargetLightness = 0;

    if (position >= 0) {
      targetLightness = lightness + (position * (100 - lightness));
    } else {
      targetLightness = lightness * (1 + position);
    }

    const adjustedSaturation: LibColorComputeShadeAdjustedSaturation = saturation * saturationFactor;

    return Color.hslToHex(hue, adjustedSaturation, targetLightness);
  }

  /**
   * Lib - Color - Generate Scale.
   *
   * Iterates over the shade configuration to produce an eleven-shade color scale keyed
   * by shade level from 50 through 950.
   *
   * @returns Generate scale.
   * @since 0.15.0
   */
  public generateScale(): LibColorGenerateScaleReturns {
    const result: LibColorGenerateScaleResult = {} as LibColorGenerateScaleResult;

    for (let i = 0; i < Color.#shadeConfig.length; i += 1) {
      const shadeConfigEntry: LibColorGenerateScaleShadeConfigEntry = Color.#shadeConfig[i];

      if (shadeConfigEntry === undefined) {
        continue;
      }

      const shadeConfigLevel: LibColorGenerateScaleShadeConfigLevel = shadeConfigEntry[0];
      const shadeConfigPosition: LibColorGenerateScaleShadeConfigPosition = shadeConfigEntry[1];
      const shadeConfigSaturationFactor: LibColorGenerateScaleShadeConfigSaturationFactor = shadeConfigEntry[2];

      Reflect.set(result, shadeConfigLevel, Color.computeShade(this.#hue, this.#saturation, this.#lightness, shadeConfigPosition, shadeConfigSaturationFactor));
    }

    return result;
  }

  /**
   * Lib - Color - Hsl To Hex.
   *
   * Converts hue, saturation, and lightness values into a six-digit hex color string
   * using the standard chroma-based RGB conversion algorithm.
   *
   * @param hue        - Hue.
   * @param saturation - Saturation.
   * @param lightness  - Lightness.
   * @returns          Hsl to hex.
   *
   * @private
   *
   * @since 0.15.0
   */
  private static hslToHex(hue: LibColorHslToHexHue, saturation: LibColorHslToHexSaturation, lightness: LibColorHslToHexLightness): LibColorHslToHexReturns {
    const normalizedSaturation: LibColorHslToHexNormalizedSaturation = saturation / 100;
    const normalizedLightness: LibColorHslToHexNormalizedLightness = lightness / 100;
    const chroma: LibColorHslToHexChroma = (1 - Math.abs((2 * normalizedLightness) - 1)) * normalizedSaturation;
    const hueSection: LibColorHslToHexHueSection = hue / 60;
    const secondaryChroma: LibColorHslToHexSecondaryChroma = chroma * (1 - Math.abs((hueSection % 2) - 1));
    const lightnessMatch: LibColorHslToHexLightnessMatch = normalizedLightness - (chroma / 2);

    let channelRed: LibColorHslToHexChannelRed = 0;
    let channelGreen: LibColorHslToHexChannelGreen = 0;
    let channelBlue: LibColorHslToHexChannelBlue = 0;

    if (hueSection >= 0 && hueSection < 1) {
      channelRed = chroma;
      channelGreen = secondaryChroma;
      channelBlue = 0;
    } else if (hueSection >= 1 && hueSection < 2) {
      channelRed = secondaryChroma;
      channelGreen = chroma;
      channelBlue = 0;
    } else if (hueSection >= 2 && hueSection < 3) {
      channelRed = 0;
      channelGreen = chroma;
      channelBlue = secondaryChroma;
    } else if (hueSection >= 3 && hueSection < 4) {
      channelRed = 0;
      channelGreen = secondaryChroma;
      channelBlue = chroma;
    } else if (hueSection >= 4 && hueSection < 5) {
      channelRed = secondaryChroma;
      channelGreen = 0;
      channelBlue = chroma;
    } else if (hueSection >= 5 && hueSection < 6) {
      channelRed = chroma;
      channelGreen = 0;
      channelBlue = secondaryChroma;
    }

    const redByte: LibColorHslToHexRedByte = Math.round((channelRed + lightnessMatch) * 255);
    const greenByte: LibColorHslToHexGreenByte = Math.round((channelGreen + lightnessMatch) * 255);
    const blueByte: LibColorHslToHexBlueByte = Math.round((channelBlue + lightnessMatch) * 255);
    const redHex: LibColorHslToHexRedHex = redByte.toString(16).padStart(2, '0');
    const greenHex: LibColorHslToHexGreenHex = greenByte.toString(16).padStart(2, '0');
    const blueHex: LibColorHslToHexBlueHex = blueByte.toString(16).padStart(2, '0');

    return `#${redHex}${greenHex}${blueHex}`;
  }

  /**
   * Lib - Color - Rgb To Hsl.
   *
   * Converts red, green, and blue channel values in the 0-255 range into hue, saturation,
   * and lightness percentages for internal storage.
   *
   * @param red   - Red.
   * @param green - Green.
   * @param blue  - Blue.
   * @returns     Rgb to hsl.
   *
   * @private
   *
   * @since 0.15.0
   */
  private static rgbToHsl(red: LibColorRgbToHslRed, green: LibColorRgbToHslGreen, blue: LibColorRgbToHslBlue): LibColorRgbToHslReturns {
    const normalizedRed: LibColorRgbToHslNormalizedRed = red / 255;
    const normalizedGreen: LibColorRgbToHslNormalizedGreen = green / 255;
    const normalizedBlue: LibColorRgbToHslNormalizedBlue = blue / 255;
    const channelMax: LibColorRgbToHslChannelMax = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
    const channelMin: LibColorRgbToHslChannelMin = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
    const delta: LibColorRgbToHslDelta = channelMax - channelMin;
    const lightnessNormalized: LibColorRgbToHslLightnessNormalized = (channelMax + channelMin) / 2;
    const lightness: LibColorRgbToHslLightness = lightnessNormalized * 100;

    let saturation: LibColorRgbToHslSaturation = 0;

    if (delta !== 0) {
      const saturationDenominator: LibColorRgbToHslSaturationDenominator = 1 - Math.abs((2 * lightnessNormalized) - 1);

      saturation = (delta / saturationDenominator) * 100;
    }

    let hue: LibColorRgbToHslHue = 0;

    if (delta !== 0) {
      if (channelMax === normalizedRed) {
        hue = 60 * (((normalizedGreen - normalizedBlue) / delta) % 6);
      } else if (channelMax === normalizedGreen) {
        hue = 60 * (((normalizedBlue - normalizedRed) / delta) + 2);
      } else {
        hue = 60 * (((normalizedRed - normalizedGreen) / delta) + 4);
      }
    }

    if (hue < 0) {
      hue += 360;
    }

    return {
      hue,
      saturation,
      lightness,
    };
  }
}
