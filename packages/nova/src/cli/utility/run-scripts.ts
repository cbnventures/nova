import { spawn } from 'child_process';
import { readFile } from 'fs/promises';
import { platform } from 'os';
import { resolve } from 'path';

import chalk from 'chalk';

import { Logger } from '../../toolkit/index.js';

import type {
  CliUtilityRunScriptsGetNpmCommandReturns,
  CliUtilityRunScriptsMatchScriptsPattern,
  CliUtilityRunScriptsMatchScriptsPrefix,
  CliUtilityRunScriptsMatchScriptsReturns,
  CliUtilityRunScriptsMatchScriptsScripts,
  CliUtilityRunScriptsReadPackageJsonPackageJsonPath,
  CliUtilityRunScriptsReadPackageJsonRaw,
  CliUtilityRunScriptsReadPackageJsonReturns,
  CliUtilityRunScriptsRunBufferMs,
  CliUtilityRunScriptsRunExitCode,
  CliUtilityRunScriptsRunMatchedScripts,
  CliUtilityRunScriptsRunOptions,
  CliUtilityRunScriptsRunPackageJson,
  CliUtilityRunScriptsRunParallelBufferMs,
  CliUtilityRunScriptsRunParallelChild,
  CliUtilityRunScriptsRunParallelChildren,
  CliUtilityRunScriptsRunParallelColoredPrefix,
  CliUtilityRunScriptsRunParallelColorFunction,
  CliUtilityRunScriptsRunParallelColorFunctions,
  CliUtilityRunScriptsRunParallelColorIndex,
  CliUtilityRunScriptsRunParallelExitPromise,
  CliUtilityRunScriptsRunParallelExitPromises,
  CliUtilityRunScriptsRunParallelExitResults,
  CliUtilityRunScriptsRunParallelFailed,
  CliUtilityRunScriptsRunParallelFlushInterval,
  CliUtilityRunScriptsRunParallelFlushQueue,
  CliUtilityRunScriptsRunParallelFormattedLine,
  CliUtilityRunScriptsRunParallelForwardSignal,
  CliUtilityRunScriptsRunParallelHandleData,
  CliUtilityRunScriptsRunParallelLastFlushedScript,
  CliUtilityRunScriptsRunParallelLines,
  CliUtilityRunScriptsRunParallelMatchedScripts,
  CliUtilityRunScriptsRunParallelNpmCommand,
  CliUtilityRunScriptsRunParallelPartial,
  CliUtilityRunScriptsRunParallelPartialLines,
  CliUtilityRunScriptsRunParallelPrefix,
  CliUtilityRunScriptsRunParallelPrefixes,
  CliUtilityRunScriptsRunParallelQueue,
  CliUtilityRunScriptsRunParallelReturns,
  CliUtilityRunScriptsRunParallelScript,
  CliUtilityRunScriptsRunParallelText,
  CliUtilityRunScriptsRunPattern,
  CliUtilityRunScriptsRunReturns,
  CliUtilityRunScriptsRunScripts,
  CliUtilityRunScriptsSpawnScriptChild,
  CliUtilityRunScriptsSpawnScriptNpmCommand,
  CliUtilityRunScriptsSpawnScriptReturns,
  CliUtilityRunScriptsSpawnScriptScript,
} from '../../types/cli/utility/run-scripts.d.ts';

/**
 * CLI - Utility - Run Scripts.
 *
 * Runs package.json scripts matched by a glob
 * pattern in either sequential or parallel mode.
 * Used by "nova utility run-scripts" command.
 *
 * @since 0.14.0
 */
