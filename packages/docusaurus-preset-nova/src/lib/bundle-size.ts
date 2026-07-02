import { readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

import type {
  Lib_BundleSize_FindOversizedFiles_Directory,
  Lib_BundleSize_FindOversizedFiles_EntryPath,
  Lib_BundleSize_FindOversizedFiles_MaxBytes,
  Lib_BundleSize_FindOversizedFiles_Names,
  Lib_BundleSize_FindOversizedFiles_Results,
  Lib_BundleSize_FindOversizedFiles_Returns,
  Lib_BundleSize_FindOversizedFiles_Stats,
} from '../types/lib/bundle-size.d.ts';

/**
 * Lib - Bundle Size - Find Oversized Files.
 *
 * Recursively collects the paths of every JavaScript bundle file under a
 * directory whose size exceeds the given byte limit. Source maps are ignored
 * since they are not served on the critical path.
 *
 * @param {Lib_BundleSize_FindOversizedFiles_Directory} directory - Directory.
 * @param {Lib_BundleSize_FindOversizedFiles_MaxBytes}  maxBytes  - Max bytes.
 *
 * @returns {Lib_BundleSize_FindOversizedFiles_Returns}
 *
 * @since 0.19.0
 */
export function findOversizedFiles(directory: Lib_BundleSize_FindOversizedFiles_Directory, maxBytes: Lib_BundleSize_FindOversizedFiles_MaxBytes): Lib_BundleSize_FindOversizedFiles_Returns {
  const results: Lib_BundleSize_FindOversizedFiles_Results = [];
  const names: Lib_BundleSize_FindOversizedFiles_Names = readdirSync(directory);

  for (const name of names) {
    const entryPath: Lib_BundleSize_FindOversizedFiles_EntryPath = join(directory, name);
    const stats: Lib_BundleSize_FindOversizedFiles_Stats = statSync(entryPath);

    if (stats.isDirectory() === true) {
      results.push(...findOversizedFiles(entryPath, maxBytes));

      continue;
    }

    if (extname(name) === '.js' && stats.size > maxBytes) {
      results.push(entryPath);
    }
  }

  return results;
}
