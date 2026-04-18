/**
 * Tests - Theme Drift - Discover Theme Components.
 *
 * @since 0.15.0
 */
export type TestsThemeDriftDiscoverThemeComponentsReturns = Promise<string[]>;

export type TestsThemeDriftDiscoverThemeComponentsThemeDirectory = string;

export type TestsThemeDriftDiscoverThemeComponentsFiles = string[];

export type TestsThemeDriftDiscoverThemeComponentsModules = string[];

export type TestsThemeDriftDiscoverThemeComponentsRelativePath = string;

export type TestsThemeDriftDiscoverThemeComponentsModuleName = string;

export type TestsThemeDriftDiscoverThemeComponentsIsVariant = boolean;

/**
 * Tests - Theme Drift - Extract Declared Modules.
 *
 * @since 0.15.0
 */
export type TestsThemeDriftExtractDeclaredModulesReturns = Promise<string[]>;

export type TestsThemeDriftExtractDeclaredModulesThemeDtsPath = string;

export type TestsThemeDriftExtractDeclaredModulesContent = string;

export type TestsThemeDriftExtractDeclaredModulesModules = string[];

export type TestsThemeDriftExtractDeclaredModulesPattern = RegExp;

export type TestsThemeDriftExtractDeclaredModulesMatch = RegExpExecArray | null;

export type TestsThemeDriftExtractDeclaredModulesCapture = string | undefined;

/**
 * Tests - Theme Drift - Get Package Root.
 *
 * @since 0.15.0
 */
export type TestsThemeDriftGetPackageRootReturns = string;

export type TestsThemeDriftGetPackageRootCurrentFilePath = string;

export type TestsThemeDriftGetPackageRootCurrentFileDirectory = string;

/**
 * Tests - Theme Drift - Theme Drift.
 *
 * @since 0.15.0
 */
export type TestsThemeDriftDeclaredModulesHaveComponentsDeclaredModules = string[];

export type TestsThemeDriftDeclaredModulesHaveComponentsComponentModules = string[];

export type TestsThemeDriftDeclaredModulesHaveComponentsComponentSet = Set<string>;

export type TestsThemeDriftDeclaredModulesHaveComponentsMissing = string[];

export type TestsThemeDriftDeclaredModulesHaveComponentsModule = string;

export type TestsThemeDriftDeclaredModulesHaveComponentsMessage = string;

export type TestsThemeDriftComponentsHaveDeclaredModulesDeclaredModules = string[];

export type TestsThemeDriftComponentsHaveDeclaredModulesComponentModules = string[];

export type TestsThemeDriftComponentsHaveDeclaredModulesDeclaredSet = Set<string>;

export type TestsThemeDriftComponentsHaveDeclaredModulesMissing = string[];

export type TestsThemeDriftComponentsHaveDeclaredModulesModule = string;

export type TestsThemeDriftComponentsHaveDeclaredModulesMessage = string;

/**
 * Tests - Theme Drift - Variant Directories.
 *
 * @since 0.15.0
 */
export type TestsThemeDriftVariantDirectories = string[];
