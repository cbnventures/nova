import { promises as fs } from 'fs';
import { join, resolve } from 'path';

import chalk from 'chalk';
import prompts from 'prompts';

import {
  libItemChangelogAdjectives,
  libItemChangelogCategoryBumpMap,
  libItemChangelogNouns,
  libItemChangelogOrderedCategories,
  libItemChangelogValidBumps,
  libItemChangelogValidCategories,
  libItemChangelogVerbs,
} from '../../lib/item.js';
import { LibNovaConfig } from '../../lib/nova-config.js';
import { LIB_REGEX_PATTERN_LEADING_NEWLINES } from '../../lib/regex.js';
import { Logger } from '../../toolkit/index.js';

import type {
  CliUtilityChangelogGenerateFileNameAdjective,
  CliUtilityChangelogGenerateFileNameNoun,
  CliUtilityChangelogGenerateFileNameReturns,
  CliUtilityChangelogGenerateFileNameVerb,
  CliUtilityChangelogParseEntriesChangelogDirectory,
  CliUtilityChangelogParseEntriesColonIndex,
  CliUtilityChangelogParseEntriesContent,
  CliUtilityChangelogParseEntriesCurrentDirectory,
  CliUtilityChangelogParseEntriesEndIndex,
  CliUtilityChangelogParseEntriesEntries,
  CliUtilityChangelogParseEntriesEntryBump,
  CliUtilityChangelogParseEntriesEntryCategory,
  CliUtilityChangelogParseEntriesEntryFiles,
  CliUtilityChangelogParseEntriesEntryPackage,
  CliUtilityChangelogParseEntriesFilePath,
  CliUtilityChangelogParseEntriesKey,
  CliUtilityChangelogParseEntriesLine,
  CliUtilityChangelogParseEntriesLines,
  CliUtilityChangelogParseEntriesMessage,
  CliUtilityChangelogParseEntriesReturns,
  CliUtilityChangelogParseEntriesValue,
  CliUtilityChangelogPromptWithCancelCancelled,
  CliUtilityChangelogPromptWithCancelQuestions,
  CliUtilityChangelogPromptWithCancelResult,
  CliUtilityChangelogPromptWithCancelReturns,
  CliUtilityChangelogRecordBumpOutput,
  CliUtilityChangelogRecordBumpOutputKey,
  CliUtilityChangelogRecordBumpOutputResult,
  CliUtilityChangelogRecordBumpOutputValue,
  CliUtilityChangelogRecordCategoryOutput,
  CliUtilityChangelogRecordCategoryOutputKey,
  CliUtilityChangelogRecordCategoryOutputResult,
  CliUtilityChangelogRecordCategoryOutputValue,
  CliUtilityChangelogRecordChangelogDirectory,
  CliUtilityChangelogRecordConfig,
  CliUtilityChangelogRecordContent,
  CliUtilityChangelogRecordCurrentDirectory,
  CliUtilityChangelogRecordEligibleWorkspaces,
  CliUtilityChangelogRecordFileName,
  CliUtilityChangelogRecordFilePath,
  CliUtilityChangelogRecordFilterWorkspaceConfig,
  CliUtilityChangelogRecordFilterWorkspaceConfigPolicy,
  CliUtilityChangelogRecordFindEligibleWorkspaceConfig,
  CliUtilityChangelogRecordFindEligibleWorkspaceConfigName,
  CliUtilityChangelogRecordIsDryRun,
  CliUtilityChangelogRecordMapEligibleWorkspaceConfig,
  CliUtilityChangelogRecordMapEligibleWorkspaceConfigName,
  CliUtilityChangelogRecordMapEligibleWorkspaceConfigPolicy,
  CliUtilityChangelogRecordMapEligibleWorkspaceConfigRole,
  CliUtilityChangelogRecordMessageOutput,
  CliUtilityChangelogRecordMessageOutputKey,
  CliUtilityChangelogRecordMessageOutputResult,
  CliUtilityChangelogRecordMessageOutputValue,
  CliUtilityChangelogRecordMessageValidateValue,
  CliUtilityChangelogRecordOptions,
  CliUtilityChangelogRecordPackageOutput,
  CliUtilityChangelogRecordPackageOutputKey,
  CliUtilityChangelogRecordPackageOutputResult,
  CliUtilityChangelogRecordPackageOutputValue,
  CliUtilityChangelogRecordReadmeContent,
  CliUtilityChangelogRecordReadmePath,
  CliUtilityChangelogRecordReturns,
  CliUtilityChangelogRecordSelectedBump,
  CliUtilityChangelogRecordSelectedCategory,
  CliUtilityChangelogRecordSelectedMessage,
  CliUtilityChangelogRecordSelectedPackage,
  CliUtilityChangelogRecordSuggestedBump,
  CliUtilityChangelogRecordValidBump,
  CliUtilityChangelogRecordValidCategory,
  CliUtilityChangelogRecordValidMessage,
  CliUtilityChangelogRecordValidPackage,
  CliUtilityChangelogRecordValidPackageEntry,
  CliUtilityChangelogRecordWorkspaces,
  CliUtilityChangelogReleaseApplyPackageJsonPath,
  CliUtilityChangelogReleaseApplyReleaseEntries,
  CliUtilityChangelogReleaseApplyReleaseNewVersion,
  CliUtilityChangelogReleaseApplyReleasePackageDirectory,
  CliUtilityChangelogReleaseApplyReleasePackageName,
  CliUtilityChangelogReleaseApplyUpdatedContents,
  CliUtilityChangelogReleaseApplyUpdatedPackageJson,
  CliUtilityChangelogReleaseBumpPriority,
  CliUtilityChangelogReleaseCategoryEntries,
  CliUtilityChangelogReleaseCategoryEntryMessage,
  CliUtilityChangelogReleaseCategoryLabel,
  CliUtilityChangelogReleaseCategoryOrder,
  CliUtilityChangelogReleaseConfig,
  CliUtilityChangelogReleaseConfirmOutput,
  CliUtilityChangelogReleaseConfirmOutputKey,
  CliUtilityChangelogReleaseConfirmOutputResult,
  CliUtilityChangelogReleaseConfirmOutputValue,
  CliUtilityChangelogReleaseCurrentDirectory,
  CliUtilityChangelogReleaseCurrentVersion,
  CliUtilityChangelogReleaseEntries,
  CliUtilityChangelogReleaseExisting,
  CliUtilityChangelogReleaseFindWorkspaceConfig,
  CliUtilityChangelogReleaseFindWorkspaceConfigName,
  CliUtilityChangelogReleaseGroups,
  CliUtilityChangelogReleaseHighestBump,
  CliUtilityChangelogReleaseIsDryRun,
  CliUtilityChangelogReleaseIsNonInteractive,
  CliUtilityChangelogReleaseNewVersion,
  CliUtilityChangelogReleaseOptions,
  CliUtilityChangelogReleasePackageDirectory,
  CliUtilityChangelogReleasePackageEntries,
  CliUtilityChangelogReleasePackageJson,
  CliUtilityChangelogReleasePackageJsonPath,
  CliUtilityChangelogReleasePackageJsonRaw,
  CliUtilityChangelogReleasePackageName,
  CliUtilityChangelogReleaseParsedPackageJson,
  CliUtilityChangelogReleaseReleases,
  CliUtilityChangelogReleaseReturns,
  CliUtilityChangelogReleaseSummaryReleaseCurrentVersion,
  CliUtilityChangelogReleaseSummaryReleaseEntries,
  CliUtilityChangelogReleaseSummaryReleaseHighestBump,
  CliUtilityChangelogReleaseSummaryReleaseNewVersion,
  CliUtilityChangelogReleaseSummaryReleasePackageName,
  CliUtilityChangelogReleaseVersionParts,
  CliUtilityChangelogReleaseVersionPartsMajor,
  CliUtilityChangelogReleaseVersionPartsMinor,
  CliUtilityChangelogReleaseVersionPartsPatch,
  CliUtilityChangelogReleaseWorkspaceEntry,
  CliUtilityChangelogReleaseWorkspacePath,
  CliUtilityChangelogReleaseWorkspaces,
  CliUtilityChangelogRunIsDryRun,
  CliUtilityChangelogRunModeOutput,
  CliUtilityChangelogRunModeOutputKey,
  CliUtilityChangelogRunModeOutputResult,
  CliUtilityChangelogRunModeOutputValue,
  CliUtilityChangelogRunOptions,
  CliUtilityChangelogRunReturns,
  CliUtilityChangelogWriteChangelogAfterHeading,
  CliUtilityChangelogWriteChangelogByCategory,
  CliUtilityChangelogWriteChangelogCategoryOrder,
  CliUtilityChangelogWriteChangelogChangelogPath,
  CliUtilityChangelogWriteChangelogDateString,
  CliUtilityChangelogWriteChangelogEntries,
  CliUtilityChangelogWriteChangelogExisting,
  CliUtilityChangelogWriteChangelogExistingContent,
  CliUtilityChangelogWriteChangelogMessages,
  CliUtilityChangelogWriteChangelogNewContent,
  CliUtilityChangelogWriteChangelogNewSection,
  CliUtilityChangelogWriteChangelogPackageDirectory,
  CliUtilityChangelogWriteChangelogPackageHeading,
  CliUtilityChangelogWriteChangelogPackageName,
  CliUtilityChangelogWriteChangelogPrependedContent,
  CliUtilityChangelogWriteChangelogReturns,
  CliUtilityChangelogWriteChangelogSectionParts,
  CliUtilityChangelogWriteChangelogToday,
  CliUtilityChangelogWriteChangelogTrimmedAfterHeading,
  CliUtilityChangelogWriteChangelogVersion,
} from '../../types/cli/utility/changelog.d.ts';

