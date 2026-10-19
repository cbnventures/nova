import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import chalk from 'chalk';

import { LIB_CONSTANTS_RUN_WORKSPACES_DEFAULT_CONCURRENCY } from './constants.js';
import { Runner as LibCorepack } from './corepack.js';
import { Runner as LibNovaConfig } from './nova-config.js';
import {
  createContextDigest,
  getWorkspaceStateDigest,
  readCacheRecord,
  resolveCacheDirectory,
  writeCacheRecord,
} from './run-workspaces-cache.js';
import { isPlainObject } from './utility.js';

import type {
  Lib_RunWorkspaces_Runner_AddTask_DependencyBuildKey,
  Lib_RunWorkspaces_Runner_AddTask_DependencyWorkspace,
  Lib_RunWorkspaces_Runner_AddTask_ExistingTask,
  Lib_RunWorkspaces_Runner_AddTask_Key,
  Lib_RunWorkspaces_Runner_AddTask_PrerequisiteKey,
  Lib_RunWorkspaces_Runner_AddTask_Returns,
  Lib_RunWorkspaces_Runner_AddTask_Script,
  Lib_RunWorkspaces_Runner_AddTask_Task,
  Lib_RunWorkspaces_Runner_AddTask_Tasks,
  Lib_RunWorkspaces_Runner_AddTask_Workspace,
  Lib_RunWorkspaces_Runner_AddTask_Workspaces,
  Lib_RunWorkspaces_Runner_BuildPlan_Key,
  Lib_RunWorkspaces_Runner_BuildPlan_Returns,
  Lib_RunWorkspaces_Runner_BuildPlan_Script,
  Lib_RunWorkspaces_Runner_BuildPlan_SelectedWorkspaces,
  Lib_RunWorkspaces_Runner_BuildPlan_Skipped,
  Lib_RunWorkspaces_Runner_BuildPlan_Tasks,
  Lib_RunWorkspaces_Runner_BuildPlan_Workspaces,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_CandidateName,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_Dependencies,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_DependencyRemoved,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_Name,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_ProcessedNames,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_ReadyNames,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_RemainingDependencies,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_Returns,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_TypedInitialEntry,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_TypedRemainingEntry,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_TypedWorkspaceEntry,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_UnresolvedNames,
  Lib_RunWorkspaces_Runner_DetectDependencyCycles_Workspaces,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ActiveState,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Blocked,
  Lib_RunWorkspaces_Runner_ExecuteTasks_BufferMs,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Cache,
  Lib_RunWorkspaces_Runner_ExecuteTasks_CandidateTask,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Children,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Code,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ColoredTask,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ColorFunction,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ColorFunctions,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ColorIndex,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Concurrency,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ContinueOnError,
  Lib_RunWorkspaces_Runner_ExecuteTasks_DependenciesReady,
  Lib_RunWorkspaces_Runner_ExecuteTasks_DependencyStatus,
  Lib_RunWorkspaces_Runner_ExecuteTasks_DependencyStatuses,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Failures,
  Lib_RunWorkspaces_Runner_ExecuteTasks_FlushInterval,
  Lib_RunWorkspaces_Runner_ExecuteTasks_FlushQueue_FlushQueue,
  Lib_RunWorkspaces_Runner_ExecuteTasks_FlushQueue_Returns,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Force,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ForwardSignal,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ForwardSignal_Returns,
  Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigint,
  Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigint_Returns,
  Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigterm,
  Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigterm_Returns,
  Lib_RunWorkspaces_Runner_ExecuteTasks_HasFailedDependency,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Key,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Label,
  Lib_RunWorkspaces_Runner_ExecuteTasks_NodeEnv,
  Lib_RunWorkspaces_Runner_ExecuteTasks_PackageManager,
  Lib_RunWorkspaces_Runner_ExecuteTasks_PackageManagerDescriptor,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Pending,
  Lib_RunWorkspaces_Runner_ExecuteTasks_PendingTask,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Prefixes,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Queue,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ReadyTasks,
  Lib_RunWorkspaces_Runner_ExecuteTasks_RemainingResults,
  Lib_RunWorkspaces_Runner_ExecuteTasks_RequestedTask,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ResolvedStatus,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Result,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Returns,
  Lib_RunWorkspaces_Runner_ExecuteTasks_RootDirectory,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Running,
  Lib_RunWorkspaces_Runner_ExecuteTasks_ScriptArgs,
  Lib_RunWorkspaces_Runner_ExecuteTasks_State,
  Lib_RunWorkspaces_Runner_ExecuteTasks_StateDigests,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Statuses,
  Lib_RunWorkspaces_Runner_ExecuteTasks_TaskPromise,
  Lib_RunWorkspaces_Runner_ExecuteTasks_Tasks,
  Lib_RunWorkspaces_Runner_ExecuteTasks_TaskValues,
  Lib_RunWorkspaces_Runner_ExecuteTasks_TypedFailureEntry,
  Lib_RunWorkspaces_Runner_ExecuteTasks_WriteStderr,
  Lib_RunWorkspaces_Runner_ExecuteTasks_WriteStdout,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_ActiveLabel,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_ActiveState,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_Label,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_OutputLine,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_Prefixes,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_Queue,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_ResultLine,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_Returns,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_WriteStderr,
  Lib_RunWorkspaces_Runner_FlushOutputQueue_WriteStdout,
  Lib_RunWorkspaces_Runner_GetDependencyNames_Fields,
  Lib_RunWorkspaces_Runner_GetDependencyNames_FieldValue,
  Lib_RunWorkspaces_Runner_GetDependencyNames_Names,
  Lib_RunWorkspaces_Runner_GetDependencyNames_PackageJson,
  Lib_RunWorkspaces_Runner_GetDependencyNames_Returns,
  Lib_RunWorkspaces_Runner_GetScriptEnvironment_Environment,
  Lib_RunWorkspaces_Runner_GetScriptEnvironment_NodeEnv,
  Lib_RunWorkspaces_Runner_GetScriptEnvironment_Returns,
  Lib_RunWorkspaces_Runner_LoadProject_Cache,
  Lib_RunWorkspaces_Runner_LoadProject_CacheDirectory,
  Lib_RunWorkspaces_Runner_LoadProject_CacheDirectoryValue,
  Lib_RunWorkspaces_Runner_LoadProject_CacheEnabled,
  Lib_RunWorkspaces_Runner_LoadProject_CacheScripts,
  Lib_RunWorkspaces_Runner_LoadProject_CacheScriptsValue,
  Lib_RunWorkspaces_Runner_LoadProject_CacheSettings,
  Lib_RunWorkspaces_Runner_LoadProject_Concurrency,
  Lib_RunWorkspaces_Runner_LoadProject_ConcurrencySettings,
  Lib_RunWorkspaces_Runner_LoadProject_Config,
  Lib_RunWorkspaces_Runner_LoadProject_ConfigLoader,
  Lib_RunWorkspaces_Runner_LoadProject_ConfiguredWorkspaces,
  Lib_RunWorkspaces_Runner_LoadProject_CurrentDirectory,
  Lib_RunWorkspaces_Runner_LoadProject_Diagnostics,
  Lib_RunWorkspaces_Runner_LoadProject_Directory,
  Lib_RunWorkspaces_Runner_LoadProject_ExistingWorkspace,
  Lib_RunWorkspaces_Runner_LoadProject_InternalDependencies,
  Lib_RunWorkspaces_Runner_LoadProject_LoadedWorkspaces,
  Lib_RunWorkspaces_Runner_LoadProject_PackageJson,
  Lib_RunWorkspaces_Runner_LoadProject_PackageJsonPath,
  Lib_RunWorkspaces_Runner_LoadProject_PackageJsonRaw,
  Lib_RunWorkspaces_Runner_LoadProject_PackageManagerDescriptor,
  Lib_RunWorkspaces_Runner_LoadProject_Returns,
  Lib_RunWorkspaces_Runner_LoadProject_ScriptCommand,
  Lib_RunWorkspaces_Runner_LoadProject_ScriptName,
  Lib_RunWorkspaces_Runner_LoadProject_Scripts,
  Lib_RunWorkspaces_Runner_LoadProject_ScriptsValue,
  Lib_RunWorkspaces_Runner_LoadProject_TypedScriptEntry,
  Lib_RunWorkspaces_Runner_LoadProject_TypedWorkspaceEntry,
  Lib_RunWorkspaces_Runner_LoadProject_WorkspaceConfig,
  Lib_RunWorkspaces_Runner_LoadProject_WorkspaceEntries,
  Lib_RunWorkspaces_Runner_LoadProject_WorkspaceName,
  Lib_RunWorkspaces_Runner_LoadProject_WorkspacePackageJson,
  Lib_RunWorkspaces_Runner_LoadProject_WorkspacePackageJsonPath,
  Lib_RunWorkspaces_Runner_LoadProject_WorkspacePackageJsonRaw,
  Lib_RunWorkspaces_Runner_LoadProject_WorkspacePath,
  Lib_RunWorkspaces_Runner_LoadProject_Workspaces,
  Lib_RunWorkspaces_Runner_ParsePositiveInteger_Parsed,
  Lib_RunWorkspaces_Runner_ParsePositiveInteger_Returns,
  Lib_RunWorkspaces_Runner_ParsePositiveInteger_Value,
  Lib_RunWorkspaces_Runner_ResolveConcurrency_Concurrency,
  Lib_RunWorkspaces_Runner_ResolveConcurrency_ConfiguredConcurrency,
  Lib_RunWorkspaces_Runner_ResolveConcurrency_Returns,
  Lib_RunWorkspaces_Runner_ResolveConcurrency_Task,
  Lib_RunWorkspaces_Runner_Run_BufferMs,
  Lib_RunWorkspaces_Runner_Run_Concurrency,
  Lib_RunWorkspaces_Runner_Run_EffectiveConcurrency,
  Lib_RunWorkspaces_Runner_Run_ErrorMessage,
  Lib_RunWorkspaces_Runner_Run_NodeEnv,
  Lib_RunWorkspaces_Runner_Run_NodeEnvOption,
  Lib_RunWorkspaces_Runner_Run_Options,
  Lib_RunWorkspaces_Runner_Run_OrderedTasks,
  Lib_RunWorkspaces_Runner_Run_Plan,
  Lib_RunWorkspaces_Runner_Run_Project,
  Lib_RunWorkspaces_Runner_Run_Returns,
  Lib_RunWorkspaces_Runner_Run_ScriptArgs,
  Lib_RunWorkspaces_Runner_Run_SelectedWorkspaces,
  Lib_RunWorkspaces_Runner_Run_Task,
  Lib_RunWorkspaces_Runner_Run_TaskValue,
  Lib_RunWorkspaces_Runner_RunTask_Cache,
  Lib_RunWorkspaces_Runner_RunTask_CacheCandidate,
  Lib_RunWorkspaces_Runner_RunTask_CacheRecord,
  Lib_RunWorkspaces_Runner_RunTask_Child,
  Lib_RunWorkspaces_Runner_RunTask_Children,
  Lib_RunWorkspaces_Runner_RunTask_Close_ExitCode,
  Lib_RunWorkspaces_Runner_RunTask_Close_IsStoppingFailure,
  Lib_RunWorkspaces_Runner_RunTask_Close_Line,
  Lib_RunWorkspaces_Runner_RunTask_Close_Status,
  Lib_RunWorkspaces_Runner_RunTask_Close_StderrPartial,
  Lib_RunWorkspaces_Runner_RunTask_Close_StdoutPartial,
  Lib_RunWorkspaces_Runner_RunTask_Close_Stream,
  Lib_RunWorkspaces_Runner_RunTask_CommandArguments,
  Lib_RunWorkspaces_Runner_RunTask_ContextDigest,
  Lib_RunWorkspaces_Runner_RunTask_Data_Returns,
  Lib_RunWorkspaces_Runner_RunTask_DependencyStateDigest,
  Lib_RunWorkspaces_Runner_RunTask_DependencyStateDigests,
  Lib_RunWorkspaces_Runner_RunTask_Environment,
  Lib_RunWorkspaces_Runner_RunTask_Error_Returns,
  Lib_RunWorkspaces_Runner_RunTask_Force,
  Lib_RunWorkspaces_Runner_RunTask_HandleData,
  Lib_RunWorkspaces_Runner_RunTask_HandleData_Lines,
  Lib_RunWorkspaces_Runner_RunTask_HandleData_Partial,
  Lib_RunWorkspaces_Runner_RunTask_HandleData_Returns,
  Lib_RunWorkspaces_Runner_RunTask_HandleData_Text,
  Lib_RunWorkspaces_Runner_RunTask_HasAllDependencyDigests,
  Lib_RunWorkspaces_Runner_RunTask_NodeEnv,
  Lib_RunWorkspaces_Runner_RunTask_PackageManager,
  Lib_RunWorkspaces_Runner_RunTask_PackageManagerDescriptor,
  Lib_RunWorkspaces_Runner_RunTask_PartialLines,
  Lib_RunWorkspaces_Runner_RunTask_Queue,
  Lib_RunWorkspaces_Runner_RunTask_Result,
  Lib_RunWorkspaces_Runner_RunTask_Returns,
  Lib_RunWorkspaces_Runner_RunTask_RootDirectory,
  Lib_RunWorkspaces_Runner_RunTask_ScriptArgs,
  Lib_RunWorkspaces_Runner_RunTask_Settled,
  Lib_RunWorkspaces_Runner_RunTask_SpawnInvocation,
  Lib_RunWorkspaces_Runner_RunTask_State,
  Lib_RunWorkspaces_Runner_RunTask_StateDigest,
  Lib_RunWorkspaces_Runner_RunTask_StateDigests,
  Lib_RunWorkspaces_Runner_RunTask_Task,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_Excluded,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_ExcludedNames,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_IsExcluded,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_IsRequested,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_KnownNames,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_MatchesRequestedName,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_Requested,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_RequestedNames,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_Returns,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_UnknownNames,
  Lib_RunWorkspaces_Runner_SelectWorkspaces_Workspaces,
  Lib_RunWorkspaces_Runner_SortTasks_AlreadyOrdered,
  Lib_RunWorkspaces_Runner_SortTasks_AlreadyReady,
  Lib_RunWorkspaces_Runner_SortTasks_CandidateKey,
  Lib_RunWorkspaces_Runner_SortTasks_Dependencies,
  Lib_RunWorkspaces_Runner_SortTasks_DependencyRemoved,
  Lib_RunWorkspaces_Runner_SortTasks_Key,
  Lib_RunWorkspaces_Runner_SortTasks_OrderedTasks,
  Lib_RunWorkspaces_Runner_SortTasks_ReadyKeys,
  Lib_RunWorkspaces_Runner_SortTasks_RemainingDependencies,
  Lib_RunWorkspaces_Runner_SortTasks_Returns,
  Lib_RunWorkspaces_Runner_SortTasks_Task,
  Lib_RunWorkspaces_Runner_SortTasks_Tasks,
  Lib_RunWorkspaces_Runner_SortTasks_TypedInitialEntry,
  Lib_RunWorkspaces_Runner_SortTasks_TypedRemainingEntry,
  Lib_RunWorkspaces_Runner_SortTasks_TypedTaskEntry,
  Lib_RunWorkspaces_Runner_TaskKey_Returns,
  Lib_RunWorkspaces_Runner_TaskKey_Script,
  Lib_RunWorkspaces_Runner_TaskKey_WorkspaceName,
} from '../types/lib/run-workspaces.d.ts';

