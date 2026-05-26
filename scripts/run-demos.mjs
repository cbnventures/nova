#!/usr/bin/env node
/**
 * Run-Demos - Interactive runner for demo workspaces.
 *
 * Usage:
 *   node scripts/run-demos.mjs --mode <mode> [--demos <list>]
 *   node scripts/run-demos.mjs --cleanup
 *
 *   --mode    required for run modes. One of: dev | check | build | prod
 *   --demos   optional. Comma-separated demo names (e.g. envoy,foundry).
 *             Required in non-TTY contexts (CI, piped input).
 *             In TTY, omitting --demos opens an interactive checkbox picker.
 *   --cleanup maintenance mode. Kills all dev/prod processes for any demo
 *             or the docs site, removes a stale pidfile, and purges every
 *             `apps/*\/node_modules/.cache` (webpack persistent cache) to
 *             reclaim disk. Mutually exclusive with --mode and --demos.
 *
 * Demos are auto-discovered from `apps/demo-*`; any new folder is picked up
 * automatically with no edit to this script.
 *
 * Concurrency adapts to host resources:
 *   - dev:   floor((availableMem - 1GB) / 0.5GB), persistent.
 *   - check: cores - 1, one-shot async pool.
 *   - build: floor((availableMem - 2GB) / 2.5GB), one-shot async pool.
 *   - prod:  floor((availableMem - 1.5GB) / 0.15GB), persistent.
 *
 * Prod headroom is lower because `docusaurus serve` is a static file server
 * (~85MB per instance) and doesn't compete with dev/build's webpack workers.
 *
 * Available memory is measured via `vm_stat` on macOS (free + inactive +
 * speculative + purgeable pages — all reclaimable on demand) and falls back
 * to `os.freemem()` on other platforms. `os.freemem()` on macOS would
 * understate by 3+ GB because it excludes cached pages the kernel will
 * reclaim instantly under pressure.
 *
 * Modes:
 *   - dev / prod  - persistent. All selected demos run simultaneously.
 *                   If selection > budget, aborts with a clear message.
 *                   TTY picker enforces the cap inline via a validate callback.
 *   - check / build - one-shot. Async pool of `budget` workers; the script
 *                     waits for all selected demos to finish then exits.
 *
 * Disk gate: if free disk < selectedCount * 3GB on the worktree volume, the
 * script logs a warning and proceeds. (`check` mode skips this check.)
 *
 * Cache auto-purge: before launching dev / build / prod, any selected demo
 * whose `node_modules/.cache` exceeds AUTO_PURGE_THRESHOLD_GB (default 4 GB)
 * is purged automatically. Prevents accumulation toward ENOSPC without
 * sacrificing warm-cache speed for fresh dev sessions. `check` mode skips
 * this (it doesn't touch webpack cache).
 *
 * Stale-process kill: dev / prod modes kill any existing `docusaurus start` /
 * `docusaurus serve` processes for the selected demos before spawning new
 * ones, to free their ports. `check` / `build` skip this step.
 *
 * Single-instance lock: a pidfile at /tmp/run-nova-preset-demos.pid prevents two
 * invocations from stomping each other. Cleaned up on exit.
 *
 * Log capture (persistent modes only): tees multiplexed output to
 * /tmp/run-nova-preset-demos.log so the user can grep after the fact.
 */

import { checkbox } from '@inquirer/prompts';
import chalk from 'chalk';
import { spawn, spawnSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, createWriteStream, unlinkSync, statSync } from 'fs';
import { rm, statfs } from 'fs/promises';
import { availableParallelism, cpus, freemem, totalmem } from 'os';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'util';

/* ============================================================ */
/* Constants                                                    */
/* ============================================================ */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const WORKTREE = resolve(SCRIPT_DIR, '..');
const APPS_DIR = resolve(WORKTREE, 'apps');
const TMP_DIR = '/tmp';
const PIDFILE = resolve(TMP_DIR, 'run-nova-preset-demos.pid');
const LOGFILE = resolve(TMP_DIR, 'run-nova-preset-demos.log');

const MODES = ['dev', 'check', 'build', 'prod'];
const PERSISTENT_MODES = new Set(['dev', 'prod']);
const POOL_MODES = new Set(['check', 'build']);

