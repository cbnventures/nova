import { promises as fs } from 'fs';
import { join } from 'path';

import chalk from 'chalk';
import {
  parse as parseYaml,
  stringify as stringifyYaml,
} from 'yaml';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_LEADING_DOT_SLASH,
  LIB_REGEX_PATTERN_TRAILING_NEWLINES,
  LIB_REGEX_PATTERN_TRAILING_NEWLINES_OR_NONE,
  LIB_REGEX_PATTERN_TRAILING_SLASH,
  LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_EXPRESSION,
  LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_SEPARATOR,
  LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_END,
  LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_START,
  LIB_REGEX_PATTERN_WORKFLOW_NAME,
  LIB_REGEX_PATTERN_WORKFLOW_RUN_NAME_CAPTURE,
} from '../../../lib/regex.js';
import {
  isProjectRoot,
  pathExists,
  renameFileWithDate,
  resolveTemplatePath,
  saveGeneratedFile,
} from '../../../lib/utility.js';
import { libWorkflowTemplatesMetadata } from '../../../lib/workflow-templates.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliGenerateGithubWorkflowsBuildArtifactNameReturns,
  CliGenerateGithubWorkflowsBuildArtifactNameTargetId,
  CliGenerateGithubWorkflowsBuildArtifactNameTargetType,
  CliGenerateGithubWorkflowsBuildCommandFlags,
  CliGenerateGithubWorkflowsBuildCommandReturns,
  CliGenerateGithubWorkflowsBuildCommandScriptName,
  CliGenerateGithubWorkflowsBuildCommandUseTurbo,
  CliGenerateGithubWorkflowsBuildCommandWorkspaceNames,
  CliGenerateGithubWorkflowsBuildEntrySetupLinesEntry,
  CliGenerateGithubWorkflowsBuildEntrySetupLinesLines,
  CliGenerateGithubWorkflowsBuildEntrySetupLinesMetadataEntry,
  CliGenerateGithubWorkflowsBuildEntrySetupLinesOutputFileName,
  CliGenerateGithubWorkflowsBuildEntrySetupLinesReturns,
  CliGenerateGithubWorkflowsBuildMergedJobsConditionJobsConditionLine,
  CliGenerateGithubWorkflowsBuildMergedJobsConditionReturns,
  CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataList,
  CliGenerateGithubWorkflowsBuildMergedPublishConditionDispatchPart,
  CliGenerateGithubWorkflowsBuildMergedPublishConditionNonDispatchParts,
  CliGenerateGithubWorkflowsBuildMergedPublishConditionPublishInner,
  CliGenerateGithubWorkflowsBuildMergedPublishConditionPublishParts,
  CliGenerateGithubWorkflowsBuildMergedPublishConditionReturns,
  CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataList,
  CliGenerateGithubWorkflowsBuildMergedRunNameContextExpressions,
  CliGenerateGithubWorkflowsBuildMergedRunNameContextInner,
  CliGenerateGithubWorkflowsBuildMergedRunNameContextMatch,
  CliGenerateGithubWorkflowsBuildMergedRunNameContextParts,
  CliGenerateGithubWorkflowsBuildMergedRunNameHasEmptyFallback,
  CliGenerateGithubWorkflowsBuildMergedRunNameMergedContextExpression,
  CliGenerateGithubWorkflowsBuildMergedRunNameNeedsManuallyFallback,
  CliGenerateGithubWorkflowsBuildMergedRunNameReturns,
  CliGenerateGithubWorkflowsBuildMergedRunNameRunNameMatch,
  CliGenerateGithubWorkflowsBuildMergedRunNameRunNamePrefix,
  CliGenerateGithubWorkflowsBuildMergedRunNameRunNameSuffix,
  CliGenerateGithubWorkflowsBuildMergedRunNameShouldAppendFallback,
  CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataList,
  CliGenerateGithubWorkflowsDetectCircularDependsOnCurrentEntry,
  CliGenerateGithubWorkflowsDetectCircularDependsOnCurrentId,
  CliGenerateGithubWorkflowsDetectCircularDependsOnEntryKey,
  CliGenerateGithubWorkflowsDetectCircularDependsOnKey,
  CliGenerateGithubWorkflowsDetectCircularDependsOnQueue,
  CliGenerateGithubWorkflowsDetectCircularDependsOnReturns,
  CliGenerateGithubWorkflowsDetectCircularDependsOnVisited,
  CliGenerateGithubWorkflowsDetectCircularDependsOnWorkflows,
  CliGenerateGithubWorkflowsDetectTurboProjectDirectory,
  CliGenerateGithubWorkflowsDetectTurboReturns,
  CliGenerateGithubWorkflowsDetectTurboTurboConfigPath,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsArtifactName,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsMetadata,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsPathLines,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsResolvedPath,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsReturns,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsStepLines,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsSteps,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsStrippedDir,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsTargetId,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsTargetMetadata,
  CliGenerateGithubWorkflowsRenderUploadArtifactStepsTargets,
  CliGenerateGithubWorkflowsResolveWorkspaceNameEntry,
  CliGenerateGithubWorkflowsResolveWorkspaceNamePath,
  CliGenerateGithubWorkflowsResolveWorkspaceNameReturns,
  CliGenerateGithubWorkflowsResolveWorkspaceNameWorkspaces,
  CliGenerateGithubWorkflowsRunAppendedFragments,
  CliGenerateGithubWorkflowsRunArtifactName,
  CliGenerateGithubWorkflowsRunBaseContent,
  CliGenerateGithubWorkflowsRunBasePath,
  CliGenerateGithubWorkflowsRunBuildCommand,
  CliGenerateGithubWorkflowsRunCheckCommand,
  CliGenerateGithubWorkflowsRunConfig,
  CliGenerateGithubWorkflowsRunContent,
  CliGenerateGithubWorkflowsRunCurrentDirectory,
  CliGenerateGithubWorkflowsRunDependsOnBaseContent,
  CliGenerateGithubWorkflowsRunDependsOnBasePath,
  CliGenerateGithubWorkflowsRunDependsOnEntries,
  CliGenerateGithubWorkflowsRunDependsOnEntry,
  CliGenerateGithubWorkflowsRunDependsOnNameMatch,
  CliGenerateGithubWorkflowsRunDependsOnResolvedNames,
  CliGenerateGithubWorkflowsRunDependsOnTarget,
  CliGenerateGithubWorkflowsRunDependsOnTargetKey,
  CliGenerateGithubWorkflowsRunDependsOnTargetSuffix,
  CliGenerateGithubWorkflowsRunDependsOnWorkflowName,
  CliGenerateGithubWorkflowsRunDependsOnYamlArray,
  CliGenerateGithubWorkflowsRunDisplayPath,
  CliGenerateGithubWorkflowsRunDuplicateKey,
  CliGenerateGithubWorkflowsRunDuplicateSet,
  CliGenerateGithubWorkflowsRunEntryLabel,
  CliGenerateGithubWorkflowsRunEntryScope,
  CliGenerateGithubWorkflowsRunEntryScopes,
  CliGenerateGithubWorkflowsRunEntrySetupLines,
  CliGenerateGithubWorkflowsRunEntryTarget,
  CliGenerateGithubWorkflowsRunEntryTargets,
  CliGenerateGithubWorkflowsRunExistingEntries,
  CliGenerateGithubWorkflowsRunExistingEntry,
  CliGenerateGithubWorkflowsRunGeneratedSet,
  CliGenerateGithubWorkflowsRunHasDependsOnError,
  CliGenerateGithubWorkflowsRunHasDuplicateError,
  CliGenerateGithubWorkflowsRunHasPublishValidationError,
  CliGenerateGithubWorkflowsRunHasTriggerError,
  CliGenerateGithubWorkflowsRunHasTriggers,
  CliGenerateGithubWorkflowsRunIndentedFragment,
  CliGenerateGithubWorkflowsRunIndentedFragmentLines,
  CliGenerateGithubWorkflowsRunIndentedTriggerLines,
  CliGenerateGithubWorkflowsRunIndentedTriggerYaml,
  CliGenerateGithubWorkflowsRunIsAtProjectRoot,
  CliGenerateGithubWorkflowsRunIsBackup,
  CliGenerateGithubWorkflowsRunIsDryRun,
  CliGenerateGithubWorkflowsRunIsOrphan,
  CliGenerateGithubWorkflowsRunIsReplaceFile,
  CliGenerateGithubWorkflowsRunJobsConditionLine,
  CliGenerateGithubWorkflowsRunMergedJobsCondition,
  CliGenerateGithubWorkflowsRunMergedPublishCondition,
  CliGenerateGithubWorkflowsRunMergedRunName,
  CliGenerateGithubWorkflowsRunMergedTriggerBlock,
  CliGenerateGithubWorkflowsRunMergedVariables,
  CliGenerateGithubWorkflowsRunMetadataEntry,
  CliGenerateGithubWorkflowsRunMissingLiterals,
  CliGenerateGithubWorkflowsRunNeedsDependsOn,
  CliGenerateGithubWorkflowsRunNeedsManuallyFallback,
  CliGenerateGithubWorkflowsRunOptions,
  CliGenerateGithubWorkflowsRunOrphanPath,
  CliGenerateGithubWorkflowsRunOutputFileName,
  CliGenerateGithubWorkflowsRunOutputFileNames,
  CliGenerateGithubWorkflowsRunReplaceFileNotice,
  CliGenerateGithubWorkflowsRunResolvedName,
  CliGenerateGithubWorkflowsRunResolvedTargetFragments,
  CliGenerateGithubWorkflowsRunResolvedWorkspaceName,
  CliGenerateGithubWorkflowsRunResolvedWorkspaceNames,
  CliGenerateGithubWorkflowsRunReturns,
  CliGenerateGithubWorkflowsRunSetupLines,
  CliGenerateGithubWorkflowsRunSetupMessage,
  CliGenerateGithubWorkflowsRunSubstituted,
  CliGenerateGithubWorkflowsRunSupportsScopes,
  CliGenerateGithubWorkflowsRunSupportsTargets,
  CliGenerateGithubWorkflowsRunTargetFragmentExists,
  CliGenerateGithubWorkflowsRunTargetFragmentPath,
  CliGenerateGithubWorkflowsRunTargetFragmentRawContent,
  CliGenerateGithubWorkflowsRunTargetFragmentResolvedContent,
  CliGenerateGithubWorkflowsRunTargetId,
  CliGenerateGithubWorkflowsRunTargetJobsConditionLine,
  CliGenerateGithubWorkflowsRunTargetMetadata,
  CliGenerateGithubWorkflowsRunTargetNeeds,
  CliGenerateGithubWorkflowsRunTargetNeedsJobId,
  CliGenerateGithubWorkflowsRunTargetNeedsJobIds,
  CliGenerateGithubWorkflowsRunTargetNeedsValue,
  CliGenerateGithubWorkflowsRunTargetNeedWorkingDir,
  CliGenerateGithubWorkflowsRunTargetPath,
  CliGenerateGithubWorkflowsRunTargetsMetadata,
  CliGenerateGithubWorkflowsRunTargetTupleKey,
  CliGenerateGithubWorkflowsRunTargetTupleSet,
  CliGenerateGithubWorkflowsRunTargetType,
  CliGenerateGithubWorkflowsRunTargetWorkingDir,
  CliGenerateGithubWorkflowsRunTemplateDirectory,
  CliGenerateGithubWorkflowsRunTemplateDirExists,
  CliGenerateGithubWorkflowsRunTemplateDirPath,
  CliGenerateGithubWorkflowsRunTemplateName,
  CliGenerateGithubWorkflowsRunTriggerData,
  CliGenerateGithubWorkflowsRunTriggerDataList,
  CliGenerateGithubWorkflowsRunTriggerFileExists,
  CliGenerateGithubWorkflowsRunTriggerFileName,
  CliGenerateGithubWorkflowsRunTriggerFilePath,
  CliGenerateGithubWorkflowsRunTriggerParsed,
  CliGenerateGithubWorkflowsRunTriggerParsedDependsOn,
  CliGenerateGithubWorkflowsRunTriggerParsedJobsCondition,
  CliGenerateGithubWorkflowsRunTriggerParsedPublishCondition,
  CliGenerateGithubWorkflowsRunTriggerParsedRunName,
  CliGenerateGithubWorkflowsRunTriggerParsedTriggerBlock,
  CliGenerateGithubWorkflowsRunTriggerRawContent,
  CliGenerateGithubWorkflowsRunTriggers,
  CliGenerateGithubWorkflowsRunTriggerYaml,
  CliGenerateGithubWorkflowsRunUploadArtifactStep,
  CliGenerateGithubWorkflowsRunUseTurbo,
  CliGenerateGithubWorkflowsRunVariableMeta,
  CliGenerateGithubWorkflowsRunVariableName,
  CliGenerateGithubWorkflowsRunWorkflowEntry,
  CliGenerateGithubWorkflowsRunWorkflows,
  CliGenerateGithubWorkflowsRunWorkflowsDirectory,
  CliGenerateGithubWorkflowsRunWorkflowSuffix,
  CliGenerateGithubWorkflowsSlugifyWorkingDirInput,
  CliGenerateGithubWorkflowsSlugifyWorkingDirReturns,
  CliGenerateGithubWorkflowsSlugifyWorkingDirTrimmed,
  CliGenerateGithubWorkflowsSubstituteVariablesContent,
  CliGenerateGithubWorkflowsSubstituteVariablesRegex,
  CliGenerateGithubWorkflowsSubstituteVariablesReplacement,
  CliGenerateGithubWorkflowsSubstituteVariablesResolvedName,
  CliGenerateGithubWorkflowsSubstituteVariablesResult,
  CliGenerateGithubWorkflowsSubstituteVariablesReturns,
  CliGenerateGithubWorkflowsSubstituteVariablesSettings,
  CliGenerateGithubWorkflowsSubstituteVariablesSettingValue,
  CliGenerateGithubWorkflowsSubstituteVariablesVariableMeta,
  CliGenerateGithubWorkflowsSubstituteVariablesVariableName,
  CliGenerateGithubWorkflowsSubstituteVariablesVariables,
} from '../../../types/cli/generate/github/workflows.d.ts';

