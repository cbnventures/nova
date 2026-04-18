import { promises as fs } from 'fs';
import { join } from 'path';

import { parse as parseYaml } from 'yaml';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_SETUP_INSTRUCTIONS_BLOCK,
  LIB_REGEX_PLACEHOLDER_CUSTOM_DONATION,
  LIB_REGEX_PLACEHOLDER_GITHUB_SPONSOR,
  LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS,
} from '../../../lib/regex.js';
import { isProjectRoot, resolveTemplatePath, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliGenerateGithubFundingRunContent,
  CliGenerateGithubFundingRunCurrentDirectory,
  CliGenerateGithubFundingRunCustomDonationList,
  CliGenerateGithubFundingRunCustomDonations,
  CliGenerateGithubFundingRunFundSources,
  CliGenerateGithubFundingRunGithubSponsor,
  CliGenerateGithubFundingRunIsAtProjectRoot,
  CliGenerateGithubFundingRunIsDryRun,
  CliGenerateGithubFundingRunIsGitHubSponsor,
  CliGenerateGithubFundingRunIsReplaceFile,
  CliGenerateGithubFundingRunOptions,
  CliGenerateGithubFundingRunReplaceFileNotice,
  CliGenerateGithubFundingRunReturns,
  CliGenerateGithubFundingRunStripped,
  CliGenerateGithubFundingRunTargetPath,
  CliGenerateGithubFundingRunUrls,
  CliGenerateGithubFundingRunWorkingFile,
} from '../../../types/cli/generate/github/funding.d.ts';

/**
 * CLI - Generate - GitHub - Funding.
 *
 * Generates the .github/FUNDING.yml file from a bundled template and nova.config.json fund
 * sources. Separates GitHub Sponsors from custom URLs.
 *
 * @since 0.15.0
 */
export class CliGenerateGithubFunding {
  /**
   * CLI - Generate - GitHub - Funding - Run.
   *
   * Called by the CLI index via executeCommand. Reads fund sources from nova.config.json to
   * populate the github_sponsors and custom donation fields.
   *
   * @param {CliGenerateGithubFundingRunOptions} options - Options.
   *
   * @returns {CliGenerateGithubFundingRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliGenerateGithubFundingRunOptions): CliGenerateGithubFundingRunReturns {
    const currentDirectory: CliGenerateGithubFundingRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliGenerateGithubFundingRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliGenerateGithubFundingRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliGenerateGithubFundingRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliGenerateGithubFunding.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliGenerateGithubFundingRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliGenerateGithubFunding.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliGenerateGithubFundingRunWorkingFile = await new LibNovaConfig().load();

    const urls: CliGenerateGithubFundingRunUrls = workingFile['urls'];
    const fundSources: CliGenerateGithubFundingRunFundSources = (urls !== undefined) ? (urls['fundSources'] ?? []) : [];
    let githubSponsor: CliGenerateGithubFundingRunGithubSponsor = '';
    const customDonations: CliGenerateGithubFundingRunCustomDonations = [];

    for (const source of fundSources) {
      const isGitHubSponsor: CliGenerateGithubFundingRunIsGitHubSponsor = LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS.test(source);

      if (isGitHubSponsor === true && githubSponsor === '') {
        githubSponsor = source.replace(LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS, '');
      } else {
        customDonations.push(source);
      }
    }

    const stripped: CliGenerateGithubFundingRunStripped = (await fs.readFile(join(resolveTemplatePath(import.meta.url, 'generators/github/funding'), 'FUNDING.yml'), 'utf-8')).replace(LIB_REGEX_PATTERN_SETUP_INSTRUCTIONS_BLOCK, '');
    const customDonationList: CliGenerateGithubFundingRunCustomDonationList = customDonations.join('\n  - ');
    const content: CliGenerateGithubFundingRunContent = stripped
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_GITHUB_SPONSOR.source, 'g'), githubSponsor)
      .replace(new RegExp(LIB_REGEX_PLACEHOLDER_CUSTOM_DONATION.source, 'g'), customDonationList);

    const targetPath: CliGenerateGithubFundingRunTargetPath = join(currentDirectory, '.github', 'FUNDING.yml');

    try {
      parseYaml(content);
    } catch {
      Logger.customize({
        name: 'CliGenerateGithubFunding.run',
        purpose: 'validate',
      }).error('Generated YAML for "FUNDING.yml" is invalid. Skipping ...');

      return;
    }

    if (isDryRun === true) {
      return;
    }

    await saveGeneratedFile(targetPath, content, isReplaceFile);

    return;
  }
}
