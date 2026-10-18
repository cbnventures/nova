import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderIgnoreFile } from './ignore-files.js';
import {
  LIB_REGEX_PLACEHOLDER_DOCKER_BUILD_DIRECTORY,
  LIB_REGEX_PLACEHOLDER_DOCKER_RUNTIME_DIRECTIVES,
} from './regex.js';
import { applyScaffoldVersionReplacements } from './scaffold-versions.js';
import {
  isPlainObject,
  saveGeneratedFile,
} from './utility.js';

import type {
  Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Lines,
  Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Profile,
  Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Returns,
  Lib_DockerPackaging_Runner_GenerateForTarget_BuildDirectory,
  Lib_DockerPackaging_Runner_GenerateForTarget_ComposeContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_ComposeTemplatePath,
  Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileTemplate,
  Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileTemplatePath,
  Lib_DockerPackaging_Runner_GenerateForTarget_DockerignoreContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_IsDryRun,
  Lib_DockerPackaging_Runner_GenerateForTarget_IsReplaceFile,
  Lib_DockerPackaging_Runner_GenerateForTarget_Options,
  Lib_DockerPackaging_Runner_GenerateForTarget_PackageJson,
  Lib_DockerPackaging_Runner_GenerateForTarget_PackageJsonContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_PackageJsonPath,
  Lib_DockerPackaging_Runner_GenerateForTarget_PackageJsonRaw,
  Lib_DockerPackaging_Runner_GenerateForTarget_ParsedPackageJson,
  Lib_DockerPackaging_Runner_GenerateForTarget_RawScripts,
  Lib_DockerPackaging_Runner_GenerateForTarget_ReportFiles,
  Lib_DockerPackaging_Runner_GenerateForTarget_Returns,
  Lib_DockerPackaging_Runner_GenerateForTarget_RuntimeDirectives,
  Lib_DockerPackaging_Runner_GenerateForTarget_Scripts,
  Lib_DockerPackaging_Runner_GenerateForTarget_ScriptValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_TemplateContents,
  Lib_DockerPackaging_Runner_GenerateForTarget_TemplateRoot,
  Lib_DockerPackaging_Runner_MergeScripts_DeployEntries,
  Lib_DockerPackaging_Runner_MergeScripts_Entries,
  Lib_DockerPackaging_Runner_MergeScripts_IsDeployInserted,
  Lib_DockerPackaging_Runner_MergeScripts_Merged,
  Lib_DockerPackaging_Runner_MergeScripts_Returns,
  Lib_DockerPackaging_Runner_MergeScripts_Scripts,
} from '../types/lib/docker-packaging.d.ts';

/**
 * Lib - Docker Packaging.
 *
 * Composes reviewed Docker packaging into scaffolds without exposing a
 * standalone generator or changing the scaffold's application source.
 *
 * @since 0.32.0
 */
