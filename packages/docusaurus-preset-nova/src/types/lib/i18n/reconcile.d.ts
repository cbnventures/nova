import type {
  TranslationFileContent,
  TranslationMessage,
} from '@docusaurus/types';

import type {
  Shared_I18nFilePlan,
  Shared_I18nPlanEntry,
} from '../../shared.d.ts';

/**
 * Lib - I18n - Reconcile - Assemble.
 *
 * @since 0.21.0
 */
export type Lib_I18n_Reconcile_Runner_Assemble_Scope = string;

export type Lib_I18n_Reconcile_Runner_Assemble_Entries = Shared_I18nPlanEntry[];

export type Lib_I18n_Reconcile_Runner_Assemble_Returns = Shared_I18nFilePlan;

export type Lib_I18n_Reconcile_Runner_Assemble_Keep = Shared_I18nPlanEntry[];

export type Lib_I18n_Reconcile_Runner_Assemble_Add = Shared_I18nPlanEntry[];

export type Lib_I18n_Reconcile_Runner_Assemble_DropRedundant = Shared_I18nPlanEntry[];

export type Lib_I18n_Reconcile_Runner_Assemble_Orphan = Shared_I18nPlanEntry[];

export type Lib_I18n_Reconcile_Runner_Assemble_Content = TranslationFileContent;

export type Lib_I18n_Reconcile_Runner_Assemble_MessageEntry = TranslationMessage;

export type Lib_I18n_Reconcile_Runner_Assemble_EntryDescription = string | undefined;

/**
 * Lib - I18n - Reconcile - Reconcile Area.
 *
 * @since 0.21.0
 */
export type Lib_I18n_Reconcile_Runner_ReconcileArea_Input_Existing = TranslationFileContent;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Input_Live = TranslationFileContent;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Input_IsDefaultLocale = boolean;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Input_Path = string;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Input = {
  existing: Lib_I18n_Reconcile_Runner_ReconcileArea_Input_Existing;
  live: Lib_I18n_Reconcile_Runner_ReconcileArea_Input_Live;
  isDefaultLocale: Lib_I18n_Reconcile_Runner_ReconcileArea_Input_IsDefaultLocale;
  path: Lib_I18n_Reconcile_Runner_ReconcileArea_Input_Path;
};

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Returns = Shared_I18nFilePlan;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Existing = TranslationFileContent;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Live = TranslationFileContent;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_IsDefaultLocale = boolean;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Path = string;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Scope = string;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_LiveKeys = Set<string>;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_ExistingKeys = Set<string>;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Entries = Shared_I18nPlanEntry[];

export type Lib_I18n_Reconcile_Runner_ReconcileArea_Value = TranslationMessage | undefined;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_LiveEntry = TranslationMessage | undefined;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_DefaultMessage = string | undefined;

export type Lib_I18n_Reconcile_Runner_ReconcileArea_SeedEntry = TranslationMessage | undefined;

/**
 * Lib - I18n - Reconcile - Reconcile Code.
 *
 * @since 0.21.0
 */
export type Lib_I18n_Reconcile_Runner_ReconcileCode_Input_Existing = TranslationFileContent;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Input_LiveSiteKeys = Set<string>;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Input_ThemeLiveKeys = Set<string>;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Input_SiteExtract = TranslationFileContent;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Input_Registry = Record<string, string>;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Input_ThemeDefaults = Record<string, string>;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Input_IsDefaultLocale = boolean;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Input = {
  existing: Lib_I18n_Reconcile_Runner_ReconcileCode_Input_Existing;
  liveSiteKeys: Lib_I18n_Reconcile_Runner_ReconcileCode_Input_LiveSiteKeys;
  themeLiveKeys: Lib_I18n_Reconcile_Runner_ReconcileCode_Input_ThemeLiveKeys;
  siteExtract: Lib_I18n_Reconcile_Runner_ReconcileCode_Input_SiteExtract;
  registry: Lib_I18n_Reconcile_Runner_ReconcileCode_Input_Registry;
  themeDefaults: Lib_I18n_Reconcile_Runner_ReconcileCode_Input_ThemeDefaults;
  isDefaultLocale: Lib_I18n_Reconcile_Runner_ReconcileCode_Input_IsDefaultLocale;
};

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Returns = Shared_I18nFilePlan;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Existing = TranslationFileContent;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_LiveSiteKeys = Set<string>;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_ThemeLiveKeys = Set<string>;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_SiteExtract = TranslationFileContent;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Registry = Record<string, string>;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_ThemeDefaults = Record<string, string>;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_IsDefaultLocale = boolean;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_ExistingKeys = Set<string>;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Entries = Shared_I18nPlanEntry[];

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Value = TranslationMessage | undefined;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_IsSite = boolean;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_SiteEntry = TranslationMessage | undefined;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_RegistryMessage = string | undefined;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_ThemeDefaultMessage = string | undefined;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_SiteMessage = string | undefined;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_DefaultMessage = string | undefined;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_Matches = boolean;

export type Lib_I18n_Reconcile_Runner_ReconcileCode_SeedEntry = TranslationMessage | undefined;
