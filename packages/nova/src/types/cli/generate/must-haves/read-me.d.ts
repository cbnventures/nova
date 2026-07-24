import type {
  Shared_FundPlatform,
  Shared_GeneratorRunResult,
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Project,
  Shared_NovaConfig_Project_Description,
  Shared_NovaConfig_Project_Name,
  Shared_NovaConfig_Project_Platforms,
  Shared_NovaConfig_Project_Pronouns,
  Shared_NovaConfig_Urls,
  Shared_NovaConfigConfig,
  Shared_NovaConfigEntity,
  Shared_NovaConfigEntity_Roles,
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

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadges_Platform = Shared_FundPlatform;

/**
 * CLI - Generate - Must Haves - Read Me - Build Badges Region Content.
 *
 * @since 0.21.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Config = Shared_NovaConfigConfig;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Returns = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Project = Shared_NovaConfig_Project | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_ProjectPlatforms = Shared_NovaConfig_Project_Platforms;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Urls = Shared_NovaConfig_Urls | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Github = Shared_NovaConfig_Github | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_GithubOwner = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_GithubRepoName = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_GithubRepo = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_NpmUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_NpmPackage = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_DockerUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_DockerImage = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_FundSources = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildBadgesRegionContent_Badges = string;

/**
 * CLI - Generate - Must Haves - Read Me - Build Credits Region Content.
 *
 * @since 0.21.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Config = Shared_NovaConfigConfig;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Returns = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Project = Shared_NovaConfig_Project | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ProjectPronouns = Shared_NovaConfig_Project_Pronouns;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Urls = Shared_NovaConfig_Urls | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_FundSources = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_PronounUs = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_PronounOur = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Entities = Shared_NovaConfig_Entities;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_ContributorsAndSupporters = Shared_NovaConfigEntity[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_Roles = Shared_NovaConfigEntity_Roles;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsRegionContent_CreditsSection = string;

/**
 * CLI - Generate - Must Haves - Read Me - Build Credits Section.
 *
 * @since 0.15.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_FundSources = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_ContributorsAndSupporters = Shared_NovaConfigEntity[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounUs = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_PronounOur = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Returns = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Sections = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_FundLines = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_Platform = Shared_FundPlatform;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityLines = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityName = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildCreditsSection_EntityUrl = string;

/**
 * CLI - Generate - Must Haves - Read Me - Build Documentation Region Content.
 *
 * @since 0.21.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Config = Shared_NovaConfigConfig;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Returns = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_Urls = Shared_NovaConfig_Urls | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_DocumentationUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationRegionContent_DocumentationSection = string;

/**
 * CLI - Generate - Must Haves - Read Me - Build Documentation Section.
 *
 * @since 0.16.2
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_DocumentationUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildDocumentationSection_Returns = string;

/**
 * CLI - Generate - Must Haves - Read Me - Build Header Region Content.
 *
 * @since 0.21.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Config = Shared_NovaConfigConfig;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Returns = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Project = Shared_NovaConfig_Project | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ProjectNameRecord = Shared_NovaConfig_Project_Name | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_ProjectName = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_Urls = Shared_NovaConfig_Urls | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_HomepageUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_LogoUrl = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildHeaderRegionContent_HeaderLines = string[];

/**
 * CLI - Generate - Must Haves - Read Me - Build Introduction Region Content.
 *
 * @since 0.21.0
 */
export type Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Config = Shared_NovaConfigConfig;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Returns = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_Project = Shared_NovaConfig_Project | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ProjectDescriptionRecord = Shared_NovaConfig_Project_Description | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_ProjectDescription = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_BuildIntroductionRegionContent_IntroductionSection = string;

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

export type Cli_Generate_MustHaves_ReadMe_Runner_DetectFundPlatform_Returns = Shared_FundPlatform;

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

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Returns = Promise<Shared_GeneratorRunResult>;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderContent = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_BadgesContent = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_IntroductionContent = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_DocumentationContent = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_CreditsContent = string | undefined;

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_Sections = string[];

export type Cli_Generate_MustHaves_ReadMe_Runner_Run_HeaderLines = string[];

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
