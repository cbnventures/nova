import type { PromptObject } from 'prompts';

import type { SharedGeneratorRunResult, SharedMonorepoContext, SharedScaffoldConfig } from '../shared.d.ts';

/**
 * Lib - Scaffold - Collect Files.
 *
 * @since 0.15.0
 */
export type LibScaffoldCollectFilesDirectory = string;

export type LibScaffoldCollectFilesPrefix = string;

export type LibScaffoldCollectFilesReturns = Promise<string[]>;

export type LibScaffoldCollectFilesEntries = import('fs').Dirent[];

export type LibScaffoldCollectFilesFiles = string[];

export type LibScaffoldCollectFilesEntryPath = string;

export type LibScaffoldCollectFilesNestedDirectory = string;

export type LibScaffoldCollectFilesNested = string[];

/**
 * Lib - Scaffold - Create Monorepo Root.
 *
 * @since 0.15.0
 */
export type LibScaffoldCreateMonorepoRootOutputDirectory = string;

export type LibScaffoldCreateMonorepoRootProjectSlug = string;

export type LibScaffoldCreateMonorepoRootReturns = Promise<void>;

export type LibScaffoldCreateMonorepoRootCurrentDirectory = string;

export type LibScaffoldCreateMonorepoRootAppsDirectory = string;

export type LibScaffoldCreateMonorepoRootPackagesDirectory = string;

export type LibScaffoldCreateMonorepoRootPackageJsonContent = Record<string, unknown>;

export type LibScaffoldCreateMonorepoRootPackageJson = string;

export type LibScaffoldCreateMonorepoRootPackageJsonContents = string;

export type LibScaffoldCreateMonorepoRootPackageJsonPath = string;

export type LibScaffoldCreateMonorepoRootPackageJsonRelativePath = string;

export type LibScaffoldCreateMonorepoRootProjectTitle = string;

export type LibScaffoldCreateMonorepoRootNovaConfigContent = Record<string, unknown>;

export type LibScaffoldCreateMonorepoRootNovaConfig = string;

export type LibScaffoldCreateMonorepoRootNovaConfigContents = string;

export type LibScaffoldCreateMonorepoRootNovaConfigPath = string;

export type LibScaffoldCreateMonorepoRootNovaConfigRelativePath = string;

/**
 * Lib - Scaffold - Create Workspace Directory.
 *
 * @since 0.15.0
 */
export type LibScaffoldCreateWorkspaceDirectoryBasePath = string;

export type LibScaffoldCreateWorkspaceDirectoryWorkspaceName = string;

export type LibScaffoldCreateWorkspaceDirectoryReturns = Promise<string>;

export type LibScaffoldCreateWorkspaceDirectoryWorkspaceDirectory = string;

/**
 * Lib - Scaffold - Detect Monorepo Context.
 *
 * @since 0.15.0
 */
export type LibScaffoldDetectMonorepoContextCurrentWorkingDirectory = string;

export type LibScaffoldDetectMonorepoContextReturns = Promise<SharedMonorepoContext>;

export type LibScaffoldDetectMonorepoContextLocations = string[];

export type LibScaffoldDetectMonorepoContextPackageJsonPath = string;

export type LibScaffoldDetectMonorepoContextPackageJsonRaw = string;

export type LibScaffoldDetectMonorepoContextParsedPackageJson = Record<string, unknown>;

/**
 * Lib - Scaffold - Load Generator.
 *
 * @since 0.15.0
 */
export type LibScaffoldLoadGeneratorName = string;

export type LibScaffoldLoadGeneratorReturns = Promise<((options: {
  replaceFile: true;
}) => Promise<SharedGeneratorRunResult>) | undefined>;

export type LibScaffoldLoadGeneratorEditorconfigModule = typeof import('../../cli/generate/must-haves/editorconfig.js');

export type LibScaffoldLoadGeneratorGitignoreModule = typeof import('../../cli/generate/must-haves/gitignore.js');

export type LibScaffoldLoadGeneratorDotenvModule = typeof import('../../cli/generate/must-haves/dotenv.js');

export type LibScaffoldLoadGeneratorLicenseModule = typeof import('../../cli/generate/must-haves/license.js');

export type LibScaffoldLoadGeneratorReadMeModule = typeof import('../../cli/generate/must-haves/read-me.js');

export type LibScaffoldLoadGeneratorAgentConventionsModule = typeof import('../../cli/generate/must-haves/agent-conventions.js');

export type LibScaffoldLoadGeneratorFundingModule = typeof import('../../cli/generate/github/funding.js');

