/**
 * Tests - Folder Axis - Folder Axis - Every Blocks Directory Is Re Exported From Index Ts.
 *
 * @since 0.18.0
 */
export type Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_BlockDirs = readonly string[];

export type Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_Exported = ReadonlySet<string>;

export type Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_Missing = string[];

export type Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_Message = string;

/**
 * Tests - Folder Axis - Folder Axis - Every Blocks Directory Uses Kebab Case.
 *
 * @since 0.18.0
 */
export type Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryUsesKebabCase_BlockDirs = readonly string[];

export type Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryUsesKebabCase_Violations = string[];

export type Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryUsesKebabCase_Message = string;

/**
 * Tests - Folder Axis - Folder Axis - Every Blocks Index Ts Export Points To An Existing Directory.
 *
 * @since 0.18.0
 */
export type Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_BlockDirs = readonly string[];

export type Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_Exported = ReadonlySet<string>;

export type Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_BlockDirSet = ReadonlySet<string>;

export type Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_Stale = string[];

export type Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_Message = string;

/**
 * Tests - Folder Axis - Folder Axis - Every Theme Directory Uses Pascal Case.
 *
 * @since 0.18.0
 */
export type Tests_FolderAxis_FolderAxis_EveryThemeDirectoryUsesPascalCase_ThemeDirs = readonly string[];

export type Tests_FolderAxis_FolderAxis_EveryThemeDirectoryUsesPascalCase_Violations = string[];

export type Tests_FolderAxis_FolderAxis_EveryThemeDirectoryUsesPascalCase_Message = string;

/**
 * Tests - Folder Axis - Get Package Root.
 *
 * @since 0.18.0
 */
export type Tests_FolderAxis_GetPackageRoot_Returns = string;

export type Tests_FolderAxis_GetPackageRoot_CurrentFilePath = string;

export type Tests_FolderAxis_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Folder Axis - List Block Directories.
 *
 * @since 0.18.0
 */
export type Tests_FolderAxis_ListBlockDirectories_Returns = readonly string[];

export type Tests_FolderAxis_ListBlockDirectories_BlocksRoot = string;

export type Tests_FolderAxis_ListBlockDirectories_Entries = readonly import('node:fs').Dirent[];

/**
 * Tests - Folder Axis - List Theme Directories.
 *
 * @since 0.18.0
 */
export type Tests_FolderAxis_ListThemeDirectories_Returns = readonly string[];

export type Tests_FolderAxis_ListThemeDirectories_ThemeRoot = string;

export type Tests_FolderAxis_ListThemeDirectories_Entries = readonly import('node:fs').Dirent[];

/**
 * Tests - Folder Axis - Read Blocks Index Exports.
 *
 * @since 0.18.0
 */
export type Tests_FolderAxis_ReadBlocksIndexExports_Returns = ReadonlySet<string>;

export type Tests_FolderAxis_ReadBlocksIndexExports_IndexPath = string;

export type Tests_FolderAxis_ReadBlocksIndexExports_Content = string;

export type Tests_FolderAxis_ReadBlocksIndexExports_Lines = readonly string[];

export type Tests_FolderAxis_ReadBlocksIndexExports_Folders = Set<string>;

export type Tests_FolderAxis_ReadBlocksIndexExports_Line = string;

export type Tests_FolderAxis_ReadBlocksIndexExports_Match = RegExpMatchArray | null;

export type Tests_FolderAxis_ReadBlocksIndexExports_CapturedFolder = string;