/**
 * Lib - Run Workspaces.
 *
 * Builds and executes Nova's workspace task graph from nova.config.json and
 * package.json manifests without relying on an external monorepo runner.
 *
 * @since 0.32.0
 */
export class Runner {
  /**
   * Lib - Run Workspaces - Run.
   *
   * Loads the project graph, validates selections, expands task prerequisites,
   * and executes every ready workspace task with bounded concurrency.
   *
   * @param {Lib_RunWorkspaces_Runner_Run_Options} options - Options.
   *
   * @returns {Lib_RunWorkspaces_Runner_Run_Returns}
   *
   * @since 0.32.0
   */
  public static async run(options: Lib_RunWorkspaces_Runner_Run_Options): Lib_RunWorkspaces_Runner_Run_Returns {
    try {
      const taskValue: Lib_RunWorkspaces_Runner_Run_TaskValue = options['task'];
      const task: Lib_RunWorkspaces_Runner_Run_Task = (taskValue === undefined) ? '' : taskValue.trim();
      const bufferMs: Lib_RunWorkspaces_Runner_Run_BufferMs = Runner.parsePositiveInteger(options['buffer']);
      const concurrency: Lib_RunWorkspaces_Runner_Run_Concurrency = Runner.parsePositiveInteger(options['concurrency']);
      const nodeEnvOption: Lib_RunWorkspaces_Runner_Run_NodeEnvOption = options['nodeEnv'];
      const scriptArgs: Lib_RunWorkspaces_Runner_Run_ScriptArgs = options['scriptArgs'] ?? [];

      if (task.length === 0) {
        throw new Error('A workspace script name is required.');
      }

      if (options['buffer'] !== undefined && bufferMs === undefined) {
        throw new Error('The buffer must be a positive integer.');
      }

      if (options['concurrency'] !== undefined && concurrency === undefined) {
        throw new Error('The concurrency must be a positive integer.');
      }

      if (
        nodeEnvOption !== undefined
        && nodeEnvOption !== 'development'
        && nodeEnvOption !== 'production'
        && nodeEnvOption !== 'test'
      ) {
        throw new Error('NODE_ENV must be development, production, or test.');
      }

      const nodeEnv: Lib_RunWorkspaces_Runner_Run_NodeEnv = nodeEnvOption;
      const project: Lib_RunWorkspaces_Runner_Run_Project = await Runner.loadProject();
      const selectedWorkspaces: Lib_RunWorkspaces_Runner_Run_SelectedWorkspaces = Runner.selectWorkspaces(
        project['workspaces'],
        options['workspace'],
        options['excludeWorkspace'],
      );
      const plan: Lib_RunWorkspaces_Runner_Run_Plan = Runner.buildPlan(project['workspaces'], selectedWorkspaces, task);
      const orderedTasks: Lib_RunWorkspaces_Runner_Run_OrderedTasks = Runner.sortTasks(plan['tasks']);

      for (const skipped of plan['skipped']) {
        options.printWarn(`Skipped ${skipped}: script is not defined.`);
      }

      if (orderedTasks.length === 0) {
        options.printInfo(`No workspaces define the "${task}" script.`);

        return 0;
      }

      options.printInfo(`Planned ${orderedTasks.length} workspace task(s): ${orderedTasks.map((plannedTask) => plannedTask['label']).join(', ')}`);

      if (options['dryRun'] === true) {
        options.printInfo('Dry run complete. No workspace scripts were executed.');

        return 0;
      }

      const effectiveConcurrency: Lib_RunWorkspaces_Runner_Run_EffectiveConcurrency = Runner.resolveConcurrency(
        concurrency,
        project['concurrency'],
        task,
      );

      return await Runner.executeTasks(
        plan['tasks'],
        project['packageManager'],
        project['packageManagerDescriptor'],
        project['rootDirectory'],
        project['cache'],
        options['force'] === true,
        effectiveConcurrency,
        options['continueOnError'] === true,
        bufferMs ?? 500,
        nodeEnv,
        task,
        scriptArgs,
        options['writeStderr'],
        options['writeStdout'],
      );
    } catch (error) {
      const errorMessage: Lib_RunWorkspaces_Runner_Run_ErrorMessage = (error instanceof Error) ? error.message : String(error);

      options.printError(errorMessage);

      return 1;
    }
  }

