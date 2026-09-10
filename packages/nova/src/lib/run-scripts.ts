import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { platform } from 'node:os';
import { resolve } from 'node:path';

import chalk from 'chalk';

import type {
  Lib_RunScripts_Runner_GetNpmCommand_Returns,
  Lib_RunScripts_Runner_MatchScripts_Pattern,
  Lib_RunScripts_Runner_MatchScripts_Prefix,
  Lib_RunScripts_Runner_MatchScripts_Returns,
  Lib_RunScripts_Runner_MatchScripts_Scripts,
  Lib_RunScripts_Runner_ReadPackageJson_PackageJsonPath,
  Lib_RunScripts_Runner_ReadPackageJson_Raw,
  Lib_RunScripts_Runner_ReadPackageJson_Returns,
  Lib_RunScripts_Runner_Run_BufferMs,
  Lib_RunScripts_Runner_Run_ExitCode,
  Lib_RunScripts_Runner_Run_MatchedScripts,
  Lib_RunScripts_Runner_Run_Options,
  Lib_RunScripts_Runner_Run_PackageJson,
  Lib_RunScripts_Runner_Run_ParallelExitCode,
  Lib_RunScripts_Runner_Run_Pattern,
  Lib_RunScripts_Runner_Run_Returns,
  Lib_RunScripts_Runner_Run_Scripts,
  Lib_RunScripts_Runner_Run_SpawnErrorMessage,
  Lib_RunScripts_Runner_RunParallel_BufferMs,
  Lib_RunScripts_Runner_RunParallel_Child,
  Lib_RunScripts_Runner_RunParallel_Children,
  Lib_RunScripts_Runner_RunParallel_Close_PartialLineStreams,
  Lib_RunScripts_Runner_RunParallel_Close_StderrPartial,
  Lib_RunScripts_Runner_RunParallel_Close_StdoutPartial,
  Lib_RunScripts_Runner_RunParallel_ColoredPrefix,
  Lib_RunScripts_Runner_RunParallel_ColorFunction,
  Lib_RunScripts_Runner_RunParallel_ColorFunctions,
  Lib_RunScripts_Runner_RunParallel_ColorIndex,
  Lib_RunScripts_Runner_RunParallel_Data_Returns,
  Lib_RunScripts_Runner_RunParallel_Error_Returns,
  Lib_RunScripts_Runner_RunParallel_ExitPromise,
  Lib_RunScripts_Runner_RunParallel_ExitPromises,
  Lib_RunScripts_Runner_RunParallel_ExitResults,
  Lib_RunScripts_Runner_RunParallel_Failed,
  Lib_RunScripts_Runner_RunParallel_FlushInterval,
  Lib_RunScripts_Runner_RunParallel_FlushQueue,
  Lib_RunScripts_Runner_RunParallel_FlushQueue_FormattedLine,
  Lib_RunScripts_Runner_RunParallel_FlushQueue_Prefix,
  Lib_RunScripts_Runner_RunParallel_ForwardSignal,
  Lib_RunScripts_Runner_RunParallel_ForwardSignal_Returns,
  Lib_RunScripts_Runner_RunParallel_HandleData,
  Lib_RunScripts_Runner_RunParallel_HandleData_Lines,
  Lib_RunScripts_Runner_RunParallel_HandleData_Partial,
  Lib_RunScripts_Runner_RunParallel_HandleData_PartialLineStreams,
  Lib_RunScripts_Runner_RunParallel_HandleData_Text,
  Lib_RunScripts_Runner_RunParallel_HandleSigint,
  Lib_RunScripts_Runner_RunParallel_HandleSigterm,
  Lib_RunScripts_Runner_RunParallel_LastFlushedScript,
  Lib_RunScripts_Runner_RunParallel_MatchedScripts,
  Lib_RunScripts_Runner_RunParallel_NpmCommand,
  Lib_RunScripts_Runner_RunParallel_PartialLines,
  Lib_RunScripts_Runner_RunParallel_Prefixes,
  Lib_RunScripts_Runner_RunParallel_Queue,
  Lib_RunScripts_Runner_RunParallel_Returns,
  Lib_RunScripts_Runner_RunParallel_Script,
  Lib_RunScripts_Runner_RunParallel_ScriptPartialLines,
  Lib_RunScripts_Runner_RunParallel_WriteStderr,
  Lib_RunScripts_Runner_RunParallel_WriteStdout,
  Lib_RunScripts_Runner_SpawnScript_Child,
  Lib_RunScripts_Runner_SpawnScript_Close_ExitCode,
  Lib_RunScripts_Runner_SpawnScript_Error_Returns,
  Lib_RunScripts_Runner_SpawnScript_NpmCommand,
  Lib_RunScripts_Runner_SpawnScript_Returns,
  Lib_RunScripts_Runner_SpawnScript_Script,
} from '../types/lib/run-scripts.d.ts';

