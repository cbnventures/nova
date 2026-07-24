import type {
  InitializedPlugin,
  LoadContext,
  TranslationFile,
  TranslationFileContent,
  TranslationMessage,
} from '@docusaurus/types';

import type {
  Shared_I18nGatherLocale,
  Shared_I18nGatherResult,
} from '../../shared.d.ts';

/**
 * Lib - I18n - Site Context - Gather.
 *
 * @since 0.21.0
 */
export type Lib_I18n_SiteContext_Runner_Gather_Options_Locale = string | undefined;

export type Lib_I18n_SiteContext_Runner_Gather_Options = {
  locale: Lib_I18n_SiteContext_Runner_Gather_Options_Locale;
};

export type Lib_I18n_SiteContext_Runner_Gather_Returns = Promise<Shared_I18nGatherResult>;

export type Lib_I18n_SiteContext_Runner_Gather_SiteDir = string;

export type Lib_I18n_SiteContext_Runner_Gather_Base = LoadContext;

export type Lib_I18n_SiteContext_Runner_Gather_I18n = LoadContext['i18n'];

export type Lib_I18n_SiteContext_Runner_Gather_DefaultLocale = string;

export type Lib_I18n_SiteContext_Runner_Gather_RequestedLocale = string | undefined;

export type Lib_I18n_SiteContext_Runner_Gather_Locales = string[];

export type Lib_I18n_SiteContext_Runner_Gather_Plugins = InitializedPlugin[];

export type Lib_I18n_SiteContext_Runner_Gather_SiteExtract = TranslationFileContent;

export type Lib_I18n_SiteContext_Runner_Gather_ThemeCommonDir = string;

export type Lib_I18n_SiteContext_Runner_Gather_ExtraPaths = string[];

export type Lib_I18n_SiteContext_Runner_Gather_FullExtract = TranslationFileContent;

export type Lib_I18n_SiteContext_Runner_Gather_LiveSiteKeys = Set<string>;

export type Lib_I18n_SiteContext_Runner_Gather_ThemeLiveKeys = Set<string>;

export type Lib_I18n_SiteContext_Runner_Gather_ThemeDefaults = Record<string, string>;

export type Lib_I18n_SiteContext_Runner_Gather_ThemeDefaultEntry = TranslationMessage | undefined;

export type Lib_I18n_SiteContext_Runner_Gather_PerLocale = Shared_I18nGatherLocale[];

export type Lib_I18n_SiteContext_Runner_Gather_LocaleResult = Shared_I18nGatherLocale;

/**
 * Lib - I18n - Site Context - Gather Locale.
 *
 * @since 0.21.0
 */
export type Lib_I18n_SiteContext_Runner_GatherLocale_SiteDir = string;

export type Lib_I18n_SiteContext_Runner_GatherLocale_Base = LoadContext;

export type Lib_I18n_SiteContext_Runner_GatherLocale_BasePlugins = InitializedPlugin[];

export type Lib_I18n_SiteContext_Runner_GatherLocale_Locale = string;

export type Lib_I18n_SiteContext_Runner_GatherLocale_DefaultLocale = string;

export type Lib_I18n_SiteContext_Runner_GatherLocale_Returns = Promise<Shared_I18nGatherLocale>;

export type Lib_I18n_SiteContext_Runner_GatherLocale_IsCurrentLocale = boolean;

export type Lib_I18n_SiteContext_Runner_GatherLocale_Context = LoadContext;

export type Lib_I18n_SiteContext_Runner_GatherLocale_Plugins = InitializedPlugin[];

export type Lib_I18n_SiteContext_Runner_GatherLocale_Registry = Record<string, string>;

export type Lib_I18n_SiteContext_Runner_GatherLocale_Theme = InitializedPlugin | undefined;

export type Lib_I18n_SiteContext_Runner_GatherLocale_AreaFiles = TranslationFile[];

export type Lib_I18n_SiteContext_Runner_GatherLocale_LocalizationDir = string;

export type Lib_I18n_SiteContext_Runner_GatherLocale_ExistingCodeRaw = TranslationFileContent | undefined;

export type Lib_I18n_SiteContext_Runner_GatherLocale_ExistingCode = TranslationFileContent;

export type Lib_I18n_SiteContext_Runner_GatherLocale_ExistingArea = Map<string, TranslationFileContent>;

export type Lib_I18n_SiteContext_Runner_GatherLocale_Content = TranslationFileContent;

export type Lib_I18n_SiteContext_Runner_GatherLocale_IsDefaultLocale = boolean;

/**
 * Lib - I18n - Site Context - Load Area Files.
 *
 * @since 0.21.0
 */
export type Lib_I18n_SiteContext_Runner_LoadAreaFiles_Theme = InitializedPlugin | undefined;

export type Lib_I18n_SiteContext_Runner_LoadAreaFiles_Returns = Promise<TranslationFile[]>;

export type Lib_I18n_SiteContext_Runner_LoadAreaFiles_GetTranslationFiles = InitializedPlugin['getTranslationFiles'];

export type Lib_I18n_SiteContext_Runner_LoadAreaFiles_LoadContent = InitializedPlugin['loadContent'];

export type Lib_I18n_SiteContext_Runner_LoadAreaFiles_Content = unknown;

/**
 * Lib - I18n - Site Context - Read Area File.
 *
 * @since 0.21.0
 */
export type Lib_I18n_SiteContext_Runner_ReadAreaFile_LocalizationDir = string;

export type Lib_I18n_SiteContext_Runner_ReadAreaFile_AreaPath = string;

export type Lib_I18n_SiteContext_Runner_ReadAreaFile_Returns = Promise<TranslationFileContent>;

export type Lib_I18n_SiteContext_Runner_ReadAreaFile_FilePath = string;

export type Lib_I18n_SiteContext_Runner_ReadAreaFile_Raw = string;

export type Lib_I18n_SiteContext_Runner_ReadAreaFile_Parsed = TranslationFileContent;

export type Lib_I18n_SiteContext_Runner_ReadAreaFile_ReadError = unknown;

export type Lib_I18n_SiteContext_Runner_ReadAreaFile_ReadErrorCode = unknown;

/**
 * Lib - I18n - Site Context - Resolve Locales.
 *
 * @since 0.21.0
 */
export type Lib_I18n_SiteContext_Runner_ResolveLocales_I18n = LoadContext['i18n'];

export type Lib_I18n_SiteContext_Runner_ResolveLocales_RequestedLocale = string | undefined;

export type Lib_I18n_SiteContext_Runner_ResolveLocales_Returns = string[];
