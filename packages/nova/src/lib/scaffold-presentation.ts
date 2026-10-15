import { relative } from 'node:path';
import {
  clearLine,
  cursorTo,
} from 'node:readline';
import { setTimeout as delay } from 'node:timers/promises';

import chalk from 'chalk';
import prompts from 'prompts';

import type {
  Lib_ScaffoldPresentation_ConfirmScaffoldPlan_Answers,
  Lib_ScaffoldPresentation_ConfirmScaffoldPlan_IsDryRun,
  Lib_ScaffoldPresentation_ConfirmScaffoldPlan_IsNonInteractive,
  Lib_ScaffoldPresentation_ConfirmScaffoldPlan_Returns,
  Lib_ScaffoldPresentation_CreateScaffoldProgress_IsInteractive,
  Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns,
  Lib_ScaffoldPresentation_CreateScaffoldProgress_Total,
  Lib_ScaffoldPresentation_ReportScaffoldCompletion_AppendCommand,
  Lib_ScaffoldPresentation_ReportScaffoldCompletion_Commands,
  Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details,
  Lib_ScaffoldPresentation_ReportScaffoldCompletion_Lines,
  Lib_ScaffoldPresentation_ReportScaffoldCompletion_PackageManager,
  Lib_ScaffoldPresentation_ReportScaffoldCompletion_Returns,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_Answer,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_Choice,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_ChoiceTitle,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_DependencyValue,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_Details,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_IsActive,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_LabelWidth,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_Lines,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_Mode,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_Returns,
  Lib_ScaffoldPresentation_ReportScaffoldPlan_Rows,
  Lib_ScaffoldPresentation_ResolveDisplayPath_CurrentDirectory,
  Lib_ScaffoldPresentation_ResolveDisplayPath_Path,
  Lib_ScaffoldPresentation_ResolveDisplayPath_RelativePath,
  Lib_ScaffoldPresentation_ResolveDisplayPath_Returns,
  Lib_ScaffoldPresentation_ResolveScaffoldInstall_Install,
  Lib_ScaffoldPresentation_ResolveScaffoldInstall_Returns,
  Lib_ScaffoldPresentation_ScaffoldProgress_Clear_Returns,
  Lib_ScaffoldPresentation_ScaffoldProgress_Complete_Returns,
  Lib_ScaffoldPresentation_ScaffoldProgress_Completed,
  Lib_ScaffoldPresentation_ScaffoldProgress_Constructor_IsInteractive,
  Lib_ScaffoldPresentation_ScaffoldProgress_Constructor_Total,
  Lib_ScaffoldPresentation_ScaffoldProgress_CurrentDetail,
  Lib_ScaffoldPresentation_ScaffoldProgress_CurrentLabel,
  Lib_ScaffoldPresentation_ScaffoldProgress_Finish_Label,
  Lib_ScaffoldPresentation_ScaffoldProgress_Finish_Returns,
  Lib_ScaffoldPresentation_ScaffoldProgress_FrameIndex,
  Lib_ScaffoldPresentation_ScaffoldProgress_Interval,
  Lib_ScaffoldPresentation_ScaffoldProgress_IsInteractive,
  Lib_ScaffoldPresentation_ScaffoldProgress_IsRunning,
  Lib_ScaffoldPresentation_ScaffoldProgress_Render_Bar,
  Lib_ScaffoldPresentation_ScaffoldProgress_Render_CompletedWidth,
  Lib_ScaffoldPresentation_ScaffoldProgress_Render_Detail,
  Lib_ScaffoldPresentation_ScaffoldProgress_Render_Frame,
  Lib_ScaffoldPresentation_ScaffoldProgress_Render_LiveMessage,
  Lib_ScaffoldPresentation_ScaffoldProgress_Render_RemainingWidth,
  Lib_ScaffoldPresentation_ScaffoldProgress_Render_Returns,
  Lib_ScaffoldPresentation_ScaffoldProgress_Render_Symbol,
  Lib_ScaffoldPresentation_ScaffoldProgress_Start_Detail,
  Lib_ScaffoldPresentation_ScaffoldProgress_Start_DetailSuffix,
  Lib_ScaffoldPresentation_ScaffoldProgress_Start_DurableMessage,
  Lib_ScaffoldPresentation_ScaffoldProgress_Start_Label,
  Lib_ScaffoldPresentation_ScaffoldProgress_Start_Returns,
  Lib_ScaffoldPresentation_ScaffoldProgress_StartTimer_Returns,
  Lib_ScaffoldPresentation_ScaffoldProgress_StopTimer_Returns,
  Lib_ScaffoldPresentation_ScaffoldProgress_Total,
  Lib_ScaffoldPresentation_ScaffoldProgressBarWidth,
  Lib_ScaffoldPresentation_ScaffoldProgressCompletedStageHoldMilliseconds,
  Lib_ScaffoldPresentation_ScaffoldProgressFrames,
  Lib_ScaffoldPresentation_ScaffoldProgressIntervalMilliseconds,
} from '../types/lib/scaffold-presentation.d.ts';

