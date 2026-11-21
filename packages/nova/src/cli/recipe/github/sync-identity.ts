import { Runner as ApiGithub } from '../../../api/github.js';
import {
  formatKeywordLimitMessage,
  resolveDestinationKeywords,
  resolveGithubTopicsDestination,
} from '../../../lib/keyword-limits.js';
import { executeShell } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { ghPrecheck } from './gh-precheck.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Description,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_EditCommand,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_EditResult,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Github,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Homepage,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_IsDryRun,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Keywords,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Options,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Owner,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Precheck,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Repo,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Returns,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Topics,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsCommand,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsDestination,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsLimitMessage,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsResult,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_WorkingFile,
} from '../../../types/cli/recipe/github/sync-identity.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Identity.
 *
 * Pushes description, homepage URL, and topics from nova.config.json
 * to a GitHub repository using the gh CLI.
 *
 * @since 0.18.0
 */
export class Runner {
  /**
   * CLI - Recipe - GitHub - Sync Identity - Run.
   *
   * Runs precheck steps then invokes gh repo edit and gh api to sync
   * description, homepage, and topics to the configured repository.
   *
   * @param {Cli_Recipe_Github_SyncIdentity_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Github_SyncIdentity_Runner_Run_Returns}
   *
   * @since 0.18.0
   */
  public static async run(options: Cli_Recipe_Github_SyncIdentity_Runner_Run_Options): Cli_Recipe_Github_SyncIdentity_Runner_Run_Returns {
    const precheck: Cli_Recipe_Github_SyncIdentity_Runner_Run_Precheck = await ghPrecheck('sync-identity', options);

    if (precheck === undefined) {
      return;
    }

    const workingFile: Cli_Recipe_Github_SyncIdentity_Runner_Run_WorkingFile = precheck['workingFile'];
    const github: Cli_Recipe_Github_SyncIdentity_Runner_Run_Github = precheck['github'];
    const owner: Cli_Recipe_Github_SyncIdentity_Runner_Run_Owner = precheck['owner'];
    const repo: Cli_Recipe_Github_SyncIdentity_Runner_Run_Repo = precheck['repo'];
    const isDryRun: Cli_Recipe_Github_SyncIdentity_Runner_Run_IsDryRun = precheck['isDryRun'];

    const description: Cli_Recipe_Github_SyncIdentity_Runner_Run_Description = (workingFile['project'] !== undefined && workingFile['project']['description'] !== undefined) ? workingFile['project']['description']['short'] : undefined;
    const homepage: Cli_Recipe_Github_SyncIdentity_Runner_Run_Homepage = (workingFile['urls'] !== undefined) ? workingFile['urls']['homepage'] : undefined;
    const topicsDestination: Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsDestination = resolveGithubTopicsDestination(github);
    const keywords: Cli_Recipe_Github_SyncIdentity_Runner_Run_Keywords = resolveDestinationKeywords(topicsDestination, workingFile);

    if (keywords !== undefined) {
      const topicsLimitMessage: Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsLimitMessage = formatKeywordLimitMessage(topicsDestination, keywords);

      if (topicsLimitMessage !== undefined) {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'topics',
        }).error(topicsLimitMessage);

        process.exitCode = 1;

        return;
      }
    }

    // An empty "github.topics" clears every topic; an empty "project.keywords" leaves topics alone.
    let topics: Cli_Recipe_Github_SyncIdentity_Runner_Run_Topics = undefined;

    if (github['topics'] !== undefined) {
      topics = github['topics'];
    } else if (keywords !== undefined && keywords.length > 0) {
      topics = [...new Set(keywords)];
    }

    if (
      description === undefined
      && homepage === undefined
      && topics === undefined
    ) {
      Logger.warn('Skipping sync-identity. No values found for description, homepage, or topics.');

      return;
    }

    // gh repo edit for description + homepage.
    const editCommand: Cli_Recipe_Github_SyncIdentity_Runner_Run_EditCommand = ApiGithub.buildIdentityEditCommand(owner, repo, description, homepage);

    if (editCommand !== undefined) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'edit',
      }).info(`Command: ${editCommand}`);

      if (isDryRun !== true) {
        const editResult: Cli_Recipe_Github_SyncIdentity_Runner_Run_EditResult = await executeShell(editCommand);

        if (editResult['code'] !== 0) {
          handleGhFailure(editResult, 'sync-identity');

          return;
        }
      }
    }

    // gh api PUT for topics.
    if (topics !== undefined) {
      const topicsCommand: Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsCommand = ApiGithub.buildTopicsReplaceCommand(owner, repo, topics);

      Logger.customize({
        name: 'Runner.run',
        purpose: 'topics',
      }).info(`Command: ${topicsCommand}`);

      if (isDryRun !== true) {
        const topicsResult: Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsResult = await executeShell(topicsCommand);

        if (topicsResult['code'] !== 0) {
          handleGhFailure(topicsResult, 'sync-identity');

          return;
        }
      }
    }

    if (isDryRun !== true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'summary',
      }).info(`Updated ${owner}/${repo}.`);
    }

    return;
  }
}
