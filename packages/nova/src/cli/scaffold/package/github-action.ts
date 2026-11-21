import { join, relative, sep } from 'node:path';

import { Runner as CliRecipeGithubActionSyncIdentity } from '../../../cli/recipe/github-action/sync-identity.js';
import {
  formatDescriptionLimitMessage,
  resolveDestinationDescription,
  resolveGithubActionDescriptionDestination,
} from '../../../lib/description-limits.js';
import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { runScaffold } from '../../../lib/scaffold.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_ActionFilePath,
  Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_Config,
  Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_ConfigRoot,
  Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_Returns,
  Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_WorkspaceDirectory,
  Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_WorkspacePath,
  Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Config,
  Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_ConfigRoot,
  Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Description,
  Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_DescriptionDestination,
  Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_DescriptionLimitMessage,
  Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Returns,
  Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_WorkspaceName,
  Cli_Scaffold_Package_GithubAction_Runner_Run_Options,
  Cli_Scaffold_Package_GithubAction_Runner_Run_Returns,
} from '../../../types/cli/scaffold/package/github-action.d.ts';

/**
 * CLI - Scaffold - Package - GitHub Action.
 *
 * Scaffolds a bundled TypeScript GitHub Action package through the shared
 * workspace pipeline with its repository-level action manifest.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Package - GitHub Action - Run.
   *
   * Delegates to the shared scaffold pipeline with both the package template
   * and the companion root action manifest required by GitHub.
   *
   * @param {Cli_Scaffold_Package_GithubAction_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Package_GithubAction_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_Package_GithubAction_Runner_Run_Options): Cli_Scaffold_Package_GithubAction_Runner_Run_Returns {
    await runScaffold(options, {
      allowScriptProfiles: [
        'esbuild',
        'file-watching',
      ],
      category: 'package',
      completionNotes: ['Set "INPUT_NAME" in the generated GitHub Action workspace .env file before running the local action.'],
      displayName: 'GitHub Action',
      environmentVariables: [{
        defaultValue: 'Nova',
        key: 'INPUT_NAME',
        reach: 'local',
      }],
      importMetaUrl: import.meta.url,
      platforms: ['nodejs'],
      publishesToNpm: false,
      resolveArtifact: (workspaceRelPath, workspacePackageName) => ({
        name: workspacePackageName,
        build: [workspaceRelPath],
        sources: [
          {
            from: './action.yml',
            to: './action.yml',
          },
          {
            from: `${workspaceRelPath}/build`,
            to: './action',
          },
        ],
      }),
      resolveReplacements: Runner['resolveReplacements'],
      rootTemplateSubpath: 'scaffold/package/github-action-root',
      templateSubpath: 'scaffold/package/github-action',
      typeName: 'github-action',
      workspaceFinalizer: async (workspaceDirectory, _workspaceName, configRoot) => {
        await Runner.finalizeWorkspace(workspaceDirectory, configRoot);

        return;
      },
    });

    return;
  }

  /**
   * CLI - Scaffold - Package - GitHub Action - Finalize Workspace.
   *
   * Runs the GitHub Action sync-identity recipe on the manifest just written, so
   * the scaffold and the recipe write "name", "description", and "author" alike.
   *
   * @param {Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_WorkspaceDirectory} workspaceDirectory - Workspace directory.
   * @param {Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_ConfigRoot}         configRoot         - Config root.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_Returns}
   *
   * @since 0.49.0
   */
  private static async finalizeWorkspace(workspaceDirectory: Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_WorkspaceDirectory, configRoot: Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_ConfigRoot): Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_Returns {
    const config: Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_Config = await new LibNovaConfig().load(configRoot);
    const actionFilePath: Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_ActionFilePath = join(configRoot, 'action.yml');
    const workspacePath: Cli_Scaffold_Package_GithubAction_Runner_FinalizeWorkspace_WorkspacePath = `./${relative(configRoot, workspaceDirectory).split(sep).join('/')}`;

    await CliRecipeGithubActionSyncIdentity.syncFile(actionFilePath, config, workspacePath, false, true, true);

    return;
  }

  /**
   * CLI - Scaffold - Package - GitHub Action - Resolve Replacements.
   *
   * Checks the description the action manifest will get against the GitHub
   * Marketplace limit before any file is written, using the recipe's helper.
   *
   * @param {Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_WorkspaceName} workspaceName - Workspace name.
   * @param {Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_ConfigRoot}    configRoot    - Config root.
   *
   * @private
   *
   * @returns {Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Returns}
   *
   * @since 0.49.0
   */
  private static async resolveReplacements(workspaceName: Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_WorkspaceName, configRoot: Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_ConfigRoot): Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Returns {
    const config: Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Config = await new LibNovaConfig().load(configRoot);

    // The new workspace has no "githubAction.description" override yet, so the manifest
    // falls back to the short description, which must fit the Marketplace limit.
    const descriptionDestination: Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_DescriptionDestination = resolveGithubActionDescriptionDestination(undefined, `./packages/${workspaceName}`);
    const description: Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_Description = resolveDestinationDescription(descriptionDestination, config);

    if (description !== undefined) {
      const descriptionLimitMessage: Cli_Scaffold_Package_GithubAction_Runner_ResolveReplacements_DescriptionLimitMessage = formatDescriptionLimitMessage(descriptionDestination, description);

      if (descriptionLimitMessage !== undefined) {
        Logger.customize({
          name: 'CliScaffoldPackageGithubAction.resolveReplacements',
          purpose: 'config',
        }).error(`${descriptionLimitMessage} No scaffold files were written.`);

        process.exitCode = 1;

        return undefined;
      }
    }

    return new Map();
  }
}
