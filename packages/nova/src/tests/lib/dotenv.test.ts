import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { findEnvQuoteViolations } from '../../lib/dotenv.js';

import type {
  Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsBareEmptyValues_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsSingleQuotedValues_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsUnquotedValues_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsUnterminatedDoubleQuotes_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_HandlesCRLFLineEndings_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_HandlesCRLFLineEndings_Subject,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_PassesCorrectlyDoubleQuotedValuesIncludingEmptyAndMultiLine_Content,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_ReportsOneViolationPerOffendingKeyAndIgnoresCommentsBlanks_Content,
} from '../../types/tests/lib/dotenv.test.d.ts';

/**
 * Tests - Lib - Dotenv - Find Env Quote Violations.
 *
 * @since 0.20.0
 */
describe('findEnvQuoteViolations', () => {
  it('passes correctly double-quoted values, including empty and multi-line', () => {
    const content: Tests_Lib_Dotenv_FindEnvQuoteViolations_PassesCorrectlyDoubleQuotedValuesIncludingEmptyAndMultiLine_Content = [
      '# comment',
      '',
      'NODE_ENV="development"',
      'LOG_LEVEL=""',
      'PEM="-----BEGIN-----',
      'middle',
      '-----END-----"',
    ].join('\n');

    strictEqual(findEnvQuoteViolations(content).length, 0);

    return;
  });

  it('flags single-quoted values', () => {
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsSingleQuotedValues_Result = findEnvQuoteViolations('KEY=\'value\'');

    strictEqual(result.length, 1);
    strictEqual((result[0] !== undefined) ? result[0]['key'] : undefined, 'KEY');
    strictEqual((result[0] !== undefined) ? result[0]['reason'].includes('single quotes') : false, true);

    return;
  });

  it('flags unquoted values', () => {
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsUnquotedValues_Result = findEnvQuoteViolations('KEY=value');

    strictEqual((result[0] !== undefined) ? result[0]['reason'].includes('unquoted') : false, true);

    return;
  });

  it('flags bare empty values', () => {
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsBareEmptyValues_Result = findEnvQuoteViolations('KEY=');

    strictEqual((result[0] !== undefined) ? result[0]['reason'].includes('empty') : false, true);

    return;
  });

  it('flags unterminated double quotes', () => {
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsUnterminatedDoubleQuotes_Result = findEnvQuoteViolations('KEY="oops');

    strictEqual((result[0] !== undefined) ? result[0]['reason'].includes('unterminated') : false, true);

    return;
  });

  it('reports one violation per offending key and ignores comments/blanks', () => {
    const content: Tests_Lib_Dotenv_FindEnvQuoteViolations_ReportsOneViolationPerOffendingKeyAndIgnoresCommentsBlanks_Content = [
      '# c',
      '',
      'A=\'x\'',
      'B="ok"',
      'C=raw',
    ].join('\n');

    strictEqual(findEnvQuoteViolations(content).length, 2);

    return;
  });

  it('handles CRLF line endings', () => {
    const subject: Tests_Lib_Dotenv_FindEnvQuoteViolations_HandlesCRLFLineEndings_Subject = [
      'A=\'x\'',
      'B="y"',
    ].join(String.fromCharCode(13, 10));
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_HandlesCRLFLineEndings_Result = findEnvQuoteViolations(subject);

    strictEqual(result.length, 1);

    return;
  });

  return;
});