export class Runner {
  /**
   * Lib - Docker Packaging - Generate For Target.
   *
   * Writes the selected Docker profile into one scaffold workspace and adds
   * the standard deploy dispatcher.
   *
   * @param {Lib_DockerPackaging_Runner_GenerateForTarget_Options} options - Options.
   *
   * @returns {Lib_DockerPackaging_Runner_GenerateForTarget_Returns}
   *
   * @since 0.32.0
   */
  public static async generateForTarget(options: Lib_DockerPackaging_Runner_GenerateForTarget_Options): Lib_DockerPackaging_Runner_GenerateForTarget_Returns {
    const templateRoot: Lib_DockerPackaging_Runner_GenerateForTarget_TemplateRoot = fileURLToPath(new URL('../../templates/scaffold-options/docker-image/', import.meta.url));
    let dockerfileTemplatePath: Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileTemplatePath = join(templateRoot, 'node', 'Dockerfile');

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

    const composeTemplatePath: Lib_DockerPackaging_Runner_GenerateForTarget_ComposeTemplatePath = join(templateRoot, options['profile'], 'compose.yml');
    const packageJsonPath: Lib_DockerPackaging_Runner_GenerateForTarget_PackageJsonPath = join(options['workspaceDirectory'], 'package.json');
    const templateContents: Lib_DockerPackaging_Runner_GenerateForTarget_TemplateContents = await Promise.all([
      fs.readFile(dockerfileTemplatePath, 'utf-8'),
      fs.readFile(composeTemplatePath, 'utf-8'),
      fs.readFile(packageJsonPath, 'utf-8'),
    ]);
    const dockerignoreContent: Lib_DockerPackaging_Runner_GenerateForTarget_DockerignoreContent = await renderIgnoreFile('.dockerignore', options['ignoreFileEntry'] ?? {
      bundles: ['nova'],
      patterns: [],
    });
    const dockerfileTemplate: Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileTemplate = applyScaffoldVersionReplacements(templateContents[0] ?? '');
    const composeContent: Lib_DockerPackaging_Runner_GenerateForTarget_ComposeContent = templateContents[1] ?? '';
    const packageJsonRaw: Lib_DockerPackaging_Runner_GenerateForTarget_PackageJsonRaw = templateContents[2] ?? '';
    const parsedPackageJson: Lib_DockerPackaging_Runner_GenerateForTarget_ParsedPackageJson = JSON.parse(packageJsonRaw);

    if (isPlainObject(parsedPackageJson) === false) {
      throw new Error(`The workspace package manifest at "${packageJsonPath}" must contain a JSON object.`);
    }

    const packageJson: Lib_DockerPackaging_Runner_GenerateForTarget_PackageJson = parsedPackageJson;
    const rawScripts: Lib_DockerPackaging_Runner_GenerateForTarget_RawScripts = packageJson['scripts'];
    const scripts: Lib_DockerPackaging_Runner_GenerateForTarget_Scripts = {};

    if (rawScripts !== undefined && isPlainObject(rawScripts) === false) {
      throw new Error(`The "scripts" field in "${packageJsonPath}" must contain a JSON object.`);
    }

    if (isPlainObject(rawScripts) === true) {
      for (const scriptEntry of Object.entries(rawScripts)) {
        const scriptValue: Lib_DockerPackaging_Runner_GenerateForTarget_ScriptValue = scriptEntry[1];

        if (typeof scriptValue !== 'string') {
          throw new Error(`Every package script in "${packageJsonPath}" must be a string.`);
        }

        Reflect.set(scripts, scriptEntry[0], scriptValue);
      }
    }

    Reflect.set(packageJson, 'scripts', Runner.mergeScripts(scripts));

    const runtimeDirectives: Lib_DockerPackaging_Runner_GenerateForTarget_RuntimeDirectives = Runner.buildRuntimeDirectives(options['profile']);
    const buildDirectory: Lib_DockerPackaging_Runner_GenerateForTarget_BuildDirectory = options['buildDirectory'] ?? 'build';
    const dockerfileContent: Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileContent = dockerfileTemplate
      .replace(
        new RegExp(LIB_REGEX_PLACEHOLDER_DOCKER_RUNTIME_DIRECTIVES.source, 'g'),
        runtimeDirectives,
      )
      .replace(
        new RegExp(LIB_REGEX_PLACEHOLDER_DOCKER_BUILD_DIRECTORY.source, 'g'),
        buildDirectory,
      );
    const packageJsonContent: Lib_DockerPackaging_Runner_GenerateForTarget_PackageJsonContent = `${JSON.stringify(packageJson, null, 2)}\n`;
    const isDryRun: Lib_DockerPackaging_Runner_GenerateForTarget_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Lib_DockerPackaging_Runner_GenerateForTarget_IsReplaceFile = options['replaceFile'] === true;
    const reportFiles: Lib_DockerPackaging_Runner_GenerateForTarget_ReportFiles = options['reportFiles'] !== false;

    if (isDryRun === true) {
      return;
    }

    await Promise.all([
      saveGeneratedFile(join(options['workspaceDirectory'], '.dockerignore'), dockerignoreContent, isReplaceFile, {
        command: 'nova generate must-haves ignore-files',
        docsSlug: 'cli/generators/must-haves/ignore-files',
        mode: 'strict',
      }, reportFiles),
      saveGeneratedFile(join(options['workspaceDirectory'], 'Dockerfile'), dockerfileContent, isReplaceFile, undefined, reportFiles),
      saveGeneratedFile(join(options['workspaceDirectory'], 'compose.yml'), composeContent, isReplaceFile, undefined, reportFiles),
      saveGeneratedFile(packageJsonPath, packageJsonContent, isReplaceFile, undefined, reportFiles),
    ]);

    return;
  }