  /**
   * Lib - Run Workspaces - Load Project.
   *
   * Reads the root package-manager contract and every non-root workspace
   * declared by Nova, then resolves internal package dependencies by name.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_LoadProject_Returns}
   *
   * @since 0.32.0
   */
  private static async loadProject(): Lib_RunWorkspaces_Runner_LoadProject_Returns {
    const currentDirectory: Lib_RunWorkspaces_Runner_LoadProject_CurrentDirectory = process.cwd();
    const packageJsonPath: Lib_RunWorkspaces_Runner_LoadProject_PackageJsonPath = join(currentDirectory, 'package.json');
    const packageJsonRaw: Lib_RunWorkspaces_Runner_LoadProject_PackageJsonRaw = await readFile(packageJsonPath, 'utf-8');
    const packageJson: Lib_RunWorkspaces_Runner_LoadProject_PackageJson = JSON.parse(packageJsonRaw);
    const packageManagerDescriptor: Lib_RunWorkspaces_Runner_LoadProject_PackageManagerDescriptor = LibCorepack.parsePackageManager(packageJson['packageManager']);

    if (packageManagerDescriptor === undefined) {
      throw new Error('The root package.json must declare a supported packageManager descriptor.');
    }

    const configLoader: Lib_RunWorkspaces_Runner_LoadProject_ConfigLoader = new LibNovaConfig();
    const config: Lib_RunWorkspaces_Runner_LoadProject_Config = await configLoader.load();
    const diagnostics: Lib_RunWorkspaces_Runner_LoadProject_Diagnostics = configLoader.diagnostics();

    if (diagnostics.length > 0) {
      throw new Error(`nova.config.json is invalid: ${diagnostics.join('; ')}`);
    }

    const configuredWorkspaces: Lib_RunWorkspaces_Runner_LoadProject_ConfiguredWorkspaces = config['workspaces'] ?? {};
    let cacheSettings: Lib_RunWorkspaces_Runner_LoadProject_CacheSettings = undefined;
    let concurrencySettings: Lib_RunWorkspaces_Runner_LoadProject_ConcurrencySettings = undefined;

    if (config['settings'] !== undefined && config['settings']['runWorkspaces'] !== undefined) {
      cacheSettings = config['settings']['runWorkspaces']['cache'];
      concurrencySettings = config['settings']['runWorkspaces']['concurrency'];
    }

    let cacheDirectoryValue: Lib_RunWorkspaces_Runner_LoadProject_CacheDirectoryValue = './node_modules/.cache/nova/run-workspaces';
    let cacheEnabled: Lib_RunWorkspaces_Runner_LoadProject_CacheEnabled = true;
    let cacheScriptsValue: Lib_RunWorkspaces_Runner_LoadProject_CacheScriptsValue = [
      'build',
      'check',
    ];

    if (cacheSettings !== undefined) {
      if (cacheSettings['directory'] !== undefined) {
        cacheDirectoryValue = cacheSettings['directory'];
      }

      if (cacheSettings['enabled'] !== undefined) {
        cacheEnabled = cacheSettings['enabled'];
      }

      if (cacheSettings['scripts'] !== undefined) {
        cacheScriptsValue = cacheSettings['scripts'];
      }
    }

    const cacheDirectory: Lib_RunWorkspaces_Runner_LoadProject_CacheDirectory = resolveCacheDirectory(
      currentDirectory,
      cacheDirectoryValue,
    );
    const cacheScripts: Lib_RunWorkspaces_Runner_LoadProject_CacheScripts = new Set(cacheScriptsValue);
    const cache: Lib_RunWorkspaces_Runner_LoadProject_Cache = {
      directory: cacheDirectory,
      enabled: cacheEnabled,
      scripts: cacheScripts,
    };
    const concurrency: Lib_RunWorkspaces_Runner_LoadProject_Concurrency = concurrencySettings ?? {};
    const workspaceEntries: Lib_RunWorkspaces_Runner_LoadProject_WorkspaceEntries = Object.entries(configuredWorkspaces).filter((workspaceEntry) => workspaceEntry[0] !== './');
    const loadedWorkspaces: Lib_RunWorkspaces_Runner_LoadProject_LoadedWorkspaces = await Promise.all(workspaceEntries.map(async (workspaceEntry) => {
      const typedWorkspaceEntry: Lib_RunWorkspaces_Runner_LoadProject_TypedWorkspaceEntry = workspaceEntry;
      const workspacePath: Lib_RunWorkspaces_Runner_LoadProject_WorkspacePath = typedWorkspaceEntry[0];
      const workspaceConfig: Lib_RunWorkspaces_Runner_LoadProject_WorkspaceConfig = typedWorkspaceEntry[1];
      const directory: Lib_RunWorkspaces_Runner_LoadProject_Directory = resolve(currentDirectory, workspacePath);
      const workspacePackageJsonPath: Lib_RunWorkspaces_Runner_LoadProject_WorkspacePackageJsonPath = join(directory, 'package.json');
      const workspacePackageJsonRaw: Lib_RunWorkspaces_Runner_LoadProject_WorkspacePackageJsonRaw = await readFile(workspacePackageJsonPath, 'utf-8');
      const workspacePackageJson: Lib_RunWorkspaces_Runner_LoadProject_WorkspacePackageJson = JSON.parse(workspacePackageJsonRaw);
      const workspaceName: Lib_RunWorkspaces_Runner_LoadProject_WorkspaceName = workspacePackageJson['name'];
      const scriptsValue: Lib_RunWorkspaces_Runner_LoadProject_ScriptsValue = workspacePackageJson['scripts'];
      const scripts: Lib_RunWorkspaces_Runner_LoadProject_Scripts = {};

      if (typeof workspaceName !== 'string' || workspaceName.length === 0) {
        throw new Error(`${workspacePath}/package.json must declare a package name.`);
      }

      if (workspaceName !== workspaceConfig['name']) {
        throw new Error(`Workspace name drift: nova.config.json declares "${workspaceConfig['name']}" for ${workspacePath}, but package.json declares "${workspaceName}".`);
      }

      if (scriptsValue !== undefined && isPlainObject(scriptsValue) === false) {
        throw new Error(`${workspacePath}/package.json scripts must be an object.`);
      }

      if (isPlainObject(scriptsValue) === true) {
        for (const scriptEntry of Object.entries(scriptsValue)) {
          const typedScriptEntry: Lib_RunWorkspaces_Runner_LoadProject_TypedScriptEntry = scriptEntry;
          const scriptName: Lib_RunWorkspaces_Runner_LoadProject_ScriptName = typedScriptEntry[0];
          const scriptCommand: Lib_RunWorkspaces_Runner_LoadProject_ScriptCommand = typedScriptEntry[1];

          if (typeof scriptCommand === 'string') {
            Reflect.set(scripts, scriptName, scriptCommand);
          }
        }
      }

      return {
        path: workspacePath,
        directory,
        name: workspaceName,
        scripts,
        dependencies: Runner.getDependencyNames(workspacePackageJson),
      };
    }));
    const workspaces: Lib_RunWorkspaces_Runner_LoadProject_Workspaces = new Map();

    for (const workspace of loadedWorkspaces) {
      const existingWorkspace: Lib_RunWorkspaces_Runner_LoadProject_ExistingWorkspace = workspaces.get(workspace['name']);

      if (existingWorkspace !== undefined) {
        throw new Error(`Duplicate workspace package name "${workspace['name']}" in ${existingWorkspace['path']} and ${workspace['path']}.`);
      }

      workspaces.set(workspace['name'], workspace);
    }

    for (const workspace of workspaces.values()) {
      const internalDependencies: Lib_RunWorkspaces_Runner_LoadProject_InternalDependencies = workspace['dependencies'].filter((dependencyName) => workspaces.has(dependencyName));

      Reflect.set(workspace, 'dependencies', internalDependencies);
    }

    Runner.detectDependencyCycles(workspaces);

    return {
      cache,
      concurrency,
      packageManager: packageManagerDescriptor['name'],
      packageManagerDescriptor: packageManagerDescriptor['value'],
      rootDirectory: currentDirectory,
      workspaces,
    };
  }

