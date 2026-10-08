import { LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE } from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';
import { Runner as CliGenerateDockerImage } from '../../generate/docker-image/index.js';

import type {
  Cli_Scaffold_App_Nextjs_Runner_Run_Options,
  Cli_Scaffold_App_Nextjs_Runner_Run_Returns,
  Cli_Scaffold_App_Nextjs_TemplateQuestions,
} from '../../../types/cli/scaffold/app/nextjs.d.ts';

/**
 * CLI - Scaffold - App - Next.js - Template Questions.
 *
 * Makes standalone Docker output an explicit opt-in while preserving the
 * platform-neutral Next.js scaffold as the default.
 *
 * @since 0.29.0
 */
export const cliScaffoldAppNextjsTemplateQuestions: Cli_Scaffold_App_Nextjs_TemplateQuestions = [{
  choices: [
    {
      title: 'No (default)',
      description: 'Keep deployment platform-neutral',
      replacement: '',
      value: 'disabled',
    },
    {
      title: 'Yes',
      description: 'Enable Next.js standalone output and Docker packaging',
      replacement: '  output: \'standalone\',',
      value: 'enabled',
    },
  ],
  defaultValue: 'disabled',
  flag: '--docker-image',
  flagValue: 'enabled',
  initial: 0,
  message: 'Add Docker packaging?',
  name: 'dockerImage',
  placeholder: LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
}];

/**
 * CLI - Scaffold - App - Next.js.
 *
 * Scaffolds a Next.js application as a workspace
 * inside an existing or new monorepo using the shared
 * runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Next.js - Run.
   *
   * Entry point invoked by the CLI nova scaffold app nextjs command. Delegates to runScaffold
   * with the Next.js template subpath.
   *
   * @param {Cli_Scaffold_App_Nextjs_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Nextjs_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_App_Nextjs_Runner_Run_Options): Cli_Scaffold_App_Nextjs_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'app',
      importMetaUrl: import.meta.url,
      templateQuestions: cliScaffoldAppNextjsTemplateQuestions,
      templateSubpath: 'scaffold/app/nextjs',
      typeName: 'nextjs',
      workspaceFinalizer: async (workspaceDirectory, _workspaceName, _configRoot, answers) => {
        if (answers.get('dockerImage') === 'enabled') {
          await CliGenerateDockerImage.generateForTarget({
            profile: 'nextjs-standalone',
            replaceFile: true,
            workspaceDirectory,
          });
        }

        return;
      },
    });

    return;
  }
}
