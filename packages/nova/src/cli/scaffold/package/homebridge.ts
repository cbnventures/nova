import { formatKeywordLimitMessage, resolveHomebridgePluginDestination } from '../../../lib/keyword-limits.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { LIB_REGEX_PLACEHOLDER_HOMEBRIDGE_CUSTOM_UI } from '../../../lib/regex.js';
import { getScaffoldVersion } from '../../../lib/scaffold-versions.js';
import {
  runScaffold,
  updateScaffoldPackageJson,
} from '../../../lib/scaffold.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Answers,
  Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Returns,
  Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_Config,
  Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_ConfigRoot,
  Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_Keywords,
  Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_KeywordsDestination,
  Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_KeywordsLimitMessage,
  Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_Returns,
  Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_WorkspaceName,
  Cli_Scaffold_Package_Homebridge_Runner_Run_Options,
  Cli_Scaffold_Package_Homebridge_Runner_Run_Returns,
  Cli_Scaffold_Package_Homebridge_TemplateQuestions,
} from '../../../types/cli/scaffold/package/homebridge.d.ts';

/**
 * CLI - Scaffold - Package - Homebridge - Template Questions.
 *
 * Keeps the default schema UI small while allowing consumers to opt into the
 * official Config UI X custom frontend and backend layout.
 *
 * @since 0.29.0
 */
export const cliScaffoldPackageHomebridgeTemplateQuestions: Cli_Scaffold_Package_Homebridge_TemplateQuestions = [{
  choices: [
    {
      title: 'No (default)',
      description: 'Use Homebridge Config UI X schema rendering',
      replacement: 'false',
      value: 'disabled',
    },
    {
      title: 'Yes',
      description: 'Add a custom Config UI X frontend and backend entry point',
      replacement: 'true',
      value: 'enabled',
    },
  ],
  defaultValue: 'disabled',
  flag: '--custom-ui',
  flagValue: 'enabled',
  initial: 0,
  message: 'Add a custom Homebridge Config UI?',
  name: 'customUi',
  placeholder: LIB_REGEX_PLACEHOLDER_HOMEBRIDGE_CUSTOM_UI,
}];

/**
 * CLI - Scaffold - Package - Homebridge - Resolve Workspace Template Subpaths.
 *
 * Adds the reviewed Config UI X template layer when a custom settings UI is
 * requested.
 *
 * @param {Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Answers} answers - Answers.
 *
 * @returns {Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Returns}
 *
 * @since 0.29.0
 */
function resolveWorkspaceTemplateSubpaths(answers: Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Answers): Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Returns {
  if (answers.get('customUi') === 'enabled') {
    return ['scaffold-options/package/homebridge/custom-ui'];
  }

  return ['scaffold-options/package/homebridge/schema-ui'];
}

/**
 * CLI - Scaffold - Package - Homebridge.
 *
 * Scaffolds a dynamic-platform Homebridge plugin package through the shared
 * workspace pipeline with the required package-name prefix.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Package - Homebridge - Run.
   *
   * Delegates to the shared scaffold pipeline while enforcing Homebridge's
   * package-name convention before registering the package.
   *
   * @param {Cli_Scaffold_Package_Homebridge_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Package_Homebridge_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_Package_Homebridge_Runner_Run_Options): Cli_Scaffold_Package_Homebridge_Runner_Run_Returns {
    await runScaffold(options, {
      allowScriptProfiles: ['file-watching'],
      category: 'package',
      displayName: 'Homebridge',
      importMetaUrl: import.meta.url,
      platforms: [
        'nodejs',
        'homebridge',
      ],
      resolveArtifact: (workspaceRelPath, workspacePackageName) => ({
        name: workspacePackageName,
        build: [workspaceRelPath],
        sources: [
          {
            from: `${workspaceRelPath}/package.json`,
            to: './package.json',
          },
          {
            from: `${workspaceRelPath}/bin`,
            to: './bin',
          },
          {
            from: `${workspaceRelPath}/build`,
            to: './build',
          },
          {
            from: `${workspaceRelPath}/config.schema.json`,
            to: './config.schema.json',
          },
        ],
      }),
      resolveReplacements: Runner['resolveReplacements'],
      resolveWorkspaceTemplateSubpaths,
      templateQuestions: cliScaffoldPackageHomebridgeTemplateQuestions,
      templateSubpath: 'scaffold/package/homebridge',
      typeName: 'homebridge',
      workspaceFinalizer: async (workspaceDirectory, _workspaceName, _configRoot, answers) => {
        if (answers.get('customUi') === 'enabled') {
          await updateScaffoldPackageJson(workspaceDirectory, {
            dependencies: {
              '@homebridge/plugin-ui-utils': getScaffoldVersion('homebridgePluginUiUtils'),
            },
            scripts: {
              'build:copy-ui': 'shx cp -r ./homebridge-ui/public ./build/config-ui/public',
            },
          });
        }

        return;
      },
      workspacePackageNamePrefix: 'homebridge-',
    });

    return;
  }

  /**
   * CLI - Scaffold - Package - Homebridge - Resolve Replacements.
   *
   * Stops before any file is written when "project.keywords" lacks "homebridge-plugin",
   * because the package.json sync-identity recipe can publish them as npm keywords.
   *
   * @param {Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_WorkspaceName} workspaceName - Workspace name.
   * @param {Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_ConfigRoot}    configRoot    - Config root.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_Returns}
   *
   * @since 0.49.0
   */
  private static async resolveReplacements(workspaceName: Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_WorkspaceName, configRoot: Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_ConfigRoot): Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_Returns {
    const config: Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_Config = await new LibNovaConfig().load(configRoot);
    const keywords: Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_Keywords = (config['project'] !== undefined) ? config['project']['keywords'] : undefined;

    if (keywords !== undefined) {
      const keywordsDestination: Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_KeywordsDestination = resolveHomebridgePluginDestination(`./packages/${workspaceName}`);
      const keywordsLimitMessage: Cli_Scaffold_Package_Homebridge_Runner_ResolveReplacements_KeywordsLimitMessage = formatKeywordLimitMessage(keywordsDestination, keywords);

      if (keywordsLimitMessage !== undefined) {
        Logger.customize({
          name: 'CliScaffoldPackageHomebridge.resolveReplacements',
          purpose: 'config',
        }).error(`${keywordsLimitMessage} No scaffold files were written.`);

        process.exitCode = 1;

        return undefined;
      }
    }

    return new Map();
  }
}