/**
 * Lib - Run Scripts.
 *
 * Runs matched package.json scripts without depending on either output surface.
 * The public CLI and repository bootstrap provide only their output adapters.
 *
 * @since 0.26.0
 */
export class Runner {
  /**
   * Lib - Run Scripts - Run.
   *
   * Validates options, reads package.json, matches scripts by pattern, then spawns them
   * sequentially or in parallel depending on the selected mode.
   *
   * @param {Lib_RunScripts_Runner_Run_Options} options - Options.
   *
   * @returns {Lib_RunScripts_Runner_Run_Returns}
   *
   * @since 0.26.0
   */
  public static async run(options: Lib_RunScripts_Runner_Run_Options): Lib_RunScripts_Runner_Run_Returns {
    if (options['pattern'] === undefined) {
      options.printError('A script name pattern is required (e.g., "build:*").');

      return 1;
    }

    if (options['sequential'] === true && options['parallel'] === true) {
      options.printError('Specify either --sequential or --parallel, not both.');

      return 1;
    }

    if (options['sequential'] === undefined && options['parallel'] === undefined) {
      options.printError('Specify --sequential or --parallel.');

      return 1;
    }

    const pattern: Lib_RunScripts_Runner_Run_Pattern = options['pattern'];

    // Read the "package.json" from the current working directory.
    const packageJson: Lib_RunScripts_Runner_Run_PackageJson = await Runner.readPackageJson();

    if (packageJson === undefined) {
      options.printError('No "package.json" found in the current directory.');

      return 1;
    }

    const scripts: Lib_RunScripts_Runner_Run_Scripts = packageJson['scripts'] as Lib_RunScripts_Runner_Run_Scripts;

    if (scripts === undefined) {
      options.printWarn('No "scripts" field found in "package.json".');

      return 0;
    }

    // Match scripts by the provided pattern.
    const matchedScripts: Lib_RunScripts_Runner_Run_MatchedScripts = Runner.matchScripts(scripts, pattern);

    if (matchedScripts.length === 0) {
      options.printWarn(`No scripts matched the pattern "${pattern}".`);

      return 0;
    }

    options.printInfo(`Matched ${matchedScripts.length} script(s): ${matchedScripts.map((name) => chalk.cyan(name)).join(', ')}`);

    // Run scripts in the selected mode.
    if (options['sequential'] === true) {
      for (const matchedScript of matchedScripts) {
        options.writeStdout(`\n┌─ ${chalk.cyan(matchedScript)} ──\n`);

        try {
          const exitCode: Lib_RunScripts_Runner_Run_ExitCode = await Runner.spawnScript(matchedScript);

          if (exitCode !== 0) {
            options.writeStderr(`└─ ${chalk.cyan(matchedScript)} ── ${chalk.red(`✗ (exit code ${exitCode})`)}\n`);

            return 1;
          }

          options.writeStdout(`└─ ${chalk.cyan(matchedScript)} ── ${chalk.green('✓')}\n`);
        } catch (error) {
          const spawnErrorMessage: Lib_RunScripts_Runner_Run_SpawnErrorMessage = (error instanceof Error) ? error.message : String(error);

          options.printError(`Script "${matchedScript}" failed to start: ${spawnErrorMessage}`);

          return 1;
        }
      }

      options.writeStdout('\n');

      options.printInfo('All scripts completed successfully.');

      return 0;
    }

    if (options['parallel'] === true) {
      const bufferMs: Lib_RunScripts_Runner_Run_BufferMs = Number(options['buffer'] ?? '500');

      if (
        Number.isNaN(bufferMs) === true
        || bufferMs <= 0
        || Number.isInteger(bufferMs) === false
      ) {
        options.printError('The --buffer value must be a positive integer.');

        return 1;
      }

      const parallelExitCode: Lib_RunScripts_Runner_Run_ParallelExitCode = await Runner.runParallel(
        matchedScripts,
        bufferMs,
        options['writeStderr'],
        options['writeStdout'],
      );

      if (parallelExitCode > 0) {
        return 1;
      }

      options.writeStdout('\n');

      options.printInfo('All scripts completed successfully.');

      return 0;
    }

    return 0;
  }

