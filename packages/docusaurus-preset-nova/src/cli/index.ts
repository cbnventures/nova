#!/usr/bin/env node
import { CLIHeader, Logger } from '@cbnventures/nova/toolkit';
import chalk from 'chalk';
import { Command } from 'commander';

import packageJson from '../../package.json';
import { Runner as CliI18nCheck } from './i18n/check.js';
import { Runner as CliI18nCoverage } from './i18n/coverage.js';
import { Runner as CliI18nSync } from './i18n/sync.js';

import type {
  Cli_Index_CLI_Constructor_HeaderText,
  Cli_Index_CLI_ExecuteCommand_CommandLabel,
  Cli_Index_CLI_ExecuteCommand_Options,
  Cli_Index_CLI_ExecuteCommand_Returns,
  Cli_Index_CLI_ExecuteCommand_Target,
  Cli_Index_CLI_GetHeader_Returns,
  Cli_Index_CLI_HandleCliError_ProcessedText,
  Cli_Index_CLI_HandleCliError_Returns,
  Cli_Index_CLI_HandleCliError_Text,
  Cli_Index_CLI_Program,
  Cli_Index_CLI_RegisterCommands_I18n,
  Cli_Index_CLI_RegisterCommands_Returns,
} from '../types/cli/index.d.ts';

/**
 * CLI.
 *
 * Entry point for the theme-nova command-line interface. Registers the i18n
 * sync and check commands and dispatches process input through Commander.
 *
 * @since 0.21.0
 */
class CLI {
  /**
   * CLI - Program.
   *
   * Holds the Commander instance that owns the registered commands, options, and
   * help output for the session.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #program: Cli_Index_CLI_Program = new Command();

  /**
   * CLI - Constructor.
   *
   * Configures the Commander program, registers the command tree, then parses
   * process.argv to dispatch handlers.
   *
   * @since 0.21.0
   */
  public constructor() {
    (async () => {
      const headerText: Cli_Index_CLI_Constructor_HeaderText = this.getHeader();

      this.#program
        .name('theme-nova')
        .usage('<command> <subcommand> [options]')
        .description('i18n tooling for Nova Docusaurus sites')
        .commandsGroup('Commands:')
        .configureOutput({
          writeErr: (text) => process.stdout.write(text),
          outputError: (text) => this.handleCliError(text),
        })
        .addHelpText('beforeAll', headerText)
        .helpCommand(false)
        .helpOption('-h, --help', 'Display the help menu')
        .allowExcessArguments(false)
        .showHelpAfterError();

      // Register commands into Commander.
      this.registerCommands();

      // Parse command-line arguments and dispatch to handlers.
      await this.#program.parseAsync(process.argv);

      return;
    })();

    return;
  }

  /**
   * CLI - Register Commands.
   *
   * Builds the i18n command group with the sync and check subcommands, each
   * delegating to its runner via executeCommand.
   *
   * @private
   *
   * @returns {Cli_Index_CLI_RegisterCommands_Returns}
   *
   * @since 0.21.0
   */
  private registerCommands(): Cli_Index_CLI_RegisterCommands_Returns {
    /**
     * CLI - Register Commands - I18n.
     *
     * Parent command that groups the translation-tree reconciliation
     * subcommands, namely sync and check.
     *
     * @since 0.21.0
     */
    const i18n: Cli_Index_CLI_RegisterCommands_I18n = this.#program
      .command('i18n')
      .usage('<subcommand> [options]')
      .description('Reconcile the i18n translation tree')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    i18n
      .command('sync')
      .usage('[options]')
      .description('Regenerate and reconcile the i18n tree, pruning stale keys')
      .option('-d, --dry-run', 'Compute the full plan without writing any files')
      .option('--delete-defunct', 'Delete orphaned keys during a non-interactive run')
      .option('-l, --locale <locale>', 'Restrict reconciliation to a single locale')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliI18nSync['run']);

        return;
      });

    i18n
      .command('check')
      .usage('[options]')
      .description('Report i18n drift without writing; exit 1 when reconciliation is needed')
      .option('-l, --locale <locale>', 'Restrict the check to a single locale')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliI18nCheck['run']);

        return;
      });

    i18n
      .command('coverage')
      .usage('[options]')
      .description('Report per-locale translation coverage; exit 1 below --min-coverage')
      .option('-l, --locale <locale>', 'Report a single locale, scored against all locales')
      .option('--min-coverage <percent>', 'Exit 1 when any locale is below this percentage')
      .option('--gaps', 'List the untranslated strings and content files per locale')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliI18nCoverage['run']);

        return;
      });

    return;
  }

  /**
   * CLI - Execute Command.
   *
   * Prints the CLI header and the running command label, then delegates to the
   * target handler. Every leaf command calls this.
   *
   * @param {Cli_Index_CLI_ExecuteCommand_Options} options - Options.
   * @param {Cli_Index_CLI_ExecuteCommand_Target}  target  - Target.
   *
   * @private
   *
   * @returns {Cli_Index_CLI_ExecuteCommand_Returns}
   *
   * @since 0.21.0
   */
  private async executeCommand<Options>(options: Cli_Index_CLI_ExecuteCommand_Options<Options>, target: Cli_Index_CLI_ExecuteCommand_Target<Options>): Cli_Index_CLI_ExecuteCommand_Returns {
    // Write the header.
    process.stdout.write(`${this.getHeader()}\n`);

    // Write the running command label.
    let commandLabel: Cli_Index_CLI_ExecuteCommand_CommandLabel = process.argv.slice(2).join(' ');

    if (commandLabel === '') {
      commandLabel = 'N/A';
    }

    process.stdout.write(`${chalk.bold.bgBlue('CURRENTLY RUNNING:')} ${commandLabel}\n\n`);

    // Attempt to run the passed in method.
    await target(options);

    return;
  }

  /**
   * CLI - Get Header.
   *
   * Renders a boxed banner showing the package version and tagline via
   * CLIHeader. Used in help output and at the top of every command.
   *
   * @private
   *
   * @returns {Cli_Index_CLI_GetHeader_Returns}
   *
   * @since 0.21.0
   */
  private getHeader(): Cli_Index_CLI_GetHeader_Returns {
    return CLIHeader.render(
      [
        chalk.yellowBright.bold(`theme-nova v${packageJson['version']}`),
        chalk.redBright.italic('i18n reconciliation for Nova sites'),
      ],
      {
        align: 'center',
        marginBottom: 1,
        marginTop: 0,
        paddingX: 1,
        paddingY: 0,
        style: 'round',
        width: 50,
      },
    );
  }

  /**
   * CLI - Handle CLI Error.
   *
   * Strips Commander's "error:" prefix, normalizes the text, and routes it
   * through Logger.error.
   *
   * @param {Cli_Index_CLI_HandleCliError_Text} text - Text.
   *
   * @private
   *
   * @returns {Cli_Index_CLI_HandleCliError_Returns}
   *
   * @since 0.21.0
   */
  private handleCliError(text: Cli_Index_CLI_HandleCliError_Text): Cli_Index_CLI_HandleCliError_Returns {
    let processedText: Cli_Index_CLI_HandleCliError_ProcessedText = text.trim();

    if (processedText.toLowerCase().startsWith('error:') === true) {
      processedText = processedText.slice(6).trim();
    }

    Logger.error(processedText);

    return;
  }
}

// Initiate script.
void new CLI();
