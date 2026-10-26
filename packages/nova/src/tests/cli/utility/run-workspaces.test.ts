import { strictEqual } from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import { Runner as LibRunWorkspaces } from '../../../lib/run-workspaces.js';

import type {
  Tests_Cli_Utility_RunWorkspaces_AlphaDirectory,
  Tests_Cli_Utility_RunWorkspaces_AlphaPackageJsonContents,
  Tests_Cli_Utility_RunWorkspaces_AppDirectory,
  Tests_Cli_Utility_RunWorkspaces_AppPackageJsonContents,
  Tests_Cli_Utility_RunWorkspaces_BetaDirectory,
  Tests_Cli_Utility_RunWorkspaces_BetaPackageJsonContents,
  Tests_Cli_Utility_RunWorkspaces_CacheDirectory,
  Tests_Cli_Utility_RunWorkspaces_CachedOutput,
  Tests_Cli_Utility_RunWorkspaces_CacheFile,
  Tests_Cli_Utility_RunWorkspaces_CacheFiles,
  Tests_Cli_Utility_RunWorkspaces_CacheRecordPath,
  Tests_Cli_Utility_RunWorkspaces_Captured,
  Tests_Cli_Utility_RunWorkspaces_CaptureDirectory,
  Tests_Cli_Utility_RunWorkspaces_CapturePackageJsonContents,
  Tests_Cli_Utility_RunWorkspaces_CaptureScriptContents,
  Tests_Cli_Utility_RunWorkspaces_CoreDirectory,
  Tests_Cli_Utility_RunWorkspaces_CorePackageJsonContents,
  Tests_Cli_Utility_RunWorkspaces_CounterContents,
  Tests_Cli_Utility_RunWorkspaces_CounterPath,
  Tests_Cli_Utility_RunWorkspaces_Errors,
  Tests_Cli_Utility_RunWorkspaces_ExitCode,
  Tests_Cli_Utility_RunWorkspaces_IndependentOutput,
  Tests_Cli_Utility_RunWorkspaces_IndependentOutputPath,
  Tests_Cli_Utility_RunWorkspaces_Infos,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_BuildsInternalDependenciesBeforeASelectedWorkspaceCheck_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_ContinuesIndependentTasksAndBlocksDependentsAfterFailure_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_ContinuesIndependentTasksAndBlocksDependentsAfterFailure_WorkspacePackageJsonContents,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_RunFailure,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_RunFailure_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_WorkspacePackageJsonContents,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_ForwardsArgumentsAndMarksWorkspaceChildren_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_KeepsTheRootWhenFilteringWorkspaces_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_LeavesTheRootOutWhenItIsExcluded_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_NeverCachesRootSteps_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_NeverCachesRootSteps_SecondExitCode,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_PreviewsAWorkspaceTaskGraphWithoutExecutingScripts_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_RejectsAnUnknownWorkspaceBeforeExecutingTasks_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_RejectsInternalDependencyCyclesBeforeExecutingTasks_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_RunsRootStepsBeforeWorkspaceTasks_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_SkipsTheRootInsideANestedRun_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_SkipsTheRootWhenConfiguredTo_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_ExitCode,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_ForbiddenOutputExists,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_ForbiddenOutputPath,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_MarkerPath,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_PriorSigintListeners,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_RunPromise,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_SigintListener,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_RunBuild,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_RunBuild_Returns,
  Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_WorkspacePackageJsonContents,
  Tests_Cli_Utility_RunWorkspaces_NovaConfigContents,
  Tests_Cli_Utility_RunWorkspaces_OriginalCwd,
  Tests_Cli_Utility_RunWorkspaces_Output,
  Tests_Cli_Utility_RunWorkspaces_OutputAfter,
  Tests_Cli_Utility_RunWorkspaces_OutputBefore,
  Tests_Cli_Utility_RunWorkspaces_OutputPath,
  Tests_Cli_Utility_RunWorkspaces_PackageJsonContents,
  Tests_Cli_Utility_RunWorkspaces_ProjectRoot,
  Tests_Cli_Utility_RunWorkspaces_SandboxRoot,
  Tests_Cli_Utility_RunWorkspaces_SavedLifecycleEvent,
  Tests_Cli_Utility_RunWorkspaces_SavedRunnerMarker,
  Tests_Cli_Utility_RunWorkspaces_SourcePath,
  Tests_Cli_Utility_RunWorkspaces_Stderr,
  Tests_Cli_Utility_RunWorkspaces_TemporaryDirectory,
  Tests_Cli_Utility_RunWorkspaces_TemporaryPrefix,
  Tests_Cli_Utility_RunWorkspaces_Warnings,
  Tests_Cli_Utility_RunWorkspaces_WorkspaceDirectory,
} from '../../../types/tests/cli/utility/run-workspaces.test.d.ts';

/**
 * Tests - CLI - Utility - Run Workspaces - Run.
 *
 * @since 0.32.0
 */