// Workspace packages that the demos depend on. Built sequentially before
// demo orchestration so demos always bundle/serve fresh preset code.
// Order matters: `nova` ships ESLint rules + CLI scaffolds; the preset
// has no compile-time dep on `nova`, but build order here mirrors npm
// workspace topology for predictability.
const WORKSPACE_PACKAGES = ['nova', 'docusaurus-preset-nova'];

// Modes that need fresh workspace package builds. `prod` only re-serves
// the demos' existing `build/` dirs, so rebuilding the preset wouldn't
// change what's served (you'd need `--mode build` first for that to
// matter). `dev` and `build` consume the preset's `build/` dir directly
// via the package's `exports` map, so they need fresh package output.
// `check` runs lint/type-check/tests which import preset types.
const PACKAGE_BUILD_MODES = new Set(['dev', 'check', 'build']);

const GB = 1024 ** 3;
const HEADROOM_GB = {
  dev: 1,
  build: 2,
  prod: 1.5,
};
const PER_DEMO_GB = {
  dev: 0.5,
  build: 2.5,
  prod: 0.15,
};
const DISK_PER_DEMO_GB = 3;

// Auto-purge a selected demo's webpack persistent cache when it exceeds this
// size before launching dev/build/prod. Webpack's default `maxAge: Infinity`
// lets caches grow monotonically; we observe ~1-2 GB fresh, ~2-3 GB after a
// few sessions, 5-6 GB aged. 4 GB allows a couple cycles of growth before
// resetting, well under the steady-state ceiling. check mode is skipped
// (lint/types/tests don't touch webpack cache).
const AUTO_PURGE_THRESHOLD_GB = 4;

const URL_REGEX = /http:\/\/(?:localhost|0\.0\.0\.0):(\d+)/;
const ERROR_HINTS = [
  { pattern: /ENOSPC/, hint: 'No disk space. Run `node ./scripts/run-demos.mjs --cleanup` or free space manually.' },
  { pattern: /EADDRINUSE/, hint: 'Port already in use. A stale process may still be running.' },
  { pattern: /EPERM.*portless/, hint: 'Sandbox blocking ~/.portless. Run outside sandbox.' },
  { pattern: /JavaScript heap out of memory/, hint: 'Node ran out of memory. Reduce demo selection or raise --max-old-space-size.' },
  // `@docusaurus/core` writes update-check state to ~/.config/docusaurus on
  // every `docusaurus build`. The sandbox write allowlist excludes ~/.config,
  // so the build exits non-zero with the "Try running with sudo or get access
  // to the local update config store" banner.
  { pattern: /@docusaurus\/core update check failed/, hint: 'Sandbox is blocking ~/.config writes Docusaurus needs for the update-notifier. Run outside sandbox.' },
];

const COLORS = [chalk.cyan, chalk.yellow, chalk.magenta, chalk.green, chalk.blue, chalk.red, chalk.gray, chalk.cyanBright];

/* ============================================================ */
/* Arg parsing + validation                                     */
/* ============================================================ */

function parseCliArgs() {
  try {
    const { values } = parseArgs({
      options: {
        mode: { type: 'string' },
        demos: { type: 'string' },
        cleanup: { type: 'boolean' },
        help: { type: 'boolean', short: 'h' },
      },
      strict: true,
    });

    if (values.help === true) {
      printUsage();
      process.exit(0);
    }

    if (values.cleanup === true && (values.mode !== undefined || values.demos !== undefined)) {
      console.error(chalk.red('error: --cleanup is mutually exclusive with --mode and --demos'));
      printUsage();
      process.exit(2);
    }

    return values;
  } catch (error) {
    console.error(chalk.red(`error: ${error.message}`));
    printUsage();
    process.exit(2);
  }
}

function printUsage() {
  console.error([
    '',
    'Usage:',
    '  node scripts/run-demos.mjs --mode <mode> [--demos <list>]',
    '  node scripts/run-demos.mjs --cleanup',
    '',
    'Modes:    dev | check | build | prod',
    'Demos:    comma-separated list of demo names (e.g. envoy,foundry)',
    '          omit in TTY to open an interactive picker',
    '          required in non-TTY contexts',
    'Cleanup:  kills dev/prod processes, removes stale pidfile,',
    '          purges apps/*/node_modules/.cache (webpack caches).',
    '          mutually exclusive with --mode / --demos.',
    '',
  ].join('\n'));
}

