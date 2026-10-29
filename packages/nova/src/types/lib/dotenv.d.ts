import type { Shared_NovaConfigEnvironmentWorkspace_Variables } from '../shared.d.ts';

/**
 * Lib - Dotenv - Classify Env Value.
 *
 * @since 0.20.0
 */
export type Lib_Dotenv_ClassifyEnvValue_Key = string;

export type Lib_Dotenv_ClassifyEnvValue_Value = string;

export type Lib_Dotenv_ClassifyEnvValue_Returns = string | null;

export type Lib_Dotenv_ClassifyEnvValue_Trimmed = string;

export type Lib_Dotenv_ClassifyEnvValue_FirstChar = string;

/**
 * Lib - Dotenv - Escape Sample Value.
 *
 * @since 0.31.0
 */
export type Lib_Dotenv_EscapeSampleValue_Value = string;

export type Lib_Dotenv_EscapeSampleValue_Returns = string;

export type Lib_Dotenv_EscapeSampleValue_Result = string;

/**
 * Lib - Dotenv - Find Env Quote Violations.
 *
 * @since 0.20.0
 */
export type Lib_Dotenv_FindEnvQuoteViolations_Content = string;

export type Lib_Dotenv_FindEnvQuoteViolations_Returns = Lib_Dotenv_FindEnvQuoteViolations_Violations;

export type Lib_Dotenv_FindEnvQuoteViolations_ViolationKey = string;

export type Lib_Dotenv_FindEnvQuoteViolations_ViolationReason = string;

export type Lib_Dotenv_FindEnvQuoteViolations_Violation = {
  key: Lib_Dotenv_FindEnvQuoteViolations_ViolationKey;
  reason: Lib_Dotenv_FindEnvQuoteViolations_ViolationReason;
};

export type Lib_Dotenv_FindEnvQuoteViolations_Violations = Lib_Dotenv_FindEnvQuoteViolations_Violation[];

export type Lib_Dotenv_FindEnvQuoteViolations_Lines = string[];

export type Lib_Dotenv_FindEnvQuoteViolations_Cursor = number;

export type Lib_Dotenv_FindEnvQuoteViolations_Line = string;

export type Lib_Dotenv_FindEnvQuoteViolations_Lead = string;

export type Lib_Dotenv_FindEnvQuoteViolations_KeyMatch = RegExpMatchArray | null;

export type Lib_Dotenv_FindEnvQuoteViolations_Key = string;

export type Lib_Dotenv_FindEnvQuoteViolations_ValueLine = string;

export type Lib_Dotenv_FindEnvQuoteViolations_ValueLines = Lib_Dotenv_FindEnvQuoteViolations_ValueLine[];

export type Lib_Dotenv_FindEnvQuoteViolations_Value = string;

export type Lib_Dotenv_FindEnvQuoteViolations_Reason = string | null;

/**
 * Lib - Dotenv - Has Unclosed Double Quote.
 *
 * @since 0.20.0
 */
export type Lib_Dotenv_HasUnclosedDoubleQuote_Text = string;

export type Lib_Dotenv_HasUnclosedDoubleQuote_Returns = boolean;

export type Lib_Dotenv_HasUnclosedDoubleQuote_Open = boolean;

export type Lib_Dotenv_HasUnclosedDoubleQuote_Escaped = boolean;

/**
 * Lib - Dotenv - Is Quote Open.
 *
 * @since 0.31.0
 */
export type Lib_Dotenv_IsQuoteOpen_Text = string;

export type Lib_Dotenv_IsQuoteOpen_StartOpen = boolean;

export type Lib_Dotenv_IsQuoteOpen_Returns = boolean;

export type Lib_Dotenv_IsQuoteOpen_InQuote = boolean;

export type Lib_Dotenv_IsQuoteOpen_Escaped = boolean;

/**
 * Lib - Dotenv - Parse Existing Env.
 *
 * @since 0.31.0
 */
export type Lib_Dotenv_ParseExistingEnv_FilePath = string;

export type Lib_Dotenv_ParseExistingEnv_Returns = Promise<Map<string, string>>;

export type Lib_Dotenv_ParseExistingEnv_Existing = Map<string, string>;

export type Lib_Dotenv_ParseExistingEnv_Raw = string;

export type Lib_Dotenv_ParseExistingEnv_Lines = string[];

export type Lib_Dotenv_ParseExistingEnv_LineIndex = number;

export type Lib_Dotenv_ParseExistingEnv_Line = string;

export type Lib_Dotenv_ParseExistingEnv_KeyMatch = RegExpMatchArray | null;

export type Lib_Dotenv_ParseExistingEnv_LineKey = string;

export type Lib_Dotenv_ParseExistingEnv_ValuePortion = string;

export type Lib_Dotenv_ParseExistingEnv_BlockLines = string[];

export type Lib_Dotenv_ParseExistingEnv_IsValueOpen = boolean;

export type Lib_Dotenv_ParseExistingEnv_ContinuationLine = string;

/**
 * Lib - Dotenv - Write Dotenv Files.
 *
 * @since 0.31.0
 */