export type LibScaffoldLoadGeneratorIssueTemplateModule = typeof import('../../cli/generate/github/issue-template.js');

export type LibScaffoldLoadGeneratorWorkflowsModule = typeof import('../../cli/generate/github/workflows.js');

/**
 * Lib - Scaffold - Prompt Post Scaffold Generators.
 *
 * @since 0.15.0
 */
export type LibScaffoldPromptPostScaffoldGeneratorsOutputDirectory = string;

export type LibScaffoldPromptPostScaffoldGeneratorsReturns = Promise<void>;

export type LibScaffoldPromptPostScaffoldGeneratorsCancelled = boolean;

export type LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoiceTitle = string;

export type LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoiceDescription = string;

export type LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoiceValue = string;

export type LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoice = {
  title: LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoiceTitle;
  description: LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoiceDescription;
  value: LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoiceValue;
};

export type LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoices = LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoice[];

export type LibScaffoldPromptPostScaffoldGeneratorsAnswers = Record<string, unknown>;

export type LibScaffoldPromptPostScaffoldGeneratorsSelected = string[];

export type LibScaffoldPromptPostScaffoldGeneratorsOriginalCwd = string;

export type LibScaffoldPromptPostScaffoldGeneratorsGeneratorModule = ((options: {
  replaceFile: true;
}) => Promise<SharedGeneratorRunResult>) | undefined;

export type LibScaffoldPromptPostScaffoldGeneratorsGeneratorResult = SharedGeneratorRunResult;

/**
 * Lib - Scaffold - Prompt Scaffold Options.
 *
 * @since 0.15.0
 */
export type LibScaffoldPromptScaffoldOptionsContext = SharedMonorepoContext;

export type LibScaffoldPromptScaffoldOptionsDefaultsName = string | undefined;

export type LibScaffoldPromptScaffoldOptionsDefaultsOutput = string | undefined;

export type LibScaffoldPromptScaffoldOptionsDefaultsTypeName = string;

export type LibScaffoldPromptScaffoldOptionsDefaultsWorkspaceName = string | undefined;

export type LibScaffoldPromptScaffoldOptionsDefaults = {
  name: LibScaffoldPromptScaffoldOptionsDefaultsName;
  output: LibScaffoldPromptScaffoldOptionsDefaultsOutput;
  typeName: LibScaffoldPromptScaffoldOptionsDefaultsTypeName;
  workspaceName: LibScaffoldPromptScaffoldOptionsDefaultsWorkspaceName;
};

export type LibScaffoldPromptScaffoldOptionsReturns = Promise<SharedScaffoldConfig | undefined>;

export type LibScaffoldPromptScaffoldOptionsCurrentDirectory = string;

export type LibScaffoldPromptScaffoldOptionsCancelled = boolean;

export type LibScaffoldPromptScaffoldOptionsNameValue = string | undefined;

export type LibScaffoldPromptScaffoldOptionsOutputValue = string | undefined;

export type LibScaffoldPromptScaffoldOptionsWorkspaceNameValue = string | undefined;

export type LibScaffoldPromptScaffoldOptionsQuestions = PromptObject<string>[];

export type LibScaffoldPromptScaffoldOptionsPromptsAnswers = Record<string, unknown>;

export type LibScaffoldPromptScaffoldOptionsResolvedName = string;

export type LibScaffoldPromptScaffoldOptionsResolvedWorkspaceName = string;

export type LibScaffoldPromptScaffoldOptionsResolvedOutputDirectory = string;

export type LibScaffoldPromptScaffoldOptionsDirectoryChoicesTitle = string;

export type LibScaffoldPromptScaffoldOptionsDirectoryChoicesValue = string;

export type LibScaffoldPromptScaffoldOptionsDirectoryChoices = {
  title: LibScaffoldPromptScaffoldOptionsDirectoryChoicesTitle;
  value: LibScaffoldPromptScaffoldOptionsDirectoryChoicesValue;
}[];

export type LibScaffoldPromptScaffoldOptionsDirectoryAnswers = Record<string, unknown>;

export type LibScaffoldPromptScaffoldOptionsDirectoryChoice = string;

export type LibScaffoldPromptScaffoldOptionsOutputAnswers = Record<string, unknown>;

export type LibScaffoldPromptScaffoldOptionsResolvedOutput = string;

export type LibScaffoldPromptScaffoldOptionsInitialPrev = string;

export type LibScaffoldPromptScaffoldOptionsInitialAnswers = Record<string, string>;

