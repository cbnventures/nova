import type { SharedGeneratorRunResult } from '../../../shared.d.ts';

/**
 * CLI - Generate - GitHub - Workflows - Build Command.
 *
 * @since 0.16.0
 */
export type CliGenerateGithubWorkflowsBuildCommandScriptName = 'check' | 'build';

export type CliGenerateGithubWorkflowsBuildCommandWorkspaceNames = string[];

export type CliGenerateGithubWorkflowsBuildCommandUseTurbo = boolean;

export type CliGenerateGithubWorkflowsBuildCommandReturns = string;

export type CliGenerateGithubWorkflowsBuildCommandFlag = string;

export type CliGenerateGithubWorkflowsBuildCommandFlags = CliGenerateGithubWorkflowsBuildCommandFlag[];

/**
 * CLI - Generate - GitHub - Workflows - Build Merged Jobs Condition.
 *
 * @since 0.21.0
 */
export type CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataList = CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerData[];

export type CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataRunName = string;

export type CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataPublishCondition = string;

export type CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataTriggerBlock = Record<string, unknown>;

export type CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataDependsOn = boolean | undefined;

export type CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataJobsCondition = string | undefined;

export type CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerData = {
  runName: CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataRunName;
  publishCondition: CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataPublishCondition;
  triggerBlock: CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataTriggerBlock;
  dependsOn: CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataDependsOn;
  jobsCondition: CliGenerateGithubWorkflowsBuildMergedJobsConditionTriggerDataJobsCondition;
};

export type CliGenerateGithubWorkflowsBuildMergedJobsConditionReturns = string;

export type CliGenerateGithubWorkflowsBuildMergedJobsConditionJobsConditionLine = string;

/**
 * CLI - Generate - GitHub - Workflows - Build Merged Publish Condition.
 *
 * @since 0.21.0
 */
export type CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataList = CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerData[];

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataRunName = string;

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataPublishCondition = string;

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataTriggerBlock = Record<string, unknown>;

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataDependsOn = boolean | undefined;

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataJobsCondition = string | undefined;

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerData = {
  runName: CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataRunName;
  publishCondition: CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataPublishCondition;
  triggerBlock: CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataTriggerBlock;
  dependsOn: CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataDependsOn;
  jobsCondition: CliGenerateGithubWorkflowsBuildMergedPublishConditionTriggerDataJobsCondition;
};

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionReturns = string;

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionNonDispatchParts = string[];

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionDispatchPart = string;

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionPublishInner = string;

export type CliGenerateGithubWorkflowsBuildMergedPublishConditionPublishParts = string[];

/**
 * CLI - Generate - GitHub - Workflows - Build Merged Run Name.
 *
 * @since 0.21.0
 */
export type CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataList = CliGenerateGithubWorkflowsBuildMergedRunNameTriggerData[];

export type CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataRunName = string;

export type CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataPublishCondition = string;

export type CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataTriggerBlock = Record<string, unknown>;

export type CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataDependsOn = boolean | undefined;

export type CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataJobsCondition = string | undefined;

export type CliGenerateGithubWorkflowsBuildMergedRunNameTriggerData = {
  runName: CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataRunName;
  publishCondition: CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataPublishCondition;
  triggerBlock: CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataTriggerBlock;
  dependsOn: CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataDependsOn;
  jobsCondition: CliGenerateGithubWorkflowsBuildMergedRunNameTriggerDataJobsCondition;
};

export type CliGenerateGithubWorkflowsBuildMergedRunNameNeedsManuallyFallback = boolean;

export type CliGenerateGithubWorkflowsBuildMergedRunNameReturns = string;

export type CliGenerateGithubWorkflowsBuildMergedRunNameContextExpressions = string[];

export type CliGenerateGithubWorkflowsBuildMergedRunNameContextMatch = RegExpMatchArray | null;