/**
 * Lib - Scaffold Presentation - Scaffold Progress Frames.
 *
 * Defines a stable spinner animation without adding a runtime dependency.
 * The frames are used only while an interactive stage is active.
 *
 * @since 0.31.0
 */
const scaffoldProgressFrames: Lib_ScaffoldPresentation_ScaffoldProgressFrames = [
  '⠋',
  '⠙',
  '⠹',
  '⠸',
  '⠼',
  '⠴',
  '⠦',
  '⠧',
  '⠇',
  '⠏',
];

/**
 * Lib - Scaffold Presentation - Scaffold Progress Bar Width.
 *
 * Keeps the live progress bar compact enough for narrow terminal windows.
 * A fixed width also prevents the line from jumping between stages.
 *
 * @since 0.31.0
 */
const scaffoldProgressBarWidth: Lib_ScaffoldPresentation_ScaffoldProgressBarWidth = 20;

/**
 * Lib - Scaffold Presentation - Scaffold Progress Interval Milliseconds.
 *
 * Balances a visibly responsive spinner against unnecessary terminal writes.
 * The timer is unreferenced so it can never keep the process alive alone.
 *
 * @since 0.31.0
 */
const scaffoldProgressIntervalMilliseconds: Lib_ScaffoldPresentation_ScaffoldProgressIntervalMilliseconds = 80;

/**
 * Lib - Scaffold Presentation - Scaffold Progress Completed Stage Hold Milliseconds.
 *
 * Keeps each completed interactive stage visible before the next stage replaces
 * the shared terminal line. Automation output is durable and does not wait.
 *
 * @since 0.31.0
 */
const scaffoldProgressCompletedStageHoldMilliseconds: Lib_ScaffoldPresentation_ScaffoldProgressCompletedStageHoldMilliseconds = 500;

/**
 * Lib - Scaffold Presentation.
 *
 * Keeps interactive scaffold status on one terminal line while preserving
 * durable, cursor-free stage messages for automation logs.
 *
 * @since 0.31.0
 */
class ScaffoldProgress {
  /**
   * Lib - Scaffold Presentation - Completed.
   *
   * Tracks successfully finished stages for the displayed count and bar.
   * Active work does not advance this value until it completes.
   *
   * @private
   *
   * @since 0.31.0
   */
  #completed: Lib_ScaffoldPresentation_ScaffoldProgress_Completed = 0;

  /**
   * Lib - Scaffold Presentation - Current Detail.
   *
   * Stores the optional path or package detail displayed beside a stage.
   * Completion clears it before rendering the final status line.
   *
   * @private
   *
   * @since 0.31.0
   */
  #currentDetail: Lib_ScaffoldPresentation_ScaffoldProgress_CurrentDetail = undefined;

  /**
   * Lib - Scaffold Presentation - Current Label.
   *
   * Stores the active operation name used by both live and durable output.
   * An undefined value prevents an incomplete reporter from drawing.
   *
   * @private
   *
   * @since 0.31.0
   */
  #currentLabel: Lib_ScaffoldPresentation_ScaffoldProgress_CurrentLabel = undefined;

