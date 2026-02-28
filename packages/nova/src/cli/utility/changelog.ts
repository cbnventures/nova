import { promises as fs } from 'fs';
import { join, resolve } from 'path';

import chalk from 'chalk';
import prompts from 'prompts';

import {
  itemChangelogAdjectives,
  itemChangelogCategoryBumpMap,
  itemChangelogNouns,
  itemChangelogValidBumps,
  itemChangelogValidCategories,
  itemChangelogVerbs,
} from '@/lib/item.js';
import { NovaConfig } from '@/lib/nova-config.js';
import { PATTERN_LEADING_NEWLINES } from '@/lib/regex.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIUtilityChangelogGenerateFileNameReturns,
  CLIUtilityChangelogParseEntriesEntries,
  CLIUtilityChangelogParseEntriesEntryBump,
  CLIUtilityChangelogParseEntriesEntryCategory,
  CLIUtilityChangelogParseEntriesEntryPackage,
  CLIUtilityChangelogParseEntriesFiles,
  CLIUtilityChangelogParseEntriesReturns,
  CLIUtilityChangelogPromptWithCancelQuestions,
  CLIUtilityChangelogPromptWithCancelReturns,
  CLIUtilityChangelogRecordBumpOutputKey,
  CLIUtilityChangelogRecordBumpOutputValue,
  CLIUtilityChangelogRecordCategoryOutputKey,
  CLIUtilityChangelogRecordCategoryOutputValue,
  CLIUtilityChangelogRecordMessageOutputKey,
  CLIUtilityChangelogRecordMessageOutputValue,
  CLIUtilityChangelogRecordOptions,
  CLIUtilityChangelogRecordPackageOutputKey,
  CLIUtilityChangelogRecordPackageOutputValue,
  CLIUtilityChangelogRecordReturns,
  CLIUtilityChangelogRecordSelectedBump,
  CLIUtilityChangelogRecordSelectedCategory,
  CLIUtilityChangelogRecordSelectedMessage,
  CLIUtilityChangelogRecordSelectedPackage,
  CLIUtilityChangelogReleaseBumpPriority,
  CLIUtilityChangelogReleaseConfirmOutputKey,
  CLIUtilityChangelogReleaseConfirmOutputValue,
  CLIUtilityChangelogReleaseGrouped,
  CLIUtilityChangelogReleaseHighestBump,
  CLIUtilityChangelogReleaseOptions,
  CLIUtilityChangelogReleasePackageJson,
  CLIUtilityChangelogReleaseReleases,
  CLIUtilityChangelogReleaseReturns,
  CLIUtilityChangelogRunModeOutputKey,
  CLIUtilityChangelogRunModeOutputValue,
  CLIUtilityChangelogRunOptions,
  CLIUtilityChangelogRunReturns,
  CLIUtilityChangelogWriteChangelogByCategory,
  CLIUtilityChangelogWriteChangelogCategoryOrder,
  CLIUtilityChangelogWriteChangelogEntries,
  CLIUtilityChangelogWriteChangelogPackageDir,
  CLIUtilityChangelogWriteChangelogPackageName,
  CLIUtilityChangelogWriteChangelogReturns,
  CLIUtilityChangelogWriteChangelogSectionParts,
  CLIUtilityChangelogWriteChangelogVersion,
} from '@/types/cli/utility/changelog.d.ts';

/**
 * CLI Utility - Changelog.
 *
 * @since 1.0.0
 */
