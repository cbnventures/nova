import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PLACEHOLDER_ENTITY_NAME,
  LIB_REGEX_PLACEHOLDER_PROJECT_BUGS,
  LIB_REGEX_PLACEHOLDER_PROJECT_DESCRIPTION,
  LIB_REGEX_PLACEHOLDER_PROJECT_HOMEPAGE,
  LIB_REGEX_PLACEHOLDER_SYNOLOGY_USR_LOCAL_LINK,
} from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_Package_Synology_ResolveWorkspaceTemplateSubpaths_Answers,
  Cli_Scaffold_Package_Synology_ResolveWorkspaceTemplateSubpaths_Returns,
  Cli_Scaffold_Package_Synology_Runner_EscapeInfoValue_Returns,
  Cli_Scaffold_Package_Synology_Runner_EscapeInfoValue_Value,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Config,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_ConfigRoot,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Description,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Maintainer,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_MaintainerUrl,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Project,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Returns,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_SupportUrl,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Urls,
  Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_WorkspaceName,
  Cli_Scaffold_Package_Synology_Runner_Run_Options,
  Cli_Scaffold_Package_Synology_Runner_Run_Returns,
  Cli_Scaffold_Package_Synology_TemplateQuestions,
} from '../../../types/cli/scaffold/package/synology.d.ts';

/**
 * CLI - Scaffold - Package - Synology - Template Questions.
 *
 * Keeps the default package self-contained while allowing its example service
 * to opt into DSM's documented /usr/local resource linker.
 *
 * @since 0.50.0
 */
export const cliScaffoldPackageSynologyTemplateQuestions: Cli_Scaffold_Package_Synology_TemplateQuestions = [{
  choices: [
    {
      title: 'No (default)',
      description: 'Run the service only from the package target directory',
      replacement: 'false',
      value: 'disabled',
    },
    {
      title: 'Yes',
      description: 'Add conf/resource and expose the service through /usr/local/bin',
      replacement: 'true',
      value: 'enabled',
    },
  ],
  defaultValue: 'disabled',
  flag: '--usr-local-link',
  flagValue: 'enabled',
  initial: 0,
  message: 'Expose the example service through /usr/local/bin?',
  name: 'usrLocalLink',
  placeholder: LIB_REGEX_PLACEHOLDER_SYNOLOGY_USR_LOCAL_LINK,
}];

/**
 * CLI - Scaffold - Package - Synology - Resolve Workspace Template Subpaths.
 *
 * Adds the optional DSM resource definition only when the user requests the
 * /usr/local service link.
 *
 * @param {Cli_Scaffold_Package_Synology_ResolveWorkspaceTemplateSubpaths_Answers} answers - Answers.
 *
 * @returns {Cli_Scaffold_Package_Synology_ResolveWorkspaceTemplateSubpaths_Returns}
 *
 * @since 0.50.0
 */
function resolveWorkspaceTemplateSubpaths(answers: Cli_Scaffold_Package_Synology_ResolveWorkspaceTemplateSubpaths_Answers): Cli_Scaffold_Package_Synology_ResolveWorkspaceTemplateSubpaths_Returns {
  if (answers.get('usrLocalLink') === 'enabled') {
    return ['scaffold-options/package/synology/usr-local-link'];
  }

  return [];
}

