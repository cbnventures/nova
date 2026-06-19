import type { Shared_GeneratorRunResult as SharedGeneratorRunResult } from '../../../shared.d.ts';

/**
 * CLI - Generate - GitHub - Workflows - Build Artifact Name.
 *
 * @since 0.16.3
 */
export type Cli_Generate_Github_Workflows_Runner_BuildArtifactName_TargetType = string;
export type Cli_Generate_Github_Workflows_Runner_BuildArtifactName_TargetId = string;
export type Cli_Generate_Github_Workflows_Runner_BuildArtifactName_Returns = string;

/**
 * CLI - Generate - GitHub - Workflows - Build Command.
 *
 * @since 0.16.0
 */
export type Cli_Generate_Github_Workflows_Runner_BuildCommand_ScriptName = 'check' | 'build';
export type Cli_Generate_Github_Workflows_Runner_BuildCommand_WorkspaceNames = string[];
export type Cli_Generate_Github_Workflows_Runner_BuildCommand_UseTurbo = boolean;
export type Cli_Generate_Github_Workflows_Runner_BuildCommand_Returns = string;
export type Cli_Generate_Github_Workflows_Runner_BuildCommand_TurboFlags = string[];
export type Cli_Generate_Github_Workflows_Runner_BuildCommand_NpmFlags = string[];

/**
 * CLI - Generate - GitHub - Workflows - Build Entry Setup Lines.
 *
 * @since 0.16.2
 */
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Entry = import('../../../shared.d.ts').Shared_NovaConfigWorkflow;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_MetadataEntry = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Entry | undefined;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_OutputFileName = string;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Returns = string[];
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_Lines = string[];
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_VariableName = string;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_VariableMeta = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Variable;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_SecretResolvedName = string;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_VarResolvedName = string;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_EntryTargetsMetadata = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Targets;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_SetupTargetType = string;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_SetupTargetMetadata = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Target | undefined;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetVariableName = string;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetVariableMeta = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Variable;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetSecretResolvedName = string;
export type Cli_Generate_Github_Workflows_Runner_BuildEntrySetupLines_TargetVarResolvedName = string;

/**
 * CLI - Generate - GitHub - Workflows - Build Merged Jobs Condition.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_RunName = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_PublishCondition = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_TriggerBlock = Record<string, unknown>;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_DependsOn = boolean | undefined;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_JobsCondition = string | undefined;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData = {
  runName: Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_RunName;
  publishCondition: Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_PublishCondition;
  triggerBlock: Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_TriggerBlock;
  dependsOn: Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_DependsOn;
  jobsCondition: Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData_JobsCondition;
};
export type Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerDataList = Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_TriggerData[];
export type Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_Returns = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedJobsCondition_JobsConditionLine = string;

/**
 * CLI - Generate - GitHub - Workflows - Build Merged Publish Condition.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_RunName = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_PublishCondition = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_TriggerBlock = Record<string, unknown>;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_DependsOn = boolean | undefined;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_JobsCondition = string | undefined;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData = {
  runName: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_RunName;
  publishCondition: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_PublishCondition;
  triggerBlock: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_TriggerBlock;
  dependsOn: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_DependsOn;
  jobsCondition: Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData_JobsCondition;
};
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerDataList = Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_TriggerData[];
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_Returns = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_NonDispatchParts = string[];
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_DispatchPart = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_PublishInner = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_PublishParts = string[];
export type Cli_Generate_Github_Workflows_Runner_BuildMergedPublishCondition_AllParts = string[];

/**
 * CLI - Generate - GitHub - Workflows - Build Merged Run Name.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_RunName = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_PublishCondition = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_TriggerBlock = Record<string, unknown>;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_DependsOn = boolean | undefined;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_JobsCondition = string | undefined;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData = {
  runName: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_RunName;
  publishCondition: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_PublishCondition;
  triggerBlock: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_TriggerBlock;
  dependsOn: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_DependsOn;
  jobsCondition: Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData_JobsCondition;
};
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerDataList = Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_TriggerData[];
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_NeedsManuallyFallback = boolean;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_Returns = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextExpressions = string[];
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextMatch = RegExpMatchArray | null;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextInner = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextParts = string[];
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_RunNameMatch = RegExpMatchArray | null;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_RunNamePrefix = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_RunNameSuffix = string;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_HasEmptyFallback = boolean;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ShouldAppendFallback = boolean;
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_ContextExpressionsWithFallback = string[];
export type Cli_Generate_Github_Workflows_Runner_BuildMergedRunName_MergedContextExpression = string;

/**
 * CLI - Generate - GitHub - Workflows - Detect Circular Depends On.
 *
 * @since 0.21.0
 */