export type CliGenerateGithubWorkflowsBuildMergedRunNameContextInner = string;

export type CliGenerateGithubWorkflowsBuildMergedRunNameContextParts = string[];

export type CliGenerateGithubWorkflowsBuildMergedRunNameRunNameMatch = RegExpMatchArray | null;

export type CliGenerateGithubWorkflowsBuildMergedRunNameRunNamePrefix = string;

export type CliGenerateGithubWorkflowsBuildMergedRunNameRunNameSuffix = string;

export type CliGenerateGithubWorkflowsBuildMergedRunNameHasEmptyFallback = boolean;

export type CliGenerateGithubWorkflowsBuildMergedRunNameShouldAppendFallback = boolean;

export type CliGenerateGithubWorkflowsBuildMergedRunNameMergedContextExpression = string;

/**
 * CLI - Generate - GitHub - Workflows - Detect Circular Depends On.
 *
 * @since 0.21.0
 */
export type CliGenerateGithubWorkflowsDetectCircularDependsOnWorkflows = import('../../../shared.d.ts').SharedNovaConfigWorkflow[];

export type CliGenerateGithubWorkflowsDetectCircularDependsOnReturns = boolean;

export type CliGenerateGithubWorkflowsDetectCircularDependsOnEntryKey = string;

export type CliGenerateGithubWorkflowsDetectCircularDependsOnVisited = Set<string>;

export type CliGenerateGithubWorkflowsDetectCircularDependsOnQueue = string[];

export type CliGenerateGithubWorkflowsDetectCircularDependsOnCurrentId = string;

export type CliGenerateGithubWorkflowsDetectCircularDependsOnCurrentEntry = import('../../../shared.d.ts').SharedNovaConfigWorkflow | undefined;

export type CliGenerateGithubWorkflowsDetectCircularDependsOnKey = string;

/**
 * CLI - Generate - GitHub - Workflows - Detect Turbo.
 *
 * @since 0.16.0
 */
export type CliGenerateGithubWorkflowsDetectTurboProjectDirectory = string;

export type CliGenerateGithubWorkflowsDetectTurboReturns = Promise<boolean>;

export type CliGenerateGithubWorkflowsDetectTurboTurboConfigPath = string;

/**
 * CLI - Generate - GitHub - Workflows - Render Artifact Paths.
 *
 * @since 0.16.0
 */
export type CliGenerateGithubWorkflowsRenderArtifactPathsTargets = CliGenerateGithubWorkflowsRenderArtifactPathsTargetEntry[];

export type CliGenerateGithubWorkflowsRenderArtifactPathsTargetMetadataEntryArtifactPath = string;

export type CliGenerateGithubWorkflowsRenderArtifactPathsTargetMetadataEntryArtifactPaths = CliGenerateGithubWorkflowsRenderArtifactPathsTargetMetadataEntryArtifactPath[];

export type CliGenerateGithubWorkflowsRenderArtifactPathsTargetMetadataEntry = {
  artifactPaths: CliGenerateGithubWorkflowsRenderArtifactPathsTargetMetadataEntryArtifactPaths;
};

export type CliGenerateGithubWorkflowsRenderArtifactPathsTargetMetadata = Record<string, CliGenerateGithubWorkflowsRenderArtifactPathsTargetMetadataEntry>;

export type CliGenerateGithubWorkflowsRenderArtifactPathsReturns = string;

export type CliGenerateGithubWorkflowsRenderArtifactPathsSeen = Set<string>;

export type CliGenerateGithubWorkflowsRenderArtifactPathsPaths = CliGenerateGithubWorkflowsRenderArtifactPathsPath[];

export type CliGenerateGithubWorkflowsRenderArtifactPathsTargetEntryType = string;

export type CliGenerateGithubWorkflowsRenderArtifactPathsTargetEntryWorkingDir = string;

