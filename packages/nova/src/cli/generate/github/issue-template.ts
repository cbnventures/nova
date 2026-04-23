import { promises as fs } from 'fs';
import { join } from 'path';

import prompts from 'prompts';
import { parse as parseYaml } from 'yaml';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_SETUP_INSTRUCTIONS_BLOCK,
  LIB_REGEX_PLACEHOLDER_GITHUB_REPO,
  LIB_REGEX_PLACEHOLDER_GITHUB_SPONSOR,
  LIB_REGEX_PLACEHOLDER_LEGAL_AGREEMENTS,
  LIB_REGEX_PLACEHOLDER_LEGAL_LABEL,
  LIB_REGEX_PLACEHOLDER_LEGAL_LINKS,
  LIB_REGEX_PLACEHOLDER_OUR,
  LIB_REGEX_PLACEHOLDER_PLATFORM_FIELDS,
  LIB_REGEX_PLACEHOLDER_PRIVACY_POLICY,
  LIB_REGEX_PLACEHOLDER_TERMS_OF_USE,
  LIB_REGEX_PLACEHOLDER_US,
  LIB_REGEX_PLACEHOLDER_WE,
  LIB_REGEX_URL_PREFIX_GITHUB,
  LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS,
} from '../../../lib/regex.js';
import { isProjectRoot, resolveTemplatePath, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliGenerateGithubIssueTemplateRunAnswers,
  CliGenerateGithubIssueTemplateRunCancelled,
  CliGenerateGithubIssueTemplateRunChoices,
  CliGenerateGithubIssueTemplateRunContent,
  CliGenerateGithubIssueTemplateRunCurrentDirectory,
  CliGenerateGithubIssueTemplateRunFile,
  CliGenerateGithubIssueTemplateRunFiles,
  CliGenerateGithubIssueTemplateRunFundSources,
  CliGenerateGithubIssueTemplateRunGithubRepo,
  CliGenerateGithubIssueTemplateRunGithubSponsor,
  CliGenerateGithubIssueTemplateRunIsAtProjectRoot,
  CliGenerateGithubIssueTemplateRunIsDryRun,
  CliGenerateGithubIssueTemplateRunIsReplaceFile,
  CliGenerateGithubIssueTemplateRunLegalAgreementsDirectory,
  CliGenerateGithubIssueTemplateRunLegalContent,
  CliGenerateGithubIssueTemplateRunLegalFile,
  CliGenerateGithubIssueTemplateRunLegalFileMapping,
  CliGenerateGithubIssueTemplateRunLegalLabelParts,
  CliGenerateGithubIssueTemplateRunLegalLabelText,
  CliGenerateGithubIssueTemplateRunLegalLinkParts,
  CliGenerateGithubIssueTemplateRunLegalLinksText,
  CliGenerateGithubIssueTemplateRunLegalRaw,
  CliGenerateGithubIssueTemplateRunOptions,
  CliGenerateGithubIssueTemplateRunOur,
  CliGenerateGithubIssueTemplateRunPlatformFieldParts,
  CliGenerateGithubIssueTemplateRunPlatformFieldsContent,
  CliGenerateGithubIssueTemplateRunPlatformFieldsDirectory,
  CliGenerateGithubIssueTemplateRunPlatforms,
  CliGenerateGithubIssueTemplateRunPreSelectedFiles,
  CliGenerateGithubIssueTemplateRunPreSelectMapping,
  CliGenerateGithubIssueTemplateRunPrivacyPolicy,
  CliGenerateGithubIssueTemplateRunProject,
  CliGenerateGithubIssueTemplateRunPronouns,
  CliGenerateGithubIssueTemplateRunReplaceFileNotice,
  CliGenerateGithubIssueTemplateRunReturns,
  CliGenerateGithubIssueTemplateRunSelectedFiles,
  CliGenerateGithubIssueTemplateRunStripped,
  CliGenerateGithubIssueTemplateRunTargetPath,
  CliGenerateGithubIssueTemplateRunTemplate,
  CliGenerateGithubIssueTemplateRunTemplateDirectory,
  CliGenerateGithubIssueTemplateRunTemplatePath,
  CliGenerateGithubIssueTemplateRunTermsOfUse,
  CliGenerateGithubIssueTemplateRunUrls,
  CliGenerateGithubIssueTemplateRunUrlsGithub,
  CliGenerateGithubIssueTemplateRunUs,
  CliGenerateGithubIssueTemplateRunWe,
  CliGenerateGithubIssueTemplateRunWorkingFile,
} from '../../../types/cli/generate/github/issue-template.d.ts';
import type { LibUtilitySaveGeneratedFileHeader } from '../../../types/lib/utility.d.ts';

