import {
  LIB_REGEX_PLACEHOLDER_ASTRO_ADAPTER,
  LIB_REGEX_PLACEHOLDER_ASTRO_RENDERING,
  LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
} from '../../../lib/regex.js';
import {
  runScaffold,
  updateScaffoldPackageJson,
} from '../../../lib/scaffold.js';
import { Runner as CliGenerateDockerImage } from '../../generate/docker-image/index.js';

import type {
  Cli_Scaffold_App_Astro_ResolveWorkspaceTemplateSubpaths_Answers,
  Cli_Scaffold_App_Astro_ResolveWorkspaceTemplateSubpaths_Returns,
  Cli_Scaffold_App_Astro_Runner_Run_Adapter,
  Cli_Scaffold_App_Astro_Runner_Run_Options,
  Cli_Scaffold_App_Astro_Runner_Run_Returns,
  Cli_Scaffold_App_Astro_TemplateQuestions,
} from '../../../types/cli/scaffold/app/astro.d.ts';

/**
 * CLI - Scaffold - App - Astro - Template Questions.
 *
 * Defines rendering, server adapter, and Docker choices without overloading the
 * universal scaffold output-directory flag.
 *
 * @since 0.29.0
 */
export const cliScaffoldAppAstroTemplateQuestions: Cli_Scaffold_App_Astro_TemplateQuestions = [
  {
    choices: [
      {
        title: 'Static (default)',
        description: 'Pre-render every route as static files',
        value: 'static',
      },
      {
        title: 'Server',
        description: 'Render routes at request time through an adapter',
        value: 'server',
      },
    ],
    defaultValue: 'static',
    flag: '--rendering',
    initial: 0,
    message: 'Select an Astro rendering mode:',
    name: 'rendering',
    placeholder: LIB_REGEX_PLACEHOLDER_ASTRO_RENDERING,
  },
  {
    choices: [
      {
        title: 'Node.js (default)',
        description: 'Run the server as a standalone Node.js process',
        value: 'node',
      },
      {
        title: 'Cloudflare',
        description: 'Deploy server rendering to Cloudflare Workers',
        value: 'cloudflare',
      },
    ],
    defaultValue: 'node',
    dependsOn: {
      name: 'rendering',
      values: ['server'],
    },
    flag: '--adapter',
    initial: 0,
    message: 'Select an Astro server adapter:',
    name: 'adapter',
    placeholder: LIB_REGEX_PLACEHOLDER_ASTRO_ADAPTER,
  },
  {
    choices: [
      {
        title: 'No (default)',
        description: 'Keep deployment platform-neutral',
        value: 'disabled',
      },
      {
        title: 'Yes',
        description: 'Add reviewed Docker packaging for this rendering mode',
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
  },
];

/**
 * CLI - Scaffold - App - Astro - Resolve Workspace Template Subpaths.
 *
 * Selects the reviewed template layer for the requested Astro rendering mode
 * and server adapter.
 *
 * @param {Cli_Scaffold_App_Astro_ResolveWorkspaceTemplateSubpaths_Answers} answers - Answers.
 *
 * @returns {Cli_Scaffold_App_Astro_ResolveWorkspaceTemplateSubpaths_Returns}
 *
 * @since 0.29.0
 */
function resolveWorkspaceTemplateSubpaths(answers: Cli_Scaffold_App_Astro_ResolveWorkspaceTemplateSubpaths_Answers): Cli_Scaffold_App_Astro_ResolveWorkspaceTemplateSubpaths_Returns {
  if (answers.get('rendering') === 'static') {
    return ['scaffold-options/app/astro/static'];
  }

  return [`scaffold-options/app/astro/${answers.get('adapter') ?? 'node'}`];
}

/**
 * CLI - Scaffold - App - Astro.
 *
 * Scaffolds an Astro application through the shared workspace pipeline so
 * standalone creation and workspace additions stay consistent.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Astro - Run.
   *
   * Delegates to the shared scaffold pipeline with the Astro application
   * template and its checked configuration defaults.
   *
   * @param {Cli_Scaffold_App_Astro_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Astro_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_App_Astro_Runner_Run_Options): Cli_Scaffold_App_Astro_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'app',
      importMetaUrl: import.meta.url,
      resolveWorkspaceTemplateSubpaths,
      templateQuestions: cliScaffoldAppAstroTemplateQuestions,
      templateSubpath: 'scaffold/app/astro',
      typeName: 'astro',
      validateTemplateAnswers: (answers) => {
        if (
          answers.get('rendering') === 'server'
          && answers.get('adapter') === 'cloudflare'
          && answers.get('dockerImage') === 'enabled'
        ) {
          return 'Cloudflare owns the Astro server runtime, so --docker-image cannot be combined with --adapter cloudflare.';
        }

        return undefined;
      },
      workspaceFinalizer: async (workspaceDirectory, _workspaceName, _configRoot, answers) => {
        const adapter: Cli_Scaffold_App_Astro_Runner_Run_Adapter = answers.get('adapter');

        if (answers.get('rendering') === 'server' && adapter === 'node') {
          await updateScaffoldPackageJson(workspaceDirectory, {
            dependencies: {
              '@astrojs/node': '11.1.7',
            },
          });
        }

        if (answers.get('rendering') === 'server' && adapter === 'cloudflare') {
          await updateScaffoldPackageJson(workspaceDirectory, {
            dependencies: {
              '@astrojs/cloudflare': '14.3.4',
            },
            devDependencies: {
              'wrangler': '4.125.0',
            },
          });
        }

        if (answers.get('dockerImage') === 'enabled') {
          await CliGenerateDockerImage.generateForTarget({
            buildDirectory: 'build',
            profile: (answers.get('rendering') === 'server') ? 'astro-node' : 'static-site',
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
