#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';

import packageJson from '../../package.json' with { type: 'json' };
import { CLIRecipePackageJsonCleanup } from '@/cli/recipe/package-json/cleanup.js';
import { CLIRecipePackageJsonNormalizeArtifacts } from '@/cli/recipe/package-json/normalize-artifacts.js';
import { CLIRecipePackageJsonNormalizeBundler } from '@/cli/recipe/package-json/normalize-bundler.js';
import { CLIRecipePackageJsonNormalizeDependencies } from '@/cli/recipe/package-json/normalize-dependencies.js';
import { CLIRecipePackageJsonNormalizeModules } from '@/cli/recipe/package-json/normalize-modules.js';
import { CLIRecipePackageJsonNormalizeTooling } from '@/cli/recipe/package-json/normalize-tooling.js';
import { CLIRecipePackageJsonSyncEnvironment } from '@/cli/recipe/package-json/sync-environment.js';
import { CLIRecipePackageJsonSyncIdentity } from '@/cli/recipe/package-json/sync-identity.js';
import { CLIRecipePackageJsonSyncOwnership } from '@/cli/recipe/package-json/sync-ownership.js';
import { CLIUtilityChangelog } from '@/cli/utility/changelog.js';
import { CLIUtilityInitialize } from '@/cli/utility/initialize.js';
import { CLIUtilityRunRecipes } from '@/cli/utility/run-recipes.js';
import { CLIUtilityRunScripts } from '@/cli/utility/run-scripts.js';
import { CLIUtilityTranspile } from '@/cli/utility/transpile.js';
import { CLIUtilityTypeCheck } from '@/cli/utility/type-check.js';
import { CLIUtilityVersion } from '@/cli/utility/version.js';
import {
  PATTERN_ANSI,
  PATTERN_ERROR_PREFIX,
  PATTERN_NOVA_PREFIX,
  PATTERN_WHITESPACE,
} from '@/lib/regex.js';
import { CLIHeader, Logger } from '@/toolkit/index.js';

import type {
  CLIExecuteCommandOptions,
  CLIExecuteCommandReturns,
  CLIExecuteCommandTarget,
  CLIGetCommandUsageAliasLine,
  CLIGetCommandUsageAliasLineStripped,
  CLIGetCommandUsageCommand,
  CLIGetCommandUsageFullLine,
  CLIGetCommandUsageFullLineStripped,
  CLIGetCommandUsageReturns,
  CLIGetHeaderReturns,
  CLIGetSubcommandTermCommand,
  CLIGetSubcommandTermReturns,
  CLIHandleCLIErrorReturns,
  CLIHandleCLIErrorText,
  CLIProgram,
  CLIRegisterCommandsReturns,
  CLIStyleTextCategoryStyles,
  CLIStyleTextReturns,
  CLIStyleTextText,
  CLIStyleTextTitleStyles,
  CLIStyleTextType,
} from '@/types/cli/index.d.ts';
import type { CLIUtilityRunScriptsRunOptions } from '@/types/cli/utility/run-scripts.d.ts';

/**
 * CLI.
 *
 * @since 1.0.0
 */
class CLI {
  /**
   * CLI - Program.
   *
   * @private
   *
   * @since 1.0.0
   */
  readonly #program: CLIProgram = new Command() as CLIProgram;

  /**
   * CLI - Constructor.
   *
   * @since 1.0.0
   */
  public constructor() {
    (async () => {
      this.#program
        .name('nova')
        .usage('<command> <subcommand> [options]')
        .description('CLI for the Common Developer')
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

      // Register commands into Commander.
      this.registerCommands();

      // Parse command-line arguments and dispatch to handlers.
      await this.#program.parseAsync(process.argv);
    })();
  }

