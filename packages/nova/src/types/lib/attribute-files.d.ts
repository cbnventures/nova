import type {
  Shared_AttributeFileMerge,
  Shared_NovaConfig_AttributeFile,
} from '../shared.d.ts';

/**
 * Lib - Attribute Files - Lib Attribute File Bundles.
 *
 * @since 0.49.0
 */
export type Lib_AttributeFiles_LibAttributeFileBundles = Record<string, string[]>;

/**
 * Lib - Attribute Files - Get Supported Attribute File Bundles.
 *
 * @since 0.49.0
 */
export type Lib_AttributeFiles_GetSupportedAttributeFileBundles_Returns = string[];

/**
 * Lib - Attribute Files - Is Supported Attribute File Config Path.
 *
 * @since 0.49.0
 */
export type Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_ConfigPath = string;

export type Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_Returns = boolean;

export type Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_PathSegments = string[];

/**
 * Lib - Attribute Files - Merge Attribute Lines.
 *
 * @since 0.49.0
 */
export type Lib_AttributeFiles_MergeAttributeLines_Entry = Shared_NovaConfig_AttributeFile;

export type Lib_AttributeFiles_MergeAttributeLines_Returns = Shared_AttributeFileMerge;

export type Lib_AttributeFiles_MergeAttributeLines_WhitespacePattern = RegExp;

export type Lib_AttributeFiles_MergeAttributeLines_BundleAttributes = Map<string, string>;

export type Lib_AttributeFiles_MergeAttributeLines_Lines = string[];

export type Lib_AttributeFiles_MergeAttributeLines_Conflicts = string[];

export type Lib_AttributeFiles_MergeAttributeLines_BundleLines = string[];

export type Lib_AttributeFiles_MergeAttributeLines_BundleTokens = string[];

export type Lib_AttributeFiles_MergeAttributeLines_Normalized = string;

export type Lib_AttributeFiles_MergeAttributeLines_PatternTokens = string[];

export type Lib_AttributeFiles_MergeAttributeLines_Path = string;

export type Lib_AttributeFiles_MergeAttributeLines_Attributes = string;

/**
 * Lib - Attribute Files - Render Attribute File.
 *
 * @since 0.49.0
 */
export type Lib_AttributeFiles_RenderAttributeFile_TargetPath = string;

export type Lib_AttributeFiles_RenderAttributeFile_Entry = Shared_NovaConfig_AttributeFile;

export type Lib_AttributeFiles_RenderAttributeFile_Returns = string;

export type Lib_AttributeFiles_RenderAttributeFile_Merged = Shared_AttributeFileMerge;
