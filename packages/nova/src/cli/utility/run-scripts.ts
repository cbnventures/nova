import { spawn } from 'child_process';
import { readFile } from 'fs/promises';
import { platform } from 'os';
import { resolve } from 'path';

import chalk from 'chalk';

import { Logger } from '@/toolkit/index.js';

import type {
  CLIUtilityRunScriptsGetNpmCommandReturns,
  CLIUtilityRunScriptsMatchScriptsPattern,
  CLIUtilityRunScriptsMatchScriptsReturns,
  CLIUtilityRunScriptsMatchScriptsScripts,
  CLIUtilityRunScriptsReadPackageJsonParsed,
  CLIUtilityRunScriptsReadPackageJsonReturns,
  CLIUtilityRunScriptsRunOptions,
  CLIUtilityRunScriptsRunReturns,
  CLIUtilityRunScriptsRunScripts,
  CLIUtilityRunScriptsSpawnScriptBufferedReturns,
  CLIUtilityRunScriptsSpawnScriptBufferedScript,
  CLIUtilityRunScriptsSpawnScriptReturns,
  CLIUtilityRunScriptsSpawnScriptScript,
} from '@/types/cli/utility/run-scripts.d.ts';

/**
 * CLI Utility - Run Scripts.
 *
 * @since 1.0.0
 */
