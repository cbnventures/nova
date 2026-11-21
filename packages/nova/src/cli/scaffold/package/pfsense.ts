import { relative, sep } from 'node:path';

import { Runner as ApiGithub } from '../../../api/github.js';
import { Runner as CliRecipePfsenseSyncIdentity } from '../../../cli/recipe/pfsense/sync-identity.js';
import {
  formatDescriptionLimitMessage,
  resolveDestinationDescription,
  resolvePfsenseCommentDestination,
} from '../../../lib/description-limits.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { escapePhpSingleQuoted, resolvePfsenseMaintainer } from '../../../lib/pfsense-identity.js';
import {
  LIB_REGEX_PATTERN_GITHUB_OWNER,
  LIB_REGEX_PATTERN_GITHUB_REPO,
  LIB_REGEX_PLACEHOLDER_PFSENSE_CONFIG_NAME,
  LIB_REGEX_PLACEHOLDER_PFSENSE_PORT_COMMENT,
  LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_API_URL,
  LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_DEFAULT_FREQUENCY,
  LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_DOWNLOAD_PREFIX,
  LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_SETTINGS_DESCRIPTION,
  LIB_REGEX_PLACEHOLDER_PROJECT_AUTHOR_EMAIL,
  LIB_REGEX_PLACEHOLDER_PROJECT_BUGS,
  LIB_REGEX_PLACEHOLDER_PROJECT_DESCRIPTION,
  LIB_REGEX_PLACEHOLDER_PROJECT_DOCUMENTATION,
  LIB_REGEX_PLACEHOLDER_PROJECT_FUND_SOURCES,
  LIB_REGEX_PLACEHOLDER_PROJECT_HOMEPAGE,
  LIB_REGEX_PLACEHOLDER_PROJECT_LICENSE,
  LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
} from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';
import {
  Logger,
  NovaIdentity,
} from '../../../toolkit/index.js';

import type {
  Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_Config,
  Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_ConfigRoot,
  Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_Returns,
  Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_WorkspaceDirectory,
  Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_WorkspacePath,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_NormalizedRepositoryUrl,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Owner,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_ParsedRepositoryUrl,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_PathSegments,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Repo,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_RepositoryUrl,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Returns,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_AuthorEmail,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Comment,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_CommentDestination,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_CommentLimitMessage,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Config,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_ConfigRoot,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_FundSources,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_FundSourcesLiteral,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepository,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepositoryOwner,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepositoryRepo,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_ProjectDescription,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_RepositoryUrl,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Returns,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateApiUrl,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateDefaultFrequency,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateDownloadPrefix,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateSettingsDescription,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Urls,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_WorkspaceName,
  Cli_Scaffold_Package_Pfsense_Runner_Run_Options,
  Cli_Scaffold_Package_Pfsense_Runner_Run_Returns,
} from '../../../types/cli/scaffold/package/pfsense.d.ts';

