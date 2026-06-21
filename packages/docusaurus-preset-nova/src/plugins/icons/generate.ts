import {
  existsSync, readdirSync, readFileSync, statSync,
} from 'node:fs';
import { dirname, extname, join } from 'node:path';

import { Logger } from '@cbnventures/nova/toolkit';

import { LIB_REGEX_ICON_CANDIDATE } from '../../lib/regex.js';
import { iconBaseSet } from './base-set.js';

import type {
  Plugins_Icons_Generate_BuildModuleSource_Collection,
  Plugins_Icons_Generate_BuildModuleSource_Lines,
  Plugins_Icons_Generate_BuildModuleSource_LoadedCollections,
  Plugins_Icons_Generate_BuildModuleSource_Prefixes,
  Plugins_Icons_Generate_BuildModuleSource_Returns,
  Plugins_Icons_Generate_BuildModuleSource_Slice,
  Plugins_Icons_Generate_BuildModuleSource_Slices,
  Plugins_Icons_Generate_BuildSlicedCollection_Aliases,
  Plugins_Icons_Generate_BuildSlicedCollection_AliasNames,
  Plugins_Icons_Generate_BuildSlicedCollection_Collection,
  Plugins_Icons_Generate_BuildSlicedCollection_CollectionAliases,
  Plugins_Icons_Generate_BuildSlicedCollection_IconNames,
  Plugins_Icons_Generate_BuildSlicedCollection_Icons,
  Plugins_Icons_Generate_BuildSlicedCollection_Prefix,
  Plugins_Icons_Generate_BuildSlicedCollection_Returns,
  Plugins_Icons_Generate_BuildSlicedCollection_Slice,
  Plugins_Icons_Generate_BuildSlicedCollection_Sliced,
  Plugins_Icons_Generate_CollectCandidates_Candidates,
  Plugins_Icons_Generate_CollectCandidates_Returns,
  Plugins_Icons_Generate_CollectCandidates_Safelist,
  Plugins_Icons_Generate_CollectCandidates_SiteDir,
  Plugins_Icons_Generate_CollectCandidates_ThemeConfig,
  Plugins_Icons_Generate_CollectContentCandidates_DirectoryPath,
  Plugins_Icons_Generate_CollectContentCandidates_FilePaths,
  Plugins_Icons_Generate_CollectContentCandidates_Results,
  Plugins_Icons_Generate_CollectContentCandidates_Returns,
  Plugins_Icons_Generate_CollectContentCandidates_SiteDir,
  Plugins_Icons_Generate_CollectContentCandidates_Text,
  Plugins_Icons_Generate_CollectThemeConfigCandidates_Items,
  Plugins_Icons_Generate_CollectThemeConfigCandidates_Record,
  Plugins_Icons_Generate_CollectThemeConfigCandidates_Results,
  Plugins_Icons_Generate_CollectThemeConfigCandidates_Returns,
  Plugins_Icons_Generate_CollectThemeConfigCandidates_Value,
  Plugins_Icons_Generate_CollectThemeConfigCandidates_Values,
  Plugins_Icons_Generate_ExtractCandidatesFromText_Matches,
  Plugins_Icons_Generate_ExtractCandidatesFromText_Pattern,
  Plugins_Icons_Generate_ExtractCandidatesFromText_Results,
  Plugins_Icons_Generate_ExtractCandidatesFromText_Returns,
  Plugins_Icons_Generate_ExtractCandidatesFromText_Text,
  Plugins_Icons_Generate_GenerateIconModule_Candidates,
  Plugins_Icons_Generate_GenerateIconModule_Collection,
  Plugins_Icons_Generate_GenerateIconModule_CollectionsIndex,
  Plugins_Icons_Generate_GenerateIconModule_ColonIndex,
  Plugins_Icons_Generate_GenerateIconModule_LoadedCollections,
  Plugins_Icons_Generate_GenerateIconModule_Name,
  Plugins_Icons_Generate_GenerateIconModule_Options,
  Plugins_Icons_Generate_GenerateIconModule_Prefix,
  Plugins_Icons_Generate_GenerateIconModule_Resolved,
  Plugins_Icons_Generate_GenerateIconModule_Returns,
  Plugins_Icons_Generate_GenerateIconModule_Slices,
  Plugins_Icons_Generate_GenerateIconModule_UniqueCandidates,
  Plugins_Icons_Generate_GenerateIconModule_Unresolved,
  Plugins_Icons_Generate_GetIconifyPackageDirectory_Returns,
  Plugins_Icons_Generate_GetOrCreateSlice_Existing,
  Plugins_Icons_Generate_GetOrCreateSlice_Prefix,
  Plugins_Icons_Generate_GetOrCreateSlice_Returns,
  Plugins_Icons_Generate_GetOrCreateSlice_Slice,
  Plugins_Icons_Generate_GetOrCreateSlice_Slices,
  Plugins_Icons_Generate_LoadCollection_Collection,
  Plugins_Icons_Generate_LoadCollection_CollectionPath,
  Plugins_Icons_Generate_LoadCollection_LoadedCollections,
  Plugins_Icons_Generate_LoadCollection_Prefix,
  Plugins_Icons_Generate_LoadCollection_Raw,
  Plugins_Icons_Generate_LoadCollection_Returns,
  Plugins_Icons_Generate_LoadCollectionsIndex_IndexPath,
  Plugins_Icons_Generate_LoadCollectionsIndex_Raw,
  Plugins_Icons_Generate_LoadCollectionsIndex_Returns,
  Plugins_Icons_Generate_ResolveName_AliasEntry,
  Plugins_Icons_Generate_ResolveName_Aliases,
  Plugins_Icons_Generate_ResolveName_Collection,
  Plugins_Icons_Generate_ResolveName_Name,
  Plugins_Icons_Generate_ResolveName_Returns,
  Plugins_Icons_Generate_ResolveName_Slice,
  Plugins_Icons_Generate_WalkDirectory_Directory,
  Plugins_Icons_Generate_WalkDirectory_EntryPath,
  Plugins_Icons_Generate_WalkDirectory_Names,
  Plugins_Icons_Generate_WalkDirectory_Results,
  Plugins_Icons_Generate_WalkDirectory_Returns,
  Plugins_Icons_Generate_WalkDirectory_Stats,
} from '../../types/plugins/icons/generate.d.ts';