export type CliGenerateGithubWorkflowsRenderArtifactPathsTargetEntry = {
  type: CliGenerateGithubWorkflowsRenderArtifactPathsTargetEntryType;
  workingDir: CliGenerateGithubWorkflowsRenderArtifactPathsTargetEntryWorkingDir;
};

export type CliGenerateGithubWorkflowsRenderArtifactPathsMetadata = CliGenerateGithubWorkflowsRenderArtifactPathsTargetMetadataEntry | undefined;

export type CliGenerateGithubWorkflowsRenderArtifactPathsPath = string;

export type CliGenerateGithubWorkflowsRenderArtifactPathsLines = string[];

/**
 * CLI - Generate - GitHub - Workflows - Resolve Workspace Name.
 *
 * @since 0.16.0
 */
export type CliGenerateGithubWorkflowsResolveWorkspaceNameWorkspacesEntry = {
  name?: string;
};

export type CliGenerateGithubWorkflowsResolveWorkspaceNameWorkspaces = Record<string, CliGenerateGithubWorkflowsResolveWorkspaceNameWorkspacesEntry>;

export type CliGenerateGithubWorkflowsResolveWorkspaceNameReturns = string | undefined;

export type CliGenerateGithubWorkflowsResolveWorkspaceNamePath = string;

export type CliGenerateGithubWorkflowsResolveWorkspaceNameEntry = CliGenerateGithubWorkflowsResolveWorkspaceNameWorkspacesEntry | undefined;

/**
 * CLI - Generate - GitHub - Workflows - Run.
 *
 * @since 0.15.0
 */
export type CliGenerateGithubWorkflowsRunOptionsDryRun = true;

export type CliGenerateGithubWorkflowsRunOptionsReplaceFile = true;

export type CliGenerateGithubWorkflowsRunOptions = {
  dryRun?: CliGenerateGithubWorkflowsRunOptionsDryRun;
  replaceFile?: CliGenerateGithubWorkflowsRunOptionsReplaceFile;
};

export type CliGenerateGithubWorkflowsRunReturns = Promise<SharedGeneratorRunResult>;

export type CliGenerateGithubWorkflowsRunCurrentDirectory = string;

export type CliGenerateGithubWorkflowsRunIsAtProjectRoot = boolean;

export type CliGenerateGithubWorkflowsRunIsDryRun = boolean;

export type CliGenerateGithubWorkflowsRunIsReplaceFile = boolean;

export type CliGenerateGithubWorkflowsRunReplaceFileNotice = string;

export type CliGenerateGithubWorkflowsRunConfig = Record<string, unknown>;

export type CliGenerateGithubWorkflowsRunWorkflows = import('../../../shared.d.ts').SharedNovaConfigWorkflow[] | undefined;

export type CliGenerateGithubWorkflowsRunTemplateDirectory = string;

export type CliGenerateGithubWorkflowsRunWorkflowsDirectory = string;

export type CliGenerateGithubWorkflowsRunDuplicateSet = Set<string>;

export type CliGenerateGithubWorkflowsRunHasDuplicateError = boolean;

export type CliGenerateGithubWorkflowsRunDuplicateKey = string;

export type CliGenerateGithubWorkflowsRunGeneratedSet = Set<string>;

export type CliGenerateGithubWorkflowsRunOutputFileNames = Set<string>;

export type CliGenerateGithubWorkflowsRunSetupLines = string[];

export type CliGenerateGithubWorkflowsRunWorkflowEntry = import('../../../shared.d.ts').SharedNovaConfigWorkflow;

export type CliGenerateGithubWorkflowsRunTemplateName = string;

export type CliGenerateGithubWorkflowsRunMetadataEntry = import('../../../lib/workflow-templates.d.ts').LibWorkflowTemplatesEntry | undefined;

export type CliGenerateGithubWorkflowsRunTemplateDirPath = string;

export type CliGenerateGithubWorkflowsRunTemplateDirExists = boolean;

