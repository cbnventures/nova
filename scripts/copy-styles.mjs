import {
  copyFile,
  mkdir,
  readdir,
  rename,
  rm,
  stat,
} from 'node:fs/promises';
import {
  dirname,
  join,
  relative,
  resolve,
} from 'node:path';

import chokidar from 'chokidar';

/**
 * Copy Styles - Src.
 *
 * Absolute path to the preset's source styles tree, resolved from the current
 * working directory so the script works regardless of the invocation cwd.
 *
 * @since 0.0.0
 */
const src = resolve('./src/styles');

/**
 * Copy Styles - Dest.
 *
 * Absolute path to the built styles tree that webpack and the demos read from,
 * kept as a sibling of the source tree under `build/src/`.
 *
 * @since 0.0.0
 */
const dest = resolve('./build/src/styles');

/**
 * Copy Styles - Staging.
 *
 * Scratch directory the source tree is copied into before the atomic swap, so
 * readers never observe a partially written destination.
 *
 * @since 0.0.0
 */
const staging = resolve('./build/src/.styles-new');

/**
 * Copy Styles - Backup.
 *
 * Holds the previous destination during the swap window, letting the rename
 * dance stay atomic before the old tree is discarded.
 *
 * @since 0.0.0
 */
const backup = resolve('./build/src/.styles-old');

/**
 * Copy Styles - Watch Mode.
 *
 * True when invoked with `--watch`, selecting the incremental chokidar path
 * used by `dev:watch-styles` instead of a single one-shot copy.
 *
 * @since 0.0.0
 */
const watchMode = process.argv.includes('--watch');

/**
 * Copy Styles - Exists.
 *
 * Resolves whether a path is present on disk, swallowing the stat rejection so
 * callers can branch without a try/catch.
 *
 * @param {string} path - Path.
 *
 * @returns {Promise<boolean>}
 *
 * @since 0.0.0
 */
async function exists(path) {
  return stat(path).then(() => true).catch(() => false);
}

/**
 * Copy Styles - Copy Dir.
 *
 * Recursively copies a directory tree using only stable fs/promises primitives
 * (readdir + copyFile), so the engines range can stay at `^22` without relying
 * on `cp`, which remains experimental until Node.js 22.3.
 *
 * @param {string} from - From.
 * @param {string} to   - To.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function copyDir(from, to) {
  await mkdir(to, { recursive: true });

  const entries = await readdir(from, { withFileTypes: true });

  await Promise.all(entries.map((entry) => {
    const fromPath = join(from, entry.name);
    const toPath = join(to, entry.name);

    if (entry.isDirectory() === true) {
      return copyDir(fromPath, toPath);
    }

    return copyFile(fromPath, toPath);
  }));

  return;
}

/**
 * Copy Styles - One Shot Copy.
 *
 * Copies the source tree into a staging dir then atomically swaps it into
 * place, so webpack watchers only ever see a complete destination.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function oneShotCopy() {
  // Clean any leftover staging or backup from a prior failure.
  await rm(staging, {
    recursive: true,
    force: true,
  });

  await rm(backup, {
    recursive: true,
    force: true,
  });

  // Ensure build/src/ exists so the renames below have a destination.
  await mkdir(resolve('./build/src'), { recursive: true });

  // Copy the source tree into staging. Target is untouched during this step.
  await copyDir(src, staging);

  // Atomic swap: target -> backup, then staging -> target.
  if (await exists(dest) === true) {
    await rename(dest, backup);
  }

  await rename(staging, dest);

  // Remove the old backup. Failure here doesn't affect correctness.
  await rm(backup, {
    recursive: true,
    force: true,
  });

  return;
}

/**
 * Copy Styles - Dest Of.
 *
 * Maps a source path to its matching destination path by rebasing it from the
 * source tree onto the built tree.
 *
 * @param {string} srcPath - Src path.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
function destOf(srcPath) {
  return resolve(dest, relative(src, srcPath));
}

/**
 * Copy Styles - Log.
 *
 * Writes a single watch-mode line to stdout describing which file changed,
 * normalizing the path to be relative to the source tree.
 *
 * @param {string} action  - Action.
 * @param {string} srcPath - Src path.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function log(action, srcPath) {
  process.stdout.write(`[copy-styles:watch] ${action}: ${relative(src, srcPath) || '.'}\n`);

  return;
}

/**
 * Copy Styles - Start Watcher.
 *
 * Watches the source tree with chokidar and mirrors each add, change, and
 * removal into the built tree so dev demos see edits without a rebuild.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function startWatcher() {
  const watcher = chokidar.watch(src, { ignoreInitial: true });

  watcher.on('add', async (path) => {
    const target = destOf(path);

    await mkdir(dirname(target), { recursive: true });
    await copyFile(path, target);
    log('add', path);

    return;
  });

  watcher.on('change', async (path) => {
    const target = destOf(path);

    await copyFile(path, target);
    log('change', path);

    return;
  });

  watcher.on('unlink', async (path) => {
    const target = destOf(path);

    await rm(target, { force: true });
    log('unlink', path);

    return;
  });

  watcher.on('addDir', async (path) => {
    if (path === src) {
      return;
    }

    const target = destOf(path);

    await mkdir(target, { recursive: true });
    log('addDir', path);

    return;
  });

  watcher.on('unlinkDir', async (path) => {
    const target = destOf(path);

    await rm(target, {
      recursive: true,
      force: true,
    });
    log('unlinkDir', path);

    return;
  });

  watcher.on('error', (err) => {
    process.stderr.write(`[copy-styles:watch] error: ${err}\n`);

    return;
  });

  watcher.on('ready', () => {
    process.stdout.write(`[copy-styles:watch] ready - watching ${relative(process.cwd(), src)}\n`);

    return;
  });

  return;
}

/**
 * Copy Styles - Run.
 *
 * Performs the initial one-shot copy and, in watch mode, hands off to the
 * chokidar watcher for incremental updates.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function run() {
  await oneShotCopy();

  if (watchMode === true) {
    await startWatcher();
  }

  return;
}

run().catch((err) => {
  const failureLabel = (watchMode === true) ? 'dev:watch-styles failed:' : 'build:copy-styles failed:';

  process.stderr.write(`${failureLabel} ${err}\n`);

  return process.exit(1);
});