  /**
   * Lib - Scaffold Presentation - Frame Index.
   *
   * Selects the current spinner frame and wraps at the frame-list boundary.
   * Each new stage restarts the animation from the first frame.
   *
   * @private
   *
   * @since 0.31.0
   */
  #frameIndex: Lib_ScaffoldPresentation_ScaffoldProgress_FrameIndex = 0;

  /**
   * Lib - Scaffold Presentation - Interval.
   *
   * Holds the active spinner timer so every stage transition can stop it.
   * Undefined means no terminal animation is currently scheduled.
   *
   * @private
   *
   * @since 0.31.0
   */
  #interval: Lib_ScaffoldPresentation_ScaffoldProgress_Interval = undefined;

  /**
   * Lib - Scaffold Presentation - Is Interactive.
   *
   * Chooses one redrawable TTY line or durable cursor-free automation output.
   * The value is fixed when the reporter is created.
   *
   * @private
   *
   * @since 0.31.0
   */
  readonly #isInteractive: Lib_ScaffoldPresentation_ScaffoldProgress_IsInteractive;

  /**
   * Lib - Scaffold Presentation - Is Running.
   *
   * Distinguishes an animated active stage from a completed checkmark state.
   * Finishing or clearing a stage stops the associated timer.
   *
   * @private
   *
   * @since 0.31.0
   */
  #isRunning: Lib_ScaffoldPresentation_ScaffoldProgress_IsRunning = false;

  /**
   * Lib - Scaffold Presentation - Total.
   *
   * Records the complete number of planned execution stages for this scaffold.
   * It remains constant so the progress ratio cannot change midway.
   *
   * @private
   *
   * @since 0.31.0
   */
  readonly #total: Lib_ScaffoldPresentation_ScaffoldProgress_Total;

  /**
   * Lib - Scaffold Presentation - Constructor.
   *
   * Captures the complete stage count and selected output mode before work starts.
   * No terminal output is emitted until the first stage begins.
   *
   * @param {Lib_ScaffoldPresentation_ScaffoldProgress_Constructor_Total}         total         - Total.
   * @param {Lib_ScaffoldPresentation_ScaffoldProgress_Constructor_IsInteractive} isInteractive - Is interactive.
   *
   * @since 0.31.0
   */
  public constructor(total: Lib_ScaffoldPresentation_ScaffoldProgress_Constructor_Total, isInteractive: Lib_ScaffoldPresentation_ScaffoldProgress_Constructor_IsInteractive) {
    this.#isInteractive = isInteractive;
    this.#total = total;

    return;
  }

  /**
   * Lib - Scaffold Presentation - Start.
   *
   * Begins one stage without advancing the completed-stage count. Interactive
   * terminals animate in place; automation receives one plain stage line.
   *
   * @param {Lib_ScaffoldPresentation_ScaffoldProgress_Start_Label}  label    - Label.
   * @param {Lib_ScaffoldPresentation_ScaffoldProgress_Start_Detail} [detail] - Detail.
   *
   * @returns {Lib_ScaffoldPresentation_ScaffoldProgress_Start_Returns}
   *
   * @since 0.31.0
   */
  public start(label: Lib_ScaffoldPresentation_ScaffoldProgress_Start_Label, detail?: Lib_ScaffoldPresentation_ScaffoldProgress_Start_Detail): Lib_ScaffoldPresentation_ScaffoldProgress_Start_Returns {
    this.#stopTimer();

    this.#currentDetail = detail;
    this.#currentLabel = label;
    this.#frameIndex = 0;
    this.#isRunning = true;

    if (this.#isInteractive === true) {
      this.#render();

      this.#startTimer();
    } else {
      let detailSuffix: Lib_ScaffoldPresentation_ScaffoldProgress_Start_DetailSuffix = '';

      if (detail !== undefined) {
        detailSuffix = ` ${detail}`;
      }

      const durableMessage: Lib_ScaffoldPresentation_ScaffoldProgress_Start_DurableMessage = `→ Step ${Math.min(this.#completed + 1, this.#total)}/${this.#total}: ${label}${detailSuffix}`;

      process.stdout.write(`${durableMessage}\n`);
    }

    return;
  }

