import type { HtmlTagObject, LoadContext, Plugin } from '@docusaurus/types';

/**
 * Plugins - Analytics - Index - Analytics.
 *
 * @since 0.51.0
 */
export type Plugins_Analytics_Index_Analytics_Context = LoadContext | Record<string, never>;

export type Plugins_Analytics_Index_Analytics_Options_GoogleAnalytics_Value_MeasurementId = string;

export type Plugins_Analytics_Index_Analytics_Options_GoogleAnalytics_Value = {
  measurementId: Plugins_Analytics_Index_Analytics_Options_GoogleAnalytics_Value_MeasurementId;
};

export type Plugins_Analytics_Index_Analytics_Options_GoogleAnalytics = Plugins_Analytics_Index_Analytics_Options_GoogleAnalytics_Value | undefined;

export type Plugins_Analytics_Index_Analytics_Options_MetaPixel_Value_PixelId = string;

export type Plugins_Analytics_Index_Analytics_Options_MetaPixel_Value = {
  pixelId: Plugins_Analytics_Index_Analytics_Options_MetaPixel_Value_PixelId;
};

export type Plugins_Analytics_Index_Analytics_Options_MetaPixel = Plugins_Analytics_Index_Analytics_Options_MetaPixel_Value | undefined;

export type Plugins_Analytics_Index_Analytics_Options_Clarity_Value_ProjectId = string;

export type Plugins_Analytics_Index_Analytics_Options_Clarity_Value = {
  projectId: Plugins_Analytics_Index_Analytics_Options_Clarity_Value_ProjectId;
};

export type Plugins_Analytics_Index_Analytics_Options_Clarity = Plugins_Analytics_Index_Analytics_Options_Clarity_Value | undefined;

export type Plugins_Analytics_Index_Analytics_Options = {
  googleAnalytics?: Plugins_Analytics_Index_Analytics_Options_GoogleAnalytics;
  metaPixel?: Plugins_Analytics_Index_Analytics_Options_MetaPixel;
  clarity?: Plugins_Analytics_Index_Analytics_Options_Clarity;
};

export type Plugins_Analytics_Index_Analytics_ReturnsName = string;

export type Plugins_Analytics_Index_Analytics_ReturnsInjectHtmlTagsResultHeadTags = HtmlTagObject[];

export type Plugins_Analytics_Index_Analytics_ReturnsInjectHtmlTagsResult = {
  headTags: Plugins_Analytics_Index_Analytics_ReturnsInjectHtmlTagsResultHeadTags;
};

export type Plugins_Analytics_Index_Analytics_ReturnsInjectHtmlTags = () => Plugins_Analytics_Index_Analytics_ReturnsInjectHtmlTagsResult;

export type Plugins_Analytics_Index_Analytics_Returns = Plugin & {
  name: Plugins_Analytics_Index_Analytics_ReturnsName;
  injectHtmlTags: Plugins_Analytics_Index_Analytics_ReturnsInjectHtmlTags;
};

/**
 * Plugins - Analytics - Index - Analytics - Inject Html Tags.
 *
 * @since 0.51.0
 */
export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_ReturnsHeadTags = HtmlTagObject[];

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_Returns = {
  headTags: Plugins_Analytics_Index_Analytics_InjectHtmlTags_ReturnsHeadTags;
};

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_HeadTags = HtmlTagObject[];

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_GoogleAnalytics_Value_MeasurementId = string;

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_GoogleAnalytics_Value = {
  measurementId: Plugins_Analytics_Index_Analytics_InjectHtmlTags_GoogleAnalytics_Value_MeasurementId;
};

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_GoogleAnalytics = Plugins_Analytics_Index_Analytics_InjectHtmlTags_GoogleAnalytics_Value | undefined;

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_MetaPixel_Value_PixelId = string;

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_MetaPixel_Value = {
  pixelId: Plugins_Analytics_Index_Analytics_InjectHtmlTags_MetaPixel_Value_PixelId;
};

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_MetaPixel = Plugins_Analytics_Index_Analytics_InjectHtmlTags_MetaPixel_Value | undefined;

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_Clarity_Value_ProjectId = string;

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_Clarity_Value = {
  projectId: Plugins_Analytics_Index_Analytics_InjectHtmlTags_Clarity_Value_ProjectId;
};

export type Plugins_Analytics_Index_Analytics_InjectHtmlTags_Clarity = Plugins_Analytics_Index_Analytics_InjectHtmlTags_Clarity_Value | undefined;

/**
 * Plugins - Analytics - Index - Clarity Tags.
 *
 * @since 0.51.0
 */
export type Plugins_Analytics_Index_ClarityTags_ProjectId = string;

export type Plugins_Analytics_Index_ClarityTags_Returns = HtmlTagObject[];

/**
 * Plugins - Analytics - Index - Google Analytics Tags.
 *
 * @since 0.51.0
 */
export type Plugins_Analytics_Index_GoogleAnalyticsTags_MeasurementId = string;

export type Plugins_Analytics_Index_GoogleAnalyticsTags_Returns = HtmlTagObject[];

/**
 * Plugins - Analytics - Index - Meta Pixel Tags.
 *
 * @since 0.51.0
 */
export type Plugins_Analytics_Index_MetaPixelTags_PixelId = string;

export type Plugins_Analytics_Index_MetaPixelTags_Returns = HtmlTagObject[];
