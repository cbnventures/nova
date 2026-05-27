import { join } from 'path';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_URL_PREFIX_BUY_ME_A_COFFEE,
  LIB_REGEX_URL_PREFIX_DOCKER_HUB,
  LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS,
  LIB_REGEX_URL_PREFIX_KOFI,
  LIB_REGEX_URL_PREFIX_LIBERAPAY,
  LIB_REGEX_URL_PREFIX_NPM_PACKAGE,
  LIB_REGEX_URL_PREFIX_OPEN_COLLECTIVE,
  LIB_REGEX_URL_PREFIX_PATREON,
  LIB_REGEX_URL_PREFIX_PAYPAL,
} from '../../../lib/regex.js';
import { collectConsumerWorkspacePaths, isProjectRoot, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_DockerImage,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_FundSources,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_GithubRepo,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_HasNodejs,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Lines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_NpmPackage,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platform,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platforms,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_ContributorsAndSupporters,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityLines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityName,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_FundLines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_FundSources,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Platform,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounOur,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounUs,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Sections,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_DocumentationUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Badges,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_HomepageUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Lines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_LogoUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_ProjectName,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_ProjectDescription,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Url,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Badges,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ConsumerWorkspacePaths,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Content,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ContributorsAndSupporters,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_CreditsSection,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_DockerImage,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_DockerUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_DocumentationSection,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_DocumentationUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Entities,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_FundSources,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Github,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubOwner,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubRepo,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubRepoName,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderSection,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_HomepageUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_IntroductionSection,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_LogoUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_NpmPackage,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_NpmUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Options,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Project,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectDescription,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectDescriptionRecord,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectName,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectNameRecord,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectPlatforms,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectPronouns,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_PronounOur,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_PronounUs,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Roles,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Sections,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_TargetPath,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Urls,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_WorkingFile,
} from '../../../types/cli/generate/must-haves/read-me.d.ts';

import type { Lib_Utility_SaveGeneratedFile_Header as LibUtilitySaveGeneratedFileHeader } from '../../../types/lib/utility.d.ts';