  /**
   * Lib - Scaffold Presentation - Complete.
   *
   * Advances progress only after the active stage has completed successfully.
   * Interactive terminals retain the completed state briefly before continuing.
   *
   * @returns {Lib_ScaffoldPresentation_ScaffoldProgress_Complete_Returns}
   *
   * @since 0.31.0
   */
  public async complete(): Lib_ScaffoldPresentation_ScaffoldProgress_Complete_Returns {
    this.#stopTimer();

    this.#completed = Math.min(this.#completed + 1, this.#total);
    this.#isRunning = false;

    if (this.#isInteractive === true) {
      this.#render();

      await delay(scaffoldProgressCompletedStageHoldMilliseconds);
    }

    return;
  }

  /**
   * Lib - Scaffold Presentation - Finish.
   *
   * Replaces the live stage with the one durable completed progress line.
   * Automation receives the same completion state without cursor controls.
   *
   * @param {Lib_ScaffoldPresentation_ScaffoldProgress_Finish_Label} label - Label.
   *
   * @returns {Lib_ScaffoldPresentation_ScaffoldProgress_Finish_Returns}
   *
   * @since 0.31.0
   */
  public finish(label: Lib_ScaffoldPresentation_ScaffoldProgress_Finish_Label): Lib_ScaffoldPresentation_ScaffoldProgress_Finish_Returns {
    this.#stopTimer();

    this.#completed = this.#total;
    this.#currentDetail = undefined;
    this.#currentLabel = label;
    this.#isRunning = false;

    if (this.#isInteractive === true) {
      this.#render();

      process.stdout.write('\n');
    } else {
      process.stdout.write(`${chalk.green('✔')} ${this.#completed}/${this.#total} ${label}\n`);
    }

    return;
  }

  /**
   * Lib - Scaffold Presentation - Clear.
   *
   * Removes an unfinished live stage before an error is reported.
   * Durable automation output remains untouched because it cannot be redrawn.
   *
   * @returns {Lib_ScaffoldPresentation_ScaffoldProgress_Clear_Returns}
   *
   * @since 0.31.0
   */
  public clear(): Lib_ScaffoldPresentation_ScaffoldProgress_Clear_Returns {
    this.#stopTimer();

    if (this.#isInteractive === true) {
      clearLine(process.stdout, 0);
      cursorTo(process.stdout, 0);
    }

    return;
  }

  /**
   * Lib - Scaffold Presentation - Render.
   *
   * Draws the latest stage state without adding a newline.
   * Clearing first prevents remnants when the replacement line is shorter.
   *
   * @private
   *
   * @returns {Lib_ScaffoldPresentation_ScaffoldProgress_Render_Returns}
   *
   * @since 0.31.0
   */
  #render(): Lib_ScaffoldPresentation_ScaffoldProgress_Render_Returns {
    if (this.#currentLabel === undefined) {
      return;
    }

