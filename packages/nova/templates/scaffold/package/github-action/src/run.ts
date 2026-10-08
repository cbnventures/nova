import {
  getInput,
  setOutput,
} from '@actions/core';

import type {
  Run_CreateMessage_Name,
  Run_CreateMessage_Returns,
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
 * Run.
 *
 * Reads action inputs and publishes the generated action output.
 * GitHub invokes this path through the workspace entry point.
 *
 * @returns {Run_Run_Returns}
 *
 * @since 0.0.0
 */
export function run(): Run_Run_Returns {
  const name: Run_Run_Name = getInput('name', { required: true });

  setOutput('message', createMessage(name));

  return;
}
