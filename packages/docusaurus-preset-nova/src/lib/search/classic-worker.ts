import { Script } from 'node:vm';

import { LIB_REGEX_PATTERN_EXPORT_EMPTY } from '../regex.js';

import type {
  Lib_Search_ClassicWorker_NormalizeClassicWorker_Returns,
  Lib_Search_ClassicWorker_NormalizeClassicWorker_WorkerScript,
  Lib_Search_ClassicWorker_NormalizeClassicWorker_WorkerSource,
} from '../../types/lib/search/classic-worker.d.ts';

/**
 * Lib - Search - Classic Worker - Normalize Classic Worker.
 *
 * Removes TypeScript's empty module marker, then verifies the emitted worker
 * remains valid classic JavaScript before Docusaurus writes the public asset.
 *
 * @param {Lib_Search_ClassicWorker_NormalizeClassicWorker_WorkerSource} workerSource - Worker source.
 *
 * @returns {Lib_Search_ClassicWorker_NormalizeClassicWorker_Returns}
 *
 * @since 0.26.0
 */
export function normalizeClassicWorker(workerSource: Lib_Search_ClassicWorker_NormalizeClassicWorker_WorkerSource): Lib_Search_ClassicWorker_NormalizeClassicWorker_Returns {
  const workerScript: Lib_Search_ClassicWorker_NormalizeClassicWorker_WorkerScript = `${workerSource.replace(new RegExp(LIB_REGEX_PATTERN_EXPORT_EMPTY.source, 'gm'), '').trimEnd()}\n`;

  void new Script(workerScript, {
    filename: 'search-worker.js',
  });

  return workerScript;
}
