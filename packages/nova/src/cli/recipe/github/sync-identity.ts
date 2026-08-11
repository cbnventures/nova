import {
  LIB_REGEX_PATTERN_LEADING_OR_TRAILING_HYPHEN,
  LIB_REGEX_PATTERN_NON_TOPIC_CHAR,
  LIB_REGEX_PATTERN_WHITESPACE_OR_UNDERSCORE,
} from '../../../lib/regex.js';
import {
  executeShell,
  shellQuote,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { ghPrecheck } from './gh-precheck.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Deduped,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Keywords,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_NonTopicPattern,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Normalized,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_PatternLeadingOrTrailing,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_PatternWhitespaceOrUnderscore,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Returns,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step1,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step2,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step3,
  Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step4,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Description,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_EditCommand,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_EditFlags,
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
  Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicFlags,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_Topics,
  Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsCommand,
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
    const keywords: Cli_Recipe_Github_SyncIdentity_Runner_Run_Keywords = (workingFile['project'] !== undefined) ? workingFile['project']['keywords'] : undefined;
    const topics: Cli_Recipe_Github_SyncIdentity_Runner_Run_Topics = (github['topics'] !== undefined) ? github['topics'] : Runner.normalizeTopics(keywords);

    if (
      description === undefined
      && homepage === undefined
      && topics === undefined
    ) {
      Logger.warn('Skipping sync-identity. No values found for description, homepage, or topics.');

      return;
    }

    // gh repo edit for description + homepage.
    if (
      description !== undefined
      || homepage !== undefined
    ) {
      const editFlags: Cli_Recipe_Github_SyncIdentity_Runner_Run_EditFlags = [];

      if (description !== undefined) {
        editFlags.push(`--description ${shellQuote(description)}`);
      }

      if (homepage !== undefined) {
        editFlags.push(`--homepage ${shellQuote(homepage)}`);
      }

      const editCommand: Cli_Recipe_Github_SyncIdentity_Runner_Run_EditCommand = `gh repo edit ${owner}/${repo} ${editFlags.join(' ')}`;

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
      const topicFlags: Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicFlags = (topics.length === 0) ? `-f ${shellQuote('names[]')}` : topics.map((topic) => `-f ${shellQuote(`names[]=${topic}`)}`).join(' ');
      const topicsCommand: Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsCommand = `gh api -X PUT /repos/${owner}/${repo}/topics ${topicFlags}`.trim();

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

  /**
   * CLI - Recipe - GitHub - Sync Identity - Normalize Topics.
   *
   * Converts raw keyword strings into valid GitHub topic slugs.
   * Lowercases, replaces separators, strips invalid characters, dedupes, and caps at
   * twenty items.
   *
   * @param {Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Keywords} keywords - Keywords.
   *
   * @private
   *
   * @returns {Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Returns}
   *
   * @since 0.18.0
   */
  private static normalizeTopics(keywords: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Keywords): Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Returns {
    if (keywords === undefined) {
      return undefined;
    }

    const patternWhitespaceOrUnderscore: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_PatternWhitespaceOrUnderscore = new RegExp(LIB_REGEX_PATTERN_WHITESPACE_OR_UNDERSCORE.source, 'g');
    const nonTopicPattern: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_NonTopicPattern = new RegExp(LIB_REGEX_PATTERN_NON_TOPIC_CHAR.source, 'g');
    const patternLeadingOrTrailing: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_PatternLeadingOrTrailing = new RegExp(LIB_REGEX_PATTERN_LEADING_OR_TRAILING_HYPHEN.source, 'g');

    const normalized: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Normalized = [];

    for (const keyword of keywords) {
      const step1: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step1 = keyword.toLowerCase();
      const step2: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step2 = step1.replace(patternWhitespaceOrUnderscore, '-');
      const step3: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step3 = step2.replace(nonTopicPattern, '');
      const step4: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Step4 = step3.replace(patternLeadingOrTrailing, '');

      if (step4.length === 0) {
        continue;
      }

      if (step4.length > 50) {
        Logger.warn(`sync-identity: dropped topic exceeding 50 chars: ${keyword}`);

        continue;
      }

      normalized.push(step4);
    }

    const deduped: Cli_Recipe_Github_SyncIdentity_Runner_NormalizeTopics_Deduped = [...new Set(normalized)];

    if (deduped.length > 20) {
      Logger.warn('sync-identity: more than 20 topics; trimmed to first 20.');

      return deduped.slice(0, 20);
    }

    if (deduped.length === 0) {
      return undefined;
    }

    return deduped;
  }
}