  /**
   * Lib - Run Workspaces - Get Dependency Names.
   *
   * Collects dependency names from every package relationship that can express
   * an internal workspace edge.
   *
   * @param {Lib_RunWorkspaces_Runner_GetDependencyNames_PackageJson} packageJson - Package json.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_GetDependencyNames_Returns}
   *
   * @since 0.32.0
   */
  private static getDependencyNames(packageJson: Lib_RunWorkspaces_Runner_GetDependencyNames_PackageJson): Lib_RunWorkspaces_Runner_GetDependencyNames_Returns {
    const fields: Lib_RunWorkspaces_Runner_GetDependencyNames_Fields = [
      'dependencies',
      'devDependencies',
      'optionalDependencies',
      'peerDependencies',
    ];
    const names: Lib_RunWorkspaces_Runner_GetDependencyNames_Names = new Set();

    for (const field of fields) {
      const fieldValue: Lib_RunWorkspaces_Runner_GetDependencyNames_FieldValue = packageJson[field];

      if (isPlainObject(fieldValue) === true) {
        for (const name of Object.keys(fieldValue)) {
          names.add(name);
        }
      }
    }

    return [...names];
  }

  /**
   * Lib - Run Workspaces - Detect Dependency Cycles.
   *
   * Rejects internal workspace cycles before any child process starts so a
   * partial execution cannot hide an invalid project graph.
   *
   * @param {Lib_RunWorkspaces_Runner_DetectDependencyCycles_Workspaces} workspaces - Workspaces.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_DetectDependencyCycles_Returns}
   *
   * @since 0.32.0
   */
  private static detectDependencyCycles(workspaces: Lib_RunWorkspaces_Runner_DetectDependencyCycles_Workspaces): Lib_RunWorkspaces_Runner_DetectDependencyCycles_Returns {
    const remainingDependencies: Lib_RunWorkspaces_Runner_DetectDependencyCycles_RemainingDependencies = new Map();
    const readyNames: Lib_RunWorkspaces_Runner_DetectDependencyCycles_ReadyNames = [];
    const processedNames: Lib_RunWorkspaces_Runner_DetectDependencyCycles_ProcessedNames = new Set();

    for (const workspaceEntry of workspaces) {
      const typedWorkspaceEntry: Lib_RunWorkspaces_Runner_DetectDependencyCycles_TypedWorkspaceEntry = workspaceEntry;

      remainingDependencies.set(typedWorkspaceEntry[0], new Set(typedWorkspaceEntry[1]['dependencies']));
    }

    for (const remainingEntry of remainingDependencies) {
      const typedInitialEntry: Lib_RunWorkspaces_Runner_DetectDependencyCycles_TypedInitialEntry = remainingEntry;

      if (typedInitialEntry[1].size === 0) {
        readyNames.push(typedInitialEntry[0]);
      }
    }

    readyNames.sort();

    while (readyNames.length > 0) {
      const name: Lib_RunWorkspaces_Runner_DetectDependencyCycles_Name = readyNames.shift();

      if (name === undefined || processedNames.has(name) === true) {
        continue;
      }

      processedNames.add(name);

      for (const remainingEntry of remainingDependencies) {
        const typedRemainingEntry: Lib_RunWorkspaces_Runner_DetectDependencyCycles_TypedRemainingEntry = remainingEntry;
        const candidateName: Lib_RunWorkspaces_Runner_DetectDependencyCycles_CandidateName = typedRemainingEntry[0];
        const dependencies: Lib_RunWorkspaces_Runner_DetectDependencyCycles_Dependencies = typedRemainingEntry[1];
        const dependencyRemoved: Lib_RunWorkspaces_Runner_DetectDependencyCycles_DependencyRemoved = dependencies.delete(name);

        if (
          dependencyRemoved === true
          && dependencies.size === 0
          && processedNames.has(candidateName) === false
        ) {
          readyNames.push(candidateName);

          readyNames.sort();
        }
      }
    }

    if (processedNames.size !== workspaces.size) {
      const unresolvedNames: Lib_RunWorkspaces_Runner_DetectDependencyCycles_UnresolvedNames = [...workspaces.keys()].filter((name) => processedNames.has(name) === false);

      throw new Error(`Internal workspace dependency cycle detected: ${unresolvedNames.join(', ')}.`);
    }

    return;
  }

  /**
   * Lib - Run Workspaces - Select Workspaces.
   *
   * Applies explicit include and exclude filters against both Nova paths and
   * package names while rejecting unknown selections.
   *
   * @param {Lib_RunWorkspaces_Runner_SelectWorkspaces_Workspaces} workspaces - Workspaces.
   * @param {Lib_RunWorkspaces_Runner_SelectWorkspaces_Requested}  requested  - Requested.
   * @param {Lib_RunWorkspaces_Runner_SelectWorkspaces_Excluded}   excluded   - Excluded.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_SelectWorkspaces_Returns}
   *
   * @since 0.32.0
   */
  private static selectWorkspaces(workspaces: Lib_RunWorkspaces_Runner_SelectWorkspaces_Workspaces, requested: Lib_RunWorkspaces_Runner_SelectWorkspaces_Requested, excluded: Lib_RunWorkspaces_Runner_SelectWorkspaces_Excluded): Lib_RunWorkspaces_Runner_SelectWorkspaces_Returns {
    const requestedNames: Lib_RunWorkspaces_Runner_SelectWorkspaces_RequestedNames = new Set(requested ?? []);
    const excludedNames: Lib_RunWorkspaces_Runner_SelectWorkspaces_ExcludedNames = new Set(excluded ?? []);
    const knownNames: Lib_RunWorkspaces_Runner_SelectWorkspaces_KnownNames = new Set([...workspaces.values()].flatMap((workspace) => [
      workspace['name'],
      workspace['path'],
    ]));
    const unknownNames: Lib_RunWorkspaces_Runner_SelectWorkspaces_UnknownNames = [
      ...requestedNames,
      ...excludedNames,
    ].filter((name) => knownNames.has(name) === false);

    if (unknownNames.length > 0) {
      throw new Error(`Unknown workspace selection: ${unknownNames.join(', ')}.`);
    }

    return [...workspaces.values()].filter((workspace) => {
      const matchesRequestedName: Lib_RunWorkspaces_Runner_SelectWorkspaces_MatchesRequestedName = requestedNames.has(workspace['name']) || requestedNames.has(workspace['path']);
      const isRequested: Lib_RunWorkspaces_Runner_SelectWorkspaces_IsRequested = requestedNames.size === 0 || matchesRequestedName;
      const isExcluded: Lib_RunWorkspaces_Runner_SelectWorkspaces_IsExcluded = excludedNames.has(workspace['name']) || excludedNames.has(workspace['path']);

      return isRequested && isExcluded === false;
    });
  }

  /**
   * Lib - Run Workspaces - Build Plan.
   *
   * Expands a selected script into its dependency-aware task graph and records
   * selected workspaces that do not expose the requested entry point.
   *
   * @param {Lib_RunWorkspaces_Runner_BuildPlan_Workspaces}         workspaces         - Workspaces.
   * @param {Lib_RunWorkspaces_Runner_BuildPlan_SelectedWorkspaces} selectedWorkspaces - Selected workspaces.
   * @param {Lib_RunWorkspaces_Runner_BuildPlan_Script}             script             - Script.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_BuildPlan_Returns}
   *
   * @since 0.32.0
   */
  private static buildPlan(workspaces: Lib_RunWorkspaces_Runner_BuildPlan_Workspaces, selectedWorkspaces: Lib_RunWorkspaces_Runner_BuildPlan_SelectedWorkspaces, script: Lib_RunWorkspaces_Runner_BuildPlan_Script): Lib_RunWorkspaces_Runner_BuildPlan_Returns {
    const tasks: Lib_RunWorkspaces_Runner_BuildPlan_Tasks = new Map();
    const skipped: Lib_RunWorkspaces_Runner_BuildPlan_Skipped = [];

    for (const workspace of selectedWorkspaces) {
      const key: Lib_RunWorkspaces_Runner_BuildPlan_Key = Runner.addTask(tasks, workspaces, workspace, script);

      if (key === undefined) {
        skipped.push(`${workspace['name']}#${script}`);
      }
    }

    return {
      tasks,
      skipped,
    };
  }

