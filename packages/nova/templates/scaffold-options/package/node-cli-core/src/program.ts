import {
  CLIHeader,
  Logger,
} from '@cbnventures/nova/toolkit';
import chalk from 'chalk';
import { Command } from 'commander';

import packageJson from '../package.json' with { type: 'json' };
import { runStatus } from './status.js';

import type {
  Program_CLI_ExecuteCommand_CommandLabel,
  Program_CLI_ExecuteCommand_Returns,
  Program_CLI_ExecuteCommand_Target,
  Program_CLI_GetCommandUsage_AliasCommand,
  Program_CLI_GetCommandUsage_AliasLine,
  Program_CLI_GetCommandUsage_Command,
  Program_CLI_GetCommandUsage_CommandAliases,
  Program_CLI_GetCommandUsage_CommandName,
  Program_CLI_GetCommandUsage_CommandUsage,
  Program_CLI_GetCommandUsage_FullCommand,
  Program_CLI_GetCommandUsage_FullLine,
  Program_CLI_GetCommandUsage_ParentCommand,
  Program_CLI_GetCommandUsage_ParentCommandAliases,
  Program_CLI_GetCommandUsage_ParentCommandName,
  Program_CLI_GetCommandUsage_Returns,
  Program_CLI_GetCommandUsage_UsagePipeSeparator,
  Program_CLI_GetHeader_Returns,
  Program_CLI_GetSubcommandTerm_Category,
  Program_CLI_GetSubcommandTerm_CategoryPipeSeparator,
  Program_CLI_GetSubcommandTerm_Command,
  Program_CLI_GetSubcommandTerm_Names,
  Program_CLI_GetSubcommandTerm_Returns,
  Program_CLI_GetSubcommandTerm_Usage,
  Program_CLI_HandleCliError_ProcessedText,
  Program_CLI_HandleCliError_Returns,
  Program_CLI_HandleCliError_Text,
  Program_CLI_Program,
  Program_CLI_RegisterCommands_Returns,
  Program_CLI_RegisterCommands_Status,
  Program_CLI_Run_CommandArguments,
  Program_CLI_Run_Returns,
  Program_CLI_StyleText_CategoryFunctions,
  Program_CLI_StyleText_CategoryStyles,
  Program_CLI_StyleText_ColoredText,
  Program_CLI_StyleText_Returns,
  Program_CLI_StyleText_Text,
  Program_CLI_StyleText_TitleFunctions,
  Program_CLI_StyleText_TitleStyles,
  Program_CLI_StyleText_Type,
} from './types/program.d.ts';

/**
 * Program.
 *
 * Owns the generated command-line interface, its help presentation, and the
 * command lifecycle shared by every registered command.
 *
 * @since 0.0.0
 */
export class CLI {
  /**
   * Program - Program.
   *
   * Holds the Commander instance that owns registered commands and help output.
   * The instance remains private so one class controls command presentation.
   *
   * @private
   *
   * @since 0.0.0
   */
  readonly #program: Program_CLI_Program = new Command();

  /**
   * Program - Constructor.
   *
   * Configures Nova-style help, error handling, and the starter command.
   * Command registration happens after the shared presentation is ready.
   *
   * @since 0.0.0
   */
  public constructor() {
    this.#program
      .name(packageJson['name'])
      .usage('<command> [options]')
      .description(packageJson['description'])
      .version(packageJson['version'])
      .commandsGroup('Commands:')
      .configureOutput({
        writeErr: (text) => process.stdout.write(text),
        outputError: (text) => this.handleCliError(text),
      })
      .configureHelp({
        commandDescription: () => '',
        commandUsage: (command) => this.getCommandUsage(command),
        styleDescriptionText: (text) => this.styleText('description', text),
        styleTitle: (text) => this.styleText('title', text),
        subcommandTerm: (command) => this.getSubcommandTerm(command),
      })
      .addHelpText('beforeAll', this.getHeader())
      .helpCommand(false)
      .helpOption('-h, --help', 'Display the help menu')
      .allowExcessArguments(false)
      .showHelpAfterError();

    this.registerCommands();

    return;
  }

