import {
  dirname,
  relative,
  sep,
} from 'path';

import chalk from 'chalk';

import { NovaConfig } from '@/lib/nova-config.js';
import {
  isProjectRoot,
  loadWorkspaceManifests,
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIRecipePackageJsonSyncOwnershipHandleReturns,
  CLIRecipePackageJsonSyncOwnershipHandleWorkingFile,
  CLIRecipePackageJsonSyncOwnershipHandleWorkspace,
  CLIRecipePackageJsonSyncOwnershipRunOptions,
  CLIRecipePackageJsonSyncOwnershipRunReturns,
} from '@/types/cli/recipe/package-json/sync-ownership.d.ts';

/**
 * CLI Recipe - package.json - Sync Ownership.
 *
 * @since 1.0.0
 */
export class CLIRecipePackageJsonSyncOwnership {
  /**
   * CLI Recipe - package.json - Sync Ownership - Run.
   *
   * @param {CLIRecipePackageJsonSyncOwnershipRunOptions} options - Options.
   *
   * @returns {CLIRecipePackageJsonSyncOwnershipRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIRecipePackageJsonSyncOwnershipRunOptions): CLIRecipePackageJsonSyncOwnershipRunReturns {
    const currentDirectory = process.cwd();
    const isAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun = options.dryRun === true;
    const isReplaceFile = options.replaceFile === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const workingFileWorkspaces = Object.entries(workingFile.workspaces ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-ownership. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceRecipes = workspaceConfig.recipes;

      if (workspaceRecipes === undefined) {
        return false;
      }

      const recipeTuple = workspaceRecipes['sync-ownership'];

      if (recipeTuple === undefined) {
        return false;
      }

      return recipeTuple[0] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-ownership. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.run',
        purpose: 'workspaces',
      }).warn('Skipping sync-ownership. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'CLIRecipePackageJsonSyncOwnership.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for sync-ownership.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.run',
        purpose: 'iteration',
      }).info(`Running sync-ownership for the "${workspace.manifest.name}" workspace ...`);

      CLIRecipePackageJsonSyncOwnership.handle(workspace, workingFile);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }
  }

  /**
   * CLI Recipe - package.json - Sync Ownership - Handle.
   *
   * @param {CLIRecipePackageJsonSyncOwnershipHandleWorkspace}   workspace   - Workspace.
   * @param {CLIRecipePackageJsonSyncOwnershipHandleWorkingFile} workingFile - Working file.
   *
   * @private
   *
   * @returns {CLIRecipePackageJsonSyncOwnershipHandleReturns}
   *
   * @since 1.0.0
   */
  private static handle(workspace: CLIRecipePackageJsonSyncOwnershipHandleWorkspace, workingFile: CLIRecipePackageJsonSyncOwnershipHandleWorkingFile): CLIRecipePackageJsonSyncOwnershipHandleReturns {
    const fileContents = workspace.fileContents;
    const manifest = workspace.manifest;

    const packageHomepage = fileContents['homepage'];
    const packageBugs = fileContents['bugs'];
    const packageAuthor = fileContents['author'];
    const packageContributors = fileContents['contributors'];
    const packageFundingSources = fileContents['funding'];
    const packageRepository = fileContents['repository'];

    // Get recipe settings for this workspace.
    const recipes = manifest.recipes;
    const recipeTuple = (recipes !== undefined) ? recipes['sync-ownership'] : undefined;
    const recipeSettings = (recipeTuple !== undefined && recipeTuple.length > 1) ? recipeTuple[1] : undefined;

    // Sync the "homepage" field.
    if (
      packageHomepage !== undefined // Package "homepage" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.handle',
        purpose: 'homepage',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "homepage". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'homepage');
    } else {
      const validHomepage = (workingFile.urls !== undefined) ? workingFile.urls.homepage : undefined;

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && recipeSettings !== undefined // Recipe settings are defined.
          && recipeSettings['homepage'] === true // Recipe settings includes "homepage".
          && validHomepage !== undefined // Nova config "urls.homepage" setting is set.
        )
        && (
          typeof packageHomepage !== 'string' // Package "homepage" is not a string.
          || packageHomepage !== validHomepage // Package "homepage" differs from "validHomepage".
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'homepage',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "homepage" from workspace manifest ...`);

        Reflect.set(fileContents, 'homepage', validHomepage);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['homepage'] === true // Recipe settings includes "homepage".
        && validHomepage === undefined // Nova config "urls.homepage" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'homepage',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "homepage". No homepage is defined.`);

