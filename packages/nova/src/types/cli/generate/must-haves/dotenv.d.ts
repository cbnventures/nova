import type { Answers, PromptObject } from 'prompts';

import type {
  SharedEnvEntries,
  SharedEnvEntry,
  SharedGeneratorRunResult,
  SharedPromptWithCancelReject,
  SharedPromptWithCancelResolved,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Dotenv - Add Env Line.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesDotenvAddEnvLineContent = string;

export type CliGenerateMustHavesDotenvAddEnvLineKey = string;

export type CliGenerateMustHavesDotenvAddEnvLineValue = string;

export type CliGenerateMustHavesDotenvAddEnvLineReturns = string;

export type CliGenerateMustHavesDotenvAddEnvLineEndsWithNewline = boolean;

export type CliGenerateMustHavesDotenvAddEnvLineNewLine = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Delete Env Line.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesDotenvDeleteEnvLineContent = string;

export type CliGenerateMustHavesDotenvDeleteEnvLineKey = string;

export type CliGenerateMustHavesDotenvDeleteEnvLineReturns = string;

export type CliGenerateMustHavesDotenvDeleteEnvLineLines = string[];

export type CliGenerateMustHavesDotenvDeleteEnvLineMatch = RegExpMatchArray | null;

/**
 * CLI - Generate - Must Haves - Dotenv - Parse Env File.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesDotenvParseEnvFileContent = string;

export type CliGenerateMustHavesDotenvParseEnvFileReturns = SharedEnvEntries;

export type CliGenerateMustHavesDotenvParseEnvFileMatch = RegExpMatchArray | null;

export type CliGenerateMustHavesDotenvParseEnvFileKey = string;

export type CliGenerateMustHavesDotenvParseEnvFileRawValue = string;

export type CliGenerateMustHavesDotenvParseEnvFileValue = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Prompt Manage Menu.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesDotenvPromptManageMenuOptionsTemplateDirectory = string;

export type CliGenerateMustHavesDotenvPromptManageMenuOptionsEnvPath = string;

export type CliGenerateMustHavesDotenvPromptManageMenuOptionsEnvSamplePath = string;

export type CliGenerateMustHavesDotenvPromptManageMenuOptionsIsDryRun = boolean;

export type CliGenerateMustHavesDotenvPromptManageMenuOptionsIsReplaceFile = boolean;

export type CliGenerateMustHavesDotenvPromptManageMenuOptions = {
  templateDirectory: CliGenerateMustHavesDotenvPromptManageMenuOptionsTemplateDirectory;
  envPath: CliGenerateMustHavesDotenvPromptManageMenuOptionsEnvPath;
  envSamplePath: CliGenerateMustHavesDotenvPromptManageMenuOptionsEnvSamplePath;
  isDryRun: CliGenerateMustHavesDotenvPromptManageMenuOptionsIsDryRun;
  isReplaceFile: CliGenerateMustHavesDotenvPromptManageMenuOptionsIsReplaceFile;
};

export type CliGenerateMustHavesDotenvPromptManageMenuReturns = Promise<'back' | 'exit'>;

export type CliGenerateMustHavesDotenvPromptManageMenuTemplateDirectory = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEnvPath = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEnvSamplePath = string;

export type CliGenerateMustHavesDotenvPromptManageMenuIsDryRun = boolean;

export type CliGenerateMustHavesDotenvPromptManageMenuIsReplaceFile = boolean;

export type CliGenerateMustHavesDotenvPromptManageMenuTemplateFilePath = string;

export type CliGenerateMustHavesDotenvPromptManageMenuTemplateContent = string;

export type CliGenerateMustHavesDotenvPromptManageMenuReservedKeys = Set<string>;

export type CliGenerateMustHavesDotenvPromptManageMenuBufferEnv = string;

export type CliGenerateMustHavesDotenvPromptManageMenuBufferEnvSample = string;

export type CliGenerateMustHavesDotenvPromptManageMenuHasPendingChanges = boolean;

export type CliGenerateMustHavesDotenvPromptManageMenuEnvContent = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEnvSampleContent = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEnvEntries = SharedEnvEntries;

export type CliGenerateMustHavesDotenvPromptManageMenuEnvSampleEntries = SharedEnvEntries;

export type CliGenerateMustHavesDotenvPromptManageMenuDeletableEntries = SharedEnvEntries;

export type CliGenerateMustHavesDotenvPromptManageMenuChoiceTitle = string;

export type CliGenerateMustHavesDotenvPromptManageMenuChoiceDescription = string;

export type CliGenerateMustHavesDotenvPromptManageMenuChoiceValue = 'add' | 'edit' | 'delete' | 'exit' | 'back';

export type CliGenerateMustHavesDotenvPromptManageMenuChoice = {
  title: CliGenerateMustHavesDotenvPromptManageMenuChoiceTitle;
  description: CliGenerateMustHavesDotenvPromptManageMenuChoiceDescription;
  value: CliGenerateMustHavesDotenvPromptManageMenuChoiceValue;
};

export type CliGenerateMustHavesDotenvPromptManageMenuChoices = CliGenerateMustHavesDotenvPromptManageMenuChoice[];

export type CliGenerateMustHavesDotenvPromptManageMenuActionOutputKey = 'action';

export type CliGenerateMustHavesDotenvPromptManageMenuActionOutputValue = 'add' | 'edit' | 'delete' | 'exit' | 'back' | undefined;

export type CliGenerateMustHavesDotenvPromptManageMenuMenuOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvPromptManageMenuActionOutputKey, CliGenerateMustHavesDotenvPromptManageMenuActionOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvPromptManageMenuAction = CliGenerateMustHavesDotenvPromptManageMenuActionOutputValue;

export type CliGenerateMustHavesDotenvPromptManageMenuAddExistingKeys = Set<string>;

export type CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutputKey = 'key';

export type CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutputValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutputKey, CliGenerateMustHavesDotenvPromptManageMenuAddKeyOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvPromptManageMenuAddValidateValue = unknown;

export type CliGenerateMustHavesDotenvPromptManageMenuAddTrimmedValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuAddKeyName = string | undefined;

export type CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutputKey = 'defaultValue';

export type CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutputValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutputKey, CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValueOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvPromptManageMenuAddDefaultValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuAddTrimmedKeyName = string;

export type CliGenerateMustHavesDotenvPromptManageMenuAddTrimmedDefaultValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuAddUpdatedEnv = string;

export type CliGenerateMustHavesDotenvPromptManageMenuAddUpdatedSample = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEditChoiceTitle = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEditChoiceDescription = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEditChoiceValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEditChoice = {
  title: CliGenerateMustHavesDotenvPromptManageMenuEditChoiceTitle;
  description: CliGenerateMustHavesDotenvPromptManageMenuEditChoiceDescription;
  value: CliGenerateMustHavesDotenvPromptManageMenuEditChoiceValue;
};

export type CliGenerateMustHavesDotenvPromptManageMenuEditChoices = CliGenerateMustHavesDotenvPromptManageMenuEditChoice[];

export type CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutputKey = 'variable';

export type CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutputValue = string | undefined;

export type CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutputKey, CliGenerateMustHavesDotenvPromptManageMenuEditSelectOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvPromptManageMenuEditSelectedKey = string | undefined;

export type CliGenerateMustHavesDotenvPromptManageMenuEditCurrentEnvEntry = SharedEnvEntry | undefined;

export type CliGenerateMustHavesDotenvPromptManageMenuEditCurrentSampleEntry = SharedEnvEntry | undefined;

export type CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutputKey = 'value';

export type CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutputValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutputKey, CliGenerateMustHavesDotenvPromptManageMenuEditEnvValueOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvPromptManageMenuEditNewEnvValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutputKey = 'defaultValue';

export type CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutputValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutputKey, CliGenerateMustHavesDotenvPromptManageMenuEditSampleValueOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvPromptManageMenuEditNewSampleValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEditUpdatedEnv = string;

export type CliGenerateMustHavesDotenvPromptManageMenuEditUpdatedSample = string;

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteChoiceTitle = string;

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteChoiceDescription = string;

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteChoiceValue = string;

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteChoice = {
  title: CliGenerateMustHavesDotenvPromptManageMenuDeleteChoiceTitle;
  description: CliGenerateMustHavesDotenvPromptManageMenuDeleteChoiceDescription;
  value: CliGenerateMustHavesDotenvPromptManageMenuDeleteChoiceValue;
};

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteChoices = CliGenerateMustHavesDotenvPromptManageMenuDeleteChoice[];

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutputKey = 'variable';

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutputValue = string | undefined;

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutputKey, CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteSelectedKey = string | undefined;

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteUpdatedEnv = string;

export type CliGenerateMustHavesDotenvPromptManageMenuDeleteUpdatedSample = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Prompt Regenerate.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesDotenvPromptRegenerateOptionsTemplateDirectory = string;

export type CliGenerateMustHavesDotenvPromptRegenerateOptionsCurrentDirectory = string;

export type CliGenerateMustHavesDotenvPromptRegenerateOptionsIsDryRun = boolean;

export type CliGenerateMustHavesDotenvPromptRegenerateOptionsIsReplaceFile = boolean;

export type CliGenerateMustHavesDotenvPromptRegenerateOptions = {
  templateDirectory: CliGenerateMustHavesDotenvPromptRegenerateOptionsTemplateDirectory;
  currentDirectory: CliGenerateMustHavesDotenvPromptRegenerateOptionsCurrentDirectory;
  isDryRun: CliGenerateMustHavesDotenvPromptRegenerateOptionsIsDryRun;
  isReplaceFile: CliGenerateMustHavesDotenvPromptRegenerateOptionsIsReplaceFile;
};

export type CliGenerateMustHavesDotenvPromptRegenerateReturns = Promise<'completed' | 'cancelled'>;

export type CliGenerateMustHavesDotenvPromptRegenerateTemplateDirectory = string;

export type CliGenerateMustHavesDotenvPromptRegenerateCurrentDirectory = string;

export type CliGenerateMustHavesDotenvPromptRegenerateIsDryRun = boolean;

export type CliGenerateMustHavesDotenvPromptRegenerateIsReplaceFile = boolean;

export type CliGenerateMustHavesDotenvPromptRegenerateFiles = string[];

export type CliGenerateMustHavesDotenvPromptRegenerateAddMore = boolean;

export type CliGenerateMustHavesDotenvPromptRegenerateCancelled = boolean;

export type CliGenerateMustHavesDotenvPromptRegenerateKeyOutputKey = 'key';

export type CliGenerateMustHavesDotenvPromptRegenerateKeyOutputValue = string;

export type CliGenerateMustHavesDotenvPromptRegenerateKeyOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvPromptRegenerateKeyOutputKey, CliGenerateMustHavesDotenvPromptRegenerateKeyOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvPromptRegenerateValidateValue = unknown;

export type CliGenerateMustHavesDotenvPromptRegenerateTrimmedValue = string;

export type CliGenerateMustHavesDotenvPromptRegenerateKeyOutputResult = Record<CliGenerateMustHavesDotenvPromptRegenerateKeyOutputKey, CliGenerateMustHavesDotenvPromptRegenerateKeyOutputValue>;

export type CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputKey = 'defaultValue';

export type CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputValue = string;

export type CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputKey, CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputResult = Record<CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputKey, CliGenerateMustHavesDotenvPromptRegenerateDefaultValueOutputValue>;

export type CliGenerateMustHavesDotenvPromptRegenerateEnvLines = string[];

export type CliGenerateMustHavesDotenvPromptRegenerateSampleLines = string[];

export type CliGenerateMustHavesDotenvPromptRegenerateTemplatePath = string;

export type CliGenerateMustHavesDotenvPromptRegenerateTargetPath = string;

export type CliGenerateMustHavesDotenvPromptRegenerateContent = string | undefined;

export type CliGenerateMustHavesDotenvPromptRegenerateAppendSection = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Prompt With Cancel.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesDotenvPromptWithCancelQuestions<Keys extends string> = PromptObject<Keys> | PromptObject<Keys>[];

export type CliGenerateMustHavesDotenvPromptWithCancelReturns<Keys extends string, Result> = Promise<SharedPromptWithCancelResolved<Keys, Result> | SharedPromptWithCancelReject>;

export type CliGenerateMustHavesDotenvPromptWithCancelCancelled = boolean;

export type CliGenerateMustHavesDotenvPromptWithCancelResult<Keys extends string> = Answers<Keys>;

/**
 * CLI - Generate - Must Haves - Dotenv - Run.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesDotenvRunOptionsDryRun = true;

export type CliGenerateMustHavesDotenvRunOptionsReplaceFile = true;

export type CliGenerateMustHavesDotenvRunOptions = {
  dryRun?: CliGenerateMustHavesDotenvRunOptionsDryRun;
  replaceFile?: CliGenerateMustHavesDotenvRunOptionsReplaceFile;
};

export type CliGenerateMustHavesDotenvRunReturns = Promise<SharedGeneratorRunResult>;

export type CliGenerateMustHavesDotenvRunCurrentDirectory = string;

export type CliGenerateMustHavesDotenvRunIsAtProjectRoot = boolean;

export type CliGenerateMustHavesDotenvRunIsDryRun = boolean;

export type CliGenerateMustHavesDotenvRunIsReplaceFile = boolean;

export type CliGenerateMustHavesDotenvRunReplaceFileNotice = string;

export type CliGenerateMustHavesDotenvRunTemplateDirectory = string;

export type CliGenerateMustHavesDotenvRunFiles = string[];

export type CliGenerateMustHavesDotenvRunEnvPath = string;

export type CliGenerateMustHavesDotenvRunEnvSamplePath = string;

export type CliGenerateMustHavesDotenvRunEnvPathExists = boolean;

export type CliGenerateMustHavesDotenvRunEnvSamplePathExists = boolean;

export type CliGenerateMustHavesDotenvRunModeChoiceTitle = string;

export type CliGenerateMustHavesDotenvRunModeChoiceValue = 'manage' | 'regenerate';

export type CliGenerateMustHavesDotenvRunModeChoice = {
  title: CliGenerateMustHavesDotenvRunModeChoiceTitle;
  value: CliGenerateMustHavesDotenvRunModeChoiceValue;
};

export type CliGenerateMustHavesDotenvRunModeChoices = CliGenerateMustHavesDotenvRunModeChoice[];

export type CliGenerateMustHavesDotenvRunModeOutputKey = 'mode';

export type CliGenerateMustHavesDotenvRunModeOutputValue = 'manage' | 'regenerate' | undefined;

export type CliGenerateMustHavesDotenvRunModeOutput = SharedPromptWithCancelResolved<CliGenerateMustHavesDotenvRunModeOutputKey, CliGenerateMustHavesDotenvRunModeOutputValue> | SharedPromptWithCancelReject;

export type CliGenerateMustHavesDotenvRunModeOutputResult = Record<CliGenerateMustHavesDotenvRunModeOutputKey, CliGenerateMustHavesDotenvRunModeOutputValue>;

export type CliGenerateMustHavesDotenvRunSelectedMode = CliGenerateMustHavesDotenvRunModeOutputValue;

export type CliGenerateMustHavesDotenvRunTargetPath = string;

export type CliGenerateMustHavesDotenvRunFileExists = boolean;

export type CliGenerateMustHavesDotenvRunTemplateFilePath = string;

export type CliGenerateMustHavesDotenvRunTemplateContent = string;

export type CliGenerateMustHavesDotenvRunManageResult = 'back' | 'exit';

export type CliGenerateMustHavesDotenvRunResult = 'completed' | 'cancelled';

export type CliGenerateMustHavesDotenvRunEnvVarKey = string;

export type CliGenerateMustHavesDotenvRunEnvVarDefaultValue = string;

export type CliGenerateMustHavesDotenvRunEnvVar = {
  key: CliGenerateMustHavesDotenvRunEnvVarKey;
  defaultValue: CliGenerateMustHavesDotenvRunEnvVarDefaultValue;
};

export type CliGenerateMustHavesDotenvRunEnvVars = CliGenerateMustHavesDotenvRunEnvVar[];

export type CliGenerateMustHavesDotenvRunCustomSection = string;

/**
 * CLI - Generate - Must Haves - Dotenv - Update Env Line.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesDotenvUpdateEnvLineContent = string;

export type CliGenerateMustHavesDotenvUpdateEnvLineKey = string;

export type CliGenerateMustHavesDotenvUpdateEnvLineNewValue = string;

export type CliGenerateMustHavesDotenvUpdateEnvLineReturns = string;

export type CliGenerateMustHavesDotenvUpdateEnvLineLines = string[];

export type CliGenerateMustHavesDotenvUpdateEnvLineMatch = RegExpMatchArray | null;