export class CliUtilityRunScripts {
  /**
   * CLI - Utility - Run Scripts - Run.
   *
   * Validates options, reads package.json, matches scripts by pattern, then spawns them
   * sequentially or in parallel depending on the selected mode.
   *
   * @param {CliUtilityRunScriptsRunOptions} options - Options.
   *
   * @returns {CliUtilityRunScriptsRunReturns}
   *
   * @since 0.14.0
   */
  public static async run(options: CliUtilityRunScriptsRunOptions): CliUtilityRunScriptsRunReturns {
    if (options['pattern'] === undefined) {
      Logger.error('A script name pattern is required (e.g., "build:*").');

      process.exitCode = 1;

      return;
    }

    if (options['sequential'] === true && options['parallel'] === true) {
      Logger.error('Specify either --sequential or --parallel, not both.');

      process.exitCode = 1;

      return;
    }

    if (options['sequential'] === undefined && options['parallel'] === undefined) {
      Logger.error('Specify --sequential or --parallel.');

      process.exitCode = 1;

      return;
    }

    const pattern: CliUtilityRunScriptsRunPattern = options['pattern'];

    // Read the "package.json" from the current working directory.
    const packageJson: CliUtilityRunScriptsRunPackageJson = await CliUtilityRunScripts.readPackageJson();

    if (packageJson === undefined) {
      Logger.error('No "package.json" found in the current directory.');

      process.exitCode = 1;

      return;
    }

    const scripts: CliUtilityRunScriptsRunScripts = packageJson['scripts'] as CliUtilityRunScriptsRunScripts;

    if (scripts === undefined) {
      Logger.warn('No "scripts" field found in "package.json".');

      return;
    }

    // Match scripts by the provided pattern.
    const matchedScripts: CliUtilityRunScriptsRunMatchedScripts = CliUtilityRunScripts.matchScripts(scripts, pattern);

    if (matchedScripts.length === 0) {
      Logger.warn(`No scripts matched the pattern "${pattern}".`);

      return;
    }

    Logger.info(`Matched ${matchedScripts.length} script(s): ${matchedScripts.map((name) => chalk.cyan(name)).join(', ')}`);

    // Run scripts in the selected mode.
    if (options['sequential'] === true) {
      for (const matchedScript of matchedScripts) {
        process.stdout.write(`\n┌─ ${chalk.cyan(matchedScript)} ──\n`);

        const exitCode: CliUtilityRunScriptsRunExitCode = await CliUtilityRunScripts.spawnScript(matchedScript);

        if (exitCode !== 0) {
          process.stderr.write(`└─ ${chalk.cyan(matchedScript)} ── ${chalk.red(`✗ (exit code ${exitCode})`)}\n`);

          process.exitCode = 1;

          return;
        }

        process.stdout.write(`└─ ${chalk.cyan(matchedScript)} ── ${chalk.green('✓')}\n`);
      }

      Logger.customize({ padTop: 1 }).info('All scripts completed successfully.');
    }

    if (options['parallel'] === true) {
      const bufferMs: CliUtilityRunScriptsRunBufferMs = Number(options['buffer'] ?? '500');

      if (
        Number.isNaN(bufferMs) === true
        || bufferMs <= 0
        || Number.isInteger(bufferMs) === false
      ) {
        Logger.error('The --buffer value must be a positive integer.');

        process.exitCode = 1;

        return;
      }

      await CliUtilityRunScripts.runParallel(matchedScripts, bufferMs);

      return;
    }

    return;
  }

  /**
   * CLI - Utility - Run Scripts - Read package.json.
   *
   * Reads and parses the package.json from the current working directory. Returns undefined if
   * the file does not exist or cannot be parsed.
   *
   * @private
   *
   * @returns {CliUtilityRunScriptsReadPackageJsonReturns}
   *
   * @since 0.14.0
   */
  private static async readPackageJson(): CliUtilityRunScriptsReadPackageJsonReturns {
    const packageJsonPath: CliUtilityRunScriptsReadPackageJsonPackageJsonPath = resolve(process.cwd(), 'package.json');

    try {
      const raw: CliUtilityRunScriptsReadPackageJsonRaw = await readFile(packageJsonPath, 'utf-8');

      return JSON.parse(raw);
    } catch {
      return undefined;
    }
  }

  /**
   * CLI - Utility - Run Scripts - Get npm Command.
   *
   * Returns the platform-appropriate npm executable name. Windows requires "npm.cmd" while
   * POSIX systems use "npm" directly.
   *
   * @private
   *
   * @returns {CliUtilityRunScriptsGetNpmCommandReturns}
   *
   * @since 0.14.0
   */
  private static getNpmCommand(): CliUtilityRunScriptsGetNpmCommandReturns {
    return (platform() === 'win32') ? 'npm.cmd' : 'npm';
  }

