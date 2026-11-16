import { Icon } from '@iconify/react/offline';

import type {
  Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_ActiveJob,
  Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props,
  Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Returns,
  Blocks_WorkflowRunFrame_Index_LogLine_ClassName,
  Blocks_WorkflowRunFrame_Index_LogLine_Line,
  Blocks_WorkflowRunFrame_Index_LogLine_Number,
  Blocks_WorkflowRunFrame_Index_LogLine_Returns,
  Blocks_WorkflowRunFrame_Index_LogRows_Log,
  Blocks_WorkflowRunFrame_Index_LogRows_Number,
  Blocks_WorkflowRunFrame_Index_LogRows_Returns,
  Blocks_WorkflowRunFrame_Index_LogRows_Rows,
  Blocks_WorkflowRunFrame_Index_StatusIcon_ClassName,
  Blocks_WorkflowRunFrame_Index_StatusIcon_Returns,
  Blocks_WorkflowRunFrame_Index_StatusIcon_Status,
} from '../../types/blocks/workflow-run-frame/index.d.ts';

/**
 * Blocks - Workflow Run Frame - Status Icon.
 *
 * Picks GitHub's own octicon for a run, job, or step status. The color comes
 * from where the icon sits, the way GitHub draws a passing step's check in the
 * row's own text color but the run's check in green.
 *
 * @param {Blocks_WorkflowRunFrame_Index_StatusIcon_Status}    status    - Status.
 * @param {Blocks_WorkflowRunFrame_Index_StatusIcon_ClassName} className - Class name.
 *
 * @returns {Blocks_WorkflowRunFrame_Index_StatusIcon_Returns}
 *
 * @since 0.43.0
 */
function statusIcon(status: Blocks_WorkflowRunFrame_Index_StatusIcon_Status, className: Blocks_WorkflowRunFrame_Index_StatusIcon_ClassName): Blocks_WorkflowRunFrame_Index_StatusIcon_Returns {
  if (status === 'failure') {
    return <Icon icon="octicon:x-circle-fill-16" className={`${className} nova-workflow-run-frame-status-failure`} />;
  }

  if (status === 'skipped') {
    return <Icon icon="octicon:skip-16" className={`${className} nova-workflow-run-frame-status-skipped`} />;
  }

  return <Icon icon="octicon:check-circle-fill-16" className={`${className} nova-workflow-run-frame-status-success`} />;
}

/**
 * Blocks - Workflow Run Frame - Log Line.
 *
 * Turns one raw log line into the numbered row GitHub draws for it, so lines
 * starting with "##[warning]" or "##[error]" become its colored annotations.
 *
 * @param {Blocks_WorkflowRunFrame_Index_LogLine_Line}      line      - Line.
 * @param {Blocks_WorkflowRunFrame_Index_LogLine_Number}    number    - Number.
 * @param {Blocks_WorkflowRunFrame_Index_LogLine_ClassName} className - Class name.
 *
 * @returns {Blocks_WorkflowRunFrame_Index_LogLine_Returns}
 *
 * @since 0.43.0
 */
function logLine(line: Blocks_WorkflowRunFrame_Index_LogLine_Line, number: Blocks_WorkflowRunFrame_Index_LogLine_Number, className: Blocks_WorkflowRunFrame_Index_LogLine_ClassName): Blocks_WorkflowRunFrame_Index_LogLine_Returns {
  if (line.startsWith('##[warning]') === true) {
    return (
      <span key={number} className={`${className} nova-workflow-run-frame-log-line-warning`}>
        <span className="nova-workflow-run-frame-log-number">{number}</span>
        <span className="nova-workflow-run-frame-log-content">
          <span className="nova-workflow-run-frame-log-warning">Warning: </span>
          {line.slice(11)}
        </span>
      </span>
    );
  }

  if (line.startsWith('##[error]') === true) {
    return (
      <span key={number} className={`${className} nova-workflow-run-frame-log-line-error`}>
        <span className="nova-workflow-run-frame-log-number">{number}</span>
        <span className="nova-workflow-run-frame-log-content">
          <span className="nova-workflow-run-frame-log-error">Error: </span>
          {line.slice(9)}
        </span>
      </span>
    );
  }

  return (
    <span key={number} className={className}>
      <span className="nova-workflow-run-frame-log-number">{number}</span>
      <span className="nova-workflow-run-frame-log-content">{(line === '') ? ' ' : line}</span>
    </span>
  );
}

/**
 * Blocks - Workflow Run Frame - Log Rows.
 *
 * Numbers a step's log the way GitHub does. A group takes one number for its
 * title, then one for each line inside it, so the numbers after a closed group
 * jump past the lines it hides.
 *
 * @param {Blocks_WorkflowRunFrame_Index_LogRows_Log} log - Log.
 *
 * @returns {Blocks_WorkflowRunFrame_Index_LogRows_Returns}
 *
 * @since 0.43.0
 */
