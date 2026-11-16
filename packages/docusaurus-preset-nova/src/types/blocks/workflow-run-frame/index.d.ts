import type { CSSProperties } from 'react';

/**
 * Blocks - Workflow Run Frame.
 *
 * @since 0.43.0
 */
export type Blocks_WorkflowRunFrame_Index_Status = 'success' | 'failure' | 'skipped';

export type Blocks_WorkflowRunFrame_Index_LogGroup_HiddenLines = number | undefined;

export type Blocks_WorkflowRunFrame_Index_LogGroup_Lines = string[] | undefined;

export type Blocks_WorkflowRunFrame_Index_LogGroup_Title = string;

export type Blocks_WorkflowRunFrame_Index_LogGroup = {
  hiddenLines?: Blocks_WorkflowRunFrame_Index_LogGroup_HiddenLines;
  lines?: Blocks_WorkflowRunFrame_Index_LogGroup_Lines;
  title: Blocks_WorkflowRunFrame_Index_LogGroup_Title;
};

export type Blocks_WorkflowRunFrame_Index_LogEntry = string | Blocks_WorkflowRunFrame_Index_LogGroup;

export type Blocks_WorkflowRunFrame_Index_Log = Blocks_WorkflowRunFrame_Index_LogEntry[];

/**
 * Blocks - Workflow Run Frame - Blocks Workflow Run Frame.
 *
 * @since 0.43.0
 */
export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step_Duration = string | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step_Log = Blocks_WorkflowRunFrame_Index_Log | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step_Name = string;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step_Status = Blocks_WorkflowRunFrame_Index_Status | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step = {
  duration?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step_Duration;
  log?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step_Log;
  name: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step_Name;
  status?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step_Status;
};

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Name = string;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Status = Blocks_WorkflowRunFrame_Index_Status | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Steps = Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Step[] | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Summary = string | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job = {
  name: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Name;
  status?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Status;
  steps?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Steps;
  summary?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job_Summary;
};

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_ClassName = string | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Jobs = Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job[];

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Label = string | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_RunNumber = number | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Status = Blocks_WorkflowRunFrame_Index_Status | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Style = CSSProperties | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Title = string;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Workflow = string | undefined;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props = {
  className?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_ClassName;
  jobs: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Jobs;
  label?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Label;
  runNumber?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_RunNumber;
  status?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Status;
  style?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Style;
  title: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Title;
  workflow?: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Workflow;
};

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Returns = React.JSX.Element;

export type Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_ActiveJob = Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props_Job | undefined;

/**
 * Blocks - Workflow Run Frame - Log Line.
 *
 * @since 0.43.0
 */
export type Blocks_WorkflowRunFrame_Index_LogLine_Line = string;

export type Blocks_WorkflowRunFrame_Index_LogLine_Number = number;

export type Blocks_WorkflowRunFrame_Index_LogLine_ClassName = string;

export type Blocks_WorkflowRunFrame_Index_LogLine_Returns = React.JSX.Element;

/**
 * Blocks - Workflow Run Frame - Log Rows.
 *
 * @since 0.43.0
 */
export type Blocks_WorkflowRunFrame_Index_LogRows_Log = Blocks_WorkflowRunFrame_Index_Log;

export type Blocks_WorkflowRunFrame_Index_LogRows_Returns = React.JSX.Element[];

export type Blocks_WorkflowRunFrame_Index_LogRows_Rows = React.JSX.Element[];

export type Blocks_WorkflowRunFrame_Index_LogRows_Number = number;

/**
 * Blocks - Workflow Run Frame - Status Icon.
 *
 * @since 0.43.0
 */
export type Blocks_WorkflowRunFrame_Index_StatusIcon_Status = Blocks_WorkflowRunFrame_Index_Status;

export type Blocks_WorkflowRunFrame_Index_StatusIcon_ClassName = string;

export type Blocks_WorkflowRunFrame_Index_StatusIcon_Returns = React.JSX.Element;
