import prompts from 'prompts';

import {
  LIB_REGEX_APPLE_BUNDLE_IDENTIFIER_SEGMENT,
  LIB_REGEX_PLACEHOLDER_APPLE_BUNDLE_IDENTIFIER,
} from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Scaffold_App_Apple_Runner_GetBundleIdentifierValidationMessage_Returns,
  Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_BundleIdentifier,
  Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_Returns,
  Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_Segments,
  Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Answer,
  Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Answers,
  Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_DefaultBundleIdentifier,
  Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_IsNonInteractive,
  Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_ProvidedBundleIdentifier,
  Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Returns,
  Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_WorkspaceName,
  Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifierDefault_Returns,
  Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifierDefault_WorkspaceName,
  Cli_Scaffold_App_Apple_Runner_ResolveReplacements_BundleIdentifier,
  Cli_Scaffold_App_Apple_Runner_ResolveReplacements_Returns,
  Cli_Scaffold_App_Apple_Runner_Run_Options,
  Cli_Scaffold_App_Apple_Runner_Run_ResolvedBundleIdentifier,
  Cli_Scaffold_App_Apple_Runner_Run_Returns,
} from '../../../types/cli/scaffold/app/apple.d.ts';

/**
 * CLI - Scaffold - App - Apple.
 *
 * Scaffolds a SwiftUI Apple application backed by an XcodeGen project
 * definition through the shared workspace pipeline.
 *
 * @since 0.29.0
 */
export class Runner {
  /**
   * CLI - Scaffold - App - Apple - Run.
   *
   * Resolves and validates the application bundle identifier before delegating
   * project generation to Nova's shared workspace pipeline.
   *
   * @param {Cli_Scaffold_App_Apple_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_App_Apple_Runner_Run_Returns}
   *
   * @since 0.29.0
   */
  public static async run(options: Cli_Scaffold_App_Apple_Runner_Run_Options): Cli_Scaffold_App_Apple_Runner_Run_Returns {
    if (options['bundleId'] !== undefined && Runner.isBundleIdentifierValid(options['bundleId']) === false) {
      Logger.customize({
        name: 'CliScaffoldAppApple.run',
        purpose: 'bundleId',
      }).error(`${Runner.getBundleIdentifierValidationMessage()} No scaffold files were written.`);

      process.exitCode = 1;

      return;
    }

    let resolvedBundleIdentifier: Cli_Scaffold_App_Apple_Runner_Run_ResolvedBundleIdentifier = undefined;

    await runScaffold(options, {
      category: 'app',
      displayName: 'Apple',
      importMetaUrl: import.meta.url,
      platforms: [
        'swift',
        'ios',
        'macos',
      ],
      resolvePresentationOptions: (workspaceName) => [{
        flag: '--bundle-id',
        value: resolvedBundleIdentifier ?? Runner.resolveBundleIdentifierDefault(workspaceName),
      }],
      resolveReplacements: async (workspaceName) => {
        resolvedBundleIdentifier = await Runner.resolveBundleIdentifier(workspaceName, options['bundleId'], options['nonInteractive'] === true);

        if (resolvedBundleIdentifier === undefined) {
          return undefined;
        }

        return Runner.resolveReplacements(resolvedBundleIdentifier);
      },
      templateSubpath: 'scaffold/app/apple',
      typeName: 'apple',
    });

    return;
  }

