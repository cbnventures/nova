import { LIB_REGEX_PLACEHOLDER_HOMEBRIDGE_CUSTOM_UI } from '../../../lib/regex.js';
import {
  runScaffold,
  updateScaffoldPackageJson,
} from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Answers,
  Cli_Scaffold_Package_Homebridge_ResolveWorkspaceTemplateSubpaths_Returns,
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
  return (answers.get('customUi') === 'enabled') ? ['scaffold-options/package/homebridge/custom-ui'] : [];
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
      category: 'package',
      importMetaUrl: import.meta.url,
      resolveWorkspaceTemplateSubpaths,
      templateQuestions: cliScaffoldPackageHomebridgeTemplateQuestions,
      templateSubpath: 'scaffold/package/homebridge',
      typeName: 'homebridge',
      workspaceFinalizer: async (workspaceDirectory, _workspaceName, _configRoot, answers) => {
        if (answers.get('customUi') === 'enabled') {
          await updateScaffoldPackageJson(workspaceDirectory, {
            dependencies: {
              '@homebridge/plugin-ui-utils': '2.2.6',
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
}