  /**
   * Program - Run.
   *
   * Parses command-line arguments and dispatches the selected command.
   * Consumers call this method only from the executable entry point.
   *
   * @param {Program_CLI_Run_CommandArguments} commandArguments - Command arguments.
   *
   * @returns {Program_CLI_Run_Returns}
   *
   * @since 0.0.0
   */
  public async run(commandArguments: Program_CLI_Run_CommandArguments = process.argv): Program_CLI_Run_Returns {
    await this.#program.parseAsync(commandArguments);

    return;
  }

  /**
   * Program - Register Commands.
   *
   * Registers the starter command. Add new commands here and dispatch them
   * through executeCommand so every command uses the same presentation.
   *
   * @private
   *
   * @returns {Program_CLI_RegisterCommands_Returns}
   *
   * @since 0.0.0
   */
  private registerCommands(): Program_CLI_RegisterCommands_Returns {
    const status: Program_CLI_RegisterCommands_Status = this.#program
      .command('status')
      .usage('[options]')
      .description('Confirm that the generated command is ready')
      .helpCommand(false);

    status.action(async () => {
      await this.executeCommand(runStatus);

      return;
    });

    return;
  }

  /**
   * Program - Execute Command.
   *
   * Prints the shared header and current-command label before invoking a target.
   * Every registered command passes through this lifecycle for consistent output.
   *
   * @param {Program_CLI_ExecuteCommand_Target} target - Target.
   *
   * @private
   *
   * @returns {Program_CLI_ExecuteCommand_Returns}
   *
   * @since 0.0.0
   */
  private async executeCommand(target: Program_CLI_ExecuteCommand_Target): Program_CLI_ExecuteCommand_Returns {
    const commandLabel: Program_CLI_ExecuteCommand_CommandLabel = [
      this.#program.name(),
      ...process.argv.slice(2),
    ].join(' ');

    process.stdout.write(`${this.getHeader()}\n`);
    process.stdout.write(`${chalk.bold.bgBlue('CURRENTLY RUNNING:')} ${commandLabel}\n\n`);

    await target();

    return;
  }