  /**
   * Lib - Run Workspaces - Add Task.
   *
   * Adds one task and recursively adds Nova's lifecycle prerequisites: upstream
   * builds for check/build and local check/build gates for prod/deploy.
   *
   * @param {Lib_RunWorkspaces_Runner_AddTask_Tasks}      tasks      - Tasks.
   * @param {Lib_RunWorkspaces_Runner_AddTask_Workspaces} workspaces - Workspaces.
   * @param {Lib_RunWorkspaces_Runner_AddTask_Workspace}  workspace  - Workspace.
   * @param {Lib_RunWorkspaces_Runner_AddTask_Script}     script     - Script.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_AddTask_Returns}
   *
   * @since 0.32.0
   */
  private static addTask(tasks: Lib_RunWorkspaces_Runner_AddTask_Tasks, workspaces: Lib_RunWorkspaces_Runner_AddTask_Workspaces, workspace: Lib_RunWorkspaces_Runner_AddTask_Workspace, script: Lib_RunWorkspaces_Runner_AddTask_Script): Lib_RunWorkspaces_Runner_AddTask_Returns {
    if (workspace['scripts'][script] === undefined) {
      return undefined;
    }

    const key: Lib_RunWorkspaces_Runner_AddTask_Key = Runner.taskKey(workspace['name'], script);
    const existingTask: Lib_RunWorkspaces_Runner_AddTask_ExistingTask = tasks.get(key);

    if (existingTask !== undefined) {
      return key;
    }

    const task: Lib_RunWorkspaces_Runner_AddTask_Task = {
      key,
      label: key,
      script,
      command: workspace['scripts'][script],
      workspaceName: workspace['name'],
      directory: workspace['directory'],
      dependencies: new Set(),
    };

    tasks.set(key, task);

    if (script === 'build' || script === 'check') {
      for (const dependencyName of workspace['dependencies']) {
        const dependencyWorkspace: Lib_RunWorkspaces_Runner_AddTask_DependencyWorkspace = workspaces.get(dependencyName);

        if (dependencyWorkspace !== undefined) {
          const dependencyBuildKey: Lib_RunWorkspaces_Runner_AddTask_DependencyBuildKey = Runner.addTask(tasks, workspaces, dependencyWorkspace, 'build');

          if (dependencyBuildKey !== undefined) {
            task['dependencies'].add(dependencyBuildKey);
          }
        }
      }
    }

    if (script === 'prod' || script === 'deploy') {
      for (const prerequisite of [
        'check',
        'build',
      ]) {
        const prerequisiteKey: Lib_RunWorkspaces_Runner_AddTask_PrerequisiteKey = Runner.addTask(tasks, workspaces, workspace, prerequisite);

        if (prerequisiteKey !== undefined) {
          task['dependencies'].add(prerequisiteKey);
        }
      }
    }

    return key;
  }

  /**
   * Lib - Run Workspaces - Sort Tasks.
   *
   * Produces a stable topological order for dry-run reporting and validates the
   * expanded task graph before execution.
   *
   * @param {Lib_RunWorkspaces_Runner_SortTasks_Tasks} tasks - Tasks.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_SortTasks_Returns}
   *
   * @since 0.32.0
   */
  private static sortTasks(tasks: Lib_RunWorkspaces_Runner_SortTasks_Tasks): Lib_RunWorkspaces_Runner_SortTasks_Returns {
    const remainingDependencies: Lib_RunWorkspaces_Runner_SortTasks_RemainingDependencies = new Map();
    const readyKeys: Lib_RunWorkspaces_Runner_SortTasks_ReadyKeys = [];
    const orderedTasks: Lib_RunWorkspaces_Runner_SortTasks_OrderedTasks = [];

    for (const taskEntry of tasks) {
      const typedTaskEntry: Lib_RunWorkspaces_Runner_SortTasks_TypedTaskEntry = taskEntry;

      remainingDependencies.set(typedTaskEntry[0], new Set(typedTaskEntry[1]['dependencies']));
    }

    for (const remainingEntry of remainingDependencies) {
      const typedInitialEntry: Lib_RunWorkspaces_Runner_SortTasks_TypedInitialEntry = remainingEntry;

      if (typedInitialEntry[1].size === 0) {
        readyKeys.push(typedInitialEntry[0]);
      }
    }

    readyKeys.sort();

    while (readyKeys.length > 0) {
      const key: Lib_RunWorkspaces_Runner_SortTasks_Key = readyKeys.shift();
      const task: Lib_RunWorkspaces_Runner_SortTasks_Task = (key === undefined) ? undefined : tasks.get(key);

      if (key === undefined || task === undefined) {
        continue;
      }

      orderedTasks.push(task);

      for (const remainingEntry of remainingDependencies) {
        const typedRemainingEntry: Lib_RunWorkspaces_Runner_SortTasks_TypedRemainingEntry = remainingEntry;
        const candidateKey: Lib_RunWorkspaces_Runner_SortTasks_CandidateKey = typedRemainingEntry[0];
        const dependencies: Lib_RunWorkspaces_Runner_SortTasks_Dependencies = typedRemainingEntry[1];
        const dependencyRemoved: Lib_RunWorkspaces_Runner_SortTasks_DependencyRemoved = dependencies.delete(key);
        const alreadyOrdered: Lib_RunWorkspaces_Runner_SortTasks_AlreadyOrdered = orderedTasks.some((orderedTask) => orderedTask['key'] === candidateKey);
        const alreadyReady: Lib_RunWorkspaces_Runner_SortTasks_AlreadyReady = readyKeys.includes(candidateKey);

        if (
          dependencyRemoved === true
          && dependencies.size === 0
          && alreadyOrdered === false
          && alreadyReady === false
        ) {
          readyKeys.push(candidateKey);

          readyKeys.sort();
        }
      }
    }

    if (orderedTasks.length !== tasks.size) {
      throw new Error('Workspace task graph contains a cycle.');
    }

    return orderedTasks;
  }