const scanDirectories = [
  'docs',
  'blog',
  'src',
];

const scanExtensions = [
  '.md',
  '.mdx',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
];

/**
 * Plugins - Icons - Generate - Icon Module.
 *
 * Collects every Iconify identifier a site references, resolves each against
 * the complete Iconify dataset, and returns a client module source that
 * registers only the icons actually used.
 *
 * @param {Plugins_Icons_Generate_GenerateIconModule_Options} options - Options.
 *
 * @returns {Plugins_Icons_Generate_GenerateIconModule_Returns}
 *
 * @since 0.18.1
 */
export function generateIconModule(options: Plugins_Icons_Generate_GenerateIconModule_Options): Plugins_Icons_Generate_GenerateIconModule_Returns {
  const candidates: Plugins_Icons_Generate_GenerateIconModule_Candidates = collectCandidates(options['siteDir'], options['themeConfig'], options['safelist']);
  const uniqueCandidates: Plugins_Icons_Generate_GenerateIconModule_UniqueCandidates = Array.from(new Set(candidates));
  const collectionsIndex: Plugins_Icons_Generate_GenerateIconModule_CollectionsIndex = loadCollectionsIndex();
  const loadedCollections: Plugins_Icons_Generate_GenerateIconModule_LoadedCollections = new Map();
  const slices: Plugins_Icons_Generate_GenerateIconModule_Slices = new Map();
  const unresolved: Plugins_Icons_Generate_GenerateIconModule_Unresolved = [];

  for (const candidate of uniqueCandidates) {
    const colonIndex: Plugins_Icons_Generate_GenerateIconModule_ColonIndex = candidate.indexOf(':');

    if (colonIndex === -1) {
      continue;
    }

    const prefix: Plugins_Icons_Generate_GenerateIconModule_Prefix = candidate.slice(0, colonIndex);
    const name: Plugins_Icons_Generate_GenerateIconModule_Name = candidate.slice(colonIndex + 1);

    if (collectionsIndex[prefix] === undefined) {
      continue;
    }

    const collection: Plugins_Icons_Generate_GenerateIconModule_Collection = loadCollection(prefix, loadedCollections);

    if (collection === undefined) {
      continue;
    }

    const resolved: Plugins_Icons_Generate_GenerateIconModule_Resolved = resolveName(collection, name, getOrCreateSlice(slices, prefix));

    if (resolved === false) {
      unresolved.push(candidate);
    }
  }

  if (unresolved.length > 0) {
    Logger.warn(`docusaurus-preset-nova: skipped ${unresolved.length} unresolved icon identifier(s) (likely typos or dynamically built names — add them to the iconSafelist preset option if intentional): ${unresolved.sort().join(', ')}`);
  }

  return buildModuleSource(slices, loadedCollections);
}

