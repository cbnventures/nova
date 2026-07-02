import { promises as fs } from 'fs';
import { join } from 'path';

import { parse as parseYaml } from 'yaml';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
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
  LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS,
} from '../../../lib/regex.js';
import { isProjectRoot, resolveTemplatePath, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_Github_IssueTemplate_Runner_Run_ConfigBugReportFields,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Content,
  Cli_Generate_Github_IssueTemplate_Runner_Run_CurrentDirectory,
  Cli_Generate_Github_IssueTemplate_Runner_Run_File,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Files,
  Cli_Generate_Github_IssueTemplate_Runner_Run_FundSources,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Github,
  Cli_Generate_Github_IssueTemplate_Runner_Run_GithubOwner,
  Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepo,
  Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepoName,
  Cli_Generate_Github_IssueTemplate_Runner_Run_GithubSponsor,
  Cli_Generate_Github_IssueTemplate_Runner_Run_HeaderOptions,
  Cli_Generate_Github_IssueTemplate_Runner_Run_IsAtProjectRoot,
  Cli_Generate_Github_IssueTemplate_Runner_Run_IsDryRun,
  Cli_Generate_Github_IssueTemplate_Runner_Run_IsReplaceFile,
  Cli_Generate_Github_IssueTemplate_Runner_Run_IssueTemplate,
  Cli_Generate_Github_IssueTemplate_Runner_Run_LegalAgreementsDirectory,
  Cli_Generate_Github_IssueTemplate_Runner_Run_LegalContent,
  Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFile,
  Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMapping,
  Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLabelParts,
  Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLabelText,
  Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLinkParts,
  Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLinksText,
  Cli_Generate_Github_IssueTemplate_Runner_Run_LegalRaw,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Options,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Our,
  Cli_Generate_Github_IssueTemplate_Runner_Run_PlatformFieldParts,
  Cli_Generate_Github_IssueTemplate_Runner_Run_PlatformFieldsContent,
  Cli_Generate_Github_IssueTemplate_Runner_Run_PlatformFieldsDirectory,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Platforms,
  Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectedFiles,
  Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectMapping,
  Cli_Generate_Github_IssueTemplate_Runner_Run_PrivacyPolicy,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Project,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Pronouns,
  Cli_Generate_Github_IssueTemplate_Runner_Run_ReplaceFileNotice,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Returns,
  Cli_Generate_Github_IssueTemplate_Runner_Run_SelectedFiles,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Stripped,
  Cli_Generate_Github_IssueTemplate_Runner_Run_TargetPath,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Template,
  Cli_Generate_Github_IssueTemplate_Runner_Run_TemplateDirectory,
  Cli_Generate_Github_IssueTemplate_Runner_Run_TemplatePath,
  Cli_Generate_Github_IssueTemplate_Runner_Run_TermsOfUse,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Urls,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Us,
  Cli_Generate_Github_IssueTemplate_Runner_Run_We,
  Cli_Generate_Github_IssueTemplate_Runner_Run_WorkingFile,
} from '../../../types/cli/generate/github/issue-template.d.ts';