  /**
   * Lib - Run Workspaces - Execute Tasks.
   *
   * Schedules ready tasks up to the configured concurrency, keeps dependent
   * work blocked behind failures, and frames buffered child output by task.
   *
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_Tasks}                    tasks                    - Tasks.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_PackageManager}           packageManager           - Package manager.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_PackageManagerDescriptor} packageManagerDescriptor - Package manager descriptor.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_RootDirectory}            rootDirectory            - Root directory.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_Cache}                    cache                    - Cache.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_Force}                    force                    - Force.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_Concurrency}              concurrency              - Concurrency.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_ContinueOnError}          continueOnError          - Continue on error.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_BufferMs}                 bufferMs                 - Buffer ms.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_NodeEnv}                  nodeEnv                  - Node env.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_RequestedTask}            requestedTask            - Requested task.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_ScriptArgs}               scriptArgs               - Script args.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_WriteStderr}              writeStderr              - Write stderr.
   * @param {Lib_RunWorkspaces_Runner_ExecuteTasks_WriteStdout}              writeStdout              - Write stdout.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_ExecuteTasks_Returns}
   *
   * @since 0.32.0
   */
  private static async executeTasks(tasks: Lib_RunWorkspaces_Runner_ExecuteTasks_Tasks, packageManager: Lib_RunWorkspaces_Runner_ExecuteTasks_PackageManager, packageManagerDescriptor: Lib_RunWorkspaces_Runner_ExecuteTasks_PackageManagerDescriptor, rootDirectory: Lib_RunWorkspaces_Runner_ExecuteTasks_RootDirectory, cache: Lib_RunWorkspaces_Runner_ExecuteTasks_Cache, force: Lib_RunWorkspaces_Runner_ExecuteTasks_Force, concurrency: Lib_RunWorkspaces_Runner_ExecuteTasks_Concurrency, continueOnError: Lib_RunWorkspaces_Runner_ExecuteTasks_ContinueOnError, bufferMs: Lib_RunWorkspaces_Runner_ExecuteTasks_BufferMs, nodeEnv: Lib_RunWorkspaces_Runner_ExecuteTasks_NodeEnv, requestedTask: Lib_RunWorkspaces_Runner_ExecuteTasks_RequestedTask, scriptArgs: Lib_RunWorkspaces_Runner_ExecuteTasks_ScriptArgs, writeStderr: Lib_RunWorkspaces_Runner_ExecuteTasks_WriteStderr, writeStdout: Lib_RunWorkspaces_Runner_ExecuteTasks_WriteStdout): Lib_RunWorkspaces_Runner_ExecuteTasks_Returns {
    const colorFunctions: Lib_RunWorkspaces_Runner_ExecuteTasks_ColorFunctions = [
      chalk.cyan,
      chalk.yellow,
      chalk.magenta,
      chalk.green,
      chalk.blue,
      chalk.red,
    ];
    const prefixes: Lib_RunWorkspaces_Runner_ExecuteTasks_Prefixes = new Map();

    const taskValues: Lib_RunWorkspaces_Runner_ExecuteTasks_TaskValues = [...tasks.values()];

    for (let colorIndex: Lib_RunWorkspaces_Runner_ExecuteTasks_ColorIndex = 0; colorIndex < taskValues.length; colorIndex += 1) {
      const coloredTask: Lib_RunWorkspaces_Runner_ExecuteTasks_ColoredTask = taskValues[colorIndex] as Lib_RunWorkspaces_Runner_ExecuteTasks_ColoredTask;
      const colorFunction: Lib_RunWorkspaces_Runner_ExecuteTasks_ColorFunction = colorFunctions[colorIndex % colorFunctions.length] as Lib_RunWorkspaces_Runner_ExecuteTasks_ColorFunction;

      prefixes.set(coloredTask['key'], colorFunction(coloredTask['label']));
    }

    const queue: Lib_RunWorkspaces_Runner_ExecuteTasks_Queue = [];
    const activeState: Lib_RunWorkspaces_Runner_ExecuteTasks_ActiveState = {
      key: '',
    };
    const children: Lib_RunWorkspaces_Runner_ExecuteTasks_Children = new Set();
    const state: Lib_RunWorkspaces_Runner_ExecuteTasks_State = {
      interrupted: false,
      stopping: false,
    };
    const statuses: Lib_RunWorkspaces_Runner_ExecuteTasks_Statuses = new Map();
    const stateDigests: Lib_RunWorkspaces_Runner_ExecuteTasks_StateDigests = new Map();
    const failures: Lib_RunWorkspaces_Runner_ExecuteTasks_Failures = new Map();
    const blocked: Lib_RunWorkspaces_Runner_ExecuteTasks_Blocked = new Set();
    const pending: Lib_RunWorkspaces_Runner_ExecuteTasks_Pending = new Set(tasks.keys());
    const running: Lib_RunWorkspaces_Runner_ExecuteTasks_Running = new Map();

    /**
     * Lib - Run Workspaces - Execute Tasks - Flush Queue.
     *
     * Flushes any buffered workspace output through the active output adapters.
     * It preserves the shared framing state between interval callbacks.
     *
     * @returns {Lib_RunWorkspaces_Runner_ExecuteTasks_FlushQueue_Returns}
     *
     * @since 0.32.0
     */
    const flushQueue: Lib_RunWorkspaces_Runner_ExecuteTasks_FlushQueue_FlushQueue = (): Lib_RunWorkspaces_Runner_ExecuteTasks_FlushQueue_Returns => Runner.flushOutputQueue(
      queue,
      prefixes,
      activeState,
      writeStderr,
      writeStdout,
    );

    /**
     * Lib - Run Workspaces - Execute Tasks - Forward Signal.
     *
     * Sends a termination signal to every workspace child that is still active.
     * It keeps parent interruption behavior consistent across concurrent tasks.
     *
     * @returns {Lib_RunWorkspaces_Runner_ExecuteTasks_ForwardSignal_Returns}
     *
     * @since 0.32.0
     */
    const forwardSignal: Lib_RunWorkspaces_Runner_ExecuteTasks_ForwardSignal = (signal): Lib_RunWorkspaces_Runner_ExecuteTasks_ForwardSignal_Returns => {
      for (const child of children) {
        child.kill(signal);
      }

      return;
    };

    /**
     * Lib - Run Workspaces - Execute Tasks - Handle SIGINT.
     *
     * Records an interactive interruption and forwards it once to every child.
     * A repeated signal is ignored while the current shutdown finishes.
     *
     * @returns {Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigint_Returns}
     *
     * @since 0.32.0
     */
    const handleSigint: Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigint = (): Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigint_Returns => {
      if (state['interrupted'] === true) {
        return;
      }

      Reflect.set(state, 'interrupted', true);

      Reflect.set(state, 'stopping', true);

      forwardSignal('SIGINT');

      return;
    };

    /**
     * Lib - Run Workspaces - Execute Tasks - Handle SIGTERM.
     *
     * Marks execution as stopping and forwards termination to active children.
     * This path is shared by fail-fast behavior and external process shutdown.
     *
     * @returns {Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigterm_Returns}
     *
     * @since 0.32.0
     */
    const handleSigterm: Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigterm = (): Lib_RunWorkspaces_Runner_ExecuteTasks_HandleSigterm_Returns => {
      Reflect.set(state, 'stopping', true);

      forwardSignal('SIGTERM');

      return;
    };
    const flushInterval: Lib_RunWorkspaces_Runner_ExecuteTasks_FlushInterval = setInterval(flushQueue, bufferMs);

    process.on('SIGINT', handleSigint);
    process.on('SIGTERM', handleSigterm);

    try {
      while (pending.size > 0 || running.size > 0) {
        if (state['stopping'] === true) {
          for (const key of pending) {
            statuses.set(key, 'cancelled');
          }

          pending.clear();
        }

        for (const key of [...pending]) {
          const pendingTask: Lib_RunWorkspaces_Runner_ExecuteTasks_PendingTask = tasks.get(key) as Lib_RunWorkspaces_Runner_ExecuteTasks_PendingTask;
          const dependencyStatuses: Lib_RunWorkspaces_Runner_ExecuteTasks_DependencyStatuses = [...pendingTask['dependencies']].map((dependencyKey) => statuses.get(dependencyKey));
          const hasFailedDependency: Lib_RunWorkspaces_Runner_ExecuteTasks_HasFailedDependency = dependencyStatuses.some((status) => (
            status === 'failed'
            || status === 'blocked'
            || status === 'cancelled'
          ));

          if (hasFailedDependency === true) {
            pending.delete(key);

            blocked.add(key);

            statuses.set(key, 'blocked');
          }
        }

        const readyTasks: Lib_RunWorkspaces_Runner_ExecuteTasks_ReadyTasks = [];

        for (const key of pending) {
          const candidateTask: Lib_RunWorkspaces_Runner_ExecuteTasks_CandidateTask = tasks.get(key);

          if (candidateTask === undefined) {
            continue;
          }

          const dependenciesReady: Lib_RunWorkspaces_Runner_ExecuteTasks_DependenciesReady = [...candidateTask['dependencies']].every((dependencyKey) => {
            const dependencyStatus: Lib_RunWorkspaces_Runner_ExecuteTasks_DependencyStatus = statuses.get(dependencyKey);

            return dependencyStatus === 'cached' || dependencyStatus === 'succeeded';
          });

          if (dependenciesReady === true) {
            readyTasks.push(candidateTask);
          }
        }

        readyTasks.sort((left, right) => left['key'].localeCompare(right['key']));

        for (const task of readyTasks.slice(0, Math.max(0, concurrency - running.size))) {
          pending.delete(task['key']);

          const taskPromise: Lib_RunWorkspaces_Runner_ExecuteTasks_TaskPromise = Runner.runTask(
            task,
            packageManager,
            packageManagerDescriptor,
            rootDirectory,
            cache,
            force,
            nodeEnv,
            (task['script'] === requestedTask) ? scriptArgs : [],
            stateDigests,
            queue,
            children,
            state,
          );

          running.set(task['key'], taskPromise);
        }

        if (running.size === 0) {
          break;
        }

        const result: Lib_RunWorkspaces_Runner_ExecuteTasks_Result = await Promise.race(running.values());
        const resolvedStatus: Lib_RunWorkspaces_Runner_ExecuteTasks_ResolvedStatus = (result['status'] === 'interrupted') ? 'cancelled' : result['status'];

        running.delete(result['key']);

        statuses.set(result['key'], resolvedStatus);

        if (result['stateDigest'] !== undefined) {
          stateDigests.set(result['key'], result['stateDigest']);
        }

        if (result['status'] === 'failed') {
          failures.set(result['key'], result['exitCode']);

          if (continueOnError === false) {
            Reflect.set(state, 'stopping', true);

            forwardSignal('SIGTERM');

            for (const key of pending) {
              statuses.set(key, 'cancelled');
            }

            pending.clear();
          }
        }
      }

      const remainingResults: Lib_RunWorkspaces_Runner_ExecuteTasks_RemainingResults = await Promise.allSettled(running.values());

      for (const remainingResult of remainingResults) {
        if (remainingResult.status !== 'fulfilled') {
          continue;
        }

        if (remainingResult.value['status'] === 'failed') {
          failures.set(remainingResult.value['key'], remainingResult.value['exitCode']);
        }

        if (remainingResult.value['stateDigest'] !== undefined) {
          stateDigests.set(remainingResult.value['key'], remainingResult.value['stateDigest']);
        }
      }
    } finally {
      clearInterval(flushInterval);

      process.off('SIGINT', handleSigint);

      process.off('SIGTERM', handleSigterm);

      flushQueue();

      if (activeState['key'] !== '') {
        const label: Lib_RunWorkspaces_Runner_ExecuteTasks_Label = prefixes.get(activeState['key']) ?? activeState['key'];

        writeStdout(`└─ ${label} ──\n`);

        Reflect.set(activeState, 'key', '');
      }
    }

    if (state['interrupted'] === true) {
      writeStdout(`${chalk.yellow('Workspace execution stopped.')}\n`);

      return 0;
    }

    if (blocked.size > 0) {
      writeStderr(`\n${chalk.yellow('Blocked workspace tasks:')}\n`);

      for (const key of blocked) {
        writeStderr(`  ${chalk.yellow('!')} ${prefixes.get(key) ?? key}\n`);
      }
    }

    if (failures.size > 0) {
      writeStderr(`\n${chalk.red('Failed workspace tasks:')}\n`);

      for (const failureEntry of failures) {
        const typedFailureEntry: Lib_RunWorkspaces_Runner_ExecuteTasks_TypedFailureEntry = failureEntry;
        const key: Lib_RunWorkspaces_Runner_ExecuteTasks_Key = typedFailureEntry[0];
        const code: Lib_RunWorkspaces_Runner_ExecuteTasks_Code = typedFailureEntry[1];

        writeStderr(`  ${chalk.red('✗')} ${prefixes.get(key) ?? key} — exit code ${code}\n`);
      }

      return 1;
    }

    return 0;
  }

