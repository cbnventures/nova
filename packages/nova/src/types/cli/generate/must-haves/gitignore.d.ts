import type { PromptObject } from 'prompts';

import type { SharedGeneratorRunResult, SharedPromptWithCancelReject, SharedPromptWithCancelResolved } from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Gitignore - Add Pattern.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesGitignoreAddPatternContent = string;

export type CliGenerateMustHavesGitignoreAddPatternPattern = string;

export type CliGenerateMustHavesGitignoreAddPatternReturns = string;

export type CliGenerateMustHavesGitignoreAddPatternEndsWithNewline = boolean;

/**
 * CLI - Generate - Must Haves - Gitignore - Delete Pattern.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesGitignoreDeletePatternContent = string;

export type CliGenerateMustHavesGitignoreDeletePatternPattern = string;

export type CliGenerateMustHavesGitignoreDeletePatternReturns = string;

export type CliGenerateMustHavesGitignoreDeletePatternLines = string[];

export type CliGenerateMustHavesGitignoreDeletePatternMarkerIndex = number;

export type CliGenerateMustHavesGitignoreDeletePatternLine = string | undefined;

export type CliGenerateMustHavesGitignoreDeletePatternSectionStart = number;

/**
 * CLI - Generate - Must Haves - Gitignore - Edit Pattern.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesGitignoreEditPatternContent = string;

export type CliGenerateMustHavesGitignoreEditPatternOldPattern = string;

export type CliGenerateMustHavesGitignoreEditPatternNewPattern = string;

export type CliGenerateMustHavesGitignoreEditPatternReturns = string;

export type CliGenerateMustHavesGitignoreEditPatternLines = string[];

export type CliGenerateMustHavesGitignoreEditPatternReplaced = boolean;

/**
 * CLI - Generate - Must Haves - Gitignore - Parse All Patterns.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesGitignoreParseAllPatternsContent = string;

export type CliGenerateMustHavesGitignoreParseAllPatternsReturns = string[];

export type CliGenerateMustHavesGitignoreParseAllPatternsTrimmed = string;

/**
 * CLI - Generate - Must Haves - Gitignore - Parse Project Excludes.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesGitignoreParseProjectExcludesContent = string;

export type CliGenerateMustHavesGitignoreParseProjectExcludesReturns = string[];

export type CliGenerateMustHavesGitignoreParseProjectExcludesLines = string[];

export type CliGenerateMustHavesGitignoreParseProjectExcludesMarkerIndex = number;

export type CliGenerateMustHavesGitignoreParseProjectExcludesLine = string | undefined;

export type CliGenerateMustHavesGitignoreParseProjectExcludesStartIndex = number;

export type CliGenerateMustHavesGitignoreParseProjectExcludesTrimmed = string;

/**
 * CLI - Generate - Must Haves - Gitignore - Prompt Manage Menu.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesGitignorePromptManageMenuOptionsTemplateDirectory = string;

export type CliGenerateMustHavesGitignorePromptManageMenuOptionsTargetPath = string;

export type CliGenerateMustHavesGitignorePromptManageMenuOptionsIsDryRun = boolean;

export type CliGenerateMustHavesGitignorePromptManageMenuOptionsIsReplaceFile = boolean;

export type CliGenerateMustHavesGitignorePromptManageMenuOptions = {
  templateDirectory: CliGenerateMustHavesGitignorePromptManageMenuOptionsTemplateDirectory;
  targetPath: CliGenerateMustHavesGitignorePromptManageMenuOptionsTargetPath;
  isDryRun: CliGenerateMustHavesGitignorePromptManageMenuOptionsIsDryRun;
  isReplaceFile: CliGenerateMustHavesGitignorePromptManageMenuOptionsIsReplaceFile;
};

export type CliGenerateMustHavesGitignorePromptManageMenuReturns = Promise<'back' | 'exit'>;

export type CliGenerateMustHavesGitignorePromptManageMenuTemplateDirectory = string;

export type CliGenerateMustHavesGitignorePromptManageMenuTargetPath = string;

export type CliGenerateMustHavesGitignorePromptManageMenuIsDryRun = boolean;

export type CliGenerateMustHavesGitignorePromptManageMenuIsReplaceFile = boolean;

export type CliGenerateMustHavesGitignorePromptManageMenuTemplateFilePath = string;

export type CliGenerateMustHavesGitignorePromptManageMenuTemplateContent = string;

export type CliGenerateMustHavesGitignorePromptManageMenuReservedPatterns = Set<string>;

export type CliGenerateMustHavesGitignorePromptManageMenuCurrentContent = string;

export type CliGenerateMustHavesGitignorePromptManageMenuCurrentPatterns = string[];

export type CliGenerateMustHavesGitignorePromptManageMenuUserPatterns = string[];

export type CliGenerateMustHavesGitignorePromptManageMenuReconstructed = string;

export type CliGenerateMustHavesGitignorePromptManageMenuHasPendingChanges = boolean;

export type CliGenerateMustHavesGitignorePromptManageMenuContent = string;

export type CliGenerateMustHavesGitignorePromptManageMenuAllPatterns = string[];

export type CliGenerateMustHavesGitignorePromptManageMenuProjectExcludes = string[];

export type CliGenerateMustHavesGitignorePromptManageMenuChoiceTitle = string;

export type CliGenerateMustHavesGitignorePromptManageMenuChoiceDescription = string;

export type CliGenerateMustHavesGitignorePromptManageMenuChoiceValue = 'add' | 'edit' | 'delete' | 'exit' | 'back';

export type CliGenerateMustHavesGitignorePromptManageMenuChoice = {
  title: CliGenerateMustHavesGitignorePromptManageMenuChoiceTitle;
  description: CliGenerateMustHavesGitignorePromptManageMenuChoiceDescription;
  value: CliGenerateMustHavesGitignorePromptManageMenuChoiceValue;
};

export type CliGenerateMustHavesGitignorePromptManageMenuChoices = CliGenerateMustHavesGitignorePromptManageMenuChoice[];

export type CliGenerateMustHavesGitignorePromptManageMenuActionOutputKey = 'action';

export type CliGenerateMustHavesGitignorePromptManageMenuActionOutputValue = 'add' | 'edit' | 'delete' | 'exit' | 'back' | undefined;

export type CliGenerateMustHavesGitignorePromptManageMenuMenuOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesGitignorePromptManageMenuActionOutputKey, CliGenerateMustHavesGitignorePromptManageMenuActionOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesGitignorePromptManageMenuAction = CliGenerateMustHavesGitignorePromptManageMenuActionOutputValue;

export type CliGenerateMustHavesGitignorePromptManageMenuExistingPatterns = Set<string>;

export type CliGenerateMustHavesGitignorePromptManageMenuAddPatternOutputKey = 'pattern';

export type CliGenerateMustHavesGitignorePromptManageMenuAddPatternOutputValue = string;

export type CliGenerateMustHavesGitignorePromptManageMenuPatternOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesGitignorePromptManageMenuAddPatternOutputKey, CliGenerateMustHavesGitignorePromptManageMenuAddPatternOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesGitignorePromptManageMenuAddPatternValidateValue = unknown;

export type CliGenerateMustHavesGitignorePromptManageMenuTrimmedValue = string;

export type CliGenerateMustHavesGitignorePromptManageMenuPatternName = string | undefined;

export type CliGenerateMustHavesGitignorePromptManageMenuTrimmedPatternName = string;

export type CliGenerateMustHavesGitignorePromptManageMenuUpdatedContent = string;

export type CliGenerateMustHavesGitignorePromptManageMenuEditChoiceTitle = string;

export type CliGenerateMustHavesGitignorePromptManageMenuEditChoiceValue = string;

export type CliGenerateMustHavesGitignorePromptManageMenuEditChoice = {
  title: CliGenerateMustHavesGitignorePromptManageMenuEditChoiceTitle;
  value: CliGenerateMustHavesGitignorePromptManageMenuEditChoiceValue;
};

export type CliGenerateMustHavesGitignorePromptManageMenuEditChoices = CliGenerateMustHavesGitignorePromptManageMenuEditChoice[];

export type CliGenerateMustHavesGitignorePromptManageMenuEditSelectOutputKey = 'pattern';

export type CliGenerateMustHavesGitignorePromptManageMenuEditSelectOutputValue = string | undefined;

export type CliGenerateMustHavesGitignorePromptManageMenuSelectOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesGitignorePromptManageMenuEditSelectOutputKey, CliGenerateMustHavesGitignorePromptManageMenuEditSelectOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesGitignorePromptManageMenuSelectedPattern = string | undefined;

export type CliGenerateMustHavesGitignorePromptManageMenuEditNewPatternOutputKey = 'newPattern';

export type CliGenerateMustHavesGitignorePromptManageMenuEditNewPatternOutputValue = string;

export type CliGenerateMustHavesGitignorePromptManageMenuNewPatternOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesGitignorePromptManageMenuEditNewPatternOutputKey, CliGenerateMustHavesGitignorePromptManageMenuEditNewPatternOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesGitignorePromptManageMenuEditPatternValidateValue = unknown;

export type CliGenerateMustHavesGitignorePromptManageMenuNewPattern = string | undefined;

export type CliGenerateMustHavesGitignorePromptManageMenuTrimmedNewPattern = string;

export type CliGenerateMustHavesGitignorePromptManageMenuDeleteChoiceTitle = string;

export type CliGenerateMustHavesGitignorePromptManageMenuDeleteChoiceValue = string;

export type CliGenerateMustHavesGitignorePromptManageMenuDeleteChoice = {
  title: CliGenerateMustHavesGitignorePromptManageMenuDeleteChoiceTitle;
  value: CliGenerateMustHavesGitignorePromptManageMenuDeleteChoiceValue;
};

export type CliGenerateMustHavesGitignorePromptManageMenuDeleteChoices = CliGenerateMustHavesGitignorePromptManageMenuDeleteChoice[];

export type CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutputKey = 'pattern';

export type CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutputValue = string | undefined;

export type CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutputKey, CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesGitignorePromptManageMenuDeleteSelectedPattern = string | undefined;

/**
 * CLI - Generate - Must Haves - Gitignore - Prompt Regenerate.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesGitignorePromptRegenerateOptionsTemplateDirectory = string;

export type CliGenerateMustHavesGitignorePromptRegenerateOptionsCurrentDirectory = string;

export type CliGenerateMustHavesGitignorePromptRegenerateOptionsIsDryRun = boolean;

export type CliGenerateMustHavesGitignorePromptRegenerateOptionsIsReplaceFile = boolean;

export type CliGenerateMustHavesGitignorePromptRegenerateOptions = {
  templateDirectory: CliGenerateMustHavesGitignorePromptRegenerateOptionsTemplateDirectory;
  currentDirectory: CliGenerateMustHavesGitignorePromptRegenerateOptionsCurrentDirectory;
  isDryRun: CliGenerateMustHavesGitignorePromptRegenerateOptionsIsDryRun;
  isReplaceFile: CliGenerateMustHavesGitignorePromptRegenerateOptionsIsReplaceFile;
};

export type CliGenerateMustHavesGitignorePromptRegenerateReturns = Promise<'completed' | 'cancelled'>;

export type CliGenerateMustHavesGitignorePromptRegenerateTemplateDirectory = string;

export type CliGenerateMustHavesGitignorePromptRegenerateCurrentDirectory = string;

export type CliGenerateMustHavesGitignorePromptRegenerateIsDryRun = boolean;

export type CliGenerateMustHavesGitignorePromptRegenerateIsReplaceFile = boolean;

export type CliGenerateMustHavesGitignorePromptRegenerateCustomEntries = string[];

export type CliGenerateMustHavesGitignorePromptRegenerateAddMore = boolean;

export type CliGenerateMustHavesGitignorePromptRegenerateCancelled = boolean;

export type CliGenerateMustHavesGitignorePromptRegenerateEntryOutputKey = 'entry';

export type CliGenerateMustHavesGitignorePromptRegenerateEntryOutputValue = string;

export type CliGenerateMustHavesGitignorePromptRegenerateEntryOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesGitignorePromptRegenerateEntryOutputKey, CliGenerateMustHavesGitignorePromptRegenerateEntryOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesGitignorePromptRegenerateEntryOutputResult = Record<CliGenerateMustHavesGitignorePromptRegenerateEntryOutputKey, CliGenerateMustHavesGitignorePromptRegenerateEntryOutputValue>;

export type CliGenerateMustHavesGitignorePromptRegenerateTrimmedEntry = string;

export type CliGenerateMustHavesGitignorePromptRegenerateTemplatePath = string;

export type CliGenerateMustHavesGitignorePromptRegenerateTargetPath = string;

export type CliGenerateMustHavesGitignorePromptRegenerateContent = string | undefined;

export type CliGenerateMustHavesGitignorePromptRegenerateFinalContent = string;

/**
 * CLI - Generate - Must Haves - Gitignore - Prompt With Cancel.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesGitignorePromptWithCancelQuestions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type CliGenerateMustHavesGitignorePromptWithCancelReturns<Keys extends string, Result> = Promise<SharedPromptWithCancelResolved<Keys, Result> | SharedPromptWithCancelReject>;

export type CliGenerateMustHavesGitignorePromptWithCancelCancelled = boolean;

export type CliGenerateMustHavesGitignorePromptWithCancelResult<Keys extends string, Result = unknown> = Record<Keys, Result>;

/**
 * CLI - Generate - Must Haves - Gitignore - Run.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesGitignoreRunOptionsDryRun = true;

export type CliGenerateMustHavesGitignoreRunOptionsReplaceFile = true;

export type CliGenerateMustHavesGitignoreRunOptions = {
  dryRun?: CliGenerateMustHavesGitignoreRunOptionsDryRun;
  replaceFile?: CliGenerateMustHavesGitignoreRunOptionsReplaceFile;
};

export type CliGenerateMustHavesGitignoreRunReturns = Promise<SharedGeneratorRunResult>;

export type CliGenerateMustHavesGitignoreRunCurrentDirectory = string;

export type CliGenerateMustHavesGitignoreRunIsAtProjectRoot = boolean;

export type CliGenerateMustHavesGitignoreRunIsDryRun = boolean;

export type CliGenerateMustHavesGitignoreRunIsReplaceFile = boolean;

export type CliGenerateMustHavesGitignoreRunReplaceFileNotice = string;

export type CliGenerateMustHavesGitignoreRunTemplateDirectory = string;

export type CliGenerateMustHavesGitignoreRunTargetPath = string;

export type CliGenerateMustHavesGitignoreRunFileExists = boolean;

export type CliGenerateMustHavesGitignoreRunModeChoiceTitle = string;

export type CliGenerateMustHavesGitignoreRunModeChoiceValue = 'manage' | 'regenerate';

export type CliGenerateMustHavesGitignoreRunModeChoice = {
  title: CliGenerateMustHavesGitignoreRunModeChoiceTitle;
  value: CliGenerateMustHavesGitignoreRunModeChoiceValue;
};

export type CliGenerateMustHavesGitignoreRunModeChoices = CliGenerateMustHavesGitignoreRunModeChoice[];

export type CliGenerateMustHavesGitignoreRunModeOutputKey = 'mode';

export type CliGenerateMustHavesGitignoreRunModeOutputValue = 'manage' | 'regenerate' | undefined;

export type CliGenerateMustHavesGitignoreRunModeOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesGitignoreRunModeOutputKey, CliGenerateMustHavesGitignoreRunModeOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesGitignoreRunModeOutputResult = Record<CliGenerateMustHavesGitignoreRunModeOutputKey, CliGenerateMustHavesGitignoreRunModeOutputValue>;

export type CliGenerateMustHavesGitignoreRunManageResult = 'back' | 'exit';

export type CliGenerateMustHavesGitignoreRunResult = 'completed' | 'cancelled';
