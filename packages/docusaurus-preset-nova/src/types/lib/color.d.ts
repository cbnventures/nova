import type {
  Shared_ColorScale,
  Shared_HexColor,
  Shared_HslColor,
  Shared_HslColor_Hue,
  Shared_HslColor_Lightness,
  Shared_HslColor_Saturation,
  Shared_ShadeLevel,
} from '../shared.d.ts';

/**
 * Lib - Color - Compute Shade.
 *
 * @since 0.15.0
 */
export type Lib_Color_Runner_ComputeShade_Hue = number;

export type Lib_Color_Runner_ComputeShade_Saturation = number;

export type Lib_Color_Runner_ComputeShade_Lightness = number;

export type Lib_Color_Runner_ComputeShade_Position = number;

export type Lib_Color_Runner_ComputeShade_SaturationFactor = number;

export type Lib_Color_Runner_ComputeShade_Returns = Shared_HexColor;

export type Lib_Color_Runner_ComputeShade_TargetLightness = number;

export type Lib_Color_Runner_ComputeShade_AdjustedSaturation = number;

/**
 * Lib - Color - Constructor.
 *
 * @since 0.15.0
 */
export type Lib_Color_Runner_Constructor_Hex = string;

export type Lib_Color_Runner_Constructor_IsValid = boolean;

export type Lib_Color_Runner_Constructor_RedSlice = string;

export type Lib_Color_Runner_Constructor_Red = number;

export type Lib_Color_Runner_Constructor_GreenSlice = string;

export type Lib_Color_Runner_Constructor_Green = number;

export type Lib_Color_Runner_Constructor_BlueSlice = string;

export type Lib_Color_Runner_Constructor_Blue = number;

export type Lib_Color_Runner_Constructor_Hsl = Shared_HslColor;

/**
 * Lib - Color - Generate Scale.
 *
 * @since 0.15.0
 */
export type Lib_Color_Runner_GenerateScale_Returns = Shared_ColorScale;

export type Lib_Color_Runner_GenerateScale_Result = Shared_ColorScale;

export type Lib_Color_Runner_GenerateScale_ShadeConfigEntry = [Shared_ShadeLevel, number, number] | undefined;

export type Lib_Color_Runner_GenerateScale_ShadeConfigLevel = Shared_ShadeLevel;

export type Lib_Color_Runner_GenerateScale_ShadeConfigPosition = number;

export type Lib_Color_Runner_GenerateScale_ShadeConfigSaturationFactor = number;

export type Lib_Color_Runner_GenerateScale_ShadeHex = Shared_HexColor;

/**
 * Lib - Color - Hsl To Hex.
 *
 * @since 0.15.0
 */
export type Lib_Color_Runner_HslToHex_Hue = number;

export type Lib_Color_Runner_HslToHex_Saturation = number;

export type Lib_Color_Runner_HslToHex_Lightness = number;

export type Lib_Color_Runner_HslToHex_Returns = Shared_HexColor;

export type Lib_Color_Runner_HslToHex_NormalizedSaturation = number;

export type Lib_Color_Runner_HslToHex_NormalizedLightness = number;

export type Lib_Color_Runner_HslToHex_Chroma = number;

export type Lib_Color_Runner_HslToHex_HueSection = number;

export type Lib_Color_Runner_HslToHex_SecondaryChroma = number;

export type Lib_Color_Runner_HslToHex_LightnessMatch = number;

export type Lib_Color_Runner_HslToHex_ChannelRed = number;

export type Lib_Color_Runner_HslToHex_ChannelGreen = number;

export type Lib_Color_Runner_HslToHex_ChannelBlue = number;

export type Lib_Color_Runner_HslToHex_RedByte = number;

export type Lib_Color_Runner_HslToHex_GreenByte = number;

export type Lib_Color_Runner_HslToHex_BlueByte = number;

export type Lib_Color_Runner_HslToHex_RedHex = string;

export type Lib_Color_Runner_HslToHex_GreenHex = string;

export type Lib_Color_Runner_HslToHex_BlueHex = string;

/**
 * Lib - Color - Hue.
 *
 * @since 0.15.0
 */
export type Lib_Color_Hue = Shared_HslColor_Hue;

/**
 * Lib - Color - Lightness.
 *
 * @since 0.15.0
 */
export type Lib_Color_Lightness = Shared_HslColor_Lightness;

/**
 * Lib - Color - Rgb To Hsl.
 *
 * @since 0.15.0
 */
export type Lib_Color_Runner_RgbToHsl_Red = number;

export type Lib_Color_Runner_RgbToHsl_Green = number;

export type Lib_Color_Runner_RgbToHsl_Blue = number;

export type Lib_Color_Runner_RgbToHsl_Returns = Shared_HslColor;

export type Lib_Color_Runner_RgbToHsl_NormalizedRed = number;

export type Lib_Color_Runner_RgbToHsl_NormalizedGreen = number;

export type Lib_Color_Runner_RgbToHsl_NormalizedBlue = number;

export type Lib_Color_Runner_RgbToHsl_ChannelMax = number;

export type Lib_Color_Runner_RgbToHsl_ChannelMin = number;

export type Lib_Color_Runner_RgbToHsl_Delta = number;

export type Lib_Color_Runner_RgbToHsl_LightnessNormalized = number;

export type Lib_Color_Runner_RgbToHsl_Lightness = number;

export type Lib_Color_Runner_RgbToHsl_Saturation = number;

export type Lib_Color_Runner_RgbToHsl_SaturationDenominator = number;

export type Lib_Color_Runner_RgbToHsl_Hue = number;

/**
 * Lib - Color - Saturation.
 *
 * @since 0.15.0
 */
export type Lib_Color_Saturation = Shared_HslColor_Saturation;

/**
 * Lib - Color - Shade Config.
 *
 * @since 0.15.0
 */
export type Lib_Color_ShadeConfig = [Shared_ShadeLevel, number, number][];
