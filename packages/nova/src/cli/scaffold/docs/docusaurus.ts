import {
  LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_CONTENT,
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET,
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_SEARCH,
} from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';
import { Runner as CliGenerateDockerImage } from '../../generate/docker-image/index.js';

import type {
  Cli_Scaffold_Docs_Docusaurus_ResolveWorkspaceTemplateSubpaths_Answers,
  Cli_Scaffold_Docs_Docusaurus_ResolveWorkspaceTemplateSubpaths_Returns,
  Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options,
  Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns,
  Cli_Scaffold_Docs_Docusaurus_TemplateQuestions,
} from '../../../types/cli/scaffold/docs/docusaurus.d.ts';

/**
 * CLI - Scaffold - Docs - Docusaurus - Template Questions.
 *
 * Declares the Docusaurus-specific choices resolved by the shared scaffold
 * pipeline. Foundry remains the default shown by the interactive wizard.
 *
 * @since 0.26.0
 */
export const cliScaffoldDocsDocusaurusTemplateQuestions: Cli_Scaffold_Docs_Docusaurus_TemplateQuestions = [
  {
    choices: [
      {
        title: 'Envoy',
        description: 'Purple and cyan with rounded, elevated surfaces',
        value: 'envoy',
      },
      {
        title: 'Foundry (default)',
        description: 'Warm orange and amber with rounded, elevated surfaces',
        value: 'foundry',
      },
      {
        title: 'Lantern',
        description: 'Warm amber and indigo with tactile paper-like surfaces',
        value: 'lantern',
      },
      {
        title: 'Marshal',
        description: 'Documentary green and red with compact, flat surfaces',
        value: 'marshal',
      },
      {
        title: 'Sentinel',
        description: 'Teal and indigo with rounded, flat surfaces',
        value: 'sentinel',
      },
      {
        title: 'Signal',
        description: 'Red and amber with sharp, compact surfaces',
        value: 'signal',
      },
    ],
    flag: '--preset',
    initial: 1,
    message: 'Select a Nova visual preset:',
    name: 'preset',
    placeholder: LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET,
  },
  {
    choices: [
      {
        title: 'Docs (default)',
        description: 'Create a documentation-only site',
        replacement: 'false',
        value: 'docs',
      },
      {
        title: 'Docs and blog',
        description: 'Create documentation plus a dated blog',
        replacement: '{ routeBasePath: \'blog\' }',
        value: 'docs-blog',
      },
    ],
    defaultValue: 'docs',
    flag: '--content',
    initial: 0,
    message: 'Select the Docusaurus content model:',
    name: 'content',
    placeholder: LIB_REGEX_PLACEHOLDER_DOCUSAURUS_CONTENT,
  },
  {
    choices: [
      {
        title: 'No (default)',
        description: 'Do not build a local search index',
        replacement: 'false',
        value: 'disabled',
      },
      {
        title: 'Yes',
        description: 'Enable Nova preset local search',
        replacement: '{}',
        value: 'enabled',
      },
    ],
    defaultValue: 'disabled',
    flag: '--search',
    flagValue: 'enabled',
    initial: 0,
    message: 'Enable local search?',
    name: 'search',
    placeholder: LIB_REGEX_PLACEHOLDER_DOCUSAURUS_SEARCH,
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
        description: 'Serve the production site from an unprivileged NGINX image',
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
 * CLI - Scaffold - Docs - Docusaurus - Resolve Workspace Template Subpaths.
 *
 * Adds the reviewed blog layer when the selected content model includes a
 * blog.
 *
 * @param {Cli_Scaffold_Docs_Docusaurus_ResolveWorkspaceTemplateSubpaths_Answers} answers - Answers.
 *
 * @returns {Cli_Scaffold_Docs_Docusaurus_ResolveWorkspaceTemplateSubpaths_Returns}
 *
 * @since 0.29.0
 */
function resolveWorkspaceTemplateSubpaths(answers: Cli_Scaffold_Docs_Docusaurus_ResolveWorkspaceTemplateSubpaths_Answers): Cli_Scaffold_Docs_Docusaurus_ResolveWorkspaceTemplateSubpaths_Returns {
  return (answers.get('content') === 'docs-blog') ? ['scaffold-options/docs/docusaurus/blog'] : [];
}

/**
 * CLI - Scaffold - Docs - Docusaurus.
 *
 * Scaffolds a Docusaurus documentation site as a
 * workspace inside an existing or new monorepo using
 * the shared runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Docs - Docusaurus - Run.
   *
   * Entry point invoked by the CLI nova scaffold docs docusaurus command. Delegates to
   * runScaffold with the Docusaurus template subpath.
   *
   * @param {Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options): Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'docs',
      importMetaUrl: import.meta.url,
      resolveWorkspaceTemplateSubpaths,
      templateQuestions: cliScaffoldDocsDocusaurusTemplateQuestions,
      templateSubpath: 'scaffold/docs/docusaurus',
      typeName: 'docusaurus',
      workspaceFinalizer: async (workspaceDirectory, _workspaceName, _configRoot, answers) => {
        if (answers.get('dockerImage') === 'enabled') {
          await CliGenerateDockerImage.generateForTarget({
            buildDirectory: 'build',
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