/**
 * CLI - Generate - GitHub - Workflows.
 *
 * Generates GitHub Actions workflow files from bundled
 * templates driven by nova.config.json. Validates output
 * YAML and displays required secrets and variables.
 *
 * @since 0.15.0
 */
export class CliGenerateGithubWorkflows {
  /**
   * CLI - Generate - GitHub - Workflows - Run.
   *
   * Called by the CLI index via executeCommand. Reads workflow entries
   * from nova.config.json, validates templates and settings, generates
   * output files, and cleans up orphaned workflow files.
   *
   * @param {CliGenerateGithubWorkflowsRunOptions} options - Options.
   *
   * @returns {CliGenerateGithubWorkflowsRunReturns}
   *
   * @since 0.15.0
   */
  public static async run(options: CliGenerateGithubWorkflowsRunOptions): CliGenerateGithubWorkflowsRunReturns {
    const currentDirectory: CliGenerateGithubWorkflowsRunCurrentDirectory = process.cwd();
    const isAtProjectRoot: CliGenerateGithubWorkflowsRunIsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: CliGenerateGithubWorkflowsRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliGenerateGithubWorkflowsRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliGenerateGithubWorkflows.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliGenerateGithubWorkflowsRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliGenerateGithubWorkflows.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    // Load config.
    const config: CliGenerateGithubWorkflowsRunConfig = await new LibNovaConfig().load();
    const workflows: CliGenerateGithubWorkflowsRunWorkflows = config['workflows'] as CliGenerateGithubWorkflowsRunWorkflows;

    if (workflows === undefined || workflows.length === 0) {
      Logger.customize({
        name: 'CliGenerateGithubWorkflows.run',
        purpose: 'skip',
      }).info('No workflows configured.');

      return 'completed';
    }

    const templateDirectory: CliGenerateGithubWorkflowsRunTemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/github/workflows');
    const workflowsDirectory: CliGenerateGithubWorkflowsRunWorkflowsDirectory = join(currentDirectory, '.github', 'workflows');

    // Validate unique template+suffix combinations.
    const duplicateSet: CliGenerateGithubWorkflowsRunDuplicateSet = new Set();
    let hasDuplicateError: CliGenerateGithubWorkflowsRunHasDuplicateError = false;

    for (const entry of workflows) {
      const duplicateKey: CliGenerateGithubWorkflowsRunDuplicateKey = (entry['suffix'] !== undefined) ? `${entry['template']}-${entry['suffix']}` : entry['template'];

      if (duplicateSet.has(duplicateKey) === true) {
        Logger.customize({
          name: 'CliGenerateGithubWorkflows.run',
          purpose: 'validate',
        }).error(`Duplicate workflow ${chalk.cyan(`"${duplicateKey}"`)}. Each template must have a unique suffix when used multiple times.`);

        hasDuplicateError = true;
      }

      duplicateSet.add(duplicateKey);
    }

    if (hasDuplicateError === true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    // Detect circular depends-on references.
    if (CliGenerateGithubWorkflows.detectCircularDependsOn(workflows) === true) {
      Logger.customize({
        name: 'CliGenerateGithubWorkflows.run',
        purpose: 'validate',
      }).error('Circular depends-on references detected. Aborting.');

      process.exitCode = 1;

      return 'cancelled';
    }

    const generatedSet: CliGenerateGithubWorkflowsRunGeneratedSet = new Set();
    const outputFileNames: CliGenerateGithubWorkflowsRunOutputFileNames = new Set();
    const setupLines: CliGenerateGithubWorkflowsRunSetupLines = [];

    for (const workflowEntry of workflows) {
      const entry: CliGenerateGithubWorkflowsRunWorkflowEntry = workflowEntry;
      const templateName: CliGenerateGithubWorkflowsRunTemplateName = entry['template'];

      // Validate template name against metadata.
      const metadataEntry: CliGenerateGithubWorkflowsRunMetadataEntry = libWorkflowTemplatesMetadata.find(
        (m) => m['name'] === templateName,
      );

      if (metadataEntry === undefined) {
        Logger.customize({
          name: 'CliGenerateGithubWorkflows.run',
          purpose: 'validate',
        }).error(`Unknown template ${chalk.cyan(`"${templateName}"`)}. Skipping.`);

        continue;
      }

      // Validate template directory exists.
      const templateDirPath: CliGenerateGithubWorkflowsRunTemplateDirPath = join(templateDirectory, templateName);
      const templateDirExists: CliGenerateGithubWorkflowsRunTemplateDirExists = await pathExists(templateDirPath);

      if (templateDirExists !== true) {
        Logger.customize({
          name: 'CliGenerateGithubWorkflows.run',
          purpose: 'validate',
        }).error(`Template directory ${chalk.cyan(`"${templateName}"`)} not found. Skipping.`);

        continue;
      }

      // Validate all literal variables are present in settings.
      const missingLiterals: CliGenerateGithubWorkflowsRunMissingLiterals = [];

      for (const variableEntry of Object.entries(metadataEntry['variables'])) {
        const variableName: CliGenerateGithubWorkflowsRunVariableName = variableEntry[0];
        const variableMeta: CliGenerateGithubWorkflowsRunVariableMeta = variableEntry[1];

        if (variableMeta['format'] === 'literal') {
          if (entry['settings'] === undefined || entry['settings'][variableName] === undefined) {
            missingLiterals.push(variableName);
          }
        }
      }

      if (missingLiterals.length > 0) {
        Logger.customize({
          name: 'CliGenerateGithubWorkflows.run',
          purpose: 'validate',
        }).error(`Template ${chalk.cyan(`"${templateName}"`)} is missing required literal settings: ${missingLiterals.join(', ')}. Skipping.`);

        continue;
      }

      // Build output filename.
      const workflowSuffix: CliGenerateGithubWorkflowsRunWorkflowSuffix = entry['suffix'];
      const outputFileName: CliGenerateGithubWorkflowsRunOutputFileName = (workflowSuffix !== undefined) ? `nova-${templateName}-${workflowSuffix}.yml` : `nova-${templateName}.yml`;

      // Check for duplicate output filenames.
      if (outputFileNames.has(outputFileName) === true) {
        Logger.customize({
          name: 'CliGenerateGithubWorkflows.run',
          purpose: 'validate',
        }).error(`Duplicate output filename ${chalk.cyan(`"${outputFileName}"`)}. Skipping.`);

        continue;
      }

      outputFileNames.add(outputFileName);

      // Read base template content.
      const basePath: CliGenerateGithubWorkflowsRunBasePath = join(templateDirPath, 'base.yml');
      let baseContent: CliGenerateGithubWorkflowsRunBaseContent = undefined;

      try {
        baseContent = await fs.readFile(basePath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'CliGenerateGithubWorkflows.run',
          purpose: 'read',
        }).error(`Failed to read base template ${chalk.cyan(`"${templateName}/base.yml"`)}. Skipping.`);

        continue;
      }

      // Determine if this template uses triggers.
      const hasTriggers: CliGenerateGithubWorkflowsRunHasTriggers = entry['triggers'].length > 0;

      let content: CliGenerateGithubWorkflowsRunContent = baseContent;

      // Process triggers if the template uses them.
      if (hasTriggers === true) {
        const triggers: CliGenerateGithubWorkflowsRunTriggers = entry['triggers'];

        // Validate trigger files exist and load them.
        let hasTriggerError: CliGenerateGithubWorkflowsRunHasTriggerError = false;
        const triggerDataList: CliGenerateGithubWorkflowsRunTriggerDataList = [];

        for (const trigger of triggers) {
          const triggerFileName: CliGenerateGithubWorkflowsRunTriggerFileName = `${trigger}.yml`;
          const triggerFilePath: CliGenerateGithubWorkflowsRunTriggerFilePath = join(templateDirPath, 'triggers', triggerFileName);
          const triggerFileExists: CliGenerateGithubWorkflowsRunTriggerFileExists = await pathExists(triggerFilePath);

          if (triggerFileExists !== true) {
            Logger.customize({
              name: 'CliGenerateGithubWorkflows.run',
              purpose: 'validate',
            }).error(`Trigger file ${chalk.cyan(`"${triggerFileName}"`)} not found for template ${chalk.cyan(`"${templateName}"`)}. Skipping workflow.`);

            hasTriggerError = true;

            break;
          }

          let triggerRawContent: CliGenerateGithubWorkflowsRunTriggerRawContent = '';

          try {
            triggerRawContent = await fs.readFile(triggerFilePath, 'utf-8');
          } catch {
            Logger.customize({
              name: 'CliGenerateGithubWorkflows.run',
              purpose: 'read',
            }).error(`Failed to read trigger file ${chalk.cyan(`"${triggerFileName}"`)}. Skipping workflow.`);

            hasTriggerError = true;

            break;
          }

          const triggerParsed: CliGenerateGithubWorkflowsRunTriggerParsed = parseYaml(triggerRawContent) as CliGenerateGithubWorkflowsRunTriggerParsed;
          const triggerParsedRunName: CliGenerateGithubWorkflowsRunTriggerParsedRunName = triggerParsed['run-name'] as CliGenerateGithubWorkflowsRunTriggerParsedRunName;
          const triggerParsedPublishCondition: CliGenerateGithubWorkflowsRunTriggerParsedPublishCondition = triggerParsed['publish-condition'] as CliGenerateGithubWorkflowsRunTriggerParsedPublishCondition;
          const triggerParsedTriggerBlock: CliGenerateGithubWorkflowsRunTriggerParsedTriggerBlock = triggerParsed['trigger'] as CliGenerateGithubWorkflowsRunTriggerParsedTriggerBlock;
          const triggerParsedDependsOn: CliGenerateGithubWorkflowsRunTriggerParsedDependsOn = triggerParsed['depends-on'] as CliGenerateGithubWorkflowsRunTriggerParsedDependsOn;
          const triggerParsedJobsCondition: CliGenerateGithubWorkflowsRunTriggerParsedJobsCondition = triggerParsed['jobs-condition'] as CliGenerateGithubWorkflowsRunTriggerParsedJobsCondition;

          const triggerData: CliGenerateGithubWorkflowsRunTriggerData = {
            runName: triggerParsedRunName,
            publishCondition: triggerParsedPublishCondition,
            triggerBlock: triggerParsedTriggerBlock,
            dependsOn: triggerParsedDependsOn,
            jobsCondition: triggerParsedJobsCondition,
          };

          triggerDataList.push(triggerData);
        }

        if (hasTriggerError === true) {
          continue;
        }

        // Validate depends-on requirements.
        const needsDependsOn: CliGenerateGithubWorkflowsRunNeedsDependsOn = triggerDataList.some(
          (triggerData) => triggerData['dependsOn'] === true,
        );

        if (needsDependsOn === true) {
          const dependsOnEntries: CliGenerateGithubWorkflowsRunDependsOnEntries = entry['depends-on'] ?? [];
          const entryLabel: CliGenerateGithubWorkflowsRunEntryLabel = (workflowSuffix !== undefined) ? `${templateName}-${workflowSuffix}` : templateName;

          if (dependsOnEntries.length === 0) {
            Logger.customize({
              name: 'CliGenerateGithubWorkflows.run',
              purpose: 'validate',
            }).error(`Workflow ${chalk.cyan(`"${entryLabel}"`)} uses a trigger that requires depends-on, but no depends-on value is configured. Skipping.`);

            continue;
          }

          // Resolve each depends-on entry to a workflow name.
          const dependsOnResolvedNames: CliGenerateGithubWorkflowsRunDependsOnResolvedNames = [];
          let hasDependsOnError: CliGenerateGithubWorkflowsRunHasDependsOnError = false;

          for (const dependsOnEntry of dependsOnEntries) {
            const entry2: CliGenerateGithubWorkflowsRunDependsOnEntry = dependsOnEntry;

            // Find the target workflow by matching template-suffix composite.
            const dependsOnTarget: CliGenerateGithubWorkflowsRunDependsOnTarget = workflows.find((w) => {
              const targetKey: CliGenerateGithubWorkflowsRunDependsOnTargetKey = (w['suffix'] !== undefined) ? `${w['template']}-${w['suffix']}` : w['template'];

              return targetKey === entry2;
            });

            if (dependsOnTarget === undefined) {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'validate',
              }).error(`Workflow ${chalk.cyan(`"${entryLabel}"`)} depends on ${chalk.cyan(`"${entry2}"`)} which does not exist. Skipping.`);

              hasDependsOnError = true;

              break;
            }

            // Resolve the depends-on workflow name from its base template.
            const dependsOnBasePath: CliGenerateGithubWorkflowsRunDependsOnBasePath = join(templateDirectory, dependsOnTarget['template'], 'base.yml');
            let dependsOnWorkflowName: CliGenerateGithubWorkflowsRunDependsOnWorkflowName = '';

            try {
              const dependsOnBaseContent: CliGenerateGithubWorkflowsRunDependsOnBaseContent = await fs.readFile(dependsOnBasePath, 'utf-8');
              const dependsOnNameMatch: CliGenerateGithubWorkflowsRunDependsOnNameMatch = new RegExp(LIB_REGEX_PATTERN_WORKFLOW_NAME.source, 'm').exec(dependsOnBaseContent);

              if (dependsOnNameMatch === null || dependsOnNameMatch[1] === undefined) {
                throw new Error('No name field found');
              }

              const targetSuffix: CliGenerateGithubWorkflowsRunDependsOnTargetSuffix = dependsOnTarget['suffix'];
              dependsOnWorkflowName = dependsOnNameMatch[1].replaceAll('[__WORKFLOW_ID__]', (targetSuffix !== undefined) ? ` (${targetSuffix})` : '');
            } catch {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'read',
              }).error(`Failed to resolve depends-on workflow name for ${chalk.cyan(`"${entry2}"`)}. Skipping.`);

              hasDependsOnError = true;

              break;
            }

            dependsOnResolvedNames.push(dependsOnWorkflowName);
          }

