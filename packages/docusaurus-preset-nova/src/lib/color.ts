import { LIB_REGEX_HEX_COLOR } from './regex.js';

import type {
  Lib_Color_Runner_ComputeShade_AdjustedSaturation,
  Lib_Color_Runner_ComputeShade_Hue,
  Lib_Color_Runner_ComputeShade_Lightness,
  Lib_Color_Runner_ComputeShade_Position,
  Lib_Color_Runner_ComputeShade_Returns,
  Lib_Color_Runner_ComputeShade_Saturation,
  Lib_Color_Runner_ComputeShade_SaturationFactor,
  Lib_Color_Runner_ComputeShade_TargetLightness,
  Lib_Color_Runner_Constructor_Blue,
  Lib_Color_Runner_Constructor_Green,
  Lib_Color_Runner_Constructor_Hex,
  Lib_Color_Runner_Constructor_Hsl,
  Lib_Color_Runner_Constructor_IsValid,
  Lib_Color_Runner_Constructor_Red,
  Lib_Color_Runner_GenerateScale_Result,
  Lib_Color_Runner_GenerateScale_Returns,
  Lib_Color_Runner_GenerateScale_ShadeConfigEntry,
  Lib_Color_Runner_GenerateScale_ShadeConfigLevel,
  Lib_Color_Runner_GenerateScale_ShadeConfigPosition,
  Lib_Color_Runner_GenerateScale_ShadeConfigSaturationFactor,
  Lib_Color_Runner_HslToHex_BlueByte,
  Lib_Color_Runner_HslToHex_BlueHex,
  Lib_Color_Runner_HslToHex_ChannelBlue,
  Lib_Color_Runner_HslToHex_ChannelGreen,
  Lib_Color_Runner_HslToHex_ChannelRed,
  Lib_Color_Runner_HslToHex_Chroma,
  Lib_Color_Runner_HslToHex_GreenByte,
  Lib_Color_Runner_HslToHex_GreenHex,
  Lib_Color_Runner_HslToHex_Hue,
  Lib_Color_Runner_HslToHex_HueSection,
  Lib_Color_Runner_HslToHex_Lightness,
  Lib_Color_Runner_HslToHex_LightnessMatch,
  Lib_Color_Runner_HslToHex_NormalizedLightness,
  Lib_Color_Runner_HslToHex_NormalizedSaturation,
  Lib_Color_Runner_HslToHex_RedByte,
  Lib_Color_Runner_HslToHex_RedHex,
  Lib_Color_Runner_HslToHex_Returns,
  Lib_Color_Runner_HslToHex_Saturation,
  Lib_Color_Runner_HslToHex_SecondaryChroma,
  Lib_Color_Hue,
  Lib_Color_Lightness,
  Lib_Color_Runner_RgbToHsl_Blue,
  Lib_Color_Runner_RgbToHsl_ChannelMax,
  Lib_Color_Runner_RgbToHsl_ChannelMin,
  Lib_Color_Runner_RgbToHsl_Delta,
  Lib_Color_Runner_RgbToHsl_Green,
  Lib_Color_Runner_RgbToHsl_Hue,
  Lib_Color_Runner_RgbToHsl_Lightness,
  Lib_Color_Runner_RgbToHsl_LightnessNormalized,
  Lib_Color_Runner_RgbToHsl_NormalizedBlue,
  Lib_Color_Runner_RgbToHsl_NormalizedGreen,
  Lib_Color_Runner_RgbToHsl_NormalizedRed,
  Lib_Color_Runner_RgbToHsl_Red,
  Lib_Color_Runner_RgbToHsl_Returns,
  Lib_Color_Runner_RgbToHsl_Saturation,
  Lib_Color_Runner_RgbToHsl_SaturationDenominator,
  Lib_Color_Saturation,
  Lib_Color_ShadeConfig,
} from '../types/lib/color.d.ts';

/**
 * Lib - Color.
 *
 * Parses a hex color string into HSL components and generates an eleven-shade color
 * scale suitable for design token consumption.
 *
 * @since 0.15.0
 */
