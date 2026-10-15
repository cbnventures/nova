import { join } from 'node:path';

import prompts from 'prompts';

import { writeDotenvFiles } from '../../../lib/dotenv.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { isProjectRoot } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_FilePath,
  Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Keys,
  Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Response,
  Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_CurrentDirectory,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Environment,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_GeneratedCount,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsAtProjectRoot,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsDryRun,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsPrune,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_IsReplaceFile,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Options,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_ReplaceFileNotice,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Variables,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkingFile,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspace,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkspacePath,
  Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspaces,
} from '../../../types/cli/generate/must-haves/dotenv.d.ts';

/**
 * CLI - Generate - Must Haves - Dotenv.
 *
 * Generates ".env" and ".env.sample" for every declared workspace, appending
 * each workspace's configured variables from "environment.workspaces" in nova.config.json.
 * The ".env" preserves filled values; ".env.sample" keeps non-secret defaults.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Generate - Must Haves - Dotenv - Run.
   *
   * Loads nova.config.json and delegates each configured workspace to Nova's shared
   * dotenv writer so generators and scaffolds always produce the same files.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_MustHaves_Dotenv_Runner_Run_Options): Cli_Generate_MustHaves_Dotenv_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_MustHaves_Dotenv_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsReplaceFile = options['replaceFile'] === true;
    const isPrune: Cli_Generate_MustHaves_Dotenv_Runner_Run_IsPrune = options['prune'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_MustHaves_Dotenv_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const environment: Cli_Generate_MustHaves_Dotenv_Runner_Run_Environment = workingFile['environment'] ?? {};
    const workspaces: Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspaces = environment['workspaces'] ?? {};
    let generatedCount: Cli_Generate_MustHaves_Dotenv_Runner_Run_GeneratedCount = 0;

    for (const workspaceEntry of Object.entries(workspaces)) {
      const workspacePath: Cli_Generate_MustHaves_Dotenv_Runner_Run_WorkspacePath = workspaceEntry[0];
      const workspace: Cli_Generate_MustHaves_Dotenv_Runner_Run_Workspace = workspaceEntry[1];
      const variables: Cli_Generate_MustHaves_Dotenv_Runner_Run_Variables = workspace['variables'] ?? [];

      generatedCount += 1;

      await writeDotenvFiles({
        confirmPrune: Runner['confirmPrune'],
        dryRun: isDryRun,
        prune: isPrune,
        replaceFile: isReplaceFile,
        targetDirectory: join(currentDirectory, workspacePath),
        variables,
      });
    }

    if (generatedCount === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'environment',
      }).warn('No workspaces declare environment variables. Nothing to generate.');
    }

    return 'completed';
  }

  /**
   * CLI - Generate - Must Haves - Dotenv - Confirm Prune.
   *
   * Asks the operator to confirm dropping keys that are no longer declared from the local
   * ".env". Returns false on cancellation so a filled line is never stripped without a yes.
   *
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_FilePath} filePath - File path.
   * @param {Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Keys}     keys     - Keys.
   *
   * @private
   *
   * @returns {Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Returns}
   *
   * @since 0.21.0
   */
  private static async confirmPrune(filePath: Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_FilePath, keys: Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Keys): Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Returns {
    const response: Cli_Generate_MustHaves_Dotenv_Runner_ConfirmPrune_Response = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Remove undeclared keys from "${filePath}"? ${keys.join(', ')}`,
      initial: false,
    }, {
      onCancel: () => false,
    });

    return response['confirm'] === true;
  }
}
