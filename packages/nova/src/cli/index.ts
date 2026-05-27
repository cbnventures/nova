#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';

import packageJson from '../../package.json' with { type: 'json' };
import {
  LIB_REGEX_PATTERN_ANSI,
  LIB_REGEX_PATTERN_ERROR_PREFIX,
  LIB_REGEX_PATTERN_NOVA_PREFIX,
  LIB_REGEX_PATTERN_WHITESPACE,
} from '../lib/regex.js';
import { Bootstrap, CLIHeader, Logger } from '../toolkit/index.js';
import { Runner as CliGenerateGithubFunding } from './generate/github/funding.js';
import { Runner as CliGenerateGithubIssueTemplate } from './generate/github/issue-template.js';
import { Runner as CliGenerateGithubWorkflows } from './generate/github/workflows.js';
import { Runner as CliGenerateMustHavesAgentConventions } from './generate/must-haves/agent-conventions.js';
import { Runner as CliGenerateMustHavesDotenv } from './generate/must-haves/dotenv.js';
import { Runner as CliGenerateMustHavesEditorconfig } from './generate/must-haves/editorconfig.js';
import { Runner as CliGenerateMustHavesGitignore } from './generate/must-haves/gitignore.js';
import { Runner as CliGenerateMustHavesLicense } from './generate/must-haves/license.js';
import { Runner as CliGenerateMustHavesReadMe } from './generate/must-haves/read-me.js';
import { Runner as CliRecipeGithubSyncFeatures } from './recipe/github/sync-features.js';
import { Runner as CliRecipeGithubSyncIdentity } from './recipe/github/sync-identity.js';
import { Runner as CliRecipeGithubSyncPolicies } from './recipe/github/sync-policies.js';
import { Runner as CliRecipePackageJsonCleanup } from './recipe/package-json/cleanup.js';
import { Runner as CliRecipePackageJsonNormalizeArtifacts } from './recipe/package-json/normalize-artifacts.js';
import { Runner as CliRecipePackageJsonNormalizeBundler } from './recipe/package-json/normalize-bundler.js';
import { Runner as CliRecipePackageJsonNormalizeDependencies } from './recipe/package-json/normalize-dependencies.js';
import { Runner as CliRecipePackageJsonNormalizeModules } from './recipe/package-json/normalize-modules.js';
import { Runner as CliRecipePackageJsonNormalizeTooling } from './recipe/package-json/normalize-tooling.js';
import { Runner as CliRecipePackageJsonSyncEnvironment } from './recipe/package-json/sync-environment.js';
import { Runner as CliRecipePackageJsonSyncIdentity } from './recipe/package-json/sync-identity.js';
import { Runner as CliRecipePackageJsonSyncOwnership } from './recipe/package-json/sync-ownership.js';
import { Runner as CliScaffoldAppExpressjs } from './scaffold/app/expressjs.js';
import { Runner as CliScaffoldAppNextjs } from './scaffold/app/nextjs.js';
import { Runner as CliScaffoldAppVite } from './scaffold/app/vite.js';
import { Runner as CliScaffoldAppWorkers } from './scaffold/app/workers.js';
import { Runner as CliScaffoldDocsDocusaurus } from './scaffold/docs/docusaurus.js';
import { Runner as CliScaffoldStarterBase } from './scaffold/starter/base.js';
import { Runner as CliUtilityChangelog } from './utility/changelog.js';
import { Runner as CliUtilityInitialize } from './utility/initialize.js';
import { Runner as CliUtilityRunRecipes } from './utility/run-recipes.js';
import { Runner as CliUtilityRunScripts } from './utility/run-scripts.js';
import { Runner as CliUtilityTranspile } from './utility/transpile.js';
import { Runner as CliUtilityTypeCheck } from './utility/type-check.js';
import { Runner as CliUtilityVersion } from './utility/version.js';