/**
 * Plugins - Icons - Generate - Collect Candidates.
 *
 * Merges the preset base set, the safelist, theme configuration icons, and
 * content-scanned icons into a single candidate list before validation.
 *
 * @param {Plugins_Icons_Generate_CollectCandidates_SiteDir}     siteDir     - Site dir.
 * @param {Plugins_Icons_Generate_CollectCandidates_ThemeConfig} themeConfig - Theme config.
 * @param {Plugins_Icons_Generate_CollectCandidates_Safelist}    safelist    - Safelist.
 *
 * @returns {Plugins_Icons_Generate_CollectCandidates_Returns}
 *
 * @since 0.18.1
 */
function collectCandidates(siteDir: Plugins_Icons_Generate_CollectCandidates_SiteDir, themeConfig: Plugins_Icons_Generate_CollectCandidates_ThemeConfig, safelist: Plugins_Icons_Generate_CollectCandidates_Safelist): Plugins_Icons_Generate_CollectCandidates_Returns {
  const candidates: Plugins_Icons_Generate_CollectCandidates_Candidates = [];

  candidates.push(...iconBaseSet);
  candidates.push(...safelist);
  candidates.push(...collectThemeConfigCandidates(themeConfig));
  candidates.push(...collectContentCandidates(siteDir));

  return candidates;
}

/**
 * Plugins - Icons - Generate - Collect Theme Config Candidates.
 *
 * Walks the resolved theme configuration recursively and extracts every
 * Iconify identifier found in its string values.
 *
 * @param {Plugins_Icons_Generate_CollectThemeConfigCandidates_Value} value - Value.
 *
 * @returns {Plugins_Icons_Generate_CollectThemeConfigCandidates_Returns}
 *
 * @since 0.18.1
 */
function collectThemeConfigCandidates(value: Plugins_Icons_Generate_CollectThemeConfigCandidates_Value): Plugins_Icons_Generate_CollectThemeConfigCandidates_Returns {
  const results: Plugins_Icons_Generate_CollectThemeConfigCandidates_Results = [];

  if (typeof value === 'string') {
    results.push(...extractCandidatesFromText(value));

    return results;
  }

  if (Array.isArray(value) === true) {
    const items: Plugins_Icons_Generate_CollectThemeConfigCandidates_Items = value;

    for (const item of items) {
      results.push(...collectThemeConfigCandidates(item));
    }

    return results;
  }

  if (typeof value === 'object' && value !== null) {
    const values: Plugins_Icons_Generate_CollectThemeConfigCandidates_Values = Object.values(value as Plugins_Icons_Generate_CollectThemeConfigCandidates_Record);

    for (const item of values) {
      results.push(...collectThemeConfigCandidates(item));
    }

    return results;
  }

  return results;
}

/**
 * Plugins - Icons - Generate - Extract Candidates From Text.
 *
 * Runs the shared icon-candidate pattern globally over a block of text and
 * returns every matched `prefix:name` identifier.
 *
 * @param {Plugins_Icons_Generate_ExtractCandidatesFromText_Text} text - Text.
 *
 * @returns {Plugins_Icons_Generate_ExtractCandidatesFromText_Returns}
 *
 * @since 0.18.1
 */