  /**
   * Lib - Run Workspaces - Run Task.
   *
   * Verifies an eligible local cache record before spawning a package script,
   * then records the exact successful workspace state for future verification.
   *
   * @param {Lib_RunWorkspaces_Runner_RunTask_Task}                     task                     - Task.
   * @param {Lib_RunWorkspaces_Runner_RunTask_PackageManager}           packageManager           - Package manager.
   * @param {Lib_RunWorkspaces_Runner_RunTask_PackageManagerDescriptor} packageManagerDescriptor - Package manager descriptor.
   * @param {Lib_RunWorkspaces_Runner_RunTask_RootDirectory}            rootDirectory            - Root directory.
   * @param {Lib_RunWorkspaces_Runner_RunTask_Cache}                    cache                    - Cache.
   * @param {Lib_RunWorkspaces_Runner_RunTask_Force}                    force                    - Force.
   * @param {Lib_RunWorkspaces_Runner_RunTask_NodeEnv}                  nodeEnv                  - Node env.
   * @param {Lib_RunWorkspaces_Runner_RunTask_ScriptArgs}               scriptArgs               - Script args.
   * @param {Lib_RunWorkspaces_Runner_RunTask_StateDigests}             stateDigests             - State digests.
   * @param {Lib_RunWorkspaces_Runner_RunTask_Queue}                    queue                    - Queue.
   * @param {Lib_RunWorkspaces_Runner_RunTask_Children}                 children                 - Children.
   * @param {Lib_RunWorkspaces_Runner_RunTask_State}                    state                    - State.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_RunTask_Returns}
   *
   * @since 0.32.0
   */
  private static async runTask(task: Lib_RunWorkspaces_Runner_RunTask_Task, packageManager: Lib_RunWorkspaces_Runner_RunTask_PackageManager, packageManagerDescriptor: Lib_RunWorkspaces_Runner_RunTask_PackageManagerDescriptor, rootDirectory: Lib_RunWorkspaces_Runner_RunTask_RootDirectory, cache: Lib_RunWorkspaces_Runner_RunTask_Cache, force: Lib_RunWorkspaces_Runner_RunTask_Force, nodeEnv: Lib_RunWorkspaces_Runner_RunTask_NodeEnv, scriptArgs: Lib_RunWorkspaces_Runner_RunTask_ScriptArgs, stateDigests: Lib_RunWorkspaces_Runner_RunTask_StateDigests, queue: Lib_RunWorkspaces_Runner_RunTask_Queue, children: Lib_RunWorkspaces_Runner_RunTask_Children, state: Lib_RunWorkspaces_Runner_RunTask_State): Lib_RunWorkspaces_Runner_RunTask_Returns {
    const dependencyStateDigests: Lib_RunWorkspaces_Runner_RunTask_DependencyStateDigests = new Map([...task['dependencies']].flatMap((dependencyKey) => {
      const dependencyStateDigest: Lib_RunWorkspaces_Runner_RunTask_DependencyStateDigest = stateDigests.get(dependencyKey);

      return (dependencyStateDigest === undefined) ? [] : [[
        dependencyKey,
        dependencyStateDigest,
      ]];
    }));
    const hasAllDependencyDigests: Lib_RunWorkspaces_Runner_RunTask_HasAllDependencyDigests = dependencyStateDigests.size === task['dependencies'].size;
    const cacheCandidate: Lib_RunWorkspaces_Runner_RunTask_CacheCandidate = (
      cache['enabled'] === true
      && cache['scripts'].has(task['script']) === true
      && hasAllDependencyDigests === true
    );

    let stateDigest: Lib_RunWorkspaces_Runner_RunTask_StateDigest = undefined;
    let contextDigest: Lib_RunWorkspaces_Runner_RunTask_ContextDigest = undefined;

    if (cacheCandidate === true) {
      try {
        stateDigest = await getWorkspaceStateDigest(task['directory'], cache['directory']);
        contextDigest = await createContextDigest({
          dependencyStateDigests,
          nodeEnv,
          packageManager,
          packageManagerDescriptor,
          rootDirectory,
          scriptArgs,
          task,
        });

        if (force === false) {
          const cacheRecord: Lib_RunWorkspaces_Runner_RunTask_CacheRecord = await readCacheRecord(cache['directory'], task['key']);

          if (
            cacheRecord !== undefined
            && cacheRecord['contextDigest'] === contextDigest
            && cacheRecord['stateDigest'] === stateDigest
          ) {
            queue.push({
              kind: 'result',
              key: task['key'],
              stream: 'stdout',
              line: chalk.green('✔ (cached)'),
            });

            return {
              key: task['key'],
              status: 'cached',
              exitCode: 0,
              stateDigest,
            };
          }
        }
      } catch {
        stateDigest = undefined;
        contextDigest = undefined;
      }
    }

    const environment: Lib_RunWorkspaces_Runner_RunTask_Environment = Runner.getScriptEnvironment(nodeEnv);
    const commandArguments: Lib_RunWorkspaces_Runner_RunTask_CommandArguments = [
      'run',
      task['script'],
    ];

    if (scriptArgs.length > 0) {
      commandArguments.push('--', ...scriptArgs);
    }

    let spawnInvocation: Lib_RunWorkspaces_Runner_RunTask_SpawnInvocation = LibCorepack.resolveSpawnInvocation('npm', commandArguments);

    if (packageManager !== 'npm') {
      spawnInvocation = LibCorepack.resolveSpawnInvocation('corepack', [
        packageManager,
        ...commandArguments,
      ]);
    }

    const child: Lib_RunWorkspaces_Runner_RunTask_Child = spawn(spawnInvocation['command'], spawnInvocation['commandArguments'], {
      cwd: task['directory'],
      env: environment,
      stdio: 'pipe',
      shell: false,
    });
    const partialLines: Lib_RunWorkspaces_Runner_RunTask_PartialLines = new Map([
      [
        'stdout',
        '',
      ],
      [
        'stderr',
        '',
      ],
    ]);

    children.add(child);

    const result: Lib_RunWorkspaces_Runner_RunTask_Result = await new Promise((promiseResolve) => {
      let settled: Lib_RunWorkspaces_Runner_RunTask_Settled = false;

      /**
       * Lib - Run Workspaces - Run Task - Handle Data.
       *
       * Splits child output into complete buffered lines while retaining the
       * trailing partial line until the stream emits more data or closes.
       *
       * @returns {Lib_RunWorkspaces_Runner_RunTask_HandleData_Returns}
       *
       * @since 0.32.0
       */
      const handleData: Lib_RunWorkspaces_Runner_RunTask_HandleData = (data, stream): Lib_RunWorkspaces_Runner_RunTask_HandleData_Returns => {
        if (state['interrupted'] === true) {
          return;
        }

        const text: Lib_RunWorkspaces_Runner_RunTask_HandleData_Text = (partialLines.get(stream) ?? '') + data.toString();
        const lines: Lib_RunWorkspaces_Runner_RunTask_HandleData_Lines = text.split('\n');
        const partial: Lib_RunWorkspaces_Runner_RunTask_HandleData_Partial = lines.pop() ?? '';

        partialLines.set(stream, partial);

        for (const line of lines) {
          if (line.length > 0) {
            queue.push({
              kind: 'output',
              key: task['key'],
              stream,
              line,
            });
          }
        }

        return;
      };

      child.stdout.on('data', (data): Lib_RunWorkspaces_Runner_RunTask_Data_Returns => {
        handleData(data, 'stdout');

        return;
      });

      child.stderr.on('data', (data): Lib_RunWorkspaces_Runner_RunTask_Data_Returns => {
        handleData(data, 'stderr');

        return;
      });

      child.on('error', (error): Lib_RunWorkspaces_Runner_RunTask_Error_Returns => {
        if (settled === true) {
          return;
        }

        settled = true;
        children.delete(child);

        queue.push({
          kind: 'result',
          key: task['key'],
          stream: 'stderr',
          line: chalk.red(`✗ (failed to start: ${error.message})`),
        });

        promiseResolve({
          key: task['key'],
          status: 'failed',
          exitCode: 1,
        });

        return;
      });

      child.on('close', (code) => {
        if (settled === true) {
          return;
        }

        settled = true;
        children.delete(child);

        const stdoutPartial: Lib_RunWorkspaces_Runner_RunTask_Close_StdoutPartial = partialLines.get('stdout') ?? '';
        const stderrPartial: Lib_RunWorkspaces_Runner_RunTask_Close_StderrPartial = partialLines.get('stderr') ?? '';

        if (stdoutPartial.length > 0) {
          queue.push({
            kind: 'output',
            key: task['key'],
            stream: 'stdout',
            line: stdoutPartial,
          });
        }

        if (stderrPartial.length > 0) {
          queue.push({
            kind: 'output',
            key: task['key'],
            stream: 'stderr',
            line: stderrPartial,
          });
        }

        const exitCode: Lib_RunWorkspaces_Runner_RunTask_Close_ExitCode = code ?? 1;
        const isStoppingFailure: Lib_RunWorkspaces_Runner_RunTask_Close_IsStoppingFailure = state['stopping'] === true && exitCode !== 0;

        let status: Lib_RunWorkspaces_Runner_RunTask_Close_Status = 'failed';

        if (state['interrupted'] === true) {
          status = 'interrupted';
        } else if (isStoppingFailure === true) {
          status = 'cancelled';
        } else if (exitCode === 0) {
          status = 'succeeded';
        }

        let stream: Lib_RunWorkspaces_Runner_RunTask_Close_Stream = 'stdout';
        let line: Lib_RunWorkspaces_Runner_RunTask_Close_Line = chalk.green('✔');

        if (status === 'failed') {
          stream = 'stderr';
          line = chalk.red(`✗ (exit code ${exitCode})`);
        } else if (status === 'cancelled' || status === 'interrupted') {
          line = chalk.yellow('stopped');
        }

        queue.push({
          kind: 'result',
          key: task['key'],
          stream,
          line,
        });

        promiseResolve({
          key: task['key'],
          status,
          exitCode,
        });

        return;
      });

      return;
    });

    if (result['status'] !== 'succeeded') {
      return result;
    }

    try {
      stateDigest = await getWorkspaceStateDigest(task['directory'], cache['directory']);

      if (cacheCandidate === true && contextDigest !== undefined) {
        await writeCacheRecord(cache['directory'], task['key'], {
          contextDigest,
          stateDigest,
          version: 1,
        });
      }

      return {
        ...result,
        stateDigest,
      };
    } catch {
      return result;
    }
  }

