import type {
  Shared_CorepackPackageManager,
  Shared_ScaffoldConfig_Mode,
  Shared_ScaffoldTemplateQuestions,
  Shared_ScaffoldTemplateResolution_Answers,
} from '../shared.d.ts';

/**
 * Lib - Scaffold Presentation.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgressFrames = string[];

export type Lib_ScaffoldPresentation_ScaffoldProgressBarWidth = number;

export type Lib_ScaffoldPresentation_ScaffoldProgressIntervalMilliseconds = number;

export type Lib_ScaffoldPresentation_ScaffoldProgressCompletedStageHoldMilliseconds = number;

/**
 * Lib - Scaffold Presentation - Confirm Scaffold Plan.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ConfirmScaffoldPlan_IsNonInteractive = boolean;

export type Lib_ScaffoldPresentation_ConfirmScaffoldPlan_IsDryRun = boolean;

export type Lib_ScaffoldPresentation_ConfirmScaffoldPlan_Returns = Promise<boolean>;

export type Lib_ScaffoldPresentation_ConfirmScaffoldPlan_Answers = Record<string, unknown>;

/**
 * Lib - Scaffold Presentation - Create Scaffold Progress.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_CreateScaffoldProgress_Total = number;

export type Lib_ScaffoldPresentation_CreateScaffoldProgress_IsInteractive = boolean;

export type Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns_Clear = () => void;

export type Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns_Complete = () => Promise<void>;

export type Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns_Finish = (label: string) => void;

export type Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns_Start = (label: string, detail?: string) => void;

export type Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns = {
  clear: Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns_Clear;
  complete: Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns_Complete;
  finish: Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns_Finish;
  start: Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns_Start;
};

/**
 * Lib - Scaffold Presentation - Report Scaffold Completion.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_CompletionNote = string;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_CompletionNotes = Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_CompletionNote[];

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_DependenciesInstalled = boolean;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_DisplayName = string;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_DryRun = boolean;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_PackageManager = Shared_CorepackPackageManager;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_PrimaryScript = string;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_ProjectRoot = string;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_ShouldConfigure = boolean;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_WorkspacePackageName = string;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details = {
  completionNotes?: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_CompletionNotes;
  dependenciesInstalled: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_DependenciesInstalled;
  displayName: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_DisplayName;
  dryRun: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_DryRun;
  packageManager: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_PackageManager;
  primaryScript?: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_PrimaryScript;
  projectRoot: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_ProjectRoot;
  shouldConfigure?: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_ShouldConfigure;
  workspacePackageName?: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details_WorkspacePackageName;
};

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Returns = void;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Commands = string[];

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_PackageManager = Shared_CorepackPackageManager;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_Lines = string[];

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_AppendCommand_Command = string;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_AppendCommand_Index = number;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_AppendCommand = (command: Lib_ScaffoldPresentation_ReportScaffoldCompletion_AppendCommand_Command, index: Lib_ScaffoldPresentation_ReportScaffoldCompletion_AppendCommand_Index) => Lib_ScaffoldPresentation_ReportScaffoldCompletion_AppendCommand_Returns;

export type Lib_ScaffoldPresentation_ReportScaffoldCompletion_AppendCommand_Returns = void;

/**
 * Lib - Scaffold Presentation - Report Scaffold Plan.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_AdditionalOption_Flag = string;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_AdditionalOption_Value = string;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_AdditionalOption = {
  flag: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_AdditionalOption_Flag;
  value: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_AdditionalOption_Value;
};

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_AdditionalOptions = Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_AdditionalOption[];

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Answers = Shared_ScaffoldTemplateResolution_Answers;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_DisplayName = string;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Destination = string;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Mode = Shared_ScaffoldConfig_Mode;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Project = string;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Questions = Shared_ScaffoldTemplateQuestions;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_WorkspacePackageName = string;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Details = {
  additionalOptions?: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_AdditionalOptions;
  answers: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Answers;
  displayName: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_DisplayName;
  destination: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Destination;
  mode: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Mode;
  project: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Project;
  questions: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_Questions;
  workspacePackageName?: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details_WorkspacePackageName;
};

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Returns = void;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Mode = 'New monorepo' | 'Existing monorepo';

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Row = [string, string];

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Rows = Lib_ScaffoldPresentation_ReportScaffoldPlan_Row[];

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_DependencyValue = string | undefined;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_IsActive = boolean;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Answer = string | undefined;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Choice = Shared_ScaffoldTemplateQuestions[number]['choices'][number] | undefined;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_ChoiceTitle = string;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_LabelWidth = number;

export type Lib_ScaffoldPresentation_ReportScaffoldPlan_Lines = string[];

/**
 * Lib - Scaffold Presentation - Resolve Display Path.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ResolveDisplayPath_CurrentDirectory = string;

export type Lib_ScaffoldPresentation_ResolveDisplayPath_Path = string;

export type Lib_ScaffoldPresentation_ResolveDisplayPath_Returns = string;

export type Lib_ScaffoldPresentation_ResolveDisplayPath_RelativePath = string;

/**
 * Lib - Scaffold Presentation - Resolve Scaffold Install.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ResolveScaffoldInstall_Install = boolean | undefined;

export type Lib_ScaffoldPresentation_ResolveScaffoldInstall_Returns = boolean;

/**
 * Lib - Scaffold Presentation - Scaffold Progress.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgress_Completed = number;

export type Lib_ScaffoldPresentation_ScaffoldProgress_CurrentDetail = string | undefined;

export type Lib_ScaffoldPresentation_ScaffoldProgress_CurrentLabel = string | undefined;

export type Lib_ScaffoldPresentation_ScaffoldProgress_FrameIndex = number;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Interval = NodeJS.Timeout | undefined;

export type Lib_ScaffoldPresentation_ScaffoldProgress_IsInteractive = boolean;

export type Lib_ScaffoldPresentation_ScaffoldProgress_IsRunning = boolean;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Total = number;

/**
 * Lib - Scaffold Presentation - Scaffold Progress - Clear.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgress_Clear_Returns = void;

/**
 * Lib - Scaffold Presentation - Scaffold Progress - Complete.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgress_Complete_Returns = Promise<void>;

/**
 * Lib - Scaffold Presentation - Scaffold Progress - Constructor.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgress_Constructor_Total = number;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Constructor_IsInteractive = boolean;

/**
 * Lib - Scaffold Presentation - Scaffold Progress - Finish.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgress_Finish_Label = string;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Finish_Returns = void;

/**
 * Lib - Scaffold Presentation - Scaffold Progress - Render.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgress_Render_Returns = void;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Render_CompletedWidth = number;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Render_RemainingWidth = number;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Render_Bar = string;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Render_Frame = string;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Render_Symbol = string;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Render_Detail = string;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Render_LiveMessage = string;

/**
 * Lib - Scaffold Presentation - Scaffold Progress - Start.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgress_Start_Label = string;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Start_Detail = string;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Start_Returns = void;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Start_DetailSuffix = string;

export type Lib_ScaffoldPresentation_ScaffoldProgress_Start_DurableMessage = string;

/**
 * Lib - Scaffold Presentation - Scaffold Progress - Start Timer.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgress_StartTimer_Returns = void;

/**
 * Lib - Scaffold Presentation - Scaffold Progress - Stop Timer.
 *
 * @since 0.31.0
 */
export type Lib_ScaffoldPresentation_ScaffoldProgress_StopTimer_Returns = void;