  /**
   * CLI - Utility - Run Scripts - Match Scripts.
   *
   * Filters script names by a trailing-wildcard pattern like "build:*" or returns an exact
   * match. Called by run to determine which to execute.
   *
   * @param {CliUtilityRunScriptsMatchScriptsScripts} scripts - Scripts.
   * @param {CliUtilityRunScriptsMatchScriptsPattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {CliUtilityRunScriptsMatchScriptsReturns}
   *
   * @since 0.14.0
   */
  private static matchScripts(scripts: CliUtilityRunScriptsMatchScriptsScripts, pattern: CliUtilityRunScriptsMatchScriptsPattern): CliUtilityRunScriptsMatchScriptsReturns {
    if (pattern.endsWith('*') === true) {
      const prefix: CliUtilityRunScriptsMatchScriptsPrefix = pattern.slice(0, -1);

      return Object.keys(scripts).filter(
        (scriptName) => scriptName.startsWith(prefix),
      );
    }

    if (Reflect.get(scripts, pattern) !== undefined) {
      return [pattern];
    }

    return [];
  }

  /**
   * CLI - Utility - Run Scripts - Spawn Script.
   *
   * Spawns a single npm run command with inherited stdio for real-time output. Used by
   * sequential mode to stream output as scripts run.
   *
   * @param {CliUtilityRunScriptsSpawnScriptScript} script - Script.
   *
   * @private
   *
   * @returns {CliUtilityRunScriptsSpawnScriptReturns}
   *
   * @since 0.14.0
   */
  private static spawnScript(script: CliUtilityRunScriptsSpawnScriptScript): CliUtilityRunScriptsSpawnScriptReturns {
    const npmCommand: CliUtilityRunScriptsSpawnScriptNpmCommand = CliUtilityRunScripts.getNpmCommand();

    return new Promise((promiseResolve, reject) => {
      const child: CliUtilityRunScriptsSpawnScriptChild = spawn(npmCommand, [
        'run',
        script,
      ], {
        stdio: 'inherit',
        shell: false,
      });

      child.on('close', (code) => {
        promiseResolve(code ?? 1);

        return;
      });

      child.on('error', (error) => {
        reject(error);

        return;
      });

      return;
    });
  }