export class Runner {
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
  readonly #hue: Lib_Color_Hue;

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
  readonly #lightness: Lib_Color_Lightness;

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
  readonly #saturation: Lib_Color_Saturation;

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
  static readonly #shadeConfig: Lib_Color_ShadeConfig = [
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
  public constructor(hex: Lib_Color_Runner_Constructor_Hex) {
    const isValid: Lib_Color_Runner_Constructor_IsValid = LIB_REGEX_HEX_COLOR.test(hex);

    if (isValid === false) {
      throw new Error(`Invalid hex color: ${hex}`);
    }

    const red: Lib_Color_Runner_Constructor_Red = parseInt(hex.slice(1, 3), 16);
    const green: Lib_Color_Runner_Constructor_Green = parseInt(hex.slice(3, 5), 16);
    const blue: Lib_Color_Runner_Constructor_Blue = parseInt(hex.slice(5, 7), 16);
    const hsl: Lib_Color_Runner_Constructor_Hsl = Runner.rgbToHsl(red, green, blue);

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
  private static computeShade(hue: Lib_Color_Runner_ComputeShade_Hue, saturation: Lib_Color_Runner_ComputeShade_Saturation, lightness: Lib_Color_Runner_ComputeShade_Lightness, position: Lib_Color_Runner_ComputeShade_Position, saturationFactor: Lib_Color_Runner_ComputeShade_SaturationFactor): Lib_Color_Runner_ComputeShade_Returns {
    let targetLightness: Lib_Color_Runner_ComputeShade_TargetLightness = 0;

    if (position >= 0) {
      targetLightness = lightness + (position * (100 - lightness));
    } else {
      targetLightness = lightness * (1 + position);
    }

    const adjustedSaturation: Lib_Color_Runner_ComputeShade_AdjustedSaturation = saturation * saturationFactor;

    return Runner.hslToHex(hue, adjustedSaturation, targetLightness);
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
  public generateScale(): Lib_Color_Runner_GenerateScale_Returns {
    const result: Lib_Color_Runner_GenerateScale_Result = {} as Lib_Color_Runner_GenerateScale_Result;

    for (let i = 0; i < Runner.#shadeConfig.length; i += 1) {
      const shadeConfigEntry: Lib_Color_Runner_GenerateScale_ShadeConfigEntry = Runner.#shadeConfig[i];

      if (shadeConfigEntry === undefined) {
        continue;
      }

      const shadeConfigLevel: Lib_Color_Runner_GenerateScale_ShadeConfigLevel = shadeConfigEntry[0];
      const shadeConfigPosition: Lib_Color_Runner_GenerateScale_ShadeConfigPosition = shadeConfigEntry[1];
      const shadeConfigSaturationFactor: Lib_Color_Runner_GenerateScale_ShadeConfigSaturationFactor = shadeConfigEntry[2];

      Reflect.set(result, shadeConfigLevel, Runner.computeShade(this.#hue, this.#saturation, this.#lightness, shadeConfigPosition, shadeConfigSaturationFactor));
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
  private static hslToHex(hue: Lib_Color_Runner_HslToHex_Hue, saturation: Lib_Color_Runner_HslToHex_Saturation, lightness: Lib_Color_Runner_HslToHex_Lightness): Lib_Color_Runner_HslToHex_Returns {
    const normalizedSaturation: Lib_Color_Runner_HslToHex_NormalizedSaturation = saturation / 100;
    const normalizedLightness: Lib_Color_Runner_HslToHex_NormalizedLightness = lightness / 100;
    const chroma: Lib_Color_Runner_HslToHex_Chroma = (1 - Math.abs((2 * normalizedLightness) - 1)) * normalizedSaturation;
    const hueSection: Lib_Color_Runner_HslToHex_HueSection = hue / 60;
    const secondaryChroma: Lib_Color_Runner_HslToHex_SecondaryChroma = chroma * (1 - Math.abs((hueSection % 2) - 1));
    const lightnessMatch: Lib_Color_Runner_HslToHex_LightnessMatch = normalizedLightness - (chroma / 2);

    let channelRed: Lib_Color_Runner_HslToHex_ChannelRed = 0;
    let channelGreen: Lib_Color_Runner_HslToHex_ChannelGreen = 0;
    let channelBlue: Lib_Color_Runner_HslToHex_ChannelBlue = 0;

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

    const redByte: Lib_Color_Runner_HslToHex_RedByte = Math.round((channelRed + lightnessMatch) * 255);
    const greenByte: Lib_Color_Runner_HslToHex_GreenByte = Math.round((channelGreen + lightnessMatch) * 255);
    const blueByte: Lib_Color_Runner_HslToHex_BlueByte = Math.round((channelBlue + lightnessMatch) * 255);
    const redHex: Lib_Color_Runner_HslToHex_RedHex = redByte.toString(16).padStart(2, '0');
    const greenHex: Lib_Color_Runner_HslToHex_GreenHex = greenByte.toString(16).padStart(2, '0');
    const blueHex: Lib_Color_Runner_HslToHex_BlueHex = blueByte.toString(16).padStart(2, '0');

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
  private static rgbToHsl(red: Lib_Color_Runner_RgbToHsl_Red, green: Lib_Color_Runner_RgbToHsl_Green, blue: Lib_Color_Runner_RgbToHsl_Blue): Lib_Color_Runner_RgbToHsl_Returns {
    const normalizedRed: Lib_Color_Runner_RgbToHsl_NormalizedRed = red / 255;
    const normalizedGreen: Lib_Color_Runner_RgbToHsl_NormalizedGreen = green / 255;
    const normalizedBlue: Lib_Color_Runner_RgbToHsl_NormalizedBlue = blue / 255;
    const channelMax: Lib_Color_Runner_RgbToHsl_ChannelMax = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
    const channelMin: Lib_Color_Runner_RgbToHsl_ChannelMin = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
    const delta: Lib_Color_Runner_RgbToHsl_Delta = channelMax - channelMin;
    const lightnessNormalized: Lib_Color_Runner_RgbToHsl_LightnessNormalized = (channelMax + channelMin) / 2;
    const lightness: Lib_Color_Runner_RgbToHsl_Lightness = lightnessNormalized * 100;

    let saturation: Lib_Color_Runner_RgbToHsl_Saturation = 0;

    if (delta !== 0) {
      const saturationDenominator: Lib_Color_Runner_RgbToHsl_SaturationDenominator = 1 - Math.abs((2 * lightnessNormalized) - 1);

      saturation = (delta / saturationDenominator) * 100;
    }

    let hue: Lib_Color_Runner_RgbToHsl_Hue = 0;

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
