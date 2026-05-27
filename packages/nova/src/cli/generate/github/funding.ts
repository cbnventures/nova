import { promises as fs } from 'fs';
import { join } from 'path';

import { parse as parseYaml } from 'yaml';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_SETUP_INSTRUCTIONS_BLOCK,
  LIB_REGEX_PLACEHOLDER_CUSTOM_DONATION,
  LIB_REGEX_PLACEHOLDER_GITHUB_SPONSOR,
  LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS,
} from '../../../lib/regex.js';
import { isProjectRoot, resolveTemplatePath, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_Github_Funding_Runner_Run_Content,
  Cli_Generate_Github_Funding_Runner_Run_CurrentDirectory,
  Cli_Generate_Github_Funding_Runner_Run_CustomDonationList,
  Cli_Generate_Github_Funding_Runner_Run_CustomDonations,
  Cli_Generate_Github_Funding_Runner_Run_FundSources,
  Cli_Generate_Github_Funding_Runner_Run_GithubSponsor,
  Cli_Generate_Github_Funding_Runner_Run_IsAtProjectRoot,
  Cli_Generate_Github_Funding_Runner_Run_IsDryRun,
  Cli_Generate_Github_Funding_Runner_Run_IsGitHubSponsor,
  Cli_Generate_Github_Funding_Runner_Run_IsReplaceFile,
  Cli_Generate_Github_Funding_Runner_Run_Options,
  Cli_Generate_Github_Funding_Runner_Run_ReplaceFileNotice,
  Cli_Generate_Github_Funding_Runner_Run_Returns,
  Cli_Generate_Github_Funding_Runner_Run_Stripped,
  Cli_Generate_Github_Funding_Runner_Run_TargetPath,
  Cli_Generate_Github_Funding_Runner_Run_Urls,
  Cli_Generate_Github_Funding_Runner_Run_WorkingFile,
} from '../../../types/cli/generate/github/funding.d.ts';

/**
 * CLI - Generate - GitHub - Funding.
 *
 * Generates the .github/FUNDING.yml file from a bundled template and nova.config.json fund
 * sources. Separates GitHub Sponsors from custom URLs.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - GitHub - Funding - Run.
   *
   * Called by the CLI index via executeCommand. Reads fund sources from nova.config.json to
   * populate the github_sponsors and custom donation fields.
   *
   * @param {Cli_Generate_Github_Funding_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_Github_Funding_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_Github_Funding_Runner_Run_Options): Cli_Generate_Github_Funding_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_Github_Funding_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_Github_Funding_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_Github_Funding_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_Github_Funding_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_Github_Funding_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Generate_Github_Funding_Runner_Run_WorkingFile = await new LibNovaConfig().load();

    const urls: Cli_Generate_Github_Funding_Runner_Run_Urls = workingFile['urls'];
    const fundSources: Cli_Generate_Github_Funding_Runner_Run_FundSources = (urls !== undefined) ? (urls['fundSources'] ?? []) : [];
    let githubSponsor: Cli_Generate_Github_Funding_Runner_Run_GithubSponsor = '';
    const customDonations: Cli_Generate_Github_Funding_Runner_Run_CustomDonations = [];

    for (const source of fundSources) {
      const isGitHubSponsor: Cli_Generate_Github_Funding_Runner_Run_IsGitHubSponsor = LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS.test(source);

      if (isGitHubSponsor === true && githubSponsor === '') {
        githubSponsor = source.replace(LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS, '');
      } else {
        customDonations.push(source);
      }
    }

    const stripped: Cli_Generate_Github_Funding_Runner_Run_Stripped = (await fs.readFile(join(resolveTemplatePath(import.meta.url, 'generators/github/funding'), 'FUNDING.yml'), 'utf-8')).replace(LIB_REGEX_PATTERN_SETUP_INSTRUCTIONS_BLOCK, '');
    const customDonationList: Cli_Generate_Github_Funding_Runner_Run_CustomDonationList = customDonations.join('\n  - ');
    const content: Cli_Generate_Github_Funding_Runner_Run_Content = stripped
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_GITHUB_SPONSOR.source, 'g'), githubSponsor)
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_CUSTOM_DONATION.source, 'g'), customDonationList);

    const targetPath: Cli_Generate_Github_Funding_Runner_Run_TargetPath = join(currentDirectory, '.github', 'FUNDING.yml');

    try {
      parseYaml(content);
    } catch {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'validate',
      }).error('Generated YAML for "FUNDING.yml" is invalid. Skipping ...');

      return 'cancelled';
    }

    if (isDryRun === true) {
      return 'completed';
    }

    await saveGeneratedFile(targetPath, content, isReplaceFile, {
      command: 'nova generate github funding',
      docsSlug: 'cli/generators/github/funding',
      mode: 'strict',
    });

    return 'completed';
  }
}
