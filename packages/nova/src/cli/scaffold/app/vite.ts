import {
  LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
  LIB_REGEX_PLACEHOLDER_VITE_FRAMEWORK,
  LIB_REGEX_PLACEHOLDER_VITE_PWA,
} from '../../../lib/regex.js';
import {
  runScaffold,
  updateScaffoldPackageJson,
} from '../../../lib/scaffold.js';
import { Runner as CliGenerateDockerImage } from '../../generate/docker-image/index.js';

import type {
  Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Answers,
  Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Framework,
  Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Pwa,
  Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Returns,
  Cli_Scaffold_App_Vite_Runner_Run_Dependencies,
  Cli_Scaffold_App_Vite_Runner_Run_DevDependencies,
  Cli_Scaffold_App_Vite_Runner_Run_Framework,
  Cli_Scaffold_App_Vite_Runner_Run_Options,
  Cli_Scaffold_App_Vite_Runner_Run_Returns,
  Cli_Scaffold_App_Vite_TemplateQuestions,
} from '../../../types/cli/scaffold/app/vite.d.ts';

/**
 * CLI - Scaffold - App - Vite - Template Questions.
 *
 * Selects one reviewed framework layer plus optional PWA and Docker support
 * without duplicating the shared Vite workspace foundation.
 *
 * @since 0.29.0
 */
export const cliScaffoldAppViteTemplateQuestions: Cli_Scaffold_App_Vite_TemplateQuestions = [
  {
    choices: [
      {
        title: 'Vanilla TypeScript (default)',
        description: 'Use the browser platform without a component framework',
        value: 'vanilla',
      },
      {
        title: 'React',
        description: 'Use React with the official Vite plugin',
        value: 'react',
      },
      {
        title: 'Vue',
        description: 'Use Vue with the official Vite plugin',
        value: 'vue',
      },
      {
        title: 'Svelte',
        description: 'Use Svelte with the official Vite plugin',
        value: 'svelte',
      },
    ],
    defaultValue: 'vanilla',
    flag: '--framework',
    initial: 0,
    message: 'Select a Vite framework:',
    name: 'framework',
    placeholder: LIB_REGEX_PLACEHOLDER_VITE_FRAMEWORK,
  },
  {
    choices: [
      {
        title: 'No (default)',
        description: 'Do not register a service worker',
        value: 'disabled',
      },
      {
        title: 'Yes',
        description: 'Add an auto-updating progressive web app service worker',
        value: 'enabled',
      },
    ],
    defaultValue: 'disabled',
    flag: '--pwa',
    flagValue: 'enabled',
    initial: 0,
    message: 'Add progressive web app support?',
    name: 'pwa',
    placeholder: LIB_REGEX_PLACEHOLDER_VITE_PWA,
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
        description: 'Serve the production build from an unprivileged NGINX image',
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
 * CLI - Scaffold - App - Vite - Resolve Workspace Template Subpaths.
 *
 * Selects the reviewed framework and progressive web app template layers,
 * keeping each optional surface independently composable.
 *
 * @param {Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Answers} answers - Answers.
 *
 * @returns {Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Returns}
 *
 * @since 0.29.0
 */
function resolveWorkspaceTemplateSubpaths(answers: Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Answers): Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Returns {
  const framework: Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Framework = answers.get('framework') ?? 'vanilla';
  const pwa: Cli_Scaffold_App_Vite_ResolveWorkspaceTemplateSubpaths_Pwa = answers.get('pwa') ?? 'disabled';

  return [
    `scaffold-options/app/vite/framework/${framework}`,
    `scaffold-options/app/vite/pwa/${pwa}`,
  ];
}

/**
 * CLI - Scaffold - App - Vite.
 *
 * Scaffolds a Vite application as a workspace inside an existing or new monorepo using the
 * shared runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Vite - Run.
   *
   * Entry point invoked by the CLI nova scaffold app vite command. Delegates to runScaffold
   * with the Vite template subpath.
   *
   * @param {Cli_Scaffold_App_Vite_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Vite_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_App_Vite_Runner_Run_Options): Cli_Scaffold_App_Vite_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'app',
      importMetaUrl: import.meta.url,
      resolveWorkspaceTemplateSubpaths,
      templateQuestions: cliScaffoldAppViteTemplateQuestions,
      templateSubpath: 'scaffold/app/vite',
      typeName: 'vite',
      workspaceFinalizer: async (workspaceDirectory, _workspaceName, _configRoot, answers) => {
        const framework: Cli_Scaffold_App_Vite_Runner_Run_Framework = answers.get('framework');
        const dependencies: Cli_Scaffold_App_Vite_Runner_Run_Dependencies = {};
        const devDependencies: Cli_Scaffold_App_Vite_Runner_Run_DevDependencies = {};

        if (framework === 'react') {
          Reflect.set(dependencies, 'react', '19.2.8');
          Reflect.set(dependencies, 'react-dom', '19.2.8');
          Reflect.set(devDependencies, '@types/react', '19.2.18');
          Reflect.set(devDependencies, '@types/react-dom', '19.2.7');
          Reflect.set(devDependencies, '@vitejs/plugin-react', '5.2.0');
        }

        if (framework === 'vue') {
          Reflect.set(dependencies, 'vue', '3.5.43');
          Reflect.set(devDependencies, '@vitejs/plugin-vue', '6.0.9');
        }

        if (framework === 'svelte') {
          Reflect.set(dependencies, 'svelte', '5.57.2');
          Reflect.set(devDependencies, '@sveltejs/vite-plugin-svelte', '6.2.4');
        }

        if (answers.get('pwa') === 'enabled') {
          Reflect.set(devDependencies, 'vite-plugin-pwa', '2.0.0');
        }

        await updateScaffoldPackageJson(workspaceDirectory, {
          dependencies,
          devDependencies,
        });

        if (answers.get('dockerImage') === 'enabled') {
          await CliGenerateDockerImage.generateForTarget({
            buildDirectory: 'dist',
            profile: 'static-site',
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