          if (hasDependsOnError === true) {
            continue;
          }

          // Build YAML array of resolved depends-on names.
          const dependsOnYamlArray: CliGenerateGithubWorkflowsRunDependsOnYamlArray = dependsOnResolvedNames.map(
            (name) => `"${name}"`,
          ).join(', ');

          // Replace [__DEPENDS_ON__] in trigger blocks.
          for (const triggerData of triggerDataList) {
            if (triggerData['dependsOn'] === true) {
              const triggerBlockString: CliGenerateGithubWorkflowsRunTriggerYaml = JSON.stringify(triggerData['triggerBlock']);
              const resolvedTriggerBlock: CliGenerateGithubWorkflowsRunTriggerParsed = JSON.parse(triggerBlockString.replaceAll('"[__DEPENDS_ON__]"', dependsOnYamlArray)) as CliGenerateGithubWorkflowsRunTriggerParsed;

              Reflect.set(triggerData, 'triggerBlock', resolvedTriggerBlock);
            }
          }
        }

        // Merge trigger blocks.
        const mergedTriggerBlock: CliGenerateGithubWorkflowsRunMergedTriggerBlock = {};

        for (const triggerData of triggerDataList) {
          for (const triggerEntry of Object.entries(triggerData['triggerBlock'])) {
            Reflect.set(mergedTriggerBlock, triggerEntry[0], triggerEntry[1]);
          }
        }

        // Serialize trigger block to YAML and indent with 2 spaces.
        const triggerYaml: CliGenerateGithubWorkflowsRunTriggerYaml = stringifyYaml(mergedTriggerBlock, {
          lineWidth: 0,
          defaultKeyType: 'PLAIN',
          defaultStringType: 'QUOTE_DOUBLE',
        });
        const indentedTriggerLines: CliGenerateGithubWorkflowsRunIndentedTriggerLines = triggerYaml.split('\n').map(
          (line) => (line.trim() === '') ? '' : `  ${line}`,
        );
        const indentedTriggerYaml: CliGenerateGithubWorkflowsRunIndentedTriggerYaml = indentedTriggerLines.join('\n').replace(LIB_REGEX_PATTERN_TRAILING_NEWLINES, '');

        // Build merged run-name.
        const needsManuallyFallback: CliGenerateGithubWorkflowsRunNeedsManuallyFallback = metadataEntry['needsManuallyFallback'] ?? true;
        const mergedRunName: CliGenerateGithubWorkflowsRunMergedRunName = CliGenerateGithubWorkflows.buildMergedRunName(triggerDataList, needsManuallyFallback);

        // Build merged publish condition.
        const mergedPublishCondition: CliGenerateGithubWorkflowsRunMergedPublishCondition = CliGenerateGithubWorkflows.buildMergedPublishCondition(triggerDataList);

        // Build merged jobs condition.
        const mergedJobsCondition: CliGenerateGithubWorkflowsRunMergedJobsCondition = CliGenerateGithubWorkflows.buildMergedJobsCondition(triggerDataList);
        const jobsConditionLine: CliGenerateGithubWorkflowsRunJobsConditionLine = (mergedJobsCondition !== '') ? `    if: "${mergedJobsCondition}"\n` : '';

        // Replace placeholders.
        content = content.replace('[__RUN_NAME__]', mergedRunName);
        content = content.replace('[__TRIGGERS__]', indentedTriggerYaml);
        content = content.replace('[__PUBLISH_CONDITION__]', mergedPublishCondition);
        content = content.replace('[__JOBS_CONDITION__]\n', jobsConditionLine);

        // Compose publish-template-specific placeholders (scopes, targets, artifacts).
        const supportsScopes: CliGenerateGithubWorkflowsRunSupportsScopes = metadataEntry['supportsScopes'];
        const supportsTargets: CliGenerateGithubWorkflowsRunSupportsTargets = metadataEntry['supportsTargets'];
        const entryScopes: CliGenerateGithubWorkflowsRunEntryScopes = entry['scopes'] ?? [];
        const entryTargets: CliGenerateGithubWorkflowsRunEntryTargets = entry['targets'] ?? [];

        // Validate scope/target configuration against template capabilities.
        let hasPublishValidationError: CliGenerateGithubWorkflowsRunHasPublishValidationError = false;

        if (supportsTargets !== true && entryTargets.length > 0) {
          Logger.customize({
            name: 'CliGenerateGithubWorkflows.run',
            purpose: 'validate',
          }).error(`Template ${chalk.cyan(`"${templateName}"`)} does not support targets but the workflow entry declares targets. Skipping.`);

          hasPublishValidationError = true;
        }

        if (supportsScopes !== true && entryScopes.length > 0) {
          Logger.customize({
            name: 'CliGenerateGithubWorkflows.run',
            purpose: 'validate',
          }).error(`Template ${chalk.cyan(`"${templateName}"`)} does not support scopes but the workflow entry declares scopes. Skipping.`);

          hasPublishValidationError = true;
        }

        if (hasPublishValidationError === true) {
          continue;
        }

        const configWorkspaces: CliGenerateGithubWorkflowsResolveWorkspaceNameWorkspaces = (config['workspaces'] ?? {}) as CliGenerateGithubWorkflowsResolveWorkspaceNameWorkspaces;
        const targetsMetadata: CliGenerateGithubWorkflowsRunTargetsMetadata = metadataEntry['targets'] ?? {};

        // Validate targets when the template supports them.
        if (supportsTargets === true && entryTargets.length > 0) {
          const targetTupleSet: CliGenerateGithubWorkflowsRunTargetTupleSet = new Set();

          for (const entryTarget of entryTargets) {
            const targetType: CliGenerateGithubWorkflowsRunTargetType = entryTarget['type'];
            const targetWorkingDir: CliGenerateGithubWorkflowsRunTargetWorkingDir = entryTarget['workingDir'];

            if (targetsMetadata[targetType] === undefined) {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'validate',
              }).error(`Target type ${chalk.cyan(`"${targetType}"`)} is not supported by template ${chalk.cyan(`"${templateName}"`)}. Skipping.`);

              hasPublishValidationError = true;

              break;
            }

            const targetTupleKey: CliGenerateGithubWorkflowsRunTargetTupleKey = `${targetType}::${targetWorkingDir}`;

            if (targetTupleSet.has(targetTupleKey) === true) {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'validate',
              }).error(`Duplicate target ${chalk.cyan(`"${targetType}"`)} at ${chalk.cyan(`"${targetWorkingDir}"`)}. Each target type and working directory pair must be unique. Skipping.`);

              hasPublishValidationError = true;

              break;
            }

            targetTupleSet.add(targetTupleKey);

            if (configWorkspaces[targetWorkingDir] === undefined) {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'validate',
              }).error(`Target working directory ${chalk.cyan(`"${targetWorkingDir}"`)} is not a registered workspace. Skipping.`);

              hasPublishValidationError = true;

              break;
            }
          }
        }

        if (hasPublishValidationError === true) {
          continue;
        }

        // Validate scopes and resolve to workspace names when the template supports them.
        const resolvedWorkspaceNames: CliGenerateGithubWorkflowsRunResolvedWorkspaceNames = [];

        if (supportsScopes === true && entryScopes.length > 0) {
          for (const entryScope of entryScopes) {
            const scopePath: CliGenerateGithubWorkflowsRunEntryScope = entryScope;
            const resolvedWorkspaceName: CliGenerateGithubWorkflowsResolveWorkspaceNameReturns = CliGenerateGithubWorkflows.resolveWorkspaceName(configWorkspaces, scopePath);

            if (resolvedWorkspaceName === undefined) {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'validate',
              }).error(`Scope ${chalk.cyan(`"${scopePath}"`)} is not a registered workspace. Skipping.`);

              hasPublishValidationError = true;

              break;
            }

            const resolvedName: CliGenerateGithubWorkflowsRunResolvedWorkspaceName = resolvedWorkspaceName;

            resolvedWorkspaceNames.push(resolvedName);
          }
        }

        if (hasPublishValidationError === true) {
          continue;
        }

        // Compose publish-specific placeholders when the template supports targets.
        if (supportsTargets === true) {
          // Build check and build commands.
          const useTurbo: CliGenerateGithubWorkflowsRunUseTurbo = await CliGenerateGithubWorkflows.detectTurbo(currentDirectory);
          const checkCommand: CliGenerateGithubWorkflowsRunCheckCommand = CliGenerateGithubWorkflows.buildCommand('check', resolvedWorkspaceNames, useTurbo);
          const buildCommand: CliGenerateGithubWorkflowsRunBuildCommand = CliGenerateGithubWorkflows.buildCommand('build', resolvedWorkspaceNames, useTurbo);

          content = content.replace('[__CHECK_COMMAND__]', checkCommand);
          content = content.replace('[__BUILD_COMMAND__]', buildCommand);

          // Build per-target upload-artifact steps when targets produce artifact paths.
          const uploadArtifactStep: CliGenerateGithubWorkflowsRunUploadArtifactStep = CliGenerateGithubWorkflows.renderUploadArtifactSteps(entryTargets, targetsMetadata);

          content = content.replace('[__UPLOAD_ARTIFACT_STEP__]', uploadArtifactStep);

          // Compose target fragments into merged jobs map.
          const resolvedTargetFragments: CliGenerateGithubWorkflowsRunResolvedTargetFragments = [];
          let hasTargetFragmentError: CliGenerateGithubWorkflowsRunHasPublishValidationError = false;

          for (const entryTarget of entryTargets) {
            const currentEntryTarget: CliGenerateGithubWorkflowsRunEntryTarget = entryTarget;
            const targetType: CliGenerateGithubWorkflowsRunTargetType = currentEntryTarget['type'];
            const targetWorkingDir: CliGenerateGithubWorkflowsRunTargetWorkingDir = currentEntryTarget['workingDir'];
            const targetFragmentPath: CliGenerateGithubWorkflowsRunTargetFragmentPath = join(templateDirPath, 'targets', `${targetType}.yml`);
            const targetFragmentExists: CliGenerateGithubWorkflowsRunTargetFragmentExists = await pathExists(targetFragmentPath);

            if (targetFragmentExists !== true) {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'validate',
              }).error(`Target fragment ${chalk.cyan(`"${targetType}.yml"`)} not found for template ${chalk.cyan(`"${templateName}"`)}. Skipping.`);

              hasTargetFragmentError = true;

              break;
            }

            let targetFragmentRawContent: CliGenerateGithubWorkflowsRunTargetFragmentRawContent = '';

            try {
              targetFragmentRawContent = await fs.readFile(targetFragmentPath, 'utf-8');
            } catch {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'read',
              }).error(`Failed to read target fragment ${chalk.cyan(`"${targetType}.yml"`)}. Skipping.`);

              hasTargetFragmentError = true;

              break;
            }

            // Substitute target-specific placeholders before YAML parsing.
            const targetId: CliGenerateGithubWorkflowsRunTargetId = CliGenerateGithubWorkflows.slugifyWorkingDir(targetWorkingDir);
            let targetFragmentResolvedContent: CliGenerateGithubWorkflowsRunTargetFragmentResolvedContent = targetFragmentRawContent;

            targetFragmentResolvedContent = targetFragmentResolvedContent.replaceAll('[__TARGET_ID__]', targetId);
            targetFragmentResolvedContent = targetFragmentResolvedContent.replaceAll('[__WORKING_DIR__]', targetWorkingDir);

            const artifactName: CliGenerateGithubWorkflowsRunArtifactName = CliGenerateGithubWorkflows.buildArtifactName(targetType, targetId);

            targetFragmentResolvedContent = targetFragmentResolvedContent.replaceAll('[__ARTIFACT_NAME__]', artifactName);

            // Build the needs list. Always starts with "build"; same-type target
            // workingDirs declared in `needs` are appended as job ids so the generated
            // workflow serializes nova → preset, etc.
            const targetNeeds: CliGenerateGithubWorkflowsRunTargetNeeds = currentEntryTarget['needs'] ?? [];
            const targetNeedsJobIds: CliGenerateGithubWorkflowsRunTargetNeedsJobIds = targetNeeds.map(
              (targetNeedWorkingDir: CliGenerateGithubWorkflowsRunTargetNeedWorkingDir) => `publish-${targetType}-${CliGenerateGithubWorkflows.slugifyWorkingDir(targetNeedWorkingDir)}`,
            );
            const targetNeedsValue: CliGenerateGithubWorkflowsRunTargetNeedsValue = (targetNeedsJobIds.length === 0) ? '"build"' : `["build", ${targetNeedsJobIds.map((targetNeedsJobId: CliGenerateGithubWorkflowsRunTargetNeedsJobId) => `"${targetNeedsJobId}"`).join(', ')}]`;

            targetFragmentResolvedContent = targetFragmentResolvedContent.replace('[__NEEDS__]', targetNeedsValue);

            // Apply jobs-condition replacement at job-key-child indent (2 spaces).
            const targetJobsConditionLine: CliGenerateGithubWorkflowsRunTargetJobsConditionLine = (mergedJobsCondition !== '') ? `  if: "${mergedJobsCondition}"\n` : '';

            targetFragmentResolvedContent = targetFragmentResolvedContent.replace('[__JOBS_CONDITION__]\n', targetJobsConditionLine);

            // Resolve target-specific variables by merging template-level + target-level.
            const targetMetadata: CliGenerateGithubWorkflowsRunTargetMetadata = targetsMetadata[targetType];
            const mergedVariables: CliGenerateGithubWorkflowsRunMergedVariables = {
              ...metadataEntry['variables'],
              ...(targetMetadata !== undefined) ? targetMetadata['variables'] : {},
            };

            targetFragmentResolvedContent = CliGenerateGithubWorkflows.substituteVariables(
              targetFragmentResolvedContent,
              mergedVariables,
              entry['settings'],
            );

            // Validate fragment parses; discard result. We inject text, not parsed objects.
            try {
              parseYaml(targetFragmentResolvedContent);
            } catch {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'validate',
              }).error(`Target fragment ${chalk.cyan(`"${targetType}.yml"`)} produced invalid YAML. Skipping.`);

              hasTargetFragmentError = true;

              break;
            }

            // Indent every line by 2 spaces so the top-level job key sits under `jobs:`.
            const indentedLines: CliGenerateGithubWorkflowsRunIndentedFragmentLines = targetFragmentResolvedContent.split('\n').map(
              (line) => (line === '') ? '' : `  ${line}`,
            );
            const indentedFragment: CliGenerateGithubWorkflowsRunIndentedFragment = indentedLines.join('\n');

            resolvedTargetFragments.push(indentedFragment);
          }

          if (hasTargetFragmentError === true) {
            continue;
          }

          // Append target fragments directly to the base content (text-based injection
          // preserves multi-line block literals, unlike YAML re-serialization).
          if (resolvedTargetFragments.length > 0) {
            const appendedFragments: CliGenerateGithubWorkflowsRunAppendedFragments = resolvedTargetFragments.join('\n');

            content = [
              content.replace(LIB_REGEX_PATTERN_TRAILING_NEWLINES_OR_NONE, ''),
              '',
              appendedFragments,
            ].join('\n');

            // Validate final content parses.
            try {
              parseYaml(content);
            } catch {
              Logger.customize({
                name: 'CliGenerateGithubWorkflows.run',
                purpose: 'validate',
              }).error(`Base template for ${chalk.cyan(`"${templateName}"`)} produced invalid YAML after target injection. Skipping.`);

              continue;
            }
          }
        }
      }

      // Replace workflow ID placeholder (suffix in parentheses, or empty string).
      content = content.replaceAll('[__WORKFLOW_ID__]', (workflowSuffix !== undefined) ? ` (${workflowSuffix})` : '');

      // Substitute variables.
      const substituted: CliGenerateGithubWorkflowsRunSubstituted = CliGenerateGithubWorkflows.substituteVariables(
        content,
        metadataEntry['variables'],
        entry['settings'],
      );

      // Validate output YAML.
      try {
        parseYaml(substituted);
      } catch {
        Logger.customize({
          name: 'CliGenerateGithubWorkflows.run',
          purpose: 'validate',
        }).error(`Generated YAML for ${chalk.cyan(`"${outputFileName}"`)} is invalid. Skipping.`);

        continue;
      }

      generatedSet.add(outputFileName);

      // Build setup instructions for non-auto secrets and vars (template + targets).
      const entrySetupLines: CliGenerateGithubWorkflowsRunEntrySetupLines = CliGenerateGithubWorkflows.buildEntrySetupLines(entry, metadataEntry, outputFileName);

      setupLines.push(...entrySetupLines);

      if (isDryRun === true) {
        const displayPath: CliGenerateGithubWorkflowsRunDisplayPath = `.github/workflows/${outputFileName}`;

        Logger.customize({
          name: 'CliGenerateGithubWorkflows.run',
          purpose: 'dry-run',
        }).info(`Would generate ${chalk.cyan(`"${displayPath}"`)}.`);

        continue;
      }

      const targetPath: CliGenerateGithubWorkflowsRunTargetPath = join(workflowsDirectory, outputFileName);

      await saveGeneratedFile(targetPath, substituted, isReplaceFile, {
        command: 'nova generate github workflows',
        docsSlug: 'cli/generators/github/workflows',
        mode: 'strict',
      });
    }

    // Clean up orphans.
    if (isDryRun !== true && await pathExists(workflowsDirectory) === true) {
      let existingEntries: CliGenerateGithubWorkflowsRunExistingEntries = [];

      try {
        existingEntries = await fs.readdir(workflowsDirectory, { withFileTypes: true });
      } catch {
        /* empty */
      }

      for (const existingEntry of existingEntries) {
        const entry: CliGenerateGithubWorkflowsRunExistingEntry = existingEntry;

        if (entry.isFile() !== true) {
          continue;
        }

        const isOrphan: CliGenerateGithubWorkflowsRunIsOrphan = entry.name.startsWith('nova-') === true
          && entry.name.endsWith('.yml') === true
          && generatedSet.has(entry.name) === false;
        const isBackup: CliGenerateGithubWorkflowsRunIsBackup = entry.name.includes('.nova-backup.') === true;

        if (isOrphan !== true || isBackup === true) {
          continue;
        }

        const orphanPath: CliGenerateGithubWorkflowsRunOrphanPath = join(workflowsDirectory, entry.name);

        if (isReplaceFile === true) {
          await fs.unlink(orphanPath);

          Logger.customize({
            name: 'CliGenerateGithubWorkflows.run',
            purpose: 'cleanup',
          }).info(`Deleted orphan ${chalk.cyan(`"${entry.name}"`)}.`);
        } else {
          await renameFileWithDate(orphanPath);

          Logger.customize({
            name: 'CliGenerateGithubWorkflows.run',
            purpose: 'cleanup',
          }).info(`Backed up orphan ${chalk.cyan(`"${entry.name}"`)}.`);
        }
      }
    }

    // Print setup instructions.
    if (setupLines.length > 0) {
      const setupMessage: CliGenerateGithubWorkflowsRunSetupMessage = [
        'Setup:',
        setupLines.join('\n'),
      ].join('\n');

      Logger.customize({
        name: 'CliGenerateGithubWorkflows.run',
        purpose: 'setup',
        padTop: 1,
      }).info(setupMessage);
    }

    return 'completed';
  }

  /**
   * CLI - Generate - GitHub - Workflows - Build Merged Run Name.
   *
   * Extracts context expressions from each trigger's run-name, deduplicates
   * them, and reconstructs a single run-name. Appends a `'manually'` fallback
   * when the template opts in and no empty-string fallback is already present.
   *
   * @param {CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataList}        triggerDataList        - Trigger data list.
   * @param {CliGenerateGithubWorkflowsBuildMergedRunNameNeedsManuallyFallback}  needsManuallyFallback  - Needs manually fallback.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsBuildMergedRunNameReturns}
   *
   * @since 0.21.0
   */
  private static buildMergedRunName(triggerDataList: CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataList, needsManuallyFallback: CliGenerateGithubWorkflowsBuildMergedRunNameNeedsManuallyFallback): CliGenerateGithubWorkflowsBuildMergedRunNameReturns {
    const contextExpressions: CliGenerateGithubWorkflowsBuildMergedRunNameContextExpressions = [];

    // Extract context expressions from each trigger's run-name.
    for (const triggerData of triggerDataList) {
      const contextMatch: CliGenerateGithubWorkflowsBuildMergedRunNameContextMatch = triggerData['runName'].match(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_EXPRESSION);

      if (contextMatch === null) {
        continue;
      }

      const contextInner: CliGenerateGithubWorkflowsBuildMergedRunNameContextInner = contextMatch[1] ?? '';
      const contextParts: CliGenerateGithubWorkflowsBuildMergedRunNameContextParts = contextInner.split('||').map(
        (part) => part.trim(),
      );

      // Collect non-'manually' expressions.
      for (const part of contextParts) {
        if (part === '\'manually\'' || contextExpressions.includes(part) === true) {
          continue;
        }

        contextExpressions.push(part);
      }
    }

    // Extract the run-name prefix and suffix from the first trigger.
    const runNameMatch: CliGenerateGithubWorkflowsBuildMergedRunNameRunNameMatch = (triggerDataList[0] ?? { runName: '' })['runName'].match(LIB_REGEX_PATTERN_WORKFLOW_RUN_NAME_CAPTURE);
    const runNamePrefix: CliGenerateGithubWorkflowsBuildMergedRunNameRunNamePrefix = (runNameMatch !== null && runNameMatch[1] !== undefined) ? runNameMatch[1] : '';
    const runNameSuffix: CliGenerateGithubWorkflowsBuildMergedRunNameRunNameSuffix = (runNameMatch !== null && runNameMatch[2] !== undefined) ? runNameMatch[2] : '';

    // Reconstruct the merged run-name. Skip the 'manually' fallback when the
    // template opts out via metadata, or when a trigger already supplies an
    // empty-string fallback (appending would wrongly produce "manually" for
    // events like schedule where the earlier expression evaluates to '').
    const hasEmptyFallback: CliGenerateGithubWorkflowsBuildMergedRunNameHasEmptyFallback = contextExpressions.includes('\'\'') || contextExpressions.includes('""');
    const shouldAppendFallback: CliGenerateGithubWorkflowsBuildMergedRunNameShouldAppendFallback = needsManuallyFallback === true && hasEmptyFallback === false;
    const contextExpressionsWithFallback: CliGenerateGithubWorkflowsBuildMergedRunNameContextExpressions = (shouldAppendFallback === true) ? [
      ...contextExpressions,
      '\'manually\'',
    ] : contextExpressions;
    const mergedContextExpression: CliGenerateGithubWorkflowsBuildMergedRunNameMergedContextExpression = contextExpressionsWithFallback.join(' || ');

    return `${runNamePrefix}\${{ ${mergedContextExpression} }}${runNameSuffix}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Build Merged Publish Condition.
   *
   * Combines publish conditions from multiple triggers into a single
   * expression with OR logic, preserving the workflow_dispatch fallback.
   *
   * @param {CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataList} triggerDataList - Trigger data list.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsBuildMergedPublishConditionReturns}
   *
   * @since 0.21.0
   */
  private static buildMergedPublishCondition(triggerDataList: CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataList): CliGenerateGithubWorkflowsBuildMergedPublishConditionReturns {
    const nonDispatchParts: CliGenerateGithubWorkflowsBuildMergedPublishConditionNonDispatchParts = [];
    let dispatchPart: CliGenerateGithubWorkflowsBuildMergedPublishConditionDispatchPart = '';

    for (const triggerData of triggerDataList) {
      // Strip the ${{ and }} wrapper.
      const publishInner: CliGenerateGithubWorkflowsBuildMergedPublishConditionPublishInner = triggerData['publishCondition'].replace(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_START, '').replace(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_END, '');

      // Split on top-level ||.
      const publishParts: CliGenerateGithubWorkflowsBuildMergedPublishConditionPublishParts = publishInner.split(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_SEPARATOR);

      for (const part of publishParts) {
        // Identify the workflow_dispatch part.
        if (part.includes('workflow_dispatch') === true) {
          if (dispatchPart === '') {
            dispatchPart = part;
          }

          continue;
        }

        if (nonDispatchParts.includes(part) === false) {
          nonDispatchParts.push(part);
        }
      }
    }

    // Combine: non-dispatch parts || dispatch part.
    const allParts: CliGenerateGithubWorkflowsBuildMergedPublishConditionPublishParts = [...nonDispatchParts];

    if (dispatchPart !== '') {
      allParts.push(dispatchPart);
    }

    return `\${{ ${allParts.join(' || ')} }}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Build Merged Jobs Condition.
   *
   * Composes a jobs-level if condition when any trigger defines one.
   * Non-workflow-run events pass through unconditionally.
   *
   * @param {CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataList} triggerDataList - Trigger data list.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsBuildMergedJobsConditionReturns}
   *
   * @since 0.21.0
   */
  private static buildMergedJobsCondition(triggerDataList: CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataList): CliGenerateGithubWorkflowsBuildMergedJobsConditionReturns {
    // Find the first trigger with a jobs-condition.
    for (const triggerData of triggerDataList) {
      if (triggerData['jobsCondition'] !== undefined) {
        // Strip the ${{ and }} wrapper.
        const jobsConditionLine: CliGenerateGithubWorkflowsBuildMergedJobsConditionJobsConditionLine = triggerData['jobsCondition'].replace(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_START, '').replace(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_END, '');

        return `\${{ ${jobsConditionLine} }}`;
      }
    }

    return '';
  }

  /**
   * CLI - Generate - GitHub - Workflows - Detect Circular Depends On.
   *
   * Walks the depends-on chain for each workflow entry and returns
   * true if any circular reference is detected.
   *
   * @param {CliGenerateGithubWorkflowsDetectCircularDependsOnWorkflows} workflows - Workflows.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsDetectCircularDependsOnReturns}
   *
   * @since 0.21.0
   */
  private static detectCircularDependsOn(workflows: CliGenerateGithubWorkflowsDetectCircularDependsOnWorkflows): CliGenerateGithubWorkflowsDetectCircularDependsOnReturns {
    for (const entry of workflows) {
      if (entry['depends-on'] === undefined || entry['depends-on'].length === 0) {
        continue;
      }

      const entryKey: CliGenerateGithubWorkflowsDetectCircularDependsOnEntryKey = (entry['suffix'] !== undefined) ? `${entry['template']}-${entry['suffix']}` : entry['template'];
      const visited: CliGenerateGithubWorkflowsDetectCircularDependsOnVisited = new Set();

      visited.add(entryKey);

      const queue: CliGenerateGithubWorkflowsDetectCircularDependsOnQueue = [...entry['depends-on']];

      while (queue.length > 0) {
        const currentId: CliGenerateGithubWorkflowsDetectCircularDependsOnCurrentId = queue.shift()!;

        if (visited.has(currentId) === true) {
          return true;
        }

        visited.add(currentId);

        const currentEntry: CliGenerateGithubWorkflowsDetectCircularDependsOnCurrentEntry = workflows.find((w) => {
          const key: CliGenerateGithubWorkflowsDetectCircularDependsOnKey = (w['suffix'] !== undefined) ? `${w['template']}-${w['suffix']}` : w['template'];

          return key === currentId;
        });

        if (currentEntry !== undefined && currentEntry['depends-on'] !== undefined) {
          for (const dep of currentEntry['depends-on']) {
            queue.push(dep);
          }
        }
      }
    }

    return false;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Build Entry Setup Lines.
   *
   * Walks template-level variables and each target's variables for a
   * workflow entry, returning setup lines for non-auto secrets and vars.
   *
   * @param {CliGenerateGithubWorkflowsBuildEntrySetupLinesEntry}          entry          - Entry.
   * @param {CliGenerateGithubWorkflowsBuildEntrySetupLinesMetadataEntry}  metadataEntry  - Metadata entry.
   * @param {CliGenerateGithubWorkflowsBuildEntrySetupLinesOutputFileName} outputFileName - Output file name.
   *
   * @returns {CliGenerateGithubWorkflowsBuildEntrySetupLinesReturns}
   *
   * @since 0.16.2
   */
  public static buildEntrySetupLines(entry: CliGenerateGithubWorkflowsBuildEntrySetupLinesEntry, metadataEntry: CliGenerateGithubWorkflowsBuildEntrySetupLinesMetadataEntry, outputFileName: CliGenerateGithubWorkflowsBuildEntrySetupLinesOutputFileName): CliGenerateGithubWorkflowsBuildEntrySetupLinesReturns {
    const lines: CliGenerateGithubWorkflowsBuildEntrySetupLinesLines = [];

    if (metadataEntry === undefined) {
      return lines;
    }

    // Template-level non-auto secrets and vars.
    for (const variableEntry of Object.entries(metadataEntry['variables'])) {
      const variableName: CliGenerateGithubWorkflowsRunVariableName = variableEntry[0];
      const variableMeta: CliGenerateGithubWorkflowsRunVariableMeta = variableEntry[1];

      if (variableMeta['auto'] === true) {
        continue;
      }

      if (variableMeta['format'] === 'secret') {
        const resolvedName: CliGenerateGithubWorkflowsRunResolvedName = (entry['settings'] !== undefined && entry['settings'][variableName] !== undefined) ? entry['settings'][variableName] : (variableMeta['default'] ?? variableName);

        lines.push(` - ${chalk.cyan(outputFileName)}: Secret ${chalk.yellow(resolvedName)}`);
      }

      if (variableMeta['format'] === 'var') {
        const resolvedName: CliGenerateGithubWorkflowsRunResolvedName = (entry['settings'] !== undefined && entry['settings'][variableName] !== undefined) ? entry['settings'][variableName] : (variableMeta['default'] ?? variableName);

        lines.push(` - ${chalk.cyan(outputFileName)}: Variable ${chalk.yellow(resolvedName)}`);
      }
    }

    // Target-level non-auto secrets and vars (for templates with targets).
    if (entry['targets'] !== undefined && metadataEntry['targets'] !== undefined) {
      const entryTargetsMetadata: CliGenerateGithubWorkflowsRunTargetsMetadata = metadataEntry['targets'];

      for (const setupTarget of entry['targets']) {
        const setupTargetType: CliGenerateGithubWorkflowsRunTargetType = setupTarget['type'];
        const setupTargetMetadata: CliGenerateGithubWorkflowsRunTargetMetadata = entryTargetsMetadata[setupTargetType];

        if (setupTargetMetadata === undefined) {
          continue;
        }

        for (const targetVariableEntry of Object.entries(setupTargetMetadata['variables'])) {
          const targetVariableName: CliGenerateGithubWorkflowsRunVariableName = targetVariableEntry[0];
          const targetVariableMeta: CliGenerateGithubWorkflowsRunVariableMeta = targetVariableEntry[1];

          if (targetVariableMeta['auto'] === true) {
            continue;
          }

          if (targetVariableMeta['format'] === 'secret') {
            const targetResolvedName: CliGenerateGithubWorkflowsRunResolvedName = (entry['settings'] !== undefined && entry['settings'][targetVariableName] !== undefined) ? entry['settings'][targetVariableName] : (targetVariableMeta['default'] ?? targetVariableName);

            lines.push(` - ${chalk.cyan(outputFileName)}: Secret ${chalk.yellow(targetResolvedName)}`);
          }

          if (targetVariableMeta['format'] === 'var') {
            const targetResolvedName: CliGenerateGithubWorkflowsRunResolvedName = (entry['settings'] !== undefined && entry['settings'][targetVariableName] !== undefined) ? entry['settings'][targetVariableName] : (targetVariableMeta['default'] ?? targetVariableName);

            lines.push(` - ${chalk.cyan(outputFileName)}: Variable ${chalk.yellow(targetResolvedName)}`);
          }
        }
      }
    }

    return lines;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Substitute Variables.
   *
   * Replaces `${{ secrets.X }}` and `${{ vars.X }}` expressions in the
   * template content based on variable metadata and user settings.
   *
   * @param {CliGenerateGithubWorkflowsSubstituteVariablesContent}   content   - Content.
   * @param {CliGenerateGithubWorkflowsSubstituteVariablesVariables} variables - Variables.
   * @param {CliGenerateGithubWorkflowsSubstituteVariablesSettings}  settings  - Settings.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsSubstituteVariablesReturns}
   *
   * @since 0.20.0
   */
  private static substituteVariables(content: CliGenerateGithubWorkflowsSubstituteVariablesContent, variables: CliGenerateGithubWorkflowsSubstituteVariablesVariables, settings: CliGenerateGithubWorkflowsSubstituteVariablesSettings): CliGenerateGithubWorkflowsSubstituteVariablesReturns {
    let result: CliGenerateGithubWorkflowsSubstituteVariablesResult = content;

    for (const variableEntry of Object.entries(variables)) {
      const variableName: CliGenerateGithubWorkflowsSubstituteVariablesVariableName = variableEntry[0];
      const variableMeta: CliGenerateGithubWorkflowsSubstituteVariablesVariableMeta = variableEntry[1];

      const regex: CliGenerateGithubWorkflowsSubstituteVariablesRegex = new RegExp(`\\$\\{\\{\\s*(?:secrets|vars)\\.${variableName}\\s*\\}\\}`, 'g');
      const settingValue: CliGenerateGithubWorkflowsSubstituteVariablesSettingValue = (settings !== undefined && settings[variableName] !== undefined) ? settings[variableName] : undefined;

      if (variableMeta['format'] === 'secret') {
        const resolvedName: CliGenerateGithubWorkflowsSubstituteVariablesResolvedName = settingValue
          ?? variableMeta['default']
          ?? variableName;
        const replacement: CliGenerateGithubWorkflowsSubstituteVariablesReplacement = `\${{ secrets.${resolvedName} }}`;

        result = result.replace(regex, replacement);
      }

      if (variableMeta['format'] === 'var') {
        const resolvedName: CliGenerateGithubWorkflowsSubstituteVariablesResolvedName = settingValue
          ?? variableMeta['default']
          ?? variableName;
        const replacement: CliGenerateGithubWorkflowsSubstituteVariablesReplacement = `\${{ vars.${resolvedName} }}`;

        result = result.replace(regex, replacement);
      }

      if (variableMeta['format'] === 'literal') {
        const replacement: CliGenerateGithubWorkflowsSubstituteVariablesReplacement = (settingValue ?? '').replaceAll('\n', '\\n');

        result = result.replace(regex, replacement);
      }
    }

    return result;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Build Artifact Name.
   *
   * Composes the per-target artifact name from the build- prefix, the
   * target type, and the slugified working dir (already computed elsewhere).
   *
   * @param {CliGenerateGithubWorkflowsBuildArtifactNameTargetType} targetType - Target type.
   * @param {CliGenerateGithubWorkflowsBuildArtifactNameTargetId}   targetId   - Target id.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsBuildArtifactNameReturns}
   *
   * @since 0.16.3
   */
  public static buildArtifactName(targetType: CliGenerateGithubWorkflowsBuildArtifactNameTargetType, targetId: CliGenerateGithubWorkflowsBuildArtifactNameTargetId): CliGenerateGithubWorkflowsBuildArtifactNameReturns {
    return `build-${targetType}-${targetId}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Slugify Working Dir.
   *
   * Strips the leading `./` prefix and trailing `/` suffix from a workspace
   * path, then replaces remaining `/` separators with `-` to produce a slug
   * safe for GitHub Actions job names. Returns `"root"` for empty strings.
   *
   * @param {CliGenerateGithubWorkflowsSlugifyWorkingDirInput} input - Input.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsSlugifyWorkingDirReturns}
   *
   * @since 0.16.0
   */
  public static slugifyWorkingDir(input: CliGenerateGithubWorkflowsSlugifyWorkingDirInput): CliGenerateGithubWorkflowsSlugifyWorkingDirReturns {
    const trimmed: CliGenerateGithubWorkflowsSlugifyWorkingDirTrimmed = input
      .replace(LIB_REGEX_PATTERN_LEADING_DOT_SLASH, '')
      .replace(LIB_REGEX_PATTERN_TRAILING_SLASH, '');

    if (trimmed === '') {
      return 'root';
    }

    return trimmed.replaceAll('/', '-');
  }

  /**
   * CLI - Generate - GitHub - Workflows - Resolve Workspace Name.
   *
   * Looks up a workspace path key in the provided workspaces map and returns
   * the workspace's `name` field. Returns `undefined` when the path is not
   * found in the map or when the matched entry does not define a name.
   *
   * @param {CliGenerateGithubWorkflowsResolveWorkspaceNameWorkspaces} workspaces - Workspaces.
   * @param {CliGenerateGithubWorkflowsResolveWorkspaceNamePath}       path       - Path.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsResolveWorkspaceNameReturns}
   *
   * @since 0.16.0
   */
  public static resolveWorkspaceName(workspaces: CliGenerateGithubWorkflowsResolveWorkspaceNameWorkspaces, path: CliGenerateGithubWorkflowsResolveWorkspaceNamePath): CliGenerateGithubWorkflowsResolveWorkspaceNameReturns {
    const entry: CliGenerateGithubWorkflowsResolveWorkspaceNameEntry = workspaces[path];

    if (entry === undefined) {
      return undefined;
    }

    return entry['name'];
  }

  /**
   * CLI - Generate - GitHub - Workflows - Detect Turbo.
   *
   * Checks whether a `turbo.json` file exists at the given project directory.
   * Returns `true` when the file is present, `false` otherwise. Used to
   * decide whether to emit turbo filter flags or npm `-w` workspace flags.
   *
   * @param {CliGenerateGithubWorkflowsDetectTurboProjectDirectory} projectDirectory - Project directory.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsDetectTurboReturns}
   *
   * @since 0.16.0
   */
  public static async detectTurbo(projectDirectory: CliGenerateGithubWorkflowsDetectTurboProjectDirectory): CliGenerateGithubWorkflowsDetectTurboReturns {
    const turboConfigPath: CliGenerateGithubWorkflowsDetectTurboTurboConfigPath = join(projectDirectory, 'turbo.json');

    return pathExists(turboConfigPath);
  }

  /**
   * CLI - Generate - GitHub - Workflows - Build Command.
   *
   * Emits the shell command string for a "check" or "build" step. When
   * `useTurbo` is true, generates a `npx turbo run` invocation with filter
   * flags; otherwise generates an `npm run` invocation with `-w` flags.
   *
   * @param {CliGenerateGithubWorkflowsBuildCommandScriptName}     scriptName     - Script name.
   * @param {CliGenerateGithubWorkflowsBuildCommandWorkspaceNames} workspaceNames - Workspace names.
   * @param {CliGenerateGithubWorkflowsBuildCommandUseTurbo}       useTurbo       - Use turbo.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsBuildCommandReturns}
   *
   * @since 0.16.0
   */
  public static buildCommand(scriptName: CliGenerateGithubWorkflowsBuildCommandScriptName, workspaceNames: CliGenerateGithubWorkflowsBuildCommandWorkspaceNames, useTurbo: CliGenerateGithubWorkflowsBuildCommandUseTurbo): CliGenerateGithubWorkflowsBuildCommandReturns {
    if (useTurbo === true) {
      const flags: CliGenerateGithubWorkflowsBuildCommandFlags = workspaceNames.map(
        (name) => `--filter=${name}`,
      );

      return `npx turbo run ${scriptName} ${flags.join(' ')} --concurrency=2`;
    }

    const flags: CliGenerateGithubWorkflowsBuildCommandFlags = workspaceNames.map(
      (name) => `-w ${name}`,
    );

    return `npm run ${scriptName} ${flags.join(' ')}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Render Upload Artifact Steps.
   *
   * Emits one upload-artifact step per target with a non-empty
   * artifactPaths metadata. Each step has a unique artifact name keyed by
   * targetType + slugified workingDir so publish jobs can fetch only their own.
   *
   * @param {CliGenerateGithubWorkflowsRenderUploadArtifactStepsTargets}        targets         - Targets.
   * @param {CliGenerateGithubWorkflowsRenderUploadArtifactStepsTargetMetadata} targetsMetadata - Targets metadata.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsRenderUploadArtifactStepsReturns}
   *
   * @since 0.16.3
   */
  public static renderUploadArtifactSteps(targets: CliGenerateGithubWorkflowsRenderUploadArtifactStepsTargets, targetsMetadata: CliGenerateGithubWorkflowsRenderUploadArtifactStepsTargetMetadata): CliGenerateGithubWorkflowsRenderUploadArtifactStepsReturns {
    const steps: CliGenerateGithubWorkflowsRenderUploadArtifactStepsSteps = [];

    for (const target of targets) {
      const metadata: CliGenerateGithubWorkflowsRenderUploadArtifactStepsMetadata = targetsMetadata[target['type']];

      if (metadata === undefined) {
        continue;
      }

      if (metadata['artifactPaths'].length === 0) {
        continue;
      }

      const strippedDir: CliGenerateGithubWorkflowsRenderUploadArtifactStepsStrippedDir = target['workingDir'].replace(LIB_REGEX_PATTERN_LEADING_DOT_SLASH, '');
      const targetId: CliGenerateGithubWorkflowsRenderUploadArtifactStepsTargetId = CliGenerateGithubWorkflows.slugifyWorkingDir(target['workingDir']);
      const artifactName: CliGenerateGithubWorkflowsRenderUploadArtifactStepsArtifactName = CliGenerateGithubWorkflows.buildArtifactName(target['type'], targetId);

      const pathLines: CliGenerateGithubWorkflowsRenderUploadArtifactStepsPathLines = metadata['artifactPaths'].map(
        (template: CliGenerateGithubWorkflowsRenderUploadArtifactStepsResolvedPath) => `            ${template.replaceAll('{workingDir}', strippedDir)}`,
      );

      const stepLines: CliGenerateGithubWorkflowsRenderUploadArtifactStepsStepLines = [
        `      - name: "Upload build artifacts (${target['type']}/${targetId})"`,
        '        uses: "actions/upload-artifact@v4"',
        '        with:',
        `          name: "${artifactName}"`,
        '          retention-days: 1',
        '          path: |',
        ...pathLines,
      ];

      steps.push(stepLines.join('\n'));
    }

    if (steps.length === 0) {
      return '';
    }

    return steps.join('\n\n');
  }
}
