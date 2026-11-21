import { Runner as LibDockerPackaging } from '../../../lib/docker-packaging.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { isProjectRoot } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_Docker_SyncImage_Runner_Report_ChangedCount,
  Cli_Recipe_Docker_SyncImage_Runner_Report_IsDryRun,
  Cli_Recipe_Docker_SyncImage_Runner_Report_Result,
  Cli_Recipe_Docker_SyncImage_Runner_Report_Returns,
  Cli_Recipe_Docker_SyncImage_Runner_Report_Verb,
  Cli_Recipe_Docker_SyncImage_Runner_Run_CurrentDirectory,
  Cli_Recipe_Docker_SyncImage_Runner_Run_DockerRecipes,
  Cli_Recipe_Docker_SyncImage_Runner_Run_ErrorMessage,
  Cli_Recipe_Docker_SyncImage_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_Docker_SyncImage_Runner_Run_IsDryRun,
  Cli_Recipe_Docker_SyncImage_Runner_Run_IsReplaceFile,
  Cli_Recipe_Docker_SyncImage_Runner_Run_Options,
  Cli_Recipe_Docker_SyncImage_Runner_Run_Recipes,
  Cli_Recipe_Docker_SyncImage_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_Docker_SyncImage_Runner_Run_Result,
  Cli_Recipe_Docker_SyncImage_Runner_Run_Returns,
  Cli_Recipe_Docker_SyncImage_Runner_Run_SyncImage,
  Cli_Recipe_Docker_SyncImage_Runner_Run_WorkingFile,
} from '../../../types/cli/recipe/docker/sync-image.d.ts';

/**
 * CLI - Recipe - Docker - Sync Image.
 *
 * Re-renders the root Dockerfile, compose.yml, and the Nova-owned packages/docker
 * files from the image manifest, the same way the scaffold does.
 *
 * @since 0.49.0
 */
export class Runner {
  /**
   * CLI - Recipe - Docker - Sync Image - Run.
   *
   * Verifies the project root and the recipe toggle, then syncs the image files
   * or, in a dry run, lists each file that would change with its line counts.
   *
   * @param {Cli_Recipe_Docker_SyncImage_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Docker_SyncImage_Runner_Run_Returns}
   *
   * @since 0.49.0
   */
  public static async run(options: Cli_Recipe_Docker_SyncImage_Runner_Run_Options): Cli_Recipe_Docker_SyncImage_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_Docker_SyncImage_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_Docker_SyncImage_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_Docker_SyncImage_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_Docker_SyncImage_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_Docker_SyncImage_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_Docker_SyncImage_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const recipes: Cli_Recipe_Docker_SyncImage_Runner_Run_Recipes = workingFile['recipes'];
    const dockerRecipes: Cli_Recipe_Docker_SyncImage_Runner_Run_DockerRecipes = (recipes !== undefined) ? recipes['docker'] : undefined;
    const syncImage: Cli_Recipe_Docker_SyncImage_Runner_Run_SyncImage = (dockerRecipes !== undefined) ? dockerRecipes['sync-image'] : undefined;

    if (
      syncImage === undefined
      || syncImage['enabled'] !== true
    ) {
      Logger.warn('Skipping sync-image. The recipe is not enabled in the "nova.config.json" file.');

      return;
    }

    let result: Cli_Recipe_Docker_SyncImage_Runner_Run_Result = undefined;

    try {
      result = await LibDockerPackaging.syncImage({
        dryRun: isDryRun,
        projectDirectory: currentDirectory,
        replaceFile: isReplaceFile,
        reportFiles: isDryRun === false,
      });
    } catch (error) {
      const errorMessage: Cli_Recipe_Docker_SyncImage_Runner_Run_ErrorMessage = (error instanceof Error) ? error.message : String(error);

      Logger.customize({
        name: 'Runner.run',
        purpose: 'docker',
      }).error(`Skipping sync-image. ${errorMessage}`);

      process.exitCode = 1;

      return;
    }

    Runner.report(result, isDryRun);

    return;
  }

  /**
   * CLI - Recipe - Docker - Sync Image - Report.
   *
   * Prints one line per changed file with its added and removed line counts, then
   * warns about kept rootfs files, missing image scripts, and a missing ignore entry
   * for the .dockerignore file that ignore-files owns.
   *
   * @param {Cli_Recipe_Docker_SyncImage_Runner_Report_Result}   result   - Result.
   * @param {Cli_Recipe_Docker_SyncImage_Runner_Report_IsDryRun} isDryRun - Is dry run.
   *
   * @private
   *
   * @returns {Cli_Recipe_Docker_SyncImage_Runner_Report_Returns}
   *
   * @since 0.49.0
   */
  private static report(result: Cli_Recipe_Docker_SyncImage_Runner_Report_Result, isDryRun: Cli_Recipe_Docker_SyncImage_Runner_Report_IsDryRun): Cli_Recipe_Docker_SyncImage_Runner_Report_Returns {
    let changedCount: Cli_Recipe_Docker_SyncImage_Runner_Report_ChangedCount = 0;

    for (const change of result['changes']) {
      if (change['status'] === 'unchanged') {
        continue;
      }

      changedCount += 1;

      let verb: Cli_Recipe_Docker_SyncImage_Runner_Report_Verb = (isDryRun === true) ? 'Would update' : 'Updated';

      if (change['status'] === 'create') {
        verb = (isDryRun === true) ? 'Would create' : 'Created';
      } else if (change['status'] === 'delete') {
        verb = (isDryRun === true) ? 'Would delete' : 'Deleted';
      }

      Logger.customize({
        name: 'Runner.report',
        purpose: 'docker',
      }).info(`${verb} "${change['path']}" (+${change['added']} -${change['removed']} lines).`);
    }

    if (changedCount === 0) {
      Logger.customize({
        name: 'Runner.report',
        purpose: 'docker',
      }).info('Skipping sync-image. The Docker image files are already up to date.');
    }

    for (const unownedFile of result['unownedFiles']) {
      Logger.customize({
        name: 'Runner.report',
        purpose: 'docker',
      }).warn(`"${unownedFile}" was not generated by Nova, so it is kept. Move project files to "packages/docker/project/".`);
    }

    for (const missingScript of result['missingScripts']) {
      Logger.customize({
        name: 'Runner.report',
        purpose: 'docker',
      }).warn(`"packages/docker/package.json" has no "${missingScript}" script. The Docker image workflow expects one, so add it to that file.`);
    }

    if (result['missingIgnoreFileEntry'] === true) {
      Logger.customize({
        name: 'Runner.report',
        purpose: 'docker',
      }).warn('"nova.config.json" has no "./.dockerignore" entry under "ignoreFiles". Add one and run "nova generate must-haves ignore-files" to write ".dockerignore".');
    }

    return;
  }
}