  /**
   * CLI - Utility - Run Scripts - Run Parallel.
   *
   * Spawns all matched scripts with piped stdio, streams output
   * with colored prefixes, and uses a time-windowed log queue
   * to group lines from the same script visually.
   *
   * @param {CliUtilityRunScriptsRunParallelMatchedScripts} matchedScripts - Matched scripts.
   * @param {CliUtilityRunScriptsRunParallelBufferMs}       bufferMs       - Buffer ms.
   *
   * @private
   *
   * @returns {CliUtilityRunScriptsRunParallelReturns}
   *
   * @since 0.15.0
   */
  private static async runParallel(matchedScripts: CliUtilityRunScriptsRunParallelMatchedScripts, bufferMs: CliUtilityRunScriptsRunParallelBufferMs): CliUtilityRunScriptsRunParallelReturns {
    const npmCommand: CliUtilityRunScriptsRunParallelNpmCommand = CliUtilityRunScripts.getNpmCommand();

    // Build color-coded prefixes for each script.
    const colorFunctions: CliUtilityRunScriptsRunParallelColorFunctions = [
      chalk.cyan,
      chalk.yellow,
      chalk.magenta,
      chalk.green,
      chalk.blue,
      chalk.red,
    ];
    const prefixes: CliUtilityRunScriptsRunParallelPrefixes = new Map();

    for (let colorIndex: CliUtilityRunScriptsRunParallelColorIndex = 0; colorIndex < matchedScripts.length; colorIndex += 1) {
      const script: CliUtilityRunScriptsRunParallelScript = matchedScripts[colorIndex] as CliUtilityRunScriptsRunParallelScript;
      const colorFunction: CliUtilityRunScriptsRunParallelColorFunction = colorFunctions[colorIndex % colorFunctions.length] as CliUtilityRunScriptsRunParallelColorFunction;
      const coloredPrefix: CliUtilityRunScriptsRunParallelColoredPrefix = colorFunction(`[${script}]`);

      prefixes.set(script, coloredPrefix);
    }

    // Shared queue and state.
    const queue: CliUtilityRunScriptsRunParallelQueue = [];
    const partialLines: CliUtilityRunScriptsRunParallelPartialLines = new Map();
    const children: CliUtilityRunScriptsRunParallelChildren = [];
    const exitPromises: CliUtilityRunScriptsRunParallelExitPromises = [];

    let lastFlushedScript: CliUtilityRunScriptsRunParallelLastFlushedScript = '';

    // Flush all queued lines with prefixes and blank-line separators.
    const flushQueue: CliUtilityRunScriptsRunParallelFlushQueue = () => {
      for (const entry of queue) {
        const prefix: CliUtilityRunScriptsRunParallelPrefix = prefixes.get(entry['script']) ?? `[${entry['script']}]`;

        if (lastFlushedScript !== '' && lastFlushedScript !== entry['script']) {
          process.stdout.write('\n');
        }

        lastFlushedScript = entry['script'];

        const formattedLine: CliUtilityRunScriptsRunParallelFormattedLine = `${prefix} ${entry['line']}\n`;

        if (entry['stream'] === 'stderr') {
          process.stderr.write(formattedLine);
        } else {
          process.stdout.write(formattedLine);
        }
      }

      queue.length = 0;

      return;
    };

    // Spawn all scripts with piped stdio.
    for (const script of matchedScripts) {
      const child: CliUtilityRunScriptsRunParallelChild = spawn(npmCommand, [
        'run',
        script,
      ], {
        stdio: 'pipe',
        shell: false,
      });

      children.push(child);

      partialLines.set(script, '');

      // Handle incoming data by splitting into lines and queuing.
      const handleData: CliUtilityRunScriptsRunParallelHandleData = (data, stream) => {
        const text: CliUtilityRunScriptsRunParallelText = (partialLines.get(script) ?? '') + data.toString();
        const lines: CliUtilityRunScriptsRunParallelLines = text.split('\n');

        // Hold the last segment as a partial line.
        const partial: CliUtilityRunScriptsRunParallelPartial = lines.pop() ?? '';

        partialLines.set(script, partial);

        for (const line of lines) {
          if (line.length > 0) {
            queue.push({
              script,
              stream,
              line,
            });
          }
        }

        return;
      };

      child.stdout.on('data', (data) => {
        handleData(data, 'stdout');

        return;
      });

      child.stderr.on('data', (data) => {
        handleData(data, 'stderr');

        return;
      });

      // Track exit and flush remaining partial line.
      const exitPromise: CliUtilityRunScriptsRunParallelExitPromise = new Promise((promiseResolve) => {
        child.on('close', (code) => {
          const partial: CliUtilityRunScriptsRunParallelPartial = partialLines.get(script) ?? '';

          if (partial.length > 0) {
            queue.push({
              script,
              stream: 'stdout',
              line: partial,
            });

            partialLines.set(script, '');
          }

          if (code !== 0) {
            queue.push({
              script,
              stream: 'stderr',
              line: `✗ (exit code ${code ?? 1})`,
            });
          } else {
            queue.push({
              script,
              stream: 'stdout',
              line: '✓',
            });
          }

          promiseResolve(code ?? 1);

          return;
        });

        child.on('error', (error) => {
          queue.push({
            script,
            stream: 'stderr',
            line: `error: ${error.message}`,
          });

          promiseResolve(1);

          return;
        });

        return;
      });

      exitPromises.push(exitPromise);
    }

    // Start periodic flushing.
    const flushInterval: CliUtilityRunScriptsRunParallelFlushInterval = setInterval(flushQueue, bufferMs);

    // Forward signals to children.
    const forwardSignal: CliUtilityRunScriptsRunParallelForwardSignal = (signal) => {
      for (const child of children) {
        child.kill(signal);
      }

      return;
    };

    process.on('SIGINT', () => {
      forwardSignal('SIGINT');

      return;
    });

    process.on('SIGTERM', () => {
      forwardSignal('SIGTERM');

      return;
    });

    // Wait for all children to exit.
    const exitResults: CliUtilityRunScriptsRunParallelExitResults = await Promise.allSettled(exitPromises);

    // Final flush and cleanup.
    clearInterval(flushInterval);
    flushQueue();

    const failed: CliUtilityRunScriptsRunParallelFailed = exitResults.some(
      (exitResult) => exitResult.status === 'rejected'
        || (
          exitResult.status === 'fulfilled'
          && exitResult.value !== 0
        ),
    );

    if (failed === true) {
      process.exitCode = 1;

      return;
    }

    Logger.customize({ padTop: 1 }).info('All scripts completed successfully.');

    return;
  }
}
