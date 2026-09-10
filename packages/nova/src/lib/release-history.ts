import { promises as fs } from 'node:fs';
import { join, resolve } from 'node:path';

import {
  LIB_REGEX_PATTERN_CHANGELOG_CALVER_HEADING,
  LIB_REGEX_PATTERN_CHANGELOG_NUMERIC_HEADING,
  LIB_REGEX_PATTERN_CHANGELOG_SEMVER_HEADING,
} from './regex.js';

import type {
  Lib_ReleaseHistory_Runner_ValidateStrategy_CalverPaths,
  Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogFiles,
  Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogPath,
  Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogPaths,
  Lib_ReleaseHistory_Runner_ValidateStrategy_Config,
  Lib_ReleaseHistory_Runner_ValidateStrategy_ConfiguredStrategy,
  Lib_ReleaseHistory_Runner_ValidateStrategy_Content,
  Lib_ReleaseHistory_Runner_ValidateStrategy_CurrentDirectory,
  Lib_ReleaseHistory_Runner_ValidateStrategy_DetectedPaths,
  Lib_ReleaseHistory_Runner_ValidateStrategy_DetectedStrategy,
  Lib_ReleaseHistory_Runner_ValidateStrategy_Lines,
  Lib_ReleaseHistory_Runner_ValidateStrategy_MixedMessageLines,
  Lib_ReleaseHistory_Runner_ValidateStrategy_Returns,
  Lib_ReleaseHistory_Runner_ValidateStrategy_SemverPaths,
  Lib_ReleaseHistory_Runner_ValidateStrategy_WorkspaceConfig,
  Lib_ReleaseHistory_Runner_ValidateStrategy_WorkspacePath,
  Lib_ReleaseHistory_Runner_ValidateStrategy_WorkspacePolicy,
  Lib_ReleaseHistory_Runner_ValidateStrategy_Workspaces,
} from '../types/lib/release-history.d.ts';

/**
 * Lib - Release History.
 *
 * Reads Nova-managed changelogs to identify the version strategy already recorded
 * by a project and prevents configuration from contradicting that history.
 *
 * @since 0.26.0
 */
export class Runner {
  /**
   * Lib - Release History - Validate Strategy.
   *
   * Scans the root and every non-freezable workspace changelog. Returns the
   * detected strategy, or undefined when the project has no release history.
   *
   * @param {Lib_ReleaseHistory_Runner_ValidateStrategy_Config}           config           - Config.
   * @param {Lib_ReleaseHistory_Runner_ValidateStrategy_CurrentDirectory} currentDirectory - Current directory.
   *
   * @returns {Lib_ReleaseHistory_Runner_ValidateStrategy_Returns}
   *
   * @since 0.26.0
   */
  public static async validateStrategy(config: Lib_ReleaseHistory_Runner_ValidateStrategy_Config, currentDirectory: Lib_ReleaseHistory_Runner_ValidateStrategy_CurrentDirectory): Lib_ReleaseHistory_Runner_ValidateStrategy_Returns {
    const configuredStrategy: Lib_ReleaseHistory_Runner_ValidateStrategy_ConfiguredStrategy = (config['settings'] !== undefined && config['settings']['versionStrategy'] !== undefined) ? config['settings']['versionStrategy'] : 'semver';
    const workspaces: Lib_ReleaseHistory_Runner_ValidateStrategy_Workspaces = config['workspaces'] ?? {};
    const changelogPaths: Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogPaths = new Set([join(currentDirectory, 'CHANGELOG.md')]);

    for (const workspace of Object.entries(workspaces)) {
      const workspacePath: Lib_ReleaseHistory_Runner_ValidateStrategy_WorkspacePath = workspace[0];
      const workspaceConfig: Lib_ReleaseHistory_Runner_ValidateStrategy_WorkspaceConfig = workspace[1];
      const workspacePolicy: Lib_ReleaseHistory_Runner_ValidateStrategy_WorkspacePolicy = workspaceConfig['policy'];

      if (workspacePolicy === 'freezable') {
        continue;
      }

      const changelogPath: Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogPath = resolve(currentDirectory, workspacePath, 'CHANGELOG.md');

      changelogPaths.add(changelogPath);
    }

    const changelogFiles: Lib_ReleaseHistory_Runner_ValidateStrategy_ChangelogFiles = await Promise.all([...changelogPaths].map(async (changelogPath) => {
      let content: Lib_ReleaseHistory_Runner_ValidateStrategy_Content = undefined;

      try {
        content = await fs.readFile(changelogPath, 'utf-8');
      } catch (error) {
        if (
          typeof error === 'object'
          && error !== null
          && 'code' in error
          && error.code === 'ENOENT'
        ) {
          return undefined;
        }

        throw new Error(`Unable to read release history from "${changelogPath}".`);
      }

      return {
        path: changelogPath,
        content,
      };
    }));
    const semverPaths: Lib_ReleaseHistory_Runner_ValidateStrategy_SemverPaths = new Set();
    const calverPaths: Lib_ReleaseHistory_Runner_ValidateStrategy_CalverPaths = new Set();

    for (const changelogFile of changelogFiles) {
      if (changelogFile === undefined) {
        continue;
      }

      const lines: Lib_ReleaseHistory_Runner_ValidateStrategy_Lines = changelogFile['content'].split('\n');

      for (const line of lines) {
        if (LIB_REGEX_PATTERN_CHANGELOG_SEMVER_HEADING.test(line) === true) {
          semverPaths.add(changelogFile['path']);

          continue;
        }

        if (LIB_REGEX_PATTERN_CHANGELOG_CALVER_HEADING.test(line) === true) {
          calverPaths.add(changelogFile['path']);

          continue;
        }

        if (LIB_REGEX_PATTERN_CHANGELOG_NUMERIC_HEADING.test(line) === true) {
          throw new Error(`Unsupported release heading "${line}" in "${changelogFile['path']}". Use Nova's SemVer or CalVer changelog format.`);
        }
      }
    }

    if (semverPaths.size > 0 && calverPaths.size > 0) {
      const mixedMessageLines: Lib_ReleaseHistory_Runner_ValidateStrategy_MixedMessageLines = [
        'Release history mixes SemVer and CalVer headings.',
        `SemVer: ${[...semverPaths].join(', ')}`,
        `CalVer: ${[...calverPaths].join(', ')}`,
        'Keep one version strategy before running Nova.',
      ];

      throw new Error(mixedMessageLines.join('\n'));
    }

    let detectedStrategy: Lib_ReleaseHistory_Runner_ValidateStrategy_DetectedStrategy = undefined;
    let detectedPaths: Lib_ReleaseHistory_Runner_ValidateStrategy_DetectedPaths = undefined;

    if (semverPaths.size > 0) {
      detectedStrategy = 'semver';
      detectedPaths = semverPaths;
    } else if (calverPaths.size > 0) {
      detectedStrategy = 'calver';
      detectedPaths = calverPaths;
    }

    if (
      detectedStrategy !== undefined
      && detectedPaths !== undefined
      && detectedStrategy !== configuredStrategy
    ) {
      throw new Error(`Configured version strategy "${configuredStrategy}" conflicts with existing ${detectedStrategy} release history in ${[...detectedPaths].join(', ')}. Set settings.versionStrategy to "${detectedStrategy}".`);
    }

    return detectedStrategy;
  }
}
