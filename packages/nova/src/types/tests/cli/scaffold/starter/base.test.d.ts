import type { vi } from 'vitest';

/**
 * Tests - CLI - Scaffold - Starter - Base - Run.
 *
 * @since 0.15.0
 */
export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_OriginalCwd = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_TemporaryDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_TemporaryBase = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_SandboxRoot = string;

/**
 * Tests - CLI - Scaffold - Starter - Base - Run - Confirms Plan Before Execution.
 *
 * @since 0.31.0
 */
export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ProjectDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedCall = unknown[] | undefined;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedPrompt_Name = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedPrompt = {
  name?: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedPrompt_Name;
};

/**
 * Tests - CLI - Scaffold - Starter - Base - Run - Creates Monorepo In Empty Directory.
 *
 * @since 0.15.0
 */
export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_ProjectDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_RootPackageJsonPath = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_GitignorePath = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfigPath = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_GitignoreRaw = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfigRaw = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Project_LegalName = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Project_StartingYear = number;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Project = {
  legalName: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Project_LegalName;
  startingYear: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Project_StartingYear;
};

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Environment_Workspaces_Root_Prefix = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Environment_Workspaces_Root = {
  prefix: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Environment_Workspaces_Root_Prefix;
};

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Environment_Workspaces = {
  './': Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Environment_Workspaces_Root;
};

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Environment = {
  workspaces: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Environment_Workspaces;
};

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig = {
  environment: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Environment;
  project: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig_Project;
};

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_AppsDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_PackagesDirectory = string;

/**
 * Tests - CLI - Scaffold - Starter - Base - Run - Exits With Error For Standalone Project.
 *
 * @since 0.15.0
 */
export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorForStandaloneProject_ProjectDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorForStandaloneProject_PackageJson = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorForStandaloneProject_PackageJsonPath = string;

/**
 * Tests - CLI - Scaffold - Starter - Base - Run - Exits With Error When Already At Monorepo Root.
 *
 * @since 0.15.0
 */
export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenAlreadyAtMonorepoRoot_ProjectDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenAlreadyAtMonorepoRoot_PackageJson = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenAlreadyAtMonorepoRoot_PackageJsonPath = string;

/**
 * Tests - CLI - Scaffold - Starter - Base - Run - Exits With Error When Inside Child Workspace.
 *
 * @since 0.15.0
 */
export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_RootDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_ChildDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJson = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJsonPath = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJson = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJsonPath = string;

/**
 * Tests - CLI - Scaffold - Starter - Base - Run - Rejects Current Directory Output.
 *
 * @since 0.31.0
 */
export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RejectsCurrentDirectoryOutput_ProjectDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RejectsCurrentDirectoryOutput_Exists = boolean;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RejectsCurrentDirectoryOutput_PackageJsonPath = string;

/**
 * Tests - CLI - Scaffold - Starter - Base - Run - Respects Dry Run.
 *
 * @since 0.15.0
 */
export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RespectsDryRun_ProjectDirectory = string;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RespectsDryRun_Exists = boolean;

export type Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RespectsDryRun_DryRunOutputPath = string;

/**
 * Tests - CLI - Scaffold - Starter - Base - Prompts Mock Module.
 *
 * @since 0.31.0
 */
export type Tests_Cli_Scaffold_Starter_Base_Prompts_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Scaffold_Starter_Base_Prompts_MockModule = Readonly<{
  default: Tests_Cli_Scaffold_Starter_Base_Prompts_MockModule_Default;
}>;
