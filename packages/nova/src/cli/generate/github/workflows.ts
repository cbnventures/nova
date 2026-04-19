import { promises as fs } from 'fs';
import { join } from 'path';

import chalk from 'chalk';
import {
  parse as parseYaml,
  stringify as stringifyYaml,
} from 'yaml';

import { LibNovaConfig } from '../../../lib/nova-config.js';
import {
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
  CliGenerateGithubWorkflowsBuildMergedRunNameMergedContextExpression,
  CliGenerateGithubWorkflowsBuildMergedRunNameReturns,
  CliGenerateGithubWorkflowsBuildMergedRunNameRunNameMatch,
  CliGenerateGithubWorkflowsBuildMergedRunNameRunNamePrefix,
  CliGenerateGithubWorkflowsBuildMergedRunNameRunNameSuffix,
  CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataList,
  CliGenerateGithubWorkflowsDetectCircularDependsOnCurrentEntry,
  CliGenerateGithubWorkflowsDetectCircularDependsOnCurrentId,
  CliGenerateGithubWorkflowsDetectCircularDependsOnEntryKey,
  CliGenerateGithubWorkflowsDetectCircularDependsOnKey,
  CliGenerateGithubWorkflowsDetectCircularDependsOnQueue,
  CliGenerateGithubWorkflowsDetectCircularDependsOnReturns,
  CliGenerateGithubWorkflowsDetectCircularDependsOnVisited,
  CliGenerateGithubWorkflowsDetectCircularDependsOnWorkflows,
  CliGenerateGithubWorkflowsRunBaseContent,
  CliGenerateGithubWorkflowsRunBasePath,
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
  CliGenerateGithubWorkflowsRunExistingEntries,
  CliGenerateGithubWorkflowsRunExistingEntry,
  CliGenerateGithubWorkflowsRunGeneratedSet,
  CliGenerateGithubWorkflowsRunHasDependsOnError,
  CliGenerateGithubWorkflowsRunHasDuplicateError,
  CliGenerateGithubWorkflowsRunHasTriggerError,
  CliGenerateGithubWorkflowsRunHasTriggers,
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
  CliGenerateGithubWorkflowsRunMetadataEntry,
  CliGenerateGithubWorkflowsRunMissingLiterals,
  CliGenerateGithubWorkflowsRunNeedsDependsOn,
  CliGenerateGithubWorkflowsRunOptions,
  CliGenerateGithubWorkflowsRunOrphanPath,
  CliGenerateGithubWorkflowsRunOutputFileName,
  CliGenerateGithubWorkflowsRunOutputFileNames,
  CliGenerateGithubWorkflowsRunReplaceFileNotice,
  CliGenerateGithubWorkflowsRunResolvedName,
  CliGenerateGithubWorkflowsRunReturns,
  CliGenerateGithubWorkflowsRunSetupLines,
  CliGenerateGithubWorkflowsRunSetupMessage,
  CliGenerateGithubWorkflowsRunSubstituted,
  CliGenerateGithubWorkflowsRunTargetPath,
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
  CliGenerateGithubWorkflowsRunVariableMeta,
  CliGenerateGithubWorkflowsRunVariableName,
  CliGenerateGithubWorkflowsRunWorkflowEntry,
  CliGenerateGithubWorkflowsRunWorkflows,
  CliGenerateGithubWorkflowsRunWorkflowsDirectory,
  CliGenerateGithubWorkflowsRunWorkflowSuffix,
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
        const indentedTriggerYaml: CliGenerateGithubWorkflowsRunIndentedTriggerYaml = indentedTriggerLines.join('\n');

        // Build merged run-name.
        const mergedRunName: CliGenerateGithubWorkflowsRunMergedRunName = CliGenerateGithubWorkflows.buildMergedRunName(triggerDataList);

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

      // Build setup instructions for non-auto secrets and vars.
      for (const variableEntry of Object.entries(metadataEntry['variables'])) {
        const variableName: CliGenerateGithubWorkflowsRunVariableName = variableEntry[0];
        const variableMeta: CliGenerateGithubWorkflowsRunVariableMeta = variableEntry[1];

        if (variableMeta['auto'] === true) {
          continue;
        }

        if (variableMeta['format'] === 'secret') {
          const resolvedName: CliGenerateGithubWorkflowsRunResolvedName = (entry['settings'] !== undefined && entry['settings'][variableName] !== undefined) ? entry['settings'][variableName] : (variableMeta['default'] ?? variableName);

          setupLines.push(` - ${chalk.cyan(outputFileName)}: Secret ${chalk.yellow(resolvedName)}`);
        }

        if (variableMeta['format'] === 'var') {
          const resolvedName: CliGenerateGithubWorkflowsRunResolvedName = (entry['settings'] !== undefined && entry['settings'][variableName] !== undefined) ? entry['settings'][variableName] : (variableMeta['default'] ?? variableName);

          setupLines.push(` - ${chalk.cyan(outputFileName)}: Variable ${chalk.yellow(resolvedName)}`);
        }
      }

      if (isDryRun === true) {
        const displayPath: CliGenerateGithubWorkflowsRunDisplayPath = `.github/workflows/${outputFileName}`;

        Logger.customize({
          name: 'CliGenerateGithubWorkflows.run',
          purpose: 'dry-run',
        }).info(`Would generate ${chalk.cyan(`"${displayPath}"`)}.`);

        continue;
      }

      const targetPath: CliGenerateGithubWorkflowsRunTargetPath = join(workflowsDirectory, outputFileName);

      await saveGeneratedFile(targetPath, substituted, isReplaceFile);
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
   * them, and reconstructs a single run-name with combined fallback chains.
   *
   * @param {CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataList} triggerDataList - Trigger data list.
   *
   * @private
   *
   * @returns {CliGenerateGithubWorkflowsBuildMergedRunNameReturns}
   *
   * @since 0.21.0
   */
  private static buildMergedRunName(triggerDataList: CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataList): CliGenerateGithubWorkflowsBuildMergedRunNameReturns {
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

    // Reconstruct the merged run-name.
    const mergedContextExpression: CliGenerateGithubWorkflowsBuildMergedRunNameMergedContextExpression = [
      ...contextExpressions,
      '\'manually\'',
    ].join(' || ');

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
}
