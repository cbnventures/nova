import type { vi } from 'vitest';

/**
 * Tests - CLI - Scaffold - Tool - Serverless - Run.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_OriginalCwd = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_TemporaryDirectory = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_TemporaryBase = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_SandboxRoot = string;

/**
 * Tests - CLI - Scaffold - Tool - Serverless - Run - Creates The Default Cloudflare Workers Target As A Distributable Tool.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_OutputPath = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_WranglerToml = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_ConfigPath = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspace_Name = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspace_Policy = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspace_Role = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspace = {
  name: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspace_Name;
  policy: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspace_Policy;
  role: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspace_Role;
};

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspaces = Record<string, Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspace>;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config = {
  workspaces: Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspaces;
};

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_WorkspaceConfig = Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheDefaultCloudflareWorkersTargetAsADistributableTool_Config_Workspace | undefined;

/**
 * Tests - CLI - Scaffold - Tool - Serverless - Run - Creates The Vercel Functions Target Without Cloudflare Files.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_OutputPath = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_WorkspacePath = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_ApiSource = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_PackageJson = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_CreatesTheVercelFunctionsTargetWithoutCloudflareFiles_WranglerExists = boolean;

/**
 * Tests - CLI - Scaffold - Tool - Serverless - Run - Rejects An Invalid Target Before Writing.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_RejectsAnInvalidTargetBeforeWriting_OutputPath = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_RejectsAnInvalidTargetBeforeWriting_Exists = boolean;

/**
 * Tests - CLI - Scaffold - Tool - Serverless - Run - Resolves The Target Interactively Before Confirming The Scaffold.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ResolvesTheTargetInteractivelyBeforeConfirmingTheScaffold_OutputPath = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ResolvesTheTargetInteractivelyBeforeConfirmingTheScaffold_ApiSource = string;

/**
 * Tests - CLI - Scaffold - Tool - Serverless - Run - Validates Dry Run Without Writing.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ValidatesDryRunWithoutWriting_OutputPath = string;

export type Tests_Cli_Scaffold_Tool_Serverless_CliScaffoldToolServerlessRun_ValidatesDryRunWithoutWriting_Exists = boolean;

/**
 * Tests - CLI - Scaffold - Tool - Serverless - Prompts Mock Module.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_Tool_Serverless_Prompts_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Scaffold_Tool_Serverless_Prompts_MockModule = Readonly<{
  default: Tests_Cli_Scaffold_Tool_Serverless_Prompts_MockModule_Default;
}>;
