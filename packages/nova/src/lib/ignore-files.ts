import { promises as fs } from 'node:fs';
import {
  basename,
  dirname,
  join,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import type {
  Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_BaseName,
  Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_FileBundles,
  Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_Returns,
  Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_TargetPath,
  Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_ConfigPath,
  Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_PathSegments,
  Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_PathWithoutPrefix,
  Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_Returns,
  Lib_IgnoreFiles_LibIgnoreFileBundleTemplates,
  Lib_IgnoreFiles_LibIgnoreFileProjectMarker,
  Lib_IgnoreFiles_RenderIgnoreFile_BaseName,
  Lib_IgnoreFiles_RenderIgnoreFile_BundleContent,
  Lib_IgnoreFiles_RenderIgnoreFile_BundleContents,
  Lib_IgnoreFiles_RenderIgnoreFile_Bundles,
  Lib_IgnoreFiles_RenderIgnoreFile_Content,
  Lib_IgnoreFiles_RenderIgnoreFile_ContentParts,
  Lib_IgnoreFiles_RenderIgnoreFile_CurrentDirectory,
  Lib_IgnoreFiles_RenderIgnoreFile_Entry,
  Lib_IgnoreFiles_RenderIgnoreFile_FileBundles,
  Lib_IgnoreFiles_RenderIgnoreFile_Patterns,
  Lib_IgnoreFiles_RenderIgnoreFile_Returns,
  Lib_IgnoreFiles_RenderIgnoreFile_TargetPath,
  Lib_IgnoreFiles_RenderIgnoreFile_TemplateContent,
  Lib_IgnoreFiles_RenderIgnoreFile_TemplatePath,
  Lib_IgnoreFiles_RenderIgnoreFile_TemplateRelativePath,
  Lib_IgnoreFiles_RenderIgnoreFile_TemplateRoot,
} from '../types/lib/ignore-files.d.ts';

/**
 * Lib - Ignore Files - Lib Ignore File Bundle Templates.
 *
 * Maps each supported physical ignore file to Nova-owned content bundles. The
 * target basename provides context, so the same bundle name can remain concise.
 *
 * @since 0.32.0
 */
const libIgnoreFileBundleTemplates: Lib_IgnoreFiles_LibIgnoreFileBundleTemplates = {
  '.assetsignore': {
    'cloudflare-astro': 'generators/must-haves/ignore-files/cloudflare-astro.assetsignore',
  },
  '.dockerignore': {
    nova: 'scaffold-options/docker-image/common/dockerignore',
  },
  '.gitignore': {
    nova: 'generators/must-haves/ignore-files/gitignore',
  },
};

/**
 * Lib - Ignore Files - Lib Ignore File Project Marker.
 *
 * Separates Nova-owned bundle content from consumer patterns in every rendered
 * ignore file so configuration import and human review share one boundary.
 *
 * @since 0.32.0
 */
const libIgnoreFileProjectMarker: Lib_IgnoreFiles_LibIgnoreFileProjectMarker = [
  '##########################',
  '#### Project Excludes ####',
  '##########################',
].join('\n');

/**
 * Lib - Ignore Files - Get Supported Ignore File Bundles.
 *
 * Returns the bundle names accepted for the target ignore-file basename. Config
 * parsing consumes this list before any generator attempts filesystem writes.
 *
 * @param {Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_TargetPath} targetPath - Target path.
 *
 * @returns {Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_Returns}
 *
 * @since 0.32.0
 */
export function getSupportedIgnoreFileBundles(targetPath: Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_TargetPath): Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_Returns {
  const baseName: Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_BaseName = basename(targetPath);
  const fileBundles: Lib_IgnoreFiles_GetSupportedIgnoreFileBundles_FileBundles = libIgnoreFileBundleTemplates[baseName];

  return (fileBundles === undefined) ? [] : Object.keys(fileBundles);
}

/**
 * Lib - Ignore Files - Is Supported Ignore File Config Path.
 *
 * Accepts project-relative paths for supported physical ignore files while
 * rejecting traversal, Windows separators, and ambiguous empty components.
 *
 * @param {Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_ConfigPath} configPath - Config path.
 *
 * @returns {Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_Returns}
 *
 * @since 0.32.0
 */
export function isSupportedIgnoreFileConfigPath(configPath: Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_ConfigPath): Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_Returns {
  if (configPath.startsWith('./') === false || configPath.includes('\\') === true) {
    return false;
  }

  if (basename(configPath) === '.dockerignore' && configPath !== './.dockerignore') {
    return false;
  }

  const pathWithoutPrefix: Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_PathWithoutPrefix = configPath.slice(2);
  const pathSegments: Lib_IgnoreFiles_IsSupportedIgnoreFileConfigPath_PathSegments = pathWithoutPrefix.split('/');

  if (
    pathSegments.length === 0
    || pathSegments.some((pathSegment) => (
      pathSegment === ''
      || pathSegment === '.'
      || pathSegment === '..'
    )) === true
  ) {
    return false;
  }

  return getSupportedIgnoreFileBundles(configPath).length > 0;
}

/**
 * Lib - Ignore Files - Render Ignore File.
 *
 * Combines ordered Nova bundle templates with project-owned patterns. Existing
 * bundle markers remain compatible while other file types gain the same section.
 *
 * @param {Lib_IgnoreFiles_RenderIgnoreFile_TargetPath} targetPath - Target path.
 * @param {Lib_IgnoreFiles_RenderIgnoreFile_Entry}      entry      - Entry.
 *
 * @returns {Lib_IgnoreFiles_RenderIgnoreFile_Returns}
 *
 * @since 0.32.0
 */
export async function renderIgnoreFile(targetPath: Lib_IgnoreFiles_RenderIgnoreFile_TargetPath, entry: Lib_IgnoreFiles_RenderIgnoreFile_Entry): Lib_IgnoreFiles_RenderIgnoreFile_Returns {
  const baseName: Lib_IgnoreFiles_RenderIgnoreFile_BaseName = basename(targetPath);
  const fileBundles: Lib_IgnoreFiles_RenderIgnoreFile_FileBundles = libIgnoreFileBundleTemplates[baseName];

  if (fileBundles === undefined) {
    throw new Error(`Unsupported ignore file path "${targetPath}".`);
  }

  const currentDirectory: Lib_IgnoreFiles_RenderIgnoreFile_CurrentDirectory = dirname(fileURLToPath(import.meta.url));
  const templateRoot: Lib_IgnoreFiles_RenderIgnoreFile_TemplateRoot = join(currentDirectory, '..', '..', 'templates');
  const bundleContents: Lib_IgnoreFiles_RenderIgnoreFile_BundleContents = [];
  const bundles: Lib_IgnoreFiles_RenderIgnoreFile_Bundles = entry['bundles'];

  for (const bundle of bundles) {
    const templateRelativePath: Lib_IgnoreFiles_RenderIgnoreFile_TemplateRelativePath = fileBundles[bundle];

    if (templateRelativePath === undefined) {
      throw new Error(`Ignore bundle "${bundle}" is not supported for "${baseName}".`);
    }

    const templatePath: Lib_IgnoreFiles_RenderIgnoreFile_TemplatePath = join(templateRoot, templateRelativePath);
    const templateContent: Lib_IgnoreFiles_RenderIgnoreFile_TemplateContent = await fs.readFile(templatePath, 'utf-8');

    bundleContents.push(templateContent.trimEnd());
  }

  const contentParts: Lib_IgnoreFiles_RenderIgnoreFile_ContentParts = bundleContents.filter((bundleContent) => bundleContent !== '');
  const bundleContent: Lib_IgnoreFiles_RenderIgnoreFile_BundleContent = contentParts.join('\n\n');
  const content: Lib_IgnoreFiles_RenderIgnoreFile_Content = (bundleContent.includes(libIgnoreFileProjectMarker) === true) ? bundleContent : [
    bundleContent,
    libIgnoreFileProjectMarker,
  ].filter((contentPart) => contentPart !== '').join('\n\n');
  const patterns: Lib_IgnoreFiles_RenderIgnoreFile_Patterns = entry['patterns'] ?? [];

  if (patterns.length > 0) {
    return [
      content,
      patterns.join('\n'),
      '',
    ].join('\n');
  }

  return [
    content,
    '',
  ].join('\n');
}
