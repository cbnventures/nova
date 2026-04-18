import type { Command, CommandUnknownOpts } from '@commander-js/extra-typings';
import type { ChalkInstance } from 'chalk';

import type { SharedRunScriptsOptions } from '../shared.d.ts';

/**
 * CLI - Constructor.
 *
 * @since 0.11.0
 */
export type CliConstructorHeaderText = string;

/**
 * CLI - Env Dir.
 *
 * @since 0.14.0
 */
export type CliEnvDir = string | undefined;

/**
 * CLI - Execute Command.
 *
 * @since 0.11.0
 */
export type CliExecuteCommandOptions<Options> = Partial<Options>;

export type CliExecuteCommandTarget<Options> = (options: CliExecuteCommandOptions<Options>) => void | Promise<void>;

export type CliExecuteCommandReturns = Promise<void>;

export type CliExecuteCommandCommand = RegExpMatchArray | null;

export type CliExecuteCommandCommandLabel = string;

/**
 * CLI - Get Command Usage.
 *
 * @since 0.11.0
 */
export type CliGetCommandUsageCommand = CommandUnknownOpts;

export type CliGetCommandUsageReturns = string;

export type CliGetCommandUsageCommandName = string;

export type CliGetCommandUsageCommandAliases = string[];

export type CliGetCommandUsageCommandUsage = string;

export type CliGetCommandUsageFullCommand = string[];

export type CliGetCommandUsageUsagePipeSeparator = string;

export type CliGetCommandUsageAliasCommand = string[];

export type CliGetCommandUsageParentCommand = CommandUnknownOpts | null;

export type CliGetCommandUsageParentCommandName = string;

export type CliGetCommandUsageParentCommandAliases = string[];

export type CliGetCommandUsageParentAliasSeparated = string;

export type CliGetCommandUsageFullLine = string;

export type CliGetCommandUsageAliasLine = string;

export type CliGetCommandUsageFullLineStripped = string;

export type CliGetCommandUsageAliasLineStripped = string;

/**
 * CLI - Get Header.
 *
 * @since 0.11.0
 */
export type CliGetHeaderReturns = string;

/**
 * CLI - Get Subcommand Term.
 *
 * @since 0.11.0
 */
export type CliGetSubcommandTermCommand = CommandUnknownOpts;

export type CliGetSubcommandTermReturns = string;

export type CliGetSubcommandTermCategory = 'commands' | 'subcommands';

export type CliGetSubcommandTermCategoryPipeSeparator = string;

export type CliGetSubcommandTermNames = string;

export type CliGetSubcommandTermUsage = string;

/**
 * CLI - Handle CLI Error.
 *
 * @since 0.11.0
 */
export type CliHandleCliErrorText = string;

export type CliHandleCliErrorReturns = void;

export type CliHandleCliErrorProcessedText = string;

/**
 * CLI - Program.
 *
 * @since 0.11.0
 */
export type CliProgram = Command;

/**
 * CLI - Register Commands.
 *
 * @since 0.11.0
 */
export type CliRegisterCommandsReturns = void;

/**
 * CLI - Register Commands - Generate.
 *
 * @since 0.11.0
 */
export type CliRegisterCommandsGenerateGenerate = Command;

export type CliRegisterCommandsGenerateGenerateGitHub = Command;

export type CliRegisterCommandsGenerateGenerateMustHaves = Command;

/**
 * CLI - Register Commands - Recipe.
 *
 * @since 0.11.0
 */
export type CliRegisterCommandsRecipeRecipe = Command;

export type CliRegisterCommandsRecipeRecipePackageJson = Command;

/**
 * CLI - Register Commands - Scaffold.
 *
 * @since 0.11.0
 */
export type CliRegisterCommandsScaffoldScaffold = Command;

export type CliRegisterCommandsScaffoldScaffoldApp = Command;

export type CliRegisterCommandsScaffoldScaffoldDocs = Command;

export type CliRegisterCommandsScaffoldScaffoldStarter = Command;

/**
 * CLI - Register Commands - Utility.
 *
 * @since 0.11.0
 */
export type CliRegisterCommandsUtilityUtility = Command;

export type CliRegisterCommandsUtilityRunScriptsOptions = SharedRunScriptsOptions;

/**
 * CLI - Style Text.
 *
 * @since 0.11.0
 */
export type CliStyleTextType = 'commands' | 'description' | 'subcommands' | 'title' | 'usage';

export type CliStyleTextText = string;

export type CliStyleTextReturns = string;

export type CliStyleTextCategoryStyles = Record<CliStyleTextType, ChalkInstance[]>;

export type CliStyleTextTitleStyles = Record<string, ChalkInstance[]>;

export type CliStyleTextCategoryFunctions = ChalkInstance[];

export type CliStyleTextTitleFunctions = ChalkInstance[];

export type CliStyleTextColoredText = string;
