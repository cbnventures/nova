/**
 * Tests - CLI - Generate - GitHub - Workflows - Run.
 *
 * @since 0.15.0
 */
export type TestsCliGenerateGithubWorkflowsRunOriginalCwd = string;

export type TestsCliGenerateGithubWorkflowsRunTemporaryDirectory = string;

export type TestsCliGenerateGithubWorkflowsRunTemporaryPrefix = string;

export type TestsCliGenerateGithubWorkflowsRunSandboxRoot = string;

export type TestsCliGenerateGithubWorkflowsRunProjectDirectory = string;

export type TestsCliGenerateGithubWorkflowsRunPackageJson = Record<string, unknown>;

export type TestsCliGenerateGithubWorkflowsRunPackageJsonPath = string;

export type TestsCliGenerateGithubWorkflowsRunGitignorePath = string;

export type TestsCliGenerateGithubWorkflowsRunNovaConfig = Record<string, unknown>;

export type TestsCliGenerateGithubWorkflowsRunNovaConfigPath = string;

export type TestsCliGenerateGithubWorkflowsRunExists = boolean;

export type TestsCliGenerateGithubWorkflowsRunWorkflowsDirectory = string;

export type TestsCliGenerateGithubWorkflowsRunWorkflowPath = string;

export type TestsCliGenerateGithubWorkflowsRunContent = string;

export type TestsCliGenerateGithubWorkflowsRunEntries = string[];

export type TestsCliGenerateGithubWorkflowsRunOrphanFiles = string[];

export type TestsCliGenerateGithubWorkflowsRunBackupFiles = string[];

export type TestsCliGenerateGithubWorkflowsRunContentLines = string[];

export type TestsCliGenerateGithubWorkflowsRunCoreJobIndex = number;

export type TestsCliGenerateGithubWorkflowsRunCoreNeedsLine = string;

export type TestsCliGenerateGithubWorkflowsRunPresetJobIndex = number;

export type TestsCliGenerateGithubWorkflowsRunPresetNeedsLine = string;

export type TestsCliGenerateGithubWorkflowsRunPathOccurrences = number;

export type TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesEntry = import('../../../../cli/generate/github/workflows.d.ts').CliGenerateGithubWorkflowsRunWorkflowEntry;

export type TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesPublishMetadata = import('../../../../cli/generate/github/workflows.d.ts').CliGenerateGithubWorkflowsRunMetadataEntry;

export type TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesSetupLines = string[];

export type TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesStripAnsiPattern = RegExp;

export type TestsCliGenerateGithubWorkflowsBuildEntrySetupLinesJoined = string;

export type TestsCliGenerateGithubWorkflowsRunIsProjectRootSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliGenerateGithubWorkflowsRunLoadSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliGenerateGithubWorkflowsRunSaveSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliGenerateGithubWorkflowsRunSaveCalls = [string, string, boolean, import('../../../../lib/utility.d.ts').LibUtilitySaveGeneratedFileHeader | undefined][];

export type TestsCliGenerateGithubWorkflowsRunTargetCall = [string, string, boolean, import('../../../../lib/utility.d.ts').LibUtilitySaveGeneratedFileHeader | undefined] | undefined;

export type TestsCliGenerateGithubWorkflowsRunHeaderArg = import('../../../../lib/utility.d.ts').LibUtilitySaveGeneratedFileHeader | undefined;
