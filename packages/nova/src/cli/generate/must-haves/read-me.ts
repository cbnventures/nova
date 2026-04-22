import { join } from 'path';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_URL_PREFIX_BUY_ME_A_COFFEE,
  LIB_REGEX_URL_PREFIX_DOCKER_HUB,
  LIB_REGEX_URL_PREFIX_GITHUB,
  LIB_REGEX_URL_PREFIX_GITHUB_SPONSORS,
  LIB_REGEX_URL_PREFIX_KOFI,
  LIB_REGEX_URL_PREFIX_LIBERAPAY,
  LIB_REGEX_URL_PREFIX_NPM_PACKAGE,
  LIB_REGEX_URL_PREFIX_OPEN_COLLECTIVE,
  LIB_REGEX_URL_PREFIX_PATREON,
  LIB_REGEX_URL_PREFIX_PAYPAL,
} from '../../../lib/regex.js';
import { isProjectRoot, saveGeneratedFile } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliGenerateMustHavesReadMeBuildBadgesDockerImage,
  CliGenerateMustHavesReadMeBuildBadgesFundSources,
  CliGenerateMustHavesReadMeBuildBadgesGithubRepo,
  CliGenerateMustHavesReadMeBuildBadgesHasNodejs,
  CliGenerateMustHavesReadMeBuildBadgesLines,
  CliGenerateMustHavesReadMeBuildBadgesNpmPackage,
  CliGenerateMustHavesReadMeBuildBadgesPlatform,
  CliGenerateMustHavesReadMeBuildBadgesPlatforms,
  CliGenerateMustHavesReadMeBuildBadgesReturns,
  CliGenerateMustHavesReadMeBuildCreditsSectionContributorsAndSupporters,
  CliGenerateMustHavesReadMeBuildCreditsSectionEntityLines,
  CliGenerateMustHavesReadMeBuildCreditsSectionEntityName,
  CliGenerateMustHavesReadMeBuildCreditsSectionEntityUrl,
  CliGenerateMustHavesReadMeBuildCreditsSectionFundLines,
  CliGenerateMustHavesReadMeBuildCreditsSectionFundSources,
  CliGenerateMustHavesReadMeBuildCreditsSectionPlatform,
  CliGenerateMustHavesReadMeBuildCreditsSectionPronounOur,
  CliGenerateMustHavesReadMeBuildCreditsSectionPronounUs,
  CliGenerateMustHavesReadMeBuildCreditsSectionReturns,
  CliGenerateMustHavesReadMeBuildCreditsSectionSections,
  CliGenerateMustHavesReadMeBuildDocumentationSectionDocumentationUrl,
  CliGenerateMustHavesReadMeBuildDocumentationSectionReturns,
  CliGenerateMustHavesReadMeBuildHeaderSectionBadges,
  CliGenerateMustHavesReadMeBuildHeaderSectionHomepageUrl,
  CliGenerateMustHavesReadMeBuildHeaderSectionLines,
  CliGenerateMustHavesReadMeBuildHeaderSectionLogoUrl,
  CliGenerateMustHavesReadMeBuildHeaderSectionProjectName,
  CliGenerateMustHavesReadMeBuildHeaderSectionReturns,
  CliGenerateMustHavesReadMeBuildIntroductionSectionProjectDescription,
  CliGenerateMustHavesReadMeBuildIntroductionSectionReturns,
  CliGenerateMustHavesReadMeDetectFundPlatformReturns,
  CliGenerateMustHavesReadMeDetectFundPlatformUrl,
  CliGenerateMustHavesReadMeRunBadges,
  CliGenerateMustHavesReadMeRunContent,
  CliGenerateMustHavesReadMeRunContributorsAndSupporters,
  CliGenerateMustHavesReadMeRunCreditsSection,
  CliGenerateMustHavesReadMeRunCurrentDirectory,
  CliGenerateMustHavesReadMeRunDistributablePaths,
  CliGenerateMustHavesReadMeRunDistributableReadmePath,
  CliGenerateMustHavesReadMeRunDockerImage,
  CliGenerateMustHavesReadMeRunDockerUrl,
  CliGenerateMustHavesReadMeRunDocumentationSection,
  CliGenerateMustHavesReadMeRunDocumentationUrl,
  CliGenerateMustHavesReadMeRunEntities,
  CliGenerateMustHavesReadMeRunFundSources,
  CliGenerateMustHavesReadMeRunGithubRepo,
  CliGenerateMustHavesReadMeRunGithubUrl,
  CliGenerateMustHavesReadMeRunHeaderSection,
  CliGenerateMustHavesReadMeRunHomepageUrl,
  CliGenerateMustHavesReadMeRunIntroductionSection,
  CliGenerateMustHavesReadMeRunIsAtProjectRoot,
  CliGenerateMustHavesReadMeRunIsDryRun,
  CliGenerateMustHavesReadMeRunIsReplaceFile,
  CliGenerateMustHavesReadMeRunLogoUrl,
  CliGenerateMustHavesReadMeRunNpmPackage,
  CliGenerateMustHavesReadMeRunNpmUrl,
  CliGenerateMustHavesReadMeRunOptions,
  CliGenerateMustHavesReadMeRunProject,
  CliGenerateMustHavesReadMeRunProjectDescription,
  CliGenerateMustHavesReadMeRunProjectDescriptionRecord,
  CliGenerateMustHavesReadMeRunProjectName,
  CliGenerateMustHavesReadMeRunProjectNameRecord,
  CliGenerateMustHavesReadMeRunProjectPlatforms,
  CliGenerateMustHavesReadMeRunProjectPronouns,
  CliGenerateMustHavesReadMeRunPronounOur,
  CliGenerateMustHavesReadMeRunPronounUs,
  CliGenerateMustHavesReadMeRunReplaceFileNotice,
  CliGenerateMustHavesReadMeRunReturns,
  CliGenerateMustHavesReadMeRunRoles,
  CliGenerateMustHavesReadMeRunSections,
  CliGenerateMustHavesReadMeRunTargetPath,
  CliGenerateMustHavesReadMeRunUrls,
  CliGenerateMustHavesReadMeRunWorkingFile,
  CliGenerateMustHavesReadMeRunWorkspace,
  CliGenerateMustHavesReadMeRunWorkspacePath,
  CliGenerateMustHavesReadMeRunWorkspaces,
} from '../../../types/cli/generate/must-haves/read-me.d.ts';