import type {
  Cli_ConstructorHeaderText,
  Cli_EnvDir,
  Cli_ExecuteCommandCommand,
  Cli_ExecuteCommandCommandLabel,
  Cli_ExecuteCommandOptions,
  Cli_ExecuteCommandReturns,
  Cli_ExecuteCommandTarget,
  Cli_GetCommandUsageAliasCommand,
  Cli_GetCommandUsageAliasLine,
  Cli_GetCommandUsageAliasLineStripped,
  Cli_GetCommandUsageCommand,
  Cli_GetCommandUsageCommandAliases,
  Cli_GetCommandUsageCommandName,
  Cli_GetCommandUsageCommandUsage,
  Cli_GetCommandUsageFullCommand,
  Cli_GetCommandUsageFullLine,
  Cli_GetCommandUsageFullLineStripped,
  Cli_GetCommandUsageParentAliasSeparated,
  Cli_GetCommandUsageParentCommand,
  Cli_GetCommandUsageParentCommandAliases,
  Cli_GetCommandUsageParentCommandName,
  Cli_GetCommandUsageReturns,
  Cli_GetCommandUsageUsagePipeSeparator,
  Cli_GetHeaderReturns,
  Cli_GetSubcommandTermCategory,
  Cli_GetSubcommandTermCategoryPipeSeparator,
  Cli_GetSubcommandTermCommand,
  Cli_GetSubcommandTermNames,
  Cli_GetSubcommandTermReturns,
  Cli_GetSubcommandTermUsage,
  Cli_HandleCliErrorProcessedText,
  Cli_HandleCliErrorReturns,
  Cli_HandleCliErrorText,
  Cli_Program,
  Cli_RegisterCommandsGenerateGenerate,
  Cli_RegisterCommandsGenerateGenerateGitHub,
  Cli_RegisterCommandsGenerateGenerateMustHaves,
  Cli_RegisterCommandsRecipeRecipe,
  Cli_RegisterCommandsRecipeRecipeGithub,
  Cli_RegisterCommandsRecipeRecipeGithubOptions,
  Cli_RegisterCommandsRecipeRecipePackageJson,
  Cli_RegisterCommandsReturns,
  Cli_RegisterCommandsScaffoldScaffold,
  Cli_RegisterCommandsScaffoldScaffoldApp,
  Cli_RegisterCommandsScaffoldScaffoldDocs,
  Cli_RegisterCommandsScaffoldScaffoldStarter,
  Cli_RegisterCommandsUtilityRunRecipesOptions,
  Cli_RegisterCommandsUtilityRunScriptsOptions,
  Cli_RegisterCommandsUtilityUtility,
  Cli_StyleTextCategoryFunctions,
  Cli_StyleTextCategoryStyles,
  Cli_StyleTextColoredText,
  Cli_StyleTextReturns,
  Cli_StyleTextText,
  Cli_StyleTextTitleFunctions,
  Cli_StyleTextTitleStyles,
  Cli_StyleTextType,
} from '../types/cli/index.d.ts';

const envDir: Cli_EnvDir = Bootstrap.resolveFileDir('nova', '.env', [
  'cwd',
  'project-root',
  'config-dir',
]);

if (envDir !== undefined) {
  Bootstrap.loadEnv(envDir);
}

/**
 * CLI.
 *
 * Entry point for the Nova command-line interface that
 * registers all commands and dispatches user input through
 * Commander to the appropriate handler.
 *
 * @since 0.11.0
 */
class CLI {
  /**
   * CLI - Program.
   *
   * Holds the Commander instance that owns all registered commands, options, and help output
   * configuration for the CLI session.
   *
   * @private
   *
   * @since 0.11.0
   */
  readonly #program: Cli_Program = new Command() as Cli_Program;