/**
 * CLI - Scaffold - Package - Pfsense.
 *
 * Scaffolds a pfSense package with WebGUI settings, a cron-oriented PHP task,
 * FreeBSD port sources, an About page, and generated publish registration.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Package - Pfsense - Run.
   *
   * Delegates to the shared scaffold pipeline with workspace-specific port
   * filenames, project metadata, and a generated publish target.
   *
   * @param {Cli_Scaffold_Package_Pfsense_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Package_Pfsense_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_Package_Pfsense_Runner_Run_Options): Cli_Scaffold_Package_Pfsense_Runner_Run_Returns {
    await runScaffold(options, {
      allowScriptProfiles: ['file-watching'],
      category: 'package',
      displayName: 'pfSense',
      importMetaUrl: import.meta.url,
      platforms: [
        'php',
        'pfsense',
      ],
      primaryScript: 'build',
      publishesToNpm: false,
      resolveArtifact: (workspaceRelPath, workspacePackageName) => ({
        name: workspacePackageName,
        build: [workspaceRelPath],
        sources: [{
          from: `${workspaceRelPath}/build`,
          to: './',
        }],
      }),
      resolveDeployTarget: (workspaceRelPath) => ({
        to: 'pfsense',
        path: workspaceRelPath,
      }),
      resolveReplacements: Runner['resolveReplacements'],
      templateSubpath: 'scaffold/package/pfsense',
      typeName: 'pfsense',
      workspaceFinalizer: async (workspaceDirectory, _workspaceName, configRoot) => {
        await Runner.finalizeWorkspace(workspaceDirectory, configRoot);

        return;
      },
      workspacePackageNamePrefix: 'pfsense-pkg-',
    });

    return;
  }

  /**
   * CLI - Scaffold - Package - Pfsense - Finalize Workspace.
   *
   * Runs the pfSense sync-identity recipe on the files just written, so the
   * scaffold and the recipe write the descriptions, WWW, and MAINTAINER alike.
   *
   * @param {Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_WorkspaceDirectory} workspaceDirectory - Workspace directory.
   * @param {Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_ConfigRoot}         configRoot         - Config root.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_Returns}
   *
   * @since 0.49.0
   */
  private static async finalizeWorkspace(workspaceDirectory: Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_WorkspaceDirectory, configRoot: Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_ConfigRoot): Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_Returns {
    const config: Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_Config = await new LibNovaConfig().load(configRoot);
    const workspacePath: Cli_Scaffold_Package_Pfsense_Runner_FinalizeWorkspace_WorkspacePath = `./${relative(configRoot, workspaceDirectory).split(sep).join('/')}`;

    await CliRecipePfsenseSyncIdentity.syncWorkspace(workspaceDirectory, workspacePath, config, false, true, true);

    return;
  }

  /**
   * CLI - Scaffold - Package - Pfsense - Resolve Replacements.
   *
   * Resolves the package maintainer and About-page metadata from the project
   * config before any scaffold files are written.
   *
   * @param {Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_WorkspaceName} workspaceName - Workspace name.
   * @param {Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_ConfigRoot}    configRoot    - Config root.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Returns}
   *
   * @since 0.39.0
   */
  private static async resolveReplacements(workspaceName: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_WorkspaceName, configRoot: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_ConfigRoot): Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Returns {
    const config: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Config = await new LibNovaConfig().load(configRoot);
    const authorEmail: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_AuthorEmail = resolvePfsenseMaintainer(config['entities']);

    if (authorEmail === undefined) {
      Logger.customize({
        name: 'CliScaffoldPackagePfsense.resolveReplacements',
        purpose: 'config',
      }).error('pfSense scaffolding requires an email on the project author entity. Add an entity with the "author" role and a valid "email" in nova.config.json, then run the scaffold again. No scaffold files were written.');

      process.exitCode = 1;

      return;
    }

    // The new workspace has no "pfsense.comment" override yet, so COMMENT comes from the
    // short description through the same helper the sync-identity recipe uses.
    const commentDestination: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_CommentDestination = resolvePfsenseCommentDestination(undefined, `./packages/${workspaceName}`);
    const comment: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Comment = resolveDestinationDescription(commentDestination, config);

    if (comment === undefined) {
      Logger.customize({
        name: 'CliScaffoldPackagePfsense.resolveReplacements',
        purpose: 'config',
      }).error('pfSense scaffolding requires "project.description.short" in nova.config.json, which becomes the FreeBSD port COMMENT. Add it, then run the scaffold again. No scaffold files were written.');

      process.exitCode = 1;

      return;
    }

    const commentLimitMessage: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_CommentLimitMessage = formatDescriptionLimitMessage(commentDestination, comment);

    if (commentLimitMessage !== undefined) {
      Logger.customize({
        name: 'CliScaffoldPackagePfsense.resolveReplacements',
        purpose: 'config',
      }).error(`${commentLimitMessage} No scaffold files were written.`);

      process.exitCode = 1;

      return;
    }

    const projectDescription: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_ProjectDescription = (
      config['project'] !== undefined
      && config['project']['description'] !== undefined
    ) ? config['project']['description']['short'] ?? '' : '';
    const urls: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Urls = config['urls'] ?? {};
    const fundSources: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_FundSources = urls['fundSources'] ?? [];
    const fundSourcesLiteral: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_FundSourcesLiteral = (fundSources.length === 0) ? '[]' : [
      '[',
      ...fundSources.map((fundSource) => `    '${escapePhpSingleQuoted(fundSource)}',`),
      ']',
    ].join('\n');
    const repositoryUrl: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_RepositoryUrl = urls['repository'] ?? '';
    const githubRepository: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepository = Runner.resolveGithubRepository(repositoryUrl);
    let updateApiUrl: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateApiUrl = '';
    let updateDownloadPrefix: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateDownloadPrefix = '';
    let updateDefaultFrequency: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateDefaultFrequency = 'never';
    let updateSettingsDescription: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_UpdateSettingsDescription = 'Update checks are unavailable because the project repository URL is not a github.com repository. Configure a GitHub repository and regenerate this package to enable them.';

    if (githubRepository !== undefined) {
      const githubRepositoryOwner: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepositoryOwner = githubRepository['owner'];
      const githubRepositoryRepo: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_GithubRepositoryRepo = githubRepository['repo'];

      updateApiUrl = ApiGithub.buildLatestReleaseApiUrl(githubRepositoryOwner, githubRepositoryRepo);
      updateDownloadPrefix = ApiGithub.buildReleaseDownloadPrefix(githubRepositoryOwner, githubRepositoryRepo);
      updateDefaultFrequency = 'weekly';
      updateSettingsDescription = 'Choose how often pfSense checks GitHub for a new package release. The check runs at a stable randomized time.';
    }

    return new Map([
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_CONFIG_NAME,
        workspaceName.replaceAll('-', '').replaceAll('_', ''),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_PORT_COMMENT,
        comment,
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_API_URL,
        updateApiUrl,
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_DEFAULT_FREQUENCY,
        updateDefaultFrequency,
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_DOWNLOAD_PREFIX,
        updateDownloadPrefix,
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_SETTINGS_DESCRIPTION,
        updateSettingsDescription,
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_AUTHOR_EMAIL,
        authorEmail,
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_BUGS,
        escapePhpSingleQuoted(urls['bugs'] ?? ''),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_DESCRIPTION,
        escapePhpSingleQuoted(projectDescription),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_DOCUMENTATION,
        escapePhpSingleQuoted(urls['documentation'] ?? ''),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_FUND_SOURCES,
        fundSourcesLiteral,
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_HOMEPAGE,
        escapePhpSingleQuoted(urls['homepage'] ?? ''),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_LICENSE,
        escapePhpSingleQuoted(urls['license'] ?? ''),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
        escapePhpSingleQuoted(urls['repository'] ?? ''),
      ],
    ]);
  }

  /**
   * CLI - Scaffold - Package - Pfsense - Resolve GitHub Repository.
   *
   * Extracts a validated owner and repository from supported GitHub URL forms.
   * Non-GitHub and multi-segment paths leave generated updates unavailable.
   *
   * @param {Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_RepositoryUrl} repositoryUrl - Repository url.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Returns}
   *
   * @since 0.39.0
   */
  private static resolveGithubRepository(repositoryUrl: Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_RepositoryUrl): Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Returns {
    let normalizedRepositoryUrl: Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_NormalizedRepositoryUrl = NovaIdentity.normalizeRepoUrl(repositoryUrl.trim());

    if (normalizedRepositoryUrl.endsWith('/') === true) {
      normalizedRepositoryUrl = normalizedRepositoryUrl.slice(0, -1);
      normalizedRepositoryUrl = NovaIdentity.normalizeRepoUrl(normalizedRepositoryUrl);
    }

    try {
      const parsedRepositoryUrl: Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_ParsedRepositoryUrl = new URL(normalizedRepositoryUrl);

      if (parsedRepositoryUrl.hostname.toLowerCase() !== 'github.com') {
        return undefined;
      }

      const pathSegments: Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_PathSegments = parsedRepositoryUrl.pathname.split('/').filter((pathSegment) => pathSegment !== '');

      if (pathSegments.length !== 2) {
        return undefined;
      }

      const owner: Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Owner = pathSegments[0];
      const repo: Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Repo = pathSegments[1];

      if (
        owner === undefined
        || repo === undefined
        || LIB_REGEX_PATTERN_GITHUB_OWNER.test(owner) === false
        || LIB_REGEX_PATTERN_GITHUB_REPO.test(repo) === false
      ) {
        return undefined;
      }

      return {
        owner,
        repo,
      };
    } catch {
      return undefined;
    }
  }
}