export type CliGenerateGithubWorkflowsRunMissingLiterals = string[];

export type CliGenerateGithubWorkflowsRunVariableName = string;

export type CliGenerateGithubWorkflowsRunVariableMeta = import('../../../lib/workflow-templates.d.ts').LibWorkflowTemplatesVariable;

export type CliGenerateGithubWorkflowsRunWorkflowSuffix = string | undefined;

export type CliGenerateGithubWorkflowsRunOutputFileName = string;

export type CliGenerateGithubWorkflowsRunBasePath = string;

export type CliGenerateGithubWorkflowsRunBaseContent = string | undefined;

export type CliGenerateGithubWorkflowsRunHasTriggers = boolean;

export type CliGenerateGithubWorkflowsRunContent = string;

export type CliGenerateGithubWorkflowsRunTriggers = import('../../../shared.d.ts').SharedNovaConfigWorkflowTrigger[];

export type CliGenerateGithubWorkflowsRunHasTriggerError = boolean;

export type CliGenerateGithubWorkflowsRunTriggerDataList = CliGenerateGithubWorkflowsRunTriggerData[];

export type CliGenerateGithubWorkflowsRunTriggerFileName = string;

export type CliGenerateGithubWorkflowsRunTriggerFilePath = string;

export type CliGenerateGithubWorkflowsRunTriggerFileExists = boolean;

export type CliGenerateGithubWorkflowsRunTriggerRawContent = string;

export type CliGenerateGithubWorkflowsRunTriggerParsed = Record<string, unknown>;

export type CliGenerateGithubWorkflowsRunTriggerParsedRunName = string;

export type CliGenerateGithubWorkflowsRunTriggerParsedPublishCondition = string;

export type CliGenerateGithubWorkflowsRunTriggerParsedTriggerBlock = Record<string, unknown>;

export type CliGenerateGithubWorkflowsRunTriggerParsedDependsOn = boolean | undefined;

export type CliGenerateGithubWorkflowsRunTriggerParsedJobsCondition = string | undefined;

export type CliGenerateGithubWorkflowsRunTriggerDataRunName = CliGenerateGithubWorkflowsRunTriggerParsedRunName;

export type CliGenerateGithubWorkflowsRunTriggerDataPublishCondition = CliGenerateGithubWorkflowsRunTriggerParsedPublishCondition;

export type CliGenerateGithubWorkflowsRunTriggerDataTriggerBlock = CliGenerateGithubWorkflowsRunTriggerParsedTriggerBlock;

export type CliGenerateGithubWorkflowsRunTriggerDataDependsOn = CliGenerateGithubWorkflowsRunTriggerParsedDependsOn;

export type CliGenerateGithubWorkflowsRunTriggerDataJobsCondition = CliGenerateGithubWorkflowsRunTriggerParsedJobsCondition;

export type CliGenerateGithubWorkflowsRunTriggerData = {
  runName: CliGenerateGithubWorkflowsRunTriggerDataRunName;
  publishCondition: CliGenerateGithubWorkflowsRunTriggerDataPublishCondition;
  triggerBlock: CliGenerateGithubWorkflowsRunTriggerDataTriggerBlock;
  dependsOn: CliGenerateGithubWorkflowsRunTriggerDataDependsOn;
  jobsCondition: CliGenerateGithubWorkflowsRunTriggerDataJobsCondition;
};

export type CliGenerateGithubWorkflowsRunNeedsDependsOn = boolean;

export type CliGenerateGithubWorkflowsRunDependsOnEntries = string[];

export type CliGenerateGithubWorkflowsRunEntryLabel = string;

export type CliGenerateGithubWorkflowsRunDependsOnResolvedNames = string[];

export type CliGenerateGithubWorkflowsRunHasDependsOnError = boolean;

export type CliGenerateGithubWorkflowsRunDependsOnEntry = string;

