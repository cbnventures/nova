/**
 * CLI - Scaffold - App - Android - Is Application ID Valid.
 *
 * @since 0.31.0
 */
export type Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_ApplicationId = string;

export type Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_Returns = boolean;

export type Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_Segments = string[];

/**
 * CLI - Scaffold - App - Android - Resolve Application ID.
 *
 * @since 0.31.0
 */
export type Cli_Scaffold_App_Android_Runner_ResolveApplicationId_WorkspaceName = string;

export type Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ProvidedApplicationId = string | undefined;

export type Cli_Scaffold_App_Android_Runner_ResolveApplicationId_Returns = string;

export type Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ApplicationIdSegmentBase = string;

export type Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ApplicationIdSegment = string;

/**
 * CLI - Scaffold - App - Android - Resolve Replacements.
 *
 * @since 0.31.0
 */
export type Cli_Scaffold_App_Android_Runner_ResolveReplacements_WorkspaceName = string;

export type Cli_Scaffold_App_Android_Runner_ResolveReplacements_ProvidedApplicationId = string | undefined;

export type Cli_Scaffold_App_Android_Runner_ResolveReplacements_Returns = Map<RegExp, string>;

export type Cli_Scaffold_App_Android_Runner_ResolveReplacements_ApplicationId = string;

export type Cli_Scaffold_App_Android_Runner_ResolveReplacements_ApplicationPackagePath = string;

/**
 * CLI - Scaffold - App - Android - Run.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Android_Runner_Run_Options_ApplicationId = string;
export type Cli_Scaffold_App_Android_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_App_Android_Runner_Run_Options_Install = boolean;
export type Cli_Scaffold_App_Android_Runner_Run_Options_Name = string;
export type Cli_Scaffold_App_Android_Runner_Run_Options_NonInteractive = true;
export type Cli_Scaffold_App_Android_Runner_Run_Options_Output = string;
export type Cli_Scaffold_App_Android_Runner_Run_Options_WorkspaceName = string;
export type Cli_Scaffold_App_Android_Runner_Run_Options = {
  applicationId?: Cli_Scaffold_App_Android_Runner_Run_Options_ApplicationId;
  dryRun?: Cli_Scaffold_App_Android_Runner_Run_Options_DryRun;
  install?: Cli_Scaffold_App_Android_Runner_Run_Options_Install;
  name?: Cli_Scaffold_App_Android_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_App_Android_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_App_Android_Runner_Run_Options_Output;
  workspaceName?: Cli_Scaffold_App_Android_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_App_Android_Runner_Run_Returns = Promise<void>;
