import { promises as fs } from 'node:fs';
import {
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from 'node:path';

import {
  LIB_REGEX_PLACEHOLDER_DOCKER_BUILD_DIRECTORY,
  LIB_REGEX_PLACEHOLDER_DOCKER_RUNTIME_DIRECTIVES,
} from '../../../lib/regex.js';
import {
  isPlainObject,
  isProjectRoot,
  resolveTemplatePath,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Lines,
  Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Profile,
  Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Returns,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_BuildDirectory,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ComposeContent,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ComposeTemplatePath,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerfileContent,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerfileTemplate,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerfileTemplatePath,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerignoreContent,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerignoreTemplatePath,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_IsDryRun,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_IsReplaceFile,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJson,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJsonContent,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJsonPath,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJsonRaw,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ParsedPackageJson,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_RawScripts,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Returns,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_RuntimeDirectives,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Scripts,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ScriptValue,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_TemplateContents,
  Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_TemplateRoot,
  Cli_Generate_DockerImage_Index_Runner_IsProfile_Profile,
  Cli_Generate_DockerImage_Index_Runner_IsProfile_TypeGuard,
  Cli_Generate_DockerImage_Index_Runner_MergeScripts_DeployEntries,
  Cli_Generate_DockerImage_Index_Runner_MergeScripts_Entries,
  Cli_Generate_DockerImage_Index_Runner_MergeScripts_IsDeployInserted,
  Cli_Generate_DockerImage_Index_Runner_MergeScripts_Merged,
  Cli_Generate_DockerImage_Index_Runner_MergeScripts_Returns,
  Cli_Generate_DockerImage_Index_Runner_MergeScripts_Scripts,
  Cli_Generate_DockerImage_Index_Runner_Run_CurrentDirectory,
  Cli_Generate_DockerImage_Index_Runner_Run_IsAtProjectRoot,
  Cli_Generate_DockerImage_Index_Runner_Run_IsDryRun,
  Cli_Generate_DockerImage_Index_Runner_Run_IsReplaceFile,
  Cli_Generate_DockerImage_Index_Runner_Run_Options,
  Cli_Generate_DockerImage_Index_Runner_Run_Profile,
  Cli_Generate_DockerImage_Index_Runner_Run_ProjectRoot,
  Cli_Generate_DockerImage_Index_Runner_Run_RelativeWorkspacePath,
  Cli_Generate_DockerImage_Index_Runner_Run_ReplaceFileNotice,
  Cli_Generate_DockerImage_Index_Runner_Run_RequestedWorkspaceDirectory,
  Cli_Generate_DockerImage_Index_Runner_Run_Returns,
  Cli_Generate_DockerImage_Index_Runner_Run_RunError,
  Cli_Generate_DockerImage_Index_Runner_Run_Workspace,
  Cli_Generate_DockerImage_Index_Runner_Run_WorkspaceDirectory,
} from '../../../types/cli/generate/docker-image/index.d.ts';

/**
 * CLI - Generate - Docker Image.
 *
 * Adds Docker packaging to an existing workspace without changing the workload
 * itself, using an explicit workload-specific profile.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Generate - Docker Image - Run.
   *
   * Validates a workspace selected from the Nova project root, then generates
   * its Docker packaging through the same implementation used by scaffolds.
   *
   * @param {Cli_Generate_DockerImage_Index_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_DockerImage_Index_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Generate_DockerImage_Index_Runner_Run_Options): Cli_Generate_DockerImage_Index_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_DockerImage_Index_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_DockerImage_Index_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const profile: Cli_Generate_DockerImage_Index_Runner_Run_Profile = options['profile'];
    const workspace: Cli_Generate_DockerImage_Index_Runner_Run_Workspace = options['workspace'];

    if (profile === undefined || Runner.isProfile(profile) === false) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'profile',
      }).error('Select one Docker profile: "http-service", "background-service", "container-native", "static-site", "astro-node", or "nextjs-standalone".');

      process.exitCode = 1;

      return 'cancelled';
    }

    if (workspace === undefined || workspace.trim() === '') {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspace',
      }).error('Provide a workspace path with "--workspace".');

      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_DockerImage_Index_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_DockerImage_Index_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_DockerImage_Index_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup files will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    try {
      const projectRoot: Cli_Generate_DockerImage_Index_Runner_Run_ProjectRoot = await fs.realpath(currentDirectory);
      const requestedWorkspaceDirectory: Cli_Generate_DockerImage_Index_Runner_Run_RequestedWorkspaceDirectory = resolve(projectRoot, workspace);
      const workspaceDirectory: Cli_Generate_DockerImage_Index_Runner_Run_WorkspaceDirectory = await fs.realpath(requestedWorkspaceDirectory);
      const relativeWorkspacePath: Cli_Generate_DockerImage_Index_Runner_Run_RelativeWorkspacePath = relative(projectRoot, workspaceDirectory);

      if (
        relativeWorkspacePath === ''
        || relativeWorkspacePath === '..'
        || relativeWorkspacePath.startsWith(`..${sep}`) === true
        || isAbsolute(relativeWorkspacePath) === true
      ) {
        throw new Error('The Docker target must be a child workspace inside the current Nova project root.');
      }

      await Runner.generateForTarget({
        dryRun: isDryRun,
        profile,
        replaceFile: isReplaceFile,
        workspaceDirectory,
      });
    } catch (error) {
      const runError: Cli_Generate_DockerImage_Index_Runner_Run_RunError = error;

      Logger.customize({
        name: 'Runner.run',
        purpose: 'generate',
      }).debug(runError);

      Logger.customize({
        name: 'Runner.run',
        purpose: 'generate',
      }).error((runError instanceof Error) ? runError.message : 'Docker packaging could not be generated.');

      process.exitCode = 1;

      return 'cancelled';
    }

    return 'completed';
  }

  /**
   * CLI - Generate - Docker Image - Generate For Target.
   *
   * Writes the selected Docker profile into one workspace and adds the standard
   * deploy dispatcher without altering that workspace's application source.
   *
   * @param {Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options} options - Options.
   *
   * @returns {Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Returns}
   *
   * @since 0.29.0
   */
  public static async generateForTarget(options: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Options): Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Returns {
    const templateRoot: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_TemplateRoot = resolveTemplatePath(import.meta.url, 'generators/docker-image');
    const dockerignoreTemplatePath: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerignoreTemplatePath = join(templateRoot, 'common', '.dockerignore');
    let dockerfileTemplatePath: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerfileTemplatePath = join(templateRoot, 'node', 'Dockerfile');

    if (
      options['profile'] === 'container-native'
      || options['profile'] === 'static-site'
      || options['profile'] === 'astro-node'
      || options['profile'] === 'nextjs-standalone'
    ) {
      dockerfileTemplatePath = join(templateRoot, 'container-native', 'Dockerfile');

      if (options['profile'] !== 'container-native') {
        dockerfileTemplatePath = join(templateRoot, options['profile'], 'Dockerfile');
      }
    }
    const composeTemplatePath: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ComposeTemplatePath = join(templateRoot, options['profile'], 'compose.yml');
    const packageJsonPath: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJsonPath = join(options['workspaceDirectory'], 'package.json');
    const templateContents: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_TemplateContents = await Promise.all([
      fs.readFile(dockerignoreTemplatePath, 'utf-8'),
      fs.readFile(dockerfileTemplatePath, 'utf-8'),
      fs.readFile(composeTemplatePath, 'utf-8'),
      fs.readFile(packageJsonPath, 'utf-8'),
    ]);
    const dockerignoreContent: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerignoreContent = templateContents[0] ?? '';
    const dockerfileTemplate: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerfileTemplate = templateContents[1] ?? '';
    const composeContent: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ComposeContent = templateContents[2] ?? '';
    const packageJsonRaw: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJsonRaw = templateContents[3] ?? '';
    const parsedPackageJson: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ParsedPackageJson = JSON.parse(packageJsonRaw);

    if (isPlainObject(parsedPackageJson) === false) {
      throw new Error(`The workspace package manifest at "${packageJsonPath}" must contain a JSON object.`);
    }

    const packageJson: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJson = parsedPackageJson;
    const rawScripts: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_RawScripts = packageJson['scripts'];
    const scripts: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_Scripts = {};

    if (rawScripts !== undefined && isPlainObject(rawScripts) === false) {
      throw new Error(`The "scripts" field in "${packageJsonPath}" must contain a JSON object.`);
    }

    if (isPlainObject(rawScripts) === true) {
      for (const scriptEntry of Object.entries(rawScripts)) {
        const scriptValue: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_ScriptValue = scriptEntry[1];

        if (typeof scriptValue !== 'string') {
          throw new Error(`Every package script in "${packageJsonPath}" must be a string.`);
        }

        Reflect.set(scripts, scriptEntry[0], scriptValue);
      }
    }

    Reflect.set(packageJson, 'scripts', Runner.mergeScripts(scripts));

    const runtimeDirectives: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_RuntimeDirectives = Runner.buildRuntimeDirectives(options['profile']);
    const buildDirectory: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_BuildDirectory = options['buildDirectory'] ?? 'build';
    const dockerfileContent: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_DockerfileContent = dockerfileTemplate
      .replace(
        new RegExp(LIB_REGEX_PLACEHOLDER_DOCKER_RUNTIME_DIRECTIVES.source, 'g'),
        runtimeDirectives,
      )
      .replace(
        new RegExp(LIB_REGEX_PLACEHOLDER_DOCKER_BUILD_DIRECTORY.source, 'g'),
        buildDirectory,
      );
    const packageJsonContent: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_PackageJsonContent = `${JSON.stringify(packageJson, null, 2)}\n`;
    const isDryRun: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_DockerImage_Index_Runner_GenerateForTarget_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      return;
    }

    await Promise.all([
      saveGeneratedFile(join(options['workspaceDirectory'], '.dockerignore'), dockerignoreContent, isReplaceFile),
      saveGeneratedFile(join(options['workspaceDirectory'], 'Dockerfile'), dockerfileContent, isReplaceFile),
      saveGeneratedFile(join(options['workspaceDirectory'], 'compose.yml'), composeContent, isReplaceFile),
      saveGeneratedFile(packageJsonPath, packageJsonContent, isReplaceFile),
    ]);

    return;
  }

  /**
   * CLI - Generate - Docker Image - Build Runtime Directives.
   *
   * Adds a port and connection health check only to the HTTP profile; background
   * workloads intentionally receive neither because they do not accept traffic.
   *
   * @param {Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Profile} profile - Profile.
   *
   * @private
   *
   * @returns {Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Returns}
   *
   * @since 0.29.0
   */
  private static buildRuntimeDirectives(profile: Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Profile): Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Returns {
    if (profile !== 'http-service') {
      return '';
    }

    const lines: Cli_Generate_DockerImage_Index_Runner_BuildRuntimeDirectives_Lines = [
      'EXPOSE 3000',
      'HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\',
      '  CMD ["wget", "--spider", "--quiet", "http://127.0.0.1:3000/"]',
    ];

    return lines.join('\n');
  }

  /**
   * CLI - Generate - Docker Image - Is Profile.
   *
   * Narrows user input to the reviewed profiles so Nova never guesses a
   * workload from filenames or dependencies.
   *
   * @param {Cli_Generate_DockerImage_Index_Runner_IsProfile_Profile} profile - Profile.
   *
   * @private
   *
   * @returns {boolean}
   *
   * @since 0.29.0
   */
  private static isProfile(profile: Cli_Generate_DockerImage_Index_Runner_IsProfile_Profile): profile is Cli_Generate_DockerImage_Index_Runner_IsProfile_TypeGuard {
    return (
      profile === 'background-service'
      || profile === 'astro-node'
      || profile === 'container-native'
      || profile === 'http-service'
      || profile === 'nextjs-standalone'
      || profile === 'static-site'
    );
  }

  /**
   * CLI - Generate - Docker Image - Merge Scripts.
   *
   * Inserts the canonical deploy group before clean while preserving every
   * unrelated script and any additional deploy steps owned by the consumer.
   *
   * @param {Cli_Generate_DockerImage_Index_Runner_MergeScripts_Scripts} scripts - Scripts.
   *
   * @private
   *
   * @returns {Cli_Generate_DockerImage_Index_Runner_MergeScripts_Returns}
   *
   * @since 0.29.0
   */
  private static mergeScripts(scripts: Cli_Generate_DockerImage_Index_Runner_MergeScripts_Scripts): Cli_Generate_DockerImage_Index_Runner_MergeScripts_Returns {
    const entries: Cli_Generate_DockerImage_Index_Runner_MergeScripts_Entries = Object.entries(scripts).filter((scriptEntry) => scriptEntry[0] !== 'deploy' && scriptEntry[0].startsWith('deploy:') === false);
    const deployEntries: Cli_Generate_DockerImage_Index_Runner_MergeScripts_DeployEntries = Object.entries(scripts).filter((scriptEntry) => scriptEntry[0] !== 'deploy:container' && scriptEntry[0].startsWith('deploy:') === true);
    const merged: Cli_Generate_DockerImage_Index_Runner_MergeScripts_Merged = {};
    let isDeployInserted: Cli_Generate_DockerImage_Index_Runner_MergeScripts_IsDeployInserted = false;

    for (const scriptEntry of entries) {
      if (scriptEntry[0] === 'clean' && isDeployInserted === false) {
        Reflect.set(merged, 'deploy', 'nova utility run-scripts --sequential --node-env production \'deploy:*\'');
        Reflect.set(merged, 'deploy:container', 'docker compose up --build --detach');

        for (const deployEntry of deployEntries) {
          Reflect.set(merged, deployEntry[0], deployEntry[1]);
        }

        isDeployInserted = true;
      }

      Reflect.set(merged, scriptEntry[0], scriptEntry[1]);
    }

    if (isDeployInserted === false) {
      Reflect.set(merged, 'deploy', 'nova utility run-scripts --sequential --node-env production \'deploy:*\'');
      Reflect.set(merged, 'deploy:container', 'docker compose up --build --detach');

      for (const deployEntry of deployEntries) {
        Reflect.set(merged, deployEntry[0], deployEntry[1]);
      }
    }

    return merged;
  }
}
