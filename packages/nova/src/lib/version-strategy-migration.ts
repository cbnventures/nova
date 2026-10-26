import { promises as fs } from 'node:fs';
import { basename, join, resolve } from 'node:path';

import {
  LIB_REGEX_ANDROID_GRADLE_VERSION_CODE,
  LIB_REGEX_ANDROID_GRADLE_VERSION_NAME,
  LIB_REGEX_APPLE_PBXPROJ_CURRENT_PROJECT_VERSION,
  LIB_REGEX_APPLE_PBXPROJ_MARKETING_VERSION,
  LIB_REGEX_APPLE_XCODEGEN_CURRENT_PROJECT_VERSION,
  LIB_REGEX_APPLE_XCODEGEN_MARKETING_VERSION,
} from './regex.js';
import { Runner as LibReleaseHistory } from './release-history.js';
import { isPlainObject, pathExists } from './utility.js';
import { Runner as LibVersionContract } from './version-contract.js';

import type {
  Lib_VersionStrategyMigration_Runner_Apply_Plan,
  Lib_VersionStrategyMigration_Runner_Apply_Returns,
  Lib_VersionStrategyMigration_Runner_Apply_Write,
  Lib_VersionStrategyMigration_Runner_Prepare_AndroidContent,
  Lib_VersionStrategyMigration_Runner_Prepare_AndroidFilePaths,
  Lib_VersionStrategyMigration_Runner_Prepare_AndroidUpdatedContent,
  Lib_VersionStrategyMigration_Runner_Prepare_AppleBuildPattern,
  Lib_VersionStrategyMigration_Runner_Prepare_AppleDirectoryEntries,
  Lib_VersionStrategyMigration_Runner_Prepare_AppleHasBuild,
  Lib_VersionStrategyMigration_Runner_Prepare_AppleHasMarketing,
  Lib_VersionStrategyMigration_Runner_Prepare_AppleIsXcodeGen,
  Lib_VersionStrategyMigration_Runner_Prepare_AppleMarketingPattern,
  Lib_VersionStrategyMigration_Runner_Prepare_AppleUpdatedContent,
  Lib_VersionStrategyMigration_Runner_Prepare_AppleVersionFileContent,
  Lib_VersionStrategyMigration_Runner_Prepare_AppleVersionFilePaths,
  Lib_VersionStrategyMigration_Runner_Prepare_Config,
  Lib_VersionStrategyMigration_Runner_Prepare_CurrentStrategy,
  Lib_VersionStrategyMigration_Runner_Prepare_CurrentVersion,
  Lib_VersionStrategyMigration_Runner_Prepare_Date,
  Lib_VersionStrategyMigration_Runner_Prepare_DependencyFields,
  Lib_VersionStrategyMigration_Runner_Prepare_DependencyName,
  Lib_VersionStrategyMigration_Runner_Prepare_DependencyValue,
  Lib_VersionStrategyMigration_Runner_Prepare_Manifest,
  Lib_VersionStrategyMigration_Runner_Prepare_ManifestContent,
  Lib_VersionStrategyMigration_Runner_Prepare_ManifestPath,
  Lib_VersionStrategyMigration_Runner_Prepare_Manifests,
  Lib_VersionStrategyMigration_Runner_Prepare_MarketingValue,
  Lib_VersionStrategyMigration_Runner_Prepare_MarketingValues,
  Lib_VersionStrategyMigration_Runner_Prepare_NewVersion,
  Lib_VersionStrategyMigration_Runner_Prepare_NextStrategy,
  Lib_VersionStrategyMigration_Runner_Prepare_ParsedManifest,
  Lib_VersionStrategyMigration_Runner_Prepare_PendingDirectory,
  Lib_VersionStrategyMigration_Runner_Prepare_PendingEntries,
  Lib_VersionStrategyMigration_Runner_Prepare_PendingFiles,
  Lib_VersionStrategyMigration_Runner_Prepare_ProjectRoot,
  Lib_VersionStrategyMigration_Runner_Prepare_ReleaseHistoryStrategy,
  Lib_VersionStrategyMigration_Runner_Prepare_Returns,
  Lib_VersionStrategyMigration_Runner_Prepare_TypedDependencyField,
  Lib_VersionStrategyMigration_Runner_Prepare_UpdatedContent,
  Lib_VersionStrategyMigration_Runner_Prepare_UpdatedDependencies,
  Lib_VersionStrategyMigration_Runner_Prepare_UpdatedManifest,
  Lib_VersionStrategyMigration_Runner_Prepare_VersionCodePattern,
  Lib_VersionStrategyMigration_Runner_Prepare_VersionCodes,
  Lib_VersionStrategyMigration_Runner_Prepare_VersionNamePattern,
  Lib_VersionStrategyMigration_Runner_Prepare_VersionNames,
  Lib_VersionStrategyMigration_Runner_Prepare_Workspace,
  Lib_VersionStrategyMigration_Runner_Prepare_WorkspaceDirectory,
  Lib_VersionStrategyMigration_Runner_Prepare_WorkspaceEntry,
  Lib_VersionStrategyMigration_Runner_Prepare_WorkspaceName,
  Lib_VersionStrategyMigration_Runner_Prepare_WorkspacePath,
  Lib_VersionStrategyMigration_Runner_Prepare_Workspaces,
  Lib_VersionStrategyMigration_Runner_Prepare_Writes,
  Lib_VersionStrategyMigration_Runner_Prepare_XcodeGenPath,
} from '../types/lib/version-strategy-migration.d.ts';

