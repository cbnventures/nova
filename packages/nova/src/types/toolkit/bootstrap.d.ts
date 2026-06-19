/**
 * Toolkit - Bootstrap - Get Cache Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_Runner_GetCacheDir_AppName = string;

export type Toolkit_Bootstrap_Runner_GetCacheDir_Returns = string;

export type Toolkit_Bootstrap_Runner_GetCacheDir_HomeDirPath = string;

export type Toolkit_Bootstrap_Runner_GetCacheDir_WindowsCachePath = string;

export type Toolkit_Bootstrap_Runner_GetCacheDir_WindowsBasePath = string;

export type Toolkit_Bootstrap_Runner_GetCacheDir_DarwinCachePath = string;

export type Toolkit_Bootstrap_Runner_GetCacheDir_DarwinBasePath = string;

export type Toolkit_Bootstrap_Runner_GetCacheDir_CachePath = string;

export type Toolkit_Bootstrap_Runner_GetCacheDir_BasePath = string;

/**
 * Toolkit - Bootstrap - Get Config Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_Runner_GetConfigDir_AppName = string;

export type Toolkit_Bootstrap_Runner_GetConfigDir_Returns = string;

export type Toolkit_Bootstrap_Runner_GetConfigDir_HomeDirPath = string;

export type Toolkit_Bootstrap_Runner_GetConfigDir_WindowsDefaultPath = string;

export type Toolkit_Bootstrap_Runner_GetConfigDir_WindowsBasePath = string;

export type Toolkit_Bootstrap_Runner_GetConfigDir_DefaultPath = string;

export type Toolkit_Bootstrap_Runner_GetConfigDir_BasePath = string;

/**
 * Toolkit - Bootstrap - Get Data Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_Runner_GetDataDir_AppName = string;

export type Toolkit_Bootstrap_Runner_GetDataDir_Returns = string;

export type Toolkit_Bootstrap_Runner_GetDataDir_HomeDirPath = string;

export type Toolkit_Bootstrap_Runner_GetDataDir_WindowsDataPath = string;

export type Toolkit_Bootstrap_Runner_GetDataDir_WindowsBasePath = string;

export type Toolkit_Bootstrap_Runner_GetDataDir_DarwinDataPath = string;

export type Toolkit_Bootstrap_Runner_GetDataDir_DarwinBasePath = string;

export type Toolkit_Bootstrap_Runner_GetDataDir_DataPath = string;

export type Toolkit_Bootstrap_Runner_GetDataDir_BasePath = string;

/**
 * Toolkit - Bootstrap - Get Project Root.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_Runner_GetProjectRoot_Returns = string | undefined;

export type Toolkit_Bootstrap_Runner_GetProjectRoot_Dir = string;

export type Toolkit_Bootstrap_Runner_GetProjectRoot_FirstPackageDir = string | undefined;

export type Toolkit_Bootstrap_Runner_GetProjectRoot_FilePath = string;

export type Toolkit_Bootstrap_Runner_GetProjectRoot_Content = string;

export type Toolkit_Bootstrap_Runner_GetProjectRoot_Parsed = Record<string, unknown>;

export type Toolkit_Bootstrap_Runner_GetProjectRoot_Parent = string;

/**
 * Toolkit - Bootstrap - Load Env.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_Runner_LoadEnv_Directory = string;

export type Toolkit_Bootstrap_Runner_LoadEnv_Returns = void;

export type Toolkit_Bootstrap_Runner_LoadEnv_FilePath = string;

export type Toolkit_Bootstrap_Runner_LoadEnv_Content = string;

export type Toolkit_Bootstrap_Runner_LoadEnv_Lines = string[];

export type Toolkit_Bootstrap_Runner_LoadEnv_TrimmedLine = string;

export type Toolkit_Bootstrap_Runner_LoadEnv_Match = RegExpMatchArray | null;

export type Toolkit_Bootstrap_Runner_LoadEnv_Key = string;

export type Toolkit_Bootstrap_Runner_LoadEnv_Value = string;

/**
 * Toolkit - Bootstrap - Resolve Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_Runner_ResolveDir_AppName = string;

export type Toolkit_Bootstrap_Runner_ResolveDir_Keyword = string;

export type Toolkit_Bootstrap_Runner_ResolveDir_Returns = string;

/**
 * Toolkit - Bootstrap - Resolve File Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_Runner_ResolveFileDir_AppName = string;

export type Toolkit_Bootstrap_Runner_ResolveFileDir_Filename = string;

export type Toolkit_Bootstrap_Runner_ResolveFileDir_SearchOrder = string[];

export type Toolkit_Bootstrap_Runner_ResolveFileDir_Returns = string | undefined;

export type Toolkit_Bootstrap_Runner_ResolveFileDir_TypedLocation = string;

export type Toolkit_Bootstrap_Runner_ResolveFileDir_Directory = string;

export type Toolkit_Bootstrap_Runner_ResolveFileDir_FilePath = string;

/**
 * Toolkit - Bootstrap - Resolve File Dirs.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_Runner_ResolveFileDirs_AppName = string;

export type Toolkit_Bootstrap_Runner_ResolveFileDirs_Filename = string;

export type Toolkit_Bootstrap_Runner_ResolveFileDirs_SearchOrder = string[];

export type Toolkit_Bootstrap_Runner_ResolveFileDirs_Returns = string[];

export type Toolkit_Bootstrap_Runner_ResolveFileDirs_Results = string[];

export type Toolkit_Bootstrap_Runner_ResolveFileDirs_TypedLocation = string;

export type Toolkit_Bootstrap_Runner_ResolveFileDirs_Directory = string;

export type Toolkit_Bootstrap_Runner_ResolveFileDirs_FilePath = string;
