import type {
  Shared_NovaConfig_Project,
  Shared_NovaConfig_Project_License,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_License,
  Shared_NovaConfigConfig,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - License - Update Copyright - Build Fingerprint.
 *
 * @since 0.20.0
 */
export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Template = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Returns = RegExp;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EscapePattern = RegExp;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EntityLiteral = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_YearLiteral = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EntityCapture = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_YearCapture = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Pattern = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_Remaining = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_EntityIndex = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_YearIndex = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_TokenIndices = number[];

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_NextIndex = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_IsEntityNext = boolean;

export type Cli_Recipe_License_UpdateCopyright_Runner_BuildFingerprint_LeadingSegment = string;

/**
 * CLI - Recipe - License - Update Copyright - Run.
 *
 * @since 0.20.0
 */
export type Cli_Recipe_License_UpdateCopyright_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_Options_ReplaceFile = true;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_Options = {
  dryRun?: Cli_Recipe_License_UpdateCopyright_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Recipe_License_UpdateCopyright_Runner_Run_Options_ReplaceFile;
};

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_CurrentDirectory = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_IsReplaceFile = boolean;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_ReplaceFileNotice = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_LicenseRecipes = Shared_NovaConfig_Recipes_License | undefined;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_UpdateCopyright = Shared_NovaConfig_RecipeEntry | undefined;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_Project = Shared_NovaConfig_Project | undefined;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_EntityName = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_CurrentYear = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_StartingYear = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_YearRange = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_LicenseId = Shared_NovaConfig_Project_License | undefined;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_TemplatePath = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_Template = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_HasEntityPlaceholder = boolean;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_HasYearPlaceholder = boolean;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_RootPath = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_TargetPaths = string[];

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_UpdatedCount = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_SkippedCount = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_AlreadyCurrentCount = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_NotFoundCount = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_ErroredCount = number;

export type Cli_Recipe_License_UpdateCopyright_Runner_Run_Result = 'updated' | 'skipped' | 'already-current' | 'not-found' | 'errored';

/**
 * CLI - Recipe - License - Update Copyright - Update License File.
 *
 * @since 0.20.0
 */
export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_FilePath = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_TemplateText = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_EntityName = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_YearRange = string;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_IsDryRun = boolean;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_IsReplaceFile = boolean;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Returns = Promise<'updated' | 'skipped' | 'already-current' | 'not-found' | 'errored'>;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_CurrentContent = string | undefined;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_ReadError = NodeJS.ErrnoException;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_ReadErrorCode = string | undefined;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Fingerprint = RegExp;

export type Cli_Recipe_License_UpdateCopyright_Runner_UpdateLicenseFile_Regenerated = string;
