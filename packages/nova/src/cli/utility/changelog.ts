import { promises as fs } from 'fs';
import { join, resolve } from 'path';

import chalk from 'chalk';
import prompts from 'prompts';

import { LIB_CONSTANTS_DOCS_BASE_URL } from '../../lib/constants.js';
import {
  libItemChangelogAdjectives,
  libItemChangelogCategoryBumpMap,
  libItemChangelogNouns,
  libItemChangelogOrderedCategories,
  libItemChangelogValidBumps,
  libItemChangelogValidCategories,
  libItemChangelogVerbs,
} from '../../lib/item.js';
import { Runner as LibNovaConfig } from '../../lib/nova-config.js';
import { LIB_REGEX_PATTERN_LEADING_NEWLINES } from '../../lib/regex.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Utility_Changelog_Runner_GenerateFileName_Adjective,
  Cli_Utility_Changelog_Runner_GenerateFileName_Noun,
  Cli_Utility_Changelog_Runner_GenerateFileName_Returns,
  Cli_Utility_Changelog_Runner_GenerateFileName_Verb,
  Cli_Utility_Changelog_Runner_ParseEntries_ChangelogDirectory,
  Cli_Utility_Changelog_Runner_ParseEntries_ColonIndex,
  Cli_Utility_Changelog_Runner_ParseEntries_Content,
  Cli_Utility_Changelog_Runner_ParseEntries_CurrentDirectory,
  Cli_Utility_Changelog_Runner_ParseEntries_EndIndex,
  Cli_Utility_Changelog_Runner_ParseEntries_Entries,
  Cli_Utility_Changelog_Runner_ParseEntries_EntryBump,
  Cli_Utility_Changelog_Runner_ParseEntries_EntryCategory,
  Cli_Utility_Changelog_Runner_ParseEntries_EntryFiles,
  Cli_Utility_Changelog_Runner_ParseEntries_EntryPackage,
  Cli_Utility_Changelog_Runner_ParseEntries_FilePath,
  Cli_Utility_Changelog_Runner_ParseEntries_Key,
  Cli_Utility_Changelog_Runner_ParseEntries_Line,
  Cli_Utility_Changelog_Runner_ParseEntries_Lines,
  Cli_Utility_Changelog_Runner_ParseEntries_Message,
  Cli_Utility_Changelog_Runner_ParseEntries_Returns,
  Cli_Utility_Changelog_Runner_ParseEntries_Value,
  Cli_Utility_Changelog_Runner_PromptWithCancel_Cancelled,
  Cli_Utility_Changelog_Runner_PromptWithCancel_Questions,
  Cli_Utility_Changelog_Runner_PromptWithCancel_Result,
  Cli_Utility_Changelog_Runner_PromptWithCancel_Returns,
  Cli_Utility_Changelog_Runner_Record_BumpOutput,
  Cli_Utility_Changelog_Runner_Record_BumpOutputKey,
  Cli_Utility_Changelog_Runner_Record_BumpOutputResult,
  Cli_Utility_Changelog_Runner_Record_BumpOutputValue,
  Cli_Utility_Changelog_Runner_Record_CategoryOutput,
  Cli_Utility_Changelog_Runner_Record_CategoryOutputKey,
  Cli_Utility_Changelog_Runner_Record_CategoryOutputResult,
  Cli_Utility_Changelog_Runner_Record_CategoryOutputValue,
  Cli_Utility_Changelog_Runner_Record_ChangelogDirectory,
  Cli_Utility_Changelog_Runner_Record_Config,
  Cli_Utility_Changelog_Runner_Record_Content,
  Cli_Utility_Changelog_Runner_Record_CurrentDirectory,
  Cli_Utility_Changelog_Runner_Record_EligibleWorkspaces,
  Cli_Utility_Changelog_Runner_Record_FileName,
  Cli_Utility_Changelog_Runner_Record_FilePath,
  Cli_Utility_Changelog_Runner_Record_FilterWorkspaceConfig,
  Cli_Utility_Changelog_Runner_Record_FilterWorkspaceConfigPolicy,
  Cli_Utility_Changelog_Runner_Record_FindEligibleWorkspaceConfig,
  Cli_Utility_Changelog_Runner_Record_FindEligibleWorkspaceConfigName,
  Cli_Utility_Changelog_Runner_Record_IsDryRun,
  Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfig,
  Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigName,
  Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigPolicy,
  Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigRole,
  Cli_Utility_Changelog_Runner_Record_MessageOutput,
  Cli_Utility_Changelog_Runner_Record_MessageOutputKey,
  Cli_Utility_Changelog_Runner_Record_MessageOutputResult,
  Cli_Utility_Changelog_Runner_Record_MessageOutputValue,
  Cli_Utility_Changelog_Runner_Record_MessageValidateValue,
  Cli_Utility_Changelog_Runner_Record_Options,
  Cli_Utility_Changelog_Runner_Record_PackageOutput,
  Cli_Utility_Changelog_Runner_Record_PackageOutputKey,
  Cli_Utility_Changelog_Runner_Record_PackageOutputResult,
  Cli_Utility_Changelog_Runner_Record_PackageOutputValue,
  Cli_Utility_Changelog_Runner_Record_ReadmeContent,
  Cli_Utility_Changelog_Runner_Record_ReadmePath,
  Cli_Utility_Changelog_Runner_Record_Returns,
  Cli_Utility_Changelog_Runner_Record_SelectedBump,
  Cli_Utility_Changelog_Runner_Record_SelectedCategory,
  Cli_Utility_Changelog_Runner_Record_SelectedMessage,
  Cli_Utility_Changelog_Runner_Record_SelectedPackage,
  Cli_Utility_Changelog_Runner_Record_SuggestedBump,
  Cli_Utility_Changelog_Runner_Record_ValidBump,
  Cli_Utility_Changelog_Runner_Record_ValidCategory,
  Cli_Utility_Changelog_Runner_Record_ValidMessage,
  Cli_Utility_Changelog_Runner_Record_ValidPackage,
  Cli_Utility_Changelog_Runner_Record_ValidPackageEntry,
  Cli_Utility_Changelog_Runner_Record_Workspaces,
  Cli_Utility_Changelog_Runner_Release_ApplyPackageJsonPath,
  Cli_Utility_Changelog_Runner_Release_ApplyReleaseEntries,
  Cli_Utility_Changelog_Runner_Release_ApplyReleaseNewVersion,
  Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageDirectory,
  Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageName,
  Cli_Utility_Changelog_Runner_Release_ApplyUpdatedContents,
  Cli_Utility_Changelog_Runner_Release_ApplyUpdatedPackageJson,
  Cli_Utility_Changelog_Runner_Release_BumpPriority,
  Cli_Utility_Changelog_Runner_Release_CategoryEntries,
  Cli_Utility_Changelog_Runner_Release_CategoryEntryMessage,
  Cli_Utility_Changelog_Runner_Release_CategoryLabel,
  Cli_Utility_Changelog_Runner_Release_CategoryOrder,
  Cli_Utility_Changelog_Runner_Release_Config,
  Cli_Utility_Changelog_Runner_Release_ConfirmOutput,
  Cli_Utility_Changelog_Runner_Release_ConfirmOutputKey,
  Cli_Utility_Changelog_Runner_Release_ConfirmOutputResult,
  Cli_Utility_Changelog_Runner_Release_ConfirmOutputValue,
  Cli_Utility_Changelog_Runner_Release_CurrentDirectory,
  Cli_Utility_Changelog_Runner_Release_CurrentVersion,
  Cli_Utility_Changelog_Runner_Release_Entries,
  Cli_Utility_Changelog_Runner_Release_Existing,
  Cli_Utility_Changelog_Runner_Release_FindWorkspaceConfig,
  Cli_Utility_Changelog_Runner_Release_FindWorkspaceConfigName,
  Cli_Utility_Changelog_Runner_Release_Groups,
  Cli_Utility_Changelog_Runner_Release_HighestBump,
  Cli_Utility_Changelog_Runner_Release_IsDryRun,
  Cli_Utility_Changelog_Runner_Release_IsNonInteractive,
  Cli_Utility_Changelog_Runner_Release_NewVersion,
  Cli_Utility_Changelog_Runner_Release_Options,
  Cli_Utility_Changelog_Runner_Release_PackageDirectory,
  Cli_Utility_Changelog_Runner_Release_PackageEntries,
  Cli_Utility_Changelog_Runner_Release_PackageJson,
  Cli_Utility_Changelog_Runner_Release_PackageJsonPath,
  Cli_Utility_Changelog_Runner_Release_PackageJsonRaw,
  Cli_Utility_Changelog_Runner_Release_PackageName,
  Cli_Utility_Changelog_Runner_Release_ParsedPackageJson,
  Cli_Utility_Changelog_Runner_Release_Releases,
  Cli_Utility_Changelog_Runner_Release_Returns,
  Cli_Utility_Changelog_Runner_Release_SummaryReleaseCurrentVersion,
  Cli_Utility_Changelog_Runner_Release_SummaryReleaseEntries,
  Cli_Utility_Changelog_Runner_Release_SummaryReleaseHighestBump,
  Cli_Utility_Changelog_Runner_Release_SummaryReleaseNewVersion,
  Cli_Utility_Changelog_Runner_Release_SummaryReleasePackageName,
  Cli_Utility_Changelog_Runner_Release_VersionParts,
  Cli_Utility_Changelog_Runner_Release_VersionPartsMajor,
  Cli_Utility_Changelog_Runner_Release_VersionPartsMinor,
  Cli_Utility_Changelog_Runner_Release_VersionPartsPatch,
  Cli_Utility_Changelog_Runner_Release_WorkspaceEntry,
  Cli_Utility_Changelog_Runner_Release_WorkspacePath,
  Cli_Utility_Changelog_Runner_Release_Workspaces,
  Cli_Utility_Changelog_Runner_Run_IsDryRun,
  Cli_Utility_Changelog_Runner_Run_ModeOutput,
  Cli_Utility_Changelog_Runner_Run_ModeOutputKey,
  Cli_Utility_Changelog_Runner_Run_ModeOutputResult,
  Cli_Utility_Changelog_Runner_Run_ModeOutputValue,
  Cli_Utility_Changelog_Runner_Run_Options,
  Cli_Utility_Changelog_Runner_Run_Returns,
  Cli_Utility_Changelog_Runner_WriteChangelog_AfterHeading,
  Cli_Utility_Changelog_Runner_WriteChangelog_ByCategory,
  Cli_Utility_Changelog_Runner_WriteChangelog_CategoryOrder,
  Cli_Utility_Changelog_Runner_WriteChangelog_ChangelogPath,
  Cli_Utility_Changelog_Runner_WriteChangelog_DateString,
  Cli_Utility_Changelog_Runner_WriteChangelog_Entries,
  Cli_Utility_Changelog_Runner_WriteChangelog_Existing,
  Cli_Utility_Changelog_Runner_WriteChangelog_ExistingContent,
  Cli_Utility_Changelog_Runner_WriteChangelog_Messages,
  Cli_Utility_Changelog_Runner_WriteChangelog_NewContent,
  Cli_Utility_Changelog_Runner_WriteChangelog_NewSection,
  Cli_Utility_Changelog_Runner_WriteChangelog_PackageDirectory,
  Cli_Utility_Changelog_Runner_WriteChangelog_PackageHeading,
  Cli_Utility_Changelog_Runner_WriteChangelog_PackageName,
  Cli_Utility_Changelog_Runner_WriteChangelog_PrependedContent,
  Cli_Utility_Changelog_Runner_WriteChangelog_Returns,
  Cli_Utility_Changelog_Runner_WriteChangelog_SectionParts,
  Cli_Utility_Changelog_Runner_WriteChangelog_Today,
  Cli_Utility_Changelog_Runner_WriteChangelog_TrimmedAfterHeading,
  Cli_Utility_Changelog_Runner_WriteChangelog_Version,
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
export class Runner {
  /**
   * CLI - Utility - Changelog - Run.
   *
   * Entry point invoked by the CLI. Routes to record or release mode based on flags, falling
   * back to an interactive prompt when neither flag is provided.
   *
   * @param {Cli_Utility_Changelog_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_Changelog_Runner_Run_Returns}
   *
   * @since 0.13.0
   */
  public static async run(options: Cli_Utility_Changelog_Runner_Run_Options): Cli_Utility_Changelog_Runner_Run_Returns {
    const isDryRun: Cli_Utility_Changelog_Runner_Run_IsDryRun = options['dryRun'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    // Mutually exclusive check.
    if (options['record'] === true && options['release'] === true) {
      Logger.customize({
        name: 'Runner.run',
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
          name: 'Runner.run',
          purpose: 'validate',
        }).error('Non-interactive record requires --package, --category, --bump, and --message.');

        process.exitCode = 1;

        return;
      }

      await Runner.record(options);

      return;
    }

    // Release mode (interactive or non-interactive).
    if (options['release'] === true) {
      await Runner.release(options);

      return;
    }

    // Interactive mode.
    const modeOutput: Cli_Utility_Changelog_Runner_Run_ModeOutput = await Runner.promptWithCancel<Cli_Utility_Changelog_Runner_Run_ModeOutputKey, Cli_Utility_Changelog_Runner_Run_ModeOutputValue>({
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

    const modeOutputResult: Cli_Utility_Changelog_Runner_Run_ModeOutputResult = modeOutput['result'];

    if (modeOutputResult.action === undefined) {
      return;
    }

    if (modeOutputResult.action === 'record') {
      await Runner.record(options);
    } else {
      await Runner.release(options);
    }

    return;
  }

  /**
   * CLI - Utility - Changelog - Record.
   *
   * Writes a front-matter entry file into .changelog/ with package, category, bump, and
   * message fields. Supports interactive and CLI modes.
   *
   * @param {Cli_Utility_Changelog_Runner_Record_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Utility_Changelog_Runner_Record_Returns}
   *
   * @since 0.13.0
   */
  private static async record(options: Cli_Utility_Changelog_Runner_Record_Options): Cli_Utility_Changelog_Runner_Record_Returns {
    const isDryRun: Cli_Utility_Changelog_Runner_Record_IsDryRun = options['dryRun'] === true;

    // Load "nova.config.json" for workspace list.
    const config: Cli_Utility_Changelog_Runner_Record_Config = await new LibNovaConfig().load();
    const workspaces: Cli_Utility_Changelog_Runner_Record_Workspaces = config['workspaces'] ?? {};

    // Filter to non-freezable workspaces.
    const eligibleWorkspaces: Cli_Utility_Changelog_Runner_Record_EligibleWorkspaces = Object.entries(workspaces).filter((workspace) => {
      const workspaceConfig: Cli_Utility_Changelog_Runner_Record_FilterWorkspaceConfig = workspace[1];
      const workspaceConfigPolicy: Cli_Utility_Changelog_Runner_Record_FilterWorkspaceConfigPolicy = workspaceConfig['policy'];

      return workspaceConfigPolicy !== 'freezable';
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'Runner.record',
        purpose: 'workspaces',
      }).error('No eligible (non-freezable) workspaces found in "nova.config.json".');

      process.exitCode = 1;

      return;
    }

    let selectedPackage: Cli_Utility_Changelog_Runner_Record_SelectedPackage = undefined;
    let selectedCategory: Cli_Utility_Changelog_Runner_Record_SelectedCategory = undefined;
    let selectedBump: Cli_Utility_Changelog_Runner_Record_SelectedBump = undefined;
    let selectedMessage: Cli_Utility_Changelog_Runner_Record_SelectedMessage = undefined;

    // Non-interactive mode.
    if (
      options['package'] !== undefined
      && options['category'] !== undefined
      && options['bump'] !== undefined
      && options['message'] !== undefined
    ) {
      // Validate package.
      const validPackageEntry: Cli_Utility_Changelog_Runner_Record_ValidPackageEntry = eligibleWorkspaces.find((eligibleWorkspace) => {
        const eligibleWorkspaceConfig: Cli_Utility_Changelog_Runner_Record_FindEligibleWorkspaceConfig = eligibleWorkspace[1];
        const eligibleWorkspaceConfigName: Cli_Utility_Changelog_Runner_Record_FindEligibleWorkspaceConfigName = eligibleWorkspaceConfig['name'];

        return eligibleWorkspaceConfigName === options['package'];
      });
      const validPackage: Cli_Utility_Changelog_Runner_Record_ValidPackage = (validPackageEntry !== undefined) ? validPackageEntry[1]['name'] : undefined;

      if (validPackage === undefined) {
        Logger.customize({
          name: 'Runner.record',
          purpose: 'validate',
        }).error(`Package "${options['package']}" is not a valid non-freezable workspace.`);

        process.exitCode = 1;

        return;
      }

      // Validate category.
      const validCategory: Cli_Utility_Changelog_Runner_Record_ValidCategory = libItemChangelogValidCategories.find((libItemChangelogValidCategory) => libItemChangelogValidCategory === options['category']);

      if (validCategory === undefined) {
        Logger.customize({
          name: 'Runner.record',
          purpose: 'validate',
        }).error(`Category "${options['category']}" is invalid. Use: ${libItemChangelogValidCategories.join(', ')}.`);

        process.exitCode = 1;

        return;
      }

      // Validate bump.
      const validBump: Cli_Utility_Changelog_Runner_Record_ValidBump = libItemChangelogValidBumps.find((libItemChangelogValidBump) => libItemChangelogValidBump === options['bump']);

      if (validBump === undefined) {
        Logger.customize({
          name: 'Runner.record',
          purpose: 'validate',
        }).error(`Bump type "${options['bump']}" is invalid. Use: ${libItemChangelogValidBumps.join(', ')}.`);

        process.exitCode = 1;

        return;
      }

      // Validate message.
      const validMessage: Cli_Utility_Changelog_Runner_Record_ValidMessage = options['message'].trim();

      if (validMessage === '') {
        Logger.customize({
          name: 'Runner.record',
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
          name: 'Runner.record',
          purpose: 'package',
        }).info(`Auto-selected package: ${selectedPackage}`);
      } else {
        const packageOutput: Cli_Utility_Changelog_Runner_Record_PackageOutput = await Runner.promptWithCancel<Cli_Utility_Changelog_Runner_Record_PackageOutputKey, Cli_Utility_Changelog_Runner_Record_PackageOutputValue>({
          type: 'select',
          name: 'package',
          message: 'Select a package.',
          choices: eligibleWorkspaces.map((eligibleWorkspace) => {
            const eligibleWorkspaceConfig: Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfig = eligibleWorkspace[1];
            const eligibleWorkspaceConfigName: Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigName = eligibleWorkspaceConfig['name'];
            const eligibleWorkspaceConfigRole: Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigRole = eligibleWorkspaceConfig['role'];
            const eligibleWorkspaceConfigPolicy: Cli_Utility_Changelog_Runner_Record_MapEligibleWorkspaceConfigPolicy = eligibleWorkspaceConfig['policy'];

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

        const packageOutputResult: Cli_Utility_Changelog_Runner_Record_PackageOutputResult = packageOutput['result'];

        if (packageOutputResult.package === undefined) {
          return;
        }

        selectedPackage = packageOutputResult.package;
      }

      // Select category.
      const categoryOutput: Cli_Utility_Changelog_Runner_Record_CategoryOutput = await Runner.promptWithCancel<Cli_Utility_Changelog_Runner_Record_CategoryOutputKey, Cli_Utility_Changelog_Runner_Record_CategoryOutputValue>({
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

      const categoryOutputResult: Cli_Utility_Changelog_Runner_Record_CategoryOutputResult = categoryOutput['result'];

      if (categoryOutputResult.category === undefined) {
        return;
      }

      selectedCategory = categoryOutputResult.category;

      // Enter description.
      const messageOutput: Cli_Utility_Changelog_Runner_Record_MessageOutput = await Runner.promptWithCancel<Cli_Utility_Changelog_Runner_Record_MessageOutputKey, Cli_Utility_Changelog_Runner_Record_MessageOutputValue>({
        type: 'text',
        name: 'message',
        message: 'Describe the change.',
        validate: (value: Cli_Utility_Changelog_Runner_Record_MessageValidateValue) => {
          if (typeof value !== 'string' || value.trim() === '') {
            return 'Enter a description.';
          }

          return true;
        },
      });

      if (messageOutput['cancelled'] === true) {
        return;
      }

      const messageOutputResult: Cli_Utility_Changelog_Runner_Record_MessageOutputResult = messageOutput['result'];

      if (messageOutputResult.message === undefined) {
        return;
      }

      selectedMessage = messageOutputResult.message.trim();

      // Select bump type (auto-suggested based on category).
      const suggestedBump: Cli_Utility_Changelog_Runner_Record_SuggestedBump = libItemChangelogCategoryBumpMap[selectedCategory];

      const bumpOutput: Cli_Utility_Changelog_Runner_Record_BumpOutput = await Runner.promptWithCancel<Cli_Utility_Changelog_Runner_Record_BumpOutputKey, Cli_Utility_Changelog_Runner_Record_BumpOutputValue>({
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

      const bumpOutputResult: Cli_Utility_Changelog_Runner_Record_BumpOutputResult = bumpOutput['result'];

      if (bumpOutputResult.bump === undefined) {
        return;
      }

      selectedBump = bumpOutputResult.bump;
    }

    // Write entry file.
    const fileName: Cli_Utility_Changelog_Runner_Record_FileName = Runner.generateFileName();
    const currentDirectory: Cli_Utility_Changelog_Runner_Record_CurrentDirectory = process.cwd();
    const changelogDirectory: Cli_Utility_Changelog_Runner_Record_ChangelogDirectory = join(currentDirectory, '.changelog');
    const filePath: Cli_Utility_Changelog_Runner_Record_FilePath = join(changelogDirectory, `${fileName}.md`);

    const content: Cli_Utility_Changelog_Runner_Record_Content = [
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
        name: 'Runner.record',
        purpose: 'dryRun',
        padTop: 1,
      }).info(`Would write "${filePath}":`);

      process.stdout.write(`\n${content}`);

      return;
    }

    await fs.mkdir(changelogDirectory, { recursive: true });

    // Generate a README.md if one doesn't already exist.
    const readmePath: Cli_Utility_Changelog_Runner_Record_ReadmePath = join(changelogDirectory, 'README.md');

    try {
      await fs.access(readmePath);
    } catch {
      const readmeContent: Cli_Utility_Changelog_Runner_Record_ReadmeContent = [
        '# Changelog',
        '',
        `Welcome! This folder was automatically generated by \`nova utility changelog\`, a tool designed for managing versioning and release notes in your monorepo. To learn more about how it works, visit the [documentation](${LIB_CONSTANTS_DOCS_BASE_URL}/docs/cli/utilities/changelog).`,
        '',
      ].join('\n');

      await fs.writeFile(readmePath, readmeContent, 'utf-8');
    }

    await fs.writeFile(filePath, content, 'utf-8');

    Logger.customize({
      name: 'Runner.record',
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
   * @param {Cli_Utility_Changelog_Runner_Release_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Utility_Changelog_Runner_Release_Returns}
   *
   * @since 0.13.0
   */
  private static async release(options: Cli_Utility_Changelog_Runner_Release_Options): Cli_Utility_Changelog_Runner_Release_Returns {
    const isDryRun: Cli_Utility_Changelog_Runner_Release_IsDryRun = options['dryRun'] === true;
    const isNonInteractive: Cli_Utility_Changelog_Runner_Release_IsNonInteractive = options['release'] === true;

    // Parse all entries.
    const entries: Cli_Utility_Changelog_Runner_Release_Entries = await Runner.parseEntries();

    if (entries.length === 0) {
      Logger.customize({
        name: 'Runner.release',
        purpose: 'entries',
      }).info('No changelog entries found in ".changelog/".');

      return;
    }

    // Group by package.
    const groups: Cli_Utility_Changelog_Runner_Release_Groups = new Map();

    for (const entry of entries) {
      const existing: Cli_Utility_Changelog_Runner_Release_Existing = groups.get(entry['package']) ?? [];

      existing.push(entry);

      groups.set(entry['package'], existing);
    }

    // Load "nova.config.json" for workspace paths.
    const config: Cli_Utility_Changelog_Runner_Release_Config = await new LibNovaConfig().load();
    const workspaces: Cli_Utility_Changelog_Runner_Release_Workspaces = config['workspaces'] ?? {};

    // Compute version bumps per package.
    const bumpPriority: Cli_Utility_Changelog_Runner_Release_BumpPriority = {
      major: 3,
      minor: 2,
      patch: 1,
    };
    const releases: Cli_Utility_Changelog_Runner_Release_Releases = [];

    for (const group of groups) {
      const packageName: Cli_Utility_Changelog_Runner_Release_PackageName = group[0];
      const packageEntries: Cli_Utility_Changelog_Runner_Release_PackageEntries = group[1];

      // Find workspace path.
      const workspaceEntry: Cli_Utility_Changelog_Runner_Release_WorkspaceEntry = Object.entries(workspaces).find((workspace) => {
        const workspaceConfig: Cli_Utility_Changelog_Runner_Release_FindWorkspaceConfig = workspace[1];
        const workspaceConfigName: Cli_Utility_Changelog_Runner_Release_FindWorkspaceConfigName = workspaceConfig['name'];

        return workspaceConfigName === packageName;
      });

      if (workspaceEntry === undefined) {
        Logger.customize({
          name: 'Runner.release',
          purpose: 'workspace',
        }).error(`Package "${packageName}" not found in "nova.config.json".`);

        process.exitCode = 1;

        return;
      }

      const workspacePath: Cli_Utility_Changelog_Runner_Release_WorkspacePath = workspaceEntry[0];
      const currentDirectory: Cli_Utility_Changelog_Runner_Release_CurrentDirectory = process.cwd();
      const packageDirectory: Cli_Utility_Changelog_Runner_Release_PackageDirectory = resolve(currentDirectory, workspacePath);
      const packageJsonPath: Cli_Utility_Changelog_Runner_Release_PackageJsonPath = join(packageDirectory, 'package.json');

      // Read "package.json".
      let packageJsonRaw: Cli_Utility_Changelog_Runner_Release_PackageJsonRaw = undefined;

      try {
        packageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'Runner.release',
          purpose: 'readPackageJson',
        }).error(`Unable to read "${packageJsonPath}".`);

        process.exitCode = 1;

        return;
      }

      let parsedPackageJson: Cli_Utility_Changelog_Runner_Release_ParsedPackageJson = undefined;

      try {
        parsedPackageJson = JSON.parse(packageJsonRaw);
      } catch {
        Logger.customize({
          name: 'Runner.release',
          purpose: 'parsePackageJson',
        }).error(`Unable to parse "${packageJsonPath}".`);

        process.exitCode = 1;

        return;
      }

      if (parsedPackageJson === undefined) {
        process.exitCode = 1;

        return;
      }

      const currentVersion: Cli_Utility_Changelog_Runner_Release_CurrentVersion = (typeof parsedPackageJson['version'] === 'string') ? parsedPackageJson['version'] : undefined;

      if (currentVersion === undefined) {
        Logger.customize({
          name: 'Runner.release',
          purpose: 'version',
        }).error(`No "version" field found in "${packageJsonPath}".`);

        process.exitCode = 1;

        return;
      }

      // Compute the highest bump.
      let highestBump: Cli_Utility_Changelog_Runner_Release_HighestBump = 'patch';

      for (const packageEntry of packageEntries) {
        if (bumpPriority[packageEntry['bump']] > bumpPriority[highestBump]) {
          highestBump = packageEntry['bump'];
        }
      }

      // Compute new version.
      const versionParts: Cli_Utility_Changelog_Runner_Release_VersionParts = currentVersion.split('.').map(Number);
      const versionPartsMajor: Cli_Utility_Changelog_Runner_Release_VersionPartsMajor = versionParts[0] ?? 0;
      const versionPartsMinor: Cli_Utility_Changelog_Runner_Release_VersionPartsMinor = versionParts[1] ?? 0;
      const versionPartsPatch: Cli_Utility_Changelog_Runner_Release_VersionPartsPatch = versionParts[2] ?? 0;

      let newVersion: Cli_Utility_Changelog_Runner_Release_NewVersion = currentVersion;

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
      name: 'Runner.release',
      purpose: 'summary',
    }).info('Release summary:');

    const categoryOrder: Cli_Utility_Changelog_Runner_Release_CategoryOrder = [
      'updated',
      'fixed',
      'added',
      'removed',
    ];

    for (const release of releases) {
      const releasePackageName: Cli_Utility_Changelog_Runner_Release_SummaryReleasePackageName = release['packageName'];
      const releaseCurrentVersion: Cli_Utility_Changelog_Runner_Release_SummaryReleaseCurrentVersion = release['currentVersion'];
      const releaseNewVersion: Cli_Utility_Changelog_Runner_Release_SummaryReleaseNewVersion = release['newVersion'];
      const releaseHighestBump: Cli_Utility_Changelog_Runner_Release_SummaryReleaseHighestBump = release['highestBump'];
      const releaseEntries: Cli_Utility_Changelog_Runner_Release_SummaryReleaseEntries = release['entries'];

      process.stdout.write(`\n  ${chalk.bold(releasePackageName)}: ${releaseCurrentVersion} → ${chalk.green(releaseNewVersion)} (${releaseHighestBump})\n`);

      for (const category of categoryOrder) {
        const categoryEntries: Cli_Utility_Changelog_Runner_Release_CategoryEntries = releaseEntries.filter((releaseEntry) => releaseEntry['category'] === category);

        if (categoryEntries.length === 0) {
          continue;
        }

        const categoryLabel: Cli_Utility_Changelog_Runner_Release_CategoryLabel = category.toUpperCase();

        process.stdout.write(`    ${chalk.yellow(categoryLabel)}:\n`);

        for (const categoryEntry of categoryEntries) {
          const categoryEntryMessage: Cli_Utility_Changelog_Runner_Release_CategoryEntryMessage = categoryEntry['message'];

          process.stdout.write(`      - ${categoryEntryMessage}\n`);
        }
      }
    }

    process.stdout.write('\n');

    // Confirm (interactive only).
    if (isNonInteractive !== true) {
      const confirmOutput: Cli_Utility_Changelog_Runner_Release_ConfirmOutput = await Runner.promptWithCancel<Cli_Utility_Changelog_Runner_Release_ConfirmOutputKey, Cli_Utility_Changelog_Runner_Release_ConfirmOutputValue>({
        type: 'confirm',
        name: 'confirm',
        message: 'Proceed with release?',
        initial: false,
      });

      if (confirmOutput['cancelled'] === true) {
        Logger.customize({
          name: 'Runner.release',
          purpose: 'cancelled',
        }).info('Release cancelled.');

        return;
      }

      const confirmOutputResult: Cli_Utility_Changelog_Runner_Release_ConfirmOutputResult = confirmOutput['result'];

      if (confirmOutputResult.confirm !== true) {
        Logger.customize({
          name: 'Runner.release',
          purpose: 'cancelled',
        }).info('Release cancelled.');

        return;
      }
    }

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.release',
        purpose: 'dryRun',
      }).info('Dry run complete. No files were modified.');

      return;
    }

    // Apply changes.
    for (const release of releases) {
      const releasePackageName: Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageName = release['packageName'];
      const releasePackageDirectory: Cli_Utility_Changelog_Runner_Release_ApplyReleasePackageDirectory = release['packageDirectory'];
      const releaseNewVersion: Cli_Utility_Changelog_Runner_Release_ApplyReleaseNewVersion = release['newVersion'];
      const releaseEntries: Cli_Utility_Changelog_Runner_Release_ApplyReleaseEntries = release['entries'];
      const packageJsonPath: Cli_Utility_Changelog_Runner_Release_ApplyPackageJsonPath = join(releasePackageDirectory, 'package.json');

      // Read and update "package.json".
      const packageJson: Cli_Utility_Changelog_Runner_Release_PackageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

      if (
        packageJson === null
        || typeof packageJson !== 'object'
        || typeof packageJson['version'] !== 'string'
      ) {
        throw new Error(`Invalid package.json at "${packageJsonPath}": missing or non-string "version" field.`);
      }

      Reflect.set(packageJson, 'version', releaseNewVersion);

      const updatedPackageJson: Cli_Utility_Changelog_Runner_Release_ApplyUpdatedPackageJson = JSON.stringify(packageJson, null, 2);
      const updatedContents: Cli_Utility_Changelog_Runner_Release_ApplyUpdatedContents = `${updatedPackageJson}\n`;

      await fs.writeFile(packageJsonPath, updatedContents, 'utf-8');

      Logger.customize({
        name: 'Runner.release',
        purpose: 'bumpVersion',
      }).info(`Updated "${packageJsonPath}" version to ${releaseNewVersion}.`);

      // Write "CHANGELOG.md".
      await Runner.writeChangelog(
        releasePackageDirectory,
        releasePackageName,
        releaseNewVersion,
        releaseEntries,
      );

      Logger.customize({
        name: 'Runner.release',
        purpose: 'writeChangelog',
      }).info(`Updated "CHANGELOG.md" for ${releasePackageName}.`);
    }

    // Clean up consumed entry files.
    for (const entry of entries) {
      await fs.unlink(entry['filePath']);
    }

    Logger.customize({
      name: 'Runner.release',
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
   * @returns {Cli_Utility_Changelog_Runner_ParseEntries_Returns}
   *
   * @since 0.13.0
   */
  private static async parseEntries(): Cli_Utility_Changelog_Runner_ParseEntries_Returns {
    const currentDirectory: Cli_Utility_Changelog_Runner_ParseEntries_CurrentDirectory = process.cwd();
    const changelogDirectory: Cli_Utility_Changelog_Runner_ParseEntries_ChangelogDirectory = join(currentDirectory, '.changelog');
    const entries: Cli_Utility_Changelog_Runner_ParseEntries_Entries = [];

    let entryFiles: Cli_Utility_Changelog_Runner_ParseEntries_EntryFiles = undefined;

    try {
      entryFiles = (await fs.readdir(changelogDirectory)).filter((directoryEntry) => directoryEntry.endsWith('.md'));
    } catch {
      return entries;
    }

    for (const entryFile of entryFiles) {
      const filePath: Cli_Utility_Changelog_Runner_ParseEntries_FilePath = join(changelogDirectory, entryFile);

      const content: Cli_Utility_Changelog_Runner_ParseEntries_Content = await fs.readFile(filePath, 'utf-8');

      // Parse front matter.
      const lines: Cli_Utility_Changelog_Runner_ParseEntries_Lines = content.split('\n');

      if (lines[0] !== '---') {
        continue;
      }

      let endIndex: Cli_Utility_Changelog_Runner_ParseEntries_EndIndex = -1;

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
      let entryPackage: Cli_Utility_Changelog_Runner_ParseEntries_EntryPackage = undefined;
      let entryCategory: Cli_Utility_Changelog_Runner_ParseEntries_EntryCategory = undefined;
      let entryBump: Cli_Utility_Changelog_Runner_ParseEntries_EntryBump = undefined;

      for (let i = 1; i < endIndex; i += 1) {
        const line: Cli_Utility_Changelog_Runner_ParseEntries_Line = lines[i];

        if (line === undefined) {
          continue;
        }

        const colonIndex: Cli_Utility_Changelog_Runner_ParseEntries_ColonIndex = line.indexOf(':');

        if (colonIndex === -1) {
          continue;
        }

        const key: Cli_Utility_Changelog_Runner_ParseEntries_Key = line.slice(0, colonIndex).trim();
        let value: Cli_Utility_Changelog_Runner_ParseEntries_Value = line.slice(colonIndex + 1).trim();

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
      const message: Cli_Utility_Changelog_Runner_ParseEntries_Message = lines.slice(endIndex + 1).join('\n').trim();

      if (
        entryPackage === undefined
        || entryCategory === undefined
        || entryBump === undefined
        || message === ''
      ) {
        Logger.customize({
          name: 'Runner.parseEntries',
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
   * @param {Cli_Utility_Changelog_Runner_WriteChangelog_PackageDirectory} packageDirectory - Package directory.
   * @param {Cli_Utility_Changelog_Runner_WriteChangelog_PackageName}      packageName      - Package name.
   * @param {Cli_Utility_Changelog_Runner_WriteChangelog_Version}          version          - Version.
   * @param {Cli_Utility_Changelog_Runner_WriteChangelog_Entries}          entries          - Entries.
   *
   * @private
   *
   * @returns {Cli_Utility_Changelog_Runner_WriteChangelog_Returns}
   *
   * @since 0.13.0
   */
  private static async writeChangelog(packageDirectory: Cli_Utility_Changelog_Runner_WriteChangelog_PackageDirectory, packageName: Cli_Utility_Changelog_Runner_WriteChangelog_PackageName, version: Cli_Utility_Changelog_Runner_WriteChangelog_Version, entries: Cli_Utility_Changelog_Runner_WriteChangelog_Entries): Cli_Utility_Changelog_Runner_WriteChangelog_Returns {
    const changelogPath: Cli_Utility_Changelog_Runner_WriteChangelog_ChangelogPath = join(packageDirectory, 'CHANGELOG.md');
    const today: Cli_Utility_Changelog_Runner_WriteChangelog_Today = new Date();
    const dateString: Cli_Utility_Changelog_Runner_WriteChangelog_DateString = [
      today.getFullYear(),
      (today.getMonth() + 1).toString().padStart(2, '0'),
      today.getDate().toString().padStart(2, '0'),
    ].join('-');

    // Group entries by category.
    const byCategory: Cli_Utility_Changelog_Runner_WriteChangelog_ByCategory = new Map();

    for (const entry of entries) {
      const existing: Cli_Utility_Changelog_Runner_WriteChangelog_Existing = byCategory.get(entry['category']) ?? [];

      existing.push(entry['message']);

      byCategory.set(entry['category'], existing);
    }

    // Build section in order: UPDATED, FIXED, ADDED, REMOVED.
    const categoryOrder: Cli_Utility_Changelog_Runner_WriteChangelog_CategoryOrder = [...libItemChangelogOrderedCategories];
    const sectionParts: Cli_Utility_Changelog_Runner_WriteChangelog_SectionParts = [];

    sectionParts.push(`## ${version} - ${dateString}`);

    for (const category of categoryOrder) {
      const messages: Cli_Utility_Changelog_Runner_WriteChangelog_Messages = byCategory.get(category);

      if (messages === undefined || messages.length === 0) {
        continue;
      }

      sectionParts.push('');
      sectionParts.push(`### ${category.toUpperCase()}`);

      for (const message of messages) {
        sectionParts.push(`- ${message}`);
      }
    }

    const newSection: Cli_Utility_Changelog_Runner_WriteChangelog_NewSection = sectionParts.join('\n');

    // Read existing or create new.
    let existingContent: Cli_Utility_Changelog_Runner_WriteChangelog_ExistingContent = '';

    try {
      existingContent = await fs.readFile(changelogPath, 'utf-8');
    } catch {
      /* empty */
    }

    const packageHeading: Cli_Utility_Changelog_Runner_WriteChangelog_PackageHeading = `# ${packageName}`;

    if (existingContent === '') {
      // Create new file.
      const newContent: Cli_Utility_Changelog_Runner_WriteChangelog_NewContent = [
        packageHeading,
        '',
        newSection,
        '',
      ].join('\n');

      await fs.writeFile(changelogPath, newContent, 'utf-8');
    } else if (existingContent.startsWith(packageHeading) === true) {
      // Prepend after package heading.
      const afterHeading: Cli_Utility_Changelog_Runner_WriteChangelog_AfterHeading = existingContent.slice(packageHeading.length);
      const trimmedAfterHeading: Cli_Utility_Changelog_Runner_WriteChangelog_TrimmedAfterHeading = afterHeading.replace(LIB_REGEX_PATTERN_LEADING_NEWLINES, '\n');

      const prependedContent: Cli_Utility_Changelog_Runner_WriteChangelog_PrependedContent = [
        packageHeading,
        '',
        newSection,
        trimmedAfterHeading,
      ].join('\n');

      await fs.writeFile(changelogPath, prependedContent, 'utf-8');
    } else {
      // Prepend with package heading.
      const prependedContent: Cli_Utility_Changelog_Runner_WriteChangelog_PrependedContent = [
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
   * @param {Cli_Utility_Changelog_Runner_PromptWithCancel_Questions} questions - Questions.
   *
   * @private
   *
   * @returns {Cli_Utility_Changelog_Runner_PromptWithCancel_Returns}
   *
   * @since 0.13.0
   */
  private static async promptWithCancel<Keys extends string, Result>(questions: Cli_Utility_Changelog_Runner_PromptWithCancel_Questions<Keys>): Cli_Utility_Changelog_Runner_PromptWithCancel_Returns<Keys, Result> {
    let cancelled: Cli_Utility_Changelog_Runner_PromptWithCancel_Cancelled = false;

    const result: Cli_Utility_Changelog_Runner_PromptWithCancel_Result<Keys, Result> = await prompts<Keys>(questions, {
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
   * @returns {Cli_Utility_Changelog_Runner_GenerateFileName_Returns}
   *
   * @since 0.13.0
   */
  private static generateFileName(): Cli_Utility_Changelog_Runner_GenerateFileName_Returns {
    const adjective: Cli_Utility_Changelog_Runner_GenerateFileName_Adjective = libItemChangelogAdjectives[Math.floor(Math.random() * libItemChangelogAdjectives.length)];
    const noun: Cli_Utility_Changelog_Runner_GenerateFileName_Noun = libItemChangelogNouns[Math.floor(Math.random() * libItemChangelogNouns.length)];
    const verb: Cli_Utility_Changelog_Runner_GenerateFileName_Verb = libItemChangelogVerbs[Math.floor(Math.random() * libItemChangelogVerbs.length)];

    return `${adjective}-${noun}-${verb}`;
  }
}
