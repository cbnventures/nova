import {
  existsSync,
  readFileSync,
  watchFile,
  writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';

import { PATTERN_SHIKI_CJS_REQUIRE } from './lib/regex.mjs';

/**
 * Fix Shiki Import - File.
 *
 * Absolute path to the preset's compiled rehype-shiki module, the single file
 * whose CommonJS shiki shim this script rewrites back to a native ESM import.
 *
 * @since 0.0.0
 */
const file = resolve('build/src/lib/rehype-shiki.js');

/**
 * Fix Shiki Import - Is Watch.
 *
 * Whether the script was invoked with --watch, which keeps it resident and
 * re-runs the rewrite on every rebuild instead of patching once and exiting.
 *
 * @since 0.0.0
 */
const isWatch = process.argv.includes('--watch');

/**
 * Fix Shiki Import - Run.
 *
 * Reads the compiled module and rewrites the CommonJS shiki shim to a native
 * import, writing the file back only when the content actually changed.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function run() {
  if (existsSync(file) === false) {
    return;
  }

  const original = readFileSync(file, 'utf-8');

  const rewritten = original.replace(
    new RegExp(PATTERN_SHIKI_CJS_REQUIRE, 'g'),
    'import("shiki")',
  );

  if (rewritten !== original) {
    writeFileSync(file, rewritten, 'utf-8');
  }

  return;
}

// Run once.
run();

// Watch mode: poll the target file so the watcher can start before it exists.
if (isWatch === true) {
  let timeout = /** @type {NodeJS.Timeout | undefined} */ (undefined);

  watchFile(file, { interval: 200 }, () => {
    clearTimeout(timeout);
    timeout = setTimeout(run, 200);

    return;
  });
}