  /**
   * Lib - Run Scripts - Read package.json.
   *
   * Reads and parses the package.json from the current working directory. Returns undefined if
   * the file does not exist or cannot be parsed.
   *
   * @private
   *
   * @returns {Lib_RunScripts_Runner_ReadPackageJson_Returns}
   *
   * @since 0.26.0
   */
  private static async readPackageJson(): Lib_RunScripts_Runner_ReadPackageJson_Returns {
    const packageJsonPath: Lib_RunScripts_Runner_ReadPackageJson_PackageJsonPath = resolve(process.cwd(), 'package.json');

    try {
      const raw: Lib_RunScripts_Runner_ReadPackageJson_Raw = await readFile(packageJsonPath, 'utf-8');

      return JSON.parse(raw);
    } catch {
      return undefined;
    }
  }

  /**
   * Lib - Run Scripts - Get npm Command.
   *
   * Returns the platform-appropriate npm executable name. Windows requires "npm.cmd" while
   * POSIX systems use "npm" directly.
   *
   * @private
   *
   * @returns {Lib_RunScripts_Runner_GetNpmCommand_Returns}
   *
   * @since 0.26.0
   */
  private static getNpmCommand(): Lib_RunScripts_Runner_GetNpmCommand_Returns {
    return (platform() === 'win32') ? 'npm.cmd' : 'npm';
  }

