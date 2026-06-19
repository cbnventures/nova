import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { logger } from '@docusaurus/logger';

import type {
  Getters_GetStatItems_CountFiles_BasePath,
  Getters_GetStatItems_CountFiles_Count,
  Getters_GetStatItems_CountFiles_Entries,
  Getters_GetStatItems_CountFiles_EntryName,
  Getters_GetStatItems_CountFiles_Extensions,
  Getters_GetStatItems_CountFiles_Returns,
  Getters_GetStatItems_FetchStatItems_NovaSourcePath,
  Getters_GetStatItems_FetchStatItems_Returns,
} from '../types/getters/get-stat-items.d.ts';

/**
 * Getters - Get Stat Items - Count Files.
 *
 * Recursively counts files matching the given extensions inside a directory,
 * excluding index files so only individual feature files are tallied.
 *
 * @param {Getters_GetStatItems_CountFiles_BasePath}   basePath   - Base path.
 * @param {Getters_GetStatItems_CountFiles_Extensions} extensions - Extensions.
 *
 * @returns {Getters_GetStatItems_CountFiles_Returns}
 *
 * @since 0.15.0
 */
function countFiles(basePath: Getters_GetStatItems_CountFiles_BasePath, extensions: Getters_GetStatItems_CountFiles_Extensions): Getters_GetStatItems_CountFiles_Returns {
  let count: Getters_GetStatItems_CountFiles_Count = 0;

  const entries: Getters_GetStatItems_CountFiles_Entries = readdirSync(basePath, {
    withFileTypes: true,
    recursive: true,
  });

  for (const entry of entries) {
    if (entry.isFile() === false) {
      continue;
    }

    const entryName: Getters_GetStatItems_CountFiles_EntryName = entry.name;

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
 * @returns {Getters_GetStatItems_FetchStatItems_Returns}
 *
 * @since 0.15.0
 */
export function fetchStatItems(): Getters_GetStatItems_FetchStatItems_Returns {
  const novaSourcePath: Getters_GetStatItems_FetchStatItems_NovaSourcePath = resolve(process.cwd(), '../../packages/nova/src');

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
