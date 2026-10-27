import type { Shared_ScaffoldOutputContract } from '../shared.d.ts';

/**
 * Tests - Scaffold Output Contract - Template Contracts.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_TemplateContracts = Shared_ScaffoldOutputContract[];

/**
 * Tests - Scaffold Output Contract - Translation Ready Contracts.
 *
 * @since 0.35.0
 */
export type Tests_ScaffoldOutputContract_TranslationReadyContracts_TranslationReadyContract_Path = string;

export type Tests_ScaffoldOutputContract_TranslationReadyContracts_TranslationReadyContract_Marker = string;

export type Tests_ScaffoldOutputContract_TranslationReadyContracts_TranslationReadyContract_Markers = Tests_ScaffoldOutputContract_TranslationReadyContracts_TranslationReadyContract_Marker[];

export type Tests_ScaffoldOutputContract_TranslationReadyContracts_TranslationReadyContract = {
  path: Tests_ScaffoldOutputContract_TranslationReadyContracts_TranslationReadyContract_Path;
  markers: Tests_ScaffoldOutputContract_TranslationReadyContracts_TranslationReadyContract_Markers;
};

export type Tests_ScaffoldOutputContract_TranslationReadyContracts = Tests_ScaffoldOutputContract_TranslationReadyContracts_TranslationReadyContract[];

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
 * Tests - Scaffold Output Contract - Scaffold Output Contract - Keeps Every Translation Ready Scaffold On Its Native Localization Contract.
 *
 * @since 0.35.0
 */
export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsEveryTranslationReadyScaffoldOnItsNativeLocalizationContract_TranslationReadyPath = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsEveryTranslationReadyScaffoldOnItsNativeLocalizationContract_TranslationReadyContent = string;

/**
 * Tests - Scaffold Output Contract - Scaffold Output Contract - Matches Every Template Inventory.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromise = Promise<void>;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromises = Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromise[];

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractResults = PromiseSettledResult<void>[];

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_RejectedTemplateContract = PromiseRejectedResult | undefined;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractResultTypeGuard = PromiseRejectedResult;

/**
 * Tests - Scaffold Output Contract - Scaffold Output Contract - Matches The Base Starter Inventory.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesTheBaseStarterInventory_StarterContractPromise = Promise<void>;

/**
 * Tests - Scaffold Output Contract - Scaffold Output Contract - Routes The PfSense Single Instance Settings Page Directly To Its Native Editor.
 *
 * @since 0.31.0
 */
export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPagePath = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPageContent = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerPath = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerContent = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptPath = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptContent = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoPath = string;

export type Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoContent = string;

/**
 * Tests - Scaffold Output Contract - Verify Generated Output.
 *
 * @since 0.26.0
 */
export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TargetDirectory = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFile = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFiles = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFile[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_RequireRootScripts = boolean;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_RequireI18n = boolean;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScripts = Record<string, string>;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Returns = Promise<void>;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFile = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFiles = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFile[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_InventoryMessage = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContent = string | undefined;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContents = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContent[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFilePath = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedBuffer = Buffer;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_UnresolvedFile = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_UnresolvedFiles = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_UnresolvedFile[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderGeneratedContent = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderMessage = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceFile = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceFiles = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceFile[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceGeneratedContent = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceMessage = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineFile = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineFiles = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineFile[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineGeneratedContent = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineMessage = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintConfigIndex = number;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintConfigContent = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintBaseline = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigFiles = string[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigPath = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigRaw = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Tsconfig = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigReferences = unknown;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigFileList = unknown;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigExtends = string[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonIndex = number;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonContent = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJson = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageScripts = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptEntry = [string, string];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptEntries = Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptEntry[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonKeys = string[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonKnownKeys = Set<string>;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonOrderedKeys = string[];

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageEngines = unknown;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptName = string;

export type Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptCommand = string;

/**
 * Tests - Scaffold Output Contract - Verify Script Contract.
 *
 * @since 0.27.0
 */
export type Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonPath = string;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_RequireRootScripts = boolean;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_RequireI18n = boolean;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_Returns = Promise<void>;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonRaw = string;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJson = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_Scripts = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptNames = string[];

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupOrder = readonly ('dev' | 'prod' | 'check' | 'build' | 'deploy' | 'clean' | 'i18n')[];

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroup = Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupOrder[number];

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupModes = Record<Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroup, 'parallel' | 'sequential'>;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupNodeEnvOptions = Record<Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroup, string>;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ContractViolations = string[];

export type Tests_ScaffoldOutputContract_VerifyScriptContract_PreviousParentIndex = number;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ChildScriptNames = string[];

export type Tests_ScaffoldOutputContract_VerifyScriptContract_HasParent = boolean;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ParentIndex = number;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_WorkspaceParentCommand = string;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_RootParentCommand = string;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedParentCommand = string;

export type Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedGroupNames = string[];

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

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfigPath = string;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfigRaw = string;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfig = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedProject = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedSettings = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRunWorkspacesSettings = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRecipes = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedMiscellaneousRecipes = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipes = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRootPackageJsonRecipes = Record<string, Record<string, unknown>>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipeNames = string[];

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedAllowScripts = Record<string, boolean>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedScripts = Record<string, unknown>;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipeName = string;

export type Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipe = Record<string, unknown> | undefined;

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

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateOptionSubpath = string;

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateOptionSubpaths = Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateOptionSubpath[];

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_ReviewedTemplateOptionSubpath = string;

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateOptionDirectory = string;

export type Tests_ScaffoldOutputContract_VerifyTemplateContract_RequireI18n = boolean;
