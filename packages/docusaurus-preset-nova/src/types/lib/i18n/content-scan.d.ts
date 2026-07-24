import type { Dirent } from 'node:fs';

import type {
  InitializedPlugin,
  LoadContext,
} from '@docusaurus/types';

import type {
  Shared_I18nContentScanDescriptor,
  Shared_I18nContentScanResult,
  Shared_I18nContentScanResultLocale,
} from '../../shared.d.ts';

/**
 * Lib - I18n - Content Scan - Known Plugins.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ContentScan_KnownPlugin_Name = string;

export type Lib_I18n_ContentScan_KnownPlugin_Short = string;

export type Lib_I18n_ContentScan_KnownPlugin_DefaultPath = string;

export type Lib_I18n_ContentScan_KnownPlugin_Versioned = boolean;

export type Lib_I18n_ContentScan_KnownPlugin = {
  name: Lib_I18n_ContentScan_KnownPlugin_Name;
  short: Lib_I18n_ContentScan_KnownPlugin_Short;
  defaultPath: Lib_I18n_ContentScan_KnownPlugin_DefaultPath;
  versioned: Lib_I18n_ContentScan_KnownPlugin_Versioned;
};

export type Lib_I18n_ContentScan_KnownPlugins = Lib_I18n_ContentScan_KnownPlugin[];

/**
 * Lib - I18n - Content Scan - Build Descriptors.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ContentScan_Runner_BuildDescriptors_SiteDir = string;

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_Plugins = InitializedPlugin[];

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_Returns = Promise<Shared_I18nContentScanDescriptor[]>;

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_Descriptors = Shared_I18nContentScanDescriptor[];

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_Matches = InitializedPlugin[];

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_PluginOptions = {
  id?: string;
  path?: unknown;
};

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_RawPluginId = string | undefined;

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_PluginId = string;

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_RawSourcePath = unknown;

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_SourcePath = string;

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_VersionedDir = string;

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_VersionedExists = boolean;

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_VersionDirents = Dirent[];

export type Lib_I18n_ContentScan_Runner_BuildDescriptors_IsVersionDir = boolean;

/**
 * Lib - I18n - Content Scan - Collect.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ContentScan_Runner_Collect_Input_SiteDir = string;

export type Lib_I18n_ContentScan_Runner_Collect_Input_Descriptors = Shared_I18nContentScanDescriptor[];

export type Lib_I18n_ContentScan_Runner_Collect_Input_Locales = string[];

export type Lib_I18n_ContentScan_Runner_Collect_Input_DefaultLocale = string;

export type Lib_I18n_ContentScan_Runner_Collect_Input = {
  siteDir: Lib_I18n_ContentScan_Runner_Collect_Input_SiteDir;
  descriptors: Lib_I18n_ContentScan_Runner_Collect_Input_Descriptors;
  locales: Lib_I18n_ContentScan_Runner_Collect_Input_Locales;
  defaultLocale: Lib_I18n_ContentScan_Runner_Collect_Input_DefaultLocale;
};

export type Lib_I18n_ContentScan_Runner_Collect_Returns = Promise<Shared_I18nContentScanResult>;

export type Lib_I18n_ContentScan_Runner_Collect_SiteDir = string;

export type Lib_I18n_ContentScan_Runner_Collect_Descriptors = Shared_I18nContentScanDescriptor[];

export type Lib_I18n_ContentScan_Runner_Collect_Locales = string[];

export type Lib_I18n_ContentScan_Runner_Collect_DefaultLocale = string;

export type Lib_I18n_ContentScan_Runner_Collect_Entry_Id = string;

export type Lib_I18n_ContentScan_Runner_Collect_Entry_PluginName = string;

export type Lib_I18n_ContentScan_Runner_Collect_Entry_PluginId = string;

export type Lib_I18n_ContentScan_Runner_Collect_Entry_SubPaths = string[];

export type Lib_I18n_ContentScan_Runner_Collect_Entry = {
  id: Lib_I18n_ContentScan_Runner_Collect_Entry_Id;
  pluginName: Lib_I18n_ContentScan_Runner_Collect_Entry_PluginName;
  pluginId: Lib_I18n_ContentScan_Runner_Collect_Entry_PluginId;
  subPaths: Lib_I18n_ContentScan_Runner_Collect_Entry_SubPaths;
};

export type Lib_I18n_ContentScan_Runner_Collect_Entries = Lib_I18n_ContentScan_Runner_Collect_Entry[];

export type Lib_I18n_ContentScan_Runner_Collect_SourceDir = string;

export type Lib_I18n_ContentScan_Runner_Collect_SourceExists = boolean;

export type Lib_I18n_ContentScan_Runner_Collect_Short = string;

export type Lib_I18n_ContentScan_Runner_Collect_PluginId = string;

export type Lib_I18n_ContentScan_Runner_Collect_VersionSegment = string | null;

export type Lib_I18n_ContentScan_Runner_Collect_Files = string[];

export type Lib_I18n_ContentScan_Runner_Collect_InstanceTag = string;

export type Lib_I18n_ContentScan_Runner_Collect_Label = string;

export type Lib_I18n_ContentScan_Runner_Collect_SubPaths = string[];

export type Lib_I18n_ContentScan_Runner_Collect_VersionPrefix = string;

export type Lib_I18n_ContentScan_Runner_Collect_Id = string;

export type Lib_I18n_ContentScan_Runner_Collect_Sources = string[];

export type Lib_I18n_ContentScan_Runner_Collect_PerLocale = Shared_I18nContentScanResultLocale[];

export type Lib_I18n_ContentScan_Runner_Collect_IsDefaultLocale = boolean;

export type Lib_I18n_ContentScan_Runner_Collect_LocalizationDir = string;

export type Lib_I18n_ContentScan_Runner_Collect_Present = Set<string>;

export type Lib_I18n_ContentScan_Runner_Collect_FilePath = string;

export type Lib_I18n_ContentScan_Runner_Collect_Exists = boolean;

/**
 * Lib - I18n - Content Scan - File Exists.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ContentScan_Runner_FileExists_FilePath = string;

export type Lib_I18n_ContentScan_Runner_FileExists_Returns = Promise<boolean>;

/**
 * Lib - I18n - Content Scan - Scan.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ContentScan_Runner_Scan_Options_Locale = string | undefined;

export type Lib_I18n_ContentScan_Runner_Scan_Options = {
  locale: Lib_I18n_ContentScan_Runner_Scan_Options_Locale;
};

export type Lib_I18n_ContentScan_Runner_Scan_Result = Shared_I18nContentScanResult;

export type Lib_I18n_ContentScan_Runner_Scan_Returns = Promise<Lib_I18n_ContentScan_Runner_Scan_Result>;

export type Lib_I18n_ContentScan_Runner_Scan_RequestedLocale = string | undefined;

export type Lib_I18n_ContentScan_Runner_Scan_SiteDir = string;

export type Lib_I18n_ContentScan_Runner_Scan_Base = LoadContext;

export type Lib_I18n_ContentScan_Runner_Scan_I18n = LoadContext['i18n'];

export type Lib_I18n_ContentScan_Runner_Scan_DefaultLocale = string;

export type Lib_I18n_ContentScan_Runner_Scan_Locales = string[];

export type Lib_I18n_ContentScan_Runner_Scan_Plugins = InitializedPlugin[];

export type Lib_I18n_ContentScan_Runner_Scan_Descriptors = Shared_I18nContentScanDescriptor[];
