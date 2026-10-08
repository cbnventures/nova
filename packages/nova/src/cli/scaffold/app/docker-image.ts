import {
  LIB_REGEX_PLACEHOLDER_DOCKER_ARCHITECTURES,
  LIB_REGEX_PLACEHOLDER_DOCKER_PUBLISH,
} from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';
import { Runner as CliGenerateDockerImage } from '../../generate/docker-image/index.js';

import type {
  Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Answers,
  Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Publish,
  Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Returns,
  Cli_Scaffold_App_DockerImage_Runner_Run_Options,
  Cli_Scaffold_App_DockerImage_Runner_Run_Returns,
  Cli_Scaffold_App_DockerImage_TemplateQuestions,
} from '../../../types/cli/scaffold/app/docker-image.d.ts';

/**
 * CLI - Scaffold - App - Docker Image - CLI Scaffold App Docker Image Template Questions.
 *
 * Keeps registry and architecture choices in the same validation pipeline as
 * every other scaffold option before root workflow files are written.
 *
 * @since 0.29.0
 */
export const cliScaffoldAppDockerImageTemplateQuestions: Cli_Scaffold_App_DockerImage_TemplateQuestions = [
  {
    choices: [
      {
        title: 'None (default)',
        description: 'Do not add a registry publishing workflow',
        value: 'none',
      },
      {
        title: 'GitHub Container Registry',
        description: 'Publish release images to ghcr.io with GITHUB_TOKEN',
        value: 'ghcr',
      },
      {
        title: 'Docker Hub',
        description: 'Publish release images with Docker Hub variables and secrets',
        value: 'docker-hub',
      },
    ],
    defaultValue: 'none',
    flag: '--publish',
    initial: 0,
    message: 'Select a container registry:',
    name: 'publish',
    placeholder: LIB_REGEX_PLACEHOLDER_DOCKER_PUBLISH,
  },
  {
    choices: [
      {
        title: 'AMD64 and ARM64 (default)',
        description: 'Publish one multi-platform image for common servers and ARM devices',
        replacement: 'linux/amd64,linux/arm64',
        value: 'amd64,arm64',
      },
      {
        title: 'AMD64 only',
        description: 'Publish only for 64-bit Intel and AMD systems',
        replacement: 'linux/amd64',
        value: 'amd64',
      },
      {
        title: 'ARM64 only',
        description: 'Publish only for 64-bit ARM systems',
        replacement: 'linux/arm64',
        value: 'arm64',
      },
    ],
    defaultValue: 'amd64,arm64',
    dependsOn: {
      name: 'publish',
      values: [
        'ghcr',
        'docker-hub',
      ],
    },
    flag: '--architectures',
    initial: 0,
    message: 'Select container architectures:',
    name: 'architectures',
    placeholder: LIB_REGEX_PLACEHOLDER_DOCKER_ARCHITECTURES,
  },
];

/**
 * CLI - Scaffold - App - Docker Image - Resolve Root Template Subpaths.
 *
 * Selects the reviewed root publishing workflow for the requested container
 * registry.
 *
 * @param {Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Answers} answers - Answers.
 *
 * @returns {Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Returns}
 *
 * @since 0.29.0
 */
function resolveRootTemplateSubpaths(answers: Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Answers): Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Returns {
  const publish: Cli_Scaffold_App_DockerImage_ResolveRootTemplateSubpaths_Publish = answers.get('publish');

  return (publish === 'ghcr' || publish === 'docker-hub') ? [`scaffold-options/app/docker-image/publish/${publish}`] : [];
}

/**
 * CLI - Scaffold - App - Docker Image.
 *
 * Scaffolds a container-native image through the shared workspace pipeline,
 * then composes Docker packaging through the reusable image generator.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Docker Image - Run.
   *
   * Delegates workspace creation to the shared scaffold pipeline and applies
   * the container-native Docker profile before registration completes.
   *
   * @param {Cli_Scaffold_App_DockerImage_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_DockerImage_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_App_DockerImage_Runner_Run_Options): Cli_Scaffold_App_DockerImage_Runner_Run_Returns {
    await runScaffold(options, {
      category: 'app',
      importMetaUrl: import.meta.url,
      resolveRootTemplateSubpaths,
      templateQuestions: cliScaffoldAppDockerImageTemplateQuestions,
      templateSubpath: 'scaffold/app/docker-image',
      typeName: 'docker-image',
      workspaceFinalizer: async (workspaceDirectory) => {
        await CliGenerateDockerImage.generateForTarget({
          profile: 'container-native',
          replaceFile: true,
          workspaceDirectory,
        });

        return;
      },
    });

    return;
  }
}
