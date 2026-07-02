import type { LoadContext, Plugin } from '@docusaurus/types';

import type { Plugins_Icons_Generate_GenerateIconModule_Options } from './generate.d.ts';

/**
 * Plugins - Icons - Index - Build Watch Paths.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Index_BuildWatchPaths_SiteDirectory = string;

export type Plugins_Icons_Index_BuildWatchPaths_Returns = string[];

export type Plugins_Icons_Index_BuildWatchPaths_Paths = string[];

/**
 * Plugins - Icons - Index - Icons.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Index_Icons_Context = LoadContext;

export type Plugins_Icons_Index_Icons_OptionsIconSafelist = string[];

export type Plugins_Icons_Index_Icons_Options = {
  iconSafelist?: Plugins_Icons_Index_Icons_OptionsIconSafelist;
  [key: string]: unknown;
};

export type Plugins_Icons_Index_Icons_Returns = Plugin;

export type Plugins_Icons_Index_Icons_SiteDirectory = string;

export type Plugins_Icons_Index_Icons_ThemeConfig = unknown;

export type Plugins_Icons_Index_Icons_Safelist = string[];

export type Plugins_Icons_Index_Icons_GeneratedDirectory = string;

export type Plugins_Icons_Index_Icons_GeneratedPath = string;

/**
 * Plugins - Icons - Index - Icons - Configure Webpack.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Index_Icons_ConfigureWebpack_Returns = Record<string, unknown>;

/**
 * Plugins - Icons - Index - Icons - Get Paths To Watch.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Index_Icons_GetPathsToWatch_Returns = string[];

/**
 * Plugins - Icons - Index - Icons - Load Content.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Index_Icons_LoadContent_Returns = void;

/**
 * Plugins - Icons - Index - Write Registry.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Index_WriteRegistry_GeneratedDirectory = string;

export type Plugins_Icons_Index_WriteRegistry_GeneratedPath = string;

export type Plugins_Icons_Index_WriteRegistry_ModuleOptions = Plugins_Icons_Generate_GenerateIconModule_Options;

export type Plugins_Icons_Index_WriteRegistry_Returns = void;

export type Plugins_Icons_Index_WriteRegistry_Source = string;
