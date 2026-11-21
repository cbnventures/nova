import { promises as fs } from 'node:fs';
import { basename, join, relative } from 'node:path';

import {
  formatDescriptionLimitMessage,
  resolveDestinationDescription,
  resolveGithubActionDescriptionDestination,
} from '../../../lib/description-limits.js';
import {
  replaceGithubActionScalar,
  resolveGithubActionAuthor,
  resolveGithubActionWorkspacePath,
} from '../../../lib/github-action-identity.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { resolveWorkspaceTitle } from '../../../lib/scaffold.js';
import {
  isProjectRoot,
  pathExists,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_Candidates,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_Returns,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_WorkspaceDirectory,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_IsSilent,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Level,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Message,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Returns,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_ActionFilePath,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_CurrentDirectory,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_GithubActionRecipes,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_IsDryRun,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_IsReplaceFile,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Options,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Recipes,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Returns,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_SyncIdentity,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_TargetCount,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_WorkingFile,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_WorkspacePaths,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Author,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_AuthorContent,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Content,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Description,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DescriptionContent,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DescriptionDestination,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DescriptionLimitMessage,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DisplayPath,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_FilePath,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsDryRun,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsReplaceFile,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsSilent,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_NameContent,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_OwnerPath,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Returns,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Title,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_UpdatedContent,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_WorkingFile,
  Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_WorkspacePath,
} from '../../../types/cli/recipe/github-action/sync-identity.d.ts';

/**
 * CLI - Recipe - GitHub Action - Sync Identity.
 *
 * Keeps the "name", "description", and "author" of each GitHub Action manifest
 * in step with nova.config.json, editing those values in place only.
 *
 * @since 0.49.0
 */
export class Runner {
  /**
   * CLI - Recipe - GitHub Action - Sync Identity - Run.
   *
   * Verifies the project root and the recipe toggle, then refreshes every
   * configured workspace that has an "action.yml" or "action.yaml" file.
   *
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Returns}
   *
   * @since 0.49.0
   */
  public static async run(options: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Options): Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const recipes: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_Recipes = workingFile['recipes'];
    const githubActionRecipes: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_GithubActionRecipes = (recipes !== undefined) ? recipes['github-action'] : undefined;
    const syncIdentity: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_SyncIdentity = (githubActionRecipes !== undefined) ? githubActionRecipes['sync-identity'] : undefined;

    if (
      syncIdentity === undefined
      || syncIdentity['enabled'] !== true
    ) {
      Logger.warn('Skipping sync-identity. The recipe is not enabled in the "nova.config.json" file.');

      return;
    }

    const workspacePaths: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_WorkspacePaths = Object.keys(workingFile['workspaces'] ?? {});
    let targetCount: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_TargetCount = 0;

    // Each manifest is handled on its own, so one invalid manifest never blocks the others.
    for (const workspacePath of workspacePaths) {
      const actionFilePath: Cli_Recipe_GithubAction_SyncIdentity_Runner_Run_ActionFilePath = await Runner.findActionFile(join(currentDirectory, workspacePath));

      if (actionFilePath === undefined) {
        continue;
      }

      targetCount += 1;

      await Runner.syncFile(actionFilePath, workingFile, undefined, isDryRun, isReplaceFile, false);
    }

    if (targetCount === 0) {
      Logger.warn('Skipping sync-identity. No workspace has an "action.yml" or "action.yaml" file.');
    }