  /**
   * Program - Get Header.
   *
   * Renders package metadata in the fixed-width Nova CLI header.
   * Help output and command execution share the exact same banner.
   *
   * @private
   *
   * @returns {Program_CLI_GetHeader_Returns}
   *
   * @since 0.0.0
   */
  private getHeader(): Program_CLI_GetHeader_Returns {
    return CLIHeader.render(
      [
        chalk.yellowBright.bold(`${packageJson['name']} v${packageJson['version']}`),
        chalk.redBright.italic(packageJson['description']),
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
   * Program - Get Command Usage.
   *
   * Builds a full usage path for root and nested commands.
   * Aliases receive a second path only when they differ from command names.
   *
   * @param {Program_CLI_GetCommandUsage_Command} command - Command.
   *
   * @private
   *
   * @returns {Program_CLI_GetCommandUsage_Returns}
   *
   * @since 0.0.0
   */
  private getCommandUsage(command: Program_CLI_GetCommandUsage_Command): Program_CLI_GetCommandUsage_Returns {
    const commandName: Program_CLI_GetCommandUsage_CommandName = command.name();
    const commandAliases: Program_CLI_GetCommandUsage_CommandAliases = command.aliases();
    const commandUsage: Program_CLI_GetCommandUsage_CommandUsage = command.usage();
    const fullCommand: Program_CLI_GetCommandUsage_FullCommand = [
      this.styleText('usage', commandUsage),
      commandName,
    ];
    const usagePipeSeparator: Program_CLI_GetCommandUsage_UsagePipeSeparator = this.styleText('usage', '|');
    const aliasCommand: Program_CLI_GetCommandUsage_AliasCommand = [
      this.styleText('usage', commandUsage),
      ...(commandAliases.length > 0) ? [commandAliases.join(usagePipeSeparator)] : [commandName],
    ];

    let parentCommand: Program_CLI_GetCommandUsage_ParentCommand = command.parent;

    while (parentCommand !== null) {
      const parentCommandName: Program_CLI_GetCommandUsage_ParentCommandName = parentCommand.name();
      const parentCommandAliases: Program_CLI_GetCommandUsage_ParentCommandAliases = parentCommand.aliases();

      fullCommand.push(parentCommandName);

      aliasCommand.push((parentCommandAliases.length > 0) ? parentCommandAliases.join(usagePipeSeparator) : parentCommandName);

      parentCommand = parentCommand.parent;
    }

    const fullLine: Program_CLI_GetCommandUsage_FullLine = fullCommand.reverse().join(' ');
    const aliasLine: Program_CLI_GetCommandUsage_AliasLine = aliasCommand.reverse().join(' ');

    if (fullLine === aliasLine) {
      return fullLine;
    }

    return [
      fullLine,
      aliasLine,
    ].join('\n       ');
  }

  /**
   * Program - Get Subcommand Term.
   *
   * Formats one command and its aliases for the help listing.
   * Top-level and nested commands receive their matching category style.
   *
   * @param {Program_CLI_GetSubcommandTerm_Command} command - Command.
   *
   * @private
   *
   * @returns {Program_CLI_GetSubcommandTerm_Returns}
   *
   * @since 0.0.0
   */
  private getSubcommandTerm(command: Program_CLI_GetSubcommandTerm_Command): Program_CLI_GetSubcommandTerm_Returns {
    const category: Program_CLI_GetSubcommandTerm_Category = (command.parent !== null && command.parent.parent === null) ? 'commands' : 'subcommands';
    const categoryPipeSeparator: Program_CLI_GetSubcommandTerm_CategoryPipeSeparator = this.styleText(category, '|');
    const names: Program_CLI_GetSubcommandTerm_Names = [
      command.name(),
      ...command.aliases(),
    ].join(categoryPipeSeparator);
    const usage: Program_CLI_GetSubcommandTerm_Usage = command.usage();

    return (usage !== '') ? `${names} ${this.styleText(category, usage)}` : names;
  }

  /**
   * Program - Style Text.
   *
   * Applies Nova's help colors to categories and section titles.
   * Chalk automatically falls back to plain text for non-interactive output.
   *
   * @param {Program_CLI_StyleText_Type} type - Type.
   * @param {Program_CLI_StyleText_Text} text - Text.
   *
   * @private
   *
   * @returns {Program_CLI_StyleText_Returns}
   *
   * @since 0.0.0
   */
  private styleText(type: Program_CLI_StyleText_Type, text: Program_CLI_StyleText_Text): Program_CLI_StyleText_Returns {
    const categoryStyles: Program_CLI_StyleText_CategoryStyles = {
      commands: [chalk.blue],
      description: [chalk.dim],
      subcommands: [chalk.magenta],
      title: [chalk.bold],
      usage: [chalk.green],
    };
    const titleStyles: Program_CLI_StyleText_TitleStyles = {
      'Commands:': [chalk.blue],
      'Options:': [chalk.cyan],
      'Subcommands:': [chalk.magenta],
      'Usage:': [chalk.green],
    };
    const categoryFunctions: Program_CLI_StyleText_CategoryFunctions = Reflect.get(categoryStyles, type) ?? [];
    const titleFunctions: Program_CLI_StyleText_TitleFunctions = Reflect.get(titleStyles, text) ?? [];

    let coloredText: Program_CLI_StyleText_ColoredText = text;

    for (const categoryFunction of categoryFunctions) {
      coloredText = categoryFunction(coloredText);
    }

    if (type === 'title') {
      for (const titleFunction of titleFunctions) {
        coloredText = titleFunction(coloredText);
      }
    }

    return coloredText;
  }

  /**
   * Program - Handle CLI Error.
   *
   * Removes Commander's prefix and reports the cleaned message through Nova's
   * logger. The first letter is capitalized to match other Nova diagnostics.
   *
   * @param {Program_CLI_HandleCliError_Text} text - Text.
   *
   * @private
   *
   * @returns {Program_CLI_HandleCliError_Returns}
   *
   * @since 0.0.0
   */
  private handleCliError(text: Program_CLI_HandleCliError_Text): Program_CLI_HandleCliError_Returns {
    let processedText: Program_CLI_HandleCliError_ProcessedText = text.replace('error: ', '').trim();

    processedText = `${processedText.charAt(0).toUpperCase()}${processedText.slice(1)}`;

    Logger.error(processedText);

    return;
  }
}