/**
 * CLI - Generate - Must Haves - Read Me.
 *
 * Generates the root README.md from a bundled template
 * and nova.config.json data. Also copies the file into
 * each consumer-facing workspace (app, package, tool, config).
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - Read Me - Run.
   *
   * Called by the CLI index via executeCommand. Reads nova.config.json for project identity,
   * URLs, and entities to populate the README template.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_MustHaves_ReadMe_Runner_Run_Options): Cli_Generate_MustHaves_ReadMe_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_ReadMe_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_ReadMe_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_ReadMe_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_ReadMe_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_ReadMe_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Generate_MustHaves_ReadMe_Runner_Run_WorkingFile = await new LibNovaConfig().load();

    const project: Cli_Generate_MustHaves_ReadMe_Runner_Run_Project = workingFile['project'];
    const projectNameRecord: Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectNameRecord = (project !== undefined) ? project['name'] : undefined;
    const projectName: Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectName = (projectNameRecord !== undefined) ? (projectNameRecord['title'] ?? '') : '';
    const projectDescriptionRecord: Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectDescriptionRecord = (project !== undefined) ? project['description'] : undefined;
    const projectDescription: Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectDescription = (projectDescriptionRecord !== undefined) ? (projectDescriptionRecord['long'] ?? '') : '';
    const projectPronouns: Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectPronouns = (project !== undefined) ? (project['pronouns'] ?? 'business') : 'business';
    const projectPlatforms: Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectPlatforms = (project !== undefined) ? (project['platforms'] ?? []) : [];
    const urls: Cli_Generate_MustHaves_ReadMe_Runner_Run_Urls = workingFile['urls'];
    const github: Cli_Generate_MustHaves_ReadMe_Runner_Run_Github = workingFile['github'];
    const homepageUrl: Cli_Generate_MustHaves_ReadMe_Runner_Run_HomepageUrl = (urls !== undefined) ? (urls['homepage'] ?? '') : '';
    const logoUrl: Cli_Generate_MustHaves_ReadMe_Runner_Run_LogoUrl = (urls !== undefined) ? (urls['logo'] ?? '') : '';
    const documentationUrl: Cli_Generate_MustHaves_ReadMe_Runner_Run_DocumentationUrl = (urls !== undefined) ? (urls['documentation'] ?? '') : '';
    const githubOwner: Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubOwner = (github !== undefined) ? (github['owner'] ?? '') : '';
    const githubRepoName: Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubRepoName = (github !== undefined) ? (github['repo'] ?? '') : '';
    const githubRepo: Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubRepo = (githubOwner !== '' && githubRepoName !== '') ? `${githubOwner}/${githubRepoName}` : '';
    const npmUrl: Cli_Generate_MustHaves_ReadMe_Runner_Run_NpmUrl = (urls !== undefined) ? (urls['npm'] ?? '') : '';
    const npmPackage: Cli_Generate_MustHaves_ReadMe_Runner_Run_NpmPackage = npmUrl.replace(LIB_REGEX_URL_PREFIX_NPM_PACKAGE, '');
    const dockerUrl: Cli_Generate_MustHaves_ReadMe_Runner_Run_DockerUrl = (urls !== undefined) ? (urls['docker'] ?? '') : '';
    const dockerImage: Cli_Generate_MustHaves_ReadMe_Runner_Run_DockerImage = dockerUrl.replace(LIB_REGEX_URL_PREFIX_DOCKER_HUB, '');
    const fundSources: Cli_Generate_MustHaves_ReadMe_Runner_Run_FundSources = (urls !== undefined) ? (urls['fundSources'] ?? []) : [];

    const pronounUs: Cli_Generate_MustHaves_ReadMe_Runner_Run_PronounUs = (projectPronouns === 'personal') ? 'me' : 'us';
    const pronounOur: Cli_Generate_MustHaves_ReadMe_Runner_Run_PronounOur = (projectPronouns === 'personal') ? 'my' : 'our';

    const entities: Cli_Generate_MustHaves_ReadMe_Runner_Run_Entities = workingFile['entities'] ?? [];
    const contributorsAndSupporters: Cli_Generate_MustHaves_ReadMe_Runner_Run_ContributorsAndSupporters = entities.filter((entity) => {
      const roles: Cli_Generate_MustHaves_ReadMe_Runner_Run_Roles = entity['roles'] ?? [];

      return roles.includes('contributor') || roles.includes('supporter');
    });

    const badges: Cli_Generate_MustHaves_ReadMe_Runner_Run_Badges = Runner.buildBadges(githubRepo, npmPackage, dockerImage, projectPlatforms, fundSources);
    const headerSection: Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderSection = Runner.buildHeaderSection(projectName, homepageUrl, logoUrl, badges);
    const introductionSection: Cli_Generate_MustHaves_ReadMe_Runner_Run_IntroductionSection = Runner.buildIntroductionSection(projectDescription);
    const documentationSection: Cli_Generate_MustHaves_ReadMe_Runner_Run_DocumentationSection = Runner.buildDocumentationSection(documentationUrl);
    const creditsSection: Cli_Generate_MustHaves_ReadMe_Runner_Run_CreditsSection = Runner.buildCreditsSection(fundSources, contributorsAndSupporters, pronounUs, pronounOur);

    const sections: Cli_Generate_MustHaves_ReadMe_Runner_Run_Sections = [];

    if (headerSection !== '') {
      sections.push(headerSection);
    }

    if (introductionSection !== '') {
      sections.push(introductionSection);
    }

    if (documentationSection !== '') {
      sections.push(documentationSection);
    }

    if (creditsSection !== '') {
      sections.push(creditsSection);
    }

    const content: Cli_Generate_MustHaves_ReadMe_Runner_Run_Content = `${sections.join('\n\n')}\n`;

    const targetPath: Cli_Generate_MustHaves_ReadMe_Runner_Run_TargetPath = join(currentDirectory, 'README.md');

    // Consumer workspace copies.
    const consumerWorkspacePaths: Cli_Generate_MustHaves_ReadMe_Runner_Run_ConsumerWorkspacePaths = collectConsumerWorkspacePaths(currentDirectory, workingFile['workspaces'], 'README.md');

    if (isDryRun === true) {
      return 'completed';
    }

    const headerOptions: LibUtilitySaveGeneratedFileHeader = {
      command: 'nova generate must-haves read-me',
      docsSlug: 'cli/generators/must-haves/read-me',
      mode: 'strict' as const,
    };

    await saveGeneratedFile(targetPath, content, isReplaceFile, headerOptions);

    for (const consumerWorkspacePath of consumerWorkspacePaths) {
      await saveGeneratedFile(consumerWorkspacePath, content, isReplaceFile, headerOptions);
    }

    return 'completed';
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Badges.
   *
   * Assembles shields.io badge HTML for npm, Docker, GitHub, and funding platforms. Output
   * replaces the platform badges placeholder in the template.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_GithubRepo}  githubRepo  - Github repo.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_NpmPackage}  npmPackage  - Npm package.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_DockerImage} dockerImage - Docker image.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platforms}   platforms   - Platforms.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_FundSources} fundSources - Fund sources.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Returns}
   *
   * @since 0.15.0
   */
  private static buildBadges(githubRepo: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_GithubRepo, npmPackage: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_NpmPackage, dockerImage: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_DockerImage, platforms: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platforms, fundSources: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_FundSources): Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Returns {
    const lines: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Lines = [];

    // Platform-specific badges.
    const hasNodejs: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_HasNodejs = platforms.includes('nodejs');

    if (hasNodejs === true && npmPackage !== '') {
      lines.push(
        `  <a href="https://www.npmjs.com/package/${npmPackage}">`,
        `    <img alt="npm Package" src="https://img.shields.io/npm/v/${npmPackage}?style=for-the-badge&logo=npm&logoColor=%23ffffff&color=%23b25da6">`,
        '  </a>',
        `  <a href="https://www.npmjs.com/package/${npmPackage}">`,
        `    <img alt="npm Downloads" src="https://img.shields.io/npm/dt/${npmPackage}?style=for-the-badge&logo=npm&logoColor=%23ffffff&color=%236688c3">`,
        '  </a>',
      );
    }

    // Docker Hub badges.
    if (dockerImage !== '') {
      lines.push(
        `  <a href="https://hub.docker.com/r/${dockerImage}">`,
        `    <img alt="Docker Pulls" src="https://img.shields.io/docker/pulls/${dockerImage}?style=for-the-badge&logo=docker&logoColor=%23ffffff&color=%23b25da6">`,
        '  </a>',
        `  <a href="https://hub.docker.com/r/${dockerImage}">`,
        `    <img alt="Docker Image Size" src="https://img.shields.io/docker/image-size/${dockerImage}?style=for-the-badge&logo=docker&logoColor=%23ffffff&color=%236688c3">`,
        '  </a>',
      );
    }

    // GitHub badges.
    if (githubRepo !== '') {
      lines.push(
        `  <a href="https://github.com/${githubRepo}/releases">`,
        `    <img alt="GitHub Releases" src="https://img.shields.io/github/v/release/${githubRepo}?style=for-the-badge&logo=github&logoColor=%23ffffff&color=%23b25da6">`,
        '  </a>',
        `  <a href="https://github.com/${githubRepo}">`,
        `    <img alt="GitHub Top Languages" src="https://img.shields.io/github/languages/top/${githubRepo}?style=for-the-badge&logo=github&logoColor=%23ffffff&color=%236688c3">`,
        '  </a>',
        `  <a href="https://github.com/${githubRepo}/blob/HEAD/LICENSE">`,
        `    <img alt="GitHub License" src="https://img.shields.io/github/license/${githubRepo}?style=for-the-badge&logo=googledocs&logoColor=%23ffffff&color=%2348a56a">`,
        '  </a>',
      );
    }

    // Funding badges.
    for (const source of fundSources) {
      const platform: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platform = Runner.detectFundPlatform(source);

      lines.push(
        `  <a href="${source}">`,
        `    <img alt="${platform['alt']}" src="https://img.shields.io/badge/${platform['label']}-gray?style=for-the-badge&logo=${platform['logo']}&logoColor=%23ffffff&color=%23${platform['color']}">`,
        '  </a>',
      );
    }

    return lines.join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Credits Section.
   *
   * Generates the markdown credits section with funding links and contributor listings.
   * Appended to the README when fund sources or entities exist.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_FundSources}               fundSources               - Fund sources.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_ContributorsAndSupporters} contributorsAndSupporters - Contributors and supporters.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounUs}                 pronounUs                 - Pronoun us.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounOur}                pronounOur                - Pronoun our.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Returns}
   *
   * @since 0.15.0
   */
  private static buildCreditsSection(fundSources: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_FundSources, contributorsAndSupporters: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_ContributorsAndSupporters, pronounUs: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounUs, pronounOur: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounOur): Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Returns {
    if (fundSources.length === 0 && contributorsAndSupporters.length === 0) {
      return '';
    }

    const sections: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Sections = ['## Credits and Appreciation'];

    if (fundSources.length > 0) {
      const fundLines: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_FundLines = [];

      for (const source of fundSources) {
        const platform: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Platform = Runner.detectFundPlatform(source);

        switch (platform['id']) {
          case 'github-sponsors': {
            fundLines.push(`- Become ${pronounOur} supporter on [GitHub Sponsors](${source})`);
            break;
          }

          case 'paypal': {
            fundLines.push(`- Make a one-time donation through [PayPal](${source})`);
            break;
          }

          case 'open-collective': {
            fundLines.push(`- Support ${pronounUs} on [Open Collective](${source})`);
            break;
          }

          case 'ko-fi': {
            fundLines.push(`- Buy ${pronounUs} a coffee on [Ko-fi](${source})`);
            break;
          }

          case 'buy-me-a-coffee': {
            fundLines.push(`- Buy ${pronounUs} a coffee on [Buy Me a Coffee](${source})`);
            break;
          }

          case 'patreon': {
            fundLines.push(`- Become ${pronounOur} patron on [Patreon](${source})`);
            break;
          }

          case 'liberapay': {
            fundLines.push(`- Donate to ${pronounUs} on [Liberapay](${source})`);
            break;
          }

          default: {
            fundLines.push(`- Support ${pronounUs} at [${source}](${source})`);
            break;
          }
        }
      }

      sections.push(
        '',
        'If you find value in the ongoing development of this project and wish to express your appreciation, you have the option to:',
        '',
        ...fundLines,
      );
    }

    if (contributorsAndSupporters.length > 0) {
      const entityLines: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityLines = [];

      for (const entity of contributorsAndSupporters) {
        const entityName: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityName = entity['name'] ?? '';

        if (entityName === '') {
          continue;
        }

        const entityUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityUrl = entity['url'] ?? '';

        if (entityUrl !== '') {
          entityLines.push(`- [${entityName}](${entityUrl})`);
        } else {
          entityLines.push(`- ${entityName}`);
        }
      }

      if (entityLines.length > 0) {
        sections.push(
          '',
          `A special thanks to ${pronounOur} contributors and supporters:`,
          '',
          ...entityLines,
        );
      }
    }

    return sections.join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Documentation Section.
   *
   * Builds the `## Documentation` section markdown. Returns an empty string
   * when `documentationUrl` is missing so the section can be omitted entirely.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_DocumentationUrl} documentationUrl - Documentation url.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_Returns}
   *
   * @since 0.16.2
   */
  private static buildDocumentationSection(documentationUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_DocumentationUrl): Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_Returns {
    if (documentationUrl === '') {
      return '';
    }

    return [
      '## Documentation',
      '',
      `To get started, visit [${documentationUrl}](${documentationUrl}) to view the full documentation.`,
    ].join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Header Section.
   *
   * Builds the centered header block with optional logo, homepage link,
   * title, and badges. Each piece appears only when its source value exists.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_ProjectName} projectName - Project name.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_HomepageUrl} homepageUrl - Homepage url.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_LogoUrl}     logoUrl     - Logo url.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Badges}      badges      - Badges.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Returns}
   *
   * @since 0.16.2
   */
  private static buildHeaderSection(projectName: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_ProjectName, homepageUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_HomepageUrl, logoUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_LogoUrl, badges: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Badges): Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Returns {
    if (projectName === '') {
      return '';
    }

    const lines: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Lines = ['<div align="center">'];

    if (logoUrl !== '' && homepageUrl !== '') {
      lines.push(
        `  <a href="${homepageUrl}">`,
        '    <picture>',
        `      <img alt="${projectName}" src="${logoUrl}" height="128">`,
        '    </picture>',
        '  </a>',
        `  <h1>${projectName}</h1>`,
      );
    } else if (logoUrl !== '') {
      lines.push(
        '  <picture>',
        `    <img alt="${projectName}" src="${logoUrl}" height="128">`,
        '  </picture>',
        `  <h1>${projectName}</h1>`,
      );
    } else if (homepageUrl !== '') {
      lines.push(
        `  <a href="${homepageUrl}">`,
        `    <h1>${projectName}</h1>`,
        '  </a>',
      );
    } else {
      lines.push(`  <h1>${projectName}</h1>`);
    }

    if (badges !== '') {
      lines.push(badges);
    }

    lines.push('</div>');

    return lines.join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Introduction Section.
   *
   * Builds the `## Introduction` section markdown. Returns an empty string
   * when `projectDescription` is missing so the section can be omitted entirely.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_ProjectDescription} projectDescription - Project description.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_Returns}
   *
   * @since 0.16.2
   */
  private static buildIntroductionSection(projectDescription: Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_ProjectDescription): Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_Returns {
    if (projectDescription === '') {
      return '';
    }

    return [
      '## Introduction',
      '',
      projectDescription,
    ].join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Detect Fund Platform.
   *
   * Matches a funding URL against known platform prefixes and returns badge metadata. Used by
   * both buildBadges and buildCreditsSection.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Url} url - Url.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Returns}
   *
   * @since 0.15.0
   */
  private static detectFundPlatform(url: Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Url): Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Returns {
    if (LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS.test(url) === true) {
      return {
        id: 'github-sponsors',
        url,
        logo: 'githubsponsors',
        label: 'github-sponsor',
        alt: 'Become a GitHub Sponsor',
        color: 'eaaf41',
      };
    }

    if (LIB_REGEX_URL_PREFIX_PAYPAL.test(url) === true) {
      return {
        id: 'paypal',
        url,
        logo: 'paypal',
        label: 'paypal-donate',
        alt: 'Donate via PayPal',
        color: 'ce4a4a',
      };
    }

    if (LIB_REGEX_URL_PREFIX_OPEN_COLLECTIVE.test(url) === true) {
      return {
        id: 'open-collective',
        url,
        logo: 'opencollective',
        label: 'open%20collective-donate',
        alt: 'Open Collective',
        color: '7fadf2',
      };
    }

    if (LIB_REGEX_URL_PREFIX_KOFI.test(url) === true) {
      return {
        id: 'ko-fi',
        url,
        logo: 'kofi',
        label: 'ko--fi-donate',
        alt: 'Support on Ko-fi',
        color: 'ff5e5b',
      };
    }

    if (LIB_REGEX_URL_PREFIX_BUY_ME_A_COFFEE.test(url) === true) {
      return {
        id: 'buy-me-a-coffee',
        url,
        logo: 'buymeacoffee',
        label: 'buy%20me%20a%20coffee-support',
        alt: 'Buy Me a Coffee',
        color: 'ffdd00',
      };
    }

    if (LIB_REGEX_URL_PREFIX_PATREON.test(url) === true) {
      return {
        id: 'patreon',
        url,
        logo: 'patreon',
        label: 'patreon-support',
        alt: 'Support on Patreon',
        color: 'ff424d',
      };
    }

    if (LIB_REGEX_URL_PREFIX_LIBERAPAY.test(url) === true) {
      return {
        id: 'liberapay',
        url,
        logo: 'liberapay',
        label: 'liberapay-donate',
        alt: 'Donate on Liberapay',
        color: 'f6c915',
      };
    }

    return {
      id: 'unknown',
      url,
      logo: 'heart',
      label: 'donate-support',
      alt: 'Support this project',
      color: '888888',
    };
  }
}