/**
 * CLI - Generate - GitHub - Issue Template.
 *
 * Generates GitHub issue templates for bug reports, feature requests, and support requests.
 * Injects platform fields and legal agreements.
 *
 * @since 0.15.0
 */
export class CliGenerateGithubIssueTemplate {
  /**
   * CLI - Generate - GitHub - Issue Template - Run.
   *
   * Called by the CLI index via executeCommand. Reads nova.config.json for pronouns, URLs, and
   * platforms to pre-select bug report field templates.
   *
   * @param {CliGenerateGithubIssueTemplateRunOptions} options - Options.
   *
   * @returns {CliGenerateGithubIssueTemplateRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliGenerateGithubIssueTemplateRunOptions): CliGenerateGithubIssueTemplateRunReturns {
    const currentDirectory: CliGenerateGithubIssueTemplateRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliGenerateGithubIssueTemplateRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: CliGenerateGithubIssueTemplateRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliGenerateGithubIssueTemplateRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliGenerateGithubIssueTemplate.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliGenerateGithubIssueTemplateRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliGenerateGithubIssueTemplate.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliGenerateGithubIssueTemplateRunWorkingFile = await new LibNovaConfig().load();

    const project: CliGenerateGithubIssueTemplateRunProject = workingFile['project'];
    const pronouns: CliGenerateGithubIssueTemplateRunPronouns = (project !== undefined) ? (project['pronouns'] ?? 'business') : 'business';
    const we: CliGenerateGithubIssueTemplateRunWe = (pronouns === 'personal') ? 'I' : 'we';
    const us: CliGenerateGithubIssueTemplateRunUs = (pronouns === 'personal') ? 'me' : 'us';
    const our: CliGenerateGithubIssueTemplateRunOur = (pronouns === 'personal') ? 'my' : 'our';
    const urls: CliGenerateGithubIssueTemplateRunUrls = workingFile['urls'];
    const urlsGithub: CliGenerateGithubIssueTemplateRunUrlsGithub = (urls !== undefined) ? (urls['github'] ?? '') : '';
    const githubRepo: CliGenerateGithubIssueTemplateRunGithubRepo = urlsGithub.replace(LIB_REGEX_URL_PREFIX_GITHUB, '');
    const privacyPolicy: CliGenerateGithubIssueTemplateRunPrivacyPolicy = (urls !== undefined) ? (urls['privacyPolicy'] ?? '') : '';
    const termsOfUse: CliGenerateGithubIssueTemplateRunTermsOfUse = (urls !== undefined) ? (urls['termsOfUse'] ?? '') : '';

    const fundSources: CliGenerateGithubIssueTemplateRunFundSources = (urls !== undefined) ? (urls['fundSources'] ?? []) : [];
    let githubSponsor: CliGenerateGithubIssueTemplateRunGithubSponsor = '';

    for (const source of fundSources) {
      if (LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS.test(source) === true && githubSponsor === '') {
        githubSponsor = source.replace(LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS, '');
      }
    }

    // Pre-select bug report fields based on dev platforms (UX hint only).
    const platforms: CliGenerateGithubIssueTemplateRunPlatforms = (project !== undefined) ? (project['platforms'] ?? []) : [];
    const preSelectMapping: CliGenerateGithubIssueTemplateRunPreSelectMapping = {
      nodejs: 'nodejs.yml',
      swift: 'apple.yml',
      macos: 'apple.yml',
      android: 'android.yml',
      java: 'android.yml',
      kotlin: 'android.yml',
      csharp: 'csharp.yml',
      php: 'php.yml',
      python: 'python.yml',
    };

    const preSelectedFiles: CliGenerateGithubIssueTemplateRunPreSelectedFiles = new Set();

    for (const platform of platforms) {
      const file: CliGenerateGithubIssueTemplateRunFile = preSelectMapping[platform];

      if (file !== undefined) {
        preSelectedFiles.add(file);
      }
    }

    const bugReportFieldChoices: CliGenerateGithubIssueTemplateRunChoices = [
      {
        title: 'Node.js',
        description: 'Node.js version',
        value: 'nodejs.yml',
        selected: preSelectedFiles.has('nodejs.yml'),
      },
      {
        title: 'Apple',
        description: 'Device type and OS version',
        value: 'apple.yml',
        selected: preSelectedFiles.has('apple.yml'),
      },
      {
        title: 'Android',
        description: 'Device model and Android version',
        value: 'android.yml',
        selected: preSelectedFiles.has('android.yml'),
      },
      {
        title: 'C# / .NET',
        description: '.NET version and operating system',
        value: 'csharp.yml',
        selected: preSelectedFiles.has('csharp.yml'),
      },
      {
        title: 'PHP',
        description: 'PHP version',
        value: 'php.yml',
        selected: preSelectedFiles.has('php.yml'),
      },
      {
        title: 'Python',
        description: 'Python version',
        value: 'python.yml',
        selected: preSelectedFiles.has('python.yml'),
      },
      {
        title: 'Homebridge',
        description: 'Plugin and Homebridge version',
        value: 'homebridge.yml',
        selected: false,
      },
      {
        title: 'pfSense',
        description: 'pfSense version',
        value: 'pfsense.yml',
        selected: false,
      },
      {
        title: 'Synology',
        description: 'Synology DSM version',
        value: 'synology.yml',
        selected: false,
      },
      {
        title: 'Docker',
        description: 'Docker version, host OS, architecture, and run command',
        value: 'docker.yml',
        selected: false,
      },
      {
        title: 'Web Browser',
        description: 'Browser name and version',
        value: 'web.yml',
        selected: false,
      },
      {
        title: 'Screenshots',
        description: 'Screenshot upload field',
        value: 'screenshots.yml',
        selected: false,
      },
    ];

    let cancelled: CliGenerateGithubIssueTemplateRunCancelled = false;

    const answers: CliGenerateGithubIssueTemplateRunAnswers = await prompts({
      type: 'multiselect',
      name: 'bugReportFields',
      message: 'Select bug report fields (space to select, enter to confirm)',
      choices: bugReportFieldChoices,
      hint: '- Space to select. Return to submit',
    }, {
      onCancel: () => false,
    });

    if (answers['bugReportFields'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return 'cancelled';
    }

    const selectedFiles: CliGenerateGithubIssueTemplateRunSelectedFiles = answers['bugReportFields'] as CliGenerateGithubIssueTemplateRunSelectedFiles;

    if (selectedFiles.length === 0) {
      Logger.customize({
        name: 'CliGenerateGithubIssueTemplate.run',
        purpose: 'skip',
      }).info('No bug report fields selected. Generating templates without platform fields.');
    }

    const templateDirectory: CliGenerateGithubIssueTemplateRunTemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/github/issue-template');
    const platformFieldsDirectory: CliGenerateGithubIssueTemplateRunPlatformFieldsDirectory = join(templateDirectory, 'bug-report-fields');
    const legalAgreementsDirectory: CliGenerateGithubIssueTemplateRunLegalAgreementsDirectory = join(templateDirectory, 'legal-agreements');
    const platformFieldParts: CliGenerateGithubIssueTemplateRunPlatformFieldParts = [];

    for (const file of selectedFiles) {
      try {
        platformFieldParts.push((await fs.readFile(join(platformFieldsDirectory, file), 'utf-8')).trimEnd());
      } catch {
        Logger.customize({
          name: 'CliGenerateGithubIssueTemplate.run',
          purpose: 'read',
        }).warn(`Failed to read bug report field template "${file}". Skipping ...`);
      }
    }

    const platformFieldsContent: CliGenerateGithubIssueTemplateRunPlatformFieldsContent = (platformFieldParts.length > 0) ? `${platformFieldParts.join('\n')}\n` : '';

    const legalFileMapping: CliGenerateGithubIssueTemplateRunLegalFileMapping = {
      'BUG-REPORT.yml': 'bug-report.yml',
      'FEATURE-REQUEST.yml': 'feature-request.yml',
      'SUPPORT-REQUEST.yml': 'support-request.yml',
    };

    const files: CliGenerateGithubIssueTemplateRunFiles = [
      'config.yml',
      'BUG-REPORT.yml',
      'FEATURE-REQUEST.yml',
      'SUPPORT-REQUEST.yml',
    ];

    const headerOptions: LibUtilitySaveGeneratedFileHeader = {
      command: 'nova generate github issue-template',
      docsSlug: 'cli/generators/github/issue-template',
      mode: 'strict',
    };

    for (const fileName of files) {
      const templatePath: CliGenerateGithubIssueTemplateRunTemplatePath = join(templateDirectory, fileName);
      const targetPath: CliGenerateGithubIssueTemplateRunTargetPath = join(currentDirectory, '.github', 'ISSUE_TEMPLATE', fileName);

      let template: CliGenerateGithubIssueTemplateRunTemplate = undefined;

      try {
        template = await fs.readFile(templatePath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'CliGenerateGithubIssueTemplate.run',
          purpose: 'read',
        }).error(`Failed to read template "${templatePath}". Skipping ...`);

        continue;
      }

      const stripped: CliGenerateGithubIssueTemplateRunStripped = template.replace(LIB_REGEX_PATTERN_SETUP_INSTRUCTIONS_BLOCK, '');

      const legalFile: CliGenerateGithubIssueTemplateRunLegalFile = legalFileMapping[fileName];
      let legalContent: CliGenerateGithubIssueTemplateRunLegalContent = '';

      if (
        (
          termsOfUse !== ''
          || privacyPolicy !== ''
        )
        && legalFile !== undefined
      ) {
        const legalLinkParts: CliGenerateGithubIssueTemplateRunLegalLinkParts = [];
        const legalLabelParts: CliGenerateGithubIssueTemplateRunLegalLabelParts = [];

        if (termsOfUse !== '') {
          legalLinkParts.push('[Terms of Use]([__TERMS_OF_USE__])');

          legalLabelParts.push('Terms of Use');
        }

        if (privacyPolicy !== '') {
          legalLinkParts.push('[Privacy Policy]([__PRIVACY_POLICY__])');

          legalLabelParts.push('Privacy Policy');
        }

        try {
          const legalRaw: CliGenerateGithubIssueTemplateRunLegalRaw = await fs.readFile(join(legalAgreementsDirectory, legalFile), 'utf-8');
          const legalLinksText: CliGenerateGithubIssueTemplateRunLegalLinksText = legalLinkParts.join(' and ');
          const legalLabelText: CliGenerateGithubIssueTemplateRunLegalLabelText = legalLabelParts.join(' and ');

          legalContent = legalRaw
            .replace(new RegExp(LIB_REGEX_PLACEHOLDER_LEGAL_LINKS.source, 'g'), legalLinksText)
            .replace(new RegExp(LIB_REGEX_PLACEHOLDER_LEGAL_LABEL.source, 'g'), legalLabelText)
            .trimEnd().concat('\n');
        } catch {
          Logger.customize({
            name: 'CliGenerateGithubIssueTemplate.run',
            purpose: 'read',
          }).warn(`Failed to read legal agreement template "${legalFile}". Skipping ...`);
        }
      }

      const content: CliGenerateGithubIssueTemplateRunContent = stripped
        .replace(new RegExp(`${LIB_REGEX_PLACEHOLDER_PLATFORM_FIELDS.source}\\n`, 'g'), platformFieldsContent)
        .replace(new RegExp(`${LIB_REGEX_PLACEHOLDER_LEGAL_AGREEMENTS.source}\\n`, 'g'), legalContent)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_WE.source, 'g'), we)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_US.source, 'g'), us)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_OUR.source, 'g'), our)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_GITHUB_REPO.source, 'g'), githubRepo)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_GITHUB_SPONSOR.source, 'g'), githubSponsor)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_PRIVACY_POLICY.source, 'g'), privacyPolicy)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_TERMS_OF_USE.source, 'g'), termsOfUse);

      try {
        parseYaml(content);
      } catch {
        Logger.customize({
          name: 'CliGenerateGithubIssueTemplate.run',
          purpose: 'validate',
        }).error(`Generated YAML for "${fileName}" is invalid. Skipping ...`);

        continue;
      }

      if (isDryRun === true) {
        continue;
      }

      await saveGeneratedFile(targetPath, content, isReplaceFile, headerOptions);
    }

    return 'completed';
  }
}
