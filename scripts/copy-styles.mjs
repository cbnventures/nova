import chokidar from 'chokidar';
import { cp, mkdir, rename, rm, stat } from 'fs/promises';
import { dirname, relative, resolve } from 'path';

/**
 * Copy `src/styles/` -> `build/src/styles/` for the docusaurus-preset-nova
 * package. Two modes:
 *
 *   - one-shot (default): atomic full-tree copy via a staging dir, used by
 *     `build:copy-styles` during production builds. Webpack watchers reading
 *     during the swap window always see one of two complete dir states -
 *     never a partial one.
 *
 *   - --watch: does an initial one-shot copy, then watches `src/styles/` with
 *     chokidar and applies per-file incremental updates so dev demos see CSS
 *     edits without a manual rebuild. Used by `dev:watch-styles`.
 *
 * Cross-platform via `fs/promises` (Node 16.7+); engines pin is `^20 || ^22 || ^24`.
 */

const SRC = resolve('./src/styles');
const DEST = resolve('./build/src/styles');
const STAGING = resolve('./build/src/.styles-new');
const BACKUP = resolve('./build/src/.styles-old');

const WATCH_MODE = process.argv.includes('--watch');

async function exists(path) {
  return stat(path).then(() => true).catch(() => false);
}

async function oneShotCopy() {
  // Clean any leftover staging or backup from a prior failure.
  await rm(STAGING, { recursive: true, force: true });
  await rm(BACKUP, { recursive: true, force: true });

  // Ensure build/src/ exists so the renames below have a destination.
  await mkdir(resolve('./build/src'), { recursive: true });

  // Copy the source tree into staging. Target is untouched during this step.
  await cp(SRC, STAGING, { recursive: true });

  // Atomic swap: target -> backup, then staging -> target.
  if (await exists(DEST)) {
    await rename(DEST, BACKUP);
  }
  await rename(STAGING, DEST);

  // Remove the old backup. Failure here doesn't affect correctness.
  await rm(BACKUP, { recursive: true, force: true });
}

function destOf(srcPath) {
  return resolve(DEST, relative(SRC, srcPath));
}

function log(action, srcPath) {
  console.log(`[copy-styles:watch] ${action}: ${relative(SRC, srcPath) || '.'}`);
}

async function startWatcher() {
  const watcher = chokidar.watch(SRC, { ignoreInitial: true });

  watcher.on('add', async (path) => {
    const target = destOf(path);
    await mkdir(dirname(target), { recursive: true });
    await cp(path, target);
    log('add', path);
  });

  watcher.on('change', async (path) => {
    const target = destOf(path);
    await cp(path, target);
    log('change', path);
  });

  watcher.on('unlink', async (path) => {
    const target = destOf(path);
    await rm(target, { force: true });
    log('unlink', path);
  });

  watcher.on('addDir', async (path) => {
    if (path === SRC) return;
    const target = destOf(path);
    await mkdir(target, { recursive: true });
    log('addDir', path);
  });

  watcher.on('unlinkDir', async (path) => {
    const target = destOf(path);
    await rm(target, { recursive: true, force: true });
    log('unlinkDir', path);
  });

  watcher.on('error', (err) => {
    console.error('[copy-styles:watch] error:', err);
  });

  watcher.on('ready', () => {
    console.log(`[copy-styles:watch] ready - watching ${relative(process.cwd(), SRC)}`);
  });
}

async function run() {
  await oneShotCopy();

  if (WATCH_MODE) {
    await startWatcher();
  }
}

run().catch((err) => {
  console.error(WATCH_MODE ? 'dev:watch-styles failed:' : 'build:copy-styles failed:', err);
  process.exit(1);
});
