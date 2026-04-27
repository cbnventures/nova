import { LIB_GH_MIN_VERSION } from '../../../lib/constants.js';
import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_GH_VERSION,
  LIB_REGEX_PATTERN_LEADING_OR_TRAILING_HYPHEN,
  LIB_REGEX_PATTERN_NON_TOPIC_CHAR,
  LIB_REGEX_PATTERN_WHITESPACE_OR_UNDERSCORE,
} from '../../../lib/regex.js';
import {
  compareSemver,
  executeShell,
  isCommandExists,
  isProjectRoot,
  shellQuote,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';
import { handleGhFailure } from './handle-gh-failure.js';

import type {
  CliRecipeGithubSyncIdentityNormalizeTopicsDeduped,
  CliRecipeGithubSyncIdentityNormalizeTopicsKeywords,
  CliRecipeGithubSyncIdentityNormalizeTopicsNonTopicPattern,
  CliRecipeGithubSyncIdentityNormalizeTopicsNormalized,
  CliRecipeGithubSyncIdentityNormalizeTopicsPatternLeadingOrTrailing,
  CliRecipeGithubSyncIdentityNormalizeTopicsPatternWhitespaceOrUnderscore,
  CliRecipeGithubSyncIdentityNormalizeTopicsReturns,
  CliRecipeGithubSyncIdentityNormalizeTopicsStep1,
  CliRecipeGithubSyncIdentityNormalizeTopicsStep2,
  CliRecipeGithubSyncIdentityNormalizeTopicsStep3,
  CliRecipeGithubSyncIdentityNormalizeTopicsStep4,
  CliRecipeGithubSyncIdentityRunAuthStatus,
  CliRecipeGithubSyncIdentityRunCurrentDirectory,
  CliRecipeGithubSyncIdentityRunDescription,
  CliRecipeGithubSyncIdentityRunEditCommand,
  CliRecipeGithubSyncIdentityRunEditFlags,
  CliRecipeGithubSyncIdentityRunEditResult,
  CliRecipeGithubSyncIdentityRunGhVersion,
  CliRecipeGithubSyncIdentityRunGhVersionMatch,
  CliRecipeGithubSyncIdentityRunGhVersionOutput,
  CliRecipeGithubSyncIdentityRunGhVersionPattern,
  CliRecipeGithubSyncIdentityRunGithub,
  CliRecipeGithubSyncIdentityRunHomepage,
  CliRecipeGithubSyncIdentityRunIsAtProjectRoot,
  CliRecipeGithubSyncIdentityRunIsCommandOnPath,
  CliRecipeGithubSyncIdentityRunIsDryRun,
  CliRecipeGithubSyncIdentityRunKeywords,
  CliRecipeGithubSyncIdentityRunOptions,
  CliRecipeGithubSyncIdentityRunOwner,
  CliRecipeGithubSyncIdentityRunPermission,
  CliRecipeGithubSyncIdentityRunRecipes,
  CliRecipeGithubSyncIdentityRunRepo,
  CliRecipeGithubSyncIdentityRunReturns,
  CliRecipeGithubSyncIdentityRunTopicFlags,
  CliRecipeGithubSyncIdentityRunTopics,
  CliRecipeGithubSyncIdentityRunTopicsCommand,
  CliRecipeGithubSyncIdentityRunTopicsResult,
  CliRecipeGithubSyncIdentityRunViewerPermission,
  CliRecipeGithubSyncIdentityRunViewerPermissionParsed,
  CliRecipeGithubSyncIdentityRunViewResult,
  CliRecipeGithubSyncIdentityRunWorkingFile,
} from '../../../types/cli/recipe/github/sync-identity.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Identity.
 *
 * Pushes description, homepage URL, and topics from nova.config.json
 * to a GitHub repository using the gh CLI.
 *
 * @since 0.22.0
 */
export class CliRecipeGithubSyncIdentity {
  /**
   * CLI - Recipe - GitHub - Sync Identity - Run.
   *
   * Runs precheck steps then invokes gh repo edit and gh api to sync
   * description, homepage, and topics to the configured repository.
   *
   * @param {CliRecipeGithubSyncIdentityRunOptions} options - Options.
   *
   * @returns {CliRecipeGithubSyncIdentityRunReturns}
   *
   * @since 0.22.0
   */
  public static async run(options: CliRecipeGithubSyncIdentityRunOptions): CliRecipeGithubSyncIdentityRunReturns {
    const currentDirectory: CliRecipeGithubSyncIdentityRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliRecipeGithubSyncIdentityRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliRecipeGithubSyncIdentityRunIsDryRun = options['dryRun'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliRecipeGithubSyncIdentity.run',
        purpose: 'options',
      }).warn('Dry run enabled. gh commands will not be executed in this session.');
    }

    const workingFile: CliRecipeGithubSyncIdentityRunWorkingFile = await new LibNovaConfig().load();
    const github: CliRecipeGithubSyncIdentityRunGithub = workingFile['github'];

    if (github === undefined) {
      Logger.warn('Skipping sync-identity. The "github" block was not found in the "nova.config.json" file.');

      return;
    }

    const recipes: CliRecipeGithubSyncIdentityRunRecipes = github['recipes'];

    if (
      recipes === undefined
      || recipes['sync-identity'] !== true
    ) {
      return;
    }

    const owner: CliRecipeGithubSyncIdentityRunOwner = github['owner'];
    const repo: CliRecipeGithubSyncIdentityRunRepo = github['repo'];

    if (
      owner === undefined
      || repo === undefined
    ) {
      Logger.warn('Skipping sync-identity. "github.owner" and "github.repo" must both be set in the "nova.config.json" file.');

      return;
    }

    const isCommandOnPath: CliRecipeGithubSyncIdentityRunIsCommandOnPath = await isCommandExists('gh');

    if (isCommandOnPath !== true) {
      Logger.error('Skipping sync-identity. The "gh" CLI is not installed.');

      process.exitCode = 1;

      return;
    }

    const ghVersionOutput: CliRecipeGithubSyncIdentityRunGhVersionOutput = await executeShell('gh --version');
    const ghVersionPattern: CliRecipeGithubSyncIdentityRunGhVersionPattern = new RegExp(LIB_REGEX_PATTERN_GH_VERSION.source);
    const ghVersionMatch: CliRecipeGithubSyncIdentityRunGhVersionMatch = ghVersionOutput['textOut'].match(ghVersionPattern);

    if (ghVersionMatch === null) {
      Logger.error('Skipping sync-identity. Could not determine the "gh" CLI version.');

      process.exitCode = 1;

      return;
    }

    const ghVersion: CliRecipeGithubSyncIdentityRunGhVersion = ghVersionMatch[1] ?? '';

    if (compareSemver(ghVersion, LIB_GH_MIN_VERSION) < 0) {
      Logger.error(`Skipping sync-identity. The "gh" CLI version ${ghVersion} is below the required minimum ${LIB_GH_MIN_VERSION}.`);

      process.exitCode = 1;

      return;
    }

    const authStatus: CliRecipeGithubSyncIdentityRunAuthStatus = await executeShell('gh auth status');

    if (authStatus['code'] !== 0) {
      Logger.error('Skipping sync-identity. The "gh" CLI is not authenticated.');

      process.exitCode = 1;

      return;
    }

    const viewResult: CliRecipeGithubSyncIdentityRunViewResult = await executeShell(`gh repo view ${owner}/${repo} --json viewerPermission`);

    if (viewResult['code'] !== 0) {
      Logger.error(`Skipping sync-identity. Cannot access ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    let viewerPermission: CliRecipeGithubSyncIdentityRunViewerPermission = undefined;

    try {
      const parsed: CliRecipeGithubSyncIdentityRunViewerPermissionParsed = JSON.parse(viewResult['textOut']) as CliRecipeGithubSyncIdentityRunViewerPermissionParsed;

      viewerPermission = parsed['viewerPermission'];
    } catch {
      Logger.customize({
        name: 'CliRecipeGithubSyncIdentity.run',
        purpose: 'precheck',
      }).error(`Skipping sync-identity. Could not parse "gh repo view" output for ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    if (viewerPermission === undefined) {
      Logger.customize({
        name: 'CliRecipeGithubSyncIdentity.run',
        purpose: 'precheck',
      }).error(`Skipping sync-identity. Could not determine permission for ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    const permission: CliRecipeGithubSyncIdentityRunPermission = [
      'WRITE',
      'MAINTAIN',
      'ADMIN',
    ];

    if (permission.includes(viewerPermission) !== true) {
      Logger.error(`Skipping sync-identity. The authenticated user does not have write access to ${owner}/${repo}.`);

      process.exitCode = 1;

      return;
    }

    const description: CliRecipeGithubSyncIdentityRunDescription = (workingFile['project'] !== undefined && workingFile['project']['description'] !== undefined) ? workingFile['project']['description']['short'] : undefined;
    const homepage: CliRecipeGithubSyncIdentityRunHomepage = (workingFile['urls'] !== undefined) ? workingFile['urls']['homepage'] : undefined;
    const keywords: CliRecipeGithubSyncIdentityRunKeywords = (workingFile['project'] !== undefined) ? workingFile['project']['keywords'] : undefined;
    const topics: CliRecipeGithubSyncIdentityRunTopics = (github['topics'] !== undefined) ? github['topics'] : CliRecipeGithubSyncIdentity.normalizeTopics(keywords);

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
      const editFlags: CliRecipeGithubSyncIdentityRunEditFlags = [];

      if (description !== undefined) {
        editFlags.push(`--description ${shellQuote(description)}`);
      }

      if (homepage !== undefined) {
        editFlags.push(`--homepage ${shellQuote(homepage)}`);
      }

      const editCommand: CliRecipeGithubSyncIdentityRunEditCommand = `gh repo edit ${owner}/${repo} ${editFlags.join(' ')}`;

      Logger.customize({
        name: 'CliRecipeGithubSyncIdentity.run',
        purpose: 'edit',
      }).info(`Command: ${editCommand}`);

      if (isDryRun !== true) {
        const editResult: CliRecipeGithubSyncIdentityRunEditResult = await executeShell(editCommand);

        if (editResult['code'] !== 0) {
          handleGhFailure(editResult, 'sync-identity');

          return;
        }
      }
    }

    // gh api PUT for topics.
    if (topics !== undefined) {
      const topicFlags: CliRecipeGithubSyncIdentityRunTopicFlags = topics.map((topic) => `-f names[]=${shellQuote(topic)}`).join(' ');
      const topicsCommand: CliRecipeGithubSyncIdentityRunTopicsCommand = `gh api -X PUT /repos/${owner}/${repo}/topics ${topicFlags}`.trim();

      Logger.customize({
        name: 'CliRecipeGithubSyncIdentity.run',
        purpose: 'topics',
      }).info(`Command: ${topicsCommand}`);

      if (isDryRun !== true) {
        const topicsResult: CliRecipeGithubSyncIdentityRunTopicsResult = await executeShell(topicsCommand);

        if (topicsResult['code'] !== 0) {
          handleGhFailure(topicsResult, 'sync-identity');

          return;
        }
      }
    }

    if (isDryRun !== true) {
      Logger.customize({
        name: 'CliRecipeGithubSyncIdentity.run',
        purpose: 'summary',
      }).info(`Updated ${owner}/${repo}.`);
    }

    return;
  }

  /**
   * CLI - Recipe - GitHub - Sync Identity - Normalize Topics.
   *
   * Converts raw keyword strings into valid GitHub topic slugs by lowercasing,
   * replacing separators, stripping invalid characters, deduping, and capping
   * at twenty items.
   *
   * @param {CliRecipeGithubSyncIdentityNormalizeTopicsKeywords} keywords - Keywords.
   *
   * @private
   *
   * @returns {CliRecipeGithubSyncIdentityNormalizeTopicsReturns}
   *
   * @since 0.22.0
   */
  private static normalizeTopics(keywords: CliRecipeGithubSyncIdentityNormalizeTopicsKeywords): CliRecipeGithubSyncIdentityNormalizeTopicsReturns {
    if (keywords === undefined) {
      return undefined;
    }

    const patternWhitespaceOrUnderscore: CliRecipeGithubSyncIdentityNormalizeTopicsPatternWhitespaceOrUnderscore = new RegExp(LIB_REGEX_PATTERN_WHITESPACE_OR_UNDERSCORE.source, 'g');
    const nonTopicPattern: CliRecipeGithubSyncIdentityNormalizeTopicsNonTopicPattern = new RegExp(LIB_REGEX_PATTERN_NON_TOPIC_CHAR.source, 'g');
    const patternLeadingOrTrailing: CliRecipeGithubSyncIdentityNormalizeTopicsPatternLeadingOrTrailing = new RegExp(LIB_REGEX_PATTERN_LEADING_OR_TRAILING_HYPHEN.source, 'g');

    const normalized: CliRecipeGithubSyncIdentityNormalizeTopicsNormalized = [];

    for (const keyword of keywords) {
      const step1: CliRecipeGithubSyncIdentityNormalizeTopicsStep1 = keyword.toLowerCase();
      const step2: CliRecipeGithubSyncIdentityNormalizeTopicsStep2 = step1.replace(patternWhitespaceOrUnderscore, '-');
      const step3: CliRecipeGithubSyncIdentityNormalizeTopicsStep3 = step2.replace(nonTopicPattern, '');
      const step4: CliRecipeGithubSyncIdentityNormalizeTopicsStep4 = step3.replace(patternLeadingOrTrailing, '');

      if (step4.length === 0) {
        continue;
      }

      if (step4.length > 50) {
        Logger.warn(`sync-identity: dropped topic exceeding 50 chars: ${keyword}`);

        continue;
      }

      normalized.push(step4);
    }

    const deduped: CliRecipeGithubSyncIdentityNormalizeTopicsDeduped = [...new Set(normalized)];

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