function validateMode(mode) {
  if (mode === undefined) {
    console.error(chalk.red('error: --mode is required'));
    printUsage();
    process.exit(2);
  }
  if (!MODES.includes(mode)) {
    console.error(chalk.red(`error: invalid --mode "${mode}" (expected one of: ${MODES.join(', ')})`));
    process.exit(2);
  }
}

/* ============================================================ */
/* Demo discovery + selection                                   */
/* ============================================================ */

function discoverDemos() {
  if (!existsSync(APPS_DIR)) {
    console.error(chalk.red(`error: apps/ not found at ${APPS_DIR}`));
    process.exit(2);
  }

  const demos = readdirSync(APPS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('demo-'))
    .map((entry) => entry.name.replace(/^demo-/, ''))
    .sort();

  if (demos.length === 0) {
    console.error(chalk.red(`error: no apps/demo-* directories found`));
    process.exit(2);
  }

  return demos;
}

function parseDemosArg(raw, allDemos) {
  const names = raw.split(',').map((part) => part.trim());

  for (const name of names) {
    if (name.length === 0) {
      throw new Error('--demos contains an empty entry (check for trailing comma or double comma)');
    }
    if (!/^[a-z0-9_-]+$/.test(name)) {
      throw new Error(`--demos contains invalid name "${name}" (lowercase letters, digits, hyphens, underscores only)`);
    }
    if (!allDemos.includes(name)) {
      throw new Error(`--demos contains unknown demo "${name}" (available: ${allDemos.join(', ')})`);
    }
  }

  const unique = Array.from(new Set(names));
  if (unique.length !== names.length) {
    throw new Error('--demos contains duplicate entries');
  }

  return unique;
}

async function selectDemos(args, allDemos, budget, mode) {
  if (args.demos !== undefined) {
    let parsed;
    try {
      parsed = parseDemosArg(args.demos, allDemos);
    } catch (error) {
      console.error(chalk.red(`error: ${error.message}`));
      process.exit(2);
    }

    if (PERSISTENT_MODES.has(mode) && parsed.length > budget) {
      console.error(chalk.red(
        `error: selected ${parsed.length} demos for ${mode}, but host can safely run ${budget} concurrently.`
      ));
      console.error(chalk.red(`       reduce --demos or free system memory.`));
      process.exit(2);
    }

    return parsed;
  }

  if (!process.stdin.isTTY) {
    console.error(chalk.red('error: non-TTY context requires --demos <list> (no interactive picker available)'));
    printUsage();
    process.exit(2);
  }

  const limit = PERSISTENT_MODES.has(mode) ? budget : allDemos.length;
  const message = PERSISTENT_MODES.has(mode)
    ? `Select demos for ${mode} (max ${limit} for this host)`
    : `Select demos for ${mode}`;

  let selected;
  try {
    selected = await checkbox({
      message,
      choices: allDemos.map((name) => ({ name, value: name })),
      required: true,
      validate: (values) => {
        if (values.length === 0) return 'pick at least one demo';
        if (PERSISTENT_MODES.has(mode) && values.length > limit) {
          return `pick at most ${limit} demos for ${mode} on this host`;
        }
        return true;
      },
    });
  } catch (error) {
    // Inquirer throws on ctrl-c with an ExitPromptError; treat as cancel.
    if (error?.name === 'ExitPromptError') {
      console.error(chalk.gray('\ncancelled'));
      process.exit(130);
    }
    throw error;
  }

  return selected;
}

/* ============================================================ */
/* Resource detection + budget                                  */
/* ============================================================ */

