/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetCacheDir - Creates Directory.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_CreatesDirectory_Result = string;

export type Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_CreatesDirectory_DirectoryExists = boolean;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetCacheDir - Result Includes App Name.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_ResultIncludesAppName_Result = string;

export type Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_ResultIncludesAppName_IncludesAppName = boolean;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetConfigDir.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_SandboxDir = string | undefined;

export type Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_OriginalXdgConfigHome = string | undefined;

export type Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_TempTmpDir = string;

export type Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_TempDirPath = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetConfigDir - Creates Directory.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_CreatesDirectory_Result = string;

export type Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_CreatesDirectory_DirectoryExists = boolean;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetConfigDir - Result Includes App Name.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_ResultIncludesAppName_Result = string;

export type Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_ResultIncludesAppName_IncludesAppName = boolean;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetDataDir - Creates Directory.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapGetDataDir_CreatesDirectory_Result = string;

export type Tests_Toolkit_Bootstrap_BootstrapGetDataDir_CreatesDirectory_DirectoryExists = boolean;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetDataDir - Result Includes App Name.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapGetDataDir_ResultIncludesAppName_Result = string;

export type Tests_Toolkit_Bootstrap_BootstrapGetDataDir_ResultIncludesAppName_IncludesAppName = boolean;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetProjectRoot - Result Contains Package Json.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_ResultContainsPackageJson_Result = string | undefined;

export type Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_ResultContainsPackageJson_PackageJsonPath = string;

export type Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_ResultContainsPackageJson_PackageJsonExists = boolean;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetProjectRoot - Returns AString When Run From ADirectory With Package Json.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_ReturnsAStringWhenRunFromADirectoryWithPackageJson_Result = string | undefined;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap LoadEnv.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_TempDir = string | undefined;

export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_TempTmpDir = string;

export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_TempDirPath = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap LoadEnv - Does Not Override Existing Vars.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_DoesNotOverrideExistingVars_OriginalValue = string | undefined;

export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_DoesNotOverrideExistingVars_EnvFilePath = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap LoadEnv - Does Not Throw When No Env Exists.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_DoesNotThrowWhenNoEnvExists_EnvDirectory = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap LoadEnv - Ignores Comments.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_IgnoresComments_EnvFilePath = string;

export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_IgnoresComments_EnvContent = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap LoadEnv - Ignores Empty Lines.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_IgnoresEmptyLines_EnvFilePath = string;

export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_IgnoresEmptyLines_EnvContent = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap LoadEnv - Loads Double Quoted Value.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_LoadsDoubleQuotedValue_EnvFilePath = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap LoadEnv - Loads KEYValue.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_LoadsKEYValue_EnvFilePath = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap LoadEnv - Loads Single Quoted Value.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapLoadEnv_LoadsSingleQuotedValue_EnvFilePath = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap ResolveFileDir.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_TempDir = string | undefined;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_TempTmpDir = string;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_TempDirPath = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap ResolveFileDir - Finds File At Absolute Path.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_FindsFileAtAbsolutePath_FilePath = string;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_FindsFileAtAbsolutePath_Result = string | undefined;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap ResolveFileDir - Respects Search Order.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_RespectsSearchOrder_FilePath = string;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_RespectsSearchOrder_Result = string | undefined;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap ResolveFileDir - Returns Undefined When Not Found.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_ReturnsUndefinedWhenNotFound_Result = string | undefined;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap ResolveFileDirs.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDir = string | undefined;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDir2 = string | undefined;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempTmpDir = string;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDirPath = string;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDir2Path = string;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap ResolveFileDirs - Returns All Matching Dirs.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_ReturnsAllMatchingDirs_FilePath = string;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_ReturnsAllMatchingDirs_FilePath2 = string;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_ReturnsAllMatchingDirs_Result = string[];

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_ReturnsAllMatchingDirs_IncludesFirst = boolean;

export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_ReturnsAllMatchingDirs_IncludesSecond = boolean;

/**
 * Tests - Toolkit - Bootstrap - Bootstrap ResolveFileDirs - Returns Empty Array When None Found.
 *
 * @since 0.14.0
 */
export type Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_ReturnsEmptyArrayWhenNoneFound_Result = string[];
