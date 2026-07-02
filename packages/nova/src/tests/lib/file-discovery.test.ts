import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  beforeAll,
  describe,
  it,
} from 'vitest';

import { discoverContentFiles } from '../../lib/file-discovery.js';

import type {
  Tests_Lib_FileDiscovery_DiscoverContentFiles_DocsDir,
  Tests_Lib_FileDiscovery_DiscoverContentFiles_NestedDir,
  Tests_Lib_FileDiscovery_DiscoverContentFiles_RecursesIntoNestedDirectories_NestedFiles,
  Tests_Lib_FileDiscovery_DiscoverContentFiles_ReturnsOnlyFilesWithTheMatchingExtensions_FilteredFiles,
  Tests_Lib_FileDiscovery_DiscoverContentFiles_Root,
  Tests_Lib_FileDiscovery_DiscoverContentFiles_SkipsAMissingDirectoryWithoutThrowing_MissingFiles,
} from '../../types/tests/lib/file-discovery.test.d.ts';

/**
 * Tests - Lib - File Discovery - Discover Content Files.
 *
 * @since 0.19.0
 */
describe('discoverContentFiles', async () => {
  const root: Tests_Lib_FileDiscovery_DiscoverContentFiles_Root = await mkdtemp(join(tmpdir(), 'nova-file-discovery-'));

  beforeAll(async () => {
    const docsDir: Tests_Lib_FileDiscovery_DiscoverContentFiles_DocsDir = join(root, 'docs');
    const nestedDir: Tests_Lib_FileDiscovery_DiscoverContentFiles_NestedDir = join(root, 'docs', 'nested');

    await mkdir(docsDir, { recursive: true });
    await mkdir(nestedDir, { recursive: true });

    await Promise.all([
      writeFile(join(docsDir, 'one.md'), '# One', 'utf-8'),
      writeFile(join(docsDir, 'two.mdx'), '# Two', 'utf-8'),
      writeFile(join(docsDir, 'note.txt'), 'plain', 'utf-8'),
      writeFile(join(nestedDir, 'deep.md'), '# Deep', 'utf-8'),
    ]);

    return;
  });

  afterAll(async () => {
    await rm(root, {
      recursive: true, force: true,
    });

    return;
  });

  it('returns only files with the matching extensions', async () => {
    const filteredFiles: Tests_Lib_FileDiscovery_DiscoverContentFiles_ReturnsOnlyFilesWithTheMatchingExtensions_FilteredFiles = await discoverContentFiles({
      rootDir: root,
      contentDirs: ['docs'],
      fileExtensions: [
        '.md',
        '.mdx',
      ],
    });

    strictEqual(filteredFiles.includes(join('docs', 'one.md')), true);
    strictEqual(filteredFiles.includes(join('docs', 'two.mdx')), true);
    strictEqual(filteredFiles.includes(join('docs', 'note.txt')), false);

    return;
  });

  it('recurses into nested directories', async () => {
    const nestedFiles: Tests_Lib_FileDiscovery_DiscoverContentFiles_RecursesIntoNestedDirectories_NestedFiles = await discoverContentFiles({
      rootDir: root,
      contentDirs: ['docs'],
      fileExtensions: [
        '.md',
        '.mdx',
      ],
    });

    strictEqual(nestedFiles.includes(join('docs', 'nested', 'deep.md')), true);

    return;
  });

  it('skips a missing directory without throwing', async () => {
    const missingFiles: Tests_Lib_FileDiscovery_DiscoverContentFiles_SkipsAMissingDirectoryWithoutThrowing_MissingFiles = await discoverContentFiles({
      rootDir: root,
      contentDirs: [
        'docs',
        'blog',
      ],
      fileExtensions: [
        '.md',
        '.mdx',
      ],
    });

    strictEqual(missingFiles.includes(join('docs', 'one.md')), true);
    strictEqual(missingFiles.some((missingFile) => missingFile.startsWith('blog')), false);

    return;
  });

  return;
});