    const completedWidth: Lib_ScaffoldPresentation_ScaffoldProgress_Render_CompletedWidth = Math.round((this.#completed / this.#total) * scaffoldProgressBarWidth);
    const remainingWidth: Lib_ScaffoldPresentation_ScaffoldProgress_Render_RemainingWidth = scaffoldProgressBarWidth - completedWidth;
    const bar: Lib_ScaffoldPresentation_ScaffoldProgress_Render_Bar = `${chalk.cyan('█'.repeat(completedWidth))}${chalk.dim('░'.repeat(remainingWidth))}`;
    const frame: Lib_ScaffoldPresentation_ScaffoldProgress_Render_Frame = scaffoldProgressFrames[this.#frameIndex]
      ?? scaffoldProgressFrames[0]
      ?? '';
    const symbol: Lib_ScaffoldPresentation_ScaffoldProgress_Render_Symbol = (this.#isRunning === true) ? chalk.cyan(frame) : chalk.green('✔');
    const detail: Lib_ScaffoldPresentation_ScaffoldProgress_Render_Detail = (this.#currentDetail === undefined) ? '' : ` ${chalk.dim(this.#currentDetail)}`;
    const liveMessage: Lib_ScaffoldPresentation_ScaffoldProgress_Render_LiveMessage = `${symbol} [${bar}] ${chalk.bold(`${this.#completed}/${this.#total}`)} ${this.#currentLabel}${detail}`;

    clearLine(process.stdout, 0);
    cursorTo(process.stdout, 0);

    process.stdout.write(liveMessage);

    return;
  }

  /**
   * Lib - Scaffold Presentation - Start Timer.
   *
   * Advances the spinner while allowing Node.js to exit if no other work remains.
   * Only interactive reporters create this timer.
   *
   * @private
   *
   * @returns {Lib_ScaffoldPresentation_ScaffoldProgress_StartTimer_Returns}
   *
   * @since 0.31.0
   */
  #startTimer(): Lib_ScaffoldPresentation_ScaffoldProgress_StartTimer_Returns {
    this.#interval = setInterval(() => {
      this.#frameIndex = (this.#frameIndex + 1) % scaffoldProgressFrames.length;

      this.#render();

      return;
    }, scaffoldProgressIntervalMilliseconds);

    this.#interval.unref();

    return;
  }

  /**
   * Lib - Scaffold Presentation - Stop Timer.
   *
   * Stops an active spinner before the stage changes or output is handed off.
   * Clearing the stored handle makes repeated stops safe.
   *
   * @private
   *
   * @returns {Lib_ScaffoldPresentation_ScaffoldProgress_StopTimer_Returns}
   *
   * @since 0.31.0
   */
  #stopTimer(): Lib_ScaffoldPresentation_ScaffoldProgress_StopTimer_Returns {
    if (this.#interval !== undefined) {
      clearInterval(this.#interval);

      this.#interval = undefined;
    }

    return;
  }
}

/**
 * Lib - Scaffold Presentation - Create Scaffold Progress.
 *
 * Creates the shared progress reporter used by base and workspace scaffolds.
 * Terminal interactivity can be overridden by tests while production follows
 * stdout automatically.
 *
 * @param {Lib_ScaffoldPresentation_CreateScaffoldProgress_Total}         total           - Total.
 * @param {Lib_ScaffoldPresentation_CreateScaffoldProgress_IsInteractive} [isInteractive] - Is interactive.
 *
 * @returns {Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns}
 *
 * @since 0.31.0
 */
export function createScaffoldProgress(total: Lib_ScaffoldPresentation_CreateScaffoldProgress_Total, isInteractive: Lib_ScaffoldPresentation_CreateScaffoldProgress_IsInteractive = process.stdout.isTTY === true): Lib_ScaffoldPresentation_CreateScaffoldProgress_Returns {
  return new ScaffoldProgress(total, isInteractive);
}

/**
 * Lib - Scaffold Presentation - Confirm Scaffold Plan.
 *
 * Requests one final confirmation after Nova has validated the complete scaffold
 * plan. Automation and dry runs continue without an interactive prompt.
 *
 * @param {Lib_ScaffoldPresentation_ConfirmScaffoldPlan_IsNonInteractive} isNonInteractive - Is non interactive.
 * @param {Lib_ScaffoldPresentation_ConfirmScaffoldPlan_IsDryRun}         isDryRun         - Is dry run.
 *
 * @returns {Lib_ScaffoldPresentation_ConfirmScaffoldPlan_Returns}
 *
 * @since 0.31.0
 */
export async function confirmScaffoldPlan(isNonInteractive: Lib_ScaffoldPresentation_ConfirmScaffoldPlan_IsNonInteractive, isDryRun: Lib_ScaffoldPresentation_ConfirmScaffoldPlan_IsDryRun): Lib_ScaffoldPresentation_ConfirmScaffoldPlan_Returns {
  if (isNonInteractive === true || isDryRun === true) {
    return true;
  }

  const answers: Lib_ScaffoldPresentation_ConfirmScaffoldPlan_Answers = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: 'Create this scaffold?',
    initial: true,
  }, {
    onCancel: () => false,
  });