function detectAvailableMemoryGB() {
  if (process.platform !== 'darwin') {
    return freemem() / GB;
  }

  try {
    const result = spawnSync('vm_stat', [], { encoding: 'utf8' });
    if (result.status !== 0 || typeof result.stdout !== 'string') {
      return freemem() / GB;
    }

    const pageSizeMatch = result.stdout.match(/page size of (\d+) bytes/);
    if (pageSizeMatch === null) {
      return freemem() / GB;
    }
    const pageSize = Number(pageSizeMatch[1]);

    const readPages = (label) => {
      const match = result.stdout.match(new RegExp(`Pages ${label}:\\s+(\\d+)`));
      return match === null ? 0 : Number(match[1]);
    };

    const reclaimablePages = readPages('free') + readPages('inactive') + readPages('speculative') + readPages('purgeable');
    return (reclaimablePages * pageSize) / GB;
  } catch {
    return freemem() / GB;
  }
}

async function detectResources() {
  const totalMemGB = totalmem() / GB;
  const availableMemGB = detectAvailableMemoryGB();
  const cores = availableParallelism?.() ?? cpus().length;

  let freeDiskGB = Number.POSITIVE_INFINITY;
  try {
    const stats = await statfs(WORKTREE);
    freeDiskGB = (stats.bsize * stats.bavail) / GB;
  } catch (error) {
    console.warn(chalk.yellow(`warn: could not read free disk space (${error.message}); skipping disk gate`));
  }

  return { totalMemGB, availableMemGB, cores, freeDiskGB };
}

function calculateBudget(mode, resources) {
  const headroom = HEADROOM_GB[mode] ?? 4;
  const usableMemGB = Math.max(0, resources.availableMemGB - headroom);
  let raw;

  switch (mode) {
    case 'check':
      raw = Math.max(1, resources.cores - 1);
      break;
    case 'dev':
    case 'build':
    case 'prod':
      raw = Math.floor(usableMemGB / PER_DEMO_GB[mode]);
      break;
    default:
      raw = 1;
  }

  return Math.max(1, raw);
}

function enforceDiskGate(mode, selectedCount, resources) {
  if (mode === 'check') return;
  if (!Number.isFinite(resources.freeDiskGB)) return;

  const need = selectedCount * DISK_PER_DEMO_GB;
  if (resources.freeDiskGB < need) {
    console.warn(chalk.yellow(
      `warn: only ${resources.freeDiskGB.toFixed(1)} GB free on disk, ~${need} GB recommended for ${selectedCount} ${mode} demos. proceeding.`
    ));
  }
}

/* ============================================================ */
/* Announce                                                      */
/* ============================================================ */

function announce(mode, selected, concurrency, resources) {
  let concurrencyLine;
  if (concurrency === selected.length) {
    concurrencyLine = chalk.cyan(String(concurrency)) + chalk.gray(` (all selected run in parallel)`);
  } else if (POOL_MODES.has(mode)) {
    concurrencyLine = chalk.cyan(String(concurrency)) + chalk.gray(` (host cap; remaining ${selected.length - concurrency} queue and run as workers free up)`);
  } else {
    concurrencyLine = chalk.cyan(String(concurrency)) + chalk.gray(` (of ${selected.length} selected)`);
  }

  const lines = [
    '',
    chalk.bold(`run-demos`) + chalk.gray(` -- mode: ${chalk.cyan(mode)}`),
    chalk.gray(`  selected:    `) + selected.map((d) => chalk.cyan(d)).join(', '),
    chalk.gray(`  concurrency: `) + concurrencyLine,
    chalk.gray(`  host:        `) + chalk.cyan(`${resources.totalMemGB.toFixed(0)} GB total / ${resources.availableMemGB.toFixed(1)} GB available / ${resources.cores} cores`),
    chalk.gray(`  disk:        `) + chalk.cyan(Number.isFinite(resources.freeDiskGB) ? `${resources.freeDiskGB.toFixed(1)} GB free` : 'unknown'),
    '',
  ];

  for (const line of lines) {
    console.log(line);
  }
}

/* ============================================================ */
/* Pidfile lock                                                  */
/* ============================================================ */

function acquirePidLock() {
  if (!existsSync(TMP_DIR)) {
    mkdirSync(TMP_DIR, { recursive: true });
  }

  if (existsSync(PIDFILE)) {
    const existing = Number(readFileSync(PIDFILE, 'utf-8').trim());
    if (Number.isInteger(existing) && existing > 0 && isPidAlive(existing)) {
      console.error(chalk.red(`error: another run-demos instance is running (pid ${existing}).`));
      console.error(chalk.red(`       kill it or wait for it to exit. pidfile: ${PIDFILE}`));
      process.exit(1);
    }
    // Stale pidfile - safe to remove.
    try { unlinkSync(PIDFILE); } catch { /* ignore */ }
  }

  writeFileSync(PIDFILE, String(process.pid));
}

