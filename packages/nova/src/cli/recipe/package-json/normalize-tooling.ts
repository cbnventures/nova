import {
  dirname,
  join,
} from 'node:path';

import chalk from 'chalk';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
import { orderPackageScripts } from '../../../lib/package-scripts.js';
import {
  isEmpty,
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  pathExists,
  saveWorkspaceManifest,
} from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_CanonicalRootScriptEntries,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_CanonicalRootScripts,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_CurrentPackageScripts,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_CurrentScriptNames,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_FileContents,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_FilePath,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_HasBindingGyp,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_IsNovaBootstrap,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_KeptWorkspaceDispatchers,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_LegacyRootScripts,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_LegacyScriptCommand,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_LegacyScriptName,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Manifest,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_MigratedRootScripts,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_MissingCanonicalRootScriptEntries,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_NormalizedPackageScriptEntries,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_NormalizedPackageScripts,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_NormalizedScriptCommand,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_NormalizedScriptName,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_OrderedScriptNames,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_OrderedScripts,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageAllowScripts,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageConfig,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageGypfile,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageScripts,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageWorkspaces,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ParentRunsTree,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ParentScriptName,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PortableScriptCommand,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PortableScriptCommandsChanged,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Returns,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_RunnerPrefix,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ScriptCommand,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ScriptName,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ScriptOrderChanged,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ScriptRunnerPrefix,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_SingleQuotedPattern,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_TypedCanonicalRootScriptEntry,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_TypedLegacyRootScriptEntry,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_TypedNormalizedPackageScriptEntry,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Workspace,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_ConfigRecipes,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_ConfigRecipesPackageJson,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_CurrentDirectory,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligibleEntry,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligiblePath,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligibleWorkspaceRecipes,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligibleWorkspaces,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsAtProjectRoot,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsDryRun,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsReplaceFile,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Options,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_ReplaceFileNotice,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Returns,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkingFile,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkingFileWorkspaces,
  Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Workspaces,
} from '../../../types/cli/recipe/package-json/normalize-tooling.d.ts';

