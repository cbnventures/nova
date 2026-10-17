import type {
  Shared_NovaConfig_IgnoreFile,
  Shared_NovaConfig_IgnoreFile_Bundles,
  Shared_NovaConfig_IgnoreFile_Patterns,
} from '../shared.d.ts';

/**
 * Lib - Ignore Files - Lib Ignore File Bundle Templates.
 *
 * @since 0.32.0
 */
export type Lib_IgnoreFiles_LibIgnoreFileBundleTemplates_TemplatePath = string;

export type Lib_IgnoreFiles_LibIgnoreFileBundleTemplates_FileBundles = Record<string, Lib_IgnoreFiles_LibIgnoreFileBundleTemplates_TemplatePath>;

export type Lib_IgnoreFiles_LibIgnoreFileBundleTemplates = Record<string, Lib_IgnoreFiles_LibIgnoreFileBundleTemplates_FileBundles>;

/**
 * Lib - Ignore Files - Lib Ignore File Project Marker.
 *
 * @since 0.32.0
 */
export type Lib_IgnoreFiles_LibIgnoreFileProjectMarker = string;

/**
 * Lib - Ignore Files - Get Supported Ignore File Bundles.
 *
 * @since 0.32.0
 */
export type Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_TargetPath = string;

export type Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_Returns = string[];

export type Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_BaseName = string;

export type Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_FileBundles = Record<string, string> | undefined;

/**
 * Lib - Ignore Files - Is Supported Ignore File Config Path.
 *
 * @since 0.32.0
 */
export type Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_ConfigPath = string;

export type Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_Returns = boolean;

export type Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_PathWithoutPrefix = string;

export type Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_PathSegments = string[];

/**
 * Lib - Ignore Files - Render Ignore File.
 *
 * @since 0.32.0
 */
export type Lib_IgnoreFiles_RenderIgnoreFile_TargetPath = string;

export type Lib_IgnoreFiles_RenderIgnoreFile_Entry = Shared_NovaConfig_IgnoreFile;

export type Lib_IgnoreFiles_RenderIgnoreFile_Returns = Promise<string>;

export type Lib_IgnoreFiles_RenderIgnoreFile_BaseName = string;

export type Lib_IgnoreFiles_RenderIgnoreFile_FileBundles = Record<string, string> | undefined;

export type Lib_IgnoreFiles_RenderIgnoreFile_CurrentDirectory = string;

export type Lib_IgnoreFiles_RenderIgnoreFile_TemplateRoot = string;

export type Lib_IgnoreFiles_RenderIgnoreFile_BundleContents = string[];

export type Lib_IgnoreFiles_RenderIgnoreFile_Bundles = Shared_NovaConfig_IgnoreFile_Bundles;

export type Lib_IgnoreFiles_RenderIgnoreFile_TemplateRelativePath = string | undefined;

export type Lib_IgnoreFiles_RenderIgnoreFile_TemplatePath = string;

export type Lib_IgnoreFiles_RenderIgnoreFile_TemplateContent = string;

export type Lib_IgnoreFiles_RenderIgnoreFile_ContentParts = string[];

export type Lib_IgnoreFiles_RenderIgnoreFile_BundleContent = string;

export type Lib_IgnoreFiles_RenderIgnoreFile_Content = string;

export type Lib_IgnoreFiles_RenderIgnoreFile_Patterns = Shared_NovaConfig_IgnoreFile_Patterns;
