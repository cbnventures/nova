import { Runner as DockerHub } from '../../../api/docker-hub.js';
import { Logger } from '../../../toolkit/index.js';
import { dockerHubPrecheck } from './docker-hub-precheck.js';

import type {
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_DesiredIsPrivate,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_DockerHub,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_HasChanges,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTags,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsChanged,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsLabel,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsResponse,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsStatus,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_IsDryRun,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Namespace,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Options,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Precheck,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_PrivacyResponse,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Repository,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_RepositoryName,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Returns,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Token,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Visibility,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_VisibilityChanged,
  Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_VisibilityStatus,
} from '../../../types/cli/recipe/docker-hub/sync-policies.d.ts';

/**
 * CLI - Recipe - Docker Hub - Sync Policies.
 *
 * Synchronizes repository visibility and immutable-tag settings with Docker Hub.
 * Configuration remains the source of truth for each explicitly set field.
 *
 * @since 0.40.0
 */
export class Runner {
  /**
   * CLI - Recipe - Docker Hub - Sync Policies - Run.
   *
   * Compares configured policy fields and sends only the endpoints whose values
   * differ from the current repository.
   *
   * @param {Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Returns}
   *
   * @since 0.40.0
   */
  public static async run(options: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Options): Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Returns {
    const precheck: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Precheck = await dockerHubPrecheck('sync-policies', options);

    if (precheck === undefined) {
      return;
    }

    const dockerHub: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_DockerHub = precheck['dockerHub'];
    const namespace: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Namespace = precheck['namespace'];
    const repositoryName: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_RepositoryName = precheck['repositoryName'];
    const token: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Token = precheck['token'];
    const repository: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Repository = precheck['repository'];
    const isDryRun: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_IsDryRun = precheck['isDryRun'];
    const visibility: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Visibility = dockerHub['visibility'];
    const immutableTags: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTags = dockerHub['immutableTags'];

    if (visibility === undefined && immutableTags === undefined) {
      Logger.warn('Skipping sync-policies. No Docker Hub policy values are configured.');

      return;
    }

    const desiredIsPrivate: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_DesiredIsPrivate = visibility === 'private';
    const visibilityChanged: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_VisibilityChanged = visibility !== undefined && repository['is_private'] !== desiredIsPrivate;

    if (visibility !== undefined) {
      const visibilityStatus: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_VisibilityStatus = (visibilityChanged === true) ? '' : ' (unchanged)';

      Logger.info(`Visibility → ${visibility}${visibilityStatus}`);
    }

    const immutableTagsChanged: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsChanged = (
      immutableTags !== undefined
      && (
        repository['immutable_tags_settings']['enabled'] !== immutableTags['enabled']
        || JSON.stringify(repository['immutable_tags_settings']['rules']) !== JSON.stringify(immutableTags['rules'])
      )
    );

    if (immutableTags !== undefined) {
      const immutableTagsLabel: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsLabel = (immutableTags['enabled'] === true) ? `enabled (${immutableTags['rules'].length} rules)` : 'disabled';
      const immutableTagsStatus: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsStatus = (immutableTagsChanged === true) ? '' : ' (unchanged)';

      Logger.info(`Immutable tags → ${immutableTagsLabel}${immutableTagsStatus}`);
    }

    if (
      visibilityChanged === true
      && visibility !== undefined
      && isDryRun === false
    ) {
      const privacyResponse: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_PrivacyResponse = await DockerHub.updatePrivacy(namespace, repositoryName, token, desiredIsPrivate);

      if (privacyResponse['ok'] === false) {
        Logger.error(`Unable to update Docker Hub repository visibility. HTTP status: ${privacyResponse['status']}`);

        process.exitCode = 1;

        return;
      }
    }

    if (
      immutableTagsChanged === true
      && immutableTags !== undefined
      && isDryRun === false
    ) {
      const immutableTagsResponse: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsResponse = await DockerHub.updateImmutableTags(
        namespace,
        repositoryName,
        token,
        immutableTags['enabled'],
        immutableTags['rules'],
      );

      if (immutableTagsResponse['ok'] === false) {
        Logger.error(`Unable to update Docker Hub immutable tags. HTTP status: ${immutableTagsResponse['status']}`);

        process.exitCode = 1;

        return;
      }
    }

    const hasChanges: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_HasChanges = visibilityChanged === true || immutableTagsChanged === true;

    if (hasChanges === true && isDryRun === false) {
      Logger.info(`Updated Docker Hub repository ${namespace}/${repositoryName}.`);
    }

    return;
  }
}
