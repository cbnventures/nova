import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_GITHUB_OWNER,
  LIB_REGEX_PATTERN_GITHUB_REPO,
  LIB_REGEX_PLACEHOLDER_PFSENSE_CONFIG_NAME,
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
  Cli_Scaffold_Package_Pfsense_Runner_EscapePhpSingleQuoted_Returns,
  Cli_Scaffold_Package_Pfsense_Runner_EscapePhpSingleQuoted_Value,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_NormalizedRepositoryUrl,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Owner,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_ParsedRepositoryUrl,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_PathSegments,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Repo,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_RepositoryUrl,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveGithubRepository_Returns,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Author,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_AuthorEmail,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Config,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_ConfigRoot,
  Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Entities,
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
      workspacePackageNamePrefix: 'pfsense-pkg-',
    });

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
    const entities: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Entities = config['entities'] ?? [];
    const author: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_Author = entities.find((entity) => {
      return (
        entity['roles'] !== undefined
        && entity['roles'].includes('author') === true
        && typeof entity['email'] === 'string'
        && entity['email'].trim() !== ''
      );
    });
    const authorEmail: Cli_Scaffold_Package_Pfsense_Runner_ResolveReplacements_AuthorEmail = (
      author !== undefined
      && typeof author['email'] === 'string'
    ) ? author['email'].trim() : undefined;

    if (authorEmail === undefined || authorEmail === '') {
      Logger.customize({
        name: 'CliScaffoldPackagePfsense.resolveReplacements',
        purpose: 'config',
      }).error('pfSense scaffolding requires an email on the project author entity. Add an entity with the "author" role and a valid "email" in nova.config.json, then run the scaffold again. No scaffold files were written.');

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
      ...fundSources.map((fundSource) => `    '${Runner.escapePhpSingleQuoted(fundSource)}',`),
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

      updateApiUrl = `https://api.github.com/repos/${githubRepositoryOwner}/${githubRepositoryRepo}/releases/latest`;
      updateDownloadPrefix = `https://github.com/${githubRepositoryOwner}/${githubRepositoryRepo}/releases/download/`;
      updateDefaultFrequency = 'weekly';
      updateSettingsDescription = 'Choose how often pfSense checks GitHub for a new package release. The check runs at a stable randomized time.';
    }

    return new Map([
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_CONFIG_NAME,
        workspaceName.replaceAll('-', '').replaceAll('_', ''),
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
        Runner.escapePhpSingleQuoted(urls['bugs'] ?? ''),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_DESCRIPTION,
        Runner.escapePhpSingleQuoted(projectDescription),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_DOCUMENTATION,
        Runner.escapePhpSingleQuoted(urls['documentation'] ?? ''),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_FUND_SOURCES,
        fundSourcesLiteral,
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_HOMEPAGE,
        Runner.escapePhpSingleQuoted(urls['homepage'] ?? ''),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_LICENSE,
        Runner.escapePhpSingleQuoted(urls['license'] ?? ''),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
        Runner.escapePhpSingleQuoted(urls['repository'] ?? ''),
      ],
    ]);
  }

  /**
   * CLI - Scaffold - Package - Pfsense - Escape Php Single Quoted.
   *
   * Escapes project-controlled values for PHP single-quoted string literals.
   * Runtime HTML output is escaped separately by the generated page.
   *
   * @param {Cli_Scaffold_Package_Pfsense_Runner_EscapePhpSingleQuoted_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Package_Pfsense_Runner_EscapePhpSingleQuoted_Returns}
   *
   * @since 0.39.0
   */
  private static escapePhpSingleQuoted(value: Cli_Scaffold_Package_Pfsense_Runner_EscapePhpSingleQuoted_Value): Cli_Scaffold_Package_Pfsense_Runner_EscapePhpSingleQuoted_Returns {
    return value.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'');
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