export class CLIUtilityRunScripts {
  /**
   * CLI Utility - Run Scripts - Run.
   *
   * @param {CLIUtilityRunScriptsRunOptions} options - Options.
   *
   * @returns {CLIUtilityRunScriptsRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIUtilityRunScriptsRunOptions): CLIUtilityRunScriptsRunReturns {
    if (options.pattern === undefined) {
      Logger.error('A script name pattern is required (e.g., "build:*").');

      process.exitCode = 1;

      return;
    }

    if (options.sequential === true && options.parallel === true) {
      Logger.error('Specify either --sequential or --parallel, not both.');

      process.exitCode = 1;

      return;
    }

    if (options.sequential === undefined && options.parallel === undefined) {
      Logger.error('Specify --sequential or --parallel.');

      process.exitCode = 1;

      return;
    }

    const pattern = options.pattern;

    // Read the "package.json" from the current working directory.
    const packageJson = await CLIUtilityRunScripts.readPackageJson();

    if (packageJson === undefined) {
      Logger.error('No "package.json" found in the current directory.');

      process.exitCode = 1;

      return;
    }

    const scripts: CLIUtilityRunScriptsRunScripts = packageJson['scripts'] as CLIUtilityRunScriptsRunScripts;

    if (scripts === undefined) {
      Logger.warn('No "scripts" field found in "package.json".');

      return;
    }

    // Match scripts by the provided pattern.
    const matched = CLIUtilityRunScripts.matchScripts(scripts, pattern);

    if (matched.length === 0) {
      Logger.warn(`No scripts matched the pattern "${pattern}".`);

      return;
    }

    Logger.info(`Matched ${matched.length} script(s): ${matched.map((name) => chalk.cyan(name)).join(', ')}`);

    // Run scripts in the selected mode.
    if (options.sequential === true) {
      for (const script of matched) {
        process.stdout.write(`\n┌─ ${chalk.cyan(script)} ──\n`);

        const exitCode = await CLIUtilityRunScripts.spawnScript(script);

        if (exitCode !== 0) {
          process.stderr.write(`└─ ${chalk.cyan(script)} ── ${chalk.red(`✗ (exit code ${exitCode})`)}\n`);

          process.exitCode = 1;

          return;
        }

        process.stdout.write(`└─ ${chalk.cyan(script)} ── ${chalk.green('✓')}\n`);
      }

      Logger.customize({ padTop: 1 }).info('All scripts completed successfully.');
    }

    if (options.parallel === true) {
      const results = await Promise.allSettled(
        matched.map((script) => CLIUtilityRunScripts.spawnScriptBuffered(script)),
      );

      let failed = false;

      for (let i = 0; i < results.length; i += 1) {
        const result = results[i];
        const script = matched[i];

        if (result === undefined || script === undefined) {
          continue;
        }

        if (result.status === 'rejected') {
          process.stdout.write(`\n┌─ ${chalk.cyan(script)} ──\n`);
          process.stderr.write(`└─ ${chalk.cyan(script)} ── ${chalk.red(`✗ rejected: ${result.reason}`)}\n`);

          failed = true;

          continue;
        }

        const { exitCode, stdout, stderr } = result.value;

        process.stdout.write(`\n┌─ ${chalk.cyan(script)} ──\n`);

        if (stdout.length > 0) {
          process.stdout.write(stdout);
        }

        if (stderr.length > 0) {
          process.stderr.write(stderr);
        }

        if (exitCode !== 0) {
          process.stderr.write(`└─ ${chalk.cyan(script)} ── ${chalk.red(`✗ (exit code ${exitCode})`)}\n`);

          failed = true;
        } else {
          process.stdout.write(`└─ ${chalk.cyan(script)} ── ${chalk.green('✓')}\n`);
        }
      }

      if (failed === true) {
        process.exitCode = 1;

        return;
      }

      Logger.customize({ padTop: 1 }).info('All scripts completed successfully.');
    }
  }

  /**
   * CLI Utility - Run Scripts - Read package.json.
   *
   * @private
   *
   * @returns {CLIUtilityRunScriptsReadPackageJsonReturns}
   *
   * @since 1.0.0
   */
  private static async readPackageJson(): CLIUtilityRunScriptsReadPackageJsonReturns {
    const packageJsonPath = resolve(process.cwd(), 'package.json');

    try {
      const raw = await readFile(packageJsonPath, 'utf-8');
      const parsed: CLIUtilityRunScriptsReadPackageJsonParsed = JSON.parse(raw);

      return parsed;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * CLI Utility - Run Scripts - Get npm command.
   *
   * @private
   *
   * @returns {CLIUtilityRunScriptsGetNpmCommandReturns}
   *
   * @since 1.0.0
   */
  private static getNpmCommand(): CLIUtilityRunScriptsGetNpmCommandReturns {
    return (platform() === 'win32') ? 'npm.cmd' : 'npm';
  }

  /**
   * CLI Utility - Run Scripts - Match scripts.
   *
   * @param {CLIUtilityRunScriptsMatchScriptsScripts} scripts - Scripts.
   * @param {CLIUtilityRunScriptsMatchScriptsPattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {CLIUtilityRunScriptsMatchScriptsReturns}
   *
   * @since 1.0.0
   */
  private static matchScripts(scripts: CLIUtilityRunScriptsMatchScriptsScripts, pattern: CLIUtilityRunScriptsMatchScriptsPattern): CLIUtilityRunScriptsMatchScriptsReturns {
    if (pattern.endsWith('*')) {
      const prefix = pattern.slice(0, -1);

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
   * CLI Utility - Run Scripts - Spawn script.
   *
   * @param {CLIUtilityRunScriptsSpawnScriptScript} script - Script.
   *
   * @private
   *
   * @returns {CLIUtilityRunScriptsSpawnScriptReturns}
   *
   * @since 1.0.0
   */
  private static spawnScript(script: CLIUtilityRunScriptsSpawnScriptScript): CLIUtilityRunScriptsSpawnScriptReturns {
    const npmCommand = CLIUtilityRunScripts.getNpmCommand();

    return new Promise((promiseResolve, reject) => {
      const child = spawn(npmCommand, ['run', script], {
        stdio: 'inherit',
        shell: false,
      });

      child.on('close', (code) => {
        promiseResolve(code ?? 1);
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * CLI Utility - Run Scripts - Spawn script buffered.
   *
   * @param {CLIUtilityRunScriptsSpawnScriptBufferedScript} script - Script.
   *
   * @private
   *
   * @returns {CLIUtilityRunScriptsSpawnScriptBufferedReturns}
   *
   * @since 1.0.0
   */
  private static spawnScriptBuffered(script: CLIUtilityRunScriptsSpawnScriptBufferedScript): CLIUtilityRunScriptsSpawnScriptBufferedReturns {
    const npmCommand = CLIUtilityRunScripts.getNpmCommand();

    return new Promise((promiseResolve, reject) => {
      const child = spawn(npmCommand, ['run', script], {
        stdio: 'pipe',
        shell: false,
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data: Buffer) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data: Buffer) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        promiseResolve({
          exitCode: code ?? 1,
          stdout,
          stderr,
        });
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }
}