  /**
   * CLI - Register commands.
   *
   * @private
   *
   * @returns {CLIRegisterCommandsReturns}
   *
   * @since 1.0.0
   */
  private registerCommands(): CLIRegisterCommandsReturns {
    /**
     * CLI - Register commands - Generate.
     *
     * @since 1.0.0
     */
    const generate = this.#program
      .command('generate')
      .alias('gen')
      .usage('<subcommand> [options]')
      .description('Generate vendor or must-have files for projects')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    generate
      .command('aws-amplify') // TODO
      .description('Create a amplify.yml file for AWS Amplify deployments');

    generate
      .command('cloudflare-workers') // TODO
      .description('Create a wrangler.toml file for Cloudflare Workers deployments');

    generate
      .command('docker-compose') // TODO
      .description('Create a docker-compose.yml file for Docker builds');

    generate
      .command('docker-file') // TODO
      .description('Create a Dockerfile for Docker builds');

    generate
      .command('docusaurus-config') // TODO
      .description('Create a docusaurus.config.ts file for Docusaurus configuration');

    generate
      .command('github-funding') // TODO
      .description('Create a ./github/FUNDING.yml file for GitHub to enable sponsor links');

    generate
      .command('github-issue-template') // TODO
      .description('Create a ./github/ISSUE_TEMPLATE directory for GitHub to create issue templates');

    generate
      .command('github-workflows') // TODO
      .description('Create a ./github/workflows directory for GitHub to enable CI/CD automation');

    generate
      .command('must-haves-dotenv') // TODO
      .description('Create a .env file for managing local environment secrets across your project');

    generate
      .command('must-haves-editorconfig') // TODO
      .description('Create a .editorconfig file for managing consistent coding styles');

    generate
      .command('must-haves-gitignore') // TODO
      .description('Create a .gitignore file for managing files that should be excluded from Git commits');

    generate
      .command('must-haves-license') // TODO
      .description('Create a LICENSE file for managing project license agreements');

    generate
      .command('must-haves-post-install') // TODO
      .description('Create a post-install.ts file for expanding on post-install controls');

    generate
      .command('must-haves-read-me') // TODO
      .description('Create a baseline README.md file for for your project');

    generate
      .command('nextjs-config') // TODO
      .description('Create a next.config.mjs file for Next.js configuration');

    generate
      .command('vite-config') // TODO
      .description('Create a vite.config.mjs file for Vite configuration');

    /**
     * CLI - Register commands - Recipe.
     *
     * @since 1.0.0
     */
    const recipe = this.#program
      .command('recipe')
      .alias('rcp')
      .usage('<subcommand> [options]')
      .description('Automate routine maintenance with configured defaults')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    const recipePackageJson = recipe
      .command('package-json')
      .alias('pkg')
      .usage('<subcommand> [options]')
      .description('Recipes for "package.json" file synchronization')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    recipePackageJson
      .command('cleanup')
      .alias('clean')
      .usage('[options]')
      .description('Remove unsupported keys and reorder remaining keys')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIRecipePackageJsonCleanup.run);
      });

    recipePackageJson
      .command('normalize-artifacts')
      .alias('norm-art')
      .usage('[options]')
      .description('Normalize files, bin, man, directories, private, and publishConfig fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIRecipePackageJsonNormalizeArtifacts.run);
      });

    recipePackageJson
      .command('normalize-bundler')
      .alias('norm-bun')
      .usage('[options]')
      .description('Normalize types, module, sideEffects, and esnext fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIRecipePackageJsonNormalizeBundler.run);
      });

    recipePackageJson
      .command('normalize-dependencies')
      .alias('norm-dep')
      .usage('[options]')
      .description('Normalize dependency fields with optional version pinning')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIRecipePackageJsonNormalizeDependencies.run);
      });

    recipePackageJson
      .command('normalize-modules')
      .alias('norm-mod')
      .usage('[options]')
      .description('Normalize exports, main, type, browser, and imports fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIRecipePackageJsonNormalizeModules.run);
      });

    recipePackageJson
      .command('normalize-tooling')
      .alias('norm-tool')
      .usage('[options]')
      .description('Normalize scripts, gypfile, config, and workspaces fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIRecipePackageJsonNormalizeTooling.run);
      });

    recipePackageJson
      .command('sync-environment')
      .alias('sync-env')
      .usage('[options]')
      .description('Sync engines, os, cpu, libc, devEngines, and packageManager fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIRecipePackageJsonSyncEnvironment.run);
      });

    recipePackageJson
      .command('sync-identity')
      .alias('sync-id')
      .usage('[options]')
      .description('Sync name, version, description, keywords, and license fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIRecipePackageJsonSyncIdentity.run);
      });

    recipePackageJson
      .command('sync-ownership')
      .alias('sync-own')
      .usage('[options]')
      .description('Sync homepage, bugs, author, contributors, funding, and repository fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIRecipePackageJsonSyncOwnership.run);
      });

    /**
     * CLI - Register commands - Scaffold.
     *
     * @since 1.0.0
     */
    const scaffold = this.#program
      .command('scaffold')
      .alias('scaf')
      .usage('<subcommand> [options]')
      .description('Bootstrap templated monorepo-style projects')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    scaffold
      .command('nextjs') // TODO
      .description('Next.js');

    /**
     * CLI - Register commands - Utility.
     *
     * @since 1.0.0
     */
    const utility = this.#program
      .command('utility')
      .alias('util')
      .usage('<subcommand> [options]')
      .description('Tools for diagnostics, quick checks, and dev helpers')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    utility
      .command('changelog')
      .alias('log')
      .usage('[options]')
      .description('Record changes and release versioned changelogs')
      .option('--record', 'Record a change')
      .option('--release', 'Release accumulated changes')
      .option('-p, --package <name>', 'Package name')
      .option('-c, --category <category>', 'Category (updated, fixed, added, removed)')
      .option('-b, --bump <type>', 'Bump type (major, minor, patch)')
      .option('-m, --message <message>', 'Change description')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIUtilityChangelog.run);
      });

    utility
      .command('initialize')
      .alias('init')
      .usage('[options]')
      .description('Generate a new Nova config for this project')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIUtilityInitialize.run);
      });

    utility
      .command('run-recipes')
      .alias('run-rcp')
      .usage('[options]')
      .description('Run all configured recipes')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIUtilityRunRecipes.run);
      });

    utility
      .command('run-scripts')
      .alias('run-scr')
      .usage('<pattern> [options]')
      .description('Run package.json scripts by pattern in sequential or parallel mode')
      .argument('<pattern>', 'Script name pattern (e.g., "build:*")')
      .option('-s, --sequential', 'Run matched scripts one at a time, stopping on failure')
      .option('-p, --parallel', 'Run matched scripts concurrently')
      .action(async (pattern, options) => {
        const runScriptsOptions = {
          ...options,
          pattern,
        } as CLIUtilityRunScriptsRunOptions;
        await this.executeCommand<CLIUtilityRunScriptsRunOptions>(runScriptsOptions, CLIUtilityRunScripts.run);
      });

    utility
      .command('transpile')
      .alias('xpile')
      .usage('[options]')
      .description('Transpile TypeScript with filtered diagnostics')
      .option('-p, --project <path>', 'Path to tsconfig.json')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIUtilityTranspile.run);
      });

    utility
      .command('type-check')
      .alias('type-chk')
      .usage('[options]')
      .description('Run type checks scoped to project-owned files')
      .option('-p, --project <path>', 'Path to tsconfig.json')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIUtilityTypeCheck.run);
      });

    utility
      .command('version')
      .alias('ver')
      .usage('[options]')
      .description('Snapshot of your development stack versions')
      .option('-a, --all', 'Show all available versions')
      .option('-b, --browser', 'Show web browser versions')
      .option('-e, --env', 'Show environment manager versions')
      .option('-i, --interpreter', 'Show interpreter / runtime versions')
      .option('-n, --node', 'Show Node.js and related package manager versions')
      .option('-o, --os', 'Show operating system details')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CLIUtilityVersion.run);
      });
  }

  /**
   * CLI - Execute command.
   *
   * @param {CLIExecuteCommandOptions} options - Options.
   * @param {CLIExecuteCommandTarget}  target  - Target.
   *
   * @private
   *
   * @returns {CLIExecuteCommandReturns}
   *
   * @since 1.0.0
   */
  private async executeCommand<Options>(options: CLIExecuteCommandOptions<Options>, target: CLIExecuteCommandTarget<Options>): CLIExecuteCommandReturns {
    const command = process.argv.join(' ').match(PATTERN_NOVA_PREFIX);

    // Write the header.
    process.stdout.write(`${this.getHeader()}\n`);

    // Write the running method.
    const commandLabel = (command !== null) ? command[0] : 'N/A';

    process.stdout.write(`${chalk.bold.bgBlue('CURRENTLY RUNNING:')} ${commandLabel}\n\n`);

    // Attempts to run the passed in function or method.
    await target(options);
  }

  /**
   * CLI - Get header.
   *
   * @private
   *
   * @returns {CLIGetHeaderReturns}
   *
   * @since 1.0.0
   */
  private getHeader(): CLIGetHeaderReturns {
    return CLIHeader.render(
      [
        chalk.yellowBright.bold(`Nova v${packageJson.version}`),
        chalk.redBright.italic('CLI for the Common Developer'),
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
   * CLI - Get command usage.
   *
   * @param {CLIGetCommandUsageCommand} command - Command.
   *
   * @private
   *
   * @returns {CLIGetCommandUsageReturns}
   *
   * @since 1.0.0
   */
  private getCommandUsage(command: CLIGetCommandUsageCommand): CLIGetCommandUsageReturns {
    const commandName = command.name();
    const commandAliases = command.aliases();
    const commandUsage = command.usage();

    // Store the command path here.
    const fullCommand = [
      this.styleText('usage', commandUsage),
      commandName,
    ];
    const aliasCommand = [
      this.styleText('usage', commandUsage),
      ...(commandAliases.length > 0) ? [
        commandAliases.join(this.styleText('usage', '|')),
      ] : [
        commandName,
      ],
    ];

    let parentCommand = command.parent;

    // Walk backwards.
    while (parentCommand !== null) {
      const parentCommandName = parentCommand.name();
      const parentCommandAliases = parentCommand.aliases();

      fullCommand.push(parentCommandName);

      if (parentCommandAliases.length > 0) {
        aliasCommand.push(parentCommandAliases.join(this.styleText('usage', '|')));
      } else {
        aliasCommand.push(parentCommandName);
      }

      parentCommand = parentCommand.parent;
    }

    const fullLine: CLIGetCommandUsageFullLine = fullCommand.reverse().join(' ');
    const aliasLine: CLIGetCommandUsageAliasLine = aliasCommand.reverse().join(' ');

    // Strip ANSI codes before comparing to avoid false mismatches from styling.
    const fullLineStripped: CLIGetCommandUsageFullLineStripped = fullLine.replace(new RegExp(PATTERN_ANSI, 'g'), '');
    const aliasLineStripped: CLIGetCommandUsageAliasLineStripped = aliasLine.replace(new RegExp(PATTERN_ANSI, 'g'), '');

    if (fullLineStripped === aliasLineStripped) {
      return fullLine;
    }

    return [
      fullLine,
      aliasLine,
    ].join('\n       ');
  }

  /**
   * CLI - Get subcommand term.
   *
   * @param {CLIGetSubcommandTermCommand} command - Command.
   *
   * @private
   *
   * @returns {CLIGetSubcommandTermReturns}
   *
   * @since 1.0.0
   */
  private getSubcommandTerm(command: CLIGetSubcommandTermCommand): CLIGetSubcommandTermReturns {
    const category = (command.parent !== null && command.parent.parent === null) ? 'commands' : 'subcommands';
    const names = [command.name(), ...command.aliases()].join(this.styleText(category, '|'));
    const usage = command.usage();

    return (usage !== '') ? `${names} ${this.styleText(category, usage)}` : names;
  }

  /**
   * CLI - Style text.
   *
   * @param {CLIStyleTextType} type - Type.
   * @param {CLIStyleTextText} text - Text.
   *
   * @private
   *
   * @returns {CLIStyleTextReturns}
   *
   * @since 1.0.0
   */
  private styleText(type: CLIStyleTextType, text: CLIStyleTextText): CLIStyleTextReturns {
    const categoryStyles: CLIStyleTextCategoryStyles = {
      commands: [chalk.blue],
      description: [chalk.dim],
      subcommands: [chalk.magenta],
      title: [chalk.bold],
      usage: [chalk.green],
    };
    const titleStyles: CLIStyleTextTitleStyles = {
      'Commands:': [chalk.blue],
      'Options:': [chalk.cyan],
      'Subcommands:': [chalk.magenta],
      'Usage:': [chalk.green],
    };
    const categoryFunctions = Reflect.get(categoryStyles, type) ?? [];
    const titleFunctions = Reflect.get(titleStyles, text) ?? [];

    let coloredText = text;

    // Apply category type coloring.
    for (const categoryFunction of categoryFunctions) {
      coloredText = categoryFunction(coloredText);
    }

    // Apply per-title overrides.
    if (type === 'title') {
      for (const titleFunction of titleFunctions) {
        coloredText = titleFunction(coloredText);
      }
    }

    return coloredText;
  }

  /**
   * CLI - Handle cli error.
   *
   * @param {CLIHandleCLIErrorText} text - Text.
   *
   * @private
   *
   * @returns {CLIHandleCLIErrorReturns}
   *
   * @since 1.0.0
   */
  private handleCliError(text: CLIHandleCLIErrorText): CLIHandleCLIErrorReturns {
    let processedText = text.replace(new RegExp(PATTERN_ERROR_PREFIX.source, 'i'), '');

    // Strip ANSI coloring.
    processedText = processedText.replace(PATTERN_ANSI, '');

    // Trim and normalize whitespace.
    processedText = processedText.replace(new RegExp(PATTERN_WHITESPACE.source, 'g'), ' ').trim();

    // Capitalize first letter.
    processedText = `${processedText.charAt(0).toUpperCase()}${processedText.slice(1)}`;

    Logger.error(processedText);
  }
}

// Initiate script.
new CLI();
