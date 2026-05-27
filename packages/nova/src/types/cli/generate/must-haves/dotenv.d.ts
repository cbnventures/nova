import type { Answers, PromptObject } from 'prompts';

import type {
  Shared_EnvEntries as SharedEnvEntries,
  Shared_EnvEntry as SharedEnvEntry,
  Shared_GeneratorRunResult as SharedGeneratorRunResult,
  Shared_PromptWithCancelReject as SharedPromptWithCancelReject,
  Shared_PromptWithCancelResolved as SharedPromptWithCancelResolved,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Dotenv - Add Env Line.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Content = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Key = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Value = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_Returns = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_EndsWithNewline = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_AddEnvLine_NewLine = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Delete Env Line.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Content = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Key = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Returns = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Lines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_DeleteEnvLine_Match = RegExpMatchArray | null;

/**
 * CLI - Generate - Must Haves - Dotenv - Parse Env File.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Content = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Returns = SharedEnvEntries;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Match = RegExpMatchArray | null;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Key = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_RawValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_ParseEnvFile_Value = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Prompt Manage Menu.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_EnvPath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_EnvSamplePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options = {
  templateDirectory: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_TemplateDirectory;
  envPath: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_EnvPath;
  envSamplePath: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_EnvSamplePath;
  isDryRun: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_IsDryRun;
  isReplaceFile: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Options_IsReplaceFile;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Returns = Promise<'back' | 'exit'>;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvPath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvSamplePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_TemplateFilePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_TemplateContent = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ReservedKeys = Set<string>;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_BufferEnv = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_BufferEnvSample = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_HasPendingChanges = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvContent = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvSampleContent = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvEntries = SharedEnvEntries;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EnvSampleEntries = SharedEnvEntries;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeletableEntries = SharedEnvEntries;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choice_Title = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choice_Description = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choice_Value = 'add' | 'edit' | 'delete' | 'exit' | 'back';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choice = {
  title: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choice_Title;
  description: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choice_Description;
  value: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choice_Value;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choices = Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Choice[];

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ActionOutputKey = 'action';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ActionOutputValue = 'add' | 'edit' | 'delete' | 'exit' | 'back' | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_MenuOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ActionOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ActionOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_Action = Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_ActionOutputValue;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddExistingKeys = Set<string>;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutputKey = 'key';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutputValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddValidateValue = unknown;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddTrimmedValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddKeyName = string | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutputKey = 'defaultValue';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutputValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValueOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddDefaultValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddTrimmedKeyName = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddTrimmedDefaultValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddUpdatedEnv = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_AddUpdatedSample = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoice_Title = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoice_Description = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoice_Value = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoice = {
  title: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoice_Title;
  description: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoice_Description;
  value: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoice_Value;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoices = Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditChoice[];

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutputKey = 'variable';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutputValue = string | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSelectedKey = string | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditCurrentEnvEntry = SharedEnvEntry | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditCurrentSampleEntry = SharedEnvEntry | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutputKey = 'value';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutputValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditEnvValueOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditNewEnvValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutputKey = 'defaultValue';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutputValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditSampleValueOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditNewSampleValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditUpdatedEnv = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_EditUpdatedSample = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoice_Title = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoice_Description = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoice_Value = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoice = {
  title: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoice_Title;
  description: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoice_Description;
  value: Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoice_Value;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoices = Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteChoice[];

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutputKey = 'variable';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutputValue = string | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteSelectedKey = string | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteUpdatedEnv = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptManageMenu_DeleteUpdatedSample = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Prompt Regenerate.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options = {
  templateDirectory: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options_TemplateDirectory;
  currentDirectory: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options_CurrentDirectory;
  isDryRun: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options_IsDryRun;
  isReplaceFile: Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Options_IsReplaceFile;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Returns = Promise<'completed' | 'cancelled'>;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Files = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_AddMore = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Cancelled = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputKey = 'key';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_ValidateValue = unknown;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TrimmedValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputResult = Record<Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_KeyOutputValue>;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputKey = 'defaultValue';

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputResult = Record<Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_DefaultValueOutputValue>;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_EnvLines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_SampleLines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TemplateFileName = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TemplatePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_TargetPath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_Content = string | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptRegenerate_AppendSection = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Prompt With Cancel.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Questions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Returns<Keys extends string, Result> = Promise<SharedPromptWithCancelResolved<Keys, Result> | SharedPromptWithCancelReject>;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Cancelled = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_PromptWithCancel_Result<Keys extends string> = Answers<Keys>;

/**
 * CLI - Generate - Must Haves - Dotenv - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Files = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvPath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvSamplePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvPathExists = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvSamplePathExists = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeChoice_Title = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeChoice_Value = 'manage' | 'regenerate';

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeChoice = {
  title: Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeChoice_Title;
  value: Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeChoice_Value;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeChoices = Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeChoice[];

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputKey = 'mode';

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputValue = 'manage' | 'regenerate' | undefined;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputResult = Record<Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputKey, Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputValue>;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_SelectedMode = Cli_Generate_MustHaves_Dotenv_Runner_Run_ModeOutputValue;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_TargetPath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_FileExists = boolean;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_TemplateFilePath = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_TemplateContent = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_ManageResult = 'back' | 'exit';

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_Result = 'completed' | 'cancelled';

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvVar_Key = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvVar_DefaultValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvVar = {
  key: Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvVar_Key;
  defaultValue: Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvVar_DefaultValue;
};

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvVars = Cli_Generate_MustHaves_Dotenv_Runner_Run_EnvVar[];

export type Cli_Generate_MustHaves_Dotenv_Runner_Run_CustomSection = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Update Env Line.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Content = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Key = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_NewValue = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Returns = string;

export type Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Lines = string[];

export type Cli_Generate_MustHaves_Dotenv_Runner_UpdateEnvLine_Match = RegExpMatchArray | null;
