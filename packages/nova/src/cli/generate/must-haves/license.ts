import { promises as fs } from 'fs';
import { join } from 'path';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PLACEHOLDER_ENTITY_NAME,
  LIB_REGEX_PLACEHOLDER_YEAR_RANGE,
} from '../../../lib/regex.js';
import {
  collectConsumerWorkspacePaths,
  isProjectRoot,
  resolveTemplatePath,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_License_Runner_Run_ConsumerWorkspacePaths,
  Cli_Generate_MustHaves_License_Runner_Run_Content,
  Cli_Generate_MustHaves_License_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_License_Runner_Run_CurrentYear,
  Cli_Generate_MustHaves_License_Runner_Run_EntityName,
  Cli_Generate_MustHaves_License_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_License_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_License_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_License_Runner_Run_LicenseId,
  Cli_Generate_MustHaves_License_Runner_Run_Options,
  Cli_Generate_MustHaves_License_Runner_Run_Project,
  Cli_Generate_MustHaves_License_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_License_Runner_Run_Returns,
  Cli_Generate_MustHaves_License_Runner_Run_StartingYear,
  Cli_Generate_MustHaves_License_Runner_Run_TargetPath,
  Cli_Generate_MustHaves_License_Runner_Run_WorkingFile,
  Cli_Generate_MustHaves_License_Runner_Run_YearRange,
} from '../../../types/cli/generate/must-haves/license.d.ts';

/**
 * CLI - Generate - Must Haves - License.
 *
 * Generates the root LICENSE file from bundled SPDX templates and copies it into each
 * consumer-facing workspace (app, package, tool, config). Substitutes the legal entity
 * name and year range from nova.config.json.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - License - Run.
   *
   * Called by the CLI index via executeCommand. Reads the license ID from nova.config.json
   * and exits with an error when it is missing; the generator does not prompt.
   *
   * @param {Cli_Generate_MustHaves_License_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_License_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_MustHaves_License_Runner_Run_Options): Cli_Generate_MustHaves_License_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_License_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_License_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_License_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_License_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_License_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Generate_MustHaves_License_Runner_Run_WorkingFile = await new LibNovaConfig().load();

    const project: Cli_Generate_MustHaves_License_Runner_Run_Project = workingFile['project'];
    const entityName: Cli_Generate_MustHaves_License_Runner_Run_EntityName = (project !== undefined) ? (project['legalName'] ?? '') : '';
    const currentYear: Cli_Generate_MustHaves_License_Runner_Run_CurrentYear = new Date().getFullYear();
    const startingYear: Cli_Generate_MustHaves_License_Runner_Run_StartingYear = (project !== undefined) ? (project['startingYear'] ?? currentYear) : currentYear;
    const yearRange: Cli_Generate_MustHaves_License_Runner_Run_YearRange = (startingYear === currentYear) ? String(currentYear) : `${startingYear}-${currentYear}`;

    const licenseId: Cli_Generate_MustHaves_License_Runner_Run_LicenseId = (project !== undefined) ? project['license'] : undefined;

    if (licenseId === undefined) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'license',
      }).error('No license specified in nova.config.json. Set project.license and re-run.');

      process.exitCode = 1;

      return 'cancelled';
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'license',
    }).info(`Using license from nova.config.json: ${licenseId}`);

    const content: Cli_Generate_MustHaves_License_Runner_Run_Content = (await fs.readFile(join(resolveTemplatePath(import.meta.url, 'generators/must-haves/license'), licenseId), 'utf-8'))
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_ENTITY_NAME.source, 'g'), entityName)
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_YEAR_RANGE.source, 'g'), yearRange);

    const targetPath: Cli_Generate_MustHaves_License_Runner_Run_TargetPath = join(currentDirectory, 'LICENSE');

    // Consumer workspace copies.
    const consumerWorkspacePaths: Cli_Generate_MustHaves_License_Runner_Run_ConsumerWorkspacePaths = collectConsumerWorkspacePaths(currentDirectory, workingFile['workspaces'], 'LICENSE');

    if (isDryRun === true) {
      return 'completed';
    }

    await saveGeneratedFile(targetPath, content, isReplaceFile);

    for (const consumerWorkspacePath of consumerWorkspacePaths) {
      await saveGeneratedFile(consumerWorkspacePath, content, isReplaceFile);
    }

    return 'completed';
  }
}