function releasePidLock() {
  try {
    if (existsSync(PIDFILE)) {
      const recorded = Number(readFileSync(PIDFILE, 'utf-8').trim());
      if (recorded === process.pid) {
        unlinkSync(PIDFILE);
      }
    }
  } catch { /* ignore - best effort cleanup */ }
}

function isPidAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === 'EPERM';
  }
}

/* ============================================================ */
/* Stale-process kill                                            */
/* ============================================================ */

function killStaleDemoProcesses(selected) {
  for (const demo of selected) {
    const patterns = [
      `demo-${demo}.*docusaurus start`,
      `demo-${demo}.*docusaurus serve`,
      `portless.*nova-demo-${demo}`,
    ];
    for (const pattern of patterns) {
      // pkill -f matches against the full command line; -9 is SIGKILL.
      // We don't care about exit code - 1 means "no match", which is fine.
      spawnSync('pkill', ['-9', '-f', pattern], { stdio: 'ignore' });
    }
  }
}

/* ============================================================ */
/* Spawn + multiplex                                             */
/* ============================================================ */

function makePrefixer(demos) {
  const map = new Map();
  for (let i = 0; i < demos.length; i += 1) {
    const color = COLORS[i % COLORS.length];
    map.set(demos[i], color(`[${demos[i]}]`));
  }
  return map;
}

function classifyError(line) {
  for (const { pattern, hint } of ERROR_HINTS) {
    if (pattern.test(line)) {
      return hint;
    }
  }
  return null;
}

/**
 * Build workspace packages sequentially before demo orchestration.
 *
 * Without this, `--mode build` (and `dev`/`check`) would consume
 * whatever's in each package's `build/` dir from the last manual run -
 * leading to silent staleness when src CSS/TS changed but `npm run
 * build` wasn't re-run in the package. Demos resolve packages via the
 * `exports` map (e.g. `./build/src/preset.js`), so the source isn't
 * read directly.
 *
 * Streams stdout/stderr through the same multiplexer with a per-package
 * prefix so failures are inline with the rest of the run output.
 *
 * @returns {Promise<number>} 0 on success; first non-zero exit code otherwise.
 */
async function buildWorkspacePackages(multiplexer) {
  for (const pkg of WORKSPACE_PACKAGES) {
    const child = spawn('npm', ['run', 'build', `--workspace=packages/${pkg}`], {
      cwd: WORKTREE,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
    });
    multiplexer.attach(`pkg:${pkg}`, child);

    const exitCode = await new Promise((resolve) => {
      child.on('exit', (code, signal) => resolve(code ?? (signal !== null ? 128 : 1)));
      child.on('error', (error) => {
        process.stderr.write(`[pkg:${pkg}] ${chalk.red(`spawn error: ${error.message}`)}\n`);
        resolve(1);
      });
    });

    if (exitCode !== 0) {
      process.stderr.write(`[pkg:${pkg}] ${chalk.red(`build failed with exit code ${exitCode}`)}\n`);
      return exitCode;
    }
  }
  return 0;
}

function spawnDemoProcess(demo, mode) {
  // Path-based --workspace avoids drift between dir name and package.json name.
  //
  // detached:true puts the child in its own process group so we can signal
  // the entire subtree (npm -> run-scripts -> docusaurus -> portless) via
  // process.kill(-pid, signal). Without this, npm receives SIGINT and exits
  // but its grandchildren get orphaned to PID 1 and keep running.
  return spawn('npm', ['run', mode, `--workspace=apps/demo-${demo}`], {
    cwd: WORKTREE,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
    detached: true,
  });
}

function killProcessGroup(child, signal) {
  if (child.killed || child.pid === undefined) return;
  try {
    // Negative pid = whole process group.
    process.kill(-child.pid, signal);
  } catch (error) {
    if (error.code !== 'ESRCH') {
      // ESRCH = group already gone; anything else is unusual but non-fatal.
      try { child.kill(signal); } catch { /* ignore */ }
    }
  }
}

