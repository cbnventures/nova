import type { Shared_ScaffoldOutputContract } from '../shared.d.ts';

/**
 * Tests - Scaffold Output Contract - Template Contracts.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_TemplateContracts = Shared_ScaffoldOutputContract[];

/**
 * Tests - Scaffold Output Contract - Scaffold Output Contract.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryDirectory = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryPrefix = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_SandboxRoot = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_PackageDirectory = string;

/**
 * Tests - Scaffold Output Contract - Scaffold Output Contract - Matches Every Template Inventory.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromise = Promise<void>;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromises = Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromise[];

/**
 * Tests - Scaffold Output Contract - Scaffold Output Contract - Matches The Base Starter Inventory.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesTheBaseStarterInventory_StarterContractPromise = Promise<void>;

/**
 * Tests - Scaffold Output Contract - Verify Generated Output.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TargetDirectory = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFile = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFiles = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFile[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Returns = Promise<void>;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFile = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFiles = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFile[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_InventoryMessage = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContent = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContents = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContent[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFilePath = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_UnresolvedFile = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_UnresolvedFiles = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_UnresolvedFile[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderMessage = string;

/**
 * Tests - Scaffold Output Contract - Verify Starter Contract.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_VerifyStarterContract_SandboxRoot = string;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_Returns = Promise<void>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_TargetDirectory = string;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonPath = string;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRaw = string;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies = Record<string, unknown>;

/**
 * Tests - Scaffold Output Contract - Verify Template Contract.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_VerifyTemplateContract_Contract = Shared_ScaffoldOutputContract;

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_PackageDirectory = string;

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_SandboxRoot = string;

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_Returns = Promise<void>;

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_TargetDirectory = string;

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateDirectory = string;
