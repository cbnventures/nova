/**
 * Toolkit - Bootstrap - Get Cache Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_GetCacheDir_AppName = string;

export type Toolkit_Bootstrap_GetCacheDir_Return = string;

export type Toolkit_Bootstrap_GetCacheDir_HomeDirPath = string;

export type Toolkit_Bootstrap_GetCacheDir_CachePath = string;

/**
 * Toolkit - Bootstrap - Get Config Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_GetConfigDir_AppName = string;

export type Toolkit_Bootstrap_GetConfigDir_Return = string;

export type Toolkit_Bootstrap_GetConfigDir_HomeDirPath = string;

export type Toolkit_Bootstrap_GetConfigDir_DefaultPath = string;

export type Toolkit_Bootstrap_GetConfigDir_BasePath = string;

/**
 * Toolkit - Bootstrap - Get Data Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_GetDataDir_AppName = string;

export type Toolkit_Bootstrap_GetDataDir_Return = string;

export type Toolkit_Bootstrap_GetDataDir_HomeDirPath = string;

export type Toolkit_Bootstrap_GetDataDir_DataPath = string;

/**
 * Toolkit - Bootstrap - Get Project Root.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_GetProjectRoot_Return = string | undefined;

export type Toolkit_Bootstrap_GetProjectRoot_Dir = string;

export type Toolkit_Bootstrap_GetProjectRoot_FirstPackageDir = string | undefined;

export type Toolkit_Bootstrap_GetProjectRoot_FilePath = string;

export type Toolkit_Bootstrap_GetProjectRoot_Content = string;

export type Toolkit_Bootstrap_GetProjectRoot_Parsed = Record<string, unknown>;

export type Toolkit_Bootstrap_GetProjectRoot_Parent = string;

/**
 * Toolkit - Bootstrap - Load Env.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_LoadEnv_Directory = string;

export type Toolkit_Bootstrap_LoadEnv_Return = void;

export type Toolkit_Bootstrap_LoadEnv_FilePath = string;

export type Toolkit_Bootstrap_LoadEnv_Content = string;

export type Toolkit_Bootstrap_LoadEnv_Lines = string[];

export type Toolkit_Bootstrap_LoadEnv_Line = string;

export type Toolkit_Bootstrap_LoadEnv_Match = RegExpMatchArray | null;

export type Toolkit_Bootstrap_LoadEnv_Key = string;

export type Toolkit_Bootstrap_LoadEnv_Value = string;

/**
 * Toolkit - Bootstrap - Resolve Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_ResolveDir_AppName = string;

export type Toolkit_Bootstrap_ResolveDir_Keyword = string;

export type Toolkit_Bootstrap_ResolveDir_Return = string;

/**
 * Toolkit - Bootstrap - Resolve File Dir.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_ResolveFileDir_AppName = string;

export type Toolkit_Bootstrap_ResolveFileDir_Filename = string;

export type Toolkit_Bootstrap_ResolveFileDir_SearchOrder = string[];

export type Toolkit_Bootstrap_ResolveFileDir_Return = string | undefined;

export type Toolkit_Bootstrap_ResolveFileDir_Location = string;

export type Toolkit_Bootstrap_ResolveFileDir_Directory = string;

export type Toolkit_Bootstrap_ResolveFileDir_FilePath = string;

/**
 * Toolkit - Bootstrap - Resolve File Dirs.
 *
 * @since 0.14.0
 */
export type Toolkit_Bootstrap_ResolveFileDirs_AppName = string;

export type Toolkit_Bootstrap_ResolveFileDirs_Filename = string;

export type Toolkit_Bootstrap_ResolveFileDirs_SearchOrder = string[];

export type Toolkit_Bootstrap_ResolveFileDirs_Return = string[];

export type Toolkit_Bootstrap_ResolveFileDirs_Results = string[];

export type Toolkit_Bootstrap_ResolveFileDirs_Location = string;

export type Toolkit_Bootstrap_ResolveFileDirs_Directory = string;

export type Toolkit_Bootstrap_ResolveFileDirs_FilePath = string;