export type Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Workflows = import('../../../shared.d.ts').Shared_NovaConfigWorkflow[];
export type Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Returns = boolean;
export type Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_EntryKey = string;
export type Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Visited = Set<string>;
export type Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Queue = string[];
export type Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_CurrentId = string;
export type Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_CurrentEntry = import('../../../shared.d.ts').Shared_NovaConfigWorkflow | undefined;
export type Cli_Generate_Github_Workflows_Runner_DetectCircularDependsOn_Key = string;

/**
 * CLI - Generate - GitHub - Workflows - Detect Turbo.
 *
 * @since 0.16.0
 */
export type Cli_Generate_Github_Workflows_Runner_DetectTurbo_ProjectDirectory = string;
export type Cli_Generate_Github_Workflows_Runner_DetectTurbo_Returns = Promise<boolean>;
export type Cli_Generate_Github_Workflows_Runner_DetectTurbo_TurboConfigPath = string;

/**
 * CLI - Generate - GitHub - Workflows - Render Upload Artifact Steps.
 *
 * @since 0.16.3
 */
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetEntry_Type = string;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetEntry_WorkingDir = string;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetEntry = {
  type: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetEntry_Type;
  workingDir: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetEntry_WorkingDir;
};
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Targets = Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetEntry[];
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetMetadataEntryArtifactPath = string;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetMetadataEntry_ArtifactPaths = Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetMetadataEntryArtifactPath[];
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetMetadataEntry = {
  artifactPaths: Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetMetadataEntry_ArtifactPaths;
};
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetsMetadata = Record<string, Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetMetadataEntry>;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Returns = string;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Steps = string[];
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_Metadata = Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetMetadataEntry | undefined;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_StrippedDir = string;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_TargetId = string;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_ArtifactName = string;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_PathLines = string[];
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_ResolvedPath = string;
export type Cli_Generate_Github_Workflows_Runner_RenderUploadArtifactSteps_StepLines = string[];

/**
 * CLI - Generate - GitHub - Workflows - Resolve Workspace Name.
 *
 * @since 0.16.0
 */
export type Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_WorkspacesEntry = {
  name?: string;
};
export type Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Workspaces = Record<string, Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_WorkspacesEntry>;
export type Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Path = string;
export type Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Returns = string | undefined;
export type Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_Entry = Cli_Generate_Github_Workflows_Runner_ResolveWorkspaceName_WorkspacesEntry | undefined;

/**
 * CLI - Generate - GitHub - Workflows - Run.
 *
 * @since 0.15.0
 */
export type Cli_Generate_Github_Workflows_Runner_Run_Options_DryRun = true;

export type Cli_Generate_Github_Workflows_Runner_Run_Options_ReplaceFile = true;

export type Cli_Generate_Github_Workflows_Runner_Run_Options = {
  dryRun?: Cli_Generate_Github_Workflows_Runner_Run_Options_DryRun;
  replaceFile?: Cli_Generate_Github_Workflows_Runner_Run_Options_ReplaceFile;
};

export type Cli_Generate_Github_Workflows_Runner_Run_Returns = Promise<SharedGeneratorRunResult>;

export type Cli_Generate_Github_Workflows_Runner_Run_CurrentDirectory = string;

export type Cli_Generate_Github_Workflows_Runner_Run_IsAtProjectRoot = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_IsDryRun = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_IsReplaceFile = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_ReplaceFileNotice = string;

export type Cli_Generate_Github_Workflows_Runner_Run_Config = Record<string, unknown>;

export type Cli_Generate_Github_Workflows_Runner_Run_Workflows = import('../../../shared.d.ts').Shared_NovaConfigWorkflow[] | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_TemplateDirectory = string;

export type Cli_Generate_Github_Workflows_Runner_Run_WorkflowsDirectory = string;