/**
 * CLI - Utility - Changelog.
 *
 * Records individual change entries into .changelog/
 * and releases them by bumping package.json versions
 * and prepending CHANGELOG.md sections.
 *
 * @since 0.13.0
 */
export class CliUtilityChangelog {
  /**
   * CLI - Utility - Changelog - Run.
   *
   * Entry point invoked by the CLI. Routes to record or release mode based on flags, falling
   * back to an interactive prompt when neither flag is provided.
   *
   * @param {CliUtilityChangelogRunOptions} options - Options.
   *
   * @returns {CliUtilityChangelogRunReturns}
   *
   * @since 0.13.0
   */
  public static async run(options: CliUtilityChangelogRunOptions): CliUtilityChangelogRunReturns {
    const isDryRun: CliUtilityChangelogRunIsDryRun = options['dryRun'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliUtilityChangelog.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    // Mutually exclusive check.
    if (options['record'] === true && options['release'] === true) {
      Logger.customize({
        name: 'CliUtilityChangelog.run',
        purpose: 'validate',
      }).error('Cannot use --record and --release together.');

      process.exitCode = 1;

      return;
    }

    // Record mode (interactive or non-interactive).
    if (options['record'] === true) {
      if (
        (
          options['package'] === undefined
          || options['category'] === undefined
          || options['bump'] === undefined
          || options['message'] === undefined
        )
        && (
          options['package'] !== undefined
          || options['category'] !== undefined
          || options['bump'] !== undefined
          || options['message'] !== undefined
        )
      ) {
        Logger.customize({
          name: 'CliUtilityChangelog.run',
          purpose: 'validate',
        }).error('Non-interactive record requires --package, --category, --bump, and --message.');

        process.exitCode = 1;

        return;
      }

      await CliUtilityChangelog.record(options);

      return;
    }

    // Release mode (interactive or non-interactive).
    if (options['release'] === true) {
      await CliUtilityChangelog.release(options);

      return;
    }

    // Interactive mode.
    const modeOutput: CliUtilityChangelogRunModeOutput = await CliUtilityChangelog.promptWithCancel<CliUtilityChangelogRunModeOutputKey, CliUtilityChangelogRunModeOutputValue>({
      type: 'select',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        {
          title: 'Record a change',
          value: 'record' as const,
        },
        {
          title: 'Release',
          value: 'release' as const,
        },
      ],
    });

    if (modeOutput['cancelled'] === true) {
      return;
    }

    const modeOutputResult: CliUtilityChangelogRunModeOutputResult = modeOutput['result'];

    if (modeOutputResult.action === undefined) {
      return;
    }

    if (modeOutputResult.action === 'record') {
      await CliUtilityChangelog.record(options);
    } else {
      await CliUtilityChangelog.release(options);
    }

    return;
  }

