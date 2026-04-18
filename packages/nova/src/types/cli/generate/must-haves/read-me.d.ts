import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  SharedFundPlatform,
  SharedNovaConfigConfig,
  SharedNovaConfigEntities,
  SharedNovaConfigEntity,
  SharedNovaConfigEntityRoles,
  SharedNovaConfigProject,
  SharedNovaConfigProjectDescription,
  SharedNovaConfigProjectName,
  SharedNovaConfigProjectPlatforms,
  SharedNovaConfigProjectPronouns,
  SharedNovaConfigUrls,
  SharedNovaConfigWorkspaces,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Read Me - Build Badges.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesReadMeBuildBadgesGithubRepo = string;

export type CliGenerateMustHavesReadMeBuildBadgesNpmPackage = string;

export type CliGenerateMustHavesReadMeBuildBadgesDockerImage = string;

export type CliGenerateMustHavesReadMeBuildBadgesPlatforms = string[];

export type CliGenerateMustHavesReadMeBuildBadgesFundSources = string[];

export type CliGenerateMustHavesReadMeBuildBadgesReturns = string;

export type CliGenerateMustHavesReadMeBuildBadgesLines = string[];

export type CliGenerateMustHavesReadMeBuildBadgesHasNodejs = boolean;

export type CliGenerateMustHavesReadMeBuildBadgesPlatform = SharedFundPlatform;

/**
 * CLI - Generate - Must Haves - Read Me - Build Credits Section.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesReadMeBuildCreditsSectionFundSources = string[];

export type CliGenerateMustHavesReadMeBuildCreditsSectionContributorsAndSupporters = SharedNovaConfigEntity[];

export type CliGenerateMustHavesReadMeBuildCreditsSectionPronounUs = string;

export type CliGenerateMustHavesReadMeBuildCreditsSectionPronounOur = string;

export type CliGenerateMustHavesReadMeBuildCreditsSectionReturns = string;

export type CliGenerateMustHavesReadMeBuildCreditsSectionSections = string[];

export type CliGenerateMustHavesReadMeBuildCreditsSectionFundLines = string[];

export type CliGenerateMustHavesReadMeBuildCreditsSectionPlatform = SharedFundPlatform;

export type CliGenerateMustHavesReadMeBuildCreditsSectionEntityLines = string[];

export type CliGenerateMustHavesReadMeBuildCreditsSectionEntityName = string;

export type CliGenerateMustHavesReadMeBuildCreditsSectionEntityUrl = string;

/**
 * CLI - Generate - Must Haves - Read Me - Detect Fund Platform.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesReadMeDetectFundPlatformUrl = string;

export type CliGenerateMustHavesReadMeDetectFundPlatformReturns = SharedFundPlatform;

/**
 * CLI - Generate - Must Haves - Read Me - Run.
 *
 * @since 0.15.0
 */
export type CliGenerateMustHavesReadMeRunOptionsDryRun = true;

export type CliGenerateMustHavesReadMeRunOptionsReplaceFile = true;

export type CliGenerateMustHavesReadMeRunOptions = {
  dryRun?: CliGenerateMustHavesReadMeRunOptionsDryRun;
  replaceFile?: CliGenerateMustHavesReadMeRunOptionsReplaceFile;
};

export type CliGenerateMustHavesReadMeRunReturns = Promise<void>;

export type CliGenerateMustHavesReadMeRunCurrentDirectory = string;

export type CliGenerateMustHavesReadMeRunIsAtProjectRoot = boolean;

export type CliGenerateMustHavesReadMeRunIsDryRun = boolean;

export type CliGenerateMustHavesReadMeRunIsReplaceFile = boolean;

export type CliGenerateMustHavesReadMeRunReplaceFileNotice = string;

export type CliGenerateMustHavesReadMeRunNovaConfig = LibNovaConfig;

export type CliGenerateMustHavesReadMeRunWorkingFile = SharedNovaConfigConfig;

export type CliGenerateMustHavesReadMeRunProject = SharedNovaConfigProject | undefined;

export type CliGenerateMustHavesReadMeRunProjectNameRecord = SharedNovaConfigProjectName | undefined;

export type CliGenerateMustHavesReadMeRunProjectName = string;

export type CliGenerateMustHavesReadMeRunProjectDescriptionRecord = SharedNovaConfigProjectDescription | undefined;

export type CliGenerateMustHavesReadMeRunProjectDescription = string;

export type CliGenerateMustHavesReadMeRunProjectPronouns = SharedNovaConfigProjectPronouns;

export type CliGenerateMustHavesReadMeRunProjectPlatforms = SharedNovaConfigProjectPlatforms;

export type CliGenerateMustHavesReadMeRunUrls = SharedNovaConfigUrls | undefined;

export type CliGenerateMustHavesReadMeRunHomepageUrl = string;

export type CliGenerateMustHavesReadMeRunLogoUrl = string;

export type CliGenerateMustHavesReadMeRunDocumentationUrl = string;

export type CliGenerateMustHavesReadMeRunGithubUrl = string;

export type CliGenerateMustHavesReadMeRunGithubRepo = string;

export type CliGenerateMustHavesReadMeRunNpmUrl = string;

export type CliGenerateMustHavesReadMeRunNpmPackage = string;

export type CliGenerateMustHavesReadMeRunDockerUrl = string;

export type CliGenerateMustHavesReadMeRunDockerImage = string;

export type CliGenerateMustHavesReadMeRunFundSources = string[];

export type CliGenerateMustHavesReadMeRunPronounUs = string;

export type CliGenerateMustHavesReadMeRunPronounOur = string;

export type CliGenerateMustHavesReadMeRunEntities = SharedNovaConfigEntities;

export type CliGenerateMustHavesReadMeRunContributorsAndSupporters = SharedNovaConfigEntity[];

export type CliGenerateMustHavesReadMeRunRoles = SharedNovaConfigEntityRoles;

export type CliGenerateMustHavesReadMeRunBadges = string;

export type CliGenerateMustHavesReadMeRunCreditsSection = string;

export type CliGenerateMustHavesReadMeRunTemplateDirectory = string;

export type CliGenerateMustHavesReadMeRunTemplatePath = string;

export type CliGenerateMustHavesReadMeRunTemplate = string;

export type CliGenerateMustHavesReadMeRunContent = string;

export type CliGenerateMustHavesReadMeRunTargetPath = string;

export type CliGenerateMustHavesReadMeRunWorkspaces = SharedNovaConfigWorkspaces;

export type CliGenerateMustHavesReadMeRunDistributablePaths = string[];

export type CliGenerateMustHavesReadMeRunWorkspacePath = string;

export type CliGenerateMustHavesReadMeRunWorkspace = SharedNovaConfigWorkspaces[string];

export type CliGenerateMustHavesReadMeRunDistributableReadmePath = string;