export type CliGenerateGithubWorkflowsRunDependsOnTarget = import('../../../shared.d.ts').SharedNovaConfigWorkflow | undefined;

export type CliGenerateGithubWorkflowsRunDependsOnTargetKey = string;

export type CliGenerateGithubWorkflowsRunDependsOnBasePath = string;

export type CliGenerateGithubWorkflowsRunDependsOnWorkflowName = string;

export type CliGenerateGithubWorkflowsRunDependsOnBaseContent = string;

export type CliGenerateGithubWorkflowsRunDependsOnNameMatch = RegExpExecArray | null;

export type CliGenerateGithubWorkflowsRunDependsOnTargetSuffix = string;

export type CliGenerateGithubWorkflowsRunDependsOnYamlArray = string;

export type CliGenerateGithubWorkflowsRunTriggerYaml = string;

export type CliGenerateGithubWorkflowsRunMergedTriggerBlock = Record<string, unknown>;

export type CliGenerateGithubWorkflowsRunIndentedTriggerLines = string[];

export type CliGenerateGithubWorkflowsRunIndentedTriggerYaml = string;

export type CliGenerateGithubWorkflowsRunNeedsManuallyFallback = boolean;

export type CliGenerateGithubWorkflowsRunMergedRunName = string;

export type CliGenerateGithubWorkflowsRunMergedPublishCondition = string;

export type CliGenerateGithubWorkflowsRunMergedJobsCondition = string;

export type CliGenerateGithubWorkflowsRunJobsConditionLine = string;

export type CliGenerateGithubWorkflowsRunSupportsScopes = boolean;

export type CliGenerateGithubWorkflowsRunSupportsTargets = boolean;

export type CliGenerateGithubWorkflowsRunEntryScopes = import('../../../shared.d.ts').SharedNovaConfigWorkflowScopes;

export type CliGenerateGithubWorkflowsRunEntryTargets = import('../../../shared.d.ts').SharedNovaConfigWorkflowTargets;

export type CliGenerateGithubWorkflowsRunHasPublishValidationError = boolean;

export type CliGenerateGithubWorkflowsRunTargetsMetadata = import('../../../lib/workflow-templates.d.ts').LibWorkflowTemplatesTargets;

export type CliGenerateGithubWorkflowsRunTargetTupleSet = Set<string>;

export type CliGenerateGithubWorkflowsRunTargetType = string;

export type CliGenerateGithubWorkflowsRunTargetWorkingDir = string;

export type CliGenerateGithubWorkflowsRunTargetTupleKey = string;

export type CliGenerateGithubWorkflowsRunResolvedWorkspaceNames = string[];

export type CliGenerateGithubWorkflowsRunEntryScope = import('../../../shared.d.ts').SharedNovaConfigWorkflowScope;

export type CliGenerateGithubWorkflowsRunResolvedWorkspaceName = string;

export type CliGenerateGithubWorkflowsRunUseTurbo = boolean;

export type CliGenerateGithubWorkflowsRunCheckCommand = string;

export type CliGenerateGithubWorkflowsRunBuildCommand = string;

export type CliGenerateGithubWorkflowsRunArtifactPathsBlock = string;

export type CliGenerateGithubWorkflowsRunUploadArtifactStep = string;

export type CliGenerateGithubWorkflowsRunUploadArtifactStepLines = string[];

export type CliGenerateGithubWorkflowsRunResolvedTargetFragment = string;

export type CliGenerateGithubWorkflowsRunResolvedTargetFragments = CliGenerateGithubWorkflowsRunResolvedTargetFragment[];

export type CliGenerateGithubWorkflowsRunEntryTarget = import('../../../shared.d.ts').SharedNovaConfigWorkflowTarget;

export type CliGenerateGithubWorkflowsRunTargetFragmentPath = string;

export type CliGenerateGithubWorkflowsRunTargetFragmentExists = boolean;

export type CliGenerateGithubWorkflowsRunTargetFragmentRawContent = string;

