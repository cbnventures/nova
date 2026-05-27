import type { PromptObject } from 'prompts';

import type { Shared_GeneratorRunResult as SharedGeneratorRunResult, Shared_PromptWithCancelReject as SharedPromptWithCancelReject, Shared_PromptWithCancelResolved as SharedPromptWithCancelResolved } from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Gitignore - Add Pattern.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Content = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Pattern = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_Returns = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_AddPattern_EndsWithNewline = boolean;

/**
 * CLI - Generate - Must Haves - Gitignore - Delete Pattern.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Content = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Pattern = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Returns = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Lines = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_MarkerIndex = number;

export type Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_Line = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_DeletePattern_SectionStart = number;

/**
 * CLI - Generate - Must Haves - Gitignore - Edit Pattern.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Content = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_OldPattern = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_NewPattern = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Returns = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Lines = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_EditPattern_Replaced = boolean;

/**
 * CLI - Generate - Must Haves - Gitignore - Parse All Patterns.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Content = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Returns = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_ParseAllPatterns_Trimmed = string;

/**
 * CLI - Generate - Must Haves - Gitignore - Parse Project Excludes.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Content = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Returns = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Lines = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_MarkerIndex = number;

export type Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Line = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_StartIndex = number;

export type Cli_Generate_MustHaves_Gitignore_Runner_ParseProjectExcludes_Trimmed = string;

/**
 * CLI - Generate - Must Haves - Gitignore - Prompt Manage Menu.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options_TargetPath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options = {
  templateDirectory: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options_TemplateDirectory;
  targetPath: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options_TargetPath;
  isDryRun: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options_IsDryRun;
  isReplaceFile: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Options_IsReplaceFile;
};

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Returns = Promise<'back' | 'exit'>;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TargetPath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TemplateFilePath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TemplateContent = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ReservedPatterns = Set<string>;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_CurrentContent = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_CurrentPatterns = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_UserPatterns = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Reconstructed = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_HasPendingChanges = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Content = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AllPatterns = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ProjectExcludes = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choice_Title = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choice_Description = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choice_Value = 'add' | 'edit' | 'delete' | 'exit' | 'back';

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choice = {
  title: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choice_Title;
  description: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choice_Description;
  value: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choice_Value;
};

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choices = Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Choice[];

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ActionOutputKey = 'action';

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ActionOutputValue = 'add' | 'edit' | 'delete' | 'exit' | 'back' | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_MenuOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ActionOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ActionOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_Action = Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ActionOutputValue;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_ExistingPatterns = Set<string>;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddPatternOutputKey = 'pattern';

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddPatternOutputValue = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_PatternOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddPatternOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddPatternOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_AddPatternValidateValue = unknown;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TrimmedValue = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_PatternName = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TrimmedPatternName = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_UpdatedContent = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditChoice_Title = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditChoice_Value = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditChoice = {
  title: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditChoice_Title;
  value: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditChoice_Value;
};

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditChoices = Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditChoice[];

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutputKey = 'pattern';

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutputValue = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_SelectOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditSelectOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_SelectedPattern = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditNewPatternOutputKey = 'newPattern';

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditNewPatternOutputValue = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_NewPatternOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditNewPatternOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditNewPatternOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_EditPatternValidateValue = unknown;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_NewPattern = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_TrimmedNewPattern = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteChoice_Title = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteChoice_Value = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteChoice = {
  title: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteChoice_Title;
  value: Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteChoice_Value;
};

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteChoices = Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteChoice[];

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutputKey = 'pattern';

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutputValue = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptManageMenu_DeleteSelectedPattern = string | undefined;

/**
 * CLI - Generate - Must Haves - Gitignore - Prompt Regenerate.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options = {
  templateDirectory: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options_TemplateDirectory;
  currentDirectory: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options_CurrentDirectory;
  isDryRun: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options_IsDryRun;
  isReplaceFile: Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Options_IsReplaceFile;
};

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Returns = Promise<'completed' | 'cancelled'>;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_CustomEntries = string[];

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_AddMore = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Cancelled = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputKey = 'entry';

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputValue = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputResult = Record<Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_EntryOutputValue>;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TrimmedEntry = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TemplatePath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_TargetPath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_Content = string | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptRegenerate_FinalContent = string;

/**
 * CLI - Generate - Must Haves - Gitignore - Prompt With Cancel.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Questions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Returns<Keys extends string, Result> = Promise<SharedPromptWithCancelResolved<Keys, Result> | SharedPromptWithCancelReject>;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Cancelled = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_PromptWithCancel_Result<Keys extends string, Result = unknown> = Record<Keys, Result>;

/**
 * CLI - Generate - Must Haves - Gitignore - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_Gitignore_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_Gitignore_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_TargetPath = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_FileExists = boolean;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeChoice_Title = string;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeChoice_Value = 'manage' | 'regenerate';

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeChoice = {
  title: Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeChoice_Title;
  value: Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeChoice_Value;
};

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeChoices = Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeChoice[];

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputKey = 'mode';

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputValue = 'manage' | 'regenerate' | undefined;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutput = SharedPromptWithCancelResolved<Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputValue> | SharedPromptWithCancelReject;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputResult = Record<Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputKey, Cli_Generate_MustHaves_Gitignore_Runner_Run_ModeOutputValue>;

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_ManageResult = 'back' | 'exit';

export type Cli_Generate_MustHaves_Gitignore_Runner_Run_Result = 'completed' | 'cancelled';
