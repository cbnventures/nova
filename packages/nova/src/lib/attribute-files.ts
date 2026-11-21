import { basename } from 'node:path';

import { LIB_REGEX_PATTERN_WHITESPACE } from './regex.js';

import type {
  Lib_AttributeFiles_GetSupportedAttributeFileBundles_Returns,
  Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_ConfigPath,
  Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_PathSegments,
  Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_Returns,
  Lib_AttributeFiles_LibAttributeFileBundles,
  Lib_AttributeFiles_MergeAttributeLines_Attributes,
  Lib_AttributeFiles_MergeAttributeLines_BundleAttributes,
  Lib_AttributeFiles_MergeAttributeLines_BundleLines,
  Lib_AttributeFiles_MergeAttributeLines_BundleTokens,
  Lib_AttributeFiles_MergeAttributeLines_Conflicts,
  Lib_AttributeFiles_MergeAttributeLines_Entry,
  Lib_AttributeFiles_MergeAttributeLines_Lines,
  Lib_AttributeFiles_MergeAttributeLines_Normalized,
  Lib_AttributeFiles_MergeAttributeLines_Path,
  Lib_AttributeFiles_MergeAttributeLines_PatternTokens,
  Lib_AttributeFiles_MergeAttributeLines_Returns,
  Lib_AttributeFiles_MergeAttributeLines_WhitespacePattern,
  Lib_AttributeFiles_RenderAttributeFile_Entry,
  Lib_AttributeFiles_RenderAttributeFile_Merged,
  Lib_AttributeFiles_RenderAttributeFile_Returns,
  Lib_AttributeFiles_RenderAttributeFile_TargetPath,
} from '../types/lib/attribute-files.d.ts';

/**
 * Lib - Attribute Files - Lib Attribute File Bundles.
 *
 * Maps each Nova-owned bundle to the ".gitattributes" lines it contributes, in order.
 * "docker-scripts" keeps the shell and config files baked into Docker images on LF.
 *
 * @since 0.49.0
 */
const libAttributeFileBundles: Lib_AttributeFiles_LibAttributeFileBundles = {
  'docker-scripts': [
    'rootfs/** text eol=lf',
    'project/** text eol=lf',
    'stages/** text eol=lf',
  ],
};

/**
 * Lib - Attribute Files - Get Supported Attribute File Bundles.
 *
 * Returns the bundle names a ".gitattributes" entry may list. Config parsing checks
 * every entry against this list before any generator writes a file.
 *
 * @returns {Lib_AttributeFiles_GetSupportedAttributeFileBundles_Returns}
 *
 * @since 0.49.0
 */
export function getSupportedAttributeFileBundles(): Lib_AttributeFiles_GetSupportedAttributeFileBundles_Returns {
  return Object.keys(libAttributeFileBundles);
}

/**
 * Lib - Attribute Files - Is Supported Attribute File Config Path.
 *
 * Accepts project-relative paths to ".gitattributes" files while rejecting traversal,
 * Windows separators, and empty path components.
 *
 * @param {Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_ConfigPath} configPath - Config path.
 *
 * @returns {Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_Returns}
 *
 * @since 0.49.0
 */
export function isSupportedAttributeFileConfigPath(configPath: Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_ConfigPath): Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_Returns {
  if (
    configPath.startsWith('./') === false
    || configPath.includes('\\') === true
    || basename(configPath) !== '.gitattributes'
  ) {
    return false;
  }

  const pathSegments: Lib_AttributeFiles_IsSupportedAttributeFileConfigPath_PathSegments = configPath.slice(2).split('/');

  return pathSegments.every((pathSegment) => (
    pathSegment !== ''
    && pathSegment !== '.'
    && pathSegment !== '..'
  ));
}

/**
 * Lib - Attribute Files - Merge Attribute Lines.
 *
 * Puts the bundle lines first and the project patterns after them, dropping repeated
 * lines. A pattern that sets a bundle path to different attributes is a conflict.
 *
 * @param {Lib_AttributeFiles_MergeAttributeLines_Entry} entry - Entry.
 *
 * @returns {Lib_AttributeFiles_MergeAttributeLines_Returns}
 *
 * @since 0.49.0
 */
export function mergeAttributeLines(entry: Lib_AttributeFiles_MergeAttributeLines_Entry): Lib_AttributeFiles_MergeAttributeLines_Returns {
  const whitespacePattern: Lib_AttributeFiles_MergeAttributeLines_WhitespacePattern = new RegExp(LIB_REGEX_PATTERN_WHITESPACE.source, 'g');
  const bundleAttributes: Lib_AttributeFiles_MergeAttributeLines_BundleAttributes = new Map();
  const lines: Lib_AttributeFiles_MergeAttributeLines_Lines = [];
  const conflicts: Lib_AttributeFiles_MergeAttributeLines_Conflicts = [];

  for (const bundle of entry['bundles']) {
    const bundleLines: Lib_AttributeFiles_MergeAttributeLines_BundleLines = libAttributeFileBundles[bundle] ?? [];

    for (const bundleLine of bundleLines) {
      const bundleTokens: Lib_AttributeFiles_MergeAttributeLines_BundleTokens = bundleLine.split(' ');

      bundleAttributes.set(bundleTokens[0] ?? '', bundleTokens.slice(1).join(' '));

      if (lines.includes(bundleLine) === false) {
        lines.push(bundleLine);
      }
    }
  }

  for (const pattern of entry['patterns'] ?? []) {
    const normalized: Lib_AttributeFiles_MergeAttributeLines_Normalized = pattern.trim().replace(whitespacePattern, ' ');
    const patternTokens: Lib_AttributeFiles_MergeAttributeLines_PatternTokens = normalized.split(' ');
    const path: Lib_AttributeFiles_MergeAttributeLines_Path = patternTokens[0] ?? '';
    const attributes: Lib_AttributeFiles_MergeAttributeLines_Attributes = patternTokens.slice(1).join(' ');

    if (
      bundleAttributes.has(path) === true
      && bundleAttributes.get(path) !== attributes
    ) {
      conflicts.push(`The pattern "${normalized}" sets "${path}", which a bundle already sets to "${bundleAttributes.get(path)}". Remove the pattern, or drop the bundle and list every line as a pattern.`);

      continue;
    }

    if (lines.includes(normalized) === false) {
      lines.push(normalized);
    }
  }

  return {
    lines,
    conflicts,
  };
}

/**
 * Lib - Attribute Files - Render Attribute File.
 *
 * Builds the full contents of one ".gitattributes" file from its bundles and patterns.
 * Throws when a pattern conflicts with a bundle, so nothing half-merged is written.
 *
 * @param {Lib_AttributeFiles_RenderAttributeFile_TargetPath} targetPath - Target path.
 * @param {Lib_AttributeFiles_RenderAttributeFile_Entry}      entry      - Entry.
 *
 * @returns {Lib_AttributeFiles_RenderAttributeFile_Returns}
 *
 * @since 0.49.0
 */
export function renderAttributeFile(targetPath: Lib_AttributeFiles_RenderAttributeFile_TargetPath, entry: Lib_AttributeFiles_RenderAttributeFile_Entry): Lib_AttributeFiles_RenderAttributeFile_Returns {
  const merged: Lib_AttributeFiles_RenderAttributeFile_Merged = mergeAttributeLines(entry);

  if (merged['conflicts'].length > 0) {
    throw new Error(`Attribute file "${targetPath}" cannot be generated. ${merged['conflicts'].join(' ')}`);
  }

  return [
    ...merged['lines'],
    '',
  ].join('\n');
}
