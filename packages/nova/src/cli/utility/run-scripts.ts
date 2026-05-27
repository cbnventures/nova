import { spawn } from 'child_process';
import { readFile } from 'fs/promises';
import { platform } from 'os';
import { resolve } from 'path';

import chalk from 'chalk';

import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Utility_RunScripts_Runner_GetNpmCommand_Returns,
  Cli_Utility_RunScripts_Runner_MatchScripts_Pattern,
  Cli_Utility_RunScripts_Runner_MatchScripts_Prefix,
  Cli_Utility_RunScripts_Runner_MatchScripts_Returns,
  Cli_Utility_RunScripts_Runner_MatchScripts_Scripts,
  Cli_Utility_RunScripts_Runner_ReadPackageJson_PackageJsonPath,
  Cli_Utility_RunScripts_Runner_ReadPackageJson_Raw,
  Cli_Utility_RunScripts_Runner_ReadPackageJson_Returns,
  Cli_Utility_RunScripts_Runner_Run_BufferMs,
  Cli_Utility_RunScripts_Runner_Run_ExitCode,
  Cli_Utility_RunScripts_Runner_Run_MatchedScripts,
  Cli_Utility_RunScripts_Runner_Run_Options,
  Cli_Utility_RunScripts_Runner_Run_PackageJson,
  Cli_Utility_RunScripts_Runner_Run_Pattern,
  Cli_Utility_RunScripts_Runner_Run_Returns,
  Cli_Utility_RunScripts_Runner_Run_Scripts,
  Cli_Utility_RunScripts_Runner_RunParallel_BufferMs,
  Cli_Utility_RunScripts_Runner_RunParallel_Child,
  Cli_Utility_RunScripts_Runner_RunParallel_Children,
  Cli_Utility_RunScripts_Runner_RunParallel_ColoredPrefix,
  Cli_Utility_RunScripts_Runner_RunParallel_ColorFunction,
  Cli_Utility_RunScripts_Runner_RunParallel_ColorFunctions,
  Cli_Utility_RunScripts_Runner_RunParallel_ColorIndex,
  Cli_Utility_RunScripts_Runner_RunParallel_ExitPromise,
  Cli_Utility_RunScripts_Runner_RunParallel_ExitPromises,
  Cli_Utility_RunScripts_Runner_RunParallel_ExitResults,
  Cli_Utility_RunScripts_Runner_RunParallel_Failed,
  Cli_Utility_RunScripts_Runner_RunParallel_FlushInterval,
  Cli_Utility_RunScripts_Runner_RunParallel_FlushQueue,
  Cli_Utility_RunScripts_Runner_RunParallel_FormattedLine,
  Cli_Utility_RunScripts_Runner_RunParallel_ForwardSignal,
  Cli_Utility_RunScripts_Runner_RunParallel_HandleData,
  Cli_Utility_RunScripts_Runner_RunParallel_LastFlushedScript,
  Cli_Utility_RunScripts_Runner_RunParallel_Lines,
  Cli_Utility_RunScripts_Runner_RunParallel_MatchedScripts,
  Cli_Utility_RunScripts_Runner_RunParallel_NpmCommand,
  Cli_Utility_RunScripts_Runner_RunParallel_Partial,
  Cli_Utility_RunScripts_Runner_RunParallel_PartialLines,
  Cli_Utility_RunScripts_Runner_RunParallel_Prefix,
  Cli_Utility_RunScripts_Runner_RunParallel_Prefixes,
  Cli_Utility_RunScripts_Runner_RunParallel_Queue,
  Cli_Utility_RunScripts_Runner_RunParallel_Returns,
  Cli_Utility_RunScripts_Runner_RunParallel_Script,
  Cli_Utility_RunScripts_Runner_RunParallel_Text,
  Cli_Utility_RunScripts_Runner_SpawnScript_Child,
  Cli_Utility_RunScripts_Runner_SpawnScript_NpmCommand,
  Cli_Utility_RunScripts_Runner_SpawnScript_Returns,
  Cli_Utility_RunScripts_Runner_SpawnScript_Script,
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
export class Runner {
  /**
   * CLI - Utility - Run Scripts - Run.
   *
   * Validates options, reads package.json, matches scripts by pattern, then spawns them
   * sequentially or in parallel depending on the selected mode.
   *
   * @param {Cli_Utility_RunScripts_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_RunScripts_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Utility_RunScripts_Runner_Run_Options): Cli_Utility_RunScripts_Runner_Run_Returns {
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

    const pattern: Cli_Utility_RunScripts_Runner_Run_Pattern = options['pattern'];

    // Read the "package.json" from the current working directory.
    const packageJson: Cli_Utility_RunScripts_Runner_Run_PackageJson = await Runner.readPackageJson();

    if (packageJson === undefined) {
      Logger.error('No "package.json" found in the current directory.');

      process.exitCode = 1;

      return;
    }

    const scripts: Cli_Utility_RunScripts_Runner_Run_Scripts = packageJson['scripts'] as Cli_Utility_RunScripts_Runner_Run_Scripts;

    if (scripts === undefined) {
      Logger.warn('No "scripts" field found in "package.json".');

      return;
    }

    // Match scripts by the provided pattern.
    const matchedScripts: Cli_Utility_RunScripts_Runner_Run_MatchedScripts = Runner.matchScripts(scripts, pattern);

    if (matchedScripts.length === 0) {
      Logger.warn(`No scripts matched the pattern "${pattern}".`);

      return;
    }

    Logger.info(`Matched ${matchedScripts.length} script(s): ${matchedScripts.map((name) => chalk.cyan(name)).join(', ')}`);

    // Run scripts in the selected mode.
    if (options['sequential'] === true) {
      for (const matchedScript of matchedScripts) {
        process.stdout.write(`\n┌─ ${chalk.cyan(matchedScript)} ──\n`);

        const exitCode: Cli_Utility_RunScripts_Runner_Run_ExitCode = await Runner.spawnScript(matchedScript);

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
      const bufferMs: Cli_Utility_RunScripts_Runner_Run_BufferMs = Number(options['buffer'] ?? '500');

      if (
        Number.isNaN(bufferMs) === true
        || bufferMs <= 0
        || Number.isInteger(bufferMs) === false
      ) {
        Logger.error('The --buffer value must be a positive integer.');

        process.exitCode = 1;

        return;
      }

      await Runner.runParallel(matchedScripts, bufferMs);

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
   * @returns {Cli_Utility_RunScripts_Runner_ReadPackageJson_Returns}
   *
   * @since 0.14.0
   */
  private static async readPackageJson(): Cli_Utility_RunScripts_Runner_ReadPackageJson_Returns {
    const packageJsonPath: Cli_Utility_RunScripts_Runner_ReadPackageJson_PackageJsonPath = resolve(process.cwd(), 'package.json');

    try {
      const raw: Cli_Utility_RunScripts_Runner_ReadPackageJson_Raw = await readFile(packageJsonPath, 'utf-8');

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
   * @returns {Cli_Utility_RunScripts_Runner_GetNpmCommand_Returns}
   *
   * @since 0.14.0
   */
  private static getNpmCommand(): Cli_Utility_RunScripts_Runner_GetNpmCommand_Returns {
    return (platform() === 'win32') ? 'npm.cmd' : 'npm';
  }

  /**
   * CLI - Utility - Run Scripts - Match Scripts.
   *
   * Filters script names by a trailing-wildcard pattern like "build:*" or returns an exact
   * match. Called by run to determine which to execute.
   *
   * @param {Cli_Utility_RunScripts_Runner_MatchScripts_Scripts} scripts - Scripts.
   * @param {Cli_Utility_RunScripts_Runner_MatchScripts_Pattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {Cli_Utility_RunScripts_Runner_MatchScripts_Returns}
   *
   * @since 0.14.0
   */
  private static matchScripts(scripts: Cli_Utility_RunScripts_Runner_MatchScripts_Scripts, pattern: Cli_Utility_RunScripts_Runner_MatchScripts_Pattern): Cli_Utility_RunScripts_Runner_MatchScripts_Returns {
    if (pattern.endsWith('*') === true) {
      const prefix: Cli_Utility_RunScripts_Runner_MatchScripts_Prefix = pattern.slice(0, -1);

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
   * @param {Cli_Utility_RunScripts_Runner_SpawnScript_Script} script - Script.
   *
   * @private
   *
   * @returns {Cli_Utility_RunScripts_Runner_SpawnScript_Returns}
   *
   * @since 0.14.0
   */
  private static spawnScript(script: Cli_Utility_RunScripts_Runner_SpawnScript_Script): Cli_Utility_RunScripts_Runner_SpawnScript_Returns {
    const npmCommand: Cli_Utility_RunScripts_Runner_SpawnScript_NpmCommand = Runner.getNpmCommand();

    return new Promise((promiseResolve, reject) => {
      const child: Cli_Utility_RunScripts_Runner_SpawnScript_Child = spawn(npmCommand, [
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
   * @param {Cli_Utility_RunScripts_Runner_RunParallel_MatchedScripts} matchedScripts - Matched scripts.
   * @param {Cli_Utility_RunScripts_Runner_RunParallel_BufferMs}       bufferMs       - Buffer ms.
   *
   * @private
   *
   * @returns {Cli_Utility_RunScripts_Runner_RunParallel_Returns}
   *
   * @since 0.15.0
   */
  private static async runParallel(matchedScripts: Cli_Utility_RunScripts_Runner_RunParallel_MatchedScripts, bufferMs: Cli_Utility_RunScripts_Runner_RunParallel_BufferMs): Cli_Utility_RunScripts_Runner_RunParallel_Returns {
    const npmCommand: Cli_Utility_RunScripts_Runner_RunParallel_NpmCommand = Runner.getNpmCommand();

    // Build color-coded prefixes for each script.
    const colorFunctions: Cli_Utility_RunScripts_Runner_RunParallel_ColorFunctions = [
      chalk.cyan,
      chalk.yellow,
      chalk.magenta,
      chalk.green,
      chalk.blue,
      chalk.red,
    ];
    const prefixes: Cli_Utility_RunScripts_Runner_RunParallel_Prefixes = new Map();

    for (let colorIndex: Cli_Utility_RunScripts_Runner_RunParallel_ColorIndex = 0; colorIndex < matchedScripts.length; colorIndex += 1) {
      const script: Cli_Utility_RunScripts_Runner_RunParallel_Script = matchedScripts[colorIndex] as Cli_Utility_RunScripts_Runner_RunParallel_Script;
      const colorFunction: Cli_Utility_RunScripts_Runner_RunParallel_ColorFunction = colorFunctions[colorIndex % colorFunctions.length] as Cli_Utility_RunScripts_Runner_RunParallel_ColorFunction;
      const coloredPrefix: Cli_Utility_RunScripts_Runner_RunParallel_ColoredPrefix = colorFunction(`[${script}]`);

      prefixes.set(script, coloredPrefix);
    }

    // Shared queue and state.
    const queue: Cli_Utility_RunScripts_Runner_RunParallel_Queue = [];
    const partialLines: Cli_Utility_RunScripts_Runner_RunParallel_PartialLines = new Map();
    const children: Cli_Utility_RunScripts_Runner_RunParallel_Children = [];
    const exitPromises: Cli_Utility_RunScripts_Runner_RunParallel_ExitPromises = [];

    let lastFlushedScript: Cli_Utility_RunScripts_Runner_RunParallel_LastFlushedScript = '';

    // Flush all queued lines with prefixes and blank-line separators.
    const flushQueue: Cli_Utility_RunScripts_Runner_RunParallel_FlushQueue = () => {
      for (const entry of queue) {
        const prefix: Cli_Utility_RunScripts_Runner_RunParallel_Prefix = prefixes.get(entry['script']) ?? `[${entry['script']}]`;

        if (lastFlushedScript !== '' && lastFlushedScript !== entry['script']) {
          process.stdout.write('\n');
        }

        lastFlushedScript = entry['script'];

        const formattedLine: Cli_Utility_RunScripts_Runner_RunParallel_FormattedLine = `${prefix} ${entry['line']}\n`;

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
      const child: Cli_Utility_RunScripts_Runner_RunParallel_Child = spawn(npmCommand, [
        'run',
        script,
      ], {
        stdio: 'pipe',
        shell: false,
      });

      children.push(child);

      partialLines.set(script, '');

      // Handle incoming data by splitting into lines and queuing.
      const handleData: Cli_Utility_RunScripts_Runner_RunParallel_HandleData = (data, stream) => {
        const text: Cli_Utility_RunScripts_Runner_RunParallel_Text = (partialLines.get(script) ?? '') + data.toString();
        const lines: Cli_Utility_RunScripts_Runner_RunParallel_Lines = text.split('\n');

        // Hold the last segment as a partial line.
        const partial: Cli_Utility_RunScripts_Runner_RunParallel_Partial = lines.pop() ?? '';

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
      const exitPromise: Cli_Utility_RunScripts_Runner_RunParallel_ExitPromise = new Promise((promiseResolve) => {
        child.on('close', (code) => {
          const partial: Cli_Utility_RunScripts_Runner_RunParallel_Partial = partialLines.get(script) ?? '';

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
    const flushInterval: Cli_Utility_RunScripts_Runner_RunParallel_FlushInterval = setInterval(flushQueue, bufferMs);

    // Forward signals to children.
    const forwardSignal: Cli_Utility_RunScripts_Runner_RunParallel_ForwardSignal = (signal) => {
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
    const exitResults: Cli_Utility_RunScripts_Runner_RunParallel_ExitResults = await Promise.allSettled(exitPromises);

    // Final flush and cleanup.
    clearInterval(flushInterval);
    flushQueue();

    const failed: Cli_Utility_RunScripts_Runner_RunParallel_Failed = exitResults.some(
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
