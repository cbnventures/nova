import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { parse as parseYaml } from 'yaml';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_SETUP_INSTRUCTIONS_BLOCK,
  LIB_REGEX_PLACEHOLDER_CONTRIBUTORS_NOTE,
  LIB_REGEX_PLACEHOLDER_DOCUMENTATION_CHECK,
  LIB_REGEX_PLACEHOLDER_DOCUMENTATION_URL,
  LIB_REGEX_PLACEHOLDER_GITHUB_REPO,
  LIB_REGEX_PLACEHOLDER_GITHUB_SPONSOR,
  LIB_REGEX_PLACEHOLDER_LEGAL_AGREEMENTS,
  LIB_REGEX_PLACEHOLDER_LEGAL_LABEL,
  LIB_REGEX_PLACEHOLDER_LEGAL_LINKS,
  LIB_REGEX_PLACEHOLDER_OUR,
  LIB_REGEX_PLACEHOLDER_PRIVACY_POLICY,
  LIB_REGEX_PLACEHOLDER_QUESTION_FIELDS,
  LIB_REGEX_PLACEHOLDER_SPONSOR_CHECK,
  LIB_REGEX_PLACEHOLDER_SPONSOR_NOTICE,
  LIB_REGEX_PLACEHOLDER_TERMS_OF_USE,
  LIB_REGEX_PLACEHOLDER_US,
  LIB_REGEX_PLACEHOLDER_WE,
  LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS,
} from '../../../lib/regex.js';
import { isProjectRoot, resolveTemplatePath, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_CustomQuestions,
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_FieldFileMapping,
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_FormSlug,
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_GlobalFragment,
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_Parts,
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_Returns,
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TemplateDirectory,
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeFragment,
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeFragments,
  Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeNames,
  Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Body,
  Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Content,
  Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Duplicates,
  Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Id,
  Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Parsed,
  Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Returns,
  Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_SeenIds,
  Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_FilePath,
  Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_IsRequired,
  Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_Raw,
  Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_Returns,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_CapitalizedValue,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Content,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Placeholder,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_CurrentLinePrefix,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_IsSentenceStart,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Match,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Offset,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Prefix,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_PreviousCharacter,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Returns,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Returns,
  Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Value,
  Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Documentation,
  Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_GithubRepo,
  Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Returns,
  Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Urls,
  Cli_Generate_Github_IssueTemplate_Runner_Run_ConditionalFieldsDirectory,
  Cli_Generate_Github_IssueTemplate_Runner_Run_ConfigBugReportFields,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Content,
  Cli_Generate_Github_IssueTemplate_Runner_Run_ContributorsNote,
  Cli_Generate_Github_IssueTemplate_Runner_Run_CurrentDirectory,
  Cli_Generate_Github_IssueTemplate_Runner_Run_CustomQuestions,
  Cli_Generate_Github_IssueTemplate_Runner_Run_DocumentationCheck,
  Cli_Generate_Github_IssueTemplate_Runner_Run_DocumentationUrl,
  Cli_Generate_Github_IssueTemplate_Runner_Run_DuplicateIds,
  Cli_Generate_Github_IssueTemplate_Runner_Run_FileForm,
  Cli_Generate_Github_IssueTemplate_Runner_Run_FileForms,
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
  Cli_Generate_Github_IssueTemplate_Runner_Run_IsSponsorGated,
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
  Cli_Generate_Github_IssueTemplate_Runner_Run_PrivacyPolicy,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Project,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Pronouns,
  Cli_Generate_Github_IssueTemplate_Runner_Run_QuestionFields,
  Cli_Generate_Github_IssueTemplate_Runner_Run_ReplaceFileNotice,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Returns,
  Cli_Generate_Github_IssueTemplate_Runner_Run_SponsorCheck,
  Cli_Generate_Github_IssueTemplate_Runner_Run_SponsorNotice,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Stripped,
  Cli_Generate_Github_IssueTemplate_Runner_Run_TargetPath,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Template,
  Cli_Generate_Github_IssueTemplate_Runner_Run_TemplateDirectory,
  Cli_Generate_Github_IssueTemplate_Runner_Run_TemplatePath,
  Cli_Generate_Github_IssueTemplate_Runner_Run_TermsOfUse,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Urls,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Us,
  Cli_Generate_Github_IssueTemplate_Runner_Run_We,
  Cli_Generate_Github_IssueTemplate_Runner_Run_Workflows,
  Cli_Generate_Github_IssueTemplate_Runner_Run_WorkingFile,
  Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_AttributeKeys,
  Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_AttributeValue,
  Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Lines,
  Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Questions,
  Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Returns,
} from '../../../types/cli/generate/github/issue-template.d.ts';

