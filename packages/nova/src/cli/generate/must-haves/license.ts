import { promises as fs } from 'fs';
import { join } from 'path';

import prompts from 'prompts';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PLACEHOLDER_ENTITY_NAME,
  LIB_REGEX_PLACEHOLDER_YEAR_RANGE,
} from '../../../lib/regex.js';
import { isProjectRoot, resolveTemplatePath, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliGenerateMustHavesLicenseRunContent,
  CliGenerateMustHavesLicenseRunCurrentDirectory,
  CliGenerateMustHavesLicenseRunCurrentYear,
  CliGenerateMustHavesLicenseRunEntityName,
  CliGenerateMustHavesLicenseRunIsAtProjectRoot,
  CliGenerateMustHavesLicenseRunIsDryRun,
  CliGenerateMustHavesLicenseRunIsReplaceFile,
  CliGenerateMustHavesLicenseRunLicenseChoices,
  CliGenerateMustHavesLicenseRunLicenseId,
  CliGenerateMustHavesLicenseRunLicenseOutput,
  CliGenerateMustHavesLicenseRunLicenseOutputKey,
  CliGenerateMustHavesLicenseRunLicenseOutputValue,
  CliGenerateMustHavesLicenseRunOptions,
  CliGenerateMustHavesLicenseRunProject,
  CliGenerateMustHavesLicenseRunReplaceFileNotice,
  CliGenerateMustHavesLicenseRunReturns,
  CliGenerateMustHavesLicenseRunStartingYear,
  CliGenerateMustHavesLicenseRunTargetPath,
  CliGenerateMustHavesLicenseRunWorkingFile,
  CliGenerateMustHavesLicenseRunYearRange,
} from '../../../types/cli/generate/must-haves/license.d.ts';

/**
 * CLI - Generate - Must Haves - License.
 *
 * Generates the root LICENSE file from bundled SPDX templates. Substitutes the legal entity
 * name and year range from nova.config.json.
 *
 * @since 0.15.0
 */
export class CliGenerateMustHavesLicense {
  /**
   * CLI - Generate - Must Haves - License - Run.
   *
   * Called by the CLI index via executeCommand. Uses the license ID from nova.config.json or
   * prompts the user to pick from thirteen SPDX options.
   *
   * @param {CliGenerateMustHavesLicenseRunOptions} options - Options.
   *
   * @returns {CliGenerateMustHavesLicenseRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliGenerateMustHavesLicenseRunOptions): CliGenerateMustHavesLicenseRunReturns {
    const currentDirectory: CliGenerateMustHavesLicenseRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliGenerateMustHavesLicenseRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: CliGenerateMustHavesLicenseRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliGenerateMustHavesLicenseRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliGenerateMustHavesLicense.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliGenerateMustHavesLicenseRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliGenerateMustHavesLicense.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliGenerateMustHavesLicenseRunWorkingFile = await new LibNovaConfig().load();

    const project: CliGenerateMustHavesLicenseRunProject = workingFile['project'];
    const entityName: CliGenerateMustHavesLicenseRunEntityName = (project !== undefined) ? (project['legalName'] ?? '') : '';
    const currentYear: CliGenerateMustHavesLicenseRunCurrentYear = new Date().getFullYear();
    const startingYear: CliGenerateMustHavesLicenseRunStartingYear = (project !== undefined) ? (project['startingYear'] ?? currentYear) : currentYear;
    const yearRange: CliGenerateMustHavesLicenseRunYearRange = (startingYear === currentYear) ? String(currentYear) : `${startingYear}-${currentYear}`;

    let licenseId: CliGenerateMustHavesLicenseRunLicenseId = (project !== undefined) ? project['license'] : undefined;

    if (licenseId !== undefined) {
      Logger.customize({
        name: 'CliGenerateMustHavesLicense.run',
        purpose: 'license',
      }).info(`Using license from nova.config.json: ${licenseId}`);
    } else {
      Logger.customize({
        name: 'CliGenerateMustHavesLicense.run',
        purpose: 'license',
      }).warn('No license specified in nova.config.json. You must select a license.');

      const licenseChoices: CliGenerateMustHavesLicenseRunLicenseChoices = [
        {
          title: 'MIT License',
          value: 'MIT',
        },
        {
          title: 'Apache License 2.0',
          value: 'Apache-2.0',
        },
        {
          title: 'GNU General Public License v3.0',
          value: 'GPL-3.0',
        },
        {
          title: 'GNU General Public License v2.0',
          value: 'GPL-2.0',
        },
        {
          title: 'GNU Affero General Public License v3.0',
          value: 'AGPL-3.0',
        },
        {
          title: 'GNU Lesser General Public License v2.1',
          value: 'LGPL-2.1',
        },
        {
          title: 'BSD 2-Clause "Simplified" License',
          value: 'BSD-2-Clause',
        },
        {
          title: 'BSD 3-Clause "New" or "Revised" License',
          value: 'BSD-3-Clause',
        },
        {
          title: 'Boost Software License 1.0',
          value: 'BSL-1.0',
        },
        {
          title: 'Creative Commons Zero v1.0 Universal',
          value: 'CC0-1.0',
        },
        {
          title: 'Eclipse Public License 2.0',
          value: 'EPL-2.0',
        },
        {
          title: 'Mozilla Public License 2.0',
          value: 'MPL-2.0',
        },
        {
          title: 'Proprietary (All Rights Reserved)',
          value: 'Proprietary',
        },
        {
          title: 'The Unlicense',
          value: 'Unlicense',
        },
      ];

      const licenseOutput: CliGenerateMustHavesLicenseRunLicenseOutput = await prompts<CliGenerateMustHavesLicenseRunLicenseOutputKey>({
        type: 'select',
        name: 'licenseId',
        message: 'Select a license',
        choices: licenseChoices,
        initial: 0,
      });

      const selectedLicense: CliGenerateMustHavesLicenseRunLicenseOutputValue = licenseOutput['licenseId'] as CliGenerateMustHavesLicenseRunLicenseOutputValue;

      if (selectedLicense === undefined) {
        return 'cancelled';
      }

      licenseId = selectedLicense;
    }

    const content: CliGenerateMustHavesLicenseRunContent = (await fs.readFile(join(resolveTemplatePath(import.meta.url, 'generators/must-haves/license'), licenseId), 'utf-8'))
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_ENTITY_NAME.source, 'g'), entityName)
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_YEAR_RANGE.source, 'g'), yearRange);

    const targetPath: CliGenerateMustHavesLicenseRunTargetPath = join(currentDirectory, 'LICENSE');

    if (isDryRun === true) {
      return 'completed';
    }

    await saveGeneratedFile(targetPath, content, isReplaceFile);

    return 'completed';
  }
}
