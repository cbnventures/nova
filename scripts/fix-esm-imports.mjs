import {
  existsSync, readFileSync, watch, writeFileSync,
} from 'fs';
import { dirname, resolve } from 'path';

// Replace TypeScript-compiled CommonJS dynamic imports with native ESM imports.
// TypeScript can transform `await import("shiki")` into
// `Promise.resolve().then(() => __importStar(require("shiki")))`,
// which fails at runtime because shiki is an ESM-only package.
const file = resolve('build/src/lib/rehype-shiki.js');
const fileDir = dirname(file);
const isWatch = process.argv.includes('--watch');

/**
 * Rewrite CJS dynamic imports to native ESM imports.
 */
function run() {
  if (existsSync(file) === false) {
    return;
  }

  const original = readFileSync(file, 'utf-8');

  const rewritten = original.replace(
    /Promise\.resolve\(\)\.then\(\(\) => __importStar\(require\(.shiki.\)\)\)/g,
    'import("shiki")',
  );

  if (rewritten !== original) {
    writeFileSync(file, rewritten, 'utf-8');
  }
}

/**
 * Wait for a directory to exist, then call the callback.
 */
function waitForDirectory(dir, callback) {
  if (existsSync(dir) === true) {
    callback();
    return;
  }

  const parentDir = dirname(dir);
  const targetName = dir.split('/').pop();
  const parentWatcher = watch(parentDir, (event, filename) => {
    if (filename === targetName && existsSync(dir) === true) {
      parentWatcher.close();
      callback();
    }
  });
}

// Run once.
run();

// Watch mode: wait for target dir, then re-run when file changes.
if (isWatch === true) {
  let timeout;

  waitForDirectory(fileDir, () => {
    run();

    watch(fileDir, { recursive: false }, (event, filename) => {
      if (filename === 'rehype-shiki.js') {
        clearTimeout(timeout);
        timeout = setTimeout(run, 200);
      }
    });
  });
}
