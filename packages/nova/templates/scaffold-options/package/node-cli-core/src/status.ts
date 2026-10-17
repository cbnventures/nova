import { Logger } from '@cbnventures/nova/toolkit';

import type {
  Status_CreateStatusMessage_Returns,
  Status_RunStatus_Message,
  Status_RunStatus_Returns,
} from './types/status.d.ts';

/**
 * Status - Create Status Message.
 *
 * Creates the starter command result independently from terminal output.
 * Replace this function with the first real behavior of the generated CLI.
 *
 * @returns {Status_CreateStatusMessage_Returns}
 *
 * @since 0.0.0
 */
export function createStatusMessage(): Status_CreateStatusMessage_Returns {
  return 'Your command is ready.';
}

/**
 * Status - Run Status.
 *
 * Writes the starter command result through Nova's shared logger.
 * Future commands can preserve this boundary while replacing the message.
 *
 * @returns {Status_RunStatus_Returns}
 *
 * @since 0.0.0
 */
export function runStatus(): Status_RunStatus_Returns {
  const message: Status_RunStatus_Message = createStatusMessage();

  Logger.info(message);

  return;
}
