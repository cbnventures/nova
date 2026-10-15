import {
  endGroup,
  getInput,
  info,
  setOutput,
  startGroup,
  summary,
} from '@actions/core';

import type {
  Run_CreateMessage_Name,
  Run_CreateMessage_Returns,
  Run_Run_Message,
  Run_Run_Name,
  Run_Run_Returns,
} from './types/run.d.ts';

/**
 * Run - Create Message.
 *
 * Builds the greeting returned by the generated action.
 * Keeping this transformation pure makes it straightforward to test.
 *
 * @param {Run_CreateMessage_Name} name - Name.
 *
 * @returns {Run_CreateMessage_Returns}
 *
 * @since 0.0.0
 */
export function createMessage(name: Run_CreateMessage_Name): Run_CreateMessage_Returns {
  return `Hello, ${name}!`;
}

/**
 * Run - Run.
 *
 * Reads action inputs and publishes the generated action output.
 * GitHub invokes this path through the workspace entry point.
 *
 * @returns {Run_Run_Returns}
 *
 * @since 0.0.0
 */
export async function run(): Run_Run_Returns {
  startGroup('Configuration');

  const name: Run_Run_Name = getInput('name', { required: true });

  info('Validated the required "name" input.');
  endGroup();

  startGroup('Result');

  const message: Run_Run_Message = createMessage(name);

  setOutput('message', message);
  info('Published the "message" output.');
  endGroup();

  if (process.env['GITHUB_STEP_SUMMARY'] === undefined) {
    info('Step summaries are unavailable in this local runtime.');
  } else {
    await summary
      .addHeading('[__WORKSPACE_TITLE__]')
      .addTable([
        [
          {
            data: 'Item',
            header: true,
          },
          {
            data: 'Result',
            header: true,
          },
        ],
        [
          'Status',
          'Completed',
        ],
        [
          'Output',
          'message',
        ],
      ])
      .write();
  }

  return;
}