export type Lib_Dotenv_WriteDotenvFiles_Options_TargetDirectory = string;

export type Lib_Dotenv_WriteDotenvFiles_Options_Variables = Shared_NovaConfigEnvironmentWorkspace_Variables;

export type Lib_Dotenv_WriteDotenvFiles_Options_DryRun = boolean;

export type Lib_Dotenv_WriteDotenvFiles_Options_ReplaceFile = boolean;

export type Lib_Dotenv_WriteDotenvFiles_Options_Prune = boolean;

export type Lib_Dotenv_WriteDotenvFiles_Options_Report = boolean;

export type Lib_Dotenv_WriteDotenvFiles_Options_ProfilesEnabled = boolean;

export type Lib_Dotenv_WriteDotenvFiles_Options_ConfirmPrune = (filePath: string, keys: string[]) => Promise<boolean>;

export type Lib_Dotenv_WriteDotenvFiles_Options = {
  targetDirectory: Lib_Dotenv_WriteDotenvFiles_Options_TargetDirectory;
  variables: Lib_Dotenv_WriteDotenvFiles_Options_Variables;
  dryRun?: Lib_Dotenv_WriteDotenvFiles_Options_DryRun;
  replaceFile?: Lib_Dotenv_WriteDotenvFiles_Options_ReplaceFile;
  prune?: Lib_Dotenv_WriteDotenvFiles_Options_Prune;
  report?: Lib_Dotenv_WriteDotenvFiles_Options_Report;
  profilesEnabled?: Lib_Dotenv_WriteDotenvFiles_Options_ProfilesEnabled;
  confirmPrune?: Lib_Dotenv_WriteDotenvFiles_Options_ConfirmPrune;
};

export type Lib_Dotenv_WriteDotenvFiles_Returns = Promise<void>;

export type Lib_Dotenv_WriteDotenvFiles_TargetDirectory = string;

export type Lib_Dotenv_WriteDotenvFiles_Variables = Shared_NovaConfigEnvironmentWorkspace_Variables;

export type Lib_Dotenv_WriteDotenvFiles_IsDryRun = boolean;

export type Lib_Dotenv_WriteDotenvFiles_IsReplaceFile = boolean;

export type Lib_Dotenv_WriteDotenvFiles_IsPrune = boolean;

export type Lib_Dotenv_WriteDotenvFiles_ShouldReport = boolean;

export type Lib_Dotenv_WriteDotenvFiles_ProfilesEnabled = boolean;

export type Lib_Dotenv_WriteDotenvFiles_CurrentDirectory = string;

export type Lib_Dotenv_WriteDotenvFiles_TemplateDirectory = string;

export type Lib_Dotenv_WriteDotenvFiles_Files = string[];

export type Lib_Dotenv_WriteDotenvFiles_BaselineKeys = Set<string>;

export type Lib_Dotenv_WriteDotenvFiles_BaselineTemplate = string;

export type Lib_Dotenv_WriteDotenvFiles_BaselineTemplateLines = string[];

export type Lib_Dotenv_WriteDotenvFiles_BaselineKeyMatch = RegExpMatchArray | null;

export type Lib_Dotenv_WriteDotenvFiles_EnvLines = string[];

export type Lib_Dotenv_WriteDotenvFiles_SampleLines = string[];

export type Lib_Dotenv_WriteDotenvFiles_VariableDefault = string;

export type Lib_Dotenv_WriteDotenvFiles_CustomSection = string;

export type Lib_Dotenv_WriteDotenvFiles_CustomSectionSample = string;

export type Lib_Dotenv_WriteDotenvFiles_IsSample = boolean;

export type Lib_Dotenv_WriteDotenvFiles_TemplateFileName = string;

export type Lib_Dotenv_WriteDotenvFiles_TemplatePath = string;

export type Lib_Dotenv_WriteDotenvFiles_TargetPath = string;

export type Lib_Dotenv_WriteDotenvFiles_ExistingEnvPath = string;

export type Lib_Dotenv_WriteDotenvFiles_ExistingEnv = Map<string, string>;

export type Lib_Dotenv_WriteDotenvFiles_Content = string | undefined;

export type Lib_Dotenv_WriteDotenvFiles_AppendSection = string;

export type Lib_Dotenv_WriteDotenvFiles_ContentLines = string[];

export type Lib_Dotenv_WriteDotenvFiles_SeenKeys = Set<string>;

export type Lib_Dotenv_WriteDotenvFiles_PreservedLines = string[];

export type Lib_Dotenv_WriteDotenvFiles_KeyMatch = RegExpMatchArray | null;

export type Lib_Dotenv_WriteDotenvFiles_ContentLineKey = string;

export type Lib_Dotenv_WriteDotenvFiles_OriginalLine = string | undefined;

export type Lib_Dotenv_WriteDotenvFiles_OrphanKeys = string[];

export type Lib_Dotenv_WriteDotenvFiles_IsPruneConfirmed = boolean;

export type Lib_Dotenv_WriteDotenvFiles_OrphanLines = string[];