export type CliGenerateGithubWorkflowsRunTargetId = string;

export type CliGenerateGithubWorkflowsRunTargetFragmentResolvedContent = string;

export type CliGenerateGithubWorkflowsRunTargetNeeds = import('../../../shared.d.ts').SharedNovaConfigWorkflowTargetNeeds;

export type CliGenerateGithubWorkflowsRunTargetNeedsJobIds = CliGenerateGithubWorkflowsRunTargetNeedsJobId[];

export type CliGenerateGithubWorkflowsRunTargetNeedWorkingDir = string;

export type CliGenerateGithubWorkflowsRunTargetNeedsJobId = string;

export type CliGenerateGithubWorkflowsRunTargetNeedsValue = string;

export type CliGenerateGithubWorkflowsRunTargetJobsConditionLine = string;

export type CliGenerateGithubWorkflowsRunTargetMetadata = import('../../../lib/workflow-templates.d.ts').LibWorkflowTemplatesTarget | undefined;

export type CliGenerateGithubWorkflowsRunMergedVariables = import('../../../lib/workflow-templates.d.ts').LibWorkflowTemplatesVariables;

export type CliGenerateGithubWorkflowsRunIndentedFragmentLines = string[];

export type CliGenerateGithubWorkflowsRunIndentedFragment = string;

export type CliGenerateGithubWorkflowsRunAppendedFragments = string;

export type CliGenerateGithubWorkflowsRunSubstituted = string;

export type CliGenerateGithubWorkflowsRunResolvedName = string;

export type CliGenerateGithubWorkflowsRunDisplayPath = string;

export type CliGenerateGithubWorkflowsRunTargetPath = string;

export type CliGenerateGithubWorkflowsRunExistingEntries = import('fs').Dirent[];

export type CliGenerateGithubWorkflowsRunExistingEntry = import('fs').Dirent;

export type CliGenerateGithubWorkflowsRunIsOrphan = boolean;

export type CliGenerateGithubWorkflowsRunIsBackup = boolean;

export type CliGenerateGithubWorkflowsRunOrphanPath = string;

export type CliGenerateGithubWorkflowsRunSetupMessage = string;

/**
 * CLI - Generate - GitHub - Workflows - Slugify Working Dir.
 *
 * @since 0.16.0
 */
export type CliGenerateGithubWorkflowsSlugifyWorkingDirInput = string;

export type CliGenerateGithubWorkflowsSlugifyWorkingDirReturns = string;

export type CliGenerateGithubWorkflowsSlugifyWorkingDirTrimmed = string;

/**
 * CLI - Generate - GitHub - Workflows - Substitute Variables.
 *
 * @since 0.20.0
 */
export type CliGenerateGithubWorkflowsSubstituteVariablesContent = string;

export type CliGenerateGithubWorkflowsSubstituteVariablesVariables = import('../../../lib/workflow-templates.d.ts').LibWorkflowTemplatesVariables;

export type CliGenerateGithubWorkflowsSubstituteVariablesSettings = import('../../../shared.d.ts').SharedNovaConfigWorkflowSettings | undefined;

export type CliGenerateGithubWorkflowsSubstituteVariablesReturns = string;

export type CliGenerateGithubWorkflowsSubstituteVariablesResult = string;

export type CliGenerateGithubWorkflowsSubstituteVariablesVariableName = string;

export type CliGenerateGithubWorkflowsSubstituteVariablesVariableMeta = import('../../../lib/workflow-templates.d.ts').LibWorkflowTemplatesVariable;

export type CliGenerateGithubWorkflowsSubstituteVariablesRegex = RegExp;

export type CliGenerateGithubWorkflowsSubstituteVariablesSettingValue = string | undefined;

export type CliGenerateGithubWorkflowsSubstituteVariablesResolvedName = string;

export type CliGenerateGithubWorkflowsSubstituteVariablesReplacement = string;