  /**
   * CLI - Constructor.
   *
   * Configures the Commander program with custom help formatting, registers every command
   * tree, then parses process.argv to dispatch handlers.
   *
   * @since 0.11.0
   */
  public constructor() {
    (async () => {
      const headerText: Cli_ConstructorHeaderText = this.getHeader();

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
   * Builds the full command tree for generate, recipe, scaffold, and utility groups. Each leaf
   * command delegates via executeCommand.
   *
   * @private
   *
   * @returns {Cli_RegisterCommandsReturns}
   *
   * @since 0.11.0
   */
  private registerCommands(): Cli_RegisterCommandsReturns {
    /**
     * CLI - Register Commands - Generate.
     *
     * Parent command for GitHub config and must-have file generators. Aliased as "gen"
     * for brevity.
     *
     * @since 0.11.0
     */
    const generate: Cli_RegisterCommandsGenerateGenerate = this.#program
      .command('generate')
      .alias('gen')
      .usage('<subcommand> [options]')
      .description('Generate vendor or must-have files for projects')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    const generateGitHub: Cli_RegisterCommandsGenerateGenerateGitHub = generate
      .command('github')
      .alias('gh')
      .usage('<subcommand> [options]')
      .description('Generate GitHub configuration files')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    generateGitHub
      .command('funding')
      .usage('[options]')
      .description('Create a .github/FUNDING.yml file for sponsor links')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliGenerateGithubFunding['run']);

        return;
      });

    generateGitHub
      .command('issue-template')
      .alias('issue')
      .usage('[options]')
      .description('Create .github/ISSUE_TEMPLATE files for issue forms')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliGenerateGithubIssueTemplate['run']);

