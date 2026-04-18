/**
 * Toolkit - Bootstrap - Get Cache Dir.
 *
 * @since 0.14.0
 */
export type ToolkitBootstrapGetCacheDirAppName = string;

export type ToolkitBootstrapGetCacheDirReturn = string;

export type ToolkitBootstrapGetCacheDirHomeDirPath = string;

export type ToolkitBootstrapGetCacheDirCachePath = string;

/**
 * Toolkit - Bootstrap - Get Config Dir.
 *
 * @since 0.14.0
 */
export type ToolkitBootstrapGetConfigDirAppName = string;

export type ToolkitBootstrapGetConfigDirReturn = string;

export type ToolkitBootstrapGetConfigDirHomeDirPath = string;

export type ToolkitBootstrapGetConfigDirDefaultPath = string;

export type ToolkitBootstrapGetConfigDirBasePath = string;

/**
 * Toolkit - Bootstrap - Get Data Dir.
 *
 * @since 0.14.0
 */
export type ToolkitBootstrapGetDataDirAppName = string;

export type ToolkitBootstrapGetDataDirReturn = string;

export type ToolkitBootstrapGetDataDirHomeDirPath = string;

export type ToolkitBootstrapGetDataDirDataPath = string;

/**
 * Toolkit - Bootstrap - Get Project Root.
 *
 * @since 0.14.0
 */
export type ToolkitBootstrapGetProjectRootReturn = string | undefined;

export type ToolkitBootstrapGetProjectRootDir = string;

export type ToolkitBootstrapGetProjectRootFirstPackageDir = string | undefined;

export type ToolkitBootstrapGetProjectRootFilePath = string;

export type ToolkitBootstrapGetProjectRootContent = string;

export type ToolkitBootstrapGetProjectRootParsed = Record<string, unknown>;

export type ToolkitBootstrapGetProjectRootParent = string;

/**
 * Toolkit - Bootstrap - Load Env.
 *
 * @since 0.14.0
 */
export type ToolkitBootstrapLoadEnvDirectory = string;

export type ToolkitBootstrapLoadEnvReturn = void;

export type ToolkitBootstrapLoadEnvFilePath = string;

export type ToolkitBootstrapLoadEnvContent = string;

export type ToolkitBootstrapLoadEnvLines = string[];

export type ToolkitBootstrapLoadEnvLine = string;

export type ToolkitBootstrapLoadEnvMatch = RegExpMatchArray | null;

export type ToolkitBootstrapLoadEnvKey = string;

export type ToolkitBootstrapLoadEnvValue = string;

/**
 * Toolkit - Bootstrap - Resolve Dir.
 *
 * @since 0.14.0
 */
export type ToolkitBootstrapResolveDirAppName = string;

export type ToolkitBootstrapResolveDirKeyword = string;

export type ToolkitBootstrapResolveDirReturn = string;

/**
 * Toolkit - Bootstrap - Resolve File Dir.
 *
 * @since 0.14.0
 */
export type ToolkitBootstrapResolveFileDirAppName = string;

export type ToolkitBootstrapResolveFileDirFilename = string;

export type ToolkitBootstrapResolveFileDirSearchOrder = string[];

export type ToolkitBootstrapResolveFileDirReturn = string | undefined;

export type ToolkitBootstrapResolveFileDirLocation = string;

export type ToolkitBootstrapResolveFileDirDirectory = string;

export type ToolkitBootstrapResolveFileDirFilePath = string;

/**
 * Toolkit - Bootstrap - Resolve File Dirs.
 *
 * @since 0.14.0
 */
export type ToolkitBootstrapResolveFileDirsAppName = string;

export type ToolkitBootstrapResolveFileDirsFilename = string;

export type ToolkitBootstrapResolveFileDirsSearchOrder = string[];

export type ToolkitBootstrapResolveFileDirsReturn = string[];

export type ToolkitBootstrapResolveFileDirsResults = string[];

export type ToolkitBootstrapResolveFileDirsLocation = string;

export type ToolkitBootstrapResolveFileDirsDirectory = string;

export type ToolkitBootstrapResolveFileDirsFilePath = string;
