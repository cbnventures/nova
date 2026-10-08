import { spawn } from 'node:child_process';

import { runScaffold } from '../../../lib/scaffold.js';
import { isCommandExists } from '../../../lib/utility.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationId,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationIdSegment,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationIdSegmentBase,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationName,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationNameSegments,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Child,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Exit_Returns,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ProvidedApplicationId,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Returns,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_WorkspaceDirectory,
  Cli_Scaffold_App_Android_Runner_PrepareWorkspace_WorkspaceName,
  Cli_Scaffold_App_Android_Runner_Run_Options,
  Cli_Scaffold_App_Android_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/android.d.ts';

/**
 * CLI - Scaffold - App - Android.
 *
 * Scaffolds a native Kotlin and Jetpack Compose application through Nova's
 * workspace pipeline and Google's official Android CLI project generator.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Android - Run.
   *
   * Verifies the Android CLI dependency before Nova writes its workspace files
   * and delegates native project generation to the official empty activity template.
   *
   * @param {Cli_Scaffold_App_Android_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Android_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_App_Android_Runner_Run_Options): Cli_Scaffold_App_Android_Runner_Run_Returns {
    if (options['dryRun'] !== true && await isCommandExists('android') === false) {
      Logger.customize({
        name: 'CliScaffoldAppAndroid.run',
        purpose: 'dependency',
      }).error('Android CLI must be installed and available on PATH before scaffolding a native Android application. No scaffold files were written.');

      process.exitCode = 1;

      return;
    }

    await runScaffold(options, {
      category: 'app',
      importMetaUrl: import.meta.url,
      templateSubpath: 'scaffold/app/android',
      typeName: 'android',
      workspaceFinalizer: (workspaceDirectory, workspaceName) => Runner.prepareWorkspace(workspaceDirectory, workspaceName, options['applicationId']),
    });

    return;
  }

  /**
   * CLI - Scaffold - App - Android - Prepare Workspace.
   *
   * Uses Google's current empty activity template to generate Kotlin, Compose,
   * Gradle, wrapper, resource, and native test files around Nova's workspace files.
   *
   * @param {Cli_Scaffold_App_Android_Runner_PrepareWorkspace_WorkspaceDirectory}    workspaceDirectory    - Workspace directory.
   * @param {Cli_Scaffold_App_Android_Runner_PrepareWorkspace_WorkspaceName}         workspaceName         - Workspace name.
   * @param {Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ProvidedApplicationId} providedApplicationId - Provided application id.
   *
   * @private
   *
   * @returns {Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Returns}
   *
   * @since 0.29.0
   */
  private static prepareWorkspace(workspaceDirectory: Cli_Scaffold_App_Android_Runner_PrepareWorkspace_WorkspaceDirectory, workspaceName: Cli_Scaffold_App_Android_Runner_PrepareWorkspace_WorkspaceName, providedApplicationId: Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ProvidedApplicationId): Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Returns {
    const applicationIdSegmentBase: Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationIdSegmentBase = workspaceName.replaceAll('-', '').replaceAll('_', '');
    const applicationIdSegment: Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationIdSegment = (Number.isNaN(Number.parseInt(applicationIdSegmentBase.charAt(0), 10)) === true) ? applicationIdSegmentBase : `app${applicationIdSegmentBase}`;
    const applicationId: Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationId = providedApplicationId ?? `com.example.${applicationIdSegment}`;
    const applicationNameSegments: Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationNameSegments = workspaceName.replaceAll('_', '-').split('-');
    const applicationName: Cli_Scaffold_App_Android_Runner_PrepareWorkspace_ApplicationName = applicationNameSegments.map((applicationNameSegment) => `${applicationNameSegment.charAt(0).toUpperCase()}${applicationNameSegment.slice(1)}`).join(' ');

    return new Promise((promiseResolve, promiseReject) => {
      const child: Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Child = spawn('android', [
        '--no-metrics',
        'create',
        '--force',
        '--name',
        applicationName,
        '--application-id',
        applicationId,
        '--namespace',
        applicationId,
        '--output',
        workspaceDirectory,
        'empty-activity',
      ], {
        stdio: 'inherit',
      });

      child.once('error', promiseReject);

      child.once('exit', (code): Cli_Scaffold_App_Android_Runner_PrepareWorkspace_Exit_Returns => {
        if (code === 0) {
          promiseResolve();

          return;
        }

        promiseReject(new Error(`Android CLI exited with code ${String(code)}.`));

        return;
      });

      return;
    });
  }
}
