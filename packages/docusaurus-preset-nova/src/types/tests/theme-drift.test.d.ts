/**
 * Tests - Theme Drift - Variant Directories.
 *
 * @since 0.15.0
 */
export type Tests_ThemeDrift_VariantDirectories = string[];

/**
 * Tests - Theme Drift - Discover Theme Components.
 *
 * @since 0.15.0
 */
export type Tests_ThemeDrift_DiscoverThemeComponents_Returns = Promise<string[]>;

export type Tests_ThemeDrift_DiscoverThemeComponents_ThemeDirectory = string;

export type Tests_ThemeDrift_DiscoverThemeComponents_Files = string[];

export type Tests_ThemeDrift_DiscoverThemeComponents_Modules = string[];

export type Tests_ThemeDrift_DiscoverThemeComponents_RelativePath = string;

export type Tests_ThemeDrift_DiscoverThemeComponents_ModuleName = string;

export type Tests_ThemeDrift_DiscoverThemeComponents_IsVariant = boolean;

/**
 * Tests - Theme Drift - Extract Declared Modules.
 *
 * @since 0.15.0
 */
export type Tests_ThemeDrift_ExtractDeclaredModules_Returns = Promise<string[]>;

export type Tests_ThemeDrift_ExtractDeclaredModules_ThemeDtsPath = string;

export type Tests_ThemeDrift_ExtractDeclaredModules_Content = string;

export type Tests_ThemeDrift_ExtractDeclaredModules_Modules = string[];

export type Tests_ThemeDrift_ExtractDeclaredModules_Pattern = RegExp;

export type Tests_ThemeDrift_ExtractDeclaredModules_Match = RegExpExecArray | null;

export type Tests_ThemeDrift_ExtractDeclaredModules_Capture = string | undefined;

/**
 * Tests - Theme Drift - Get Package Root.
 *
 * @since 0.15.0
 */
export type Tests_ThemeDrift_GetPackageRoot_Returns = string;

export type Tests_ThemeDrift_GetPackageRoot_CurrentFilePath = string;

export type Tests_ThemeDrift_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Theme Drift - Theme Drift - Every Component Directory Has A Declared Module.
 *
 * @since 0.15.0
 */
export type Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_DeclaredModules = string[];

export type Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_ComponentModules = string[];

export type Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_DeclaredSet = Set<string>;

export type Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_Missing = string[];

export type Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_ComponentModule = string;

export type Tests_ThemeDrift_ThemeDrift_EveryComponentDirectoryHasADeclaredModule_Message = string;

/**
 * Tests - Theme Drift - Theme Drift - Every Declared Module Has A Component Directory.
 *
 * @since 0.15.0
 */
export type Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_DeclaredModules = string[];

export type Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_ComponentModules = string[];

export type Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_ComponentSet = Set<string>;

export type Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_Missing = string[];

export type Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_DeclaredModule = string;

export type Tests_ThemeDrift_ThemeDrift_EveryDeclaredModuleHasAComponentDirectory_Message = string;
