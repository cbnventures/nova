import {
  LIB_REGEX_ANDROID_APPLICATION_ID_SEGMENT,
  LIB_REGEX_PLACEHOLDER_ANDROID_APPLICATION_ID,
  LIB_REGEX_PLACEHOLDER_ANDROID_PACKAGE_PATH,
} from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_ApplicationId,
  Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_Returns,
  Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_Segments,
  Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ApplicationIdSegment,
  Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ApplicationIdSegmentBase,
  Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ProvidedApplicationId,
  Cli_Scaffold_App_Android_Runner_ResolveApplicationId_Returns,
  Cli_Scaffold_App_Android_Runner_ResolveApplicationId_WorkspaceName,
  Cli_Scaffold_App_Android_Runner_ResolveReplacements_ApplicationId,
  Cli_Scaffold_App_Android_Runner_ResolveReplacements_ApplicationPackagePath,
  Cli_Scaffold_App_Android_Runner_ResolveReplacements_ProvidedApplicationId,
  Cli_Scaffold_App_Android_Runner_ResolveReplacements_Returns,
  Cli_Scaffold_App_Android_Runner_ResolveReplacements_WorkspaceName,
  Cli_Scaffold_App_Android_Runner_Run_Options,
  Cli_Scaffold_App_Android_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/android.d.ts';