    return;
  }

  /**
   * CLI - Recipe - GitHub Action - Sync Identity - Sync File.
   *
   * Writes "name", "description", and "author" into one manifest. The GitHub
   * Action scaffold calls it too, so generated and synced values always match.
   *
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_FilePath}      filePath      - File path.
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_WorkingFile}   workingFile   - Working file.
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_WorkspacePath} workspacePath - Workspace path.
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsDryRun}      isDryRun      - Is dry run.
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsReplaceFile} isReplaceFile - Is replace file.
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsSilent}      isSilent      - Is silent.
   *
   * @returns {Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Returns}
   *
   * @since 0.49.0
   */
  public static async syncFile(filePath: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_FilePath, workingFile: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_WorkingFile, workspacePath: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_WorkspacePath, isDryRun: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsDryRun, isReplaceFile: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsReplaceFile, isSilent: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_IsSilent): Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Returns {
    const displayPath: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DisplayPath = relative(process.cwd(), filePath);
    let content: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Content = '';

    try {
      content = await fs.readFile(filePath, 'utf-8');
    } catch {
      Logger.customize({
        name: 'Runner.syncFile',
        purpose: 'read',
      }).error(`Unable to read "${displayPath}".`);

      process.exitCode = 1;

      return false;
    }

    // The workspace that owns the action supplies the title and the description override.
    const ownerPath: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_OwnerPath = workspacePath ?? resolveGithubActionWorkspacePath(content, Object.keys(workingFile['workspaces'] ?? {}));

    if (ownerPath === undefined) {
      Runner.report(isSilent, 'warn', `Skipping "${displayPath}". Its "runs.main" entry point is not inside a configured workspace, so the owning workspace cannot be found.`);

      return true;
    }

    const descriptionDestination: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DescriptionDestination = resolveGithubActionDescriptionDestination(workingFile['workspaces'], ownerPath);
    const description: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Description = resolveDestinationDescription(descriptionDestination, workingFile);

    // A description over the Marketplace limit stops this manifest before anything is written.
    if (description !== undefined) {
      const descriptionLimitMessage: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DescriptionLimitMessage = formatDescriptionLimitMessage(descriptionDestination, description);

      if (descriptionLimitMessage !== undefined) {
        Logger.customize({
          name: 'Runner.syncFile',
          purpose: 'description',
        }).error(`Skipping "${displayPath}". ${descriptionLimitMessage}`);

        process.exitCode = 1;

        return false;
      }
    }

    let updatedContent: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_UpdatedContent = content;

    // Sync "name" from the same workspace title the GitHub Action scaffold writes.
    const title: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Title = resolveWorkspaceTitle(basename(ownerPath));
    const nameContent: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_NameContent = replaceGithubActionScalar(updatedContent, 'name', title, undefined);

    if (nameContent === undefined) {
      Runner.report(isSilent, 'warn', `Skipping "name" in "${displayPath}". The value is not a single-line scalar that can be edited in place.`);
    } else {
      updatedContent = nameContent;
    }

    // Sync "description" from the override or "project.description.short".
    if (description === undefined) {
      Runner.report(isSilent, 'warn', `Skipping "description" in "${displayPath}". Set "${descriptionDestination['overrideField']}" or "project.description.short" in the "nova.config.json" file.`);
    } else {
      const descriptionContent: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_DescriptionContent = replaceGithubActionScalar(updatedContent, 'description', description, 'name');

      if (descriptionContent === undefined) {
        Runner.report(isSilent, 'warn', `Skipping "description" in "${displayPath}". The value is not a single-line scalar that can be edited in place.`);
      } else {
        updatedContent = descriptionContent;
      }
    }

    // Sync "author" from the entity with the "author" role.
    const author: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_Author = resolveGithubActionAuthor(workingFile['entities']);

    if (author === undefined) {
      Runner.report(isSilent, 'warn', `Skipping "author" in "${displayPath}". No entity with the "author" role and a name is defined.`);
    } else {
      const authorContent: Cli_Recipe_GithubAction_SyncIdentity_Runner_SyncFile_AuthorContent = replaceGithubActionScalar(updatedContent, 'author', author, 'description');

      if (authorContent === undefined) {
        Runner.report(isSilent, 'warn', `Skipping "author" in "${displayPath}". The value is not a single-line scalar that can be edited in place.`);
      } else {
        updatedContent = authorContent;
      }
    }

    if (updatedContent === content) {
      Runner.report(isSilent, 'info', `Skipping "${displayPath}". The action identity is already up to date.`);

      return true;
    }

    if (isDryRun === true) {
      Runner.report(isSilent, 'info', `Would update the identity in "${displayPath}".`);

      return true;
    }

    await saveGeneratedFile(filePath, updatedContent, isReplaceFile, undefined, isSilent === false);

    return true;
  }

  /**
   * CLI - Recipe - GitHub Action - Sync Identity - Find Action File.
   *
   * Looks for the action manifest at the root of one workspace. GitHub accepts
   * both "action.yml" and "action.yaml"; the first one found is used.
   *
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_WorkspaceDirectory} workspaceDirectory - Workspace directory.
   *
   * @private
   *
   * @returns {Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_Returns}
   *
   * @since 0.49.0
   */
  private static async findActionFile(workspaceDirectory: Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_WorkspaceDirectory): Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_Returns {
    const candidates: Cli_Recipe_GithubAction_SyncIdentity_Runner_FindActionFile_Candidates = [
      join(workspaceDirectory, 'action.yml'),
      join(workspaceDirectory, 'action.yaml'),
    ];

    for (const candidate of candidates) {
      if (await pathExists(candidate) === true) {
        return candidate;
      }
    }

    return undefined;
  }

  /**
   * CLI - Recipe - GitHub Action - Sync Identity - Report.
   *
   * Prints one recipe message unless the caller asked for silence. The scaffold
   * runs the same sync quietly so its progress output stays readable.
   *
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_IsSilent} isSilent - Is silent.
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Level}    level    - Level.
   * @param {Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Message}  message  - Message.
   *
   * @private
   *
   * @returns {Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Returns}
   *
   * @since 0.49.0
   */
  private static report(isSilent: Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_IsSilent, level: Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Level, message: Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Message): Cli_Recipe_GithubAction_SyncIdentity_Runner_Report_Returns {
    if (isSilent === true) {
      return;
    }

    if (level === 'warn') {
      Logger.customize({
        name: 'Runner.syncFile',
        purpose: 'github-action',
      }).warn(message);

      return;
    }

    Logger.customize({
      name: 'Runner.syncFile',
      purpose: 'github-action',
    }).info(message);

    return;
  }
}