function extractCandidatesFromText(text: Plugins_Icons_Generate_ExtractCandidatesFromText_Text): Plugins_Icons_Generate_ExtractCandidatesFromText_Returns {
  const pattern: Plugins_Icons_Generate_ExtractCandidatesFromText_Pattern = new RegExp(LIB_REGEX_ICON_CANDIDATE.source, 'g');
  const results: Plugins_Icons_Generate_ExtractCandidatesFromText_Results = [];
  const matches: Plugins_Icons_Generate_ExtractCandidatesFromText_Matches = text.matchAll(pattern);

  for (const match of matches) {
    results.push(match[0]);
  }

  return results;
}

/**
 * Plugins - Icons - Generate - Collect Content Candidates.
 *
 * Walks the site's docs, blog, and source directories and extracts every
 * Iconify identifier referenced in their markdown and source files.
 *
 * @param {Plugins_Icons_Generate_CollectContentCandidates_SiteDir} siteDir - Site dir.
 *
 * @returns {Plugins_Icons_Generate_CollectContentCandidates_Returns}
 *
 * @since 0.18.1
 */
function collectContentCandidates(siteDir: Plugins_Icons_Generate_CollectContentCandidates_SiteDir): Plugins_Icons_Generate_CollectContentCandidates_Returns {
  const results: Plugins_Icons_Generate_CollectContentCandidates_Results = [];

  for (const directory of scanDirectories) {
    const directoryPath: Plugins_Icons_Generate_CollectContentCandidates_DirectoryPath = join(siteDir, directory);

    if (existsSync(directoryPath) === false) {
      continue;
    }

    const filePaths: Plugins_Icons_Generate_CollectContentCandidates_FilePaths = walkDirectory(directoryPath);

    for (const filePath of filePaths) {
      const text: Plugins_Icons_Generate_CollectContentCandidates_Text = readFileSync(filePath, 'utf-8');

      results.push(...extractCandidatesFromText(text));
    }
  }

  return results;
}

/**
 * Plugins - Icons - Generate - Walk Directory.
 *
 * Recursively lists every scannable markdown and source file under a
 * directory so its content can be searched for icon identifiers.
 *
 * @param {Plugins_Icons_Generate_WalkDirectory_Directory} directory - Directory.
 *
 * @returns {Plugins_Icons_Generate_WalkDirectory_Returns}
 *
 * @since 0.18.1
 */
function walkDirectory(directory: Plugins_Icons_Generate_WalkDirectory_Directory): Plugins_Icons_Generate_WalkDirectory_Returns {
  const results: Plugins_Icons_Generate_WalkDirectory_Results = [];
  const names: Plugins_Icons_Generate_WalkDirectory_Names = readdirSync(directory);

  for (const name of names) {
    const entryPath: Plugins_Icons_Generate_WalkDirectory_EntryPath = join(directory, name);
    const stats: Plugins_Icons_Generate_WalkDirectory_Stats = statSync(entryPath);

    if (stats.isDirectory() === true) {
      results.push(...walkDirectory(entryPath));

      continue;
    }

    if (scanExtensions.includes(extname(name)) === true) {
      results.push(entryPath);
    }
  }

  return results;
}

/**
 * Plugins - Icons - Generate - Get Iconify Package Directory.
 *
 * Resolves the on-disk location of the build-time-only `@iconify/json` dataset
 * so its collection files can be read and sliced.
 *
 * @returns {Plugins_Icons_Generate_GetIconifyPackageDirectory_Returns}
 *
 * @since 0.18.1
 */
function getIconifyPackageDirectory(): Plugins_Icons_Generate_GetIconifyPackageDirectory_Returns {
  return dirname(require.resolve('@iconify/json/package.json'));
}

/**
 * Plugins - Icons - Generate - Load Collections Index.
 *
 * Reads the `@iconify/json` collections index, used to confirm a candidate's
 * prefix is a real Iconify collection before attempting to resolve it.
 *
 * @returns {Plugins_Icons_Generate_LoadCollectionsIndex_Returns}
 *
 * @since 0.18.1
 */
function loadCollectionsIndex(): Plugins_Icons_Generate_LoadCollectionsIndex_Returns {
  const indexPath: Plugins_Icons_Generate_LoadCollectionsIndex_IndexPath = join(getIconifyPackageDirectory(), 'collections.json');
  const raw: Plugins_Icons_Generate_LoadCollectionsIndex_Raw = readFileSync(indexPath, 'utf-8');

  return JSON.parse(raw) as Plugins_Icons_Generate_LoadCollectionsIndex_Returns;
}