        return;
      });

    generateGitHub
      .command('workflows')
      .usage('[options]')
      .description('Create .github/workflows files for CI/CD automation')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliGenerateGithubWorkflows['run']);

        return;
      });

    const generateMustHaves: Cli_RegisterCommandsGenerateGenerateMustHaves = generate
      .command('must-haves')
      .alias('must')
      .usage('<subcommand> [options]')
      .description('Generate essential project files')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    generateMustHaves
      .command('agent-conventions')
      .alias('agent')
      .usage('[options]')
      .description('Create agent convention files for coding assistants')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliGenerateMustHavesAgentConventions['run']);

        return;
      });

    generateMustHaves
      .command('dotenv')
      .alias('env')
      .usage('[options]')
      .description('Create a .env file for managing local environment secrets')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliGenerateMustHavesDotenv['run']);

        return;
      });

    generateMustHaves
      .command('editorconfig')
      .usage('[options]')
      .description('Create a .editorconfig file for consistent coding styles')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliGenerateMustHavesEditorconfig['run']);

        return;
      });

    generateMustHaves
      .command('gitignore')
      .usage('[options]')
      .description('Create a .gitignore file for excluding files from Git commits')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliGenerateMustHavesGitignore['run']);

        return;
      });

    generateMustHaves
      .command('license')
      .alias('lic')
      .usage('[options]')
      .description('Create a LICENSE file for project license agreements')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliGenerateMustHavesLicense['run']);

        return;
      });

    generateMustHaves
      .command('read-me')
      .alias('read')
      .usage('[options]')
      .description('Create a baseline README.md file for your project')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliGenerateMustHavesReadMe['run']);

        return;
      });

    /**
     * CLI - Register Commands - Recipe.
     *
     * Parent command for package.json maintenance recipes. Each subcommand syncs or normalizes
     * a specific set of fields using config.
     *
     * @since 0.11.0
     */
    const recipe: Cli_RegisterCommandsRecipeRecipe = this.#program
      .command('recipe')
      .alias('rcp')
      .usage('<subcommand> [options]')
      .description('Automate routine maintenance with configured defaults')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    const recipePackageJson: Cli_RegisterCommandsRecipeRecipePackageJson = recipe
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
        await this.executeCommand<typeof options>(options, CliRecipePackageJsonCleanup['run']);

        return;
      });

    recipePackageJson
      .command('normalize-artifacts')
      .alias('norm-art')
      .usage('[options]')
      .description('Normalize files, bin, man, directories, private, and publishConfig fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipePackageJsonNormalizeArtifacts['run']);

        return;
      });

    recipePackageJson
      .command('normalize-bundler')
      .alias('norm-bun')
      .usage('[options]')
      .description('Normalize types, module, sideEffects, and esnext fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipePackageJsonNormalizeBundler['run']);

        return;
      });

    recipePackageJson
      .command('normalize-dependencies')
      .alias('norm-dep')
      .usage('[options]')
      .description('Normalize dependency fields with optional version pinning')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipePackageJsonNormalizeDependencies['run']);

        return;
      });

    recipePackageJson
      .command('normalize-modules')
      .alias('norm-mod')
      .usage('[options]')
      .description('Normalize exports, main, type, browser, and imports fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipePackageJsonNormalizeModules['run']);

        return;
      });

    recipePackageJson
      .command('normalize-tooling')
      .alias('norm-tool')
      .usage('[options]')
      .description('Normalize scripts, gypfile, config, and workspaces fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipePackageJsonNormalizeTooling['run']);

        return;
      });

    recipePackageJson
      .command('sync-environment')
      .alias('sync-env')
      .usage('[options]')
      .description('Sync engines, os, cpu, libc, devEngines, and packageManager fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipePackageJsonSyncEnvironment['run']);

        return;
      });

    recipePackageJson
      .command('sync-identity')
      .alias('sync-id')
      .usage('[options]')
      .description('Sync name, version, description, keywords, and license fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipePackageJsonSyncIdentity['run']);

        return;
      });

    recipePackageJson
      .command('sync-ownership')
      .alias('sync-own')
      .usage('[options]')
      .description('Sync homepage, bugs, author, contributors, funding, and repository fields')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipePackageJsonSyncOwnership['run']);

        return;
      });

    const recipeGithub: Cli_RegisterCommandsRecipeRecipeGithub = recipe
      .command('github')
      .alias('gh')
      .usage('[subcommand] [options]')
      .description('Run all GitHub recipes')
      .commandsGroup('Subcommands:')
      .helpCommand(false)
      .option('-d, --dry-run', 'Preview changes without executing gh commands')
      .action(async (options) => {
        const runRecipesOptions: Cli_RegisterCommandsUtilityRunRecipesOptions = {
          ...(options as Cli_RegisterCommandsRecipeRecipeGithubOptions),
          category: 'github',
        };

        await this.executeCommand<Cli_RegisterCommandsUtilityRunRecipesOptions>(runRecipesOptions, CliUtilityRunRecipes['run']);

        return;
      });

    recipeGithub
      .command('sync-features')
      .alias('sync-feat')
      .usage('[options]')
      .description('Sync repository feature flags (issues, wiki, projects, discussions) to GitHub')
      .option('-d, --dry-run', 'Preview changes without executing gh commands')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipeGithubSyncFeatures['run']);

        return;
      });

    recipeGithub
      .command('sync-identity')
      .alias('sync-id')
      .usage('[options]')
      .description('Sync repository identity (description, homepage URL, topics) to GitHub')
      .option('-d, --dry-run', 'Preview changes without executing gh commands')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipeGithubSyncIdentity['run']);

        return;
      });

    recipeGithub
      .command('sync-policies')
      .alias('sync-pol')
      .usage('[options]')
      .description('Sync repository policies (visibility, merge methods, branch settings) to GitHub')
      .option('-d, --dry-run', 'Preview changes without executing gh commands')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliRecipeGithubSyncPolicies['run']);

        return;
      });

    /**
     * CLI - Register Commands - Scaffold.
     *
     * Parent command for bootstrapping monorepo-style projects. Groups app, docs, and starter
     * templates under a single namespace.
     *
     * @since 0.11.0
     */
    const scaffold: Cli_RegisterCommandsScaffoldScaffold = this.#program
      .command('scaffold')
      .alias('scaf')
      .usage('<subcommand> [options]')
      .description('Bootstrap templated monorepo-style projects')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    const scaffoldApp: Cli_RegisterCommandsScaffoldScaffoldApp = scaffold
      .command('app')
      .usage('<subcommand> [options]')
      .description('Scaffold workspaces')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    scaffoldApp
      .command('expressjs')
      .alias('express')
      .usage('[options]')
      .description('Scaffold an Express.js workspace')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('--name <name>', 'Project or workspace name')
      .option('--workspace-name <name>', 'Workspace directory name')
      .option('--output <dir>', 'Output directory')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliScaffoldAppExpressjs['run']);

        return;
      });

    scaffoldApp
      .command('nextjs')
      .alias('next')
      .usage('[options]')
      .description('Scaffold a Next.js workspace')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('--name <name>', 'Project or workspace name')
      .option('--workspace-name <name>', 'Workspace directory name')
      .option('--output <dir>', 'Output directory')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliScaffoldAppNextjs['run']);

        return;
      });

    scaffoldApp
      .command('vite')
      .usage('[options]')
      .description('Scaffold a Vite workspace')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('--name <name>', 'Project or workspace name')
      .option('--workspace-name <name>', 'Workspace directory name')
      .option('--output <dir>', 'Output directory')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliScaffoldAppVite['run']);

        return;
      });

    scaffoldApp
      .command('workers')
      .usage('[options]')
      .description('Scaffold a Cloudflare Workers workspace')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('--name <name>', 'Project or workspace name')
      .option('--workspace-name <name>', 'Workspace directory name')
      .option('--output <dir>', 'Output directory')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliScaffoldAppWorkers['run']);

        return;
      });

    const scaffoldDocs: Cli_RegisterCommandsScaffoldScaffoldDocs = scaffold
      .command('docs')
      .usage('<subcommand> [options]')
      .description('Scaffold documentation workspaces')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    scaffoldDocs
      .command('docusaurus')
      .usage('[options]')
      .description('Scaffold a Docusaurus documentation workspace')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('--name <name>', 'Project or workspace name')
      .option('--workspace-name <name>', 'Workspace directory name')
      .option('--output <dir>', 'Output directory')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliScaffoldDocsDocusaurus['run']);

        return;
      });

    const scaffoldStarter: Cli_RegisterCommandsScaffoldScaffoldStarter = scaffold
      .command('starter')
      .alias('start')
      .usage('<subcommand> [options]')
      .description('Scaffold starter monorepo projects')
      .commandsGroup('Subcommands:')
      .helpCommand(false);

    scaffoldStarter
      .command('base')
      .usage('[options]')
      .description('Scaffold a base monorepo project without a framework workspace')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('--name <name>', 'Project name')
      .option('--output <dir>', 'Output directory')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliScaffoldStarterBase['run']);

        return;
      });

    /**
     * CLI - Register Commands - Utility.
     *
     * Parent command for developer helper tools like changelog, version, transpile, and
     * type-check. Aliased as "util" for brevity.
     *
     * @since 0.11.0
     */
    const utility: Cli_RegisterCommandsUtilityUtility = this.#program
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
        await this.executeCommand<typeof options>(options, CliUtilityChangelog['run']);

        return;
      });

    utility
      .command('initialize')
      .alias('init')
      .usage('[options]')
      .description('Generate a new Nova config for this project')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliUtilityInitialize['run']);

        return;
      });

    utility
      .command('run-recipes')
      .alias('run-rcp')
      .usage('[options]')
      .description('Run all configured recipes')
      .option('-d, --dry-run', 'Preview changes without writing files')
      .option('-r, --replace-file', 'Replace the original file without creating a backup')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliUtilityRunRecipes['run']);

        return;
      });

    utility
      .command('run-scripts')
      .alias('run-scr')
      .usage('<pattern> [options]')
      .description('Run package.json scripts by pattern in sequential or parallel mode')
      .argument('<pattern>', 'Script name pattern (e.g., "build:*")')
      .option('-s, --sequential', 'Run matched scripts one at a time, stopping on failure')
      .option('-p, --parallel', 'Run matched scripts concurrently')
      .option('-b, --buffer <ms>', 'Flush interval in ms for parallel log grouping (default: 500)')
      .action(async (pattern, options) => {
        const runScriptsOptions: Cli_RegisterCommandsUtilityRunScriptsOptions = {
          ...options,
          pattern,
        };

        await this.executeCommand<Cli_RegisterCommandsUtilityRunScriptsOptions>(runScriptsOptions, CliUtilityRunScripts['run']);

        return;
      });

    utility
      .command('transpile')
      .alias('xpile')
      .usage('[options]')
      .description('Transpile TypeScript with filtered diagnostics')
      .option('-p, --project <path>', 'Path to tsconfig.json')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliUtilityTranspile['run']);

        return;
      });

    utility
      .command('type-check')
      .alias('type-chk')
      .usage('[options]')
      .description('Run type checks scoped to project-owned files')
      .option('-p, --project <path>', 'Path to tsconfig.json')
      .action(async (options) => {
        await this.executeCommand<typeof options>(options, CliUtilityTypeCheck['run']);

        return;
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
        await this.executeCommand<typeof options>(options, CliUtilityVersion['run']);

        return;
      });

    return;
  }

  /**
   * CLI - Execute Command.
   *
   * Prints the CLI header and the currently running command label, then delegates to the
   * target handler. Every leaf command in registerCommands calls this.
   *
   * @param {Cli_ExecuteCommandOptions} options - Options.
   * @param {Cli_ExecuteCommandTarget}  target  - Target.
   *
   * @private
   *
   * @returns {Cli_ExecuteCommandReturns}
   *
   * @since 0.11.0
   */
  private async executeCommand<Options>(options: Cli_ExecuteCommandOptions<Options>, target: Cli_ExecuteCommandTarget<Options>): Cli_ExecuteCommandReturns {
    const command: Cli_ExecuteCommandCommand = process.argv.join(' ').match(LIB_REGEX_PATTERN_NOVA_PREFIX);

    // Write the header.
    process.stdout.write(`${this.getHeader()}\n`);

    // Write the running method.
    const commandLabel: Cli_ExecuteCommandCommandLabel = (command !== null) ? command[0] : 'N/A';

    process.stdout.write(`${chalk.bold.bgBlue('CURRENTLY RUNNING:')} ${commandLabel}\n\n`);

    // Attempts to run the passed in function or method.
    await target(options);

    return;
  }

  /**
   * CLI - Get Header.
   *
   * Renders a boxed banner showing the Nova version and tagline via CLIHeader. Used both in
   * addHelpText and at the top of every executeCommand call.
   *
   * @private
   *
   * @returns {Cli_GetHeaderReturns}
   *
   * @since 0.11.0
   */
  private getHeader(): Cli_GetHeaderReturns {
    return CLIHeader.render(
      [
        chalk.yellowBright.bold(`Nova v${packageJson['version']}`),
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
   * CLI - Get Command Usage.
   *
   * Builds the usage string shown in help output by walking the command ancestry. When aliases
   * differ from names, an alias-based line is appended.
   *
   * @param {Cli_GetCommandUsageCommand} command - Command.
   *
   * @private
   *
   * @returns {Cli_GetCommandUsageReturns}
   *
   * @since 0.11.0
   */
  private getCommandUsage(command: Cli_GetCommandUsageCommand): Cli_GetCommandUsageReturns {
    const commandName: Cli_GetCommandUsageCommandName = command.name();
    const commandAliases: Cli_GetCommandUsageCommandAliases = command.aliases();
    const commandUsage: Cli_GetCommandUsageCommandUsage = command.usage();

    // Store the command path here.
    const fullCommand: Cli_GetCommandUsageFullCommand = [
      this.styleText('usage', commandUsage),
      commandName,
    ];

    const usagePipeSeparator: Cli_GetCommandUsageUsagePipeSeparator = this.styleText('usage', '|');
    const aliasCommand: Cli_GetCommandUsageAliasCommand = [
      this.styleText('usage', commandUsage),
      ...(commandAliases.length > 0) ? [commandAliases.join(usagePipeSeparator)] : [commandName],
    ];

    let parentCommand: Cli_GetCommandUsageParentCommand = command.parent;

    // Walk backwards.
    while (parentCommand !== null) {
      const parentCommandName: Cli_GetCommandUsageParentCommandName = parentCommand.name();
      const parentCommandAliases: Cli_GetCommandUsageParentCommandAliases = parentCommand.aliases();

      fullCommand.push(parentCommandName);

      if (parentCommandAliases.length > 0) {
        const parentAliasSeparated: Cli_GetCommandUsageParentAliasSeparated = parentCommandAliases.join(usagePipeSeparator);

        aliasCommand.push(parentAliasSeparated);
      } else {
        aliasCommand.push(parentCommandName);
      }

      parentCommand = parentCommand.parent;
    }

    const fullLine: Cli_GetCommandUsageFullLine = fullCommand.reverse().join(' ');
    const aliasLine: Cli_GetCommandUsageAliasLine = aliasCommand.reverse().join(' ');

    // Strip ANSI codes before comparing to avoid false mismatches from styling.
    const fullLineStripped: Cli_GetCommandUsageFullLineStripped = fullLine.replace(new RegExp(LIB_REGEX_PATTERN_ANSI, 'g'), '');
    const aliasLineStripped: Cli_GetCommandUsageAliasLineStripped = aliasLine.replace(new RegExp(LIB_REGEX_PATTERN_ANSI, 'g'), '');

    if (fullLineStripped === aliasLineStripped) {
      return fullLine;
    }

    return [
      fullLine,
      aliasLine,
    ].join('\n       ');
  }

  /**
   * CLI - Get Subcommand Term.
   *
   * Formats the name and aliases of a subcommand for display in help listings. Applies color
   * based on whether the item is top-level or nested.
   *
   * @param {Cli_GetSubcommandTermCommand} command - Command.
   *
   * @private
   *
   * @returns {Cli_GetSubcommandTermReturns}
   *
   * @since 0.11.0
   */
  private getSubcommandTerm(command: Cli_GetSubcommandTermCommand): Cli_GetSubcommandTermReturns {
    const category: Cli_GetSubcommandTermCategory = (command.parent !== null && command.parent.parent === null) ? 'commands' : 'subcommands';
    const categoryPipeSeparator: Cli_GetSubcommandTermCategoryPipeSeparator = this.styleText(category, '|');
    const names: Cli_GetSubcommandTermNames = [
      command.name(),
      ...command.aliases(),
    ].join(categoryPipeSeparator);
    const usage: Cli_GetSubcommandTermUsage = command.usage();

    return (usage !== '') ? `${names} ${this.styleText(category, usage)}` : names;
  }

  /**
   * CLI - Style Text.
   *
   * Applies chalk color to help output text based on category type and per-title overrides.
   * Called by configureHelp callbacks for consistent style.
   *
   * @param {Cli_StyleTextType} type - Type.
   * @param {Cli_StyleTextText} text - Text.
   *
   * @private
   *
   * @returns {Cli_StyleTextReturns}
   *
   * @since 0.11.0
   */
  private styleText(type: Cli_StyleTextType, text: Cli_StyleTextText): Cli_StyleTextReturns {
    const categoryStyles: Cli_StyleTextCategoryStyles = {
      commands: [chalk.blue],
      description: [chalk.dim],
      subcommands: [chalk.magenta],
      title: [chalk.bold],
      usage: [chalk.green],
    };

    const titleStyles: Cli_StyleTextTitleStyles = {
      'Commands:': [chalk.blue],
      'Options:': [chalk.cyan],
      'Subcommands:': [chalk.magenta],
      'Usage:': [chalk.green],
    };

    const categoryFunctions: Cli_StyleTextCategoryFunctions = Reflect.get(categoryStyles, type) ?? [];
    const titleFunctions: Cli_StyleTextTitleFunctions = Reflect.get(titleStyles, text) ?? [];

    let coloredText: Cli_StyleTextColoredText = text;

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
   * CLI - Handle CLI Error.
   *
   * Strips ANSI codes and Commander's "error:" prefix from error messages, normalizes
   * whitespace, then routes cleaned text through Logger.error.
   *
   * @param {Cli_HandleCliErrorText} text - Text.
   *
   * @private
   *
   * @returns {Cli_HandleCliErrorReturns}
   *
   * @since 0.11.0
   */
  private handleCliError(text: Cli_HandleCliErrorText): Cli_HandleCliErrorReturns {
    let processedText: Cli_HandleCliErrorProcessedText = text.replace(new RegExp(LIB_REGEX_PATTERN_ERROR_PREFIX.source, 'i'), '');

    // Strip ANSI coloring.
    processedText = processedText.replace(LIB_REGEX_PATTERN_ANSI, '');

    // Trim and normalize whitespace.
    processedText = processedText.replace(new RegExp(LIB_REGEX_PATTERN_WHITESPACE.source, 'g'), ' ').trim();

    // Capitalize first letter.
    processedText = `${processedText.charAt(0).toUpperCase()}${processedText.slice(1)}`;

    Logger.error(processedText);

    return;
  }
}

// Initiate script.
void new CLI();