        Reflect.deleteProperty(fileContents, 'homepage');
      }
    }

    // Sync the "bugs" field.
    if (
      packageBugs !== undefined // Package "bugs" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.handle',
        purpose: 'bugs',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "bugs". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'bugs');
    } else {
      const validBugs = {
        email: (workingFile.emails !== undefined) ? workingFile.emails.bugs : undefined,
        url: (workingFile.urls !== undefined) ? workingFile.urls.bugs : undefined,
      };

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && recipeSettings !== undefined // Recipe settings are defined.
          && recipeSettings['bugs'] === true // Recipe settings includes "bugs".
          && (
            validBugs.email !== undefined // Nova config "bugs.email" setting is set.
            || validBugs.url !== undefined // Nova config "bugs.url" setting is set.
          )
        )
        && (
          JSON.stringify(packageBugs) !== JSON.stringify(validBugs)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'bugs',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "bugs" from workspace manifest ...`);

        Reflect.set(fileContents, 'bugs', validBugs);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['bugs'] === true // Recipe settings includes "bugs".
        && (
          validBugs.email === undefined // Nova config "bugs.email" setting is not set.
          && validBugs.url === undefined // Nova config "bugs.url" setting is not set.
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'bugs',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "bugs". No bug contacts are defined.`);

        Reflect.deleteProperty(fileContents, 'bugs');
      }
    }

    // Sync the "author" field.
    if (
      packageAuthor !== undefined // Package "author" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.handle',
        purpose: 'author',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "author". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'author');
    } else {
      const validAuthor = (() => {
        const entity = (workingFile.entities !== undefined) ? workingFile.entities.find((entity) => {
          return Array.isArray(entity.roles) && entity.roles.includes('author');
        }) : undefined;

        if (entity === undefined) {
          return {
            name: undefined,
            email: undefined,
            url: undefined,
          };
        }

        return {
          name: entity.name,
          email: entity.email,
          url: entity.url,
        };
      })();

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && recipeSettings !== undefined // Recipe settings are defined.
          && recipeSettings['author'] === true // Recipe settings includes "author".
          && (
            validAuthor.name !== undefined // Nova config "entities[0].name" setting is set.
            || validAuthor.email !== undefined // Nova config "entities[0].email" setting is set.
            || validAuthor.url !== undefined // Nova config "entities[0].url" setting is set.
          )
        )
        && (
          JSON.stringify(packageAuthor) !== JSON.stringify(validAuthor)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'author',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "author" from workspace manifest ...`);

        Reflect.set(fileContents, 'author', validAuthor);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['author'] === true // Recipe settings includes "author".
        && (
          validAuthor.name === undefined // Nova config "entities[0].name" setting is not set.
          && validAuthor.email === undefined // Nova config "entities[0].email" setting is not set.
          && validAuthor.url === undefined // Nova config "entities[0].url" setting is not set.
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'author',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "author". No author is defined.`);

        Reflect.deleteProperty(fileContents, 'author');
      }
    }

    // Sync the "contributors" field.
    if (
      packageContributors !== undefined // Package "contributors" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.handle',
        purpose: 'contributors',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "contributors". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'contributors');
    } else {
      const validContributors = (() => {
        const entities = workingFile.entities ?? [];

        return entities
          .filter((entity) => {
            return Array.isArray(entity.roles) && entity.roles.includes('contributor');
          })
          .map((entity) => {
            return {
              name: entity.name,
              email: entity.email,
              url: entity.url,
            };
          })
          .filter((entity) => {
            return entity.name !== undefined || entity.email !== undefined || entity.url !== undefined;
          });
      })();

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && recipeSettings !== undefined // Recipe settings are defined.
          && recipeSettings['contributors'] === true // Recipe settings includes "contributors".
          && (
            validContributors.length > 0 // Nova config "entities" has contributors.
          )
        )
        && (
          JSON.stringify(packageContributors) !== JSON.stringify(validContributors)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'contributors',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "contributors" from workspace manifest ...`);

        Reflect.set(fileContents, 'contributors', validContributors);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['contributors'] === true // Recipe settings includes "contributors".
        && (
          validContributors.length === 0 // Nova config "entities" has no contributors.
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'contributors',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "contributors". No contributors are defined.`);

        Reflect.deleteProperty(fileContents, 'contributors');
      }
    }

    // Sync the "funding" field.
    if (
      packageFundingSources !== undefined // Package "funding" sources is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.handle',
        purpose: 'funding',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "funding". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'funding');
    } else {
      const validFundingSources = (workingFile.urls !== undefined) ? workingFile.urls.fundSources : undefined;

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && recipeSettings !== undefined // Recipe settings are defined.
          && recipeSettings['funding'] === true // Recipe settings includes "funding".
          && validFundingSources !== undefined // Nova config "urls.fundSources" setting is set.
        )
        && (
          JSON.stringify(packageFundingSources) !== JSON.stringify(validFundingSources)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'funding',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "funding" from workspace manifest ...`);

        Reflect.set(fileContents, 'funding', validFundingSources);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['funding'] === true // Recipe settings includes "funding".
        && validFundingSources === undefined // Nova config "urls.fundSources" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'funding',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "funding". No funding sources are defined.`);

        Reflect.deleteProperty(fileContents, 'funding');
      }
    }

    // Sync the "repository" field.
    if (
      packageRepository !== undefined // Package "repository" is defined.
      && manifest.policy !== 'distributable' // Workspace policy is not "distributable".
    ) {
      Logger.customize({
        name: 'CLIRecipePackageJsonSyncOwnership.handle',
        purpose: 'repository',
      }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "repository". Workspace policy "${manifest.policy}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'repository');
    } else {
      const validRepository = (() => {
        const repositoryUrl = (workingFile.urls !== undefined) ? workingFile.urls.repository : undefined;

        if (repositoryUrl === undefined) {
          return undefined;
        }

        const projectRoot = process.cwd();
        const packageDirectory = dirname(workspace.filePath);
        const relativeDirectory = relative(projectRoot, packageDirectory);
        const repositoryDirectory = relativeDirectory.replaceAll(sep, '/');

        return {
          type: 'git',
          url: repositoryUrl,
          ...(repositoryDirectory !== '' && repositoryDirectory !== '.' ? {
            directory: repositoryDirectory,
          } : {}),
        };
      })();

      if (
        (
          manifest.policy === 'distributable' // Workspace policy is "distributable".
          && recipeSettings !== undefined // Recipe settings are defined.
          && recipeSettings['repository'] === true // Recipe settings includes "repository".
          && validRepository !== undefined // Nova config "urls.repository" setting is set.
        )
        && (
          JSON.stringify(packageRepository) !== JSON.stringify(validRepository)
        )
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'repository',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Syncing "repository" from workspace manifest ...`);

        Reflect.set(fileContents, 'repository', validRepository);
      }

      if (
        manifest.policy === 'distributable' // Workspace policy is "distributable".
        && recipeSettings !== undefined // Recipe settings are defined.
        && recipeSettings['repository'] === true // Recipe settings includes "repository".
        && validRepository === undefined // Nova config "urls.repository" setting is not set.
      ) {
        Logger.customize({
          name: 'CLIRecipePackageJsonSyncOwnership.handle',
          purpose: 'repository',
        }).info(`${chalk.magenta(`"${manifest.name}" workspace`)} → Removing "repository". No repository url is defined.`);

        Reflect.deleteProperty(fileContents, 'repository');
      }
    }
  }
}