/**
 * Plugins - Icons - Generate - Load Collection.
 *
 * Reads and caches a single Iconify collection's icon data from the dataset,
 * returning undefined when the collection file does not exist.
 *
 * @param {Plugins_Icons_Generate_LoadCollection_Prefix}            prefix            - Prefix.
 * @param {Plugins_Icons_Generate_LoadCollection_LoadedCollections} loadedCollections - Loaded collections.
 *
 * @returns {Plugins_Icons_Generate_LoadCollection_Returns}
 *
 * @since 0.18.1
 */
function loadCollection(prefix: Plugins_Icons_Generate_LoadCollection_Prefix, loadedCollections: Plugins_Icons_Generate_LoadCollection_LoadedCollections): Plugins_Icons_Generate_LoadCollection_Returns {
  if (loadedCollections.has(prefix) === true) {
    return loadedCollections.get(prefix);
  }

  const collectionPath: Plugins_Icons_Generate_LoadCollection_CollectionPath = join(getIconifyPackageDirectory(), 'json', `${prefix}.json`);

  if (existsSync(collectionPath) === false) {
    loadedCollections.set(prefix, undefined);

    return undefined;
  }

  const raw: Plugins_Icons_Generate_LoadCollection_Raw = readFileSync(collectionPath, 'utf-8');

  loadedCollections.set(prefix, JSON.parse(raw) as Plugins_Icons_Generate_LoadCollection_Collection);

  return loadedCollections.get(prefix);
}

/**
 * Plugins - Icons - Generate - Get Or Create Slice.
 *
 * Returns the per-prefix slice accumulator for a collection, creating an empty
 * one on first use so resolved icons and aliases can be gathered.
 *
 * @param {Plugins_Icons_Generate_GetOrCreateSlice_Slices} slices - Slices.
 * @param {Plugins_Icons_Generate_GetOrCreateSlice_Prefix} prefix - Prefix.
 *
 * @returns {Plugins_Icons_Generate_GetOrCreateSlice_Returns}
 *
 * @since 0.18.1
 */
function getOrCreateSlice(slices: Plugins_Icons_Generate_GetOrCreateSlice_Slices, prefix: Plugins_Icons_Generate_GetOrCreateSlice_Prefix): Plugins_Icons_Generate_GetOrCreateSlice_Returns {
  const existing: Plugins_Icons_Generate_GetOrCreateSlice_Existing = slices.get(prefix);

  if (existing !== undefined) {
    return existing;
  }

  const slice: Plugins_Icons_Generate_GetOrCreateSlice_Slice = {
    icons: new Set<string>(),
    aliases: new Set<string>(),
  };

  slices.set(prefix, slice);

  return slice;
}

/**
 * Plugins - Icons - Generate - Resolve Name.
 *
 * Resolves an icon name against a collection, following alias chains, and
 * records the icons and aliases needed into the slice. Returns false when the
 * name resolves to neither a direct icon nor an alias.
 *
 * @param {Plugins_Icons_Generate_ResolveName_Collection} collection - Collection.
 * @param {Plugins_Icons_Generate_ResolveName_Name}       name       - Name.
 * @param {Plugins_Icons_Generate_ResolveName_Slice}      slice      - Slice.
 *
 * @returns {Plugins_Icons_Generate_ResolveName_Returns}
 *
 * @since 0.18.1
 */
function resolveName(collection: Plugins_Icons_Generate_ResolveName_Collection, name: Plugins_Icons_Generate_ResolveName_Name, slice: Plugins_Icons_Generate_ResolveName_Slice): Plugins_Icons_Generate_ResolveName_Returns {
  if (collection['icons'][name] !== undefined) {
    slice['icons'].add(name);

    return true;
  }

  const aliases: Plugins_Icons_Generate_ResolveName_Aliases = collection['aliases'];

  if (aliases === undefined) {
    return false;
  }

  const aliasEntry: Plugins_Icons_Generate_ResolveName_AliasEntry = aliases[name];

  if (aliasEntry === undefined) {
    return false;
  }

  if (slice['aliases'].has(name) === true) {
    return true;
  }

  slice['aliases'].add(name);

  return resolveName(collection, aliasEntry['parent'], slice);
}