/**
 * Lib - Version Strategy Migration.
 *
 * Plans and applies a pre-release SemVer or CalVer strategy switch without
 * leaving package manifests, exact internal pins, or native version mirrors
 * on the previous strategy.
 *
 * @since 0.34.0
 */
export class Runner {
  /**
   * Lib - Version Strategy Migration - Prepare.
   *
   * Validates that the project has no release history or pending changelog
   * entries, then prepares every required file update without writing it.
   *
   * @param {Lib_VersionStrategyMigration_Runner_Prepare_ProjectRoot}     projectRoot     - Project root.
   * @param {Lib_VersionStrategyMigration_Runner_Prepare_Config}          config          - Config.
   * @param {Lib_VersionStrategyMigration_Runner_Prepare_CurrentStrategy} currentStrategy - Current strategy.
   * @param {Lib_VersionStrategyMigration_Runner_Prepare_NextStrategy}    nextStrategy    - Next strategy.
   * @param {Lib_VersionStrategyMigration_Runner_Prepare_Date}            date            - Date.
   *
   * @returns {Lib_VersionStrategyMigration_Runner_Prepare_Returns}
   *
   * @since 0.34.0
   */
  public static async prepare(projectRoot: Lib_VersionStrategyMigration_Runner_Prepare_ProjectRoot, config: Lib_VersionStrategyMigration_Runner_Prepare_Config, currentStrategy: Lib_VersionStrategyMigration_Runner_Prepare_CurrentStrategy, nextStrategy: Lib_VersionStrategyMigration_Runner_Prepare_NextStrategy, date: Lib_VersionStrategyMigration_Runner_Prepare_Date = new Date()): Lib_VersionStrategyMigration_Runner_Prepare_Returns {
    if (currentStrategy === nextStrategy) {
      return {
        currentStrategy,
        nextStrategy,
        writes: [],
      };
    }

    const releaseHistoryStrategy: Lib_VersionStrategyMigration_Runner_Prepare_ReleaseHistoryStrategy = await LibReleaseHistory.validateStrategy({
      ...config,
      settings: {
        ...config['settings'],
        versionStrategy: currentStrategy,
      },
    }, projectRoot);

    if (releaseHistoryStrategy !== undefined) {
      throw new Error(`Version strategy cannot change from "${currentStrategy}" to "${nextStrategy}" after ${releaseHistoryStrategy} release history exists.`);
    }

    const pendingDirectory: Lib_VersionStrategyMigration_Runner_Prepare_PendingDirectory = join(projectRoot, '.changelog');
    let pendingFiles: Lib_VersionStrategyMigration_Runner_Prepare_PendingFiles = [];

    try {
      pendingFiles = await fs.readdir(pendingDirectory, {
        withFileTypes: true,
      });
    } catch (error) {
      if (
        typeof error !== 'object'
        || error === null
        || 'code' in error === false
        || error.code !== 'ENOENT'
      ) {
        throw new Error(`Unable to inspect pending changelog entries in "${pendingDirectory}".`);
      }
    }

    const pendingEntries: Lib_VersionStrategyMigration_Runner_Prepare_PendingEntries = pendingFiles
      .filter((entry) => (
        entry.isFile() === true
        && entry.name.endsWith('.md') === true
        && entry.name.toLowerCase() !== 'readme.md'
      ))
      .map((entry) => entry.name)
      .sort();

    if (pendingEntries.length > 0) {
      throw new Error(`Version strategy cannot change while pending changelog entries exist: ${pendingEntries.join(', ')}.`);
    }

    const workspaces: Lib_VersionStrategyMigration_Runner_Prepare_Workspaces = config['workspaces'] ?? {};
    const manifests: Lib_VersionStrategyMigration_Runner_Prepare_Manifests = [];

    for (const rawWorkspaceEntry of Object.entries(workspaces)) {
      const workspaceEntry: Lib_VersionStrategyMigration_Runner_Prepare_WorkspaceEntry = rawWorkspaceEntry;
      const workspacePath: Lib_VersionStrategyMigration_Runner_Prepare_WorkspacePath = workspaceEntry[0];
      const workspace: Lib_VersionStrategyMigration_Runner_Prepare_Workspace = workspaceEntry[1];
      const workspaceDirectory: Lib_VersionStrategyMigration_Runner_Prepare_WorkspaceDirectory = resolve(projectRoot, workspacePath);
      const manifestPath: Lib_VersionStrategyMigration_Runner_Prepare_ManifestPath = join(workspaceDirectory, 'package.json');
      let manifestContent: Lib_VersionStrategyMigration_Runner_Prepare_ManifestContent = undefined;

      try {
        manifestContent = await fs.readFile(manifestPath, 'utf-8');
      } catch {
        throw new Error(`Unable to read workspace manifest "${manifestPath}" before changing version strategy.`);
      }

      let manifest: Lib_VersionStrategyMigration_Runner_Prepare_Manifest = undefined;

      try {
        const parsedManifest: Lib_VersionStrategyMigration_Runner_Prepare_ParsedManifest = JSON.parse(manifestContent);

        if (isPlainObject(parsedManifest) === false) {
          throw new Error('Expected an object.');
        }

        manifest = parsedManifest;
      } catch {
        throw new Error(`Unable to parse workspace manifest "${manifestPath}" before changing version strategy.`);
      }

      const workspaceName: Lib_VersionStrategyMigration_Runner_Prepare_WorkspaceName = (typeof manifest['name'] === 'string') ? manifest['name'] : undefined;
      const currentVersion: Lib_VersionStrategyMigration_Runner_Prepare_CurrentVersion = (typeof manifest['version'] === 'string') ? manifest['version'] : undefined;

      if (workspaceName === undefined || currentVersion === undefined) {
        throw new Error(`Workspace manifest "${manifestPath}" must define string "name" and "version" fields before changing version strategy.`);
      }

      LibVersionContract.validate(currentVersion, workspace['policy'], currentStrategy, manifestPath, date);

      const newVersion: Lib_VersionStrategyMigration_Runner_Prepare_NewVersion = LibVersionContract.getInitialVersion(workspace['policy'], nextStrategy, date);

      manifests.push({
        workspaceDirectory,
        workspaceName,
        workspace,
        path: manifestPath,
        content: manifestContent,
        manifest,
        currentVersion,
        newVersion,
      });
    }

    const writes: Lib_VersionStrategyMigration_Runner_Prepare_Writes = [];
    const dependencyFields: Lib_VersionStrategyMigration_Runner_Prepare_DependencyFields = [
      'dependencies',
      'devDependencies',
      'optionalDependencies',
      'peerDependencies',
    ];

    for (const manifestEntry of manifests) {
      const updatedManifest: Lib_VersionStrategyMigration_Runner_Prepare_UpdatedManifest = structuredClone(manifestEntry['manifest']);

      Reflect.set(updatedManifest, 'version', manifestEntry['newVersion']);

      for (const dependencyField of dependencyFields) {
        const typedDependencyField: Lib_VersionStrategyMigration_Runner_Prepare_TypedDependencyField = dependencyField;
        const dependencyValue: Lib_VersionStrategyMigration_Runner_Prepare_DependencyValue = updatedManifest[typedDependencyField];

        if (isPlainObject(dependencyValue) === false) {
          continue;
        }

        const updatedDependencies: Lib_VersionStrategyMigration_Runner_Prepare_UpdatedDependencies = dependencyValue;

        for (const dependencyManifest of manifests) {
          const dependencyName: Lib_VersionStrategyMigration_Runner_Prepare_DependencyName = dependencyManifest['workspaceName'];

          if (updatedDependencies[dependencyName] === dependencyManifest['currentVersion']) {
            Reflect.set(updatedDependencies, dependencyName, dependencyManifest['newVersion']);
          }
        }
      }

      const updatedContent: Lib_VersionStrategyMigration_Runner_Prepare_UpdatedContent = `${JSON.stringify(updatedManifest, null, 2)}\n`;

      if (updatedContent !== manifestEntry['content']) {
        writes.push({
          path: manifestEntry['path'],
          content: updatedContent,
        });
      }

      if (manifestEntry['workspace']['policy'] === 'freezable') {
        continue;
      }

      const androidFilePaths: Lib_VersionStrategyMigration_Runner_Prepare_AndroidFilePaths = [
        join(manifestEntry['workspaceDirectory'], 'app', 'build.gradle.kts'),
        join(manifestEntry['workspaceDirectory'], 'app', 'build.gradle'),
      ];

      for (const androidFilePath of androidFilePaths) {
        if (await pathExists(androidFilePath) === false) {
          continue;
        }

        const androidContent: Lib_VersionStrategyMigration_Runner_Prepare_AndroidContent = await fs.readFile(androidFilePath, 'utf-8');
        const versionNamePattern: Lib_VersionStrategyMigration_Runner_Prepare_VersionNamePattern = new RegExp(LIB_REGEX_ANDROID_GRADLE_VERSION_NAME.source, 'gm');
        const versionCodePattern: Lib_VersionStrategyMigration_Runner_Prepare_VersionCodePattern = new RegExp(LIB_REGEX_ANDROID_GRADLE_VERSION_CODE.source, 'gm');
        const versionNames: Lib_VersionStrategyMigration_Runner_Prepare_VersionNames = [...androidContent.matchAll(versionNamePattern)].map((match) => match[3]).filter((value) => value !== undefined);
        const versionCodes: Lib_VersionStrategyMigration_Runner_Prepare_VersionCodes = [...androidContent.matchAll(versionCodePattern)].map((match) => match[2]).filter((value) => value !== undefined);

        if (versionNames.length === 0 && versionCodes.length === 0) {
          continue;
        }

        if (
          versionNames.length === 0
          || versionCodes.length === 0
          || versionNames.some((value) => value !== manifestEntry['currentVersion']) === true
        ) {
          throw new Error(`Android version fields in "${androidFilePath}" must include versionName and versionCode, with versionName matching package.json version "${manifestEntry['currentVersion']}".`);
        }

        const androidUpdatedContent: Lib_VersionStrategyMigration_Runner_Prepare_AndroidUpdatedContent = androidContent.replace(versionNamePattern, `$1$2${manifestEntry['newVersion']}$4$5`);

        writes.push({
          path: androidFilePath,
          content: androidUpdatedContent,
        });
      }

      const appleDirectoryEntries: Lib_VersionStrategyMigration_Runner_Prepare_AppleDirectoryEntries = await fs.readdir(manifestEntry['workspaceDirectory'], {
        withFileTypes: true,
      });
      const appleVersionFilePaths: Lib_VersionStrategyMigration_Runner_Prepare_AppleVersionFilePaths = [];
      const xcodeGenPath: Lib_VersionStrategyMigration_Runner_Prepare_XcodeGenPath = join(manifestEntry['workspaceDirectory'], 'project.yml');

      if (await pathExists(xcodeGenPath) === true) {
        appleVersionFilePaths.push(xcodeGenPath);
      } else {
        for (const directoryEntry of appleDirectoryEntries) {
          if (directoryEntry.isDirectory() === true && directoryEntry.name.endsWith('.xcodeproj') === true) {
            appleVersionFilePaths.push(join(manifestEntry['workspaceDirectory'], directoryEntry.name, 'project.pbxproj'));
          }
        }
      }

      for (const appleVersionFilePath of appleVersionFilePaths) {
        const appleVersionFileContent: Lib_VersionStrategyMigration_Runner_Prepare_AppleVersionFileContent = await fs.readFile(appleVersionFilePath, 'utf-8');
        const appleIsXcodeGen: Lib_VersionStrategyMigration_Runner_Prepare_AppleIsXcodeGen = basename(appleVersionFilePath) === 'project.yml';
        const appleMarketingPattern: Lib_VersionStrategyMigration_Runner_Prepare_AppleMarketingPattern = new RegExp((appleIsXcodeGen === true) ? LIB_REGEX_APPLE_XCODEGEN_MARKETING_VERSION.source : LIB_REGEX_APPLE_PBXPROJ_MARKETING_VERSION.source, (appleIsXcodeGen === true) ? 'gm' : 'g');
        const appleBuildPattern: Lib_VersionStrategyMigration_Runner_Prepare_AppleBuildPattern = new RegExp((appleIsXcodeGen === true) ? LIB_REGEX_APPLE_XCODEGEN_CURRENT_PROJECT_VERSION.source : LIB_REGEX_APPLE_PBXPROJ_CURRENT_PROJECT_VERSION.source, (appleIsXcodeGen === true) ? 'gm' : 'g');
        const marketingValues: Lib_VersionStrategyMigration_Runner_Prepare_MarketingValues = [...appleVersionFileContent.matchAll(appleMarketingPattern)].map((match) => {
          const marketingValue: Lib_VersionStrategyMigration_Runner_Prepare_MarketingValue = match[(appleIsXcodeGen === true) ? 3 : 2];

          return (marketingValue === undefined) ? undefined : marketingValue.trim();
        }).filter((value) => value !== undefined);
        const appleHasMarketing: Lib_VersionStrategyMigration_Runner_Prepare_AppleHasMarketing = marketingValues.length > 0;
        const appleHasBuild: Lib_VersionStrategyMigration_Runner_Prepare_AppleHasBuild = appleBuildPattern.test(appleVersionFileContent);

        if (appleHasMarketing === false && appleHasBuild === false) {
          continue;
        }

        if (appleHasMarketing !== appleHasBuild || marketingValues.some((value) => value !== manifestEntry['currentVersion']) === true) {
          throw new Error(`Apple version fields in "${appleVersionFilePath}" must include MARKETING_VERSION and CURRENT_PROJECT_VERSION, with MARKETING_VERSION matching package.json version "${manifestEntry['currentVersion']}".`);
        }

        const appleUpdatedContent: Lib_VersionStrategyMigration_Runner_Prepare_AppleUpdatedContent = appleVersionFileContent.replace(appleMarketingPattern, (appleIsXcodeGen === true) ? `$1$2${manifestEntry['newVersion']}$4$5` : `$1${manifestEntry['newVersion']}$3`);

        writes.push({
          path: appleVersionFilePath,
          content: appleUpdatedContent,
        });
      }
    }

    return {
      currentStrategy,
      nextStrategy,
      writes,
    };
  }

  /**
   * Lib - Version Strategy Migration - Apply.
   *
   * Writes every file in a fully validated migration plan.
   * Preparation guarantees the complete set is safe before this step begins.
   *
   * @param {Lib_VersionStrategyMigration_Runner_Apply_Plan} plan - Plan.
   *
   * @returns {Lib_VersionStrategyMigration_Runner_Apply_Returns}
   *
   * @since 0.34.0
   */
  public static async apply(plan: Lib_VersionStrategyMigration_Runner_Apply_Plan): Lib_VersionStrategyMigration_Runner_Apply_Returns {
    for (const rawWrite of plan['writes']) {
      const write: Lib_VersionStrategyMigration_Runner_Apply_Write = rawWrite;

      await fs.writeFile(write['path'], write['content'], 'utf-8');
    }

    return;
  }
}