export type Cli_Generate_Github_Workflows_Runner_Run_DuplicateSet = Set<string>;

export type Cli_Generate_Github_Workflows_Runner_Run_HasDuplicateError = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_DuplicateKey = string;

export type Cli_Generate_Github_Workflows_Runner_Run_SkippedWorkflowKeys = Set<Cli_Generate_Github_Workflows_Runner_Run_LiteralWorkflowKey>;

export type Cli_Generate_Github_Workflows_Runner_Run_LiteralEntry = import('../../../shared.d.ts').Shared_NovaConfigWorkflow;

export type Cli_Generate_Github_Workflows_Runner_Run_LiteralTemplateName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_LiteralSuffix = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_LiteralWorkflowKey = string;

export type Cli_Generate_Github_Workflows_Runner_Run_LiteralMetadataEntry = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Entry | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_MissingLiterals = string[];

export type Cli_Generate_Github_Workflows_Runner_Run_TemplateVariableName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TemplateVariableMeta = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Variable;

export type Cli_Generate_Github_Workflows_Runner_Run_TemplateLiteralValue = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetsMetadataForValidation = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Targets;

export type Cli_Generate_Github_Workflows_Runner_Run_EntryTargetsForValidation = import('../../../shared.d.ts').Shared_NovaConfigWorkflowTarget[];

export type Cli_Generate_Github_Workflows_Runner_Run_TargetTypeForValidation = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetMetadataForValidation = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Target | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_ValidationVariableName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_ValidationVariableMeta = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Variable;

export type Cli_Generate_Github_Workflows_Runner_Run_ValidationLiteralValue = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_GlobalUniquenessMap = Map<string, Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue>;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessErrors = string[];

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessEntry = import('../../../shared.d.ts').Shared_NovaConfigWorkflow;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessTemplateName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessSuffix = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessWorkflowKey = string;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessMetadataEntry = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Entry | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessTargetsMetadata = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Targets;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessEntryTargets = import('../../../shared.d.ts').Shared_NovaConfigWorkflowTarget[];

export type Cli_Generate_Github_Workflows_Runner_Run_EntryTargetForUniqueness = import('../../../shared.d.ts').Shared_NovaConfigWorkflowTarget;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetTypeForUniqueness = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetMetadataForUniqueness = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Target | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyForTarget = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Target_UniquenessKey | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyResolvedValue = string;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyResolvedValues = Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyResolvedValue[];

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyDetailEntry = string;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyDetailEntries = Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyDetailEntry[];

export type Cli_Generate_Github_Workflows_Runner_Run_VariableName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_VariableMeta = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Variable | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_SettingValue = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_ResolvedValue = string;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyComposite = string;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyExisting = Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_IsSameWorkflow = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue_WorkflowKey = Cli_Generate_Github_Workflows_Runner_Run_UniquenessWorkflowKey;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue_TargetType = Cli_Generate_Github_Workflows_Runner_Run_TargetTypeForUniqueness;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue_DetailEntries = Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyDetailEntries;

export type Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue = {
  workflowKey: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue_WorkflowKey;
  targetType: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue_TargetType;
  detailEntries: Cli_Generate_Github_Workflows_Runner_Run_UniquenessKeyMapValue_DetailEntries;
};

export type Cli_Generate_Github_Workflows_Runner_Run_GeneratedSet = Set<string>;

export type Cli_Generate_Github_Workflows_Runner_Run_OutputFileNames = Set<string>;

export type Cli_Generate_Github_Workflows_Runner_Run_SetupLines = string[];

export type Cli_Generate_Github_Workflows_Runner_Run_Entry = import('../../../shared.d.ts').Shared_NovaConfigWorkflow;

export type Cli_Generate_Github_Workflows_Runner_Run_WorkflowEntry = import('../../../shared.d.ts').Shared_NovaConfigWorkflow;

export type Cli_Generate_Github_Workflows_Runner_Run_TemplateName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_WorkflowSuffix = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_EntryWorkflowKey = string;

export type Cli_Generate_Github_Workflows_Runner_Run_MetadataEntry = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Entry | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_TemplateDirPath = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TemplateDirExists = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_OutputFileName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_BasePath = string;

