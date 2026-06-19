import type { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  Shared_FundPlatform as SharedFundPlatform,
  Shared_GeneratorRunResult as SharedGeneratorRunResult,
  Shared_NovaConfig_Entities as SharedNovaConfigEntities,
  Shared_NovaConfig_Github as SharedNovaConfigGithub,
  Shared_NovaConfig_Project as SharedNovaConfigProject,
  Shared_NovaConfig_Project_Description as SharedNovaConfigProjectDescription,
  Shared_NovaConfig_Project_Name as SharedNovaConfigProjectName,
  Shared_NovaConfig_Project_Platforms as SharedNovaConfigProjectPlatforms,
  Shared_NovaConfig_Project_Pronouns as SharedNovaConfigProjectPronouns,
  Shared_NovaConfig_Urls as SharedNovaConfigUrls,
  Shared_NovaConfigConfig as SharedNovaConfigConfig,
  Shared_NovaConfigEntity as SharedNovaConfigEntity,
  Shared_NovaConfigEntity_Roles as SharedNovaConfigEntityRoles,
} from '../../../shared.d.ts';

/**
 * CLI - Generate - Must Haves - Read Me - Build Badges.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_GithubRepo = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_NpmPackage = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_DockerImage = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platforms = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_FundSources = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Returns = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Lines = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_HasNodejs = boolean;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platform = SharedFundPlatform;

/**
 * CLI - Generate - Must Haves - Read Me - Build Credits Section.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_FundSources = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_ContributorsAndSupporters = SharedNovaConfigEntity[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounUs = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounOur = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Returns = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Sections = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_FundLines = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Platform = SharedFundPlatform;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityLines = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityName = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityUrl = string;

/**
 * CLI - Generate - Must Haves - Read Me - Build Documentation Section.
 *
 * @since 0.16.2
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_DocumentationUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_Returns = string;

/**
 * CLI - Generate - Must Haves - Read Me - Build Header Section.
 *
 * @since 0.16.2
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_ProjectName = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_HomepageUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_LogoUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Badges = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Returns = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderSection_Lines = string[];

/**
 * CLI - Generate - Must Haves - Read Me - Build Introduction Section.
 *
 * @since 0.16.2
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_ProjectDescription = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionSection_Returns = string;

/**
 * CLI - Generate - Must Haves - Read Me - Detect Fund Platform.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Url = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Returns = SharedFundPlatform;

/**
 * CLI - Generate - Must Haves - Read Me - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Options_DryRun = true;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Options = {
  dryRun?: Cli_Generate_MustHaves_ReadMe_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_MustHaves_ReadMe_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_NovaConfig = LibNovaConfig;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_WorkingFile = SharedNovaConfigConfig;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Project = SharedNovaConfigProject | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectNameRecord = SharedNovaConfigProjectName | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectName = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectDescriptionRecord = SharedNovaConfigProjectDescription | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectDescription = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectPronouns = SharedNovaConfigProjectPronouns;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ProjectPlatforms = SharedNovaConfigProjectPlatforms;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Urls = SharedNovaConfigUrls | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Github = SharedNovaConfigGithub | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_HomepageUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_LogoUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_DocumentationUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubOwner = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubRepoName = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubRepo = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_GithubUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_NpmUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_NpmPackage = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_DockerUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_DockerImage = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_FundSources = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_PronounUs = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_PronounOur = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Entities = SharedNovaConfigEntities;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ContributorsAndSupporters = SharedNovaConfigEntity[];

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Roles = SharedNovaConfigEntityRoles;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Badges = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderSection = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_IntroductionSection = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_DocumentationSection = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_CreditsSection = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Sections = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Content = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_TargetPath = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ConsumerWorkspacePaths = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderOptions_Command = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderOptions_DocsSlug = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderOptions_Mode = 'strict' | 'fillable';

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderOptions = {
  command: Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderOptions_Command;
  docsSlug: Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderOptions_DocsSlug;
  mode: Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderOptions_Mode;
};