class OutputMultiplexer {
  constructor(prefixes, logStream) {
    this.prefixes = prefixes;
    this.logStream = logStream;
    this.partial = new Map();
    this.discoveredPorts = new Map();
    this.hintsEmitted = new Set();
  }

  attach(demo, child) {
    this.partial.set(demo, { stdout: '', stderr: '' });

    child.stdout.on('data', (chunk) => this.#handleData(demo, 'stdout', chunk));
    child.stderr.on('data', (chunk) => this.#handleData(demo, 'stderr', chunk));
  }

  #handleData(demo, stream, chunk) {
    const buffer = this.partial.get(demo);
    const text = buffer[stream] + chunk.toString();
    const lines = text.split('\n');
    buffer[stream] = lines.pop() ?? '';

    for (const line of lines) {
      if (line.length === 0) continue;
      this.#emit(demo, stream, line);
    }
  }

  #emit(demo, stream, line) {
    const prefix = this.prefixes.get(demo) ?? `[${demo}]`;
    const formatted = `${prefix} ${line}`;

    if (stream === 'stderr') {
      process.stderr.write(formatted + '\n');
    } else {
      process.stdout.write(formatted + '\n');
    }

    if (this.logStream) {
      this.logStream.write(`${demo} ${stream} ${line}\n`);
    }

    // Port discovery.
    const portMatch = URL_REGEX.exec(line);
    if (portMatch !== null && !this.discoveredPorts.has(demo)) {
      const port = Number(portMatch[1]);
      this.discoveredPorts.set(demo, port);
      process.stdout.write(prefix + ' ' + chalk.green(`ready -> http://localhost:${port}`) + '\n');
    }

    // Error hints (deduplicated per demo+hint).
    const hint = classifyError(line);
    if (hint !== null) {
      const key = `${demo}:${hint}`;
      if (!this.hintsEmitted.has(key)) {
        this.hintsEmitted.add(key);
        process.stderr.write(prefix + ' ' + chalk.yellow(`hint: ${hint}`) + '\n');
      }
    }
  }

  flushPartials() {
    for (const [demo, buffer] of this.partial.entries()) {
      for (const stream of ['stdout', 'stderr']) {
        if (buffer[stream].length > 0) {
          this.#emit(demo, stream, buffer[stream]);
          buffer[stream] = '';
        }
      }
    }
  }

  getPorts() {
    return new Map(this.discoveredPorts);
  }
}

/* ============================================================ */
/* Orchestrators                                                 */
/* ============================================================ */

let userInterrupted = false;

function setupSignalForwarders(children) {
  const forward = (signal) => {
    userInterrupted = true;
    for (const child of children) {
      killProcessGroup(child, signal);
    }
  };

  process.on('SIGINT', () => forward('SIGINT'));
  process.on('SIGTERM', () => forward('SIGTERM'));
  process.on('SIGHUP', () => forward('SIGHUP'));
}

async function orchestratePersistent(mode, selected, multiplexer) {
  const children = [];
  const exitPromises = [];

  for (const demo of selected) {
    const child = spawnDemoProcess(demo, mode);
    children.push(child);
    multiplexer.attach(demo, child);

    exitPromises.push(new Promise((promiseResolve) => {
      child.on('close', (code) => {
        promiseResolve({ demo, code: code ?? 1 });
      });
      child.on('error', (error) => {
        process.stderr.write(`[${demo}] ${chalk.red(`spawn error: ${error.message}`)}\n`);
        promiseResolve({ demo, code: 1 });
      });
    }));
  }

  setupSignalForwarders(children);

  // Persistent: wait for any child to exit, then wait for all to settle.
  const results = await Promise.all(exitPromises);
  multiplexer.flushPartials();

  if (userInterrupted) {
    console.error('');
    console.error(chalk.gray('shutdown complete'));
    return 0;
  }

  const failed = results.filter((r) => r.code !== 0);
  if (failed.length > 0) {
    console.error('');
    console.error(chalk.red(`${failed.length} demo(s) exited with non-zero status:`));
    for (const r of failed) {
      console.error(chalk.red(`  - ${r.demo} (exit ${r.code})`));
    }
    return 1;
  }
  return 0;
}

