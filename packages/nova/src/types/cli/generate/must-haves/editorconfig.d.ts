import type { SharedGeneratorRunResult } from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Editorconfig - Run.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesEditorconfigRunOptionsDryRun = true;

export type CliGenerateMustHavesEditorconfigRunOptionsReplaceFile = true;

export type CliGenerateMustHavesEditorconfigRunOptions = {
  dryRun?: CliGenerateMustHavesEditorconfigRunOptionsDryRun;
  replaceFile?: CliGenerateMustHavesEditorconfigRunOptionsReplaceFile;
};

export type CliGenerateMustHavesEditorconfigRunReturns = Promise<SharedGeneratorRunResult>;

export type CliGenerateMustHavesEditorconfigRunCurrentDirectory = string;

export type CliGenerateMustHavesEditorconfigRunIsAtProjectRoot = boolean;

export type CliGenerateMustHavesEditorconfigRunIsDryRun = boolean;

export type CliGenerateMustHavesEditorconfigRunIsReplaceFile = boolean;

export type CliGenerateMustHavesEditorconfigRunReplaceFileNotice = string;

export type CliGenerateMustHavesEditorconfigRunTemplateDirectory = string;

export type CliGenerateMustHavesEditorconfigRunTemplatePath = string;

export type CliGenerateMustHavesEditorconfigRunContent = string;

export type CliGenerateMustHavesEditorconfigRunTargetPath = string;