export type Cli_Generate_Github_Workflows_Runner_Run_BaseContent = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_HasTriggers = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_Content = string;

export type Cli_Generate_Github_Workflows_Runner_Run_Triggers = import('../../../shared.d.ts').Shared_NovaConfigWorkflowTrigger[];

export type Cli_Generate_Github_Workflows_Runner_Run_HasTriggerError = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerData_RunName = Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedRunName;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerData_PublishCondition = Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedPublishCondition;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerData_TriggerBlock = Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedTriggerBlock;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerData_DependsOn = Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedDependsOn;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerData_JobsCondition = Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedJobsCondition;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerData = {
  runName: Cli_Generate_Github_Workflows_Runner_Run_TriggerData_RunName;
  publishCondition: Cli_Generate_Github_Workflows_Runner_Run_TriggerData_PublishCondition;
  triggerBlock: Cli_Generate_Github_Workflows_Runner_Run_TriggerData_TriggerBlock;
  dependsOn: Cli_Generate_Github_Workflows_Runner_Run_TriggerData_DependsOn;
  jobsCondition: Cli_Generate_Github_Workflows_Runner_Run_TriggerData_JobsCondition;
};

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerDataList = Cli_Generate_Github_Workflows_Runner_Run_TriggerData[];

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerFileName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerFilePath = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerFileExists = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerRawContent = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerParsed = Record<string, unknown>;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedRunName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedPublishCondition = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedTriggerBlock = Record<string, unknown>;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedDependsOn = boolean | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerParsedJobsCondition = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_NeedsDependsOn = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_DependsOnEntries = string[];

export type Cli_Generate_Github_Workflows_Runner_Run_EntryLabel = string;

export type Cli_Generate_Github_Workflows_Runner_Run_DependsOnResolvedNames = string[];

export type Cli_Generate_Github_Workflows_Runner_Run_HasDependsOnError = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_Entry2 = string;

export type Cli_Generate_Github_Workflows_Runner_Run_DependsOnTarget = import('../../../shared.d.ts').Shared_NovaConfigWorkflow | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetKey = string;

export type Cli_Generate_Github_Workflows_Runner_Run_DependsOnBasePath = string;

export type Cli_Generate_Github_Workflows_Runner_Run_DependsOnWorkflowName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_DependsOnBaseContent = string;

export type Cli_Generate_Github_Workflows_Runner_Run_DependsOnNameMatch = RegExpExecArray | null;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetSuffix = string;

export type Cli_Generate_Github_Workflows_Runner_Run_DependsOnYamlArray = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerBlockString = string;

export type Cli_Generate_Github_Workflows_Runner_Run_ResolvedTriggerBlock = Record<string, unknown>;

export type Cli_Generate_Github_Workflows_Runner_Run_MergedTriggerBlock = Record<string, unknown>;

export type Cli_Generate_Github_Workflows_Runner_Run_TriggerYaml = string;

export type Cli_Generate_Github_Workflows_Runner_Run_IndentedTriggerLines = string[];

export type Cli_Generate_Github_Workflows_Runner_Run_IndentedTriggerYaml = string;

export type Cli_Generate_Github_Workflows_Runner_Run_NeedsManuallyFallback = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_MergedRunName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_MergedPublishCondition = string;

export type Cli_Generate_Github_Workflows_Runner_Run_MergedJobsCondition = string;

export type Cli_Generate_Github_Workflows_Runner_Run_JobsConditionLine = string;

export type Cli_Generate_Github_Workflows_Runner_Run_SupportsScopes = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_SupportsTargets = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_EntryScopes = import('../../../shared.d.ts').Shared_NovaConfigWorkflow_Scopes;

export type Cli_Generate_Github_Workflows_Runner_Run_EntryTargets = import('../../../shared.d.ts').Shared_NovaConfigWorkflow_Targets;

export type Cli_Generate_Github_Workflows_Runner_Run_HasPublishValidationError = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_ConfigWorkspacesEntry = {
  name?: string;
};

export type Cli_Generate_Github_Workflows_Runner_Run_ConfigWorkspaces = Record<string, Cli_Generate_Github_Workflows_Runner_Run_ConfigWorkspacesEntry>;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetsMetadata = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Targets;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetTupleSet = Set<string>;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetType = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetWorkingDir = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetTupleKey = string;