  /**
   * CLI - Utility - Changelog - Record.
   *
   * Writes a front-matter entry file into .changelog/ with package, category, bump, and
   * message fields. Supports interactive and CLI modes.
   *
   * @param {CliUtilityChangelogRecordOptions} options - Options.
   *
   * @private
   *
   * @returns {CliUtilityChangelogRecordReturns}
   *
   * @since 0.13.0
   */
  private static async record(options: CliUtilityChangelogRecordOptions): CliUtilityChangelogRecordReturns {
    const isDryRun: CliUtilityChangelogRecordIsDryRun = options['dryRun'] === true;

    // Load "nova.config.json" for workspace list.
    const config: CliUtilityChangelogRecordConfig = await new LibNovaConfig().load();
    const workspaces: CliUtilityChangelogRecordWorkspaces = config['workspaces'] ?? {};

    // Filter to non-freezable workspaces.
    const eligibleWorkspaces: CliUtilityChangelogRecordEligibleWorkspaces = Object.entries(workspaces).filter((workspace) => {
      const workspaceConfig: CliUtilityChangelogRecordFilterWorkspaceConfig = workspace[1];
      const workspaceConfigPolicy: CliUtilityChangelogRecordFilterWorkspaceConfigPolicy = workspaceConfig['policy'];

      return workspaceConfigPolicy !== 'freezable';
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CliUtilityChangelog.record',
        purpose: 'workspaces',
      }).error('No eligible (non-freezable) workspaces found in "nova.config.json".');

      process.exitCode = 1;

      return;
    }

    let selectedPackage: CliUtilityChangelogRecordSelectedPackage = undefined;
    let selectedCategory: CliUtilityChangelogRecordSelectedCategory = undefined;
    let selectedBump: CliUtilityChangelogRecordSelectedBump = undefined;
    let selectedMessage: CliUtilityChangelogRecordSelectedMessage = undefined;