export type LibScaffoldPromptScaffoldOptionsResolvedInitialWorkspaceName = string;

/**
 * Lib - Scaffold - Register Workspace In Config.
 *
 * @since 0.15.0
 */
export type LibScaffoldRegisterWorkspaceInConfigConfigFilePath = string;

export type LibScaffoldRegisterWorkspaceInConfigWorkspaceRelPath = string;

export type LibScaffoldRegisterWorkspaceInConfigWorkspaceName = string;

export type LibScaffoldRegisterWorkspaceInConfigCategory = string;

export type LibScaffoldRegisterWorkspaceInConfigReturns = Promise<void>;

export type LibScaffoldRegisterWorkspaceInConfigParsedConfig = Record<string, unknown> | undefined;

export type LibScaffoldRegisterWorkspaceInConfigRaw = string;

export type LibScaffoldRegisterWorkspaceInConfigProject = Record<string, unknown> | undefined;

export type LibScaffoldRegisterWorkspaceInConfigProjectName = Record<string, unknown> | undefined;

export type LibScaffoldRegisterWorkspaceInConfigProjectSlug = string | undefined;

export type LibScaffoldRegisterWorkspaceInConfigRole = string;

export type LibScaffoldRegisterWorkspaceInConfigConfigName = string;

export type LibScaffoldRegisterWorkspaceInConfigWorkspaces = Record<string, unknown>;

export type LibScaffoldRegisterWorkspaceInConfigParsedWorkspaces = LibScaffoldRegisterWorkspaceInConfigWorkspaces | undefined;

export type LibScaffoldRegisterWorkspaceInConfigJson = string;

export type LibScaffoldRegisterWorkspaceInConfigJsonContents = string;

/**
 * Lib - Scaffold - Run Scaffold.
 *
 * @since 0.15.0
 */
export type LibScaffoldRunScaffoldOptionsDryRun = true;

export type LibScaffoldRunScaffoldOptionsName = string;

export type LibScaffoldRunScaffoldOptionsOutput = string;

export type LibScaffoldRunScaffoldOptionsWorkspaceName = string;

export type LibScaffoldRunScaffoldOptions = {
  dryRun?: LibScaffoldRunScaffoldOptionsDryRun;
  name?: LibScaffoldRunScaffoldOptionsName;
  output?: LibScaffoldRunScaffoldOptionsOutput;
  workspaceName?: LibScaffoldRunScaffoldOptionsWorkspaceName;
};

export type LibScaffoldRunScaffoldCategory = string;

export type LibScaffoldRunScaffoldTypeName = string;

export type LibScaffoldRunScaffoldTemplateSubpath = string;

export type LibScaffoldRunScaffoldImportMetaUrl = string;

export type LibScaffoldRunScaffoldReturns = Promise<void>;

export type LibScaffoldRunScaffoldCurrentDirectory = string;

export type LibScaffoldRunScaffoldIsDryRun = boolean;

export type LibScaffoldRunScaffoldContext = SharedMonorepoContext;

export type LibScaffoldRunScaffoldConfig = SharedScaffoldConfig | undefined;

export type LibScaffoldRunScaffoldModePrefix = string;

export type LibScaffoldRunScaffoldWorkspaceDirectory = string;

export type LibScaffoldRunScaffoldTemplateDirectory = string;

export type LibScaffoldRunScaffoldReplacements = Map<RegExp, string>;

export type LibScaffoldRunScaffoldConfigRoot = string;

export type LibScaffoldRunScaffoldConfigFilePath = string;

export type LibScaffoldRunScaffoldWorkspaceRelPath = string;

/**
 * Lib - Scaffold - Write Template Files.
 *
 * @since 0.15.0
 */
export type LibScaffoldWriteTemplateFilesTemplateDirectory = string;

export type LibScaffoldWriteTemplateFilesTargetDirectory = string;

export type LibScaffoldWriteTemplateFilesReplacements = Map<RegExp, string>;

export type LibScaffoldWriteTemplateFilesReturns = Promise<void>;

export type LibScaffoldWriteTemplateFilesCurrentDirectory = string;

export type LibScaffoldWriteTemplateFilesEntries = string[];

export type LibScaffoldWriteTemplateFilesSourcePath = string;

export type LibScaffoldWriteTemplateFilesTargetPath = string;

export type LibScaffoldWriteTemplateFilesContent = string;

export type LibScaffoldWriteTemplateFilesPattern = RegExp;

export type LibScaffoldWriteTemplateFilesValue = string;

export type LibScaffoldWriteTemplateFilesRelativePath = string;
