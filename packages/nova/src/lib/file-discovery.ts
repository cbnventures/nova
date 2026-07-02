import { readdir } from 'node:fs/promises';
import {
  extname,
  join,
  resolve,
} from 'node:path';

import type {
  Lib_FileDiscovery_DiscoverContentFiles_ContentDirs,
  Lib_FileDiscovery_DiscoverContentFiles_ContentPath,
  Lib_FileDiscovery_DiscoverContentFiles_Entries,
  Lib_FileDiscovery_DiscoverContentFiles_Ext,
  Lib_FileDiscovery_DiscoverContentFiles_FileExtensions,
  Lib_FileDiscovery_DiscoverContentFiles_MdFiles,
  Lib_FileDiscovery_DiscoverContentFiles_Options,
  Lib_FileDiscovery_DiscoverContentFiles_Returns,
  Lib_FileDiscovery_DiscoverContentFiles_RootDir,
} from '../types/lib/file-discovery.d.ts';

/**
 * Lib - File Discovery - Discover Content Files.
 *
 * Recursively walks each content directory under the root and returns the relative
 * paths (joined with the content directory) of every file whose extension matches.
 * A missing content directory is skipped via the ENOENT guard rather than throwing.
 *
 * @param {Lib_FileDiscovery_DiscoverContentFiles_Options} [options] - Options.
 *
 * @returns {Lib_FileDiscovery_DiscoverContentFiles_Returns}
 *
 * @since 0.20.0
 */
export async function discoverContentFiles(options: Lib_FileDiscovery_DiscoverContentFiles_Options = {}): Lib_FileDiscovery_DiscoverContentFiles_Returns {
  const rootDir: Lib_FileDiscovery_DiscoverContentFiles_RootDir = options['rootDir'] ?? process.cwd();
  const contentDirs: Lib_FileDiscovery_DiscoverContentFiles_ContentDirs = options['contentDirs'] ?? [
    'docs',
    'blog',
  ];
  const fileExtensions: Lib_FileDiscovery_DiscoverContentFiles_FileExtensions = options['fileExtensions'] ?? [
    '.md',
    '.mdx',
  ];
  const mdFiles: Lib_FileDiscovery_DiscoverContentFiles_MdFiles = [];

  for (const contentDir of contentDirs) {
    const contentPath: Lib_FileDiscovery_DiscoverContentFiles_ContentPath = resolve(rootDir, contentDir);
    let entries: Lib_FileDiscovery_DiscoverContentFiles_Entries = [];

    // Skip a missing content directory instead of throwing on ENOENT.
    try {
      entries = await readdir(contentPath, { recursive: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const ext: Lib_FileDiscovery_DiscoverContentFiles_Ext = extname(entry);

      if (fileExtensions.includes(ext) === true) {
        mdFiles.push(join(contentDir, entry));
      }
    }
  }

  return mdFiles;
}
