/**
 * Tests - Folder Axis - Folder Axis.
 *
 * @since 0.18.0
 */
export type Tests_FolderAxis_FolderAxis_ThemeDirs = readonly string[];

export type Tests_FolderAxis_FolderAxis_CasingViolations = string[];

export type Tests_FolderAxis_FolderAxis_CasingMessage = string;

export type Tests_FolderAxis_FolderAxis_BlockDirs = readonly string[];

export type Tests_FolderAxis_FolderAxis_ExportedFolders = ReadonlySet<string>;

export type Tests_FolderAxis_FolderAxis_MissingExports = string[];

export type Tests_FolderAxis_FolderAxis_MissingExportsMessage = string;

export type Tests_FolderAxis_FolderAxis_BlockDirSet = ReadonlySet<string>;

export type Tests_FolderAxis_FolderAxis_StaleExports = string[];

export type Tests_FolderAxis_FolderAxis_StaleExportsMessage = string;

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
