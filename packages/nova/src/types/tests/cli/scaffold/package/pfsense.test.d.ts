import type { Shared_NovaConfig } from '../../../../shared.d.ts';

/**
 * Tests - CLI - Scaffold - Package - Pfsense - CLI Scaffold Package Pfsense.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_SandboxRoot = string;

/**
 * Tests - CLI - Scaffold - Package - Pfsense - CLI Scaffold Package Pfsense - Finalize Writes The Same Values As The Sync Identity Recipe.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_ProjectDirectory = string;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_WorkspaceDirectory = string;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_PortDirectory = string;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_LongDescription = string;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizeWorkspace = (workspaceDirectory: string, configRoot: string) => Promise<void>;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_PackageDescription = string;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Info = string;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizedMakefile = string;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Config = Shared_NovaConfig;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_ResyncedMakefile = string;

/**
 * Tests - CLI - Scaffold - Package - Pfsense - CLI Scaffold Package Pfsense - Rejects A Comment Over 70 Characters.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_ProjectDirectory = string;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_ResolveReplacements = (workspaceName: string, configRoot: string) => Promise<Map<RegExp, string> | undefined>;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_Result = Map<RegExp, string> | undefined;

/**
 * Tests - CLI - Scaffold - Package - Pfsense - CLI Scaffold Package Pfsense - Writes The Port Comment From The Short Description.
 *
 * @since 0.49.0
 */
export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_ProjectDirectory = string;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_ResolveReplacements = (workspaceName: string, configRoot: string) => Promise<Map<RegExp, string> | undefined>;

export type Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_Replacements = Map<RegExp, string> | undefined;
