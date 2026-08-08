import {
  existsSync,
  readFileSync,
  watch,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';

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
 * Fix Shiki Import - File Dir.
 *
 * Directory that contains the compiled module, watched in --watch mode so the
 * rewrite re-applies whenever TypeScript regenerates the file.
 *
 * @since 0.0.0
 */
const fileDir = dirname(file);

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

/**
 * Fix Shiki Import - Wait For Directory.
 *
 * Invokes the callback once the target directory exists, watching the parent
 * directory until it appears so --watch mode can start before the build runs.
 *
 * @param {string}   dir      - Dir.
 * @param {Function} callback - Callback.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function waitForDirectory(dir, callback) {
  if (existsSync(dir) === true) {
    callback();

    return;
  }

  const parentDir = dirname(dir);
  const targetName = dir.split('/').pop();
  const parentWatcher = watch(parentDir, (_event, filename) => {
    if (filename === targetName && existsSync(dir) === true) {
      parentWatcher.close();

      callback();
    }

    return;
  });

  return;
}

// Run once.
run();

// Watch mode: wait for target dir, then re-run when file changes.
if (isWatch === true) {
  let timeout = /** @type {NodeJS.Timeout | undefined} */ (undefined);

  waitForDirectory(fileDir, () => {
    run();

    watch(fileDir, { recursive: false }, (_event, filename) => {
      if (filename === 'rehype-shiki.js') {
        clearTimeout(timeout);
        timeout = setTimeout(run, 200);
      }

      return;
    });

    return;
  });
}