export class CLIUtilityChangelog {
  /**
   * CLI Utility - Changelog - Run.
   *
   * @param {CLIUtilityChangelogRunOptions} options - Options.
   *
   * @returns {CLIUtilityChangelogRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIUtilityChangelogRunOptions): CLIUtilityChangelogRunReturns {
    const isDryRun = options.dryRun === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CLIUtilityChangelog.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    // Mutually exclusive check.
    if (options.record === true && options.release === true) {
      Logger.customize({
        name: 'CLIUtilityChangelog.run',
        purpose: 'validate',
      }).error('Cannot use --record and --release together.');

      process.exitCode = 1;

      return;
    }

    // Record mode (interactive or non-interactive).
    if (options.record === true) {
      if (
        (
          options.package === undefined
          || options.category === undefined
          || options.bump === undefined
          || options.message === undefined
        )
        && (
          options.package !== undefined
          || options.category !== undefined
          || options.bump !== undefined
          || options.message !== undefined
        )
      ) {
        Logger.customize({
          name: 'CLIUtilityChangelog.run',
          purpose: 'validate',
        }).error('Non-interactive record requires --package, --category, --bump, and --message.');

        process.exitCode = 1;

        return;
      }

      await CLIUtilityChangelog.record(options);

      return;
    }

    // Release mode (interactive or non-interactive).
    if (options.release === true) {
      await CLIUtilityChangelog.release(options);

      return;
    }

    // Interactive mode.
    const modeOutput = await CLIUtilityChangelog.promptWithCancel<CLIUtilityChangelogRunModeOutputKey, CLIUtilityChangelogRunModeOutputValue>({
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

    if (modeOutput.cancelled) {
      return;
    }

    const modeOutputResult = modeOutput.result;

    if (modeOutputResult.action === undefined) {
      return;
    }

    if (modeOutputResult.action === 'record') {
      await CLIUtilityChangelog.record(options);
    } else {
      await CLIUtilityChangelog.release(options);
    }
  }

  /**
   * CLI Utility - Changelog - Record.
   *
   * @param {CLIUtilityChangelogRecordOptions} options - Options.
   *
   * @private
   *
   * @returns {CLIUtilityChangelogRecordReturns}
   *
   * @since 1.0.0
   */
  private static async record(options: CLIUtilityChangelogRecordOptions): CLIUtilityChangelogRecordReturns {
    const isDryRun = options.dryRun === true;

    // Load "nova.config.json" for workspace list.
    const novaConfig = new NovaConfig();
    const config = await novaConfig.load();
    const workspaces = config.workspaces ?? {};

    // Filter to non-freezable workspaces.
    const eligibleWorkspaces = Object.entries(workspaces).filter((workspace) => {
      const workspaceConfig = workspace[1];
      const workspaceConfigPolicy = workspaceConfig.policy;

      return workspaceConfigPolicy !== 'freezable';
    });

    if (eligibleWorkspaces.length === 0) {
      Logger.customize({
        name: 'CLIUtilityChangelog.record',
        purpose: 'workspaces',
      }).error('No eligible (non-freezable) workspaces found in "nova.config.json".');

      process.exitCode = 1;

      return;
    }

    let selectedPackage: CLIUtilityChangelogRecordSelectedPackage;
    let selectedCategory: CLIUtilityChangelogRecordSelectedCategory;
    let selectedBump: CLIUtilityChangelogRecordSelectedBump;
    let selectedMessage: CLIUtilityChangelogRecordSelectedMessage;

    // Non-interactive mode.
    if (
      options.package !== undefined
      && options.category !== undefined
      && options.bump !== undefined
      && options.message !== undefined
    ) {
      // Validate package.
      const validPackageEntry = eligibleWorkspaces.find((eligibleWorkspace) => {
        const eligibleWorkspaceConfig = eligibleWorkspace[1];
        const eligibleWorkspaceConfigName = eligibleWorkspaceConfig.name;

        return eligibleWorkspaceConfigName === options.package;
      });
      const validPackage = (validPackageEntry !== undefined) ? validPackageEntry[1].name : undefined;

      if (validPackage === undefined) {
        Logger.customize({
          name: 'CLIUtilityChangelog.record',
          purpose: 'validate',
        }).error(`Package "${options.package}" is not a valid non-freezable workspace.`);

        process.exitCode = 1;

        return;
      }

      // Validate category.
      const validCategory = itemChangelogValidCategories.find((itemChangelogValidCategory) => itemChangelogValidCategory === options.category);

      if (validCategory === undefined) {
        Logger.customize({
          name: 'CLIUtilityChangelog.record',
          purpose: 'validate',
        }).error(`Category "${options.category}" is invalid. Use: ${itemChangelogValidCategories.join(', ')}.`);

        process.exitCode = 1;

        return;
      }

      // Validate bump.
      const validBump = itemChangelogValidBumps.find((itemChangelogValidBump) => itemChangelogValidBump === options.bump);

      if (validBump === undefined) {
        Logger.customize({
          name: 'CLIUtilityChangelog.record',
          purpose: 'validate',
        }).error(`Bump type "${options.bump}" is invalid. Use: ${itemChangelogValidBumps.join(', ')}.`);

        process.exitCode = 1;

        return;
      }

      // Validate message.
      const validMessage = options.message.trim();

      if (validMessage === '') {
        Logger.customize({
          name: 'CLIUtilityChangelog.record',
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
        selectedPackage = eligibleWorkspaces[0][1].name;

        Logger.customize({
          name: 'CLIUtilityChangelog.record',
          purpose: 'package',
        }).info(`Auto-selected package: ${selectedPackage}`);
      } else {
        const packageOutput = await CLIUtilityChangelog.promptWithCancel<CLIUtilityChangelogRecordPackageOutputKey, CLIUtilityChangelogRecordPackageOutputValue>({
          type: 'select',
          name: 'package',
          message: 'Select a package.',
          choices: eligibleWorkspaces.map((eligibleWorkspace) => {
            const eligibleWorkspaceConfig = eligibleWorkspace[1];
            const eligibleWorkspaceConfigName = eligibleWorkspaceConfig.name;
            const eligibleWorkspaceConfigRole = eligibleWorkspaceConfig.role;
            const eligibleWorkspaceConfigPolicy = eligibleWorkspaceConfig.policy;

            return {
              title: eligibleWorkspaceConfigName,
              description: `${eligibleWorkspaceConfigRole} · ${eligibleWorkspaceConfigPolicy}`,
              value: eligibleWorkspaceConfigName,
            };
          }),
        });

        if (packageOutput.cancelled) {
          return;
        }

        const packageOutputResult = packageOutput.result;

        if (packageOutputResult.package === undefined) {
          return;
        }

        selectedPackage = packageOutputResult.package;
      }

      // Select category.
      const categoryOutput = await CLIUtilityChangelog.promptWithCancel<CLIUtilityChangelogRecordCategoryOutputKey, CLIUtilityChangelogRecordCategoryOutputValue>({
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

      if (categoryOutput.cancelled) {
        return;
      }

      const categoryOutputResult = categoryOutput.result;

      if (categoryOutputResult.category === undefined) {
        return;
      }

      selectedCategory = categoryOutputResult.category;

      // Enter description.
      const messageOutput = await CLIUtilityChangelog.promptWithCancel<CLIUtilityChangelogRecordMessageOutputKey, CLIUtilityChangelogRecordMessageOutputValue>({
        type: 'text',
        name: 'message',
        message: 'Describe the change.',
        validate: (value: unknown) => {
          if (typeof value !== 'string' || value.trim() === '') {
            return 'Enter a description.';
          }

          return true;
        },
      });

      if (messageOutput.cancelled) {
        return;
      }

      const messageOutputResult = messageOutput.result;

      if (messageOutputResult.message === undefined) {
        return;
      }

      selectedMessage = messageOutputResult.message.trim();

      // Select bump type (auto-suggested based on category).
      const suggestedBump = itemChangelogCategoryBumpMap[selectedCategory];

      const bumpOutput = await CLIUtilityChangelog.promptWithCancel<CLIUtilityChangelogRecordBumpOutputKey, CLIUtilityChangelogRecordBumpOutputValue>({
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
        initial: itemChangelogValidBumps.indexOf(suggestedBump),
      });

      if (bumpOutput.cancelled) {
        return;
      }

      const bumpOutputResult = bumpOutput.result;

      if (bumpOutputResult.bump === undefined) {
        return;
      }

      selectedBump = bumpOutputResult.bump;
    }

    // Write entry file.
    const fileName = CLIUtilityChangelog.generateFileName();
    const changelogDir = join(process.cwd(), '.changelog');
    const filePath = join(changelogDir, `${fileName}.md`);

    const content = [
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
        name: 'CLIUtilityChangelog.record',
        purpose: 'dryRun',
        padTop: 1,
      }).info(`Would write "${filePath}":`);

      process.stdout.write(`\n${content}`);

      return;
    }

    await fs.mkdir(changelogDir, { recursive: true });

    // Generate a README.md if one doesn't already exist.
    const readmePath = join(changelogDir, 'README.md');

    try {
      await fs.access(readmePath);
    } catch {
      await fs.writeFile(
        readmePath,
        [
          '# Changelog',
          '',
          'Welcome! This folder was automatically generated by `nova utility changelog`, a tool designed for managing versioning and release notes in your monorepo. To learn more about how it works, visit the [documentation](https://cbnventures.github.io/nova/docs/cli/utilities/changelog).',
          '',
        ].join('\n'),
        'utf-8',
      );
    }

    await fs.writeFile(filePath, content, 'utf-8');

    Logger.customize({
      name: 'CLIUtilityChangelog.record',
      purpose: 'saved',
      padTop: 1,
    }).info(`Recorded change to "${filePath}".`);
  }

  /**
   * CLI Utility - Changelog - Release.
   *
   * @param {CLIUtilityChangelogReleaseOptions} options - Options.
   *
   * @private
   *
   * @returns {CLIUtilityChangelogReleaseReturns}
   *
   * @since 1.0.0
   */
  private static async release(options: CLIUtilityChangelogReleaseOptions): CLIUtilityChangelogReleaseReturns {
    const isDryRun = options.dryRun === true;
    const isNonInteractive = options.release === true;

    // Parse all entries.
    const entries = await CLIUtilityChangelog.parseEntries();

    if (entries.length === 0) {
      Logger.customize({
        name: 'CLIUtilityChangelog.release',
        purpose: 'entries',
      }).info('No changelog entries found in ".changelog/".');

      return;
    }

    // Group by package.
    const grouped: CLIUtilityChangelogReleaseGrouped = new Map();

    for (const entry of entries) {
      const existing = grouped.get(entry.package) ?? [];
      existing.push(entry);
      grouped.set(entry.package, existing);
    }

    // Load "nova.config.json" for workspace paths.
    const novaConfig = new NovaConfig();
    const config = await novaConfig.load();
    const workspaces = config.workspaces ?? {};

    // Compute version bumps per package.
    const bumpPriority: CLIUtilityChangelogReleaseBumpPriority = {
      major: 3,
      minor: 2,
      patch: 1,
    };
    const releases: CLIUtilityChangelogReleaseReleases = [];

    for (const entry of grouped) {
      const packageName = entry[0];
      const packageEntries = entry[1];
      // Find workspace path.
      const workspaceEntry = Object.entries(workspaces).find((workspace) => {
        const workspaceConfig = workspace[1];
        const workspaceConfigName = workspaceConfig.name;

        return workspaceConfigName === packageName;
      });

      if (workspaceEntry === undefined) {
        Logger.customize({
          name: 'CLIUtilityChangelog.release',
          purpose: 'workspace',
        }).error(`Package "${packageName}" not found in "nova.config.json".`);

        process.exitCode = 1;

        return;
      }

      const workspacePath = workspaceEntry[0];
      const packageDir = resolve(process.cwd(), workspacePath);
      const packageJsonPath = join(packageDir, 'package.json');

      // Read "package.json".
      let packageJsonRaw;

      try {
        packageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'CLIUtilityChangelog.release',
          purpose: 'readPackageJson',
        }).error(`Unable to read "${packageJsonPath}".`);

        process.exitCode = 1;

        return;
      }

      let packageJson: CLIUtilityChangelogReleasePackageJson;

      try {
        packageJson = JSON.parse(packageJsonRaw);
      } catch {
        Logger.customize({
          name: 'CLIUtilityChangelog.release',
          purpose: 'parsePackageJson',
        }).error(`Unable to parse "${packageJsonPath}".`);

        process.exitCode = 1;

        return;
      }

      const currentVersion = (typeof packageJson['version'] === 'string') ? packageJson['version'] : undefined;

      if (currentVersion === undefined) {
        Logger.customize({
          name: 'CLIUtilityChangelog.release',
          purpose: 'version',
        }).error(`No "version" field found in "${packageJsonPath}".`);

        process.exitCode = 1;

        return;
      }

      // Compute the highest bump.
      let highestBump: CLIUtilityChangelogReleaseHighestBump = 'patch';

      for (const entry of packageEntries) {
        if (bumpPriority[entry.bump] > bumpPriority[highestBump]) {
          highestBump = entry.bump;
        }
      }

      // Compute new version.
      const versionParts = currentVersion.split('.').map(Number);
      const versionPartsMajor = versionParts[0] ?? 0;
      const versionPartsMinor = versionParts[1] ?? 0;
      const versionPartsPatch = versionParts[2] ?? 0;

      let newVersion = currentVersion;

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
        packageDir,
        currentVersion,
        newVersion,
        highestBump,
        entries: packageEntries,
      });
    }

    // Show summary.
    Logger.customize({
      name: 'CLIUtilityChangelog.release',
      purpose: 'summary',
    }).info('Release summary:');

    const categoryOrder = [
      'updated',
      'fixed',
      'added',
      'removed',
    ];

    for (const release of releases) {
      const releasePackageName = release.packageName;
      const releaseCurrentVersion = release.currentVersion;
      const releaseNewVersion = release.newVersion;
      const releaseHighestBump = release.highestBump;
      const releaseEntries = release.entries;

      process.stdout.write(`\n  ${chalk.bold(releasePackageName)}: ${releaseCurrentVersion} → ${chalk.green(releaseNewVersion)} (${releaseHighestBump})\n`);

      for (const category of categoryOrder) {
        const categoryEntries = releaseEntries.filter((releaseEntry) => releaseEntry.category === category);

        if (categoryEntries.length === 0) {
          continue;
        }

        process.stdout.write(`    ${chalk.yellow(category.toUpperCase())}:\n`);

        for (const categoryEntry of categoryEntries) {
          const categoryEntryMessage = categoryEntry.message;

          process.stdout.write(`      - ${categoryEntryMessage}\n`);
        }
      }
    }

    process.stdout.write('\n');

    // Confirm (interactive only).
    if (isNonInteractive !== true) {
      const confirmOutput = await CLIUtilityChangelog.promptWithCancel<CLIUtilityChangelogReleaseConfirmOutputKey, CLIUtilityChangelogReleaseConfirmOutputValue>({
        type: 'confirm',
        name: 'confirm',
        message: 'Proceed with release?',
        initial: false,
      });

      if (confirmOutput.cancelled) {
        Logger.customize({
          name: 'CLIUtilityChangelog.release',
          purpose: 'cancelled',
        }).info('Release cancelled.');

        return;
      }

      const confirmOutputResult = confirmOutput.result;

      if (confirmOutputResult.confirm !== true) {
        Logger.customize({
          name: 'CLIUtilityChangelog.release',
          purpose: 'cancelled',
        }).info('Release cancelled.');

        return;
      }
    }

    if (isDryRun === true) {
      Logger.customize({
        name: 'CLIUtilityChangelog.release',
        purpose: 'dryRun',
      }).info('Dry run complete. No files were modified.');

      return;
    }

    // Apply changes.
    for (const release of releases) {
      const releasePackageName = release.packageName;
      const releasePackageDir = release.packageDir;
      const releaseNewVersion = release.newVersion;
      const releaseEntries = release.entries;
      const packageJsonPath = join(releasePackageDir, 'package.json');

      // Read and update "package.json".
      const packageJsonRaw = await fs.readFile(packageJsonPath, 'utf-8');
      const packageJson: CLIUtilityChangelogReleasePackageJson = JSON.parse(packageJsonRaw);

      Reflect.set(packageJson, 'version', releaseNewVersion);

      const updatedPackageJson = JSON.stringify(packageJson, null, 2);
      const updatedContents = `${updatedPackageJson}\n`;

      await fs.writeFile(packageJsonPath, updatedContents, 'utf-8');

      Logger.customize({
        name: 'CLIUtilityChangelog.release',
        purpose: 'bumpVersion',
      }).info(`Updated "${packageJsonPath}" version to ${releaseNewVersion}.`);

      // Write "CHANGELOG.md".
      await CLIUtilityChangelog.writeChangelog(
        releasePackageDir,
        releasePackageName,
        releaseNewVersion,
        releaseEntries,
      );

      Logger.customize({
        name: 'CLIUtilityChangelog.release',
        purpose: 'writeChangelog',
      }).info(`Updated "CHANGELOG.md" for ${releasePackageName}.`);
    }

    // Clean up consumed entry files.
    for (const entry of entries) {
      await fs.unlink(entry.filePath);
    }

    Logger.customize({
      name: 'CLIUtilityChangelog.release',
      purpose: 'complete',
      padTop: 1,
    }).info('Release complete.');
  }

  /**
   * CLI Utility - Changelog - Parse entries.
   *
   * @private
   *
   * @returns {CLIUtilityChangelogParseEntriesReturns}
   *
   * @since 1.0.0
   */
  private static async parseEntries(): CLIUtilityChangelogParseEntriesReturns {
    const changelogDir = join(process.cwd(), '.changelog');
    const entries: CLIUtilityChangelogParseEntriesEntries = [];

    let files: CLIUtilityChangelogParseEntriesFiles;

    try {
      const dirEntries = await fs.readdir(changelogDir);
      files = dirEntries.filter((file) => file.endsWith('.md'));
    } catch {
      return entries;
    }

    for (const file of files) {
      const filePath = join(changelogDir, file);
      const content = await fs.readFile(filePath, 'utf-8');

      // Parse front matter.
      const lines = content.split('\n');

      if (lines[0] !== '---') {
        continue;
      }

      let endIndex = -1;

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
      let entryPackage: CLIUtilityChangelogParseEntriesEntryPackage;
      let entryCategory: CLIUtilityChangelogParseEntriesEntryCategory;
      let entryBump: CLIUtilityChangelogParseEntriesEntryBump;

      for (let i = 1; i < endIndex; i += 1) {
        const line = lines[i];

        if (line === undefined) {
          continue;
        }

        const colonIndex = line.indexOf(':');

        if (colonIndex === -1) {
          continue;
        }

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Remove surrounding quotes.
        if (
          (
            value.startsWith('"')
            && value.endsWith('"')
          )
          || (
            value.startsWith('\'')
            && value.endsWith('\'')
          )
        ) {
          value = value.slice(1, -1);
        }

        if (key === 'package') {
          entryPackage = value;
        } else if (key === 'category') {
          entryCategory = itemChangelogValidCategories.find((itemChangelogValidCategory) => itemChangelogValidCategory === value);
        } else if (key === 'bump') {
          entryBump = itemChangelogValidBumps.find((itemChangelogValidBump) => itemChangelogValidBump === value);
        }
      }

      // Extract message from body.
      const message = lines.slice(endIndex + 1).join('\n').trim();

      if (
        entryPackage === undefined
        || entryCategory === undefined
        || entryBump === undefined
        || message === ''
      ) {
        Logger.customize({
          name: 'CLIUtilityChangelog.parseEntries',
          purpose: 'skip',
        }).warn(`Skipping "${file}": invalid or missing front matter.`);

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
   * CLI Utility - Changelog - Write changelog.
   *
   * @param {CLIUtilityChangelogWriteChangelogPackageDir}  packageDir  - Package dir.
   * @param {CLIUtilityChangelogWriteChangelogPackageName} packageName - Package name.
   * @param {CLIUtilityChangelogWriteChangelogVersion}     version     - Version.
   * @param {CLIUtilityChangelogWriteChangelogEntries}     entries     - Entries.
   *
   * @private
   *
   * @returns {CLIUtilityChangelogWriteChangelogReturns}
   *
   * @since 1.0.0
   */
  private static async writeChangelog(packageDir: CLIUtilityChangelogWriteChangelogPackageDir, packageName: CLIUtilityChangelogWriteChangelogPackageName, version: CLIUtilityChangelogWriteChangelogVersion, entries: CLIUtilityChangelogWriteChangelogEntries): CLIUtilityChangelogWriteChangelogReturns {
    const changelogPath = join(packageDir, 'CHANGELOG.md');
    const today = new Date();
    const dateString = [
      today.getFullYear(),
      (today.getMonth() + 1).toString().padStart(2, '0'),
      today.getDate().toString().padStart(2, '0'),
    ].join('-');

    // Group entries by category.
    const byCategory: CLIUtilityChangelogWriteChangelogByCategory = new Map();

    for (const entry of entries) {
      const existing = byCategory.get(entry.category) ?? [];
      existing.push(entry.message);
      byCategory.set(entry.category, existing);
    }

    // Build section in order: UPDATED, FIXED, ADDED, REMOVED.
    const categoryOrder: CLIUtilityChangelogWriteChangelogCategoryOrder = ['updated', 'fixed', 'added', 'removed'];
    const sectionParts: CLIUtilityChangelogWriteChangelogSectionParts = [];

    sectionParts.push(`## ${version} (${dateString})`);

    for (const category of categoryOrder) {
      const messages = byCategory.get(category);

      if (messages === undefined || messages.length === 0) {
        continue;
      }

      sectionParts.push('');
      sectionParts.push(`### ${category.toUpperCase()}`);

      for (const message of messages) {
        sectionParts.push(`- ${message}`);
      }
    }

    const newSection = sectionParts.join('\n');

    // Read existing or create new.
    let existingContent = '';

    try {
      existingContent = await fs.readFile(changelogPath, 'utf-8');
    } catch {
      /* empty */
    }

    const packageHeading = `# ${packageName}`;

    if (existingContent === '') {
      // Create new file.
      await fs.writeFile(changelogPath, `${packageHeading}\n\n${newSection}\n`, 'utf-8');
    } else if (existingContent.startsWith(packageHeading)) {
      // Prepend after package heading.
      const afterHeading = existingContent.slice(packageHeading.length);

      await fs.writeFile(changelogPath, `${packageHeading}\n\n${newSection}\n${afterHeading.replace(PATTERN_LEADING_NEWLINES, '\n')}`, 'utf-8');
    } else {
      // Prepend with package heading.
      await fs.writeFile(changelogPath, `${packageHeading}\n\n${newSection}\n\n${existingContent}`, 'utf-8');
    }
  }

  /**
   * CLI Utility - Changelog - Prompt with cancel.
   *
   * @param {CLIUtilityChangelogPromptWithCancelQuestions} questions - Questions.
   *
   * @private
   *
   * @returns {CLIUtilityChangelogPromptWithCancelReturns}
   *
   * @since 1.0.0
   */
  private static async promptWithCancel<Keys extends string, Result>(questions: CLIUtilityChangelogPromptWithCancelQuestions<Keys>): CLIUtilityChangelogPromptWithCancelReturns<Keys, Result> {
    let cancelled = false;

    const result = await prompts<Keys>(questions, {
      onCancel: () => {
        cancelled = true;

        return false;
      },
    });

    if (cancelled) {
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
   * CLI Utility - Changelog - Generate file name.
   *
   * @private
   *
   * @returns {CLIUtilityChangelogGenerateFileNameReturns}
   *
   * @since 1.0.0
   */
  private static generateFileName(): CLIUtilityChangelogGenerateFileNameReturns {
    const adjective = itemChangelogAdjectives[Math.floor(Math.random() * itemChangelogAdjectives.length)];
    const noun = itemChangelogNouns[Math.floor(Math.random() * itemChangelogNouns.length)];
    const verb = itemChangelogVerbs[Math.floor(Math.random() * itemChangelogVerbs.length)];

    return `${adjective}-${noun}-${verb}`;
  }
}
