import type { start } from 'node:repl';

/**
 * Repl.
 *
 * @since 0.0.0
 */
export type Cli_Repl_Arguments = string[];

export type Cli_Repl_HasHelpFlag = boolean;

export type Cli_Repl_Server = ReturnType<typeof start>;
