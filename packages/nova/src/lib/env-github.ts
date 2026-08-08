import {
  executeShell,
  isCommandExists,
  shellQuote,
} from './utility.js';

import type {
  Lib_EnvGithub_AuthResult,
  Lib_EnvGithub_DeleteCommand,
  Lib_EnvGithub_DeleteResult,
  Lib_EnvGithub_GhAvailable,
  Lib_EnvGithub_LibEnvGithub,
  Lib_EnvGithub_ParseGhNames_Names,
  Lib_EnvGithub_ParseGhNames_Output,
  Lib_EnvGithub_ParseGhNames_Parsed,
  Lib_EnvGithub_ParseGhNames_Returns,
  Lib_EnvGithub_ParseGhValues_Output,
  Lib_EnvGithub_ParseGhValues_Parsed,
  Lib_EnvGithub_ParseGhValues_Returns,
  Lib_EnvGithub_ParseGhValues_Values,
  Lib_EnvGithub_SecretResult,
  Lib_EnvGithub_StubCommand,
  Lib_EnvGithub_StubPlaceholder,
  Lib_EnvGithub_StubResult,
  Lib_EnvGithub_VariableResult,
  Lib_EnvGithub_VariableValueResult,
} from '../types/lib/env-github.d.ts';

/**
 * Lib - Env GitHub - Parse Gh Names.
 *
 * Parses the JSON output of a `gh variable list`/`gh secret list --json name` call into a
 * flat list of names, returning an empty list when the output is not valid JSON.
 *
 * @param {Lib_EnvGithub_ParseGhNames_Output} output - Output.
 *
 * @returns {Lib_EnvGithub_ParseGhNames_Returns}
 *
 * @since 0.21.0
 */
export function parseGhNames(output: Lib_EnvGithub_ParseGhNames_Output): Lib_EnvGithub_ParseGhNames_Returns {
  const names: Lib_EnvGithub_ParseGhNames_Names = [];

  try {
    const parsed: Lib_EnvGithub_ParseGhNames_Parsed = JSON.parse(output);

    if (Array.isArray(parsed) === true) {
      for (const item of parsed) {
        if (typeof item['name'] === 'string') {
          names.push(item['name']);
        }
      }
    }
  } catch {
    return [];
  }

  return names;
}

/**
 * Lib - Env GitHub - Parse Gh Values.
 *
 * Parses the JSON output of a `gh variable list --json name,value` call into a
 * name-to-value record, returning undefined when the output is not valid JSON so a
 * failed call is distinguishable from a call that succeeded with no variables.
 *
 * @param {Lib_EnvGithub_ParseGhValues_Output} output - Output.
 *
 * @returns {Lib_EnvGithub_ParseGhValues_Returns}
 *
 * @since 0.22.0
 */
export function parseGhValues(output: Lib_EnvGithub_ParseGhValues_Output): Lib_EnvGithub_ParseGhValues_Returns {
  const values: Lib_EnvGithub_ParseGhValues_Values = {};

  try {
    const parsed: Lib_EnvGithub_ParseGhValues_Parsed = JSON.parse(output);

    if (Array.isArray(parsed) === false) {
      return undefined;
    }

    for (const item of parsed) {
      if (typeof item['name'] === 'string' && typeof item['value'] === 'string') {
        Reflect.set(values, item['name'], item['value']);
      }
    }
  } catch {
    return undefined;
  }

  return values;
}

/**
 * Lib - Env GitHub - Lib Env GitHub.
 *
 * Reads and mutates the GitHub Variable and Secret names Nova manages via the
 * `gh` CLI, handling names, existence, and (for Variables) values, so a missing
 * or an unauthenticated `gh` simply yields an unavailable read.
 *
 * @since 0.22.0
 */
export const libEnvGithub: Lib_EnvGithub_LibEnvGithub = {
  read: async () => {
    const ghAvailable: Lib_EnvGithub_GhAvailable = await isCommandExists('gh');

    if (ghAvailable === false) {
      return {
        available: false,
        variables: [],
        secrets: [],
      };
    }

    const authResult: Lib_EnvGithub_AuthResult = await executeShell('gh auth status');

    if (authResult['code'] !== 0) {
      return {
        available: false,
        variables: [],
        secrets: [],
      };
    }

    const variableResult: Lib_EnvGithub_VariableResult = await executeShell('gh variable list --json name');
    const secretResult: Lib_EnvGithub_SecretResult = await executeShell('gh secret list --json name');
    const variableValueResult: Lib_EnvGithub_VariableValueResult = await executeShell('gh variable list --json name,value');

    return {
      available: true,
      variables: parseGhNames(variableResult['textOut']),
      secrets: parseGhNames(secretResult['textOut']),
      variableValues: parseGhValues(variableValueResult['textOut']),
    };
  },
  createStub: async (name, secret) => {
    // GitHub rejects an empty variable (422) and will not save an empty secret in its UI, so
    // both branches write a non-empty placeholder the consumer replaces with the real value later.
    const stubPlaceholder: Lib_EnvGithub_StubPlaceholder = 'NOVA_PLACEHOLDER';
    const stubCommand: Lib_EnvGithub_StubCommand = (secret === true) ? `gh secret set ${shellQuote(name)} --body ${shellQuote(stubPlaceholder)}` : `gh variable set ${shellQuote(name)} --body ${shellQuote(stubPlaceholder)}`;
    const stubResult: Lib_EnvGithub_StubResult = await executeShell(stubCommand);

    return stubResult['code'] === 0;
  },
  delete: async (name, secret) => {
    const deleteCommand: Lib_EnvGithub_DeleteCommand = (secret === true) ? `gh secret delete ${shellQuote(name)}` : `gh variable delete ${shellQuote(name)}`;
    const deleteResult: Lib_EnvGithub_DeleteResult = await executeShell(deleteCommand);

    return deleteResult['code'] === 0;
  },
};