/**
 * CLI - Generate - GitHub - Issue Template.
 *
 * Generates GitHub issue templates for bug reports, feature requests, and support requests.
 * Injects global, repo-type, and custom questions, conditional checks, and legal agreements.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - GitHub - Issue Template - Run.
   *
   * Called by the CLI index via executeCommand. Reads nova.config.json for pronouns, URLs,
   * question sets, and custom questions. Configured identifiers are the complete desired list.
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
    const customQuestions: Cli_Generate_Github_IssueTemplate_Runner_Run_CustomQuestions = (issueTemplate !== undefined) ? (issueTemplate['customQuestions'] ?? {}) : {};
    const githubOwner: Cli_Generate_Github_IssueTemplate_Runner_Run_GithubOwner = (github !== undefined) ? (github['owner'] ?? '') : '';
    const githubRepoName: Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepoName = (github !== undefined) ? (github['repo'] ?? '') : '';
    const githubRepo: Cli_Generate_Github_IssueTemplate_Runner_Run_GithubRepo = (githubOwner !== '' && githubRepoName !== '') ? `${githubOwner}/${githubRepoName}` : '';
    const privacyPolicy: Cli_Generate_Github_IssueTemplate_Runner_Run_PrivacyPolicy = (urls !== undefined) ? (urls['privacyPolicy'] ?? '') : '';
    const termsOfUse: Cli_Generate_Github_IssueTemplate_Runner_Run_TermsOfUse = (urls !== undefined) ? (urls['termsOfUse'] ?? '') : '';
    const documentationUrl: Cli_Generate_Github_IssueTemplate_Runner_Run_DocumentationUrl = Runner.resolveDocumentationUrl(urls, githubRepo);

    const fundSources: Cli_Generate_Github_IssueTemplate_Runner_Run_FundSources = (urls !== undefined) ? (urls['fundSources'] ?? []) : [];
    let githubSponsor: Cli_Generate_Github_IssueTemplate_Runner_Run_GithubSponsor = '';

    for (const source of fundSources) {
      if (LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS.test(source) === true && githubSponsor === '') {
        githubSponsor = source.replace(LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS, '');
      }
    }

    // Support is sponsor-gated only when the sponsor check runs and there is a Sponsors page to link.
    const workflows: Cli_Generate_Github_IssueTemplate_Runner_Run_Workflows = workingFile['workflows'] ?? [];
    const isSponsorGated: Cli_Generate_Github_IssueTemplate_Runner_Run_IsSponsorGated = githubSponsor !== '' && workflows.some((workflow) => workflow['template'] === 'check-sponsor-gated-issues');

    if (configBugReportFields.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'skip',
      }).info('No bug report fields configured. Generating templates without platform fields.');
    }

    const templateDirectory: Cli_Generate_Github_IssueTemplate_Runner_Run_TemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/github/issue-template');
    const conditionalFieldsDirectory: Cli_Generate_Github_IssueTemplate_Runner_Run_ConditionalFieldsDirectory = join(templateDirectory, 'conditional-fields');
    const legalAgreementsDirectory: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalAgreementsDirectory = join(templateDirectory, 'legal-agreements');
    const documentationCheck: Cli_Generate_Github_IssueTemplate_Runner_Run_DocumentationCheck = (documentationUrl !== '') ? await Runner.readFragment(join(conditionalFieldsDirectory, 'documentation-check.yml'), true) : '';
    const sponsorNotice: Cli_Generate_Github_IssueTemplate_Runner_Run_SponsorNotice = (isSponsorGated === true) ? await Runner.readFragment(join(conditionalFieldsDirectory, 'sponsor-notice.yml'), true) : '';
    const sponsorCheck: Cli_Generate_Github_IssueTemplate_Runner_Run_SponsorCheck = (isSponsorGated === true) ? await Runner.readFragment(join(conditionalFieldsDirectory, 'sponsor-check.yml'), true) : '';
    const contributorsNote: Cli_Generate_Github_IssueTemplate_Runner_Run_ContributorsNote = (documentationUrl !== '') ? ' (these contributors will be listed in the [documentation]([__DOCUMENTATION_URL__]))' : '';

    const legalFileMapping: Cli_Generate_Github_IssueTemplate_Runner_Run_LegalFileMapping = {
      'BUG-REPORT.yml': 'bug-report.yml',
      'FEATURE-REQUEST.yml': 'feature-request.yml',
      'SUPPORT-REQUEST.yml': 'support-request.yml',
    };
    const fileForms: Cli_Generate_Github_IssueTemplate_Runner_Run_FileForms = {
      'BUG-REPORT.yml': {
        slug: 'bug-report',
        custom: 'bug',
      },
      'FEATURE-REQUEST.yml': {
        slug: 'feature-request',
        custom: 'feature',
      },
      'SUPPORT-REQUEST.yml': {
        slug: 'support-request',
        custom: 'support',
      },
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
      const fileForm: Cli_Generate_Github_IssueTemplate_Runner_Run_FileForm = fileForms[fileName];
      const questionFields: Cli_Generate_Github_IssueTemplate_Runner_Run_QuestionFields = (fileForm !== undefined) ? await Runner.buildQuestionFields(templateDirectory, fileForm['slug'], configBugReportFields, customQuestions[fileForm['custom']] ?? []) : '';

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

      // Injected blocks go in first, so the placeholders inside them are filled in below.
      let content: Cli_Generate_Github_IssueTemplate_Runner_Run_Content = stripped
        .replace(new RegExp(`${LIB_REGEX_PLACEHOLDER_QUESTION_FIELDS.source}\\n`, 'g'), () => questionFields)
        .replace(new RegExp(`${LIB_REGEX_PLACEHOLDER_DOCUMENTATION_CHECK.source}\\n`, 'g'), () => documentationCheck)
        .replace(new RegExp(`${LIB_REGEX_PLACEHOLDER_SPONSOR_NOTICE.source}\\n`, 'g'), () => sponsorNotice)
        .replace(new RegExp(`${LIB_REGEX_PLACEHOLDER_SPONSOR_CHECK.source}\\n`, 'g'), () => sponsorCheck)
        .replace(new RegExp(`${LIB_REGEX_PLACEHOLDER_LEGAL_AGREEMENTS.source}\\n`, 'g'), () => legalContent)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_CONTRIBUTORS_NOTE.source, 'g'), () => contributorsNote)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_DOCUMENTATION_URL.source, 'g'), () => documentationUrl)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_GITHUB_REPO.source, 'g'), githubRepo)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_GITHUB_SPONSOR.source, 'g'), githubSponsor)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_PRIVACY_POLICY.source, 'g'), privacyPolicy)
        .replace(new RegExp(LIB_REGEX_PLACEHOLDER_TERMS_OF_USE.source, 'g'), termsOfUse);

      content = Runner.replacePronoun(content, LIB_REGEX_PLACEHOLDER_WE, we);
      content = Runner.replacePronoun(content, LIB_REGEX_PLACEHOLDER_US, us);
      content = Runner.replacePronoun(content, LIB_REGEX_PLACEHOLDER_OUR, our);

      let duplicateIds: Cli_Generate_Github_IssueTemplate_Runner_Run_DuplicateIds = [];

      try {
        duplicateIds = Runner.findDuplicateIds(content);
      } catch {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'validate',
        }).error(`Generated YAML for "${fileName}" is invalid. Skipping ...`);

        continue;
      }

      if (duplicateIds.length > 0) {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'validate',
        }).error(`Generated "${fileName}" repeats the question id ${duplicateIds.map((duplicateId) => `"${duplicateId}"`).join(', ')}. Rename the custom question in "github.issueTemplate.customQuestions". Skipping ...`);

        process.exitCode = 1;

        continue;
      }

      if (isDryRun === true) {
        continue;
      }

      await saveGeneratedFile(targetPath, content, isReplaceFile, headerOptions);
    }

    return 'completed';
  }

  /**
   * CLI - Generate - GitHub - Issue Template - Build Question Fields.
   *
   * Joins the questions of one form in order: the global set, each selected repo-type
   * set, then the repo's custom questions. A form without a set file adds nothing for it.
   *
   * @param {Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TemplateDirectory} templateDirectory - Template directory.
   * @param {Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_FormSlug}          formSlug          - Form slug.
   * @param {Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeNames}         typeNames         - Type names.
   * @param {Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_CustomQuestions}   customQuestions   - Custom questions.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_Returns}
   *
   * @since 0.49.0
   */
  private static async buildQuestionFields(templateDirectory: Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TemplateDirectory, formSlug: Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_FormSlug, typeNames: Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeNames, customQuestions: Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_CustomQuestions): Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_Returns {
    const fieldFileMapping: Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_FieldFileMapping = {
      'nodejs': 'nodejs.yml',
      'apple': 'apple.yml',
      'android': 'android.yml',
      'csharp': 'csharp.yml',
      'php': 'php.yml',
      'python': 'python.yml',
      'homebridge': 'homebridge.yml',
      'pfsense': 'pfsense.yml',
      'synology': 'synology.yml',
      'docker': 'docker.yml',
      'web': 'web.yml',
      'screenshots': 'screenshots.yml',
      'cloudflare-worker': 'cloudflare-worker.yml',
      'pfsense-package': 'pfsense-package.yml',
      'github-action': 'github-action.yml',
      'native-app': 'native-app.yml',
      'docs-site': 'docs-site.yml',
      'notifications': 'notifications.yml',
    };
    const globalFragment: Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_GlobalFragment = await Runner.readFragment(join(templateDirectory, 'global-fields', `${formSlug}.yml`), false);

    // The bug report ships a set for every type, so a missing bug-report file is reported.
    // The support request reuses the bug-report set unless it ships its own file.
    const typeFragments: Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeFragments = await Promise.all(typeNames.map(async (typeName) => {
      const typeFragment: Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_TypeFragment = await Runner.readFragment(join(templateDirectory, `${formSlug}-fields`, fieldFileMapping[typeName]), formSlug === 'bug-report');

      if (typeFragment !== '' || formSlug !== 'support-request') {
        return typeFragment;
      }

      return Runner.readFragment(join(templateDirectory, 'bug-report-fields', fieldFileMapping[typeName]), true);
    }));
    const parts: Cli_Generate_Github_IssueTemplate_Runner_BuildQuestionFields_Parts = [
      globalFragment,
      ...typeFragments,
      Runner.serializeQuestions(customQuestions),
    ];

    return parts.join('');
  }

  /**
   * CLI - Generate - GitHub - Issue Template - Read Fragment.
   *
   * Reads one template fragment and ends it with a single newline. A missing file reads
   * as empty, with a warning only when the generator expects the file to exist.
   *
   * @param {Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_FilePath}   filePath   - File path.
   * @param {Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_IsRequired} isRequired - Is required.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_Returns}
   *
   * @since 0.49.0
   */
  private static async readFragment(filePath: Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_FilePath, isRequired: Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_IsRequired): Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_Returns {
    try {
      const raw: Cli_Generate_Github_IssueTemplate_Runner_ReadFragment_Raw = await fs.readFile(filePath, 'utf-8');

      return `${raw.trimEnd()}\n`;
    } catch {
      if (isRequired === true) {
        Logger.customize({
          name: 'Runner.readFragment',
          purpose: 'read',
        }).warn(`Failed to read issue-template fragment "${filePath}". Skipping ...`);
      }

      return '';
    }
  }

  /**
   * CLI - Generate - GitHub - Issue Template - Find Duplicate Ids.
   *
   * Parses a generated form and lists every question id that appears more than once,
   * which GitHub rejects. Throws when the YAML itself is invalid.
   *
   * @param {Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Content} content - Content.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Returns}
   *
   * @since 0.49.0
   */
  private static findDuplicateIds(content: Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Content): Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Returns {
    const parsed: Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Parsed = parseYaml(content);
    const body: Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Body = (
      parsed !== null
      && typeof parsed === 'object'
      && Array.isArray(parsed['body']) === true
    ) ? parsed['body'] : [];
    const seenIds: Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_SeenIds = new Set();
    const duplicates: Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Duplicates = [];

    for (const question of body) {
      const id: Cli_Generate_Github_IssueTemplate_Runner_FindDuplicateIds_Id = (question !== null && typeof question === 'object') ? Reflect.get(question, 'id') : undefined;

      if (typeof id !== 'string') {
        continue;
      }

      if (seenIds.has(id) === true && duplicates.includes(id) === false) {
        duplicates.push(id);
      }

      seenIds.add(id);
    }

    return duplicates;
  }

  /**
   * CLI - Generate - GitHub - Issue Template - Replace Pronoun.
   *
   * Replaces one pronoun placeholder throughout a template and capitalizes the
   * replacement when the placeholder begins a sentence or quoted YAML value.
   *
   * @param {Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Content}     content     - Content.
   * @param {Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Placeholder} placeholder - Placeholder.
   * @param {Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Value}       value       - Value.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Returns}
   *
   * @since 0.30.0
   */
  private static replacePronoun(
    content: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Content,
    placeholder: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Placeholder,
    value: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Value,
  ): Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_Returns {
    const capitalizedValue: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_CapitalizedValue = `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;

    /**
     * CLI - Generate - GitHub - Issue Template - Replace Pronoun - Resolve Replacement.
     *
     * Selects the correctly capitalized replacement for one placeholder match
     * after examining the content that precedes it on the current line.
     *
     * @param {Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Match}  _match - Match.
     * @param {Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Offset} offset - Offset.
     *
     * @returns {Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Returns}
     *
     * @since 0.30.0
     */
    function resolveReplacement(
      _match: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Match,
      offset: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Offset,
    ): Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Returns {
      const prefix: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_Prefix = content.slice(0, offset);
      const currentLinePrefix: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_CurrentLinePrefix = prefix.slice(prefix.lastIndexOf('\n') + 1).trimEnd();
      const previousCharacter: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_PreviousCharacter = currentLinePrefix.at(-1);
      const isSentenceStart: Cli_Generate_Github_IssueTemplate_Runner_ReplacePronoun_ResolveReplacement_IsSentenceStart = previousCharacter === undefined
        || previousCharacter === '.'
        || previousCharacter === '!'
        || previousCharacter === '?'
        || previousCharacter === ':'
        || previousCharacter === '"'
        || previousCharacter === '\''
        || previousCharacter === '('
        || previousCharacter === '['
        || previousCharacter === '{'
        || previousCharacter === '>'
        || previousCharacter === '-';

      return (isSentenceStart === true) ? capitalizedValue : value;
    }

    return content.replace(new RegExp(placeholder.source, 'g'), resolveReplacement);
  }

  /**
   * CLI - Generate - GitHub - Issue Template - Resolve Documentation URL.
   *
   * Picks the page the documentation checks link to: urls.documentation, or the README
   * on GitHub when only github.owner and github.repo are set. Returns empty otherwise.
   *
   * @param {Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Urls}       urls       - Urls.
   * @param {Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_GithubRepo} githubRepo - Github repo.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Returns}
   *
   * @since 0.49.0
   */
  private static resolveDocumentationUrl(urls: Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Urls, githubRepo: Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_GithubRepo): Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Returns {
    const documentation: Cli_Generate_Github_IssueTemplate_Runner_ResolveDocumentationUrl_Documentation = (urls !== undefined) ? (urls['documentation'] ?? '') : '';

    if (documentation !== '') {
      return documentation;
    }

    if (githubRepo !== '') {
      return `https://github.com/${githubRepo}#readme`;
    }

    return '';
  }

  /**
   * CLI - Generate - GitHub - Issue Template - Serialize Questions.
   *
   * Writes custom questions as issue-form YAML in the same quoted style as the shipped
   * templates. Attributes keep GitHub's documented order regardless of the config order.
   *
   * @param {Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Questions} questions - Questions.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Returns}
   *
   * @since 0.49.0
   */
  private static serializeQuestions(questions: Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Questions): Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Returns {
    const attributeKeys: Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_AttributeKeys = [
      'label',
      'description',
      'placeholder',
      'value',
      'render',
      'multiple',
      'options',
      'default',
    ];
    const lines: Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_Lines = [];

    for (const question of questions) {
      lines.push(`  - type: ${JSON.stringify(question['type'])}`);

      if (question['type'] !== 'markdown') {
        lines.push(`    id: ${JSON.stringify(question['id'])}`);
      }

      lines.push('    attributes:');

      for (const attributeKey of attributeKeys) {
        const attributeValue: Cli_Generate_Github_IssueTemplate_Runner_SerializeQuestions_AttributeValue = Reflect.get(question['attributes'], attributeKey);

        if (attributeValue === undefined) {
          continue;
        }

        if (Array.isArray(attributeValue) === false) {
          lines.push(`      ${attributeKey}: ${JSON.stringify(attributeValue)}`);

          continue;
        }

        lines.push(`      ${attributeKey}:`);

        for (const option of attributeValue) {
          if (typeof option === 'string') {
            lines.push(`        - ${JSON.stringify(option)}`);

            continue;
          }

          lines.push(`        - label: ${JSON.stringify(option['label'])}`);

          if (option['required'] !== undefined) {
            lines.push(`          required: ${JSON.stringify(option['required'])}`);
          }
        }
      }

      if (
        question['type'] !== 'markdown'
        && question['type'] !== 'checkboxes'
        && question['validations'] !== undefined
        && question['validations']['required'] !== undefined
      ) {
        lines.push('    validations:');
        lines.push(`      required: ${JSON.stringify(question['validations']['required'])}`);
      }
    }

    return (lines.length > 0) ? `${lines.join('\n')}\n` : '';
  }
}
