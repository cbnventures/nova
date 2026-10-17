/**
 * CLI - Scaffold - App - Apple - Get Bundle Identifier Validation Message.
 *
 * @since 0.32.0
 */
export type Cli_Scaffold_App_Apple_Runner_GetBundleIdentifierValidationMessage_Returns = string;

/**
 * CLI - Scaffold - App - Apple - Is Bundle Identifier Valid.
 *
 * @since 0.32.0
 */
export type Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_BundleIdentifier = string;

export type Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_Returns = boolean;

export type Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_Segments = string[];

/**
 * CLI - Scaffold - App - Apple - Resolve Bundle Identifier.
 *
 * @since 0.32.0
 */
export type Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_WorkspaceName = string;

export type Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_ProvidedBundleIdentifier = string | undefined;

export type Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_IsNonInteractive = boolean;

export type Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Returns = Promise<string | undefined>;

export type Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_DefaultBundleIdentifier = string;

export type Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Answers = Record<string, unknown>;

export type Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Answer = unknown;

/**
 * CLI - Scaffold - App - Apple - Resolve Bundle Identifier Default.
 *
 * @since 0.32.0
 */
export type Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifierDefault_WorkspaceName = string;

export type Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifierDefault_Returns = string;

/**
 * CLI - Scaffold - App - Apple - Resolve Replacements.
 *
 * @since 0.32.0
 */
export type Cli_Scaffold_App_Apple_Runner_ResolveReplacements_BundleIdentifier = string;

export type Cli_Scaffold_App_Apple_Runner_ResolveReplacements_Returns = Map<RegExp, string>;

/**
 * CLI - Scaffold - App - Apple - Run.
 *
 * @since 0.29.0
 */
export type Cli_Scaffold_App_Apple_Runner_Run_Options_BundleId = string;
export type Cli_Scaffold_App_Apple_Runner_Run_Options_DryRun = true;

export type Cli_Scaffold_App_Apple_Runner_Run_Options_Install = boolean;
export type Cli_Scaffold_App_Apple_Runner_Run_Options_Name = string;
export type Cli_Scaffold_App_Apple_Runner_Run_Options_NonInteractive = true;
export type Cli_Scaffold_App_Apple_Runner_Run_Options_Output = string;
export type Cli_Scaffold_App_Apple_Runner_Run_Options_WorkspaceName = string;
export type Cli_Scaffold_App_Apple_Runner_Run_Options = {
  bundleId?: Cli_Scaffold_App_Apple_Runner_Run_Options_BundleId;
  dryRun?: Cli_Scaffold_App_Apple_Runner_Run_Options_DryRun;
  install?: Cli_Scaffold_App_Apple_Runner_Run_Options_Install;
  name?: Cli_Scaffold_App_Apple_Runner_Run_Options_Name;
  nonInteractive?: Cli_Scaffold_App_Apple_Runner_Run_Options_NonInteractive;
  output?: Cli_Scaffold_App_Apple_Runner_Run_Options_Output;
  workspaceName?: Cli_Scaffold_App_Apple_Runner_Run_Options_WorkspaceName;
};

export type Cli_Scaffold_App_Apple_Runner_Run_Returns = Promise<void>;

export type Cli_Scaffold_App_Apple_Runner_Run_ResolvedBundleIdentifier = string | undefined;
