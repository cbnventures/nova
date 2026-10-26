import type { vi } from 'vitest';

/**
 * Tests - CLI - Scaffold - App - Apple - Run.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_OriginalCwd = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_TemporaryDirectory = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_TemporaryBase = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_SandboxRoot = string;

/**
 * Tests - CLI - Scaffold - App - Apple - Run - Accepts Interactive Bundle Identifier.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_AcceptsInteractiveBundleIdentifier_OutputPath = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_AcceptsInteractiveBundleIdentifier_ProjectYml = string;

/**
 * Tests - CLI - Scaffold - App - Apple - Run - Preserves Derived Bundle Identifier Default.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_PreservesDerivedBundleIdentifierDefault_OutputPath = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_PreservesDerivedBundleIdentifierDefault_ProjectYml = string;

/**
 * Tests - CLI - Scaffold - App - Apple - Run - Rejects Invalid Derived Bundle Identifier Before Writing.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidDerivedBundleIdentifierBeforeWriting_OutputPath = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidDerivedBundleIdentifierBeforeWriting_Exists = boolean;

/**
 * Tests - CLI - Scaffold - App - Apple - Run - Rejects Invalid Values Before Writing Or Registration.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_RootDirectory = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_PackageJson = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_PackageJsonPath = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_NovaConfig = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_NovaConfigPath = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_InvalidBundleIdentifier = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_InvalidBundleIdentifiers = Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_InvalidBundleIdentifier[];

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_OutputPath = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_OutputPaths = Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_OutputPath[];

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_OutputExistence = boolean[];

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RejectsInvalidValuesBeforeWritingOrRegistration_CurrentNovaConfig = string;

/**
 * Tests - CLI - Scaffold - App - Apple - Run - Renders Exact Custom Bundle Identifiers.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_OutputPath = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_ProjectYml = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_Gitignore = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_IosMetadata = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_RendersExactCustomBundleIdentifiers_MacosMetadata = string;

/**
 * Tests - CLI - Scaffold - App - Apple - Run - Validates Dry Run Without Writing.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_ValidatesDryRunWithoutWriting_ProjectDirectory = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_ValidatesDryRunWithoutWriting_OutputPath = string;

export type Tests_Cli_Scaffold_App_Apple_CliScaffoldAppAppleRun_ValidatesDryRunWithoutWriting_Exists = boolean;

/**
 * Tests - CLI - Scaffold - App - Apple - Prompts Mock Module.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Scaffold_App_Apple_Prompts_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Scaffold_App_Apple_Prompts_MockModule = Readonly<{
  default: Tests_Cli_Scaffold_App_Apple_Prompts_MockModule_Default;
}>;