/**
 * CLI - Scaffold - Package - Synology.
 *
 * Scaffolds a noarch DSM 7 package with lower-privilege lifecycle scripts,
 * portable Node.js packaging helpers, and GitHub Release publication.
 *
 * @since 0.50.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Package - Synology - Run.
   *
   * Delegates to the shared scaffold pipeline and registers a trackable
   * Synology workspace, SPK artifact, and publish target.
   *
   * @param {Cli_Scaffold_Package_Synology_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Package_Synology_Runner_Run_Returns}
   *
   * @since 0.50.0
   */
  public static async run(options: Cli_Scaffold_Package_Synology_Runner_Run_Options): Cli_Scaffold_Package_Synology_Runner_Run_Returns {
    await runScaffold(options, {
      allowScriptProfiles: ['file-watching'],
      category: 'package',
      displayName: 'Synology',
      importMetaUrl: import.meta.url,
      platforms: ['synology'],
      primaryScript: 'build',
      publishesToNpm: false,
      resolveArtifact: (workspaceRelPath, workspacePackageName) => ({
        name: workspacePackageName,
        build: [workspaceRelPath],
        sources: [{
          from: `${workspaceRelPath}/build/release`,
          to: './',
        }],
      }),
      resolveDeployTarget: (workspaceRelPath) => ({
        to: 'synology',
        path: workspaceRelPath,
      }),
      resolveReplacements: Runner['resolveReplacements'],
      resolveWorkspaceTemplateSubpaths,
      templateQuestions: cliScaffoldPackageSynologyTemplateQuestions,
      templateSubpath: 'scaffold/package/synology',
      typeName: 'synology',
      workspacePackageNamePrefix: 'synology-pkg-',
    });

    return;
  }

  /**
   * CLI - Scaffold - Package - Synology - Escape Info Value.
   *
   * Escapes a configured identity value for Synology's double-quoted INFO
   * format and folds line breaks into spaces.
   *
   * @param {Cli_Scaffold_Package_Synology_Runner_EscapeInfoValue_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Package_Synology_Runner_EscapeInfoValue_Returns}
   *
   * @since 0.50.0
   */
  private static escapeInfoValue(value: Cli_Scaffold_Package_Synology_Runner_EscapeInfoValue_Value): Cli_Scaffold_Package_Synology_Runner_EscapeInfoValue_Returns {
    return value
      .replaceAll('\\', '\\\\')
      .replaceAll('"', '\\"')
      .replaceAll('\r', ' ')
      .replaceAll('\n', ' ')
      .trim();
  }

  /**
   * CLI - Scaffold - Package - Synology - Resolve Replacements.
   *
   * Reads the project identity used by Package Center and supplies safe
   * fallbacks for the minimal base starter's intentionally sparse metadata.
   *
   * @param {Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_WorkspaceName} workspaceName - Workspace name.
   * @param {Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_ConfigRoot}    configRoot    - Config root.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Returns}
   *
   * @since 0.50.0
   */
  private static async resolveReplacements(workspaceName: Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_WorkspaceName, configRoot: Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_ConfigRoot): Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Returns {
    const config: Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Config = await new LibNovaConfig().load(configRoot);
    const project: Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Project = config['project'];
    const urls: Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Urls = config['urls'] ?? {};
    let maintainer: Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Maintainer = workspaceName;
    let description: Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_Description = `A Synology DSM package for ${workspaceName}.`;
    let maintainerUrl: Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_MaintainerUrl = '';
    let supportUrl: Cli_Scaffold_Package_Synology_Runner_ResolveReplacements_SupportUrl = '';

    if (
      project !== undefined
      && project['name'] !== undefined
      && project['name']['title'] !== undefined
      && project['name']['title'].trim() !== ''
    ) {
      maintainer = project['name']['title'].trim();
    }

    if (
      project !== undefined
      && project['legalName'] !== undefined
      && project['legalName'].trim() !== ''
    ) {
      maintainer = project['legalName'].trim();
    }

    if (
      project !== undefined
      && project['description'] !== undefined
      && project['description']['short'] !== undefined
      && project['description']['short'].trim() !== ''
    ) {
      description = project['description']['short'].trim();
    }

    if (urls['repository'] !== undefined) {
      maintainerUrl = urls['repository'];
      supportUrl = urls['repository'];
    }

    if (urls['homepage'] !== undefined) {
      maintainerUrl = urls['homepage'];
      supportUrl = urls['homepage'];
    }

    if (urls['bugs'] !== undefined) {
      supportUrl = urls['bugs'];
    }

    return new Map([
      [
        LIB_REGEX_PLACEHOLDER_ENTITY_NAME,
        Runner.escapeInfoValue(maintainer),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_BUGS,
        Runner.escapeInfoValue(supportUrl),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_DESCRIPTION,
        Runner.escapeInfoValue(description),
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_HOMEPAGE,
        Runner.escapeInfoValue(maintainerUrl),
      ],
    ]);
  }
}