/**
 * CLI - Scaffold - App - Android.
 *
 * Scaffolds a Nova-owned native Kotlin and Jetpack Compose application. The
 * generated workspace stays deterministic because Nova owns every source file.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Android - Java Reserved Segments.
   *
   * Java keywords cannot be used as package segments. Nova keeps the Android
   * application ID and namespace aligned, so this list applies both naming contracts.
   *
   * @private
   *
   * @since 0.31.0
   */
  static readonly #javaReservedSegments = new Set([
    'abstract',
    'assert',
    'boolean',
    'break',
    'byte',
    'case',
    'catch',
    'char',
    'class',
    'const',
    'continue',
    'default',
    'do',
    'double',
    'else',
    'enum',
    'extends',
    'false',
    'final',
    'finally',
    'float',
    'for',
    'goto',
    'if',
    'implements',
    'import',
    'instanceof',
    'int',
    'interface',
    'long',
    'native',
    'new',
    'null',
    'package',
    'private',
    'protected',
    'public',
    'return',
    'short',
    'static',
    'strictfp',
    'super',
    'switch',
    'synchronized',
    'this',
    'throw',
    'throws',
    'transient',
    'true',
    'try',
    'void',
    'volatile',
    'while',
    '_',
  ]);

  /**
   * CLI - Scaffold - App - Android - Run.
   *
   * Validates the application ID, resolves native template replacements, and
   * delegates deterministic project generation to Nova's workspace pipeline.
   *
   * @param {Cli_Scaffold_App_Android_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Android_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_App_Android_Runner_Run_Options): Cli_Scaffold_App_Android_Runner_Run_Returns {
    if (options['applicationId'] !== undefined && Runner.isApplicationIdValid(options['applicationId']) === false) {
      Logger.customize({
        name: 'CliScaffoldAppAndroid.run',
        purpose: 'applicationId',
      }).error('Android application ID must contain at least two dot-separated segments, each starting with a letter and containing only letters, numbers, or underscores. Java keywords cannot be used as segments. No scaffold files were written.');

      process.exitCode = 1;

      return;
    }

    await runScaffold(options, {
      category: 'app',
      displayName: 'Android',
      importMetaUrl: import.meta.url,
      platforms: [
        'android',
        'kotlin',
      ],
      resolvePresentationOptions: (workspaceName) => [{
        flag: '--application-id',
        value: Runner.resolveApplicationId(workspaceName, options['applicationId']),
      }],
      resolveReplacements: (workspaceName) => Runner.resolveReplacements(workspaceName, options['applicationId']),
      resolveWorkspaceTemplateSubpaths: () => [
        'scaffold-options/app/android-native',
        'scaffold-options/app/android-launchpad',
      ],
      templateSubpath: 'scaffold/app/android',
      typeName: 'android',
    });

    return;
  }

  /**
   * CLI - Scaffold - App - Android - Resolve Replacements.
   *
   * Builds the application-ID and package-path values consumed by Nova's
   * source-controlled Android project template.
   *
   * @param {Cli_Scaffold_App_Android_Runner_ResolveReplacements_WorkspaceName}              workspaceName         - Workspace name.
   * @param {Cli_Scaffold_App_Android_Runner_ResolveReplacements_ProvidedApplicationId}      providedApplicationId - Provided application id.
   *
   * @private
   *
   * @returns {Cli_Scaffold_App_Android_Runner_ResolveReplacements_Returns}
   *
   * @since 0.31.0
   */
  private static resolveReplacements(workspaceName: Cli_Scaffold_App_Android_Runner_ResolveReplacements_WorkspaceName, providedApplicationId: Cli_Scaffold_App_Android_Runner_ResolveReplacements_ProvidedApplicationId): Cli_Scaffold_App_Android_Runner_ResolveReplacements_Returns {
    const applicationId: Cli_Scaffold_App_Android_Runner_ResolveReplacements_ApplicationId = Runner.resolveApplicationId(workspaceName, providedApplicationId);
    const applicationPackagePath: Cli_Scaffold_App_Android_Runner_ResolveReplacements_ApplicationPackagePath = applicationId.replaceAll('.', '/');

    return new Map([
      [
        LIB_REGEX_PLACEHOLDER_ANDROID_APPLICATION_ID,
        applicationId,
      ],
      [
        LIB_REGEX_PLACEHOLDER_ANDROID_PACKAGE_PATH,
        applicationPackagePath,
      ],
    ]);
  }

  /**
   * CLI - Scaffold - App - Android - Is Application ID Valid.
   *
   * Applies Android's application-ID format and the Java package constraints
   * required because Nova deliberately uses the same value as the namespace.
   *
   * @param {Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_ApplicationId} applicationId - Application id.
   *
   * @private
   *
   * @returns {Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_Returns}
   *
   * @since 0.31.0
   */
  private static isApplicationIdValid(applicationId: Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_ApplicationId): Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_Returns {
    const segments: Cli_Scaffold_App_Android_Runner_IsApplicationIdValid_Segments = applicationId.split('.');

    return segments.length >= 2 && segments.every((segment) => LIB_REGEX_ANDROID_APPLICATION_ID_SEGMENT.test(segment) === true && Runner.#javaReservedSegments.has(segment) === false);
  }

  /**
   * CLI - Scaffold - App - Android - Resolve Application ID.
   *
   * Resolves the exact Android application identifier used by both the review
   * screen and Nova's native project template so their values cannot drift.
   *
   * @param {Cli_Scaffold_App_Android_Runner_ResolveApplicationId_WorkspaceName}         workspaceName         - Workspace name.
   * @param {Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ProvidedApplicationId} providedApplicationId - Provided application id.
   *
   * @private
   *
   * @returns {Cli_Scaffold_App_Android_Runner_ResolveApplicationId_Returns}
   *
   * @since 0.31.0
   */
  private static resolveApplicationId(workspaceName: Cli_Scaffold_App_Android_Runner_ResolveApplicationId_WorkspaceName, providedApplicationId: Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ProvidedApplicationId): Cli_Scaffold_App_Android_Runner_ResolveApplicationId_Returns {
    const applicationIdSegmentBase: Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ApplicationIdSegmentBase = workspaceName.replaceAll('-', '').replaceAll('_', '');
    const applicationIdSegment: Cli_Scaffold_App_Android_Runner_ResolveApplicationId_ApplicationIdSegment = (Number.isNaN(Number.parseInt(applicationIdSegmentBase.charAt(0), 10)) === false || Runner.#javaReservedSegments.has(applicationIdSegmentBase) === true) ? `app${applicationIdSegmentBase}` : applicationIdSegmentBase;

    return providedApplicationId ?? `com.example.${applicationIdSegment}`;
  }
}
