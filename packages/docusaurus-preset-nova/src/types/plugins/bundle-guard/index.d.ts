import type { LoadContext, Plugin } from '@docusaurus/types';

/**
 * Plugins - Bundle Guard - Index - Bundle Guard.
 *
 * @since 0.19.0
 */
export type Plugins_BundleGuard_Index_BundleGuard_Context = LoadContext;

export type Plugins_BundleGuard_Index_BundleGuard_OptionsMaxBundleFileSize = number | false;

export type Plugins_BundleGuard_Index_BundleGuard_Options = {
  maxBundleFileSize?: Plugins_BundleGuard_Index_BundleGuard_OptionsMaxBundleFileSize;
  [key: string]: unknown;
};

export type Plugins_BundleGuard_Index_BundleGuard_Returns = Plugin;

export type Plugins_BundleGuard_Index_BundleGuard_MaxBundleFileSize = number | false;

/**
 * Plugins - Bundle Guard - Index - Bundle Guard - Post Build.
 *
 * @since 0.19.0
 */
export type Plugins_BundleGuard_Index_BundleGuard_PostBuild_PropsOutDir = string;

export type Plugins_BundleGuard_Index_BundleGuard_PostBuild_Props = {
  outDir: Plugins_BundleGuard_Index_BundleGuard_PostBuild_PropsOutDir;
  [key: string]: unknown;
};

export type Plugins_BundleGuard_Index_BundleGuard_PostBuild_Returns = void;

export type Plugins_BundleGuard_Index_BundleGuard_PostBuild_MaxBytes = number;

export type Plugins_BundleGuard_Index_BundleGuard_PostBuild_OutDir = string;

export type Plugins_BundleGuard_Index_BundleGuard_PostBuild_OversizedFiles = string[];

export type Plugins_BundleGuard_Index_BundleGuard_PostBuild_RelativeFiles = string[];

export type Plugins_BundleGuard_Index_BundleGuard_PostBuild_Header = string;

export type Plugins_BundleGuard_Index_BundleGuard_PostBuild_Message = string;
