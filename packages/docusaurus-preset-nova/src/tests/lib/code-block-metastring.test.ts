import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { hasMetastringFlag } from '../../lib/code-block-metastring.js';

import type {
  Tests_Lib_CodeBlockMetastring_HasMetastringFlag_IgnoresAFlagWordInsideADoubleQuotedTitle_Result,
  Tests_Lib_CodeBlockMetastring_HasMetastringFlag_IgnoresAFlagWordInsideASingleQuotedTitle_Result,
  Tests_Lib_CodeBlockMetastring_HasMetastringFlag_RecognizesAFlagAfterAnEscapedQuoteInATitle_Result,
  Tests_Lib_CodeBlockMetastring_HasMetastringFlag_RecognizesAStandaloneFlag_Result,
} from '../../types/tests/lib/code-block-metastring.test.d.ts';

/**
 * Tests - Lib - Code Block Metastring - Has Metastring Flag.
 *
 * @since 0.22.0
 */
describe('hasMetastringFlag', async () => {
  it('recognizes a standalone flag', () => {
    const result: Tests_Lib_CodeBlockMetastring_HasMetastringFlag_RecognizesAStandaloneFlag_Result = hasMetastringFlag('title="Editable counter" live', 'live');

    strictEqual(result, true);

    return;
  });

  it('ignores a flag word inside a double-quoted title', () => {
    const result: Tests_Lib_CodeBlockMetastring_HasMetastringFlag_IgnoresAFlagWordInsideADoubleQuotedTitle_Result = hasMetastringFlag('title="Start Pulse live stream"', 'live');

    strictEqual(result, false);

    return;
  });

  it('ignores a flag word inside a single-quoted title', () => {
    const result: Tests_Lib_CodeBlockMetastring_HasMetastringFlag_IgnoresAFlagWordInsideASingleQuotedTitle_Result = hasMetastringFlag('title=\'Keep this live example static\'', 'live');

    strictEqual(result, false);

    return;
  });

  it('recognizes a flag after an escaped quote in a title', () => {
    const result: Tests_Lib_CodeBlockMetastring_HasMetastringFlag_RecognizesAFlagAfterAnEscapedQuoteInATitle_Result = hasMetastringFlag('title="An \\"editable\\" example" live', 'live');

    strictEqual(result, true);

    return;
  });

  return;
});
