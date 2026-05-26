/**
 * Tests - Folder Axis - Folder Axis.
 *
 * @since 0.18.0
 */
export type TestsFolderAxisFolderAxisThemeDirs = readonly string[];

export type TestsFolderAxisFolderAxisCasingViolations = string[];

export type TestsFolderAxisFolderAxisCasingMessage = string;

export type TestsFolderAxisFolderAxisBlockDirs = readonly string[];

export type TestsFolderAxisFolderAxisExportedFolders = ReadonlySet<string>;

export type TestsFolderAxisFolderAxisMissingExports = string[];

export type TestsFolderAxisFolderAxisMissingExportsMessage = string;

export type TestsFolderAxisFolderAxisBlockDirSet = ReadonlySet<string>;

export type TestsFolderAxisFolderAxisStaleExports = string[];

export type TestsFolderAxisFolderAxisStaleExportsMessage = string;

/**
 * Tests - Folder Axis - Get Package Root.
 *
 * @since 0.18.0
 */
export type TestsFolderAxisGetPackageRootReturns = string;

export type TestsFolderAxisGetPackageRootCurrentFilePath = string;

export type TestsFolderAxisGetPackageRootCurrentFileDirectory = string;

/**
 * Tests - Folder Axis - List Block Directories.
 *
 * @since 0.18.0
 */
export type TestsFolderAxisListBlockDirectoriesReturns = readonly string[];

export type TestsFolderAxisListBlockDirectoriesBlocksRoot = string;

export type TestsFolderAxisListBlockDirectoriesEntries = readonly import('node:fs').Dirent[];

/**
 * Tests - Folder Axis - List Theme Directories.
 *
 * @since 0.18.0
 */
export type TestsFolderAxisListThemeDirectoriesReturns = readonly string[];

export type TestsFolderAxisListThemeDirectoriesThemeRoot = string;

export type TestsFolderAxisListThemeDirectoriesEntries = readonly import('node:fs').Dirent[];

/**
 * Tests - Folder Axis - Read Blocks Index Exports.
 *
 * @since 0.18.0
 */
export type TestsFolderAxisReadBlocksIndexExportsReturns = ReadonlySet<string>;

export type TestsFolderAxisReadBlocksIndexExportsIndexPath = string;

export type TestsFolderAxisReadBlocksIndexExportsContent = string;

export type TestsFolderAxisReadBlocksIndexExportsLines = readonly string[];

export type TestsFolderAxisReadBlocksIndexExportsFolders = Set<string>;

export type TestsFolderAxisReadBlocksIndexExportsLine = string;

export type TestsFolderAxisReadBlocksIndexExportsMatch = RegExpMatchArray | null;

export type TestsFolderAxisReadBlocksIndexExportsCapturedFolder = string;