function logRows(log: Blocks_WorkflowRunFrame_Index_LogRows_Log): Blocks_WorkflowRunFrame_Index_LogRows_Returns {
  const rows: Blocks_WorkflowRunFrame_Index_LogRows_Rows = [];

  let number: Blocks_WorkflowRunFrame_Index_LogRows_Number = 1;

  for (const entry of log) {
    if (typeof entry === 'string') {
      rows.push(logLine(entry, number, 'nova-workflow-run-frame-log-line'));

      number += 1;

      continue;
    }

    rows.push(
      <span key={number} className="nova-workflow-run-frame-log-line nova-workflow-run-frame-log-line-group">
        <span className="nova-workflow-run-frame-log-number">{number}</span>
        <span className="nova-workflow-run-frame-log-content">
          <Icon
            icon={(entry['lines'] !== undefined) ? 'octicon:triangle-down-16' : 'octicon:triangle-right-16'}
            className="nova-workflow-run-frame-log-triangle"
          />
          {entry['title']}
        </span>
      </span>,
    );

    number += 1;

    // A closed group's lines stay hidden, but GitHub still counts them.
    if (entry['lines'] === undefined) {
      number += entry['hiddenLines'] ?? 0;

      continue;
    }

    for (const line of entry['lines']) {
      rows.push(logLine(line, number, 'nova-workflow-run-frame-log-line nova-workflow-run-frame-log-line-nested'));

      number += 1;
    }
  }

  return rows;
}

/**
 * Blocks - Workflow Run Frame - Blocks Workflow Run Frame.
 *
 * Shows a GitHub Actions run the way its job page looks: the workflow link and
 * run title, the jobs sidebar, and the job's steps, with a step's log as text.
 *
 * @param {Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.43.0
 */
function BlocksWorkflowRunFrame(props: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Props): Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_Returns {
  const activeJob: Blocks_WorkflowRunFrame_Index_BlocksWorkflowRunFrame_ActiveJob = props['jobs'].find((job) => job['steps'] !== undefined) ?? props['jobs'][0];

  return (
    <figure
      className={(props['className'] !== undefined) ? `nova-workflow-run-frame ${props['className']}` : 'nova-workflow-run-frame'}
      style={props['style']}
      aria-label={props['label']}
    >
      <div className="nova-workflow-run-frame-window">
        <div className="nova-workflow-run-frame-header">
          {(props['workflow'] !== undefined) && (
            <span className="nova-workflow-run-frame-workflow">
              <Icon icon="octicon:arrow-left-16" />
              {props['workflow']}
            </span>
          )}
          <span className="nova-workflow-run-frame-title">
            {statusIcon(props['status'] ?? 'success', 'nova-workflow-run-frame-title-status')}
            <span>
              {props['title']}
              {(props['runNumber'] !== undefined) && (
                <span className="nova-workflow-run-frame-number">{` #${String(props['runNumber'])}`}</span>
              )}
            </span>
          </span>
        </div>
        <div className="nova-workflow-run-frame-body">
          <nav className="nova-workflow-run-frame-sidebar" aria-hidden="true">
            <span className="nova-workflow-run-frame-sidebar-item">
              <Icon icon="octicon:home-16" />
              Summary
            </span>
            <span className="nova-workflow-run-frame-sidebar-heading">All jobs</span>
            <span className="nova-workflow-run-frame-sidebar-divider" />
            {props['jobs'].map((job) => (
              <span
                key={job['name']}
                className={(job === activeJob) ? 'nova-workflow-run-frame-sidebar-item nova-workflow-run-frame-sidebar-item-active' : 'nova-workflow-run-frame-sidebar-item'}
              >
                {statusIcon(job['status'] ?? 'success', 'nova-workflow-run-frame-sidebar-status')}
                <span className="nova-workflow-run-frame-sidebar-label">{job['name']}</span>
              </span>
            ))}
            <span className="nova-workflow-run-frame-sidebar-divider" />
            <span className="nova-workflow-run-frame-sidebar-heading">Run details</span>
            <span className="nova-workflow-run-frame-sidebar-item">
              <Icon icon="octicon:stopwatch-16" />
              Usage
            </span>
            <span className="nova-workflow-run-frame-sidebar-item">
              <Icon icon="octicon:file-code-16" />
              Workflow file
            </span>
          </nav>
          {(activeJob !== undefined) && (
            <div className="nova-workflow-run-frame-job">
              <div className="nova-workflow-run-frame-job-header">
                <div className="nova-workflow-run-frame-job-heading">
                  <span className="nova-workflow-run-frame-job-name">{activeJob['name']}</span>
                  {(activeJob['summary'] !== undefined) && (
                    <span className="nova-workflow-run-frame-job-summary">{activeJob['summary']}</span>
                  )}
                </div>
                <div className="nova-workflow-run-frame-job-tools" aria-hidden="true">
                  <span className="nova-workflow-run-frame-job-search">
                    <Icon icon="octicon:search-16" />
                    Search logs
                  </span>
                  <Icon icon="octicon:sync-16" className="nova-workflow-run-frame-job-tool" />
                  <Icon icon="octicon:gear-16" className="nova-workflow-run-frame-job-tool" />
                </div>
              </div>
              <ol className="nova-workflow-run-frame-steps">
                {(activeJob['steps'] ?? []).map((step) => (
                  <li
                    key={step['name']}
                    className={(step['log'] !== undefined) ? 'nova-workflow-run-frame-step nova-workflow-run-frame-step-open' : 'nova-workflow-run-frame-step'}
                  >
                    <span className="nova-workflow-run-frame-step-row">
                      <Icon
                        icon={(step['log'] !== undefined) ? 'octicon:chevron-down-16' : 'octicon:chevron-right-16'}
                        className="nova-workflow-run-frame-step-chevron"
                      />
                      {statusIcon(step['status'] ?? 'success', 'nova-workflow-run-frame-step-status')}
                      <span className="nova-workflow-run-frame-step-name">{step['name']}</span>
                      {(step['duration'] !== undefined) && (
                        <span className="nova-workflow-run-frame-step-duration">{step['duration']}</span>
                      )}
                    </span>
                    {(step['log'] !== undefined) && (
                      <pre className="nova-workflow-run-frame-log">{logRows(step['log'])}</pre>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}

export default BlocksWorkflowRunFrame;
