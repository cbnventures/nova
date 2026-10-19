import { Runner as LibDockerPackaging } from '../../../lib/docker-packaging.js';
import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_App_Expressjs_Runner_Run_Options,
  Cli_Scaffold_App_Expressjs_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/expressjs.d.ts';

/**
 * CLI - Scaffold - App - Express.js.
 *
 * Scaffolds an Express.js application as a workspace
 * inside an existing or new monorepo using the shared
 * runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Express.js - Run.
   *
   * Entry point invoked by the CLI nova scaffold app expressjs command. Delegates to
   * runScaffold with the Express.js template subpath.
   *
   * @param {Cli_Scaffold_App_Expressjs_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Expressjs_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_App_Expressjs_Runner_Run_Options): Cli_Scaffold_App_Expressjs_Runner_Run_Returns {
    if (options['dockerImage'] === true) {
      await runScaffold(options, {
        category: 'app',
        displayName: 'Express.js',
        environmentVariables: [{
          defaultValue: '3000',
          key: 'PORT',
          reach: 'local',
        }],
        importMetaUrl: import.meta.url,
        platforms: [
          'nodejs',
          'web',
          'docker',
        ],
        resolvePresentationOptions: () => [{
          flag: '--docker-image',
          value: 'Yes',
        }],
        templateSubpath: 'scaffold/app/express',
        typeName: 'express',
        workspaceFinalizer: async (workspaceDirectory) => {
          await LibDockerPackaging.generateForTarget({
            profile: 'http-service',
            reportFiles: false,
            replaceFile: true,
            workspaceDirectory,
          });

          return;
        },
      });

      return;
    }

    await runScaffold(options, {
      category: 'app',
      displayName: 'Express.js',
      environmentVariables: [{
        defaultValue: '3000',
        key: 'PORT',
        reach: 'local',
      }],
      importMetaUrl: import.meta.url,
      platforms: [
        'nodejs',
        'web',
      ],
      resolvePresentationOptions: () => [{
        flag: '--docker-image',
        value: 'No',
      }],
      templateSubpath: 'scaffold/app/express',
      typeName: 'express',
    });

    return;
  }
}
