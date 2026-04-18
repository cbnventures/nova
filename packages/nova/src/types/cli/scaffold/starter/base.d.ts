import type { PromptObject } from 'prompts';

import type { SharedMonorepoContext } from '../../../shared.d.ts';

/**
 * CLI - Scaffold - Starter - Base - Run.
 *
 * @since 0.15.0
 */
export type CliScaffoldStarterBaseRunOptionsDryRun = true;

export type CliScaffoldStarterBaseRunOptionsName = string;

export type CliScaffoldStarterBaseRunOptionsOutput = string;

export type CliScaffoldStarterBaseRunOptions = {
  dryRun?: CliScaffoldStarterBaseRunOptionsDryRun;
  name?: CliScaffoldStarterBaseRunOptionsName;
  output?: CliScaffoldStarterBaseRunOptionsOutput;
};

export type CliScaffoldStarterBaseRunReturns = Promise<void>;

export type CliScaffoldStarterBaseRunCurrentDirectory = string;

export type CliScaffoldStarterBaseRunIsDryRun = boolean;

export type CliScaffoldStarterBaseRunContext = SharedMonorepoContext;

export type CliScaffoldStarterBaseRunCancelled = boolean;

export type CliScaffoldStarterBaseRunNameQuestions = PromptObject<string>[];

export type CliScaffoldStarterBaseRunNameAnswers = Record<string, unknown>;

export type CliScaffoldStarterBaseRunResolvedName = string;

export type CliScaffoldStarterBaseRunOutputDirectory = string | undefined;

export type CliScaffoldStarterBaseRunDirectoryChoiceItemTitle = string;

export type CliScaffoldStarterBaseRunDirectoryChoiceItemValue = 'new-directory' | 'current-directory';

export type CliScaffoldStarterBaseRunDirectoryChoiceItem = {
  title: CliScaffoldStarterBaseRunDirectoryChoiceItemTitle;
  value: CliScaffoldStarterBaseRunDirectoryChoiceItemValue;
};

export type CliScaffoldStarterBaseRunDirectoryChoices = CliScaffoldStarterBaseRunDirectoryChoiceItem[];

export type CliScaffoldStarterBaseRunDirectoryAnswers = Record<string, unknown>;

export type CliScaffoldStarterBaseRunSelectedDirectoryChoice = string;

export type CliScaffoldStarterBaseRunOutputAnswers = Record<string, unknown>;

export type CliScaffoldStarterBaseRunResolvedOutput = string;
