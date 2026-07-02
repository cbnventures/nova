import { ok, strictEqual } from 'node:assert/strict';
import {
  mkdirSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, it } from 'vitest';

import { findOversizedFiles } from '../lib/bundle-size.js';

import type {
  Tests_BundleSize_FindOversizedFiles_ReturnsOversizedJsFilesRecursively_Directory,
  Tests_BundleSize_FindOversizedFiles_ReturnsOversizedJsFilesRecursively_Large,
  Tests_BundleSize_FindOversizedFiles_ReturnsOversizedJsFilesRecursively_Oversized,
  Tests_BundleSize_FindOversizedFiles_ReturnsOversizedJsFilesRecursively_Small,
} from '../types/tests/bundle-size.test.d.ts';

/**
 * Tests - Bundle Size - Find Oversized Files.
 *
 * @since 0.19.0
 */
describe('findOversizedFiles', async () => {
  it('returns oversized js files recursively', () => {
    const directory: Tests_BundleSize_FindOversizedFiles_ReturnsOversizedJsFilesRecursively_Directory = mkdtempSync(join(tmpdir(), 'nova-bundle-'));
    const small: Tests_BundleSize_FindOversizedFiles_ReturnsOversizedJsFilesRecursively_Small = 'a'.repeat(50);
    const large: Tests_BundleSize_FindOversizedFiles_ReturnsOversizedJsFilesRecursively_Large = 'a'.repeat(500);

    writeFileSync(join(directory, 'small.js'), small, 'utf-8');
    writeFileSync(join(directory, 'large.js'), large, 'utf-8');
    writeFileSync(join(directory, 'large.css'), large, 'utf-8');
    writeFileSync(join(directory, 'large.js.map'), large, 'utf-8');

    mkdirSync(join(directory, 'nested'), { recursive: true });

    writeFileSync(join(directory, 'nested', 'chunk.js'), large, 'utf-8');

    const oversized: Tests_BundleSize_FindOversizedFiles_ReturnsOversizedJsFilesRecursively_Oversized = findOversizedFiles(directory, 100);

    strictEqual(oversized.length, 2);
    ok(oversized.some((file) => file.endsWith('large.js')), 'expected the oversized top-level bundle to be flagged');
    ok(oversized.some((file) => file.endsWith(join('nested', 'chunk.js'))), 'expected the oversized nested chunk to be flagged');

    rmSync(directory, {
      recursive: true,
      force: true,
    });

    return;
  });

  return;
});
