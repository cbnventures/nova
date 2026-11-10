import { access } from 'node:fs/promises';
import { join } from 'node:path';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
  LIB_REGEX_PLACEHOLDER_SERVERLESS_TARGET,
} from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Answers,
  Cli_Scaffold_Tool_Serverless_ResolveWorkspaceTemplateSubpaths_Returns,
  Cli_Scaffold_Tool_Serverless_Runner_EscapeTypeScriptSingleQuoted_Returns,
  Cli_Scaffold_Tool_Serverless_Runner_EscapeTypeScriptSingleQuoted_Value,
  Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_Config,
  Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_ConfigFilePath,
  Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_ConfigRoot,
  Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_ProjectRepository,
  Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_Returns,
  Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_Urls,
  Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_WorkspaceName,
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
      allowScriptProfiles: [
        'esbuild',
        'file-watching',
      ],
      category: 'tool',
      displayName: 'Serverless Tool',
      importMetaUrl: import.meta.url,
      platforms: [
        'nodejs',
        'web',
      ],
      resolveAllowScriptProfiles: (answers) => (answers.get('target') === 'cloudflare-workers') ? ['cloudflare'] : [],
      resolveArtifact: (workspaceRelPath, workspacePackageName, answers) => ({
        name: workspacePackageName,
        build: [workspaceRelPath],
        sources: (answers.get('target') === 'cloudflare-workers') ? [
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
            from: `${workspaceRelPath}/wrangler.build.toml`,
            to: './wrangler.build.toml',
          },
          {
            from: `${workspaceRelPath}/wrangler.toml`,
            to: './wrangler.toml',
          },
        ] : [
          {
            from: `${workspaceRelPath}/package.json`,
            to: './package.json',
          },
          {
            from: `${workspaceRelPath}/api`,
            to: './api',
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
            from: `${workspaceRelPath}/src/function`,
            to: './src/function',
          },
          {
            from: `${workspaceRelPath}/src/types/api`,
            to: './src/types/api',
          },
          {
            from: `${workspaceRelPath}/src/types/function`,
            to: './src/types/function',
          },
          {
            from: `${workspaceRelPath}/vercel.json`,
            to: './vercel.json',
          },
        ],
      }),
      resolveReplacements: Runner['resolveReplacements'],
      resolveWorkspaceTemplateSubpaths,
      templateQuestions: cliScaffoldToolServerlessTemplateQuestions,
      templateSubpath: 'scaffold/tool/serverless',
      typeName: 'serverless',
    });

    return;
  }

  /**
   * CLI - Scaffold - Tool - Serverless - Resolve Replacements.
   *
   * Reads the project repository URL before templates are written so both
   * provider homepages can link back to the generated project's source.
   *
   * @param {Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_WorkspaceName} _workspaceName - Workspace name.
   * @param {Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_ConfigRoot}    configRoot     - Config root.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_Returns}
   *
   * @since 0.39.0
   */
  private static async resolveReplacements(_workspaceName: Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_WorkspaceName, configRoot: Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_ConfigRoot): Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_Returns {
    const configFilePath: Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_ConfigFilePath = join(configRoot, 'nova.config.json');

    try {
      await access(configFilePath);
    } catch {
      return new Map([[
        LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
        '',
      ]]);
    }

    const config: Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_Config = await new LibNovaConfig().load(configRoot);
    const urls: Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_Urls = config['urls'] ?? {};
    const projectRepository: Cli_Scaffold_Tool_Serverless_Runner_ResolveReplacements_ProjectRepository = urls['repository'] ?? '';

    return new Map([[
      LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
      Runner.escapeTypeScriptSingleQuoted(projectRepository),
    ]]);
  }

  /**
   * CLI - Scaffold - Tool - Serverless - Escape Type Script Single Quoted.
   *
   * Escapes project-controlled values for TypeScript single-quoted literals.
   * The generated renderer separately escapes the value for HTML attributes.
   *
   * @param {Cli_Scaffold_Tool_Serverless_Runner_EscapeTypeScriptSingleQuoted_Value} value - Value.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Tool_Serverless_Runner_EscapeTypeScriptSingleQuoted_Returns}
   *
   * @since 0.39.0
   */
  private static escapeTypeScriptSingleQuoted(value: Cli_Scaffold_Tool_Serverless_Runner_EscapeTypeScriptSingleQuoted_Value): Cli_Scaffold_Tool_Serverless_Runner_EscapeTypeScriptSingleQuoted_Returns {
    return value.replaceAll('\\', '\\\\').replaceAll('\'', '\\\'');
  }
}
