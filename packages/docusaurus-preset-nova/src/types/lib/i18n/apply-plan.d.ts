import type {
  TranslationFileContent,
  TranslationMessage,
} from '@docusaurus/types';

import type {
  Shared_I18nApplyResult,
  Shared_I18nConfirm,
  Shared_I18nDecision,
  Shared_I18nFilePlan,
  Shared_I18nGatherResult,
  Shared_I18nLocalePlan,
  Shared_I18nPlan,
  Shared_I18nPlanEntry,
} from '../../shared.d.ts';

/**
 * Lib - I18n - Apply Plan - Apply.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ApplyPlan_Runner_Apply_Plan = Shared_I18nPlan;

export type Lib_I18n_ApplyPlan_Runner_Apply_Options_DryRun = boolean;

export type Lib_I18n_ApplyPlan_Runner_Apply_Options_DeleteDefunct = boolean;

export type Lib_I18n_ApplyPlan_Runner_Apply_Options_Interactive = boolean;

export type Lib_I18n_ApplyPlan_Runner_Apply_Options_Confirm = Shared_I18nConfirm;

export type Lib_I18n_ApplyPlan_Runner_Apply_Options = {
  dryRun: Lib_I18n_ApplyPlan_Runner_Apply_Options_DryRun;
  deleteDefunct: Lib_I18n_ApplyPlan_Runner_Apply_Options_DeleteDefunct;
  interactive: Lib_I18n_ApplyPlan_Runner_Apply_Options_Interactive;
  confirm: Lib_I18n_ApplyPlan_Runner_Apply_Options_Confirm;
};

export type Lib_I18n_ApplyPlan_Runner_Apply_Returns = Promise<Shared_I18nApplyResult>;

export type Lib_I18n_ApplyPlan_Runner_Apply_DryRun = boolean;

export type Lib_I18n_ApplyPlan_Runner_Apply_DeleteDefunct = boolean;

export type Lib_I18n_ApplyPlan_Runner_Apply_Interactive = boolean;

export type Lib_I18n_ApplyPlan_Runner_Apply_Confirm = Shared_I18nConfirm;

export type Lib_I18n_ApplyPlan_Runner_Apply_Locales = Shared_I18nLocalePlan[];

export type Lib_I18n_ApplyPlan_Runner_Apply_Written = string[];

export type Lib_I18n_ApplyPlan_Runner_Apply_Removed = string[];

export type Lib_I18n_ApplyPlan_Runner_Apply_KeepOrphans = Set<Shared_I18nFilePlan>;

export type Lib_I18n_ApplyPlan_Runner_Apply_HasOrphans = boolean;

export type Lib_I18n_ApplyPlan_Runner_Apply_Decision = Shared_I18nDecision;

export type Lib_I18n_ApplyPlan_Runner_Apply_FinalContent = TranslationFileContent;

export type Lib_I18n_ApplyPlan_Runner_Apply_FilePath = string;

export type Lib_I18n_ApplyPlan_Runner_Apply_Keys = string[];

export type Lib_I18n_ApplyPlan_Runner_Apply_Exists = boolean;

/**
 * Lib - I18n - Apply Plan - Build.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ApplyPlan_Runner_Build_Gather = Shared_I18nGatherResult;

export type Lib_I18n_ApplyPlan_Runner_Build_Returns = Shared_I18nPlan;

export type Lib_I18n_ApplyPlan_Runner_Build_Locales = Shared_I18nLocalePlan[];

export type Lib_I18n_ApplyPlan_Runner_Build_CodePlan = Shared_I18nFilePlan;

export type Lib_I18n_ApplyPlan_Runner_Build_Files = Shared_I18nFilePlan[];

export type Lib_I18n_ApplyPlan_Runner_Build_ExistingArea = TranslationFileContent | undefined;

export type Lib_I18n_ApplyPlan_Runner_Build_AreaPlan = Shared_I18nFilePlan;

/**
 * Lib - I18n - Apply Plan - Build Content.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ApplyPlan_Runner_BuildContent_File = Shared_I18nFilePlan;

export type Lib_I18n_ApplyPlan_Runner_BuildContent_KeepOrphans = boolean;

export type Lib_I18n_ApplyPlan_Runner_BuildContent_Returns = TranslationFileContent;

export type Lib_I18n_ApplyPlan_Runner_BuildContent_Content = TranslationFileContent;

export type Lib_I18n_ApplyPlan_Runner_BuildContent_Ordered = Shared_I18nPlanEntry[];

export type Lib_I18n_ApplyPlan_Runner_BuildContent_MessageEntry = TranslationMessage;

/**
 * Lib - I18n - Apply Plan - File Exists.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ApplyPlan_Runner_FileExists_FilePath = string;

export type Lib_I18n_ApplyPlan_Runner_FileExists_Returns = Promise<boolean>;

/**
 * Lib - I18n - Apply Plan - Has Drift.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ApplyPlan_Runner_HasDrift_Plan = Shared_I18nPlan;

export type Lib_I18n_ApplyPlan_Runner_HasDrift_Returns = boolean;

export type Lib_I18n_ApplyPlan_Runner_HasDrift_Locales = Shared_I18nLocalePlan[];

/**
 * Lib - I18n - Apply Plan - Resolve Path.
 *
 * @since 0.21.0
 */
export type Lib_I18n_ApplyPlan_Runner_ResolvePath_LocalizationDir = string;

export type Lib_I18n_ApplyPlan_Runner_ResolvePath_Scope = string;

export type Lib_I18n_ApplyPlan_Runner_ResolvePath_Returns = string;