  return answers['confirmed'] === true;
}

/**
 * Lib - Scaffold Presentation - Resolve Scaffold Install.
 *
 * Honors an explicit install choice and otherwise installs dependencies by
 * default. Users and automation can opt out explicitly with --no-install.
 *
 * @param {Lib_ScaffoldPresentation_ResolveScaffoldInstall_Install} install - Install.
 *
 * @returns {Lib_ScaffoldPresentation_ResolveScaffoldInstall_Returns}
 *
 * @since 0.31.0
 */
export function resolveScaffoldInstall(install: Lib_ScaffoldPresentation_ResolveScaffoldInstall_Install): Lib_ScaffoldPresentation_ResolveScaffoldInstall_Returns {
  return install ?? true;
}

/**
 * Lib - Scaffold Presentation - Report Scaffold Plan.
 *
 * Displays the fully resolved scaffold plan before files are written.
 * Framework-specific choices are shown using their user-facing labels.
 *
 * @param {Lib_ScaffoldPresentation_ReportScaffoldPlan_Details} details - Details.
 *
 * @returns {Lib_ScaffoldPresentation_ReportScaffoldPlan_Returns}
 *
 * @since 0.31.0
 */
export function reportScaffoldPlan(details: Lib_ScaffoldPresentation_ReportScaffoldPlan_Details): Lib_ScaffoldPresentation_ReportScaffoldPlan_Returns {
  const mode: Lib_ScaffoldPresentation_ReportScaffoldPlan_Mode = (details['mode'] === 'monorepo') ? 'New monorepo' : 'Existing monorepo';
  const rows: Lib_ScaffoldPresentation_ReportScaffoldPlan_Rows = [
    [
      'Mode',
      mode,
    ],
    [
      'Project',
      details['project'],
    ],
  ];

  if (details['workspacePackageName'] !== undefined) {
    rows.push([
      'Workspace',
      details['workspacePackageName'],
    ]);
  }

  rows.push([
    'Destination',
    details['destination'],
  ]);

  for (const question of details['questions']) {
    if (question['dependsOn'] !== undefined) {
      const dependencyValue: Lib_ScaffoldPresentation_ReportScaffoldPlan_DependencyValue = details['answers'].get(question['dependsOn']['name']);
      const isActive: Lib_ScaffoldPresentation_ReportScaffoldPlan_IsActive = dependencyValue !== undefined && question['dependsOn']['values'].includes(dependencyValue);

      if (isActive === false) {
        continue;
      }
    }

    const answer: Lib_ScaffoldPresentation_ReportScaffoldPlan_Answer = details['answers'].get(question['name']);

    if (answer === undefined) {
      continue;
    }

    const choice: Lib_ScaffoldPresentation_ReportScaffoldPlan_Choice = question['choices'].find((questionChoice) => questionChoice['value'] === answer);
    let choiceTitle: Lib_ScaffoldPresentation_ReportScaffoldPlan_ChoiceTitle = answer;

    if (choice !== undefined) {
      choiceTitle = choice['title'];
    }

    rows.push([
      question['flag'],
      choiceTitle,
    ]);
  }

  for (const additionalOption of details['additionalOptions'] ?? []) {
    rows.push([
      additionalOption['flag'],
      additionalOption['value'],
    ]);
  }

  const labelWidth: Lib_ScaffoldPresentation_ReportScaffoldPlan_LabelWidth = Math.max(...rows.map((row) => row[0].length));
  const lines: Lib_ScaffoldPresentation_ReportScaffoldPlan_Lines = [];

  for (const row of rows) {
    lines.push(`  ${chalk.dim(row[0].padEnd(labelWidth))}  ${row[1]}`);
  }

  process.stdout.write([
    '',
    chalk.bold.cyan(`Nova × ${details['displayName']}`),
    '',
    ...lines,
    '',
    '',
  ].join('\n'));

  return;
}

/**
 * Lib - Scaffold Presentation - Report Scaffold Completion.
 *
 * Displays a compact completion summary and copyable commands for the generated
 * project or workspace.
 *
 * @param {Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details} details - Details.
 *
 * @returns {Lib_ScaffoldPresentation_ReportScaffoldCompletion_Returns}
 *
 * @since 0.31.0
 */