describe('LibRunWorkspaces.run', async () => {
  const originalCwd: Tests_Cli_Utility_RunWorkspaces_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_RunWorkspaces_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Utility_RunWorkspaces_TemporaryPrefix = join(temporaryDirectory, 'nova-run-workspaces-');
  const sandboxRoot: Tests_Cli_Utility_RunWorkspaces_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  // A migrated "npm run check" marks this process as a workspace child, which would hide the root.
  const savedRunnerMarker: Tests_Cli_Utility_RunWorkspaces_SavedRunnerMarker = process.env['NOVA_WORKSPACE_RUNNER'];
  const savedLifecycleEvent: Tests_Cli_Utility_RunWorkspaces_SavedLifecycleEvent = process.env['npm_lifecycle_event'];

  beforeEach(() => {
    Reflect.deleteProperty(process.env, 'NOVA_WORKSPACE_RUNNER');

    Reflect.deleteProperty(process.env, 'npm_lifecycle_event');

    return;
  });

  afterEach(() => {
    Reflect.deleteProperty(process.env, 'NOVA_WORKSPACE_RUNNER');

    Reflect.deleteProperty(process.env, 'npm_lifecycle_event');

    if (savedRunnerMarker !== undefined) {
      Reflect.set(process.env, 'NOVA_WORKSPACE_RUNNER', savedRunnerMarker);
    }

    if (savedLifecycleEvent !== undefined) {
      Reflect.set(process.env, 'npm_lifecycle_event', savedLifecycleEvent);
    }

    return;
  });

  it('builds internal dependencies before a selected workspace check', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_BuildsInternalDependenciesBeforeASelectedWorkspaceCheck_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'dependency-order');
    const coreDirectory: Tests_Cli_Utility_RunWorkspaces_CoreDirectory = join(projectRoot, 'packages', 'core');
    const appDirectory: Tests_Cli_Utility_RunWorkspaces_AppDirectory = join(projectRoot, 'apps', 'app');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];

    await mkdir(coreDirectory, { recursive: true });
    await mkdir(appDirectory, { recursive: true });

    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'workspace-project',
      private: true,
      packageManager: 'npm@11.18.0',
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'workspace',
          title: 'Workspace',
        },
      },
      workspaces: {
        './': {
          name: 'workspace-project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/core': {
          name: '@example/core',
          role: 'package',
          policy: 'distributable',
        },
        './apps/app': {
          name: '@example/app',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const corePackageJsonContents: Tests_Cli_Utility_RunWorkspaces_CorePackageJsonContents = JSON.stringify({
      name: '@example/core',
      scripts: {
        build: 'node -e "require(\'node:fs\').appendFileSync(\'../../order.txt\', \'core-build\' + String.fromCharCode(10))"',
      },
    }, null, 2);
    const appPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AppPackageJsonContents = JSON.stringify({
      name: '@example/app',
      dependencies: {
        '@example/core': 'workspace:*',
      },
      scripts: {
        check: 'node -e "require(\'node:fs\').appendFileSync(\'../../order.txt\', \'app-check\' + String.fromCharCode(10))"',
      },
    }, null, 2);

    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(coreDirectory, 'package.json'), `${corePackageJsonContents}\n`, 'utf-8');
    await writeFile(join(appDirectory, 'package.json'), `${appPackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'check',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: ['@example/app'],
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: (message) => {
        process.stdout.write(`${message}\n`);

        return;
      },
      printWarn: (message) => {
        process.stderr.write(`${message}\n`);

        return;
      },
      writeStderr: (message) => {
        process.stderr.write(message);

        return;
      },
      writeStdout: (message) => {
        process.stdout.write(message);

        return;
      },
    });
    const outputPath: Tests_Cli_Utility_RunWorkspaces_OutputPath = join(projectRoot, 'order.txt');

    strictEqual(exitCode, 0, errors.join('\n'));

    const output: Tests_Cli_Utility_RunWorkspaces_Output = await readFile(outputPath, 'utf-8');

    strictEqual(output, [
      'core-build',
      'app-check',
      '',
    ].join('\n'));

    return;
  });

  it('forwards arguments and marks workspace children', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_ForwardsArgumentsAndMarksWorkspaceChildren_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'script-arguments');
    const captureDirectory: Tests_Cli_Utility_RunWorkspaces_CaptureDirectory = join(projectRoot, 'packages', 'capture');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];
    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'script-arguments-project',
      private: true,
      packageManager: 'npm@11.18.0',
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'script-arguments',
          title: 'Script Arguments',
        },
      },
      workspaces: {
        './': {
          name: 'script-arguments-project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/capture': {
          name: '@example/capture',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const capturePackageJsonContents: Tests_Cli_Utility_RunWorkspaces_CapturePackageJsonContents = JSON.stringify({
      name: '@example/capture',
      scripts: {
        build: 'node ./capture.mjs',
      },
    }, null, 2);
    const captureScriptContents: Tests_Cli_Utility_RunWorkspaces_CaptureScriptContents = [
      'import { writeFile } from \'node:fs/promises\';',
      '',
      'await writeFile(\'../../capture.json\', JSON.stringify({',
      '  arguments: process.argv.slice(2),',
      '  marker: process.env[\'NOVA_WORKSPACE_RUNNER\'],',
      '  nodeEnv: process.env[\'NODE_ENV\'],',
      '}));',
      '',
    ].join('\n');

    await mkdir(captureDirectory, { recursive: true });
    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(captureDirectory, 'package.json'), `${capturePackageJsonContents}\n`, 'utf-8');
    await writeFile(join(captureDirectory, 'capture.mjs'), captureScriptContents, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'build',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: undefined,
      nodeEnv: 'production',
      scriptArgs: [
        '--representative',
        '--locale',
        'en',
      ],
      workspace: undefined,
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: () => undefined,
      printWarn: () => undefined,
      writeStderr: () => undefined,
      writeStdout: () => undefined,
    });
    const captured: Tests_Cli_Utility_RunWorkspaces_Captured = JSON.parse(await readFile(join(projectRoot, 'capture.json'), 'utf-8'));

    strictEqual(exitCode, 0, errors.join('\n'));
    strictEqual(JSON.stringify(captured['arguments']), JSON.stringify([
      '--representative',
      '--locale',
      'en',
    ]));
    strictEqual(captured['marker'], 'true');
    strictEqual(captured['nodeEnv'], 'production');

    return;
  });

  it('rejects an unknown workspace before executing tasks', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_RejectsAnUnknownWorkspaceBeforeExecutingTasks_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'dependency-order');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'build',
      buffer: undefined,
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: true,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: ['@example/missing'],
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: () => undefined,
      printWarn: () => undefined,
      writeStderr: () => undefined,
      writeStdout: () => undefined,
    });

    strictEqual(exitCode, 1);
    strictEqual(errors[0], 'Unknown workspace selection: @example/missing.');

    return;
  });

  it('previews a workspace task graph without executing scripts', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_PreviewsAWorkspaceTaskGraphWithoutExecutingScripts_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'dependency-order');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];
    const infos: Tests_Cli_Utility_RunWorkspaces_Infos = [];
    const outputPath: Tests_Cli_Utility_RunWorkspaces_OutputPath = join(projectRoot, 'order.txt');
    const outputBefore: Tests_Cli_Utility_RunWorkspaces_OutputBefore = await readFile(outputPath, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'build',
      buffer: undefined,
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: true,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: ['@example/core'],
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: (message) => {
        infos.push(message);

        return;
      },
      printWarn: () => undefined,
      writeStderr: () => undefined,
      writeStdout: () => undefined,
    });
    const outputAfter: Tests_Cli_Utility_RunWorkspaces_OutputAfter = await readFile(outputPath, 'utf-8');

    strictEqual(exitCode, 0, errors.join('\n'));
    strictEqual(outputAfter, outputBefore);
    strictEqual(infos[0], 'Planned 1 workspace task(s): @example/core#build');
    strictEqual(infos[1], 'Dry run complete. No workspace scripts were executed.');

    return;
  });

  it('rejects internal dependency cycles before executing tasks', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_RejectsInternalDependencyCyclesBeforeExecutingTasks_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'dependency-cycle');
    const alphaDirectory: Tests_Cli_Utility_RunWorkspaces_AlphaDirectory = join(projectRoot, 'packages', 'alpha');
    const betaDirectory: Tests_Cli_Utility_RunWorkspaces_BetaDirectory = join(projectRoot, 'packages', 'beta');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];
    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'cycle-project',
      private: true,
      packageManager: 'npm@11.18.0',
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'cycle',
          title: 'Cycle',
        },
      },
      workspaces: {
        './': {
          name: 'cycle-project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/alpha': {
          name: '@example/alpha',
          role: 'package',
          policy: 'distributable',
        },
        './packages/beta': {
          name: '@example/beta',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const alphaPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AlphaPackageJsonContents = JSON.stringify({
      name: '@example/alpha',
      dependencies: {
        '@example/beta': 'workspace:*',
      },
      scripts: {
        build: 'node -e "process.exit(0)"',
      },
    }, null, 2);
    const betaPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_BetaPackageJsonContents = JSON.stringify({
      name: '@example/beta',
      dependencies: {
        '@example/alpha': 'workspace:*',
      },
      scripts: {
        build: 'node -e "process.exit(0)"',
      },
    }, null, 2);

    await mkdir(alphaDirectory, { recursive: true });
    await mkdir(betaDirectory, { recursive: true });
    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(alphaDirectory, 'package.json'), `${alphaPackageJsonContents}\n`, 'utf-8');
    await writeFile(join(betaDirectory, 'package.json'), `${betaPackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'build',
      buffer: undefined,
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: true,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: undefined,
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: () => undefined,
      printWarn: () => undefined,
      writeStderr: () => undefined,
      writeStdout: () => undefined,
    });

    strictEqual(exitCode, 1);
    strictEqual(errors[0], 'Internal workspace dependency cycle detected: @example/alpha, @example/beta.');

    return;
  });

  it('verifies cached workspace state before skipping execution', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'verified-cache');
    const workspaceDirectory: Tests_Cli_Utility_RunWorkspaces_WorkspaceDirectory = join(projectRoot, 'packages', 'cached');
    const sourcePath: Tests_Cli_Utility_RunWorkspaces_SourcePath = join(workspaceDirectory, 'source.txt');
    const outputPath: Tests_Cli_Utility_RunWorkspaces_OutputPath = join(workspaceDirectory, 'dist', 'output.txt');
    const counterPath: Tests_Cli_Utility_RunWorkspaces_CounterPath = join(projectRoot, 'executions.txt');
    const cacheDirectory: Tests_Cli_Utility_RunWorkspaces_CacheDirectory = join(projectRoot, 'node_modules', '.cache', 'nova', 'run-workspaces');
    const cachedOutput: Tests_Cli_Utility_RunWorkspaces_CachedOutput = [];
    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'verified-cache-project',
      private: true,
      packageManager: 'npm@11.18.0',
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'verified-cache',
          title: 'Verified Cache',
        },
      },
      settings: {
        runWorkspaces: {
          cache: {
            directory: './node_modules/.cache/nova/run-workspaces',
            enabled: true,
            scripts: ['build'],
          },
        },
      },
      workspaces: {
        './': {
          name: 'verified-cache-project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/cached': {
          name: '@example/cached',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const workspacePackageJsonContents: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_WorkspacePackageJsonContents = JSON.stringify({
      name: '@example/cached',
      scripts: {
        build: 'node -e "const fs = require(\'node:fs\'); const input = fs.readFileSync(\'source.txt\', \'utf-8\'); fs.mkdirSync(\'dist\', { recursive: true }); fs.writeFileSync(\'dist/output.txt\', input); fs.appendFileSync(\'../../executions.txt\', \'run\' + String.fromCharCode(10));"',
      },
    }, null, 2);

    await mkdir(workspaceDirectory, { recursive: true });
    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(workspaceDirectory, 'package.json'), `${workspacePackageJsonContents}\n`, 'utf-8');
    await writeFile(sourcePath, [
      'first',
      '',
    ].join('\n'), 'utf-8');

    process.chdir(projectRoot);

    const runBuild: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_RunBuild = async (force): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_VerifiesCachedWorkspaceStateBeforeSkippingExecution_RunBuild_Returns => {
      return LibRunWorkspaces.run({
        task: 'build',
        buffer: '10',
        concurrency: undefined,
        continueOnError: undefined,
        dryRun: undefined,
        excludeWorkspace: undefined,
        force: (force === true) ? true : undefined,
        nodeEnv: undefined,
        scriptArgs: undefined,
        workspace: undefined,
        printError: () => undefined,
        printInfo: () => undefined,
        printWarn: () => undefined,
        writeStderr: () => undefined,
        writeStdout: (message) => {
          cachedOutput.push(message);

          return;
        },
      });
    };

    strictEqual(await runBuild(false), 0);
    strictEqual(await runBuild(false), 0);

    let counterContents: Tests_Cli_Utility_RunWorkspaces_CounterContents = await readFile(counterPath, 'utf-8');

    strictEqual(counterContents, [
      'run',
      '',
    ].join('\n'));
    strictEqual(cachedOutput.some((message) => message.includes('(cached)')), true);

    await writeFile(sourcePath, [
      'second',
      '',
    ].join('\n'), 'utf-8');

    strictEqual(await runBuild(false), 0);

    counterContents = await readFile(counterPath, 'utf-8');

    strictEqual(counterContents, [
      'run',
      'run',
      '',
    ].join('\n'));
    strictEqual(await readFile(outputPath, 'utf-8'), [
      'second',
      '',
    ].join('\n'));

    await rm(outputPath);

    strictEqual(await runBuild(false), 0);

    counterContents = await readFile(counterPath, 'utf-8');

    strictEqual(counterContents, [
      'run',
      'run',
      'run',
      '',
    ].join('\n'));

    const cacheFiles: Tests_Cli_Utility_RunWorkspaces_CacheFiles = await readdir(cacheDirectory);
    const cacheFile: Tests_Cli_Utility_RunWorkspaces_CacheFile = cacheFiles[0];

    if (cacheFile === undefined) {
      throw new Error('Expected a verified cache record.');
    }

    const cacheRecordPath: Tests_Cli_Utility_RunWorkspaces_CacheRecordPath = join(cacheDirectory, cacheFile);

    await writeFile(cacheRecordPath, '{invalid', 'utf-8');

    strictEqual(await runBuild(false), 0);
    strictEqual(await runBuild(true), 0);

    counterContents = await readFile(counterPath, 'utf-8');

    strictEqual(counterContents, [
      'run',
      'run',
      'run',
      'run',
      'run',
      '',
    ].join('\n'));

    return;
  });

  it('does not cache failed tasks', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'failed-cache');
    const workspaceDirectory: Tests_Cli_Utility_RunWorkspaces_WorkspaceDirectory = join(projectRoot, 'packages', 'failed');
    const counterPath: Tests_Cli_Utility_RunWorkspaces_CounterPath = join(projectRoot, 'failure-count.txt');
    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'failed-cache-project',
      private: true,
      packageManager: 'npm@11.18.0',
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'failed-cache',
          title: 'Failed Cache',
        },
      },
      workspaces: {
        './': {
          name: 'failed-cache-project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/failed': {
          name: '@example/failed',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const workspacePackageJsonContents: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_WorkspacePackageJsonContents = JSON.stringify({
      name: '@example/failed',
      scripts: {
        build: 'node -e "require(\'node:fs\').appendFileSync(\'../../failure-count.txt\', \'run\' + String.fromCharCode(10)); process.exit(1);"',
      },
    }, null, 2);

    await mkdir(workspaceDirectory, { recursive: true });
    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(workspaceDirectory, 'package.json'), `${workspacePackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const runFailure: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_RunFailure = async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_DoesNotCacheFailedTasks_RunFailure_Returns => {
      return LibRunWorkspaces.run({
        task: 'build',
        buffer: '10',
        concurrency: undefined,
        continueOnError: undefined,
        dryRun: undefined,
        excludeWorkspace: undefined,
        nodeEnv: undefined,
        scriptArgs: undefined,
        workspace: undefined,
        printError: () => undefined,
        printInfo: () => undefined,
        printWarn: () => undefined,
        writeStderr: () => undefined,
        writeStdout: () => undefined,
      });
    };

    strictEqual(await runFailure(), 1);
    strictEqual(await runFailure(), 1);

    const counterContents: Tests_Cli_Utility_RunWorkspaces_CounterContents = await readFile(counterPath, 'utf-8');

    strictEqual(counterContents, [
      'run',
      'run',
      '',
    ].join('\n'));

    return;
  });

  it('stops scheduling pending tasks after interruption', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'interrupted-scheduling');
    const alphaDirectory: Tests_Cli_Utility_RunWorkspaces_AlphaDirectory = join(projectRoot, 'packages', 'alpha');
    const betaDirectory: Tests_Cli_Utility_RunWorkspaces_BetaDirectory = join(projectRoot, 'packages', 'beta');
    const markerPath: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_MarkerPath = join(projectRoot, 'started.txt');
    const forbiddenOutputPath: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_ForbiddenOutputPath = join(projectRoot, 'unexpected.txt');
    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'interrupted-scheduling-project',
      private: true,
      packageManager: 'npm@11.18.0',
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'interrupted-scheduling',
          title: 'Interrupted Scheduling',
        },
      },
      settings: {
        runWorkspaces: {
          concurrency: {
            dev: 1,
          },
        },
      },
      workspaces: {
        './': {
          name: 'interrupted-scheduling-project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/alpha': {
          name: '@example/alpha',
          role: 'package',
          policy: 'distributable',
        },
        './packages/beta': {
          name: '@example/beta',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const alphaPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AlphaPackageJsonContents = JSON.stringify({
      name: '@example/alpha',
      scripts: {
        dev: 'node -e "require(\'node:fs\').writeFileSync(\'../../started.txt\', \'started\'); setTimeout(() => undefined, 500)"',
      },
    }, null, 2);
    const betaPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_BetaPackageJsonContents = JSON.stringify({
      name: '@example/beta',
      scripts: {
        dev: 'node -e "require(\'node:fs\').writeFileSync(\'../../unexpected.txt\', \'unexpected\')"',
      },
    }, null, 2);

    await mkdir(alphaDirectory, { recursive: true });
    await mkdir(betaDirectory, { recursive: true });
    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(alphaDirectory, 'package.json'), `${alphaPackageJsonContents}\n`, 'utf-8');
    await writeFile(join(betaDirectory, 'package.json'), `${betaPackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const priorSigintListeners: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_PriorSigintListeners = new Set(process.listeners('SIGINT'));
    const runPromise: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_RunPromise = LibRunWorkspaces.run({
      task: 'dev',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: undefined,
      force: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: undefined,
      printError: () => undefined,
      printInfo: () => undefined,
      printWarn: () => undefined,
      writeStderr: () => undefined,
      writeStdout: () => undefined,
    });

    await expect.poll(async () => {
      try {
        await access(markerPath);

        return true;
      } catch {
        return false;
      }
    }, {
      timeout: 1_000,
    }).toBe(true);

    const sigintListener: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_SigintListener = process.listeners('SIGINT').find((listener) => priorSigintListeners.has(listener) === false);

    if (sigintListener === undefined) {
      throw new Error('The workspace runner did not register its SIGINT listener.');
    }

    sigintListener('SIGINT');

    const exitCode: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_ExitCode = await runPromise;
    let forbiddenOutputExists: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_StopsSchedulingPendingTasksAfterInterruption_ForbiddenOutputExists = true;

    try {
      await access(forbiddenOutputPath);
    } catch {
      forbiddenOutputExists = false;
    }

    strictEqual(exitCode, 0);
    strictEqual(forbiddenOutputExists, false);

    return;
  });

  it('continues independent tasks and blocks dependents after failure', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_ContinuesIndependentTasksAndBlocksDependentsAfterFailure_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'continue-on-error');
    const alphaDirectory: Tests_Cli_Utility_RunWorkspaces_AlphaDirectory = join(projectRoot, 'packages', 'failure');
    const betaDirectory: Tests_Cli_Utility_RunWorkspaces_BetaDirectory = join(projectRoot, 'packages', 'blocked');
    const workspaceDirectory: Tests_Cli_Utility_RunWorkspaces_WorkspaceDirectory = join(projectRoot, 'packages', 'independent');
    const independentOutputPath: Tests_Cli_Utility_RunWorkspaces_IndependentOutputPath = join(projectRoot, 'independent.txt');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];
    const stderr: Tests_Cli_Utility_RunWorkspaces_Stderr = [];
    const warnings: Tests_Cli_Utility_RunWorkspaces_Warnings = [];
    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'continue-on-error-project',
      private: true,
      packageManager: 'npm@11.18.0',
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'continue-on-error',
          title: 'Continue On Error',
        },
      },
      workspaces: {
        './': {
          name: 'continue-on-error-project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/blocked': {
          name: '@example/blocked',
          role: 'package',
          policy: 'distributable',
        },
        './packages/failure': {
          name: '@example/failure',
          role: 'package',
          policy: 'distributable',
        },
        './packages/independent': {
          name: '@example/independent',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const alphaPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AlphaPackageJsonContents = JSON.stringify({
      name: '@example/failure',
      scripts: {
        build: 'node -e "process.exit(1)"',
      },
    }, null, 2);
    const betaPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_BetaPackageJsonContents = JSON.stringify({
      name: '@example/blocked',
      dependencies: {
        '@example/failure': 'workspace:*',
      },
      scripts: {
        build: 'node -e "require(\'node:fs\').writeFileSync(\'../../blocked.txt\', \'unexpected\')"',
      },
    }, null, 2);
    const workspacePackageJsonContents: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_ContinuesIndependentTasksAndBlocksDependentsAfterFailure_WorkspacePackageJsonContents = JSON.stringify({
      name: '@example/independent',
      scripts: {
        build: 'node -e "require(\'node:fs\').writeFileSync(\'../../independent.txt\', \'completed\')"',
      },
    }, null, 2);

    await mkdir(alphaDirectory, { recursive: true });
    await mkdir(betaDirectory, { recursive: true });
    await mkdir(workspaceDirectory, { recursive: true });
    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(alphaDirectory, 'package.json'), `${alphaPackageJsonContents}\n`, 'utf-8');
    await writeFile(join(betaDirectory, 'package.json'), `${betaPackageJsonContents}\n`, 'utf-8');
    await writeFile(join(workspaceDirectory, 'package.json'), `${workspacePackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'build',
      buffer: '10',
      concurrency: '1',
      continueOnError: true,
      dryRun: undefined,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: undefined,
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: () => undefined,
      printWarn: (message) => {
        warnings.push(message);

        return;
      },
      writeStderr: (message) => {
        stderr.push(message);

        return;
      },
      writeStdout: () => undefined,
    });
    const independentOutput: Tests_Cli_Utility_RunWorkspaces_IndependentOutput = await readFile(independentOutputPath, 'utf-8');

    strictEqual(exitCode, 1, errors.join('\n'));
    strictEqual(independentOutput, 'completed');
    strictEqual(stderr.some((message) => message.includes('@example/blocked#build')), true);
    strictEqual(warnings.length, 0);

    return;
  });

  it('runs root steps before workspace tasks', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_RunsRootStepsBeforeWorkspaceTasks_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'root-runsRootStepsBeforeWorkspaceTasks');
    const appDirectory: Tests_Cli_Utility_RunWorkspaces_AppDirectory = join(projectRoot, 'apps', 'app');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];

    await mkdir(appDirectory, { recursive: true });

    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'workspace-project',
      private: true,
      packageManager: 'npm@11.18.0',
      scripts: {
        'check': 'nova utility run-workspaces check',
        'check:lint': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-lint\' + String.fromCharCode(10))"',
        'check:types': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-types\' + String.fromCharCode(10))"',
        'check:workspaces': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'dispatcher\' + String.fromCharCode(10))"',
      },
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'workspace',
          title: 'Workspace',
        },
      },
      workspaces: {
        './': {
          name: 'workspace-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/app': {
          name: '@example/app',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const appPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AppPackageJsonContents = JSON.stringify({
      name: '@example/app',
      scripts: {
        check: 'node -e "require(\'node:fs\').appendFileSync(\'../../order.txt\', \'app-check\' + String.fromCharCode(10))"',
      },
    }, null, 2);

    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(appDirectory, 'package.json'), `${appPackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'check',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: undefined,
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: (message) => {
        process.stdout.write(`${message}\n`);

        return;
      },
      printWarn: (message) => {
        process.stderr.write(`${message}\n`);

        return;
      },
      writeStderr: (message) => {
        process.stderr.write(message);

        return;
      },
      writeStdout: (message) => {
        process.stdout.write(message);

        return;
      },
    });

    strictEqual(exitCode, 0, errors.join('\n'));

    const outputPath: Tests_Cli_Utility_RunWorkspaces_OutputPath = join(projectRoot, 'order.txt');
    const output: Tests_Cli_Utility_RunWorkspaces_Output = await readFile(outputPath, 'utf-8');

    strictEqual(output, [
      'root-lint',
      'root-types',
      'app-check',
      '',
    ].join('\n'));

    return;
  });

  it('keeps the root when filtering workspaces', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_KeepsTheRootWhenFilteringWorkspaces_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'root-keepsTheRootWhenFilteringWorkspaces');
    const appDirectory: Tests_Cli_Utility_RunWorkspaces_AppDirectory = join(projectRoot, 'apps', 'app');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];

    await mkdir(appDirectory, { recursive: true });

    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'workspace-project',
      private: true,
      packageManager: 'npm@11.18.0',
      scripts: {
        'check': 'nova utility run-workspaces check',
        'check:lint': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-lint\' + String.fromCharCode(10))"',
        'check:types': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-types\' + String.fromCharCode(10))"',
        'check:workspaces': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'dispatcher\' + String.fromCharCode(10))"',
      },
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'workspace',
          title: 'Workspace',
        },
      },
      workspaces: {
        './': {
          name: 'workspace-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/app': {
          name: '@example/app',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const appPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AppPackageJsonContents = JSON.stringify({
      name: '@example/app',
      scripts: {
        check: 'node -e "require(\'node:fs\').appendFileSync(\'../../order.txt\', \'app-check\' + String.fromCharCode(10))"',
      },
    }, null, 2);

    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(appDirectory, 'package.json'), `${appPackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'check',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: ['@example/app'],
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: (message) => {
        process.stdout.write(`${message}\n`);

        return;
      },
      printWarn: (message) => {
        process.stderr.write(`${message}\n`);

        return;
      },
      writeStderr: (message) => {
        process.stderr.write(message);

        return;
      },
      writeStdout: (message) => {
        process.stdout.write(message);

        return;
      },
    });

    strictEqual(exitCode, 0, errors.join('\n'));

    const outputPath: Tests_Cli_Utility_RunWorkspaces_OutputPath = join(projectRoot, 'order.txt');
    const output: Tests_Cli_Utility_RunWorkspaces_Output = await readFile(outputPath, 'utf-8');

    strictEqual(output, [
      'root-lint',
      'root-types',
      'app-check',
      '',
    ].join('\n'));

    return;
  });

  it('leaves the root out when it is excluded', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_LeavesTheRootOutWhenItIsExcluded_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'root-leavesTheRootOutWhenItIsExcluded');
    const appDirectory: Tests_Cli_Utility_RunWorkspaces_AppDirectory = join(projectRoot, 'apps', 'app');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];

    await mkdir(appDirectory, { recursive: true });

    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'workspace-project',
      private: true,
      packageManager: 'npm@11.18.0',
      scripts: {
        'check': 'nova utility run-workspaces check',
        'check:lint': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-lint\' + String.fromCharCode(10))"',
        'check:types': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-types\' + String.fromCharCode(10))"',
        'check:workspaces': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'dispatcher\' + String.fromCharCode(10))"',
      },
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'workspace',
          title: 'Workspace',
        },
      },
      workspaces: {
        './': {
          name: 'workspace-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/app': {
          name: '@example/app',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const appPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AppPackageJsonContents = JSON.stringify({
      name: '@example/app',
      scripts: {
        check: 'node -e "require(\'node:fs\').appendFileSync(\'../../order.txt\', \'app-check\' + String.fromCharCode(10))"',
      },
    }, null, 2);

    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(appDirectory, 'package.json'), `${appPackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'check',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: ['workspace-project'],
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: undefined,
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: (message) => {
        process.stdout.write(`${message}\n`);

        return;
      },
      printWarn: (message) => {
        process.stderr.write(`${message}\n`);

        return;
      },
      writeStderr: (message) => {
        process.stderr.write(message);

        return;
      },
      writeStdout: (message) => {
        process.stdout.write(message);

        return;
      },
    });

    strictEqual(exitCode, 0, errors.join('\n'));

    const outputPath: Tests_Cli_Utility_RunWorkspaces_OutputPath = join(projectRoot, 'order.txt');
    const output: Tests_Cli_Utility_RunWorkspaces_Output = await readFile(outputPath, 'utf-8');

    strictEqual(output, [
      'app-check',
      '',
    ].join('\n'));

    return;
  });

  it('skips the root when configured to', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_SkipsTheRootWhenConfiguredTo_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'root-skipsTheRootWhenConfiguredTo');
    const appDirectory: Tests_Cli_Utility_RunWorkspaces_AppDirectory = join(projectRoot, 'apps', 'app');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];

    await mkdir(appDirectory, { recursive: true });

    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'workspace-project',
      private: true,
      packageManager: 'npm@11.18.0',
      scripts: {
        'check': 'nova utility run-workspaces check',
        'check:lint': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-lint\' + String.fromCharCode(10))"',
        'check:types': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-types\' + String.fromCharCode(10))"',
        'check:workspaces': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'dispatcher\' + String.fromCharCode(10))"',
      },
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'workspace',
          title: 'Workspace',
        },
      },
      settings: {
        runWorkspaces: {
          root: 'skip',
        },
      },
      workspaces: {
        './': {
          name: 'workspace-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/app': {
          name: '@example/app',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const appPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AppPackageJsonContents = JSON.stringify({
      name: '@example/app',
      scripts: {
        check: 'node -e "require(\'node:fs\').appendFileSync(\'../../order.txt\', \'app-check\' + String.fromCharCode(10))"',
      },
    }, null, 2);

    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(appDirectory, 'package.json'), `${appPackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'check',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: undefined,
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: (message) => {
        process.stdout.write(`${message}\n`);

        return;
      },
      printWarn: (message) => {
        process.stderr.write(`${message}\n`);

        return;
      },
      writeStderr: (message) => {
        process.stderr.write(message);

        return;
      },
      writeStdout: (message) => {
        process.stdout.write(message);

        return;
      },
    });

    strictEqual(exitCode, 0, errors.join('\n'));

    const outputPath: Tests_Cli_Utility_RunWorkspaces_OutputPath = join(projectRoot, 'order.txt');
    const output: Tests_Cli_Utility_RunWorkspaces_Output = await readFile(outputPath, 'utf-8');

    strictEqual(output, [
      'app-check',
      '',
    ].join('\n'));

    return;
  });

  it('never caches root steps', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_NeverCachesRootSteps_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'root-neverCachesRootSteps');
    const appDirectory: Tests_Cli_Utility_RunWorkspaces_AppDirectory = join(projectRoot, 'apps', 'app');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];

    await mkdir(appDirectory, { recursive: true });

    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'workspace-project',
      private: true,
      packageManager: 'npm@11.18.0',
      scripts: {
        'check': 'nova utility run-workspaces check',
        'check:lint': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-lint\' + String.fromCharCode(10))"',
        'check:types': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-types\' + String.fromCharCode(10))"',
        'check:workspaces': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'dispatcher\' + String.fromCharCode(10))"',
      },
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'workspace',
          title: 'Workspace',
        },
      },
      workspaces: {
        './': {
          name: 'workspace-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/app': {
          name: '@example/app',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const appPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AppPackageJsonContents = JSON.stringify({
      name: '@example/app',
      scripts: {
        check: 'node -e "require(\'node:fs\').appendFileSync(\'../../order.txt\', \'app-check\' + String.fromCharCode(10))"',
      },
    }, null, 2);

    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(appDirectory, 'package.json'), `${appPackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'check',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: undefined,
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: (message) => {
        process.stdout.write(`${message}\n`);

        return;
      },
      printWarn: (message) => {
        process.stderr.write(`${message}\n`);

        return;
      },
      writeStderr: (message) => {
        process.stderr.write(message);

        return;
      },
      writeStdout: (message) => {
        process.stdout.write(message);

        return;
      },
    });

    strictEqual(exitCode, 0, errors.join('\n'));

    const secondExitCode: Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_NeverCachesRootSteps_SecondExitCode = await LibRunWorkspaces.run({
      task: 'check',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: undefined,
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: (message) => {
        process.stdout.write(`${message}\n`);

        return;
      },
      printWarn: (message) => {
        process.stderr.write(`${message}\n`);

        return;
      },
      writeStderr: (message) => {
        process.stderr.write(message);

        return;
      },
      writeStdout: (message) => {
        process.stdout.write(message);

        return;
      },
    });

    strictEqual(secondExitCode, 0, errors.join('\n'));

    const outputPath: Tests_Cli_Utility_RunWorkspaces_OutputPath = join(projectRoot, 'order.txt');
    const output: Tests_Cli_Utility_RunWorkspaces_Output = await readFile(outputPath, 'utf-8');

    strictEqual(output, [
      'root-lint',
      'root-types',
      'app-check',
      'root-lint',
      'root-types',
      '',
    ].join('\n'));

    return;
  });

  it('skips the root inside a nested run', async (): Tests_Cli_Utility_RunWorkspaces_LibRunWorkspacesRun_SkipsTheRootInsideANestedRun_Returns => {
    const projectRoot: Tests_Cli_Utility_RunWorkspaces_ProjectRoot = join(sandboxRoot, 'root-skipsTheRootInsideANestedRun');
    const appDirectory: Tests_Cli_Utility_RunWorkspaces_AppDirectory = join(projectRoot, 'apps', 'app');
    const errors: Tests_Cli_Utility_RunWorkspaces_Errors = [];

    await mkdir(appDirectory, { recursive: true });

    const packageJsonContents: Tests_Cli_Utility_RunWorkspaces_PackageJsonContents = JSON.stringify({
      name: 'workspace-project',
      private: true,
      packageManager: 'npm@11.18.0',
      scripts: {
        'check': 'nova utility run-workspaces check',
        'check:lint': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-lint\' + String.fromCharCode(10))"',
        'check:types': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'root-types\' + String.fromCharCode(10))"',
        'check:workspaces': 'node -e "require(\'node:fs\').appendFileSync(\'order.txt\', \'dispatcher\' + String.fromCharCode(10))"',
      },
    }, null, 2);
    const novaConfigContents: Tests_Cli_Utility_RunWorkspaces_NovaConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'workspace',
          title: 'Workspace',
        },
      },
      workspaces: {
        './': {
          name: 'workspace-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/app': {
          name: '@example/app',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);
    const appPackageJsonContents: Tests_Cli_Utility_RunWorkspaces_AppPackageJsonContents = JSON.stringify({
      name: '@example/app',
      scripts: {
        check: 'node -e "require(\'node:fs\').appendFileSync(\'../../order.txt\', \'app-check\' + String.fromCharCode(10))"',
      },
    }, null, 2);

    await writeFile(join(projectRoot, 'package.json'), `${packageJsonContents}\n`, 'utf-8');
    await writeFile(join(projectRoot, 'nova.config.json'), `${novaConfigContents}\n`, 'utf-8');
    await writeFile(join(appDirectory, 'package.json'), `${appPackageJsonContents}\n`, 'utf-8');

    process.chdir(projectRoot);

    Reflect.set(process.env, 'NOVA_WORKSPACE_RUNNER', 'true');

    const exitCode: Tests_Cli_Utility_RunWorkspaces_ExitCode = await LibRunWorkspaces.run({
      task: 'check',
      buffer: '10',
      concurrency: undefined,
      continueOnError: undefined,
      dryRun: undefined,
      excludeWorkspace: undefined,
      nodeEnv: undefined,
      scriptArgs: undefined,
      workspace: undefined,
      printError: (message) => {
        errors.push(message);

        return;
      },
      printInfo: (message) => {
        process.stdout.write(`${message}\n`);

        return;
      },
      printWarn: (message) => {
        process.stderr.write(`${message}\n`);

        return;
      },
      writeStderr: (message) => {
        process.stderr.write(message);

        return;
      },
      writeStdout: (message) => {
        process.stdout.write(message);

        return;
      },
    });

    strictEqual(exitCode, 0, errors.join('\n'));

    const outputPath: Tests_Cli_Utility_RunWorkspaces_OutputPath = join(projectRoot, 'order.txt');
    const output: Tests_Cli_Utility_RunWorkspaces_Output = await readFile(outputPath, 'utf-8');

    strictEqual(output, [
      'app-check',
      '',
    ].join('\n'));

    return;
  });

  return;
});