/**
 * CLI - Generate - Must Haves - Read Me.
 *
 * Generates the root README.md from a bundled template
 * and nova.config.json data. Also copies the file into
 * distributable workspace directories.
 *
 * @since 0.15.0
 */
export class CliGenerateMustHavesReadMe {
  /**
   * CLI - Generate - Must Haves - Read Me - Run.
   *
   * Called by the CLI index via executeCommand. Reads nova.config.json for project identity,
   * URLs, and entities to populate the README template.
   *
   * @param {CliGenerateMustHavesReadMeRunOptions} options - Options.
   *
   * @returns {CliGenerateMustHavesReadMeRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliGenerateMustHavesReadMeRunOptions): CliGenerateMustHavesReadMeRunReturns {
    const currentDirectory: CliGenerateMustHavesReadMeRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliGenerateMustHavesReadMeRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: CliGenerateMustHavesReadMeRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliGenerateMustHavesReadMeRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliGenerateMustHavesReadMe.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliGenerateMustHavesReadMeRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliGenerateMustHavesReadMe.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: CliGenerateMustHavesReadMeRunWorkingFile = await new LibNovaConfig().load();

    const project: CliGenerateMustHavesReadMeRunProject = workingFile['project'];
    const projectNameRecord: CliGenerateMustHavesReadMeRunProjectNameRecord = (project !== undefined) ? project['name'] : undefined;
    const projectName: CliGenerateMustHavesReadMeRunProjectName = (projectNameRecord !== undefined) ? (projectNameRecord['title'] ?? '') : '';
    const projectDescriptionRecord: CliGenerateMustHavesReadMeRunProjectDescriptionRecord = (project !== undefined) ? project['description'] : undefined;
    const projectDescription: CliGenerateMustHavesReadMeRunProjectDescription = (projectDescriptionRecord !== undefined) ? (projectDescriptionRecord['long'] ?? '') : '';
    const projectPronouns: CliGenerateMustHavesReadMeRunProjectPronouns = (project !== undefined) ? (project['pronouns'] ?? 'business') : 'business';
    const projectPlatforms: CliGenerateMustHavesReadMeRunProjectPlatforms = (project !== undefined) ? (project['platforms'] ?? []) : [];
    const urls: CliGenerateMustHavesReadMeRunUrls = workingFile['urls'];
    const homepageUrl: CliGenerateMustHavesReadMeRunHomepageUrl = (urls !== undefined) ? (urls['homepage'] ?? '') : '';
    const logoUrl: CliGenerateMustHavesReadMeRunLogoUrl = (urls !== undefined) ? (urls['logo'] ?? '') : '';
    const documentationUrl: CliGenerateMustHavesReadMeRunDocumentationUrl = (urls !== undefined) ? (urls['documentation'] ?? '') : '';
    const githubUrl: CliGenerateMustHavesReadMeRunGithubUrl = (urls !== undefined) ? (urls['github'] ?? '') : '';
    const githubRepo: CliGenerateMustHavesReadMeRunGithubRepo = githubUrl.replace(LIB_REGEX_URL_PREFIX_GITHUB, '');
    const npmUrl: CliGenerateMustHavesReadMeRunNpmUrl = (urls !== undefined) ? (urls['npm'] ?? '') : '';
    const npmPackage: CliGenerateMustHavesReadMeRunNpmPackage = npmUrl.replace(LIB_REGEX_URL_PREFIX_NPM_PACKAGE, '');
    const dockerUrl: CliGenerateMustHavesReadMeRunDockerUrl = (urls !== undefined) ? (urls['docker'] ?? '') : '';
    const dockerImage: CliGenerateMustHavesReadMeRunDockerImage = dockerUrl.replace(LIB_REGEX_URL_PREFIX_DOCKER_HUB, '');
    const fundSources: CliGenerateMustHavesReadMeRunFundSources = (urls !== undefined) ? (urls['fundSources'] ?? []) : [];

    const pronounUs: CliGenerateMustHavesReadMeRunPronounUs = (projectPronouns === 'personal') ? 'me' : 'us';
    const pronounOur: CliGenerateMustHavesReadMeRunPronounOur = (projectPronouns === 'personal') ? 'my' : 'our';

    const entities: CliGenerateMustHavesReadMeRunEntities = workingFile['entities'] ?? [];
    const contributorsAndSupporters: CliGenerateMustHavesReadMeRunContributorsAndSupporters = entities.filter((entity) => {
      const roles: CliGenerateMustHavesReadMeRunRoles = entity['roles'] ?? [];

      return roles.includes('contributor') || roles.includes('supporter');
    });

    const badges: CliGenerateMustHavesReadMeRunBadges = CliGenerateMustHavesReadMe.buildBadges(githubRepo, npmPackage, dockerImage, projectPlatforms, fundSources);
    const headerSection: CliGenerateMustHavesReadMeRunHeaderSection = CliGenerateMustHavesReadMe.buildHeaderSection(projectName, homepageUrl, logoUrl, badges);
    const introductionSection: CliGenerateMustHavesReadMeRunIntroductionSection = CliGenerateMustHavesReadMe.buildIntroductionSection(projectDescription);
    const documentationSection: CliGenerateMustHavesReadMeRunDocumentationSection = CliGenerateMustHavesReadMe.buildDocumentationSection(documentationUrl);
    const creditsSection: CliGenerateMustHavesReadMeRunCreditsSection = CliGenerateMustHavesReadMe.buildCreditsSection(fundSources, contributorsAndSupporters, pronounUs, pronounOur);

    const sections: CliGenerateMustHavesReadMeRunSections = [];

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

    const content: CliGenerateMustHavesReadMeRunContent = `${sections.join('\n\n')}\n`;

    const targetPath: CliGenerateMustHavesReadMeRunTargetPath = join(currentDirectory, 'README.md');

    // Distributable workspace copies.
    const workspaces: CliGenerateMustHavesReadMeRunWorkspaces = workingFile['workspaces'] ?? {};
    const distributablePaths: CliGenerateMustHavesReadMeRunDistributablePaths = [];

    for (const workspacesEntry of Object.entries(workspaces)) {
      const workspacePath: CliGenerateMustHavesReadMeRunWorkspacePath = workspacesEntry[0];
      const workspace: CliGenerateMustHavesReadMeRunWorkspace = workspacesEntry[1];

      if (workspace['policy'] === 'distributable' && workspacePath !== './') {
        const distributableReadmePath: CliGenerateMustHavesReadMeRunDistributableReadmePath = join(currentDirectory, workspacePath, 'README.md');

        distributablePaths.push(distributableReadmePath);
      }
    }

    if (isDryRun === true) {
      return 'completed';
    }

    await saveGeneratedFile(targetPath, content, isReplaceFile);

    for (const distributablePath of distributablePaths) {
      await saveGeneratedFile(distributablePath, content, isReplaceFile);
    }

    return 'completed';
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Badges.
   *
   * Assembles shields.io badge HTML for npm, Docker, GitHub, and funding platforms. Output
   * replaces the platform badges placeholder in the template.
   *
   * @param {CliGenerateMustHavesReadMeBuildBadgesGithubRepo}  githubRepo  - Github repo.
   * @param {CliGenerateMustHavesReadMeBuildBadgesNpmPackage}  npmPackage  - Npm package.
   * @param {CliGenerateMustHavesReadMeBuildBadgesDockerImage} dockerImage - Docker image.
   * @param {CliGenerateMustHavesReadMeBuildBadgesPlatforms}   platforms   - Platforms.
   * @param {CliGenerateMustHavesReadMeBuildBadgesFundSources} fundSources - Fund sources.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesReadMeBuildBadgesReturns}
   *
   * @since 0.15.0
   */
  private static buildBadges(githubRepo: CliGenerateMustHavesReadMeBuildBadgesGithubRepo, npmPackage: CliGenerateMustHavesReadMeBuildBadgesNpmPackage, dockerImage: CliGenerateMustHavesReadMeBuildBadgesDockerImage, platforms: CliGenerateMustHavesReadMeBuildBadgesPlatforms, fundSources: CliGenerateMustHavesReadMeBuildBadgesFundSources): CliGenerateMustHavesReadMeBuildBadgesReturns {
    const lines: CliGenerateMustHavesReadMeBuildBadgesLines = [];

    // Platform-specific badges.
    const hasNodejs: CliGenerateMustHavesReadMeBuildBadgesHasNodejs = platforms.includes('nodejs');

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
      const platform: CliGenerateMustHavesReadMeBuildBadgesPlatform = CliGenerateMustHavesReadMe.detectFundPlatform(source);

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
   * @param {CliGenerateMustHavesReadMeBuildCreditsSectionFundSources}               fundSources               - Fund sources.
   * @param {CliGenerateMustHavesReadMeBuildCreditsSectionContributorsAndSupporters} contributorsAndSupporters - Contributors and supporters.
   * @param {CliGenerateMustHavesReadMeBuildCreditsSectionPronounUs}                 pronounUs                 - Pronoun us.
   * @param {CliGenerateMustHavesReadMeBuildCreditsSectionPronounOur}                pronounOur                - Pronoun our.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesReadMeBuildCreditsSectionReturns}
   *
   * @since 0.15.0
   */
  private static buildCreditsSection(fundSources: CliGenerateMustHavesReadMeBuildCreditsSectionFundSources, contributorsAndSupporters: CliGenerateMustHavesReadMeBuildCreditsSectionContributorsAndSupporters, pronounUs: CliGenerateMustHavesReadMeBuildCreditsSectionPronounUs, pronounOur: CliGenerateMustHavesReadMeBuildCreditsSectionPronounOur): CliGenerateMustHavesReadMeBuildCreditsSectionReturns {
    if (fundSources.length === 0 && contributorsAndSupporters.length === 0) {
      return '';
    }

    const sections: CliGenerateMustHavesReadMeBuildCreditsSectionSections = ['## Credits and Appreciation'];

    if (fundSources.length > 0) {
      const fundLines: CliGenerateMustHavesReadMeBuildCreditsSectionFundLines = [];

      for (const source of fundSources) {
        const platform: CliGenerateMustHavesReadMeBuildCreditsSectionPlatform = CliGenerateMustHavesReadMe.detectFundPlatform(source);

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
      const entityLines: CliGenerateMustHavesReadMeBuildCreditsSectionEntityLines = [];

      for (const entity of contributorsAndSupporters) {
        const entityName: CliGenerateMustHavesReadMeBuildCreditsSectionEntityName = entity['name'] ?? '';

        if (entityName === '') {
          continue;
        }

        const entityUrl: CliGenerateMustHavesReadMeBuildCreditsSectionEntityUrl = entity['url'] ?? '';

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
   * @param {CliGenerateMustHavesReadMeBuildDocumentationSectionDocumentationUrl} documentationUrl - Documentation url.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesReadMeBuildDocumentationSectionReturns}
   *
   * @since 0.16.2
   */
  private static buildDocumentationSection(documentationUrl: CliGenerateMustHavesReadMeBuildDocumentationSectionDocumentationUrl): CliGenerateMustHavesReadMeBuildDocumentationSectionReturns {
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
   * @param {CliGenerateMustHavesReadMeBuildHeaderSectionProjectName} projectName - Project name.
   * @param {CliGenerateMustHavesReadMeBuildHeaderSectionHomepageUrl} homepageUrl - Homepage url.
   * @param {CliGenerateMustHavesReadMeBuildHeaderSectionLogoUrl}     logoUrl     - Logo url.
   * @param {CliGenerateMustHavesReadMeBuildHeaderSectionBadges}      badges      - Badges.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesReadMeBuildHeaderSectionReturns}
   *
   * @since 0.16.2
   */
  private static buildHeaderSection(projectName: CliGenerateMustHavesReadMeBuildHeaderSectionProjectName, homepageUrl: CliGenerateMustHavesReadMeBuildHeaderSectionHomepageUrl, logoUrl: CliGenerateMustHavesReadMeBuildHeaderSectionLogoUrl, badges: CliGenerateMustHavesReadMeBuildHeaderSectionBadges): CliGenerateMustHavesReadMeBuildHeaderSectionReturns {
    if (projectName === '') {
      return '';
    }

    const lines: CliGenerateMustHavesReadMeBuildHeaderSectionLines = ['<div align="center">'];

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
   * @param {CliGenerateMustHavesReadMeBuildIntroductionSectionProjectDescription} projectDescription - Project description.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesReadMeBuildIntroductionSectionReturns}
   *
   * @since 0.16.2
   */
  private static buildIntroductionSection(projectDescription: CliGenerateMustHavesReadMeBuildIntroductionSectionProjectDescription): CliGenerateMustHavesReadMeBuildIntroductionSectionReturns {
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
   * @param {CliGenerateMustHavesReadMeDetectFundPlatformUrl} url - Url.
   *
   * @private
   *
   * @returns {CliGenerateMustHavesReadMeDetectFundPlatformReturns}
   *
   * @since 0.15.0
   */
  private static detectFundPlatform(url: CliGenerateMustHavesReadMeDetectFundPlatformUrl): CliGenerateMustHavesReadMeDetectFundPlatformReturns {
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
