import type {
  SharedColorScale,
  SharedHexColor,
  SharedHslColor,
  SharedHslColorHue,
  SharedHslColorLightness,
  SharedHslColorSaturation,
  SharedShadeLevel,
} from '../shared.d.ts';

/**
 * Lib - Color - Compute Shade.
 *
 * @since 0.15.0
 */
export type LibColorComputeShadeHue = number;

export type LibColorComputeShadeSaturation = number;

export type LibColorComputeShadeLightness = number;

export type LibColorComputeShadePosition = number;

export type LibColorComputeShadeSaturationFactor = number;

export type LibColorComputeShadeReturns = SharedHexColor;

export type LibColorComputeShadeTargetLightness = number;

export type LibColorComputeShadeAdjustedSaturation = number;

/**
 * Lib - Color - Constructor.
 *
 * @since 0.15.0
 */
export type LibColorConstructorHex = string;

export type LibColorConstructorIsValid = boolean;

export type LibColorConstructorRedSlice = string;

export type LibColorConstructorRed = number;

export type LibColorConstructorGreenSlice = string;

export type LibColorConstructorGreen = number;

export type LibColorConstructorBlueSlice = string;

export type LibColorConstructorBlue = number;

export type LibColorConstructorHsl = SharedHslColor;

/**
 * Lib - Color - Generate Scale.
 *
 * @since 0.15.0
 */
export type LibColorGenerateScaleReturns = SharedColorScale;

export type LibColorGenerateScaleResult = SharedColorScale;

export type LibColorGenerateScaleShadeConfigEntry = [SharedShadeLevel, number, number] | undefined;

export type LibColorGenerateScaleShadeConfigLevel = SharedShadeLevel;

export type LibColorGenerateScaleShadeConfigPosition = number;

export type LibColorGenerateScaleShadeConfigSaturationFactor = number;

export type LibColorGenerateScaleShadeHex = SharedHexColor;

/**
 * Lib - Color - Hsl To Hex.
 *
 * @since 0.15.0
 */
export type LibColorHslToHexHue = number;

export type LibColorHslToHexSaturation = number;

export type LibColorHslToHexLightness = number;

export type LibColorHslToHexReturns = SharedHexColor;

export type LibColorHslToHexNormalizedSaturation = number;

export type LibColorHslToHexNormalizedLightness = number;

export type LibColorHslToHexChroma = number;

export type LibColorHslToHexHueSection = number;

export type LibColorHslToHexSecondaryChroma = number;

export type LibColorHslToHexLightnessMatch = number;

export type LibColorHslToHexChannelRed = number;

export type LibColorHslToHexChannelGreen = number;

export type LibColorHslToHexChannelBlue = number;

export type LibColorHslToHexRedByte = number;

export type LibColorHslToHexGreenByte = number;

export type LibColorHslToHexBlueByte = number;

export type LibColorHslToHexRedHex = string;

export type LibColorHslToHexGreenHex = string;

export type LibColorHslToHexBlueHex = string;

/**
 * Lib - Color - Hue.
 *
 * @since 0.15.0
 */
export type LibColorHue = SharedHslColorHue;

/**
 * Lib - Color - Lightness.
 *
 * @since 0.15.0
 */
export type LibColorLightness = SharedHslColorLightness;

/**
 * Lib - Color - Rgb To Hsl.
 *
 * @since 0.15.0
 */
export type LibColorRgbToHslRed = number;

export type LibColorRgbToHslGreen = number;

export type LibColorRgbToHslBlue = number;

export type LibColorRgbToHslReturns = SharedHslColor;

export type LibColorRgbToHslNormalizedRed = number;

export type LibColorRgbToHslNormalizedGreen = number;

export type LibColorRgbToHslNormalizedBlue = number;

export type LibColorRgbToHslChannelMax = number;

export type LibColorRgbToHslChannelMin = number;

export type LibColorRgbToHslDelta = number;

export type LibColorRgbToHslLightnessNormalized = number;

export type LibColorRgbToHslLightness = number;

export type LibColorRgbToHslSaturation = number;

export type LibColorRgbToHslSaturationDenominator = number;

export type LibColorRgbToHslHue = number;

/**
 * Lib - Color - Saturation.
 *
 * @since 0.15.0
 */
export type LibColorSaturation = SharedHslColorSaturation;

/**
 * Lib - Color - Shade Config.
 *
 * @since 0.15.0
 */
export type LibColorShadeConfig = [SharedShadeLevel, number, number][];