async function orchestratePool(mode, selected, concurrency, multiplexer) {
  const queue = [...selected];
  const inFlight = new Map();
  const failed = [];

  const spawnNext = () => {
    if (userInterrupted) return null;
    const demo = queue.shift();
    if (demo === undefined) return null;

    const child = spawnDemoProcess(demo, mode);
    multiplexer.attach(demo, child);

    const exitPromise = new Promise((promiseResolve) => {
      child.on('close', (code) => {
        const exitCode = code ?? 1;
        inFlight.delete(demo);
        if (exitCode !== 0 && !userInterrupted) {
          failed.push({ demo, code: exitCode });
        }
        promiseResolve();
      });
      child.on('error', (error) => {
        process.stderr.write(`[${demo}] ${chalk.red(`spawn error: ${error.message}`)}\n`);
        inFlight.delete(demo);
        if (!userInterrupted) failed.push({ demo, code: 1 });
        promiseResolve();
      });
    });

    inFlight.set(demo, { child, exitPromise });
    return { demo, exitPromise };
  };

  const forward = (signal) => {
    userInterrupted = true;
    queue.length = 0;
    for (const { child } of inFlight.values()) {
      killProcessGroup(child, signal);
    }
  };
  process.on('SIGINT', () => forward('SIGINT'));
  process.on('SIGTERM', () => forward('SIGTERM'));
  process.on('SIGHUP', () => forward('SIGHUP'));

  // Prime the pool.
  for (let i = 0; i < concurrency; i += 1) {
    spawnNext();
  }

  // Replace workers as they finish.
  while (inFlight.size > 0) {
    const exits = Array.from(inFlight.values()).map((entry) => entry.exitPromise);
    await Promise.race(exits);
    spawnNext();
  }

  multiplexer.flushPartials();

  if (userInterrupted) {
    console.error('');
    console.error(chalk.gray('shutdown complete'));
    return 0;
  }

  if (failed.length > 0) {
    console.error('');
    console.error(chalk.red(`${failed.length} demo(s) exited with non-zero status:`));
    for (const r of failed) {
      console.error(chalk.red(`  - ${r.demo} (exit ${r.code})`));
    }
    return 1;
  }
  return 0;
}

/* ============================================================ */
/* Cleanup + auto-purge                                          */
/* ============================================================ */

async function autoPurgeAgedCaches(selected, mode) {
  if (mode === 'check') return;

  const threshold = AUTO_PURGE_THRESHOLD_GB * GB;
  const purged = [];

  for (const demo of selected) {
    const cacheDir = resolve(WORKTREE, 'apps', `demo-${demo}`, 'node_modules', '.cache');
    if (!existsSync(cacheDir)) continue;

    const size = getDirSizeBytes(cacheDir);
    if (size > threshold) {
      try {
        await rm(cacheDir, { recursive: true, force: true });
        purged.push({ demo, freed: size });
      } catch (error) {
        console.error(chalk.red(`  failed to auto-purge ${demo}: ${error.message}`));
      }
    }
  }

  if (purged.length > 0) {
    console.log(chalk.yellow(`  auto-purged ${purged.length} cache(s) over ${AUTO_PURGE_THRESHOLD_GB} GB threshold:`));
    for (const { demo, freed } of purged) {
      console.log(chalk.gray(`    ${demo}: ${formatBytes(freed)}`));
    }
    console.log('');
  }
}

function formatBytes(bytes) {
  if (bytes < GB) return `${(bytes / (1024 ** 2)).toFixed(0)} MB`;
  return `${(bytes / GB).toFixed(2)} GB`;
}

function getDirSizeBytes(dir) {
  let total = 0;
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    let entries;
    try {
      entries = readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const fullPath = resolve(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        try { total += statSync(fullPath).size; } catch { /* ignore */ }
      }
    }
  }
  return total;
}

