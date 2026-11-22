import { deepStrictEqual } from 'node:assert/strict';

import { ESLint } from 'eslint';
import { describe, it } from 'vitest';

import { runtimeNode } from '../../../presets/eslint/index.js';

import type {
  Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Code,
  Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Eslint,
  Tests_Presets_Eslint_RuntimeNode_HashbangMessages_FilePath,
  Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Messages,
  Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Results,
  Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Returns,
  Tests_Presets_Eslint_RuntimeNode_RuntimeNode_AllowsAShebangInAScript_Messages,
  Tests_Presets_Eslint_RuntimeNode_RuntimeNode_RejectsAShebangInALibraryFile_Messages,
} from '../../../types/tests/presets/eslint/runtime-node.test.d.ts';

/**
 * Tests - Presets - ESLint - Runtime Node - Hashbang Messages.
 *
 * Lints the given code as the given file with the runtime-node preset and returns only the
 * "n/hashbang" messages, along with any fatal parse errors.
 *
 * @param {Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Code}     code     - Code.
 * @param {Tests_Presets_Eslint_RuntimeNode_HashbangMessages_FilePath} filePath - File path.
 *
 * @returns {Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Returns}
 *
 * @since 0.49.0
 */
async function hashbangMessages(code: Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Code, filePath: Tests_Presets_Eslint_RuntimeNode_HashbangMessages_FilePath): Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Returns {
  const eslint: Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Eslint = new ESLint({
    overrideConfig: runtimeNode,
    overrideConfigFile: true,
  });
  const results: Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Results = await eslint.lintText(code, { filePath });
  const messages: Tests_Presets_Eslint_RuntimeNode_HashbangMessages_Messages = [];

  for (const result of results) {
    for (const message of result.messages) {
      if (message.fatal === true || message.ruleId === 'n/hashbang') {
        messages.push(message.message);
      }
    }
  }

  return messages;
}

/**
 * Tests - Presets - ESLint - Runtime Node - Runtime Node.
 *
 * Verifies that scripts may carry a shebang without needing one, while other files still
 * may not carry one.
 *
 * @since 0.49.0
 */
describe('runtimeNode', () => {
  it('allows a shebang in a script', async () => {
    const messages: Tests_Presets_Eslint_RuntimeNode_RuntimeNode_AllowsAShebangInAScript_Messages = await hashbangMessages([
      '#!/usr/bin/env node',
      'export const value = 1;',
      '',
    ].join('\n'), 'scripts/x.mjs');

    deepStrictEqual(messages, []);

    return;
  });

  it('rejects a shebang in a library file', async () => {
    const messages: Tests_Presets_Eslint_RuntimeNode_RuntimeNode_RejectsAShebangInALibraryFile_Messages = await hashbangMessages([
      '#!/usr/bin/env node',
      'export const value = 1;',
      '',
    ].join('\n'), 'src/lib/x.ts');

    deepStrictEqual(messages, ['This file needs no shebang.']);

    return;
  });

  return;
});