    // Non-interactive mode.
    if (
      options['package'] !== undefined
      && options['category'] !== undefined
      && options['bump'] !== undefined
      && options['message'] !== undefined
    ) {
      // Validate package.
      const validPackageEntry: CliUtilityChangelogRecordValidPackageEntry = eligibleWorkspaces.find((eligibleWorkspace) => {
        const eligibleWorkspaceConfig: CliUtilityChangelogRecordFindEligibleWorkspaceConfig = eligibleWorkspace[1];
        const eligibleWorkspaceConfigName: CliUtilityChangelogRecordFindEligibleWorkspaceConfigName = eligibleWorkspaceConfig['name'];

        return eligibleWorkspaceConfigName === options['package'];
      });
      const validPackage: CliUtilityChangelogRecordValidPackage = (validPackageEntry !== undefined) ? validPackageEntry[1]['name'] : undefined;

      if (validPackage === undefined) {
        Logger.customize({
          name: 'CliUtilityChangelog.record',
          purpose: 'validate',
        }).error(`Package "${options['package']}" is not a valid non-freezable workspace.`);

        process.exitCode = 1;

        return;
      }

      // Validate category.
      const validCategory: CliUtilityChangelogRecordValidCategory = libItemChangelogValidCategories.find((libItemChangelogValidCategory) => libItemChangelogValidCategory === options['category']);

      if (validCategory === undefined) {
        Logger.customize({
          name: 'CliUtilityChangelog.record',
          purpose: 'validate',
        }).error(`Category "${options['category']}" is invalid. Use: ${libItemChangelogValidCategories.join(', ')}.`);

        process.exitCode = 1;

        return;
      }

      // Validate bump.
      const validBump: CliUtilityChangelogRecordValidBump = libItemChangelogValidBumps.find((libItemChangelogValidBump) => libItemChangelogValidBump === options['bump']);

      if (validBump === undefined) {
        Logger.customize({
          name: 'CliUtilityChangelog.record',
          purpose: 'validate',
        }).error(`Bump type "${options['bump']}" is invalid. Use: ${libItemChangelogValidBumps.join(', ')}.`);

        process.exitCode = 1;

        return;
      }

      // Validate message.
      const validMessage: CliUtilityChangelogRecordValidMessage = options['message'].trim();

      if (validMessage === '') {
        Logger.customize({
          name: 'CliUtilityChangelog.record',
          purpose: 'validate',
        }).error('Message cannot be empty.');

        process.exitCode = 1;

        return;
      }

      selectedPackage = validPackage;
      selectedCategory = validCategory;
      selectedBump = validBump;
      selectedMessage = validMessage;
    } else {
      // Select package.
      if (eligibleWorkspaces.length === 1 && eligibleWorkspaces[0] !== undefined) {
        selectedPackage = eligibleWorkspaces[0][1]['name'];

        Logger.customize({
          name: 'CliUtilityChangelog.record',
          purpose: 'package',
        }).info(`Auto-selected package: ${selectedPackage}`);
      } else {
        const packageOutput: CliUtilityChangelogRecordPackageOutput = await CliUtilityChangelog.promptWithCancel<CliUtilityChangelogRecordPackageOutputKey, CliUtilityChangelogRecordPackageOutputValue>({
          type: 'select',
          name: 'package',
          message: 'Select a package.',
          choices: eligibleWorkspaces.map((eligibleWorkspace) => {
            const eligibleWorkspaceConfig: CliUtilityChangelogRecordMapEligibleWorkspaceConfig = eligibleWorkspace[1];
            const eligibleWorkspaceConfigName: CliUtilityChangelogRecordMapEligibleWorkspaceConfigName = eligibleWorkspaceConfig['name'];
            const eligibleWorkspaceConfigRole: CliUtilityChangelogRecordMapEligibleWorkspaceConfigRole = eligibleWorkspaceConfig['role'];
            const eligibleWorkspaceConfigPolicy: CliUtilityChangelogRecordMapEligibleWorkspaceConfigPolicy = eligibleWorkspaceConfig['policy'];

            return {
              title: eligibleWorkspaceConfigName,
              description: `${eligibleWorkspaceConfigRole} · ${eligibleWorkspaceConfigPolicy}`,
              value: eligibleWorkspaceConfigName,
            };
          }),
        });

        if (packageOutput['cancelled'] === true) {
          return;
        }

        const packageOutputResult: CliUtilityChangelogRecordPackageOutputResult = packageOutput['result'];

        if (packageOutputResult.package === undefined) {
          return;
        }

        selectedPackage = packageOutputResult.package;
      }

      // Select category.
      const categoryOutput: CliUtilityChangelogRecordCategoryOutput = await CliUtilityChangelog.promptWithCancel<CliUtilityChangelogRecordCategoryOutputKey, CliUtilityChangelogRecordCategoryOutputValue>({
        type: 'select',
        name: 'category',
        message: 'Select a category.',
        choices: [
          {
            title: 'Updated',
            description: 'An enhancement to existing functionality.',
            value: 'updated' as const,
          },
          {
            title: 'Fixed',
            description: 'A bug fix.',
            value: 'fixed' as const,
          },
          {
            title: 'Added',
            description: 'A new feature or capability.',
            value: 'added' as const,
          },
          {
            title: 'Removed',
            description: 'A removed feature or capability.',
            value: 'removed' as const,
          },
        ],
      });

      if (categoryOutput['cancelled'] === true) {
        return;
      }

      const categoryOutputResult: CliUtilityChangelogRecordCategoryOutputResult = categoryOutput['result'];

      if (categoryOutputResult.category === undefined) {
        return;
      }

      selectedCategory = categoryOutputResult.category;

      // Enter description.
      const messageOutput: CliUtilityChangelogRecordMessageOutput = await CliUtilityChangelog.promptWithCancel<CliUtilityChangelogRecordMessageOutputKey, CliUtilityChangelogRecordMessageOutputValue>({
        type: 'text',
        name: 'message',
        message: 'Describe the change.',
        validate: (value: CliUtilityChangelogRecordMessageValidateValue) => {
          if (typeof value !== 'string' || value.trim() === '') {
            return 'Enter a description.';
          }

          return true;
        },
      });

      if (messageOutput['cancelled'] === true) {
        return;
      }

      const messageOutputResult: CliUtilityChangelogRecordMessageOutputResult = messageOutput['result'];

      if (messageOutputResult.message === undefined) {
        return;
      }

      selectedMessage = messageOutputResult.message.trim();

      // Select bump type (auto-suggested based on category).
      const suggestedBump: CliUtilityChangelogRecordSuggestedBump = libItemChangelogCategoryBumpMap[selectedCategory];

      const bumpOutput: CliUtilityChangelogRecordBumpOutput = await CliUtilityChangelog.promptWithCancel<CliUtilityChangelogRecordBumpOutputKey, CliUtilityChangelogRecordBumpOutputValue>({
        type: 'select',
        name: 'bump',
        message: 'Select version bump type.',
        choices: [
          {
            title: 'Major',
            description: 'Breaking change.',
            value: 'major' as const,
          },
          {
            title: 'Minor',
            description: 'New feature.',
            value: 'minor' as const,
          },
          {
            title: 'Patch',
            description: 'Bug fix.',
            value: 'patch' as const,
          },
        ],
        initial: libItemChangelogValidBumps.indexOf(suggestedBump),
      });

      if (bumpOutput['cancelled'] === true) {
        return;
      }

      const bumpOutputResult: CliUtilityChangelogRecordBumpOutputResult = bumpOutput['result'];

      if (bumpOutputResult.bump === undefined) {
        return;
      }

      selectedBump = bumpOutputResult.bump;
    }

    // Write entry file.
    const fileName: CliUtilityChangelogRecordFileName = CliUtilityChangelog.generateFileName();
    const currentDirectory: CliUtilityChangelogRecordCurrentDirectory = process.cwd();
    const changelogDirectory: CliUtilityChangelogRecordChangelogDirectory = join(currentDirectory, '.changelog');
    const filePath: CliUtilityChangelogRecordFilePath = join(changelogDirectory, `${fileName}.md`);