  /**
   * CLI - Scaffold - App - Apple - Resolve Bundle Identifier.
   *
   * Uses the explicit option when present, preserves Nova's derived default for
   * automation, and prompts interactive users after the workspace name is known.
   *
   * @param {Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_WorkspaceName}            workspaceName            - Workspace name.
   * @param {Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_ProvidedBundleIdentifier} providedBundleIdentifier - Provided bundle identifier.
   * @param {Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_IsNonInteractive}         isNonInteractive         - Is non interactive.
   *
   * @private
   *
   * @returns {Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Returns}
   *
   * @since 0.32.0
   */
  private static async resolveBundleIdentifier(workspaceName: Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_WorkspaceName, providedBundleIdentifier: Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_ProvidedBundleIdentifier, isNonInteractive: Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_IsNonInteractive): Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Returns {
    const defaultBundleIdentifier: Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_DefaultBundleIdentifier = Runner.resolveBundleIdentifierDefault(workspaceName);

    if (providedBundleIdentifier !== undefined) {
      if (Runner.isBundleIdentifierValid(providedBundleIdentifier) === false) {
        Logger.customize({
          name: 'CliScaffoldAppApple.resolveBundleIdentifier',
          purpose: 'bundleId',
        }).error(`${Runner.getBundleIdentifierValidationMessage()} No scaffold files were written.`);

        process.exitCode = 1;

        return undefined;
      }

      return providedBundleIdentifier;
    }

    if (isNonInteractive === true) {
      if (Runner.isBundleIdentifierValid(defaultBundleIdentifier) === false) {
        Logger.customize({
          name: 'CliScaffoldAppApple.resolveBundleIdentifier',
          purpose: 'bundleId',
        }).error(`The derived bundle identifier "${defaultBundleIdentifier}" is invalid. ${Runner.getBundleIdentifierValidationMessage()} Pass --bundle-id with a valid identifier. No scaffold files were written.`);

        process.exitCode = 1;

        return undefined;
      }

      return defaultBundleIdentifier;
    }

    const answers: Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Answers = await prompts({
      type: 'text',
      name: 'bundleId',
      message: 'Bundle identifier:',
      initial: defaultBundleIdentifier,
      validate: (value) => {
        if (typeof value !== 'string' || Runner.isBundleIdentifierValid(value) === false) {
          return Runner.getBundleIdentifierValidationMessage();
        }

        return true;
      },
    }, {
      onCancel: () => false,
    });
    const answer: Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifier_Answer = answers['bundleId'];

    if (typeof answer !== 'string') {
      return undefined;
    }

    if (Runner.isBundleIdentifierValid(answer) === false) {
      Logger.customize({
        name: 'CliScaffoldAppApple.resolveBundleIdentifier',
        purpose: 'bundleId',
      }).error(`${Runner.getBundleIdentifierValidationMessage()} No scaffold files were written.`);

      process.exitCode = 1;

      return undefined;
    }

    return answer;
  }

  /**
   * CLI - Scaffold - App - Apple - Get Bundle Identifier Validation Message.
   *
   * Keeps interactive validation and non-interactive failures aligned around
   * one actionable explanation of Apple's bundle identifier requirements.
   *
   * @private
   *
   * @returns {Cli_Scaffold_App_Apple_Runner_GetBundleIdentifierValidationMessage_Returns}
   *
   * @since 0.32.0
   */
  private static getBundleIdentifierValidationMessage(): Cli_Scaffold_App_Apple_Runner_GetBundleIdentifierValidationMessage_Returns {
    return 'Apple bundle identifiers must contain only ASCII letters, numbers, periods, or hyphens, with no empty dot-separated components.';
  }

  /**
   * CLI - Scaffold - App - Apple - Is Bundle Identifier Valid.
   *
   * Applies Apple's documented character set while rejecting leading, trailing,
   * or repeated periods through non-empty component validation.
   *
   * @param {Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_BundleIdentifier} bundleIdentifier - Bundle identifier.
   *
   * @private
   *
   * @returns {Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_Returns}
   *
   * @since 0.32.0
   */
  private static isBundleIdentifierValid(bundleIdentifier: Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_BundleIdentifier): Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_Returns {
    const segments: Cli_Scaffold_App_Apple_Runner_IsBundleIdentifierValid_Segments = bundleIdentifier.split('.');

    return segments.every((segment) => LIB_REGEX_APPLE_BUNDLE_IDENTIFIER_SEGMENT.test(segment) === true);
  }

  /**
   * CLI - Scaffold - App - Apple - Resolve Bundle Identifier Default.
   *
   * Preserves the identifier derived by earlier scaffold releases so omitting
   * the new option remains backward compatible for existing automation.
   *
   * @param {Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifierDefault_WorkspaceName} workspaceName - Workspace name.
   *
   * @private
   *
   * @returns {Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifierDefault_Returns}
   *
   * @since 0.32.0
   */
  private static resolveBundleIdentifierDefault(workspaceName: Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifierDefault_WorkspaceName): Cli_Scaffold_App_Apple_Runner_ResolveBundleIdentifierDefault_Returns {
    return `com.example.${workspaceName}`;
  }

  /**
   * CLI - Scaffold - App - Apple - Resolve Replacements.
   *
   * Routes the validated value through the shared template writer so the app
   * and unit-test targets cannot drift or require a post-generation edit.
   *
   * @param {Cli_Scaffold_App_Apple_Runner_ResolveReplacements_BundleIdentifier} bundleIdentifier - Bundle identifier.
   *
   * @private
   *
   * @returns {Cli_Scaffold_App_Apple_Runner_ResolveReplacements_Returns}
   *
   * @since 0.32.0
   */
  private static resolveReplacements(bundleIdentifier: Cli_Scaffold_App_Apple_Runner_ResolveReplacements_BundleIdentifier): Cli_Scaffold_App_Apple_Runner_ResolveReplacements_Returns {
    return new Map([[
      LIB_REGEX_PLACEHOLDER_APPLE_BUNDLE_IDENTIFIER,
      bundleIdentifier,
    ]]);
  }
}
