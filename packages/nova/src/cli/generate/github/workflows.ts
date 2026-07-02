import { promises as fs } from 'fs';
import { join } from 'path';

import chalk from 'chalk';
import {
  parse as parseYaml,
  stringify as stringifyYaml,
} from 'yaml';

import { Runner as LibNovaConfig } from '../../../lib/nova-config.js';
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
  Cli_Generate_Github_Workflows_Runner_BuildArtifactName_Returns,
  Cli_Generate_Github_Workflows_Runner_BuildArtifactName_TargetId,
  Cli_Generate_Github_Workflows_Runner_BuildArtifactName_TargetType,
  Cli_Generate_Github_Workflows_Runner_BuildCommand_NpmFlags,
  Cli_Generate_Github_Workflows_Runner_BuildCommand_Returns,
  Cli_Generate_Github_Workflows_Runner_BuildCommand_ScriptName,
  Cli_Generate_Github_Workflows_Runner_BuildCommand_TurboFlags,
  Cli_Generate_Github_Workflows_Runner_BuildCommand_UseTurbo,
  Cli_Generate_Github_Workflows_Runner_BuildCommand_WorkspaceNames,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Entry,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_EntryTargetsMetadata,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Lines,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_MetadataEntry,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_OutputFileName,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Returns,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_SecretResolvedName,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_SetupTargetMetadata,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_SetupTargetType,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetSecretResolvedName,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetVariableMeta,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetVariableName,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetVarResolvedName,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_VariableMeta,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_VariableName,
  Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_VarResolvedName,
  Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_JobsConditionLine,
  Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_Returns,
  Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerDataList,
  Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_AllParts,
  Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_DispatchPart,
  Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_NonDispatchParts,
  Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_PublishInner,
  Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_PublishParts,
  Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_Returns,
  Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerDataList,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextExpressions,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextExpressionsWithFallback,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextInner,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextMatch,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextParts,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_HasEmptyFallback,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_MergedContextExpression,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_NeedsManuallyFallback,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_Returns,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_RunNameMatch,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_RunNamePrefix,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_RunNameSuffix,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ShouldAppendFallback,
  Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerDataList,
  Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_CurrentEntry,
  Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_CurrentId,
  Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_EntryKey,
  Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Key,
  Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Queue,
  Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Returns,
  Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Visited,
  Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Workflows,
  Cli_Generate_Github_Workflows_Runner_DetectTurbo_ProjectDirectory,
  Cli_Generate_Github_Workflows_Runner_DetectTurbo_Returns,
  Cli_Generate_Github_Workflows_Runner_DetectTurbo_TurboConfigPath,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_ArtifactName,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Metadata,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_PathLines,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Returns,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_StepLines,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Steps,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_StrippedDir,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetId,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Targets,
  Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetsMetadata,
  Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Entry,
  Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Path,
  Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Returns,
  Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Workspaces,
  Cli_Generate_Github_Workflows_Runner_Run_AppendedFragments,
  Cli_Generate_Github_Workflows_Runner_Run_ArtifactName,
  Cli_Generate_Github_Workflows_Runner_Run_BaseContent,
  Cli_Generate_Github_Workflows_Runner_Run_BasePath,
  Cli_Generate_Github_Workflows_Runner_Run_BuildCommand,
  Cli_Generate_Github_Workflows_Runner_Run_CheckCommand,
  Cli_Generate_Github_Workflows_Runner_Run_Config,
  Cli_Generate_Github_Workflows_Runner_Run_ConfigWorkspaces,
  Cli_Generate_Github_Workflows_Runner_Run_Content,
  Cli_Generate_Github_Workflows_Runner_Run_CurrentDirectory,
  Cli_Generate_Github_Workflows_Runner_Run_CurrentEntryTarget,
  Cli_Generate_Github_Workflows_Runner_Run_DependsOnBaseContent,
  Cli_Generate_Github_Workflows_Runner_Run_DependsOnBasePath,
  Cli_Generate_Github_Workflows_Runner_Run_DependsOnEntries,
  Cli_Generate_Github_Workflows_Runner_Run_DependsOnNameMatch,
  Cli_Generate_Github_Workflows_Runner_Run_DependsOnResolvedNames,
  Cli_Generate_Github_Workflows_Runner_Run_DependsOnTarget,
  Cli_Generate_Github_Workflows_Runner_Run_DependsOnWorkflowName,
  Cli_Generate_Github_Workflows_Runner_Run_DependsOnYamlArray,
  Cli_Generate_Github_Workflows_Runner_Run_DisplayPath,
  Cli_Generate_Github_Workflows_Runner_Run_DuplicateKey,
  Cli_Generate_Github_Workflows_Runner_Run_DuplicateSet,
  Cli_Generate_Github_Workflows_Runner_Run_Entry,
  Cli_Generate_Github_Workflows_Runner_Run_Entry2,
  Cli_Generate_Github_Workflows_Runner_Run_EntryLabel,
  Cli_Generate_Github_Workflows_Runner_Run_EntryScopes,
  Cli_Generate_Github_Workflows_Runner_Run_EntrySetupLines,
  Cli_Generate_Github_Workflows_Runner_Run_EntryTargetForUniqueness,
  Cli_Generate_Github_Workflows_Runner_Run_EntryTargets,
  Cli_Generate_Github_Workflows_Runner_Run_EntryTargetsForValidation,
  Cli_Generate_Github_Workflows_Runner_Run_EntryWorkflowKey,
  Cli_Generate_Github_Workflows_Runner_Run_ExistingDirent,
  Cli_Generate_Github_Workflows_Runner_Run_ExistingEntries,
  Cli_Generate_Github_Workflows_Runner_Run_FragmentTargetType,
  Cli_Generate_Github_Workflows_Runner_Run_FragmentTargetWorkingDir,
  Cli_Generate_Github_Workflows_Runner_Run_GeneratedSet,
  Cli_Generate_Github_Workflows_Runner_Run_GlobalUniquenessMap,
  Cli_Generate_Github_Workflows_Runner_Run_HasDependsOnError,
  Cli_Generate_Github_Workflows_Runner_Run_HasDuplicateError,
  Cli_Generate_Github_Workflows_Runner_Run_HasPublishValidationError,
  Cli_Generate_Github_Workflows_Runner_Run_HasTargetFragmentError,
  Cli_Generate_Github_Workflows_Runner_Run_HasTriggerError,
  Cli_Generate_Github_Workflows_Runner_Run_HasTriggers,
  Cli_Generate_Github_Workflows_Runner_Run_IndentedFragment,
  Cli_Generate_Github_Workflows_Runner_Run_IndentedLines,
  Cli_Generate_Github_Workflows_Runner_Run_IndentedTriggerLines,
  Cli_Generate_Github_Workflows_Runner_Run_IndentedTriggerYaml,
  Cli_Generate_Github_Workflows_Runner_Run_IsAtProjectRoot,
  Cli_Generate_Github_Workflows_Runner_Run_IsBackup,
  Cli_Generate_Github_Workflows_Runner_Run_IsDryRun,
  Cli_Generate_Github_Workflows_Runner_Run_IsOrphan,
  Cli_Generate_Github_Workflows_Runner_Run_IsReplaceFile,
  Cli_Generate_Github_Workflows_Runner_Run_IsSameWorkflow,
  Cli_Generate_Github_Workflows_Runner_Run_JobsConditionLine,
  Cli_Generate_Github_Workflows_Runner_Run_LiteralEntry,
  Cli_Generate_Github_Workflows_Runner_Run_LiteralMetadataEntry,
  Cli_Generate_Github_Workflows_Runner_Run_LiteralSuffix,
  Cli_Generate_Github_Workflows_Runner_Run_LiteralTemplateName,
  Cli_Generate_Github_Workflows_Runner_Run_LiteralWorkflowKey,
  Cli_Generate_Github_Workflows_Runner_Run_MergedJobsCondition,
  Cli_Generate_Github_Workflows_Runner_Run_MergedPublishCondition,
  Cli_Generate_Github_Workflows_Runner_Run_MergedRunName,
  Cli_Generate_Github_Workflows_Runner_Run_MergedTriggerBlock,
  Cli_Generate_Github_Workflows_Runner_Run_MergedVariables,
  Cli_Generate_Github_Workflows_Runner_Run_MetadataEntry,
  Cli_Generate_Github_Workflows_Runner_Run_MissingLiterals,
  Cli_Generate_Github_Workflows_Runner_Run_NeedsDependsOn,
  Cli_Generate_Github_Workflows_Runner_Run_NeedsManuallyFallback,
  Cli_Generate_Github_Workflows_Runner_Run_Options,
  Cli_Generate_Github_Workflows_Runner_Run_OrphanPath,
  Cli_Generate_Github_Workflows_Runner_Run_OutputFileName,
  Cli_Generate_Github_Workflows_Runner_Run_OutputFileNames,
  Cli_Generate_Github_Workflows_Runner_Run_ReplaceFileNotice,
  Cli_Generate_Github_Workflows_Runner_Run_ResolvedName,
  Cli_Generate_Github_Workflows_Runner_Run_ResolvedTargetFragments,
  Cli_Generate_Github_Workflows_Runner_Run_ResolvedTriggerBlock,
  Cli_Generate_Github_Workflows_Runner_Run_ResolvedValue,
  Cli_Generate_Github_Workflows_Runner_Run_ResolvedWorkspaceName,
  Cli_Generate_Github_Workflows_Runner_Run_ResolvedWorkspaceNames,
  Cli_Generate_Github_Workflows_Runner_Run_Returns,
  Cli_Generate_Github_Workflows_Runner_Run_ScopePath,
  Cli_Generate_Github_Workflows_Runner_Run_SettingValue,
  Cli_Generate_Github_Workflows_Runner_Run_SetupLines,
  Cli_Generate_Github_Workflows_Runner_Run_SetupMessage,
  Cli_Generate_Github_Workflows_Runner_Run_SkippedWorkflowKeys,
  Cli_Generate_Github_Workflows_Runner_Run_Substituted,
  Cli_Generate_Github_Workflows_Runner_Run_SupportsScopes,
  Cli_Generate_Github_Workflows_Runner_Run_SupportsTargets,
  Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentExists,
  Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentPath,
  Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentRawContent,
  Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentResolvedContent,
  Cli_Generate_Github_Workflows_Runner_Run_TargetId,
  Cli_Generate_Github_Workflows_Runner_Run_TargetJobsConditionLine,
  Cli_Generate_Github_Workflows_Runner_Run_TargetKey,
  Cli_Generate_Github_Workflows_Runner_Run_TargetMetadata,
  Cli_Generate_Github_Workflows_Runner_Run_TargetMetadataForUniqueness,
  Cli_Generate_Github_Workflows_Runner_Run_TargetMetadataForValidation,
  Cli_Generate_Github_Workflows_Runner_Run_TargetNeeds,
  Cli_Generate_Github_Workflows_Runner_Run_TargetNeedsJobIds,
  Cli_Generate_Github_Workflows_Runner_Run_TargetNeedsValue,
  Cli_Generate_Github_Workflows_Runner_Run_TargetPath,
  Cli_Generate_Github_Workflows_Runner_Run_TargetsMetadata,
  Cli_Generate_Github_Workflows_Runner_Run_TargetsMetadataForValidation,
  Cli_Generate_Github_Workflows_Runner_Run_TargetSuffix,
  Cli_Generate_Github_Workflows_Runner_Run_TargetTupleKey,
  Cli_Generate_Github_Workflows_Runner_Run_TargetTupleSet,
  Cli_Generate_Github_Workflows_Runner_Run_TargetType,
  Cli_Generate_Github_Workflows_Runner_Run_TargetTypeForUniqueness,
  Cli_Generate_Github_Workflows_Runner_Run_TargetTypeForValidation,
  Cli_Generate_Github_Workflows_Runner_Run_TargetWorkingDir,
  Cli_Generate_Github_Workflows_Runner_Run_TemplateDirectory,
  Cli_Generate_Github_Workflows_Runner_Run_TemplateDirExists,
  Cli_Generate_Github_Workflows_Runner_Run_TemplateDirPath,
  Cli_Generate_Github_Workflows_Runner_Run_TemplateLiteralValue,
  Cli_Generate_Github_Workflows_Runner_Run_TemplateName,
  Cli_Generate_Github_Workflows_Runner_Run_TemplateVariableMeta,
  Cli_Generate_Github_Workflows_Runner_Run_TemplateVariableName,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerBlockString,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerData,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerDataList,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerFileExists,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerFileName,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerFilePath,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerParsed,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedDependsOn,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedJobsCondition,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedPublishCondition,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedRunName,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedTriggerBlock,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerRawContent,
  Cli_Generate_Github_Workflows_Runner_Run_Triggers,
  Cli_Generate_Github_Workflows_Runner_Run_TriggerYaml,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessEntry,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessEntryTargets,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessErrors,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyComposite,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyDetailEntries,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyDetailEntry,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyExisting,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyForTarget,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyResolvedValues,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessMetadataEntry,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessSuffix,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessTargetsMetadata,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessTemplateName,
  Cli_Generate_Github_Workflows_Runner_Run_UniquenessWorkflowKey,
  Cli_Generate_Github_Workflows_Runner_Run_UploadArtifactStep,
  Cli_Generate_Github_Workflows_Runner_Run_UseTurbo,
  Cli_Generate_Github_Workflows_Runner_Run_ValidationLiteralValue,
  Cli_Generate_Github_Workflows_Runner_Run_ValidationVariableMeta,
  Cli_Generate_Github_Workflows_Runner_Run_ValidationVariableName,
  Cli_Generate_Github_Workflows_Runner_Run_VariableMeta,
  Cli_Generate_Github_Workflows_Runner_Run_VariableName,
  Cli_Generate_Github_Workflows_Runner_Run_Workflows,
  Cli_Generate_Github_Workflows_Runner_Run_WorkflowsDirectory,
  Cli_Generate_Github_Workflows_Runner_Run_WorkflowSuffix,
  Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Input,
  Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Returns,
  Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Trimmed,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Content,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_LiteralReplacement,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Regex,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Result,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Returns,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_SecretReplacement,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_SecretResolvedName,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Settings,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_SettingValue,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VariableMeta,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VariableName,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Variables,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VarReplacement,
  Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VarResolvedName,
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
export class Runner {
  /**
   * CLI - Generate - GitHub - Workflows - Run.
   *
   * Called by the CLI index via executeCommand. Reads workflow entries
   * from nova.config.json, validates templates and settings, generates
   * output files, and cleans up orphaned workflow files.
   *
   * @param {Cli_Generate_Github_Workflows_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Generate_Github_Workflows_Runner_Run_Options): Cli_Generate_Github_Workflows_Runner_Run_Returns {
    const currentDirectory: Cli_Generate_Github_Workflows_Runner_Run_CurrentDirectory = process.cwd();
    const isAtProjectRoot: Cli_Generate_Github_Workflows_Runner_Run_IsAtProjectRoot = await isProjectRoot(currentDirectory);

    if (isAtProjectRoot !== true) {
      process.exitCode = 1;

      return 'cancelled';
    }

    const isDryRun: Cli_Generate_Github_Workflows_Runner_Run_IsDryRun = options['dryRun'] === true;
    const isReplaceFile: Cli_Generate_Github_Workflows_Runner_Run_IsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: Cli_Generate_Github_Workflows_Runner_Run_ReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'Runner.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    // Load config.
    const config: Cli_Generate_Github_Workflows_Runner_Run_Config = await new LibNovaConfig().load();
    const workflows: Cli_Generate_Github_Workflows_Runner_Run_Workflows = config['workflows'] as Cli_Generate_Github_Workflows_Runner_Run_Workflows;

    if (workflows === undefined || workflows.length === 0) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'skip',
      }).info('No workflows configured.');

      return 'completed';
    }

    const templateDirectory: Cli_Generate_Github_Workflows_Runner_Run_TemplateDirectory = resolveTemplatePath(import.meta.url, 'generators/github/workflows');
    const workflowsDirectory: Cli_Generate_Github_Workflows_Runner_Run_WorkflowsDirectory = join(currentDirectory, '.github', 'workflows');

    // Validate unique template+suffix combinations.
    const duplicateSet: Cli_Generate_Github_Workflows_Runner_Run_DuplicateSet = new Set();
    let hasDuplicateError: Cli_Generate_Github_Workflows_Runner_Run_HasDuplicateError = false;

    for (const entry of workflows) {
      const duplicateKey: Cli_Generate_Github_Workflows_Runner_Run_DuplicateKey = (entry['suffix'] !== undefined) ? `${entry['template']}-${entry['suffix']}` : entry['template'];

      if (duplicateSet.has(duplicateKey) === true) {
        Logger.customize({
          name: 'Runner.run',
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
    if (Runner.detectCircularDependsOn(workflows) === true) {
      Logger.customize({
        name: 'Runner.run',
        purpose: 'validate',
      }).error('Circular depends-on references detected. Aborting.');

      process.exitCode = 1;

      return 'cancelled';
    }

    // Track workflows that should be skipped during the main generation loop.
    // Populated by Phase 1 (literal validation) and Phase 2 (uniqueness pre-pass).
    const skippedWorkflowKeys: Cli_Generate_Github_Workflows_Runner_Run_SkippedWorkflowKeys = new Set();

    // Phase 1: per-workflow literal validation pre-pass.
    // Runs before the uniqueness pre-pass so workflows missing required literals
    // are flagged with the accurate "missing required literal settings" error
    // instead of being mis-reported as a "destination collision" by Phase 2
    // (which would otherwise fall back to the variable NAME as the resolved
    // value when a literal setting is absent).
    for (const literalWorkflowEntry of workflows) {
      const literalEntry: Cli_Generate_Github_Workflows_Runner_Run_LiteralEntry = literalWorkflowEntry;
      const literalTemplateName: Cli_Generate_Github_Workflows_Runner_Run_LiteralTemplateName = literalEntry['template'];
      const literalSuffix: Cli_Generate_Github_Workflows_Runner_Run_LiteralSuffix = literalEntry['suffix'];
      const literalWorkflowKey: Cli_Generate_Github_Workflows_Runner_Run_LiteralWorkflowKey = (literalSuffix !== undefined) ? `${literalTemplateName}-${literalSuffix}` : literalTemplateName;
      const literalMetadataEntry: Cli_Generate_Github_Workflows_Runner_Run_LiteralMetadataEntry = libWorkflowTemplatesMetadata.find(
        (m) => m['name'] === literalTemplateName,
      );

      // Unknown templates surface their error in the main loop where the full
      // "Unknown template" diagnostic lives; skip them here so Phase 1 does not
      // emit a misleading "missing literal" error for an unknown template.
      if (literalMetadataEntry === undefined) {
        continue;
      }

      const missingLiterals: Cli_Generate_Github_Workflows_Runner_Run_MissingLiterals = [];

      for (const variableEntry of Object.entries(literalMetadataEntry['variables'])) {
        const templateVariableName: Cli_Generate_Github_Workflows_Runner_Run_TemplateVariableName = variableEntry[0];
        const templateVariableMeta: Cli_Generate_Github_Workflows_Runner_Run_TemplateVariableMeta = variableEntry[1];

        if (templateVariableMeta['format'] === 'literal') {
          const templateLiteralValue: Cli_Generate_Github_Workflows_Runner_Run_TemplateLiteralValue = (literalEntry['settings'] !== undefined) ? literalEntry['settings'][templateVariableName] : undefined;

          if (typeof templateLiteralValue !== 'string' || templateLiteralValue.trim() === '') {
            missingLiterals.push(templateVariableName);
          }
        }
      }

      // Also iterate target-level literals for every declared target.
      const targetsMetadataForValidation: Cli_Generate_Github_Workflows_Runner_Run_TargetsMetadataForValidation = literalMetadataEntry['targets'] ?? {};
      const entryTargetsForValidation: Cli_Generate_Github_Workflows_Runner_Run_EntryTargetsForValidation = literalEntry['targets'] ?? [];

      for (const entryTargetForValidation of entryTargetsForValidation) {
        const targetTypeForValidation: Cli_Generate_Github_Workflows_Runner_Run_TargetTypeForValidation = entryTargetForValidation['type'];
        const targetMetadataForValidation: Cli_Generate_Github_Workflows_Runner_Run_TargetMetadataForValidation = targetsMetadataForValidation[targetTypeForValidation];

        if (targetMetadataForValidation === undefined) {
          continue;
        }

        for (const variableEntry of Object.entries(targetMetadataForValidation['variables'])) {
          const validationVariableName: Cli_Generate_Github_Workflows_Runner_Run_ValidationVariableName = variableEntry[0];
          const validationVariableMeta: Cli_Generate_Github_Workflows_Runner_Run_ValidationVariableMeta = variableEntry[1];

          if (validationVariableMeta['format'] === 'literal') {
            const validationLiteralValue: Cli_Generate_Github_Workflows_Runner_Run_ValidationLiteralValue = (literalEntry['settings'] !== undefined) ? literalEntry['settings'][validationVariableName] : undefined;

            if (typeof validationLiteralValue !== 'string' || validationLiteralValue.trim() === '') {
              if (missingLiterals.includes(validationVariableName) === false) {
                missingLiterals.push(validationVariableName);
              }
            }
          }
        }
      }

      if (missingLiterals.length > 0) {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'validate',
        }).error(`Workflow ${chalk.cyan(`"${literalWorkflowKey}"`)} is missing required literal settings: ${missingLiterals.join(', ')}. Skipping.`);

        skippedWorkflowKeys.add(literalWorkflowKey);
      }
    }

    // Phase 2: cross-workflow uniqueness pre-pass.
    // Walks every workflow + target before generation begins so a destination
    // collision (e.g., two github-action targets pointing at the same release
    // branch across separate workflows) is rejected fail-loud instead of
    // silently racing at deploy time. Workflows already in skippedWorkflowKeys
    // (from Phase 1) are skipped here so unresolvable literals don't trigger
    // false collisions.
    const globalUniquenessMap: Cli_Generate_Github_Workflows_Runner_Run_GlobalUniquenessMap = new Map();
    const uniquenessErrors: Cli_Generate_Github_Workflows_Runner_Run_UniquenessErrors = [];

    for (const uniquenessWorkflowEntry of workflows) {
      const uniquenessEntry: Cli_Generate_Github_Workflows_Runner_Run_UniquenessEntry = uniquenessWorkflowEntry;
      const uniquenessTemplateName: Cli_Generate_Github_Workflows_Runner_Run_UniquenessTemplateName = uniquenessEntry['template'];
      const uniquenessSuffix: Cli_Generate_Github_Workflows_Runner_Run_UniquenessSuffix = uniquenessEntry['suffix'];
      const uniquenessWorkflowKey: Cli_Generate_Github_Workflows_Runner_Run_UniquenessWorkflowKey = (uniquenessSuffix !== undefined) ? `${uniquenessTemplateName}-${uniquenessSuffix}` : uniquenessTemplateName;

      if (skippedWorkflowKeys.has(uniquenessWorkflowKey) === true) {
        continue;
      }

      const uniquenessMetadataEntry: Cli_Generate_Github_Workflows_Runner_Run_UniquenessMetadataEntry = libWorkflowTemplatesMetadata.find(
        (m) => m['name'] === uniquenessTemplateName,
      );

      if (uniquenessMetadataEntry === undefined) {
        continue;
      }

      const uniquenessTargetsMetadata: Cli_Generate_Github_Workflows_Runner_Run_UniquenessTargetsMetadata = uniquenessMetadataEntry['targets'] ?? {};
      const uniquenessEntryTargets: Cli_Generate_Github_Workflows_Runner_Run_UniquenessEntryTargets = uniquenessEntry['targets'] ?? [];

      for (const uniquenessTarget of uniquenessEntryTargets) {
        const entryTargetForUniqueness: Cli_Generate_Github_Workflows_Runner_Run_EntryTargetForUniqueness = uniquenessTarget;
        const targetTypeForUniqueness: Cli_Generate_Github_Workflows_Runner_Run_TargetTypeForUniqueness = entryTargetForUniqueness['type'];
        const targetMetadataForUniqueness: Cli_Generate_Github_Workflows_Runner_Run_TargetMetadataForUniqueness = uniquenessTargetsMetadata[targetTypeForUniqueness];

        if (targetMetadataForUniqueness === undefined) {
          continue;
        }

        const uniquenessKeyForTarget: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyForTarget = targetMetadataForUniqueness['uniquenessKey'];

        if (uniquenessKeyForTarget === undefined) {
          continue;
        }

        // Resolve each variable name to its value: settings override default.
        const uniquenessKeyResolvedValues: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyResolvedValues = [];
        const uniquenessKeyDetailEntries: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyDetailEntries = [];

        for (const uniquenessKeyVariableName of uniquenessKeyForTarget) {
          const variableName: Cli_Generate_Github_Workflows_Runner_Run_VariableName = uniquenessKeyVariableName;
          const variableMeta: Cli_Generate_Github_Workflows_Runner_Run_VariableMeta = targetMetadataForUniqueness['variables'][variableName];
          const settingValue: Cli_Generate_Github_Workflows_Runner_Run_SettingValue = (uniquenessEntry['settings'] !== undefined) ? uniquenessEntry['settings'][variableName] : undefined;
          const resolvedValue: Cli_Generate_Github_Workflows_Runner_Run_ResolvedValue = settingValue
            ?? (variableMeta !== undefined ? variableMeta['default'] : undefined)
            ?? variableName;
          const uniquenessKeyDetailEntry: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyDetailEntry = `${variableName}=${resolvedValue}`;

          uniquenessKeyResolvedValues.push(resolvedValue);

          uniquenessKeyDetailEntries.push(uniquenessKeyDetailEntry);
        }

        const uniquenessKeyComposite: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyComposite = [
          targetTypeForUniqueness,
          ...uniquenessKeyResolvedValues,
        ].join('::');
        const uniquenessKeyExisting: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyExisting = globalUniquenessMap.get(uniquenessKeyComposite);

        if (uniquenessKeyExisting !== undefined) {
          // Both the previously-recorded workflow and the current workflow are
          // marked for skip so neither emits a partial output for a destination
          // that Nova cannot disambiguate.
          skippedWorkflowKeys.add(uniquenessKeyExisting['workflowKey']);
          skippedWorkflowKeys.add(uniquenessWorkflowKey);

          const isSameWorkflow: Cli_Generate_Github_Workflows_Runner_Run_IsSameWorkflow = uniquenessKeyExisting['workflowKey'] === uniquenessWorkflowKey;

          if (uniquenessKeyDetailEntries.length === 0) {
            if (isSameWorkflow === true) {
              uniquenessErrors.push(`Singleton target violation: workflow "${uniquenessWorkflowKey}" declares multiple "${targetTypeForUniqueness}" targets, but only one is allowed.`);
            } else {
              uniquenessErrors.push(`Singleton target collision: only one "${targetTypeForUniqueness}" target may be declared across all workflows. Found in workflow "${uniquenessKeyExisting['workflowKey']}" and again in workflow "${uniquenessWorkflowKey}".`);
            }
          } else if (isSameWorkflow === true) {
            uniquenessErrors.push(`Destination collision in workflow "${uniquenessWorkflowKey}": multiple "${targetTypeForUniqueness}" targets declare the same destination (${uniquenessKeyDetailEntries.join(', ')}). Each destination must be declared in only one target.`);
          } else {
            uniquenessErrors.push(`Cross-workflow destination collision: target "${targetTypeForUniqueness}" with destination (${uniquenessKeyDetailEntries.join(', ')}) is declared in workflow "${uniquenessKeyExisting['workflowKey']}" and again in workflow "${uniquenessWorkflowKey}". Each destination must be declared in only one workflow.`);
          }

          continue;
        }

        const uniquenessKeyMapValue: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue = {
          workflowKey: uniquenessWorkflowKey,
          targetType: targetTypeForUniqueness,
          detailEntries: uniquenessKeyDetailEntries,
        };

        globalUniquenessMap.set(uniquenessKeyComposite, uniquenessKeyMapValue);
      }
    }

    if (uniquenessErrors.length > 0) {
      for (const uniquenessError of uniquenessErrors) {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'validate',
        }).error(uniquenessError);
      }
    }

    const generatedSet: Cli_Generate_Github_Workflows_Runner_Run_GeneratedSet = new Set();
    const outputFileNames: Cli_Generate_Github_Workflows_Runner_Run_OutputFileNames = new Set();
    const setupLines: Cli_Generate_Github_Workflows_Runner_Run_SetupLines = [];

    for (const workflowEntry of workflows) {
      const entry: Cli_Generate_Github_Workflows_Runner_Run_Entry = workflowEntry;
      const templateName: Cli_Generate_Github_Workflows_Runner_Run_TemplateName = entry['template'];
      const workflowSuffix: Cli_Generate_Github_Workflows_Runner_Run_WorkflowSuffix = entry['suffix'];
      const entryWorkflowKey: Cli_Generate_Github_Workflows_Runner_Run_EntryWorkflowKey = (workflowSuffix !== undefined) ? `${templateName}-${workflowSuffix}` : templateName;

      // Skip workflows flagged by the cross-workflow uniqueness pre-pass.
      // The error was already logged when the collision was detected; this
      // check just ensures a partial output is not written for either side
      // of the collision.
      if (skippedWorkflowKeys.has(entryWorkflowKey) === true) {
        continue;
      }

      // Validate template name against metadata.
      const metadataEntry: Cli_Generate_Github_Workflows_Runner_Run_MetadataEntry = libWorkflowTemplatesMetadata.find(
        (m) => m['name'] === templateName,
      );

      if (metadataEntry === undefined) {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'validate',
        }).error(`Unknown template ${chalk.cyan(`"${templateName}"`)}. Skipping.`);

        continue;
      }

      // Validate template directory exists.
      const templateDirPath: Cli_Generate_Github_Workflows_Runner_Run_TemplateDirPath = join(templateDirectory, templateName);
      const templateDirExists: Cli_Generate_Github_Workflows_Runner_Run_TemplateDirExists = await pathExists(templateDirPath);

      if (templateDirExists !== true) {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'validate',
        }).error(`Template directory ${chalk.cyan(`"${templateName}"`)} not found. Skipping.`);

        continue;
      }

      // Literal-variable validation runs in the Phase 1 pre-pass before the
      // uniqueness pre-pass. By this point in the main loop a workflow with
      // missing literals is already in skippedWorkflowKeys and was filtered
      // out at the top of this loop, so no inline validation is needed here.

      // Build output filename.
      const outputFileName: Cli_Generate_Github_Workflows_Runner_Run_OutputFileName = (workflowSuffix !== undefined) ? `nova-${templateName}-${workflowSuffix}.yml` : `nova-${templateName}.yml`;

      // Check for duplicate output filenames.
      if (outputFileNames.has(outputFileName) === true) {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'validate',
        }).error(`Duplicate output filename ${chalk.cyan(`"${outputFileName}"`)}. Skipping.`);

        continue;
      }

      outputFileNames.add(outputFileName);

      // Read base template content.
      const basePath: Cli_Generate_Github_Workflows_Runner_Run_BasePath = join(templateDirPath, 'base.yml');
      let baseContent: Cli_Generate_Github_Workflows_Runner_Run_BaseContent = undefined;

      try {
        baseContent = await fs.readFile(basePath, 'utf-8');
      } catch {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'read',
        }).error(`Failed to read base template ${chalk.cyan(`"${templateName}/base.yml"`)}. Skipping.`);

        continue;
      }

      // Determine if this template uses triggers.
      const hasTriggers: Cli_Generate_Github_Workflows_Runner_Run_HasTriggers = entry['triggers'].length > 0;

      let content: Cli_Generate_Github_Workflows_Runner_Run_Content = baseContent;

      // Process triggers if the template uses them.
      if (hasTriggers === true) {
        const triggers: Cli_Generate_Github_Workflows_Runner_Run_Triggers = entry['triggers'];

        // Validate trigger files exist and load them.
        let hasTriggerError: Cli_Generate_Github_Workflows_Runner_Run_HasTriggerError = false;
        const triggerDataList: Cli_Generate_Github_Workflows_Runner_Run_TriggerDataList = [];

        for (const trigger of triggers) {
          const triggerFileName: Cli_Generate_Github_Workflows_Runner_Run_TriggerFileName = `${trigger}.yml`;
          const triggerFilePath: Cli_Generate_Github_Workflows_Runner_Run_TriggerFilePath = join(templateDirPath, 'triggers', triggerFileName);
          const triggerFileExists: Cli_Generate_Github_Workflows_Runner_Run_TriggerFileExists = await pathExists(triggerFilePath);

          if (triggerFileExists !== true) {
            Logger.customize({
              name: 'Runner.run',
              purpose: 'validate',
            }).error(`Trigger file ${chalk.cyan(`"${triggerFileName}"`)} not found for template ${chalk.cyan(`"${templateName}"`)}. Skipping workflow.`);

            hasTriggerError = true;

            break;
          }

          let triggerRawContent: Cli_Generate_Github_Workflows_Runner_Run_TriggerRawContent = '';

          try {
            triggerRawContent = await fs.readFile(triggerFilePath, 'utf-8');
          } catch {
            Logger.customize({
              name: 'Runner.run',
              purpose: 'read',
            }).error(`Failed to read trigger file ${chalk.cyan(`"${triggerFileName}"`)}. Skipping workflow.`);

            hasTriggerError = true;

            break;
          }

          const triggerParsed: Cli_Generate_Github_Workflows_Runner_Run_TriggerParsed = parseYaml(triggerRawContent) as Cli_Generate_Github_Workflows_Runner_Run_TriggerParsed;
          const triggerParsedRunName: Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedRunName = triggerParsed['run-name'] as Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedRunName;
          const triggerParsedPublishCondition: Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedPublishCondition = triggerParsed['publish-condition'] as Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedPublishCondition;
          const triggerParsedTriggerBlock: Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedTriggerBlock = triggerParsed['trigger'] as Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedTriggerBlock;
          const triggerParsedDependsOn: Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedDependsOn = triggerParsed['depends-on'] as Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedDependsOn;
          const triggerParsedJobsCondition: Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedJobsCondition = triggerParsed['jobs-condition'] as Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedJobsCondition;

          const triggerData: Cli_Generate_Github_Workflows_Runner_Run_TriggerData = {
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
        const needsDependsOn: Cli_Generate_Github_Workflows_Runner_Run_NeedsDependsOn = triggerDataList.some(
          (triggerData) => triggerData['dependsOn'] === true,
        );

        if (needsDependsOn === true) {
          const dependsOnEntries: Cli_Generate_Github_Workflows_Runner_Run_DependsOnEntries = entry['depends-on'] ?? [];
          const entryLabel: Cli_Generate_Github_Workflows_Runner_Run_EntryLabel = (workflowSuffix !== undefined) ? `${templateName}-${workflowSuffix}` : templateName;

          if (dependsOnEntries.length === 0) {
            Logger.customize({
              name: 'Runner.run',
              purpose: 'validate',
            }).error(`Workflow ${chalk.cyan(`"${entryLabel}"`)} uses a trigger that requires depends-on, but no depends-on value is configured. Skipping.`);

            continue;
          }

          // Resolve each depends-on entry to a workflow name.
          const dependsOnResolvedNames: Cli_Generate_Github_Workflows_Runner_Run_DependsOnResolvedNames = [];
          let hasDependsOnError: Cli_Generate_Github_Workflows_Runner_Run_HasDependsOnError = false;

          for (const dependsOnEntry of dependsOnEntries) {
            const entry2: Cli_Generate_Github_Workflows_Runner_Run_Entry2 = dependsOnEntry;

            // Find the target workflow by matching template-suffix composite.
            const dependsOnTarget: Cli_Generate_Github_Workflows_Runner_Run_DependsOnTarget = workflows.find((w) => {
              const targetKey: Cli_Generate_Github_Workflows_Runner_Run_TargetKey = (w['suffix'] !== undefined) ? `${w['template']}-${w['suffix']}` : w['template'];

              return targetKey === entry2;
            });

            if (dependsOnTarget === undefined) {
              Logger.customize({
                name: 'Runner.run',
                purpose: 'validate',
              }).error(`Workflow ${chalk.cyan(`"${entryLabel}"`)} depends on ${chalk.cyan(`"${entry2}"`)} which does not exist. Skipping.`);

              hasDependsOnError = true;

              break;
            }

            // Resolve the depends-on workflow name from its base template.
            const dependsOnBasePath: Cli_Generate_Github_Workflows_Runner_Run_DependsOnBasePath = join(templateDirectory, dependsOnTarget['template'], 'base.yml');
            let dependsOnWorkflowName: Cli_Generate_Github_Workflows_Runner_Run_DependsOnWorkflowName = '';

            try {
              const dependsOnBaseContent: Cli_Generate_Github_Workflows_Runner_Run_DependsOnBaseContent = await fs.readFile(dependsOnBasePath, 'utf-8');
              const dependsOnNameMatch: Cli_Generate_Github_Workflows_Runner_Run_DependsOnNameMatch = new RegExp(LIB_REGEX_PATTERN_WORKFLOW_NAME.source, 'm').exec(dependsOnBaseContent);

              if (dependsOnNameMatch === null || dependsOnNameMatch[1] === undefined) {
                throw new Error('No name field found');
              }

              const targetSuffix: Cli_Generate_Github_Workflows_Runner_Run_TargetSuffix = dependsOnTarget['suffix'];
              dependsOnWorkflowName = dependsOnNameMatch[1].replaceAll('[__WORKFLOW_ID__]', (targetSuffix !== undefined) ? ` (${targetSuffix})` : '');
            } catch {
              Logger.customize({
                name: 'Runner.run',
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
          const dependsOnYamlArray: Cli_Generate_Github_Workflows_Runner_Run_DependsOnYamlArray = dependsOnResolvedNames.map(
            (name) => `"${name}"`,
          ).join(', ');

          // Replace [__DEPENDS_ON__] in trigger blocks.
          for (const triggerData of triggerDataList) {
            if (triggerData['dependsOn'] === true) {
              const triggerBlockString: Cli_Generate_Github_Workflows_Runner_Run_TriggerBlockString = JSON.stringify(triggerData['triggerBlock']);
              const resolvedTriggerBlock: Cli_Generate_Github_Workflows_Runner_Run_ResolvedTriggerBlock = JSON.parse(triggerBlockString.replaceAll('"[__DEPENDS_ON__]"', dependsOnYamlArray)) as Cli_Generate_Github_Workflows_Runner_Run_TriggerParsed;

              Reflect.set(triggerData, 'triggerBlock', resolvedTriggerBlock);
            }
          }
        }

        // Merge trigger blocks.
        const mergedTriggerBlock: Cli_Generate_Github_Workflows_Runner_Run_MergedTriggerBlock = {};

        for (const triggerData of triggerDataList) {
          for (const triggerEntry of Object.entries(triggerData['triggerBlock'])) {
            Reflect.set(mergedTriggerBlock, triggerEntry[0], triggerEntry[1]);
          }
        }

        // Serialize trigger block to YAML and indent with 2 spaces.
        const triggerYaml: Cli_Generate_Github_Workflows_Runner_Run_TriggerYaml = stringifyYaml(mergedTriggerBlock, {
          lineWidth: 0,
          defaultKeyType: 'PLAIN',
          defaultStringType: 'QUOTE_DOUBLE',
        });
        const indentedTriggerLines: Cli_Generate_Github_Workflows_Runner_Run_IndentedTriggerLines = triggerYaml.split('\n').map(
          (line) => (line.trim() === '') ? '' : `  ${line}`,
        );
        const indentedTriggerYaml: Cli_Generate_Github_Workflows_Runner_Run_IndentedTriggerYaml = indentedTriggerLines.join('\n').replace(LIB_REGEX_PATTERN_TRAILING_NEWLINES, '');

        // Build merged run-name.
        const needsManuallyFallback: Cli_Generate_Github_Workflows_Runner_Run_NeedsManuallyFallback = metadataEntry['needsManuallyFallback'] ?? true;
        const mergedRunName: Cli_Generate_Github_Workflows_Runner_Run_MergedRunName = Runner.buildMergedRunName(triggerDataList, needsManuallyFallback);

        // Build merged publish condition.
        const mergedPublishCondition: Cli_Generate_Github_Workflows_Runner_Run_MergedPublishCondition = Runner.buildMergedPublishCondition(triggerDataList);

        // Build merged jobs condition.
        const mergedJobsCondition: Cli_Generate_Github_Workflows_Runner_Run_MergedJobsCondition = Runner.buildMergedJobsCondition(triggerDataList);
        const jobsConditionLine: Cli_Generate_Github_Workflows_Runner_Run_JobsConditionLine = (mergedJobsCondition !== '') ? `    if: "${mergedJobsCondition}"\n` : '';

        // Replace placeholders.
        content = content.replace('[__RUN_NAME__]', mergedRunName);
        content = content.replace('[__TRIGGERS__]', indentedTriggerYaml);
        content = content.replace('[__PUBLISH_CONDITION__]', mergedPublishCondition);
        content = content.replace('[__JOBS_CONDITION__]\n', jobsConditionLine);

        // Compose publish-template-specific placeholders (scopes, targets, artifacts).
        const supportsScopes: Cli_Generate_Github_Workflows_Runner_Run_SupportsScopes = metadataEntry['supportsScopes'];
        const supportsTargets: Cli_Generate_Github_Workflows_Runner_Run_SupportsTargets = metadataEntry['supportsTargets'];
        const entryScopes: Cli_Generate_Github_Workflows_Runner_Run_EntryScopes = entry['scopes'] ?? [];
        const entryTargets: Cli_Generate_Github_Workflows_Runner_Run_EntryTargets = entry['targets'] ?? [];

        // Validate scope/target configuration against template capabilities.
        let hasPublishValidationError: Cli_Generate_Github_Workflows_Runner_Run_HasPublishValidationError = false;

        if (supportsTargets !== true && entryTargets.length > 0) {
          Logger.customize({
            name: 'Runner.run',
            purpose: 'validate',
          }).error(`Template ${chalk.cyan(`"${templateName}"`)} does not support targets but the workflow entry declares targets. Skipping.`);

          hasPublishValidationError = true;
        }

        if (supportsScopes !== true && entryScopes.length > 0) {
          Logger.customize({
            name: 'Runner.run',
            purpose: 'validate',
          }).error(`Template ${chalk.cyan(`"${templateName}"`)} does not support scopes but the workflow entry declares scopes. Skipping.`);

          hasPublishValidationError = true;
        }

        if (hasPublishValidationError === true) {
          continue;
        }

        const configWorkspaces: Cli_Generate_Github_Workflows_Runner_Run_ConfigWorkspaces = (config['workspaces'] ?? {}) as Cli_Generate_Github_Workflows_Runner_Run_ConfigWorkspaces;
        const targetsMetadata: Cli_Generate_Github_Workflows_Runner_Run_TargetsMetadata = metadataEntry['targets'] ?? {};

        // Validate targets when the template supports them.
        if (supportsTargets === true && entryTargets.length > 0) {
          const targetTupleSet: Cli_Generate_Github_Workflows_Runner_Run_TargetTupleSet = new Set();

          for (const entryTarget of entryTargets) {
            const targetType: Cli_Generate_Github_Workflows_Runner_Run_TargetType = entryTarget['type'];
            const targetWorkingDir: Cli_Generate_Github_Workflows_Runner_Run_TargetWorkingDir = entryTarget['workingDir'];

            if (targetsMetadata[targetType] === undefined) {
              Logger.customize({
                name: 'Runner.run',
                purpose: 'validate',
              }).error(`Target type ${chalk.cyan(`"${targetType}"`)} is not supported by template ${chalk.cyan(`"${templateName}"`)}. Skipping.`);

              hasPublishValidationError = true;

              break;
            }

            const targetTupleKey: Cli_Generate_Github_Workflows_Runner_Run_TargetTupleKey = `${targetType}::${targetWorkingDir}`;

            if (targetTupleSet.has(targetTupleKey) === true) {
              Logger.customize({
                name: 'Runner.run',
                purpose: 'validate',
              }).error(`Duplicate target ${chalk.cyan(`"${targetType}"`)} at ${chalk.cyan(`"${targetWorkingDir}"`)}. Each target type and working directory pair must be unique. Skipping.`);

              hasPublishValidationError = true;

              break;
            }

            targetTupleSet.add(targetTupleKey);

            if (configWorkspaces[targetWorkingDir] === undefined) {
              Logger.customize({
                name: 'Runner.run',
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
        const resolvedWorkspaceNames: Cli_Generate_Github_Workflows_Runner_Run_ResolvedWorkspaceNames = [];

        if (supportsScopes === true && entryScopes.length > 0) {
          for (const entryScope of entryScopes) {
            const scopePath: Cli_Generate_Github_Workflows_Runner_Run_ScopePath = entryScope;
            const resolvedWorkspaceName: Cli_Generate_Github_Workflows_Runner_Run_ResolvedWorkspaceName = Runner.resolveWorkspaceName(configWorkspaces, scopePath);

            if (resolvedWorkspaceName === undefined) {
              Logger.customize({
                name: 'Runner.run',
                purpose: 'validate',
              }).error(`Scope ${chalk.cyan(`"${scopePath}"`)} is not a registered workspace. Skipping.`);

              hasPublishValidationError = true;

              break;
            }

            const resolvedName: Cli_Generate_Github_Workflows_Runner_Run_ResolvedName = resolvedWorkspaceName;

            resolvedWorkspaceNames.push(resolvedName);
          }
        }

        if (hasPublishValidationError === true) {
          continue;
        }

        // Compose publish-specific placeholders when the template supports targets.
        if (supportsTargets === true) {
          // Build check and build commands.
          const useTurbo: Cli_Generate_Github_Workflows_Runner_Run_UseTurbo = await Runner.detectTurbo(currentDirectory);
          const checkCommand: Cli_Generate_Github_Workflows_Runner_Run_CheckCommand = Runner.buildCommand('check', resolvedWorkspaceNames, useTurbo);
          const buildCommand: Cli_Generate_Github_Workflows_Runner_Run_BuildCommand = Runner.buildCommand('build', resolvedWorkspaceNames, useTurbo);

          content = content.replace('[__CHECK_COMMAND__]', checkCommand);
          content = content.replace('[__BUILD_COMMAND__]', buildCommand);

          // Build per-target upload-artifact steps when targets produce artifact paths.
          const uploadArtifactStep: Cli_Generate_Github_Workflows_Runner_Run_UploadArtifactStep = Runner.renderUploadArtifactSteps(entryTargets, targetsMetadata);

          content = content.replace('[__UPLOAD_ARTIFACT_STEP__]', uploadArtifactStep);

          // Compose target fragments into merged jobs map.
          const resolvedTargetFragments: Cli_Generate_Github_Workflows_Runner_Run_ResolvedTargetFragments = [];
          let hasTargetFragmentError: Cli_Generate_Github_Workflows_Runner_Run_HasTargetFragmentError = false;

          for (const entryTarget of entryTargets) {
            const currentEntryTarget: Cli_Generate_Github_Workflows_Runner_Run_CurrentEntryTarget = entryTarget;
            const fragmentTargetType: Cli_Generate_Github_Workflows_Runner_Run_FragmentTargetType = currentEntryTarget['type'];
            const fragmentTargetWorkingDir: Cli_Generate_Github_Workflows_Runner_Run_FragmentTargetWorkingDir = currentEntryTarget['workingDir'];
            const targetFragmentPath: Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentPath = join(templateDirPath, 'targets', `${fragmentTargetType}.yml`);
            const targetFragmentExists: Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentExists = await pathExists(targetFragmentPath);

            if (targetFragmentExists !== true) {
              Logger.customize({
                name: 'Runner.run',
                purpose: 'validate',
              }).error(`Target fragment ${chalk.cyan(`"${fragmentTargetType}.yml"`)} not found for template ${chalk.cyan(`"${templateName}"`)}. Skipping.`);

              hasTargetFragmentError = true;

              break;
            }

            let targetFragmentRawContent: Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentRawContent = '';

            try {
              targetFragmentRawContent = await fs.readFile(targetFragmentPath, 'utf-8');
            } catch {
              Logger.customize({
                name: 'Runner.run',
                purpose: 'read',
              }).error(`Failed to read target fragment ${chalk.cyan(`"${fragmentTargetType}.yml"`)}. Skipping.`);

              hasTargetFragmentError = true;

              break;
            }

            // Substitute target-specific placeholders before YAML parsing.
            const targetId: Cli_Generate_Github_Workflows_Runner_Run_TargetId = Runner.slugifyWorkingDir(fragmentTargetWorkingDir);
            let targetFragmentResolvedContent: Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentResolvedContent = targetFragmentRawContent;

            targetFragmentResolvedContent = targetFragmentResolvedContent.replaceAll('[__TARGET_ID__]', targetId);
            targetFragmentResolvedContent = targetFragmentResolvedContent.replaceAll('[__WORKING_DIR__]', fragmentTargetWorkingDir);

            const artifactName: Cli_Generate_Github_Workflows_Runner_Run_ArtifactName = Runner.buildArtifactName(fragmentTargetType, targetId);

            targetFragmentResolvedContent = targetFragmentResolvedContent.replaceAll('[__ARTIFACT_NAME__]', artifactName);

            // Build the needs list. Always starts with "build"; same-type target
            // workingDirs declared in `needs` are appended as job ids so the generated
            // workflow serializes nova -> preset, etc.
            const targetNeeds: Cli_Generate_Github_Workflows_Runner_Run_TargetNeeds = currentEntryTarget['needs'] ?? [];
            const targetNeedsJobIds: Cli_Generate_Github_Workflows_Runner_Run_TargetNeedsJobIds = targetNeeds.map(
              (targetNeedWorkingDir) => `publish-${fragmentTargetType}-${Runner.slugifyWorkingDir(targetNeedWorkingDir)}`,
            );
            const targetNeedsValue: Cli_Generate_Github_Workflows_Runner_Run_TargetNeedsValue = (targetNeedsJobIds.length === 0) ? '"build"' : `["build", ${targetNeedsJobIds.map((targetNeedsJobId) => `"${targetNeedsJobId}"`).join(', ')}]`;

            targetFragmentResolvedContent = targetFragmentResolvedContent.replace('[__NEEDS__]', targetNeedsValue);

            // Apply jobs-condition replacement at job-key-child indent (2 spaces).
            const targetJobsConditionLine: Cli_Generate_Github_Workflows_Runner_Run_TargetJobsConditionLine = (mergedJobsCondition !== '') ? `  if: "${mergedJobsCondition}"\n` : '';

            targetFragmentResolvedContent = targetFragmentResolvedContent.replace('[__JOBS_CONDITION__]\n', targetJobsConditionLine);

            // Resolve target-specific variables by merging template-level + target-level.
            const targetMetadata: Cli_Generate_Github_Workflows_Runner_Run_TargetMetadata = targetsMetadata[fragmentTargetType];
            const mergedVariables: Cli_Generate_Github_Workflows_Runner_Run_MergedVariables = {
              ...metadataEntry['variables'],
              ...(targetMetadata !== undefined) ? targetMetadata['variables'] : {},
            };

            targetFragmentResolvedContent = Runner.substituteVariables(
              targetFragmentResolvedContent,
              mergedVariables,
              entry['settings'],
            );

            // Validate fragment parses; discard result. We inject text, not parsed objects.
            try {
              parseYaml(targetFragmentResolvedContent);
            } catch {
              Logger.customize({
                name: 'Runner.run',
                purpose: 'validate',
              }).error(`Target fragment ${chalk.cyan(`"${fragmentTargetType}.yml"`)} produced invalid YAML. Skipping.`);

              hasTargetFragmentError = true;

              break;
            }

            // Indent every line by 2 spaces so the top-level job key sits under `jobs:`.
            const indentedLines: Cli_Generate_Github_Workflows_Runner_Run_IndentedLines = targetFragmentResolvedContent.split('\n').map(
              (line) => (line === '') ? '' : `  ${line}`,
            );
            const indentedFragment: Cli_Generate_Github_Workflows_Runner_Run_IndentedFragment = indentedLines.join('\n');

            resolvedTargetFragments.push(indentedFragment);
          }

          if (hasTargetFragmentError === true) {
            continue;
          }

          // Append target fragments directly to the base content (text-based injection
          // preserves multi-line block literals, unlike YAML re-serialization).
          if (resolvedTargetFragments.length > 0) {
            const appendedFragments: Cli_Generate_Github_Workflows_Runner_Run_AppendedFragments = resolvedTargetFragments.join('\n');

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
                name: 'Runner.run',
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
      const substituted: Cli_Generate_Github_Workflows_Runner_Run_Substituted = Runner.substituteVariables(
        content,
        metadataEntry['variables'],
        entry['settings'],
      );

      // Validate output YAML.
      try {
        parseYaml(substituted);
      } catch {
        Logger.customize({
          name: 'Runner.run',
          purpose: 'validate',
        }).error(`Generated YAML for ${chalk.cyan(`"${outputFileName}"`)} is invalid. Skipping.`);

        continue;
      }

      generatedSet.add(outputFileName);

      // Build setup instructions for non-auto secrets and vars (template + targets).
      const entrySetupLines: Cli_Generate_Github_Workflows_Runner_Run_EntrySetupLines = Runner.buildEntrySetupLines(entry, metadataEntry, outputFileName);

      setupLines.push(...entrySetupLines);

      if (isDryRun === true) {
        const displayPath: Cli_Generate_Github_Workflows_Runner_Run_DisplayPath = `.github/workflows/${outputFileName}`;

        Logger.customize({
          name: 'Runner.run',
          purpose: 'dry-run',
        }).info(`Would generate ${chalk.cyan(`"${displayPath}"`)}.`);

        continue;
      }

      const targetPath: Cli_Generate_Github_Workflows_Runner_Run_TargetPath = join(workflowsDirectory, outputFileName);

      await saveGeneratedFile(targetPath, substituted, isReplaceFile, {
        command: 'nova generate github workflows',
        docsSlug: 'cli/generators/github/workflows',
        mode: 'strict',
      });
    }

    // Clean up orphans.
    if (isDryRun !== true && await pathExists(workflowsDirectory) === true) {
      let existingEntries: Cli_Generate_Github_Workflows_Runner_Run_ExistingEntries = [];

      try {
        existingEntries = await fs.readdir(workflowsDirectory, { withFileTypes: true });
      } catch {
        /* empty */
      }

      for (const existingEntry of existingEntries) {
        const existingDirent: Cli_Generate_Github_Workflows_Runner_Run_ExistingDirent = existingEntry;

        if (existingDirent.isFile() !== true) {
          continue;
        }

        const isOrphan: Cli_Generate_Github_Workflows_Runner_Run_IsOrphan = existingDirent.name.startsWith('nova-') === true
          && existingDirent.name.endsWith('.yml') === true
          && generatedSet.has(existingDirent.name) === false;
        const isBackup: Cli_Generate_Github_Workflows_Runner_Run_IsBackup = existingDirent.name.includes('.nova-backup.') === true;

        if (isOrphan !== true || isBackup === true) {
          continue;
        }

        const orphanPath: Cli_Generate_Github_Workflows_Runner_Run_OrphanPath = join(workflowsDirectory, existingDirent.name);

        if (isReplaceFile === true) {
          await fs.unlink(orphanPath);

          Logger.customize({
            name: 'Runner.run',
            purpose: 'cleanup',
          }).info(`Deleted orphan ${chalk.cyan(`"${existingDirent.name}"`)}.`);
        } else {
          await renameFileWithDate(orphanPath);

          Logger.customize({
            name: 'Runner.run',
            purpose: 'cleanup',
          }).info(`Backed up orphan ${chalk.cyan(`"${existingDirent.name}"`)}.`);
        }
      }
    }

    // Print setup instructions.
    if (setupLines.length > 0) {
      const setupMessage: Cli_Generate_Github_Workflows_Runner_Run_SetupMessage = [
        'Setup:',
        setupLines.join('\n'),
      ].join('\n');

      Logger.customize({
        name: 'Runner.run',
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
   * @param {Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerDataList}        triggerDataList        - Trigger data list.
   * @param {Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_NeedsManuallyFallback}  needsManuallyFallback  - Needs manually fallback.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_Returns}
   *
   * @since 0.18.0
   */
  private static buildMergedRunName(triggerDataList: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerDataList, needsManuallyFallback: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_NeedsManuallyFallback): Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_Returns {
    const contextExpressions: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextExpressions = [];

    // Extract context expressions from each trigger's run-name.
    for (const triggerData of triggerDataList) {
      const contextMatch: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextMatch = triggerData['runName'].match(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_EXPRESSION);

      if (contextMatch === null) {
        continue;
      }

      const contextInner: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextInner = contextMatch[1] ?? '';
      const contextParts: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextParts = contextInner.split('||').map(
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
    const runNameMatch: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_RunNameMatch = (triggerDataList[0] ?? { runName: '' })['runName'].match(LIB_REGEX_PATTERN_WORKFLOW_RUN_NAME_CAPTURE);
    const runNamePrefix: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_RunNamePrefix = (runNameMatch !== null && runNameMatch[1] !== undefined) ? runNameMatch[1] : '';
    const runNameSuffix: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_RunNameSuffix = (runNameMatch !== null && runNameMatch[2] !== undefined) ? runNameMatch[2] : '';

    // Reconstruct the merged run-name. Skip the 'manually' fallback when the
    // template opts out via metadata, or when a trigger already supplies an
    // empty-string fallback (appending would wrongly produce "manually" for
    // events like schedule where the earlier expression evaluates to '').
    const hasEmptyFallback: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_HasEmptyFallback = contextExpressions.includes('\'\'') || contextExpressions.includes('""');
    const shouldAppendFallback: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ShouldAppendFallback = needsManuallyFallback === true && hasEmptyFallback === false;
    const contextExpressionsWithFallback: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextExpressionsWithFallback = (shouldAppendFallback === true) ? [
      ...contextExpressions,
      '\'manually\'',
    ] : contextExpressions;
    const mergedContextExpression: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_MergedContextExpression = contextExpressionsWithFallback.join(' || ');

    return `${runNamePrefix}\${{ ${mergedContextExpression} }}${runNameSuffix}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Build Merged Publish Condition.
   *
   * Combines publish conditions from multiple triggers into a single
   * expression with OR logic, preserving the workflow_dispatch fallback.
   *
   * @param {Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerDataList} triggerDataList - Trigger data list.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_Returns}
   *
   * @since 0.18.0
   */
  private static buildMergedPublishCondition(triggerDataList: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerDataList): Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_Returns {
    const nonDispatchParts: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_NonDispatchParts = [];
    let dispatchPart: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_DispatchPart = '';

    for (const triggerData of triggerDataList) {
      // Strip the ${{ and }} wrapper.
      const publishInner: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_PublishInner = triggerData['publishCondition'].replace(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_START, '').replace(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_END, '');

      // Split on top-level ||.
      const publishParts: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_PublishParts = publishInner.split(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_SEPARATOR);

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
    const allParts: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_AllParts = [...nonDispatchParts];

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
   * @param {Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerDataList} triggerDataList - Trigger data list.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_Returns}
   *
   * @since 0.18.0
   */
  private static buildMergedJobsCondition(triggerDataList: Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerDataList): Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_Returns {
    // Find the first trigger with a jobs-condition.
    for (const triggerData of triggerDataList) {
      if (triggerData['jobsCondition'] !== undefined) {
        // Strip the ${{ and }} wrapper.
        const jobsConditionLine: Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_JobsConditionLine = triggerData['jobsCondition'].replace(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_START, '').replace(LIB_REGEX_PATTERN_WORKFLOW_CONTEXT_WRAPPER_END, '');

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
   * @param {Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Workflows} workflows - Workflows.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Returns}
   *
   * @since 0.18.0
   */
  private static detectCircularDependsOn(workflows: Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Workflows): Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Returns {
    for (const entry of workflows) {
      if (entry['depends-on'] === undefined || entry['depends-on'].length === 0) {
        continue;
      }

      const entryKey: Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_EntryKey = (entry['suffix'] !== undefined) ? `${entry['template']}-${entry['suffix']}` : entry['template'];
      const visited: Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Visited = new Set();

      visited.add(entryKey);

      const queue: Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Queue = [...entry['depends-on']];

      while (queue.length > 0) {
        const currentId: Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_CurrentId = queue.shift()!;

        if (visited.has(currentId) === true) {
          return true;
        }

        visited.add(currentId);

        const currentEntry: Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_CurrentEntry = workflows.find((w) => {
          const key: Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Key = (w['suffix'] !== undefined) ? `${w['template']}-${w['suffix']}` : w['template'];

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
   * @param {Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Entry}          entry          - Entry.
   * @param {Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_MetadataEntry}  metadataEntry  - Metadata entry.
   * @param {Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_OutputFileName} outputFileName - Output file name.
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Returns}
   *
   * @since 0.16.2
   */
  public static buildEntrySetupLines(entry: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Entry, metadataEntry: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_MetadataEntry, outputFileName: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_OutputFileName): Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Returns {
    const lines: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Lines = [];

    if (metadataEntry === undefined) {
      return lines;
    }

    // Template-level non-auto secrets and vars.
    for (const variableEntry of Object.entries(metadataEntry['variables'])) {
      const variableName: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_VariableName = variableEntry[0];
      const variableMeta: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_VariableMeta = variableEntry[1];

      if (variableMeta['auto'] === true) {
        continue;
      }

      if (variableMeta['format'] === 'secret') {
        const secretResolvedName: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_SecretResolvedName = (entry['settings'] !== undefined && entry['settings'][variableName] !== undefined) ? entry['settings'][variableName] : (variableMeta['default'] ?? variableName);

        lines.push(` - ${chalk.cyan(outputFileName)}: Secret ${chalk.yellow(secretResolvedName)}`);
      }

      if (variableMeta['format'] === 'var') {
        const varResolvedName: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_VarResolvedName = (entry['settings'] !== undefined && entry['settings'][variableName] !== undefined) ? entry['settings'][variableName] : (variableMeta['default'] ?? variableName);

        lines.push(` - ${chalk.cyan(outputFileName)}: Variable ${chalk.yellow(varResolvedName)}`);
      }
    }

    // Target-level non-auto secrets and vars (for templates with targets).
    if (entry['targets'] !== undefined && metadataEntry['targets'] !== undefined) {
      const entryTargetsMetadata: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_EntryTargetsMetadata = metadataEntry['targets'];

      for (const setupTarget of entry['targets']) {
        const setupTargetType: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_SetupTargetType = setupTarget['type'];
        const setupTargetMetadata: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_SetupTargetMetadata = entryTargetsMetadata[setupTargetType];

        if (setupTargetMetadata === undefined) {
          continue;
        }

        for (const targetVariableEntry of Object.entries(setupTargetMetadata['variables'])) {
          const targetVariableName: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetVariableName = targetVariableEntry[0];
          const targetVariableMeta: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetVariableMeta = targetVariableEntry[1];

          if (targetVariableMeta['auto'] === true) {
            continue;
          }

          if (targetVariableMeta['format'] === 'secret') {
            const targetSecretResolvedName: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetSecretResolvedName = (entry['settings'] !== undefined && entry['settings'][targetVariableName] !== undefined) ? entry['settings'][targetVariableName] : (targetVariableMeta['default'] ?? targetVariableName);

            lines.push(` - ${chalk.cyan(outputFileName)}: Secret ${chalk.yellow(targetSecretResolvedName)}`);
          }

          if (targetVariableMeta['format'] === 'var') {
            const targetVarResolvedName: Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetVarResolvedName = (entry['settings'] !== undefined && entry['settings'][targetVariableName] !== undefined) ? entry['settings'][targetVariableName] : (targetVariableMeta['default'] ?? targetVariableName);

            lines.push(` - ${chalk.cyan(outputFileName)}: Variable ${chalk.yellow(targetVarResolvedName)}`);
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
   * @param {Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Content}   content   - Content.
   * @param {Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Variables} variables - Variables.
   * @param {Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Settings}  settings  - Settings.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Returns}
   *
   * @since 0.18.0
   */
  private static substituteVariables(content: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Content, variables: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Variables, settings: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Settings): Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Returns {
    let result: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Result = content;

    for (const variableEntry of Object.entries(variables)) {
      const variableName: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VariableName = variableEntry[0];
      const variableMeta: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VariableMeta = variableEntry[1];

      const regex: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Regex = new RegExp(`\\$\\{\\{\\s*(?:secrets|vars)\\.${variableName}\\s*\\}\\}`, 'g');
      const settingValue: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_SettingValue = (settings !== undefined && settings[variableName] !== undefined) ? settings[variableName] : undefined;

      if (variableMeta['format'] === 'secret') {
        const secretResolvedName: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_SecretResolvedName = settingValue
          ?? variableMeta['default']
          ?? variableName;
        const secretReplacement: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_SecretReplacement = `\${{ secrets.${secretResolvedName} }}`;

        result = result.replace(regex, secretReplacement);
      }

      if (variableMeta['format'] === 'var') {
        const varResolvedName: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VarResolvedName = settingValue
          ?? variableMeta['default']
          ?? variableName;
        const varReplacement: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VarReplacement = `\${{ vars.${varResolvedName} }}`;

        result = result.replace(regex, varReplacement);
      }

      if (variableMeta['format'] === 'literal') {
        const literalReplacement: Cli_Generate_Github_Workflows_Runner_SubstituteVariables_LiteralReplacement = (settingValue ?? '').replaceAll('\n', '\\n');

        result = result.replace(regex, () => literalReplacement);
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
   * @param {Cli_Generate_Github_Workflows_Runner_BuildArtifactName_TargetType} targetType - Target type.
   * @param {Cli_Generate_Github_Workflows_Runner_BuildArtifactName_TargetId}   targetId   - Target id.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_BuildArtifactName_Returns}
   *
   * @since 0.16.0
   */
  public static buildArtifactName(targetType: Cli_Generate_Github_Workflows_Runner_BuildArtifactName_TargetType, targetId: Cli_Generate_Github_Workflows_Runner_BuildArtifactName_TargetId): Cli_Generate_Github_Workflows_Runner_BuildArtifactName_Returns {
    return `build-${targetType}-${targetId}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Slugify Working Dir.
   *
   * Strips the leading `./` prefix and trailing `/` suffix from a workspace
   * path, then replaces remaining `/` separators with `-` to produce a slug
   * safe for GitHub Actions job names. Returns `"root"` for empty strings.
   *
   * @param {Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Input} input - Input.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Returns}
   *
   * @since 0.16.0
   */
  public static slugifyWorkingDir(input: Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Input): Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Returns {
    const trimmed: Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Trimmed = input
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
   * @param {Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Workspaces} workspaces - Workspaces.
   * @param {Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Path}       path       - Path.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Returns}
   *
   * @since 0.16.0
   */
  public static resolveWorkspaceName(workspaces: Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Workspaces, path: Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Path): Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Returns {
    const entry: Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Entry = workspaces[path];

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
   * @param {Cli_Generate_Github_Workflows_Runner_DetectTurbo_ProjectDirectory} projectDirectory - Project directory.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_DetectTurbo_Returns}
   *
   * @since 0.16.0
   */
  public static async detectTurbo(projectDirectory: Cli_Generate_Github_Workflows_Runner_DetectTurbo_ProjectDirectory): Cli_Generate_Github_Workflows_Runner_DetectTurbo_Returns {
    const turboConfigPath: Cli_Generate_Github_Workflows_Runner_DetectTurbo_TurboConfigPath = join(projectDirectory, 'turbo.json');

    return pathExists(turboConfigPath);
  }

  /**
   * CLI - Generate - GitHub - Workflows - Build Command.
   *
   * Emits the shell command string for a "check" or "build" step. When
   * `useTurbo` is true, generates a `npx turbo run` invocation with filter
   * flags; otherwise generates an `npm run` invocation with `-w` flags.
   *
   * @param {Cli_Generate_Github_Workflows_Runner_BuildCommand_ScriptName}     scriptName     - Script name.
   * @param {Cli_Generate_Github_Workflows_Runner_BuildCommand_WorkspaceNames} workspaceNames - Workspace names.
   * @param {Cli_Generate_Github_Workflows_Runner_BuildCommand_UseTurbo}       useTurbo       - Use turbo.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_BuildCommand_Returns}
   *
   * @since 0.16.0
   */
  public static buildCommand(scriptName: Cli_Generate_Github_Workflows_Runner_BuildCommand_ScriptName, workspaceNames: Cli_Generate_Github_Workflows_Runner_BuildCommand_WorkspaceNames, useTurbo: Cli_Generate_Github_Workflows_Runner_BuildCommand_UseTurbo): Cli_Generate_Github_Workflows_Runner_BuildCommand_Returns {
    if (useTurbo === true) {
      const turboFlags: Cli_Generate_Github_Workflows_Runner_BuildCommand_TurboFlags = workspaceNames.map(
        (name) => `--filter=${name}`,
      );

      return `npx turbo run ${scriptName} ${turboFlags.join(' ')} --concurrency=2`;
    }

    const npmFlags: Cli_Generate_Github_Workflows_Runner_BuildCommand_NpmFlags = workspaceNames.map(
      (name) => `-w ${name}`,
    );

    return `npm run ${scriptName} ${npmFlags.join(' ')}`;
  }

  /**
   * CLI - Generate - GitHub - Workflows - Render Upload Artifact Steps.
   *
   * Emits one upload-artifact step per target with a non-empty
   * artifactPaths metadata. Each step has a unique artifact name keyed by
   * targetType + slugified workingDir so publish jobs can fetch only their own.
   *
   * @param {Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Targets}         targets         - Targets.
   * @param {Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetsMetadata} targetsMetadata - Targets metadata.
   *
   * @private
   *
   * @returns {Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Returns}
   *
   * @since 0.16.0
   */
  public static renderUploadArtifactSteps(targets: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Targets, targetsMetadata: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetsMetadata): Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Returns {
    const steps: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Steps = [];

    for (const target of targets) {
      const metadata: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Metadata = targetsMetadata[target['type']];

      if (metadata === undefined) {
        continue;
      }

      if (metadata['artifactPaths'].length === 0) {
        continue;
      }

      const strippedDir: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_StrippedDir = target['workingDir'].replace(LIB_REGEX_PATTERN_LEADING_DOT_SLASH, '');
      const targetId: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetId = Runner.slugifyWorkingDir(target['workingDir']);
      const artifactName: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_ArtifactName = Runner.buildArtifactName(target['type'], targetId);

      const pathLines: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_PathLines = metadata['artifactPaths'].map(
        (template) => `            ${template.replaceAll('{workingDir}', strippedDir)}`,
      );

      const stepLines: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_StepLines = [
        `      - name: "Upload build artifacts (${target['type']}/${targetId})"`,
        '        uses: "actions/upload-artifact@v7"',
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
