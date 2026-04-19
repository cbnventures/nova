import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type { SharedGeneratorRunResult, SharedNovaConfig, SharedNovaConfigProjectLicense } from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - License - Run.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesLicenseRunOptionsDryRun = true;

export type CliGenerateMustHavesLicenseRunOptionsReplaceFile = true;

export type CliGenerateMustHavesLicenseRunOptions = {
  dryRun?: CliGenerateMustHavesLicenseRunOptionsDryRun;
  replaceFile?: CliGenerateMustHavesLicenseRunOptionsReplaceFile;
};

export type CliGenerateMustHavesLicenseRunReturns = Promise<SharedGeneratorRunResult>;

export type CliGenerateMustHavesLicenseRunCurrentDirectory = string;

export type CliGenerateMustHavesLicenseRunIsAtProjectRoot = boolean;

export type CliGenerateMustHavesLicenseRunIsDryRun = boolean;

export type CliGenerateMustHavesLicenseRunIsReplaceFile = boolean;

export type CliGenerateMustHavesLicenseRunReplaceFileNotice = string;

export type CliGenerateMustHavesLicenseRunNovaConfig = LibNovaConfig;

export type CliGenerateMustHavesLicenseRunWorkingFile = SharedNovaConfig;

export type CliGenerateMustHavesLicenseRunProject = SharedNovaConfig['project'];

export type CliGenerateMustHavesLicenseRunEntityName = string;

export type CliGenerateMustHavesLicenseRunCurrentYear = number;

export type CliGenerateMustHavesLicenseRunStartingYear = number;

export type CliGenerateMustHavesLicenseRunYearRange = string;

export type CliGenerateMustHavesLicenseRunLicenseId = SharedNovaConfigProjectLicense | undefined;

export type CliGenerateMustHavesLicenseRunLicenseChoiceTitle = string;

export type CliGenerateMustHavesLicenseRunLicenseChoiceValue = SharedNovaConfigProjectLicense;

export type CliGenerateMustHavesLicenseRunLicenseChoice = {
  title: CliGenerateMustHavesLicenseRunLicenseChoiceTitle;
  value: CliGenerateMustHavesLicenseRunLicenseChoiceValue;
};

export type CliGenerateMustHavesLicenseRunLicenseChoices = CliGenerateMustHavesLicenseRunLicenseChoice[];

export type CliGenerateMustHavesLicenseRunLicenseOutputKey = 'licenseId';

export type CliGenerateMustHavesLicenseRunLicenseOutput = Record<string, unknown>;

export type CliGenerateMustHavesLicenseRunLicenseOutputValue = SharedNovaConfigProjectLicense | undefined;

export type CliGenerateMustHavesLicenseRunTemplateDirectory = string;

export type CliGenerateMustHavesLicenseRunTemplatePath = string;

export type CliGenerateMustHavesLicenseRunTemplate = string;

export type CliGenerateMustHavesLicenseRunContent = string;

export type CliGenerateMustHavesLicenseRunTargetPath = string;
