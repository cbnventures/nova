import { promises as fs } from 'node:fs';
import { join } from 'node:path';

import { Runner as DockerHub } from '../../../api/docker-hub.js';
import { pathExists } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { dockerHubPrecheck } from './docker-hub-precheck.js';

import type {
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Categories,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoriesChanged,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoriesResponse,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoriesStatus,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoryNames,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategorySlugs,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CurrentCategorySlugs,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Description,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DescriptionChanged,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DescriptionStatus,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DesiredCategorySlugs,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DockerHub,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_HasChanges,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_HasReadme,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_IdentityResponse,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_IsDryRun,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_LiveCategories,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_LiveCategory,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Namespace,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Options,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Overview,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_OverviewChanged,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_OverviewLength,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_OverviewStatus,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Precheck,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_ReadmePath,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Repository,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_RepositoryName,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Returns,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Token,
  Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_WorkingFile,
} from '../../../types/cli/recipe/docker-hub/sync-identity.d.ts';

/**
 * CLI - Recipe - Docker Hub - Sync Identity.
 *
 * Synchronizes the short description, README overview, and repository categories
 * with Docker Hub.
 *
 * @since 0.40.0
 */
export class Runner {
  /**
   * CLI - Recipe - Docker Hub - Sync Identity - Run.
   *
   * Validates every desired value before sending only fields that differ from
   * the current Docker Hub repository.
   *
   * @param {Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Returns}
   *
   * @since 0.40.0
   */
  public static async run(options: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Options): Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Returns {
    const precheck: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Precheck = await dockerHubPrecheck('sync-identity', options);

    if (precheck === undefined) {
      return;
    }

    const workingFile: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_WorkingFile = precheck['workingFile'];
    const dockerHub: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DockerHub = precheck['dockerHub'];
    const namespace: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Namespace = precheck['namespace'];
    const repositoryName: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_RepositoryName = precheck['repositoryName'];
    const token: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Token = precheck['token'];
    const repository: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Repository = precheck['repository'];
    const isDryRun: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_IsDryRun = precheck['isDryRun'];
    const description: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Description = (
      workingFile['project'] !== undefined
      && workingFile['project']['description'] !== undefined
    ) ? workingFile['project']['description']['short'] : undefined;

    if (description === undefined) {
      Logger.error('Docker Hub sync-identity requires "project.description.short" in nova.config.json.');

      process.exitCode = 1;

      return;
    }

    if (description.length > 100) {
      Logger.error(`Docker Hub's short description limit is 100 characters; the configured value has ${description.length}.`);

      process.exitCode = 1;

      return;
    }

    const readmePath: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_ReadmePath = join(process.cwd(), 'README.md');
    const hasReadme: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_HasReadme = await pathExists(readmePath);
    let overview: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Overview = undefined;

    if (hasReadme === true) {
      try {
        overview = await fs.readFile(readmePath, 'utf-8');
      } catch {
        Logger.error('Unable to read README.md for the Docker Hub overview.');

        process.exitCode = 1;

        return;
      }

      if (overview.length > 25_000) {
        Logger.error(`Docker Hub's overview limit is 25,000 characters; README.md has ${overview.length}.`);

        process.exitCode = 1;

        return;
      }
    } else {
      Logger.warn('README.md was not found. The Docker Hub overview will not be changed.');
    }

    const categorySlugs: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategorySlugs = dockerHub['categories'];
    let categories: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Categories = undefined;

    if (categorySlugs !== undefined) {
      if (categorySlugs.length > 3) {
        Logger.error('Docker Hub accepts at most 3 repository categories.');

        process.exitCode = 1;

        return;
      }

      const liveCategories: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_LiveCategories = await DockerHub.fetchCategories();

      if (liveCategories === undefined) {
        Logger.error('Unable to validate Docker Hub categories against the live category list.');

        process.exitCode = 1;

        return;
      }

      categories = [];

      for (const categorySlug of categorySlugs) {
        const liveCategory: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_LiveCategory = liveCategories.find((category) => category['slug'] === categorySlug);

        if (liveCategory === undefined) {
          Logger.error(`Docker Hub category slug "${categorySlug}" was not found in the live category list.`);

          process.exitCode = 1;

          return;
        }

        categories.push(liveCategory);
      }
    }

    const descriptionChanged: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DescriptionChanged = repository['description'] !== description;
    const overviewChanged: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_OverviewChanged = overview !== undefined && repository['full_description'] !== overview;
    const currentCategorySlugs: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CurrentCategorySlugs = repository['categories'].map((category) => category['slug']);
    const desiredCategorySlugs: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DesiredCategorySlugs = (categories !== undefined) ? categories.map((category) => category['slug']) : currentCategorySlugs;
    const categoriesChanged: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoriesChanged = categories !== undefined && JSON.stringify(currentCategorySlugs) !== JSON.stringify(desiredCategorySlugs);
    const descriptionStatus: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DescriptionStatus = (descriptionChanged === true) ? '' : ' (unchanged)';

    Logger.info(`Description → "${description}" (${description.length}/100)${descriptionStatus}`);

    if (overview !== undefined) {
      const overviewLength: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_OverviewLength = overview.length.toLocaleString('en-US');
      const overviewStatus: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_OverviewStatus = (overviewChanged === true) ? '' : ' (unchanged)';

      Logger.info(`Overview → README.md (${overviewLength} chars)${overviewStatus}`);
    }

    if (categories !== undefined) {
      const categoryNames: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoryNames = (categories.length > 0) ? categories.map((category) => category['name']).join(', ') : 'None';
      const categoriesStatus: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoriesStatus = (categoriesChanged === true) ? '' : ' (unchanged)';

      Logger.info(`Categories → ${categoryNames}${categoriesStatus}`);
    }

    if (
      (
        descriptionChanged === true
        || overviewChanged === true
      )
      && isDryRun === false
    ) {
      const identityResponse: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_IdentityResponse = await DockerHub.updateIdentity(
        namespace,
        repositoryName,
        token,
        (descriptionChanged === true) ? description : undefined,
        (overviewChanged === true) ? overview : undefined,
      );

      if (identityResponse['ok'] === false) {
        Logger.error(`Unable to update Docker Hub repository identity. HTTP status: ${identityResponse['status']}`);

        process.exitCode = 1;

        return;
      }
    }

    if (
      categoriesChanged === true
      && categories !== undefined
      && isDryRun === false
    ) {
      const categoriesResponse: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoriesResponse = await DockerHub.updateCategories(namespace, repositoryName, token, categories);

      if (categoriesResponse['ok'] === false) {
        Logger.error(`Unable to update Docker Hub repository categories. HTTP status: ${categoriesResponse['status']}`);

        process.exitCode = 1;

        return;
      }
    }

    const hasChanges: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_HasChanges = (
      descriptionChanged === true
      || overviewChanged === true
      || categoriesChanged === true
    );

    if (hasChanges === true && isDryRun === false) {
      Logger.info(`Updated Docker Hub repository ${namespace}/${repositoryName}.`);
    }

    return;
  }
}
