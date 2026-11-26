import type { HtmlTagObject } from '@docusaurus/types';

/**
 * Tests - Plugins - Analytics - Analytics - Adds Only The Configured Trackers.
 *
 * @since 0.51.0
 */
export type Tests_Plugins_Analytics_Analytics_AddsOnlyTheConfiguredTrackers_TagsHeadTags = HtmlTagObject[];

export type Tests_Plugins_Analytics_Analytics_AddsOnlyTheConfiguredTrackers_Tags = {
  headTags: Tests_Plugins_Analytics_Analytics_AddsOnlyTheConfiguredTrackers_TagsHeadTags;
};

export type Tests_Plugins_Analytics_Analytics_AddsOnlyTheConfiguredTrackers_Sources = string[];

/**
 * Tests - Plugins - Analytics - Analytics - Adds The Analytics Plugin Only When A Tracker Is Set.
 *
 * @since 0.51.0
 */
export type Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_ResultPlugin = [string, Record<string, unknown>] | string;

export type Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_ResultPlugins = Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_ResultPlugin[];

export type Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_Result = {
  plugins: Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_ResultPlugins;
  themes: Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_ResultPlugins;
};

export type Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_WithGtmOnly = Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_Result;

export type Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_WithClarity = Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_Result;

export type Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_Names = number[];

/**
 * Tests - Plugins - Analytics - Plugin Names.
 *
 * @since 0.51.0
 */
export type Tests_Plugins_Analytics_PluginNames_Plugin = [string, Record<string, unknown>] | string;

export type Tests_Plugins_Analytics_PluginNames_Plugins = Tests_Plugins_Analytics_PluginNames_Plugin[];

export type Tests_Plugins_Analytics_PluginNames_Returns = string[];

export type Tests_Plugins_Analytics_PluginNames_Names = string[];

export type Tests_Plugins_Analytics_PluginNames_Name = string;