  /**
   * Lib - Run Scripts - Match Scripts.
   *
   * Filters script names by a trailing-wildcard pattern like "build:*" or returns an exact
   * match. Called by run to determine which to execute.
   *
   * @param {Lib_RunScripts_Runner_MatchScripts_Scripts} scripts - Scripts.
   * @param {Lib_RunScripts_Runner_MatchScripts_Pattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {Lib_RunScripts_Runner_MatchScripts_Returns}
   *
   * @since 0.26.0
   */
  private static matchScripts(scripts: Lib_RunScripts_Runner_MatchScripts_Scripts, pattern: Lib_RunScripts_Runner_MatchScripts_Pattern): Lib_RunScripts_Runner_MatchScripts_Returns {
    if (pattern.endsWith('*') === true) {
      const prefix: Lib_RunScripts_Runner_MatchScripts_Prefix = pattern.slice(0, -1);

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
   * Lib - Run Scripts - Spawn Script.
   *
   * Spawns a single npm run command with inherited stdio for real-time output. Used by
   * sequential mode to stream output as scripts run.
   *
   * @param {Lib_RunScripts_Runner_SpawnScript_Script} script - Script.
   *
   * @private
   *
   * @returns {Lib_RunScripts_Runner_SpawnScript_Returns}
   *
   * @since 0.26.0
   */
  private static spawnScript(script: Lib_RunScripts_Runner_SpawnScript_Script): Lib_RunScripts_Runner_SpawnScript_Returns {
    const npmCommand: Lib_RunScripts_Runner_SpawnScript_NpmCommand = Runner.getNpmCommand();

    return new Promise((promiseResolve, reject) => {
      const child: Lib_RunScripts_Runner_SpawnScript_Child = spawn(npmCommand, [
        'run',
        script,
      ], {
        stdio: 'inherit',
        shell: false,
      });

      child.on('close', (code) => {
        const exitCode: Lib_RunScripts_Runner_SpawnScript_Close_ExitCode = code ?? 1;

        promiseResolve(exitCode);

        return;
      });

      child.on('error', (error): Lib_RunScripts_Runner_SpawnScript_Error_Returns => {
        reject(error);

        return;
      });

      return;
    });
  }

  /**
   * Lib - Run Scripts - Run Parallel.
   *
   * Spawns matched scripts with piped stdio and streams their
   * output through colored prefixes using a time-windowed log queue
   * that groups consecutive lines from the same script visually.
   *
   * @param {Lib_RunScripts_Runner_RunParallel_MatchedScripts} matchedScripts - Matched scripts.
   * @param {Lib_RunScripts_Runner_RunParallel_BufferMs}       bufferMs       - Buffer ms.
   * @param {Lib_RunScripts_Runner_RunParallel_WriteStderr}    writeStderr    - Write stderr.
   * @param {Lib_RunScripts_Runner_RunParallel_WriteStdout}    writeStdout    - Write stdout.
   *
   * @private
   *
   * @returns {Lib_RunScripts_Runner_RunParallel_Returns}
   *
   * @since 0.26.0
   */
  private static async runParallel(matchedScripts: Lib_RunScripts_Runner_RunParallel_MatchedScripts, bufferMs: Lib_RunScripts_Runner_RunParallel_BufferMs, writeStderr: Lib_RunScripts_Runner_RunParallel_WriteStderr, writeStdout: Lib_RunScripts_Runner_RunParallel_WriteStdout): Lib_RunScripts_Runner_RunParallel_Returns {
    const npmCommand: Lib_RunScripts_Runner_RunParallel_NpmCommand = Runner.getNpmCommand();

    // Build color-coded prefixes for each script.
    const colorFunctions: Lib_RunScripts_Runner_RunParallel_ColorFunctions = [
      chalk.cyan,
      chalk.yellow,
      chalk.magenta,
      chalk.green,
      chalk.blue,
      chalk.red,
    ];
    const prefixes: Lib_RunScripts_Runner_RunParallel_Prefixes = new Map();

    for (let colorIndex: Lib_RunScripts_Runner_RunParallel_ColorIndex = 0; colorIndex < matchedScripts.length; colorIndex += 1) {
      const script: Lib_RunScripts_Runner_RunParallel_Script = matchedScripts[colorIndex] as Lib_RunScripts_Runner_RunParallel_Script;
      const colorFunction: Lib_RunScripts_Runner_RunParallel_ColorFunction = colorFunctions[colorIndex % colorFunctions.length] as Lib_RunScripts_Runner_RunParallel_ColorFunction;
      const coloredPrefix: Lib_RunScripts_Runner_RunParallel_ColoredPrefix = colorFunction(`[${script}]`);

      prefixes.set(script, coloredPrefix);
    }

    // Shared queue and state.
    const queue: Lib_RunScripts_Runner_RunParallel_Queue = [];
    const partialLines: Lib_RunScripts_Runner_RunParallel_PartialLines = new Map();
    const children: Lib_RunScripts_Runner_RunParallel_Children = [];
    const exitPromises: Lib_RunScripts_Runner_RunParallel_ExitPromises = [];

    let lastFlushedScript: Lib_RunScripts_Runner_RunParallel_LastFlushedScript = '';

    /**
     * Lib - Run Scripts - Run Parallel - Flush Queue.
     *
     * Writes every queued line to stdout or stderr with its colored prefix and
     * inserts a blank separator whenever output switches to a different script.
     *
     * @private
     *
     * @since 0.26.0
     */
    // Flush all queued lines with prefixes and blank-line separators.
    const flushQueue: Lib_RunScripts_Runner_RunParallel_FlushQueue = () => {
      for (const entry of queue) {
        const prefix: Lib_RunScripts_Runner_RunParallel_FlushQueue_Prefix = prefixes.get(entry['script']) ?? `[${entry['script']}]`;

        if (lastFlushedScript !== '' && lastFlushedScript !== entry['script']) {
          writeStdout('\n');
        }

        lastFlushedScript = entry['script'];

        const formattedLine: Lib_RunScripts_Runner_RunParallel_FlushQueue_FormattedLine = `${prefix} ${entry['line']}\n`;

        if (entry['stream'] === 'stderr') {
          writeStderr(formattedLine);
        } else {
          writeStdout(formattedLine);
        }
      }

      queue.length = 0;

      return;
    };

    // Spawn all scripts with piped stdio.
    for (const script of matchedScripts) {
      const child: Lib_RunScripts_Runner_RunParallel_Child = spawn(npmCommand, [
        'run',
        script,
      ], {
        stdio: 'pipe',
        shell: false,
      });

      children.push(child);

      const scriptPartialLines: Lib_RunScripts_Runner_RunParallel_ScriptPartialLines = new Map([
        [
          'stdout' as const,
          '',
        ],
        [
          'stderr' as const,
          '',
        ],
      ]);

      partialLines.set(script, scriptPartialLines);

      /**
       * Lib - Run Scripts - Run Parallel - Handle Data.
       *
       * Appends the chunk to any held partial line, splits the buffer on newlines,
       * queues each complete line, and retains the trailing segment as the new partial.
       *
       * @param {Buffer}               data   - Data.
       * @param {'stdout' | 'stderr'}  stream - Stream.
       *
       * @private
       *
       * @since 0.26.0
       */
      // Handle incoming data by splitting into lines and queuing.
      const handleData: Lib_RunScripts_Runner_RunParallel_HandleData = (data, stream) => {
        const partialLineStreams: Lib_RunScripts_Runner_RunParallel_HandleData_PartialLineStreams = partialLines.get(script) ?? new Map([
          [
            'stdout' as const,
            '',
          ],
          [
            'stderr' as const,
            '',
          ],
        ]);
        const text: Lib_RunScripts_Runner_RunParallel_HandleData_Text = (partialLineStreams.get(stream) ?? '') + data.toString();
        const lines: Lib_RunScripts_Runner_RunParallel_HandleData_Lines = text.split('\n');

        // Hold the last segment as a partial line.
        const partial: Lib_RunScripts_Runner_RunParallel_HandleData_Partial = lines.pop() ?? '';

        partialLineStreams.set(stream, partial);

        partialLines.set(script, partialLineStreams);

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

      child.stdout.on('data', (data): Lib_RunScripts_Runner_RunParallel_Data_Returns => {
        handleData(data, 'stdout');

        return;
      });

      child.stderr.on('data', (data): Lib_RunScripts_Runner_RunParallel_Data_Returns => {
        handleData(data, 'stderr');

        return;
      });

      // Track exit and flush remaining partial line.
      const exitPromise: Lib_RunScripts_Runner_RunParallel_ExitPromise = new Promise((promiseResolve) => {
        child.on('close', (code) => {
          const partialLineStreams: Lib_RunScripts_Runner_RunParallel_Close_PartialLineStreams = partialLines.get(script) ?? new Map([
            [
              'stdout' as const,
              '',
            ],
            [
              'stderr' as const,
              '',
            ],
          ]);
          const stdoutPartial: Lib_RunScripts_Runner_RunParallel_Close_StdoutPartial = partialLineStreams.get('stdout') ?? '';
          const stderrPartial: Lib_RunScripts_Runner_RunParallel_Close_StderrPartial = partialLineStreams.get('stderr') ?? '';

          if (stdoutPartial.length > 0) {
            queue.push({
              script,
              stream: 'stdout',
              line: stdoutPartial,
            });
          }

          if (stderrPartial.length > 0) {
            queue.push({
              script,
              stream: 'stderr',
              line: stderrPartial,
            });
          }

          partialLineStreams.set('stdout', '');
          partialLineStreams.set('stderr', '');

          partialLines.set(script, partialLineStreams);

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

        child.on('error', (error): Lib_RunScripts_Runner_RunParallel_Error_Returns => {
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
    const flushInterval: Lib_RunScripts_Runner_RunParallel_FlushInterval = setInterval(flushQueue, bufferMs);

    /**
     * Lib - Run Scripts - Run Parallel - Forward Signal.
     *
     * Relays the received termination signal to every spawned child process so a
     * parent interrupt propagates cleanly to all running scripts at once.
     *
     * @param {NodeJS.Signals} signal - Signal.
     *
     * @private
     *
     * @returns {Lib_RunScripts_Runner_RunParallel_ForwardSignal_Returns}
     *
     * @since 0.26.0
     */
    // Forward signals to children.
    const forwardSignal: Lib_RunScripts_Runner_RunParallel_ForwardSignal = (signal): Lib_RunScripts_Runner_RunParallel_ForwardSignal_Returns => {
      for (const child of children) {
        child.kill(signal);
      }

      return;
    };

    /**
     * Lib - Run Scripts - Run Parallel - Handle SIGINT.
     *
     * Detaches this named listener after the parallel run so repeated programmatic runs do not
     * accumulate process-level signal handlers.
     *
     * @private
     *
     * @returns {Lib_RunScripts_Runner_RunParallel_SIGINT_Returns}
     *
     * @since 0.26.0
     */
    const handleSigint: Lib_RunScripts_Runner_RunParallel_HandleSigint = () => {
      forwardSignal('SIGINT');

      return;
    };

    /**
     * Lib - Run Scripts - Run Parallel - Handle SIGTERM.
     *
     * Detaches this named listener after the parallel run so repeated programmatic runs do not
     * accumulate process-level signal handlers.
     *
     * @private
     *
     * @returns {Lib_RunScripts_Runner_RunParallel_SIGTERM_Returns}
     *
     * @since 0.26.0
     */
    const handleSigterm: Lib_RunScripts_Runner_RunParallel_HandleSigterm = () => {
      forwardSignal('SIGTERM');

      return;
    };

    process.on('SIGINT', handleSigint);
    process.on('SIGTERM', handleSigterm);

    // Wait for all children to exit.
    const exitResults: Lib_RunScripts_Runner_RunParallel_ExitResults = await Promise.allSettled(exitPromises).finally(() => {
      clearInterval(flushInterval);

      process.off('SIGINT', handleSigint);

      process.off('SIGTERM', handleSigterm);

      flushQueue();

      return;
    });

    const failed: Lib_RunScripts_Runner_RunParallel_Failed = exitResults.some(
      (exitResult) => exitResult.status === 'rejected'
        || (
          exitResult.status === 'fulfilled'
          && exitResult.value !== 0
        ),
    );

    if (failed === true) {
      return 1;
    }

    return 0;
  }
}
