import { join } from 'node:path';

import { resolveCoverageBadgeEndpointUrl } from '../../../lib/coverage-badge.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { wrapReadMeRegion } from '../../../lib/read-me-regions.js';
import {
  LIB_REGEX_PATTERN_SVG_DATA_URI,
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
import { Logger, MarkdownTable } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_BadgeId,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Badges,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_CoverageEndpointUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_CoverageHref,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_DockerImage,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_FundSources,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_GithubRepo,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Lines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_NpmPackage,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platform,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_BadgeIds,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Config,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_CoverageEndpointUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_DockerImage,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_DockerUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_FundSources,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Github,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_GithubOwner,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_GithubRepo,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_GithubRepoName,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_NpmPackage,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_NpmUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Profile,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_ReadMe,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Urls,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Config,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ContributorsAndSupporters,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_CreditsSection,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Entities,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_FundSources,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Profile,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProfileFundSources,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProfileSupport,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProfileSupportSection,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProfileUrls,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Project,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProjectPronouns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_PronounOur,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_PronounUs,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ReadMe,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Roles,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Urls,
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
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Config,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_DocumentationSection,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_DocumentationUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Profile,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_ProfileLinkGroups,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_ReadMe,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Urls,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_DocumentationUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Config,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_HeaderLines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_HomepageUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_LogoUrl,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Profile,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ProfileHeading,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Project,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ProjectName,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ProjectNameRecord,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ReadMe,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Urls,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Config,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_IntroductionSection,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Profile,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ProfileIntroduction,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Project,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ProjectDescription,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ProjectDescriptionRecord,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ReadMe,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_ProjectDescription,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_Badge,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_EscapedLabel,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_Logo,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_BadgeGroups,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_Heading,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_Lines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_Sections,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Columns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Heading,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_IsTable,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Lines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_LinkGroups,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Sections,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Table,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Badge,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Emoji,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_FundSources,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Label,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Lines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Message,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Platform,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Support,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_SupportBadges,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Title,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_Config,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_ProjectReadMe,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_ReadMe,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_BadgesContent,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_Config,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_CreditsContent,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_DocumentationContent,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_HeaderContent,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_HeaderLines,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_IntroductionContent,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_IsProfileReadMe,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_ReadMe,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_Sections,
  Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Url,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ConsumerWorkspacePaths,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderOptions,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Options,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_Returns,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_RootContent,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_TargetPath,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_WorkingFile,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_WorkspaceConfig,
  Cli_Generate_MustHaves_ReadMe_Runner_Run_WorkspaceContent,
} from '../../../types/cli/generate/must-haves/read-me.d.ts';