export type Cli_Generate_Github_Workflows_Runner_Run_ResolvedWorkspaceNames = string[];

export type Cli_Generate_Github_Workflows_Runner_Run_ScopePath = import('../../../shared.d.ts').Shared_NovaConfigWorkflowScope;

export type Cli_Generate_Github_Workflows_Runner_Run_ResolvedWorkspaceName = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_ResolvedName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_UseTurbo = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_CheckCommand = string;

export type Cli_Generate_Github_Workflows_Runner_Run_BuildCommand = string;

export type Cli_Generate_Github_Workflows_Runner_Run_UploadArtifactStep = string;

export type Cli_Generate_Github_Workflows_Runner_Run_ResolvedTargetFragment = string;

export type Cli_Generate_Github_Workflows_Runner_Run_ResolvedTargetFragments = Cli_Generate_Github_Workflows_Runner_Run_ResolvedTargetFragment[];

export type Cli_Generate_Github_Workflows_Runner_Run_HasTargetFragmentError = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_CurrentEntryTarget = import('../../../shared.d.ts').Shared_NovaConfigWorkflowTarget;

export type Cli_Generate_Github_Workflows_Runner_Run_FragmentTargetType = string;

export type Cli_Generate_Github_Workflows_Runner_Run_FragmentTargetWorkingDir = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentPath = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentExists = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentRawContent = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetId = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetFragmentResolvedContent = string;

export type Cli_Generate_Github_Workflows_Runner_Run_ArtifactName = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetNeeds = import('../../../shared.d.ts').Shared_NovaConfigWorkflowTarget_Needs;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetNeedsJobId = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetNeedsJobIds = Cli_Generate_Github_Workflows_Runner_Run_TargetNeedsJobId[];

export type Cli_Generate_Github_Workflows_Runner_Run_TargetNeedsValue = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetJobsConditionLine = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetMetadata = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Target | undefined;

export type Cli_Generate_Github_Workflows_Runner_Run_MergedVariables = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Variables;

export type Cli_Generate_Github_Workflows_Runner_Run_IndentedLines = string[];

export type Cli_Generate_Github_Workflows_Runner_Run_IndentedFragment = string;

export type Cli_Generate_Github_Workflows_Runner_Run_AppendedFragments = string;

export type Cli_Generate_Github_Workflows_Runner_Run_Substituted = string;

export type Cli_Generate_Github_Workflows_Runner_Run_EntrySetupLines = string[];

export type Cli_Generate_Github_Workflows_Runner_Run_DisplayPath = string;

export type Cli_Generate_Github_Workflows_Runner_Run_TargetPath = string;

export type Cli_Generate_Github_Workflows_Runner_Run_ExistingEntries = import('fs').Dirent[];

export type Cli_Generate_Github_Workflows_Runner_Run_ExistingDirent = import('fs').Dirent;

export type Cli_Generate_Github_Workflows_Runner_Run_IsOrphan = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_IsBackup = boolean;

export type Cli_Generate_Github_Workflows_Runner_Run_OrphanPath = string;

export type Cli_Generate_Github_Workflows_Runner_Run_SetupMessage = string;

/**
 * CLI - Generate - GitHub - Workflows - Slugify Working Dir.
 *
 * @since 0.16.0
 */
export type Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Input = string;

export type Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Returns = string;

export type Cli_Generate_Github_Workflows_Runner_SlugifyWorkingDir_Trimmed = string;

/**
 * CLI - Generate - GitHub - Workflows - Substitute Variables.
 *
 * @since 0.20.0
 */
export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Content = string;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Variables = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Variables;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Settings = import('../../../shared.d.ts').Shared_NovaConfigWorkflow_Settings | undefined;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Returns = string;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Result = string;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VariableName = string;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VariableMeta = import('../../../lib/workflow-templates.d.ts').Lib_WorkflowTemplates_Variable;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_Regex = RegExp;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_SettingValue = string | undefined;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_SecretResolvedName = string;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_SecretReplacement = string;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VarResolvedName = string;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_VarReplacement = string;

export type Cli_Generate_Github_Workflows_Runner_SubstituteVariables_LiteralReplacement = string;