/**
 * CLI - Recipe - package.json - Normalize Tooling.
 *
 * Adds missing root scripts, orders existing scripts, and normalizes
 * allowScripts, gypfile, config, and workspaces fields based on workspace role.
 * Existing script commands remain owned by the project.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * CLI - Recipe - package.json - Normalize Tooling - Run.
   *
   * Loads nova.config.json, filters eligible workspaces, then normalizes tooling fields in
   * each manifest. Supports dry-run and replace-file.
   *
   * @param {Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Returns}
   *
   * @since 0.14.0
   */
  public static async run(options: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Options): Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Returns {
    const currentDirectory: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const workingFile: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkingFile = await new LibNovaConfig().load();
    const workingFileWorkspaces: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_WorkingFileWorkspaces = Object.entries(workingFile['workspaces'] ?? {});

    if (workingFileWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No workspaces detected in the "nova.config.json" file.');

      return;
    }

    const configRecipes: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_ConfigRecipes = workingFile['recipes'];
    const configRecipesPackageJson: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_ConfigRecipesPackageJson = (configRecipes !== undefined) ? configRecipes['package-json'] : undefined;

    // Filter workspaces that have the recipe enabled.
    const eligibleWorkspaces: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligibleWorkspaces = workingFileWorkspaces.filter((workspace) => {
      const eligiblePath: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligiblePath = workspace[0];

      if (configRecipesPackageJson === undefined) {
        return false;
      }

      const eligibleWorkspaceRecipes: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligibleWorkspaceRecipes = configRecipesPackageJson[eligiblePath];

      if (eligibleWorkspaceRecipes === undefined) {
        return false;
      }

      const eligibleEntry: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_EligibleEntry = eligibleWorkspaceRecipes['normalize-tooling'];

      if (eligibleEntry === undefined) {
        return false;
      }

      return eligibleEntry['enabled'] === true;
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No workspaces have this recipe enabled.');

      return;
    }

    const workspaces: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Run_Workspaces = await loadWorkspaceManifests({
      projectRoot: currentDirectory,
      workspaces: eligibleWorkspaces,
    });

    if (workspaces.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'workspaces',
      }).warn('Skipping normalize-tooling. No accessible "package.json" files were found for the configured workspaces.');

      return;
    }

    Logger.customize({
      name: 'Runner.run',
      purpose: 'summary',
    }).info(`Prepared ${workspaces.length} workspace "package.json" file(s) for normalize-tooling.`);

    // Handle all workspace "package.json" files.
    for (const workspace of workspaces) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'iteration',
      }).info(`Running normalize-tooling for the "${workspace['manifest']['name']}" workspace ...`);

      await Runner.handle(workspace);

      if (isDryRun === true) {
        continue;
      }

      await saveWorkspaceManifest(workspace, isReplaceFile);
    }

    return;
  }

  /**
   * CLI - Recipe - package.json - Normalize Tooling - Handle.
   *
   * Processes scripts, allowScripts, gypfile, config, and workspaces for one workspace. Adds
   * gypfile when binding.gyp exists and no install scripts.
   *
   * @param {Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Returns}
   *
   * @since 0.14.0
   */
  private static async handle(workspace: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Workspace): Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Returns {
    const fileContents: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_FileContents = workspace['fileContents'];
    const filePath: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_FilePath = workspace['filePath'];
    const manifest: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_Manifest = workspace['manifest'];

    const packageScripts: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageScripts = fileContents['scripts'];
    const packageAllowScripts: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageAllowScripts = fileContents['allowScripts'];
    const packageGypfile: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageGypfile = fileContents['gypfile'];
    const packageConfig: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageConfig = fileContents['config'];
    const packageWorkspaces: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PackageWorkspaces = fileContents['workspaces'];

    const hasBindingGyp: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_HasBindingGyp = await pathExists(join(dirname(filePath), 'binding.gyp'));

    // Sync the "scripts" field.
    if (packageScripts === undefined) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'scripts',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "scripts" as an empty object ...`);

      Reflect.set(fileContents, 'scripts', {});
    }

    const normalizedPackageScripts: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_NormalizedPackageScripts = (isPlainObject(fileContents['scripts']) === true) ? fileContents['scripts'] : {};
    const normalizedPackageScriptEntries: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_NormalizedPackageScriptEntries = Object.entries(normalizedPackageScripts);
    let portableScriptCommandsChanged: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PortableScriptCommandsChanged = false;

    for (const normalizedPackageScriptEntry of normalizedPackageScriptEntries) {
      const typedNormalizedPackageScriptEntry: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_TypedNormalizedPackageScriptEntry = normalizedPackageScriptEntry;
      const normalizedScriptName: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_NormalizedScriptName = typedNormalizedPackageScriptEntry[0];
      const normalizedScriptCommand: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_NormalizedScriptCommand = typedNormalizedPackageScriptEntry[1];

      if (
        typeof normalizedScriptCommand !== 'string'
        || (
          normalizedScriptCommand.includes('nova utility run-scripts') === false
          && normalizedScriptCommand.includes('nova-run-scripts.mjs') === false
        )
      ) {
        continue;
      }

      const singleQuotedPattern: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_SingleQuotedPattern = `'${normalizedScriptName}:*'`;

      if (normalizedScriptCommand.endsWith(singleQuotedPattern) === false) {
        continue;
      }

      const portableScriptCommand: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_PortableScriptCommand = `${normalizedScriptCommand.slice(0, -singleQuotedPattern.length)}"${normalizedScriptName}:*"`;

      Reflect.set(normalizedPackageScripts, normalizedScriptName, portableScriptCommand);

      portableScriptCommandsChanged = true;
    }

    if (portableScriptCommandsChanged === true) {
      Reflect.set(fileContents, 'scripts', normalizedPackageScripts);

      Logger.customize({
        name: 'Runner.handle',
        purpose: 'scripts',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Normalizing package-script patterns for cross-platform shells ...`);
    }

    if (manifest['role'] === 'project') {
      const isNovaBootstrap: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_IsNovaBootstrap = typeof normalizedPackageScripts['dev'] === 'string' && (
        normalizedPackageScripts['dev'].includes('node ./scripts/nova-run-scripts.mjs')
        || normalizedPackageScripts['dev'].includes('node ./scripts/nova-run-workspaces.mjs')
      );
      const runnerPrefix: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_RunnerPrefix = (isNovaBootstrap === true) ? 'node ./scripts/nova-run-workspaces.mjs' : 'nova utility run-workspaces';
      const scriptRunnerPrefix: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ScriptRunnerPrefix = (isNovaBootstrap === true) ? 'node ./scripts/nova-run-scripts.mjs' : 'nova utility run-scripts';
      const canonicalRootScripts: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_CanonicalRootScripts = {
        'dev': `${runnerPrefix} --node-env development dev`,
        'prod': `${runnerPrefix} --node-env production prod`,
        'check': `${runnerPrefix} check`,
        'build': `${runnerPrefix} --node-env production build`,
        'deploy': `${runnerPrefix} --node-env production deploy`,
        'clean': `${runnerPrefix} clean`,
        'changelog': 'nova utility changelog',
        'recipes': 'nova utility run-recipes --replace-file',
      };

      // Root scripts generated before the root became a node in the workspace tree.
      const legacyRootScripts: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_LegacyRootScripts = {
        'dev': `${scriptRunnerPrefix} --parallel --node-env development "dev:*"`,
        'dev:workspaces': `${runnerPrefix} --node-env development dev`,
        'prod': `${scriptRunnerPrefix} --sequential --node-env production "prod:*"`,
        'prod:workspaces': `${runnerPrefix} --node-env production prod`,
        'check': `${scriptRunnerPrefix} --sequential "check:*"`,
        'check:workspaces': `${runnerPrefix} check`,
        'build': `${scriptRunnerPrefix} --sequential --node-env production "build:*"`,
        'build:workspaces': `${runnerPrefix} --node-env production build`,
        'deploy': `${scriptRunnerPrefix} --sequential --node-env production "deploy:*"`,
        'deploy:workspaces': `${runnerPrefix} --node-env production deploy`,
        'clean': `${scriptRunnerPrefix} --parallel "clean:*"`,
        'clean:workspaces': `${runnerPrefix} clean`,
      };
      let migratedRootScripts: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_MigratedRootScripts = false;

      for (const legacyRootScriptEntry of Object.entries(legacyRootScripts)) {
        const typedLegacyRootScriptEntry: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_TypedLegacyRootScriptEntry = legacyRootScriptEntry;
        const legacyScriptName: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_LegacyScriptName = typedLegacyRootScriptEntry[0];
        const legacyScriptCommand: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_LegacyScriptCommand = typedLegacyRootScriptEntry[1];

        // Only exact generated commands move. Customized scripts stay as written.
        if (normalizedPackageScripts[legacyScriptName] !== legacyScriptCommand) {
          continue;
        }

        if (legacyScriptName.endsWith(':workspaces') === true) {
          const parentScriptName: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ParentScriptName = legacyScriptName.slice(0, -':workspaces'.length);
          const parentRunsTree: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ParentRunsTree = String(normalizedPackageScripts[parentScriptName]).includes('run-workspaces');

          // A customized parent may still call this dispatcher, so it stays until the parent runs the tree.
          if (parentRunsTree === false) {
            continue;
          }

          Reflect.deleteProperty(normalizedPackageScripts, legacyScriptName);
        } else {
          Reflect.set(normalizedPackageScripts, legacyScriptName, canonicalRootScripts[legacyScriptName]);
        }

        migratedRootScripts = true;
      }

      if (migratedRootScripts === true) {
        Reflect.set(fileContents, 'scripts', normalizedPackageScripts);

        Logger.customize({
          name: 'Runner.handle',
          purpose: 'scripts',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Moving Nova root scripts onto the workspace tree ...`);
      }

      const keptWorkspaceDispatchers: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_KeptWorkspaceDispatchers = Object.keys(legacyRootScripts).filter((scriptName) => scriptName.endsWith(':workspaces') === true && Reflect.has(normalizedPackageScripts, scriptName) === true);

      for (const keptWorkspaceDispatcher of keptWorkspaceDispatchers) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'scripts',
        }).warn(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Kept customized "${keptWorkspaceDispatcher}". The workspace tree skips it, so move anything it adds into the lifecycle script.`);
      }
      const canonicalRootScriptEntries: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_CanonicalRootScriptEntries = Object.entries(canonicalRootScripts);
      const missingCanonicalRootScriptEntries: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_MissingCanonicalRootScriptEntries = canonicalRootScriptEntries.filter((canonicalRootScriptEntry) => Object.hasOwn(normalizedPackageScripts, canonicalRootScriptEntry[0]) === false);

      if (missingCanonicalRootScriptEntries.length > 0) {
        for (const canonicalRootScriptEntry of missingCanonicalRootScriptEntries) {
          const typedCanonicalRootScriptEntry: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_TypedCanonicalRootScriptEntry = canonicalRootScriptEntry;
          const scriptName: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ScriptName = typedCanonicalRootScriptEntry[0];
          const scriptCommand: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ScriptCommand = typedCanonicalRootScriptEntry[1];

          Reflect.set(normalizedPackageScripts, scriptName, scriptCommand);
        }

        Reflect.set(fileContents, 'scripts', normalizedPackageScripts);

        Logger.customize({
          name: 'Runner.handle',
          purpose: 'scripts',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding missing Nova root workspace scripts ...`);
      }
    }

    if (isPlainObject(fileContents['scripts']) === true) {
      const currentPackageScripts: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_CurrentPackageScripts = fileContents['scripts'];
      const orderedScripts: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_OrderedScripts = orderPackageScripts(currentPackageScripts);
      const currentScriptNames: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_CurrentScriptNames = Object.keys(currentPackageScripts);
      const orderedScriptNames: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_OrderedScriptNames = Object.keys(orderedScripts);
      const scriptOrderChanged: Cli_Recipe_PackageJson_NormalizeTooling_Runner_Handle_ScriptOrderChanged = currentScriptNames.some((scriptName, scriptIndex) => scriptName !== orderedScriptNames[scriptIndex]);

      if (scriptOrderChanged === true) {
        Logger.customize({
          name: 'Runner.handle',
          purpose: 'scripts',
        }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Reordering package scripts using Nova's canonical command contract ...`);

        Reflect.set(fileContents, 'scripts', orderedScripts);
      }
    }

    // Sync the "allowScripts" field (Conditional).
    if (
      packageAllowScripts !== undefined // Package "allowScripts" is defined.
      && isEmpty(packageAllowScripts) === true // Package "allowScripts" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'allowScripts',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "allowScripts" ...`);

      Reflect.deleteProperty(fileContents, 'allowScripts');
    }

    // Sync the "gypfile" field.
    if (
      packageGypfile !== undefined // Package "gypfile" is defined.
      && hasBindingGyp === false // "binding.gyp" file is missing.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'gypfile',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "gypfile". No "binding.gyp" file is found.`);

      Reflect.deleteProperty(fileContents, 'gypfile');
    } else if (
      packageGypfile === undefined // Package "gypfile" is missing.
      && hasBindingGyp === true // "binding.gyp" file is present.
      && (
        isPlainObject(packageScripts) === false // Package "scripts" is not a plain object.
        || (
          isPlainObject(packageScripts) === true // Package "scripts" is a plain object.
          && packageScripts['preinstall'] === undefined // Package "scripts.preinstall" is missing.
          && packageScripts['install'] === undefined // Package "scripts.install" is missing.
        )
      )
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'gypfile',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "gypfile" as the npm default ...`);

      Reflect.set(fileContents, 'gypfile', true);
    }

    // Sync the "config" field.
    if (
      packageConfig !== undefined // Package "config" is defined.
      && isEmpty(packageConfig) === true // Package "config" is empty.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'config',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing empty "config" ...`);

      Reflect.deleteProperty(fileContents, 'config');
    }

    // Sync the "workspaces" field.
    if (
      packageWorkspaces !== undefined // Package "workspaces" is defined.
      && manifest['role'] !== 'project' // Workspace role is not "project".
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'workspaces',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Removing "workspaces". Workspace role "${manifest['role']}" does not allow it.`);

      Reflect.deleteProperty(fileContents, 'workspaces');
    } else if (
      manifest['role'] === 'project' // Workspace role is "project".
      && packageWorkspaces === undefined // Package "workspaces" is missing.
    ) {
      Logger.customize({
        name: 'Runner.handle',
        purpose: 'workspaces',
      }).info(`${chalk.magenta(`"${manifest['name']}" workspace`)} → Adding "workspaces" as an empty array ...`);

      Reflect.set(fileContents, 'workspaces', []);
    }

    return;
  }
}