  /**
   * Lib - Docker Packaging - Build Runtime Directives.
   *
   * Adds a port and connection health check only to the HTTP profile; background
   * workloads intentionally receive neither because they do not accept traffic.
   *
   * @param {Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Profile} profile - Profile.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Returns}
   *
   * @since 0.32.0
   */
  private static buildRuntimeDirectives(profile: Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Profile): Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Returns {
    if (profile !== 'http-service') {
      return '';
    }

    const lines: Lib_DockerPackaging_Runner_BuildRuntimeDirectives_Lines = [
      'EXPOSE 3000',
      'HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\',
      '  CMD ["wget", "--spider", "--quiet", "http://127.0.0.1:3000/"]',
    ];

    return `\n${lines.join('\n')}`;
  }

  /**
   * Lib - Docker Packaging - Merge Scripts.
   *
   * Inserts the canonical deploy group before clean while preserving every
   * unrelated script and any additional deploy steps owned by the scaffold.
   *
   * @param {Lib_DockerPackaging_Runner_MergeScripts_Scripts} scripts - Scripts.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_MergeScripts_Returns}
   *
   * @since 0.32.0
   */
  private static mergeScripts(scripts: Lib_DockerPackaging_Runner_MergeScripts_Scripts): Lib_DockerPackaging_Runner_MergeScripts_Returns {
    const entries: Lib_DockerPackaging_Runner_MergeScripts_Entries = Object.entries(scripts).filter((scriptEntry) => scriptEntry[0] !== 'deploy' && scriptEntry[0].startsWith('deploy:') === false);
    const deployEntries: Lib_DockerPackaging_Runner_MergeScripts_DeployEntries = Object.entries(scripts).filter((scriptEntry) => scriptEntry[0] !== 'deploy:container' && scriptEntry[0].startsWith('deploy:') === true);
    const merged: Lib_DockerPackaging_Runner_MergeScripts_Merged = {};
    let isDeployInserted: Lib_DockerPackaging_Runner_MergeScripts_IsDeployInserted = false;

    for (const scriptEntry of entries) {
      if (scriptEntry[0] === 'clean' && isDeployInserted === false) {
        Reflect.set(merged, 'deploy', 'nova utility run-scripts --sequential --node-env production "deploy:*"');
        Reflect.set(merged, 'deploy:container', 'docker compose up --build --detach');

        for (const deployEntry of deployEntries) {
          Reflect.set(merged, deployEntry[0], deployEntry[1]);
        }

        isDeployInserted = true;
      }

      Reflect.set(merged, scriptEntry[0], scriptEntry[1]);
    }

    if (isDeployInserted === false) {
      Reflect.set(merged, 'deploy', 'nova utility run-scripts --sequential --node-env production "deploy:*"');
      Reflect.set(merged, 'deploy:container', 'docker compose up --build --detach');

      for (const deployEntry of deployEntries) {
        Reflect.set(merged, deployEntry[0], deployEntry[1]);
      }
    }

    return merged;
  }
}