export function reportScaffoldCompletion(details: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Details): Lib_ScaffoldPresentation_ReportScaffoldCompletion_Returns {
  if (details['dryRun'] === true) {
    process.stdout.write(`${chalk.green('✔')} ${chalk.bold('Preview complete')}. No files were written.\n`);

    return;
  }

  const commands: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Commands = [];
  const packageManager: Lib_ScaffoldPresentation_ReportScaffoldCompletion_PackageManager = details['packageManager'];

  if (details['projectRoot'] !== '.') {
    commands.push(`cd "${details['projectRoot']}"`);
  }

  if (details['dependenciesInstalled'] === false) {
    commands.push(`${packageManager} install`);
  }

  if (details['shouldConfigure'] === true) {
    commands.push('nova utility configure');
  }

  if (details['workspacePackageName'] === undefined) {
    commands.push(`${packageManager} run check`);
  } else if (packageManager === 'npm') {
    commands.push(`npm run check --workspace "${details['workspacePackageName']}"`);

    if (details['primaryScript'] !== undefined) {
      commands.push(`npm run ${details['primaryScript']} --workspace "${details['workspacePackageName']}"`);
    }
  } else if (packageManager === 'pnpm') {
    commands.push(`pnpm --filter "${details['workspacePackageName']}" run check`);

    if (details['primaryScript'] !== undefined) {
      commands.push(`pnpm --filter "${details['workspacePackageName']}" run ${details['primaryScript']}`);
    }
  } else {
    commands.push(`yarn workspace "${details['workspacePackageName']}" run check`);

    if (details['primaryScript'] !== undefined) {
      commands.push(`yarn workspace "${details['workspacePackageName']}" run ${details['primaryScript']}`);
    }
  }

  const lines: Lib_ScaffoldPresentation_ReportScaffoldCompletion_Lines = [];

  if ((details['completionNotes'] ?? []).length > 0) {
    lines.push(`\n${chalk.bold.yellow('Setup required:')}`);

    for (const completionNote of details['completionNotes'] ?? []) {
      lines.push(`  ${chalk.yellow('•')} ${completionNote}`);
    }

    lines.push('');
  } else {
    lines.push('');
  }

  lines.push(chalk.bold('Next:'));

  /**
   * Lib - Scaffold Presentation - Report Scaffold Completion - Append Command.
   *
   * Adds one numbered command to the completion panel while preserving the
   * command order Nova expects users and automation to follow.
   *
   * @private
   *
   * @since 0.31.0
   */
  const appendCommand: Lib_ScaffoldPresentation_ReportScaffoldCompletion_AppendCommand = (command, index) => {
    lines.push(`  ${index + 1}. ${chalk.cyan(command)}`);

    return;
  };

  commands.forEach(appendCommand);

  process.stdout.write(`${lines.join('\n')}\n`);

  return;
}

/**
 * Lib - Scaffold Presentation - Resolve Display Path.
 *
 * Converts an absolute scaffold path into a concise path relative to the command
 * location while preserving the current directory as a visible dot.
 *
 * @param {Lib_ScaffoldPresentation_ResolveDisplayPath_CurrentDirectory} currentDirectory - Current directory.
 * @param {Lib_ScaffoldPresentation_ResolveDisplayPath_Path}             path             - Path.
 *
 * @returns {Lib_ScaffoldPresentation_ResolveDisplayPath_Returns}
 *
 * @since 0.31.0
 */
export function resolveDisplayPath(currentDirectory: Lib_ScaffoldPresentation_ResolveDisplayPath_CurrentDirectory, path: Lib_ScaffoldPresentation_ResolveDisplayPath_Path): Lib_ScaffoldPresentation_ResolveDisplayPath_Returns {
  const relativePath: Lib_ScaffoldPresentation_ResolveDisplayPath_RelativePath = relative(currentDirectory, path);

  if (relativePath === '') {
    return '.';
  }

  return relativePath;
}
