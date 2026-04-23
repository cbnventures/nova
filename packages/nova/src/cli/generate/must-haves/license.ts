import { promises as fs } from 'fs';
import { join } from 'path';

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
  CliGenerateMustHavesLicenseRunLicenseId,
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
   * Called by the CLI index via executeCommand. Reads the license ID from nova.config.json
   * and exits with an error when it is missing; the generator does not prompt.
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

    const licenseId: CliGenerateMustHavesLicenseRunLicenseId = (project !== undefined) ? project['license'] : undefined;

    if (licenseId === undefined) {
      Logger.customize({
        name: 'CliGenerateMustHavesLicense.run',
        purpose: 'license',
      }).error('No license specified in nova.config.json. Set project.license and re-run.');

      process.exitCode = 1;

      return 'cancelled';
    }

    Logger.customize({
      name: 'CliGenerateMustHavesLicense.run',
      purpose: 'license',
    }).info(`Using license from nova.config.json: ${licenseId}`);

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