    const content: CliUtilityChangelogRecordContent = [
      '---',
      `package: "${selectedPackage}"`,
      `category: ${selectedCategory}`,
      `bump: ${selectedBump}`,
      '---',
      '',
      selectedMessage,
      '',
    ].join('\n');

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliUtilityChangelog.record',
        purpose: 'dryRun',
        padTop: 1,
      }).info(`Would write "${filePath}":`);

      process.stdout.write(`\n${content}`);

      return;
    }

    await fs.mkdir(changelogDirectory, { recursive: true });

    // Generate a README.md if one doesn't already exist.
    const readmePath: CliUtilityChangelogRecordReadmePath = join(changelogDirectory, 'README.md');

    try {
      await fs.access(readmePath);
    } catch {
      const readmeContent: CliUtilityChangelogRecordReadmeContent = [
        '# Changelog',
        '',
        'Welcome! This folder was automatically generated by `nova utility changelog`, a tool designed for managing versioning and release notes in your monorepo. To learn more about how it works, visit the [documentation](https://nova.cbnventures.io/docs/cli/utilities/changelog).',
        '',
      ].join('\n');

      await fs.writeFile(readmePath, readmeContent, 'utf-8');
    }

    await fs.writeFile(filePath, content, 'utf-8');

    Logger.customize({
      name: 'CliUtilityChangelog.record',
      purpose: 'saved',
      padTop: 1,
    }).info(`Recorded change to "${filePath}".`);

    return;
  }

  /**
   * CLI - Utility - Changelog - Release.
   *
   * Parses all .changelog/ entries, computes the highest semver bump per package, updates
   * package.json, writes CHANGELOG.md, then deletes consumed entry files.
   *
   * @param {CliUtilityChangelogReleaseOptions} options - Options.
   *
   * @private
   *
   * @returns {CliUtilityChangelogReleaseReturns}
   *
   * @since 0.13.0
   */
  private static async release(options: CliUtilityChangelogReleaseOptions): CliUtilityChangelogReleaseReturns {
    const isDryRun: CliUtilityChangelogReleaseIsDryRun = options['dryRun'] === true;
    const isNonInteractive: CliUtilityChangelogReleaseIsNonInteractive = options['release'] === true;

    // Parse all entries.
    const entries: CliUtilityChangelogReleaseEntries = await CliUtilityChangelog.parseEntries();

    if (entries.length === 0) {
      Logger.customize({
        name: 'CliUtilityChangelog.release',
        purpose: 'entries',
      }).info('No changelog entries found in ".changelog/".');

      return;
    }

    // Group by package.
    const groups: CliUtilityChangelogReleaseGroups = new Map();

    for (const entry of entries) {
      const existing: CliUtilityChangelogReleaseExisting = groups.get(entry['package']) ?? [];

      existing.push(entry);

      groups.set(entry['package'], existing);
    }

    // Load "nova.config.json" for workspace paths.
    const config: CliUtilityChangelogReleaseConfig = await new LibNovaConfig().load();
    const workspaces: CliUtilityChangelogReleaseWorkspaces = config['workspaces'] ?? {};

    // Compute version bumps per package.
    const bumpPriority: CliUtilityChangelogReleaseBumpPriority = {
      major: 3,
      minor: 2,
      patch: 1,
    };
    const releases: CliUtilityChangelogReleaseReleases = [];

    for (const group of groups) {
      const packageName: CliUtilityChangelogReleasePackageName = group[0];
      const packageEntries: CliUtilityChangelogReleasePackageEntries = group[1];

      // Find workspace path.
      const workspaceEntry: CliUtilityChangelogReleaseWorkspaceEntry = Object.entries(workspaces).find((workspace) => {
        const workspaceConfig: CliUtilityChangelogReleaseFindWorkspaceConfig = workspace[1];
        const workspaceConfigName: CliUtilityChangelogReleaseFindWorkspaceConfigName = workspaceConfig['name'];

        return workspaceConfigName === packageName;
      });

      if (workspaceEntry === undefined) {
        Logger.customize({
          name: 'CliUtilityChangelog.release',
          purpose: 'workspace',
        }).error(`Package "${packageName}" not found in "nova.config.json".`);

        process.exitCode = 1;

        return;
      }

      const workspacePath: CliUtilityChangelogReleaseWorkspacePath = workspaceEntry[0];
      const currentDirectory: CliUtilityChangelogReleaseCurrentDirectory = process.cwd();
      const packageDirectory: CliUtilityChangelogReleasePackageDirectory = resolve(currentDirectory, workspacePath);
      const packageJsonPath: CliUtilityChangelogReleasePackageJsonPath = join(packageDirectory, 'package.json');

      // Read "package.json".
      let packageJsonRaw: CliUtilityChangelogReleasePackageJsonRaw = undefined;

      try {
        packageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'CliUtilityChangelog.release',
          purpose: 'readPackageJson',
        }).error(`Unable to read "${packageJsonPath}".`);

        process.exitCode = 1;

        return;
      }

      let parsedPackageJson: CliUtilityChangelogReleaseParsedPackageJson = undefined;

      try {
        parsedPackageJson = JSON.parse(packageJsonRaw);
      } catch {
        Logger.customize({
          name: 'CliUtilityChangelog.release',
          purpose: 'parsePackageJson',
        }).error(`Unable to parse "${packageJsonPath}".`);

        process.exitCode = 1;

        return;
      }

      if (parsedPackageJson === undefined) {
        process.exitCode = 1;

        return;
      }

      const currentVersion: CliUtilityChangelogReleaseCurrentVersion = (typeof parsedPackageJson['version'] === 'string') ? parsedPackageJson['version'] : undefined;

      if (currentVersion === undefined) {
        Logger.customize({
          name: 'CliUtilityChangelog.release',
          purpose: 'version',
        }).error(`No "version" field found in "${packageJsonPath}".`);

        process.exitCode = 1;

        return;
      }

      // Compute the highest bump.
      let highestBump: CliUtilityChangelogReleaseHighestBump = 'patch';

      for (const packageEntry of packageEntries) {
        if (bumpPriority[packageEntry['bump']] > bumpPriority[highestBump]) {
          highestBump = packageEntry['bump'];
        }
      }

      // Compute new version.
      const versionParts: CliUtilityChangelogReleaseVersionParts = currentVersion.split('.').map(Number);
      const versionPartsMajor: CliUtilityChangelogReleaseVersionPartsMajor = versionParts[0] ?? 0;
      const versionPartsMinor: CliUtilityChangelogReleaseVersionPartsMinor = versionParts[1] ?? 0;
      const versionPartsPatch: CliUtilityChangelogReleaseVersionPartsPatch = versionParts[2] ?? 0;

      let newVersion: CliUtilityChangelogReleaseNewVersion = currentVersion;

      switch (highestBump) {
        case 'major': {
          newVersion = `${versionPartsMajor + 1}.0.0`;
          break;
        }

        case 'minor': {
          newVersion = `${versionPartsMajor}.${versionPartsMinor + 1}.0`;
          break;
        }

        case 'patch': {
          newVersion = `${versionPartsMajor}.${versionPartsMinor}.${versionPartsPatch + 1}`;
          break;
        }

        default: {
          break;
        }
      }

      releases.push({
        packageName,
        packageDirectory,
        currentVersion,
        newVersion,
        highestBump,
        entries: packageEntries,
      });
    }

    // Show summary.
    Logger.customize({
      name: 'CliUtilityChangelog.release',
      purpose: 'summary',
    }).info('Release summary:');

    const categoryOrder: CliUtilityChangelogReleaseCategoryOrder = [
      'updated',
      'fixed',
      'added',
      'removed',
    ];

    for (const release of releases) {
      const releasePackageName: CliUtilityChangelogReleaseSummaryReleasePackageName = release['packageName'];
      const releaseCurrentVersion: CliUtilityChangelogReleaseSummaryReleaseCurrentVersion = release['currentVersion'];
      const releaseNewVersion: CliUtilityChangelogReleaseSummaryReleaseNewVersion = release['newVersion'];
      const releaseHighestBump: CliUtilityChangelogReleaseSummaryReleaseHighestBump = release['highestBump'];
      const releaseEntries: CliUtilityChangelogReleaseSummaryReleaseEntries = release['entries'];

      process.stdout.write(`\n  ${chalk.bold(releasePackageName)}: ${releaseCurrentVersion} → ${chalk.green(releaseNewVersion)} (${releaseHighestBump})\n`);

      for (const category of categoryOrder) {
        const categoryEntries: CliUtilityChangelogReleaseCategoryEntries = releaseEntries.filter((releaseEntry) => releaseEntry['category'] === category);

        if (categoryEntries.length === 0) {
          continue;
        }

        const categoryLabel: CliUtilityChangelogReleaseCategoryLabel = category.toUpperCase();

        process.stdout.write(`    ${chalk.yellow(categoryLabel)}:\n`);

        for (const categoryEntry of categoryEntries) {
          const categoryEntryMessage: CliUtilityChangelogReleaseCategoryEntryMessage = categoryEntry['message'];

          process.stdout.write(`      - ${categoryEntryMessage}\n`);
        }
      }
    }

    process.stdout.write('\n');

    // Confirm (interactive only).
    if (isNonInteractive !== true) {
      const confirmOutput: CliUtilityChangelogReleaseConfirmOutput = await CliUtilityChangelog.promptWithCancel<CliUtilityChangelogReleaseConfirmOutputKey, CliUtilityChangelogReleaseConfirmOutputValue>({
        type: 'confirm',
        name: 'confirm',
        message: 'Proceed with release?',
        initial: false,
      });

      if (confirmOutput['cancelled'] === true) {
        Logger.customize({
          name: 'CliUtilityChangelog.release',
          purpose: 'cancelled',
        }).info('Release cancelled.');

        return;
      }

      const confirmOutputResult: CliUtilityChangelogReleaseConfirmOutputResult = confirmOutput['result'];

      if (confirmOutputResult.confirm !== true) {
        Logger.customize({
          name: 'CliUtilityChangelog.release',
          purpose: 'cancelled',
        }).info('Release cancelled.');

        return;
      }
    }

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliUtilityChangelog.release',
        purpose: 'dryRun',
      }).info('Dry run complete. No files were modified.');

      return;
    }

    // Apply changes.
    for (const release of releases) {
      const releasePackageName: CliUtilityChangelogReleaseApplyReleasePackageName = release['packageName'];
      const releasePackageDirectory: CliUtilityChangelogReleaseApplyReleasePackageDirectory = release['packageDirectory'];
      const releaseNewVersion: CliUtilityChangelogReleaseApplyReleaseNewVersion = release['newVersion'];
      const releaseEntries: CliUtilityChangelogReleaseApplyReleaseEntries = release['entries'];
      const packageJsonPath: CliUtilityChangelogReleaseApplyPackageJsonPath = join(releasePackageDirectory, 'package.json');

      // Read and update "package.json".
      const packageJson: CliUtilityChangelogReleasePackageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

      if (
        packageJson === null
        || typeof packageJson !== 'object'
        || typeof packageJson['version'] !== 'string'
      ) {
        throw new Error(`Invalid package.json at "${packageJsonPath}": missing or non-string "version" field.`);
      }

      Reflect.set(packageJson, 'version', releaseNewVersion);

      const updatedPackageJson: CliUtilityChangelogReleaseApplyUpdatedPackageJson = JSON.stringify(packageJson, null, 2);
      const updatedContents: CliUtilityChangelogReleaseApplyUpdatedContents = `${updatedPackageJson}\n`;

      await fs.writeFile(packageJsonPath, updatedContents, 'utf-8');

      Logger.customize({
        name: 'CliUtilityChangelog.release',
        purpose: 'bumpVersion',
      }).info(`Updated "${packageJsonPath}" version to ${releaseNewVersion}.`);

      // Write "CHANGELOG.md".
      await CliUtilityChangelog.writeChangelog(
        releasePackageDirectory,
        releasePackageName,
        releaseNewVersion,
        releaseEntries,
      );

      Logger.customize({
        name: 'CliUtilityChangelog.release',
        purpose: 'writeChangelog',
      }).info(`Updated "CHANGELOG.md" for ${releasePackageName}.`);
    }

    // Clean up consumed entry files.
    for (const entry of entries) {
      await fs.unlink(entry['filePath']);
    }

    Logger.customize({
      name: 'CliUtilityChangelog.release',
      purpose: 'complete',
      padTop: 1,
    }).info('Release complete.');

    return;
  }

  /**
   * CLI - Utility - Changelog - Parse Entries.
   *
   * Reads every markdown file in .changelog/ and extracts front-matter fields and body text.
   * Called by release to gather pending changes.
   *
   * @private
   *
   * @returns {CliUtilityChangelogParseEntriesReturns}
   *
   * @since 0.13.0
   */
  private static async parseEntries(): CliUtilityChangelogParseEntriesReturns {
    const currentDirectory: CliUtilityChangelogParseEntriesCurrentDirectory = process.cwd();
    const changelogDirectory: CliUtilityChangelogParseEntriesChangelogDirectory = join(currentDirectory, '.changelog');
    const entries: CliUtilityChangelogParseEntriesEntries = [];

    let entryFiles: CliUtilityChangelogParseEntriesEntryFiles = undefined;

    try {
      entryFiles = (await fs.readdir(changelogDirectory)).filter((directoryEntry) => directoryEntry.endsWith('.md'));
    } catch {
      return entries;
    }

    for (const entryFile of entryFiles) {
      const filePath: CliUtilityChangelogParseEntriesFilePath = join(changelogDirectory, entryFile);

      const content: CliUtilityChangelogParseEntriesContent = await fs.readFile(filePath, 'utf-8');

      // Parse front matter.
      const lines: CliUtilityChangelogParseEntriesLines = content.split('\n');

      if (lines[0] !== '---') {
        continue;
      }

      let endIndex: CliUtilityChangelogParseEntriesEndIndex = -1;

      for (let i = 1; i < lines.length; i += 1) {
        if (lines[i] === '---') {
          endIndex = i;
          break;
        }
      }

      if (endIndex === -1) {
        continue;
      }

      // Parse key: value pairs.
      let entryPackage: CliUtilityChangelogParseEntriesEntryPackage = undefined;
      let entryCategory: CliUtilityChangelogParseEntriesEntryCategory = undefined;
      let entryBump: CliUtilityChangelogParseEntriesEntryBump = undefined;

      for (let i = 1; i < endIndex; i += 1) {
        const line: CliUtilityChangelogParseEntriesLine = lines[i];

        if (line === undefined) {
          continue;
        }

        const colonIndex: CliUtilityChangelogParseEntriesColonIndex = line.indexOf(':');

        if (colonIndex === -1) {
          continue;
        }

        const key: CliUtilityChangelogParseEntriesKey = line.slice(0, colonIndex).trim();
        let value: CliUtilityChangelogParseEntriesValue = line.slice(colonIndex + 1).trim();

        // Remove surrounding quotes.
        if (
          (
            value.startsWith('"') === true
            && value.endsWith('"') === true
          )
          || (
            value.startsWith('\'') === true
            && value.endsWith('\'') === true
          )
        ) {
          value = value.slice(1, -1);
        }

        if (key === 'package') {
          entryPackage = value;
        } else if (key === 'category') {
          entryCategory = libItemChangelogValidCategories.find((libItemChangelogValidCategory) => libItemChangelogValidCategory === value);
        } else if (key === 'bump') {
          entryBump = libItemChangelogValidBumps.find((libItemChangelogValidBump) => libItemChangelogValidBump === value);
        }
      }

      // Extract message from body.
      const message: CliUtilityChangelogParseEntriesMessage = lines.slice(endIndex + 1).join('\n').trim();

      if (
        entryPackage === undefined
        || entryCategory === undefined
        || entryBump === undefined
        || message === ''
      ) {
        Logger.customize({
          name: 'CliUtilityChangelog.parseEntries',
          purpose: 'skip',
        }).warn(`Skipping "${entryFile}": invalid or missing front matter.`);

        continue;
      }

      entries.push({
        package: entryPackage,
        category: entryCategory,
        bump: entryBump,
        message,
        filePath,
      });
    }

    return entries;
  }

  /**
   * CLI - Utility - Changelog - Write Changelog.
   *
   * Builds a dated version section grouped by category order and prepends it to the existing
   * CHANGELOG.md or creates the file if it does not exist.
   *
   * @param {CliUtilityChangelogWriteChangelogPackageDirectory} packageDirectory - Package directory.
   * @param {CliUtilityChangelogWriteChangelogPackageName}      packageName      - Package name.
   * @param {CliUtilityChangelogWriteChangelogVersion}          version          - Version.
   * @param {CliUtilityChangelogWriteChangelogEntries}          entries          - Entries.
   *
   * @private
   *
   * @returns {CliUtilityChangelogWriteChangelogReturns}
   *
   * @since 0.13.0
   */
  private static async writeChangelog(packageDirectory: CliUtilityChangelogWriteChangelogPackageDirectory, packageName: CliUtilityChangelogWriteChangelogPackageName, version: CliUtilityChangelogWriteChangelogVersion, entries: CliUtilityChangelogWriteChangelogEntries): CliUtilityChangelogWriteChangelogReturns {
    const changelogPath: CliUtilityChangelogWriteChangelogChangelogPath = join(packageDirectory, 'CHANGELOG.md');
    const today: CliUtilityChangelogWriteChangelogToday = new Date();
    const dateString: CliUtilityChangelogWriteChangelogDateString = [
      today.getFullYear(),
      (today.getMonth() + 1).toString().padStart(2, '0'),
      today.getDate().toString().padStart(2, '0'),
    ].join('-');

    // Group entries by category.
    const byCategory: CliUtilityChangelogWriteChangelogByCategory = new Map();

    for (const entry of entries) {
      const existing: CliUtilityChangelogWriteChangelogExisting = byCategory.get(entry['category']) ?? [];

      existing.push(entry['message']);

      byCategory.set(entry['category'], existing);
    }

    // Build section in order: UPDATED, FIXED, ADDED, REMOVED.
    const categoryOrder: CliUtilityChangelogWriteChangelogCategoryOrder = [...libItemChangelogOrderedCategories];
    const sectionParts: CliUtilityChangelogWriteChangelogSectionParts = [];

    sectionParts.push(`## ${version} - ${dateString}`);

    for (const category of categoryOrder) {
      const messages: CliUtilityChangelogWriteChangelogMessages = byCategory.get(category);

      if (messages === undefined || messages.length === 0) {
        continue;
      }

      sectionParts.push('');
      sectionParts.push(`### ${category.toUpperCase()}`);

      for (const message of messages) {
        sectionParts.push(`- ${message}`);
      }
    }

    const newSection: CliUtilityChangelogWriteChangelogNewSection = sectionParts.join('\n');

    // Read existing or create new.
    let existingContent: CliUtilityChangelogWriteChangelogExistingContent = '';

    try {
      existingContent = await fs.readFile(changelogPath, 'utf-8');
    } catch {
      /* empty */
    }

    const packageHeading: CliUtilityChangelogWriteChangelogPackageHeading = `# ${packageName}`;

    if (existingContent === '') {
      // Create new file.
      const newContent: CliUtilityChangelogWriteChangelogNewContent = [
        packageHeading,
        '',
        newSection,
        '',
      ].join('\n');

      await fs.writeFile(changelogPath, newContent, 'utf-8');
    } else if (existingContent.startsWith(packageHeading) === true) {
      // Prepend after package heading.
      const afterHeading: CliUtilityChangelogWriteChangelogAfterHeading = existingContent.slice(packageHeading.length);
      const trimmedAfterHeading: CliUtilityChangelogWriteChangelogTrimmedAfterHeading = afterHeading.replace(LIB_REGEX_PATTERN_LEADING_NEWLINES, '\n');

      const prependedContent: CliUtilityChangelogWriteChangelogPrependedContent = [
        packageHeading,
        '',
        newSection,
        trimmedAfterHeading,
      ].join('\n');

      await fs.writeFile(changelogPath, prependedContent, 'utf-8');
    } else {
      // Prepend with package heading.
      const prependedContent: CliUtilityChangelogWriteChangelogPrependedContent = [
        packageHeading,
        '',
        newSection,
        '',
        existingContent,
      ].join('\n');

      await fs.writeFile(changelogPath, prependedContent, 'utf-8');
    }

    return;
  }

  /**
   * CLI - Utility - Changelog - Prompt With Cancel.
   *
   * Wraps the prompts library with cancellation detection. Returns a discriminated union so
   * callers can check cancelled before using result.
   *
   * @param {CliUtilityChangelogPromptWithCancelQuestions} questions - Questions.
   *
   * @private
   *
   * @returns {CliUtilityChangelogPromptWithCancelReturns}
   *
   * @since 0.13.0
   */
  private static async promptWithCancel<Keys extends string, Result>(questions: CliUtilityChangelogPromptWithCancelQuestions<Keys>): CliUtilityChangelogPromptWithCancelReturns<Keys, Result> {
    let cancelled: CliUtilityChangelogPromptWithCancelCancelled = false;

    const result: CliUtilityChangelogPromptWithCancelResult<Keys, Result> = await prompts<Keys>(questions, {
      onCancel: () => false,
    });

    if (Object.keys(result).length === 0) {
      cancelled = true;
    }

    if (cancelled === true) {
      return {
        cancelled: true,
      };
    }

    return {
      cancelled: false,
      result,
    };
  }

  /**
   * CLI - Utility - Changelog - Generate File Name.
   *
   * Produces a random three-word slug from the adjectives, nouns, and verbs word lists.
   * Used as the entry file name in .changelog/.
   *
   * @private
   *
   * @returns {CliUtilityChangelogGenerateFileNameReturns}
   *
   * @since 0.13.0
   */
  private static generateFileName(): CliUtilityChangelogGenerateFileNameReturns {
    const adjective: CliUtilityChangelogGenerateFileNameAdjective = libItemChangelogAdjectives[Math.floor(Math.random() * libItemChangelogAdjectives.length)];
    const noun: CliUtilityChangelogGenerateFileNameNoun = libItemChangelogNouns[Math.floor(Math.random() * libItemChangelogNouns.length)];
    const verb: CliUtilityChangelogGenerateFileNameVerb = libItemChangelogVerbs[Math.floor(Math.random() * libItemChangelogVerbs.length)];

    return `${adjective}-${noun}-${verb}`;
  }
}
