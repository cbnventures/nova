/**
 * Tests - Overlay Completeness - Get Package Root.
 *
 * @since 0.18.0
 */
export type Tests_OverlayCompleteness_GetPackageRoot_Returns = string;

export type Tests_OverlayCompleteness_GetPackageRoot_CurrentFilePath = string;

export type Tests_OverlayCompleteness_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Overlay Completeness - List Shared Theme Files.
 *
 * @since 0.18.0
 */
export type Tests_OverlayCompleteness_ListSharedThemeFiles_Returns = Promise<readonly string[]>;

export type Tests_OverlayCompleteness_ListSharedThemeFiles_ThemeDirectory = string;

/**
 * Tests - Overlay Completeness - Overlay Completeness.
 *
 * @since 0.18.0
 */
export type Tests_OverlayCompleteness_OverlayCompleteness_PresetName = string;

export type Tests_OverlayCompleteness_OverlayCompleteness_SharedFiles = readonly string[];

export type Tests_OverlayCompleteness_OverlayCompleteness_PresetThemeDir = string;

export type Tests_OverlayCompleteness_OverlayCompleteness_PresetFiles = readonly string[];

export type Tests_OverlayCompleteness_OverlayCompleteness_PresetFilesSet = Set<string>;

export type Tests_OverlayCompleteness_OverlayCompleteness_Missing = readonly string[];

export type Tests_OverlayCompleteness_OverlayCompleteness_Message = string;