/**
 * CLI - Generate - GitHub - Issue Template.
 *
 * Generates GitHub issue templates for bug reports, feature requests, and support requests.
 * Injects platform fields and legal agreements.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - GitHub - Issue Template - Run.
   *
   * Called by the CLI index via executeCommand. Reads nova.config.json for pronouns, URLs, and
   * bug report fields, falling back to platform-derived fields when none are configured.
   *
   * @param {Cli_Generate_Github_IssueTemplate_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_Github_IssueTemplate_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_Github_IssueTemplate_Runner_Run_Options): Cli_Generate_Github_IssueTemplate_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_Github_IssueTemplate_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_Github_IssueTemplate_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_Github_IssueTemplate_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_Github_IssueTemplate_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_Github_IssueTemplate_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Generate_Github_IssueTemplate_Runner_Run_WorkingFile = await new LibNovaConfig().load();

    const project: Cli_Generate_Github_IssueTemplate_Runner_Run_Project = workingFile['project'];
    const pronouns: Cli_Generate_Github_IssueTemplate_Runner_Run_Pronouns = (project !== undefined) ? (project['pronouns'] ?? 'business') : 'business';
    const we: Cli_Generate_Github_IssueTemplate_Runner_Run_We = (pronouns === 'personal') ? 'I' : 'we';
    const us: Cli_Generate_Github_IssueTemplate_Runner_Run_Us = (pronouns === 'personal') ? 'me' : 'us';
    const our: Cli_Generate_Github_IssueTemplate_Runner_Run_Our = (pronouns === 'personal') ? 'my' : 'our';
    const urls: Cli_Generate_Github_IssueTemplate_Runner_Run_Urls = workingFile['urls'];
    const github: Cli_Generate_Github_IssueTemplate_Runner_Run_Github = workingFile['github'];
    const issueTemplate: Cli_Generate_Github_IssueTemplate_Runner_Run_IssueTemplate = (github !== undefined) ? github['issueTemplate'] : undefined;
    const configBugReportFields: Cli_Generate_Github_IssueTemplate_Runner_Run_ConfigBugReportFields = (issueTemplate !== undefined) ? (issueTemplate['bugReportFields'] ?? []) : [];
    const githubOwner: Cli_Generate_Github_IssueTemplate_Runner_Run_GithubOwner = (github !== undefined) ? (github['owner'] ?? '') : '';
    const githubRepoName: Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepoName = (github !== undefined) ? (github['repo'] ?? '') : '';
    const githubRepo: Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepo = (githubOwner !== '' && githubRepoName !== '') ? `${githubOwner}/${githubRepoName}` : '';
    const privacyPolicy: Cli_Generate_Github_IssueTemplate_Runner_Run_PrivacyPolicy = (urls !== undefined) ? (urls['privacyPolicy'] ?? '') : '';
    const termsOfUse: Cli_Generate_Github_IssueTemplate_Runner_Run_TermsOfUse = (urls !== undefined) ? (urls['termsOfUse'] ?? '') : '';

    const fundSources: Cli_Generate_Github_IssueTemplate_Runner_Run_FundSources = (urls !== undefined) ? (urls['fundSources'] ?? []) : [];
    let githubSponsor: Cli_Generate_Github_IssueTemplate_Runner_Run_GithubSponsor = '';

    for (const source of fundSources) {
      if (LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS.test(source) === true && githubSponsor === '') {
        githubSponsor = source.replace(LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS, '');
      }
    }

    // Derive bug report fields from dev platforms (fallback when none configured).
    const platforms: Cli_Generate_Github_IssueTemplate_Runner_Run_Platforms = (project !== undefined) ? (project['platforms'] ?? []) : [];
    const preSelectMapping: Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectMapping = {
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

    const preSelectedFiles: Cli_Generate_Github_IssueTemplate_Runner_Run_PreSelectedFiles = new Set();

    for (const platform of platforms) {
      const file: Cli_Generate_Github_IssueTemplate_Runner_Run_File = preSelectMapping[platform];

      if (file !== undefined) {
        preSelectedFiles.add(file);
      }
    }

    const selectedFiles: Cli_Generate_Github_IssueTemplate_Runner_Run_SelectedFiles = (configBugReportFields.length > 0) ? configBugReportFields : [...preSelectedFiles];

    if (selectedFiles.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'skip',
      }).info('No bug report fields configured. Generating templates without platform fields.');
    }

    const templateDirectory: Cli_Generate_Github_IssueTemplate_Runner_Run_TemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/github/issue-template');
    const platformFieldsDirectory: Cli_Generate_Github_IssueTemplate_Runner_Run_PlatformFieldsDirectory = join(templateDirectory, 'bug-report-fields');
    const legalAgreementsDirectory: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalAgreementsDirectory = join(templateDirectory, 'legal-agreements');
    const platformFieldParts: Cli_Generate_Github_IssueTemplate_Runner_Run_PlatformFieldParts = [];

    for (const file of selectedFiles) {
      try {
        platformFieldParts.push((await fs.readFile(join(platformFieldsDirectory, file), 'utf-8')).trimEnd());
      } catch {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'read',
        }).warn(`Failed to read bug report field template "${file}". Skipping ...`);
      }
    }

    const platformFieldsContent: Cli_Generate_Github_IssueTemplate_Runner_Run_PlatformFieldsContent = (platformFieldParts.length > 0) ? `${platformFieldParts.join('\n')}\n` : '';

    const legalFileMapping: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMapping = {
      'BUG-REPORT.yml': 'bug-report.yml',
      'FEATURE-REQUEST.yml': 'feature-request.yml',
      'SUPPORT-REQUEST.yml': 'support-request.yml',
    };

    const files: Cli_Generate_Github_IssueTemplate_Runner_Run_Files = [
      'config.yml',
      'BUG-REPORT.yml',
      'FEATURE-REQUEST.yml',
      'SUPPORT-REQUEST.yml',
    ];

    const headerOptions: Cli_Generate_Github_IssueTemplate_Runner_Run_HeaderOptions = {
      command: 'nova generate github issue-template',
      docsSlug: 'cli/generators/github/issue-template',
      mode: 'strict',
    };

    for (const fileName of files) {
      const templatePath: Cli_Generate_Github_IssueTemplate_Runner_Run_TemplatePath = join(templateDirectory, fileName);
      const targetPath: Cli_Generate_Github_IssueTemplate_Runner_Run_TargetPath = join(currentDirectory, '.github', 'ISSUE_TEMPLATE', fileName);

      let template: Cli_Generate_Github_IssueTemplate_Runner_Run_Template = undefined;

      try {
        template = await fs.readFile(templatePath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'read',
        }).error(`Failed to read template "${templatePath}". Skipping ...`);

        continue;
      }

      const stripped: Cli_Generate_Github_IssueTemplate_Runner_Run_Stripped = template.replace(LIB_REGEX_PATTERN_SETUP_INSTRUCTIONS_BLOCK, '');

      const legalFile: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFile = legalFileMapping[fileName];
      let legalContent: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalContent = '';

      if (
        (
          termsOfUse !== ''
          || privacyPolicy !== ''
        )
        && legalFile !== undefined
      ) {
        const legalLinkParts: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLinkParts = [];
        const legalLabelParts: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLabelParts = [];

        if (termsOfUse !== '') {
          legalLinkParts.push('[Terms of Use]([__TERMS_OF_USE__])');

          legalLabelParts.push('Terms of Use');
        }

        if (privacyPolicy !== '') {
          legalLinkParts.push('[Privacy Policy]([__PRIVACY_POLICY__])');

          legalLabelParts.push('Privacy Policy');
        }

        try {
          const legalRaw: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalRaw = await fs.readFile(join(legalAgreementsDirectory, legalFile), 'utf-8');
          const legalLinksText: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLinksText = legalLinkParts.join(' and ');
          const legalLabelText: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalLabelText = legalLabelParts.join(' and ');

          legalContent = legalRaw
            .replace(new RegExp(LIB_REGEX_PLACEHOLDER_LEGAL_LINKS.source, 'g'), legalLinksText)
            .replace(new RegExp(LIB_REGEX_PLACEHOLDER_LEGAL_LABEL.source, 'g'), legalLabelText)
            .trimEnd().concat('\n');
        } catch {
          Logger.customize({
            name: 'Runner.run',
            purpose: 'read',
          }).warn(`Failed to read legal agreement template "${legalFile}". Skipping ...`);
        }
      }

      const content: Cli_Generate_Github_IssueTemplate_Runner_Run_Content = stripped
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
          name: 'Runner.run',
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