/**
 * Plugins - Icons - Generate - Build Module Source.
 *
 * Assembles the generated client module source: one `addCollection` call per
 * source collection, each carrying only the sliced icons and aliases.
 *
 * @param {Plugins_Icons_Generate_BuildModuleSource_Slices}            slices            - Slices.
 * @param {Plugins_Icons_Generate_BuildModuleSource_LoadedCollections} loadedCollections - Loaded collections.
 *
 * @returns {Plugins_Icons_Generate_BuildModuleSource_Returns}
 *
 * @since 0.18.1
 */
function buildModuleSource(slices: Plugins_Icons_Generate_BuildModuleSource_Slices, loadedCollections: Plugins_Icons_Generate_BuildModuleSource_LoadedCollections): Plugins_Icons_Generate_BuildModuleSource_Returns {
  const lines: Plugins_Icons_Generate_BuildModuleSource_Lines = [];

  lines.push('import { addCollection } from \'@iconify/react/offline\';');
  lines.push('');

  const prefixes: Plugins_Icons_Generate_BuildModuleSource_Prefixes = Array.from(slices.keys()).sort();

  for (const prefix of prefixes) {
    const slice: Plugins_Icons_Generate_BuildModuleSource_Slice = slices.get(prefix);
    const collection: Plugins_Icons_Generate_BuildModuleSource_Collection = loadedCollections.get(prefix);

    if (slice === undefined || collection === undefined) {
      continue;
    }

    lines.push(`addCollection(${JSON.stringify(buildSlicedCollection(prefix, slice, collection))});`);
  }

  lines.push('');

  return lines.join('\n');
}

/**
 * Plugins - Icons - Generate - Build Sliced Collection.
 *
 * Builds the minimal Iconify collection object for a prefix, copying only the
 * resolved icon bodies and aliases plus the collection's default dimensions.
 *
 * @param {Plugins_Icons_Generate_BuildSlicedCollection_Prefix}     prefix     - Prefix.
 * @param {Plugins_Icons_Generate_BuildSlicedCollection_Slice}      slice      - Slice.
 * @param {Plugins_Icons_Generate_BuildSlicedCollection_Collection} collection - Collection.
 *
 * @returns {Plugins_Icons_Generate_BuildSlicedCollection_Returns}
 *
 * @since 0.18.1
 */
function buildSlicedCollection(prefix: Plugins_Icons_Generate_BuildSlicedCollection_Prefix, slice: Plugins_Icons_Generate_BuildSlicedCollection_Slice, collection: Plugins_Icons_Generate_BuildSlicedCollection_Collection): Plugins_Icons_Generate_BuildSlicedCollection_Returns {
  const icons: Plugins_Icons_Generate_BuildSlicedCollection_Icons = {};
  const aliases: Plugins_Icons_Generate_BuildSlicedCollection_Aliases = {};
  const collectionAliases: Plugins_Icons_Generate_BuildSlicedCollection_CollectionAliases = collection['aliases'];
  const iconNames: Plugins_Icons_Generate_BuildSlicedCollection_IconNames = Array.from(slice['icons']).sort();
  const aliasNames: Plugins_Icons_Generate_BuildSlicedCollection_AliasNames = Array.from(slice['aliases']).sort();

  for (const name of iconNames) {
    Reflect.set(icons, name, collection['icons'][name]);
  }

  for (const name of aliasNames) {
    if (collectionAliases !== undefined) {
      Reflect.set(aliases, name, collectionAliases[name]);
    }
  }

  const sliced: Plugins_Icons_Generate_BuildSlicedCollection_Sliced = {
    prefix,
    icons,
  };

  if (Object.keys(aliases).length > 0) {
    Reflect.set(sliced, 'aliases', aliases);
  }

  if (collection['width'] !== undefined) {
    Reflect.set(sliced, 'width', collection['width']);
  }

  if (collection['height'] !== undefined) {
    Reflect.set(sliced, 'height', collection['height']);
  }

  return sliced;
}
