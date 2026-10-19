import { LIB_REGEX_PLACEHOLDER_SERVERLESS_TARGET } from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Answers,
  Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Returns,
  Cli_Scaffold_Tool_Serverless_Runner_Run_Options,
  Cli_Scaffold_Tool_Serverless_Runner_Run_Returns,
  Cli_Scaffold_Tool_Serverless_TemplateQuestions,
} from '../../../types/cli/scaffold/tool/serverless.d.ts';

/**
 * CLI - Scaffold - Tool - Serverless - Template Questions.
 *
 * Selects the serverless platform without exposing separate public scaffolds
 * for each provider.
 *
 * @since 0.32.0
 */
export const cliScaffoldToolServerlessTemplateQuestions: Cli_Scaffold_Tool_Serverless_TemplateQuestions = [{
  choices: [
    {
      title: 'Cloudflare Workers (default)',
      description: 'Deploy the service with Wrangler to Cloudflare Workers',
      value: 'cloudflare-workers',
    },
    {
      title: 'Vercel Functions',
      description: 'Deploy the service with the Vercel CLI to Vercel Functions',
      value: 'vercel-functions',
    },
  ],
  defaultValue: 'cloudflare-workers',
  flag: '--target',
  initial: 0,
  message: 'Select a serverless deployment target:',
  name: 'target',
  placeholder: LIB_REGEX_PLACEHOLDER_SERVERLESS_TARGET,
}];

/**
 * CLI - Scaffold - Tool - Serverless - Resolve Workspace Template Subpaths.
 *
 * Composes the internal CLI starter with exactly one provider adapter after
 * the shared answer resolver has validated the selected target.
 *
 * @param {Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Answers} answers - Answers.
 *
 * @returns {Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Returns}
 *
 * @since 0.32.0
 */
function resolveWorkspaceTemplateSubpaths(answers: Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Answers): Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Returns {
  return [
    'scaffold-options/package/node-cli-core',
    `scaffold-options/tool/serverless/${answers.get('target') ?? 'cloudflare-workers'}`,
  ];
}

/**
 * CLI - Scaffold - Tool - Serverless.
 *
 * Scaffolds a distributable Node.js CLI paired with a user-deployed serverless
 * service on one explicitly selected platform.
 *
 * @since 0.32.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Tool - Serverless - Run.
   *
   * Delegates project creation, registration, installation, and target-layer
   * composition to Nova's shared scaffold pipeline.
   *
   * @param {Cli_Scaffold_Tool_Serverless_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Tool_Serverless_Runner_Run_Returns}
   *
   * @since 0.32.0
   */
  public static async run(options: Cli_Scaffold_Tool_Serverless_Runner_Run_Options): Cli_Scaffold_Tool_Serverless_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'tool',
      displayName: 'Serverless Tool',
      importMetaUrl: import.meta.url,
      platforms: [
        'nodejs',
        'web',
      ],
      resolveWorkspaceTemplateSubpaths,
      templateQuestions: cliScaffoldToolServerlessTemplateQuestions,
      templateSubpath: 'scaffold/tool/serverless',
      typeName: 'serverless',
    });

    return;
  }
}