  /**
   * Lib - Run Workspaces - Flush Output Queue.
   *
   * Writes buffered child output in framed workspace sections while preserving
   * each line's original stream.
   *
   * @param {Lib_RunWorkspaces_Runner_FlushOutputQueue_Queue}        queue        - Queue.
   * @param {Lib_RunWorkspaces_Runner_FlushOutputQueue_Prefixes}     prefixes     - Prefixes.
   * @param {Lib_RunWorkspaces_Runner_FlushOutputQueue_ActiveState}  activeState  - Active state.
   * @param {Lib_RunWorkspaces_Runner_FlushOutputQueue_WriteStderr}  writeStderr  - Write stderr.
   * @param {Lib_RunWorkspaces_Runner_FlushOutputQueue_WriteStdout}  writeStdout  - Write stdout.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_FlushOutputQueue_Returns}
   *
   * @since 0.32.0
   */
  private static flushOutputQueue(queue: Lib_RunWorkspaces_Runner_FlushOutputQueue_Queue, prefixes: Lib_RunWorkspaces_Runner_FlushOutputQueue_Prefixes, activeState: Lib_RunWorkspaces_Runner_FlushOutputQueue_ActiveState, writeStderr: Lib_RunWorkspaces_Runner_FlushOutputQueue_WriteStderr, writeStdout: Lib_RunWorkspaces_Runner_FlushOutputQueue_WriteStdout): Lib_RunWorkspaces_Runner_FlushOutputQueue_Returns {
    for (const entry of queue) {
      if (activeState['key'] !== '' && activeState['key'] !== entry['key']) {
        const activeLabel: Lib_RunWorkspaces_Runner_FlushOutputQueue_ActiveLabel = prefixes.get(activeState['key']) ?? activeState['key'];

        writeStdout(`└─ ${activeLabel} ──\n\n`);

        Reflect.set(activeState, 'key', '');
      }

      const label: Lib_RunWorkspaces_Runner_FlushOutputQueue_Label = prefixes.get(entry['key']) ?? entry['key'];

      if (activeState['key'] === '') {
        writeStdout(`┌─ ${label} ──\n`);

        Reflect.set(activeState, 'key', entry['key']);
      }

      if (entry['kind'] === 'result') {
        const resultLine: Lib_RunWorkspaces_Runner_FlushOutputQueue_ResultLine = `└─ ${label} ── ${entry['line']}\n`;

        if (entry['stream'] === 'stderr') {
          writeStderr(resultLine);
        } else {
          writeStdout(resultLine);
        }

        Reflect.set(activeState, 'key', '');

        continue;
      }

      const outputLine: Lib_RunWorkspaces_Runner_FlushOutputQueue_OutputLine = `[${label}] ${entry['line']}\n`;

      if (entry['stream'] === 'stderr') {
        writeStderr(outputLine);
      } else {
        writeStdout(outputLine);
      }
    }

    queue.splice(0, queue.length);

    return;
  }

  /**
   * Lib - Run Workspaces - Parse Positive Integer.
   *
   * Converts a CLI numeric option to a positive integer when it is valid.
   * Invalid or omitted values remain undefined for the caller to diagnose.
   *
   * @param {Lib_RunWorkspaces_Runner_ParsePositiveInteger_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_ParsePositiveInteger_Returns}
   *
   * @since 0.32.0
   */
  private static parsePositiveInteger(value: Lib_RunWorkspaces_Runner_ParsePositiveInteger_Value): Lib_RunWorkspaces_Runner_ParsePositiveInteger_Returns {
    if (value === undefined) {
      return undefined;
    }

    const parsed: Lib_RunWorkspaces_Runner_ParsePositiveInteger_Parsed = Number(value);

    if (Number.isInteger(parsed) === true && parsed > 0) {
      return parsed;
    }

    return undefined;
  }

  /**
   * Lib - Run Workspaces - Resolve Concurrency.
   *
   * Gives an explicit CLI limit priority, then selects the configured limit for
   * the requested script before falling back to Nova's reusable default.
   *
   * @param {Lib_RunWorkspaces_Runner_ResolveConcurrency_Concurrency}           concurrency           - Concurrency.
   * @param {Lib_RunWorkspaces_Runner_ResolveConcurrency_ConfiguredConcurrency} configuredConcurrency - Configured concurrency.
   * @param {Lib_RunWorkspaces_Runner_ResolveConcurrency_Task}                  task                  - Task.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_ResolveConcurrency_Returns}
   *
   * @since 0.33.0
   */
  private static resolveConcurrency(concurrency: Lib_RunWorkspaces_Runner_ResolveConcurrency_Concurrency, configuredConcurrency: Lib_RunWorkspaces_Runner_ResolveConcurrency_ConfiguredConcurrency, task: Lib_RunWorkspaces_Runner_ResolveConcurrency_Task): Lib_RunWorkspaces_Runner_ResolveConcurrency_Returns {
    return (
      concurrency
      ?? configuredConcurrency[task]
      ?? LIB_CONSTANTS_RUN_WORKSPACES_DEFAULT_CONCURRENCY
    );
  }

  /**
   * Lib - Run Workspaces - Get Script Environment.
   *
   * Copies the parent environment and applies an explicit NODE_ENV only when
   * the caller requests one.
   *
   * @param {Lib_RunWorkspaces_Runner_GetScriptEnvironment_NodeEnv} nodeEnv - Node env.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_GetScriptEnvironment_Returns}
   *
   * @since 0.32.0
   */
  private static getScriptEnvironment(nodeEnv: Lib_RunWorkspaces_Runner_GetScriptEnvironment_NodeEnv): Lib_RunWorkspaces_Runner_GetScriptEnvironment_Returns {
    const environment: Lib_RunWorkspaces_Runner_GetScriptEnvironment_Environment = {
      ...process.env,
      NOVA_WORKSPACE_RUNNER: 'true',
    };

    if (nodeEnv !== undefined) {
      Reflect.set(environment, 'NODE_ENV', nodeEnv);
    }

    if (
      environment['FORCE_COLOR'] === undefined
      && environment['NO_COLOR'] === undefined
      && (
        process.stdout.isTTY === true
        || process.stderr.isTTY === true
      )
    ) {
      Reflect.set(environment, 'FORCE_COLOR', '1');
    }

    return environment;
  }

  /**
   * Lib - Run Workspaces - Task Key.
   *
   * Produces the stable workspace-and-script label used throughout the graph.
   * The same key identifies dependencies, output sections, and summaries.
   *
   * @param {Lib_RunWorkspaces_Runner_TaskKey_WorkspaceName} workspaceName - Workspace name.
   * @param {Lib_RunWorkspaces_Runner_TaskKey_Script}        script        - Script.
   *
   * @private
   *
   * @returns {Lib_RunWorkspaces_Runner_TaskKey_Returns}
   *
   * @since 0.32.0
   */
  private static taskKey(workspaceName: Lib_RunWorkspaces_Runner_TaskKey_WorkspaceName, script: Lib_RunWorkspaces_Runner_TaskKey_Script): Lib_RunWorkspaces_Runner_TaskKey_Returns {
    return `${workspaceName}#${script}`;
  }
}
