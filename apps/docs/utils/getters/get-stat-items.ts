import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { logger } from '@docusaurus/logger';

import type {
  GettersGetStatItemsCountFilesBasePath,
  GettersGetStatItemsCountFilesCount,
  GettersGetStatItemsCountFilesEntries,
  GettersGetStatItemsCountFilesEntryName,
  GettersGetStatItemsCountFilesExtensions,
  GettersGetStatItemsCountFilesReturns,
  GettersGetStatItemsFetchStatItemsNovaSourcePath,
  GettersGetStatItemsFetchStatItemsReturns,
} from '../types/getters/get-stat-items.d.ts';

/**
 * Getters - Get Stat Items - Count Files.
 *
 * Recursively counts files matching the given extensions inside a directory,
 * excluding index files so only individual feature files are tallied.
 *
 * @param {GettersGetStatItemsCountFilesBasePath}   basePath   - Base path.
 * @param {GettersGetStatItemsCountFilesExtensions} extensions - Extensions.
 *
 * @returns {GettersGetStatItemsCountFilesReturns}
 *
 * @since 0.15.0
 */
function countFiles(basePath: GettersGetStatItemsCountFilesBasePath, extensions: GettersGetStatItemsCountFilesExtensions): GettersGetStatItemsCountFilesReturns {
  let count: GettersGetStatItemsCountFilesCount = 0;

  const entries: GettersGetStatItemsCountFilesEntries = readdirSync(basePath, {
    withFileTypes: true,
    recursive: true,
  });

  for (const entry of entries) {
    if (entry.isFile() === false) {
      continue;
    }

    const entryName: GettersGetStatItemsCountFilesEntryName = entry.name;

    // Skip index files.
    if (entryName.startsWith('index.') === true) {
      continue;
    }

    // Count files that match any of the given extensions.
    if (extensions.some((extension) => entryName.endsWith(extension)) === true) {
      count += 1;
    }
  }

  return count;
}

/**
 * Getters - Get Stat Items - Fetch Stat Items.
 *
 * Counts rules, presets, recipes, and scaffolds from the nova package source
 * tree and returns stat items for the landing page numbers strip.
 *
 * @returns {GettersGetStatItemsFetchStatItemsReturns}
 *
 * @since 0.15.0
 */
export function fetchStatItems(): GettersGetStatItemsFetchStatItemsReturns {
  const novaSourcePath: GettersGetStatItemsFetchStatItemsNovaSourcePath = resolve(process.cwd(), '../../packages/nova/src');

  logger.info(logger.interpolate`Counting stat items from ${logger.path(novaSourcePath)}...`);

  return [
    {
      value: String(countFiles(resolve(novaSourcePath, 'rules'), ['.ts'])),
      label: 'Custom lint rules',
      color: 'primary',
    },
    {
      value: String(countFiles(resolve(novaSourcePath, 'presets'), [
        '.mjs',
        '.json',
      ])),
      label: 'Config presets',
      color: 'accent',
    },
    {
      value: String(countFiles(resolve(novaSourcePath, 'cli/recipe'), ['.ts'])),
      label: 'Project recipes',
      color: 'primary',
    },
    {
      value: String(countFiles(resolve(novaSourcePath, 'cli/scaffold'), ['.ts'])),
      label: 'Project scaffolds',
      color: 'accent',
    },
  ];
}