async function runCleanup() {
  console.log('');
  console.log(chalk.bold('run-demos --cleanup'));
  console.log('');

  // Kill all docusaurus + portless-nova processes across every demo and the
  // docs site. Broader than the per-selection pre-launch kill since cleanup
  // is a maintenance command, not a targeted reset.
  const patterns = ['docusaurus start', 'docusaurus serve', 'portless.*nova-'];
  for (const pattern of patterns) {
    spawnSync('pkill', ['-9', '-f', pattern], { stdio: 'ignore' });
  }
  console.log(chalk.gray('  killed dev/prod processes'));

  // Drop a stale pidfile if its owner is dead. Don't touch a live one - the
  // live owner's exit handler will clean up.
  if (existsSync(PIDFILE)) {
    try {
      const other = Number(readFileSync(PIDFILE, 'utf-8').trim());
      if (Number.isInteger(other) && !isPidAlive(other)) {
        unlinkSync(PIDFILE);
        console.log(chalk.gray(`  removed stale pidfile (pid ${other})`));
      } else if (Number.isInteger(other)) {
        console.log(chalk.yellow(`  left live pidfile alone (pid ${other})`));
      }
    } catch {
      try { unlinkSync(PIDFILE); } catch { /* ignore */ }
      console.log(chalk.gray('  removed unreadable pidfile'));
    }
  }

  // Purge every workspace's node_modules/.cache. Webpack's persistent cache
  // (each app at ~3 GiB across rebuilds) is the main bloat source; emptying
  // it eagerly prevents the next prod build from hitting ENOSPC mid-SSG.
  const allDemos = discoverDemos();
  const workspaces = [
    ...allDemos.map((name) => `apps/demo-${name}`),
    'apps/docs',
  ];

  let totalFreed = 0;
  for (const ws of workspaces) {
    const cacheDir = resolve(WORKTREE, ws, 'node_modules', '.cache');
    if (!existsSync(cacheDir)) continue;

    const size = getDirSizeBytes(cacheDir);
    try {
      await rm(cacheDir, { recursive: true, force: true });
      totalFreed += size;
      console.log(chalk.gray(`  purged ${ws}/node_modules/.cache `) + chalk.cyan(`(${formatBytes(size)})`));
    } catch (error) {
      console.error(chalk.red(`  failed to purge ${ws}/node_modules/.cache: ${error.message}`));
    }
  }

  console.log('');
  console.log(chalk.green(`  total freed: ${formatBytes(totalFreed)}`));
  console.log('');
}

/* ============================================================ */
/* Main                                                          */
/* ============================================================ */

async function main() {
  const args = parseCliArgs();

  if (args.cleanup === true) {
    await runCleanup();
    return;
  }

  validateMode(args.mode);

  acquirePidLock();
  process.on('exit', releasePidLock);

  const allDemos = discoverDemos();
  const resources = await detectResources();
  const budget = calculateBudget(args.mode, resources);

  const selected = await selectDemos(args, allDemos, budget, args.mode);
  const concurrency = Math.min(selected.length, budget);

  enforceDiskGate(args.mode, selected.length, resources);
  announce(args.mode, selected, concurrency, resources);

  await autoPurgeAgedCaches(selected, args.mode);

  if (PERSISTENT_MODES.has(args.mode)) {
    killStaleDemoProcesses(selected);
  }

  const prefixes = makePrefixer(selected);
  const logStream = PERSISTENT_MODES.has(args.mode) ? createWriteStream(LOGFILE, { flags: 'w' }) : null;
  const multiplexer = new OutputMultiplexer(prefixes, logStream);

  if (PACKAGE_BUILD_MODES.has(args.mode)) {
    const packageExitCode = await buildWorkspacePackages(multiplexer);
    if (packageExitCode !== 0) {
      if (logStream !== null) logStream.end();
      process.exit(packageExitCode);
    }
  }

  let exitCode;
  if (PERSISTENT_MODES.has(args.mode)) {
    exitCode = await orchestratePersistent(args.mode, selected, multiplexer);
  } else {
    exitCode = await orchestratePool(args.mode, selected, concurrency, multiplexer);
  }

  if (logStream !== null) {
    logStream.end();
  }

  process.exit(exitCode);
}

main().catch((error) => {
  console.error(chalk.red(`fatal: ${error.message}`));
  if (error.stack) console.error(chalk.gray(error.stack));
  releasePidLock();
  process.exit(1);
});