/**
 * CLI - Generate - Must Haves - Read Me.
 *
 * Generates the root README.md from a bundled template
 * and nova.config.json data, then copies the resulting file into every
 * consumer-facing workspace (app, package, tool, config).
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

    // Profile mode applies only to the root README. Consumer-workspace copies are built from a
    // project-mode view of the same config, which is the config itself when no profile is set.
    const rootContent: Cli_Generate_MustHaves_ReadMe_Runner_Run_RootContent = Runner.buildReadMeContent(workingFile);
    const workspaceConfig: Cli_Generate_MustHaves_ReadMe_Runner_Run_WorkspaceConfig = Runner.buildProjectReadMeConfig(workingFile);
    const workspaceContent: Cli_Generate_MustHaves_ReadMe_Runner_Run_WorkspaceContent = (workspaceConfig === workingFile) ? rootContent : Runner.buildReadMeContent(workspaceConfig);

    const targetPath: Cli_Generate_MustHaves_ReadMe_Runner_Run_TargetPath = join(currentDirectory, 'README.md');

    // Consumer workspace copies.
    const consumerWorkspacePaths: Cli_Generate_MustHaves_ReadMe_Runner_Run_ConsumerWorkspacePaths = collectConsumerWorkspacePaths(currentDirectory, workingFile['workspaces'], 'README.md');

    if (isDryRun === true) {
      return 'completed';
    }

    const headerOptions: Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderOptions = {
      command: 'nova generate must-haves read-me',
      docsSlug: 'cli/generators/must-haves/read-me',
      mode: 'strict' as const,
    };

    await saveGeneratedFile(targetPath, rootContent, isReplaceFile, headerOptions);

    for (const consumerWorkspacePath of consumerWorkspacePaths) {
      await saveGeneratedFile(consumerWorkspacePath, workspaceContent, isReplaceFile, headerOptions);
    }

    return 'completed';
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Project Read Me Config.
   *
   * Returns the project-mode config view used for consumer-workspace README copies. With a
   * profile, readme keeps only its badges; without one, the same config object is returned.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_Config} config - Config.
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_Returns}
   *
   * @since 0.50.0
   */
  public static buildProjectReadMeConfig(config: Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_Config): Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_Returns {
    const readMe: Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_ReadMe = config['readme'];

    if (readMe === undefined || readMe['profile'] === undefined) {
      return config;
    }

    const projectReadMe: Cli_Generate_MustHaves_ReadMe_Runner_BuildProjectReadMeConfig_ProjectReadMe = {};

    if (readMe['badges'] !== undefined) {
      projectReadMe.badges = readMe['badges'];
    }

    return {
      ...config,
      readme: projectReadMe,
    };
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Read Me Content.
   *
   * Assembles the full README body for one config, wrapping each region in its markers. A
   * config with a profile produces the profile layout; otherwise the project layout is used.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_Config} config - Config.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_Returns}
   *
   * @since 0.50.0
   */
  private static buildReadMeContent(config: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_Config): Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_Returns {
    // Each region's inner content is derived from config by a public region-content method so
    // both this generator and the read-me refresh recipes assemble regions from one source.
    const headerContent: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_HeaderContent = Runner.buildHeaderRegionContent(config);
    const badgesContent: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_BadgesContent = Runner.buildBadgesRegionContent(config);
    const introductionContent: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_IntroductionContent = Runner.buildIntroductionRegionContent(config);
    const documentationContent: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_DocumentationContent = Runner.buildDocumentationRegionContent(config);
    const creditsContent: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_CreditsContent = Runner.buildCreditsRegionContent(config);

    const sections: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_Sections = [];
    const readMe: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_ReadMe = config['readme'];
    const isProfileReadMe: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_IsProfileReadMe = readMe !== undefined && readMe['profile'] !== undefined;

    if (isProfileReadMe === true) {
      if (headerContent !== undefined) {
        sections.push(wrapReadMeRegion('header', headerContent));
      }

      if (introductionContent !== undefined) {
        sections.push(wrapReadMeRegion('introduction', introductionContent));
      }

      if (badgesContent !== '') {
        sections.push(wrapReadMeRegion('badges', badgesContent));
      }

      if (documentationContent !== undefined) {
        sections.push(wrapReadMeRegion('documentation', documentationContent));
      }

      if (creditsContent !== undefined) {
        sections.push(wrapReadMeRegion('credits', creditsContent));
      }
    } else {
      // The project header block wraps the header and badges regions inside a centered div.
      // Badges only appear when the header is present, so both are bound to that block.
      if (headerContent !== undefined) {
        const headerLines: Cli_Generate_MustHaves_ReadMe_Runner_BuildReadMeContent_HeaderLines = [
          '<div align="center">',
          wrapReadMeRegion('header', headerContent),
        ];

        if (badgesContent !== '') {
          headerLines.push(wrapReadMeRegion('badges', badgesContent));
        }

        headerLines.push('</div>');

        sections.push(headerLines.join('\n'));
      }

      if (introductionContent !== undefined) {
        sections.push(wrapReadMeRegion('introduction', introductionContent));
      }

      if (documentationContent !== undefined) {
        sections.push(wrapReadMeRegion('documentation', documentationContent));
      }

      if (creditsContent !== undefined) {
        sections.push(wrapReadMeRegion('credits', creditsContent));
      }
    }

    return `${sections.join('\n\n')}\n`;
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Badges Region Content.
   *
   * Resolves the exact ordered badge identifiers from config into the badges region.
   * Missing and empty badge arrays both return an empty string, so no implicit badges appear.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Config} config - Config.
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Returns}
   *
   * @since 0.21.0
   */
  public static buildBadgesRegionContent(config: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Config): Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Returns {
    const readMe: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_ReadMe = config['readme'];
    const profile: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Profile = (readMe !== undefined) ? readMe['profile'] : undefined;

    if (profile !== undefined) {
      return Runner.buildProfileBadgeGroups(profile['badgeGroups'] ?? []);
    }

    const badgeIds: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_BadgeIds = (readMe !== undefined) ? (readMe['badges'] ?? []) : [];
    const urls: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Urls = config['urls'];
    const github: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Github = config['github'];
    const githubOwner: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_GithubOwner = (github !== undefined) ? (github['owner'] ?? '') : '';
    const githubRepoName: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_GithubRepoName = (github !== undefined) ? (github['repo'] ?? '') : '';
    const githubRepo: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_GithubRepo = (githubOwner !== '' && githubRepoName !== '') ? `${githubOwner}/${githubRepoName}` : '';
    const npmUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_NpmUrl = (urls !== undefined) ? (urls['npm'] ?? '') : '';
    const npmPackage: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_NpmPackage = npmUrl.replace(LIB_REGEX_URL_PREFIX_NPM_PACKAGE, '');
    const dockerUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_DockerUrl = (urls !== undefined) ? (urls['docker'] ?? '') : '';
    const dockerImage: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_DockerImage = dockerUrl.replace(LIB_REGEX_URL_PREFIX_DOCKER_HUB, '');
    const fundSources: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_FundSources = (urls !== undefined) ? (urls['fundSources'] ?? []) : [];
    const coverageEndpointUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_CoverageEndpointUrl = resolveCoverageBadgeEndpointUrl(config);

    return Runner.buildBadges(badgeIds, githubRepo, npmPackage, dockerImage, fundSources, coverageEndpointUrl);
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Credits Region Content.
   *
   * Derives the credits inputs from config and returns the inner content for the credits
   * region, or undefined when there is nothing to credit. Shared by generator and recipes.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Config} config - Config.
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Returns}
   *
   * @since 0.21.0
   */
  public static buildCreditsRegionContent(config: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Config): Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Returns {
    const readMe: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ReadMe = config['readme'];
    const profile: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Profile = (readMe !== undefined) ? readMe['profile'] : undefined;

    if (profile !== undefined) {
      const profileSupport: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProfileSupport = profile['support'];

      if (profileSupport === undefined) {
        return undefined;
      }

      const profileUrls: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProfileUrls = config['urls'];
      const profileFundSources: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProfileFundSources = (profileUrls !== undefined) ? (profileUrls['fundSources'] ?? []) : [];
      const profileSupportSection: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProfileSupportSection = Runner.buildProfileSupportSection(profileSupport, profileFundSources);

      return (profileSupportSection === '') ? undefined : profileSupportSection;
    }

    const project: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Project = config['project'];
    const projectPronouns: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProjectPronouns = (project !== undefined) ? (project['pronouns'] ?? 'business') : 'business';
    const urls: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Urls = config['urls'];
    const fundSources: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_FundSources = (urls !== undefined) ? (urls['fundSources'] ?? []) : [];

    const pronounUs: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_PronounUs = (projectPronouns === 'personal') ? 'me' : 'us';
    const pronounOur: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_PronounOur = (projectPronouns === 'personal') ? 'my' : 'our';

    const entities: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Entities = config['entities'] ?? [];
    const contributorsAndSupporters: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ContributorsAndSupporters = entities.filter((entity) => {
      const roles: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Roles = entity['roles'] ?? [];

      return roles.includes('contributor') || roles.includes('supporter');
    });

    const creditsSection: Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_CreditsSection = Runner.buildCreditsSection(fundSources, contributorsAndSupporters, pronounUs, pronounOur);

    if (creditsSection === '') {
      return undefined;
    }

    return creditsSection;
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Documentation Region Content.
   *
   * Derives the documentation URL from config and returns the inner content for the
   * documentation region, or undefined when no URL is set. Shared by generator and recipes.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Config} config - Config.
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Returns}
   *
   * @since 0.21.0
   */
  public static buildDocumentationRegionContent(config: Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Config): Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Returns {
    const readMe: Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_ReadMe = config['readme'];
    const profile: Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Profile = (readMe !== undefined) ? readMe['profile'] : undefined;

    if (profile !== undefined) {
      const profileLinkGroups: Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_ProfileLinkGroups = Runner.buildProfileLinkGroups(profile['linkGroups'] ?? []);

      return (profileLinkGroups === '') ? undefined : profileLinkGroups;
    }

    const urls: Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Urls = config['urls'];
    const documentationUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_DocumentationUrl = (urls !== undefined) ? (urls['documentation'] ?? '') : '';

    const documentationSection: Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_DocumentationSection = Runner.buildDocumentationSection(documentationUrl);

    if (documentationSection === '') {
      return undefined;
    }

    return documentationSection;
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Header Region Content.
   *
   * Derives the header inputs from config and returns the inner content for the header
   * region, or undefined when there is no project name. Shared by generator and recipes.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Config} config - Config.
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Returns}
   *
   * @since 0.21.0
   */
  public static buildHeaderRegionContent(config: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Config): Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Returns {
    const project: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Project = config['project'];
    const projectNameRecord: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ProjectNameRecord = (project !== undefined) ? project['name'] : undefined;
    const projectName: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ProjectName = (projectNameRecord !== undefined) ? (projectNameRecord['title'] ?? '') : '';
    const readMe: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ReadMe = config['readme'];
    const profile: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Profile = (readMe !== undefined) ? readMe['profile'] : undefined;

    if (profile !== undefined) {
      const profileHeading: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ProfileHeading = profile['heading'] ?? projectName;

      return (profileHeading === '') ? undefined : `# ${profileHeading}`;
    }

    if (projectName === '') {
      return undefined;
    }

    const urls: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Urls = config['urls'];
    const homepageUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_HomepageUrl = (urls !== undefined) ? (urls['homepage'] ?? '') : '';
    const logoUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_LogoUrl = (urls !== undefined) ? (urls['logo'] ?? '') : '';

    const headerLines: Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_HeaderLines = [];

    if (logoUrl !== '' && homepageUrl !== '') {
      headerLines.push(
        `  <a href="${homepageUrl}">`,
        '    <picture>',
        `      <img alt="${projectName}" src="${logoUrl}" height="128">`,
        '    </picture>',
        '  </a>',
        `  <h1>${projectName}</h1>`,
      );
    } else if (logoUrl !== '') {
      headerLines.push(
        '  <picture>',
        `    <img alt="${projectName}" src="${logoUrl}" height="128">`,
        '  </picture>',
        `  <h1>${projectName}</h1>`,
      );
    } else if (homepageUrl !== '') {
      headerLines.push(
        `  <a href="${homepageUrl}">`,
        `    <h1>${projectName}</h1>`,
        '  </a>',
      );
    } else {
      headerLines.push(`  <h1>${projectName}</h1>`);
    }

    return headerLines.join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Introduction Region Content.
   *
   * Derives the project description from config and returns the inner content for the
   * introduction region, or undefined when there is no description. Shared by the recipes.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Config} config - Config.
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Returns}
   *
   * @since 0.21.0
   */
  public static buildIntroductionRegionContent(config: Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Config): Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Returns {
    const readMe: Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ReadMe = config['readme'];
    const profile: Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Profile = (readMe !== undefined) ? readMe['profile'] : undefined;

    if (profile !== undefined) {
      const profileIntroduction: Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ProfileIntroduction = (profile['introduction'] ?? []).join('\n\n');

      return (profileIntroduction === '') ? undefined : profileIntroduction;
    }

    const project: Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Project = config['project'];
    const projectDescriptionRecord: Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ProjectDescriptionRecord = (project !== undefined) ? project['description'] : undefined;
    const projectDescription: Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ProjectDescription = (projectDescriptionRecord !== undefined) ? (projectDescriptionRecord['long'] ?? '') : '';

    const introductionSection: Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_IntroductionSection = Runner.buildIntroductionSection(projectDescription);

    if (introductionSection === '') {
      return undefined;
    }

    return introductionSection;
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Badges.
   *
   * Assembles shields.io badge HTML in the exact configured order. Each semantic badge
   * identifier resolves through one source-specific branch, while the funding identifier
   * expands to the configured funding sources at that position.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Badges}              badges              - Badges.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_GithubRepo}          githubRepo          - Github repo.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_NpmPackage}          npmPackage          - Npm package.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_DockerImage}         dockerImage         - Docker image.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_FundSources}         fundSources         - Fund sources.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_CoverageEndpointUrl} coverageEndpointUrl - Coverage endpoint url.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Returns}
   *
   * @since 0.15.0
   */
  private static buildBadges(badges: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Badges, githubRepo: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_GithubRepo, npmPackage: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_NpmPackage, dockerImage: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_DockerImage, fundSources: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_FundSources, coverageEndpointUrl: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_CoverageEndpointUrl): Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Returns {
    const lines: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Lines = [];

    for (const badge of badges) {
      const badgeId: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_BadgeId = badge;

      switch (badgeId) {
        case 'homebridge': {
          lines.push(
            '  <a href="https://homebridge.io">',
            '    <img alt="Homebridge" src="https://img.shields.io/badge/homebridge-plugin-491F59?style=for-the-badge&logo=homebridge&logoColor=%23ffffff">',
            '  </a>',
          );
          break;
        }

        case 'homebridge-verified': {
          lines.push(
            '  <a href="https://github.com/homebridge/homebridge/wiki/Verified-Plugins">',
            '    <img alt="Verified Homebridge Plugin" src="https://img.shields.io/badge/homebridge-verified-blueviolet?color=%23491F59&style=for-the-badge&logoColor=%23FFFFFF&logo=homebridge">',
            '  </a>',
          );
          break;
        }

        case 'npm-version': {
          lines.push(
            `  <a href="https://www.npmjs.com/package/${npmPackage}">`,
            `    <img alt="npm Package" src="https://img.shields.io/npm/v/${npmPackage}?style=for-the-badge&logo=npm&logoColor=%23ffffff&color=%23b25da6">`,
            '  </a>',
          );
          break;
        }

        case 'npm-downloads': {
          lines.push(
            `  <a href="https://www.npmjs.com/package/${npmPackage}">`,
            `    <img alt="npm Downloads" src="https://img.shields.io/npm/dt/${npmPackage}?style=for-the-badge&logo=npm&logoColor=%23ffffff&color=%236688c3">`,
            '  </a>',
          );
          break;
        }

        case 'docker-pulls': {
          lines.push(
            `  <a href="https://hub.docker.com/r/${dockerImage}">`,
            `    <img alt="Docker Pulls" src="https://img.shields.io/docker/pulls/${dockerImage}?style=for-the-badge&logo=docker&logoColor=%23ffffff&color=%23b25da6">`,
            '  </a>',
          );
          break;
        }

        case 'docker-image-size': {
          lines.push(
            `  <a href="https://hub.docker.com/r/${dockerImage}">`,
            `    <img alt="Docker Image Size" src="https://img.shields.io/docker/image-size/${dockerImage}?style=for-the-badge&logo=docker&logoColor=%23ffffff&color=%236688c3">`,
            '  </a>',
          );
          break;
        }

        case 'github-release': {
          lines.push(
            `  <a href="https://github.com/${githubRepo}/releases">`,
            `    <img alt="GitHub Releases" src="https://img.shields.io/github/v/release/${githubRepo}?style=for-the-badge&logo=github&logoColor=%23ffffff&color=%23b25da6">`,
            '  </a>',
          );
          break;
        }

        case 'github-top-language': {
          lines.push(
            `  <a href="https://github.com/${githubRepo}">`,
            `    <img alt="GitHub Top Languages" src="https://img.shields.io/github/languages/top/${githubRepo}?style=for-the-badge&logo=github&logoColor=%23ffffff&color=%236688c3">`,
            '  </a>',
          );
          break;
        }

        case 'github-license': {
          lines.push(
            `  <a href="https://github.com/${githubRepo}/blob/HEAD/LICENSE">`,
            `    <img alt="GitHub License" src="https://img.shields.io/github/license/${githubRepo}?style=for-the-badge&logo=googledocs&logoColor=%23ffffff&color=%2348a56a">`,
            '  </a>',
          );
          break;
        }

        case 'coverage': {
          // The badge reads the endpoint JSON the publish workflow writes, so it only
          // appears when coverage is on and that JSON has a URL.
          if (coverageEndpointUrl === undefined) {
            break;
          }

          const coverageHref: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_CoverageHref = (githubRepo !== '') ? `https://github.com/${githubRepo}/actions` : coverageEndpointUrl;

          lines.push(
            `  <a href="${coverageHref}">`,
            `    <img alt="Test Coverage" src="https://img.shields.io/endpoint?url=${encodeURIComponent(coverageEndpointUrl)}&style=for-the-badge&logo=vitest&logoColor=%23ffffff">`,
            '  </a>',
          );
          break;
        }

        case 'funding': {
          for (const source of fundSources) {
            const platform: Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platform = Runner.detectFundPlatform(source);

            lines.push(
              `  <a href="${source}">`,
              `    <img alt="${platform['alt']}" src="https://img.shields.io/badge/${platform['label']}-gray?style=for-the-badge&logo=${platform['logo']}&logoColor=%23ffffff&color=%23${platform['color']}">`,
              '  </a>',
            );
          }
          break;
        }

        default: {
          break;
        }
      }
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
   * CLI - Generate - Must Haves - Read Me - Build Profile Badge.
   *
   * Builds one linked shields.io badge with deterministic static-badge parameters
   * and the escaping required by static shields.io badge labels.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_Badge} badge - Badge.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_Returns}
   *
   * @since 0.50.0
   */
  private static buildProfileBadge(badge: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_Badge): Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_Returns {
    const escapedLabel: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_EscapedLabel = encodeURIComponent(badge['label'].replaceAll('-', '--').replaceAll('_', '__'));
    const logo: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadge_Logo = (LIB_REGEX_PATTERN_SVG_DATA_URI.test(badge['logo']) === true) ? encodeURIComponent(badge['logo']) : badge['logo'];

    return `[![${badge['label']}](https://img.shields.io/badge/${escapedLabel}-8a2be2?style=for-the-badge&logo=${logo}&logoColor=%23ffffff&color=%23${badge['color']})](${badge['link']})`;
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Profile Badge Groups.
   *
   * Renders ordered profile badge groups as titled Markdown sections while
   * retaining the configured group and badge sequences.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_BadgeGroups} badgeGroups - Badge groups.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_Returns}
   *
   * @since 0.50.0
   */
  private static buildProfileBadgeGroups(badgeGroups: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_BadgeGroups): Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_Returns {
    const sections: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_Sections = [];

    for (const badgeGroup of badgeGroups) {
      if (badgeGroup['badges'].length === 0) {
        continue;
      }

      const heading: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_Heading = (badgeGroup['emoji'] === undefined) ? `## ${badgeGroup['title']}` : `## ${badgeGroup['title']} ${badgeGroup['emoji']}`;
      const lines: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileBadgeGroups_Lines = [
        heading,
        '',
      ];

      for (const badge of badgeGroup['badges']) {
        lines.push(Runner.buildProfileBadge(badge));
      }

      sections.push(lines.join('\n'));
    }

    return sections.join('\n\n');
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Profile Link Groups.
   *
   * Renders ordered profile link groups as titled sections. A group becomes a padded
   * table when every link has a description, otherwise a bullet list.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_LinkGroups} linkGroups - Link groups.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Returns}
   *
   * @since 0.50.0
   */
  private static buildProfileLinkGroups(linkGroups: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_LinkGroups): Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Returns {
    const sections: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Sections = [];

    for (const linkGroup of linkGroups) {
      if (linkGroup['links'].length === 0) {
        continue;
      }

      const heading: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Heading = (linkGroup['emoji'] === undefined) ? `## ${linkGroup['title']}` : `## ${linkGroup['title']} ${linkGroup['emoji']}`;
      const lines: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Lines = [
        heading,
        '',
      ];
      const isTable: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_IsTable = linkGroup['links'].every((link) => link['description'] !== undefined);

      if (isTable === true) {
        const columns: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Columns = linkGroup['columns'] ?? [
          'Link',
          'Description',
        ];
        const table: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileLinkGroups_Table = new MarkdownTable([...columns]);

        for (const link of linkGroup['links']) {
          table.addRow([
            `[${link['label']}](${link['url']})`,
            link['description'] ?? '',
          ]);
        }

        lines.push(table.render());
      } else {
        for (const link of linkGroup['links']) {
          lines.push(`- [${link['label']}](${link['url']})`);
        }
      }

      sections.push(lines.join('\n'));
    }

    return sections.join('\n\n');
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Build Profile Support Section.
   *
   * Renders the profile support heading, message, and badges. Configured badges are used
   * as written; otherwise sponsor and donation badges are derived from funding URLs.
   *
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Support}     support     - Support.
   * @param {Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_FundSources} fundSources - Fund sources.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Returns}
   *
   * @since 0.50.0
   */
  private static buildProfileSupportSection(support: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Support, fundSources: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_FundSources): Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Returns {
    const supportBadges: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_SupportBadges = support['badges'] ?? [];

    if (supportBadges.length === 0 && fundSources.length === 0) {
      return '';
    }

    const title: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Title = support['title'] ?? 'Support My Work';
    const emoji: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Emoji = support['emoji'] ?? '🎗️';
    const message: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Message = (support['message'] !== undefined) ? support['message'].join('\n\n') : 'If you appreciate my work and find value in my open-source projects, you can support it through one of these options.';
    const lines: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Lines = [
      `## ${title} ${emoji}`,
      '',
      message,
      '',
    ];

    if (supportBadges.length > 0) {
      for (const supportBadge of supportBadges) {
        lines.push(Runner.buildProfileBadge(supportBadge));
      }

      return lines.join('\n');
    }

    for (const source of fundSources) {
      const platform: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Platform = Runner.detectFundPlatform(source);
      let label: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Label = 'Support';

      switch (platform['id']) {
        case 'github-sponsors': {
          label = 'Sponsor';
          break;
        }

        case 'paypal': {
          label = 'Donate';
          break;
        }

        case 'open-collective': {
          label = 'Open Collective';
          break;
        }

        case 'ko-fi': {
          label = 'Ko-fi';
          break;
        }

        case 'buy-me-a-coffee': {
          label = 'Buy Me a Coffee';
          break;
        }

        case 'patreon': {
          label = 'Patreon';
          break;
        }

        case 'liberapay': {
          label = 'Liberapay';
          break;
        }

        default: {
          break;
        }
      }

      const badge: Cli_Generate_MustHaves_ReadMe_Runner_BuildProfileSupportSection_Badge = {
        label,
        logo: platform['logo'],
        color: platform['color'],
        link: source,
      };

      lines.push(Runner.buildProfileBadge(badge));
    }

    return lines.join('\n');
  }

  /**
   * CLI - Generate - Must Haves - Read Me - Detect Fund Platform.
   *
   * Matches a funding URL against known platform URLs and returns badge metadata. Used by
   * buildBadges, buildCreditsSection, and profile support badges.
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

    if (
      LIB_REGEX_URL_PREFIX_PAYPAL.test(url) === true
      || url.toLowerCase().includes('/paypal') === true
    ) {
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
